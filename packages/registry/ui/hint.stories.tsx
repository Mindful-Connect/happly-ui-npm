'use client';

import { RiInformationFill } from '@remixicon/react';

import * as Hint from './hint';

export default { title: 'UI/Hint', component: Hint.Root };

export const Demo = {
  render: () => (
    <Hint.Root>
      <Hint.Icon as={RiInformationFill} />
      This is a hint text to help user.
    </Hint.Root>
  ),
};

export const Disabled = {
  render: () => (
    <Hint.Root disabled>
      <Hint.Icon as={RiInformationFill} />
      This is a hint text to help user.
    </Hint.Root>
  ),
};

export const HasError = {
  render: () => (
    <Hint.Root hasError>
      <Hint.Icon as={RiInformationFill} />
      This is a hint text to help user.
    </Hint.Root>
  ),
};
