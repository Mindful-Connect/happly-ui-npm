'use client';

import * as React from 'react';

import * as Input from './input';
import * as Select from './select';

type CurrencyOption = {
  code: string;
  symbol: string;
  label: string;
  icon?: string;
};

const defaultCurrencies: CurrencyOption[] = [
  { code: 'CAD', symbol: '$', label: 'CAD', icon: 'https://mindful-connect.github.io/circle-flags/flags/ca.svg' },
  { code: 'USD', symbol: '$', label: 'USD', icon: 'https://mindful-connect.github.io/circle-flags/flags/us.svg' },
  { code: 'EUR', symbol: '€', label: 'EUR', icon: 'https://mindful-connect.github.io/circle-flags/flags/eu.svg' },
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
};

const CurrencyInputRoot = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    {
      value,
      onValueChange,
      currency: controlledCurrency,
      defaultCurrency = 'CAD',
      onCurrencyChange,
      currencies = defaultCurrencies,
      currencySymbol,
      size,
      hasError,
      placeholder = '0.00',
      disabled,
      ...rest
    },
    forwardedRef,
  ) => {
    const [uncontrolledCurrency, setUncontrolledCurrency] =
      React.useState(defaultCurrency);

    const isCurrencyControlled = controlledCurrency !== undefined;
    const activeCurrency = isCurrencyControlled
      ? controlledCurrency
      : uncontrolledCurrency;

    const activeOption = currencies.find((c) => c.code === activeCurrency);
    const symbol = currencySymbol ?? activeOption?.symbol ?? '';

    const handleCurrencyChange = React.useCallback(
      (code: string) => {
        if (!isCurrencyControlled) {
          setUncontrolledCurrency(code);
        }
        onCurrencyChange?.(code);
      },
      [isCurrencyControlled, onCurrencyChange],
    );

    const handleInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/[^0-9.]/g, '');
        onValueChange?.(val);
      },
      [onValueChange],
    );

    return (
      <Input.Root size={size} hasError={hasError}>
        <Input.Wrapper>
          <Input.InlineAffix>{symbol}</Input.InlineAffix>
          <Input.Input
            ref={forwardedRef}
            inputMode='decimal'
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
            disabled={disabled}
            {...rest}
          />
        </Input.Wrapper>
        <Select.Root
          variant='compactForInput'
          value={activeCurrency}
          onValueChange={handleCurrencyChange}
          disabled={disabled}
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
      </Input.Root>
    );
  },
);
CurrencyInputRoot.displayName = 'CurrencyInputRoot';

export { CurrencyInputRoot as Root, type CurrencyOption };
