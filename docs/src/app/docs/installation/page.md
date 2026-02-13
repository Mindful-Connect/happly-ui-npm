---
title: Installation
nextjs:
  metadata:
    title: Installation
    description: How to install and configure HapplyUI in your project.
---

Learn how to get HapplyUI set up in your React project. {% .lead %}

---

## Prerequisites

Before installing HapplyUI, make sure your project has:

- **React 18+** — HapplyUI components are built for modern React
- **Tailwind CSS v3 or v4** — For styling the components
- **TypeScript** (recommended) — For the best developer experience

---

## Automatic Installation

The easiest way to get started is using the HapplyUI CLI:

### Initialize your project

```bash
bunx @happlyui/cli@latest init
```

The CLI will ask you a few questions to configure your project:

1. **Framework detection** — Automatically detects Next.js, Vite, etc.
2. **TypeScript** — Whether to use TypeScript or JavaScript
3. **Component location** — Where to install components (default: `src/components/happly-ui`)
4. **Utility location** — Where to put the `cn()` utility function (default: `src/lib/happly-ui-utils.ts`)

### Add components

Once initialized, add components as needed:

```bash
# Add a single component
bunx @happlyui/cli@latest add button

# Add multiple components
bunx @happlyui/cli@latest add button input card

# List all available components
bunx @happlyui/cli@latest list
```

{% callout title="Alternative package managers" %}
You can use any package manager:

- **bun**: `bunx @happlyui/cli@latest add button`
- **npm**: `npx @happlyui/cli@latest add button`
- **pnpm**: `pnpx @happlyui/cli@latest add button`
  {% /callout %}

---

## Manual Installation

If you prefer to set things up manually:

### 1. Install dependencies

```bash
bun add clsx tailwind-merge class-variance-authority tailwindcss-animate
```

### 2. Configure Tailwind CSS

We provide ready-to-use configuration files for both Tailwind v3 and v4 in the `tailwind-manual-installation` directory of the repository.

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

### 3. Add the utility function

Create `src/lib/happly-ui-utils.ts`:

```ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 3. Configure path aliases

In your `tsconfig.json`, add path aliases:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 4. Copy components

Browse the [components section](/docs/components/button) and copy the source code directly into your project.

---

## Configuration

HapplyUI stores its configuration in `components.json`:

```json
{
  "$schema": "https://cdn.jsdelivr.net/gh/Mindful-Connect/happly-ui-npm@production/schemas/components.schema.json",
  "style": "new-york",
  "typescript": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/styles/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/happly-ui-utils",
    "ui": "@/components/happly-ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

### Configuration options

| Option          | Description                                                |
| --------------- | ---------------------------------------------------------- |
| `typescript`    | Whether to use TypeScript (`true`) or JavaScript (`false`) |
| `tailwind.css`  | Path to your global CSS file                               |
| `aliases.ui`    | Where components will be installed (default: `components/happly-ui`) |
| `aliases.utils` | Where the `cn()` utility lives (default: `lib/happly-ui-utils`)      |

---

## Next Steps

Now that HapplyUI is set up, explore the components:

- [Button](/docs/components/button) — Start with the most common component
