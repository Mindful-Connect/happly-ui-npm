'use client';

import * as React from 'react';

import * as CurrencyInput from './currency-input';
import * as FormField from './form-field';

export default { title: 'Form/Composed Inputs/Currency Input' };

export const Playground = {
  args: {
    size: 'medium',
    hasError: false,
    disabled: false,
    placeholder: '0.00',
  },
  argTypes: {
    size: { control: 'select', options: ['medium', 'small', 'xsmall'] },
    hasError: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  render: (args: any) => (
    <div className='w-full max-w-[300px]'>
      <CurrencyInput.Root
        size={args.size}
        hasError={args.hasError}
        disabled={args.disabled}
        placeholder={args.placeholder}
      />
    </div>
  ),
};

export const Default = {
  render: () => (
    <div className='w-full max-w-[300px]'>
      <CurrencyInput.Root />
    </div>
  ),
};

function ControlledRender() {
  const [amount, setAmount] = React.useState('');
  const [currency, setCurrency] = React.useState('USD');

  return (
    <div className='w-full max-w-[300px]'>
      <CurrencyInput.Root
        value={amount}
        onValueChange={setAmount}
        currency={currency}
        onCurrencyChange={setCurrency}
      />
      <p className='text-paragraph-xs text-text-sub-600 mt-2'>
        Amount: {amount || '—'} | Currency: {currency}
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
      <CurrencyInput.Root size='medium' />
      <CurrencyInput.Root size='small' />
      <CurrencyInput.Root size='xsmall' />
    </div>
  ),
};

export const ErrorState = {
  render: () => (
    <div className='w-full max-w-[300px]'>
      <CurrencyInput.Root hasError />
    </div>
  ),
};

export const Disabled = {
  render: () => (
    <div className='w-full max-w-[300px]'>
      <CurrencyInput.Root disabled />
    </div>
  ),
};

export const WithFormField = {
  render: () => (
    <div className='w-full max-w-[300px] min-w-[300px]'>
      <FormField.Root
        label='Amount'
        htmlFor='amount'
        required
        hint='Enter the transaction amount.'
      >
        <CurrencyInput.Root id='amount' />
      </FormField.Root>
    </div>
  ),
};
