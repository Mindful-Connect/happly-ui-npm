'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/happly-ui-utils';

type SliderVariant = 'primary' | 'neutral';

const SliderContext = React.createContext<SliderVariant>('primary');

const RANGE_CLASSES = {
  primary: 'bg-primary-base',
  neutral: 'bg-text-strong-950',
} as const;

const THUMB_CLASSES = {
  primary: 'bg-primary-base',
  neutral: 'bg-text-strong-950',
} as const;

const SliderRoot = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    variant?: SliderVariant;
  }
>(({ className, children, variant = 'primary', ...rest }, forwardedRef) => (
  <SliderContext.Provider value={variant}>
    <SliderPrimitive.Root
      ref={forwardedRef}
      className={cn(
        'relative flex h-4 w-full touch-none items-center select-none',
        className
      )}
      {...rest}
    >
      <SliderPrimitive.Track className='bg-bg-soft-200 relative h-1.5 w-full overflow-hidden rounded-full'>
        <SliderPrimitive.Range
          className={cn('absolute h-full', RANGE_CLASSES[variant])}
        />
      </SliderPrimitive.Track>
      {children}
    </SliderPrimitive.Root>
  </SliderContext.Provider>
));
SliderRoot.displayName = 'SliderRoot';

const SliderThumb = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Thumb>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb>
>(({ className, ...rest }, forwardedRef) => {
  const variant = React.useContext(SliderContext);

  return (
    <SliderPrimitive.Thumb
      ref={forwardedRef}
      className={cn(
        // base
        'border-static-white shadow-toggle-switch box-content block h-1.5 w-1.5 shrink-0 cursor-pointer rounded-full border-[5px] outline-none',
        // focus
        'focus:outline-none',
        // variant
        THUMB_CLASSES[variant],
        className
      )}
      {...rest}
    />
  );
});
SliderThumb.displayName = 'SliderThumb';

export { SliderRoot as Root, SliderThumb as Thumb };
