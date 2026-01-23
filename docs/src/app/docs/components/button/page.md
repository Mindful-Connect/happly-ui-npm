---
title: Button
nextjs:
  metadata:
    title: Button
    description: A compound button component with variants, modes, sizes, and icon support.
---

A compound button component with variants, modes, sizes, and icon support. {% .lead %}

---

## Installation

```bash
bunx @happlyui/cli@latest add button
```

---

## Usage

```tsx
import * as Button from "@/components/ui/button"

<Button.Root variant="primary" mode="filled">
  Click me
</Button.Root>
```

---

## Examples

### Primary Variant

The primary variant uses the brand color for main call-to-action buttons.

{% preview %}
{% button-group %}
{% demo-button variant="primary" mode="filled" %}Filled{% /demo-button %}
{% demo-button variant="primary" mode="stroke" %}Stroke{% /demo-button %}
{% demo-button variant="primary" mode="lighter" %}Lighter{% /demo-button %}
{% demo-button variant="primary" mode="ghost" %}Ghost{% /demo-button %}
{% /button-group %}
{% /preview %}

```tsx
<Button.Root variant="primary" mode="filled">Filled</Button.Root>
<Button.Root variant="primary" mode="stroke">Stroke</Button.Root>
<Button.Root variant="primary" mode="lighter">Lighter</Button.Root>
<Button.Root variant="primary" mode="ghost">Ghost</Button.Root>
```

### Neutral Variant

The neutral variant uses grayscale colors for secondary actions.

{% preview %}
{% button-group %}
{% demo-button variant="neutral" mode="filled" %}Filled{% /demo-button %}
{% demo-button variant="neutral" mode="stroke" %}Stroke{% /demo-button %}
{% demo-button variant="neutral" mode="lighter" %}Lighter{% /demo-button %}
{% demo-button variant="neutral" mode="ghost" %}Ghost{% /demo-button %}
{% /button-group %}
{% /preview %}

```tsx
<Button.Root variant="neutral" mode="filled">Filled</Button.Root>
<Button.Root variant="neutral" mode="stroke">Stroke</Button.Root>
<Button.Root variant="neutral" mode="lighter">Lighter</Button.Root>
<Button.Root variant="neutral" mode="ghost">Ghost</Button.Root>
```

### Error Variant

The error variant is used for destructive or danger actions.

{% preview %}
{% button-group %}
{% demo-button variant="error" mode="filled" %}Filled{% /demo-button %}
{% demo-button variant="error" mode="stroke" %}Stroke{% /demo-button %}
{% demo-button variant="error" mode="lighter" %}Lighter{% /demo-button %}
{% demo-button variant="error" mode="ghost" %}Ghost{% /demo-button %}
{% /button-group %}
{% /preview %}

```tsx
<Button.Root variant="error" mode="filled">Filled</Button.Root>
<Button.Root variant="error" mode="stroke">Stroke</Button.Root>
<Button.Root variant="error" mode="lighter">Lighter</Button.Root>
<Button.Root variant="error" mode="ghost">Ghost</Button.Root>
```

### Sizes

Available in four sizes: `medium` (default), `small`, `xsmall`, and `xxsmall`.

{% preview %}
{% button-group %}
{% demo-button size="medium" %}Medium{% /demo-button %}
{% demo-button size="small" %}Small{% /demo-button %}
{% demo-button size="xsmall" %}XSmall{% /demo-button %}
{% demo-button size="xxsmall" %}XXSmall{% /demo-button %}
{% /button-group %}
{% /preview %}

```tsx
<Button.Root size="medium">Medium</Button.Root>
<Button.Root size="small">Small</Button.Root>
<Button.Root size="xsmall">XSmall</Button.Root>
<Button.Root size="xxsmall">XXSmall</Button.Root>
```

### Disabled State

{% preview %}
{% button-group %}
{% demo-button disabled=true %}Disabled{% /demo-button %}
{% demo-button variant="neutral" mode="stroke" disabled=true %}Disabled{% /demo-button %}
{% demo-button variant="error" disabled=true %}Disabled{% /demo-button %}
{% /button-group %}
{% /preview %}

```tsx
<Button.Root disabled>Disabled</Button.Root>
<Button.Root variant="neutral" mode="stroke" disabled>Disabled</Button.Root>
<Button.Root variant="error" disabled>Disabled</Button.Root>
```

### With Icons

Use `Button.Icon` to add icons to your button.

{% preview %}
{% button-group %}
{% demo-button variant="primary" mode="filled" icon="mail" %}Send Email{% /demo-button %}
{% demo-button variant="neutral" mode="stroke" icon="chevron-right" iconPosition="right" %}Next{% /demo-button %}
{% demo-button variant="error" mode="filled" icon="trash" %}Delete{% /demo-button %}
{% /button-group %}
{% /preview %}

```tsx
<Button.Root variant="primary" mode="filled">
  <Button.Icon as={MailIcon} />
  Send Email
</Button.Root>

<Button.Root variant="neutral" mode="stroke">
  Next
  <Button.Icon as={ChevronRightIcon} />
</Button.Root>

<Button.Root variant="error" mode="filled">
  <Button.Icon as={TrashIcon} />
  Delete
</Button.Root>
```

### Icon Only

Set `iconOnly` to create square icon-only buttons.

{% preview %}
{% button-group %}
{% demo-button variant="primary" mode="filled" size="medium" iconOnly=true icon="plus" %}{% /demo-button %}
{% demo-button variant="neutral" mode="stroke" size="small" iconOnly=true icon="plus" %}{% /demo-button %}
{% demo-button variant="error" mode="filled" size="xsmall" iconOnly=true icon="trash" %}{% /demo-button %}
{% /button-group %}
{% /preview %}

```tsx
<Button.Root variant="primary" mode="filled" size="medium" iconOnly>
  <Button.Icon as={PlusIcon} />
</Button.Root>

<Button.Root variant="neutral" mode="stroke" size="small" iconOnly>
  <Button.Icon as={PlusIcon} />
</Button.Root>

<Button.Root variant="error" mode="filled" size="xsmall" iconOnly>
  <Button.Icon as={TrashIcon} />
</Button.Root>
```

### Loading State

Combine with a spinner icon for loading states.

{% preview %}
{% demo-button disabled=true icon="loader" %}Please wait{% /demo-button %}
{% /preview %}

```tsx
<Button.Root disabled>
  <Button.Icon as={Loader2} className="animate-spin" />
  Please wait
</Button.Root>
```

### As Child

Use the `asChild` prop to render a different element (like `<a>` or `<Link>`).

```tsx
<Button.Root asChild>
  <a href="/dashboard">Go to Dashboard</a>
</Button.Root>
```

---

## API Reference

### Button.Root

The main button container component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'neutral' \| 'error'` | `'primary'` | The color variant |
| `mode` | `'filled' \| 'stroke' \| 'lighter' \| 'ghost'` | `'filled'` | The visual style |
| `size` | `'medium' \| 'small' \| 'xsmall' \| 'xxsmall'` | `'medium'` | The size of the button |
| `iconOnly` | `boolean` | `false` | Makes the button square for icon-only use |
| `asChild` | `boolean` | `false` | Renders as child element instead of button |
| `disabled` | `boolean` | `false` | Disables the button |
| `className` | `string` | - | Additional CSS classes |

### Button.Icon

A wrapper for icons inside buttons.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `React.ElementType` | `'div'` | The element or component to render |
| `className` | `string` | - | Additional CSS classes |

---

## Legacy API

For backward compatibility with shadcn/ui patterns:

```tsx
import { Button } from "@/components/ui/button"

<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

### Variant Mapping

| Legacy Variant | New Variant + Mode |
|----------------|-------------------|
| `default` | `primary` + `filled` |
| `destructive` | `error` + `filled` |
| `outline` | `neutral` + `stroke` |
| `secondary` | `neutral` + `lighter` |
| `ghost` | `neutral` + `ghost` |
| `link` | `primary` + `ghost` |
