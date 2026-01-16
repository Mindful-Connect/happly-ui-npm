#!/usr/bin/env node
import { Command } from "commander";
import { createRequire } from "module";
import { init } from "./commands/init.js";
import { add } from "./commands/add.js";
import pc from "picocolors";

const require = createRequire(import.meta.url);
const { version } = require("../package.json");

const program = new Command();

program
  .name("happlyui")
  .description("Add HapplyUI components to your project")
  .version(version);

program
  .command("init")
  .description("Initialize your project with HapplyUI")
  .option("-c, --cwd <path>", "Working directory", process.cwd())
  .option("-y, --yes", "Skip prompts and use defaults")
  .option("--defaults", "Use default configuration")
  .option("--base-color <color>", "Base color theme (slate, gray, zinc, neutral, stone)")
  .option("--no-css-variables", "Disable CSS variables for colors")
  .action(init);

program
  .command("add")
  .description("Add components to your project")
  .argument("[components...]", "Components to add")
  .option("-c, --cwd <path>", "Working directory", process.cwd())
  .option("-y, --yes", "Skip prompts")
  .option("-o, --overwrite", "Overwrite existing files")
  .option("-a, --all", "Add all available components")
  .option("-p, --path <path>", "Custom path for components")
  .action(add);

program
  .command("list")
  .description("List all available components")
  .option("-c, --cwd <path>", "Working directory", process.cwd())
  .action(async (options: { cwd: string }) => {
    const { getAvailableComponents } = await import("./utils/registry.js");
    const { readConfig } = await import("./utils/config.js");
    try {
      const config = await readConfig(options.cwd);
      const components = await getAvailableComponents(config || undefined);
      console.log(pc.bold("\nAvailable components:\n"));
      components.forEach((c) => console.log(`  ${pc.cyan("•")} ${c}`));
      console.log("");
    } catch (error) {
      console.log(pc.red("Failed to fetch components list"));
      if (error instanceof Error) {
        console.log(pc.dim(error.message));
      }
    }
  });

program.parse();
