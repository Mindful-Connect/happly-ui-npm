import type { HapplyConfig, RegistryItemFile } from "../types/index.js";

/**
 * Transform registry component code for the target project
 */
export function transformComponent(
  file: RegistryItemFile,
  config: HapplyConfig
): string {
  let content = file.content;

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
    "@/components/ui": config.aliases.ui,
    "@/components": config.aliases.components,
    "@/lib/utils": config.aliases.utils,
    "@/lib": config.aliases.lib || "@/lib",
    "@/hooks": config.aliases.hooks || "@/hooks",
  };

  let result = content;

  // Replace import paths
  for (const [from, to] of Object.entries(pathMappings)) {
    // Match both single and double quotes
    const patterns = [
      new RegExp(`from ["']${escapeRegex(from)}(/[^"']*)?["']`, "g"),
      new RegExp(`import ["']${escapeRegex(from)}(/[^"']*)?["']`, "g"),
    ];

    for (const pattern of patterns) {
      result = result.replace(pattern, (match) => {
        return match.replace(from, to);
      });
    }
  }

  return result;
}

/**
 * Remove TypeScript types for JavaScript projects
 */
function transformToJs(content: string): string {
  // Remove type imports
  content = content.replace(
    /import\s+type\s*\{[^}]*\}\s*from\s*['"][^'"]+['"];?\n?/g,
    ""
  );

  // Remove type annotations from function parameters
  content = content.replace(/:\s*\w+(\[\])?\s*(?=[,)])/g, "");

  // Remove return type annotations
  content = content.replace(/\):\s*\w+(\[\])?\s*(?=\s*[{=])/g, ")");

  // Remove generic type parameters
  content = content.replace(/<[A-Z]\w*(\s*extends\s*[^>]+)?>/g, "");

  // Remove interface/type declarations
  content = content.replace(
    /^(export\s+)?(interface|type)\s+\w+\s*[^{]*\{[^}]*\};?\n?/gm,
    ""
  );

  // Remove 'as' type assertions
  content = content.replace(/\s+as\s+\w+(\[\])?/g, "");

  return content;
}

/**
 * Escape special regex characters
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Transform CSS variables based on config
 */
export function transformCssVars(
  css: string,
  config: HapplyConfig
): string {
  if (!config.tailwind.cssVariables) {
    return css;
  }

  // CSS variable mappings would be applied here
  // For now, return as-is since we're using CSS variables by default
  return css;
}

/**
 * Add "use client" directive if needed
 */
export function addUseClient(content: string, shouldAdd: boolean): string {
  if (!shouldAdd) return content;

  const hasUseClient = content.includes('"use client"') || content.includes("'use client'");
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
