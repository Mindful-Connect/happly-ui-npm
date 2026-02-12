import { useState } from 'react';
import { CurrencyInput } from '@/components/ui/currency-input';

export function DemoCurrencyInput() {
  const [value, setValue] = useState('');

  return (
    <div className='w-full max-w-sm'>
      <CurrencyInput
        value={value}
        onChange={(val) => setValue(val)}
        placeholder='0.00'
      />
      <div className='mt-4 text-sm text-gray-500'>
        Value: {value || '(empty)'}
      </div>
    </div>
  );
}
