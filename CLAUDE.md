# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HapplyUI is a copy-paste React component registry (not a library) inspired by shadcn/ui. Components are distributed via GitHub raw files and installed directly into user projects. Users own the code and can customize it.

## Build & Development Commands

```bash
# Build all packages
bun run build

# Type check root
bun x tsc --noEmit

# Build registry index
bun run build:registry

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

# Storybook (component development)
bun run storybook              # Starts on http://localhost:6006
bun run build-storybook        # Static build
```

## Architecture

### Monorepo Structure

- **packages/cli** - CLI tool published as `@happlyui/cli`
- **packages/registry** - Component source files, JSON definitions, Storybook stories, and shared design tokens
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

Each component has up to three files:

- **Source file** (`ui/button.tsx`) - The actual React component
- **Definition file** (`ui/button.json`) - Metadata with dependencies
- **Story file** (`ui/button.stories.tsx`) - Storybook stories (used for dev + docs previews)

The `registry.json` index lists all available components with their npm and registry dependencies. Story files are not included in the JSON `files` arrays, so they are never installed into user projects.

## Key Modules

| Module    | Location                     | Purpose                       |
| --------- | ---------------------------- | ----------------------------- |
| Entry     | `cli/src/index.ts`           | Commander.js CLI setup        |
| Init      | `cli/src/commands/init.ts`   | Project initialization        |
| Add       | `cli/src/commands/add.ts`    | Component installation        |
| Detect    | `cli/src/utils/detect.ts`    | Project config detection      |
| Registry  | `cli/src/utils/registry.ts`  | Fetch & resolve dependencies  |
| Transform | `cli/src/utils/transform.ts` | Path alias & TS→JS transforms |
| Config    | `cli/src/utils/config.ts`    | Read/write components.json    |
| Install   | `cli/src/utils/install.ts`   | Package manager abstraction   |

## Key Types (cli/src/types/index.ts)

- **HapplyConfig** - User's components.json configuration
- **RegistryItem** - Component definition with files, dependencies
- **RegistryItemType** - `"registry:ui" | "registry:hook" | "registry:lib"`
- **ProjectInfo** - Detected project setup (framework, package manager, etc.)

## Adding or Editing a Component

Follow **all** steps below whenever you create a new component or edit an existing one (add stories, change variants, rename exports, etc.):

1. Create/edit source file: `packages/registry/ui/my-component.tsx`
2. Create/edit story file: `packages/registry/ui/my-component.stories.tsx` (CSF3 format)
3. Create/edit definition: `packages/registry/ui/my-component.json` with `docs` field (reference story names in `examples[].stories`)
4. Rebuild the registry index: `bun run build:registry`
5. Regenerate docs navigation and story registry:
   ```bash
   bun run --cwd docs scripts/generate-navigation.ts
   bun run --cwd docs scripts/generate-story-registry.ts
   ```
6. Verify in Storybook: `bun run storybook`
7. Verify in docs (if running): `bun run --cwd docs dev`
8. Merge to `production` branch — docs auto-deploy via GitHub Actions

**If you skip steps 4–5, the component will not appear in the CLI listing, the docs sidebar, or the docs story previews.**

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
        "stories": ["Default"]
      }
    ],
    "api": [
      {
        "name": "MyComponent.Root",
        "description": "The main component",
        "props": [
          {
            "name": "variant",
            "type": "'default' | 'alt'",
            "default": "'default'",
            "description": "The variant"
          }
        ]
      }
    ]
  },
  "files": [
    {
      "path": "ui/my-component.tsx",
      "type": "registry:ui"
    }
  ]
}
```

### Story Files (CSF3 Format)

Each component can have a `*.stories.tsx` file that provides live previews for both Storybook and the docs site. Use plain CSF3 format (no Storybook type imports needed):

```tsx
// packages/registry/ui/my-component.stories.tsx
import { MyComponent } from './my-component';

export default { title: 'UI/My Component', component: MyComponent };

export const Default = {
  render: () => (
    <MyComponent variant="default">Example</MyComponent>
  ),
};
```

The `stories` field in the JSON references the export names (e.g., `"Default"` maps to `export const Default`). The docs site imports these render functions directly via a prebuild story registry.

To regenerate the story registry after adding/renaming stories:
```bash
bun run --cwd docs scripts/generate-story-registry.ts
```

## Component Conventions

- Use Radix UI primitives for accessibility
- Use `tv` (tailwind-variants) for variants — not `cva`
- Use `cn()` utility for class merging
- Always use `@/lib/happly-ui/happly-ui-utils` import path (transformed at install time)
- Namespace exports pattern: `Button.Root`, `Button.Icon` (compound components)
- `docs.usage` field in JSON drives the CLI usage hint

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

1. **Prebuild scripts** run in sequence:
   - `docs/scripts/generate-navigation.ts` - reads `registry.json` and generates navigation
   - `docs/scripts/generate-story-registry.ts` - scans `packages/registry/ui/*.stories.tsx` and generates a static import map at `docs/src/lib/story-registry.ts`
2. **Dynamic route** (`docs/src/app/docs/components/[component]/`) generates pages from component JSON files
3. **Story previews** render live examples by importing story `render()` functions from the registry via `StoryPreview` component
4. No manual markdown needed - just add component JSON with `docs` field and matching story file

### Architecture: Single Source of Truth

The docs site imports components directly from `packages/registry/` via webpack aliases (configured in `docs/next.config.mjs`). There are no duplicated component files in the docs directory.

```
packages/registry/ui/button.tsx          ← single source of truth
packages/registry/ui/button.stories.tsx  ← stories (dev + docs preview)
packages/registry/ui/button.json         ← metadata, references story names
         │
         ├──→ Storybook (localhost:6006) — live component dev
         └──→ docs site (localhost:3005) — imports story render() as React components
```

### Design Tokens

- **Shared tokens**: `packages/registry/styles/happly-theme.css` — used by Storybook
- **Docs tokens**: `docs/src/styles/tailwind.css` — extends shared tokens with docs-specific fonts and plugins

### Running Docs Locally

```bash
bun run --cwd docs dev    # Starts on http://localhost:3005
bun run --cwd docs build  # Production build (uses --webpack for Markdoc)
```

## Storybook

- **Source**: `packages/registry/.storybook/`
- **Stories**: `packages/registry/ui/*.stories.tsx` (CSF3 format)
- **CSS**: `packages/registry/storybook.css` imports Tailwind + `styles/happly-theme.css`

### Running Storybook

```bash
bun run storybook         # Starts on http://localhost:6006
bun run build-storybook   # Static build
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
