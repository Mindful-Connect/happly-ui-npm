'use client';

import * as React from 'react';

import { tv, type VariantProps } from '@/lib/tv';

export const progressBarVariants = tv({
  slots: {
    root: 'h-1.5 w-full rounded-full bg-bg-soft-200',
    progress: 'h-full rounded-full transition-[width] duration-300 ease-out',
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
    },
    indeterminate: {
      true: {
        root: 'relative overflow-hidden',
        // The reduced-motion rule below stops the slide, and a frozen
        // 40%-wide segment reads as "40% done" — a number the component
        // never claimed. Full width reads as "busy, amount unknown",
        // which is what `aria-busy` already announces.
        progress: 'absolute w-2/5 motion-reduce:w-full',
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
  };

const ProgressBarRoot = React.forwardRef<HTMLDivElement, ProgressBarRootProps>(
  (
    { className, color, value = 0, max = 100, indeterminate, ...rest },
    forwardedRef
  ) => {
    const { root, progress } = progressBarVariants({ color, indeterminate });

    if (indeterminate) {
      return (
        <div
          ref={forwardedRef}
          className={root({ class: className })}
          role='progressbar'
          aria-busy='true'
          {...rest}
        >
          <div
            className={progress()}
            style={{ animation: 'var(--animate-indeterminate-slide)' }}
          />
        </div>
      );
    }

    const safeValue = Math.min(max, Math.max(value, 0));

    return (
      // The track is the progressbar, so the role and its values sit on the
      // root — that is also the element `rest` names via `aria-label`.
      <div
        ref={forwardedRef}
        className={root({ class: className })}
        role='progressbar'
        aria-valuenow={safeValue}
        aria-valuemin={0}
        aria-valuemax={max}
        {...rest}
      >
        <div
          className={progress()}
          style={{
            width: `${(safeValue / max) * 100}%`,
          }}
        />
      </div>
    );
  }
);
ProgressBarRoot.displayName = 'ProgressBarRoot';

export { ProgressBarRoot as Root };
