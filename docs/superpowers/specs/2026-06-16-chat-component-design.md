# Chat Component — Design

**Date:** 2026-06-16
**Status:** Approved
**Figma:** [main thread](https://www.figma.com/design/DihFwSu3ZIYwLRHZHJjM2H/?node-id=1051-11556) · [input bar](https://www.figma.com/design/DihFwSu3ZIYwLRHZHJjM2H/?node-id=1051-11593)

## Overview

A composable chat interface component for the HapplyUI registry. Renders a scrollable
message thread (received/sent bubbles, short pills, date/"new message" dividers) plus a
batteries-included message input. Follows the registry's compound-component pattern
(`tv` slots, `cn`, `forwardRef`, namespace exports). Distributed as `ui/chat.tsx` with
stories and a JSON definition.

## Goals

- Robust and reusable; consistent with existing registry components.
- Composable subcomponents — consumer maps their own data and owns message state.
- A default input that works out of the box but is fully overridable.
- Self-managing scroll container with auto-scroll-to-bottom.

## Non-goals

- No message data model / network layer. The component is presentational + input.
- No bundled avatar dependency — avatar is passed in as a `ReactNode` slot.

## Architecture

Single file `packages/registry/ui/chat.tsx`. Two internal React contexts:

- **MessageContext** — `Chat.Message` provides `side` (`'sent' | 'received'`) and resolved
  `tone` so `Chat.Bubble` and `Chat.Timestamp` pick correct colors without prop drilling.
- **ListContext** (internal) — wires the scroll container ref + "stick to bottom" state for
  auto-scroll.

Icons come from `@remixicon/react` (`RiAttachment2`, `RiEmotionLine`, `RiArrowUpLine`),
already used elsewhere in the registry.

## Parts & API

```tsx
import * as Chat from '@/components/ui/chat';

<Chat.Root>
  <Chat.List>
    <Chat.Divider>23 May, 2025</Chat.Divider>
    <Chat.Divider variant="feature">NEW MESSAGE</Chat.Divider>

    <Chat.Message side="received" avatar={<Avatar.Root size="32">…</Avatar.Root>}>
      <Chat.Bubble>
        Long message text…
        <Chat.Timestamp>3:00 PM</Chat.Timestamp>
      </Chat.Bubble>
    </Chat.Message>

    <Chat.Message side="sent">
      <Chat.Bubble>
        Reply text…
        <Chat.Timestamp>3:00 PM</Chat.Timestamp>
      </Chat.Bubble>
    </Chat.Message>

    <Chat.Message side="received">
      <Chat.Bubble shape="pill">
        Hey! <Chat.Timestamp>3:00 PM</Chat.Timestamp>
      </Chat.Bubble>
    </Chat.Message>
  </Chat.List>

  <Chat.Input placeholder="Write a message..." onSend={(text) => …} />
</Chat.Root>
```

### `Chat.Root`
- `div`, `flex flex-col h-full w-full`, `gap-5` (20px) between list and input (matches Figma
  "input 20px after the chat area"). Consumer sets a height on it (or its parent).

### `Chat.List`
- Scroll container: `flex-1 min-h-0 overflow-y-auto`, vertical stack `flex flex-col gap-6`
  (24px row gap from Figma).
- **Auto-scroll**: on mount and when children change, scroll to bottom — but only if the user
  is already near the bottom (tracks scroll position so reading history isn't interrupted).
  Implemented with `useLayoutEffect` + ref, no dependencies. `autoScroll` prop (default `true`)
  to disable.

### `Chat.Message`
- Row layout. Props: `side: 'sent' | 'received'` (required), `avatar?: ReactNode`.
- Gutter logic from Figma: avatar = 32px + 12px gap = **44px**. Both sides reserve 44px so
  avatar-less rows align with avatar rows.
  - container: `flex w-full items-end gap-3`, `justify-end` when `side="sent"` else `justify-start`.
  - far side always padded 44px (`pr-11` received / `pl-11` sent).
  - near side: render `avatar` if provided, else pad 44px.
- Provides MessageContext (`side`).

### `Chat.Bubble`
- Props: `shape?: 'bubble' | 'pill'` (default `'bubble'`), `tone?: 'received' | 'highlight' | 'sent'`
  (default derived from `side`: sent→`sent`, received→`received`).
- `tv` slots/variants:
  - `bubble` shape: `rounded-2xl p-4 flex flex-col gap-3`; grows (`flex-1 min-w-0`).
  - `pill` shape: `rounded-full px-4 py-2.5 flex items-center gap-3`; hugs content (`shrink-0 max-w-full`), aligns to side.
  - tone `received`: `bg-bg-weak-50 text-text-sub-600`.
  - tone `highlight`: `bg-neutral-100 text-text-sub-600` (the post-"NEW MESSAGE" bubble).
  - tone `sent`: purple gradient over `primary-base` (`bg-primary-base` + subtle dark overlay),
    `text-static-white`, `shadow-regular-xs`.
- Text is `text-paragraph-sm`.

### `Chat.Timestamp`
- Small caption, `text-paragraph-xs`. Color via MessageContext/tone: soft-400 on gray tones,
  light-purple on `sent`. In `bubble` shape it sits right-aligned (`self-end` / `ml-auto`); in
  `pill` shape it sits inline after the text.

### `Chat.Divider`
- Centered label between two `bg-stroke-soft-200` rules. `variant: 'default' | 'feature'`.
  - `default`: label `text-subheading-2xs text-text-soft-400` (e.g., a date).
  - `feature`: label `text-subheading-2xs text-primary-base` (e.g., "NEW MESSAGE").

### `Chat.Input` (default + overridable)
Default layout: attachment button (left), auto-grow textarea, emoji + send buttons (right,
send is `bg-bg-weak-50 rounded-10 p-2.5`). Container: `bg-bg-white-0 rounded-2xl p-2 ring-1
ring-inset ring-stroke-soft-200 shadow-regular-xs`.

Props:
- `onSend(text: string): void` — fired on send; clears input when uncontrolled.
- `value?` / `onChange?` — optional controlled mode; otherwise internal state.
- `placeholder?` (default `"Write a message..."`).
- `onAttach?`, `onEmoji?` — click handlers for the default buttons.
- `showAttachment?` / `showEmoji?` (default `true`).
- `leading?` / `actions?` — `ReactNode` slots to fully replace the left / right clusters.
- `disabled?`, `sendDisabled?`.

Behavior: Enter sends, Shift+Enter inserts newline; send button disabled when text is empty
(or `sendDisabled`). Auto-grows up to a max height then scrolls.

Building blocks are also exported (`Chat.SendButton`, and the input is composable) so a fully
custom input can replace the default inside `Chat.Root`.

## Token mapping (Figma → registry)

| Figma | Registry |
| --- | --- |
| radius 16 | `rounded-2xl` |
| radius 10 (send btn) | `rounded-10` |
| neutral/50 #f5f7fa | `bg-bg-weak-50` |
| neutral/100 #f2f5f8 | `bg-neutral-100` |
| feature/base #7d52f4 | `primary-base` |
| stroke/soft-200 #e1e4ea | `stroke-soft-200` |
| 14/20 -0.168 | `text-paragraph-sm` |
| 12/16 | `text-paragraph-xs` |
| 11/12 medium | `text-subheading-2xs` |
| shadow x-small | `shadow-regular-xs` |

## Exports

```ts
export {
  ChatRoot as Root,
  ChatList as List,
  ChatMessage as Message,
  ChatBubble as Bubble,
  ChatTimestamp as Timestamp,
  ChatDivider as Divider,
  ChatInput as Input,
  ChatSendButton as SendButton,
};
```

## Deliverables (CLAUDE.md component steps)

1. `packages/registry/ui/chat.tsx`
2. `packages/registry/ui/chat.stories.tsx` — Default thread, Pills, Dividers, Sent/Received,
   custom input override, scroll demo.
3. `packages/registry/ui/chat.json` — `docs` (lead, usage, examples referencing stories, api).
   `registryDependencies: ["tv", "happly-ui-utils"]`, `dependencies: ["@remixicon/react"]`.
4. `bun run build:registry`
5. Regenerate docs navigation + story registry.
6. Verify in Storybook.

## Testing / verification

- Type-check registry build (`bun run build:registry`) and docs script regeneration succeed.
- Visual check in Storybook against the two Figma frames.
