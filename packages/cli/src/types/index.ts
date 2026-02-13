/**
 * HapplyUI CLI Types
 */

// Config file schema (components.json)
export interface HapplyConfig {
  $schema: string;
  srcDir: boolean;
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
export type BaseColor = 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone';

// Registry item types
export type RegistryItemType =
  | 'registry:ui'
  | 'registry:hook'
  | 'registry:lib'
  | 'registry:component'
  | 'registry:block';

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

// Tailwind version
export type TailwindVersion = 3 | 4;

// Project detection result
export interface ProjectInfo {
  isTypeScript: boolean;
  isSrcDir: boolean;
  tailwindConfig: string | null;
  tailwindCss: string | null;
  tailwindVersion: TailwindVersion;
  packageManager: 'bun' | 'npm' | 'pnpm' | 'yarn';
  aliases: Record<string, string>;
  framework: 'next' | 'vite' | 'remix' | 'astro' | 'unknown';
}

// CLI options
export interface InitOptions {
  cwd?: string;
  yes?: boolean;
  defaults?: boolean;
  baseColor?: BaseColor;
  cssVariables?: boolean;
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
  'https://raw.githubusercontent.com/Mindful-Connect/happly-ui-npm/production/packages/registry';

export const CONFIG_FILE = 'happly-ui-components.json';

export const DEFAULT_CONFIG: Partial<HapplyConfig> = {
  $schema:
    'https://cdn.jsdelivr.net/gh/Mindful-Connect/happly-ui-npm@production/schemas/components.json',
  srcDir: true,
  tailwind: {
    config: 'tailwind.config.ts',
    css: 'src/index.css',
    baseColor: 'slate',
    cssVariables: true,
  },
  tsx: true,
  aliases: {
    components: '@/components',
    utils: '@/lib/happly-ui-utils',
    ui: '@/components/happly-ui',
    hooks: '@/hooks',
    lib: '@/lib',
  },
};

export const BASE_COLORS: BaseColor[] = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
];
