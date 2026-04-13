'use client';

import * as React from 'react';
import { RiFilter3Fill } from '@remixicon/react';

import * as Button from '@/components/ui/button';
import * as Tag from '@/components/ui/tag';
import { cn } from '@/lib/happly-ui-utils';

// ─── Types ────────────────────────────────────────────────

type AppliedFilterOption = {
  /** Unique value identifier */
  value: string;
  /** Display label */
  label: React.ReactNode;
};

type AppliedFilterGroup = {
  /** Unique key identifying this filter group */
  key: string;
  /** Display label for the filter category */
  label: string;
  /** Icon shown beside the category label */
  icon?: React.ElementType;
  /** The full list of options (used to resolve labels from values) */
  options: AppliedFilterOption[];
};

// ─── Animated Tag (internal) ──────────────────────────────

const EXIT_MS = 200;

function AnimatedTag({
  filterKey,
  value,
  label,
  onRemove,
}: {
  filterKey: string;
  value: string;
  label: React.ReactNode;
  onRemove: (key: string, value: string) => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [exiting, setExiting] = React.useState(false);

  const handleDismiss = () => {
    if (exiting) return;
    const el = ref.current;
    if (el) {
      // Lock current width so collapse animates from a fixed value
      el.style.width = `${el.offsetWidth}px`;
      el.getBoundingClientRect();
    }
    setExiting(true);
    setTimeout(() => onRemove(filterKey, value), EXIT_MS);
  };

  return (
    <div
      ref={ref}
      style={{
        transitionProperty: 'width, opacity, transform',
        transitionDuration: `${EXIT_MS}ms`,
        transitionTimingFunction: 'cubic-bezier(0.2, 0, 0, 1)',
        ...(exiting
          ? { width: 0, opacity: 0, transform: 'scale(0.9)' }
          : {}),
      }}
      className={cn(
        'inline-flex overflow-hidden',
        exiting && 'pointer-events-none'
      )}
    >
      <Tag.Root variant='stroke' rounded={false} className='shrink-0'>
        {label}
        <Tag.DismissButton
          onClick={handleDismiss}
          aria-label={`Remove ${typeof label === 'string' ? label : value}`}
        />
      </Tag.Root>
    </div>
  );
}

// ─── Layout (internal) ────────────────────────────────────

type AppliedFiltersLayoutProps = React.HTMLAttributes<HTMLDivElement> & {
  resetButton: React.ReactNode;
};

const AppliedFiltersLayout = React.forwardRef<
  HTMLDivElement,
  AppliedFiltersLayoutProps
>(({ resetButton, className, children, ...rest }, forwardedRef) => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [wrapped, setWrapped] = React.useState(false);

  React.useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const check = () => {
      // A single row has the same scrollHeight as the first child's
      // offsetHeight (plus gap). If the container is taller, it wrapped.
      const firstChild = el.firstElementChild as HTMLElement | null;
      if (!firstChild) return;
      setWrapped(el.scrollHeight > firstChild.offsetHeight + 4);
    };

    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={forwardedRef}
      className={cn(
        'flex gap-3',
        wrapped ? 'items-start' : 'items-center',
        className
      )}
      {...rest}
    >
      <div
        ref={contentRef}
        className='flex min-w-0 flex-1 flex-wrap items-center gap-3'
      >
        {children}
      </div>
      {resetButton}
    </div>
  );
});
AppliedFiltersLayout.displayName = 'AppliedFiltersLayout';

// ─── Root ─────────────────────────────────────────────────

const APPLIED_FILTERS_ROOT_NAME = 'AppliedFiltersRoot';

type AppliedFiltersRootProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Filter group definitions (mirrors FilterConfig shape) */
  filters: AppliedFilterGroup[];
  /** Currently selected values per filter key */
  selected: Record<string, string[]>;
  /** Called when a single value is removed from a filter group */
  onRemove: (key: string, value: string) => void;
  /** Called when all values for a specific filter group are cleared */
  onRemoveGroup?: (key: string) => void;
  /** Called when the "Reset all" button is clicked */
  onResetAll?: () => void;
  /** Label shown before the filter chips */
  label?: string;
  /** Label for the reset all button */
  resetLabel?: string;
  /** Icon shown before the label */
  labelIcon?: React.ElementType;
};

const AppliedFiltersRoot = React.forwardRef<
  HTMLDivElement,
  AppliedFiltersRootProps
>(
  (
    {
      filters,
      selected,
      onRemove,
      onRemoveGroup,
      onResetAll,
      label = 'Applied filters:',
      resetLabel = 'Reset all filters',
      labelIcon: LabelIcon = RiFilter3Fill,
      className,
      children,
      ...rest
    },
    forwardedRef
  ) => {
    // Determine which groups have active selections
    const activeGroups = React.useMemo(
      () =>
        filters.filter(
          (f) => selected[f.key] && selected[f.key].length > 0
        ),
      [filters, selected]
    );

    const hasActiveFilters = activeGroups.length > 0;

    if (!hasActiveFilters && !children) return null;

    return (
      <AppliedFiltersLayout
        ref={forwardedRef}
        className={className}
        resetButton={
          onResetAll && hasActiveFilters ? (
            <Button.Root
              variant='neutral'
              mode='stroke'
              size='xsmall'
              onClick={onResetAll}
              className='shrink-0'
            >
              {resetLabel}
            </Button.Root>
          ) : null
        }
        {...rest}
      >
        {/* Label */}
        {hasActiveFilters && (
          <div className='flex shrink-0 items-center gap-1'>
            <LabelIcon className='h-5 w-5 text-text-sub-600' />
            <span className='whitespace-nowrap text-label-sm text-text-strong-950'>
              {label}
            </span>
          </div>
        )}

        {/* Filter groups */}
        {activeGroups.map((group) => (
          <AppliedFiltersGroup
            key={group.key}
            group={group}
            values={selected[group.key]}
            onRemove={onRemove}
            onRemoveGroup={onRemoveGroup}
          />
        ))}

        {children}
      </AppliedFiltersLayout>
    );
  }
);
AppliedFiltersRoot.displayName = APPLIED_FILTERS_ROOT_NAME;

// ─── Group (internal) ─────────────────────────────────────

type AppliedFiltersGroupProps = {
  group: AppliedFilterGroup;
  values: string[];
  onRemove: (key: string, value: string) => void;
  onRemoveGroup?: (key: string) => void;
};

function AppliedFiltersGroup({
  group,
  values,
  onRemove,
}: AppliedFiltersGroupProps) {
  const GroupIcon = group.icon;

  // Resolve option labels from values
  const resolvedItems = React.useMemo(() => {
    const optionMap = new Map(
      group.options.map((o) => [o.value, o.label])
    );
    return values.map((v) => ({
      value: v,
      label: optionMap.get(v) ?? v,
    }));
  }, [group.options, values]);

  return (
    <div className='flex items-center gap-3'>
      {/* Category label */}
      <div className='flex shrink-0 items-center gap-1'>
        {GroupIcon && (
          <GroupIcon className='h-5 w-5 text-text-soft-400' />
        )}
        <span className='whitespace-nowrap text-label-sm text-text-sub-600'>
          {group.label}
        </span>
      </div>

      {/* Tags */}
      <div className='flex flex-wrap items-center gap-1.5'>
        {resolvedItems.map((item) => (
          <AnimatedTag
            key={item.value}
            filterKey={group.key}
            value={item.value}
            label={item.label}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Custom Group ─────────────────────────────────────────

const APPLIED_FILTERS_CUSTOM_GROUP_NAME = 'AppliedFiltersCustomGroup';

type AppliedFiltersCustomGroupProps =
  React.HTMLAttributes<HTMLDivElement> & {
    /** Category label */
    label: string;
    /** Icon shown beside the category label */
    icon?: React.ElementType;
  };

const AppliedFiltersCustomGroup = React.forwardRef<
  HTMLDivElement,
  AppliedFiltersCustomGroupProps
>(({ label, icon: GroupIcon, className, children, ...rest }, forwardedRef) => {
  return (
    <div
      ref={forwardedRef}
      className={cn('flex items-center gap-3', className)}
      {...rest}
    >
      <div className='flex shrink-0 items-center gap-1'>
        {GroupIcon && (
          <GroupIcon className='h-5 w-5 text-text-soft-400' />
        )}
        <span className='whitespace-nowrap text-label-sm text-text-sub-600'>
          {label}
        </span>
      </div>
      <div className='flex flex-wrap items-center gap-1.5'>
        {children}
      </div>
    </div>
  );
});
AppliedFiltersCustomGroup.displayName = APPLIED_FILTERS_CUSTOM_GROUP_NAME;

// ─── Tag (convenience re-export for custom usage) ─────────

const APPLIED_FILTERS_TAG_NAME = 'AppliedFiltersTag';

type AppliedFiltersTagProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Called when the dismiss button is clicked */
  onDismiss?: () => void;
};

const AppliedFiltersTag = React.forwardRef<
  HTMLDivElement,
  AppliedFiltersTagProps
>(({ children, onDismiss, ...rest }, forwardedRef) => {
  return (
    <Tag.Root ref={forwardedRef} variant='stroke' rounded={false} {...rest}>
      {children}
      {onDismiss && (
        <Tag.DismissButton onClick={onDismiss} aria-label='Remove filter' />
      )}
    </Tag.Root>
  );
});
AppliedFiltersTag.displayName = APPLIED_FILTERS_TAG_NAME;

// ─── Exports ──────────────────────────────────────────────

export {
  AppliedFiltersRoot as Root,
  AppliedFiltersCustomGroup as CustomGroup,
  AppliedFiltersTag as Tag,
};
export type {
  AppliedFilterOption,
  AppliedFilterGroup,
  AppliedFiltersRootProps,
  AppliedFiltersCustomGroupProps,
  AppliedFiltersTagProps,
};
