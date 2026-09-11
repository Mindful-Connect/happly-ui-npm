'use client';

import * as React from 'react';

import { cn } from '@/lib/happly-ui-utils';

type ChartTooltipProps = React.HTMLAttributes<HTMLDivElement> & {
  /** The muted line above the value, e.g. the bucket or the date. */
  caption: React.ReactNode;
  /** Px to slide the tail off-centre, when the box is shifted off its anchor. */
  tailOffset?: number;
};

/**
 * A caption over a value row, with a tail pointing down at the thing it
 * describes. Place it above the anchor; the tail sits centred under the box.
 */
function ChartTooltip({
  caption,
  tailOffset,
  children,
  className,
  ...rest
}: ChartTooltipProps) {
  return (
    <div
      className={cn('pointer-events-none flex flex-col items-center', className)}
      {...rest}
    >
      <div className='bg-bg-white-0 border-stroke-soft-200 shadow-tooltip flex flex-col items-start gap-1 rounded-[10px] border px-3 py-2.5 whitespace-nowrap'>
        <p className='text-paragraph-xs text-text-soft-400 font-medium'>
          {caption}
        </p>
        <div className='flex items-center gap-1.5'>{children}</div>
      </div>
      {/* The tail's top 2px is an opaque strip that hides the box's bottom
          border where the two meet, so it overlaps the box instead of
          sitting flush under it. */}
      <span
        className='relative block h-1.5 w-3'
        style={tailOffset ? { transform: `translateX(${tailOffset}px)` } : undefined}
      >
        <svg
          aria-hidden
          width='18'
          height='8.37868'
          viewBox='0 0 18 8.37868'
          fill='none'
          className='absolute -top-0.5 -start-[3px] overflow-visible'
        >
          <path
            d='M10.4141 7.29297C9.63304 8.07387 8.36696 8.07387 7.58594 7.29297L1.79297 1.5L16.207 1.5L10.4141 7.29297Z'
            className='fill-bg-white-0 stroke-stroke-soft-200'
          />
          <rect width='18' height='2' rx='1' className='fill-bg-white-0' />
        </svg>
      </span>
    </div>
  );
}
ChartTooltip.displayName = 'ChartTooltip';

/** The figure in a tooltip's value row. */
function ChartTooltipValue({
  className,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'text-label-lg text-text-strong-950 tabular-nums',
        className
      )}
      {...rest}
    />
  );
}
ChartTooltipValue.displayName = 'ChartTooltipValue';

/** What the figure counts, beside it: "Items". */
function ChartTooltipUnit({
  className,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn('text-paragraph-xs text-text-sub-600 font-medium', className)}
      {...rest}
    />
  );
}
ChartTooltipUnit.displayName = 'ChartTooltipUnit';

type ChartTooltipDeltaProps = React.HTMLAttributes<HTMLSpanElement> & {
  /** The change in percent: 100 reads "+100.0%". */
  value: number;
};

/** A change beside the figure, then what it is measured against: "vs prev.". */
function ChartTooltipDelta({
  value,
  children,
  className,
  ...rest
}: ChartTooltipDeltaProps) {
  return (
    <span
      className={cn('text-paragraph-xs flex items-center gap-1 font-medium', className)}
      {...rest}
    >
      <span
        className={cn(
          'tabular-nums',
          value >= 0 ? 'text-success-base' : 'text-error-base'
        )}
      >
        {value >= 0 ? '+' : '−'}
        {Math.abs(value).toFixed(1)}%
      </span>
      {children ? <span className='text-text-sub-600'>{children}</span> : null}
    </span>
  );
}
ChartTooltipDelta.displayName = 'ChartTooltipDelta';

export {
  ChartTooltip as Root,
  ChartTooltipValue as Value,
  ChartTooltipUnit as Unit,
  ChartTooltipDelta as Delta,
};
