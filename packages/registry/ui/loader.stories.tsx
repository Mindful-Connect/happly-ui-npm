import * as Loader from './loader';

export default { title: 'Feedback/Loader', component: Loader.Root };

export const Playground = {
  args: {
    size: 24,
    color: 'primary',
  },
  argTypes: {
    size: { control: { type: 'range', min: 12, max: 64, step: 2 } },
    color: {
      control: 'select',
      options: [
        'primary',
        'neutral',
        'white',
        'error',
        'success',
        'warning',
        'current',
      ],
    },
  },
  render: (args: any) => (
    <div className='flex items-center justify-center p-8'>
      <Loader.Root {...args} />
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div className='flex items-center gap-6'>
      <Loader.Root size={14} />
      <Loader.Root size={20} />
      <Loader.Root size={24} />
      <Loader.Root size={32} />
      <Loader.Root size={48} />
    </div>
  ),
};

export const Colors = {
  render: () => (
    <div className='flex items-center gap-6'>
      <Loader.Root color='primary' />
      <Loader.Root color='neutral' />
      <Loader.Root color='error' />
      <Loader.Root color='success' />
      <Loader.Root color='warning' />
      <div className='bg-bg-strong-950 rounded-lg p-3'>
        <Loader.Root color='white' />
      </div>
    </div>
  ),
};

export const Inline = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <p className='text-paragraph-sm text-text-sub-600 flex items-center gap-2'>
        <Loader.Root size={14} color='current' />
        Fetching results...
      </p>
      <p className='text-paragraph-md text-text-strong-950 flex items-center gap-2'>
        <Loader.Root size={18} color='primary' />
        Processing your request
      </p>
    </div>
  ),
};

export const CustomStroke = {
  render: () => (
    <div className='flex items-center gap-6'>
      <Loader.Root size={32} strokeWidth={2} />
      <Loader.Root size={32} strokeWidth={4} />
      <Loader.Root size={32} strokeWidth={6} />
    </div>
  ),
};
