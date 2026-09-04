'use client';

import * as React from 'react';
import { useFormContext } from 'react-hook-form';

import { useFormField } from './form-field-context';

function useFormContextSafe() {
  try {
    return useFormContext();
  } catch {
    return null;
  }
}

type UseFormFieldBindingOptions<TValue = string> = {
  /** Override name from FormFieldContext (for secondary fields like currencyName) */
  name?: string;
  /** Transform RHF stored value → component display value */
  parse?: (stored: unknown) => TValue;
  /** Transform component value → RHF stored value */
  format?: (value: TValue) => unknown;
  /** Default when field is undefined */
  defaultValue?: TValue;
  /** setValue options — default: { shouldValidate: true, shouldDirty: true } */
  setValueOptions?: { shouldValidate?: boolean; shouldDirty?: boolean };
};

/**
 * Auto-binds a component to React Hook Form via FormFieldContext.
 * Returns `{ value, onChange }` when inside a FormField.Root with a name
 * and a FormProvider, or `null` otherwise.
 */
function useFormFieldBinding<TValue = string>(
  options?: UseFormFieldBindingOptions<TValue>
): { value: TValue; onChange: (value: TValue) => void } | null {
  const formField = useFormField();
  const form = useFormContextSafe();
  const name = options?.name ?? formField.name;

  const onChange = React.useCallback(
    (v: TValue) => {
      if (!name || !form) return;
      const stored = options?.format ? options.format(v) : v;
      form.setValue(name, stored, {
        shouldValidate: true,
        shouldDirty: true,
        ...options?.setValueOptions,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [name, form, options?.format, options?.setValueOptions]
  );

  if (!name || !form) return null;

  const raw = form.watch(name);
  const value = options?.parse ? options.parse(raw) : (raw as TValue);

  return { value: value ?? (options?.defaultValue as TValue), onChange };
}

export { useFormFieldBinding, useFormContextSafe };
export type { UseFormFieldBindingOptions };
