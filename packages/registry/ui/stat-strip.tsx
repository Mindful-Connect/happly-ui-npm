import * as React from 'react';

import { cn } from '@/lib/happly-ui-utils';

type Trend = 'up' | 'down' | 'flat';

const BADGE: Record<Trend, string> = {
  up: 'bg-success-light text-success-dark',
  down: 'bg-error-light text-error-dark',
  flat: 'bg-bg-weak-50 text-text-sub-600',
};

function formatDelta(roundedDelta: number) {
  return `${roundedDelta > 0 ? '+' : ''}${roundedDelta}%`;
}

type StatStripRootProps = React.HTMLAttributes<HTMLDivElement>;

/** A row of figures in equal sections, with a hairline above and below. */
function StatStripRoot({ className, ...rest }: StatStripRootProps) {
  return (
    <div
      className={cn(
        'border-stroke-soft-200 flex items-center border-y py-4',
        className
      )}
      {...rest}
    />
  );
}
StatStripRoot.displayName = 'StatStripRoot';

type StatStripItemProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Usually a KeyIcon. */
  icon: React.ReactNode;
  label: string;
  /** A number is formatted with toLocaleString; a string is shown as given. */
  value: number | string;
  /** Change against the previous period, in percent: 5 reads "+5%". Leave out, or pass null, for no pill. */
  delta?: number | null;
  /** Colours the pill. Follows the displayed delta by default; a displayed zero is always flat. */
  trend?: Trend;
};

/** One figure: its icon, its label, and the value with an optional change pill. */
function StatStripItem({
  icon,
  label,
  value,
  delta,
  trend,
  className,
  ...rest
}: StatStripItemProps) {
  const roundedDelta = delta == null ? null : Math.round(delta);
  const deltaTrend =
    roundedDelta == null || roundedDelta === 0
      ? 'flat'
      : roundedDelta > 0
        ? 'up'
        : 'down';
  const displayedTrend = roundedDelta === 0 ? 'flat' : (trend ?? deltaTrend);

  return (
    <div
      className={cn(
        'flex flex-1 items-center justify-center gap-2 px-6',
        // A divider before every section but the first, as tall as the figure.
        '[&:not(:first-child)]:border-stroke-soft-200 [&:not(:first-child)]:border-s',
        className
      )}
      {...rest}
    >
      {icon}
      <div className='flex flex-col gap-0.5 whitespace-nowrap'>
        <span className='text-paragraph-xs text-text-sub-600'>{label}</span>
        <div className='flex items-center gap-2'>
          <span className='text-label-md text-text-strong-950 font-bold tabular-nums'>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </span>
          {roundedDelta == null ? null : (
            <span
              className={cn(
                'text-subheading-2xs rounded-full px-2 py-1 tracking-[-0.11px] tabular-nums',
                BADGE[displayedTrend]
              )}
            >
              {formatDelta(roundedDelta)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
StatStripItem.displayName = 'StatStripItem';

export { StatStripRoot as Root, StatStripItem as Item };
