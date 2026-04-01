'use client';

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as ScrollAreaPrimitives from '@radix-ui/react-scroll-area';
import { RiArrowLeftSLine, RiSearchLine } from '@remixicon/react';

import * as Button from '@/components/ui/button';
import * as Checkbox from '@/components/ui/checkbox';
import * as Divider from '@/components/ui/divider';
import * as Input from '@/components/ui/input';
import * as LinkButton from '@/components/ui/link-button';
import { cn } from '@/lib/happly-ui-utils';
import type { PolymorphicComponentProps } from '@/lib/polymorphic';

// ─── Root ──────────────────────────────────────────────────

const FilterDropdownRoot = PopoverPrimitive.Root;
FilterDropdownRoot.displayName = 'FilterDropdownRoot';

// ─── Trigger ───────────────────────────────────────────────

const FilterDropdownTrigger = PopoverPrimitive.Trigger;
FilterDropdownTrigger.displayName = 'FilterDropdownTrigger';

// ─── Content ───────────────────────────────────────────────

const FilterDropdownContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(
  (
    {
      className,
      align = 'start',
      sideOffset = 8,
      collisionPadding = 8,
      children,
      ...rest
    },
    forwardedRef
  ) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={forwardedRef}
        align={align}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn(
          // base
          'bg-bg-white-0 shadow-regular-md ring-stroke-soft-200 z-50 w-[314px] overflow-hidden rounded-2xl ring-1 ring-inset',
          'flex flex-col',
          // animation
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...rest}
      >
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
);
FilterDropdownContent.displayName = 'FilterDropdownContent';

// ─── Header ────────────────────────────────────────────────

type FilterDropdownHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  onBack?: () => void;
  onReset?: () => void;
  backLabel?: string;
  resetLabel?: string;
};

function FilterDropdownHeader({
  className,
  onBack,
  onReset,
  backLabel = 'Back',
  resetLabel = 'Reset filter',
  ...rest
}: FilterDropdownHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between px-3 pt-4',
        className
      )}
      {...rest}
    >
      {onBack && (
        <LinkButton.Root variant='gray' size='small' onClick={onBack}>
          <LinkButton.Icon as={RiArrowLeftSLine} />
          {backLabel}
        </LinkButton.Root>
      )}
      {onReset && (
        <LinkButton.Root
          variant='primary'
          size='small'
          onClick={onReset}
          className='ml-auto'
        >
          {resetLabel}
        </LinkButton.Root>
      )}
    </div>
  );
}
FilterDropdownHeader.displayName = 'FilterDropdownHeader';

// ─── Search ────────────────────────────────────────────────

type FilterDropdownSearchProps = {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  size?: 'medium' | 'small' | 'xsmall';
};

const FilterDropdownSearch = React.forwardRef<
  HTMLInputElement,
  FilterDropdownSearchProps
>(
  (
    {
      className,
      placeholder = 'Search...',
      size = 'small',
      value,
      onChange,
    },
    forwardedRef
  ) => (
    <div className={cn('px-3 pt-4', className)}>
      <Input.Root size={size}>
        <Input.Wrapper>
          <Input.Icon as={RiSearchLine} />
          <Input.Input
            ref={forwardedRef}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </Input.Wrapper>
      </Input.Root>
    </div>
  )
);
FilterDropdownSearch.displayName = 'FilterDropdownSearch';

// ─── SelectAll ─────────────────────────────────────────────

type FilterDropdownSelectAllProps = {
  checked: boolean | 'indeterminate';
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  className?: string;
};

function FilterDropdownSelectAll({
  checked,
  onCheckedChange,
  label = 'Select all',
  className,
}: FilterDropdownSelectAllProps) {
  return (
    <div className={cn('flex flex-col gap-2 px-3 pt-2', className)}>
      <label
        className={cn(
          'flex cursor-pointer items-center gap-2 rounded-lg p-2 text-left',
          'transition duration-200 ease-out',
          'hover:bg-bg-weak-50'
        )}
      >
        <Checkbox.Root
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
        <span className='text-paragraph-sm text-text-strong-950'>{label}</span>
      </label>
      <Divider.Root variant='line' />
    </div>
  );
}
FilterDropdownSelectAll.displayName = 'FilterDropdownSelectAll';

// ─── Group ─────────────────────────────────────────────────

type FilterDropdownGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  maxHeight?: number;
};

function FilterDropdownGroup({
  className,
  children,
  maxHeight = 280,
  ...rest
}: FilterDropdownGroupProps) {
  return (
    <div className={cn('px-3 pt-2', className)} {...rest}>
      <ScrollAreaPrimitives.Root type='auto'>
        <ScrollAreaPrimitives.Viewport
          className='w-full overflow-auto'
          style={{ maxHeight }}
        >
          <div className='flex flex-col gap-1'>{children}</div>
        </ScrollAreaPrimitives.Viewport>
        <ScrollAreaPrimitives.Scrollbar
          orientation='vertical'
          className='mr-0.5 flex w-1.5 touch-none p-0.5 select-none'
        >
          <ScrollAreaPrimitives.Thumb className='bg-bg-soft-200 relative flex-1 rounded-full' />
        </ScrollAreaPrimitives.Scrollbar>
      </ScrollAreaPrimitives.Root>
    </div>
  );
}
FilterDropdownGroup.displayName = 'FilterDropdownGroup';

// ─── Item ──────────────────────────────────────────────────

type FilterDropdownItemProps = React.HTMLAttributes<HTMLLabelElement> & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
};

const FilterDropdownItem = React.forwardRef<
  HTMLLabelElement,
  FilterDropdownItemProps
>(
  (
    { className, children, checked, onCheckedChange, disabled, ...rest },
    forwardedRef
  ) => (
    <label
      ref={forwardedRef}
      aria-selected={checked}
      aria-disabled={disabled || undefined}
      className={cn(
        'flex w-full cursor-pointer items-center gap-2 rounded-[10px] p-2 text-left',
        'transition duration-200 ease-out',
        'hover:bg-bg-weak-50',
        'aria-disabled:pointer-events-none aria-disabled:opacity-50',
        className
      )}
      {...rest}
    >
      <Checkbox.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
      <span className='text-paragraph-sm text-text-strong-950 flex min-w-0 flex-1 items-center gap-2'>
        {children}
      </span>
    </label>
  )
);
FilterDropdownItem.displayName = 'FilterDropdownItem';

// ─── CategoryItem ──────────────────────────────────────────

type FilterDropdownCategoryItemProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon?: React.ElementType;
  };

function FilterDropdownCategoryItem({
  className,
  children,
  icon: Icon,
  ...rest
}: FilterDropdownCategoryItemProps) {
  return (
    <button
      type='button'
      className={cn(
        // matches Dropdown.Item styling
        'group/item relative cursor-pointer select-none rounded-lg p-2 text-paragraph-sm text-text-strong-950 outline-none',
        'flex w-full items-center gap-2',
        'transition duration-200 ease-out',
        // hover
        'hover:bg-bg-weak-50',
        // focus
        'focus:outline-none',
        // disabled
        'disabled:text-text-disabled-300',
        className
      )}
      {...rest}
    >
      {Icon && (
        <Icon
          className={cn(
            // matches Dropdown.ItemIcon styling
            'h-5 w-5 text-text-sub-600',
            'group-disabled/item:text-text-disabled-300'
          )}
        />
      )}
      <span className='flex-1 text-left'>{children}</span>
    </button>
  );
}
FilterDropdownCategoryItem.displayName = 'FilterDropdownCategoryItem';

// ─── CategoryList ──────────────────────────────────────────

function FilterDropdownCategoryList({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col gap-1 p-2', className)}
      role='listbox'
      {...rest}
    >
      {children}
    </div>
  );
}
FilterDropdownCategoryList.displayName = 'FilterDropdownCategoryList';

// ─── Apply ─────────────────────────────────────────────────

type FilterDropdownApplyProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    label?: string;
  };

function FilterDropdownApply({
  className,
  label = 'Apply',
  children,
  ...rest
}: FilterDropdownApplyProps) {
  return (
    <div className='px-3 pt-4 pb-3'>
      <Button.Root
        variant='neutral'
        mode='filled'
        size='small'
        className={cn('w-full', className)}
        {...rest}
      >
        {children ?? label}
      </Button.Root>
    </div>
  );
}
FilterDropdownApply.displayName = 'FilterDropdownApply';

// ─── ItemIcon (polymorphic) ────────────────────────────────

function FilterDropdownItemIcon<T extends React.ElementType>({
  className,
  as,
  ...rest
}: PolymorphicComponentProps<T>) {
  const Component = as || 'div';

  return (
    <Component
      className={cn('text-text-sub-600 h-5 w-5 shrink-0', className)}
      {...rest}
    />
  );
}
FilterDropdownItemIcon.displayName = 'FilterDropdownItemIcon';

// ─── Composed ──────────────────────────────────────────────

type FilterOption = {
  /** Unique value identifier */
  value: string;
  /** Display content — string or ReactNode (e.g. Badge, StatusBadge) */
  label: React.ReactNode;
};

type FilterConfig = {
  /** Unique key for this filter group */
  key: string;
  /** Display label shown in the category menu */
  label: string;
  /** Icon shown in the category menu */
  icon?: React.ElementType;
  /** Enable search input for this filter */
  searchable?: boolean;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** The selectable options */
  options: FilterOption[];
};

type FilterDropdownComposedProps = {
  /** The trigger element. Rendered via asChild. */
  children: React.ReactNode;
  /** Filter configuration. 1 entry = flat filter, 2+ = two-level navigation. */
  filters: FilterConfig[];
  /** Selected values per filter key. */
  selected: Record<string, string[]>;
  /** Called when selection changes for a filter key. */
  onSelectedChange: (key: string, values: string[]) => void;
  /** Called when the Apply button is clicked. Receives all current selections. */
  onApply?: (selected: Record<string, string[]>) => void;
  /** Content alignment relative to trigger. */
  align?: 'start' | 'center' | 'end';
  /** Content side relative to trigger. */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Distance in pixels from the trigger. */
  sideOffset?: number;
  /** Additional className for the content panel. */
  contentClassName?: string;
  /** Label for the apply button. */
  applyLabel?: string;
  /** Controlled open state. */
  open?: boolean;
  /** Callback when open state changes. */
  onOpenChange?: (open: boolean) => void;
};

function FilterDropdownComposed({
  children,
  filters,
  selected,
  onSelectedChange,
  onApply,
  align = 'start',
  side,
  sideOffset,
  contentClassName,
  applyLabel,
  open: openProp,
  onOpenChange: onOpenChangeProp,
}: FilterDropdownComposedProps) {
  const isSingleFilter = filters.length === 1;
  const [view, setView] = React.useState<'categories' | string>(
    isSingleFilter ? filters[0].key : 'categories'
  );
  const [searchTerms, setSearchTerms] = React.useState<Record<string, string>>(
    {}
  );

  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      onOpenChangeProp?.(open);
      if (!open) {
        setView(isSingleFilter ? filters[0].key : 'categories');
        setSearchTerms({});
      }
    },
    [onOpenChangeProp, isSingleFilter, filters]
  );

  const getSelectedSet = (key: string) => new Set(selected[key] ?? []);

  const toggle = (key: string, value: string) => {
    const current = selected[key] ?? [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onSelectedChange(key, next);
  };

  const selectAll = (filter: FilterConfig) => {
    const current = selected[filter.key] ?? [];
    const allValues = filter.options.map((o) => o.value);
    const next = current.length === allValues.length ? [] : allValues;
    onSelectedChange(filter.key, next);
  };

  const reset = (key: string) => {
    onSelectedChange(key, []);
    setSearchTerms((prev) => ({ ...prev, [key]: '' }));
  };

  const getAllChecked = (filter: FilterConfig): boolean | 'indeterminate' => {
    const count = (selected[filter.key] ?? []).length;
    if (count === 0) return false;
    if (count === filter.options.length) return true;
    return 'indeterminate';
  };

  const getFilteredOptions = (filter: FilterConfig) => {
    const term = (searchTerms[filter.key] ?? '').toLowerCase();
    if (!term) return filter.options;
    return filter.options.filter((o) => {
      const text = typeof o.label === 'string' ? o.label : o.value;
      return text.toLowerCase().includes(term);
    });
  };

  const activeFilter = filters.find((f) => f.key === view);

  return (
    <FilterDropdownRoot open={openProp} onOpenChange={handleOpenChange}>
      <FilterDropdownTrigger asChild>{children}</FilterDropdownTrigger>
      <FilterDropdownContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={cn(
          view === 'categories' && 'w-[224px]',
          contentClassName
        )}
      >
        {view === 'categories' && (
          <FilterDropdownCategoryList>
            {filters.map((filter) => (
              <FilterDropdownCategoryItem
                key={filter.key}
                icon={filter.icon}
                onClick={() => setView(filter.key)}
              >
                {filter.label}
              </FilterDropdownCategoryItem>
            ))}
          </FilterDropdownCategoryList>
        )}

        {activeFilter && view !== 'categories' && (
          <>
            <FilterDropdownHeader
              onBack={
                isSingleFilter
                  ? undefined
                  : () => setView('categories')
              }
              onReset={() => reset(activeFilter.key)}
            />
            {activeFilter.searchable && (
              <FilterDropdownSearch
                placeholder={activeFilter.searchPlaceholder}
                value={searchTerms[activeFilter.key] ?? ''}
                onChange={(e) =>
                  setSearchTerms((prev) => ({
                    ...prev,
                    [activeFilter.key]: e.target.value,
                  }))
                }
              />
            )}
            <FilterDropdownSelectAll
              checked={getAllChecked(activeFilter)}
              onCheckedChange={() => selectAll(activeFilter)}
            />
            <FilterDropdownGroup>
              {getFilteredOptions(activeFilter).map((option) => (
                <FilterDropdownItem
                  key={option.value}
                  checked={getSelectedSet(activeFilter.key).has(option.value)}
                  onCheckedChange={() => toggle(activeFilter.key, option.value)}
                >
                  {option.label}
                </FilterDropdownItem>
              ))}
            </FilterDropdownGroup>
            <FilterDropdownApply
              label={applyLabel}
              onClick={() => onApply?.(selected)}
            />
          </>
        )}
      </FilterDropdownContent>
    </FilterDropdownRoot>
  );
}
FilterDropdownComposed.displayName = 'FilterDropdownComposed';

// ─── Exports ───────────────────────────────────────────────

export {
  FilterDropdownRoot as Root,
  FilterDropdownTrigger as Trigger,
  FilterDropdownContent as Content,
  FilterDropdownHeader as Header,
  FilterDropdownSearch as Search,
  FilterDropdownSelectAll as SelectAll,
  FilterDropdownGroup as Group,
  FilterDropdownItem as Item,
  FilterDropdownItemIcon as ItemIcon,
  FilterDropdownCategoryItem as CategoryItem,
  FilterDropdownCategoryList as CategoryList,
  FilterDropdownApply as Apply,
  FilterDropdownComposed as Composed,
};
export type { FilterOption, FilterConfig, FilterDropdownComposedProps };
