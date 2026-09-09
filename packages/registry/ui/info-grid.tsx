import * as React from 'react';

import { cn } from '@/lib/happly-ui-utils';
import { tv } from '@/lib/tv';
import * as KeyIcon from '@/components/ui/key-icon';

// ─── Variants ────────────────────────────────────────────────────────────────

const infoGridRootVariants = tv({
  base: [
    'flex w-full flex-col overflow-hidden rounded-[20px]',
    'bg-bg-white-0 ring-1 ring-inset ring-stroke-soft-200 shadow-regular-xs',
  ],
});

const infoGridRowVariants = tv({
  base: [
    'flex w-full flex-col @lg:flex-row @lg:items-stretch',
    // all rows except the first get a top divider
    '[&:not(:first-child)]:border-t [&:not(:first-child)]:border-stroke-soft-200',
  ],
});

const infoGridCellVariants = tv({
  base: [
    'flex min-w-0 flex-1 flex-col gap-3 p-5',
    // stacked (small): bottom border on all cells except last
    '[&:not(:last-child)]:border-b [&:not(:last-child)]:border-stroke-soft-200',
    // row (large): right border instead, remove bottom border
    '@lg:[&:not(:last-child)]:border-b-0 @lg:[&:not(:last-child)]:border-r @lg:[&:not(:last-child)]:border-stroke-soft-200',
  ],
  variants: {},
});

// ─── Root ────────────────────────────────────────────────────────────────────

type InfoGridRootProps = React.ComponentPropsWithoutRef<'div'>;

const InfoGridRoot = React.forwardRef<HTMLDivElement, InfoGridRootProps>(
  ({ className, children, ...rest }, forwardedRef) => {
    return (
      <div ref={forwardedRef} className='@container' {...rest}>
        <div className={cn(infoGridRootVariants(), className)}>{children}</div>
      </div>
    );
  }
);
InfoGridRoot.displayName = 'InfoGridRoot';

// ─── Row ─────────────────────────────────────────────────────────────────────

type InfoGridRowProps = React.ComponentPropsWithoutRef<'div'>;

const InfoGridRow = React.forwardRef<HTMLDivElement, InfoGridRowProps>(
  ({ className, ...rest }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        className={cn(infoGridRowVariants(), className)}
        {...rest}
      />
    );
  }
);
InfoGridRow.displayName = 'InfoGridRow';

// ─── Cell ────────────────────────────────────────────────────────────────────

type InfoGridCellProps = React.ComponentPropsWithoutRef<'div'>;

const InfoGridCell = React.forwardRef<HTMLDivElement, InfoGridCellProps>(
  ({ className, ...rest }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        className={cn(infoGridCellVariants(), className)}
        {...rest}
      />
    );
  }
);
InfoGridCell.displayName = 'InfoGridCell';

// ─── Group (composed) ────────────────────────────────────────────────────────

type InfoGridGroupItem = {
  icon: React.ReactNode;
  label: React.ReactNode;
  children: React.ReactNode;
  /** Number of grid columns this item should span. Defaults to 1. */
  span?: number;
};

type InfoGridGroupRow = {
  items: InfoGridGroupItem[];
  /** Total number of grid columns for this row. When set, the row uses CSS grid instead of flex. */
  columns?: number;
};

type InfoGridGroupProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'children'
> & {
  rows: InfoGridGroupRow[];
};

const InfoGridGroup = React.forwardRef<HTMLDivElement, InfoGridGroupProps>(
  ({ rows, ...rest }, forwardedRef) => {
    return (
      <InfoGridRoot ref={forwardedRef} {...rest}>
        {rows.map((row, rowIndex) => (
          <InfoGridRow
            key={rowIndex}
            className={
              row.columns
                ? cn(
                    '@lg:grid',
                    row.columns === 2 && '@lg:grid-cols-2',
                    row.columns === 3 && '@lg:grid-cols-3',
                    row.columns === 4 && '@lg:grid-cols-4'
                  )
                : undefined
            }
          >
            {row.items.map((item, cellIndex) => (
              <InfoGridCell
                key={cellIndex}
                className={
                  item.span && item.span > 1
                    ? cn(
                        item.span === 2 && '@lg:col-span-2',
                        item.span === 3 && '@lg:col-span-3'
                      )
                    : undefined
                }
              >
                <KeyIcon.Root icon={item.icon} />
                <div className='text-paragraph-sm text-text-sub-600 flex flex-col items-start gap-1 text-pretty'>
                  <p className='text-label-xs text-text-strong-950'>
                    {item.label}
                  </p>
                  {item.children}
                </div>
              </InfoGridCell>
            ))}
          </InfoGridRow>
        ))}
      </InfoGridRoot>
    );
  }
);
InfoGridGroup.displayName = 'InfoGridGroup';

// ─── Exports ─────────────────────────────────────────────────────────────────

export {
  InfoGridRoot as Root,
  InfoGridRow as Row,
  InfoGridCell as Cell,
  InfoGridGroup as Group,
  infoGridRootVariants,
  infoGridRowVariants,
  infoGridCellVariants,
};

export type { InfoGridGroupItem, InfoGridGroupRow, InfoGridGroupProps };
