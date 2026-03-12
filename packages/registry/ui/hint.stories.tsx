'use client';

import { RiAlertFill } from '@remixicon/react';

import * as Hint from './hint';

export default { title: 'Form/Hint', component: Hint.Root };

export const Playground = {
  args: {
    children: 'This is a hint text to help user.',
    disabled: false,
    hasError: false,
  },
  argTypes: {
    children: { control: 'text' },
    disabled: { control: 'boolean' },
    hasError: { control: 'boolean' },
  },
  render: (args: any) => (
    <Hint.Root disabled={args.disabled} hasError={args.hasError}>
      <Hint.Icon />
      {args.children}
    </Hint.Root>
  ),
};

export const Demo = {
  render: () => (
    <Hint.Root>
      <Hint.Icon />
      This is a hint text to help user.
    </Hint.Root>
  ),
};

export const Disabled = {
  render: () => (
    <Hint.Root disabled>
      <Hint.Icon />
      This is a hint text to help user.
    </Hint.Root>
  ),
};

export const HasError = {
  render: () => (
    <Hint.Root hasError>
      <Hint.Icon />
      This is a hint text to help user.
    </Hint.Root>
  ),
};

export const CustomIcon = {
  render: () => (
    <Hint.Root>
      <Hint.Icon as={RiAlertFill} />
      This hint uses a custom icon.
    </Hint.Root>
  ),
};

export const Composed = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <Hint.Composed>This is a hint with default icon.</Hint.Composed>

      <Hint.Composed icon={RiAlertFill}>
        This is a hint with custom icon.
      </Hint.Composed>

      <Hint.Composed hasError>This hint has an error.</Hint.Composed>

      <Hint.Composed disabled>This hint is disabled.</Hint.Composed>
    </div>
  ),
};
