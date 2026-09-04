'use client';

import * as React from 'react';

import { cn } from '../lib/happly-ui-utils';

type ProgressCircleRootProps = Omit<React.SVGProps<SVGSVGElement>, 'value'> & {
  value?: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
  color?: string;
  baseColor?: string;
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
      strokeWidth: strokeWidthProp,
      className,
      children,
      color = 'stroke-primary-base',
      baseColor = 'stroke-bg-soft-200',
      ...rest
    }: ProgressCircleRootProps,
    forwardedRef
  ) => {
    const strokeWidth = strokeWidthProp ?? Math.max(2, size * 0.08);
    const radius = size / 2;
    const safeValue = Math.min(max, Math.max(value, 0));
    const normalizedRadius = radius - strokeWidth / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const offset = circumference - (safeValue / max) * circumference;

    return (
      <div
        className={cn('relative inline-flex', className)}
        style={{ width: size, height: size }}
      >
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
            className={baseColor}
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
          <div className='absolute inset-0 flex items-center justify-center text-center'>
            {children}
          </div>
        )}
      </div>
    );
  }
);
ProgressCircleRoot.displayName = 'ProgressCircleRoot';

export { ProgressCircleRoot as Root };
