# HapplyUI × interface skills — review and rebuild report

**Date:** 2026-09-03 · **Branch:** `Arman-improvements` (from `production` @ `b648434`) · **Author:** Arman (Claude Code, Fable 5.1 lead + four Opus sweep agents)

**Skills applied** (installed to `~/.claude/skills`):
`jakubkrehel/skills` (`better-interface`, `better-ui`, `better-typography`, `better-colors`, `better-accessibility`, `better-layout`, `better-writing`, `interface-review`, `explain-interface`, `break`, `variant`), `jakubkrehel/make-interfaces-feel-better`, `jakubkrehel/oklch-skill`.

This document follows `better-interface`'s review format: scope and coverage, one ranked findings table (capped at 15 root causes), verification, verdict. The complete per-component tables (166 rows) are in [`2026-09-03-sweep-details/`](./2026-09-03-sweep-details/).

## Scope and coverage

**Scope.** The whole design system: the token layer (`packages/registry/styles/happly-theme.css`, `happly-theme-v3.css`, the CLI templates and manual-install copies) and all 75 registry components (`.tsx`, `.stories.tsx`, `.json`). The docs site chrome (`docs/src/components`) and the CLI beyond `init`'s CSS/dependency step were out of scope.

**Stack.** React 19, Tailwind v4 (`@theme`), `tailwind-variants` (`tv`), Radix primitives, Remix icons, framer-motion in 4 components, Storybook 10, Next 16 docs. Convention documents found: `CLAUDE.md`, `CONTRIBUTING.md`, `docs/superpowers/specs/2026-06-16-chat-component-design.md`. No interface ADRs, no Storybook docs beyond the stories.

**Method.** The lead measured the tokens (culori + apca-w3: 11 ramps × 11 steps, 33 rendered pairs, 16 focus-ring candidates over both grounds), converted the theme to OKLCH and fixed the systemic token bugs. Four agents each owned a disjoint set of components and applied one shared checklist (`CLAUDE.md` → "Interface conventions") derived from the skill files; every agent read the skills from disk rather than from memory, compiled its new Tailwind classes against the repo's `tailwindcss@4.2.1`, and re-read its own diffs for regressions.

| Domain | Evidence inspected | Result |
| --- | --- | --- |
| Accessibility | every focusable control and its focus classes; every icon-only control in components and stories; hit-area geometry computed from class strings; keyboard models of comboboxes, tab bars, date field, dropzone, section toggle; `aria-*` promises vs behaviour; reduced-motion for CSS and JS motion; label↔control association; Storybook DOM checks for password toggle, select, combo-box, date input | 42 findings (40 fixed, 2 reported) |
| Colors | 627 literals converted; ramps and 33 pairs measured; every raw hex/`rgb()` in components matched against token roles; both dark blocks read | 26 findings (21 fixed, 5 reported) |
| UI polish | every `transition*`, duration and easing; press feedback; enter/exit pairs; concentric radius on every nested rounded surface; image outlines; icon swaps; `tailwindcss-animate` wiring | 38 findings (36 fixed, 2 reported) |
| Typography | `tabular-nums`, `text-balance`/`text-pretty`, truncation recovery, `select-none`, leading, weights, smoothing, input size | 22 findings (21 fixed, 1 reported) |
| Writing | every default string in 75 components, every story string, every `.json` docs example | 27 findings (26 fixed, 1 reported) |
| Layout | grid track lists, fixed heights, grouping gaps, absolute layouts; physical utilities counted (158) rather than migrated | 11 findings (4 fixed, 7 reported) |

Totals: **166 findings, 148 fixed, 18 reported** (every reported item is a design/API/product decision, listed under *Decisions*). 32 of the fixed findings were `better-interface` escalation triggers (HIGH). 177 files changed; 1 script added.

## Findings (ranked, one row per root cause)

| # | Severity | Domain | Location | Before | After | Why |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | HIGH | Accessibility | `styles/happly-theme.css` `--shadow-button-*-focus` (5 tokens), `cli/…/tokens.ts` | 4px ring at 10–16 % alpha: **1.09–1.40:1** over white, 1.08–1.50:1 over `slate-950` | 2px gap + 2px solid ring: primary 4.79 / 3.91, neutral 4.49 / 4.17, error 3.66 / 4.51, warning 3.44 / 5.45, success 4.29 / 4.37 (light / dark) | Escalation trigger: keyboard focus was effectively invisible on every Button, Input, Checkbox, Switch and Radio. Fixed once in the tokens; every consumer inherits it. |
| 2 | HIGH | Accessibility | ~60 icon-only controls: `modal.tsx`, `drawer.tsx`, `banner.tsx`, `file-card.tsx` ×3, `info-card.tsx`, `tag.tsx`, `chat.tsx`, `label.tsx`, `password-input.tsx`, `datepicker.tsx` ×4, `socials-input.tsx` ×2, `color-picker.tsx`, `pagination.stories.tsx` ×18, `alert.stories.tsx` ×22, `compact-button.stories.tsx` ×8, … | `<button><Icon/></button>` | overridable default `aria-label`s (`Close`, `Dismiss`, `Remove {tag}`, `Show/Hide password`, `Previous year`, `Save {label} link`, `More information`, …) with `aria-hidden` glyphs | An unnamed control announces "button" and is untargetable by voice control. |
| 3 | HIGH | Accessibility | `fancy-button.tsx`, `button-group.tsx`, `link-button.tsx`, `slider.tsx`, `switch-toggle.tsx`, `color-picker.tsx`, `switch.tsx`, `radio.tsx`, `checkbox.tsx`, `tag.tsx`, `pagination.tsx`, `tab-menu-horizontal.tsx`, `menu-tab-bar.tsx`, `step-indicator.tsx`, `chat.tsx`, `datepicker.tsx` cells, `select.tsx` (`focus:` → `focus-visible:`), `accordion.tsx`, `file-upload.tsx` dropzone | `outline-none` / `focus:outline-none` with no replacement, or a colour change ≤1.8:1 | `focus-visible:shadow-button-{primary,important,error}-focus` on the control (via `group-focus-visible/*`, `has-[:focus-visible]`, `data-[focus-visible]` where Radix/react-aria own the element) | Escalation trigger: a keyboard-reachable control with no visible focus indicator. |
| 4 | HIGH | Accessibility | `password-input.tsx` (toggle `tabIndex={-1}`), `file-upload.tsx` (`<input type=file className='hidden' tabIndex={-1}>`), `location-input.tsx` (pointer-only suggestion list, remove button `tabIndex={-1}`), `date-input.tsx` (calendar opened by click only, focus dropped to `<body>` on close), `section-toggle.tsx` (`role="button"` with no `onKeyDown`), `tab-menu-horizontal.tsx` / `menu-tab-bar.tsx` (`role="tablist"` with no arrow keys), `socials-input.tsx` (`onPaste` → `preventDefault`) | paths reachable by pointer only | keyboard paths: `sr-only` input + focus ring on the label, a full listbox model (`ArrowUp/Down`, `Home/End`, `Enter`, `Escape`, `aria-activedescendant`), `Enter/Space/ArrowDown` opens the calendar and `onCloseAutoFocus` returns focus, Enter/Space on the header, `ArrowLeft/Right/Home/End` on the tablists (RTL-aware), paste handler deleted | Escalation trigger: a control or path reachable by pointer but not by keyboard. |
| 5 | HIGH | Colors | `happly-theme.css` dark blocks, `happly-theme-v3.css` `.dark` | `--color-primary-base: blue-400`, `-contrast: slate-950`, while `primary-darker` stayed purple-700 (hover flipped hue); V3 used purple-400 + dark ink (the two files disagreed) | purple-500 base, purple-600 hover, purple-700 dark, white label (4.79:1 / 6.24:1), identical in both files | "One colour, one meaning": the brand changed hue on theme switch (AlignUI's blue default leaked through). Confirmed visually in the production Storybook before the change. |
| 6 | HIGH | Accessibility | `markdown-editor.tsx` (`id` on the wrapper div), `radio-card.tsx` (`role=radio` button never named by the wrapping `<label>`), `section-toggle.tsx` (switch with no name), `divider.tsx` (`role=separator` hiding its "OR" label and content), `filter-dropdown.tsx` (`role=listbox` on buttons, `aria-selected` on a `<label>`), `markdown-editor.tsx` (`role=toolbar` without the keyboard model) | names lost or ARIA promising behaviour that did not exist | `id` moved to the textarea, `aria-labelledby`/`aria-describedby` from generated ids, `aria-labelledby={titleId}`, `role` dropped on the content variants, invalid ARIA removed, `role=group` | A role is a promise; no ARIA beats bad ARIA. Two `aria-*` attributes were deliberately deleted because they were invalid. |
| 7 | HIGH | Accessibility | `happly-theme.css` / `-v3.css` (13 `@keyframes`, 0 reduced-motion handling), `emoji-dialog.tsx` (3 `repeat: Infinity` loops), `section-toggle.tsx`, `datepicker.tsx`, `menu-tab-bar.tsx` (`scrollTo({behavior:'smooth'})`), `tab-menu-horizontal.tsx` (`whileTap` scale-up), `ai-orb.tsx` | motion that ignores `prefers-reduced-motion` | global kill-switch in both theme files (durations 0.01 ms so `animationend` still fires); `useReducedMotion()` in every framer-motion component; smooth scroll gated; the tab `whileTap` removed together with its framer-motion dependency | Escalation trigger. JS-driven motion is not reached by the CSS switch, so it is guarded per component. |
| 8 | HIGH | Accessibility | `status-indicator.tsx` (coloured dot only), `password-input.tsx` (criteria met/unmet by icon colour), `label.tsx` (required asterisk), `level-bar.tsx`, `progress-bar.tsx`, `dot-stepper.tsx`, `step-indicator.tsx` | state carried by colour or width alone | `role=img` + per-status label; `sr-only` "Met"/"Not met"; `sr-only` "(required)" + `aria-required` via the form-field context; `role=meter` with value text; `aria-valuenow/min/max` on the root; `aria-current="step"` | Escalation trigger: state or meaning carried by colour alone. |
| 9 | HIGH | Layout | `banner.tsx:17` `grid-cols-[1fr,auto,1fr]`; `location-input.tsx` `rounded-8` (no such token); `accordion.tsx` `blur-0` (does not exist in v4, caught before landing) | classes that compiled to invalid or empty CSS | `grid-cols-[1fr_auto_1fr]`, `rounded-lg`, `blur-none` | Tailwind v4 emits arbitrary values verbatim; the Banner's three-column layout had never applied. Found by compiling every new class against `tailwindcss@4.2.1`. |
| 10 | MEDIUM | UI polish | `packages/registry/storybook.css`, 9 overlay `.json` files, `cli/src/commands/init.ts`, `README.md` | `tailwindcss-animate` loaded only by the docs site; `animate-in`/`fade-*`/`zoom-*`/`slide-*` compiled to **nothing** in Storybook (0 rules) and in CLI-installed projects | `@plugin 'tailwindcss-animate'` in `storybook.css` (+ root devDependency); `tailwindcss-animate` in the `dependencies` of modal, drawer, popover, tooltip, dropdown, select, filter-dropdown, progress-bar, emoji-dialog; `init` writes the `@plugin` line and installs the package; README documents the v3 `plugins` entry | Every overlay enter/exit animation in the system was inert outside the docs site. |
| 11 | MEDIUM | Accessibility | `checkbox.tsx` (20px), `radio.tsx` (20px), `switch.tsx` (20px tall), `tag.tsx` dismiss (16px), `compact-button.tsx` medium (20px), `badge.tsx` group toggle (20px), `banner.tsx` / `alert.stories.tsx` close (16–20px), `slider.tsx` thumb (16px), `color-picker.tsx` thumb (12px), `label.tsx` info (20px), `password-input.tsx` toggle, `location-input.tsx` remove, `socials-input.tsx` confirm, `dot-stepper.tsx` | targets under the WCAG 2.5.8 24 × 24 floor | pseudo-element hit areas (`after:absolute after:-inset-0.5`, `after:size-6 after:-translate-1/2`), collision-checked against the real story gaps; `dot-stepper` xsmall reaches 10 × 24 only (gap-limited, reported) | Small targets are missed by touch and by anyone with a tremor; the drawing does not change. |
| 12 | MEDIUM | Colors | `file-upload.tsx` (81 literals in 5 illustrations), `emoji-dialog.tsx` (12 literals + 3 white scrims + black grid), `empty-state.tsx` (`#EAECF0` inside a `data:` URI), `modal.tsx` (white fade, `rgba(0,0,0)` grid, `hover:bg-neutral-100`), `badge.tsx` (`ring-neutral-200 bg-white`), `status-indicator.tsx` (`#47C2FF`), `info-card.tsx`, `textarea.tsx`, `logo-upload.stories.tsx`, `happly-theme.css` (`#335cff` AlignUI blue inside two shadow tokens) | hardcoded light-mode colours that inverted or vanished in dark mode; a primitive where a role token existed | semantic tokens in role (`fill-stroke-soft-200`, `bg-bg-white-0`, `fill-verified-base`, `bg-static-white/40`, `var(--color-neutral-alpha-10)`); an inline SVG with `currentColor` for the dashed border; `color-mix(in srgb, var(--color-text-strong-950) 15%, transparent)` hairlines; two new tokens `--shadow-card-raised` and `--drop-shadow-regular-sm` for the two depth values with no role | "Use a token only in its role"; the dark theme now renders every component from the same tokens. |
| 13 | MEDIUM | Accessibility | `input.tsx`, `textarea.tsx` (`aria-invalid` on a role-less wrapper), `lib/form-field-context.ts` + `form-field.tsx` (no description id), every text control | errors and hints never announced with the field | `aria-invalid` on the control; context now carries `required` and `describedBy` (stable `${id}-message` id on the hint/error); controls set `aria-describedby` / `aria-required` from it | Errors must announce beside the field that failed. |
| 14 | MEDIUM | UI polish | `button.tsx`, `compact-button.tsx`, `fancy-button.tsx` (press feedback); 7 files with `transition-all` + ~15 bare `transition` shorthands; overlay enter/exit pairs in `drawer`, `popover`, `tooltip`, `dropdown`, `accordion`, `section-toggle`, `applied-filters`, `level-bar`, `step-indicator`; `password-input.tsx` and `accordion.tsx` icon swaps; 5 nested surfaces with non-concentric radii (`info-card` 16→20, `chat` composer 10→8, `filter-dropdown` rows 10→8, `combo-box`/`location-input` rows 10→8, `section-toggle` story 10→8); every `<img>` | motion and surfaces that broke the `better-ui` rules | `active:not-disabled:scale-[0.96]` with a `static` prop (documented in the JSON); named transition lists (`transition-[background-color,color,box-shadow,scale,width]`); enters 200 ms / exits 150 ms `ease-out`; CSS cross-fade (`scale .25`, `blur 4px`, `cubic-bezier(0.2,0,0,1)`) for the eye and chevron glyphs; outer = inner + padding; `outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10` on 9 image surfaces | The details that compound: interruptible, named, softer on the way out, concentric, outlined. |
| 15 | MEDIUM | Typography · Writing | ~20 numeric surfaces (badges, pagination, progress, steps, counters, currency/digit/date/phone inputs, calendar cells, file sizes, timestamps, table `numeric` cells); 8 `truncate`/`line-clamp` sites; titles/descriptions in modal, drawer, empty-state, section, cards, dialogs; ~100 `...`; ~50 title-case labels; 14 "Please/must" errors; 4 shrug empty states; typos (`harrassment`, `Must contain at least;`); `Delete Forever`, `OK`-style confirmations | proportional digits, unrecoverable truncation, orphans, three periods, title case, verdict-style errors | `tabular-nums`; `title={…}`; `text-balance` / `text-pretty`; `…`; sentence case; "Enter at least 2 characters." style instructions; `No results for “{query}”` + an exit; `Keep account` / `Delete account` | Numbers that hold still, copy a tired reader gets on the first pass. |

## Decisions for Ari (reported, not changed)

Measured and surfaced; each is a design, API or product call rather than a defect the skills could fix silently.

1. **Status fills with white labels** fail WCAG AA 4.5:1 — error `3.66:1`, warning `2.79:1`, success `2.36:1`, away/yellow `1.82:1` (all pass the 3:1 UI bar). Options: keep, or move filled status buttons to the `-600`/`-700` steps.
2. **Soft text** `text-soft-400` on white is `2.63:1` (APCA 51); dark-mode soft text is `4.17:1`. Repointing to `slate-500` gives `4.49:1`.
3. **Dark-mode accent**: fixed to purple-500 + white label. The alternative that keeps the old "light fill, dark label" look is purple-400 + `slate-950` (5.18:1).
4. **Ramp step lightness** differs by hue at `500` (blue 0.555 … yellow 0.812), so same-step badges differ in weight; blue and sky sit at 100 % of sRGB chroma. A re-spaced palette is a proposal, not a fix.
5. **Input text at 14 px** triggers iOS Safari zoom on focus; the two fixes change either the look (16 px on mobile) or the code (`transform: scale()`).
6. **Banner close button** at 48 % opacity fails 3:1 non-text contrast; it is the AlignUI treatment across variants.
7. **Highlight state** `bg-bg-weak-50` on `bg-bg-white-0` (~1.05:1) is the roving-focus cue in dropdown, command-menu and accordion — identical to hover; raising it is a token decision.
8. **Drawer header/footer** carry `border-stroke-soft-200` without `border-b`/`border-t`, so no separators render (Modal has them). One class each, but visible.
9. **SectionToggle** header is `role="button"` and *contains* the Switch (nested interactive); keyboard now works, but the structure should be one control.
10. **FadeScroll** hides its scrollbar on a non-focusable container: keyboard users cannot scroll it unless a child is focusable.
11. **Tab bars** take one Tab stop per tab; APG roving `tabindex` was skipped because every tab may be unselected (it would trap the whole list). Needs a selection-aware Root.
12. **PromotionalCard** positions content at fixed pixel offsets inside `min-h-[137px] overflow-hidden`; longer or translated strings clip.
13. **Copy**: `Require changes` (publication status) reads as an imperative — `Changes requested`.
14. **Currency / phone `Select.Trigger`** accessible names are their values ("CAD", "+1"); needs a visually hidden label.
15. **Phone input** caret jumps to the end mid-edit and an E.164 paste truncates the last digit (functional, not skills). Its country `Select` and the number input now both carry the field's `aria-describedby` (announced twice); isolating the select's context, as `currency-input` does, would also stop the dropdown triggering validation on close.
16. **Dashed frames** (file-upload dropzone, bordered empty state) are now inline SVGs stroked in `currentColor` instead of `data:` URIs, so they follow the theme; both read `stroke-sub-300`. The dropzone is unchanged in light mode (`sub-300` is the `#CACFD8` it hardcoded), but the empty state's frame moves from `#EAECF0` to `#CACFD8` — slightly more visible in light, and the two frames now match. One line to revert if that is too strong.
17. **`text-[#B8ACF6]`** in `logo-upload.stories.tsx` became `text-primary-200`; a "soft brand foreground" role token would close it. `key-icon.tsx` rings use `ring-blue-100`-style primitives for the same reason.
18. **Physical utilities**: 158 `pl-`/`pr-`/`ml-`/`mr-`/`left-`/`right-` occurrences remain (counted per group); direction-critical ones are the avatar indicator offsets, the level-bar fill and the menu-tab-bar indicator. New classes use logical utilities.
19. **Security, out of the skills' scope:** `markdown-editor.tsx` renders `marked.parse(value)` through `dangerouslySetInnerHTML` without sanitising — `<img src=x onerror=…>` executes in the preview. Needs a sanitiser (DOMPurify) — flagged, not fixed.

## Considered but rejected

| Location | Candidate | Rejected because |
| --- | --- | --- |
| all cards (`info-card`, `file-card`, `radio-card`, `section-toggle`, avatars) | replace `ring-1 ring-stroke-soft-200 shadow-regular-xs` with layered shadows | That ring is the system's surface language (AlignUI); a deliberate project choice is not a finding. |
| `tokens.ts` raw palette | convert the V3 plugin palette to oklch | Tailwind v3 cannot derive `/opacity` modifiers from `oklch()` strings. |
| whole registry | mass-migrate physical → logical utilities | 158 sites of churn for an LTR-only product today; counted and documented instead. |
| `switch.tsx` thumb `scale-[.833]` | apply the 0.96 press rule | It is the switch's own thumb squish, not a whole-button press. |
| dropdown / command-menu / select rows | remove `select-none`, shorten hover to 150 ms | Menu rows are drag-select surfaces; 200 ms is the registry-wide hover duration — consistency over a 50 ms delta. |
| `ai-orb.tsx`, `color-picker.tsx`, `theme-provider.tsx`, `avatar-empty-icons.tsx`, `textarea.tsx` masks | tokenise literals | Illustration art, picker data, computed contrast values and mask luminance are not UI colours. |
| `modal.tsx` `DialogPrimitive.Content` `focus:outline-none` | ring on the dialog container | Programmatic focus on open; Radix's own pattern; every control inside has its own ring. |
| `body {}` in the theme | `text-wrap: balance` on all headings | Too global for a token file consumed by arbitrary apps; applied per component. |

## Verification

Passed:

- `bun x tsc --noEmit` (root) and `bun run --cwd packages/cli typecheck` → clean; `bun run --cwd packages/cli build` → bundle built.
- `bun run lint` → **119 problems (30 errors, 89 warnings), identical to the `production` baseline**; each agent additionally proved its residual errors pre-existing by linting the `HEAD` copy of the file.
- `bunx prettier --check` on every touched file → clean.
- `bun run build:registry` → 91 items; Tailwind plugin, CLI theme templates and manual-install copies regenerated by the new `scripts/sync-theme-templates.ts` (idempotent: second run reports "unchanged").
- `bun run --cwd docs scripts/generate-navigation.ts` / `generate-story-registry.ts` → 78 components, new `Table` stories registered.
- `bun run build-storybook` → static build completed; `bun run --cwd docs build` (Next 16, `--webpack`) → all 78 component pages prerendered.
- `bunx @tailwindcss/cli -i packages/registry/storybook.css`: compiles; 441 `oklch()` declarations; the focus-ring rules, `.shadow-card-raised`, `.drop-shadow-regular-sm` and the `animate-in`/`fade-in-0`/`zoom-in-95` utilities are present (they were absent before).
- Colour math: `culori` conversions (627 literals, 0 hex/`rgb()` left in either theme file), WCAG 2 + APCA on 33 pairs and 16 ring candidates (tables in `sweep-details/tokens-and-theme.md`).
- Storybook (:6006, DOM/computed-style checks): dark theme renders `bg-primary-base` as `oklch(0.577 0.229 289.43)` with a white label; Button's transition list is `background-color, color, box-shadow, scale, width`; body font smoothing `antialiased`; password toggle `tabIndex 0`, `aria-pressed`, 24 × 24 `::after`; Select trigger paints the ring only on `:focus-visible`; ComboBox empty copy and 16/8/8 radii; Date Input opens on Enter and returns focus on Escape. Production Storybook (:6007) confirmed the *before* state: blue accent in dark mode, no visible focus ring.

Not verified:

- Screen-reader announcement order, `dir="rtl"`, 200 % zoom / 320 px reflow, motion replayed at 10 % speed, an automated axe run.
- `location-input`'s new keyboard model end-to-end (needs the Google Places API, absent in Storybook).
- A Tailwind v3 consumer project built from the regenerated plugin.

## Second pass (same day)

A second review ran over all 75 components after the first. Its mandate was to find what a class-string review cannot see — behaviour, states and content stress — and to land the items the first pass deferred. It was worth running: the first pass had never actually driven a component.

**What the first pass missed, as patterns rather than instances**

| Pattern | Evidence |
| --- | --- |
| Components were read, never operated | `currency-input`, `digit-input` and `socials-input` resolve their value as `prop ?? RHF binding ?? nothing` with no internal state. Used uncontrolled — exactly as the published Default stories show them — they are **inert**: you type and nothing happens. Fixed with the `combo-box` uncontrolled pattern. |
| A state can be wrong even when its classes are right | `Button`'s `loading` state had no usable accessible name and stayed keyboard-activatable (`aria-disabled` + `pointer-events-none` does not stop Enter, so it double-submits). `pagination` had no `disabled:` rule at all, so a disabled arrow looked enabled. |
| Nothing had been tested with real content | No component survived a 160-character unbroken token; one spilled 1143px out of a RadioCard. `badge`, `tag` and the `avatar-group` counter are fixed-height pills with no `whitespace-nowrap`, so long labels render outside their own background. `Popover` and `Tooltip` laid out 2315px wide in a 1280px viewport — unreachable — while sibling `Dropdown` already had the guard. |
| Motion config can be dead code | `emoji-dialog`'s five spring `duration:` values do nothing — motion-dom lets `stiffness`/`damping`/`mass` override `duration`/`bounce` — which had been hiding a footer/bubble collision at `delay: 0.35`. `badge`'s `leading-none` has always been stripped by tailwind-merge. `password-input` still shipped `blur-0`, which does not exist in Tailwind v4, so the open-state glyph stayed blurred. |
| The first pass's own fixes needed checking | Its `file-upload` edit left a `children` reference that was never destructured; the dropzone's `text-*` colour sat on the label rather than the frame. Both fixed. |

**Landed in the second pass**

- **Security:** `markdown-editor` now sanitises `marked` output with DOMPurify, verified against a real payload (`<img src=x onerror>` neutralised, `javascript:` stripped, ordinary markdown byte-identical). `dompurify` added to the component's `dependencies` so the CLI installs it.
- **Deferred items closed:** drawer separators; fade-scroll keyboard region (with a `label` prop, and no tab stop when nothing overflows); banner and alert close-button hover/focus restore; section-toggle's nested `role="button"` removed so the Switch is the single control; roving `tabindex` on both tab bars, Root-driven with a first-enabled fallback; `promotional-card` re-laid out in flow at pixel parity; currency and country triggers now announce "Currency CAD" / "Country +1"; phone caret preserved mid-edit and E.164 paste handled; `Require changes` → `Changes requested`.
- **Motion:** Modal and the Drawer overlay had no enter/exit durations at all and now match every sibling at 200ms in / 150ms out; `select` and the datepicker collapse likewise; the `menu-tab-bar` indicator from 300ms `ease-in-out` to 150ms `ease-out`; the combo-box selected check cross-fades; three bare `transition-colors` that silently resolved to `ease-in-out`; the `applied-filters` chip exit no longer jumps the row 8px sideways.
- **Lead-owned:** the dashed frames in `file-upload` and `empty-state` no longer use `calc()` in SVG geometry (Chromium-only) — a wrapper inset by half the stroke gives the same 1px line everywhere, verified at 0.5px on all four sides. The last four "Please …" strings, all inside published docs code samples, are gone.

**Still open after two passes** — see *Decisions for Ari*, which these added to: the menu highlight token (six sites; `bg-bg-weak-50` on `bg-bg-white-0` measures **1.07:1** in light and 1.23:1 in dark, and is the only cue for a keyboard-highlighted row — an inset 2px `stroke-strong-950` ring would measure 17.45:1, but how a highlighted row should look is a design decision); the theme-switch smear (13 sites, needs one shared utility); the required asterisk double-announcing with `aria-required`; the indeterminate progress bar freezing at a misleading static 40% under reduced motion; `date-input` opening the calendar without moving focus into it; Radix `Select.Content` having no `Presence`, so its exit animation can never run.

## Third pass — Ari's decisions applied (2026-09-03)

Ari was asked to rule on the open items and chose four. Each is applied and exercised in the browser, not just written.

| Decision | What landed | Verified |
| --- | --- | --- |
| **Status fills** — fix the label, keep the fill | New `--color-{role}-contrast` tokens follow the existing `primary-contrast` naming. White measures below the 3:1 floor on the light-end hues, so `warning`, `success`, `away`, `verified` and `stable` resolve to `static-black`; `error`, `information`, `feature`, `highlighted` and `faded` keep `static-white`. Applied at every filled-status site: `file-format-icon`, `key-icon`, `banner`, `alert`, `button`, `fancy-button`, `step-indicator`, `emoji-dialog`, and `badge` (raw ramps, so `text-static-black` spelled out). Tokens are theme-invariant by design — the choice follows the fill's own lightness. | Measured live in Storybook (dark mode, `file-format-icon --colors`): the four flipped hues went 2.86 → **6.55**, 3.44 → **5.44**, 2.53 → **7.41**, 2.11 → **8.89**. All AA at 11px. |
| **Motion — theme-switch smear** | `[data-theme-switching]` in both theme files suppresses every transition, plus `withoutThemeTransitions()` in `lib/happly-ui-utils.ts` for consumers that toggle the theme by hand (`next-themes` already does this via `disableTransitionOnChange`). | Driven on a live Button: `transition-duration` 0.2s → **0s** with `transition-property: none` while the attribute is set, and back to 0.2s after. |
| **Motion — indeterminate progress bar** | `motion-reduce:w-full`. Frozen mid-slide the 40%-wide segment read as "40% done", a number the component never claimed; full width reads as "busy, amount unknown", which is what `aria-busy` already says. | Compiled rule confirmed (`@media (prefers-reduced-motion: reduce){width:100%}`) and confirmed to win on source order (line 4739 vs `w-2/5` at 1064). Geometry proven by swapping the class live: 153.6px → 384px. Reduced-motion *rendering* not exercised — the browser tool has no emulation for it. |
| **Motion — step-indicator** | `fillTransitionMs` default 500 → 300, matching the step icon beside it and `level-bar`. Documented on the prop. | — |
| **Motion — chat entrance** | New messages fade and rise 4px over 200ms. The trap is the mount guard: `ChatList` publishes "has painted" through context and `ChatMessage` captures it on its first render, so loaded history never animates. | Driven live: 6 history rows on load, **0 animated**; sending a message animated **exactly 1** row (`animation-name: enter`, 0.2s). |
| **iOS zoom** | Inputs and textareas are `text-paragraph-md sm:text-paragraph-sm` — 16px below `sm`, 14px above. | Measured at three widths: 639px → **16px**, 900px → **14px**, field height **40px at both** (no layout shift). |

**Declined by Ari, on record:** the menu highlight token (1.07:1) stays as designed, and `text-soft-400` (2.63:1) stays soft.

**Could not be delivered:** the `Select` close animation. `@radix-ui/react-select@2.2.6` moves `Select.Content` into a detached `DocumentFragment` the moment `open` goes false (`dist/index.mjs:261-268`) — there is no `Presence` wrapper and no `forceMount` escape, so no exit animation can run. Faking it means making `Select.Root` internally controlled and delaying the close by the exit duration, which changes an exported API and holds the menu interactive while it fades. Not done unilaterally. The `data-[state=closed]` classes stay in place, commented, so they are already correct if Radix gains `Presence`.

**Bug found and fixed while doing this:** `scripts/sync-theme-templates.ts` matched each template block up to the first `` `; `` — so a CSS comment containing a backtick immediately followed by a semicolon truncated the generated `happly-theme.ts` and left the rest of the theme loose in the file (caught as a new lint error, one above the 30-error baseline). The delimiter now requires an unescaped backtick via a `(?<!\\)` lookbehind, and the script is idempotent across repeat runs.

## Fourth pass — motion, audited against `better-ui` (2026-09-03)

Ari spotted by eye what three passes of reading class strings had not: the chat entrance I had just written did not follow `better-ui/enter-exit.md` at all, and the "done" marker I had recoloured was black in both themes. Both were fair. The earlier passes audited accessibility, colour, typography, writing and layout in depth; **motion had never been checked against the skill's own numbers**. This pass does exactly that, rule by rule, because `better-ui` states them as exact values rather than ranges.

### Fixed

| Severity | Rule | Location | Before | After | Why |
| --- | --- | --- | --- | --- | --- |
| MEDIUM | *Motion restraint* — high-frequency interactions get opacity/colour at ≤150ms | 66 sites across 32 components | `duration-200` on hover/press/focus state transitions | `duration-150` | Buttons, menu rows, dropdown and combo-box options, badges, tags, inputs, pagination, datepicker cells and tab bars are all high-frequency surfaces. Overlay enter animations were deliberately left at 200ms in / 150ms out — that is the `enter-exit.md` rule, not the high-frequency one, and the two were separated by matching on `animate-in` / `data-[state=…]` rather than by hand. |
| MEDIUM | *Transition only what changes* | 34 sites across 15 components | bare `transition` | `transition-[…]` naming the properties each element actually changes | Tailwind's bare `transition` covers sixteen properties including `transform`, `filter` and `backdrop-filter`. Each site was read first: the combo-box chevron animates `rotate`, the input root only `box-shadow`, the select logo `color,opacity` (it drops to 48% when disabled). |
| MEDIUM | *Contextual icon animations* — scale `0.25`, opacity `0`, blur `4px`, `cubic-bezier(0.2,0,0,1)` | `step-indicator.tsx:383,391,405` | `transition-[opacity,scale] duration-300 ease-out` with `scale-75` and no blur | the exact recipe, with `blur-none` standing in for the skill's `blur-0` (which does not exist in Tailwind v4) | The last icon cross-fade in the system still off-recipe; `accordion`, `combo-box` and `password-input` already matched. |
| MEDIUM | *Split and stagger enter animations* — combine opacity, blur and translateY | `chat.tsx` + `--animate-item-in` | `fade-in-0 slide-in-from-bottom-1 duration-200` | `item-in`: opacity 0→1, `translateY(12px)`→0, `blur(4px)`→0 over 400ms `ease-out` | Ari's words: "خیلی سریع و یهویی". The blur is what stops it reading as a jump cut, and it is the part the skill is most explicit about. |
| MEDIUM | Contrast vs. convention | `step-indicator.tsx:405` | the completed marker's glyph turned `static-black` in both themes by the third pass | new `--color-success-solid` / `-solid-contrast`: light green-700 + white glyph (4.30:1), dark green-400 + dark glyph (10.89:1) | A regression I introduced. White on `success-base` really does fail the 3:1 icon floor (2.36:1 light, 2.86:1 dark), but a black tick reads as neither "green" nor "done". Deliberately theme-aware, unlike the `-contrast` pair, because it is a dedicated surface rather than a label on `-base`. |

### A regression this pass caught in itself

Naming the combo-box chevron's transition `rotate` was correct in isolation and wrong in place: that element merges its classes with `Input.Icon`'s, and `tailwind-merge` keeps only the last `transition-property`, so the icon's colour easing disappeared. It is now `transition-[color,rotate]`, verified live (`transition-property: color, rotate`, rotate `none` → `180deg`). Every other named site was checked for the same merge hazard; there are none.

### Verified already compliant

`transition-all` / `transition: all` — **0 occurrences**. Press feedback — `active:not-disabled:scale-[0.96]`, exactly the prescribed value, with a `static` prop to switch it off. `will-change` — none, so none to misuse. `AnimatePresence` — one usage, already `initial={false}`. Motion library — `framer-motion` only, one import path across three files, never mixed with `motion/react`. Image outlines, theme-switch suppression and the reduced-motion kill-switch — landed in earlier passes.

### Verification

Every change exercised in the browser rather than read: step markers measured mid-flight (`blur(4px)` → `blur(0.95px)`, `scale 0.25` → `0.82`, `cubic-bezier(0.2, 0, 0, 1)`, 0.3s); the chat entrance mid-flight (`blur(3.33px)`, opacity 0.17, 0.4s, `both`); the chevron rotation; the done marker in both themes (light `green-700` + white, dark `green-400` + dark glyph); the rail advancing 31 → 85 → 139px. `tsc` clean, lint at the 119/30/89 baseline, prettier clean, registry and docs built.

## Fifth pass — sweeping the rest for demoable changes (2026-09-04)

Ari asked for anything else worth showing. A ten-agent workflow read the real `git diff` of every
one of the ~60 changed components, proposed side-by-side demos, and then had each proposal
adversarially verified against one question: *would a designer who is not told what to look for
notice this within a few seconds, in a 300px pane?* **32 proposed, 20 survived, 12 refuted** — and
almost every refusal was the same shape: the code change is real, the demo shows nothing.

Nine new demos landed, each measured in the browser before deploying:

| Demo | Measured difference |
| --- | --- |
| `emoji-dialog` scrim in dark mode | The decorative wash was a hardcoded `rgb(255,255,255)`; in dark mode it painted an opaque white slab over the lower half of the dialog, and the heading on it is white too. Now `oklch(0.183 …)`, the surface token. |
| `digit-input` | Typing `1234`: before `["","","",""]`, after `["1","2","3","4"]`. |
| `radio-card` long address | Before: one line, 393px of text painted out of a 144px box. After: three lines, fits. |
| `promotional-card` long copy | Card height 137px (clipped) → 168px (grew). |
| `markdown-editor` | A pasted note carrying an `onerror` handler: the old preview runs it, the new one does not. |
| `fancy-button` keyboard focus | Real Tab: before keeps only its resting 1px border, after gets `0 0 0 2px` page colour + `0 0 0 4px` accent. |
| `button-group` keyboard focus | Real Tab: before ring `none` with a grey label, after a 2px/4px ring and a white label. |
| `table` numeric column | `text-align` `start,start,start` → `start,end,start,end`. |
| `combo-box` empty search | "No results found." → "No results for “zzz”. Clear the search to see every option." |
| `socials-input` + status badges | The truncated "Choose the social media…" prompt, and a no-entry glyph on a *pending* state. |

**Dropped after measuring, despite the underlying change being real** — this is the part worth
keeping:

- `section` heading `text-balance`: the property applies (`text-wrap: wrap` → `balance`) but the
  rendered heading was **48px tall in both panes at every width tried**. No visible difference, so
  no demo.
- `radio-card`'s first draft used `finance@northwindgroup.example`, which fits the card either way.
  The demo only became honest once the address had no break opportunity in it.
- `select`'s focus ring (`focus:` → `focus-visible:`, so a mouse pick no longer leaves the ring
  stuck on the closed trigger): the change is real and the same mechanism is proven on the two
  button demos, but the select would not open under automation in this environment, so the demo
  could not be exercised. Left off rather than shipped unverified.
- Every overlay (`modal`, `drawer`, `popover`, `tooltip`, `dropdown`): `Content` embeds its own
  portal to `document.body` and takes no `container`, so it cannot render inside a comparison pane.
- `alert`, `key-icon` and the `emoji-dialog` warning bubble all show the same status-fill contrast
  fix the file-format icons and badges already demonstrate; adding them would repeat one story
  three more times.

The page now carries **35 demos**. The `markdown-editor` demo deliberately executes its payload in
the before pane — that is the only way the fix is visible. The payload is static, writes a single
sentence into its own container, and makes no network call.

## Sixth pass — merging #76 and sweeping what it brought (2026-09-08)

`production` gained the six Education Center QA fixes (#76) while this branch was open. All seven
files it touched are files this branch had also rewritten, so the merge came first: two real
conflicts, both resolved in our favour because our side was a superset (we had already dropped
emoji-dialog's duplicate `h-5` *and* tokenised the shadow; our radio-card context carries the
titleId/descriptionId the label wiring needs). Each of the six QA fixes was then checked
individually rather than trusting a clean merge — all six present.

Three agents then ran the skills over the code the merge introduced. **Every QA fix is preserved.
Two of them were re-implemented, because both had a defect their own pass had not surfaced:**

| Component | What the skills found in the new code |
| --- | --- |
| `radio-card` | The echo guard mis-swallowed real input. Two clicks 10ms apart left an `allowDeselect` card stuck ON — the `setTimeout(0)` had not fired, so the second *real* click was eaten. Rebuilt to arm only when the browser will actually forward the click and to swallow exactly the one echo returning on `[role="radio"]`. Verified by count: 1, 2 and 3 rapid clicks now produce exactly 1, 2 and 3 toggles. |
| `filter-dropdown` | The re-baseline wrote to a **ref**, which cannot invalidate the `hasChanges` memo — so Apply stayed enabled after Apply and re-fired `onApply`. Baseline is now state. Closing also always rewinds to it: previously open → change → Apply → change again → close left the checkboxes showing a filter the list never received. Driven end to end in the browser; a `role="status"` region now announces the result, which nothing did before. |
| `switch-toggle` | QA's `disabled` reached `Group` but not the documented `<List disabled>` path, which still shipped `tabindex="0"` with fully operable triggers. Fixed via a List→Trigger context; both disabled lists now report `tabindex="-1"` with every trigger natively disabled. Separately, the selected option now keeps `text-sub-600` when disabled (7.14:1) instead of fading to `disabled-300` with everything else — matching `radio-card.tsx:39`. Fading them equally left `aria-selected` as the only cue. |
| `file-upload` | `opacity-60` on a disabled dropzone composited on top of slots that already swap to disabled tokens: description 1.30:1, dashed frame 1.30:1, Button chip ring **1.10:1**. Replaced with button/select's own `bg-bg-weak-50 text-text-disabled-300` recipe. The `archive` preset was also written in the pre-sweep voice ("Browse File", "50MB") and now matches its five siblings. |
| `empty-state` | Three duplicated inline `size` prop types collapsed into a shared type, matching `AlertSharedProps`. |
| `emoji-dialog` | `[&>*]:w-5` sized width only, so a Remixicon child kept its 24px height attribute and rendered 20×24. Now `size-5`. |

**Left for Ari:** `empty-state` still needs `size` passed by hand in composed usage; every other slotted
component auto-propagates through `recursiveCloneChildren`, but adopting that here means adding a
registry dependency to a component the QA team just touched, so it is a follow-up rather than part
of this branch. Separately, inside a `<form>` Radix's radio calls `stopPropagation()`, so
`allowDeselect` does nothing when the click starts on the Indicator — pre-existing, and a fix would
change Radix-level behaviour.

## Before/after showcase

`packages/registry/showcase/skills-before-after.stories.tsx` renders every visible change as a jakub.kr/skills-style page: the real component from `production` (verbatim snapshot in `showcase/before/`, with the old focus-ring and dark-accent token values restored) next to the current one. Open it in Storybook under **Skills → Before and after**, or directly at `http://localhost:6006/iframe.html?id=skills-before-and-after--before-and-after&viewMode=story`. The snapshot is not part of the registry, is excluded from lint, and should be deleted together with the story when it has served its purpose.

## Verdict

**Approve.** No HIGH finding remains unfixed. Everything still open is a listed decision. Nothing is committed or pushed; the branch is ready for Ari's review and a pull request to `production` for Sean to merge.
