import * as CompactButton from './compact-button';
import { RiAddLine } from '@remixicon/react';

export default { title: 'Actions/Compact Button', component: CompactButton.Root };

export const Playground = {
  args: {
    variant: 'stroke',
    size: 'large',
    fullRadius: false,
    disabled: false,
  },
  argTypes: {
    variant: { control: 'select', options: ['stroke', 'ghost', 'white', 'modifiable'] },
    size: { control: 'select', options: ['large', 'medium'] },
    fullRadius: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  render: (args: any) => (
    <CompactButton.Root {...args}>
      <CompactButton.Icon as={RiAddLine} />
    </CompactButton.Root>
  ),
};

export const Stroke = {
  render: () => (
    <CompactButton.Root variant='stroke'>
      <CompactButton.Icon as={RiAddLine} />
    </CompactButton.Root>
  ),
};

export const Ghost = {
  render: () => (
    <CompactButton.Root variant='ghost'>
      <CompactButton.Icon as={RiAddLine} />
    </CompactButton.Root>
  ),
};

export const White = {
  render: () => (
    <CompactButton.Root variant='white'>
      <CompactButton.Icon as={RiAddLine} />
    </CompactButton.Root>
  ),
};

export const Modifiable = {
  render: () => (
    <CompactButton.Root
      variant='modifiable'
      className='text-error-base hover:bg-error-lighter'
    >
      <CompactButton.Icon as={RiAddLine} />
    </CompactButton.Root>
  ),
};

export const Sizes = {
  render: () => (
    <div className='flex flex-col items-center gap-4'>
      <CompactButton.Root>
        <CompactButton.Icon as={RiAddLine} />
      </CompactButton.Root>

      <CompactButton.Root size='medium'>
        <CompactButton.Icon as={RiAddLine} />
      </CompactButton.Root>
    </div>
  ),
};

export const FullRadius = {
  render: () => (
    <CompactButton.Root fullRadius>
      <CompactButton.Icon as={RiAddLine} />
    </CompactButton.Root>
  ),
};

export const Disabled = {
  render: () => (
    <CompactButton.Root disabled>
      <CompactButton.Icon as={RiAddLine} />
    </CompactButton.Root>
  ),
};

export const AsChild = {
  render: () => (
    <CompactButton.Root asChild>
      <a href='#'>
        <CompactButton.Icon as={RiAddLine} />
      </a>
    </CompactButton.Root>
  ),
};
