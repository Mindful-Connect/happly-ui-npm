import { RiEqualizer3Fill, RiMoonLine, RiSunLine } from '@remixicon/react';

import * as SegmentedControl from './segmented-control';

export default {
  title: 'UI/Segmented Control',
  component: SegmentedControl.Root,
};

export const Default = {
  render: () => (
    <div className='w-full max-w-sm'>
      <SegmentedControl.Root defaultValue='system'>
        <SegmentedControl.List>
          <SegmentedControl.Trigger value='light'>
            <RiSunLine className='size-5 shrink-0' />
            Light
          </SegmentedControl.Trigger>
          <SegmentedControl.Trigger value='dark'>
            <RiMoonLine className='size-5 shrink-0' />
            Dark
          </SegmentedControl.Trigger>
          <SegmentedControl.Trigger value='system'>
            <RiEqualizer3Fill className='size-5 shrink-0' />
            System
          </SegmentedControl.Trigger>
        </SegmentedControl.List>
      </SegmentedControl.Root>
    </div>
  ),
};

export const Rounded = {
  render: () => (
    <SegmentedControl.Root defaultValue='system'>
      <SegmentedControl.List
        className='w-fit gap-2 rounded-full'
        floatingBgClassName='rounded-full'
      >
        <SegmentedControl.Trigger value='light' className='aspect-square h-9'>
          <RiSunLine className='size-6' />
        </SegmentedControl.Trigger>
        <SegmentedControl.Trigger value='dark' className='aspect-square h-9'>
          <RiMoonLine className='size-6' />
        </SegmentedControl.Trigger>
        <SegmentedControl.Trigger value='system' className='aspect-square h-9'>
          <RiEqualizer3Fill className='size-6' />
        </SegmentedControl.Trigger>
      </SegmentedControl.List>
    </SegmentedControl.Root>
  ),
};
