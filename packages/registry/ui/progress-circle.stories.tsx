import * as ProgressCircle from './progress-circle';

export default { title: 'Displaying Data/Progress Circle', component: ProgressCircle.Root };

export const Playground = {
  args: {
    value: 50,
    max: 100,
    size: 80,
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    max: { control: 'number' },
    size: { control: { type: 'range', min: 24, max: 200, step: 4 } },
  },
  render: (args: any) => <ProgressCircle.Root {...args}>{args.value}%</ProgressCircle.Root>,
};

export const Sizes = {
  render: () => (
    <div className='flex flex-col items-center gap-6'>
      <div className='flex items-center gap-6'>
        <ProgressCircle.Root size={80} value={75}>75%</ProgressCircle.Root>
        <ProgressCircle.Root size={72} value={75}>75%</ProgressCircle.Root>
        <ProgressCircle.Root size={64} value={75}>75%</ProgressCircle.Root>
        <ProgressCircle.Root size={56} value={75}>75%</ProgressCircle.Root>
        <ProgressCircle.Root size={48} value={75} />
        <ProgressCircle.Root size={36} value={75} />
        <ProgressCircle.Root size={24} value={75} />
      </div>
    </div>
  ),
};
