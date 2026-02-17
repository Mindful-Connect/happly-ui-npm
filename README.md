<div align="center">
  <h1>HapplyUI</h1>
  <p><strong>Beautiful, accessible React components you can copy and paste into your apps.</strong></p>
  <p>Built with Radix UI and Tailwind CSS. Powered by the Happly Design System.</p>

  <p>
    <a href="https://ui.happly.cloud"><img src="https://img.shields.io/badge/docs-ui.happly.cloud-blue.svg?style=flat-square" alt="documentation" /></a>
    <a href="https://www.npmjs.com/package/@happlyui/cli"><img src="https://img.shields.io/npm/v/@happlyui/cli.svg?style=flat-square" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/@happlyui/cli"><img src="https://img.shields.io/npm/dm/@happlyui/cli.svg?style=flat-square" alt="npm downloads" /></a>
    <a href="https://github.com/Mindful-Connect/happly-ui-npm/blob/production/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license" /></a>
  </p>
</div>

---

## Introduction

HapplyUI is a collection of re-usable components built using [Radix UI](https://radix-ui.com) and [Tailwind CSS](https://tailwindcss.com).

This is **NOT** a component library. It's a collection of components that you can copy and paste into your apps. You own the code. Customize it to fit your needs.

## Features

- **Accessible** - Built on Radix UI primitives with full keyboard navigation and screen reader support
- **Customizable** - Components are copied to your project, giving you full control
- **Dark Mode** - CSS variables make theming and dark mode simple
- **TypeScript** - Written in TypeScript with full type safety
- **Tailwind CSS** - Styled with Tailwind for easy customization
- **Design System** - Consistent variant/mode system across components

## Installation

### Using the CLI

The easiest way to get started is using the CLI:

```bash
bunx @happlyui/cli@latest init
```

This will:

- Create a `happly-ui-components.json` configuration file
- Add the `cn` utility function to `lib/happly-ui/happly-ui-utils.ts`
- Configure CSS variables for theming
- Install required dependencies

### Adding Components

Once initialized, add components to your project:

```bash
# Add a single component
bunx @happlyui/cli@latest add button

# Add multiple components
bunx @happlyui/cli@latest add button input card

# Add all components
bunx @happlyui/cli@latest add --all
```

### Manual Installation

If you prefer manual setup, you can copy components directly from the `packages/registry` directory.

### Tailwind CSS Configuration

We provide ready-to-use configuration files for both Tailwind v3 and v4 in the `tailwind-manual-installation` directory.

#### Tailwind v3

1.  Copy `tailwind-manual-installation/v3/happly-tailwind.preset.js` to your project root.
2.  Add it to your `tailwind.config.js`:
    ```js
    module.exports = {
      presets: [require('./happly-tailwind.preset.js')],
      // ... rest of your config
    };
    ```
3.  Copy the CSS variables from `tailwind-manual-installation/v3/globals.css` into your global CSS file.

#### Tailwind v4

1.  Copy `tailwind-manual-installation/v4/happly-theme.css` to your project (e.g., `src/happly-theme.css`).
2.  Import it in your main CSS file:
    ```css
    @import './happly-theme.css';
    ```

### Conflict Resolution & Overrides

When using `happly-tailwind.preset.js` (Tailwind v3), Happly's configuration is provided as a preset. This means:

- **Your configuration overrides the preset**: Any keys defined in your `tailwind.config.js` will take precedence over Happly's defaults.
- **Use `theme.extend`**: To add custom colors or fonts without removing Happly's tokens, always use `theme.extend`.

  ```js
  // ✅ Good: Extends Happly defaults
  module.exports = {
    theme: {
      extend: {
        colors: { brand: '#ff0000' },
      },
    },
  };

  // ❌ Bad: Overrides Happly defaults (removes semantic tokens)
  module.exports = {
    theme: {
      colors: { brand: '#ff0000' },
    },
  };
  ```

#### Tailwind v4 Conflict Resolution

For Tailwind v4:

- **Import Order Matters**: Ensure `@import "./happly-theme.css";` comes **before** your own `@theme` block or variable definitions.
- **Overriding Variables**: You can override any Happly variable by redefining it in your `:root` or `@theme` block _after_ the import.

  ```css
  @import './happly-theme.css';

  @theme {
    /* Overrides Happly's --color-primary */
    --color-primary: red;
  }
  ```

## Usage

### Namespace Import (Recommended)

Import components using the namespace pattern for compound components:

```tsx
import * as Button from '@/components/happly-ui/button';

export default function Home() {
  return (
    <div className='flex gap-4'>
      {/* Primary variants */}
      <Button.Root variant='primary' mode='filled'>
        Primary
      </Button.Root>
      <Button.Root variant='primary' mode='stroke'>
        Stroke
      </Button.Root>
      <Button.Root variant='primary' mode='lighter'>
        Lighter
      </Button.Root>
      <Button.Root variant='primary' mode='ghost'>
        Ghost
      </Button.Root>

      {/* With icons */}
      <Button.Root variant='primary' mode='filled'>
        <Button.Icon as={PlusIcon} />
        Add Item
      </Button.Root>

      {/* Icon only */}
      <Button.Root variant='neutral' mode='stroke' size='medium' iconOnly>
        <Button.Icon as={SettingsIcon} />
      </Button.Root>
    </div>
  );
}
```

### Button Variants & Modes

| Variant   | Description                      |
| --------- | -------------------------------- |
| `primary` | Brand color, main call-to-action |
| `neutral` | Grayscale, secondary actions     |
| `error`   | Destructive/danger actions       |

| Mode      | Description            |
| --------- | ---------------------- |
| `filled`  | Solid background color |
| `stroke`  | Outlined with border   |
| `lighter` | Light background tint  |
| `ghost`   | Transparent background |

| Size      | Height         |
| --------- | -------------- |
| `medium`  | 40px (default) |
| `small`   | 36px           |
| `xsmall`  | 32px           |
| `xxsmall` | 28px           |

### Legacy API (Backward Compatible)

For compatibility with shadcn/ui patterns:

```tsx
import { Button } from '@/components/happly-ui/button';

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
      <Button variant='secondary'>Secondary</Button>
      <Button variant='destructive'>Delete</Button>
      <Button variant='outline'>Outline</Button>
      <Button variant='ghost'>Ghost</Button>
      <Button variant='link'>Link</Button>
    </div>
  );
}
```

**Legacy to New Mapping:**
| Legacy Variant | New Variant + Mode |
|----------------|-------------------|
| `default` | `primary` + `filled` |
| `destructive` | `error` + `filled` |
| `outline` | `neutral` + `stroke` |
| `secondary` | `neutral` + `lighter` |
| `ghost` | `neutral` + `ghost` |
| `link` | `primary` + `ghost` |

## Components

| Component | Description                                                                                                |
| --------- | ---------------------------------------------------------------------------------------------------------- |
| `button`  | Compound button with variants (primary, neutral, error), modes (filled, stroke, lighter, ghost), and sizes |
| `divider` | Versatile divider with variants (line, line-spacing, line-text, text, solid-text, content)                 |
| `input`   | A text input component                                                                                     |
| `label`   | A label for form inputs                                                                                    |
| `card`    | A card container with header, content, and footer                                                          |
| `badge`   | A badge for status indicators                                                                              |

View all components with live examples at [ui.happly.cloud](https://ui.happly.cloud).

## Configuration

The `happly-ui-components.json` file configures how components are installed:

```json
{
  "$schema": "https://cdn.jsdelivr.net/gh/Mindful-Connect/happly-ui-npm@production/schemas/happly-ui-components.json",
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "tsx": true,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/happly-ui-utils",
    "ui": "@/components/happly-ui"
  }
}
```

## CLI Reference

```bash
# Initialize project
@happlyui/cli init [options]
  -c, --cwd <path>    Working directory (default: current directory)
  -y, --yes           Skip prompts and use defaults
  --defaults          Use default configuration

# Add components
@happlyui/cli add [components...] [options]
  -c, --cwd <path>    Working directory
  -y, --yes           Skip confirmation prompts
  -o, --overwrite     Overwrite existing files
  -a, --all           Add all available components

# List components
@happlyui/cli list [options]
  -c, --cwd <path>    Working directory
```

## Development

```bash
# Clone the repository
git clone https://github.com/Mindful-Connect/happly-ui-npm.git
cd happly-ui-npm

# Install dependencies
bun install

# Build the CLI
bun run --cwd packages/cli build

# Test locally
bun packages/cli/dist/index.js init

# Lint the codebase
bun run lint

# Type check the codebase
bun x tsc --noEmit
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Adding a New Component

1. Create `packages/registry/ui/my-component.tsx` with your component code
2. Create `packages/registry/ui/my-component.json` with metadata and docs
3. Run `bun run build:registry` to update `packages/registry/registry.json`
4. Open a PR to `production` - docs auto-update on merge

### Component JSON with Docs

Include a `docs` field for automatic documentation generation:

```json
{
  "name": "my-component",
  "files": [
    {
      "path": "ui/my-component.tsx",
      "type": "registry:ui"
    },
    {
      "path": "lib/my-utils.ts",
      "type": "registry:lib"
    }
  ],
  "docs": {
    "lead": "Component description",
    "usage": "import * as MyComponent from '@/components/happly-ui/my-component'",
    "examples": [
      {
        "title": "Default",
        "code": "<MyComponent.Root />",
        "preview": [{ "component": "my-component", "props": {} }]
      }
    ],
    "api": [
      {
        "name": "MyComponent.Root",
        "props": [
          {
            "name": "variant",
            "type": "string",
            "default": "'default'",
            "description": "The variant"
          }
        ]
      }
    ]
  }
}
```

**Note on Files:**
You can include multiple files in a component. The CLI will maintain the file names and place them in the correct directory based on their `type` (e.g., `registry:ui` goes to `components/ui`, `registry:lib` goes to `lib/`).

### Adding Preview Components

To add live preview support for a new component:

1. Add the component type to `docs/src/lib/registry.ts`:

   ```ts
   export interface ComponentPreviewConfig {
     component: 'button' | 'badge' | ... | 'my-component'
   }
   ```

2. Create a Demo component in `docs/src/components/ComponentPreview.tsx`:

   ```tsx
   export function DemoMyComponent({
     variant,
     children,
   }: DemoMyComponentProps) {
     // Render preview with inline styles (no Tailwind)
   }
   ```

3. Add the case in `docs/src/app/docs/components/[component]/component-docs.tsx`:
   ```tsx
   case 'my-component':
     return <DemoMyComponent {...props}>{children}</DemoMyComponent>
   ```

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [shadcn/ui](https://ui.shadcn.com) - Inspiration for the component registry approach
- [Radix UI](https://radix-ui.com) - Accessible component primitives
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework

---

<div align="center">
  <p>Built with care by <a href="https://happly.ai">Happly</a></p>
</div>
