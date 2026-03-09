'use client';

import * as React from 'react';
import { RiCheckLine, RiSearchLine } from '@remixicon/react';
import * as ScrollAreaPrimitives from '@radix-ui/react-scroll-area';

import { inputVariants } from '@/components/ui/input';
import * as Popover from '@/components/ui/popover';
import * as TagUI from '@/components/ui/tag';
import { cn } from '@/lib/happly-ui-utils';

// ─── Types ─────────────────────────────────────────────────

type ComboBoxOption = {
  value: string;
  label: string;
};

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
  /** Leading icon component (defaults to RiSearchLine) */
  icon?: React.ElementType;
  /** Search input placeholder */
  placeholder?: string;
  /** Message shown when no options match the search */
  emptyMessage?: string;
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
  /** When provided and all options are selected, show a single tag with this label */
  selectAllLabel?: string;
  /** Tag visual variant for selected items */
  tagVariant?: 'stroke' | 'gray';
  /** Callback when popover open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Additional className for the outer wrapper */
  className?: string;
};

// ─── Root ──────────────────────────────────────────────────

const ComboBoxRoot = React.forwardRef<HTMLInputElement, ComboBoxRootProps>(
  (
    {
      options,
      value: valueProp,
      defaultValue = [],
      onValueChange,
      name,
      icon: Icon = RiSearchLine,
      placeholder = 'Choose or search...',
      emptyMessage = 'No results found.',
      max = Infinity,
      min = 0,
      disabled,
      hasError,
      size = 'medium',
      selectAllLabel,
      tagVariant = 'gray',
      onOpenChange: onOpenChangeProp,
      className,
    },
    forwardedRef,
  ) => {
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
    const inputRef = React.useRef<HTMLInputElement>(null);
    const anchorRef = React.useRef<HTMLDivElement>(null);

    // Merge forwarded ref with internal ref
    const mergedRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        (inputRef as React.MutableRefObject<HTMLInputElement | null>).current =
          node;
        if (typeof forwardedRef === 'function') forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [forwardedRef],
    );

    const {
      root,
      wrapper,
      input: inputClass,
      icon,
    } = inputVariants({ size, hasError });

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

    const handleToggle = React.useCallback(
      (optionValue: string) => {
        const selected = isSelected(optionValue);
        if (selected) {
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

    const handleRemove = React.useCallback(
      (optionValue: string) => {
        if (disabled || value.length <= min) return;
        setValue(value.filter((v) => v !== optionValue));
      },
      [disabled, value, min, setValue],
    );

    const handleRemoveAll = React.useCallback(() => {
      if (disabled) return;
      setValue([]);
    }, [disabled, setValue]);

    const selectedLabels = value.map(
      (v) => options.find((o) => o.value === v)?.label ?? v,
    );

    const showSelectAll =
      selectAllLabel && options.length > 0 && value.length === options.length;

    return (
      <div className={cn('flex flex-col gap-2', className)}>
        <Popover.Root open={open} onOpenChange={handleOpenChange}>
          <Popover.Anchor asChild>
            <div ref={anchorRef} className={root()}>
              <label className={wrapper()}>
                <Icon className={icon()} />
                <input
                  ref={mergedRef}
                  type='text'
                  role='combobox'
                  aria-expanded={open}
                  aria-haspopup='listbox'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => !disabled && handleOpenChange(true)}
                  placeholder={placeholder}
                  disabled={disabled}
                  className={inputClass()}
                />
              </label>
            </div>
          </Popover.Anchor>

          <Popover.Content
            align='start'
            sideOffset={8}
            collisionPadding={8}
            showArrow={false}
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) => {
              // Don't close when clicking the input/anchor
              if (anchorRef.current?.contains(e.target as Node)) {
                e.preventDefault();
              }
            }}
            style={{ width: anchorWidth || undefined }}
            className='overflow-hidden p-0'
          >
            <ScrollAreaPrimitives.Root type='auto'>
              <ScrollAreaPrimitives.Viewport
                style={{ overflowY: undefined }}
                className='max-h-[196px] w-full scroll-py-2 overflow-auto p-2'
                role='listbox'
                aria-multiselectable='true'
              >
                {filteredOptions.length === 0 ? (
                  <div className='py-6 text-center text-paragraph-sm text-text-sub-600'>
                    {emptyMessage}
                  </div>
                ) : (
                  <div className='flex flex-col gap-1'>
                    {filteredOptions.map((option) => {
                      const selected = isSelected(option.value);
                      const atMax = !selected && value.length >= max;

                      return (
                        <button
                          key={option.value}
                          type='button'
                          role='option'
                          aria-selected={selected}
                          disabled={disabled || atMax}
                          onClick={() => handleToggle(option.value)}
                          className={cn(
                            'relative flex w-full cursor-pointer select-none items-center rounded-10 p-2 pr-9 text-left text-paragraph-sm text-text-strong-950',
                            'transition duration-200 ease-out',
                            'hover:bg-bg-weak-50',
                            'disabled:pointer-events-none disabled:text-text-disabled-300',
                          )}
                        >
                          <span className='line-clamp-1'>
                            {option.label}
                          </span>
                          <RiCheckLine
                            className={cn(
                              'absolute right-2 top-1/2 size-5 shrink-0 -translate-y-1/2 text-text-sub-600',
                              'transition duration-200 ease-out',
                              selected ? 'opacity-100' : 'opacity-0',
                            )}
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </ScrollAreaPrimitives.Viewport>
              <ScrollAreaPrimitives.Scrollbar orientation='vertical'>
                <ScrollAreaPrimitives.Thumb className='!w-1 rounded bg-bg-soft-200' />
              </ScrollAreaPrimitives.Scrollbar>
            </ScrollAreaPrimitives.Root>
          </Popover.Content>
        </Popover.Root>

        {value.length > 0 && (
          <div className='flex flex-wrap gap-1.5'>
            {showSelectAll ? (
              <TagUI.Root variant={tagVariant} disabled={disabled} className='rounded-full'>
                <span>{selectAllLabel}</span>
                <TagUI.DismissButton
                  onClick={handleRemoveAll}
                />
              </TagUI.Root>
            ) : (
              selectedLabels.map((label, index) => (
                <TagUI.Root
                  key={value[index]}
                  variant={tagVariant}
                  disabled={disabled || value.length <= min}
                  className='rounded-full'
                >
                  <span>{label}</span>
                  <TagUI.DismissButton
                    onClick={() => handleRemove(value[index])}
                  />
                </TagUI.Root>
              ))
            )}
          </div>
        )}

        {/* Hidden inputs for form submission */}
        {name &&
          value.map((v) => (
            <input key={v} type='hidden' name={name} value={v} />
          ))}
      </div>
    );
  },
);
ComboBoxRoot.displayName = 'ComboBoxRoot';

// ─── Exports ───────────────────────────────────────────────

export { ComboBoxRoot as Root, type ComboBoxOption };
