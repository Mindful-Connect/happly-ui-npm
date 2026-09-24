'use client';

import * as React from 'react';

import { cn } from '@/lib/happly-ui-utils';

type Size = 'md' | 'sm';

const SizeContext = React.createContext<Size>('md');

// The gap between rows, carried above each one rather than by border-spacing,
// which would also space the labels off the card's title and leave a gap under
// the last row.
const GAP: Record<Size, string> = { md: 'pt-2', sm: 'pt-1' };

type MetricListRootProps = React.TableHTMLAttributes<HTMLTableElement> & {
  /** `md` for rows carrying an avatar and a sublabel, `sm` for single-line rows. */
  size?: Size;
};

/**
 * A compact table of entities and their figures, for the preview inside a card.
 * A real table, so a column's width is declared once on its header and every
 * row follows it, and so a screen reader can name the figure's column.
 */
function MetricListRoot({
  size = 'md',
  className,
  ...rest
}: MetricListRootProps) {
  return (
    <SizeContext.Provider value={size}>
      <table className={cn('w-full', className)} {...rest} />
    </SizeContext.Provider>
  );
}
MetricListRoot.displayName = 'MetricListRoot';

/** The row of column labels. The design gives it no rule and no band. */
function MetricListHeader({
  children,
  ...rest
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead {...rest}>
      <tr>{children}</tr>
    </thead>
  );
}
MetricListHeader.displayName = 'MetricListHeader';

/**
 * One column's label. A width set on a figure's column is a minimum: the column
 * grows if a value needs more, and the first column gives up the difference.
 */
function MetricListColumn({
  className,
  ...rest
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      scope='col'
      className={cn(
        'text-label-xs text-text-soft-400 text-start font-normal whitespace-nowrap',
        // The first column names the entity and takes the slack; the figures
        // after it are read against their values, at the end.
        // The gap between figure columns, which now size to their own content.
        '[&:not(:first-child)]:ps-4 [&:not(:first-child)]:text-end',
        className
      )}
      {...rest}
    />
  );
}
MetricListColumn.displayName = 'MetricListColumn';

function MetricListBody(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />;
}
MetricListBody.displayName = 'MetricListBody';

function MetricListRow(props: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr {...props} />;
}
MetricListRow.displayName = 'MetricListRow';

type MetricListEntityProps = React.TdHTMLAttributes<HTMLTableCellElement> & {
  /** The leading slot: an Avatar on a person, a thumbnail on a thing. */
  media?: React.ReactNode;
  label: string;
  /** Under the label, in the quieter colour. Leave it out and the row is one line. */
  sublabel?: string;
};

/** The first cell: what the row is about. */
function MetricListEntity({
  media,
  label,
  sublabel,
  className,
  ...rest
}: MetricListEntityProps) {
  const size = React.useContext(SizeContext);

  return (
    // max-w-0 keeps the name out of the table's width: the column takes the
    // slack left by the figures, and a name too long for it truncates.
    <td className={cn('w-full max-w-0', GAP[size], className)} {...rest}>
      <span
        className={cn(
          'flex items-center gap-3',
          size === 'md' ? 'h-[43px]' : 'h-9'
        )}
      >
        {media}
        <span className='flex min-w-0 flex-col gap-1'>
          {/* Truncated, so the full name stays reachable on hover. */}
          <span
            className='text-label-sm text-text-strong-950 truncate font-medium'
            title={label}
          >
            {label}
          </span>
          {sublabel ? (
            <span
              className='text-label-xs text-text-soft-400 truncate'
              title={sublabel}
            >
              {sublabel}
            </span>
          ) : null}
        </span>
      </span>
    </td>
  );
}
MetricListEntity.displayName = 'MetricListEntity';

/**
 * One figure. Pass it already formatted — a count, a duration, a percentage or
 * a fallback all read the same here.
 */
function MetricListValue({
  className,
  ...rest
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  const size = React.useContext(SizeContext);

  return (
    <td
      className={cn(
        // Never wrapped: a long value widens its column and the name truncates
        // instead, rather than the figure stacking and growing the row.
        'text-label-sm text-text-sub-600 ps-4 text-end align-middle whitespace-nowrap tabular-nums',
        GAP[size],
        className
      )}
      {...rest}
    />
  );
}
MetricListValue.displayName = 'MetricListValue';

export {
  MetricListRoot as Root,
  MetricListHeader as Header,
  MetricListColumn as Column,
  MetricListBody as Body,
  MetricListRow as Row,
  MetricListEntity as Entity,
  MetricListValue as Value,
};
