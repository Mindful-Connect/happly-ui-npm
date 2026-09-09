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
  render: () => <MyComponent variant='default'>Example</MyComponent>,
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

### Interface conventions (from the `better-*` skills sweep, 2026-09-03)

- **Motion:** never `transition-all`; name the properties (`transition-[background-color,color,box-shadow,scale,transform]`). Real buttons (Button, FancyButton, CompactButton) scale to `0.96` on press via `active:[&:not(:disabled)]:scale-[0.96]` and expose a `static` prop that turns it off. Exits are shorter and softer than enters (≤150ms). Components that use framer-motion call `useReducedMotion()`.
- **Focus:** style `focus-visible:`, never bare `focus:` — except on text fields (Input, Textarea, DigitInput, and anything wrapping a text `<input>`), where bare `focus:` is the intended spelling: browsers already match `:focus-visible` on a text field for pointer focus, and DigitInput also moves focus between slots programmatically. Every focusable control shows one of the `shadow-button-*-focus` rings. Do not add `outline-none` without a `focus-visible` replacement.
- **Hit areas:** ≥ 24×24 CSS px. A smaller visual (20px checkbox, 16px dismiss icon) extends its target with a pseudo-element on the `relative` button/root (`after:absolute after:-inset-0.5`).
- **Names:** icon-only buttons take an `aria-label`; decorative SVGs get `aria-hidden`; status is never carried by color alone.
- **Type:** `tabular-nums` on numbers that change or align; `text-balance` on titles, `text-pretty` on descriptions; truncated text keeps the full value in `title`; `select-none` only on placeholders and drag surfaces.
- **Surfaces:** nested rounded surfaces are concentric (outer radius = inner radius + padding); every `<img>` gets `outline-1 -outline-offset-1 outline-image-outline` (the semantic token — it already resolves to the light/dark hairline, so no `black/10` primitive and no `dark:` variant). Keep the `ring-1 ring-stroke-soft-200 shadow-regular-xs` card treatment — it is the system's surface language.
- **Color usage:** components reference semantic tokens (`bg-bg-white-0`, `text-text-sub-600`, `ring-stroke-soft-200`), never raw hex or a primitive step; a token is used only in its role (no `stroke-*` as text).
- **Copy:** verb-first buttons, confirmations repeat the consequence (`Delete project` / `Cancel`), errors say how to fix, empty states point forward, sentence case, the `…` character.
- **Layout:** new classes use logical utilities (`ps-`, `pe-`, `ms-`, `me-`, `text-start`); the existing physical ones are not mass-migrated.

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

The CLI fetches theme CSS **from the registry at runtime** (not from hardcoded templates). This means pushing token changes to the `production` branch makes them available to all users immediately — no CLI republish needed.

Design tokens are defined in these files:

| File                                               | Purpose                                                                                | When Used                                   |
| -------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------- |
| `packages/registry/styles/happly-theme.css`        | **V4 theme** — Tailwind v4 `@theme` syntax (source of truth for Storybook + CLI fetch) | Storybook, V4 user projects                 |
| `packages/registry/styles/happly-theme-v3.css`     | **V3 theme** — `:root {}` CSS custom properties (fetched by CLI for V3 projects)       | V3 user projects                            |
| `packages/cli/src/utils/templates/happly-theme.ts` | **Offline fallback only** — bundled copies of V4/V3 themes used when fetch fails       | CLI offline/network failure                 |
| `packages/cli/src/utils/templates/tokens.ts`       | **V3 plugin/preset tokens** — source of truth for typography, shadows, colors          | V3 projects via `tailwind.config.js` extend |

**When adding or changing a design token (color, shadow, keyframe, etc.):**

1. Update `packages/registry/styles/happly-theme.css` (V4 — uses `@theme {}` block)
2. Update `packages/registry/styles/happly-theme-v3.css` (V3 — uses `:root {}` block)
   - **Both files must be kept in sync** — same colors, semantic tokens, dark mode overrides, and keyframes
   - V4 uses `@theme {}` block — tokens, shadows, keyframes all go inside it
   - V3 uses `:root {}` block — only CSS custom properties (colors); shadows/typography/keyframes go as raw `@keyframes` blocks outside `:root`
   - Both must include dark mode overrides (`@media (prefers-color-scheme: dark)` + `.dark` class)
   - Both include `@keyframes` animations at the bottom (button loading, accordion, shimmer, etc.)
3. Run `bun run sync:theme` (also part of `bun run build:registry`). It regenerates the CLI fallback templates in `packages/cli/src/utils/templates/happly-theme.ts` and the copies in `tailwind-manual-installation/` from the two registry CSS files — never edit those generated files by hand
4. If the token is a new Tailwind class name (e.g., new shadow or color), also add it to `packages/cli/src/utils/templates/tokens.ts`, then run `bun run build:registry`. `scripts/build-tailwind-plugin.ts` regenerates both consumers of that file — `packages/registry/styles/happly-ui-tailwind.cjs` (the plugin the CLI fetches for V3 projects) and `tailwind-manual-installation/v3/happly-tailwind.preset.js` (the preset README points manual installs at) — so neither can drift. Never edit those two by hand
5. Rebuild and type-check the CLI: `cd packages/cli && bun run typecheck`

**Token conventions (since 2026-09-03):**

- Colors are written in `oklch(L C H)` / `oklch(L C H / alpha)` with 3-decimal channels (`oklch(0.577 0.229 289.43)` is `#7d52f4`). Convert a new hex with a color library (culori), never by eye; keep the ramp's hue constant and check chroma stays inside sRGB. The V3 plugin palette in `tokens.ts` stays hex because Tailwind v3 cannot apply `/opacity` modifiers to `oklch()` strings.
- Focus rings are the `--shadow-button-*-focus` tokens: a 2px page-colored gap plus a 2px solid ring (`primary-base`, `neutral-500`, `error-base`, `orange-600`, `green-700`) that measures ≥ 3:1 on both light and dark grounds. Use them on `focus-visible:`; never replace them with alpha rings.
- Dark mode keeps the purple accent (`primary-base` = purple-500, hover purple-600, white contrast label). The `@media (prefers-color-scheme: dark)` block targets `:root:not(.light)` so an explicit `light` class (next-themes) wins over the OS setting; `.dark` still forces dark.
- Reduced motion: the theme ships a global `@media (prefers-reduced-motion: reduce)` kill-switch for CSS animations/transitions. JS-driven motion (framer-motion) must check `useReducedMotion()` itself.
- A **filled status surface** takes its label colour from `--color-{role}-contrast`, never from `text-static-white`. White is below the 3:1 floor on the light-end hues, so `warning`, `success`, `away`, `verified` and `stable` resolve to `static-black` and the rest to `static-white`; the fills themselves are unchanged. The tokens are deliberately theme-invariant — the choice follows the fill's own lightness, and every one of those roles stays light in dark mode too. `error` (4.15:1) and `highlighted` (3.91:1) still keep white and remain below AA; that is on record as a design decision, not an oversight.
- Reduced motion is a kill-switch, not a design: any indicator whose _meaning_ lives in its movement needs a `motion-reduce:` fallback that still communicates. The indeterminate progress bar is the worked example — frozen mid-slide it reads as a static "40% done", so it goes `motion-reduce:w-full`.
- Theme switching must not animate. Wrap the change in `withoutThemeTransitions()` (`lib/happly-ui-utils.ts`), which sets `data-theme-switching` on `<html>` for one frame; the theme suppresses every transition under that attribute. `next-themes` consumers get the same thing from `disableTransitionOnChange`.
- Motion durations are not a matter of taste; `better-ui` prescribes them. **High-frequency** state changes (hover, press, focus on any control, menu row or cell) transition at **150ms**; overlay **enter** animations are 200ms in / 150ms out. Icon cross-fades use the exact recipe: `transition-[opacity,filter,scale,transform] duration-300 ease-[cubic-bezier(0.2,0,0,1)]` between `scale-100 opacity-100 blur-none` and `scale-[0.25] opacity-0 blur-[4px]` (`blur-0` does not exist in Tailwind v4). A single item arriving uses `animate-item-in` — opacity + `blur(4px)` + `translateY(12px)` over 400ms.
- Never ship a bare `transition`. It covers sixteen properties including `transform`, `filter` and `backdrop-filter`; name what actually changes. When an element's classes merge with another component's (anything passed as `as=` or into a slot), `tailwind-merge` keeps only the **last** `transition-property` — so the inner class has to name every property both layers need, as `combo-box`'s chevron does with `transition-[color,rotate,transform]`.
- Press feedback is `active:[&:not(:disabled)]:scale-[0.96]`, exactly 0.96, behind a `static` prop.
- Text inputs are 16px below the `sm` breakpoint (`text-paragraph-md sm:text-paragraph-sm`). iOS Safari zooms the page whenever a focused field is under 16px and does not zoom back out on blur.
- CSS comments in the theme files end up inside a TS template literal in `packages/cli/src/utils/templates/happly-theme.ts`. The sync script escapes backticks, so they are safe — but it matches the block's closing delimiter with a `(?<!\\)` lookbehind for exactly that reason; do not simplify that regex.
- `body` sets `-webkit-font-smoothing: antialiased` / `-moz-osx-font-smoothing: grayscale` once; do not repeat `antialiased` per component.

**Key differences between V3 and V4:**

- V4: All tokens in `@theme {}` block, keyframes like `spin`/`ping`/`pulse`/`bounce` must be defined (not auto-included)
- V3: Colors as CSS custom properties in `:root {}`, shadows/typography injected via Tailwind plugin from `tokens.ts` (not as CSS vars), standard keyframes (`spin`/`ping`/`pulse`/`bounce`) are already provided by Tailwind v3 base styles

**Runtime fetch flow:** The CLI (`packages/cli/src/utils/theme.ts`) fetches from `{registryUrl}/styles/happly-theme.css` (V4) or `{registryUrl}/styles/happly-theme-v3.css` (V3). If the fetch fails, it falls back to the bundled templates in `happly-theme.ts`.

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
