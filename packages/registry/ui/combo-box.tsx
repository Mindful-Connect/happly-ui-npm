'use client';

import * as React from 'react';
import { RiArrowDownSLine, RiCheckLine, RiSearchLine } from '@remixicon/react';
import * as ScrollAreaPrimitives from '@radix-ui/react-scroll-area';
import { RemoveScroll } from 'react-remove-scroll';

import * as Input from '@/components/ui/input';
import * as Popover from '@/components/ui/popover';
import * as Tag from '@/components/ui/tag';
import { useFormField } from '@/lib/form-field-context';
import { cn } from '@/lib/happly-ui-utils';
import { useFormFieldBinding } from '@/lib/use-form-field-binding';

// ─── Types ─────────────────────────────────────────────────

type ComboBoxOption = {
  value: string;
  label: string;
  /** Optional icon — a React component (e.g. Remix icon) or an image URL string */
  icon?: React.ElementType | string;
};

// ─── Context ────────────────────────────────────────────────

type ComboBoxContextValue = {
  options: ComboBoxOption[];
  value: string[];
  setValue: (next: string[]) => void;
  search: string;
  setSearch: (s: string) => void;
  filteredOptions: ComboBoxOption[];
  isSelected: (value: string) => boolean;
  toggle: (value: string) => void;
  remove: (value: string) => void;
  removeAll: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  handleOpenChange: (open: boolean) => void;
  disabled: boolean;
  preview: boolean;
  max: number;
  min: number;
  size: 'medium' | 'small' | 'xsmall';
  hasError: boolean;
  anchorWidth: number;
  highlightedIndex: number;
  setHighlightedIndex: (index: number) => void;
  listboxId: string;
  getItemId: (index: number) => string;
};

const ComboBoxContext = React.createContext<ComboBoxContextValue | null>(null);

// Separate context for the anchor ref to avoid ESLint react-hooks/refs
// false positives on the main context (which would flag all ctx.* accesses).
const AnchorRefContext =
  React.createContext<React.RefObject<HTMLDivElement | null> | null>(null);

function useComboBoxContext() {
  const ctx = React.useContext(ComboBoxContext);
  if (!ctx) {
    throw new Error(
      'ComboBox compound components must be used within ComboBox.Root'
    );
  }
  return ctx;
}

function useAnchorRef() {
  const ref = React.useContext(AnchorRefContext);
  if (!ref) {
    throw new Error(
      'ComboBox compound components must be used within ComboBox.Root'
    );
  }
  return ref;
}

// ─── Root ───────────────────────────────────────────────────

type ComboBoxRootProps = {
  /** Available options to select from */
  options: ComboBoxOption[];
  /** Currently selected values (controlled) */
  value?: string[];
  /** Default selected values (uncontrolled) */
  defaultValue?: string[];
  /** Callback when selection changes — receives both raw values and full option objects */
  onValueChange?: (values: string[], selectedOptions: ComboBoxOption[]) => void;
  /** Form field name — renders hidden inputs for form submission */
  name?: string;
  /** Maximum number of selections allowed */
  max?: number;
  /** Minimum number of selections (prevents removing below this) */
  min?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  hasError?: boolean;
  /** Input size */
  size?: 'medium' | 'small' | 'xsmall';
  /** Preview mode — renders the option list inline in the DOM and hides tags */
  preview?: boolean;
  /** Callback when popover open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Additional className for the outer wrapper */
  className?: string;
  children: React.ReactNode;
};

function ComboBoxRoot({
  options,
  value: valueProp,
  defaultValue = [],
  onValueChange,
  name,
  max = Infinity,
  min = 0,
  disabled: disabledProp = false,
  hasError: hasErrorProp = false,
  size = 'medium',
  preview = false,
  onOpenChange: onOpenChangeProp,
  className,
  children,
}: ComboBoxRootProps) {
  const formField = useFormField();
  const hasError = hasErrorProp || formField.hasError;
  const disabled = disabledProp || formField.disabled;
  const binding = useFormFieldBinding<string[]>({ defaultValue: [] });

  // Priority: explicit props > RHF binding > internal state
  const hasExplicitValue = valueProp !== undefined;
  const hasExplicitOnChange = onValueChange !== undefined;

  // Controlled / uncontrolled value
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const value = hasExplicitValue
    ? valueProp
    : (binding?.value ?? internalValue);
  const setValue = React.useCallback(
    (next: string[]) => {
      if (!hasExplicitValue && !binding) setInternalValue(next);
      if (hasExplicitOnChange) {
        const selectedOptions = next
          .map((v) => options.find((o) => o.value === v))
          .filter(Boolean) as ComboBoxOption[];
        onValueChange?.(next, selectedOptions);
      } else {
        binding?.onChange(next);
      }
    },
    [hasExplicitValue, hasExplicitOnChange, binding, onValueChange, options]
  );

  const [open, setOpen] = React.useState(preview);
  const [search, setSearch] = React.useState('');
  const [anchorWidth, setAnchorWidth] = React.useState(0);
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const instanceId = React.useId();
  const listboxId = `combobox-listbox-${instanceId}`;
  const getItemId = React.useCallback(
    (index: number) => `combobox-item-${instanceId}-${index}`,
    [instanceId]
  );

  const filteredOptions = React.useMemo(() => {
    if (!search) return options;
    const lower = search.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(lower));
  }, [options, search]);

  // Reset highlighted index when filtered options change
  React.useEffect(() => {
    setHighlightedIndex(-1);
  }, [filteredOptions.length, search]);

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      if (newOpen && anchorRef.current) {
        setAnchorWidth(anchorRef.current.offsetWidth);
      }
      setOpen(newOpen);
      if (!newOpen) {
        setSearch('');
        setHighlightedIndex(-1);
      }
      onOpenChangeProp?.(newOpen);
      if (!newOpen) formField.onBlur?.();
    },
    [onOpenChangeProp, formField.onBlur]
  );

  const isSelected = React.useCallback(
    (optionValue: string) => value.includes(optionValue),
    [value]
  );

  const toggle = React.useCallback(
    (optionValue: string) => {
      if (isSelected(optionValue)) {
        if (value.length > min) {
          setValue(value.filter((v) => v !== optionValue));
        }
      } else {
        if (value.length < max) {
          setValue([...value, optionValue]);
        }
      }
    },
    [isSelected, value, min, max, setValue]
  );

  const remove = React.useCallback(
    (optionValue: string) => {
      if (disabled || value.length <= min) return;
      setValue(value.filter((v) => v !== optionValue));
    },
    [disabled, value, min, setValue]
  );

  const removeAll = React.useCallback(() => {
    if (disabled) return;
    setValue([]);
  }, [disabled, setValue]);

  const ctx: ComboBoxContextValue = React.useMemo(
    () => ({
      options,
      value,
      setValue,
      search,
      setSearch,
      filteredOptions,
      isSelected,
      toggle,
      remove,
      removeAll,
      open,
      setOpen,
      handleOpenChange,
      disabled,
      preview,
      max,
      min,
      size,
      hasError,
      anchorWidth,
      highlightedIndex,
      setHighlightedIndex,
      listboxId,
      getItemId,
    }),
    [
      options,
      value,
      setValue,
      search,
      setSearch,
      filteredOptions,
      isSelected,
      toggle,
      remove,
      removeAll,
      open,
      setOpen,
      handleOpenChange,
      disabled,
      preview,
      max,
      min,
      size,
      hasError,
      anchorWidth,
      highlightedIndex,
      listboxId,
      getItemId,
    ]
  );

  return (
    <AnchorRefContext.Provider value={anchorRef}>
      <ComboBoxContext.Provider value={ctx}>
        <div className={cn('flex flex-col gap-2', className)}>
          {preview ? (
            children
          ) : (
            <Popover.Root open={open} onOpenChange={handleOpenChange}>
              {children}
            </Popover.Root>
          )}

          {/* Hidden inputs for native form submission (skip when RHF-bound) */}
          {name &&
            !binding &&
            value.map((v) => (
              <input key={v} type='hidden' name={name} value={v} />
            ))}
        </div>
      </ComboBoxContext.Provider>
    </AnchorRefContext.Provider>
  );
}
ComboBoxRoot.displayName = 'ComboBoxRoot';

// ─── SearchTrigger ──────────────────────────────────────────

type ComboBoxSearchTriggerProps = {
  /** Leading icon component (defaults to RiSearchLine) */
  leadingIcon?: React.ElementType;
  /** Trailing icon component (defaults to RiArrowDownSLine) */
  trailingIcon?: React.ElementType;
  /** Search input placeholder */
  placeholder?: string;
  className?: string;
};

const ComboBoxSearchTrigger = React.forwardRef<
  HTMLInputElement,
  ComboBoxSearchTriggerProps
>(
  (
    {
      leadingIcon = RiSearchLine,
      trailingIcon = RiArrowDownSLine,
      placeholder = 'Choose or search...',
      className,
    },
    forwardedRef
  ) => {
    const ctx = useComboBoxContext();
    const anchorRef = useAnchorRef();

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
      const count = ctx.filteredOptions.length;

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          if (!ctx.open && !ctx.preview) {
            ctx.handleOpenChange(true);
            ctx.setHighlightedIndex(0);
          } else if (count > 0) {
            ctx.setHighlightedIndex(
              ctx.highlightedIndex < count - 1 ? ctx.highlightedIndex + 1 : 0
            );
          }
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          if (count > 0) {
            ctx.setHighlightedIndex(
              ctx.highlightedIndex > 0 ? ctx.highlightedIndex - 1 : count - 1
            );
          }
          break;
        }
        case 'Home': {
          e.preventDefault();
          if (count > 0) ctx.setHighlightedIndex(0);
          break;
        }
        case 'End': {
          e.preventDefault();
          if (count > 0) ctx.setHighlightedIndex(count - 1);
          break;
        }
        case 'Enter': {
          e.preventDefault();
          if (ctx.highlightedIndex >= 0 && ctx.highlightedIndex < count) {
            const option = ctx.filteredOptions[ctx.highlightedIndex];
            if (option) ctx.toggle(option.value);
          }
          break;
        }
        case 'Escape': {
          e.preventDefault();
          if (ctx.open) ctx.handleOpenChange(false);
          break;
        }
      }
    }

    const activeDescendant =
      ctx.highlightedIndex >= 0
        ? ctx.getItemId(ctx.highlightedIndex)
        : undefined;

    const input = (
      <div ref={anchorRef as React.RefObject<HTMLDivElement>}>
        <Input.Root
          size={ctx.size}
          hasError={ctx.hasError}
          className={className}
        >
          <Input.Wrapper>
            <Input.Icon as={leadingIcon} />
            <Input.Input
              ref={forwardedRef}
              role='combobox'
              aria-expanded={ctx.open}
              aria-haspopup='listbox'
              aria-controls={ctx.open ? ctx.listboxId : undefined}
              aria-activedescendant={activeDescendant}
              aria-autocomplete='list'
              value={ctx.search}
              onChange={(e) => ctx.setSearch(e.target.value)}
              onFocus={() =>
                !ctx.disabled && !ctx.preview && ctx.handleOpenChange(true)
              }
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={ctx.disabled}
            />
            {!ctx.preview && (
              <Input.Icon
                as={trailingIcon}
                className={cn(
                  'transition duration-200 ease-out',
                  ctx.open && 'rotate-180'
                )}
              />
            )}
          </Input.Wrapper>
        </Input.Root>
      </div>
    );

    if (ctx.preview) return input;

    return <Popover.Anchor asChild>{input}</Popover.Anchor>;
  }
);
ComboBoxSearchTrigger.displayName = 'ComboBoxSearchTrigger';

// ─── Content ────────────────────────────────────────────────

type ComboBoxContentProps = {
  /** Message shown when no options match the search */
  emptyMessage?: string;
  className?: string;
  children?: React.ReactNode;
};

function ComboBoxContent({
  emptyMessage = 'No results found.',
  className,
  children,
}: ComboBoxContentProps) {
  const ctx = useComboBoxContext();
  const anchorRef = useAnchorRef();

  const items =
    children ??
    (ctx.filteredOptions.length === 0 ? (
      <ComboBoxEmpty>{emptyMessage}</ComboBoxEmpty>
    ) : (
      <div className='flex flex-col gap-1'>
        {ctx.filteredOptions.map((option, index) => (
          <ComboBoxItem
            key={`${option.value}-${index}`}
            value={option.value}
            index={index}
          />
        ))}
      </div>
    ));

  const scrollArea = (
    <ScrollAreaPrimitives.Root type='auto'>
      <ScrollAreaPrimitives.Viewport
        style={{ overflowY: undefined }}
        className='max-h-[var(--combobox-content-max-height)] w-full scroll-py-2 overflow-auto px-2'
        role='listbox'
        id={ctx.listboxId}
        aria-multiselectable='true'
      >
        {items}
      </ScrollAreaPrimitives.Viewport>
      <ScrollAreaPrimitives.Scrollbar orientation='vertical'>
        <ScrollAreaPrimitives.Thumb className='bg-bg-soft-200 !w-1 rounded' />
      </ScrollAreaPrimitives.Scrollbar>
    </ScrollAreaPrimitives.Root>
  );

  if (ctx.preview) {
    return (
      <div
        className={cn(
          'border-stroke-soft-200 overflow-hidden rounded-xl border [--combobox-content-max-height:196px]',
          className
        )}
      >
        {scrollArea}
      </div>
    );
  }

  return (
    <Popover.Content
      align='start'
      sideOffset={8}
      collisionPadding={8}
      showArrow={false}
      onOpenAutoFocus={(e) => e.preventDefault()}
      onInteractOutside={(e) => {
        if (anchorRef.current?.contains(e.target as Node)) {
          e.preventDefault();
        }
      }}
      style={{ width: ctx.anchorWidth || undefined }}
      className={cn(
        'overflow-hidden py-2 [--combobox-content-max-height:196px]',
        className
      )}
    >
      <RemoveScroll allowPinchZoom>{scrollArea}</RemoveScroll>
    </Popover.Content>
  );
}
ComboBoxContent.displayName = 'ComboBoxContent';

// ─── Item ───────────────────────────────────────────────────

type ComboBoxItemProps = {
  /** The option value this item represents */
  value: string;
  /** Index of this item in the filtered list (auto-set when using default Content) */
  index?: number;
  /** Custom content — if omitted, renders default icon + label from options */
  children?: React.ReactNode;
  /** Show the trailing check indicator (default true). Set false when using custom indicators like checkboxes. */
  showIndicator?: boolean;
  className?: string;
  disabled?: boolean;
};

function ComboBoxItem({
  value: itemValue,
  index,
  children,
  showIndicator = true,
  className,
  disabled: disabledProp,
}: ComboBoxItemProps) {
  const ctx = useComboBoxContext();
  const itemRef = React.useRef<HTMLDivElement>(null);
  const selected = ctx.isSelected(itemValue);
  const atMax = !selected && ctx.value.length >= ctx.max;
  const option = ctx.options.find((o) => o.value === itemValue);

  const isDisabled = ctx.disabled || disabledProp || atMax;

  // Resolve index: use explicit prop, or find from filtered options
  const resolvedIndex =
    index ?? ctx.filteredOptions.findIndex((o) => o.value === itemValue);
  const isHighlighted =
    resolvedIndex >= 0 && resolvedIndex === ctx.highlightedIndex;

  // Scroll into view when highlighted via keyboard
  React.useEffect(() => {
    if (isHighlighted && itemRef.current) {
      itemRef.current.scrollIntoView({ block: 'nearest' });
    }
  }, [isHighlighted]);

  return (
    <div
      ref={itemRef}
      id={resolvedIndex >= 0 ? ctx.getItemId(resolvedIndex) : undefined}
      role='option'
      aria-selected={selected}
      aria-disabled={isDisabled || undefined}
      data-disabled={isDisabled || undefined}
      data-highlighted={isHighlighted || undefined}
      onClick={() => !isDisabled && ctx.toggle(itemValue)}
      onMouseEnter={() => {
        if (!isDisabled && resolvedIndex >= 0) {
          ctx.setHighlightedIndex(resolvedIndex);
        }
      }}
      className={cn(
        'text-paragraph-sm text-text-strong-950 relative flex w-full cursor-pointer items-center gap-2 rounded-[0.625rem] p-2 text-left font-medium select-none',
        'transition duration-200 ease-out outline-none',
        'hover:bg-bg-weak-50',
        isHighlighted && 'bg-bg-weak-50',
        isDisabled && 'text-text-disabled-300 pointer-events-none',
        showIndicator && 'pr-9',
        className
      )}
    >
      {children ?? (
        <>
          {option?.icon && <ComboBoxItemIcon as={option.icon} />}
          <span className='line-clamp-1'>{option?.label ?? itemValue}</span>
        </>
      )}
      {showIndicator && <ComboBoxItemIndicator selected={selected} />}
    </div>
  );
}
ComboBoxItem.displayName = 'ComboBoxItem';

// ─── ItemIcon ───────────────────────────────────────────────

type ComboBoxItemIconProps = {
  /** Icon component or image URL string */
  as?: React.ElementType | string;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

function ComboBoxItemIcon({ as, className, ...rest }: ComboBoxItemIconProps) {
  if (typeof as === 'string') {
    return (
      <div
        className={cn(
          'h-5 w-5 shrink-0 rounded-full bg-cover bg-center bg-no-repeat',
          className
        )}
        style={{ backgroundImage: `url(${as})` }}
        {...rest}
      />
    );
  }

  const Component = as || 'div';
  return (
    <Component
      className={cn('text-text-sub-600 h-5 w-5 shrink-0', className)}
      {...rest}
    />
  );
}
ComboBoxItemIcon.displayName = 'ComboBoxItemIcon';

// ─── ItemIndicator ──────────────────────────────────────────

type ComboBoxItemIndicatorProps = {
  selected?: boolean;
  className?: string;
  children?: React.ReactNode;
};

function ComboBoxItemIndicator({
  selected,
  className,
  children,
}: ComboBoxItemIndicatorProps) {
  return (
    <span
      className={cn(
        'absolute top-1/2 right-2 flex h-5 w-5 shrink-0 -translate-y-1/2 items-center justify-center',
        'transition duration-200 ease-out',
        selected ? 'opacity-100' : 'opacity-0',
        className
      )}
    >
      {children ?? <RiCheckLine className='text-text-sub-600 h-5 w-5' />}
    </span>
  );
}
ComboBoxItemIndicator.displayName = 'ComboBoxItemIndicator';

// ─── Empty ──────────────────────────────────────────────────

type ComboBoxEmptyProps = {
  className?: string;
  children?: React.ReactNode;
};

function ComboBoxEmpty({ className, children }: ComboBoxEmptyProps) {
  return (
    <div
      className={cn(
        'text-paragraph-sm text-text-sub-600 py-6 text-center',
        className
      )}
    >
      {children ?? 'No results found.'}
    </div>
  );
}
ComboBoxEmpty.displayName = 'ComboBoxEmpty';

// ─── Tags ───────────────────────────────────────────────────

type ComboBoxTagsProps = {
  /** Tag visual variant */
  variant?: 'stroke' | 'gray';
  /** When provided and all options are selected, show a single summary tag */
  selectAllLabel?: string;
  className?: string;
};

function ComboBoxTags({
  variant = 'gray',
  selectAllLabel,
  className,
}: ComboBoxTagsProps) {
  const ctx = useComboBoxContext();

  if (ctx.preview || ctx.value.length === 0) return null;

  const selectedOptions = ctx.value.map(
    (v) => ctx.options.find((o) => o.value === v) ?? { value: v, label: v }
  );

  const showSelectAll =
    selectAllLabel &&
    ctx.options.length > 0 &&
    ctx.value.length === ctx.options.length;

  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {showSelectAll ? (
        <Tag.Root variant={variant} disabled={ctx.disabled}>
          <span>{selectAllLabel}</span>
          <Tag.DismissButton onClick={ctx.removeAll} />
        </Tag.Root>
      ) : (
        selectedOptions.map((opt, index) => (
          <Tag.Root
            key={`${opt.value}-${index}`}
            variant={variant}
            disabled={ctx.disabled || ctx.value.length <= ctx.min}
          >
            {opt.icon &&
              (typeof opt.icon === 'string' ? (
                <Tag.Icon
                  className='rounded-full bg-cover bg-center bg-no-repeat'
                  style={{ backgroundImage: `url(${opt.icon})` }}
                />
              ) : (
                <Tag.Icon as={opt.icon} />
              ))}
            <span>{opt.label}</span>
            <Tag.DismissButton onClick={() => ctx.remove(opt.value)} />
          </Tag.Root>
        ))
      )}
    </div>
  );
}
ComboBoxTags.displayName = 'ComboBoxTags';

// ─── Composed ───────────────────────────────────────────────

type ComboBoxComposedProps = Omit<ComboBoxRootProps, 'children'> & {
  /** Leading icon component (defaults to RiSearchLine) */
  icon?: React.ElementType;
  /** Search input placeholder */
  placeholder?: string;
  /** Message shown when no options match the search */
  emptyMessage?: string;
  /** When provided and all options are selected, show a single tag with this label */
  selectAllLabel?: string;
  /** Tag visual variant for selected items */
  tagVariant?: 'stroke' | 'gray';
};

const ComboBoxComposed = React.forwardRef<
  HTMLInputElement,
  ComboBoxComposedProps
>(
  (
    {
      icon,
      placeholder,
      emptyMessage,
      selectAllLabel,
      tagVariant,
      ...rootProps
    },
    forwardedRef
  ) => {
    return (
      <ComboBoxRoot {...rootProps}>
        <ComboBoxSearchTrigger
          ref={forwardedRef}
          leadingIcon={icon}
          placeholder={placeholder}
        />
        <ComboBoxContent emptyMessage={emptyMessage} />
        <ComboBoxTags variant={tagVariant} selectAllLabel={selectAllLabel} />
      </ComboBoxRoot>
    );
  }
);
ComboBoxComposed.displayName = 'ComboBoxComposed';

// ─── Exports ────────────────────────────────────────────────

export {
  ComboBoxRoot as Root,
  ComboBoxSearchTrigger as SearchTrigger,
  ComboBoxContent as Content,
  ComboBoxItem as Item,
  ComboBoxItemIcon as ItemIcon,
  ComboBoxItemIndicator as ItemIndicator,
  ComboBoxEmpty as Empty,
  ComboBoxTags as Tags,
  ComboBoxComposed as Composed,
  useComboBoxContext,
  type ComboBoxOption,
};
