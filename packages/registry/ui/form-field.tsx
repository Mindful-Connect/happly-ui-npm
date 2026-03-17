'use client';

import * as React from 'react';

import * as Hint from '@/components/ui/hint';
import * as Label from '@/components/ui/label';
import { cn } from '@/lib/happly-ui-utils';

type FormFieldContextValue = {
  hasError: boolean;
  disabled: boolean;
  id?: string;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({
  hasError: false,
  disabled: false,
});

function useFormField() {
  return React.useContext(FormFieldContext);
}

type FormFieldRootProps = React.HTMLAttributes<HTMLDivElement> & {
  label?: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  labelSub?: React.ReactNode;
  labelSubParens?: boolean;
  labelInfo?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  hasError?: boolean;
  disabled?: boolean;
};

function FormFieldRoot({
  className,
  children,
  label,
  htmlFor,
  required,
  labelSub,
  labelSubParens,
  labelInfo,
  hint,
  error,
  hasError,
  disabled,
  ...rest
}: FormFieldRootProps) {
  const computedHasError = hasError || !!error;

  const contextValue = React.useMemo<FormFieldContextValue>(
    () => ({ hasError: computedHasError, disabled: !!disabled, id: htmlFor }),
    [computedHasError, disabled, htmlFor],
  );

  return (
    <FormFieldContext.Provider value={contextValue}>
      <div className={cn('flex flex-col gap-2', className)} {...rest}>
        {label && (
          <Label.Composed
            htmlFor={htmlFor}
            required={required}
            sub={labelSub}
            subParens={labelSubParens}
            info={labelInfo}
            disabled={disabled}
          >
            {label}
          </Label.Composed>
        )}
        {children}
        {error && <FormFieldError>{error}</FormFieldError>}
        {hint && !error && (
          <Hint.Composed hasError={computedHasError} disabled={disabled}>
            {hint}
          </Hint.Composed>
        )}
      </div>
    </FormFieldContext.Provider>
  );
}

type FormFieldLabelProps = Omit<
  React.ComponentPropsWithoutRef<typeof Label.Composed>,
  'disabled'
>;

const FormFieldLabel = React.forwardRef<HTMLLabelElement, FormFieldLabelProps>(
  (props, forwardedRef) => {
    const { disabled, id } = useFormField();
    return (
      <Label.Composed
        ref={forwardedRef}
        htmlFor={id}
        disabled={disabled}
        {...props}
      />
    );
  },
);
FormFieldLabel.displayName = 'FormFieldLabel';

type FormFieldHintProps = Omit<
  React.ComponentPropsWithoutRef<typeof Hint.Composed>,
  'hasError' | 'disabled'
>;

function FormFieldHint(props: FormFieldHintProps) {
  const { hasError, disabled } = useFormField();
  return <Hint.Composed hasError={hasError} disabled={disabled} {...props} />;
}

function FormFieldError({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  if (!children) return null;

  return (
    <Hint.Composed role='alert' hasError className={className} {...rest}>
      {children}
    </Hint.Composed>
  );
}

export {
  FormFieldRoot as Root,
  FormFieldLabel as Label,
  FormFieldHint as Hint,
  FormFieldError as Error,
  useFormField,
};
