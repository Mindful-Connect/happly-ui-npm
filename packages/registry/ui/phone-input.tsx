'use client';

import * as React from 'react';
import parsePhoneNumber, { AsYouType, CountryCode } from 'libphonenumber-js';
import mergeRefs from 'merge-refs';
import {
  CountryIso2,
  defaultCountries,
  parseCountry,
} from 'react-international-phone';

import { FormFieldContext, useFormField } from '@/lib/form-field-context';
import { useFormFieldBinding } from '@/lib/use-form-field-binding';
import { useFormattedCaret } from '@/lib/use-formatted-caret';

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

/**
 * Empty context to isolate the country Select from the parent FormField, the
 * same way `currency-input` isolates its currency Select. Without it the field's
 * hint/error id lands on both the country trigger and the number input, so the
 * message is announced twice while tabbing across one field — and closing the
 * dropdown fires the field's blur validation.
 */
const isolatedFormField = {
  hasError: false,
  disabled: false,
};

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

/** Formatting only adds brackets, spaces and dashes, so digits are the anchor. */
const isDigit = (char: string) => /\d/.test(char);

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
      onBlur: onBlurProp,
      ...rest
    },
    forwardedRef
  ) => {
    const formField = useFormField();
    const resolvedHasError = hasError ?? formField.hasError;
    const resolvedDisabled = disabled ?? formField.disabled;
    const countryLabelId = React.useId();
    const countryValueId = React.useId();

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

    // Caret preservation: this is a controlled input whose displayed value is
    // reformatted ("(416) 555-1234") on every keystroke, which would otherwise
    // collapse the caret to the end after each controlled re-render. Shared
    // with `currency-input` — only the significant-character class differs.
    const { inputRef, queueCaret } = useFormattedCaret(displayValue, isDigit);

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
        const el = e.target;
        const raw = el.value;
        const caret = el.selectionStart ?? raw.length;
        // Digits before the caret = the count to restore after reformatting
        // (formatting only adds/removes brackets, spaces and dashes around them).
        let pendingCaret = raw.slice(0, caret).replace(/\D/g, '').length;

        let iso2 = activeCountryIso2;
        let digits: string;

        if (raw.trimStart().startsWith('+')) {
          // An international number carries its own calling code. Stripping the
          // whole string to digits would leave that code inside the national
          // number and push the last digit past the length cap — "+14165551234"
          // became "(141) 655-5123". Parse the calling code out and switch the
          // country instead. Reached by paste and autofill: a typed "+" never
          // accumulates in a controlled field.
          const formatter = new AsYouType();
          formatter.input(raw);
          const parsedIso2 = formatter.getCountry()?.toLowerCase() as
            | CountryIso2
            | undefined;
          const callingCode = formatter.getCallingCode();
          if (parsedIso2 && findCountry(parsedIso2)) {
            iso2 = parsedIso2;
          } else if (callingCode && callingCode !== activeCountry?.dialCode) {
            // Ambiguous code (+1 is shared): only move off the active country
            // when the pasted code does not match it.
            const match = allCountries.find((c) => c.dialCode === callingCode);
            if (match) iso2 = match.iso2;
          }
          digits = formatter.getNationalNumber();
          // The caret belongs after the national digits, not the calling code.
          pendingCaret = Math.max(0, pendingCaret - (callingCode?.length ?? 0));
        } else {
          digits = raw.replace(/\D/g, '');
          const activeCc = activeCountryIso2.toUpperCase();
          if (
            (activeCc === 'US' || activeCc === 'CA') &&
            digits.length === 11 &&
            digits.startsWith('1')
          ) {
            // A NANP number pasted with its trunk prefix ("14165551234") is 11
            // digits; area codes never start with 1, so the leading 1 is the
            // calling code, not part of the national number.
            digits = digits.slice(1);
            pendingCaret = Math.max(0, pendingCaret - 1);
          }
        }

        const cc = iso2.toUpperCase() as CountryCode;
        const maxLen = cc === 'US' || cc === 'CA' ? 10 : 15;
        if (digits.length > maxLen) digits = digits.slice(0, maxLen);

        if (iso2 !== activeCountryIso2) {
          if (onCountryChange) {
            onCountryChange(iso2);
          } else if (countryBinding) {
            countryBinding.onChange(iso2);
          }
          if (!isCountryControlled && !countryBinding)
            setUncontrolledCountry(iso2);
        }

        const formatted = formatNationalDigits(digits, cc);
        queueCaret(pendingCaret, formatted);
        setDisplayValue(formatted);

        const dialCode = findCountry(iso2)?.dialCode ?? '';
        const e164 = `+${dialCode}${digits}`;
        lastEmittedRef.current = e164;
        onValueChange?.(e164);
      },
      [
        activeCountryIso2,
        activeCountry?.dialCode,
        isCountryControlled,
        onCountryChange,
        countryBinding,
        onValueChange,
        queueCaret,
      ]
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
        {/* Isolate the country Select from the parent FormField so the field's
            hint is not announced on both controls and closing the dropdown
            doesn't fire the number field's blur validation. */}
        <FormFieldContext.Provider value={isolatedFormField}>
          <Select.Root
            variant='compactForInput'
            value={activeCountryIso2}
            onValueChange={handleCountryChange}
            disabled={resolvedDisabled}
          >
            {/* The trigger's only content is the dial code ("+1"), so its
                accessible name was just that value. `aria-label` would
                *replace* it; a visually hidden label referenced alongside the
                value element announces "Country +1" instead. */}
            <Select.Trigger
              aria-labelledby={`${countryLabelId} ${countryValueId}`}
            >
              <span id={countryLabelId} className='sr-only'>
                Country
              </span>
              {activeCountry && (
                <div id={countryValueId} className='flex items-center gap-2'>
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
        </FormFieldContext.Provider>
        <Input.Wrapper>
          <Input.Input
            ref={mergeRefs(forwardedRef, inputRef)}
            type='tel'
            inputMode='tel'
            autoComplete='tel-national'
            // The number is reformatted as it is typed — proportional digits
            // would shift the text under the caret.
            className='tabular-nums'
            placeholder={placeholder}
            value={displayValue}
            onChange={handleInputChange}
            // The country Select is isolated from the FormField above, so the
            // number input is the field's only blur — it has to be the one that
            // triggers validation. A consumer `onBlur` runs alongside it.
            onBlur={(e) => {
              onBlurProp?.(e);
              formField.onBlur?.();
            }}
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
