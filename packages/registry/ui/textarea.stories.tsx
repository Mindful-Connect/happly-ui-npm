'use client';

import * as React from 'react';
import { RiInformationFill } from '@remixicon/react';

import * as Hint from './hint';
import * as Label from './label';
import * as Textarea from './textarea';

export default { title: 'UI/Textarea', component: Textarea.Root };

function IconInfoCustom(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={20}
      height={20}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10 16.25a6.25 6.25 0 100-12.5 6.25 6.25 0 000 12.5zm1.116-3.041l.1-.408a1.709 1.709 0 01-.25.083 1.176 1.176 0 01-.308.048c-.193 0-.329-.032-.407-.095-.079-.064-.118-.184-.118-.359a3.514 3.514 0 01.118-.672l.373-1.318c.037-.121.062-.255.075-.4a3.73 3.73 0 00.02-.304.866.866 0 00-.292-.678c-.195-.174-.473-.26-.833-.26-.2 0-.412.035-.636.106-.224.07-.459.156-.704.256l-.1.409c.073-.028.16-.057.262-.087.101-.03.2-.045.297-.045.198 0 .331.034.4.1.07.066.105.185.105.354 0 .093-.01.197-.034.31a6.216 6.216 0 01-.084.36l-.374 1.325c-.033.14-.058.264-.073.374-.015.11-.022.22-.022.325 0 .272.1.496.301.673.201.177.483.265.846.265.236 0 .443-.03.621-.092s.417-.152.717-.27zM11.05 7.85a.772.772 0 00.26-.587.78.78 0 00-.26-.59.885.885 0 00-.628-.244.893.893 0 00-.63.244.778.778 0 00-.264.59c0 .23.088.426.263.587a.897.897 0 00.63.243.888.888 0 00.629-.243z'
        fill='currentColor'
      />
    </svg>
  );
}

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
      <div className='flex flex-col gap-1'>
        <Label.Root htmlFor='message'>
          Enter Your Message
          <Label.Asterisk />
          <Label.Sub>(Optional)</Label.Sub>
          <IconInfoCustom className='size-5 text-text-disabled-300' />
        </Label.Root>

        <Textarea.Root id='message' placeholder='Jot down your thoughts...'>
          <Textarea.CharCounter current={78} max={200} />
        </Textarea.Root>

        <Hint.Root>
          <Hint.Icon as={RiInformationFill} />
          This is a hint text to help user.
        </Hint.Root>
      </div>
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
