import type { HapplyConfig, RegistryItemFile } from '../types/index.js';

/**
 * Transform registry component code for the target project
 */
export function transformComponent(
  file: RegistryItemFile,
  config: HapplyConfig
): string {
  let content = file.content;

  // CSS files don't need import or TS transforms
  if (file.type === 'registry:style' || file.path.endsWith('.css')) {
    return content;
  }

  // Transform import paths based on aliases
  content = transformImports(content, config);

  // Transform file extension if needed (tsx -> jsx)
  if (!config.tsx) {
    content = transformToJs(content);
  }

  return content;
}

/**
 * Transform import paths to use project aliases
 */
function transformImports(content: string, config: HapplyConfig): string {
  // Map of registry paths to project aliases
  const pathMappings: Record<string, string> = {
    '@/components/ui': config.aliases.ui,
    '@/components': config.aliases.components,
    '@/lib/utils': config.aliases.utils,
    '@/lib/happly-ui-utils': config.aliases.utils,
    '@/lib': (config.aliases.lib || '@/lib') + '/happly-ui',
    '@/hooks': config.aliases.hooks || '@/hooks',
  };

  // Sort keys by length descending to match longest specifically first
  const keys = Object.keys(pathMappings).sort((a, b) => b.length - a.length);

  return content.replace(
    /((?:from|import)\s+["'])([^"']*)(["'])/g,
    (match, prefix, path, suffix) => {
      // Check if path starts with any key
      for (const key of keys) {
        if (path === key || path.startsWith(key + '/')) {
          const to = pathMappings[key];
          const newPath = path.replace(key, to);
          return `${prefix}${newPath}${suffix}`;
        }
      }
      return match;
    }
  );
}

/**
 * Remove TypeScript types for JavaScript projects
 */
function transformToJs(content: string): string {
  // Remove type imports
  content = content.replace(
    /import\s+type\s*\{[^}]*\}\s*from\s*['"][^'"]+['"];?\n?/g,
    ''
  );

  // Remove type annotations from function parameters
  content = content.replace(/:\s*\w+(\[\])?\s*(?=[,)])/g, '');

  // Remove return type annotations
  content = content.replace(/\):\s*\w+(\[\])?\s*(?=\s*[{=])/g, ')');

  // Remove generic type parameters
  content = content.replace(/<[A-Z]\w*(\s*extends\s*[^>]+)?>/g, '');

  // Remove interface/type declarations
  content = content.replace(
    /^(export\s+)?(interface|type)\s+\w+\s*[^{]*\{[^}]*\};?\n?/gm,
    ''
  );

  // Remove 'as' type assertions
  content = content.replace(/\s+as\s+\w+(\[\])?/g, '');

  return content;
}

/**
 * Transform CSS variables based on config.
 * HapplyUI always uses CSS variables — this is a passthrough.
 */
export function transformCssVars(css: string, _config: HapplyConfig): string {
  return css;
}

/**
 * Add "use client" directive if needed
 */
export function addUseClient(content: string, shouldAdd: boolean): string {
  if (!shouldAdd) return content;

  const hasUseClient =
    content.includes('"use client"') || content.includes("'use client'");
  if (hasUseClient) return content;

  return `"use client";\n\n${content}`;
}

/**
 * Transform component for RSC (React Server Components)
 */
export function transformForRsc(
  content: string,
  isClientComponent: boolean
): string {
  if (isClientComponent) {
    return addUseClient(content, true);
  }
  return content;
}
