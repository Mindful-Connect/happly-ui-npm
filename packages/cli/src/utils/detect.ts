import { existsSync } from "fs";
import { readFile } from "fs/promises";
import path from "path";
import fg from "fast-glob";
import type { ProjectInfo } from "../types/index.js";

/**
 * Detect project configuration
 */
export async function detectProject(cwd: string): Promise<ProjectInfo> {
  const info: ProjectInfo = {
    isTypeScript: false,
    isSrcDir: false,
    tailwindConfig: null,
    tailwindCss: null,
    packageManager: "bun",
    aliases: {},
    framework: "unknown",
  };

  // Detect TypeScript
  info.isTypeScript = existsSync(path.join(cwd, "tsconfig.json"));

  // Detect src directory
  info.isSrcDir = existsSync(path.join(cwd, "src"));

  // Detect package manager
  info.packageManager = await detectPackageManager(cwd);

  // Detect Tailwind config
  info.tailwindConfig = await detectTailwindConfig(cwd);

  // Detect Tailwind CSS file
  info.tailwindCss = await detectTailwindCss(cwd);

  // Detect framework
  info.framework = await detectFramework(cwd);

  // Detect aliases from tsconfig
  if (info.isTypeScript) {
    info.aliases = await detectAliases(cwd);
  }

  return info;
}

/**
 * Detect package manager from lock files
 */
async function detectPackageManager(
  cwd: string
): Promise<"bun" | "npm" | "pnpm" | "yarn"> {
  if (existsSync(path.join(cwd, "bun.lockb"))) return "bun";
  if (existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  return "npm";
}

/**
 * Detect Tailwind config file
 */
async function detectTailwindConfig(cwd: string): Promise<string | null> {
  const configFiles = [
    "tailwind.config.ts",
    "tailwind.config.js",
    "tailwind.config.mjs",
    "tailwind.config.cjs",
  ];

  for (const file of configFiles) {
    if (existsSync(path.join(cwd, file))) {
      return file;
    }
  }

  return null;
}

/**
 * Detect Tailwind CSS entry file
 */
async function detectTailwindCss(cwd: string): Promise<string | null> {
  const patterns = [
    "src/index.css",
    "src/globals.css",
    "src/app/globals.css",
    "app/globals.css",
    "styles/globals.css",
    "src/styles/globals.css",
  ];

  for (const pattern of patterns) {
    const fullPath = path.join(cwd, pattern);
    if (existsSync(fullPath)) {
      // Check if it contains Tailwind directives
      const content = await readFile(fullPath, "utf-8");
      if (
        content.includes("@tailwind") ||
        content.includes("@import") ||
        content.includes("@config")
      ) {
        return pattern;
      }
    }
  }

  // Fallback: search for any CSS with Tailwind directives
  const cssFiles = await fg(["**/*.css"], {
    cwd,
    ignore: ["node_modules/**", "dist/**", ".next/**"],
    absolute: false,
  });

  for (const file of cssFiles) {
    const content = await readFile(path.join(cwd, file), "utf-8");
    if (content.includes("@tailwind") || content.includes("@config")) {
      return file;
    }
  }

  return null;
}

/**
 * Detect framework from package.json and config files
 */
async function detectFramework(
  cwd: string
): Promise<"next" | "vite" | "remix" | "astro" | "unknown"> {
  // Check for framework config files
  if (existsSync(path.join(cwd, "next.config.js")) ||
      existsSync(path.join(cwd, "next.config.ts")) ||
      existsSync(path.join(cwd, "next.config.mjs"))) {
    return "next";
  }
  if (existsSync(path.join(cwd, "vite.config.ts")) ||
      existsSync(path.join(cwd, "vite.config.js"))) {
    return "vite";
  }
  if (existsSync(path.join(cwd, "remix.config.js")) ||
      existsSync(path.join(cwd, "remix.config.ts"))) {
    return "remix";
  }
  if (existsSync(path.join(cwd, "astro.config.mjs")) ||
      existsSync(path.join(cwd, "astro.config.ts"))) {
    return "astro";
  }

  // Check package.json dependencies
  try {
    const pkgPath = path.join(cwd, "package.json");
    if (existsSync(pkgPath)) {
      const pkg = JSON.parse(await readFile(pkgPath, "utf-8"));
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };

      if (deps["next"]) return "next";
      if (deps["vite"]) return "vite";
      if (deps["@remix-run/react"]) return "remix";
      if (deps["astro"]) return "astro";
    }
  } catch {
    // Ignore errors
  }

  return "unknown";
}

/**
 * Detect path aliases from tsconfig.json
 */
async function detectAliases(cwd: string): Promise<Record<string, string>> {
  const aliases: Record<string, string> = {};

  try {
    const tsconfigPath = path.join(cwd, "tsconfig.json");
    if (!existsSync(tsconfigPath)) return aliases;

    const content = await readFile(tsconfigPath, "utf-8");
    // Remove comments from JSON
    const jsonContent = content.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "");
    const tsconfig = JSON.parse(jsonContent);

    const paths = tsconfig.compilerOptions?.paths || {};
    const baseUrl = tsconfig.compilerOptions?.baseUrl || ".";

    for (const [alias, targets] of Object.entries(paths)) {
      if (Array.isArray(targets) && targets.length > 0) {
        // Convert @/* to @/
        const cleanAlias = alias.replace("/*", "");
        const cleanTarget = (targets[0] as string).replace("/*", "");
        aliases[cleanAlias] = path.join(baseUrl, cleanTarget);
      }
    }
  } catch {
    // Ignore errors
  }

  return aliases;
}

/**
 * Check if a component already exists
 */
export function componentExists(cwd: string, componentPath: string): boolean {
  return existsSync(path.join(cwd, componentPath));
}
