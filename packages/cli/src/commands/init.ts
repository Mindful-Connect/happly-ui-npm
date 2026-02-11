import prompts from "prompts";
import ora from "ora";
import path from "path";
import { existsSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import { logger } from "../utils/logger.js";
import { detectProject } from "../utils/detect.js";
import {
  isInitialized,
  writeConfig,
  writeComponentFile,
} from "../utils/config.js";
import { installDependencies } from "../utils/install.js";
import { updateTailwindConfig } from "../utils/transformers/tailwind.js";
import { isNonInteractive, getAgentName } from "../utils/env.js";
import type { HapplyConfig, InitOptions, BaseColor } from "../types/index.js";
import { BASE_COLORS, DEFAULT_CONFIG } from "../types/index.js";

const UTILS_TEMPLATE = `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

const UTILS_JS_TEMPLATE = `import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
`;

// Tailwind v3 CSS template
const CSS_TEMPLATE_V3 = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`;

// Tailwind v4 CSS template
const CSS_TEMPLATE_V4 = `@import "tailwindcss";

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }

  * {
    border-color: hsl(var(--border));
  }

  body {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
  }
}
`;

export async function init(options: InitOptions): Promise<void> {
  const cwd = options.cwd || process.cwd();

  // Auto-detect non-interactive environments (AI agents, CI, etc.)
  const nonInteractive = isNonInteractive();
  const agentName = getAgentName();
  const useDefaults = options.defaults || options.yes || nonInteractive;

  logger.break();
  logger.log(logger.bold("HapplyUI") + " - Initialize your project");
  if (agentName) {
    logger.info(`Detected: ${logger.highlight(agentName)} (using defaults)`);
  } else if (nonInteractive && !options.yes) {
    logger.info("Non-interactive mode detected (using defaults)");
  }
  logger.break();

  // Check if already initialized
  if (isInitialized(cwd) && !useDefaults) {
    const { overwrite } = await prompts({
      type: "confirm",
      name: "overwrite",
      message: "Project already initialized. Overwrite existing configuration?",
      initial: false,
    });

    if (!overwrite) {
      logger.info("Initialization cancelled.");
      return;
    }
  }

  // Detect project setup
  const spinner = ora("Detecting project configuration...").start();
  const projectInfo = await detectProject(cwd);
  spinner.succeed("Project detected");

  logger.info(`Framework: ${logger.highlight(projectInfo.framework)}`);
  logger.info(`TypeScript: ${logger.highlight(String(projectInfo.isTypeScript))}`);
  logger.info(`Package Manager: ${logger.highlight(projectInfo.packageManager)}`);
  logger.info(`Tailwind CSS: ${logger.highlight(`v${projectInfo.tailwindVersion}`)}`);
  if (projectInfo.tailwindConfig) {
    logger.info(`Tailwind Config: ${logger.highlight(projectInfo.tailwindConfig)}`);
  }
  logger.break();

  // Interactive prompts
  let config: HapplyConfig;

  if (useDefaults) {
    config = createDefaultConfig(projectInfo);
    // Apply CLI overrides if provided
    if (options.baseColor && BASE_COLORS.includes(options.baseColor)) {
      config.tailwind.baseColor = options.baseColor;
    }
    if (options.cssVariables === false) {
      config.tailwind.cssVariables = false;
    }
  } else {
    const responses = await prompts([
      {
        type: "select",
        name: "baseColor",
        message: "Which base color would you like to use?",
        choices: BASE_COLORS.map((color) => ({
          title: color.charAt(0).toUpperCase() + color.slice(1),
          value: color,
        })),
        initial: 0,
      },
      {
        type: "confirm",
        name: "cssVariables",
        message: "Would you like to use CSS variables for colors?",
        initial: true,
      },
      {
        type: "text",
        name: "componentsPath",
        message: "Where should components be installed?",
        initial: projectInfo.isSrcDir ? "src/components/ui" : "components/ui",
      },
      {
        type: "text",
        name: "utilsPath",
        message: "Where should utils be installed?",
        initial: projectInfo.isSrcDir ? "src/lib/utils" : "lib/utils",
      },
    ]);

    if (!responses.baseColor) {
      logger.error("Initialization cancelled.");
      process.exit(1);
    }

    config = createConfig(projectInfo, responses);
  }

  // Write configuration files
  const writeSpinner = ora("Writing configuration...").start();

  try {
    // Write components.json
    await writeConfig(cwd, config);
    writeSpinner.text = "Created components.json";

    // Write utils file
    const srcPrefix = config.srcDir ? "src/" : "";
    const utilsPath = srcPrefix + config.aliases.utils.replace("@/", "");
    const utilsContent = config.tsx ? UTILS_TEMPLATE : UTILS_JS_TEMPLATE;
    const utilsExt = config.tsx ? ".ts" : ".js";
    await writeComponentFile(cwd, `${utilsPath}${utilsExt}`, utilsContent);
    writeSpinner.text = `Created ${utilsPath}${utilsExt}`;

    // Write/update CSS file if it doesn't exist or is empty
    const cssPath = config.tailwind.css;
    const fullCssPath = path.join(cwd, cssPath);
    const cssTemplate = projectInfo.tailwindVersion === 4 ? CSS_TEMPLATE_V4 : CSS_TEMPLATE_V3;

    if (!existsSync(fullCssPath)) {
      await writeComponentFile(cwd, cssPath, cssTemplate);
      writeSpinner.text = `Created ${cssPath}`;
    } else {
      // Check if CSS already has our variables
      const existingCss = await readFile(fullCssPath, "utf-8");
      if (!existingCss.includes("--background:")) {
        // For v4, we need to handle @import "tailwindcss" differently
        if (projectInfo.tailwindVersion === 4 && existingCss.includes('@import "tailwindcss"')) {
          // Insert our variables after the import
          const updatedCss = existingCss.replace(
            '@import "tailwindcss";',
            cssTemplate
          );
          await writeFile(fullCssPath, updatedCss, "utf-8");
        } else {
          // Check if @tailwind directives exist
          if (existingCss.includes("@tailwind base")) {
            const templateWithoutDirectives = cssTemplate.replace(
              /@tailwind\s+(base|components|utilities);\n?/g,
              ""
            );
            await writeFile(
              fullCssPath,
              existingCss + "\n" + templateWithoutDirectives,
              "utf-8"
            );
          } else {
            // Prepend our CSS variables
            await writeFile(
              fullCssPath,
              cssTemplate + "\n" + existingCss,
              "utf-8"
            );
          }
        }
        writeSpinner.text = `Updated ${cssPath}`;
      }
    }

    // Apply Happly UI Tailwind Configuration (Colors, Typography, etc)
    writeSpinner.text = "Applying Happly UI design tokens...";
    await updateTailwindConfig(cwd, config, projectInfo.tailwindVersion);

    writeSpinner.succeed("Configuration written successfully");
  } catch (error) {
    writeSpinner.fail("Failed to write configuration");
    throw error;
  }

  // Install dependencies
  const installSpinner = ora("Installing dependencies...").start();

  try {
    const deps = ["clsx", "tailwind-merge"];
    await installDependencies(cwd, deps, {
      packageManager: projectInfo.packageManager,
    });

    // Install class-variance-authority for variants
    await installDependencies(cwd, ["class-variance-authority"], {
      packageManager: projectInfo.packageManager,
    });

    installSpinner.succeed("Dependencies installed");
  } catch (error) {
    installSpinner.fail("Failed to install dependencies");
    logger.warn("Please install manually: clsx tailwind-merge class-variance-authority");
  }

  logger.break();
  logger.success("Project initialized successfully!");
  logger.break();
  logger.info("You can now add components:");
  logger.log(`  ${logger.highlight("bunx --bun happlyui add button")}`);
  logger.break();
}

function createDefaultConfig(projectInfo: ReturnType<typeof detectProject> extends Promise<infer T> ? T : never): HapplyConfig {
  const isSrcDir = projectInfo.isSrcDir;

  return {
    $schema: "https://cdn.jsdelivr.net/gh/Mindful-Connect/happly-ui-npm@production/schemas/components.json",
    srcDir: isSrcDir,
    tailwind: {
      config: projectInfo.tailwindConfig || "tailwind.config.ts",
      css: projectInfo.tailwindCss || (isSrcDir ? "src/index.css" : "index.css"),
      baseColor: "slate",
      cssVariables: true,
    },
    tsx: projectInfo.isTypeScript,
    aliases: {
      components: "@/components",
      utils: "@/lib/utils",
      ui: "@/components/ui",
      hooks: "@/hooks",
      lib: "@/lib",
    },
  };
}

function createConfig(
  projectInfo: ReturnType<typeof detectProject> extends Promise<infer T> ? T : never,
  responses: {
    baseColor: BaseColor;
    cssVariables: boolean;
    componentsPath: string;
    utilsPath: string;
  }
): HapplyConfig {
  return {
    $schema: "https://cdn.jsdelivr.net/gh/Mindful-Connect/happly-ui-npm@production/schemas/components.json",
    srcDir: projectInfo.isSrcDir,
    tailwind: {
      config: projectInfo.tailwindConfig || "tailwind.config.ts",
      css: projectInfo.tailwindCss || (projectInfo.isSrcDir ? "src/index.css" : "index.css"),
      baseColor: responses.baseColor,
      cssVariables: responses.cssVariables,
    },
    tsx: projectInfo.isTypeScript,
    aliases: {
      components: "@/components",
      utils: `@/${responses.utilsPath.replace(/^(src\/)?/, "")}`,
      ui: `@/${responses.componentsPath.replace(/^(src\/)?/, "")}`,
      hooks: "@/hooks",
      lib: "@/lib",
    },
  };
}
