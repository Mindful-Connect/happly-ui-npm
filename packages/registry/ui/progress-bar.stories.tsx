import * as ProgressBar from './progress-bar';
import * as LinkButton from './link-button';

export default {
  title: 'Displaying Data/Progress Bar',
  component: ProgressBar.Root,
};

export const Playground = {
  args: {
    value: 50,
    max: 100,
    color: 'primary',
    indeterminate: false,
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    max: { control: 'number' },
    color: {
      control: 'select',
      options: ['blue', 'red', 'orange', 'green', 'primary'],
    },
    indeterminate: { control: 'boolean' },
  },
  render: (args: any) => (
    <div className='w-96'>
      <ProgressBar.Root {...args} />
    </div>
  ),
};

export const Color = {
  render: () => (
    <div className='flex w-96 flex-col gap-6'>
      <ProgressBar.Root value={50} max={100} color='blue' />
      <ProgressBar.Root value={50} max={100} color='red' />
      <ProgressBar.Root value={50} max={100} color='orange' />
      <ProgressBar.Root value={50} max={100} color='green' />
      <ProgressBar.Root value={50} max={100} color='primary' />
    </div>
  ),
};

export const WithLabel = {
  render: () => (
    <div className='w-96'>
      <div className='flex items-center gap-2'>
        <ProgressBar.Root value={55} color='primary' />
        <span className='text-paragraph-xs text-text-sub-600'>55%</span>
      </div>
    </div>
  ),
};

export const DataStorage = {
  render: () => (
    <div className='w-96'>
      <div className='space-y-1.5'>
        <div className='flex justify-between gap-1.5'>
          <span className='text-label-sm text-text-strong-950'>
            Data Storage
          </span>
          <span className='text-paragraph-xs text-text-sub-600'>55%</span>
        </div>
        <ProgressBar.Root value={55} color='primary' />
        <div className='text-paragraph-xs text-text-sub-600'>
          <LinkButton.Root variant='primary' underline>
            Upgrade
          </LinkButton.Root>{' '}
          to unlock unlimited data storage.
        </div>
      </div>
    </div>
  ),
};

export const Indeterminate = {
  render: () => (
    <div className='w-96'>
      <ProgressBar.Root indeterminate color='primary' />
    </div>
  ),
};

export const IndeterminateColors = {
  render: () => (
    <div className='flex w-96 flex-col gap-6'>
      <ProgressBar.Root indeterminate color='blue' />
      <ProgressBar.Root indeterminate color='red' />
      <ProgressBar.Root indeterminate color='orange' />
      <ProgressBar.Root indeterminate color='green' />
      <ProgressBar.Root indeterminate color='primary' />
    </div>
  ),
};

export const IndeterminateWithFinalizing = {
  render: () => (
    <div className='w-96'>
      <div className='space-y-1.5'>
        <span className='text-label-sm text-text-strong-950'>
          Finalizing your matches...
        </span>
        <ProgressBar.Root indeterminate color='primary' />
      </div>
    </div>
  ),
};
