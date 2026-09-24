'use client';

import * as React from 'react';

import { cn } from '@/lib/happly-ui-utils';

export type RankedListItem = {
  label: string;
  value: number;
};

type RankedListProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Rows in rank order. The list numbers them as given and does not sort. */
  items: RankedListItem[];
  /** Headers over the label column and the value column. */
  columnLabels: [string, string];
};

function RankedList({
  items,
  columnLabels,
  className,
  ...rest
}: RankedListProps) {
  return (
    <div
      className={cn('flex h-full min-h-0 flex-col gap-1', className)}
      {...rest}
    >
      {/* No rule under the header and none between rows: the design
          separates them with spacing alone. Both reserve the scrollbar's
          gutter so the header's right column ends over the values rather
          than over the list's scrollbar; the header's overflow-hidden is
          what lets the gutter apply to it. */}
      <div className='text-label-xs text-text-soft-400 flex shrink-0 items-start gap-2 overflow-hidden [scrollbar-gutter:stable]'>
        <span className='min-w-0 flex-1'>{columnLabels[0]}</span>
        <span className='shrink-0 text-end'>{columnLabels[1]}</span>
      </div>
      {/* Rows spread to fill the card rather than stacking from the top, which
          keeps four of them evenly spaced; past that the list scrolls. */}
      <ol className='flex min-h-0 flex-1 flex-col justify-between overflow-y-auto [scrollbar-gutter:stable]'>
        {items.map((item, index) => (
          <li key={item.label} className='flex items-center gap-2'>
            <span className='flex h-[43px] min-w-0 flex-1 items-center gap-3'>
              {/* The <ol> already announces the position. */}
              <span
                aria-hidden
                className='text-label-sm bg-chart-5 text-chart-2 flex size-8 shrink-0 items-center justify-center rounded-full tabular-nums'
              >
                {index + 1}
              </span>
              <span
                className='text-label-sm text-text-strong-950 truncate'
                title={item.label}
              >
                {item.label}
              </span>
            </span>
            <span className='text-label-sm text-text-sub-600 shrink-0 text-end tabular-nums'>
              {item.value.toLocaleString()}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
RankedList.displayName = 'RankedList';

export { RankedList as Root };
