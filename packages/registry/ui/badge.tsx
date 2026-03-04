import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/happly-ui-utils';

// this component is not intended to be interactive as it doesn't have any hover or focus styling
// the 'disabled' color variant is only for visual purposes
const badgeVariants = cva(
  'flex items-center justify-center rounded-full border gap-1 px-2 text-xs font-medium transition-colors focus:outline-none focus:ring-0 w-fit',
  {
    variants: {
      iconVar: {
        default: 'px-2',
        left: 'pl-1',
        right: 'pr-1',
      },
      colorVar: {
        default: 'border-ds-neutral-200 text-ds-neutral-500',
        filled: 'border-ds-neutral-500 bg-ds-neutral-500 text-white',
        light: 'border-ds-neutral-200 bg-ds-neutral-200 text-ds-neutral-800',
        lighter: 'border-ds-neutral-200 bg-ds-neutral-100 text-ds-neutral-800',

        primaryLight:
          'border-primaryColor/20 bg-primaryColor/20 text-primaryColor',
        primaryLighter:
          'border-transparent bg-primaryColor/10 text-primaryColor',

        blueText: 'border-ds-neutral-200 text-ds-blue-500',
        blueFilled: 'border-ds-blue-500 bg-ds-blue-500 text-white',
        blueLight: 'border-ds-blue-200 bg-ds-blue-200 text-ds-blue-950',
        blueLighter: 'border-ds-blue-100 bg-ds-blue-50 text-ds-blue-950',

        orangeText: 'border-ds-neutral-200 text-ds-orange-500',
        orangeFilled: 'border-ds-orange-500 bg-ds-orange-500 text-white',
        orangeLight: 'border-ds-orange-200 bg-ds-orange-200 text-ds-orange-950',
        orangeLighter:
          'border-ds-orange-100 bg-ds-orange-50 text-ds-orange-950',

        redText: 'border-ds-neutral-200 text-ds-red-500',
        redFilled: 'border-ds-red-500 bg-ds-red-500 text-white',
        redLight: 'border-ds-red-200 bg-ds-red-200 text-ds-red-950',
        redLighter: 'border-ds-red-100 bg-ds-red-50 text-ds-red-950',

        greenText: 'border-ds-neutral-200 text-ds-green-500',
        greenFilled: 'border-ds-green-500 bg-ds-green-500 text-white',
        greenLight: 'border-ds-green-200 bg-ds-green-200 text-ds-green-950',
        greenLighter: 'border-ds-green-100 bg-ds-green-50 text-ds-green-950',

        yellowText: 'border-ds-neutral-200 text-ds-yellow-500',
        yellowFilled: 'border-ds-yellow-500 bg-ds-yellow-500 text-white',
        yellowLight: 'border-ds-yellow-200 bg-ds-yellow-200 text-ds-yellow-950',
        yellowLighter:
          'border-ds-yellow-100 bg-ds-yellow-50 text-ds-yellow-950',

        purpleText: 'border-ds-neutral-200 text-ds-purple-500',
        purpleFilled: 'border-ds-purple-500 bg-ds-purple-500 text-white',
        purpleLight: 'border-ds-purple-200 bg-ds-purple-200 text-ds-purple-950',
        purpleLighter:
          'border-ds-purple-100 bg-ds-purple-50 text-ds-purple-950',

        skyText: 'border-ds-neutral-200 text-ds-sky-500',
        skyFilled: 'border-ds-sky-500 bg-ds-sky-500 text-white',
        skyLight: 'border-ds-sky-200 bg-ds-sky-200 text-ds-sky-950',
        skyLighter: 'border-ds-sky-100 bg-ds-sky-50 text-ds-sky-950',

        pinkText: 'border-ds-neutral-200 text-ds-pink-500',
        pinkFilled: 'border-ds-pink-500 bg-ds-pink-500 text-white',
        pinkLight: 'border-ds-pink-200 bg-ds-pink-200 text-ds-pink-950',
        pinkLighter: 'border-ds-pink-100 bg-ds-pink-50 text-ds-pink-950',

        tealText: 'border-ds-neutral-200 text-ds-teal-500',
        tealFilled: 'border-ds-teal-500 bg-ds-teal-500 text-white',
        tealLight: 'border-ds-teal-200 bg-ds-teal-200 text-ds-teal-950',
        tealLighter: 'border-ds-teal-100 bg-ds-teal-50 text-ds-teal-950',

        disabled: 'border-ds-neutral-200 text-ds-neutral-300',
      },
      size: {
        lg: 'h-[28px] font-medium',
        default: 'h-6 font-medium',
        sm: 'h-5 text-[11px]',
      },
    },
    defaultVariants: {
      iconVar: 'default',
      colorVar: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

function Badge({
  icon,
  iconVar,
  className,
  colorVar,
  size,
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ iconVar, colorVar, size }), className)}
      {...props}
    >
      {iconVar === 'left' && size !== 'sm' && icon}
      {iconVar === 'left' && size === 'sm' && (
        <div className='flex h-3 w-3 shrink grow-0 items-center justify-center'>
          {icon}
        </div>
      )}
      {children}
      {iconVar === 'right' && size !== 'sm' && icon}
      {iconVar === 'right' && size === 'sm' && (
        <div className='flex h-3 w-3 shrink grow-0 items-center justify-center'>
          {icon}
        </div>
      )}
    </div>
  );
}

export { Badge, badgeVariants };
