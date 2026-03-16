import * as SmartMatchingAi from './smart-matching-ai';

export default { title: 'UI/Smart Matching AI', component: SmartMatchingAi.Root };

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

export const DebugLayers = {
  render: () => {
    /* Render just the rainbow gradient without any blend/overlay layers
       to check if the base colors are correct */
    return (
      <div className='flex items-start gap-6 flex-wrap'>
        <div className='flex flex-col items-center gap-2'>
          <SmartMatchingAi.Root size='2xl' />
          <span className='text-xs text-neutral-500'>Full component</span>
        </div>
        <div className='flex flex-col items-center gap-2'>
          <svg width='112' height='112' viewBox='0 0 112 112' fill='none'
            style={{ isolation: 'isolate', background: '#eee' }} colorInterpolation='sRGB'
            className='size-[112px]'>
            <defs>
              <clipPath id='debug-clip'><circle cx='56' cy='56' r='56' /></clipPath>
              <filter id='debug-f0' x='70' y='0' width='193.101' height='193.101'
                filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
                <feFlood floodOpacity='0' result='bg' />
                <feBlend mode='normal' in='SourceGraphic' in2='bg' result='shape' />
                <feGaussianBlur stdDeviation='30.3333' />
              </filter>
              <filter id='debug-f1' x='49' y='60.6667' width='193.101' height='193.101'
                filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
                <feFlood floodOpacity='0' result='bg' />
                <feBlend mode='normal' in='SourceGraphic' in2='bg' result='shape' />
                <feGaussianBlur stdDeviation='30.3333' />
              </filter>
              <filter id='debug-f2' x='0' y='49' width='193.101' height='193.101'
                filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
                <feFlood floodOpacity='0' result='bg' />
                <feBlend mode='normal' in='SourceGraphic' in2='bg' result='shape' />
                <feGaussianBlur stdDeviation='30.3333' />
              </filter>
              <filter id='debug-f3' x='14' y='9.33333' width='193.101' height='193.101'
                filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
                <feFlood floodOpacity='0' result='bg' />
                <feBlend mode='normal' in='SourceGraphic' in2='bg' result='shape' />
                <feGaussianBlur stdDeviation='30.3333' />
              </filter>
            </defs>
            <g clipPath='url(#debug-clip)'>
              <circle cx='56' cy='56' r='56' fill='white' />
              <g opacity='0.999' transform='translate(-68, -77.4)'>
                <g filter='url(#debug-f0)'>
                  <circle cx='166.551' cy='96.5506' r='35.8793'
                    transform='rotate(32.262 166.551 96.5506)' fill='#53E0FF' />
                </g>
                <g filter='url(#debug-f1)'>
                  <circle cx='145.551' cy='157.217' r='35.8793'
                    transform='rotate(32.262 145.551 157.217)' fill='#FBD570' />
                </g>
                <g filter='url(#debug-f2)'>
                  <circle cx='96.5506' cy='145.551' r='35.8793'
                    transform='rotate(32.262 96.5506 145.551)' fill='#FF5D53' />
                </g>
                <g filter='url(#debug-f3)'>
                  <circle cx='110.551' cy='105.884' r='35.8793'
                    transform='rotate(32.262 110.551 105.884)' fill='#536FFF' />
                </g>
              </g>
            </g>
          </svg>
          <span className='text-xs text-neutral-500'>Rainbow only (no blends)</span>
        </div>
        <div className='flex flex-col items-center gap-2'>
          <svg width='112' height='112' viewBox='0 0 112 112' fill='none'
            className='size-[112px]'>
            <defs>
              <clipPath id='debug2-clip'><circle cx='56' cy='56' r='56' /></clipPath>
              <filter id='debug2-f0' x='70' y='0' width='193.101' height='193.101'
                filterUnits='userSpaceOnUse' colorInterpolationFilters='linearRGB'>
                <feFlood floodOpacity='0' result='bg' />
                <feBlend mode='normal' in='SourceGraphic' in2='bg' result='shape' />
                <feGaussianBlur stdDeviation='30.3333' />
              </filter>
              <filter id='debug2-f1' x='49' y='60.6667' width='193.101' height='193.101'
                filterUnits='userSpaceOnUse' colorInterpolationFilters='linearRGB'>
                <feFlood floodOpacity='0' result='bg' />
                <feBlend mode='normal' in='SourceGraphic' in2='bg' result='shape' />
                <feGaussianBlur stdDeviation='30.3333' />
              </filter>
              <filter id='debug2-f2' x='0' y='49' width='193.101' height='193.101'
                filterUnits='userSpaceOnUse' colorInterpolationFilters='linearRGB'>
                <feFlood floodOpacity='0' result='bg' />
                <feBlend mode='normal' in='SourceGraphic' in2='bg' result='shape' />
                <feGaussianBlur stdDeviation='30.3333' />
              </filter>
              <filter id='debug2-f3' x='14' y='9.33333' width='193.101' height='193.101'
                filterUnits='userSpaceOnUse' colorInterpolationFilters='linearRGB'>
                <feFlood floodOpacity='0' result='bg' />
                <feBlend mode='normal' in='SourceGraphic' in2='bg' result='shape' />
                <feGaussianBlur stdDeviation='30.3333' />
              </filter>
            </defs>
            <g clipPath='url(#debug2-clip)'>
              <circle cx='56' cy='56' r='56' fill='white' />
              <g transform='translate(-68, -77.4)'>
                <g filter='url(#debug2-f0)'>
                  <circle cx='166.551' cy='96.5506' r='35.8793'
                    transform='rotate(32.262 166.551 96.5506)' fill='#53E0FF' />
                </g>
                <g filter='url(#debug2-f1)'>
                  <circle cx='145.551' cy='157.217' r='35.8793'
                    transform='rotate(32.262 145.551 157.217)' fill='#FBD570' />
                </g>
                <g filter='url(#debug2-f2)'>
                  <circle cx='96.5506' cy='145.551' r='35.8793'
                    transform='rotate(32.262 96.5506 145.551)' fill='#FF5D53' />
                </g>
                <g filter='url(#debug2-f3)'>
                  <circle cx='110.551' cy='105.884' r='35.8793'
                    transform='rotate(32.262 110.551 105.884)' fill='#536FFF' />
                </g>
              </g>
            </g>
          </svg>
          <span className='text-xs text-neutral-500'>Rainbow only (linearRGB blur)</span>
        </div>
        <div className='flex flex-col items-center gap-2'>
          <svg width='112' height='112' viewBox='0 0 112 112' fill='none'
            style={{ isolation: 'isolate' }} colorInterpolation='sRGB'
            className='size-[112px]'>
            <defs>
              <clipPath id='debug3-clip'><circle cx='56' cy='56' r='56' /></clipPath>
              <filter id='debug3-f0' x='70' y='0' width='193.101' height='193.101'
                filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
                <feFlood floodOpacity='0' result='bg' />
                <feBlend mode='normal' in='SourceGraphic' in2='bg' result='shape' />
                <feGaussianBlur stdDeviation='30.3333' />
              </filter>
              <filter id='debug3-f1' x='49' y='60.6667' width='193.101' height='193.101'
                filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
                <feFlood floodOpacity='0' result='bg' />
                <feBlend mode='normal' in='SourceGraphic' in2='bg' result='shape' />
                <feGaussianBlur stdDeviation='30.3333' />
              </filter>
              <filter id='debug3-f2' x='0' y='49' width='193.101' height='193.101'
                filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
                <feFlood floodOpacity='0' result='bg' />
                <feBlend mode='normal' in='SourceGraphic' in2='bg' result='shape' />
                <feGaussianBlur stdDeviation='30.3333' />
              </filter>
              <filter id='debug3-f3' x='14' y='9.33333' width='193.101' height='193.101'
                filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
                <feFlood floodOpacity='0' result='bg' />
                <feBlend mode='normal' in='SourceGraphic' in2='bg' result='shape' />
                <feGaussianBlur stdDeviation='30.3333' />
              </filter>
            </defs>
            <g clipPath='url(#debug3-clip)'>
              {/* NO white background */}
              <g transform='translate(-68, -77.4)'>
                <g filter='url(#debug3-f0)'>
                  <circle cx='166.551' cy='96.5506' r='35.8793'
                    transform='rotate(32.262 166.551 96.5506)' fill='#53E0FF' />
                </g>
                <g filter='url(#debug3-f1)'>
                  <circle cx='145.551' cy='157.217' r='35.8793'
                    transform='rotate(32.262 145.551 157.217)' fill='#FBD570' />
                </g>
                <g filter='url(#debug3-f2)'>
                  <circle cx='96.5506' cy='145.551' r='35.8793'
                    transform='rotate(32.262 96.5506 145.551)' fill='#FF5D53' />
                </g>
                <g filter='url(#debug3-f3)'>
                  <circle cx='110.551' cy='105.884' r='35.8793'
                    transform='rotate(32.262 110.551 105.884)' fill='#536FFF' />
                </g>
              </g>
            </g>
          </svg>
          <span className='text-xs text-neutral-500'>No white bg (sRGB)</span>
        </div>
      </div>
    );
  },
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
