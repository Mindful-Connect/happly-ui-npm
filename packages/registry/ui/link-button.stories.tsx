import * as LinkButton from './link-button';
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';

export default { title: 'Actions/Link Button', component: LinkButton.Root };

export const Playground = {
  args: {
    variant: 'gray',
    size: 'medium',
    underline: false,
    disabled: false,
    children: 'Link Button',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['gray', 'black', 'primary', 'error', 'modifiable'],
    },
    size: { control: 'select', options: ['medium', 'small'] },
    underline: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  render: (args: any) => <LinkButton.Root {...args} />,
};

export const Variants = {
  render: () => (
    <div className='flex flex-col items-center gap-4'>
      <LinkButton.Root variant='gray'>Gray</LinkButton.Root>
      <LinkButton.Root variant='black'>Black</LinkButton.Root>
      <LinkButton.Root variant='primary'>Primary</LinkButton.Root>
      <LinkButton.Root variant='error'>Error</LinkButton.Root>
      <LinkButton.Root variant='modifiable' className='text-success-base'>
        Modifiable
      </LinkButton.Root>
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div className='flex flex-col items-center gap-4'>
      <LinkButton.Root>Medium (default)</LinkButton.Root>
      <LinkButton.Root size='small'>Small</LinkButton.Root>
    </div>
  ),
};

export const Underline = {
  render: () => (
    <div className='flex flex-col items-center gap-4'>
      <LinkButton.Root underline variant='gray'>
        Link Button
      </LinkButton.Root>
      <LinkButton.Root underline variant='black'>
        Link Button
      </LinkButton.Root>
      <LinkButton.Root underline variant='primary'>
        Link Button
      </LinkButton.Root>
      <LinkButton.Root underline variant='error'>
        Link Button
      </LinkButton.Root>
    </div>
  ),
};

export const WithIcon = {
  render: () => (
    <LinkButton.Root>
      <LinkButton.Icon as={RiArrowLeftSLine} />
      Link Button
      <LinkButton.Icon as={RiArrowRightSLine} />
    </LinkButton.Root>
  ),
};

export const Disabled = {
  render: () => (
    <div className='flex flex-col items-center gap-4'>
      <LinkButton.Root variant='gray' disabled>
        Link Button
        <LinkButton.Icon as={RiArrowRightSLine} />
      </LinkButton.Root>

      <LinkButton.Root variant='black' disabled>
        Link Button
        <LinkButton.Icon as={RiArrowRightSLine} />
      </LinkButton.Root>

      <LinkButton.Root variant='primary' disabled>
        Link Button
        <LinkButton.Icon as={RiArrowRightSLine} />
      </LinkButton.Root>

      <LinkButton.Root variant='error' disabled>
        Link Button
        <LinkButton.Icon as={RiArrowRightSLine} />
      </LinkButton.Root>

      <LinkButton.Root
        variant='modifiable'
        className='text-success-base'
        disabled
      >
        Link Button
        <LinkButton.Icon as={RiArrowRightSLine} />
      </LinkButton.Root>
    </div>
  ),
};

export const AsChild = {
  render: () => (
    <LinkButton.Root asChild>
      <a href='#'>Link Button</a>
    </LinkButton.Root>
  ),
};
