'use client';

import { useState } from 'react';
import { Root as PhoneInput } from './phone-input';

export default { title: 'Needs Refactor/Phone Input', component: PhoneInput };

export const Playground = {
  args: {
    placeholder: '(555) 000-0000',
    readOnly: false,
    defaultCountryIso2: 'ca',
  },
  argTypes: {
    placeholder: { control: 'text' },
    readOnly: { control: 'boolean' },
    defaultCountryIso2: { control: 'select', options: ['ca', 'us', 'fr'] },
  },
  render: (args: any) => {
    function PhoneInputPlayground() {
      const [value, setValue] = useState('');
      return (
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <PhoneInput
            inputValue={value}
            onChange={setValue}
            placeholder={args.placeholder}
            readOnly={args.readOnly}
            defaultCountryIso2={args.defaultCountryIso2}
          />
        </div>
      );
    }
    return <PhoneInputPlayground />;
  },
};

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
