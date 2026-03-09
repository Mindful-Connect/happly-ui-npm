import * as FancyButton from './fancy-button';
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';

export default { title: 'Actions/Fancy Button', component: FancyButton.Root };

export const Playground = {
  args: {
    variant: 'neutral',
    size: 'medium',
    disabled: false,
    children: 'Button',
  },
  argTypes: {
    variant: { control: 'select', options: ['neutral', 'primary', 'error', 'basic'] },
    size: { control: 'select', options: ['medium', 'small', 'xsmall'] },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  render: (args: any) => (
    <FancyButton.Root {...args} />
  ),
};

export const Neutral = {
  render: () => <FancyButton.Root variant='neutral'>Button</FancyButton.Root>,
};

export const Primary = {
  render: () => <FancyButton.Root variant='primary'>Button</FancyButton.Root>,
};

export const Error = {
  render: () => <FancyButton.Root variant='error'>Button</FancyButton.Root>,
};

export const Basic = {
  render: () => <FancyButton.Root variant='basic'>Button</FancyButton.Root>,
};

export const WithIcon = {
  render: () => (
    <div className='flex flex-col items-center gap-4'>
      <FancyButton.Root>
        <FancyButton.Icon as={RiArrowLeftSLine} />
        Button
        <FancyButton.Icon as={RiArrowRightSLine} />
      </FancyButton.Root>
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div className='flex flex-col items-center gap-4'>
      <FancyButton.Root size='medium'>
        <FancyButton.Icon as={RiArrowLeftSLine} />
        Button
        <FancyButton.Icon as={RiArrowRightSLine} />
      </FancyButton.Root>

      <FancyButton.Root size='small'>
        <FancyButton.Icon as={RiArrowLeftSLine} />
        Button
        <FancyButton.Icon as={RiArrowRightSLine} />
      </FancyButton.Root>

      <FancyButton.Root size='xsmall'>
        <FancyButton.Icon as={RiArrowLeftSLine} />
        Button
        <FancyButton.Icon as={RiArrowRightSLine} />
      </FancyButton.Root>
    </div>
  ),
};

export const Disabled = {
  render: () => (
    <div className='flex flex-col items-center gap-4'>
      <FancyButton.Root disabled variant='neutral'>
        <FancyButton.Icon as={RiArrowLeftSLine} />
        Button
        <FancyButton.Icon as={RiArrowRightSLine} />
      </FancyButton.Root>
      <FancyButton.Root disabled variant='error'>
        <FancyButton.Icon as={RiArrowLeftSLine} />
        Button
        <FancyButton.Icon as={RiArrowRightSLine} />
      </FancyButton.Root>
      <FancyButton.Root disabled variant='primary'>
        <FancyButton.Icon as={RiArrowLeftSLine} />
        Button
        <FancyButton.Icon as={RiArrowRightSLine} />
      </FancyButton.Root>
      <FancyButton.Root disabled variant='basic'>
        <FancyButton.Icon as={RiArrowLeftSLine} />
        Button
        <FancyButton.Icon as={RiArrowRightSLine} />
      </FancyButton.Root>
    </div>
  ),
};

export const AsChild = {
  render: () => (
    <FancyButton.Root asChild>
      <a href='#'>Button</a>
    </FancyButton.Root>
  ),
};
