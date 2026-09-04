'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/happly-ui-utils';
import { recursiveCloneChildren } from '@/lib/recursive-clone-children';
import { tv, type VariantProps } from '@/lib/tv';

const DOT_STEPPER_ROOT_NAME = 'DotStepperRoot';
const DOT_STEPPER_ITEM_NAME = 'DotStepperItem';

export const dotStepperVariants = tv({
  slots: {
    root: 'flex flex-wrap',
    item: [
      // base
      'relative shrink-0 rounded-full bg-bg-soft-200 outline-none transition-[background-color,box-shadow] duration-150 ease-out',
      // hit area — the dot itself is 4–8px; the pseudo-element is widened to
      // the gap between neighbours (never past it) and to 24px tall
      'after:absolute after:top-1/2 after:left-1/2 after:h-6 after:-translate-x-1/2 after:-translate-y-1/2',
      // focus
      'focus:outline-none',
      'focus-visible:ring-2 focus-visible:ring-stroke-strong-950',
    ],
  },
  variants: {
    size: {
      small: {
        root: 'gap-2.5',
        item: 'w-2 h-2 after:w-[18px]',
      },
      xsmall: {
        root: 'gap-1.5',
        item: 'w-1 h-1 after:w-[10px]',
      },
    },
  },
  defaultVariants: {
    size: 'small',
  },
});

type DotStepperSharedProps = VariantProps<typeof dotStepperVariants>;

type DotStepperRootProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof dotStepperVariants> & {
    asChild?: boolean;
  };

function DotStepperRoot({
  asChild,
  children,
  size,
  className,
  ...rest
}: DotStepperRootProps) {
  const uniqueId = React.useId();
  const Component = asChild ? Slot : 'div';
  const { root } = dotStepperVariants({ size });

  const sharedProps: DotStepperSharedProps = {
    size,
  };

  const extendedChildren = recursiveCloneChildren(
    children as React.ReactElement[],
    sharedProps,
    [DOT_STEPPER_ITEM_NAME],
    uniqueId,
    asChild
  );

  return (
    <Component className={root({ class: className })} {...rest}>
      {extendedChildren}
    </Component>
  );
}
DotStepperRoot.displayName = DOT_STEPPER_ROOT_NAME;

type DotStepperItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  DotStepperSharedProps & {
    asChild?: boolean;
    active?: boolean;
  };

const DotStepperItem = React.forwardRef<HTMLButtonElement, DotStepperItemProps>(
  ({ asChild, size, className, active, ...rest }, forwardedRef) => {
    const Component = asChild ? Slot : 'button';
    const { item } = dotStepperVariants({ size });

    return (
      <Component
        ref={forwardedRef}
        aria-current={active ? 'step' : undefined}
        className={cn(item({ class: className }), {
          'bg-primary-base': active,
        })}
        {...rest}
      />
    );
  }
);
DotStepperItem.displayName = DOT_STEPPER_ITEM_NAME;

export { DotStepperRoot as Root, DotStepperItem as Item };
