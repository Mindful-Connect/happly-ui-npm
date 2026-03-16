import { LevelBar } from './level-bar';

export default { title: 'Displaying Data/Level Bar' };

export const Playground = {
  args: {
    level: 2,
    levels: 3,
  },
  argTypes: {
    level: { control: { type: 'number', min: 0, max: 10 } },
    levels: { control: { type: 'number', min: 1, max: 10 } },
  },
  render: (args: any) => (
    <div className='w-[360px]'>
      <LevelBar {...args} />
    </div>
  ),
};

export const Levels = {
  render: () => (
    <div className='flex w-[360px] flex-col gap-4'>
      <div className='flex flex-col gap-1'>
        <span className='text-paragraph-xs text-text-sub-600'>Level 0</span>
        <LevelBar level={0} />
      </div>
      <div className='flex flex-col gap-1'>
        <span className='text-paragraph-xs text-text-sub-600'>Level 1</span>
        <LevelBar level={1} />
      </div>
      <div className='flex flex-col gap-1'>
        <span className='text-paragraph-xs text-text-sub-600'>Level 2</span>
        <LevelBar level={2} />
      </div>
      <div className='flex flex-col gap-1'>
        <span className='text-paragraph-xs text-text-sub-600'>Level 3</span>
        <LevelBar level={3} />
      </div>
    </div>
  ),
};

export const CustomSegments = {
  render: () => {
    const fiveColors: Record<number, string> = {
      1: 'text-error-base',
      2: 'text-error-base',
      3: 'text-warning-base',
      4: 'text-warning-base',
      5: 'text-success-base',
    };

    return (
      <div className='flex w-[360px] flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <span className='text-paragraph-xs text-text-sub-600'>
            5 segments, level 0
          </span>
          <LevelBar level={0} levels={5} levelColors={fiveColors} />
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-paragraph-xs text-text-sub-600'>
            5 segments, level 3
          </span>
          <LevelBar level={3} levels={5} levelColors={fiveColors} />
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-paragraph-xs text-text-sub-600'>
            5 segments, level 5
          </span>
          <LevelBar level={5} levels={5} levelColors={fiveColors} />
        </div>
      </div>
    );
  },
};
