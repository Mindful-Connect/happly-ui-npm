'use client';

import * as React from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

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

/**
 * Inside a react-hook-form form. The first field gives the currency select no
 * name of its own, the second does. Issue #79 hid here: with no
 * `currencyName` the select used to fall back to the parent field's binding
 * and read the amount as its own value, so the symbol went blank as soon as
 * an amount was typed. Both symbols must stay put while you type.
 */
function WithFormStory() {
  const methods = useForm({
    defaultValues: { amount: '', budget: '', budgetCurrency: 'EUR' },
  });
  const values = useWatch({ control: methods.control });

  return (
    <FormProvider {...methods}>
      <form className='flex w-[320px] flex-col gap-5' noValidate>
        <FormField.Root
          name='amount'
          label='Amount'
          required
          hint='Currency select is not bound to the form.'
        >
          <CurrencyInput.Root />
        </FormField.Root>
        <FormField.Root
          name='budget'
          label='Budget'
          hint='Currency select is bound as “budgetCurrency”.'
        >
          <CurrencyInput.Root currencyName='budgetCurrency' />
        </FormField.Root>
        <pre className='bg-bg-weak-50 text-paragraph-xs text-text-sub-600 rounded-lg p-3'>
          {JSON.stringify(values, null, 2)}
        </pre>
      </form>
    </FormProvider>
  );
}

export const WithForm = {
  render: () => <WithFormStory />,
};
