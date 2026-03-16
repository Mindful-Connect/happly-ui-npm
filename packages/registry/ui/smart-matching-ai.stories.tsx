import * as SmartMatchingAi from './smart-matching-ai';

export default { title: 'Displaying Data/Smart Matching AI', component: SmartMatchingAi.Root };

export const Default = {
  render: () => <SmartMatchingAi.Root size='2xl' />,
};

export const Sizes = {
  render: () => (
    <div className='flex items-center gap-4'>
      <SmartMatchingAi.Root size='xs' />
      <SmartMatchingAi.Root size='sm' />
      <SmartMatchingAi.Root size='md' />
      <SmartMatchingAi.Root size='lg' />
      <SmartMatchingAi.Root size='xl' />
      <SmartMatchingAi.Root size='2xl' />
    </div>
  ),
};

export const Playground = {
  args: {
    size: '2xl' as const,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
  },
  render: (args: { size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' }) => (
    <SmartMatchingAi.Root {...args} />
  ),
};
