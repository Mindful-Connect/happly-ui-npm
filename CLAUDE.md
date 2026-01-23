# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HapplyUI is a copy-paste React component registry (not a library) inspired by shadcn/ui. Components are distributed via GitHub raw files and installed directly into user projects. Users own the code and can customize it.

## Build & Development Commands

```bash
# Build all packages
bun run build

# Build CLI only
bun run --cwd packages/cli build

# Run CLI in development
bun run --cwd packages/cli dev

# Type check CLI
bun run --cwd packages/cli typecheck

# Clean build artifacts
bun run clean

# Test CLI locally after building
bun packages/cli/dist/index.js init
bun packages/cli/dist/index.js add button
bun packages/cli/dist/index.js list
```

## Architecture

### Monorepo Structure
- **packages/cli** - CLI tool published as `@happlyui/cli`
- **packages/registry** - Component source files and JSON definitions
- **docs** - Documentation site (Next.js, auto-deployed to GitHub Pages)
- **schemas** - JSON Schema files for IDE validation (hosted via jsDelivr CDN)

### CLI Flow
```
User runs CLI command
    ↓
Project Detection (framework, package manager, TypeScript, Tailwind)
    ↓
Config Creation (components.json)
    ↓
Registry Fetch (GitHub raw or custom URL)
    ↓
Dependency Resolution (recursive registryDependencies)
    ↓
Component Transformation (path aliases, TS→JS if needed)
    ↓
File Writing & npm Install
```

### Registry System
Each component has two files:
- **Source file** (`ui/button.tsx`) - The actual React component
- **Definition file** (`ui/button.json`) - Metadata with dependencies and inline content

The `registry.json` index lists all available components with their npm and registry dependencies.

## Key Modules

| Module | Location | Purpose |
|--------|----------|---------|
| Entry | `cli/src/index.ts` | Commander.js CLI setup |
| Init | `cli/src/commands/init.ts` | Project initialization |
| Add | `cli/src/commands/add.ts` | Component installation |
| Detect | `cli/src/utils/detect.ts` | Project config detection |
| Registry | `cli/src/utils/registry.ts` | Fetch & resolve dependencies |
| Transform | `cli/src/utils/transform.ts` | Path alias & TS→JS transforms |
| Config | `cli/src/utils/config.ts` | Read/write components.json |
| Install | `cli/src/utils/install.ts` | Package manager abstraction |

## Key Types (cli/src/types/index.ts)

- **HapplyConfig** - User's components.json configuration
- **RegistryItem** - Component definition with files, dependencies
- **RegistryItemType** - `"registry:ui" | "registry:hook" | "registry:lib"`
- **ProjectInfo** - Detected project setup (framework, package manager, etc.)

## Adding a New Component

1. Create source file: `packages/registry/ui/my-component.tsx`
2. Create definition: `packages/registry/ui/my-component.json` with inline content and `docs` field
3. Add entry to `packages/registry/registry.json`
4. Merge to `production` branch - docs auto-deploy via GitHub Actions

### Component JSON Structure

```json
{
  "$schema": "https://cdn.jsdelivr.net/gh/Mindful-Connect/happly-ui-npm@production/schemas/registry-item.json",
  "name": "my-component",
  "type": "registry:ui",
  "title": "My Component",
  "description": "Description for CLI listing",
  "dependencies": ["npm-package"],
  "registryDependencies": ["tv", "utils"],
  "docs": {
    "lead": "Lead paragraph for docs page",
    "usage": "import * as MyComponent from \"@/components/ui/my-component\"\n\n<MyComponent.Root />",
    "examples": [
      {
        "title": "Example Title",
        "description": "Example description",
        "code": "<MyComponent.Root variant=\"default\" />",
        "preview": [
          { "component": "my-component", "props": { "variant": "default" } }
        ]
      }
    ],
    "api": [
      {
        "name": "MyComponent.Root",
        "description": "The main component",
        "props": [
          { "name": "variant", "type": "'default' | 'alt'", "default": "'default'", "description": "The variant" }
        ]
      }
    ]
  },
  "files": [
    {
      "path": "ui/my-component.tsx",
      "type": "registry:ui",
      "content": "// inline source code"
    }
  ]
}
```

### Preview Components

Available preview components for the `docs.examples[].preview` field:
- `button` - DemoButton with variant, mode, size props
- `badge` - DemoBadge with variant prop
- `input` - DemoInput with placeholder, disabled props
- `label` - DemoLabel
- `card` - DemoCard with title, description props
- `divider` - DemoDivider with variant prop

To add a new preview component, update `docs/src/components/ComponentPreview.tsx` and `docs/src/lib/registry.ts`.

## Component Conventions

- Use Radix UI primitives for accessibility
- Use `cva` (class-variance-authority) for variants
- Use `cn()` utility for class merging
- Always use `@/lib/utils` import path (transformed at install time)
- Export both component and variants config

## Release Workflow

**IMPORTANT: Never create GitHub tags/releases or bump npm versions without explicit user permission.**

- Make code changes and commit them normally
- Continue working on features/fixes across multiple commits
- Only when the user explicitly asks, then:
  1. Bump version in packages/cli/package.json
  2. Rebuild CLI
  3. Create GitHub tag/release
  4. Publish to npm

Do NOT auto-release after every commit.

## Publishing

```bash
# Bump version in packages/cli/package.json
# Rebuild CLI
bun run --cwd packages/cli build

# Publish (requires npm login with OTP)
npm publish --access public packages/cli
```

## Documentation Site

- **URL**: https://ui.happly.cloud
- **Source**: `docs/` directory (Next.js 16 with Markdoc)
- **Auto-deploy**: GitHub Actions on push to `production` when `docs/**` or `packages/registry/**` changes

### How Docs Auto-Generation Works

1. **Prebuild script** (`docs/scripts/generate-navigation.ts`) reads `registry.json` and generates navigation
2. **Dynamic route** (`docs/src/app/docs/components/[component]/`) generates pages from component JSON files
3. **Preview components** render live examples from `docs.examples[].preview` config
4. No manual markdown needed - just add component JSON with `docs` field

### Running Docs Locally

```bash
bun run --cwd docs dev    # Starts on http://localhost:3005
bun run --cwd docs build  # Production build (uses --webpack for Markdoc)
```

## Registry URL

Components are fetched from:
```
https://raw.githubusercontent.com/Mindful-Connect/happly-ui-npm/production/packages/registry
```

JSON Schemas are served via jsDelivr:
```
https://cdn.jsdelivr.net/gh/Mindful-Connect/happly-ui-npm@production/schemas/
```
