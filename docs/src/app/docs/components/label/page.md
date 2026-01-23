---
title: Label
nextjs:
  metadata:
    title: Label
    description: An accessible label for form controls.
---

An accessible label for form controls. {% .lead %}

---

## Installation

```bash
bunx @happlyui/cli@latest add label
```

---

## Usage

```tsx
import { Label } from "@/components/ui/label"

<Label htmlFor="email">Email</Label>
```

---

## Examples

### Default

A basic label for form inputs.

{% preview %}
{% demo-label %}Email address{% /demo-label %}
{% /preview %}

```tsx
<Label>Email address</Label>
```

### With Input

Combine with the Input component for accessible forms.

{% preview %}
{% form-group %}
{% demo-label %}Username{% /demo-label %}
{% demo-input placeholder="Enter username" %}{% /demo-input %}
{% /form-group %}
{% /preview %}

```tsx
<div className="grid w-full max-w-sm gap-1.5">
  <Label htmlFor="username">Username</Label>
  <Input id="username" placeholder="Enter username" />
</div>
```

### Disabled State

When the associated input is disabled, the label adapts its style.

{% preview %}
{% form-group %}
{% demo-label disabled=true %}Disabled field{% /demo-label %}
{% demo-input placeholder="Can't edit this" disabled=true %}{% /demo-input %}
{% /form-group %}
{% /preview %}

```tsx
<div className="grid w-full max-w-sm gap-1.5">
  <Label htmlFor="disabled" className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
    Disabled field
  </Label>
  <Input id="disabled" placeholder="Can't edit this" disabled />
</div>
```

---

## API Reference

### Label

Built on top of Radix UI's Label primitive.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `htmlFor` | `string` | - | The id of the form element the label is for |
| `className` | `string` | - | Additional CSS classes |

All standard HTML label attributes are also supported.
