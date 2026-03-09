'use client';

import * as React from 'react';
import { RiArrowDownSLine, RiCheckLine } from '@remixicon/react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import * as Popover from '@/components/ui/popover';
import { selectVariants } from '@/components/ui/select';
import * as TagUI from '@/components/ui/tag';
import { cn } from '@/lib/happly-ui-utils';
import type { PolymorphicComponentProps } from '@/lib/polymorphic';

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
  /** Callback when selection changes */
  onValueChange?: (values: string[]) => void;
  /** Trigger placeholder when nothing is selected */
  placeholder?: string;
  /** Search input placeholder inside the dropdown */
  searchPlaceholder?: string;
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
  /** Trigger size */
  size?: 'medium' | 'small' | 'xsmall';
  /** Leading icon component on the trigger */
  icon?: React.ElementType;
  /** When true and search returns no results, show the add message */
  allowAdding?: boolean;
  /** Message displayed when adding is allowed and no matches found */
  addMessage?: string;
  /** When provided and all options are selected, show a single tag with this label */
  selectAllLabel?: string;
  /** Tag visual variant for selected items */
  tagVariant?: 'stroke' | 'gray';
  /** Props forwarded to Popover.Content */
  popoverProps?: React.ComponentPropsWithoutRef<typeof Popover.Content>;
  /** Callback when popover open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Additional className for the outer wrapper */
  className?: string;
};

// ─── Root ──────────────────────────────────────────────────

const ComboBoxRoot = React.forwardRef<HTMLButtonElement, ComboBoxRootProps>(
  (
    {
      options,
      value = [],
      onValueChange,
      placeholder = 'Select...',
      searchPlaceholder = 'Search...',
      emptyMessage = 'No results found.',
      max = Infinity,
      min = 0,
      disabled,
      hasError,
      size = 'medium',
      icon: Icon,
      allowAdding,
      addMessage = 'Press Enter to add',
      selectAllLabel,
      tagVariant = 'stroke',
      popoverProps,
      onOpenChange: onOpenChangeProp,
      className,
    },
    forwardedRef,
  ) => {
    const [open, setOpen] = React.useState(false);

    const isEmpty = value.length === 0;
    const { triggerRoot, triggerArrow, triggerIcon } = selectVariants({
      size,
      variant: 'default',
      hasError,
    });

    const handleOpenChange = React.useCallback(
      (newOpen: boolean) => {
        setOpen(newOpen);
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
            onValueChange?.(value.filter((v) => v !== optionValue));
          }
        } else {
          if (value.length < max) {
            onValueChange?.([...value, optionValue]);
          }
        }
      },
      [isSelected, value, min, max, onValueChange],
    );

    const handleRemove = React.useCallback(
      (optionValue: string) => {
        if (disabled || value.length <= min) return;
        onValueChange?.(value.filter((v) => v !== optionValue));
      },
      [disabled, value, min, onValueChange],
    );

    const handleRemoveAll = React.useCallback(() => {
      if (disabled) return;
      onValueChange?.([]);
    }, [disabled, onValueChange]);

    const selectedLabels = value.map(
      (v) => options.find((o) => o.value === v)?.label ?? v,
    );

    const showSelectAll =
      selectAllLabel && options.length > 0 && value.length === options.length;

    return (
      <div className={cn('flex flex-col gap-2', className)}>
        <Popover.Root open={open} onOpenChange={handleOpenChange}>
          <Popover.Trigger asChild>
            <button
              ref={forwardedRef}
              type='button'
              disabled={disabled}
              data-placeholder={isEmpty ? '' : undefined}
              data-state={open ? 'open' : 'closed'}
              className={triggerRoot()}
            >
              {Icon && <TriggerIcon as={Icon} size={size} hasError={hasError} />}

              {isEmpty ? (
                <span className='flex-1 truncate text-left'>
                  {placeholder}
                </span>
              ) : (
                <span className='flex-1 truncate text-left'>
                  {selectedLabels.join(', ')}
                </span>
              )}

              <ComboBoxArrow size={size} hasError={hasError} />
            </button>
          </Popover.Trigger>

          <Popover.Content
            align='start'
            sideOffset={8}
            collisionPadding={8}
            showArrow={false}
            className={cn(
              // match Select.Content styling
              'w-[--radix-popover-trigger-width] overflow-hidden rounded-2xl p-0',
            )}
            {...popoverProps}
          >
            <Command>
              <CommandInput placeholder={searchPlaceholder} />
              <CommandList>
                <CommandEmpty>
                  <span className='text-text-sub-600'>
                    {emptyMessage}
                    {allowAdding ? `. ${addMessage}` : ''}
                  </span>
                </CommandEmpty>

                {options.length > 0 && (
                  <CommandGroup>
                    {options.map((option) => {
                      const selected = isSelected(option.value);
                      const atMax = !selected && value.length >= max;

                      return (
                        <CommandItem
                          key={option.value}
                          onSelect={() =>
                            !atMax && handleToggle(option.value)
                          }
                          disabled={disabled || (atMax && !selected)}
                          className='pr-9'
                        >
                          <RiCheckLine
                            className={cn(
                              'absolute right-2 top-1/2 size-5 shrink-0 -translate-y-1/2 text-text-sub-600',
                              selected ? 'opacity-100' : 'opacity-0',
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </Popover.Content>
        </Popover.Root>

        {value.length > 0 && (
          <div className='flex flex-wrap gap-2'>
            {showSelectAll ? (
              <TagUI.Root variant={tagVariant}>
                <span>{selectAllLabel}</span>
                <TagUI.DismissButton
                  onClick={handleRemoveAll}
                  disabled={disabled}
                />
              </TagUI.Root>
            ) : (
              selectedLabels.map((label, index) => (
                <TagUI.Root key={value[index]} variant={tagVariant}>
                  <span>{label}</span>
                  <TagUI.DismissButton
                    onClick={() => handleRemove(value[index])}
                    disabled={disabled || value.length <= min}
                  />
                </TagUI.Root>
              ))
            )}
          </div>
        )}
      </div>
    );
  },
);
ComboBoxRoot.displayName = 'ComboBoxRoot';

// ─── Trigger sub-components (internal) ─────────────────────

function TriggerIcon<T extends React.ElementType = 'div'>({
  as,
  className,
  size = 'medium',
  hasError,
  ...rest
}: PolymorphicComponentProps<T, { size?: 'medium' | 'small' | 'xsmall'; hasError?: boolean }>) {
  const Component = as || 'div';
  const { triggerIcon } = selectVariants({ size, variant: 'default', hasError });

  return <Component className={triggerIcon({ class: className })} {...rest} />;
}

function ComboBoxArrow({
  size = 'medium',
  hasError,
}: {
  size?: 'medium' | 'small' | 'xsmall';
  hasError?: boolean;
}) {
  const { triggerArrow } = selectVariants({ size, variant: 'default', hasError });

  return <RiArrowDownSLine className={triggerArrow()} />;
}

// ─── Exports ───────────────────────────────────────────────

export { ComboBoxRoot as Root, type ComboBoxOption };
