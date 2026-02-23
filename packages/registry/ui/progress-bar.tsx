import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/happly-ui-utils';

const progressBarVariants = cva(
  'relative w-full overflow-hidden rounded-full bg-ds-neutral-200 h-[6px]',
  {
    variants: {
      variant: {
        neutral: '',
        primary: '',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  }
);

const progressIndicatorVariants = cva(
  'h-full flex-1 rounded-full transition-all duration-300 ease-in-out',
  {
    variants: {
      variant: {
        neutral: 'bg-ds-neutral-800',
        primary: 'bg-primaryColor',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  }
);

export interface ProgressBarProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressBarVariants> {
  /**
   * Numeric progress value between 0 and 100.
   */
  progress?: number;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, variant, progress = 0, ...props }, ref) => {
    // Ensure progress is between 0 and 100
    const clampedProgress = Math.min(100, Math.max(0, progress));

    return (
      <div
        ref={ref}
        role='progressbar'
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clampedProgress}
        className={cn(progressBarVariants({ variant }), className)}
        {...props}
      >
        <div
          className={cn(progressIndicatorVariants({ variant }))}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    );
  }
);
ProgressBar.displayName = 'ProgressBar';

export { ProgressBar, progressBarVariants };
