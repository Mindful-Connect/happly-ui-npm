import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import prompts from 'prompts';
import ora from 'ora';
import path from 'path';
import { logger } from '../utils/logger.js';
import {
  isInitialized,
  readConfig,
  getComponentPath,
  writeComponentFile,
} from '../utils/config.js';
import { componentExists } from '../utils/detect.js';
import {
  fetchRegistryItems,
  getAvailableComponents,
  collectDependencies,
} from '../utils/registry.js';
import { transformComponent } from '../utils/transform.js';
import { installDependencies } from '../utils/install.js';
import { updateTailwindConfig } from '../utils/transformers/tailwind.js';
import { detectProject } from '../utils/detect.js';
import type { AddOptions, HapplyConfig, RegistryItem } from '../types/index.js';

export async function add(
  components: string[],
  options: AddOptions
): Promise<void> {
  const cwd = options.cwd || process.cwd();

  // Check if initialized
  if (!isInitialized(cwd)) {
    logger.error(
      'Project not initialized. Run ' +
        logger.highlight('bunx --bun happlyui init') +
        ' first.'
    );
    process.exit(1);
  }

  // Read config
  const config = await readConfig(cwd);
  if (!config) {
    logger.error('Failed to read configuration. Please run init again.');
    process.exit(1);
  }

  // Get project info for package manager
  const projectInfo = await detectProject(cwd);

  // If --all flag, get all components
  if (options.all) {
    const spinner = ora('Fetching available components...').start();
    try {
      components = await getAvailableComponents(config);
      spinner.succeed(`Found ${components.length} components`);
    } catch (_error) {
      spinner.fail('Failed to fetch components list');
      throw _error;
    }
  }

  // If no components specified, show selection
  if (components.length === 0) {
    const spinner = ora('Fetching available components...').start();
    try {
      const available = await getAvailableComponents(config);
      spinner.stop();

      const { selected } = await prompts({
        type: 'multiselect',
        name: 'selected',
        message: 'Which components would you like to add?',
        choices: available.map((name) => ({
          title: name,
          value: name,
        })),
        hint: '- Space to select. Enter to submit.',
      });

      if (!selected || selected.length === 0) {
        logger.info('No components selected.');
        return;
      }

      components = selected;
    } catch (_error) {
      spinner.fail('Failed to fetch components');
      throw _error;
    }
  }

  logger.break();
  logger.log(logger.bold('Adding components: ') + components.join(', '));
  logger.break();

  // Fetch components from registry
  const fetchSpinner = ora('Fetching components from registry...').start();
  let items: RegistryItem[];

  try {
    items = await fetchRegistryItems(components, config);
    fetchSpinner.succeed(
      `Fetched ${items.length} component${items.length > 1 ? 's' : ''}`
    );
  } catch (error) {
    fetchSpinner.fail('Failed to fetch components');
    if (error instanceof Error) {
      logger.error(error.message);
    }
    process.exit(1);
  }

  // Check for existing files — only prompt for explicitly requested components,
  // silently skip dependency files (e.g. happly-ui-utils) that already exist
  const requestedNames = new Set(components);
  const existingFiles: string[] = [];
  const skippableDeps = new Set<string>();

  for (const item of items) {
    const isExplicit = requestedNames.has(item.name);

    for (const file of item.files) {
      const fileType = file.type || item.type;

      let fileName = path.basename(file.path);
      if (fileType === 'registry:lib') {
        if (file.path.startsWith('lib/')) {
          fileName = file.path.substring(4);
        }
      }

      const targetPath = getComponentPath(
        item.name,
        fileType,
        config,
        fileName
      );

      if (componentExists(cwd, targetPath)) {
        if (isExplicit) {
          existingFiles.push(targetPath);
        } else {
          // Auto-resolved dependency that already exists — skip silently
          skippableDeps.add(targetPath);
        }
      }
    }
  }

  // Prompt for overwrite only for explicitly requested components
  if (existingFiles.length > 0 && !options.overwrite && !options.yes) {
    logger.warn('The following files already exist:');
    existingFiles.forEach((f) => logger.log(`  ${f}`));
    logger.break();

    const { overwrite } = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: 'Would you like to overwrite these files?',
      initial: false,
    });

    if (!overwrite) {
      logger.info('Installation cancelled.');
      return;
    }
  }

  // Write component files
  const writeSpinner = ora('Installing components...').start();
  const writtenFiles: string[] = [];

  try {
    for (const item of items) {
      for (const file of item.files) {
        const fileType = file.type || item.type;

        let fileName = path.basename(file.path);
        if (fileType === 'registry:lib') {
          if (file.path.startsWith('lib/')) {
            fileName = file.path.substring(4);
          }
        }

        const targetPath = getComponentPath(
          item.name,
          fileType,
          config,
          fileName
        );

        // Skip dependency files that already exist
        if (skippableDeps.has(targetPath)) continue;

        const transformedContent = transformComponent(file, config);
        await writeComponentFile(cwd, targetPath, transformedContent);
        writtenFiles.push(targetPath);
      }
    }
    writeSpinner.succeed(`Installed ${writtenFiles.length} files`);
  } catch (error) {
    writeSpinner.fail('Failed to install components');
    throw error;
  }

  // Auto-import any style files into the project's CSS
  const styleFiles = writtenFiles.filter((f) => f.endsWith('.css'));
  if (styleFiles.length > 0) {
    await injectStyleImports(cwd, config, styleFiles);
  }

  // Collect and install dependencies
  const { dependencies, devDependencies } = collectDependencies(items);

  if (dependencies.length > 0) {
    const depsSpinner = ora('Installing dependencies...').start();
    try {
      await installDependencies(cwd, dependencies, {
        packageManager: projectInfo.packageManager,
      });
      depsSpinner.succeed(`Installed: ${dependencies.join(', ')}`);
    } catch {
      depsSpinner.fail('Failed to install dependencies');
      logger.warn(`Please install manually: ${dependencies.join(' ')}`);
    }
  }

  if (devDependencies.length > 0) {
    const devDepsSpinner = ora('Installing dev dependencies...').start();
    try {
      await installDependencies(cwd, devDependencies, {
        packageManager: projectInfo.packageManager,
        dev: true,
      });
      devDepsSpinner.succeed(`Installed dev: ${devDependencies.join(', ')}`);
    } catch {
      devDepsSpinner.fail('Failed to install dev dependencies');
      logger.warn(`Please install manually: ${devDependencies.join(' ')}`);
    }
  }

  // Apply Happly UI Tailwind Configuration
  const spinner = ora('Updating Tailwind configuration...').start();
  try {
    await updateTailwindConfig(cwd, config, projectInfo.tailwindVersion);
    spinner.succeed('Tailwind configuration updated');
  } catch {
    spinner.fail('Failed to update Tailwind configuration');
    // Don't fail the whole process if tailwind update fails, just warn
    logger.warn(
      'Please ensure your tailwind.config.ts includes Happly UI tokens.'
    );
  }

  // Success message
  logger.break();
  logger.success('Components installed successfully!');
  logger.break();

  // Show usage example
  if (items.length === 1) {
    const item = items[0];
    const importPath = config.aliases.ui;
    logger.info('Usage:');
    logger.log(
      logger.dim(
        `  import { ${pascalCase(item.name)} } from "${importPath}/${item.name}"`
      )
    );
    logger.break();
  } else {
    logger.info('Components added:');
    for (const file of writtenFiles) {
      logger.log(`  ${logger.green('+')} ${file}`);
    }
    logger.break();
  }
}

/**
 * Convert kebab-case to PascalCase
 */
function pascalCase(str: string): string {
  return str
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * Inject @import statements for component CSS files into the project's
 * main CSS file (config.tailwind.css). Skips if already imported.
 */
async function injectStyleImports(
  cwd: string,
  config: HapplyConfig,
  styleFiles: string[]
): Promise<void> {
  const cssPath = path.join(cwd, config.tailwind.css);
  if (!existsSync(cssPath)) return;

  let css = await readFile(cssPath, 'utf-8');
  let added = false;

  for (const styleFile of styleFiles) {
    // Build a relative path from the CSS file to the style file
    const cssDir = path.dirname(cssPath);
    let rel = path.relative(cssDir, path.join(cwd, styleFile));
    // Normalise to posix separators for CSS @import
    rel = rel.split(path.sep).join('/');
    if (!rel.startsWith('.')) rel = './' + rel;

    // Skip if already imported
    if (css.includes(rel)) continue;

    // Insert the @import after the last existing @import line
    const importStatement = `@import '${rel}';`;
    const lines = css.split('\n');
    let lastImportIndex = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trimStart().startsWith('@import ')) {
        lastImportIndex = i;
      }
    }

    if (lastImportIndex >= 0) {
      lines.splice(lastImportIndex + 1, 0, importStatement);
    } else {
      // No existing imports — prepend
      lines.unshift(importStatement);
    }

    css = lines.join('\n');
    added = true;
  }

  if (added) {
    await writeFile(cssPath, css, 'utf-8');
    logger.info(
      `Added style import${styleFiles.length > 1 ? 's' : ''} to ${config.tailwind.css}`
    );
  }
}
