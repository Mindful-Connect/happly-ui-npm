---
title: Card
nextjs:
  metadata:
    title: Card
    description: A container component for grouping related content.
---

A container component for grouping related content. {% .lead %}

---

## Installation

```bash
bunx @happlyui/cli@latest add card
```

---

## Usage

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
```

---

## Examples

### Basic Card

A simple card with header and content.

{% preview %}
{% demo-card %}
{% demo-card-header %}
{% demo-card-title %}Notifications{% /demo-card-title %}
{% demo-card-description %}You have 3 unread messages.{% /demo-card-description %}
{% /demo-card-header %}
{% demo-card-content %}
{% demo-button variant="primary" mode="filled" %}View all{% /demo-button %}
{% /demo-card-content %}
{% /demo-card %}
{% /preview %}

```tsx
<Card>
  <CardHeader>
    <CardTitle>Notifications</CardTitle>
    <CardDescription>You have 3 unread messages.</CardDescription>
  </CardHeader>
  <CardContent>
    <Button>View all</Button>
  </CardContent>
</Card>
```

### Card with Footer

A card with header, content, and footer.

{% preview %}
{% demo-card %}
{% demo-card-header %}
{% demo-card-title %}Create project{% /demo-card-title %}
{% demo-card-description %}Deploy your new project in one-click.{% /demo-card-description %}
{% /demo-card-header %}
{% demo-card-content %}
{% form-group %}
{% demo-label %}Project name{% /demo-label %}
{% demo-input placeholder="my-awesome-project" %}{% /demo-input %}
{% /form-group %}
{% /demo-card-content %}
{% demo-card-footer %}
{% demo-button variant="neutral" mode="stroke" %}Cancel{% /demo-button %}
{% demo-button variant="primary" mode="filled" %}Create{% /demo-button %}
{% /demo-card-footer %}
{% /demo-card %}
{% /preview %}

```tsx
<Card>
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one-click.</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="grid w-full gap-1.5">
      <Label htmlFor="name">Project name</Label>
      <Input id="name" placeholder="my-awesome-project" />
    </div>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Create</Button>
  </CardFooter>
</Card>
```

---

## API Reference

### Card

The main container component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |

### CardHeader

Container for the card's header content.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |

### CardTitle

The card's title element.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |

### CardDescription

A subtitle or description below the title.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |

### CardContent

The main content area of the card.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |

### CardFooter

Container for actions or footer content.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
