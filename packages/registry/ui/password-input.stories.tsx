'use client';

import * as React from 'react';

import * as PasswordInput from './password-input';
import type { PasswordCriterion } from './password-input';
import * as FormField from './form-field';

export default { title: 'Form/Composed Inputs/Password Input' };

export const Playground = {
  args: {
    size: 'medium',
    hasError: false,
    disabled: false,
    placeholder: '••••••••••',
    showStrength: false,
  },
  argTypes: {
    size: { control: 'select', options: ['medium', 'small', 'xsmall'] },
    hasError: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    showStrength: { control: 'boolean' },
  },
  render: (args: any) => (
    <div className='w-full max-w-[300px]'>
      <PasswordInput.Root
        size={args.size}
        hasError={args.hasError}
        disabled={args.disabled}
        placeholder={args.placeholder}
        showStrength={args.showStrength}
      />
    </div>
  ),
};

export const Default = {
  render: () => (
    <div className='w-full max-w-[300px]'>
      <PasswordInput.Root placeholder='Enter password' />
    </div>
  ),
};

export const WithStrength = {
  render: () => {
    const [value, setValue] = React.useState('');

    const criteria: PasswordCriterion[] = [
      { key: 'uppercase', label: 'At least 1 uppercase', met: /[A-Z]/.test(value) },
      { key: 'number', label: 'At least 1 number', met: /[0-9]/.test(value) },
      { key: 'length', label: 'At least 8 characters', met: value.length >= 8 },
    ];

    return (
      <div className='w-full max-w-[300px]'>
        <PasswordInput.Root
          value={value}
          onChange={(e) => setValue(e.target.value)}
          showStrength
          criteria={criteria}
        />
      </div>
    );
  },
};

export const Sizes = {
  render: () => (
    <div className='flex w-full max-w-[300px] flex-col gap-6'>
      <PasswordInput.Root size='medium' placeholder='Medium' />
      <PasswordInput.Root size='small' placeholder='Small' />
      <PasswordInput.Root size='xsmall' placeholder='XSmall' />
    </div>
  ),
};

export const ErrorState = {
  render: () => (
    <div className='w-full max-w-[300px]'>
      <PasswordInput.Root hasError placeholder='Error state' />
    </div>
  ),
};

export const WithFormField = {
  render: () => (
    <div className='w-full min-w-[300px] max-w-[300px]'>
      <FormField.Root
        label='Password'
        htmlFor='password'
        required
        hint='Minimum 8 characters.'
      >
        <PasswordInput.Root id='password' />
      </FormField.Root>
    </div>
  ),
};
