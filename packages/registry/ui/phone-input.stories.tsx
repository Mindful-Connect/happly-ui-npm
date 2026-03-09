'use client';

import { useState } from 'react';
import { Root as PhoneInput } from './phone-input';

export default { title: 'Needs Refactor/Phone Input', component: PhoneInput };

export const Default = {
  render: () => {
    function PhoneInputDemo() {
      const [value, setValue] = useState('');
      return (
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <PhoneInput
            inputValue={value}
            onChange={setValue}
            defaultCountryIso2="ca"
          />
        </div>
      );
    }
    return <PhoneInputDemo />;
  },
};
