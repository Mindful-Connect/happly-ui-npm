'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { useFormField } from '@/lib/form-field-context';
import { cn } from '@/lib/happly-ui-utils';
import { useFormFieldBinding } from '@/lib/use-form-field-binding';

type RadioVariant = 'primary' | 'neutral';

const RadioContext = React.createContext<RadioVariant>('primary');

const INDICATOR_CLASSES = {
  primary: [
    'stroke-primary-base',
    'group-hover/radio:stroke-primary-darker',
    'group-focus-visible/radio:stroke-primary-dark',
  ],
  neutral: [
    'stroke-text-strong-950',
    'group-hover/radio:stroke-text-strong-950',
    'group-focus-visible/radio:stroke-text-strong-950',
  ],
} as const;

const OUTER_CLASSES = {
  primary: ['group-focus-visible/radio:fill-primary-base'],
  neutral: ['group-focus-visible/radio:fill-text-strong-950'],
} as const;

// Ring drawn on a ::before box matching the 16px visual circle — the fill
// swap alone is not a visible focus indicator.
const FOCUS_RING_CLASSES = {
  primary: 'focus-visible:before:shadow-button-primary-focus',
  neutral: 'focus-visible:before:shadow-button-important-focus',
} as const;

const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & {
    variant?: RadioVariant;
  }
>(
  (
    {
      variant = 'primary',
      value: valueProp,
      onValueChange: onValueChangeProp,
      disabled: disabledProp,
      'aria-describedby': ariaDescribedBy,
      'aria-required': ariaRequired,
      ...rest
    },
    forwardedRef
  ) => {
    const formField = useFormField();
    const binding = useFormFieldBinding<string>();
    const disabled = disabledProp ?? formField.disabled;

    // The group is the labelled control (role="radiogroup"), so the field's
    // hint/error and its required state are announced here, not per item.
    const describedBy =
      [ariaDescribedBy, formField.describedBy].filter(Boolean).join(' ') ||
      undefined;
    const required = ariaRequired ?? (formField.required || undefined);

    // Priority: explicit props > RHF binding > undefined (Radix uncontrolled)
    const value = valueProp !== undefined ? valueProp : binding?.value;
    const onValueChange = onValueChangeProp ?? binding?.onChange;

    return (
      <RadioContext.Provider value={variant}>
        <RadioGroupPrimitive.Root
          ref={forwardedRef}
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          aria-describedby={describedBy}
          aria-required={required}
          {...rest}
        />
      </RadioContext.Provider>
    );
  }
);
RadioGroup.displayName = 'RadioGroup';

const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...rest }, forwardedRef) => {
  const filterId = React.useId();
  const variant = React.useContext(RadioContext);
  const indicatorClasses = INDICATOR_CLASSES[variant];
  const outerClasses = OUTER_CLASSES[variant];

  return (
    <RadioGroupPrimitive.Item
      ref={forwardedRef}
      className={cn(
        'group/radio relative h-5 w-5 shrink-0 outline-none',
        // 24×24 hit area around the 20px visual (WCAG 2.5.8)
        'after:absolute after:-inset-0.5',
        // focus ring on the 16px visual circle
        'before:pointer-events-none before:absolute before:top-1/2 before:left-1/2 before:size-4 before:-translate-1/2 before:rounded-full',
        FOCUS_RING_CLASSES[variant],
        className
      )}
      {...rest}
    >
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
      >
        <circle
          cx='10'
          cy='10'
          r='8'
          className={cn(
            'fill-bg-soft-200 transition-[fill] duration-150 ease-out',
            // hover
            'group-hover/radio:fill-bg-sub-300',
            // focus
            outerClasses,
            // disabled + unchecked — checked keeps the white base for the gray ring;
            // stacked group-data variants would compile to nested groups
            'group-[[data-disabled][data-state=unchecked]]/radio:fill-bg-soft-200',
            // checked
            'group-data-[state=checked]/radio:fill-bg-white-0'
          )}
        />
        <g filter={`url(#${filterId})`}>
          <circle
            cx='10'
            cy='10'
            r='6.5'
            className={cn(
              'fill-bg-white-0',
              // disabled
              'group-disabled/radio:hidden'
            )}
          />
        </g>
        <defs>
          <filter
            id={filterId}
            x='1.5'
            y='3.5'
            width='17'
            height='17'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='2' />
            <feGaussianBlur stdDeviation='1' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.105882 0 0 0 0 0.109804 0 0 0 0 0.113725 0 0 0 0.12 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow'
              result='shape'
            />
          </filter>
        </defs>
      </svg>

      <RadioGroupPrimitive.Indicator asChild>
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        >
          <circle
            cx='10'
            cy='10'
            r='6'
            strokeWidth='4'
            className={cn(
              'transition-[stroke] duration-150 ease-out',
              // variant
              indicatorClasses,
              // disabled
              'group-disabled/radio:stroke-bg-sub-300'
            )}
          />
        </svg>
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup as Group, RadioGroupItem as Item };
