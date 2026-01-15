import { existsSync } from "fs";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { cosmiconfig } from "cosmiconfig";
import type { HapplyConfig } from "../types/index.js";
import { CONFIG_FILE } from "../types/index.js";

const explorer = cosmiconfig("happly", {
  searchPlaces: [CONFIG_FILE, "happly.config.js", "happly.config.ts"],
});

/**
 * Check if project is initialized (has components.json)
 */
export function isInitialized(cwd: string): boolean {
  return existsSync(path.join(cwd, CONFIG_FILE));
}

/**
 * Read the config file
 */
export async function readConfig(cwd: string): Promise<HapplyConfig | null> {
  try {
    const result = await explorer.search(cwd);
    if (result?.config) {
      return result.config as HapplyConfig;
    }

    // Fallback: try reading components.json directly
    const configPath = path.join(cwd, CONFIG_FILE);
    if (existsSync(configPath)) {
      const content = await readFile(configPath, "utf-8");
      return JSON.parse(content);
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Write the config file
 */
export async function writeConfig(
  cwd: string,
  config: HapplyConfig
): Promise<void> {
  const configPath = path.join(cwd, CONFIG_FILE);
  await writeFile(configPath, JSON.stringify(config, null, 2) + "\n", "utf-8");
}

/**
 * Resolve alias to actual path
 */
export function resolveAlias(alias: string, config: HapplyConfig): string {
  const aliases: Record<string, string> = {
    "@/components": config.aliases.components,
    "@/lib": config.aliases.lib || "@/lib",
    "@/hooks": config.aliases.hooks || "@/hooks",
    "@/components/ui": config.aliases.ui,
  };

  for (const [key, value] of Object.entries(aliases)) {
    if (alias.startsWith(key)) {
      return alias.replace(key, value);
    }
  }

  return alias;
}

/**
 * Get the target path for a component
 */
export function getComponentPath(
  componentName: string,
  componentType: string,
  config: HapplyConfig
): string {
  const ext = config.tsx ? ".tsx" : ".jsx";

  switch (componentType) {
    case "registry:ui":
    case "registry:component":
      return path.join(
        config.aliases.ui.replace("@/", ""),
        `${componentName}${ext}`
      );
    case "registry:hook":
      return path.join(
        (config.aliases.hooks || "@/hooks").replace("@/", ""),
        `${componentName}${ext}`
      );
    case "registry:lib":
      return path.join(
        (config.aliases.lib || "@/lib").replace("@/", ""),
        `${componentName}${ext}`
      );
    default:
      return path.join(
        config.aliases.ui.replace("@/", ""),
        `${componentName}${ext}`
      );
  }
}

/**
 * Ensure directory exists
 */
export async function ensureDir(dirPath: string): Promise<void> {
  if (!existsSync(dirPath)) {
    await mkdir(dirPath, { recursive: true });
  }
}

/**
 * Write a file, creating directories if needed
 */
export async function writeComponentFile(
  cwd: string,
  relativePath: string,
  content: string
): Promise<void> {
  const fullPath = path.join(cwd, relativePath);
  const dir = path.dirname(fullPath);
  await ensureDir(dir);
  await writeFile(fullPath, content, "utf-8");
}
