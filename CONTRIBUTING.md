# Contributing to HapplyUI

Thank you for your interest in contributing to HapplyUI! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to help us maintain a welcoming community.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title** describing the issue
- **Steps to reproduce** the behavior
- **Expected behavior** vs actual behavior
- **Environment details** (OS, Node version, package manager)
- **Screenshots** if applicable

### Suggesting Features

Feature requests are welcome! Please:

- Check existing issues for similar suggestions
- Provide a clear use case
- Explain why this feature would be useful

### Pull Requests

1. **Fork the repository** and create your branch from `production`
2. **Install dependencies**: `bun install`
3. **Make your changes**
4. **Test your changes** thoroughly
5. **Run linting**: `bun run lint`
6. **Update documentation** if needed
7. **Submit a pull request**

## Development Setup

### Prerequisites

- [Bun](https://bun.sh) >= 1.0
- [Node.js](https://nodejs.org) >= 18 (for compatibility)

### Getting Started

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/happly-ui.git
cd happly-ui

# Install dependencies
bun install

# Build the CLI
bun run --cwd packages/cli build

# Test your changes
bun packages/cli/dist/index.js --help

# Run docs locally
bun run --cwd docs dev

# Run linting
bun run lint
```

### Project Structure

```
happly-ui/
├── packages/
│   ├── cli/           # CLI tool (@happlyui/cli)
│   │   ├── src/
│   │   │   ├── commands/   # CLI commands (init, add)
│   │   │   ├── utils/      # Utility functions
│   │   │   └── types/      # TypeScript types
│   │   └── package.json
│   │
│   └── registry/      # Component registry
│       ├── ui/        # UI components (.tsx + .json)
│       ├── hooks/     # Custom hooks
│       ├── lib/       # Utilities
│       ├── utils/     # Shared utilities (tv, polymorphic)
│       └── registry.json  # Component index
│
├── docs/              # Documentation site (Next.js)
│   ├── src/
│   │   ├── app/docs/components/[component]/  # Auto-generated pages
│   │   ├── components/ComponentPreview.tsx   # Demo components
│   │   └── lib/registry.ts                   # Preview types
│   └── scripts/generate-navigation.ts        # Nav generator
│
└── package.json       # Workspace root
```

---

## Adding a New Component

> **IMPORTANT FOR AI AGENTS**: When adding a new component, you MUST include the `docs` field in the component JSON for automatic documentation generation. Follow this complete guide.

### Step 1: Create Component Source File

Create `packages/registry/ui/my-component.tsx`:

```tsx
import { tv, type VariantProps } from '@/utils/tv';

const COMPONENT_ROOT_NAME = 'MyComponentRoot';

export const myComponentVariants = tv({
  base: 'relative flex w-full items-center',
  variants: {
    variant: {
      default: 'bg-white border border-gray-200',
      filled: 'bg-gray-100',
      outline: 'border-2 border-gray-300',
    },
    size: {
      sm: 'h-8 text-sm',
      md: 'h-10 text-base',
      lg: 'h-12 text-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

type MyComponentRootProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof myComponentVariants>;

function MyComponentRoot({
  variant,
  size,
  className,
  ...rest
}: MyComponentRootProps) {
  return (
    <div
      className={myComponentVariants({ variant, size, class: className })}
      {...rest}
    />
  );
}
MyComponentRoot.displayName = COMPONENT_ROOT_NAME;

// Export using namespace pattern
export { MyComponentRoot as Root };
export { myComponentVariants };
```

### Step 2: Create Component JSON with Docs

Create `packages/registry/ui/my-component.json`:

```json
{
  "$schema": "https://cdn.jsdelivr.net/gh/Mindful-Connect/happly-ui-npm@production/schemas/registry-item.json",
  "name": "my-component",
  "type": "registry:ui",
  "title": "My Component",
  "description": "Brief description for CLI listing.",
  "dependencies": ["tailwind-variants"],
  "registryDependencies": ["tv"],
  "docs": {
    "lead": "A versatile component for [purpose]. Supports multiple variants and sizes.",
    "usage": "import * as MyComponent from \"@/components/ui/my-component\"\n\n<MyComponent.Root variant=\"default\" size=\"md\">\n  Content here\n</MyComponent.Root>",
    "examples": [
      {
        "title": "Default Variant",
        "description": "The default styling for common use cases.",
        "code": "<MyComponent.Root variant=\"default\">Default</MyComponent.Root>",
        "preview": [
          {
            "component": "my-component",
            "props": { "variant": "default" },
            "children": "Default"
          }
        ]
      },
      {
        "title": "All Variants",
        "description": "Available visual variants.",
        "code": "<MyComponent.Root variant=\"default\">Default</MyComponent.Root>\n<MyComponent.Root variant=\"filled\">Filled</MyComponent.Root>\n<MyComponent.Root variant=\"outline\">Outline</MyComponent.Root>",
        "preview": [
          {
            "component": "my-component",
            "props": { "variant": "default" },
            "children": "Default"
          },
          {
            "component": "my-component",
            "props": { "variant": "filled" },
            "children": "Filled"
          },
          {
            "component": "my-component",
            "props": { "variant": "outline" },
            "children": "Outline"
          }
        ]
      },
      {
        "title": "Sizes",
        "description": "Available size options.",
        "code": "<MyComponent.Root size=\"sm\">Small</MyComponent.Root>\n<MyComponent.Root size=\"md\">Medium</MyComponent.Root>\n<MyComponent.Root size=\"lg\">Large</MyComponent.Root>",
        "preview": [
          {
            "component": "my-component",
            "props": { "size": "sm" },
            "children": "Small"
          },
          {
            "component": "my-component",
            "props": { "size": "md" },
            "children": "Medium"
          },
          {
            "component": "my-component",
            "props": { "size": "lg" },
            "children": "Large"
          }
        ]
      }
    ],
    "api": [
      {
        "name": "MyComponent.Root",
        "description": "The main component container.",
        "props": [
          {
            "name": "variant",
            "type": "'default' | 'filled' | 'outline'",
            "default": "'default'",
            "description": "The visual style variant."
          },
          {
            "name": "size",
            "type": "'sm' | 'md' | 'lg'",
            "default": "'md'",
            "description": "The size of the component."
          },
          {
            "name": "className",
            "type": "string",
            "description": "Additional CSS classes."
          },
          {
            "name": "children",
            "type": "ReactNode",
            "description": "The content to render inside."
          }
        ]
      }
    ]
  },
  "files": [
    {
      "path": "ui/my-component.tsx",
      "type": "registry:ui"
    },
    // Optional: Additional files (e.g. types, helpers)
    {
      "path": "lib/my-component-types.ts",
      "type": "registry:lib"
    }
  ]
}
```

> **Note**: The CLI supports multiple files per component. It will preserve the defined file names and place them in the correct directory based on their `type`. For example, a file with type `registry:lib` will be placed in the user's configured `lib` directory (e.g., `src/lib/my-helper.ts`), while `registry:ui` goes to the UI components folder.

### Step 3: Add to Registry Index

Run the build script to update the registry index:

```bash
bun run build:registry
```

This will automatically add your component to `packages/registry/registry.json` using the metadata from your component's JSON file.

### Step 4: Add Preview Component (if needed)

If your component needs live previews in the docs:

#### 4a. Update Preview Types

Edit `docs/src/lib/registry.ts`:

```ts
export interface ComponentPreviewConfig {
  component:
    | 'button'
    | 'badge'
    | 'input'
    | 'label'
    | 'card'
    | 'divider'
    | 'my-component'; // Add here
  props?: Record<string, unknown>;
  children?: string;
}
```

#### 4b. Create Demo Component

Edit `docs/src/components/ComponentPreview.tsx`:

```tsx
// Add props interface
interface DemoMyComponentProps {
  variant?: 'default' | 'filled' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children?: ReactNode;
}

// Add demo component (use inline styles, not Tailwind)
export function DemoMyComponent({
  variant = 'default',
  size = 'md',
  children,
}: DemoMyComponentProps) {
  const baseStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
  };

  const variantStyles: Record<string, CSSProperties> = {
    default: { background: 'white', border: '1px solid #e5e7eb' },
    filled: { background: '#f3f4f6' },
    outline: { border: '2px solid #d1d5db' },
  };

  const sizeStyles: Record<string, CSSProperties> = {
    sm: { height: '32px', fontSize: '14px', padding: '0 12px' },
    md: { height: '40px', fontSize: '16px', padding: '0 16px' },
    lg: { height: '48px', fontSize: '18px', padding: '0 20px' },
  };

  return (
    <div
      style={{ ...baseStyles, ...variantStyles[variant], ...sizeStyles[size] }}
    >
      {children}
    </div>
  );
}
```

#### 4c. Add to Preview Switch

Edit `docs/src/app/docs/components/[component]/component-docs.tsx`:

```tsx
// Add import
import { DemoMyComponent } from '@/components/ComponentPreview'

// Add case in PreviewItem switch
case 'my-component':
  return <DemoMyComponent {...(props as any)}>{children}</DemoMyComponent>
```

---

## Docs Field Reference

### Required Fields

| Field           | Type     | Description                           |
| --------------- | -------- | ------------------------------------- |
| `docs.lead`     | `string` | Lead paragraph at top of docs page    |
| `docs.usage`    | `string` | Import statement and basic usage code |
| `docs.examples` | `array`  | Array of example objects              |
| `docs.api`      | `array`  | API reference for each export         |

### Example Object Structure

```json
{
  "title": "Example Title", // Required: Section heading
  "description": "Optional text", // Optional: Description paragraph
  "code": "<Component />", // Required: Code shown in docs
  "preview": [
    // Optional: Live preview config
    {
      "component": "component-name", // Component type for preview
      "props": { "variant": "x" }, // Props to pass
      "children": "Text content" // Children/text content
    }
  ]
}
```

### API Object Structure

```json
{
  "name": "Component.Export", // Required: Export name
  "description": "What it does", // Optional: Description
  "props": [
    // Required: Props array
    {
      "name": "propName", // Required: Prop name
      "type": "'a' | 'b' | 'c'", // Required: TypeScript type
      "default": "'a'", // Optional: Default value
      "description": "What it does" // Required: Description
    }
  ]
}
```

### Available Preview Components

| Component | Available Props                                               |
| --------- | ------------------------------------------------------------- |
| `button`  | `variant`, `mode`, `size`, `disabled`, `iconOnly`, `children` |
| `badge`   | `variant`, `children`                                         |
| `input`   | `type`, `placeholder`, `disabled`, `value`                    |
| `label`   | `disabled`, `children`                                        |
| `card`    | `title`, `description`, `children`                            |
| `divider` | `variant`, `children`                                         |

---

## Coding Guidelines

### TypeScript

- Use TypeScript for all code
- Export types/interfaces that consumers need
- Use `React.forwardRef` for components that accept refs

### Component Patterns

- Use namespace export pattern: `export { ComponentRoot as Root }`
- Use `tv()` from `@/utils/tv` for variants (not `cva`)
- Use `displayName` for debugging

### Styling

- Use Tailwind CSS utilities in components
- Use inline styles in demo/preview components (no Tailwind in docs demos)
- Support dark mode via CSS variables

### Accessibility

- Build on Radix UI primitives when possible
- Include proper ARIA attributes (e.g., `role="separator"` for dividers)
- Support keyboard navigation

### Commits

Follow [Conventional Commits](https://conventionalcommits.org):

```
feat(registry): add my-component
fix(button): resolve hover state issue
docs: update contributing guide
chore: update dependencies
```

---

## Checklist Before PR

- [ ] Component source file: `packages/registry/ui/my-component.tsx`
- [ ] Component JSON: `packages/registry/ui/my-component.json`
- [ ] Added to: `packages/registry/registry.json`
- [ ] `docs.lead` - Lead paragraph written
- [ ] `docs.usage` - Import and basic usage example
- [ ] `docs.examples` - At least 1 example with code
- [ ] `docs.api` - All exports documented with props

- [ ] Preview component added (if applicable)
- [ ] Preview component added (if applicable)
- [ ] Tested locally: `bun run --cwd docs dev`
- [ ] Lint check passed: `bun run lint`

---

## Auto-Deployment

When your PR merges to `production`:

1. GitHub Actions triggers on `packages/registry/**` changes
2. Docs prebuild script generates navigation from `registry.json`
3. Dynamic route creates page from your component JSON
4. Docs deploy to https://ui.happly.cloud

No manual documentation steps needed!

---

## Questions?

Feel free to open an issue or reach out to the maintainers.

Thank you for contributing!
