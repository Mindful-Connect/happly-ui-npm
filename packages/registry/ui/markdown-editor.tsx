'use client';

import * as React from 'react';
import {
  RiBold,
  RiItalic,
  RiUnderline,
  RiStrikethrough,
  RiListCheck,
  RiListOrdered2,
  RiLink,
  RiEyeLine,
  RiEditLine,
} from '@remixicon/react';

import DOMPurify from 'dompurify';
import { marked } from 'marked';

import * as SwitchToggle from '@/components/ui/switch-toggle';
import type { SwitchToggleGroupItem } from '@/components/ui/switch-toggle';
import * as Textarea from '@/components/ui/textarea';
import * as Tooltip from '@/components/ui/tooltip';
import { useFormField } from '@/lib/form-field-context';
import { cn } from '@/lib/happly-ui-utils';
import { useFormFieldBinding } from '@/lib/use-form-field-binding';

// ---------------------------------------------------------------------------
// Markdown formatting helpers
// ---------------------------------------------------------------------------

type FormatAction =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'checklist'
  | 'ordered-list'
  | 'link';

const INLINE_FORMATS: Record<string, { prefix: string; suffix: string }> = {
  bold: { prefix: '**', suffix: '**' },
  italic: { prefix: '_', suffix: '_' },
  underline: { prefix: '<u>', suffix: '</u>' },
  strikethrough: { prefix: '~~', suffix: '~~' },
};

function applyFormat(
  textarea: HTMLTextAreaElement,
  action: FormatAction,
  onChange?: (value: string) => void
) {
  const { selectionStart: start, selectionEnd: end, value } = textarea;
  const selected = value.slice(start, end);

  const inline = INLINE_FORMATS[action];
  if (inline) {
    const before = value.slice(
      Math.max(0, start - inline.prefix.length),
      start
    );
    const after = value.slice(end, end + inline.suffix.length);

    if (before === inline.prefix && after === inline.suffix) {
      const newValue =
        value.slice(0, start - inline.prefix.length) +
        selected +
        value.slice(end + inline.suffix.length);
      setNativeValue(textarea, newValue, onChange);
      textarea.selectionStart = start - inline.prefix.length;
      textarea.selectionEnd = end - inline.prefix.length;
      textarea.focus();
      return;
    }

    const text = selected || 'text';
    const replacement = `${inline.prefix}${text}${inline.suffix}`;
    const newValue = value.slice(0, start) + replacement + value.slice(end);
    setNativeValue(textarea, newValue, onChange);
    textarea.selectionStart = start + inline.prefix.length;
    textarea.selectionEnd = start + inline.prefix.length + text.length;
    textarea.focus();
    return;
  }

  if (action === 'link') {
    const text = selected || 'text';
    const replacement = `[${text}](url)`;
    const newValue = value.slice(0, start) + replacement + value.slice(end);
    setNativeValue(textarea, newValue, onChange);
    const urlStart = start + text.length + 3;
    textarea.selectionStart = urlStart;
    textarea.selectionEnd = urlStart + 3;
    textarea.focus();
    return;
  }

  if (action === 'checklist' || action === 'ordered-list') {
    const lineStart = getLineStart(value, start);
    const lineEnd = getLineEnd(value, end);
    const block = value.slice(lineStart, lineEnd);
    const replacement =
      action === 'checklist'
        ? toggleLinePrefix(block, '- [ ] ')
        : toggleNumberedPrefix(block);
    const newValue =
      value.slice(0, lineStart) + replacement + value.slice(lineEnd);
    setNativeValue(textarea, newValue, onChange);
    textarea.selectionStart = textarea.selectionEnd =
      lineStart + replacement.length;
    textarea.focus();
  }
}

function setNativeValue(
  textarea: HTMLTextAreaElement,
  value: string,
  onChange?: (value: string) => void
) {
  const nativeSetter = Object.getOwnPropertyDescriptor(
    HTMLTextAreaElement.prototype,
    'value'
  )?.set;
  nativeSetter?.call(textarea, value);
  textarea.dispatchEvent(new Event('input', { bubbles: true }));
  onChange?.(value);
}

function getLineStart(value: string, pos: number) {
  const idx = value.lastIndexOf('\n', pos - 1);
  return idx === -1 ? 0 : idx + 1;
}

function getLineEnd(value: string, pos: number) {
  const idx = value.indexOf('\n', pos);
  return idx === -1 ? value.length : idx;
}

function toggleLinePrefix(block: string, prefix: string) {
  const lines = block.split('\n');
  const allPrefixed = lines.every((l) => l.startsWith(prefix));
  return lines
    .map((l) => (allPrefixed ? l.slice(prefix.length) : `${prefix}${l}`))
    .join('\n');
}

function toggleNumberedPrefix(block: string) {
  const lines = block.split('\n');
  const allNumbered = lines.every((l) => /^\d+\.\s/.test(l));
  if (allNumbered) {
    return lines.map((l) => l.replace(/^\d+\.\s/, '')).join('\n');
  }
  return lines.map((l, i) => `${i + 1}. ${l}`).join('\n');
}

function useMarkdownFormatting(
  textareaRef: React.RefObject<HTMLTextAreaElement | null>,
  onChange?: (value: string) => void
) {
  return React.useCallback(
    (action: FormatAction) => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      applyFormat(textarea, action, onChange);
    },
    [textareaRef, onChange]
  );
}

// ---------------------------------------------------------------------------
// Markdown → HTML renderer (uses marked, sanitised with DOMPurify)
// ---------------------------------------------------------------------------

marked.setOptions({
  breaks: true,
  gfm: true,
});

function renderMarkdown(md: string): string {
  const html = marked.parse(md, { async: false }) as string;

  // `marked` does not sanitize: `<img src=x onerror=…>` typed into the editor
  // would execute in the preview. DOMPurify strips scripts, event handlers and
  // `javascript:` URLs, but its default profile is wider than a markdown
  // preview needs — it keeps `<style>`, `<form>` and its controls, and `id` /
  // `name`. Those are not XSS, but in a preview pane they are still the
  // author's markup reaching out of the box: `<style>body{display:none}</style>`
  // blanks the host page, `<form action=…>` renders a working form inside the
  // consumer's own form, and an authored `id` can collide with the field id a
  // <label for> points at. So: the HTML profile only (no SVG / MathML), minus
  // the tags and attributes markdown never emits.
  //
  // `input` is deliberately NOT forbidden: a GFM task list — what the
  // toolbar's checklist button writes — renders as
  // `<input type=checkbox disabled>`, and forbidding the tag would strip the
  // checkboxes out of the preview. With `form` and `name` gone it has nothing
  // to submit to and no value to carry.
  //
  // DOMPurify needs a DOM. On the server `isSupported` is false and
  // `sanitize()` would return the input unchanged, so render nothing until the
  // client takes over rather than shipping unsanitised HTML.
  if (!DOMPurify.isSupported) return '';

  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ['style', 'form', 'button', 'textarea', 'select'],
    FORBID_ATTR: ['id', 'name'],
  });
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

type MarkdownEditorContextValue = {
  hasError: boolean;
  disabled: boolean;
  previewing: boolean;
};

const MarkdownEditorContext = React.createContext<MarkdownEditorContextValue>({
  hasError: false,
  disabled: false,
  previewing: false,
});

function useMarkdownEditorContext() {
  return React.useContext(MarkdownEditorContext);
}

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

type MarkdownEditorRootProps = React.HTMLAttributes<HTMLDivElement> & {
  hasError?: boolean;
  disabled?: boolean;
  previewing?: boolean;
};

function MarkdownEditorRoot({
  className,
  children,
  hasError: hasErrorProp = false,
  disabled: disabledProp = false,
  previewing = false,
  ...rest
}: MarkdownEditorRootProps) {
  const formField = useFormField();
  const hasError = hasErrorProp || formField.hasError;
  const disabled = disabledProp || formField.disabled;

  const contextValue = React.useMemo<MarkdownEditorContextValue>(
    () => ({ hasError, disabled, previewing }),
    [hasError, disabled, previewing]
  );

  return (
    <MarkdownEditorContext.Provider value={contextValue}>
      <div
        className={cn(
          'bg-bg-weak-50 @container/mde flex w-full flex-col gap-2 rounded-2xl p-2',
          disabled &&
            'bg-bg-white-0 ring-stroke-soft-200 pointer-events-none ring-1 ring-inset',
          className
        )}
        {...rest}
      >
        {children}
      </div>
    </MarkdownEditorContext.Provider>
  );
}
MarkdownEditorRoot.displayName = 'MarkdownEditorRoot';

// ---------------------------------------------------------------------------
// Toolbar
// ---------------------------------------------------------------------------

type ToolbarProps = React.HTMLAttributes<HTMLDivElement>;

function Toolbar({ className, children, ...rest }: ToolbarProps) {
  return (
    <Tooltip.Provider delayDuration={300}>
      <div
        className={cn(
          'flex flex-wrap items-center justify-center gap-2 px-2 py-1 @[450px]/mde:justify-between',
          className
        )}
        // `role="toolbar"` promises arrow-key navigation between items; these
        // buttons are a plain Tab sequence, so `group` is the honest role.
        role='group'
        aria-label='Formatting options'
        {...rest}
      >
        {children}
      </div>
    </Tooltip.Provider>
  );
}
Toolbar.displayName = 'MarkdownEditorToolbar';

type ToolbarButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  tooltip?: string;
};

const ToolbarButton = React.forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ className, active, tooltip, children, ...rest }, forwardedRef) => {
    const { disabled } = useMarkdownEditorContext();

    const button = (
      <button
        ref={forwardedRef}
        type='button'
        disabled={disabled}
        aria-pressed={active}
        className={cn(
          'text-text-sub-600 flex h-7 w-7 items-center justify-center rounded-md outline-none',
          'transition-[background-color,color,box-shadow] duration-150 ease-out',
          'hover:bg-bg-soft-200 hover:text-text-strong-950',
          'focus-visible:ring-stroke-strong-950 focus-visible:ring-2',
          active && 'bg-bg-soft-200 text-text-strong-950',
          'disabled:text-text-disabled-300 disabled:pointer-events-none',
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );

    if (!tooltip) return button;

    return (
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{button}</Tooltip.Trigger>
        <Tooltip.Content size='xsmall' sideOffset={6}>
          {tooltip}
        </Tooltip.Content>
      </Tooltip.Root>
    );
  }
);
ToolbarButton.displayName = 'MarkdownEditorToolbarButton';

type ToolbarGroupProps = React.HTMLAttributes<HTMLDivElement>;

function ToolbarGroup({ className, children, ...rest }: ToolbarGroupProps) {
  return (
    <div className={cn('flex items-center gap-0.5', className)} {...rest}>
      {children}
    </div>
  );
}
ToolbarGroup.displayName = 'MarkdownEditorToolbarGroup';

type ToolbarSeparatorProps = React.HTMLAttributes<HTMLDivElement>;

function ToolbarSeparator({ className, ...rest }: ToolbarSeparatorProps) {
  return (
    <div
      role='separator'
      aria-orientation='vertical'
      className={cn('bg-stroke-soft-200 mx-1 h-4 w-px', className)}
      {...rest}
    />
  );
}
ToolbarSeparator.displayName = 'MarkdownEditorToolbarSeparator';

// ---------------------------------------------------------------------------
// Toggle
// ---------------------------------------------------------------------------

type ToggleProps = Omit<
  React.ComponentPropsWithoutRef<typeof SwitchToggle.Group>,
  'children'
>;

function Toggle({ listClassName, triggerClassName, ...props }: ToggleProps) {
  const { disabled } = useMarkdownEditorContext();

  return (
    <div className='w-full @[450px]/mde:w-auto'>
      <SwitchToggle.Group
        // When disabled, fall back to the List's base bg-bg-weak-50 so the
        // track matches the disabled design on the white editor shell.
        listClassName={cn(!disabled && 'bg-bg-soft-200', listClassName)}
        // On this darker track the hover pill goes lighter (toward the white
        // active pill) — the component's default darker hover would vanish
        // against bg-soft-200.
        triggerClassName={cn(
          'data-[state=inactive]:hover:bg-bg-weak-50',
          triggerClassName
        )}
        disabled={disabled}
        {...props}
      />
    </div>
  );
}
Toggle.displayName = 'MarkdownEditorToggle';

// ---------------------------------------------------------------------------
// Content (textarea for edit, rendered HTML for preview)
// ---------------------------------------------------------------------------

type ContentProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'value' | 'onChange' | 'children'
> & {
  hasError?: boolean;
  height?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

// Props the preview <div> keeps when it stands in for the textarea. The
// textarea-only attributes (rows, placeholder, maxLength, …) mean nothing on a
// div and would render as invalid attributes, so only the ones that identify
// the field to assistive tech and to a <label for> are carried over.
function pickPreviewProps(
  props: Record<string, unknown>
): React.HTMLAttributes<HTMLDivElement> & { id?: string } {
  const preview: Record<string, unknown> = {};
  for (const key of Object.keys(props)) {
    if (
      key === 'id' ||
      key === 'title' ||
      key === 'lang' ||
      key === 'dir' ||
      key === 'tabIndex' ||
      key.startsWith('aria-') ||
      key.startsWith('data-')
    ) {
      preview[key] = props[key];
    }
  }
  return preview as React.HTMLAttributes<HTMLDivElement> & { id?: string };
}

const Content = React.forwardRef<HTMLTextAreaElement, ContentProps>(
  (
    {
      className,
      hasError: hasErrorProp,
      height = '200px',
      value = '',
      onChange,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      'aria-required': ariaRequired,
      ...rest
    },
    forwardedRef
  ) => {
    const {
      hasError: contextHasError,
      disabled,
      previewing,
    } = useMarkdownEditorContext();
    const formField = useFormField();
    const hasError = hasErrorProp ?? (contextHasError || formField.hasError);

    const internalRef = React.useRef<HTMLTextAreaElement | null>(null);
    const lastValueRef = React.useRef(value);

    // Sync external value → DOM only when it differs from what the
    // textarea already contains (avoids cursor reset during typing).
    React.useLayoutEffect(() => {
      const el = internalRef.current;
      if (el && el.value !== value) {
        el.value = value;
      }
      lastValueRef.current = value;
    }, [value]);

    const mergedRef = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        internalRef.current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          (
            forwardedRef as React.MutableRefObject<HTMLTextAreaElement | null>
          ).current = node;
        }
      },
      [forwardedRef]
    );

    // marked's parse plus DOMPurify's parse/serialise on every render of a
    // component that re-renders on every keystroke. Only the value matters,
    // and only while the preview is on screen.
    const previewHtml = React.useMemo(
      () => (previewing ? renderMarkdown(value) : ''),
      [previewing, value]
    );

    if (previewing) {
      // The preview replaces the textarea in the DOM, so it has to keep the
      // props that point at the field: with `<FormField.Root htmlFor="bio">`
      // around `<MarkdownEditor.Composed id="bio">`, dropping the id here
      // leaves the label's `for` (and any `aria-describedby`) dangling for as
      // long as Preview is on.
      //
      // The aria set is resolved here rather than left to `pickPreviewProps`
      // so the preview carries the same describedby/invalid/required the
      // textarea gets from `FormFieldContext` in edit mode — otherwise the
      // hint or error is announced with the field only while editing.
      // Explicit props still win — they are folded into the values below.
      return (
        <div
          {...pickPreviewProps(rest)}
          aria-describedby={
            [ariaDescribedBy, formField.describedBy]
              .filter(Boolean)
              .join(' ') || undefined
          }
          aria-invalid={ariaInvalid ?? (hasError || undefined)}
          aria-required={ariaRequired ?? (formField.required || undefined)}
          className={cn(
            'markdown-editor-preview',
            'bg-bg-white-0 shadow-regular-xs w-full overflow-y-auto rounded-xl px-3 py-2.5',
            'ring-stroke-soft-200 ring-1 ring-inset',
            'text-paragraph-sm text-text-strong-950',
            // authored images get the same 1px outline as every other image
            '[&_img]:outline-image-outline [&_img]:outline [&_img]:outline-1 [&_img]:-outline-offset-1',
            disabled && 'bg-bg-white-0/80 ring-transparent',
            className
          )}
          style={{ minHeight: height }}
          dangerouslySetInnerHTML={{ __html: previewHtml }}
        />
      );
    }

    return (
      <Textarea.Root
        ref={mergedRef}
        simple
        hasError={hasError}
        disabled={disabled}
        defaultValue={value}
        onChange={onChange}
        className={cn(
          'thin-scrollbar hover:!bg-bg-white-0 hover:!ring-stroke-soft-200',
          className
        )}
        style={{ minHeight: height }}
        // Passed through unresolved on purpose: `Textarea` reads the same
        // `FormFieldContext` and merges `describedBy` / `required` itself, so
        // merging here too would repeat the hint id in `aria-describedby`.
        // `aria-invalid` is spread only when set — `Textarea` derives it from
        // `hasError`, and passing the key as `undefined` would clear that.
        aria-describedby={ariaDescribedBy}
        aria-required={ariaRequired}
        {...(ariaInvalid !== undefined ? { 'aria-invalid': ariaInvalid } : {})}
        {...rest}
      />
    );
  }
);
Content.displayName = 'MarkdownEditorContent';

// ---------------------------------------------------------------------------
// Toolbar icon config
// ---------------------------------------------------------------------------

const DEFAULT_TOOLBAR_ICONS = [
  { key: 'bold' as const, icon: RiBold, label: 'Bold' },
  { key: 'italic' as const, icon: RiItalic, label: 'Italic' },
  { key: 'underline' as const, icon: RiUnderline, label: 'Underline' },
  {
    key: 'strikethrough' as const,
    icon: RiStrikethrough,
    label: 'Strikethrough',
  },
  { key: 'checklist' as const, icon: RiListCheck, label: 'Checklist' },
  {
    key: 'ordered-list' as const,
    icon: RiListOrdered2,
    label: 'Ordered list',
  },
  { key: 'link' as const, icon: RiLink, label: 'Link' },
];

// ---------------------------------------------------------------------------
// Default toggle items
// ---------------------------------------------------------------------------

const DEFAULT_TOGGLE_ITEMS: SwitchToggleGroupItem[] = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'French' },
];

/**
 * Compact flag-only variant of the language toggle. Pass via
 * `toggleItems={DEFAULT_FLAG_TOGGLE_ITEMS}` for a more visually lightweight
 * switch. Flags sourced from the same circle-flags library used by the
 * currency-input component.
 */
const DEFAULT_FLAG_TOGGLE_ITEMS: SwitchToggleGroupItem[] = [
  {
    value: 'en',
    label: (
      <img
        src='https://mindful-connect.github.io/circle-flags/flags/ca.svg'
        alt='English'
        className='outline-image-outline h-5 w-5 shrink-0 rounded-full outline outline-1 -outline-offset-1 transition-[filter,opacity] duration-150 [[data-state=inactive]_&]:opacity-60 [[data-state=inactive]_&]:grayscale'
      />
    ),
  },
  {
    value: 'fr',
    label: (
      <img
        src='https://mindful-connect.github.io/circle-flags/flags/fr.svg'
        alt='French'
        className='outline-image-outline h-5 w-5 shrink-0 rounded-full outline outline-1 -outline-offset-1 transition-[filter,opacity] duration-150 [[data-state=inactive]_&]:opacity-60 [[data-state=inactive]_&]:grayscale'
      />
    ),
  },
];

// ---------------------------------------------------------------------------
// Composed
// ---------------------------------------------------------------------------

/** Per-language values object, keyed by toggle value (e.g. `{ english: "...", french: "..." }`) */
type LocalizedValue = Record<string, string>;

type ComposedBaseProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'value' | 'defaultValue' | 'onChange' | 'children'
> & {
  hasError?: boolean;
  disabled?: boolean;
  /** Root container className */
  containerClassName?: string;
  /** Content area className */
  contentClassName?: string;
  /** Height of the editor content area */
  height?: string;
  /** Override the FormFieldContext name for RHF binding (useful for multi-lang parent paths) */
  name?: string;
};

type ComposedSingleProps = ComposedBaseProps & {
  /** Hide the language toggle */
  toggleItems: false;
  /** Markdown content (controlled) */
  value?: string;
  /** Initial markdown content (uncontrolled) */
  defaultValue?: string;
  /** Callback with markdown string on every change */
  onChange?: (markdown: string) => void;
  toggleValue?: never;
  defaultToggleValue?: never;
  onToggleChange?: never;
};

type ComposedMultiProps = ComposedBaseProps & {
  /** Override the default English/French toggle items, or omit for defaults */
  toggleItems?: SwitchToggleGroupItem[];
  /** Per-language markdown values (controlled) */
  value?: LocalizedValue;
  /** Initial per-language values (uncontrolled) */
  defaultValue?: LocalizedValue;
  /** Callback with the full values object on every change */
  onChange?: (values: LocalizedValue) => void;
  /** Controlled active language */
  toggleValue?: string;
  /** Default active language */
  defaultToggleValue?: string;
  /** Callback when the active language changes */
  onToggleChange?: (value: string) => void;
};

type ComposedProps = ComposedSingleProps | ComposedMultiProps;

function Composed(props: ComposedProps) {
  const {
    hasError,
    disabled,
    containerClassName,
    contentClassName,
    height,
    id,
    name,
    ...rest
  } = props;

  const isSingle = props.toggleItems === false;

  return isSingle ? (
    <ComposedSingle
      hasError={hasError}
      disabled={disabled}
      containerClassName={containerClassName}
      contentClassName={contentClassName}
      height={height}
      id={id}
      name={name}
      value={(rest as ComposedSingleProps).value}
      defaultValue={(rest as ComposedSingleProps).defaultValue}
      onChange={(rest as ComposedSingleProps).onChange}
      toggleItems={false}
      placeholder={props.placeholder}
      {...filterTextareaProps(rest)}
    />
  ) : (
    <ComposedMulti
      hasError={hasError}
      disabled={disabled}
      containerClassName={containerClassName}
      contentClassName={contentClassName}
      height={height}
      id={id}
      name={name}
      toggleItems={(rest as ComposedMultiProps).toggleItems}
      value={(rest as ComposedMultiProps).value}
      defaultValue={(rest as ComposedMultiProps).defaultValue}
      onChange={(rest as ComposedMultiProps).onChange}
      toggleValue={(rest as ComposedMultiProps).toggleValue}
      defaultToggleValue={(rest as ComposedMultiProps).defaultToggleValue}
      onToggleChange={(rest as ComposedMultiProps).onToggleChange}
      placeholder={props.placeholder}
      {...filterTextareaProps(rest)}
    />
  );
}
Composed.displayName = 'MarkdownEditorComposed';

/** Strip out props that belong to Composed so only textarea-safe props remain */
function filterTextareaProps(
  props: Record<string, unknown>
): Record<string, unknown> {
  const {
    value: _v,
    defaultValue: _dv,
    onChange: _oc,
    toggleItems: _ti,
    toggleValue: _tv,
    defaultToggleValue: _dtv,
    onToggleChange: _otc,
    hasError: _he,
    disabled: _d,
    containerClassName: _cc,
    contentClassName: _coc,
    height: _h,
    id: _id,
    name: _n,
    ...textarea
  } = props;
  return textarea;
}

// ---------------------------------------------------------------------------
// Single-language composed (toggleItems={false})
// ---------------------------------------------------------------------------

function ComposedSingle({
  hasError,
  disabled,
  value: controlledValue,
  defaultValue = '',
  onChange: onChangeProp,
  containerClassName,
  contentClassName,
  height,
  id,
  name: nameProp,
  toggleItems: _,
  ...textareaProps
}: ComposedSingleProps & { toggleItems: false; name?: string }) {
  const binding = useFormFieldBinding<string>(
    nameProp ? { name: nameProp } : undefined
  );

  // Priority: explicit props > RHF binding > internal state
  const hasExplicitValue = controlledValue !== undefined;
  const onChange = onChangeProp ?? binding?.onChange;

  const [previewing, setPreviewing] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(
    controlledValue ?? defaultValue
  );
  const isControlled = hasExplicitValue || (!!binding && !onChangeProp);
  const value = hasExplicitValue
    ? controlledValue
    : binding && !onChangeProp
      ? (binding.value ?? '')
      : internalValue;

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const latestRef = React.useRef({ isControlled, onChange });
  latestRef.current = { isControlled, onChange };

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const v = e.target.value;
      if (!latestRef.current.isControlled) setInternalValue(v);
      latestRef.current.onChange?.(v);
    },
    []
  );

  const formatCallback = React.useCallback((v: string) => {
    if (!latestRef.current.isControlled) setInternalValue(v);
    latestRef.current.onChange?.(v);
  }, []);

  const format = useMarkdownFormatting(textareaRef, formatCallback);

  return (
    <MarkdownEditorRoot
      hasError={hasError}
      disabled={disabled}
      previewing={previewing}
      className={containerClassName}
    >
      <Toolbar>
        <ToolbarGroup>
          {DEFAULT_TOOLBAR_ICONS.map(({ key, icon: Icon, label }) => (
            <ToolbarButton
              key={key}
              onClick={() => format(key)}
              tooltip={label}
              aria-label={label}
              disabled={disabled || previewing}
            >
              <Icon className='h-5 w-5' />
            </ToolbarButton>
          ))}
          <ToolbarSeparator />
          <ToolbarButton
            onClick={() => setPreviewing((p) => !p)}
            tooltip={previewing ? 'Edit' : 'Preview'}
            aria-label={previewing ? 'Edit' : 'Preview'}
            active={previewing}
          >
            {previewing ? (
              <RiEditLine className='h-5 w-5' />
            ) : (
              <RiEyeLine className='h-5 w-5' />
            )}
          </ToolbarButton>
        </ToolbarGroup>
      </Toolbar>
      <Content
        ref={textareaRef}
        id={id}
        className={contentClassName}
        height={height}
        value={value}
        onChange={handleChange}
        {...textareaProps}
      />
    </MarkdownEditorRoot>
  );
}

// ---------------------------------------------------------------------------
// Multi-language composed (default — with toggle)
// ---------------------------------------------------------------------------

function ComposedMulti({
  hasError,
  disabled,
  toggleItems,
  value: controlledValues,
  defaultValue: defaultValues,
  onChange: onChangeProp,
  toggleValue: controlledLang,
  defaultToggleValue = 'en',
  onToggleChange,
  containerClassName,
  contentClassName,
  height,
  id,
  name: nameProp,
  ...textareaProps
}: ComposedMultiProps & { name?: string }) {
  const binding = useFormFieldBinding<LocalizedValue>(
    nameProp ? { name: nameProp } : undefined
  );

  // Priority: explicit props > RHF binding > internal state
  const hasExplicitValue = controlledValues !== undefined;
  const onChange = onChangeProp ?? binding?.onChange;

  const items = toggleItems || DEFAULT_TOGGLE_ITEMS;

  // Build initial values object from toggle items
  const buildEmpty = React.useCallback(
    () => Object.fromEntries(items.map((i) => [i.value, ''])) as LocalizedValue,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items.map((i) => i.value).join(',')]
  );

  const [previewing, setPreviewing] = React.useState(false);
  const [internalValues, setInternalValues] = React.useState<LocalizedValue>(
    () => ({
      ...buildEmpty(),
      ...defaultValues,
    })
  );
  const [internalLang, setInternalLang] = React.useState(defaultToggleValue);

  const isControlled = hasExplicitValue || (!!binding && !onChangeProp);
  const values = hasExplicitValue
    ? { ...buildEmpty(), ...controlledValues }
    : binding && !onChangeProp
      ? { ...buildEmpty(), ...(binding.value ?? {}) }
      : internalValues;
  const activeLang = controlledLang ?? internalLang;
  const activeValue = values[activeLang] ?? '';

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const latestRef = React.useRef({
    values,
    activeLang,
    isControlled,
    onChange,
    controlledLang,
    onToggleChange,
  });
  latestRef.current = {
    values,
    activeLang,
    isControlled,
    onChange,
    controlledLang,
    onToggleChange,
  };

  const updateValue = React.useCallback((newText: string) => {
    const { values, activeLang, isControlled, onChange } = latestRef.current;
    const next = { ...values, [activeLang]: newText };
    if (!isControlled) setInternalValues(next);
    onChange?.(next);
  }, []);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateValue(e.target.value);
    },
    [updateValue]
  );

  const handleLangChange = React.useCallback((lang: string) => {
    const { controlledLang, onToggleChange } = latestRef.current;
    if (!controlledLang) setInternalLang(lang);
    onToggleChange?.(lang);
  }, []);

  const format = useMarkdownFormatting(textareaRef, updateValue);

  return (
    <MarkdownEditorRoot
      hasError={hasError}
      disabled={disabled}
      previewing={previewing}
      className={containerClassName}
    >
      <Toolbar>
        <ToolbarGroup>
          {DEFAULT_TOOLBAR_ICONS.map(({ key, icon: Icon, label }) => (
            <ToolbarButton
              key={key}
              onClick={() => format(key)}
              tooltip={label}
              aria-label={label}
              disabled={disabled || previewing}
            >
              <Icon className='h-5 w-5' />
            </ToolbarButton>
          ))}
          <ToolbarSeparator />
          <ToolbarButton
            onClick={() => setPreviewing((p) => !p)}
            tooltip={previewing ? 'Edit' : 'Preview'}
            aria-label={previewing ? 'Edit' : 'Preview'}
            active={previewing}
          >
            {previewing ? (
              <RiEditLine className='h-5 w-5' />
            ) : (
              <RiEyeLine className='h-5 w-5' />
            )}
          </ToolbarButton>
        </ToolbarGroup>
        <Toggle
          items={items}
          value={activeLang}
          onValueChange={handleLangChange}
        />
      </Toolbar>
      <Content
        ref={textareaRef}
        id={id}
        className={contentClassName}
        height={height}
        value={activeValue}
        onChange={handleChange}
        {...textareaProps}
      />
    </MarkdownEditorRoot>
  );
}

export {
  MarkdownEditorRoot as Root,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
  Toggle,
  Content,
  Composed,
  DEFAULT_TOGGLE_ITEMS,
  DEFAULT_FLAG_TOGGLE_ITEMS,
  useMarkdownEditorContext,
  useMarkdownFormatting,
  renderMarkdown,
};

export type {
  MarkdownEditorRootProps,
  ToolbarProps,
  ToolbarButtonProps,
  ToolbarGroupProps,
  ToolbarSeparatorProps,
  ToggleProps,
  ContentProps,
  ComposedProps,
  ComposedSingleProps,
  ComposedMultiProps,
  LocalizedValue,
  FormatAction,
};
