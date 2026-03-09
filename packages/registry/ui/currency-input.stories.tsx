'use client';

import * as React from 'react';

import * as CurrencyInput from './currency-input';

export default { title: 'Form/Composed Inputs/Currency Input' };

export const Default = {
  render: () => (
    <div className='w-full max-w-[300px]'>
      <CurrencyInput.Root />
    </div>
  ),
};

export const Controlled = {
  render: () => {
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
        <p className='mt-2 text-paragraph-xs text-text-sub-600'>
          Amount: {amount || '—'} | Currency: {currency}
        </p>
      </div>
    );
  },
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
