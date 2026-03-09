import {
  RiAlertFill,
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiForbidFill,
} from '@remixicon/react';

import * as StatusBadge from './status-badge';

export default { title: 'Displaying Data/Status Badge', component: StatusBadge.Root };

export const Disabled = {
  render: () => (
    <div className='flex items-center gap-6'>
      <div className='flex flex-col gap-6'>
        <StatusBadge.Root status='disabled'>
          <StatusBadge.Icon as={RiForbidFill} />
          Badge
        </StatusBadge.Root>
        <StatusBadge.Root status='disabled' variant='light'>
          <StatusBadge.Icon as={RiForbidFill} />
          Badge
        </StatusBadge.Root>
      </div>
      <div className='flex flex-col gap-6'>
        <StatusBadge.Root status='disabled'>
          <StatusBadge.Dot />
          Badge
        </StatusBadge.Root>
        <StatusBadge.Root status='disabled' variant='light'>
          <StatusBadge.Dot />
          Badge
        </StatusBadge.Root>
      </div>
    </div>
  ),
};

export const Completed = {
  render: () => (
    <div className='flex items-center gap-6'>
      <div className='flex flex-col gap-6'>
        <StatusBadge.Root status='completed'>
          <StatusBadge.Icon as={RiCheckboxCircleFill} />
          Badge
        </StatusBadge.Root>
        <StatusBadge.Root status='completed' variant='light'>
          <StatusBadge.Icon as={RiCheckboxCircleFill} />
          Badge
        </StatusBadge.Root>
      </div>
      <div className='flex flex-col gap-6'>
        <StatusBadge.Root status='completed'>
          <StatusBadge.Dot />
          Badge
        </StatusBadge.Root>
        <StatusBadge.Root status='completed' variant='light'>
          <StatusBadge.Dot />
          Badge
        </StatusBadge.Root>
      </div>
    </div>
  ),
};

export const Failed = {
  render: () => (
    <div className='flex items-center gap-6'>
      <div className='flex flex-col gap-6'>
        <StatusBadge.Root status='failed'>
          <StatusBadge.Icon as={RiErrorWarningFill} />
          Badge
        </StatusBadge.Root>
        <StatusBadge.Root status='failed' variant='light'>
          <StatusBadge.Icon as={RiErrorWarningFill} />
          Badge
        </StatusBadge.Root>
      </div>
      <div className='flex flex-col gap-6'>
        <StatusBadge.Root status='failed'>
          <StatusBadge.Dot />
          Badge
        </StatusBadge.Root>
        <StatusBadge.Root status='failed' variant='light'>
          <StatusBadge.Dot />
          Badge
        </StatusBadge.Root>
      </div>
    </div>
  ),
};

export const Pending = {
  render: () => (
    <div className='flex items-center gap-6'>
      <div className='flex flex-col gap-6'>
        <StatusBadge.Root status='pending'>
          <StatusBadge.Icon as={RiAlertFill} />
          Badge
        </StatusBadge.Root>
        <StatusBadge.Root status='pending' variant='light'>
          <StatusBadge.Icon as={RiAlertFill} />
          Badge
        </StatusBadge.Root>
      </div>
      <div className='flex flex-col gap-6'>
        <StatusBadge.Root status='pending'>
          <StatusBadge.Dot />
          Badge
        </StatusBadge.Root>
        <StatusBadge.Root status='pending' variant='light'>
          <StatusBadge.Dot />
          Badge
        </StatusBadge.Root>
      </div>
    </div>
  ),
};

export const AsChild = {
  render: () => (
    <StatusBadge.Root asChild>
      <button type='button'>
        <StatusBadge.Icon as={RiForbidFill} />
        Badge
      </button>
    </StatusBadge.Root>
  ),
};
