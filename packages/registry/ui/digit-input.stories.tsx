'use client';

import * as React from 'react';

import * as DigitInput from './digit-input';

export default { title: 'Form/Digit Input', component: DigitInput.Root };

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
