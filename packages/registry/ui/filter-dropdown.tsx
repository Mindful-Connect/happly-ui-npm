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
import * as Loader from '@/components/ui/loader';
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
      className={cn('flex items-center justify-between px-3 pt-4', className)}
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
    { className, placeholder = 'Search…', size = 'small', value, onChange },
    forwardedRef
  ) => (
    <div className={cn('px-3 pt-4', className)}>
      <Input.Root size={size}>
        <Input.Wrapper>
          <Input.Icon as={RiSearchLine} />
          <Input.Input
            ref={forwardedRef}
            aria-label='Search options'
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
          'flex cursor-pointer items-center gap-2 rounded-lg p-2 text-start',
          'transition-[background-color] duration-150 ease-out',
          'hover:bg-bg-weak-50'
        )}
      >
        <Checkbox.Root checked={checked} onCheckedChange={onCheckedChange} />
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
  onScrollEnd?: () => void;
  isLoadingMore?: boolean;
};

function FilterDropdownGroup({
  className,
  children,
  maxHeight = 280,
  onScrollEnd,
  isLoadingMore,
  ...rest
}: FilterDropdownGroupProps) {
  const viewportRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!onScrollEnd) return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    function handleScroll() {
      if (!viewport) return;
      const { scrollTop, scrollHeight, clientHeight } = viewport;
      if (scrollHeight - scrollTop - clientHeight < 40) {
        onScrollEnd?.();
      }
    }

    viewport.addEventListener('scroll', handleScroll);
    return () => viewport.removeEventListener('scroll', handleScroll);
  }, [onScrollEnd]);

  return (
    <div className={cn('px-3 pt-2', className)} {...rest}>
      <ScrollAreaPrimitives.Root type='auto'>
        <ScrollAreaPrimitives.Viewport
          ref={viewportRef}
          className='w-full overflow-auto overscroll-contain'
          style={{ maxHeight }}
        >
          <div className='flex flex-col gap-1'>
            {children}
            {isLoadingMore && (
              <div className='flex items-center justify-center py-2'>
                <Loader.Root size={16} color='neutral' />
              </div>
            )}
          </div>
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
      aria-disabled={disabled || undefined}
      className={cn(
        'flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 text-start',
        'transition-[background-color] duration-150 ease-out',
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
        'group/item text-paragraph-sm text-text-strong-950 relative cursor-pointer rounded-lg p-2 outline-none',
        'flex w-full items-center gap-2',
        'transition-[background-color] duration-150 ease-out',
        // hover
        'hover:bg-bg-weak-50',
        // focus
        'focus-visible:shadow-button-important-focus',
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
            'text-text-sub-600 h-5 w-5',
            'group-disabled/item:text-text-disabled-300'
          )}
        />
      )}
      <span className='flex-1 text-start'>{children}</span>
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
    <div className={cn('flex flex-col gap-1 p-2', className)} {...rest}>
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
  disabled,
  onClick,
  ...rest
}: FilterDropdownApplyProps) {
  return (
    <div className='px-3 pt-4 pb-3'>
      <Button.Root
        variant='neutral'
        mode='filled'
        size='small'
        // `aria-disabled` rather than the native `disabled`, following
        // `Button.Root`'s own loading state. Apply is the last control in the
        // panel and it flips to unavailable at the moment it is activated — a
        // native `disabled` button drops focus to `<body>` right then, and the
        // panel is portalled, so a keyboard user loses their place entirely.
        // Staying focusable keeps focus on the button; the styling below and
        // the guard on `onClick` block the interaction instead.
        aria-disabled={disabled || undefined}
        className={cn(
          'w-full',
          disabled &&
            'bg-bg-weak-50 text-text-disabled-300 pointer-events-none shadow-none ring-transparent',
          className
        )}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          if (disabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }
          onClick?.(event);
        }}
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

// ─── Remote fetch result ───────────────────────────────────

type RemoteFetchResult = {
  options: FilterOption[];
  hasMore: boolean;
};

// ─── Composed ──────────────────────────────────────────────

type FilterOption = {
  /** Unique value identifier */
  value: string;
  /** Display content — string or ReactNode (e.g. Badge, StatusBadge) */
  label: React.ReactNode;
  /** Plain text label for applied filter tags. Falls back to label if omitted. */
  tagLabel?: string;
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
  /** The selectable options (used for static filters) */
  options: FilterOption[];
  /** Remote data source for lazy-loaded, server-searched filters */
  remote?: {
    /** Fetch a page of options. Called on mount, search change, and scroll-to-bottom. */
    onFetch: (params: {
      query: string;
      page: number;
    }) => Promise<RemoteFetchResult>;
    /** Debounce delay in ms for search input. Defaults to 300. */
    debounceMs?: number;
  };
};

type RemoteState = {
  options: FilterOption[];
  page: number;
  hasMore: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
  query: string;
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

// Applying does not close the panel and may not visibly change anything a
// screen-reader user is on, so the outcome has to be spoken. Full sentences per
// branch rather than a count glued into a fragment, so the string survives
// translation.
function applyAnnouncement(selected: Record<string, string[]>) {
  const count = Object.values(selected).reduce(
    (total, values) => total + values.length,
    0
  );
  if (count === 0) return 'Filters cleared';
  if (count === 1) return '1 filter applied';
  return `${count} filters applied`;
}

// One filter group's values, compared as a set: a value unchecked and checked
// again lands at the end of the array without being a change.
function valuesEqual(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  const set = new Set(a);
  return b.every((v) => set.has(v));
}

// Whole selections, used both to enable/disable Apply and to decide which
// groups the close handler has to rewind.
function selectionsEqual(
  a: Record<string, string[]>,
  b: Record<string, string[]>
) {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const key of keys) {
    if (!valuesEqual(a[key] ?? [], b[key] ?? [])) return false;
  }
  return true;
}

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

  // The last committed selection: taken when the popover opens and retaken on
  // every Apply. Everything the panel says about "unapplied changes" is
  // measured against it, and closing the panel rewinds to it. State, not a
  // ref, so committing it re-renders and `hasChanges` is a plain derivation.
  const [baseline, setBaseline] = React.useState<Record<string, string[]>>({});

  // Two Applies in a row can produce the identical sentence ("1 filter
  // applied", swap the one value, "1 filter applied"). Setting the same string
  // mutates nothing, and a live region with no mutation is not re-announced —
  // the second Apply would be silent. The nonce makes every Apply a real text
  // change; it renders as a zero-width space, which is invisible and unspoken.
  const [applyStatus, setApplyStatus] = React.useState({
    message: '',
    nonce: 0,
  });

  const commitBaseline = React.useCallback(
    (values: Record<string, string[]>) => {
      setBaseline(
        Object.fromEntries(Object.entries(values).map(([k, v]) => [k, [...v]]))
      );
    },
    []
  );

  // Remote filter state per key
  const [remoteStates, setRemoteStates] = React.useState<
    Record<string, RemoteState>
  >({});
  const debounceTimers = React.useRef<
    Record<string, ReturnType<typeof setTimeout>>
  >({});

  const updateRemoteState = React.useCallback(
    (key: string, update: Partial<RemoteState>) => {
      setRemoteStates((prev) => ({
        ...prev,
        [key]: { ...prev[key], ...update } as RemoteState,
      }));
    },
    []
  );

  const fetchRemote = React.useCallback(
    async (
      filter: FilterConfig,
      query: string,
      page: number
    ): Promise<void> => {
      if (!filter.remote) return;
      const key = filter.key;
      const isFirstPage = page === 1;

      updateRemoteState(
        key,
        isFirstPage ? { isLoading: true } : { isLoadingMore: true }
      );

      try {
        const result = await filter.remote.onFetch({ query, page });
        setRemoteStates((prev) => {
          const existing = prev[key];
          return {
            ...prev,
            [key]: {
              options: isFirstPage
                ? result.options
                : [...(existing?.options ?? []), ...result.options],
              page,
              hasMore: result.hasMore,
              isLoading: false,
              isLoadingMore: false,
              query,
            },
          };
        });
      } catch {
        updateRemoteState(key, { isLoading: false, isLoadingMore: false });
      }
    },
    [updateRemoteState]
  );

  // Track which remote filters have been initially fetched
  const fetchedRemoteKeys = React.useRef<Set<string>>(new Set());
  // Declared here, above `handleOpenChange` — which clears it — rather than
  // next to the loader below: a ref first captured by a hook callback and
  // created afterwards reads as a hook argument being mutated.
  const loadMoreLock = React.useRef<Record<string, boolean>>({});

  // Fetch first page when navigating to a remote filter
  React.useEffect(() => {
    const activeFilter = filters.find((f) => f.key === view);
    if (!activeFilter?.remote) return;
    if (fetchedRemoteKeys.current.has(activeFilter.key)) return;
    fetchedRemoteKeys.current.add(activeFilter.key);
    fetchRemote(activeFilter, '', 1);
  }, [view, filters, fetchRemote]);

  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      onOpenChangeProp?.(open);
      if (open) {
        commitBaseline(selected);
      } else {
        // Rewind to the last committed selection. The baseline tracks Apply, so
        // this reverts edits made before the first Apply and edits made after
        // one — otherwise a change made after applying would survive the close
        // and leave the checkboxes describing a filter the list never received.
        const allKeys = Array.from(
          new Set([...Object.keys(baseline), ...Object.keys(selected)])
        );
        for (let i = 0; i < allKeys.length; i++) {
          const key = allKeys[i];
          const prev = baseline[key] ?? [];
          if (!valuesEqual(prev, selected[key] ?? [])) {
            onSelectedChange(key, prev);
          }
        }

        setView(isSingleFilter ? filters[0].key : 'categories');
        setSearchTerms({});
        setApplyStatus((prev) => ({ ...prev, message: '' }));
        setRemoteStates({});
        fetchedRemoteKeys.current.clear();
        loadMoreLock.current = {};
        Object.values(debounceTimers.current).forEach(clearTimeout);
        debounceTimers.current = {};
      }
    },
    [
      onOpenChangeProp,
      isSingleFilter,
      filters,
      selected,
      onSelectedChange,
      commitBaseline,
      baseline,
    ]
  );

  // Clean up debounce timers on unmount
  React.useEffect(() => {
    return () => {
      Object.values(debounceTimers.current).forEach(clearTimeout);
    };
  }, []);

  const handleRemoteSearch = React.useCallback(
    (filter: FilterConfig, value: string) => {
      if (!filter.remote) return;
      const key = filter.key;
      const delay = filter.remote.debounceMs ?? 300;

      if (debounceTimers.current[key]) {
        clearTimeout(debounceTimers.current[key]);
      }

      debounceTimers.current[key] = setTimeout(() => {
        fetchRemote(filter, value, 1);
      }, delay);
    },
    [fetchRemote]
  );

  const handleLoadMore = React.useCallback(
    (filter: FilterConfig) => {
      if (!filter.remote) return;
      const key = filter.key;
      const state = remoteStates[key];
      if (!state || !state.hasMore || state.isLoadingMore || state.isLoading)
        return;
      if (loadMoreLock.current[key]) return;
      loadMoreLock.current[key] = true;
      fetchRemote(filter, state.query, state.page + 1).finally(() => {
        loadMoreLock.current[key] = false;
      });
    },
    [remoteStates, fetchRemote]
  );

  const toggle = (key: string, value: string) => {
    const current = selected[key] ?? [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onSelectedChange(key, next);
  };

  const getOptionsForFilter = (filter: FilterConfig): FilterOption[] => {
    const raw = filter.remote
      ? (remoteStates[filter.key]?.options ?? [])
      : filter.options;

    // Deduplicate by value — guards against API returning duplicate slugs
    const seen = new Set<string>();
    const unique = raw.filter((o) => {
      if (seen.has(o.value)) return false;
      seen.add(o.value);
      return true;
    });

    const term = (searchTerms[filter.key] ?? '').toLowerCase();
    if (!term) return unique;
    return unique.filter((o) => {
      const text = typeof o.label === 'string' ? o.label : o.value;
      return text.toLowerCase().includes(term);
    });
  };

  const selectAll = (filter: FilterConfig) => {
    const options = getOptionsForFilter(filter);
    const currentSet = new Set(selected[filter.key] ?? []);
    const allValues = options.map((o) => o.value);
    const allSelected =
      allValues.length > 0 && allValues.every((v) => currentSet.has(v));
    onSelectedChange(filter.key, allSelected ? [] : allValues);
  };

  const reset = (key: string) => {
    onSelectedChange(key, []);
    setSearchTerms((prev) => ({ ...prev, [key]: '' }));
    const filter = filters.find((f) => f.key === key);
    if (filter?.remote) {
      fetchRemote(filter, '', 1);
    }
  };

  // Exit route out of a search that matched nothing — keeps the selection.
  const clearSearch = (filter: FilterConfig) => {
    setSearchTerms((prev) => ({ ...prev, [filter.key]: '' }));
    if (filter.remote) {
      clearTimeout(debounceTimers.current[filter.key]);
      fetchRemote(filter, '', 1);
    }
  };

  const getAllChecked = (filter: FilterConfig): boolean | 'indeterminate' => {
    const options = getOptionsForFilter(filter);
    const currentSet = new Set(selected[filter.key] ?? []);
    if (currentSet.size === 0) return false;
    const allValues = options.map((o) => o.value);
    if (allValues.length > 0 && allValues.every((v) => currentSet.has(v)))
      return true;
    return 'indeterminate';
  };

  // Whether the selection has moved away from the last committed baseline.
  const hasChanges = !selectionsEqual(selected, baseline);

  const activeFilter = filters.find((f) => f.key === view);
  const activeRemoteState = activeFilter?.remote
    ? remoteStates[activeFilter.key]
    : null;

  const activeOptions = activeFilter ? getOptionsForFilter(activeFilter) : [];
  const activeSelectedSet = activeFilter
    ? new Set(selected[activeFilter.key] ?? [])
    : new Set<string>();

  // Only wire up infinite scroll when there's more data to load and we're not already fetching
  const shouldLoadMore =
    activeFilter?.remote &&
    activeRemoteState?.hasMore &&
    !activeRemoteState?.isLoadingMore &&
    !activeRemoteState?.isLoading;

  return (
    <FilterDropdownRoot open={openProp} onOpenChange={handleOpenChange}>
      <FilterDropdownTrigger asChild>{children}</FilterDropdownTrigger>
      <FilterDropdownContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={cn(view === 'categories' && 'w-[224px]', contentClassName)}
      >
        {/* Rendered empty for the life of the panel and updated in place —
            a live region inserted at the moment it has something to say is
            unreliably announced. */}
        <span role='status' className='sr-only'>
          {applyStatus.message + (applyStatus.nonce % 2 === 1 ? '\u200B' : '')}
        </span>

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
              onBack={isSingleFilter ? undefined : () => setView('categories')}
              onReset={() => reset(activeFilter.key)}
            />
            {activeFilter.searchable && (
              <FilterDropdownSearch
                placeholder={activeFilter.searchPlaceholder}
                value={searchTerms[activeFilter.key] ?? ''}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerms((prev) => ({
                    ...prev,
                    [activeFilter.key]: value,
                  }));
                  if (activeFilter.remote) {
                    handleRemoteSearch(activeFilter, value);
                  }
                }}
              />
            )}
            {!activeRemoteState?.isLoading && (
              <FilterDropdownSelectAll
                checked={getAllChecked(activeFilter)}
                onCheckedChange={() => selectAll(activeFilter)}
              />
            )}
            <FilterDropdownGroup
              onScrollEnd={
                shouldLoadMore ? () => handleLoadMore(activeFilter) : undefined
              }
              isLoadingMore={activeRemoteState?.isLoadingMore}
            >
              {activeRemoteState?.isLoading ? (
                <div className='flex items-center justify-center py-4'>
                  <Loader.Root size={20} color='neutral' />
                </div>
              ) : activeOptions.length === 0 ? (
                <div className='flex flex-col items-center justify-center gap-1 py-4'>
                  <span className='text-paragraph-sm text-text-soft-400 text-center text-pretty'>
                    {searchTerms[activeFilter.key]
                      ? `No results for “${searchTerms[activeFilter.key]}”`
                      : `No ${activeFilter.label.toLowerCase()} to choose from yet`}
                  </span>
                  {searchTerms[activeFilter.key] && (
                    <LinkButton.Root
                      variant='gray'
                      size='small'
                      onClick={() => clearSearch(activeFilter)}
                    >
                      Clear search
                    </LinkButton.Root>
                  )}
                </div>
              ) : (
                activeOptions.map((option) => (
                  <FilterDropdownItem
                    key={option.value}
                    checked={activeSelectedSet.has(option.value)}
                    onCheckedChange={() =>
                      toggle(activeFilter.key, option.value)
                    }
                  >
                    {option.label}
                  </FilterDropdownItem>
                ))
              )}
            </FilterDropdownGroup>
            <FilterDropdownApply
              label={applyLabel}
              disabled={!hasChanges}
              onClick={() => {
                onApply?.(selected);
                // Re-baseline to what we just committed. The panel stays OPEN
                // after Apply, and `hasChanges` compares `selected` against the
                // baseline. Without this the baseline still describes the
                // pre-Apply state, so any edit that returns the selection to
                // that state (most obviously "Reset filter", which clears the
                // group back to empty) leaves `hasChanges` false and DISABLES
                // Apply, while the committed filter is still the applied one.
                // The list stays filtered with no way to clear it short of
                // reloading the page.
                commitBaseline(selected);
                setApplyStatus((prev) => ({
                  message: applyAnnouncement(selected),
                  nonce: prev.nonce + 1,
                }));
              }}
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
export type {
  FilterOption,
  FilterConfig,
  FilterDropdownComposedProps,
  RemoteFetchResult,
};
