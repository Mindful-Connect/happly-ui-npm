'use client';

import * as React from 'react';

import { tv, type VariantProps } from '@/lib/tv';

const LOADER_ROOT_NAME = 'LoaderRoot';

export const loaderVariants = tv({
  base: 'inline-flex shrink-0 items-center justify-center',
  variants: {
    color: {
      primary: 'text-primary-base',
      neutral: 'text-text-sub-600',
      white: 'text-static-white',
      error: 'text-error-base',
      success: 'text-success-base',
      warning: 'text-warning-base',
      current: 'text-current',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

type LoaderRootProps = VariantProps<typeof loaderVariants> &
  React.HTMLAttributes<HTMLDivElement> & {
    size?: number;
    strokeWidth?: number;
    label?: string;
  };

const LoaderRoot = React.forwardRef<HTMLDivElement, LoaderRootProps>(
  ({ size = 24, strokeWidth, color, label, className, ...rest }, ref) => {
    const sw = strokeWidth ?? Math.max(2, size / 8);
    const r = (size - sw) / 2;
    const half = size / 2;

    return (
      <div
        ref={ref}
        role='status'
        aria-label={label || 'Loading'}
        className={loaderVariants({ color, class: className })}
        {...rest}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          fill='none'
          style={{ animation: 'spin 0.8s linear infinite' }}
        >
          <circle
            cx={half}
            cy={half}
            r={r}
            stroke='currentColor'
            strokeOpacity='0.2'
            strokeWidth={sw}
          />
          <path
            d={`M${half + r} ${half}a${r} ${r} 0 0 0-${r}-${r}`}
            stroke='currentColor'
            strokeWidth={sw}
            strokeLinecap='round'
          />
        </svg>
        <span className='sr-only'>{label || 'Loading'}</span>
      </div>
    );
  }
);
LoaderRoot.displayName = LOADER_ROOT_NAME;

export { LoaderRoot as Root };
