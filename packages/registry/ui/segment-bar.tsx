'use client';

import * as React from 'react';

import { cn } from '@/lib/happly-ui-utils';

export type SegmentBarItem = {
  label: string;
  value: number;
};

type SegmentBarProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Segments left to right, in the order given. Colours follow that order. */
  items: SegmentBarItem[];
  /**
   * Label of the segment to feature: its value prints inside its block and its
   * legend entry gets a pill. Omitted or null features none.
   */
  highlighted?: string | null;
  /**
   * `columns` is a label-only legend split into two columns; `rows` is a
   * full-width list with each count on the right.
   */
  legend?: 'columns' | 'rows';
};

const SEGMENT_FILL = [
  'bg-chart-1',
  'bg-chart-2',
  'bg-chart-3',
  'bg-chart-4',
  'bg-chart-5',
];

// White clears 3:1 on the first three steps only (2.13:1 on step 4, 1.49:1 on
// step 5), so a featured value on the two palest blocks takes chart-1 instead.
const SEGMENT_LABEL = [
  'text-static-white',
  'text-static-white',
  'text-static-white',
  'text-chart-1',
  'text-chart-1',
];

function Dot({ index }: { index: number }) {
  // A 13.333px dot centred in a 20px box, the design system's Color Dots.
  return (
    <span className='flex size-5 shrink-0 items-center justify-center'>
      <span
        className={cn(
          'size-[13.333px] rounded-full',
          SEGMENT_FILL[index % SEGMENT_FILL.length]
        )}
      />
    </span>
  );
}

/**
 * One rounded block per segment, sized by share, over a colour-keyed legend.
 */
function SegmentBar({
  items,
  highlighted,
  legend = 'columns',
  className,
  ...rest
}: SegmentBarProps) {
  // The featured label bleeds its pill outward instead of pushing the text
  // along: the padding is cancelled by an equal negative margin, so it stays
  // in line with the rows above and below.
  const pill = (label: string) =>
    label === highlighted
      ? '-mx-1.5 -my-1 rounded-lg px-1.5 py-1 bg-chart-highlight-bg text-chart-highlight font-medium'
      : 'text-text-sub-600';
  const half = Math.ceil(items.length / 2);

  return (
    <div
      className={cn(
        'flex h-full flex-col',
        legend === 'rows' ? 'gap-5' : 'gap-6',
        className
      )}
      {...rest}
    >
      {/* The legend carries every label and value for a screen reader. */}
      <div aria-hidden className='flex h-16 shrink-0 gap-2'>
        {items.map((item, i) => (
          // Width comes from flex-grow, so the blocks stay proportional at any
          // width; a zero segment keeps a sliver rather than vanishing.
          <div
            key={item.label}
            className={cn(
              'flex min-w-2 items-center justify-center rounded-xl',
              SEGMENT_FILL[i % SEGMENT_FILL.length]
            )}
            style={{ flexGrow: item.value }}
          >
            {item.label === highlighted ? (
              <span
                className={cn(
                  'text-label-sm tabular-nums',
                  SEGMENT_LABEL[i % SEGMENT_LABEL.length]
                )}
              >
                {item.value.toLocaleString()}
              </span>
            ) : null}
          </div>
        ))}
      </div>
      {legend === 'rows' ? (
        <ul className='flex flex-col gap-3'>
          {items.map((item, i) => (
            <li
              key={item.label}
              className='text-paragraph-xs flex items-center justify-between gap-2'
            >
              <span className='flex min-w-0 items-center gap-2'>
                <Dot index={i} />
                <span className={cn('truncate', pill(item.label))} title={item.label}>
                  {item.label}
                </span>
              </span>
              <span
                className={cn(
                  'shrink-0 tabular-nums',
                  item.label === highlighted
                    ? 'text-text-strong-950'
                    : 'text-text-soft-400'
                )}
              >
                {item.value.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className='flex gap-8'>
          {[items.slice(0, half), items.slice(half)].map((column, c) => (
            <ul key={c} className='flex flex-col gap-5'>
              {column.map((item, r) => (
                <li
                  key={item.label}
                  className='text-paragraph-xs flex items-center gap-2'
                >
                  <Dot index={c * half + r} />
                  <span className={pill(item.label)}>{item.label}</span>
                  <span className='sr-only'>: {item.value.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      )}
    </div>
  );
}
SegmentBar.displayName = 'SegmentBar';

export { SegmentBar as Root };
