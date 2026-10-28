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
          separates them with spacing alone. Neither reserves a scrollbar
          gutter, so the value column ends at the card's edge, in line with
          the header's action. Where scrollbars always show, a scrolling
          list's values sit about 15px left of the header column. */}
      <div className='text-label-xs text-text-soft-400 flex shrink-0 items-start gap-2'>
        <span className='min-w-0 flex-1'>{columnLabels[0]}</span>
        <span className='shrink-0 text-end'>{columnLabels[1]}</span>
      </div>
      {/* Rows share the card's spare height, each growing from 43px up to
          55px, the old 12px spacing. A short list stacks from the top instead
          of spreading, and the list scrolls only once the rows no longer fit
          at 43px. */}
      <ol className='flex min-h-0 flex-1 flex-col overflow-y-auto'>
        {items.map((item, index) => (
          <li
            key={item.label}
            className='flex max-h-[55px] min-h-[43px] flex-1 items-center gap-2'
          >
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
