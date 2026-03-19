import {
  RiCheckLine,
  RiFlashlightLine,
  RiHeartLine,
  RiHome2Line,
  RiNotification3Line,
  RiSearchLine,
  RiSettings3Line,
  RiStarLine,
  RiUser3Line,
} from '@remixicon/react';

import * as KeyIcon from './key-icon';

export default {
  title: 'Displaying Data/Key Icon',
};

export const Playground = {
  args: {
    size: 'md',
    style: 'stroke',
    color: 'gray',
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', '2xl'] },
    style: {
      control: 'select',
      options: ['stroke', 'lighter', 'filled'],
    },
    color: {
      control: 'select',
      options: [
        'gray',
        'blue',
        'orange',
        'red',
        'green',
        'yellow',
        'purple',
        'pink',
        'teal',
        'primary',
      ],
    },
  },
  render: (args: any) => <KeyIcon.Root {...args} icon={<RiHome2Line />} />,
};

export const Stroke = {
  render: () => (
    <div className='flex items-end gap-4'>
      <KeyIcon.Root size='sm' icon={<RiSearchLine />} />
      <KeyIcon.Root size='md' icon={<RiHome2Line />} />
      <KeyIcon.Root size='lg' icon={<RiUser3Line />} />
      <KeyIcon.Root size='xl' icon={<RiSettings3Line />} />
      <KeyIcon.Root size='2xl' icon={<RiNotification3Line />} />
    </div>
  ),
};

export const Lighter = {
  render: () => (
    <div className='flex flex-wrap items-end gap-4'>
      <KeyIcon.Root style='lighter' color='gray' icon={<RiHome2Line />} />
      <KeyIcon.Root style='lighter' color='blue' icon={<RiSearchLine />} />
      <KeyIcon.Root
        style='lighter'
        color='orange'
        icon={<RiFlashlightLine />}
      />
      <KeyIcon.Root style='lighter' color='red' icon={<RiHeartLine />} />
      <KeyIcon.Root style='lighter' color='green' icon={<RiCheckLine />} />
      <KeyIcon.Root style='lighter' color='yellow' icon={<RiStarLine />} />
      <KeyIcon.Root style='lighter' color='purple' icon={<RiUser3Line />} />
      <KeyIcon.Root
        style='lighter'
        color='pink'
        icon={<RiNotification3Line />}
      />
      <KeyIcon.Root style='lighter' color='teal' icon={<RiSettings3Line />} />
      <KeyIcon.Root style='lighter' color='primary' icon={<RiStarLine />} />
    </div>
  ),
};

export const Filled = {
  render: () => (
    <div className='flex flex-wrap items-end gap-4'>
      <KeyIcon.Root style='filled' color='gray' icon={<RiHome2Line />} />
      <KeyIcon.Root style='filled' color='blue' icon={<RiSearchLine />} />
      <KeyIcon.Root style='filled' color='orange' icon={<RiFlashlightLine />} />
      <KeyIcon.Root style='filled' color='red' icon={<RiHeartLine />} />
      <KeyIcon.Root style='filled' color='green' icon={<RiCheckLine />} />
      <KeyIcon.Root style='filled' color='yellow' icon={<RiStarLine />} />
      <KeyIcon.Root style='filled' color='purple' icon={<RiUser3Line />} />
      <KeyIcon.Root
        style='filled'
        color='pink'
        icon={<RiNotification3Line />}
      />
      <KeyIcon.Root style='filled' color='teal' icon={<RiSettings3Line />} />
      <KeyIcon.Root style='filled' color='primary' icon={<RiStarLine />} />
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div className='flex flex-col gap-6'>
      {(['sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <div key={size} className='flex items-center gap-4'>
          <span className='text-paragraph-sm text-text-sub-600 w-8'>
            {size}
          </span>
          <KeyIcon.Root size={size} style='stroke' icon={<RiHome2Line />} />
          <KeyIcon.Root
            size={size}
            style='lighter'
            color='blue'
            icon={<RiHome2Line />}
          />
          <KeyIcon.Root
            size={size}
            style='filled'
            color='blue'
            icon={<RiHome2Line />}
          />
        </div>
      ))}
    </div>
  ),
};

export const Colors = {
  render: () => (
    <div className='flex flex-col gap-4'>
      {(
        [
          'gray',
          'blue',
          'orange',
          'red',
          'green',
          'yellow',
          'purple',
          'pink',
          'teal',
          'primary',
        ] as const
      ).map((color) => (
        <div key={color} className='flex items-center gap-4'>
          <span className='text-paragraph-sm text-text-sub-600 w-16'>
            {color}
          </span>
          <KeyIcon.Root
            size='lg'
            style='stroke'
            color={color}
            icon={<RiStarLine />}
          />
          <KeyIcon.Root
            size='lg'
            style='lighter'
            color={color}
            icon={<RiStarLine />}
          />
          <KeyIcon.Root
            size='lg'
            style='filled'
            color={color}
            icon={<RiStarLine />}
          />
        </div>
      ))}
    </div>
  ),
};
