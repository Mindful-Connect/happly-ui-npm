'use client';

import * as React from 'react';
import { RiInformationFill } from '@remixicon/react';

import * as FormField from './form-field';
import * as Hint from './hint';
import * as Label from './label';
import * as Textarea from './textarea';

export default { title: 'Form/Textarea', component: Textarea.Root };

export const Demo = {
  render: () => (
    <div className='w-full min-w-[480px]'>
      <Textarea.Root placeholder='Jot down your thoughts...'>
        <Textarea.CharCounter current={78} max={200} />
      </Textarea.Root>
    </div>
  ),
};

export const InteractiveCounter = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <div className='w-full min-w-[480px]'>
        <Textarea.Root
          placeholder='Jot down your thoughts...'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          <Textarea.CharCounter current={value.length} max={200} />
        </Textarea.Root>
      </div>
    );
  },
};

export const HasError = {
  render: () => (
    <div className='w-full min-w-[480px]'>
      <Textarea.Root placeholder='Jot down your thoughts...' hasError>
        <Textarea.CharCounter current={78} max={200} />
      </Textarea.Root>
    </div>
  ),
};

export const WithLabelAndHint = {
  render: () => (
    <div className='w-full min-w-[480px]'>
      <FormField.Root>
        <Label.Root htmlFor='message'>
          Enter Your Message
          <Label.Asterisk />
          <Label.Sub>(Optional)</Label.Sub>
          <Label.InfoIcon />
        </Label.Root>

        <Textarea.Root id='message' placeholder='Jot down your thoughts...'>
          <Textarea.CharCounter current={78} max={200} />
        </Textarea.Root>

        <Hint.Root>
          <Hint.Icon as={RiInformationFill} />
          This is a hint text to help user.
        </Hint.Root>
      </FormField.Root>
    </div>
  ),
};

export const Disabled = {
  render: () => (
    <div className='w-full min-w-[480px]'>
      <Textarea.Root placeholder='Jot down your thoughts...' disabled>
        <Textarea.CharCounter current={78} max={200} />
      </Textarea.Root>
    </div>
  ),
};

export const Simple = {
  render: () => (
    <div className='w-full min-w-[480px]'>
      <Textarea.Root placeholder='Jot down your thoughts...' simple />
    </div>
  ),
};

export const SimpleResize = {
  render: () => (
    <div className='w-full min-w-[480px]'>
      <Textarea.Root
        placeholder='Jot down your thoughts...'
        simple
        className='resize-y'
      />
    </div>
  ),
};
