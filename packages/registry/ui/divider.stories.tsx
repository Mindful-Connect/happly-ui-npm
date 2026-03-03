import { RiAddLine } from '@remixicon/react';

import * as Divider from './divider';
import * as Button from './button';

export default { title: 'UI/Divider', component: Divider.Root };

export const Line = {
  render: () => (
    <div className='w-96'>
      <Divider.Root variant='line' />
    </div>
  ),
};

export const LineSpacing = {
  render: () => (
    <div className='w-96'>
      <Divider.Root variant='line-spacing' />
    </div>
  ),
};

export const LineText = {
  render: () => (
    <div className='w-96'>
      <Divider.Root variant='line-text'>OR</Divider.Root>
    </div>
  ),
};

export const TextOnly = {
  render: () => (
    <div className='w-96'>
      <Divider.Root variant='text'>OR</Divider.Root>
    </div>
  ),
};

export const SolidText = {
  render: () => (
    <div className='w-96'>
      <Divider.Root variant='solid-text'>Amount &amp; Account</Divider.Root>
    </div>
  ),
};

export const Content = {
  render: () => (
    <div className='w-96'>
      <Divider.Root variant='content'>
        <Button.Root variant='neutral' mode='stroke' size='xsmall'>
          <Button.Icon as={RiAddLine} />
        </Button.Root>
      </Divider.Root>
    </div>
  ),
};
