'use client';

import * as React from 'react';

import { FormFieldContext, useFormField } from '@/lib/form-field-context';
import { useFormFieldBinding } from '@/lib/use-form-field-binding';

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
      ...rest
    },
    forwardedRef
  ) => {
    const formField = useFormField();
    const resolvedHasError = hasError ?? formField.hasError;
    const resolvedDisabled = disabled ?? formField.disabled;

    // Caret preservation: this is a controlled input whose displayed value is
    // reformatted (thousands separators) on every keystroke. Without this, the
    // browser collapses the caret to the END after each controlled re-render, so
    // typing mid-value pushes subsequent characters to the end. We record how
    // many significant chars (digits + decimal point) precede the caret on
    // change, then restore that position once the reformatted value has rendered.
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const pendingCaretRef = React.useRef<number | null>(null);

    const setInputRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef]
    );

    // Amount binding: number ↔ string conversion when valueAsNumber
    const amountBinding = useFormFieldBinding<string>(
      valueAsNumber
        ? {
            parse: (stored: unknown) => (stored != null ? String(stored) : ''),
            format: (val: string) => (val ? Number(val) : undefined),
          }
        : undefined
    );

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

    // Priority: explicit props > RHF binding > internal state
    const value = valueProp !== undefined ? valueProp : amountBinding?.value;
    const onValueChange = onValueChangeProp ?? amountBinding?.onChange;

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

    const handleInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const el = e.target;
        const caret = el.selectionStart ?? el.value.length;
        // Significant chars before the caret = the count to restore after
        // reformatting (formatting only adds/removes commas around these).
        pendingCaretRef.current = stripFormatting(
          el.value.slice(0, caret)
        ).length;

        const raw = stripFormatting(el.value);
        // Prevent multiple decimal points
        const parts = raw.split('.');
        const cleaned =
          parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : raw;
        onValueChange?.(cleaned);
      },
      [onValueChange]
    );

    // Restore the caret after the reformatted display value has rendered. Runs
    // every render but only acts when a change just queued a caret position.
    React.useLayoutEffect(() => {
      const target = pendingCaretRef.current;
      if (target == null) return;
      pendingCaretRef.current = null;

      const el = inputRef.current;
      if (!el) return;

      // Map "target significant chars" back to an index in the formatted string.
      let index = 0;
      if (target > 0) {
        let count = 0;
        index = displayValue.length;
        for (let i = 0; i < displayValue.length; i++) {
          if (/[0-9.]/.test(displayValue[i])) {
            count++;
            if (count === target) {
              index = i + 1;
              break;
            }
          }
        }
      }
      el.setSelectionRange(index, index);
    });

    return (
      <Input.Root size={size} hasError={resolvedHasError}>
        <Input.Wrapper>
          <Input.InlineAffix>{symbol}</Input.InlineAffix>
          <Input.Input
            ref={setInputRef}
            inputMode='decimal'
            placeholder={placeholder}
            value={displayValue}
            onChange={handleInputChange}
            onBlur={() => formField.onBlur?.()}
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
            <Select.Trigger>
              <Select.Value />
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
