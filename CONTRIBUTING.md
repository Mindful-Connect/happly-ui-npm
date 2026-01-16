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

1. **Fork the repository** and create your branch from `main`
2. **Install dependencies**: `bun install`
3. **Make your changes**
4. **Test your changes** thoroughly
5. **Update documentation** if needed
6. **Submit a pull request**

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
```

### Project Structure

```
happly-ui/
├── packages/
│   ├── cli/           # CLI tool (happlyui)
│   │   ├── src/
│   │   │   ├── commands/   # CLI commands (init, add)
│   │   │   ├── utils/      # Utility functions
│   │   │   └── types/      # TypeScript types
│   │   └── package.json
│   │
│   └── registry/      # Component registry
│       ├── ui/        # UI components
│       ├── hooks/     # Custom hooks
│       └── lib/       # Utilities
│
└── package.json       # Workspace root
```

## Adding a New Component

1. **Create the component** in `packages/registry/ui/`:

```tsx
// packages/registry/ui/my-component.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface MyComponentProps {
  // props
}

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("...", className)} {...props} />
    );
  }
);
MyComponent.displayName = "MyComponent";

export { MyComponent };
```

2. **Create the registry definition** in `packages/registry/ui/my-component.json`:

```json
{
  "$schema": "https://cdn.jsdelivr.net/gh/Mindful-Connect/happly-ui-npm@production/schemas/registry-item.json",
  "name": "my-component",
  "type": "registry:ui",
  "title": "My Component",
  "description": "A description of the component.",
  "dependencies": [],
  "registryDependencies": [],
  "files": [
    {
      "path": "ui/my-component.tsx",
      "type": "registry:ui",
      "content": "..."
    }
  ]
}
```

3. **Add to registry index** in `packages/registry/registry.json`

4. **Test the component** by running the CLI locally

## Coding Guidelines

### TypeScript

- Use TypeScript for all code
- Export types/interfaces that consumers need
- Use `React.forwardRef` for components that accept refs

### Styling

- Use Tailwind CSS utilities
- Support dark mode via CSS variables
- Use the `cn()` utility for conditional classes

### Accessibility

- Build on Radix UI primitives when possible
- Include proper ARIA attributes
- Support keyboard navigation

### Commits

Follow [Conventional Commits](https://conventionalcommits.org):

```
feat: add new component
fix: resolve button hover state
docs: update README
chore: update dependencies
```

## Questions?

Feel free to open an issue or reach out to the maintainers.

Thank you for contributing!
