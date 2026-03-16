import * as AiOrb from './ai-orb';

export default { title: 'Displaying Data/AI Orb', component: AiOrb.Root };

export const Default = {
  render: () => <AiOrb.Root size={112} />,
};

export const Animated = {
  render: () => (
    <div className='flex items-center gap-8'>
      <AiOrb.Root size={112} animated />
      <AiOrb.Root size={56} animated />
      <AiOrb.Root size={40} animated />
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div className='flex items-center gap-4'>
      <AiOrb.Root size={24} />
      <AiOrb.Root size={32} />
      <AiOrb.Root size={40} />
      <AiOrb.Root size={48} />
      <AiOrb.Root size={56} />
      <AiOrb.Root size={112} />
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
    <AiOrb.Root {...args} />
  ),
};
