'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '@/lib/utils';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    selectElementColor?: string;
    variant?: 'default' | 'primary';
  }
>(({ className, color, variant = 'default', ...props }, ref) => {
  return (
    <div className='flex h-5 w-5 shrink-0 items-center justify-center'>
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          'text-primary aspect-square h-[16px] w-[16px] rounded-full border-2 border-neutral-200 transition-all duration-75 focus:outline-none focus-visible:ring-0 disabled:cursor-default disabled:opacity-50 data-[state=checked]:border-0 [&[data-state=checked]_.unchecked-shadow]:hidden',
          props.disabled && 'cursor-default',
          className
        )}
        {...props}
      >
        {/* This div is invisible when the RadioGroupItem is checked  */}
        <div className='unchecked-shadow h-full w-full rounded-full bg-white shadow-sm' />

        {/* RadioGroupPrimitive.Indicator is invisible when the RadioGroupItem is not checked  */}
        <RadioGroupPrimitive.Indicator className='flex h-full items-center justify-center transition-all duration-75'>
          <div
            style={{ borderColor: color }}
            className={cn(
              'h-full w-full rounded-full border-4 transition-all duration-75',
              variant === 'primary'
                ? 'border-primaryColor'
                : 'border-ds-neutral-950'
            )}
          />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
    </div>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
