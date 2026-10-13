'use client';

import * as React from 'react';
import { Sector } from 'recharts';

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
// A hovered segment takes this many more degrees of the arc from the rest.
const HOVER_ANGLE = 8;
// How long a segment takes to grow or give the angle back.
const HOVER_MS = 200;
// How long the arc takes to sweep open on first render.
const SWEEP_MS = 600;

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

// The arc animates in JavaScript, which the theme's reduced-motion CSS cannot
// reach.
function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

// Hover motion is for a mouse: a tap on a touch screen fires mouseenter too,
// and would leave the segment grown until the next tap elsewhere.
function canHover() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

// A CSS cubic-bezier as a function of progress, so the arc moves on the same
// curve as the segment bar's CSS transition.
function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const at = (a: number, b: number, t: number) =>
    3 * a * t * (1 - t) ** 2 + 3 * b * t ** 2 * (1 - t) + t ** 3;
  return (x: number) => {
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 20; i++) {
      const mid = (lo + hi) / 2;
      if (at(x1, x2, mid) < x) lo = mid;
      else hi = mid;
    }
    return at(y1, y2, (lo + hi) / 2);
  };
}

// A strong ease-out: quick to answer the pointer, slow to settle.
const HOVER_EASE = cubicBezier(0.23, 1, 0.32, 1);

// Eases each value toward its target, starting from wherever it is, so a
// segment let go mid-grow shrinks back from there. The arc is drawn from these
// numbers, so CSS cannot transition it.
function useEased(targets: number[], ms: number) {
  const [values, setValues] = React.useState(targets);
  const latest = React.useRef(values);
  const key = targets.join();
  React.useEffect(() => {
    const goal = key.split(',').map(Number);
    const from = latest.current;
    const show = (next: number[]) => {
      latest.current = next;
      setValues(next);
    };
    if (prefersReducedMotion()) {
      show(goal);
      return;
    }
    let start: number | undefined;
    let frame = requestAnimationFrame(function step(now) {
      start ??= now;
      const t = Math.min((now - start) / ms, 1);
      const k = HOVER_EASE(t);
      show(goal.map((g, i) => (from[i] ?? g) + (g - (from[i] ?? g)) * k));
      if (t < 1) frame = requestAnimationFrame(step);
    });
    return () => cancelAnimationFrame(frame);
  }, [key, ms]);
  return values;
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
  const [hovered, setHovered] = React.useState<string | null>(null);
  // How far each segment is into its hover growth, 0 to 1.
  const grown = useEased(
    items.map((item) => (item.label === hovered ? 1 : 0)),
    HOVER_MS
  );
  const positiveItems = items.filter((item) => item.value > 0);
  // How far the arc has swept open, 0 to 1. It opens once there is something
  // to draw, which can be after mount while the data loads.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const [swept] = useEased(
    [mounted && positiveItems.length > 0 ? 1 : 0],
    SWEEP_MS
  );
  const singleCategory = positiveItems.length === 1 ? positiveItems[0] : null;
  // The degrees the segments share once the gaps between them are taken out.
  const span = 180 - PADDING_ANGLE * Math.max(positiveItems.length - 1, 0);
  // The hovered segment's extra angle comes out of the others in proportion,
  // so the shared edge slides toward its neighbour and the arc keeps its span.
  const extra = HOVER_ANGLE / span;
  const spread = 1 + extra * grown.reduce((s, g) => s + g, 0);
  const shares = drawnShares(items).map(
    (share, i) => (share + extra * (grown[i] ?? 0)) / spread
  );
  // Laid out left to right as recharts' Pie would, with a gap only between
  // non-zero segments. The segments are drawn here rather than by Pie, which
  // reruns the whole chart for each frame of the hover growth and drops most
  // of them.
  const sweep = (angle: number) => 180 - (180 - angle) * swept;
  const arcs = items.reduce<
    { item: DonutChartItem; i: number; startAngle: number; endAngle: number }[]
  >((laid, item, i) => {
    if (!shares[i]) return laid;
    const previous = laid[laid.length - 1];
    const startAngle = previous ? previous.endAngle - PADDING_ANGLE : 180;
    return [
      ...laid,
      { item, i, startAngle, endAngle: startAngle - shares[i] * span },
    ];
  }, []);
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
      {/* The legend carries every label and value for a screen reader. */}
      <div aria-hidden className='relative h-[152px] w-full shrink-0'>
        {/* Centred on the arc's midpoint, with its baseline on the box's
            bottom edge. */}
        <svg
          className='absolute inset-0 size-full'
          viewBox={`${-OUTER_RADIUS} 0 ${OUTER_RADIUS * 2} ${OUTER_RADIUS}`}
        >
          {arcs.map(({ item, i, startAngle, endAngle }) => (
            <Sector
              key={item.label}
              cx={0}
              cy={OUTER_RADIUS}
              innerRadius={INNER_RADIUS}
              outerRadius={OUTER_RADIUS}
              startAngle={sweep(startAngle)}
              endAngle={sweep(endAngle)}
              cornerRadius={CORNER_RADIUS}
              fill={colorAt(item, i)}
              className={singleCategory ? undefined : 'cursor-pointer'}
              onMouseEnter={
                singleCategory
                  ? undefined
                  : () => canHover() && setHovered(item.label)
              }
              onMouseLeave={singleCategory ? undefined : () => setHovered(null)}
            />
          ))}
        </svg>
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
