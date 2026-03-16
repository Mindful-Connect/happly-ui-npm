import { RiEqualizer3Fill, RiMoonLine, RiSunLine } from '@remixicon/react';

import * as SwitchToggle from './switch-toggle';

export default {
  title: 'Layout/Switch Toggle',
  component: SwitchToggle.Root,
};

export const Default = {
  render: () => (
    <div className='w-full max-w-sm'>
      <SwitchToggle.Root defaultValue='system'>
        <SwitchToggle.List>
          <SwitchToggle.Trigger value='light'>
            <RiSunLine className='w-5 h-5 shrink-0' />
            Light
          </SwitchToggle.Trigger>
          <SwitchToggle.Trigger value='dark'>
            <RiMoonLine className='w-5 h-5 shrink-0' />
            Dark
          </SwitchToggle.Trigger>
          <SwitchToggle.Trigger value='system'>
            <RiEqualizer3Fill className='w-5 h-5 shrink-0' />
            System
          </SwitchToggle.Trigger>
        </SwitchToggle.List>
      </SwitchToggle.Root>
    </div>
  ),
};

export const Rounded = {
  render: () => (
    <SwitchToggle.Root defaultValue='system'>
      <SwitchToggle.List
        className='w-fit gap-2 rounded-full'
        floatingBgClassName='rounded-full'
      >
        <SwitchToggle.Trigger value='light' className='aspect-square h-9'>
          <RiSunLine className='w-6 h-6' />
        </SwitchToggle.Trigger>
        <SwitchToggle.Trigger value='dark' className='aspect-square h-9'>
          <RiMoonLine className='w-6 h-6' />
        </SwitchToggle.Trigger>
        <SwitchToggle.Trigger value='system' className='aspect-square h-9'>
          <RiEqualizer3Fill className='w-6 h-6' />
        </SwitchToggle.Trigger>
      </SwitchToggle.List>
    </SwitchToggle.Root>
  ),
};

// --- Composed (Group) stories ---

const themeItems: SwitchToggle.SwitchToggleGroupItem[] = [
  { value: 'light', label: 'Light', icon: RiSunLine },
  { value: 'dark', label: 'Dark', icon: RiMoonLine },
  { value: 'system', label: 'System', icon: RiEqualizer3Fill },
];

const textOnlyItems: SwitchToggle.SwitchToggleGroupItem[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

export const GroupDefault = {
  render: () => (
    <div className='w-full max-w-sm'>
      <SwitchToggle.Group
        defaultValue='system'
        items={themeItems}
      />
    </div>
  ),
};

export const GroupTextOnly = {
  render: () => (
    <div className='w-full max-w-sm'>
      <SwitchToggle.Group
        defaultValue='weekly'
        items={textOnlyItems}
      />
    </div>
  ),
};
