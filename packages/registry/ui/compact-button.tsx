'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import type { PolymorphicComponentProps } from '@/lib/polymorphic';
import { recursiveCloneChildren } from '@/lib/recursive-clone-children';
import { tv, type VariantProps } from '@/lib/tv';

const COMPACT_BUTTON_ROOT_NAME = 'CompactButtonRoot';
const COMPACT_BUTTON_ICON_NAME = 'CompactButtonIcon';

// Tactile press feedback. Disable per-instance with the `static` prop.
const PRESS_SCALE = 'active:[&:not(:disabled)]:scale-[0.96]';

export const compactButtonVariants = tv({
  slots: {
    root: [
      // base
      'relative flex shrink-0 items-center justify-center outline-none',
      'transition-[background-color,border-color,color,box-shadow,scale,transform] duration-150 ease-out',
      // disabled
      'disabled:pointer-events-none disabled:border-transparent disabled:bg-transparent disabled:text-text-disabled-300 disabled:shadow-none',
    ],
    icon: '',
  },
  variants: {
    variant: {
      stroke: {
        root: [
          // base
          'border border-stroke-soft-200 bg-bg-white-0 text-text-sub-600 shadow-regular-xs',
          // hover
          'hover:border-transparent hover:bg-bg-weak-50 hover:text-text-strong-950 hover:shadow-none',
          // focus
          'focus-visible:border-transparent focus-visible:bg-bg-strong-950 focus-visible:text-text-white-0 focus-visible:shadow-none',
        ],
      },
      ghost: {
        root: [
          // base
          'bg-transparent text-text-sub-600',
          // hover
          'hover:bg-bg-weak-50 hover:text-text-strong-950',
          // focus
          'focus-visible:bg-bg-strong-950 focus-visible:text-text-white-0',
        ],
      },
      white: {
        root: [
          // base
          'bg-bg-white-0 text-text-sub-600 shadow-regular-xs',
          // hover
          'hover:bg-bg-weak-50 hover:text-text-strong-950',
          // focus
          'focus-visible:bg-bg-strong-950 focus-visible:text-text-white-0',
        ],
      },
      modifiable: {},
    },
    size: {
      large: {
        root: 'w-6 h-6',
        icon: 'w-5 h-5',
      },
      medium: {
        // 20px visual, 24px hit area (WCAG 2.5.8) via a transparent overlay.
        root: 'w-5 h-5 after:absolute after:top-1/2 after:left-1/2 after:size-6 after:-translate-x-1/2 after:-translate-y-1/2',
        icon: 'size-[18px]',
      },
    },
    fullRadius: {
      true: {
        root: 'rounded-full',
      },
      false: {
        root: 'rounded-md',
      },
    },
  },
  defaultVariants: {
    variant: 'stroke',
    size: 'large',
    fullRadius: false,
  },
});

type CompactButtonSharedProps = Omit<
  VariantProps<typeof compactButtonVariants>,
  'fullRadius'
>;

type CompactButtonProps = VariantProps<typeof compactButtonVariants> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    /** Disables the scale-on-press feedback. */
    static?: boolean;
  };

const CompactButtonRoot = React.forwardRef<
  HTMLButtonElement,
  CompactButtonProps
>(
  (
    {
      asChild,
      variant,
      size,
      fullRadius,
      children,
      className,
      static: isStatic,
      ...rest
    },
    forwardedRef
  ) => {
    const uniqueId = React.useId();
    const Component = asChild ? Slot : 'button';
    const { root } = compactButtonVariants({ variant, size, fullRadius });

    const sharedProps: CompactButtonSharedProps = {
      variant,
      size,
    };

    const extendedChildren = recursiveCloneChildren(
      children as React.ReactElement[],
      sharedProps,
      [COMPACT_BUTTON_ICON_NAME],
      uniqueId,
      asChild
    );

    return (
      <Component
        ref={forwardedRef}
        className={root({ class: [!isStatic && PRESS_SCALE, className] })}
        {...rest}
      >
        {extendedChildren}
      </Component>
    );
  }
);
CompactButtonRoot.displayName = COMPACT_BUTTON_ROOT_NAME;

function CompactButtonIcon<T extends React.ElementType>({
  variant,
  size,
  as,
  className,
  ...rest
}: PolymorphicComponentProps<T, CompactButtonSharedProps>) {
  const Component = as || 'div';
  const { icon } = compactButtonVariants({ variant, size });

  return <Component className={icon({ class: className })} {...rest} />;
}
CompactButtonIcon.displayName = COMPACT_BUTTON_ICON_NAME;

export { CompactButtonRoot as Root, CompactButtonIcon as Icon };
