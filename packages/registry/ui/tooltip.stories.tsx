import { RiGlobalLine } from '@remixicon/react';

import * as Button from './button';
import * as Tooltip from './tooltip';

export default { title: 'Feedback/Tooltip', component: Tooltip.Content };

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
            <RiGlobalLine className='size-5 shrink-0 text-text-sub-600' />
            <div>
              <div className='text-text-strong-950'>Content Title</div>
              <div className='mt-1 text-paragraph-xs text-text-sub-600'>
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
