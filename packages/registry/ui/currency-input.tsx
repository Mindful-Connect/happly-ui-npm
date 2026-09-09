'use client';

import * as React from 'react';
import mergeRefs from 'merge-refs';

import { FormFieldContext, useFormField } from '@/lib/form-field-context';
import { useControllableFieldValue } from '@/lib/use-controllable-field-value';
import { useFormFieldBinding } from '@/lib/use-form-field-binding';
import { useFormattedCaret } from '@/lib/use-formatted-caret';

import * as Input from './input';
import * as Select from './select';

/**
 * Format a numeric string with thousands separators.
 * Keeps the decimal portion as-is to avoid interfering while typing.
 */
function formatDisplay(raw: string): string {
  if (!raw) return '';
  const [intPart, ...decParts] = raw.split('.');
  const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decParts.length > 0 ? `${formatted}.${decParts.join('')}` : formatted;
}

/**
 * Strip formatting characters to get a clean numeric string.
 */
function stripFormatting(val: string): string {
  return val.replace(/[^0-9.]/g, '');
}

/** Formatting only adds thousands separators, so digits and `.` are the anchor. */
const isSignificantChar = (char: string) => /[0-9.]/.test(char);

/** Empty context to isolate the currency Select from the parent FormField */
const isolatedFormField = {
  hasError: false,
  disabled: false,
};

type CurrencyOption = {
  code: string;
  symbol: string;
  label: string;
  icon?: string;
};

const defaultCurrencies: CurrencyOption[] = [
  {
    code: 'CAD',
    symbol: '$',
    label: 'CAD',
    icon: 'https://mindful-connect.github.io/circle-flags/flags/ca.svg',
  },
  {
    code: 'USD',
    symbol: '$',
    label: 'USD',
    icon: 'https://mindful-connect.github.io/circle-flags/flags/us.svg',
  },
  {
    code: 'EUR',
    symbol: '€',
    label: 'EUR',
    icon: 'https://mindful-connect.github.io/circle-flags/flags/eu.svg',
  },
];

type CurrencyInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'size'
> & {
  value?: string;
  onValueChange?: (amount: string) => void;
  currency?: string;
  defaultCurrency?: string;
  onCurrencyChange?: (currency: string) => void;
  currencies?: CurrencyOption[];
  currencySymbol?: string;
  size?: 'medium' | 'small' | 'xsmall';
  hasError?: boolean;
  /** RHF field name for the currency code (enables auto-binding for currency) */
  currencyName?: string;
  /** When true (default), auto-binding stores numbers and displays strings */
  valueAsNumber?: boolean;
};

const CurrencyInputRoot = React.forwardRef<
  HTMLInputElement,
  CurrencyInputProps
>(
  (
    {
      value: valueProp,
      onValueChange: onValueChangeProp,
      currency: controlledCurrency,
      defaultCurrency = 'CAD',
      onCurrencyChange,
      currencies = defaultCurrencies,
      currencySymbol,
      size,
      hasError,
      placeholder = '0.00',
      disabled,
      currencyName,
      valueAsNumber = true,
      onBlur: onBlurProp,
      ...rest
    },
    forwardedRef
  ) => {
    const formField = useFormField();
    const currencyLabelId = React.useId();
    const currencyValueId = React.useId();
    const resolvedHasError = hasError ?? formField.hasError;
    const resolvedDisabled = disabled ?? formField.disabled;

    // Currency binding: auto-bind to currencyName if provided
    const currencyBinding = useFormFieldBinding<string>(
      currencyName
        ? {
            name: currencyName,
            defaultValue: defaultCurrency,
            setValueOptions: { shouldValidate: false, shouldDirty: true },
          }
        : undefined
    );

    // Amount: explicit props > RHF binding (number ↔ string when valueAsNumber)
    // > internal state. The internal state matters: without it
    // `<CurrencyInput.Root />` — the documented uncontrolled usage — has no
    // value source at all, so the amount never changes and the field cannot be
    // typed into.
    const { value, onChange: onValueChange } =
      useControllableFieldValue<string>(
        valueProp,
        onValueChangeProp,
        '',
        valueAsNumber
          ? {
              parse: (stored: unknown) =>
                stored != null ? String(stored) : '',
              format: (val: string) => (val ? Number(val) : undefined),
            }
          : undefined
      );

    const [uncontrolledCurrency, setUncontrolledCurrency] =
      React.useState(defaultCurrency);

    const isCurrencyControlled = controlledCurrency !== undefined;
    const activeCurrency = isCurrencyControlled
      ? controlledCurrency
      : (currencyBinding?.value ?? uncontrolledCurrency);

    const activeOption = currencies.find((c) => c.code === activeCurrency);
    const symbol = currencySymbol ?? activeOption?.symbol ?? '';

    const handleCurrencyChange = React.useCallback(
      (code: string) => {
        if (onCurrencyChange) {
          onCurrencyChange(code);
        } else if (currencyBinding) {
          currencyBinding.onChange(code);
        } else {
          setUncontrolledCurrency(code);
        }
      },
      [onCurrencyChange, currencyBinding]
    );

    const displayValue = React.useMemo(
      () => formatDisplay(value ?? ''),
      [value]
    );

    // Caret preservation: this is a controlled input whose displayed value is
    // reformatted (thousands separators) on every keystroke, which would
    // otherwise collapse the caret to the end after each controlled re-render.
    // Shared with `phone-input` — only the significant-character class differs.
    const { inputRef, queueCaret } = useFormattedCaret(
      displayValue,
      isSignificantChar
    );

    const handleInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const el = e.target;
        const caret = el.selectionStart ?? el.value.length;
        // Significant chars before the caret = the count to restore after
        // reformatting (formatting only adds/removes commas around these).
        const significantBeforeCaret = stripFormatting(
          el.value.slice(0, caret)
        ).length;

        const raw = stripFormatting(el.value);
        // Prevent multiple decimal points
        const parts = raw.split('.');
        const cleaned =
          parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : raw;

        queueCaret(significantBeforeCaret, formatDisplay(cleaned));
        onValueChange?.(cleaned);
      },
      [onValueChange, queueCaret]
    );

    return (
      <Input.Root size={size} hasError={resolvedHasError}>
        <Input.Wrapper>
          <Input.InlineAffix>{symbol}</Input.InlineAffix>
          <Input.Input
            ref={mergeRefs(forwardedRef, inputRef)}
            inputMode='decimal'
            // The amount is reformatted on every keystroke — proportional
            // digits would shift the caret's neighbours as it grows.
            className='tabular-nums'
            placeholder={placeholder}
            value={displayValue}
            onChange={handleInputChange}
            // The currency Select is isolated from the FormField below, so the
            // amount input is the field's only blur — it has to be the one that
            // triggers validation. A consumer `onBlur` runs alongside it rather
            // than replacing it (it used to win outright via `{...rest}`).
            onBlur={(e) => {
              onBlurProp?.(e);
              formField.onBlur?.();
            }}
            disabled={resolvedDisabled}
            {...rest}
          />
        </Input.Wrapper>
        {/* Isolate the currency Select from the parent FormField so closing
            the dropdown doesn't trigger validation on the amount field */}
        <FormFieldContext.Provider value={isolatedFormField}>
          <Select.Root
            variant='compactForInput'
            value={activeCurrency}
            onValueChange={handleCurrencyChange}
            disabled={resolvedDisabled}
          >
            {/* The trigger's only content is the code ("CAD"), so its
                accessible name was just the value. `aria-label` would *replace*
                that value; a visually hidden label referenced alongside the
                value element announces "Currency CAD" instead. */}
            <Select.Trigger
              aria-labelledby={`${currencyLabelId} ${currencyValueId}`}
            >
              <span id={currencyLabelId} className='sr-only'>
                Currency
              </span>
              <Select.Value id={currencyValueId} />
            </Select.Trigger>
            <Select.Content className='z-[999]'>
              {currencies.map((item) => (
                <Select.Item key={item.code} value={item.code}>
                  {item.icon && (
                    <Select.ItemIcon
                      style={{
                        backgroundImage: `url(${item.icon})`,
                      }}
                    />
                  )}
                  {item.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </FormFieldContext.Provider>
      </Input.Root>
    );
  }
);
CurrencyInputRoot.displayName = 'CurrencyInputRoot';

export { CurrencyInputRoot as Root, type CurrencyOption };
