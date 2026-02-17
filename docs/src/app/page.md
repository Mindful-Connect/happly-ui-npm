---
title: Getting started
nextjs:
  metadata:
    title: Getting started
    description: Beautiful React components you own and customize.
---

A copy-paste component registry for React. Beautiful, accessible components built with Radix UI and Tailwind CSS. {% .lead %}

{% quick-links %}

{% quick-link title="Installation" icon="installation" href="/docs/installation" description="Step-by-step guide to set up HapplyUI in your project." /%}

{% quick-link title="Components" icon="presets" href="/docs/components/button" description="Explore our collection of beautiful, accessible components." /%}

{% /quick-links %}

---

## What is HapplyUI?

HapplyUI is a **copy-paste component registry** inspired by shadcn/ui. Unlike traditional component libraries, you don't install HapplyUI as a dependency—instead, you copy the component source code directly into your project.

This approach gives you:

- **Full ownership** — The code is yours to customize however you want
- **No dependency lock-in** — Components don't break when we update
- **Complete flexibility** — Modify styles, behavior, and structure freely
- **Smaller bundles** — Only include what you actually use

---

## Quick start

Get started with HapplyUI in just a few commands.

### Initialize your project

Run the init command to set up your project with the required configuration and utilities:

```bash
bunx @happlyui/cli@latest init
```

This will:

1. Create a `happly-ui-components.json` configuration file
2. Add the `cn()` utility function to your project
3. Configure path aliases if needed

### Add components

Once initialized, you can add components using the `add` command:

```bash
bunx @happlyui/cli@latest add button
```

The component source code will be copied to your project, ready for customization.

{% callout title="Package manager support" %}
HapplyUI CLI works with bun, npm, pnpm, and yarn. Use whichever package manager your project uses: `npx`, `bunx`, or `pnpx`.
{% /callout %}

---

## Built with modern tools

HapplyUI components are built using industry-standard tools:

- **React** — The foundation for building user interfaces
- **Radix UI** — Unstyled, accessible UI primitives
- **Tailwind CSS** — Utility-first CSS framework
- **Class Variance Authority** — For managing component variants
- **TypeScript** — Full type safety out of the box

---

## Getting help

If you run into any issues or have questions:

### GitHub Issues

Report bugs or request features on our [GitHub repository](https://github.com/Mindful-Connect/happly-ui-npm).

### Community

Join the conversation and get help from the community. We're here to help you build beautiful interfaces.
