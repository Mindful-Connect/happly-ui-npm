'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import type { PolymorphicComponentProps } from '@/lib/polymorphic';
import { recursiveCloneChildren } from '@/lib/recursive-clone-children';
import { tv, type VariantProps } from '@/lib/tv';

const BADGE_ROOT_NAME = 'BadgeRoot';
const BADGE_ICON_NAME = 'BadgeIcon';
const BADGE_DOT_NAME = 'BadgeDot';

export const badgeVariants = tv({
  slots: {
    root: 'inline-flex items-center justify-center rounded-full leading-none transition duration-200 ease-out',
    icon: 'shrink-0',
    dot: [
      // base
      'dot',
      'flex items-center justify-center',
      // before
      'before:size-1 before:rounded-full before:bg-current',
    ],
  },
  variants: {
    size: {
      small: {
        root: 'h-5 gap-0.5 px-2 text-subheading-2xs',
        icon: 'size-3',
        dot: 'size-4',
      },
      medium: {
        root: 'h-6 gap-0.5 px-2 text-label-xs',
        icon: 'size-4',
        dot: 'size-4',
      },
    },
    variant: {
      filled: {
        root: 'text-static-white',
      },
      light: {},
      lighter: {
        root: 'ring-1 ring-inset',
      },
      stroke: {
        root: 'ring-1 ring-inset ring-neutral-200 bg-white',
      },
    },
    color: {
      gray: {},
      blue: {},
      orange: {},
      red: {},
      green: {},
      yellow: {},
      purple: {},
      sky: {},
      pink: {},
      teal: {},
    },
    disabled: {
      true: {
        root: 'pointer-events-none',
      },
    },
    square: {
      true: {},
    },
  },
  compoundVariants: [
    //#region variant=filled
    {
      variant: 'filled',
      color: 'gray',
      class: { root: 'bg-neutral-500' },
    },
    {
      variant: 'filled',
      color: 'blue',
      class: { root: 'bg-blue-500' },
    },
    {
      variant: 'filled',
      color: 'orange',
      class: { root: 'bg-orange-500' },
    },
    {
      variant: 'filled',
      color: 'red',
      class: { root: 'bg-red-500' },
    },
    {
      variant: 'filled',
      color: 'green',
      class: { root: 'bg-green-500' },
    },
    {
      variant: 'filled',
      color: 'yellow',
      class: { root: 'bg-yellow-500' },
    },
    {
      variant: 'filled',
      color: 'purple',
      class: { root: 'bg-purple-500' },
    },
    {
      variant: 'filled',
      color: 'sky',
      class: { root: 'bg-sky-500' },
    },
    {
      variant: 'filled',
      color: 'pink',
      class: { root: 'bg-pink-500' },
    },
    {
      variant: 'filled',
      color: 'teal',
      class: { root: 'bg-teal-500' },
    },
    //#endregion

    //#region variant=light
    {
      variant: 'light',
      color: 'gray',
      class: { root: 'bg-neutral-200 text-neutral-800' },
    },
    {
      variant: 'light',
      color: 'blue',
      class: { root: 'bg-blue-200 text-blue-950' },
    },
    {
      variant: 'light',
      color: 'orange',
      class: { root: 'bg-orange-200 text-orange-950' },
    },
    {
      variant: 'light',
      color: 'red',
      class: { root: 'bg-red-200 text-red-950' },
    },
    {
      variant: 'light',
      color: 'green',
      class: { root: 'bg-green-200 text-green-950' },
    },
    {
      variant: 'light',
      color: 'yellow',
      class: { root: 'bg-yellow-200 text-yellow-950' },
    },
    {
      variant: 'light',
      color: 'purple',
      class: { root: 'bg-purple-200 text-purple-950' },
    },
    {
      variant: 'light',
      color: 'sky',
      class: { root: 'bg-sky-200 text-sky-950' },
    },
    {
      variant: 'light',
      color: 'pink',
      class: { root: 'bg-pink-200 text-pink-950' },
    },
    {
      variant: 'light',
      color: 'teal',
      class: { root: 'bg-teal-200 text-teal-950' },
    },
    //#endregion

    //#region variant=lighter
    {
      variant: 'lighter',
      color: 'gray',
      class: { root: 'bg-neutral-100 text-neutral-800 ring-neutral-200' },
    },
    {
      variant: 'lighter',
      color: 'blue',
      class: { root: 'bg-blue-50 text-blue-950 ring-blue-100' },
    },
    {
      variant: 'lighter',
      color: 'orange',
      class: { root: 'bg-orange-50 text-orange-950 ring-orange-100' },
    },
    {
      variant: 'lighter',
      color: 'red',
      class: { root: 'bg-red-50 text-red-950 ring-red-100' },
    },
    {
      variant: 'lighter',
      color: 'green',
      class: { root: 'bg-green-50 text-green-950 ring-green-100' },
    },
    {
      variant: 'lighter',
      color: 'yellow',
      class: { root: 'bg-yellow-50 text-yellow-950 ring-yellow-100' },
    },
    {
      variant: 'lighter',
      color: 'purple',
      class: { root: 'bg-purple-50 text-purple-950 ring-purple-100' },
    },
    {
      variant: 'lighter',
      color: 'sky',
      class: { root: 'bg-sky-50 text-sky-950 ring-sky-100' },
    },
    {
      variant: 'lighter',
      color: 'pink',
      class: { root: 'bg-pink-50 text-pink-950 ring-pink-100' },
    },
    {
      variant: 'lighter',
      color: 'teal',
      class: { root: 'bg-teal-50 text-teal-950 ring-teal-100' },
    },
    //#endregion

    //#region variant=stroke
    {
      variant: 'stroke',
      color: 'gray',
      class: { root: 'text-neutral-500' },
    },
    {
      variant: 'stroke',
      color: 'blue',
      class: { root: 'text-blue-500' },
    },
    {
      variant: 'stroke',
      color: 'orange',
      class: { root: 'text-orange-500' },
    },
    {
      variant: 'stroke',
      color: 'red',
      class: { root: 'text-red-500' },
    },
    {
      variant: 'stroke',
      color: 'green',
      class: { root: 'text-green-500' },
    },
    {
      variant: 'stroke',
      color: 'yellow',
      class: { root: 'text-yellow-500' },
    },
    {
      variant: 'stroke',
      color: 'purple',
      class: { root: 'text-purple-500' },
    },
    {
      variant: 'stroke',
      color: 'sky',
      class: { root: 'text-sky-500' },
    },
    {
      variant: 'stroke',
      color: 'pink',
      class: { root: 'text-pink-500' },
    },
    {
      variant: 'stroke',
      color: 'teal',
      class: { root: 'text-teal-500' },
    },
    //#endregion

    //#region square
    {
      size: 'small',
      square: true,
      class: {
        root: 'min-w-5 p-0.5',
      },
    },
    {
      size: 'medium',
      square: true,
      class: {
        root: 'min-w-6 p-1',
      },
    },
    //#endregion

    //#region disabled
    {
      disabled: true,
      variant: ['stroke', 'filled', 'light', 'lighter'],
      color: [
        'red',
        'gray',
        'blue',
        'orange',
        'green',
        'yellow',
        'purple',
        'sky',
        'pink',
        'teal',
      ],
      class: {
        root: [
          'ring-1 ring-inset ring-stroke-soft-200',
          'bg-transparent text-text-disabled-300',
        ],
      },
    },
    //#endregion
  ],
  defaultVariants: {
    variant: 'filled',
    size: 'small',
    color: 'gray',
  },
});

type BadgeSharedProps = VariantProps<typeof badgeVariants>;

type BadgeRootProps = VariantProps<typeof badgeVariants> &
  React.HTMLAttributes<HTMLDivElement> & {
    asChild?: boolean;
  };

// Padding overrides for icon/dot positioning per Figma specs
const ICON_PADDING: Record<string, { left: string; right: string }> = {
  small: { left: 'pl-1 pr-2', right: 'pl-2 pr-1' },
  medium: { left: 'pl-1.5 pr-2', right: 'pl-2 pr-1.5' },
};
const DOT_PADDING: Record<string, { left: string; right: string }> = {
  small: { left: 'pl-0 pr-2 py-0.5', right: 'pl-2 pr-0 py-0.5' },
  medium: { left: 'pl-0.5 pr-2', right: 'pl-2 pr-0.5' },
};

function getChildLayout(children: React.ReactNode) {
  const arr = React.Children.toArray(children);
  const first = arr[0];
  const last = arr[arr.length - 1];
  const getDisplayName = (c: React.ReactNode) =>
    React.isValidElement(c)
      ? (c.type as React.ComponentType)?.displayName
      : undefined;
  return {
    firstIsIcon: getDisplayName(first) === BADGE_ICON_NAME,
    lastIsIcon: getDisplayName(last) === BADGE_ICON_NAME,
    firstIsDot: getDisplayName(first) === BADGE_DOT_NAME,
    lastIsDot: getDisplayName(last) === BADGE_DOT_NAME,
  };
}

const BadgeRoot = React.forwardRef<HTMLDivElement, BadgeRootProps>(
  (
    {
      asChild,
      size,
      variant,
      color,
      disabled,
      square,
      children,
      className,
      ...rest
    },
    forwardedRef
  ) => {
    const uniqueId = React.useId();
    const Component = asChild ? Slot : 'div';
    const { root } = badgeVariants({ size, variant, color, disabled, square });

    const sharedProps: BadgeSharedProps = {
      size,
      variant,
      color,
    };

    const extendedChildren = recursiveCloneChildren(
      children as React.ReactElement[],
      sharedProps,
      [BADGE_ICON_NAME, BADGE_DOT_NAME],
      uniqueId,
      asChild
    );

    // Detect icon/dot position to apply Figma-accurate padding
    const sizeKey = size ?? 'small';
    const { firstIsIcon, lastIsIcon, firstIsDot, lastIsDot } =
      getChildLayout(children);
    let paddingClass = '';
    if (firstIsDot) {
      paddingClass = DOT_PADDING[sizeKey]?.left ?? '';
    } else if (lastIsDot) {
      paddingClass = DOT_PADDING[sizeKey]?.right ?? '';
    } else if (firstIsIcon && !lastIsIcon) {
      paddingClass = ICON_PADDING[sizeKey]?.left ?? '';
    } else if (lastIsIcon && !firstIsIcon) {
      paddingClass = ICON_PADDING[sizeKey]?.right ?? '';
    }

    return (
      <Component
        ref={forwardedRef}
        className={root({ class: [paddingClass, className] })}
        {...rest}
      >
        {extendedChildren}
      </Component>
    );
  }
);
BadgeRoot.displayName = BADGE_ROOT_NAME;

function BadgeIcon<T extends React.ElementType>({
  className,
  size,
  variant,
  color,
  as,
  ...rest
}: PolymorphicComponentProps<T, BadgeSharedProps>) {
  const Component = as || 'div';
  const { icon } = badgeVariants({ size, variant, color });

  return <Component className={icon({ class: className })} {...rest} />;
}
BadgeIcon.displayName = BADGE_ICON_NAME;

type BadgeDotProps = BadgeSharedProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>;

function BadgeDot({ size, variant, color, className, ...rest }: BadgeDotProps) {
  const { dot } = badgeVariants({ size, variant, color });

  return <div className={dot({ class: className })} {...rest} />;
}
BadgeDot.displayName = BADGE_DOT_NAME;

export { BadgeRoot as Root, BadgeIcon as Icon, BadgeDot as Dot };
