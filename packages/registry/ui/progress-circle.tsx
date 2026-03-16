'use client';

import * as React from 'react';

import { cn } from '@/lib/happly-ui-utils';

type ProgressCircleRootProps = Omit<React.SVGProps<SVGSVGElement>, 'value'> & {
  /** Size in pixels. Defaults to 80. */
  size?: number;
  value?: number;
  max?: number;
  children?: React.ReactNode;
  color?: string;
};

const ProgressCircleRoot = React.forwardRef<
  SVGSVGElement,
  ProgressCircleRootProps
>(
  (
    {
      value = 0,
      max = 100,
      size = 80,
      className,
      children,
      color = 'stroke-primary-base',
      ...rest
    }: ProgressCircleRootProps,
    forwardedRef,
  ) => {
    const radius = size / 2;
    const strokeWidth = Math.max(size * 0.08, 3);
    const normalizedRadius = radius - strokeWidth / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const safeValue = Math.min(max, Math.max(value, 0));
    const offset = circumference - (safeValue / max) * circumference;

    // Pick text size based on diameter
    const textClass = size >= 56 ? 'text-label-sm' : 'text-label-xs';

    return (
      <div className={cn('relative', className)} style={{ width: size, height: size }}>
        <svg
          ref={forwardedRef}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className='-rotate-90'
          role='progressbar'
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          {...rest}
        >
          <circle
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeWidth={strokeWidth}
            fill='none'
            className='stroke-bg-soft-200'
          />
          {safeValue >= 0 && (
            <circle
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={offset}
              fill='none'
              className={`${color} transition-all duration-300 ease-out`}
            />
          )}
        </svg>
        {children && (
          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center text-center',
              textClass,
            )}
          >
            {children}
          </div>
        )}
      </div>
    );
  },
);
ProgressCircleRoot.displayName = 'ProgressCircleRoot';

export { ProgressCircleRoot as Root };
