import * as CompactButton from './compact-button';
import { RiAddLine } from '@remixicon/react';

export default {
  title: 'Actions/Compact Button',
  component: CompactButton.Root,
};

export const Playground = {
  args: {
    variant: 'stroke',
    size: 'large',
    fullRadius: false,
    disabled: false,
    // Icon-only: the label is what a screen reader and voice control announce.
    'aria-label': 'Add item',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['stroke', 'ghost', 'white', 'modifiable'],
    },
    size: { control: 'select', options: ['large', 'medium'] },
    fullRadius: { control: 'boolean' },
    disabled: { control: 'boolean' },
    'aria-label': { control: 'text' },
  },
  render: (args: any) => (
    <CompactButton.Root {...args}>
      <CompactButton.Icon as={RiAddLine} aria-hidden='true' />
    </CompactButton.Root>
  ),
};

export const Variants = {
  render: () => (
    <div className='flex items-center gap-4'>
      <CompactButton.Root variant='stroke' aria-label='Add item'>
        <CompactButton.Icon as={RiAddLine} aria-hidden='true' />
      </CompactButton.Root>

      <CompactButton.Root variant='ghost' aria-label='Add item'>
        <CompactButton.Icon as={RiAddLine} aria-hidden='true' />
      </CompactButton.Root>

      <CompactButton.Root variant='white' aria-label='Add item'>
        <CompactButton.Icon as={RiAddLine} aria-hidden='true' />
      </CompactButton.Root>

      <CompactButton.Root
        variant='modifiable'
        aria-label='Remove item'
        className='text-error-base hover:bg-error-lighter'
      >
        <CompactButton.Icon as={RiAddLine} aria-hidden='true' />
      </CompactButton.Root>
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div className='flex flex-col items-center gap-4'>
      <CompactButton.Root aria-label='Add item'>
        <CompactButton.Icon as={RiAddLine} aria-hidden='true' />
      </CompactButton.Root>

      <CompactButton.Root size='medium' aria-label='Add item'>
        <CompactButton.Icon as={RiAddLine} aria-hidden='true' />
      </CompactButton.Root>
    </div>
  ),
};

export const FullRadius = {
  render: () => (
    <CompactButton.Root fullRadius aria-label='Add item'>
      <CompactButton.Icon as={RiAddLine} aria-hidden='true' />
    </CompactButton.Root>
  ),
};

export const Disabled = {
  render: () => (
    <CompactButton.Root disabled aria-label='Add item'>
      <CompactButton.Icon as={RiAddLine} aria-hidden='true' />
    </CompactButton.Root>
  ),
};

export const AsChild = {
  render: () => (
    <CompactButton.Root asChild>
      <a href='#' aria-label='Add item'>
        <CompactButton.Icon as={RiAddLine} aria-hidden='true' />
      </a>
    </CompactButton.Root>
  ),
};
