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
2. Create definition: `packages/registry/ui/my-component.json` with inline content
3. Add entry to `packages/registry/registry.json`
4. Rebuild CLI and test

## Component Conventions

- Use Radix UI primitives for accessibility
- Use `cva` (class-variance-authority) for variants
- Use `cn()` utility for class merging
- Always use `@/lib/utils` import path (transformed at install time)
- Export both component and variants config

## Publishing

```bash
# Bump version in packages/cli/package.json
# Rebuild CLI
bun run --cwd packages/cli build

# Publish (requires npm login with OTP)
npm publish --access public packages/cli
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
