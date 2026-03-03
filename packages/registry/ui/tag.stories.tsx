import { RiPushpinFill } from '@remixicon/react';

import * as Avatar from './avatar';
import * as Tag from './tag';

export default { title: 'UI/Tag', component: Tag.Root };

export const Stroke = {
  render: () => (
    <div className='flex gap-6'>
      <Tag.Root variant='stroke'>Tag</Tag.Root>
      <Tag.Root variant='stroke'>
        <Tag.Icon as={RiPushpinFill} />
        Customer
      </Tag.Root>
    </div>
  ),
};

export const Gray = {
  render: () => (
    <div className='flex gap-6'>
      <Tag.Root variant='gray'>Tag</Tag.Root>
      <Tag.Root variant='gray'>
        <Tag.Icon as={RiPushpinFill} />
        Customer
      </Tag.Root>
    </div>
  ),
};

export const Disabled = {
  render: () => (
    <div className='flex flex-col items-center gap-6'>
      <div className='flex gap-6'>
        <Tag.Root variant='stroke' disabled>
          Tag
        </Tag.Root>
        <Tag.Root variant='stroke' disabled>
          <Tag.Icon as={RiPushpinFill} />
          Customer
        </Tag.Root>
      </div>

      <div className='flex gap-6'>
        <Tag.Root variant='gray' disabled>
          Tag
        </Tag.Root>
        <Tag.Root variant='gray' disabled>
          <Tag.Icon as={RiPushpinFill} />
          Customer
        </Tag.Root>
      </div>
    </div>
  ),
};

export const WithImage = {
  render: () => (
    <div className='flex gap-6'>
      <Tag.Root>
        <Tag.Icon
          as='img'
          src='https://cdn.simpleicons.org/apple'
          alt='Apple'
          className='-mx-1 size-4 shrink-0 rounded-full object-contain'
        />
        Apple
      </Tag.Root>

      <Tag.Root>
        <Tag.Icon
          as='img'
          src='https://cdn.simpleicons.org/figma'
          alt='Figma'
          className='-mx-1 size-4 shrink-0 rounded-full object-contain'
        />
        Figma
      </Tag.Root>
    </div>
  ),
};

export const WithAvatar = {
  render: () => (
    <div className='flex gap-6'>
      <Tag.Root>
        <Tag.Icon as={Avatar.Root}>
          <Avatar.Image src='https://i.pravatar.cc/160?img=3' />
        </Tag.Icon>
        James Brown
      </Tag.Root>
    </div>
  ),
};

export const Dismissable = {
  render: () => (
    <div className='flex flex-col items-center gap-6'>
      <div className='flex gap-6'>
        <Tag.Root>
          Tag
          <Tag.DismissButton onClick={() => alert('dismiss clicked!')} />
        </Tag.Root>
        <Tag.Root>
          <Tag.Icon as={RiPushpinFill} />
          Customer
          <Tag.DismissButton onClick={() => alert('dismiss clicked!')} />
        </Tag.Root>
      </div>

      <div className='flex gap-6'>
        <Tag.Root variant='gray'>
          Tag
          <Tag.DismissButton onClick={() => alert('dismiss clicked!')} />
        </Tag.Root>
        <Tag.Root variant='gray'>
          <Tag.Icon as={RiPushpinFill} />
          Customer
          <Tag.DismissButton onClick={() => alert('dismiss clicked!')} />
        </Tag.Root>
      </div>
    </div>
  ),
};
