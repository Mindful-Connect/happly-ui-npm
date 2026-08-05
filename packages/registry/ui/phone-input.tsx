'use client';

import * as React from 'react';
import parsePhoneNumber, { AsYouType, CountryCode } from 'libphonenumber-js';
import {
  CountryIso2,
  defaultCountries,
  parseCountry,
} from 'react-international-phone';

import { useFormField } from '@/lib/form-field-context';
import { useFormFieldBinding } from '@/lib/use-form-field-binding';

import * as Input from './input';
import * as Select from './select';

const FLAG_URL = 'https://mindful-connect.github.io/circle-flags/flags';

type CountryOption = {
  iso2: CountryIso2;
  name: string;
  dialCode: string;
};

const allCountries: CountryOption[] = defaultCountries.map((c) => {
  const parsed = parseCountry(c);
  return { iso2: parsed.iso2, name: parsed.name, dialCode: parsed.dialCode };
});

const findCountry = (iso2: CountryIso2): CountryOption | undefined =>
  allCountries.find((c) => c.iso2 === iso2);

const defaultPreferredCountries: CountryIso2[] = ['ca', 'us', 'fr'];

type PhoneInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'size' | 'onChange'
> & {
  value?: string;
  onValueChange?: (e164: string) => void;
  country?: CountryIso2;
  defaultCountry?: CountryIso2;
  onCountryChange?: (iso2: CountryIso2) => void;
  preferredCountries?: CountryIso2[];
  size?: 'medium' | 'small' | 'xsmall';
  hasError?: boolean;
  /** RHF field name for the country code (enables auto-binding for country) */
  countryName?: string;
};

const formatNorthAmericanNationalNumber = (digits: string): string => {
  if (!digits) return '';
  const len = digits.length;
  if (len === 0) return '';
  if (len <= 3) return `(${digits}`;
  if (len <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};

const formatNationalDigits = (
  digits: string,
  countryCode: CountryCode
): string => {
  if (!digits) return '';
  if (countryCode === 'US' || countryCode === 'CA') {
    return formatNorthAmericanNationalNumber(digits);
  }
  const formatter = new AsYouType(countryCode);
  formatter.input(digits);
  const formatted = formatter.getNationalNumber();
  return formatted || digits;
};

const PhoneInputRoot = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      value: valueProp,
      onValueChange: onValueChangeProp,
      country: controlledCountry,
      defaultCountry = 'ca',
      onCountryChange,
      preferredCountries = defaultPreferredCountries,
      size,
      hasError,
      placeholder = '(555) 000-0000',
      disabled,
      countryName,
      ...rest
    },
    forwardedRef
  ) => {
    const formField = useFormField();
    const resolvedHasError = hasError ?? formField.hasError;
    const resolvedDisabled = disabled ?? formField.disabled;

    // Phone value binding (e164 string)
    const phoneBinding = useFormFieldBinding<string>();

    // Country binding: auto-bind to countryName if provided
    const countryBinding = useFormFieldBinding<CountryIso2>(
      countryName
        ? {
            name: countryName,
            defaultValue: defaultCountry,
            setValueOptions: { shouldValidate: false, shouldDirty: true },
          }
        : undefined
    );

    // Priority: explicit props > RHF binding > undefined
    const value = valueProp !== undefined ? valueProp : phoneBinding?.value;
    const onValueChange = onValueChangeProp ?? phoneBinding?.onChange;

    const [uncontrolledCountry, setUncontrolledCountry] =
      React.useState<CountryIso2>(defaultCountry);
    const [displayValue, setDisplayValue] = React.useState('');
    const lastEmittedRef = React.useRef<string>('');

    const isCountryControlled = controlledCountry !== undefined;
    const activeCountryIso2 = isCountryControlled
      ? controlledCountry
      : (countryBinding?.value ?? uncontrolledCountry);
    const activeCountry = findCountry(activeCountryIso2);

    // Sync display from external value prop
    React.useEffect(() => {
      if (value === undefined || value === lastEmittedRef.current) return;

      // Without a fallback country, a national-format value (e.g. "4165551234") parses to
      // undefined and neither branch below runs, leaving the field silently blank.
      const parsed = parsePhoneNumber(
        value,
        activeCountryIso2.toUpperCase() as CountryCode
      );
      if (parsed && parsed.nationalNumber) {
        const countryIso2 = (parsed.country?.toLowerCase() ??
          activeCountryIso2) as CountryIso2;
        if (countryIso2 !== activeCountryIso2 && findCountry(countryIso2)) {
          if (!isCountryControlled) setUncontrolledCountry(countryIso2);
          onCountryChange?.(countryIso2);
        }
        const cc = (parsed.country ?? countryIso2.toUpperCase()) as CountryCode;
        setDisplayValue(formatNationalDigits(parsed.nationalNumber, cc));
      } else if (!value || value === `+${activeCountry?.dialCode ?? ''}`) {
        setDisplayValue('');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const handleCountryChange = React.useCallback(
      (iso2: string) => {
        const newIso2 = iso2 as CountryIso2;
        if (onCountryChange) {
          onCountryChange(newIso2);
        } else if (countryBinding) {
          countryBinding.onChange(newIso2);
        }
        if (!isCountryControlled && !countryBinding)
          setUncontrolledCountry(newIso2);

        const digits = displayValue.replace(/\D/g, '');
        const countryData = findCountry(newIso2);
        if (countryData) {
          const cc = newIso2.toUpperCase() as CountryCode;
          const maxLen = cc === 'US' || cc === 'CA' ? 10 : 15;
          const trimmed = digits.slice(0, maxLen);
          const e164 = `+${countryData.dialCode}${trimmed}`;
          setDisplayValue(formatNationalDigits(trimmed, cc));
          lastEmittedRef.current = e164;
          onValueChange?.(e164);
        }
      },
      [
        displayValue,
        isCountryControlled,
        onCountryChange,
        countryBinding,
        onValueChange,
      ]
    );

    const handleInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        let digits = e.target.value.replace(/\D/g, '');
        const cc = activeCountryIso2.toUpperCase() as CountryCode;
        const maxLen = cc === 'US' || cc === 'CA' ? 10 : 15;
        if (digits.length > maxLen) digits = digits.slice(0, maxLen);

        const formatted = formatNationalDigits(digits, cc);
        setDisplayValue(formatted);

        const dialCode = activeCountry?.dialCode ?? '';
        const e164 = `+${dialCode}${digits}`;
        lastEmittedRef.current = e164;
        onValueChange?.(e164);
      },
      [activeCountryIso2, activeCountry?.dialCode, onValueChange]
    );

    const preferred = React.useMemo(
      () => allCountries.filter((c) => preferredCountries.includes(c.iso2)),
      [preferredCountries]
    );
    const others = React.useMemo(
      () => allCountries.filter((c) => !preferredCountries.includes(c.iso2)),
      [preferredCountries]
    );

    return (
      <Input.Root size={size} hasError={resolvedHasError}>
        <Select.Root
          variant='compactForInput'
          value={activeCountryIso2}
          onValueChange={handleCountryChange}
          disabled={resolvedDisabled}
        >
          <Select.Trigger>
            {activeCountry && (
              <div className='flex items-center gap-2'>
                <div
                  className='h-5 w-5 shrink-0 rounded-full bg-cover bg-center bg-no-repeat group-disabled/trigger:opacity-[.48]'
                  style={{
                    backgroundImage: `url(${FLAG_URL}/${activeCountryIso2}.svg)`,
                  }}
                />
                <span>+{activeCountry.dialCode}</span>
              </div>
            )}
          </Select.Trigger>
          <Select.Content>
            {preferred.map((c) => (
              <Select.Item key={c.iso2} value={c.iso2}>
                <Select.ItemIcon
                  className='rounded-full bg-cover bg-center bg-no-repeat'
                  style={{
                    backgroundImage: `url(${FLAG_URL}/${c.iso2}.svg)`,
                  }}
                />
                {c.name} (+{c.dialCode})
              </Select.Item>
            ))}
            {preferred.length > 0 && others.length > 0 && (
              <Select.Separator className='bg-stroke-soft-200 mx-2 my-1 h-px' />
            )}
            {others.map((c) => (
              <Select.Item key={c.iso2} value={c.iso2}>
                <Select.ItemIcon
                  className='rounded-full bg-cover bg-center bg-no-repeat'
                  style={{
                    backgroundImage: `url(${FLAG_URL}/${c.iso2}.svg)`,
                  }}
                />
                {c.name} (+{c.dialCode})
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
        <Input.Wrapper>
          <Input.Input
            ref={forwardedRef}
            type='tel'
            inputMode='tel'
            autoComplete='tel-national'
            placeholder={placeholder}
            value={displayValue}
            onChange={handleInputChange}
            disabled={resolvedDisabled}
            {...rest}
          />
        </Input.Wrapper>
      </Input.Root>
    );
  }
);
PhoneInputRoot.displayName = 'PhoneInputRoot';

export { PhoneInputRoot as Root, type PhoneInputProps, type CountryOption };
