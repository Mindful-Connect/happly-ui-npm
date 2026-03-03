import * as Button from './button';
import { RiArrowRightSLine, RiFileCopyLine } from 'react-icons/ri';

export default { title: 'UI/Button', component: Button.Root };

export const PrimaryVariant = {
  render: () => (
    <div className='flex flex-col items-center gap-4'>
      <Button.Root variant="primary" mode="filled">Get Started</Button.Root>
      <Button.Root variant="primary" mode="stroke">Get Started</Button.Root>
      <Button.Root variant="primary" mode="lighter">Get Started</Button.Root>
      <Button.Root variant="primary" mode="ghost">Get Started</Button.Root>
    </div>
  ),
};

export const NeutralVariant = {
  render: () => (
    <div className='flex flex-col items-center gap-4'>
      <Button.Root variant="neutral" mode="filled">Learn More</Button.Root>
      <Button.Root variant="neutral" mode="stroke">Learn More</Button.Root>
      <Button.Root variant="neutral" mode="lighter">Learn More</Button.Root>
      <Button.Root variant="neutral" mode="ghost">Learn More</Button.Root>
    </div>
  ),
};

export const SuccessVariant = {
  render: () => (
    <div className='flex flex-col items-center gap-4'>
      <Button.Root variant="success" mode="filled">Try Again</Button.Root>
      <Button.Root variant="success" mode="stroke">Try Again</Button.Root>
      <Button.Root variant="success" mode="lighter">Try Again</Button.Root>
      <Button.Root variant="success" mode="ghost">Try Again</Button.Root>
    </div>
  ),
};

export const WarningVariant = {
  render: () => (
    <div className='flex flex-col items-center gap-4'>
      <Button.Root variant="warning" mode="filled">Try Again</Button.Root>
      <Button.Root variant="warning" mode="stroke">Try Again</Button.Root>
      <Button.Root variant="warning" mode="lighter">Try Again</Button.Root>
      <Button.Root variant="warning" mode="ghost">Try Again</Button.Root>
    </div>
  ),
};

export const ErrorVariant = {
  render: () => (
    <div className='flex flex-col items-center gap-4'>
      <Button.Root variant="error" mode="filled">Try Again</Button.Root>
      <Button.Root variant="error" mode="stroke">Try Again</Button.Root>
      <Button.Root variant="error" mode="lighter">Try Again</Button.Root>
      <Button.Root variant="error" mode="ghost">Try Again</Button.Root>
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div className='flex flex-col items-center gap-8'>
      <div className='flex flex-col items-center gap-4'>
        <div className='flex items-center gap-4'>
          <Button.Root size='medium'>Medium</Button.Root>
          <Button.Root size='small'>Small</Button.Root>
          <Button.Root size='xsmall'>Xsmall</Button.Root>
          <Button.Root size='xxsmall'>Xxsmall</Button.Root>
        </div>
        <div className='flex items-center gap-4'>
          <Button.Root size='medium' mode='stroke'>Medium</Button.Root>
          <Button.Root size='small' mode='stroke'>Small</Button.Root>
          <Button.Root size='xsmall' mode='stroke'>Xsmall</Button.Root>
          <Button.Root size='xxsmall' mode='stroke'>Xxsmall</Button.Root>
        </div>
        <div className='flex items-center gap-4'>
          <Button.Root size='medium' mode='lighter'>Medium</Button.Root>
          <Button.Root size='small' mode='lighter'>Small</Button.Root>
          <Button.Root size='xsmall' mode='lighter'>Xsmall</Button.Root>
          <Button.Root size='xxsmall' mode='lighter'>Xxsmall</Button.Root>
        </div>
        <div className='flex items-center gap-4'>
          <Button.Root size='medium' mode='ghost'>Medium</Button.Root>
          <Button.Root size='small' mode='ghost'>Small</Button.Root>
          <Button.Root size='xsmall' mode='ghost'>Xsmall</Button.Root>
          <Button.Root size='xxsmall' mode='ghost'>Xxsmall</Button.Root>
        </div>
      </div>
    </div>
  ),
};

export const Disabled = {
  render: () => (
    <div className='flex flex-col items-center gap-4'>
      <Button.Root disabled>Disabled</Button.Root>
      <Button.Root mode='stroke' disabled>
        Disabled
      </Button.Root>
      <Button.Root mode='lighter' disabled>
        Disabled
      </Button.Root>
      <Button.Root mode='ghost' disabled>
        Disabled
      </Button.Root>
    </div>
  ),
};

export const WithIcon = {
  render: () => (
    <div className='flex flex-col items-center gap-4'>
      <Button.Root>
        Button
        <Button.Icon as={RiArrowRightSLine} />
      </Button.Root>

      <Button.Root>
        <Button.Icon as={RiFileCopyLine} />
      </Button.Root>
    </div>
  ),
};

export const FullWidth = {
  render: () => (
    <div className='w-96'>
      <Button.Root variant='neutral' className='w-full'>
        Learn More
      </Button.Root>
    </div>
  ),
};

export const AsChild = {
  render: () => (
    <div className='flex flex-col items-center gap-4'>
      <Button.Root asChild>
        <a href='#'>As link</a>
      </Button.Root>
    </div>
  ),
}
