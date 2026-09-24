'use client';

import * as React from 'react';

import * as ChartTooltip from '@/components/ui/chart-tooltip';
import { cn } from '@/lib/happly-ui-utils';

export type BarChartItem = {
  label: string;
  value: number;
};

type BarChartProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Columns left to right, in the order given. The chart does not sort. */
  items: BarChartItem[];
  /**
   * Label of the column to feature. Omitted or null features none: the chart
   * never picks the tallest for you, because "nothing stands out" is a real
   * answer and a pill on the wrong bucket is worse than no pill.
   */
  highlighted?: string | null;
  /**
   * What the buckets are, after the bucket in the tooltip caption
   * ("10 - 19 Group"). Meant for ranges; leave it off where the bucket already
   * says what it is ("Category A", "$500K - $1M").
   */
  dimension?: string;
  /** What the value counts, beside it in the tooltip ("Items"). */
  unit?: string;
};

/**
 * Column chart for bucketed counts.
 *
 * Built from flex rather than a charting library: the design labels every
 * column, and chart axes drop ticks whenever labels would collide.
 */
function BarChart({
  items,
  highlighted,
  dimension,
  unit,
  className,
  ...rest
}: BarChartProps) {
  // Guarded so an all-zero breakdown cannot produce NaN heights.
  const max = items.reduce((m, item) => Math.max(m, item.value), 0) || 1;

  return (
    <div
      className={cn('flex h-full w-full flex-col gap-2', className)}
      {...rest}
    >
      {/* Bars and tooltips repeat what the label row below says to a screen
          reader, so only the label row is exposed. */}
      <div aria-hidden className='flex min-h-px flex-1 items-end gap-2'>
        {items.map((item) => (
          <div
            key={item.label}
            className='group flex h-full min-w-0 flex-1 flex-col items-center justify-end'
          >
            <div
              className={cn(
                'relative w-full rounded-xl',
                item.label === highlighted ? 'bg-chart-2' : 'bg-chart-muted'
              )}
              style={{ height: `${(item.value / max) * 100}%` }}
            >
              <ChartTooltip.Root
                caption={dimension ? `${item.label} ${dimension}` : item.label}
                className='absolute bottom-full left-1/2 z-20 -translate-x-1/2 opacity-0 transition-opacity duration-150 group-hover:opacity-100'
              >
                <ChartTooltip.Value>{item.value.toLocaleString()}</ChartTooltip.Value>
                {unit ? <ChartTooltip.Unit>{unit}</ChartTooltip.Unit> : null}
              </ChartTooltip.Root>
            </div>
          </div>
        ))}
      </div>
      <ul className='flex w-full items-center gap-1.5'>
        {items.map((item) => (
          <li
            key={item.label}
            className={cn(
              'text-paragraph-xs flex min-w-0 flex-1 items-center justify-center rounded py-0.5',
              item.label === highlighted
                ? 'bg-chart-highlight-bg text-chart-highlight font-medium'
                : 'text-text-soft-400'
            )}
          >
            <span className='truncate' title={item.label}>
              {item.label}
            </span>
            <span className='sr-only'>
              : {item.value.toLocaleString()}
              {unit ? ` ${unit}` : null}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
BarChart.displayName = 'BarChart';

export { BarChart as Root };
