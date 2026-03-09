import * as Badge from './badge';
import { RiFlashlightFill } from 'react-icons/ri';

export default { title: 'Displaying Data/Badge', component: Badge };



export const BadgeFilled = {
  render: () => (
    <div className='flex flex-col items-center gap-6'>
      <Badge.Root variant='filled'>
        <Badge.Icon as={RiFlashlightFill} />
        Badge
      </Badge.Root>

      <Badge.Root variant='filled' color='red'>
        <Badge.Icon as={RiFlashlightFill} />
        Badge
      </Badge.Root>

      <Badge.Root variant='filled' color='pink'>
        <Badge.Icon as={RiFlashlightFill} />
        Badge
      </Badge.Root>

      <Badge.Root variant='filled' color='yellow'>
        <Badge.Icon as={RiFlashlightFill} />
        Badge
      </Badge.Root>

      <Badge.Root variant='filled' color='blue'>
        <Badge.Icon as={RiFlashlightFill} />
        Badge
      </Badge.Root>
    </div>
  ),
};

export const BadgeLight = {
  render: () => (
    <div className='flex flex-col items-center gap-6'>
      <Badge.Root variant='light'>
        <Badge.Icon as={RiFlashlightFill} />
        Badge
      </Badge.Root>

      <Badge.Root variant='light' color='red'>
        <Badge.Icon as={RiFlashlightFill} />
        Badge
      </Badge.Root>

      <Badge.Root variant='light' color='pink'>
        <Badge.Icon as={RiFlashlightFill} />
        Badge
      </Badge.Root>

      <Badge.Root variant='light' color='yellow'>
        <Badge.Icon as={RiFlashlightFill} />
        Badge
      </Badge.Root>

      <Badge.Root variant='light' color='blue'>
        <Badge.Icon as={RiFlashlightFill} />
        Badge
      </Badge.Root>
    </div>
  ),
};

export const BadgeLighter = {
  render: () => (
    <div className='flex flex-col items-center gap-6'>
      <Badge.Root variant='lighter'>
        <Badge.Icon as={RiFlashlightFill} />
        Badge
      </Badge.Root>

      <Badge.Root variant='lighter' color='red'>
        <Badge.Icon as={RiFlashlightFill} />
        Badge
      </Badge.Root>

      <Badge.Root variant='lighter' color='pink'>
        <Badge.Icon as={RiFlashlightFill} />
        Badge
      </Badge.Root>

      <Badge.Root variant='lighter' color='yellow'>
        <Badge.Icon as={RiFlashlightFill} />
        Badge
      </Badge.Root>

      <Badge.Root variant='lighter' color='blue'>
        <Badge.Icon as={RiFlashlightFill} />
        Badge
      </Badge.Root>
    </div>
  ),
};

export const BadgeStroke = {
  render: () => (
    <div className='flex flex-col items-center gap-6'>
      <Badge.Root variant='stroke'>
        <Badge.Icon as={RiFlashlightFill} />
        Badge
      </Badge.Root>

      <Badge.Root variant='stroke' color='red'>
        <Badge.Icon as={RiFlashlightFill} />
        Badge
      </Badge.Root>

      <Badge.Root variant='stroke' color='pink'>
        <Badge.Icon as={RiFlashlightFill} />
        Badge
      </Badge.Root>

      <Badge.Root variant='stroke' color='yellow'>
        <Badge.Icon as={RiFlashlightFill} />
        Badge
      </Badge.Root>

      <Badge.Root variant='stroke' color='blue'>
        <Badge.Icon as={RiFlashlightFill} />
        Badge
      </Badge.Root>
    </div>
  ),
};

export const BadgeColors = {
  render: () => (
    <div className='flex w-full max-w-96 flex-wrap items-center justify-center gap-6'>
      <Badge.Root>Badge</Badge.Root>
      <Badge.Root color='blue'>Badge</Badge.Root>
      <Badge.Root color='orange'>Badge</Badge.Root>
      <Badge.Root color='red'>Badge</Badge.Root>
      <Badge.Root color='green'>Badge</Badge.Root>
      <Badge.Root color='yellow'>Badge</Badge.Root>
      <Badge.Root color='purple'>Badge</Badge.Root>
      <Badge.Root color='sky'>Badge</Badge.Root>
      <Badge.Root color='pink'>Badge</Badge.Root>
      <Badge.Root color='teal'>Badge</Badge.Root>
    </div>
  ),
};

export const Size = {
  render: () => (
    <div className='flex items-center gap-6'>
      <div className='flex flex-col gap-6'>
        <Badge.Root size='medium'>
          <Badge.Icon as={RiFlashlightFill} />
          Badge
        </Badge.Root>

        <Badge.Root>
          <Badge.Icon as={RiFlashlightFill} />
          Badge
        </Badge.Root>
      </div>

      <div className='flex flex-col gap-6'>
        <Badge.Root size='medium'>
          <Badge.Dot />
          Badge
        </Badge.Root>

        <Badge.Root>
          <Badge.Dot />
          Badge
        </Badge.Root>
      </div>
    </div>
  ),
};

export const Square = {
  render: () => (
    <div className='flex flex-col items-center gap-6'>
      <div className='flex items-center gap-6'>
        <Badge.Root square variant='filled' color='red'>
          2
        </Badge.Root>

        <Badge.Root square variant='light' color='pink'>
          5
        </Badge.Root>

        <Badge.Root square variant='lighter' color='green'>
          66
        </Badge.Root>

        <Badge.Root square variant='stroke' color='blue'>
          789
        </Badge.Root>
      </div>
      <div className='flex items-center gap-6'>
        <Badge.Root square size='medium' variant='filled' color='red'>
          2
        </Badge.Root>

        <Badge.Root square size='medium' variant='light' color='pink'>
          5
        </Badge.Root>

        <Badge.Root square size='medium' variant='lighter' color='green'>
          66
        </Badge.Root>

        <Badge.Root square size='medium' variant='stroke' color='blue'>
          789
        </Badge.Root>
      </div>
    </div>
  ),
};

export const WithIcon = {
  render: () => (
    <div className='flex flex-col items-center gap-6'>
      <Badge.Root>
        <Badge.Icon as={RiFlashlightFill} />
        Badge
      </Badge.Root>

      <Badge.Root>
        Badge
        <Badge.Icon as={RiFlashlightFill} />
      </Badge.Root>
    </div>
  ),
}

export const WithDot = {
  render: () => (
    <div className='flex flex-col items-center gap-6'>
      <Badge.Root>
        <Badge.Dot />
        Badge
      </Badge.Root>

      <Badge.Root>
        Badge
        <Badge.Dot />
      </Badge.Root>
    </div>
  ),
}

export const Disabled = {
  render: () => (
    <div className='flex flex-col items-center gap-6'>
      <Badge.Root variant='filled' color='red' disabled>
        <Badge.Icon as={RiFlashlightFill} />
        Badge
      </Badge.Root>

      <Badge.Root variant='light' color='pink' disabled>
        <Badge.Icon as={RiFlashlightFill} />
        Badge
      </Badge.Root>

      <Badge.Root variant='lighter' color='yellow' disabled>
        <Badge.Icon as={RiFlashlightFill} />
        Badge
      </Badge.Root>

      <Badge.Root variant='stroke' color='blue' disabled>
        <Badge.Icon as={RiFlashlightFill} />
        Badge
      </Badge.Root>
    </div>
  ),
}

export const AsChild = {
  render: () => (
    <Badge.Root asChild>
      <button type='button'>Badge</button>
    </Badge.Root>
  ),
}