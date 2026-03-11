'use client';

import * as React from 'react';
import { RiCheckLine, RiSearchLine } from '@remixicon/react';
import * as ScrollAreaPrimitives from '@radix-ui/react-scroll-area';
import { RemoveScroll } from 'react-remove-scroll';

import * as Input from '@/components/ui/input';
import * as Popover from '@/components/ui/popover';
import * as Tag from '@/components/ui/tag';
import { cn } from '@/lib/happly-ui-utils';

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
  max: number;
  min: number;
  size: 'medium' | 'small' | 'xsmall';
  hasError: boolean;
  anchorRef: React.RefObject<HTMLDivElement | null>;
  anchorWidth: number;
};

const ComboBoxContext = React.createContext<ComboBoxContextValue | null>(null);

function useComboBoxContext() {
  const ctx = React.useContext(ComboBoxContext);
  if (!ctx) {
    throw new Error('ComboBox compound components must be used within ComboBox.Root');
  }
  return ctx;
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
  disabled = false,
  hasError = false,
  size = 'medium',
  onOpenChange: onOpenChangeProp,
  className,
  children,
}: ComboBoxRootProps) {
  // Controlled / uncontrolled value
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const value = valueProp ?? internalValue;
  const setValue = React.useCallback(
    (next: string[]) => {
      if (valueProp === undefined) setInternalValue(next);
      const selectedOptions = next
        .map((v) => options.find((o) => o.value === v))
        .filter(Boolean) as ComboBoxOption[];
      onValueChange?.(next, selectedOptions);
    },
    [valueProp, onValueChange, options],
  );

  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [anchorWidth, setAnchorWidth] = React.useState(0);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const filteredOptions = React.useMemo(() => {
    if (!search) return options;
    const lower = search.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(lower));
  }, [options, search]);

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      if (newOpen && anchorRef.current) {
        setAnchorWidth(anchorRef.current.offsetWidth);
      }
      setOpen(newOpen);
      if (!newOpen) setSearch('');
      onOpenChangeProp?.(newOpen);
    },
    [onOpenChangeProp],
  );

  const isSelected = React.useCallback(
    (optionValue: string) => value.includes(optionValue),
    [value],
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
    [isSelected, value, min, max, setValue],
  );

  const remove = React.useCallback(
    (optionValue: string) => {
      if (disabled || value.length <= min) return;
      setValue(value.filter((v) => v !== optionValue));
    },
    [disabled, value, min, setValue],
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
      max,
      min,
      size,
      hasError,
      anchorRef,
      anchorWidth,
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
      max,
      min,
      size,
      hasError,
      anchorWidth,
    ],
  );

  return (
    <ComboBoxContext.Provider value={ctx}>
      <div className={cn('flex flex-col gap-2', className)}>
        <Popover.Root open={open} onOpenChange={handleOpenChange}>
          {children}
        </Popover.Root>

        {/* Hidden inputs for form submission */}
        {name &&
          value.map((v) => (
            <input key={v} type='hidden' name={name} value={v} />
          ))}
      </div>
    </ComboBoxContext.Provider>
  );
}
ComboBoxRoot.displayName = 'ComboBoxRoot';

// ─── SearchTrigger ──────────────────────────────────────────

type ComboBoxSearchTriggerProps = {
  /** Leading icon component (defaults to RiSearchLine) */
  icon?: React.ElementType;
  /** Search input placeholder */
  placeholder?: string;
  className?: string;
};

const ComboBoxSearchTrigger = React.forwardRef<
  HTMLInputElement,
  ComboBoxSearchTriggerProps
>(
  (
    { icon: Icon = RiSearchLine, placeholder = 'Choose or search...', className },
    forwardedRef,
  ) => {
    const ctx = useComboBoxContext();

    return (
      <Popover.Anchor asChild>
        <div ref={ctx.anchorRef}>
          <Input.Root
            size={ctx.size}
            hasError={ctx.hasError}
            className={className}
          >
            <Input.Wrapper>
              <Input.Icon as={Icon} />
              <Input.Input
                ref={forwardedRef}
                role='combobox'
                aria-expanded={ctx.open}
                aria-haspopup='listbox'
                value={ctx.search}
                onChange={(e) => ctx.setSearch(e.target.value)}
                onFocus={() => !ctx.disabled && ctx.handleOpenChange(true)}
                placeholder={placeholder}
                disabled={ctx.disabled}
              />
            </Input.Wrapper>
          </Input.Root>
        </div>
      </Popover.Anchor>
    );
  },
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

  return (
    <Popover.Content
      align='start'
      sideOffset={8}
      collisionPadding={8}
      showArrow={false}
      onOpenAutoFocus={(e) => e.preventDefault()}
      onInteractOutside={(e) => {
        if (ctx.anchorRef.current?.contains(e.target as Node)) {
          e.preventDefault();
        }
      }}
      style={{ width: ctx.anchorWidth || undefined }}
      className={cn('overflow-hidden p-0', className)}
    >
      <RemoveScroll allowPinchZoom>
        <ScrollAreaPrimitives.Root type='auto'>
          <ScrollAreaPrimitives.Viewport
            style={{ overflowY: undefined }}
            className='max-h-[196px] w-full scroll-py-2 overflow-auto p-2'
            role='listbox'
            aria-multiselectable='true'
          >
            {children ?? (
              ctx.filteredOptions.length === 0 ? (
                <ComboBoxEmpty>{emptyMessage}</ComboBoxEmpty>
              ) : (
                <div className='flex flex-col gap-1'>
                  {ctx.filteredOptions.map((option) => (
                    <ComboBoxItem key={option.value} value={option.value} />
                  ))}
                </div>
              )
            )}
          </ScrollAreaPrimitives.Viewport>
          <ScrollAreaPrimitives.Scrollbar orientation='vertical'>
            <ScrollAreaPrimitives.Thumb className='bg-bg-soft-200 !w-1 rounded' />
          </ScrollAreaPrimitives.Scrollbar>
        </ScrollAreaPrimitives.Root>
      </RemoveScroll>
    </Popover.Content>
  );
}
ComboBoxContent.displayName = 'ComboBoxContent';

// ─── Item ───────────────────────────────────────────────────

type ComboBoxItemProps = {
  /** The option value this item represents */
  value: string;
  /** Custom content — if omitted, renders default icon + label from options */
  children?: React.ReactNode;
  /** Show the trailing check indicator (default true). Set false when using custom indicators like checkboxes. */
  showIndicator?: boolean;
  className?: string;
  disabled?: boolean;
};

function ComboBoxItem({
  value: itemValue,
  children,
  showIndicator = true,
  className,
  disabled: disabledProp,
}: ComboBoxItemProps) {
  const ctx = useComboBoxContext();
  const selected = ctx.isSelected(itemValue);
  const atMax = !selected && ctx.value.length >= ctx.max;
  const option = ctx.options.find((o) => o.value === itemValue);

  const isDisabled = ctx.disabled || disabledProp || atMax;

  return (
    <div
      role='option'
      aria-selected={selected}
      aria-disabled={isDisabled || undefined}
      data-disabled={isDisabled || undefined}
      onClick={() => !isDisabled && ctx.toggle(itemValue)}
      className={cn(
        'rounded-10 text-paragraph-sm text-text-strong-950 relative flex w-full cursor-pointer items-center gap-2 p-2 text-left select-none',
        'transition duration-200 ease-out',
        'hover:bg-bg-weak-50',
        isDisabled && 'text-text-disabled-300 pointer-events-none',
        showIndicator && 'pr-9',
        className,
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

function ComboBoxItemIcon({
  as,
  className,
  ...rest
}: ComboBoxItemIconProps) {
  if (typeof as === 'string') {
    return (
      <div
        className={cn(
          'size-5 shrink-0 rounded-full bg-cover bg-center bg-no-repeat',
          className,
        )}
        style={{ backgroundImage: `url(${as})` }}
        {...rest}
      />
    );
  }

  const Component = as || 'div';
  return (
    <Component
      className={cn('text-text-sub-600 size-5 shrink-0', className)}
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
        'absolute top-1/2 right-2 flex size-5 shrink-0 -translate-y-1/2 items-center justify-center',
        'transition duration-200 ease-out',
        selected ? 'opacity-100' : 'opacity-0',
        className,
      )}
    >
      {children ?? (
        <RiCheckLine className='text-text-sub-600 size-5' />
      )}
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
        className,
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

  if (ctx.value.length === 0) return null;

  const selectedOptions = ctx.value.map(
    (v) => ctx.options.find((o) => o.value === v) ?? { value: v, label: v },
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
        selectedOptions.map((opt) => (
          <Tag.Root
            key={opt.value}
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

const ComboBoxComposed = React.forwardRef<HTMLInputElement, ComboBoxComposedProps>(
  (
    {
      icon,
      placeholder,
      emptyMessage,
      selectAllLabel,
      tagVariant,
      ...rootProps
    },
    forwardedRef,
  ) => {
    return (
      <ComboBoxRoot {...rootProps}>
        <ComboBoxSearchTrigger
          ref={forwardedRef}
          icon={icon}
          placeholder={placeholder}
        />
        <ComboBoxContent emptyMessage={emptyMessage} />
        <ComboBoxTags variant={tagVariant} selectAllLabel={selectAllLabel} />
      </ComboBoxRoot>
    );
  },
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
