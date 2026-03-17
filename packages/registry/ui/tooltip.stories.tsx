import { RiGlobalLine } from '@remixicon/react';

import * as Button from './button';
import * as Tooltip from './tooltip';

export default { title: 'Feedback/Tooltip', component: Tooltip.Content };

export const Playground = {
  args: {
    size: 'small',
    variant: 'dark',
    side: 'bottom',
    content: 'Tooltip content.',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium'],
    },
    variant: {
      control: 'select',
      options: ['dark', 'light'],
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    content: { control: 'text' },
  },
  render: (args: any) => (
    <Tooltip.Provider>
      <Tooltip.Root defaultOpen>
        <Tooltip.Trigger asChild>
          <Button.Root variant='neutral' mode='stroke' size='xsmall'>
            Hover or focus
          </Button.Root>
        </Tooltip.Trigger>
        <Tooltip.Content
          size={args.size}
          variant={args.variant}
          side={args.side}
        >
          {args.content}
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  ),
};

export const Light = {
  render: () => (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button.Root variant='neutral' mode='stroke' size='xsmall'>
            Hover or focus
          </Button.Root>
        </Tooltip.Trigger>
        <Tooltip.Content variant='light'>Tooltip content.</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  ),
};

export const Size = {
  render: () => (
    <Tooltip.Provider>
      <div className='flex flex-col items-center gap-6'>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button.Root variant='neutral' mode='stroke' size='xsmall'>
              Medium
            </Button.Root>
          </Tooltip.Trigger>
          <Tooltip.Content size='medium'>Tooltip content.</Tooltip.Content>
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button.Root variant='neutral' mode='stroke' size='xsmall'>
              Small (default)
            </Button.Root>
          </Tooltip.Trigger>
          <Tooltip.Content size='small'>Tooltip content.</Tooltip.Content>
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button.Root variant='neutral' mode='stroke' size='xsmall'>
              XSmall
            </Button.Root>
          </Tooltip.Trigger>
          <Tooltip.Content size='xsmall'>Tooltip content.</Tooltip.Content>
        </Tooltip.Root>
      </div>
    </Tooltip.Provider>
  ),
};

export const Position = {
  render: () => (
    <Tooltip.Provider>
      <div className='grid grid-cols-2 gap-6'>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button.Root variant='neutral' mode='stroke' size='xsmall'>
              Left
            </Button.Root>
          </Tooltip.Trigger>
          <Tooltip.Content side='left'>Tooltip content.</Tooltip.Content>
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button.Root variant='neutral' mode='stroke' size='xsmall'>
              Top
            </Button.Root>
          </Tooltip.Trigger>
          <Tooltip.Content side='top'>Tooltip content.</Tooltip.Content>
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button.Root variant='neutral' mode='stroke' size='xsmall'>
              Bottom
            </Button.Root>
          </Tooltip.Trigger>
          <Tooltip.Content side='bottom'>Tooltip content.</Tooltip.Content>
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button.Root variant='neutral' mode='stroke' size='xsmall'>
              Right
            </Button.Root>
          </Tooltip.Trigger>
          <Tooltip.Content side='right'>Tooltip content.</Tooltip.Content>
        </Tooltip.Root>
      </div>
    </Tooltip.Provider>
  ),
};

export const HTMLContent = {
  render: () => (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button.Root variant='neutral' mode='stroke' size='xsmall'>
            Hover or focus
          </Button.Root>
        </Tooltip.Trigger>
        <Tooltip.Content
          size='medium'
          variant='light'
          className='max-w-[272px]'
        >
          <div className='flex gap-3'>
            <RiGlobalLine className='text-text-sub-600 h-5 w-5 shrink-0' />
            <div>
              <div className='text-text-strong-950'>Content Title</div>
              <div className='text-paragraph-xs text-text-sub-600 mt-1'>
                Insert tooltip description here. It would look much better as
                three lines of text.
              </div>
            </div>
          </div>
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  ),
};
