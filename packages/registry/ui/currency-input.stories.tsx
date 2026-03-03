'use client';

import { useState } from 'react';
import { CurrencyInput } from './currency-input';

export default { title: 'UI/CurrencyInput', component: CurrencyInput };

export const Default = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div style={{ maxWidth: '384px', width: '100%' }}>
        <CurrencyInput
          value={value}
          onChange={(val) => setValue(val)}
          placeholder="0.00"
        />
        <div style={{ marginTop: '16px', fontSize: '14px', color: '#6b7280' }}>
          Value: {value || '(empty)'}
        </div>
      </div>
    );
  },
};
