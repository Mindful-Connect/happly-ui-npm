'use client';

import * as React from 'react';
import { type FieldError } from 'react-hook-form';

import * as Hint from '@/components/ui/hint';
import * as Label from '@/components/ui/label';
import {
  FormFieldContext,
  useFormField,
  type FormFieldContextValue,
} from '@/lib/form-field-context';
import { cn } from '@/lib/happly-ui-utils';
import { useFormContextSafe } from '@/lib/use-form-field-binding';

function getFieldError(
  errors: Record<string, any>,
  name: string
): FieldError | undefined {
  return name.split('.').reduce((obj, key) => obj?.[key], errors) as
    | FieldError
    | undefined;
}

type FormFieldRootProps = React.HTMLAttributes<HTMLDivElement> & {
  name?: string;
  label?: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  labelClassName?: string;
  labelSub?: React.ReactNode;
  labelSubParens?: boolean;
  labelInfo?: React.ReactNode;
  labelInfoLabel?: string;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  hasError?: boolean;
  disabled?: boolean;
};

function FormFieldRoot({
  className,
  children,
  name,
  label,
  htmlFor,
  required,
  labelClassName,
  labelSub,
  labelSubParens,
  labelInfo,
  labelInfoLabel,
  hint,
  error,
  hasError,
  disabled,
  ...rest
}: FormFieldRootProps) {
  const form = useFormContextSafe();
  const fallbackId = React.useId();

  const fieldError =
    name && form ? getFieldError(form.formState.errors, name) : undefined;
  const resolvedError = error ?? fieldError?.message;
  const computedHasError = hasError || !!resolvedError;
  const resolvedId = htmlFor ?? name;
  // Stable id so a control can point `aria-describedby` at the hint/error.
  const messageId = `${resolvedId ?? fallbackId}-message`;

  const onBlur = React.useCallback(() => {
    if (name && form) {
      form.trigger(name);
    }
  }, [name, form]);

  const contextValue = React.useMemo<FormFieldContextValue>(
    () => ({
      hasError: computedHasError,
      disabled: !!disabled,
      id: resolvedId,
      name,
      required: !!required,
      // Only advertise the message id while a hint or error is actually rendered.
      describedBy: resolvedError || hint ? messageId : undefined,
      onBlur,
    }),
    [
      computedHasError,
      disabled,
      resolvedId,
      name,
      required,
      resolvedError,
      hint,
      messageId,
      onBlur,
    ]
  );

  return (
    <FormFieldContext.Provider value={contextValue}>
      <div className={cn('flex flex-col gap-2', className)} {...rest}>
        {label && (
          <Label.Composed
            htmlFor={resolvedId}
            required={required}
            sub={labelSub}
            subParens={labelSubParens}
            info={labelInfo}
            infoLabel={labelInfoLabel}
            disabled={disabled}
            className={labelClassName}
          >
            {label}
          </Label.Composed>
        )}
        {children}
        {resolvedError && (
          <FormFieldError id={messageId}>{resolvedError}</FormFieldError>
        )}
        {hint && !resolvedError && (
          <Hint.Composed
            id={messageId}
            hasError={computedHasError}
            disabled={disabled}
          >
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
  }
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
