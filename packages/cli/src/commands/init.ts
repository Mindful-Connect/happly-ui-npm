import prompts from 'prompts';
import ora from 'ora';
import path from 'path';
import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { logger } from '../utils/logger.js';
import { detectProject } from '../utils/detect.js';
import {
  isInitialized,
  writeConfig,
  writeComponentFile,
} from '../utils/config.js';
import { installDependencies } from '../utils/install.js';
import { updateTailwindConfig } from '../utils/transformers/tailwind.js';
import { isNonInteractive, getAgentName } from '../utils/env.js';
import type { HapplyConfig, InitOptions } from '../types/index.js';
import { CONFIG_FILE, REGISTRY_URL } from '../types/index.js';
import { fetchThemeCSS } from '../utils/theme.js';
import { fetchOrReadRaw, isLocalRegistry } from '../utils/registry.js';

const HAPPLY_THEME_FILE = 'happly-theme.css';
// Tailwind v4 plugin line that enables the enter/exit utilities (animate-in, fade-*, zoom-*, slide-*)
// used by the overlay components (modal, drawer, popover, tooltip, dropdown, select …).
const ANIMATE_PLUGIN_LINE = '@plugin "tailwindcss-animate";';

// Fallback templates used only when registry fetch fails
const UTILS_FALLBACK = `import clsx, { type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

export { type ClassValue } from 'clsx';

const typographyConfig = {
  title: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  label: ['xl', 'lg', 'md', 'sm', 'xs', '2xs'],
  paragraph: ['xl', 'lg', 'md', 'sm', 'xs'],
  subheading: ['md', 'sm', 'xs', '2xs'],
  doc: ['label', 'paragraph'],
};

const typographyPatterns = Object.entries(typographyConfig).flatMap(
  ([category, sizes]) => sizes.map((size) => \`\${category}-\${size}\`)
);

export const twMergeConfig = {
  extend: {
    classGroups: {
      'font-size': [
        {
          text: typographyPatterns,
        },
      ],
    },
  },
};

const customTwMerge = extendTailwindMerge(twMergeConfig);

export function cn(...classes: ClassValue[]) {
  return customTwMerge(clsx(...classes));
}

export type ObjectValues<T> = T[keyof T];
`;

/**
 * Fetch happly-ui-utils.ts from the registry, falling back to bundled template.
 */
async function fetchUtilsSource(registryUrl?: string): Promise<string> {
  const baseUrl = registryUrl || REGISTRY_URL;
  const filePath = 'lib/happly-ui-utils.ts';

  const url = isLocalRegistry(baseUrl)
    ? path.join(baseUrl.replace('file://', ''), filePath)
    : `${baseUrl}/${filePath}`;

  try {
    return await fetchOrReadRaw(url);
  } catch {
    logger.warn(
      'Could not fetch latest utils from registry, using bundled fallback.'
    );
    return UTILS_FALLBACK;
  }
}

/**
 * Strip TypeScript types for JavaScript projects (simplified transform).
 */
function stripTypes(content: string): string {
  // Remove type-only imports
  content = content.replace(
    /import\s+type\s*\{[^}]*\}\s*from\s*['"][^'"]+['"];?\n?/g,
    ''
  );
  // Remove type-only re-exports
  content = content.replace(
    /export\s+\{\s*type\s+\w+\s*\}\s*from\s*['"][^'"]+['"];?\n?/g,
    ''
  );
  // Remove ", { type ClassValue }" from mixed imports
  content = content.replace(/,\s*\{\s*type\s+\w+\s*\}/g, '');
  // Remove type annotations from function parameters
  content = content.replace(/:\s*\w+(\[\])?\s*(?=[,)])/g, '');
  // Remove return type annotations
  content = content.replace(/\):\s*\w+(\[\])?\s*(?=\s*[{=])/g, ')');
  // Remove generic type parameters
  content = content.replace(/<[A-Z]\w*(\s*extends\s*[^>]+)?>/g, '');
  // Remove interface/type declarations and exports
  content = content.replace(
    /^(export\s+)?(interface|type)\s+\w+\s*[^{]*\{[^}]*\};?\n?/gm,
    ''
  );
  // Remove 'as' type assertions
  content = content.replace(/\s+as\s+\w+(\[\])?/g, '');
  // Clean up multiple blank lines
  content = content.replace(/\n{3,}/g, '\n\n');
  return content;
}

export async function init(options: InitOptions): Promise<void> {
  const cwd = options.cwd || process.cwd();

  // Auto-detect non-interactive environments (AI agents, CI, etc.)
  const nonInteractive = isNonInteractive();
  const agentName = getAgentName();
  const useDefaults = options.defaults || options.yes || nonInteractive;

  logger.break();
  logger.log(logger.bold('HapplyUI') + ' - Initialize your project');
  if (agentName) {
    logger.info(`Detected: ${logger.highlight(agentName)} (using defaults)`);
  } else if (nonInteractive && !options.yes) {
    logger.info('Non-interactive mode detected (using defaults)');
  }
  logger.break();

  // Check if already initialized
  if (isInitialized(cwd) && !useDefaults) {
    const { overwrite } = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: 'Project already initialized. Overwrite existing configuration?',
      initial: false,
    });

    if (!overwrite) {
      logger.info('Initialization cancelled.');
      return;
    }
  }

  // Detect project setup
  const spinner = ora('Detecting project configuration...').start();
  const projectInfo = await detectProject(cwd);
  spinner.succeed('Project detected');

  logger.info(`Framework: ${logger.highlight(projectInfo.framework)}`);
  logger.info(
    `TypeScript: ${logger.highlight(String(projectInfo.isTypeScript))}`
  );
  logger.info(
    `Package Manager: ${logger.highlight(projectInfo.packageManager)}`
  );
  logger.info(
    `Tailwind CSS: ${logger.highlight(`v${projectInfo.tailwindVersion}`)}`
  );
  if (projectInfo.tailwindConfig) {
    logger.info(
      `Tailwind Config: ${logger.highlight(projectInfo.tailwindConfig)}`
    );
  }
  logger.break();

  // Interactive prompts (simplified — no baseColor or cssVariables)
  let config: HapplyConfig;

  if (useDefaults) {
    config = createDefaultConfig(projectInfo);
  } else {
    const responses = await prompts([
      {
        type: 'text',
        name: 'componentsPath',
        message: 'Where should components be installed?',
        initial: projectInfo.isSrcDir
          ? 'src/components/happly-ui'
          : 'components/happly-ui',
      },
      {
        type: 'text',
        name: 'utilsPath',
        message: 'Where should utils be installed?',
        initial: projectInfo.isSrcDir
          ? 'src/lib/happly-ui/happly-ui-utils'
          : 'lib/happly-ui/happly-ui-utils',
      },
    ]);

    if (responses.componentsPath === undefined) {
      logger.error('Initialization cancelled.');
      process.exit(1);
    }

    config = createConfig(projectInfo, responses);
  }

  // Write configuration files
  const writeSpinner = ora('Writing configuration...').start();

  try {
    // Write components.json
    await writeConfig(cwd, config);
    writeSpinner.text = `Created ${CONFIG_FILE}`;

    // Fetch and write utils file from registry
    writeSpinner.text = 'Fetching latest utils...';
    let utilsContent = await fetchUtilsSource(config.registry);
    const srcPrefix = config.srcDir ? 'src/' : '';
    const utilsPath = srcPrefix + config.aliases.utils.replace('@/', '');
    const utilsExt = config.tsx ? '.ts' : '.js';
    if (!config.tsx) {
      utilsContent = stripTypes(utilsContent);
    }
    await writeComponentFile(cwd, `${utilsPath}${utilsExt}`, utilsContent);
    writeSpinner.text = `Created ${utilsPath}${utilsExt}`;

    // Fetch and write happly-theme.css
    const cssPath = config.tailwind.css;
    const cssDir = path.dirname(path.join(cwd, cssPath));
    const themePath = path.join(cssDir, HAPPLY_THEME_FILE);
    writeSpinner.text = 'Fetching latest design tokens...';
    const themeContent = await fetchThemeCSS(
      projectInfo.tailwindVersion,
      config.registry
    );

    if (existsSync(themePath) && !useDefaults) {
      writeSpinner.stop();
      const { overwriteTheme } = await prompts({
        type: 'confirm',
        name: 'overwriteTheme',
        message: `${HAPPLY_THEME_FILE} already exists. Overwrite?`,
        initial: true,
      });
      writeSpinner.start();

      if (overwriteTheme) {
        await writeFile(themePath, themeContent, 'utf-8');
        writeSpinner.text = `Updated ${HAPPLY_THEME_FILE}`;
      }
    } else {
      await writeFile(themePath, themeContent, 'utf-8');
      writeSpinner.text = `Created ${HAPPLY_THEME_FILE}`;
    }

    // Add @import to user's main CSS file
    const fullCssPath = path.join(cwd, cssPath);
    if (existsSync(fullCssPath)) {
      let existingCss = await readFile(fullCssPath, 'utf-8');

      // Detect existing design tokens and log info
      if (
        existingCss.includes('--background:') ||
        existingCss.includes('--foreground:')
      ) {
        logger.info(
          'Existing shadcn design tokens detected. These will continue to work alongside HapplyUI tokens.'
        );
      }
      if (
        existingCss.includes('--color-neutral-') ||
        existingCss.includes('--color-primary-')
      ) {
        logger.info(
          'Existing design system tokens detected. Your tokens will take precedence over happly-theme.css defaults.'
        );
      }

      // Add import for happly-theme.css if not already present
      if (!existingCss.includes(HAPPLY_THEME_FILE)) {
        const importStatement =
          projectInfo.tailwindVersion === 4
            ? `@import "./${HAPPLY_THEME_FILE}";\n${ANIMATE_PLUGIN_LINE}\n`
            : `@import "./${HAPPLY_THEME_FILE}";\n`;

        if (projectInfo.tailwindVersion === 4) {
          // For v4: add after @import "tailwindcss" if present
          if (existingCss.includes('@import "tailwindcss"')) {
            existingCss = existingCss.replace(
              '@import "tailwindcss";',
              `@import "tailwindcss";\n${importStatement}`
            );
          } else {
            existingCss = importStatement + existingCss;
          }
        } else {
          // For v3: add at the top (before @tailwind directives)
          existingCss = importStatement + existingCss;
        }

        await writeFile(fullCssPath, existingCss, 'utf-8');
        writeSpinner.text = `Updated ${cssPath} with happly-theme import`;
      }
    } else {
      // Create CSS file with import
      const cssContent =
        projectInfo.tailwindVersion === 4
          ? `@import "tailwindcss";\n@import "./${HAPPLY_THEME_FILE}";\n${ANIMATE_PLUGIN_LINE}\n`
          : `@import "./${HAPPLY_THEME_FILE}";\n\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`;
      await writeComponentFile(cwd, cssPath, cssContent);
      writeSpinner.text = `Created ${cssPath}`;
    }

    // Apply Happly UI Tailwind Configuration (v3 only needs tailwind.config update)
    writeSpinner.text = 'Applying Happly UI design tokens...';
    await updateTailwindConfig(cwd, config, projectInfo.tailwindVersion);

    writeSpinner.succeed('Configuration written successfully');
  } catch (error) {
    writeSpinner.fail('Failed to write configuration');
    throw error;
  }

  // Install dependencies
  const installSpinner = ora('Installing dependencies...').start();

  try {
    const deps = ['clsx', 'tailwind-merge', 'tailwindcss-animate'];
    await installDependencies(cwd, deps, {
      packageManager: projectInfo.packageManager,
    });

    installSpinner.succeed('Dependencies installed');
  } catch {
    installSpinner.fail('Failed to install dependencies');
    logger.warn(
      'Please install manually: clsx tailwind-merge tailwindcss-animate'
    );
  }

  logger.break();
  logger.success('Project initialized successfully!');
  logger.break();
  logger.info('You can now add components:');
  logger.log(`  ${logger.highlight('bunx --bun @happlyui/cli add button')}`);
  logger.break();
}

function createDefaultConfig(
  projectInfo: ReturnType<typeof detectProject> extends Promise<infer T>
    ? T
    : never
): HapplyConfig {
  const isSrcDir = projectInfo.isSrcDir;

  return {
    $schema:
      'https://cdn.jsdelivr.net/gh/Mindful-Connect/happly-ui-npm@production/schemas/happly-ui-components.json',
    srcDir: isSrcDir,
    tailwind: {
      config: projectInfo.tailwindConfig || 'tailwind.config.ts',
      css:
        projectInfo.tailwindCss || (isSrcDir ? 'src/index.css' : 'index.css'),
    },
    tsx: projectInfo.isTypeScript,
    aliases: {
      components: '@/components',
      utils: '@/lib/happly-ui/happly-ui-utils',
      ui: '@/components/happly-ui',
      hooks: '@/hooks',
      lib: '@/lib',
    },
  };
}

function createConfig(
  projectInfo: ReturnType<typeof detectProject> extends Promise<infer T>
    ? T
    : never,
  responses: {
    componentsPath: string;
    utilsPath: string;
  }
): HapplyConfig {
  return {
    $schema:
      'https://cdn.jsdelivr.net/gh/Mindful-Connect/happly-ui-npm@production/schemas/happly-ui-components.json',
    srcDir: projectInfo.isSrcDir,
    tailwind: {
      config: projectInfo.tailwindConfig || 'tailwind.config.ts',
      css:
        projectInfo.tailwindCss ||
        (projectInfo.isSrcDir ? 'src/index.css' : 'index.css'),
    },
    tsx: projectInfo.isTypeScript,
    aliases: {
      components: '@/components',
      utils: `@/${responses.utilsPath.replace(/^(src\/)?/, '')}`,
      ui: `@/${responses.componentsPath.replace(/^(src\/)?/, '')}`,
      hooks: '@/hooks',
      lib: '@/lib',
    },
  };
}
