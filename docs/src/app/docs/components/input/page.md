---
title: Input
nextjs:
  metadata:
    title: Input
    description: A text input field for collecting user data.
---

A text input field for collecting user data. {% .lead %}

---

## Installation

```bash
bunx @happlyui/cli@latest add input
```

---

## Usage

```tsx
import { Input } from "@/components/ui/input"

<Input type="email" placeholder="Email" />
```

---

## Examples

### Default

A basic text input with placeholder.

{% preview %}
{% demo-input placeholder="Enter your name" %}{% /demo-input %}
{% /preview %}

```tsx
<Input placeholder="Enter your name" />
```

### Email Input

{% preview %}
{% demo-input type="email" placeholder="Email address" %}{% /demo-input %}
{% /preview %}

```tsx
<Input type="email" placeholder="Email address" />
```

### Password Input

{% preview %}
{% demo-input type="password" placeholder="Password" %}{% /demo-input %}
{% /preview %}

```tsx
<Input type="password" placeholder="Password" />
```

### Disabled

{% preview %}
{% demo-input placeholder="Disabled input" disabled=true %}{% /demo-input %}
{% /preview %}

```tsx
<Input placeholder="Disabled input" disabled />
```

### With Label

Combine with the Label component for accessible forms.

{% preview %}
{% form-group %}
{% demo-label %}Email{% /demo-label %}
{% demo-input type="email" placeholder="you@example.com" %}{% /demo-input %}
{% /form-group %}
{% /preview %}

```tsx
<div className="grid w-full max-w-sm gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="you@example.com" />
</div>
```

### File Input

{% preview %}
{% demo-input type="file" %}{% /demo-input %}
{% /preview %}

```tsx
<Input type="file" />
```

---

## API Reference

### Input

Extends the native `input` element with additional styling.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `'text'` | The input type (text, email, password, etc.) |
| `placeholder` | `string` | - | Placeholder text |
| `disabled` | `boolean` | `false` | Disables the input |
| `className` | `string` | - | Additional CSS classes |

All standard HTML input attributes are also supported.
