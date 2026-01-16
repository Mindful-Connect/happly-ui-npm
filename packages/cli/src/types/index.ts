/**
 * HapplyUI CLI Types
 */

// Config file schema (components.json)
export interface HapplyConfig {
  $schema: string;
  tailwind: {
    config: string;
    css: string;
    baseColor: BaseColor;
    cssVariables: boolean;
    prefix?: string;
  };
  tsx: boolean;
  aliases: {
    components: string;
    utils: string;
    ui: string;
    hooks?: string;
    lib?: string;
  };
  registry?: string;
}

// Base colors available
export type BaseColor = "slate" | "gray" | "zinc" | "neutral" | "stone";

// Registry item types
export type RegistryItemType =
  | "registry:ui"
  | "registry:hook"
  | "registry:lib"
  | "registry:component"
  | "registry:block";

// Registry item file
export interface RegistryItemFile {
  path: string;
  content: string;
  type: RegistryItemType;
  target?: string;
}

// Registry item definition
export interface RegistryItem {
  $schema?: string;
  name: string;
  type: RegistryItemType;
  title?: string;
  description?: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: RegistryItemFile[];
  cssVars?: {
    light?: Record<string, string>;
    dark?: Record<string, string>;
  };
  tailwind?: {
    config?: Record<string, unknown>;
  };
}

// Registry index
export interface RegistryIndex {
  $schema?: string;
  name: string;
  homepage?: string;
  items: RegistryIndexItem[];
}

export interface RegistryIndexItem {
  name: string;
  type: RegistryItemType;
  title?: string;
  description?: string;
  dependencies?: string[];
  registryDependencies?: string[];
}

// Project detection result
export interface ProjectInfo {
  isTypeScript: boolean;
  isSrcDir: boolean;
  tailwindConfig: string | null;
  tailwindCss: string | null;
  packageManager: "bun" | "npm" | "pnpm" | "yarn";
  aliases: Record<string, string>;
  framework: "next" | "vite" | "remix" | "astro" | "unknown";
}

// CLI options
export interface InitOptions {
  cwd?: string;
  yes?: boolean;
  defaults?: boolean;
}

export interface AddOptions {
  cwd?: string;
  yes?: boolean;
  overwrite?: boolean;
  all?: boolean;
  path?: string;
}

// Constants
export const REGISTRY_URL =
  "https://raw.githubusercontent.com/Mindful-Connect/happly-ui-npm/production/packages/registry";

export const CONFIG_FILE = "components.json";

export const DEFAULT_CONFIG: Partial<HapplyConfig> = {
  $schema: "https://happly.cloud/schema.json",
  tailwind: {
    config: "tailwind.config.ts",
    css: "src/index.css",
    baseColor: "slate",
    cssVariables: true,
  },
  tsx: true,
  aliases: {
    components: "@/components",
    utils: "@/lib/utils",
    ui: "@/components/ui",
    hooks: "@/hooks",
    lib: "@/lib",
  },
};

export const BASE_COLORS: BaseColor[] = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
];
