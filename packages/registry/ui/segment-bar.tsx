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

// How many px a hovered block grows by.
const HOVER_GROW = 12;

// Which blocks flexbox holds at their minimum width with none open: a share
// that comes out under the minimum is held there, and the rest split what is
// left, which can push another under.
function heldAtMin(values: number[], space: number, min: number) {
  let held = values.map(() => false);
  for (;;) {
    const free = space - min * held.filter(Boolean).length;
    const sum = values.reduce((s, v, i) => (held[i] ? s : s + v), 0);
    const under = values.map((v, i) => !held[i] && !((v / sum) * free >= min));
    if (!under.includes(true)) return held;
    held = held.map((h, i) => h || under[i]);
  }
}

// Hover motion is for a mouse: a tap on a touch screen fires mouseenter too,
// and would leave the block open until the next tap elsewhere.
function canHover() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

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
  const [hovered, setHovered] = React.useState<string | null>(null);
  // The flex-basis that opens the hovered block to its target width.
  const [basis, setBasis] = React.useState(0);
  const isFeatured = (label: string) =>
    label === highlighted || label === hovered;
  const pill = (label: string) =>
    isFeatured(label)
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
              'flex min-w-2 basis-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl',
              'transition-[flex-basis] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none',
              SEGMENT_FILL[i % SEGMENT_FILL.length]
            )}
            style={{
              flexGrow: item.value,
              // A hovered block grows a little, and further if that is still
              // too narrow for its number. Basis rather than min-width, which
              // would animate up from 8px and only show once past the
              // block's own width.
              flexBasis:
                item.label === hovered && item.label !== highlighted
                  ? basis
                  : undefined,
            }}
            onMouseEnter={(e) => {
              if (!canHover()) return;
              const block = e.currentTarget;
              const row = block.parentElement as HTMLElement;
              // Worked out from the row rather than read off the block, which
              // is still mid-transition when the pointer moves straight over
              // from a neighbour.
              const gaps =
                (items.length - 1) *
                parseFloat(getComputedStyle(row).columnGap);
              const min = parseFloat(getComputedStyle(block).minWidth);
              const held = heldAtMin(
                items.map((it) => it.value),
                row.clientWidth - gaps,
                min
              );
              // Once open, this block is out of the held set; the rest that
              // are held keep their minimum out of the free width.
              const others = items.filter((_, j) => j !== i && held[j]);
              const free = row.clientWidth - gaps - others.length * min;
              const unheld = items.reduce(
                (s, it, j) => (j !== i && held[j] ? s : s + it.value),
                0
              );
              const share = item.value / unheld || 0;
              const natural = share * free;
              const target = Math.max(
                (held[i] ? min : natural) + HOVER_GROW,
                (block.firstChild as HTMLElement).offsetWidth
              );
              // A block of share s with basis b is b + s * (free width - b)
              // wide, so it reaches the target at
              // b = (target - s * free width) / (1 - s).
              // A block holding everything already fills the row.
              setBasis(share < 1 ? (target - natural) / (1 - share) : 0);
              setHovered(item.label);
            }}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Always rendered, so its width can be read before the block
                opens; the block clips it until then. */}
            <span
              className={cn(
                // Only the fade: it carries no movement, so it stays under
                // reduced motion. It waits for the block to open part way, so
                // the digits never show cut off at its edges, and leaves at
                // once on the way out.
                'text-label-sm tabular-nums transition-opacity ease-[ease]',
                item.label !== highlighted && 'px-1.5',
                isFeatured(item.label)
                  ? 'opacity-100 delay-50 duration-150'
                  : 'opacity-0 duration-100',
                SEGMENT_LABEL[i % SEGMENT_LABEL.length]
              )}
            >
              {item.value.toLocaleString()}
            </span>
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
                  isFeatured(item.label)
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
