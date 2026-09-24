'use client';

import * as React from 'react';
import { RiArrowDownLine, RiArrowUpLine } from '@remixicon/react';
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import * as ChartTooltip from '@/components/ui/chart-tooltip';
import { cn } from '@/lib/happly-ui-utils';

export type LineChartPoint = {
  /** The tooltip caption for this point. Format dates before passing them. */
  label: string;
  value: number;
};

type LineChartProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Points oldest first. */
  points: LineChartPoint[];
  /**
   * A caption over a figure, above the chart. Omit it and the chart takes the
   * whole height.
   */
  total?: {
    label: string;
    value: number;
    /** Change against the previous period, in percent. */
    delta?: number | null;
    /** What `delta` is measured against: "vs previous period". */
    comparison?: string;
  };
  /**
   * When set, the tooltip also shows each point's change from the point
   * before it, followed by this text ("vs prev.").
   */
  pointComparison?: string;
};

// Solid horizontals, dashed verticals inset from the edges: the design's two
// axes are drawn differently, so they are two grids.
const GRID_HORIZONTAL_LINES = 6;
const GRID_VERTICAL_LINES = 4;
const GRID_VERTICAL_INSET = 32;

// recharts animates in JavaScript, which the theme's reduced-motion CSS
// cannot reach.
function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function Delta({ value, className }: { value: number; className?: string }) {
  const up = value >= 0;
  return (
    <span
      className={cn(
        'flex items-center tabular-nums',
        up ? 'text-success-base' : 'text-error-base',
        className
      )}
    >
      {/* The design draws the 24-grid glyph at 18px inset in a 20px frame; a
          bare size-5 renders it larger and lower. */}
      {up ? (
        <RiArrowUpLine aria-hidden className='m-px size-[18px]' />
      ) : (
        <RiArrowDownLine aria-hidden className='m-px size-[18px]' />
      )}
      {/* The arrow carries the direction; give it to a screen reader too. */}
      <span className='sr-only'>{up ? '+' : '−'}</span>
      {Math.abs(value).toFixed(1)}%
    </span>
  );
}

function LineChart({
  points,
  total,
  pointComparison,
  className,
  ...rest
}: LineChartProps) {
  const data = points.map((point, index) => ({ ...point, index }));

  return (
    <div className={cn('flex h-full flex-col gap-6', className)} {...rest}>
      {total ? (
        <div className='flex flex-col gap-1'>
          <p className='text-paragraph-sm text-text-sub-600'>{total.label}</p>
          <div className='flex items-end gap-1'>
            <span className='text-title-h5 text-text-strong-950 font-bold tabular-nums'>
              {total.value.toLocaleString()}
            </span>
            {total.delta != null ? (
              <span className='flex items-center gap-1'>
                <Delta value={total.delta} className='text-label-sm' />
                {total.comparison ? (
                  <span className='text-paragraph-sm text-text-soft-400'>
                    {total.comparison}
                  </span>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      ) : null}
      <div className='min-h-0 flex-1'>
        <ResponsiveContainer width='100%' height='100%'>
          <RechartsLineChart data={data}>
            <CartesianGrid
              vertical={false}
              stroke='var(--color-stroke-soft-200)'
              strokeOpacity={0.64}
              horizontalCoordinatesGenerator={({ offset }) => {
                const top = offset.top ?? 0;
                const step = (offset.height ?? 0) / (GRID_HORIZONTAL_LINES - 1);
                return Array.from(
                  { length: GRID_HORIZONTAL_LINES },
                  (_, i) => top + i * step
                );
              }}
            />
            <CartesianGrid
              horizontal={false}
              stroke='var(--color-stroke-soft-200)'
              strokeDasharray='4 4'
              verticalCoordinatesGenerator={({ offset }) => {
                const left = (offset.left ?? 0) + GRID_VERTICAL_INSET;
                const span = (offset.width ?? 0) - GRID_VERTICAL_INSET * 2;
                const step = span / (GRID_VERTICAL_LINES - 1);
                return Array.from(
                  { length: GRID_VERTICAL_LINES },
                  (_, i) => left + i * step
                );
              }}
            />
            <XAxis dataKey='label' hide />
            <YAxis hide />
            <Tooltip
              // The design draws no crosshair: the tooltip and the active dot
              // are the only hover marks.
              cursor={false}
              content={({ active, payload }) => {
                const point = payload?.[0]?.payload as
                  | (typeof data)[number]
                  | undefined;
                if (!active || !point) return null;
                const previous =
                  point.index > 0 ? points[point.index - 1].value : null;
                // A zero previous value has no meaningful percentage change.
                const change =
                  pointComparison && previous
                    ? ((point.value - previous) / previous) * 100
                    : null;
                return (
                  <ChartTooltip.Root caption={point.label}>
                    <ChartTooltip.Value>
                      {point.value.toLocaleString()}
                    </ChartTooltip.Value>
                    {change !== null ? (
                      <ChartTooltip.Delta value={change}>
                        {pointComparison}
                      </ChartTooltip.Delta>
                    ) : null}
                  </ChartTooltip.Root>
                );
              }}
            />
            <Line
              type='monotone'
              dataKey='value'
              stroke='var(--color-chart-line)'
              strokeWidth={1.4}
              dot={false}
              activeDot={{ r: 3, fill: 'var(--color-chart-line)', strokeWidth: 0 }}
              isAnimationActive={!prefersReducedMotion()}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
LineChart.displayName = 'LineChart';

export { LineChart as Root };
