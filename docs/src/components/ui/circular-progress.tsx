import * as React from 'react';
import { cn } from '@/lib/happly-ui-utils';

export interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size of the circular progress bar in pixels. The stroke width scales proportionally to the size. */
  size?: number;
  /** Fraction of the progress, from 0 to 1. */
  fraction: number;
  /** Whether to round the fraction to 0, 0.25, 0.5, 0.75, or 1. */
  approximateFraction?: boolean;
  /** Color variant of the progress bar. */
  variant?:
    | 'default'
    | 'green'
    | 'orange'
    | 'purple'
    | 'red'
    | 'blue'
    | 'yellow'
    | 'sky'
    | 'pink'
    | 'teal';
}

const variantStyles: Record<string, { track: string; fill: string }> = {
  default: { track: 'stroke-ds-neutral-200', fill: 'stroke-primaryColor' },
  green: { track: 'stroke-ds-green-200', fill: 'stroke-ds-green-500' },
  orange: { track: 'stroke-ds-orange-200', fill: 'stroke-ds-orange-500' },
  purple: { track: 'stroke-ds-purple-200', fill: 'stroke-ds-purple-500' },
  red: { track: 'stroke-ds-red-200', fill: 'stroke-ds-red-500' },
  blue: { track: 'stroke-ds-blue-200', fill: 'stroke-ds-blue-500' },
  yellow: { track: 'stroke-ds-yellow-200', fill: 'stroke-ds-yellow-500' },
  sky: { track: 'stroke-ds-sky-200', fill: 'stroke-ds-sky-500' },
  pink: { track: 'stroke-ds-pink-200', fill: 'stroke-ds-pink-500' },
  teal: { track: 'stroke-ds-teal-200', fill: 'stroke-ds-teal-500' },
};

function getApproximateFraction(fraction: number) {
  if (fraction === 0) return 0;
  if (fraction < 0.375) return 0.25;
  if (fraction < 0.625) return 0.5;
  if (fraction < 1) return 0.75;
  return 1;
}

export const CircularProgress = React.forwardRef<
  HTMLDivElement,
  CircularProgressProps
>(
  (
    {
      size = 20,
      fraction,
      approximateFraction = false,
      variant = 'default',
      className,
      ...props
    },
    ref
  ) => {
    // Ensure fraction is clamped between 0 and 1
    let safeFraction = Math.min(Math.max(fraction, 0), 1);

    // Apply approximate rounding if enabled
    if (approximateFraction) {
      safeFraction = getApproximateFraction(safeFraction);
    }

    // Calculate dimensions proportionally
    // 14% of the size is the stroke width, derived from the original 20px SVG with 2.8px stroke
    const strokeWidth = size * 0.14;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - safeFraction * circumference;

    const currentStyles = variantStyles[variant] || variantStyles.default;

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center',
          className
        )}
        style={{ width: size, height: size }}
        {...props}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='rotate-[-90deg]'
        >
          {/* Empty background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className={currentStyles.track}
          />
          {/* Filled progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
            className={cn(
              'transition-all duration-300 ease-out',
              currentStyles.fill
            )}
          />
        </svg>
      </div>
    );
  }
);

CircularProgress.displayName = 'CircularProgress';
