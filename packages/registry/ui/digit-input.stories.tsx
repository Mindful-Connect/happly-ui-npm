'use client';

import * as React from 'react';

import * as DigitInput from './digit-input';
import * as FormField from './form-field';

export default { title: 'Form/Digit Input', component: DigitInput.Root };

export const Playground = {
  args: {
    numInputs: 4,
    disabled: false,
    hasError: false,
  },
  argTypes: {
    numInputs: { control: 'number', min: 1, max: 8 },
    disabled: { control: 'boolean' },
    hasError: { control: 'boolean' },
  },
  render: (args: any) => {
    const [value, setValue] = React.useState('');

    return (
      <div className='w-full min-w-[320px] max-w-96'>
        <DigitInput.Root
          numInputs={args.numInputs}
          disabled={args.disabled}
          hasError={args.hasError}
          onChange={(v: string) => setValue(v)}
          value={value}
        />
      </div>
    );
  },
};

export const Demo = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <div className='w-full min-w-[320px] max-w-96'>
        <DigitInput.Root
          numInputs={4}
          onChange={(v) => setValue(v)}
          value={value}
        />
      </div>
    );
  },
};

export const HasError = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <div className='w-full min-w-[320px] max-w-96'>
        <DigitInput.Root
          hasError
          numInputs={4}
          onChange={(v) => setValue(v)}
          value={value}
        />
      </div>
    );
  },
};

export const Disabled = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <div className='w-full min-w-[320px] max-w-96'>
        <DigitInput.Root
          disabled
          numInputs={4}
          onChange={(v) => setValue(v)}
          value={value}
        />
      </div>
    );
  },
};

export const Square = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <div className='w-full min-w-[320px] max-w-96'>
        <DigitInput.Root
          numInputs={4}
          onChange={(v) => setValue(v)}
          value={value}
          className='justify-center [&>input]:aspect-square [&>input]:w-auto'
        />
      </div>
    );
  },
};

export const WithFormField = {
  render: () => (
    <FormField.Root
      label='Verification Code'
      hint='Enter the 5-digit code sent to your email.'
    >
      <DigitInput.Root numDigits={5} />
    </FormField.Root>
  ),
};
