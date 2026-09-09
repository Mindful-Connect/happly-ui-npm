'use client';

import { tv, type VariantProps } from '@/lib/tv';

const SKELETON_ROOT_NAME = 'SkeletonRoot';

export const skeletonVariants = tv({
  base: 'animate-pulse bg-bg-soft-200',
  variants: {
    variant: {
      rounded: 'rounded-md',
      circular: 'rounded-full',
    },
  },
  defaultVariants: {
    variant: 'rounded',
  },
});

function Skeleton({
  className,
  variant,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof skeletonVariants>) {
  return (
    // A placeholder block carries no information; keep it out of the
    // accessibility tree and announce loading from the surrounding region.
    <div
      aria-hidden='true'
      className={skeletonVariants({ variant, class: className })}
      {...rest}
    />
  );
}
Skeleton.displayName = SKELETON_ROOT_NAME;

export { Skeleton as Root };
