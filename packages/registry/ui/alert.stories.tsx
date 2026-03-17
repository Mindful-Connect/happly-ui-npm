import {
  RiAlertFill,
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiInformationFill,
  RiMagicFill,
} from '@remixicon/react';

import * as Alert from './alert';
import * as LinkButton from './link-button';

export default { title: 'Feedback/Alert', component: Alert.Root };

export const Playground = {
  args: {
    variant: 'filled',
    status: 'information',
    size: 'small',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'light', 'lighter', 'stroke'],
    },
    status: {
      control: 'select',
      options: ['error', 'warning', 'success', 'information', 'feature'],
    },
    size: { control: 'select', options: ['xsmall', 'small', 'large'] },
  },
  render: (args: any) => (
    <div className='w-full max-w-96'>
      <Alert.Root {...args}>
        <Alert.Icon as={RiInformationFill} />
        Insert your alert title here!
      </Alert.Root>
    </div>
  ),
};

export const Filled = {
  render: () => (
    <div className='w-full max-w-96 space-y-6'>
      <Alert.Root variant='filled' status='error'>
        <Alert.Icon as={RiErrorWarningFill} />
        Insert your alert title here!
        <LinkButton.Root variant='modifiable' size='medium' underline>
          Upgrade
        </LinkButton.Root>
        <button type='button'>
          <Alert.CloseIcon />
        </button>
      </Alert.Root>

      <Alert.Root variant='filled' status='warning'>
        <Alert.Icon as={RiAlertFill} />
        Insert your alert title here!
        <LinkButton.Root variant='modifiable' size='medium' underline>
          Upgrade
        </LinkButton.Root>
        <button type='button'>
          <Alert.CloseIcon />
        </button>
      </Alert.Root>

      <Alert.Root variant='filled' status='success'>
        <Alert.Icon as={RiCheckboxCircleFill} />
        Insert your alert title here!
        <LinkButton.Root variant='modifiable' size='medium' underline>
          Upgrade
        </LinkButton.Root>
        <button type='button'>
          <Alert.CloseIcon />
        </button>
      </Alert.Root>

      <Alert.Root variant='filled' status='information'>
        <Alert.Icon as={RiInformationFill} />
        Insert your alert title here!
        <LinkButton.Root variant='modifiable' size='medium' underline>
          Upgrade
        </LinkButton.Root>
        <button type='button'>
          <Alert.CloseIcon />
        </button>
      </Alert.Root>

      <Alert.Root variant='filled' status='feature'>
        <Alert.Icon as={RiMagicFill} />
        Insert your alert title here!
        <LinkButton.Root variant='modifiable' size='medium' underline>
          Upgrade
        </LinkButton.Root>
        <button type='button'>
          <Alert.CloseIcon />
        </button>
      </Alert.Root>
    </div>
  ),
};

export const Light = {
  render: () => (
    <div className='w-full max-w-96 space-y-6'>
      <Alert.Root variant='light' status='error'>
        <Alert.Icon as={RiErrorWarningFill} />
        Insert your alert title here!
        <LinkButton.Root variant='modifiable' size='medium' underline>
          Upgrade
        </LinkButton.Root>
        <button type='button'>
          <Alert.CloseIcon />
        </button>
      </Alert.Root>

      <Alert.Root variant='light' status='warning'>
        <Alert.Icon as={RiAlertFill} />
        Insert your alert title here!
        <LinkButton.Root variant='modifiable' size='medium' underline>
          Upgrade
        </LinkButton.Root>
        <button type='button'>
          <Alert.CloseIcon />
        </button>
      </Alert.Root>

      <Alert.Root variant='light' status='success'>
        <Alert.Icon as={RiCheckboxCircleFill} />
        Insert your alert title here!
        <LinkButton.Root variant='modifiable' size='medium' underline>
          Upgrade
        </LinkButton.Root>
        <button type='button'>
          <Alert.CloseIcon />
        </button>
      </Alert.Root>

      <Alert.Root variant='light' status='information'>
        <Alert.Icon as={RiInformationFill} />
        Insert your alert title here!
        <LinkButton.Root variant='modifiable' size='medium' underline>
          Upgrade
        </LinkButton.Root>
        <button type='button'>
          <Alert.CloseIcon />
        </button>
      </Alert.Root>

      <Alert.Root variant='light' status='feature'>
        <Alert.Icon as={RiMagicFill} />
        Insert your alert title here!
        <LinkButton.Root variant='modifiable' size='medium' underline>
          Upgrade
        </LinkButton.Root>
        <button type='button'>
          <Alert.CloseIcon />
        </button>
      </Alert.Root>
    </div>
  ),
};

export const Lighter = {
  render: () => (
    <div className='w-full max-w-96 space-y-6'>
      <Alert.Root variant='lighter' status='error'>
        <Alert.Icon as={RiErrorWarningFill} />
        Insert your alert title here!
        <LinkButton.Root variant='modifiable' size='medium' underline>
          Upgrade
        </LinkButton.Root>
        <button type='button'>
          <Alert.CloseIcon />
        </button>
      </Alert.Root>

      <Alert.Root variant='lighter' status='warning'>
        <Alert.Icon as={RiAlertFill} />
        Insert your alert title here!
        <LinkButton.Root variant='modifiable' size='medium' underline>
          Upgrade
        </LinkButton.Root>
        <button type='button'>
          <Alert.CloseIcon />
        </button>
      </Alert.Root>

      <Alert.Root variant='lighter' status='success'>
        <Alert.Icon as={RiCheckboxCircleFill} />
        Insert your alert title here!
        <LinkButton.Root variant='modifiable' size='medium' underline>
          Upgrade
        </LinkButton.Root>
        <button type='button'>
          <Alert.CloseIcon />
        </button>
      </Alert.Root>

      <Alert.Root variant='lighter' status='information'>
        <Alert.Icon as={RiInformationFill} />
        Insert your alert title here!
        <LinkButton.Root variant='modifiable' size='medium' underline>
          Upgrade
        </LinkButton.Root>
        <button type='button'>
          <Alert.CloseIcon />
        </button>
      </Alert.Root>

      <Alert.Root variant='lighter' status='feature'>
        <Alert.Icon as={RiMagicFill} />
        Insert your alert title here!
        <LinkButton.Root variant='modifiable' size='medium' underline>
          Upgrade
        </LinkButton.Root>
        <button type='button'>
          <Alert.CloseIcon />
        </button>
      </Alert.Root>
    </div>
  ),
};

export const Stroke = {
  render: () => (
    <div className='w-full max-w-96 space-y-6'>
      <Alert.Root variant='stroke' status='error'>
        <Alert.Icon as={RiErrorWarningFill} />
        Insert your alert title here!
        <LinkButton.Root variant='modifiable' size='medium' underline>
          Upgrade
        </LinkButton.Root>
        <button type='button'>
          <Alert.CloseIcon />
        </button>
      </Alert.Root>

      <Alert.Root variant='stroke' status='warning'>
        <Alert.Icon as={RiAlertFill} />
        Insert your alert title here!
        <LinkButton.Root variant='modifiable' size='medium' underline>
          Upgrade
        </LinkButton.Root>
        <button type='button'>
          <Alert.CloseIcon />
        </button>
      </Alert.Root>

      <Alert.Root variant='stroke' status='success'>
        <Alert.Icon as={RiCheckboxCircleFill} />
        Insert your alert title here!
        <LinkButton.Root variant='modifiable' size='medium' underline>
          Upgrade
        </LinkButton.Root>
        <button type='button'>
          <Alert.CloseIcon />
        </button>
      </Alert.Root>

      <Alert.Root variant='stroke' status='information'>
        <Alert.Icon as={RiInformationFill} />
        Insert your alert title here!
        <LinkButton.Root variant='modifiable' size='medium' underline>
          Upgrade
        </LinkButton.Root>
        <button type='button'>
          <Alert.CloseIcon />
        </button>
      </Alert.Root>

      <Alert.Root variant='stroke' status='feature'>
        <Alert.Icon as={RiMagicFill} />
        Insert your alert title here!
        <LinkButton.Root variant='modifiable' size='medium' underline>
          Upgrade
        </LinkButton.Root>
        <button type='button'>
          <Alert.CloseIcon />
        </button>
      </Alert.Root>
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div className='w-full max-w-96 space-y-8'>
      {/* XSmall */}
      <div className='space-y-3'>
        <div className='text-label-xs text-text-sub-600'>XSmall</div>
        <Alert.Root variant='filled' status='error' size='xsmall'>
          <Alert.Icon as={RiErrorWarningFill} />
          Insert your alert title here!
          <LinkButton.Root variant='modifiable' size='small' underline>
            Upgrade
          </LinkButton.Root>
          <button type='button'>
            <Alert.CloseIcon />
          </button>
        </Alert.Root>
      </div>

      {/* Small (default) */}
      <div className='space-y-3'>
        <div className='text-label-xs text-text-sub-600'>Small (default)</div>
        <Alert.Root variant='light' status='warning' size='small'>
          <Alert.Icon as={RiAlertFill} />
          Insert your alert title here!
          <LinkButton.Root variant='modifiable' size='small' underline>
            Upgrade
          </LinkButton.Root>
          <button type='button'>
            <Alert.CloseIcon />
          </button>
        </Alert.Root>
      </div>

      {/* Large */}
      <div className='space-y-3'>
        <div className='text-label-xs text-text-sub-600'>Large</div>
        <Alert.Root variant='lighter' status='success' size='large'>
          <Alert.Icon as={RiCheckboxCircleFill} />
          <div className='space-y-2.5'>
            <div className='space-y-1'>
              <div className='text-label-sm'>Insert your alert title here!</div>
              <div>
                Insert the alert description here. It would look better as two
                lines of text.
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <LinkButton.Root variant='modifiable' size='medium' underline>
                Upgrade
              </LinkButton.Root>
              <span>&#8729;</span>
              <LinkButton.Root variant='modifiable' size='medium'>
                Learn More
              </LinkButton.Root>
            </div>
          </div>
        </Alert.Root>
      </div>
    </div>
  ),
};
