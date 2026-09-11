'use client';

import * as React from 'react';
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  useChartWidth,
} from 'recharts';

import * as ChartTooltip from '@/components/ui/chart-tooltip';
import { cn } from '@/lib/happly-ui-utils';

export type DonutChartItem = {
  label: string;
  value: number;
  /** Overrides the segment's colour from the series ramp. */
  color?: string;
};

type DonutChartProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Segments left to right along the arc. Keep labels short; the legend is one row. */
  items: DonutChartItem[];
  /**
   * Label of the segment to feature: its value and label fill the centre and
   * its legend entry gets a pill. Omitted or null leaves the centre bare,
   * which is right when no single segment is an honest headline.
   */
  highlighted?: string | null;
  /** A caption over a figure, above the arc. Pass it and it shows; omit it and it doesn't. */
  total?: {
    label: string;
    value: number;
  };
  /** What the values count, beside the value in the tooltip ("Items"). */
  unit?: string;
};

// A two-segment gauge pairs chart-2 with chart-5, not the first two steps of
// one ramp; 6-8 continue it past two segments.
const SERIES = [
  'var(--color-chart-2)',
  'var(--color-chart-5)',
  'var(--color-chart-6)',
  'var(--color-chart-7)',
  'var(--color-chart-8)',
];

const colorAt = (item: DonutChartItem, index: number) =>
  item.color ?? SERIES[index % SERIES.length];

// A 304x152 half-donut: outer radius 152 with a 60.8 band. The radii are
// absolute because recharts resolves percentage radii against
// min(width, height) / 2, which on a 304x152 box collapses the gauge to a
// quarter of its size.
const OUTER_RADIUS = 152;
const INNER_RADIUS = OUTER_RADIUS - 60.8;
const CORNER_RADIUS = 12;
// The design separates segments by a fixed 6px; recharts only offers a
// constant angle, so this matches 6px at the middle of the band.
const PADDING_ANGLE = 2.8;

// recharts animates in JavaScript, which the theme's reduced-motion CSS
// cannot reach.
function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

type DonutTooltipProps = {
  unit?: string;
  // Filled in by recharts when it renders the tooltip.
  active?: boolean;
  payload?: { name?: string; value?: number }[];
  coordinate?: { x: number; y: number };
};

/**
 * The hovered segment's readout, its tail on recharts' `coordinate` for a pie:
 * the segment's angular midpoint, halfway across the band. The box is clamped
 * to the chart's width and only the tail stays on the segment, so a long
 * label over an end segment cannot overhang the card.
 */
function DonutTooltip({ unit, active, payload, coordinate }: DonutTooltipProps) {
  const chartWidth = useChartWidth() ?? 0;
  const ref = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(0);
  // No deps: re-measured after every render, before paint. React skips the
  // update when the width hasn't changed, so it doesn't loop.
  React.useLayoutEffect(() => setWidth(ref.current?.offsetWidth ?? 0));

  const slice = payload?.[0];
  if (!active || !slice || !coordinate) return null;
  const left = Math.min(
    Math.max(coordinate.x - width / 2, 0),
    chartWidth - width
  );
  return (
    // Only lifted by its own height: the horizontal centring is the clamp
    // above, which a -50% translate would undo.
    <div
      ref={ref}
      className='absolute w-max -translate-y-full'
      style={{ left, top: coordinate.y }}
    >
      <ChartTooltip.Root
        caption={slice.name}
        tailOffset={coordinate.x - left - width / 2}
      >
        <ChartTooltip.Value>
          {Number(slice.value).toLocaleString()}
        </ChartTooltip.Value>
        {unit ? <ChartTooltip.Unit>{unit}</ChartTooltip.Unit> : null}
      </ChartTooltip.Root>
    </div>
  );
}

/** A half-donut gauge with a colour-keyed legend, sized for a 352px card. */
function DonutChart({
  items,
  highlighted,
  total,
  unit,
  className,
  ...rest
}: DonutChartProps) {
  const slices = items.map((item, i) => ({
    name: item.label,
    value: item.value,
    fill: colorAt(item, i),
  }));
  const leading = items.find((item) => item.label === highlighted);

  return (
    <div className={cn('flex h-full flex-col gap-6', className)} {...rest}>
      {total ? (
        <div className='flex flex-col gap-1'>
          <p className='text-paragraph-sm text-text-sub-600'>{total.label}</p>
          <span className='text-title-h5 text-text-strong-950 font-bold tabular-nums'>
            {total.value.toLocaleString()}
          </span>
        </div>
      ) : null}
      {/* The legend carries every label and value for a screen reader.
          recharts makes the segments focusable and a click would ring one,
          so mousedown is cancelled; hover and the tooltip are unaffected. */}
      <div
        aria-hidden
        className='relative h-[152px] w-full shrink-0'
        onMouseDown={(e) => e.preventDefault()}
      >
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart accessibilityLayer={false}>
            <Pie
              data={slices}
              dataKey='value'
              cx='50%'
              // Bottom-anchored: the arc's baseline is the box's bottom edge.
              cy={OUTER_RADIUS}
              innerRadius={INNER_RADIUS}
              outerRadius={OUTER_RADIUS}
              startAngle={180}
              endAngle={0}
              cornerRadius={CORNER_RADIUS}
              paddingAngle={PADDING_ANGLE}
              stroke='none'
              isAnimationActive={!prefersReducedMotion()}
            />
            {/* Pinned at the chart's origin, so recharts never offsets or
                flips it: DonutTooltip places itself on the hovered segment. */}
            <Tooltip
              position={{ x: 0, y: 0 }}
              content={<DonutTooltip unit={unit} />}
            />
          </PieChart>
        </ResponsiveContainer>
        {leading ? (
          // Full-width over the arc, so it must not swallow the segments' hover.
          <div className='pointer-events-none absolute inset-x-0 bottom-[5px] flex flex-col items-center gap-[7px] text-center'>
            <span className='text-title-h6 text-text-strong-950 tabular-nums'>
              {leading.value.toLocaleString()}
            </span>
            <span className='text-label-xs text-text-soft-400 tracking-[0.48px]'>
              {leading.label}
            </span>
          </div>
        ) : null}
      </div>
      <ul className='flex w-full shrink-0 items-center gap-3'>
        {items.map((item, i) => (
          <li
            key={item.label}
            className='text-label-xs flex min-w-0 flex-1 items-center justify-center gap-2'
          >
            {/* A 13.333px dot centred in a 20px box, the design system's Color Dots. */}
            <span className='flex size-5 shrink-0 items-center justify-center'>
              <span
                className='size-[13.333px] rounded-full'
                style={{ background: colorAt(item, i) }}
              />
            </span>
            {/* The featured pill bleeds outward instead of pushing its label
                along: its padding is cancelled by an equal negative margin. */}
            <span
              className={
                item.label === highlighted
                  ? 'bg-chart-highlight-bg text-chart-highlight -mx-1.5 -my-1 rounded-lg px-1.5 py-1'
                  : 'text-text-sub-600 font-normal'
              }
            >
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
DonutChart.displayName = 'DonutChart';

export { DonutChart as Root };
