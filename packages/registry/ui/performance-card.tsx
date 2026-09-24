import * as React from 'react';
import { RiArrowDownLine, RiArrowUpLine } from '@remixicon/react';

import { cn } from '@/lib/happly-ui-utils';

type PerformanceCardRootProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * The card's single border. It has no padding of its own, so each part sets its
 * own: content below the header carries the header's inset, not the border.
 */
function PerformanceCardRoot({ className, ...rest }: PerformanceCardRootProps) {
  return (
    <div
      className={cn(
        'bg-bg-white-0 ring-stroke-soft-200 shadow-regular-xs overflow-hidden rounded-[20px] ring-1',
        className
      )}
      {...rest}
    />
  );
}
PerformanceCardRoot.displayName = 'PerformanceCardRoot';

type PerformanceCardHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  /** A Media, to the left of the children. */
  media?: React.ReactNode;
  /** Sits top right, level with the title. Usually a Button. */
  action?: React.ReactNode;
};

/** The padded top of the card: the media, then the title, meta and stats. */
function PerformanceCardHeader({
  media,
  action,
  children,
  className,
  ...rest
}: PerformanceCardHeaderProps) {
  return (
    <div className={cn('flex gap-4 p-6', className)} {...rest}>
      {media}
      {/* The action sits over the title's line, so the tiles below it keep the
          full width of the column. */}
      <div
        className={cn(
          'relative min-w-0 flex-1',
          action && '[&>*:first-child]:pe-24'
        )}
      >
        {children}
        {action ? <div className='absolute end-0 top-0'>{action}</div> : null}
      </div>
    </div>
  );
}
PerformanceCardHeader.displayName = 'PerformanceCardHeader';

type PerformanceCardMediaProps = React.HTMLAttributes<HTMLDivElement> & {
  src?: string;
  alt?: string;
  /** Shown instead of the image when there is no src. */
  placeholder?: React.ReactNode;
};

/** The thumbnail or avatar. Give it a width; it fills the header's height. */
function PerformanceCardMedia({
  src,
  alt = '',
  placeholder,
  className,
  ...rest
}: PerformanceCardMediaProps) {
  return (
    <div
      className={cn(
        'bg-bg-weak-50 ring-stroke-soft-200 flex shrink-0 items-center justify-center overflow-hidden rounded-xl ring-1',
        className
      )}
      {...rest}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className='outline-image-outline size-full object-cover outline-1 -outline-offset-1'
        />
      ) : (
        placeholder
      )}
    </div>
  );
}
PerformanceCardMedia.displayName = 'PerformanceCardMedia';

/** The 1px rule between a title's sub-labels, or between groups in the meta row. */
function PerformanceCardRule({
  className,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      aria-hidden
      // A flex box, so the rule keeps its width and height on a baseline row.
      className={cn('bg-stroke-soft-200 flex h-3 w-px self-center', className)}
      {...rest}
    />
  );
}
PerformanceCardRule.displayName = 'PerformanceCardRule';

type PerformanceCardTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  /** Sit on the title's baseline, each behind a rule. */
  sublabels?: React.ReactNode[];
};

/** The card's name, with optional sub-labels beside it. Size it with className. */
function PerformanceCardTitle({
  sublabels = [],
  children,
  className,
  ...rest
}: PerformanceCardTitleProps) {
  return (
    <div className='flex items-baseline gap-2'>
      <h3
        className={cn(
          'text-label-lg text-text-strong-950 font-medium text-balance',
          className
        )}
        {...rest}
      >
        {children}
      </h3>
      {sublabels.map((sublabel, index) => (
        <React.Fragment key={index}>
          <PerformanceCardRule />
          <span className='text-paragraph-sm text-text-sub-600'>
            {sublabel}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}
PerformanceCardTitle.displayName = 'PerformanceCardTitle';

/** The wrapping row of icons, text and badges under the title. */
function PerformanceCardMeta({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'text-label-xs text-text-sub-600 mt-2 flex flex-wrap items-center gap-2',
        // An icon belongs to the text after it, so it sits closer to it.
        '[&>svg]:-me-1',
        className
      )}
      {...rest}
    />
  );
}
PerformanceCardMeta.displayName = 'PerformanceCardMeta';

/** The row of stat tiles, which share the width equally. */
function PerformanceCardStats({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-3 flex gap-2', className)} {...rest} />;
}
PerformanceCardStats.displayName = 'PerformanceCardStats';

type PerformanceCardStatProps = React.HTMLAttributes<HTMLDivElement> & {
  value: number | string;
  label: string;
};

/** One tile: the figure and its label. */
function PerformanceCardStat({
  value,
  label,
  children,
  className,
  ...rest
}: PerformanceCardStatProps) {
  return (
    <div
      className={cn(
        'ring-stroke-soft-200 flex min-w-0 flex-1 flex-col gap-2 rounded-xl p-4 ring-1',
        className
      )}
      {...rest}
    >
      <span className='text-label-md text-text-strong-950 font-bold tabular-nums'>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </span>
      <div className='flex flex-col gap-0.5'>
        <span className='text-paragraph-xs text-text-sub-600'>{label}</span>
        {children}
      </div>
    </div>
  );
}
PerformanceCardStat.displayName = 'PerformanceCardStat';

type PerformanceCardMetricProps = PerformanceCardStatProps & {
  /** Change against the comparison period, in percent. The arrow carries the direction. */
  delta: number;
  /** What the delta compares against, such as "vs last week". */
  comparison?: string;
};

/** A tile that also carries its change against another period. */
function PerformanceCardMetric({
  delta,
  comparison,
  ...rest
}: PerformanceCardMetricProps) {
  const up = delta >= 0;
  const Arrow = up ? RiArrowUpLine : RiArrowDownLine;

  return (
    <PerformanceCardStat {...rest}>
      <div className='text-paragraph-xs flex flex-wrap items-center gap-x-1'>
        <Arrow
          aria-hidden
          className={cn(
            'size-4 shrink-0',
            up ? 'text-success-base' : 'text-error-base'
          )}
        />
        <span
          className={cn(
            'whitespace-nowrap tabular-nums',
            up ? 'text-success-base' : 'text-error-base'
          )}
        >
          <span className='sr-only'>{up ? '+' : '−'}</span>
          {Math.abs(delta).toFixed(1)}%
        </span>
        {comparison ? (
          <span className='text-text-soft-400'>{comparison}</span>
        ) : null}
      </div>
    </PerformanceCardStat>
  );
}
PerformanceCardMetric.displayName = 'PerformanceCardMetric';

export {
  PerformanceCardRoot as Root,
  PerformanceCardHeader as Header,
  PerformanceCardMedia as Media,
  PerformanceCardTitle as Title,
  PerformanceCardRule as Rule,
  PerformanceCardMeta as Meta,
  PerformanceCardStats as Stats,
  PerformanceCardStat as Stat,
  PerformanceCardMetric as Metric,
};
