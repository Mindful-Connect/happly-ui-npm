'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

import { tv, type VariantProps } from '@/lib/tv';

export const progressBarVariants = tv({
  slots: {
    root: 'h-1.5 w-full rounded-full bg-bg-soft-200',
    progress: 'h-full rounded-full transition-all duration-300 ease-out',
  },
  variants: {
    color: {
      blue: {
        progress: 'bg-information-base',
      },
      red: {
        progress: 'bg-error-base',
      },
      orange: {
        progress: 'bg-warning-base',
      },
      green: {
        progress: 'bg-success-base',
      },
      primary: {
        progress: 'bg-primary-base',
      },
      neutral: {
        progress: 'bg-neutral-900',
      },
    },
  },
  defaultVariants: {
    color: 'blue',
  },
});

type ProgressBarRootProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof progressBarVariants> & {
    value?: number;
    max?: number;
    showAnimatedDot?: boolean;
  };

const ProgressBarRoot = React.forwardRef<HTMLDivElement, ProgressBarRootProps>(
  (
    {
      className,
      color,
      value = 0,
      max = 100,
      showAnimatedDot = false,
      ...rest
    },
    forwardedRef
  ) => {
    const { root, progress } = progressBarVariants({ color });
    const safeValue = Math.min(max, Math.max(value, 0));

    return (
      <div ref={forwardedRef} className={root({ class: className })} {...rest}>
        <div
          className={`${progress()} relative overflow-hidden`}
          style={{
            width: `${(safeValue / max) * 100}%`,
          }}
          aria-valuenow={value}
          aria-valuemax={max}
          role='progressbar'
        >
          {showAnimatedDot && (
            <motion.div
              className='absolute inset-0'
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <div
                className='absolute top-0 right-0 bottom-0 w-10'
                style={{
                  background:
                    'radial-gradient(circle, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 65%)',
                }}
              />
            </motion.div>
          )}
        </div>
      </div>
    );
  }
);
ProgressBarRoot.displayName = 'ProgressBarRoot';

export { ProgressBarRoot as Root };
