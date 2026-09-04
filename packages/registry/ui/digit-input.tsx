'use client';

import * as React from 'react';
import OtpInput, { type OTPInputProps } from 'react-otp-input';

import { useFormField } from '@/lib/form-field-context';
import { cn } from '@/lib/happly-ui-utils';
import { useFormFieldBinding } from '@/lib/use-form-field-binding';

type OtpOptions = Omit<OTPInputProps, 'renderInput'>;

type DigitInputProps = {
  className?: string;
  disabled?: boolean;
  hasError?: boolean;
} & OtpOptions;

function DigitInput({
  className,
  disabled,
  hasError,
  value: valueProp,
  onChange: onChangeProp,
  numInputs = 4,
  ...rest
}: DigitInputProps) {
  const formField = useFormField();
  const resolvedHasError = hasError ?? formField.hasError;
  const resolvedDisabled = disabled ?? formField.disabled;
  const binding = useFormFieldBinding<string>();

  // Priority: explicit props > RHF binding > internal state. The internal state
  // matters: without it `<DigitInput.Root />` outside a form had no value source
  // and no change handler, so the slots could not be typed into at all.
  const hasExplicitValue = valueProp !== undefined;
  const hasExplicitOnChange = onChangeProp !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState('');
  const resolvedValue = hasExplicitValue
    ? valueProp
    : (binding?.value ?? uncontrolledValue);

  const resolvedOnChange = React.useCallback(
    (next: string) => {
      if (!hasExplicitValue && !binding) setUncontrolledValue(next);
      if (hasExplicitOnChange) onChangeProp?.(next);
      else binding?.onChange(next);
    },
    [hasExplicitValue, hasExplicitOnChange, onChangeProp, binding]
  );

  return (
    <OtpInput
      value={resolvedValue}
      onChange={resolvedOnChange}
      numInputs={numInputs}
      containerStyle={cn('flex w-full items-center gap-2.5', className)}
      skipDefaultStyles
      renderInput={(inputProps, index) => (
        <DigitInputSlot
          disabled={resolvedDisabled}
          hasError={resolvedHasError}
          {...inputProps}
          // The library ships `inputMode` unset and `autoComplete='off'`, so a
          // phone shows a full keyboard and never offers the SMS code. Only the
          // first slot carries `one-time-code` — the OS fills the rest.
          inputMode='numeric'
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          aria-label={`Digit ${index + 1} of ${numInputs}`}
          // The field's hint/error rides on the first slot — the one focus
          // lands on — rather than repeating on all six.
          aria-describedby={index === 0 ? formField.describedBy : undefined}
          aria-required={
            index === 0 ? formField.required || undefined : undefined
          }
        />
      )}
      {...rest}
    />
  );
}
DigitInput.displayName = 'DigitInput';

const DigitInputSlot = React.forwardRef<
  React.ComponentRef<'input'>,
  React.ComponentPropsWithoutRef<'input'> & {
    hasError?: boolean;
  }
>(({ className, hasError, ...rest }, forwardedRef) => {
  return (
    <input
      ref={forwardedRef}
      className={cn(
        'rounded-10 bg-bg-white-0 text-title-h5 text-text-strong-950 shadow-regular-xs ring-stroke-soft-200 h-16 w-full min-w-0 border-0 text-center tabular-nums ring-1 outline-none ring-inset',
        'transition-[background-color,color,box-shadow] duration-150 ease-out',
        // hover
        'hover:bg-bg-weak-50 hover:shadow-none hover:ring-transparent',
        // focus — bare `focus:` is deliberate here, not an oversight. A slot is
        // a text field, and browsers match `:focus-visible` on text fields for
        // pointer focus too, so `focus-visible:` would be identical; the library
        // also moves focus between slots programmatically as digits are typed
        // and pasted, and the ring has to show for those. Do not "fix" this.
        'focus:shadow-button-important-focus focus:ring-stroke-strong-950 focus:outline-none',
        // selection
        'selection:bg-none',
        // disabled
        'disabled:bg-bg-weak-50 disabled:text-text-disabled-300 disabled:shadow-none disabled:ring-transparent',
        {
          'ring-error-base hover:ring-error-base focus:ring-error-base focus:shadow-button-error-focus':
            hasError,
        },
        className
      )}
      {...rest}
    />
  );
});
DigitInputSlot.displayName = 'DigitInputSlot';

export { DigitInput as Root };
