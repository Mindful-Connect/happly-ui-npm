import { RiBuildingLine } from '@remixicon/react';

import * as Avatar from './avatar';

export default { title: 'Displaying Data/Avatar', component: Avatar.Root };

export const Playground = {
  args: {
    size: '80',
    color: 'gray',
    placeholderType: 'user',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['80', '72', '64', '56', '48', '40', '32', '24', '20'],
    },
    color: {
      control: 'select',
      options: ['gray', 'yellow', 'blue', 'sky', 'purple', 'red', 'primary'],
    },
    placeholderType: { control: 'select', options: ['user', 'company'] },
  },
  render: (args: any) => (
    <Avatar.Root {...args}>
      <Avatar.Image src='https://i.pravatar.cc/160?img=1' />
    </Avatar.Root>
  ),
};

export const Color = {
  render: () => (
    <div className='flex w-full max-w-96 flex-wrap justify-center gap-6'>
      <Avatar.Root>EW</Avatar.Root>
      <Avatar.Root color='yellow'>EW</Avatar.Root>
      <Avatar.Root color='blue'>EW</Avatar.Root>
      <Avatar.Root color='sky'>EW</Avatar.Root>
      <Avatar.Root color='purple'>EW</Avatar.Root>
      <Avatar.Root color='red'>EW</Avatar.Root>
      <Avatar.Root color='primary'>EW</Avatar.Root>
    </div>
  ),
};

export const Size = {
  render: () => (
    <div className='flex w-full max-w-96 flex-wrap items-center justify-center gap-6'>
      <Avatar.Root>
        <Avatar.Image src='https://i.pravatar.cc/160?img=15' />
      </Avatar.Root>

      <Avatar.Root size='72'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=15' />
      </Avatar.Root>

      <Avatar.Root size='64'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=15' />
      </Avatar.Root>

      <Avatar.Root size='56'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=15' />
      </Avatar.Root>

      <Avatar.Root size='48'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=15' />
      </Avatar.Root>

      <Avatar.Root size='40'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=15' />
      </Avatar.Root>

      <Avatar.Root size='32'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=15' />
      </Avatar.Root>

      <Avatar.Root size='24'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=15' />
      </Avatar.Root>

      <Avatar.Root size='20'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=15' />
      </Avatar.Root>
    </div>
  ),
};

export const Text = {
  render: () => (
    <div className='flex gap-6'>
      <Avatar.Root>EW</Avatar.Root>
      <Avatar.Root color='yellow'>EW</Avatar.Root>
      <Avatar.Root color='purple'>EW</Avatar.Root>
    </div>
  ),
};

export const Placeholder = {
  render: () => (
    <div className='flex gap-6'>
      <Avatar.Root />
      <Avatar.Root color='yellow' placeholderType='company' />
      <Avatar.Root color='purple' />
    </div>
  ),
};

export const Status = {
  render: () => (
    <div className='flex w-full max-w-96 flex-wrap justify-center gap-6'>
      <Avatar.Root>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator>
          <Avatar.Status status='online' />
        </Avatar.Indicator>
      </Avatar.Root>

      <Avatar.Root>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator>
          <Avatar.Status status='offline' />
        </Avatar.Indicator>
      </Avatar.Root>

      <Avatar.Root>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator>
          <Avatar.Status status='busy' />
        </Avatar.Indicator>
      </Avatar.Root>

      <Avatar.Root>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator>
          <Avatar.Status status='away' />
        </Avatar.Indicator>
      </Avatar.Root>

      <Avatar.Root>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator>
          <Avatar.Status className='bg-blue-400' />
        </Avatar.Indicator>
      </Avatar.Root>
    </div>
  ),
};

export const Notification = {
  render: () => (
    <div className='flex w-full max-w-96 flex-wrap items-center justify-center gap-6'>
      <Avatar.Root>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator position='top'>
          <Avatar.Notification />
        </Avatar.Indicator>
      </Avatar.Root>

      <Avatar.Root size='72'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator position='top'>
          <Avatar.Notification />
        </Avatar.Indicator>
      </Avatar.Root>

      <Avatar.Root size='64'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator position='top'>
          <Avatar.Notification />
        </Avatar.Indicator>
      </Avatar.Root>

      <Avatar.Root size='56'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator position='top'>
          <Avatar.Notification />
        </Avatar.Indicator>
      </Avatar.Root>

      <Avatar.Root size='48'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator position='top'>
          <Avatar.Notification />
        </Avatar.Indicator>
      </Avatar.Root>

      <Avatar.Root size='40'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator position='top'>
          <Avatar.Notification />
        </Avatar.Indicator>
      </Avatar.Root>

      <Avatar.Root size='32'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator position='top'>
          <Avatar.Notification />
        </Avatar.Indicator>
      </Avatar.Root>

      <Avatar.Root size='24'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator position='top'>
          <Avatar.Notification />
        </Avatar.Indicator>
      </Avatar.Root>

      <Avatar.Root size='20'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator position='top'>
          <Avatar.Notification />
        </Avatar.Indicator>
      </Avatar.Root>
    </div>
  ),
};

export const BrandLogo = {
  render: () => (
    <div className='flex w-full max-w-96 flex-wrap items-center justify-center gap-6'>
      <Avatar.Root>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator position='bottom'>
          <Avatar.BrandLogo src='https://i.pravatar.cc/48?img=3' />
        </Avatar.Indicator>
      </Avatar.Root>

      <Avatar.Root size='72'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator position='bottom'>
          <Avatar.BrandLogo src='https://i.pravatar.cc/48?img=3' />
        </Avatar.Indicator>
      </Avatar.Root>

      <Avatar.Root size='64'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator position='bottom'>
          <Avatar.BrandLogo src='https://i.pravatar.cc/48?img=3' />
        </Avatar.Indicator>
      </Avatar.Root>

      <Avatar.Root size='56'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator position='bottom'>
          <Avatar.BrandLogo src='https://i.pravatar.cc/48?img=3' />
        </Avatar.Indicator>
      </Avatar.Root>

      <Avatar.Root size='48'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator position='bottom'>
          <Avatar.BrandLogo src='https://i.pravatar.cc/48?img=3' />
        </Avatar.Indicator>
      </Avatar.Root>

      <Avatar.Root size='40'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator position='bottom'>
          <Avatar.BrandLogo src='https://i.pravatar.cc/48?img=3' />
        </Avatar.Indicator>
      </Avatar.Root>

      <Avatar.Root size='32'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator position='bottom'>
          <Avatar.BrandLogo src='https://i.pravatar.cc/48?img=3' />
        </Avatar.Indicator>
      </Avatar.Root>

      <Avatar.Root size='24'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator position='bottom'>
          <Avatar.BrandLogo src='https://i.pravatar.cc/48?img=3' />
        </Avatar.Indicator>
      </Avatar.Root>

      <Avatar.Root size='20'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator position='bottom'>
          <Avatar.BrandLogo src='https://i.pravatar.cc/48?img=3' />
        </Avatar.Indicator>
      </Avatar.Root>
    </div>
  ),
};

export const IndicatorCustomSVG = {
  render: () => (
    <div className='flex w-full max-w-96 flex-wrap items-center justify-center gap-6'>
      <Avatar.Root>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator position='top'>
          <Avatar.VerifiedIcon />
        </Avatar.Indicator>
      </Avatar.Root>

      <Avatar.Root size='72'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator position='top'>
          <Avatar.VerifiedIcon />
        </Avatar.Indicator>
      </Avatar.Root>

      <Avatar.Root size='64'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator position='top'>
          <Avatar.VerifiedIcon />
        </Avatar.Indicator>
      </Avatar.Root>

      <Avatar.Root size='56'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator position='top'>
          <Avatar.VerifiedIcon />
        </Avatar.Indicator>
      </Avatar.Root>

      <Avatar.Root size='48'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator position='top'>
          <Avatar.VerifiedIcon />
        </Avatar.Indicator>
      </Avatar.Root>

      <Avatar.Root size='40'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator position='top'>
          <Avatar.VerifiedIcon />
        </Avatar.Indicator>
      </Avatar.Root>

      <Avatar.Root size='32'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator position='top'>
          <Avatar.VerifiedIcon />
        </Avatar.Indicator>
      </Avatar.Root>

      <Avatar.Root size='24'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator position='top'>
          <Avatar.VerifiedIcon />
        </Avatar.Indicator>
      </Avatar.Root>

      <Avatar.Root size='20'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        <Avatar.Indicator position='top'>
          <Avatar.VerifiedIcon />
        </Avatar.Indicator>
      </Avatar.Root>
    </div>
  ),
};

export const SquareRounded = {
  render: () => (
    <div className='flex w-full max-w-96 flex-wrap items-center justify-center gap-6'>
      <Avatar.Root className='rounded-lg'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=1' />
      </Avatar.Root>

      <Avatar.Root size='64' className='rounded-lg'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=1' />
      </Avatar.Root>

      <Avatar.Root size='48' className='rounded-lg'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=1' />
      </Avatar.Root>

      <Avatar.Root size='32' className='rounded-md'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=1' />
      </Avatar.Root>

      <Avatar.Root size='24' className='rounded-md'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=1' />
      </Avatar.Root>

      <Avatar.Root color='yellow' className='rounded-lg'>
        EW
      </Avatar.Root>

      <Avatar.Root className='rounded-lg' placeholderType='company' />

      <Avatar.Root className='rounded-lg' />

      <Avatar.Root
        className='rounded-xl bg-[#EFEBFF] ring-[1.26px] ring-[rgba(14,18,27,0.1)]'
        placeholder={<RiBuildingLine className='h-10 w-10 text-[#B8ACF6]' />}
      />
    </div>
  ),
};

export const CustomPlaceholder = {
  render: () => (
    <div className='flex items-center gap-6'>
      <Avatar.Root
        placeholder={<RiBuildingLine className='h-10 w-10' />}
        color='primary'
      />
      <Avatar.Root
        placeholder={<RiBuildingLine className='h-8 w-8' />}
        color='primary'
        size='64'
      />
      <Avatar.Root
        placeholder={<RiBuildingLine className='h-6 w-6' />}
        color='primary'
        size='48'
      />
    </div>
  ),
};

export const AsLink = {
  render: () => (
    <Avatar.Root asChild>
      <a href='#'>
        <Avatar.Image src='https://i.pravatar.cc/160?img=8' />
      </a>
    </Avatar.Root>
  ),
};
