import * as Skeleton from './skeleton';

export default { title: 'Displaying Data/Skeleton', component: Skeleton.Root };

export const Default = {
  render: () => (
    <div className='flex w-80 flex-col gap-3'>
      <Skeleton.Root className='h-4 w-3/4' />
      <Skeleton.Root className='h-4 w-1/2' />
      <Skeleton.Root className='h-4 w-5/6' />
    </div>
  ),
};

export const Card = {
  render: () => (
    <div className='flex w-80 flex-col gap-4 rounded-2xl border border-stroke-soft-200 p-5'>
      <div className='flex items-center gap-3'>
        <Skeleton.Root variant='circular' className='size-10' />
        <div className='flex flex-1 flex-col gap-2'>
          <Skeleton.Root className='h-4 w-1/2' />
          <Skeleton.Root className='h-3 w-1/3' />
        </div>
      </div>
      <Skeleton.Root className='h-32 w-full' />
      <div className='flex flex-col gap-2'>
        <Skeleton.Root className='h-4 w-full' />
        <Skeleton.Root className='h-4 w-4/5' />
      </div>
    </div>
  ),
};

export const Circular = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Skeleton.Root variant='circular' className='size-8' />
      <Skeleton.Root variant='circular' className='size-10' />
      <Skeleton.Root variant='circular' className='size-12' />
    </div>
  ),
};
