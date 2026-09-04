'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { useFormField } from '@/lib/form-field-context';
import { cn } from '@/lib/happly-ui-utils';
import { useFormFieldBinding } from '@/lib/use-form-field-binding';

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

const THUMB_FOCUS_CLASSES = {
  primary: 'focus-visible:shadow-button-primary-focus',
  neutral: 'focus-visible:shadow-button-important-focus',
} as const;

const SliderRoot = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    variant?: SliderVariant;
  }
>(
  (
    {
      className,
      children,
      variant = 'primary',
      value: valueProp,
      onValueChange: onValueChangeProp,
      disabled: disabledProp,
      ...rest
    },
    forwardedRef
  ) => {
    const formField = useFormField();
    const binding = useFormFieldBinding<number[]>();
    const disabled = disabledProp ?? formField.disabled;

    // Priority: explicit props > RHF binding > undefined (Radix uncontrolled)
    const value = valueProp !== undefined ? valueProp : binding?.value;
    const onValueChange = onValueChangeProp ?? binding?.onChange;

    return (
      <SliderContext.Provider value={variant}>
        <SliderPrimitive.Root
          ref={forwardedRef}
          className={cn(
            'relative flex h-4 w-full touch-none items-center select-none',
            className
          )}
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
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
    );
  }
);
SliderRoot.displayName = 'SliderRoot';

const SliderThumb = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Thumb>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb>
>(
  (
    { className, 'aria-describedby': ariaDescribedBy, ...rest },
    forwardedRef
  ) => {
    const variant = React.useContext(SliderContext);
    const formField = useFormField();

    // `role="slider"` lives on the thumb, not on Radix's Root, so the field's
    // hint/error has to be pointed at from here. No `aria-required`: a slider
    // always has a value, and `slider` does not support the attribute.
    const describedBy =
      [ariaDescribedBy, formField.describedBy].filter(Boolean).join(' ') ||
      undefined;

    return (
      <SliderPrimitive.Thumb
        ref={forwardedRef}
        aria-describedby={describedBy}
        className={cn(
          // base — 16px visual (6px core + 5px border each side)
          'border-static-white shadow-toggle-switch box-content block h-1.5 w-1.5 shrink-0 cursor-pointer rounded-full border-[5px] outline-none',
          // 24×24 hit area (WCAG 2.5.8)
          'after:absolute after:top-1/2 after:left-1/2 after:size-6 after:-translate-1/2',
          // focus
          THUMB_FOCUS_CLASSES[variant],
          // variant
          THUMB_CLASSES[variant],
          className
        )}
        {...rest}
      />
    );
  }
);
SliderThumb.displayName = 'SliderThumb';

export { SliderRoot as Root, SliderThumb as Thumb };
