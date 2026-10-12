'use client';

import * as React from 'react';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';

import { cn } from '@/lib/happly-ui-utils';

export type DonutChartItem = {
  /** The full name. */
  label: string;
  /** Shown instead of `label` in the legend and the centre ("B2B"). */
  shortLabel?: string;
  value: number;
  /** Overrides the segment's colour from the series ramp. */
  color?: string;
};

type DonutChartProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Segments left to right along the arc. Keep labels short; the legend is one row. */
  items: DonutChartItem[];
  /**
   * `label` of the segment to feature: its value and label fill the centre and
   * its legend entry gets a pill. Omitted or null leaves the centre bare,
   * which is right when no single segment is an honest headline. With exactly
   * one positive-value category, that category always holds the centre.
   */
  highlighted?: string | null;
  /** A caption over a figure, above the arc. Pass it and it shows; omit it and it doesn't. */
  total?: {
    label: string;
    value: number;
  };
  /** What the values count, read out with each legend entry ("Items"). */
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
// Below about 13.4 degrees the two inner corners no longer fit and recharts
// draws the segment as a flat sliver, so a small one is drawn at this size.
const MIN_ANGLE = 16;

// What each segment is drawn at: its share of the arc, with every non-zero
// share raised to MIN_ANGLE and the larger ones scaled down to make room.
function drawnShares(items: DonutChartItem[]) {
  const sum = items.reduce((s, item) => s + item.value, 0);
  const gaps = Math.max(items.filter((item) => item.value > 0).length - 1, 0);
  const minShare = MIN_ANGLE / (180 - PADDING_ANGLE * gaps);
  const isSmall = (item: DonutChartItem) =>
    item.value > 0 && item.value / sum < minShare;
  const small = items.filter(isSmall);
  const restSum = sum - small.reduce((s, item) => s + item.value, 0);
  const restShare = 1 - small.length * minShare;
  return items.map((item) =>
    isSmall(item) ? minShare : (item.value / restSum) * restShare || 0
  );
}

// recharts animates in JavaScript, which the theme's reduced-motion CSS
// cannot reach.
function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
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
  const shares = drawnShares(items);
  const slices = items.map((item, i) => ({
    name: item.label,
    value: item.value,
    drawn: shares[i],
    fill: colorAt(item, i),
  }));
  const [hovered, setHovered] = React.useState<string | null>(null);
  const positiveItems = items.filter((item) => item.value > 0);
  const singleCategory = positiveItems.length === 1 ? positiveItems[0] : null;
  // Single-category mode removes hover handlers, so clear any earlier hover
  // before multiple categories return without a mouse-leave to reset it.
  React.useEffect(() => {
    if (singleCategory) setHovered(null);
  }, [singleCategory]);
  const isFeatured = (label: string) =>
    label === highlighted || label === hovered;
  // The centre holds one segment, so the hovered one takes it over.
  const leading =
    singleCategory ??
    items.find((item) => item.label === (hovered ?? highlighted));

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
          so mousedown is cancelled; hover is unaffected. */}
      <div
        aria-hidden
        className='relative h-[152px] w-full shrink-0'
        onMouseDown={(e) => e.preventDefault()}
      >
        <ResponsiveContainer width='100%' height='100%'>
          {/* No margin: recharts' default 5px would push the arc down and clip
              its base at the box's bottom edge. */}
          <PieChart
            accessibilityLayer={false}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <Pie
              data={slices}
              dataKey='drawn'
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
              onMouseEnter={
                singleCategory
                  ? undefined
                  : (_, index) => setHovered(items[index].label)
              }
              onMouseLeave={singleCategory ? undefined : () => setHovered(null)}
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
              {leading.shortLabel ?? leading.label}
            </span>
          </div>
        ) : null}
      </div>
      {/* A single positive category needs no visible legend, but every
          category (including zeros) remains available to screen readers. */}
      <ul
        className={
          singleCategory ? 'sr-only' : 'flex w-full shrink-0 items-center gap-3'
        }
      >
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
                isFeatured(item.label)
                  ? 'bg-chart-highlight-bg text-chart-highlight -mx-1.5 -my-1 rounded-lg px-1.5 py-1'
                  : 'text-text-sub-600 font-normal'
              }
              title={item.shortLabel ? item.label : undefined}
            >
              {item.shortLabel ?? item.label}
            </span>
            <span className='sr-only'>
              {item.shortLabel ? `, ${item.label}` : null}:{' '}
              {item.value.toLocaleString()}
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
