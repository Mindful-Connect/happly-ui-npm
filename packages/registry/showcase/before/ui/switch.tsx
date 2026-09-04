'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { useFormField } from '../lib/form-field-context';
import { cn } from '../lib/happly-ui-utils';
import { useFormFieldBinding } from '../lib/use-form-field-binding';

const CHECKED_CLASSES = {
  primary: [
    'group-data-[state=checked]/switch:bg-primary-base',
    'group-hover:data-[state=checked]/switch:bg-primary-darker',
    'group-active:data-[state=checked]/switch:bg-primary-base',
  ],
  neutral: [
    'group-data-[state=checked]/switch:bg-static-black',
    'group-hover:data-[state=checked]/switch:bg-static-black',
    'group-active:data-[state=checked]/switch:bg-static-black',
  ],
} as const;

const SwitchRoot = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    variant?: 'primary' | 'neutral';
  }
>(
  (
    {
      className,
      disabled: disabledProp,
      variant = 'primary',
      checked: checkedProp,
      onCheckedChange: onCheckedChangeProp,
      ...rest
    },
    forwardedRef
  ) => {
    const formField = useFormField();
    const binding = useFormFieldBinding<boolean>();
    const disabled = disabledProp ?? formField.disabled;

    // Priority: explicit props > RHF binding > undefined (Radix uncontrolled)
    const checked = checkedProp !== undefined ? checkedProp : binding?.value;
    const onCheckedChange = onCheckedChangeProp ?? binding?.onChange;

    const checkedClasses = CHECKED_CLASSES[variant];

    return (
      <SwitchPrimitives.Root
        className={cn(
          'group/switch block h-5 w-8 shrink-0 p-0.5 outline-none focus:outline-none',
          className
        )}
        ref={forwardedRef}
        disabled={disabled}
        checked={checked}
        onCheckedChange={onCheckedChange}
        {...rest}
      >
        <div
          className={cn(
            // base
            'bg-bg-soft-200 h-4 w-7 rounded-full p-0.5 outline-none',
            'transition duration-200 ease-out',
            !disabled && [
              // hover
              'group-hover/switch:bg-bg-sub-300',
              // focus
              'group-focus-visible/switch:bg-bg-sub-300',
              // pressed
              'group-active/switch:bg-bg-soft-200',
              // variant-specific checked states
              checkedClasses,
              // focus
              'group-focus/switch:outline-none',
            ],
            // disabled
            disabled && [
              'bg-bg-white-0 ring-stroke-soft-200 p-[3px] ring-1 ring-inset',
            ]
          )}
        >
          <SwitchPrimitives.Thumb
            className={cn(
              // base
              'pointer-events-none relative block h-3 w-3',
              'transition-transform duration-200 ease-out',
              // checked
              'data-[state=checked]:translate-x-3',
              !disabled && [
                // before
                'before:bg-static-white before:absolute before:inset-y-0 before:left-1/2 before:w-3 before:-translate-x-1/2 before:rounded-full',
                // after
                'after:shadow-switch-thumb after:absolute after:inset-y-0 after:left-1/2 after:w-3 after:-translate-x-1/2 after:rounded-full',
                // pressed
                'group-active/switch:scale-[.833]',
              ],
              // disabled
              disabled && [
                'bg-bg-soft-200 h-2.5 w-2.5 rounded-full shadow-none',
              ]
            )}
          />
        </div>
      </SwitchPrimitives.Root>
    );
  }
);
SwitchRoot.displayName = 'SwitchRoot';

export { SwitchRoot as Root };
