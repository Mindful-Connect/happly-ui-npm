import 'react-international-phone/style.css';
import 'flag-icons/css/flag-icons.min.css';
import parsePhoneNumber, { AsYouType, CountryCode } from 'libphonenumber-js';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  CountryIso2,
  defaultCountries,
  parseCountry,
  ParsedCountry,
  usePhoneInput,
} from 'react-international-phone';
import { cn } from '@/lib/utils';
import { ChevronDownIcon } from 'lucide-react';
import { Listbox } from '@headlessui/react';

const COMPONENT_NAME = 'PhoneInput';

interface PhoneInputProps {
  inputValue?: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  defaultCountryIso2?: CountryIso2;
  placeholder?: string;
  className?: string; // Added className prop support
}

function PhoneInput({
  inputValue: propInputValue = '',
  onChange,
  readOnly,
  defaultCountryIso2 = 'ca',
  placeholder = '(555) 000-0000',
  className,
}: PhoneInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  // Displayed value (formatted)
  const [displayedValue, setDisplayedValue] = useState<string>('');
  // Internal E.164 value (source of truth for logic)
  const [internalFullPhone, setInternalFullPhone] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);

  // Use the hook primarily for country state and initial value processing
  const { country, setCountry } = usePhoneInput({
    defaultCountry: defaultCountryIso2,
    value: propInputValue,
    countries: defaultCountries,
  });

  useEffect(() => {
    // prevents loop if parent passes back the value from onChange
    if (propInputValue === internalFullPhone) {
      return;
    }

    const parsed = parsePhoneNumber(propInputValue);
    let newInternalFull = '';
    let newNationalDigits = '';
    let newCountryIso2 = defaultCountryIso2;

    if (parsed && parsed.isValid()) {
      newInternalFull = parsed.number; // E.164
      newNationalDigits = parsed.nationalNumber;
      newCountryIso2 = (parsed.country?.toLowerCase() ??
        defaultCountryIso2) as CountryIso2;
    } else {
      const currentCountryData =
        findCountryByIso2(country.iso2) ??
        findCountryByIso2(defaultCountryIso2)!;
      const dialCode = currentCountryData.dialCode;
      newInternalFull = `+${dialCode}`;
      newCountryIso2 = currentCountryData.iso2;

      const digitsOnly = propInputValue.replace(/\D/g, '');
      if (digitsOnly.startsWith(dialCode)) {
        newNationalDigits = digitsOnly.substring(dialCode.length);
        newInternalFull += newNationalDigits;
      } else if (!propInputValue.startsWith('+') && digitsOnly.length > 0) {
        newNationalDigits = digitsOnly;
        newInternalFull += newNationalDigits;
      }
    }

    // Update internal E.164 state
    setInternalFullPhone(newInternalFull);

    if (newCountryIso2 !== country.iso2) {
      const countryExists = !!findCountryByIso2(newCountryIso2);
      if (countryExists) {
        setCountry(newCountryIso2);
      }
    }

    const targetCountryCode = newCountryIso2.toUpperCase() as CountryCode;
    const newDisplayedValue = formatNationalDigits(
      newNationalDigits,
      targetCountryCode
    );
    setDisplayedValue(newDisplayedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propInputValue, defaultCountryIso2]);

  // This handles formatting AFTER internal state updates (typing, country change)
  useEffect(() => {
    const parsed = parsePhoneNumber(internalFullPhone);
    let nationalDigits = '';
    let targetCountryCode = country.iso2.toUpperCase() as CountryCode;

    if (parsed) {
      nationalDigits = parsed.nationalNumber;
      if (parsed.country && parsed.country !== targetCountryCode) {
        targetCountryCode = parsed.country;
      }
    } else {
      // Extract digits after the current dial code
      const prefix = `+${country.dialCode}`;
      if (internalFullPhone.startsWith(prefix)) {
        nationalDigits = internalFullPhone
          .substring(prefix.length)
          .replace(/\D/g, '');
      }
    }

    const formattedDisplay = formatNationalDigits(
      nationalDigits,
      targetCountryCode
    );

    if (formattedDisplay !== displayedValue) {
      setDisplayedValue(formattedDisplay);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalFullPhone, country.iso2, country.dialCode]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const valueFromInput = e.target.value;

      // 1. Get digits from the current input value
      let digits = valueFromInput.replace(/\D/g, '');

      // 2. Apply length restriction
      const currentCountryCode = country.iso2.toUpperCase() as CountryCode;
      const isCurrentlyNA =
        currentCountryCode === 'US' || currentCountryCode === 'CA';
      const maxLength = isCurrentlyNA ? 10 : 15; // Max national digits length
      if (digits.length > maxLength) {
        digits = digits.slice(0, maxLength);
      }

      // 3. Construct the new internal E.164 number
      const newFullNumber = `+${country.dialCode}${digits}`;

      // 4. Format the display value *immediately* for responsiveness
      const newDisplayedValue = formatNationalDigits(
        digits,
        currentCountryCode
      );

      // 5. Update states
      setInternalFullPhone(newFullNumber);
      setDisplayedValue(newDisplayedValue);

      // 6. Call the parent onChange prop with the E.164 value
      if (onChange) {
        onChange(newFullNumber);
      }
    },
    [country.dialCode, country.iso2, onChange] // Dependencies
  );

  const handleCountryChange = useCallback(
    (newIso2: CountryIso2) => {
      const newCountryData = findCountryByIso2(newIso2);
      if (!newCountryData) return;

      let nationalDigits = displayedValue.replace(/\D/g, '');

      const newIsNorthAmerican = newIso2 === 'us' || newIso2 === 'ca';
      const maxLength = newIsNorthAmerican ? 10 : 15;
      if (nationalDigits.length > maxLength) {
        nationalDigits = nationalDigits.slice(0, maxLength);
      }

      const newFullNumber = `+${newCountryData.dialCode}${nationalDigits}`;
      const newCountryCode = newIso2.toUpperCase() as CountryCode;
      const newDisplayedValue = formatNationalDigits(
        nationalDigits,
        newCountryCode
      );

      setCountry(newIso2);

      setInternalFullPhone(newFullNumber);
      setDisplayedValue(newDisplayedValue);

      if (onChange) {
        onChange(newFullNumber);
      }

      setTimeout(() => {
        inputRef.current?.focus();
        const input = inputRef.current;
        if (input) {
          const len = input.value.length;
          input.setSelectionRange(len, len);
        }
      }, 70);
    },
    [displayedValue, setCountry, onChange] // Depends on displayedValue for digits
  );

  return (
    <div
      className={cn(
        'rounded-10 relative flex h-10 w-full border shadow-[0px_1px_2px_0px_rgba(10,13,20,0.03)]',
        'hover:not-focus-within:border-ds-neutral-200 hover:not-focus-within:bg-ds-weak-50',
        'focus-within:border-ds-stroke-strong-950 focus-within:shadow-button-important-focus',
        readOnly ? 'cursor-not-allowed bg-gray-100' : 'bg-white',
        className
      )}
    >
      <Listbox
        value={country.iso2}
        onChange={handleCountryChange}
        disabled={readOnly}
      >
        {({ open }) => (
          <>
            <Listbox.Button
              className={cn(
                'rounded-l-10 border-r-ds-neutral-200 relative flex shrink-0 cursor-default items-center gap-x-2 border border-transparent bg-transparent py-2 pr-2.5 pl-2 text-sm whitespace-nowrap focus:outline-none',
                readOnly ? 'pointer-events-none' : 'cursor-pointer'
              )}
              style={{
                borderTopLeftRadius: 'inherit',
                borderBottomLeftRadius: 'inherit',
              }}
            >
              <div className='flex h-5 w-5 shrink-0 items-end justify-center overflow-hidden rounded-full shadow-[0px_0px_3px_1px_rgba(0,0,0,0.1)]'>
                <span className={`fi fi-${country.iso2} fis text-xl`} />
              </div>
              <span
                className={cn(
                  'text-start',
                  readOnly ? 'text-gray-500' : 'text-gray-900'
                )}
              >
                +{country.dialCode}
              </span>
              {!readOnly && (
                <ChevronDownIcon
                  className={cn(
                    open ? 'rotate-180' : '',
                    'h-4 w-4 text-gray-400 transition-transform duration-200'
                  )}
                  aria-hidden='true'
                />
              )}
            </Listbox.Button>
            {open && !readOnly && (
              <Listbox.Options
                static
                className='border-ds-neutral-200 ring-opacity-5 absolute top-full left-0 z-50 mt-2.5 w-full max-w-[250px] overflow-hidden rounded-2xl border bg-white text-base shadow-[0px_1px_2px_0px_rgba(10,13,20,0.03)] ring-1 ring-black focus:outline-none sm:text-sm'
              >
                <CountryOptions />
              </Listbox.Options>
            )}
          </>
        )}
      </Listbox>

      <input
        ref={inputRef}
        type='tel'
        inputMode='tel'
        autoComplete='tel-national'
        value={displayedValue}
        onChange={handleInputChange}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        placeholder={placeholder}
        readOnly={readOnly}
        className={cn(
          'placeholder:text-ds-neutral-400 h-full w-full flex-1 rounded-r-[10px] border-none bg-transparent px-3 py-2 text-sm ring-0 outline-none focus:ring-0 focus:outline-none',
          readOnly ? 'cursor-not-allowed text-gray-500' : '',
          propInputValue
            ? 'text-ds-neutral-950'
            : isFocused
              ? 'text-ds-neutral-600'
              : 'text-ds-neutral-400'
        )}
      />
    </div>
  );
}

const parsedCountries = defaultCountries.map((c) => parseCountry(c));
const preferredCountriesISO2s: CountryIso2[] = ['ca', 'us', 'fr'];
const preferredCountries = parsedCountries.filter((c) =>
  preferredCountriesISO2s.includes(c.iso2)
);
const otherCountries = parsedCountries.filter(
  (c) => !preferredCountriesISO2s.includes(c.iso2)
);

const CountryOption = memo(function CountryOption({ c }: { c: ParsedCountry }) {
  return (
    <Listbox.Option
      key={c.iso2}
      value={c.iso2}
      className={({ active }) =>
        cn(
          'text-ds-neutral-950 relative cursor-default rounded-[10px] p-3 text-sm select-none',
          active ? 'bg-ds-neutral-50' : ''
        )
      }
    >
      {({ selected }) => (
        <div className='flex items-center gap-x-2'>
          <div className='flex h-5 w-5 shrink-0 items-end justify-center overflow-hidden rounded-full shadow-[0px_0px_3px_1px_rgba(0,0,0,0.1)]'>
            <span className={`fi shrink-0 fi-${c.iso2} fis text-xl`} />
          </div>
          <span
            className={cn(
              'truncate',
              selected ? 'font-semibold' : 'font-normal'
            )}
          >
            {c.name} (+{c.dialCode})
          </span>
        </div>
      )}
    </Listbox.Option>
  );
});

const CountryOptions = memo(function CountryOptions() {
  return (
    <div className='scrollbar-track-slate-50 scrollbar-thumb-slate-300 max-h-[240px] overflow-y-auto p-2 focus:outline-none'>
      {preferredCountries.map((c) => (
        <CountryOption key={c.iso2} c={c} />
      ))}
      <hr className='my-1 border-gray-200' />
      {otherCountries.map((c) => (
        <CountryOption key={c.iso2} c={c} />
      ))}
    </div>
  );
});

const findCountryByIso2 = (iso2: CountryIso2): ParsedCountry | undefined => {
  const countryData = defaultCountries.find(
    (c) => parseCountry(c).iso2 === iso2
  );
  return countryData ? parseCountry(countryData) : undefined;
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
  const isNorthAmerican = countryCode === 'US' || countryCode === 'CA';

  if (isNorthAmerican) {
    return formatNorthAmericanNationalNumber(digits);
  } else {
    const formatter = new AsYouType(countryCode);
    formatter.input(digits);
    let formatted = formatter.getNationalNumber();
    if (!formatted && digits.length > 0) {
      return digits; // Fallback for short inputs
    }
    return formatted;
  }
};

PhoneInput.displayName = COMPONENT_NAME;
export { PhoneInput as Root };
