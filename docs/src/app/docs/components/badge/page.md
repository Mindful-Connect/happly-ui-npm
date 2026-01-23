---
title: Badge
nextjs:
  metadata:
    title: Badge
    description: A small status indicator for highlighting information.
---

A small status indicator for highlighting information. {% .lead %}

---

## Installation

```bash
bunx @happlyui/cli@latest add badge
```

---

## Usage

```tsx
import { Badge } from "@/components/ui/badge"

<Badge>Badge</Badge>
```

---

## Examples

### Default

The default badge uses the primary brand color.

{% preview %}
{% demo-badge variant="default" %}Badge{% /demo-badge %}
{% /preview %}

```tsx
<Badge>Badge</Badge>
```

### Secondary

A subtle badge for secondary information.

{% preview %}
{% demo-badge variant="secondary" %}Secondary{% /demo-badge %}
{% /preview %}

```tsx
<Badge variant="secondary">Secondary</Badge>
```

### Destructive

Used for error states or destructive actions.

{% preview %}
{% demo-badge variant="destructive" %}Destructive{% /demo-badge %}
{% /preview %}

```tsx
<Badge variant="destructive">Destructive</Badge>
```

### Outline

A bordered badge without a filled background.

{% preview %}
{% demo-badge variant="outline" %}Outline{% /demo-badge %}
{% /preview %}

```tsx
<Badge variant="outline">Outline</Badge>
```

### All Variants

{% preview %}
{% button-group %}
{% demo-badge variant="default" %}Default{% /demo-badge %}
{% demo-badge variant="secondary" %}Secondary{% /demo-badge %}
{% demo-badge variant="destructive" %}Destructive{% /demo-badge %}
{% demo-badge variant="outline" %}Outline{% /demo-badge %}
{% /button-group %}
{% /preview %}

```tsx
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
```

---

## API Reference

### Badge

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'secondary' \| 'destructive' \| 'outline'` | `'default'` | The visual style of the badge |
| `className` | `string` | - | Additional CSS classes |
