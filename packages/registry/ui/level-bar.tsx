'use client';

import * as React from 'react';

import { cn } from '@/lib/happly-ui-utils';
import { tv } from '@/lib/tv';

const defaultLevelColors: Record<number, string> = {
  1: 'text-error-base',
  2: 'text-warning-base',
  3: 'text-success-base',
};

const levelBarVariants = tv({
  slots: {
    root: 'relative flex gap-2 overflow-hidden rounded-full',
    segment: 'h-1 w-full rounded-full bg-bg-soft-200',
    fill: 'absolute left-0 top-0 h-full w-0 rounded-full bg-current duration-500 ease-out',
  },
});

const { root, segment, fill } = levelBarVariants();

function LevelBar({
  levels = 3,
  level = 0,
  levelColors = defaultLevelColors,
  className,
  ...rest
}: {
  level: number;
  levels?: number;
  levelColors?: Record<number, string>;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        root(),
        levelColors[1],
        className,
        levelColors[level],
      )}
      {...rest}
    >
      {Array.from({ length: levels }, (_, i) => (
        <div
          key={i}
          className={segment()}
          style={{ clipPath: 'inset(0 round 99px)' }}
        >
          <div
            className={fill()}
            style={{
              transitionProperty: 'width',
              width: `calc((100% / ${levels}) * ${level})`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

export { LevelBar };
