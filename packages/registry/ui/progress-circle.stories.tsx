import * as ProgressCircle from './progress-circle';

export default { title: 'UI/Progress Circle', component: ProgressCircle.Root };

export const Default = {
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
