import * as ProgressCircle from './progress-circle';

export default { title: 'Displaying Data/Progress Circle', component: ProgressCircle.Root };

export const Playground = {
  args: {
    value: 50,
    max: 100,
    size: '80',
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    max: { control: 'number' },
    size: { control: 'select', options: ['80', '72', '64', '56', '48', '44'] },
  },
  render: (args: any) => <ProgressCircle.Root {...args}>{args.value}%</ProgressCircle.Root>,
};

export const Sizes = {
  render: () => (
    <div className='flex flex-col items-center gap-6'>
      <div className='flex gap-6'>
        <ProgressCircle.Root value={0}>0%</ProgressCircle.Root>
        <ProgressCircle.Root value={25}>25%</ProgressCircle.Root>
        <ProgressCircle.Root value={50}>50%</ProgressCircle.Root>
        <ProgressCircle.Root value={75}>75%</ProgressCircle.Root>
        <ProgressCircle.Root value={100}>100%</ProgressCircle.Root>
      </div>
      <div className='flex gap-6'>
        <ProgressCircle.Root size='72' value={0}>
          0%
        </ProgressCircle.Root>
        <ProgressCircle.Root size='72' value={25}>
          25%
        </ProgressCircle.Root>
        <ProgressCircle.Root size='72' value={50}>
          50%
        </ProgressCircle.Root>
        <ProgressCircle.Root size='72' value={75}>
          75%
        </ProgressCircle.Root>
        <ProgressCircle.Root size='72' value={100}>
          100%
        </ProgressCircle.Root>
      </div>
      <div className='flex gap-6'>
        <ProgressCircle.Root size='64' value={0}>
          0%
        </ProgressCircle.Root>
        <ProgressCircle.Root size='64' value={25}>
          25%
        </ProgressCircle.Root>
        <ProgressCircle.Root size='64' value={50}>
          50%
        </ProgressCircle.Root>
        <ProgressCircle.Root size='64' value={75}>
          75%
        </ProgressCircle.Root>
        <ProgressCircle.Root size='64' value={100}>
          100%
        </ProgressCircle.Root>
      </div>
      <div className='flex gap-6'>
        <ProgressCircle.Root size='56' value={0}>
          0%
        </ProgressCircle.Root>
        <ProgressCircle.Root size='56' value={25}>
          25%
        </ProgressCircle.Root>
        <ProgressCircle.Root size='56' value={50}>
          50%
        </ProgressCircle.Root>
        <ProgressCircle.Root size='56' value={75}>
          75%
        </ProgressCircle.Root>
        <ProgressCircle.Root size='56' value={100}>
          100%
        </ProgressCircle.Root>
      </div>
      <div className='flex gap-6'>
        <ProgressCircle.Root size='48' value={0} />
        <ProgressCircle.Root size='48' value={25} />
        <ProgressCircle.Root size='48' value={50} />
        <ProgressCircle.Root size='48' value={75} />
        <ProgressCircle.Root size='48' value={100} />
      </div>
    </div>
  ),
};
