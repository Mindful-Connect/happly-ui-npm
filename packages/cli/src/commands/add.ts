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
import type { AddOptions, RegistryItem } from '../types/index.js';

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
    } catch (error) {
      spinner.fail('Failed to fetch components list');
      throw error;
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
    } catch (error) {
      spinner.fail('Failed to fetch components');
      throw error;
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

  // Check for existing files
  const existingFiles: string[] = [];
  for (const item of items) {
    for (const file of item.files) {
      // Use the file's type if available, otherwise fallback to item's type
      const fileType = file.type || item.type;

      // Extract filename from path (e.g. "lib/utils.ts" -> "utils.ts")
      const fileName = path.basename(file.path);

      const targetPath = getComponentPath(
        item.name,
        fileType,
        config,
        fileName
      );
      if (componentExists(cwd, targetPath)) {
        existingFiles.push(targetPath);
      }
    }
  }

  // Prompt for overwrite if files exist
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
        // Use the file's type if available, otherwise fallback to item's type
        const fileType = file.type || item.type;

        // Extract filename from path (e.g. "lib/utils.ts" -> "utils.ts")
        const fileName = path.basename(file.path);

        const targetPath = getComponentPath(
          item.name,
          fileType,
          config,
          fileName
        );
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

  // Collect and install dependencies
  const { dependencies, devDependencies } = collectDependencies(items);

  if (dependencies.length > 0) {
    const depsSpinner = ora('Installing dependencies...').start();
    try {
      await installDependencies(cwd, dependencies, {
        packageManager: projectInfo.packageManager,
      });
      depsSpinner.succeed(`Installed: ${dependencies.join(', ')}`);
    } catch (error) {
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
    } catch (error) {
      devDepsSpinner.fail('Failed to install dev dependencies');
      logger.warn(`Please install manually: ${devDependencies.join(' ')}`);
    }
  }

  // Apply Happly UI Tailwind Configuration
  const spinner = ora('Updating Tailwind configuration...').start();
  try {
    await updateTailwindConfig(cwd, config, projectInfo.tailwindVersion);
    spinner.succeed('Tailwind configuration updated');
  } catch (error) {
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
