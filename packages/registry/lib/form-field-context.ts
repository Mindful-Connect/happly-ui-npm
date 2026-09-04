'use client';

import * as React from 'react';

type FormFieldContextValue = {
  hasError: boolean;
  disabled: boolean;
  id?: string;
  name?: string;
  /** Whether the field is required; controls set `aria-required` from it. */
  required?: boolean;
  /**
   * Id of the hint or error element currently rendered under the field.
   * Controls point `aria-describedby` at it so the message is announced with the field.
   */
  describedBy?: string;
  /** Triggers validation for this field. No-op if not in a RHF context. */
  onBlur?: () => void;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({
  hasError: false,
  disabled: false,
});

function useFormField() {
  return React.useContext(FormFieldContext);
}

export { FormFieldContext, useFormField, type FormFieldContextValue };
