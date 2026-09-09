'use client';

import * as React from 'react';

import {
  useFormFieldBinding,
  type UseFormFieldBindingOptions,
} from './use-form-field-binding';

/**
 * Resolves a field's value and change handler with one priority order:
 * **explicit prop > React Hook Form binding > internal state.**
 *
 * The internal state is what makes the uncontrolled usage work: without it
 * `<DigitInput.Root />` or `<CurrencyInput.Root />` outside a form has no value
 * source at all, so the control cannot be typed into. Every component that
 * accepts an optional `value`/`onChange` pair alongside `useFormFieldBinding`
 * needs the same three-way resolution, so it lives here rather than in each one.
 *
 * @param valueProp The explicit value prop, or `undefined` when not controlled.
 * @param onChangeProp The explicit change handler, or `undefined`.
 * @param initial Initial internal state, used only outside a form and uncontrolled.
 * @param bindingOptions Forwarded to `useFormFieldBinding` (name, parse/format…).
 */
function useControllableFieldValue<TValue>(
  valueProp: TValue | undefined,
  onChangeProp: ((value: TValue) => void) | undefined,
  initial: TValue,
  bindingOptions?: UseFormFieldBindingOptions<TValue>
): {
  value: TValue;
  onChange: (value: TValue) => void;
  /** True when a React Hook Form binding is driving the value. */
  isFormBound: boolean;
} {
  const binding = useFormFieldBinding<TValue>(bindingOptions);

  const hasExplicitValue = valueProp !== undefined;
  const hasExplicitOnChange = onChangeProp !== undefined;

  const [internalValue, setInternalValue] = React.useState(initial);

  const value = hasExplicitValue
    ? valueProp
    : (binding?.value ?? internalValue);

  const onChange = React.useCallback(
    (next: TValue) => {
      if (!hasExplicitValue && !binding) setInternalValue(next);
      if (hasExplicitOnChange) onChangeProp?.(next);
      else binding?.onChange(next);
    },
    [hasExplicitValue, hasExplicitOnChange, onChangeProp, binding]
  );

  return { value, onChange, isFormBound: binding !== null };
}

export { useControllableFieldValue };
