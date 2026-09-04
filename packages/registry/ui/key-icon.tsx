import * as React from 'react';

import { cn } from '@/lib/happly-ui-utils';
import { tv, type VariantProps } from '@/lib/tv';

const keyIconVariants = tv({
  base: 'flex shrink-0 items-center justify-center overflow-hidden rounded-full',
  variants: {
    size: {
      sm: 'w-8 h-8 p-1.5 [&_svg]:w-5 [&_svg]:h-5',
      md: 'w-10 h-10 p-2.5 [&_svg]:w-5 [&_svg]:h-5',
      lg: 'w-12 h-12 p-3 [&_svg]:w-6 [&_svg]:h-6',
      xl: 'w-14 h-14 p-3.5 [&_svg]:w-7 [&_svg]:h-7',
      '2xl': 'w-16 h-16 p-4 [&_svg]:w-8 [&_svg]:h-8',
    },
    style: {
      stroke:
        'bg-bg-white-0 ring-1 ring-inset ring-stroke-soft-200 shadow-regular-xs',
      lighter: 'ring-1 ring-inset',
      filled: '',
    },
    color: {
      gray: '',
      blue: '',
      orange: '',
      red: '',
      green: '',
      yellow: '',
      purple: '',
      pink: '',
      teal: '',
      primary: '',
    },
  },
  compoundVariants: [
    // lighter color variants
    {
      style: 'lighter',
      color: 'gray',
      class: 'bg-faded-lighter ring-stroke-soft-200',
    },
    {
      style: 'lighter',
      color: 'blue',
      class: 'bg-information-lighter ring-blue-100',
    },
    {
      style: 'lighter',
      color: 'orange',
      class: 'bg-warning-lighter ring-orange-100',
    },
    { style: 'lighter', color: 'red', class: 'bg-error-lighter ring-red-100' },
    {
      style: 'lighter',
      color: 'green',
      class: 'bg-success-lighter ring-green-200',
    },
    {
      style: 'lighter',
      color: 'yellow',
      class: 'bg-away-lighter ring-yellow-200',
    },
    {
      style: 'lighter',
      color: 'purple',
      class: 'bg-feature-lighter ring-purple-100',
    },
    {
      style: 'lighter',
      color: 'pink',
      class: 'bg-highlighted-lighter ring-pink-100',
    },
    {
      style: 'lighter',
      color: 'teal',
      class: 'bg-verified-lighter ring-sky-200',
    },
    // filled color variants
    {
      style: 'filled',
      color: 'gray',
      class: 'bg-faded-base text-faded-contrast',
    },
    {
      style: 'filled',
      color: 'blue',
      class: 'bg-information-base text-information-contrast',
    },
    {
      style: 'filled',
      color: 'orange',
      class: 'bg-warning-base text-warning-contrast',
    },
    {
      style: 'filled',
      color: 'red',
      class: 'bg-error-base text-error-contrast',
    },
    {
      style: 'filled',
      color: 'green',
      class: 'bg-success-base text-success-contrast',
    },
    {
      style: 'filled',
      color: 'yellow',
      class: 'bg-away-base text-away-contrast',
    },
    {
      style: 'filled',
      color: 'purple',
      class: 'bg-feature-base text-feature-contrast',
    },
    {
      style: 'filled',
      color: 'pink',
      class: 'bg-highlighted-base text-highlighted-contrast',
    },
    {
      style: 'filled',
      color: 'teal',
      class: 'bg-verified-base text-verified-contrast',
    },
    {
      style: 'filled',
      color: 'primary',
      class: 'bg-primary-base text-primary-contrast',
    },
    // lighter + primary color
    {
      style: 'lighter',
      color: 'primary',
      class: 'bg-primary-lighter ring-primary-100',
    },
  ],
  defaultVariants: {
    size: 'md',
    style: 'stroke',
    color: 'gray',
  },
});

type KeyIconProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'style'> &
  VariantProps<typeof keyIconVariants> & {
    icon?: React.ReactNode;
  };

const KeyIconRoot = React.forwardRef<HTMLDivElement, KeyIconProps>(
  (
    { className, size, style, color, icon, children, ...rest },
    forwardedRef
  ) => {
    return (
      <div
        ref={forwardedRef}
        className={cn(keyIconVariants({ size, style, color }), className)}
        {...rest}
      >
        {icon ?? children}
      </div>
    );
  }
);
KeyIconRoot.displayName = 'KeyIconRoot';

export { KeyIconRoot as Root, keyIconVariants };
