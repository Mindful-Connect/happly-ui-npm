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
} from '@remixicon/react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Placeholder from '@tiptap/extension-placeholder';

import * as SwitchToggle from '@/components/ui/switch-toggle';
import type { SwitchToggleGroupItem } from '@/components/ui/switch-toggle';
import { cn } from '@/lib/happly-ui-utils';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

type MarkdownEditorContextValue = {
  hasError: boolean;
  disabled: boolean;
  editor: Editor | null;
};

const MarkdownEditorContext =
  React.createContext<MarkdownEditorContextValue>({
    hasError: false,
    disabled: false,
    editor: null,
  });

function useMarkdownEditor() {
  return React.useContext(MarkdownEditorContext);
}

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

type MarkdownEditorRootProps = React.HTMLAttributes<HTMLDivElement> & {
  hasError?: boolean;
  disabled?: boolean;
  editor?: Editor | null;
};

function MarkdownEditorRoot({
  className,
  children,
  hasError = false,
  disabled = false,
  editor = null,
  ...rest
}: MarkdownEditorRootProps) {
  const contextValue = React.useMemo<MarkdownEditorContextValue>(
    () => ({ hasError, disabled, editor }),
    [hasError, disabled, editor],
  );

  return (
    <MarkdownEditorContext.Provider value={contextValue}>
      <div
        className={cn(
          'flex w-full flex-col gap-2 rounded-2xl bg-bg-weak-50 p-2',
          disabled && 'pointer-events-none opacity-50',
          className,
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
    <div
      className={cn(
        'flex items-center justify-between pl-3 pr-2 py-1',
        className,
      )}
      role='toolbar'
      aria-label='Formatting options'
      {...rest}
    >
      {children}
    </div>
  );
}
Toolbar.displayName = 'MarkdownEditorToolbar';

type ToolbarButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

const ToolbarButton = React.forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ className, active, children, ...rest }, forwardedRef) => {
    const { disabled } = useMarkdownEditor();

    return (
      <button
        ref={forwardedRef}
        type='button'
        disabled={disabled}
        className={cn(
          'flex size-7 items-center justify-center rounded-md text-text-sub-600 outline-none',
          'transition duration-200 ease-out',
          'hover:bg-bg-soft-200 hover:text-text-strong-950',
          'focus-visible:ring-2 focus-visible:ring-stroke-strong-950',
          active && 'bg-bg-soft-200 text-text-strong-950',
          'disabled:pointer-events-none disabled:text-text-disabled-300',
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
ToolbarButton.displayName = 'MarkdownEditorToolbarButton';

type ToolbarGroupProps = React.HTMLAttributes<HTMLDivElement>;

function ToolbarGroup({ className, children, ...rest }: ToolbarGroupProps) {
  return (
    <div
      className={cn('flex items-center gap-0.5', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
ToolbarGroup.displayName = 'MarkdownEditorToolbarGroup';

// ---------------------------------------------------------------------------
// Toggle
// ---------------------------------------------------------------------------

type ToggleProps = Omit<
  React.ComponentPropsWithoutRef<typeof SwitchToggle.Group>,
  'children'
>;

function Toggle({ listClassName, ...props }: ToggleProps) {
  return (
    <SwitchToggle.Group
      listClassName={cn('bg-bg-soft-200', listClassName)}
      {...props}
    />
  );
}
Toggle.displayName = 'MarkdownEditorToggle';

// ---------------------------------------------------------------------------
// Content (TipTap editor area)
// ---------------------------------------------------------------------------

type ContentProps = React.HTMLAttributes<HTMLDivElement> & {
  hasError?: boolean;
  /** Height of the editor content area. Accepts any CSS value. */
  height?: string;
};

const Content = React.forwardRef<HTMLDivElement, ContentProps>(
  ({ className, hasError: hasErrorProp, height = '200px', style, ...rest }, forwardedRef) => {
    const { hasError: contextHasError, disabled, editor } = useMarkdownEditor();
    const hasError = hasErrorProp ?? contextHasError;

    return (
      <div
        ref={forwardedRef}
        className={cn(
          'markdown-editor-content',
          'w-full overflow-y-auto rounded-xl bg-bg-white-0 shadow-regular-xs',
          'ring-1 ring-inset ring-stroke-soft-200',
          'transition duration-200 ease-out',
          !hasError && [
            'focus-within:shadow-button-important-focus focus-within:ring-stroke-strong-950',
          ],
          hasError && [
            'ring-error-base',
            'focus-within:shadow-button-error-focus focus-within:ring-error-base',
          ],
          disabled && 'bg-bg-white-0/80 ring-transparent',
          className,
        )}
        style={{ minHeight: height, ...style }}
        {...rest}
      >
        {editor && (
          <EditorContent
            editor={editor}
            className='!border-none !shadow-none !outline-none !ring-0 min-h-[inherit]'
          />
        )}
      </div>
    );
  },
);
Content.displayName = 'MarkdownEditorContent';

// ---------------------------------------------------------------------------
// Default toolbar actions
// ---------------------------------------------------------------------------

type FormatAction = 'bold' | 'italic' | 'underline' | 'strikethrough' | 'checklist' | 'ordered-list' | 'link';

function executeAction(editor: Editor, action: FormatAction) {
  const chain = editor.chain().focus();

  switch (action) {
    case 'bold':
      chain.toggleBold().run();
      break;
    case 'italic':
      chain.toggleItalic().run();
      break;
    case 'underline':
      chain.toggleUnderline().run();
      break;
    case 'strikethrough':
      chain.toggleStrike().run();
      break;
    case 'checklist':
      chain.toggleTaskList().run();
      break;
    case 'ordered-list':
      chain.toggleOrderedList().run();
      break;
    case 'link': {
      if (editor.isActive('link')) {
        chain.unsetLink().run();
      } else {
        const url = window.prompt('Enter URL');
        if (url) {
          chain.setLink({ href: url }).run();
        }
      }
      break;
    }
  }
}

function isActionActive(editor: Editor, action: FormatAction): boolean {
  switch (action) {
    case 'bold':
      return editor.isActive('bold');
    case 'italic':
      return editor.isActive('italic');
    case 'underline':
      return editor.isActive('underline');
    case 'strikethrough':
      return editor.isActive('strike');
    case 'checklist':
      return editor.isActive('taskList');
    case 'ordered-list':
      return editor.isActive('orderedList');
    case 'link':
      return editor.isActive('link');
    default:
      return false;
  }
}

const DEFAULT_TOOLBAR_ICONS = [
  { key: 'bold' as const, icon: RiBold, label: 'Bold' },
  { key: 'italic' as const, icon: RiItalic, label: 'Italic' },
  { key: 'underline' as const, icon: RiUnderline, label: 'Underline' },
  { key: 'strikethrough' as const, icon: RiStrikethrough, label: 'Strikethrough' },
  { key: 'checklist' as const, icon: RiListCheck, label: 'Checklist' },
  { key: 'ordered-list' as const, icon: RiListOrdered2, label: 'Ordered list' },
  { key: 'link' as const, icon: RiLink, label: 'Link' },
];

// ---------------------------------------------------------------------------
// DefaultToolbar (reads editor from context)
// ---------------------------------------------------------------------------

function DefaultToolbar() {
  const { editor } = useMarkdownEditor();

  // Force re-render on selection/content changes for active state
  const [, setTick] = React.useState(0);
  React.useEffect(() => {
    if (!editor) return;
    const handler = () => setTick((t) => t + 1);
    editor.on('selectionUpdate', handler);
    editor.on('transaction', handler);
    return () => {
      editor.off('selectionUpdate', handler);
      editor.off('transaction', handler);
    };
  }, [editor]);

  return (
    <ToolbarGroup>
      {DEFAULT_TOOLBAR_ICONS.map(({ key, icon: Icon, label }) => (
        <ToolbarButton
          key={key}
          active={editor ? isActionActive(editor, key) : false}
          onClick={() => editor && executeAction(editor, key)}
          aria-label={label}
          title={label}
        >
          <Icon className='size-5' />
        </ToolbarButton>
      ))}
    </ToolbarGroup>
  );
}
DefaultToolbar.displayName = 'MarkdownEditorDefaultToolbar';

// ---------------------------------------------------------------------------
// useMarkdownEditorState hook
// ---------------------------------------------------------------------------

type UseMarkdownEditorOptions = {
  value?: string;
  defaultValue?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  editable?: boolean;
};

function useMarkdownEditorState({
  value,
  defaultValue = '',
  onChange,
  placeholder,
  editable = true,
}: UseMarkdownEditorOptions = {}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        orderedList: {},
        bulletList: {},
      }),
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Placeholder.configure({
        placeholder: placeholder ?? '',
      }),
    ],
    content: value ?? defaultValue,
    editable,
    editorProps: {
      attributes: {
        class:
          'min-h-[inherit] p-4 text-paragraph-sm text-text-strong-950 outline-none !border-none !shadow-none !ring-0',
      },
    },
    onUpdate: ({ editor: e }) => {
      onChange?.(e.getHTML());
    },
    immediatelyRender: false,
  });

  // Sync controlled value
  const isControlled = value !== undefined;
  React.useEffect(() => {
    if (!editor || !isControlled) return;
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value, false);
    }
  }, [editor, value, isControlled]);

  // Sync editable
  React.useEffect(() => {
    if (!editor) return;
    editor.setEditable(editable);
  }, [editor, editable]);

  return editor;
}

// ---------------------------------------------------------------------------
// Composed
// ---------------------------------------------------------------------------

type ComposedProps = React.HTMLAttributes<HTMLDivElement> & {
  hasError?: boolean;
  disabled?: boolean;
  /** HTML content (controlled) */
  value?: string;
  /** Initial HTML content (uncontrolled) */
  defaultValue?: string;
  /** Callback with HTML string on every change */
  onChange?: (html: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Items for the built-in SwitchToggle in the toolbar */
  toggleItems?: SwitchToggleGroupItem[];
  /** Controlled value for the SwitchToggle */
  toggleValue?: string;
  /** Default (uncontrolled) value for the SwitchToggle */
  defaultToggleValue?: string;
  /** Callback when the SwitchToggle value changes */
  onToggleChange?: (value: string) => void;
  /** Callback fired after a toolbar action */
  onToolbarAction?: (action: FormatAction) => void;
  /** Root container className */
  containerClassName?: string;
  /** Content area className */
  contentClassName?: string;
  /** Height of the editor content area. Accepts any CSS value. */
  height?: string;
};

function Composed({
  hasError,
  disabled,
  value,
  defaultValue,
  onChange,
  placeholder,
  toggleItems,
  toggleValue,
  defaultToggleValue,
  onToggleChange,
  onToolbarAction,
  containerClassName,
  contentClassName,
  height,
  id,
  ...rest
}: ComposedProps) {
  const editor = useMarkdownEditorState({
    value,
    defaultValue,
    onChange,
    placeholder,
    editable: !disabled,
  });

  return (
    <MarkdownEditorRoot
      hasError={hasError}
      disabled={disabled}
      editor={editor}
      className={containerClassName}
      id={id}
      {...rest}
    >
      <Toolbar>
        <DefaultToolbar />
        {toggleItems && toggleItems.length > 0 && (
          <Toggle
            items={toggleItems}
            value={toggleValue}
            defaultValue={defaultToggleValue}
            onValueChange={onToggleChange}
          />
        )}
      </Toolbar>
      <Content className={contentClassName} height={height} />
    </MarkdownEditorRoot>
  );
}
Composed.displayName = 'MarkdownEditorComposed';

export {
  MarkdownEditorRoot as Root,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  Toggle,
  Content,
  DefaultToolbar,
  Composed,
  useMarkdownEditor,
  useMarkdownEditorState,
  executeAction,
  isActionActive,
};

export type {
  MarkdownEditorRootProps,
  ToolbarProps,
  ToolbarButtonProps,
  ToolbarGroupProps,
  ToggleProps,
  ContentProps,
  ComposedProps,
  FormatAction,
  UseMarkdownEditorOptions,
};
