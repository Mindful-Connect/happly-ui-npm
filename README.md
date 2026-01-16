<div align="center">
  <h1>HapplyUI</h1>
  <p><strong>Beautiful, accessible React components you can copy and paste into your apps.</strong></p>
  <p>Built with Radix UI and Tailwind CSS.</p>

  <p>
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

## Installation

### Using the CLI

The easiest way to get started is using the CLI:

```bash
bunx @happlyui/cli@latest init
```

This will:
- Create a `components.json` configuration file
- Add the `cn` utility function
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

## Usage

Import and use components in your React application:

```tsx
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}
```

## Components

| Component | Description |
|-----------|-------------|
| `button` | A button with multiple variants and sizes |
| `input` | A text input component |
| `label` | A label for form inputs |
| `card` | A card container with header, content, and footer |
| `badge` | A badge for status indicators |

## Configuration

The `components.json` file configures how components are installed:

```json
{
  "$schema": "https://cdn.jsdelivr.net/gh/Mindful-Connect/happly-ui-npm@production/schemas/components.json",
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "tsx": true,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
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
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [shadcn/ui](https://ui.shadcn.com) - Inspiration for the component registry approach
- [Radix UI](https://radix-ui.com) - Accessible component primitives
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework

---

<div align="center">
  <p>Built with ❤️ by <a href="https://happly.ai">Happly</a></p>
</div>
