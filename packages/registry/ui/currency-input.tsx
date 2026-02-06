import { useState, useRef, useCallback } from 'react';
import { Listbox } from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type Currency, currencies } from '@/lib/currency-input-utils';

export function CurrencyInput({
  value,
  onChange,
  defaultCurrency = 'CAD',
  placeholder = '0.00',
  readOnly = false,
  className,
}: {
  value?: string;
  onChange: (val: string, currency: string) => void;
  defaultCurrency?: string;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}) {
  const [amount, setAmount] = useState(value || '');
  const [currency, setCurrency] = useState<Currency>(
    currencies.find((c) => c.label === defaultCurrency) || currencies[0]
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // Only allow valid numbers
      const val = e.target.value.replace(/[^0-9.]/g, '');
      setAmount(val);
      onChange(val, currency.code);
    },
    [currency, onChange]
  );

  const handleCurrencyChange = useCallback(
    (newCurrency: Currency) => {
      setCurrency(newCurrency);
      onChange(amount, newCurrency.code);
    },
    [amount, onChange]
  );

  return (
    <div
      className={cn(
        'relative flex h-10 w-full rounded-[10px] border shadow-[0px_1px_2px_0px_rgba(10,13,20,0.03)]',
        'hover:[&:not(:focus-within)]:border-transparent hover:[&:not(:focus-within)]:bg-ds-weak-50',
        'focus-within:border-ds-stroke-strong-950 focus-within:shadow-button-important-focus',
        readOnly ? 'cursor-not-allowed bg-gray-100' : 'bg-white'
      )}
    >
      {/* Amount input */}
      <input
        ref={inputRef}
        type='text'
        inputMode='decimal'
        value={amount}
        onChange={handleAmountChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={cn(
          'h-full w-full flex-1 rounded-l-[10px] border-none bg-transparent px-3 py-2 text-sm outline-none ring-0 placeholder:text-ds-neutral-400 focus:outline-none focus:ring-0',
          readOnly ? 'cursor-not-allowed text-gray-500' : '',
          amount ? 'text-ds-neutral-950' : 'text-ds-neutral-400'
        )}
      />

      {/* Currency dropdown */}
      <Listbox
        value={currency}
        onChange={handleCurrencyChange}
        disabled={readOnly}
      >
        {({ open }) => (
          <>
            <Listbox.Button
              className={cn(
                'relative flex shrink-0 cursor-default items-center gap-x-2 whitespace-nowrap rounded-r-[10px] border-l border-ds-neutral-200 bg-transparent py-2 pl-2 pr-2.5 text-sm focus:outline-none',
                readOnly ? 'pointer-events-none' : 'cursor-pointer'
              )}
            >
              <div className='flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full shadow-sm'>
                <span className={`fi fi-${currency.flag} fis text-xl`} />
              </div>
              <span className='text-gray-900'>{currency.label}</span>
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
              <Listbox.Options className='absolute right-0 top-full z-50 mt-2.5 w-[160px] overflow-hidden rounded-2xl border border-ds-neutral-200 bg-white text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                {currencies.map((c) => (
                  <Listbox.Option
                    key={c.code}
                    value={c}
                    className={({ active }) =>
                      cn(
                        'relative cursor-default select-none rounded-[10px] p-3',
                        active ? 'bg-ds-neutral-50' : ''
                      )
                    }
                  >
                    <div className='flex items-center gap-2'>
                      <div className='flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full shadow-sm'>
                        <span className={`fi fi-${c.flag} fis text-xl`} />
                      </div>

                      <span className='truncate'>{c.label}</span>
                    </div>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            )}
          </>
        )}
      </Listbox>
    </div>
  );
}