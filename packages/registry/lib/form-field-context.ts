'use client';

import * as React from 'react';

type FormFieldContextValue = {
  hasError: boolean;
  disabled: boolean;
  id?: string;
  name?: string;
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
