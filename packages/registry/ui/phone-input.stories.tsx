'use client';

import * as React from 'react';

import * as FormField from './form-field';
import * as PhoneInput from './phone-input';

export default { title: 'Form/Composed Inputs/Phone Input' };

export const Playground = {
  args: {
    size: 'medium',
    hasError: false,
    disabled: false,
    placeholder: '(555) 000-0000',
    defaultCountry: 'ca',
  },
  argTypes: {
    size: { control: 'select', options: ['medium', 'small', 'xsmall'] },
    hasError: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    defaultCountry: { control: 'select', options: ['ca', 'us', 'fr'] },
  },
  render: (args: any) => (
    <div className='w-full max-w-[300px]'>
      <PhoneInput.Root
        size={args.size}
        hasError={args.hasError}
        disabled={args.disabled}
        placeholder={args.placeholder}
        defaultCountry={args.defaultCountry}
      />
    </div>
  ),
};

export const Default = {
  render: () => (
    <div className='w-full max-w-[300px]'>
      <PhoneInput.Root />
    </div>
  ),
};

function ControlledRender() {
  const [value, setValue] = React.useState('');
  const [country, setCountry] = React.useState<string>('us');

  return (
    <div className='w-full max-w-[300px]'>
      <PhoneInput.Root
        value={value}
        onValueChange={setValue}
        country={country as any}
        onCountryChange={(iso2) => setCountry(iso2)}
      />
      <p className='text-paragraph-xs text-text-sub-600 mt-2'>
        Value: {value || '—'} | Country: {country}
      </p>
    </div>
  );
}
export const Controlled = {
  render: () => <ControlledRender />,
};

export const Sizes = {
  render: () => (
    <div className='flex w-full max-w-[300px] flex-col gap-6'>
      <PhoneInput.Root size='medium' />
      <PhoneInput.Root size='small' />
      <PhoneInput.Root size='xsmall' />
    </div>
  ),
};

export const ErrorState = {
  render: () => (
    <div className='w-full max-w-[300px]'>
      <PhoneInput.Root hasError />
    </div>
  ),
};

export const Disabled = {
  render: () => (
    <div className='w-full max-w-[300px]'>
      <PhoneInput.Root disabled />
    </div>
  ),
};

export const WithFormField = {
  render: () => (
    <div className='w-full max-w-[300px] min-w-[300px]'>
      <FormField.Root
        label='Phone Number'
        htmlFor='phone'
        required
        hint='Enter your phone number.'
      >
        <PhoneInput.Root id='phone' />
      </FormField.Root>
    </div>
  ),
};
