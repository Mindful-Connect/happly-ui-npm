'use client';

import * as React from 'react';

import { FormFieldContext, useFormField } from '@/lib/form-field-context';
import { useFormFieldBinding } from '@/lib/use-form-field-binding';

import * as Input from './input';
import * as Select from './select';

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

    const handleInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/[^0-9.]/g, '');
        onValueChange?.(val);
      },
      [onValueChange]
    );

    return (
      <Input.Root size={size} hasError={resolvedHasError}>
        <Input.Wrapper>
          <Input.InlineAffix>{symbol}</Input.InlineAffix>
          <Input.Input
            ref={forwardedRef}
            inputMode='decimal'
            placeholder={placeholder}
            value={value}
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
            <Select.Content>
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
