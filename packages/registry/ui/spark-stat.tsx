'use client';

import * as React from 'react';
import { Line, LineChart, ResponsiveContainer } from 'recharts';

import * as WidgetCard from '@/components/ui/widget-card';
import { cn } from '@/lib/happly-ui-utils';

type Trend = 'up' | 'down' | 'flat';

const TONE: Record<Trend, { line: string; badge: string }> = {
  up: {
    line: 'var(--color-chart-trend-up)',
    badge: 'bg-success-light text-success-dark',
  },
  down: {
    line: 'var(--color-chart-trend-down)',
    badge: 'bg-error-light text-error-dark',
  },
  flat: {
    line: 'var(--color-chart-trend-flat)',
    badge: 'bg-bg-weak-50 text-text-sub-600',
  },
};

function formatDelta(delta: number) {
  return `${delta > 0 ? '+' : ''}${Math.round(delta)}%`;
}

type SparkStatProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & {
  title: string;
  value: number;
  /** Change against the previous period, in percent: 23 reads "+23%". Leave out, or pass null, for no pill. */
  delta?: number | null;
  /**
   * Colours the pill and the line. Follows the sign of `delta` by default;
   * pass the direction your data source reports when it has one.
   */
  trend?: Trend;
  /** The sparkline's values, oldest first. */
  points: number[];
};

/** A KPI card: the figure, its change as a pill, and a sparkline. */
function SparkStat({
  title,
  value,
  delta,
  trend = (delta ?? 0) > 0 ? 'up' : (delta ?? 0) < 0 ? 'down' : 'flat',
  points,
  className,
  ...rest
}: SparkStatProps) {
  const tone = TONE[trend];
  const data = points.map((v, i) => ({ i, v }));

  return (
    <WidgetCard.Root className={cn('h-24 gap-1', className)} {...rest}>
      <WidgetCard.Header>
        <WidgetCard.Title className='text-paragraph-sm text-text-sub-600'>
          {title}
        </WidgetCard.Title>
      </WidgetCard.Header>
      <WidgetCard.Content className='flex items-center justify-between gap-4'>
        <div className='flex items-center gap-2'>
          <span className='text-title-h5 text-text-strong-950 tabular-nums'>
            {value.toLocaleString()}
          </span>
          {delta == null ? null : (
            <span
              className={cn(
                'text-subheading-2xs rounded-full px-2 py-1 tracking-[-0.11px] tabular-nums',
                tone.badge
              )}
            >
              {formatDelta(delta)}
            </span>
          )}
        </div>
        {/* The pill states the change; the line only shows its shape. */}
        <div aria-hidden className='h-10 w-[140px] shrink-0'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={data}>
              <Line
                type='monotone'
                dataKey='v'
                stroke={tone.line}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </WidgetCard.Content>
    </WidgetCard.Root>
  );
}
SparkStat.displayName = 'SparkStat';

export { SparkStat as Root };
