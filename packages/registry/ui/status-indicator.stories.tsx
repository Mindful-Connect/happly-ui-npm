import * as StatusIndicator from './status-indicator';

export default { title: 'UI/Status Indicator' };

export const TopVariants = {
  render: () => (
    <div className='flex items-center gap-4'>
      <StatusIndicator.Root status='verified' />
      <StatusIndicator.Root status='pin' />
      <StatusIndicator.Root status='favorite' />
      <StatusIndicator.Root status='add' />
      <StatusIndicator.Root status='remove' />
      <StatusIndicator.Root status='notification' />
    </div>
  ),
};

export const BottomVariants = {
  render: () => (
    <div className='flex items-center gap-4'>
      <StatusIndicator.Root status='online' />
      <StatusIndicator.Root status='offline' />
      <StatusIndicator.Root status='busy' />
      <StatusIndicator.Root status='away' />
      <StatusIndicator.Root status='company'>
        <img
          src='https://i.pravatar.cc/40?u=company'
          alt='Company'
          className='h-full w-full rounded-full object-cover'
        />
      </StatusIndicator.Root>
    </div>
  ),
};
