import * as SmartMatchingAi from './smart-matching-ai';

export default { title: 'Displaying Data/Smart Matching AI', component: SmartMatchingAi.Root };

export const Default = {
  render: () => <SmartMatchingAi.Root size={112} />,
};

export const Animated = {
  render: () => (
    <div className='flex items-center gap-8'>
      <SmartMatchingAi.Root size={112} animated />
      <SmartMatchingAi.Root size={56} animated />
      <SmartMatchingAi.Root size={40} animated />
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div className='flex items-center gap-4'>
      <SmartMatchingAi.Root size={24} />
      <SmartMatchingAi.Root size={32} />
      <SmartMatchingAi.Root size={40} />
      <SmartMatchingAi.Root size={48} />
      <SmartMatchingAi.Root size={56} />
      <SmartMatchingAi.Root size={112} />
    </div>
  ),
};

export const Playground = {
  args: {
    size: 112,
    animated: false,
  },
  argTypes: {
    size: {
      control: { type: 'range', min: 16, max: 200, step: 4 },
    },
    animated: {
      control: 'boolean',
    },
  },
  render: (args: { size: number; animated: boolean }) => (
    <SmartMatchingAi.Root {...args} />
  ),
};
