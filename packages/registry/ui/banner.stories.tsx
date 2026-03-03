import {
  RiAlertFill,
  RiCheckboxCircleFill,
  RiCloseLine,
  RiErrorWarningFill,
  RiInformationFill,
  RiMagicFill,
  RiSparklingFill,
} from '@remixicon/react';

import * as Banner from './banner';
import * as LinkButton from './link-button';

export default { title: 'UI/Banner', component: Banner.Root };

export const Error = {
  render: () => (
    <div className='space-y-6'>
      <Banner.Root variant='filled' status='error'>
        <Banner.Content>
          <Banner.Icon as={RiErrorWarningFill} />
          <span className='text-label-sm'>Insert your alert title here!</span>
          <span>&#8901;</span>
          <span className='text-paragraph-sm'>
            Insert your description here.
          </span>
          <LinkButton.Root variant='modifiable' size='medium' underline>
            Upgrade
          </LinkButton.Root>
        </Banner.Content>
        <Banner.CloseButton>
          <RiCloseLine className='size-5' />
        </Banner.CloseButton>
      </Banner.Root>

      <Banner.Root variant='light' status='error'>
        <Banner.Content>
          <Banner.Icon as={RiErrorWarningFill} />
          <span className='text-label-sm'>Insert your alert title here!</span>
          <span>&#8901;</span>
          <span className='text-paragraph-sm'>
            Insert your description here.
          </span>
          <LinkButton.Root variant='black' size='medium' underline>
            Upgrade
          </LinkButton.Root>
        </Banner.Content>
        <Banner.CloseButton>
          <RiCloseLine className='size-5' />
        </Banner.CloseButton>
      </Banner.Root>

      <Banner.Root variant='lighter' status='error'>
        <Banner.Content>
          <Banner.Icon as={RiErrorWarningFill} />
          <span className='text-label-sm'>Insert your alert title here!</span>
          <span>&#8901;</span>
          <span className='text-paragraph-sm'>
            Insert your description here.
          </span>
          <LinkButton.Root variant='black' size='medium' underline>
            Upgrade
          </LinkButton.Root>
        </Banner.Content>
        <Banner.CloseButton>
          <RiCloseLine className='size-5' />
        </Banner.CloseButton>
      </Banner.Root>

      <Banner.Root variant='stroke' status='error'>
        <Banner.Content>
          <Banner.Icon as={RiErrorWarningFill} />
          <span className='text-label-sm'>Insert your alert title here!</span>
          <span>&#8901;</span>
          <span className='text-paragraph-sm'>
            Insert your description here.
          </span>
          <LinkButton.Root variant='black' size='medium' underline>
            Upgrade
          </LinkButton.Root>
        </Banner.Content>
        <Banner.CloseButton>
          <RiCloseLine className='size-5' />
        </Banner.CloseButton>
      </Banner.Root>
    </div>
  ),
};

export const Warning = {
  render: () => (
    <div className='space-y-6'>
      <Banner.Root variant='filled' status='warning'>
        <Banner.Content>
          <Banner.Icon as={RiAlertFill} />
          <span className='text-label-sm'>Insert your alert title here!</span>
          <span>&#8901;</span>
          <span className='text-paragraph-sm'>
            Insert your description here.
          </span>
          <LinkButton.Root variant='modifiable' size='medium' underline>
            Upgrade
          </LinkButton.Root>
        </Banner.Content>
        <Banner.CloseButton>
          <RiCloseLine className='size-5' />
        </Banner.CloseButton>
      </Banner.Root>

      <Banner.Root variant='light' status='warning'>
        <Banner.Content>
          <Banner.Icon as={RiAlertFill} />
          <span className='text-label-sm'>Insert your alert title here!</span>
          <span>&#8901;</span>
          <span className='text-paragraph-sm'>
            Insert your description here.
          </span>
          <LinkButton.Root variant='black' size='medium' underline>
            Upgrade
          </LinkButton.Root>
        </Banner.Content>
        <Banner.CloseButton>
          <RiCloseLine className='size-5' />
        </Banner.CloseButton>
      </Banner.Root>

      <Banner.Root variant='lighter' status='warning'>
        <Banner.Content>
          <Banner.Icon as={RiAlertFill} />
          <span className='text-label-sm'>Insert your alert title here!</span>
          <span>&#8901;</span>
          <span className='text-paragraph-sm'>
            Insert your description here.
          </span>
          <LinkButton.Root variant='black' size='medium' underline>
            Upgrade
          </LinkButton.Root>
        </Banner.Content>
        <Banner.CloseButton>
          <RiCloseLine className='size-5' />
        </Banner.CloseButton>
      </Banner.Root>

      <Banner.Root variant='stroke' status='warning'>
        <Banner.Content>
          <Banner.Icon as={RiAlertFill} />
          <span className='text-label-sm'>Insert your alert title here!</span>
          <span>&#8901;</span>
          <span className='text-paragraph-sm'>
            Insert your description here.
          </span>
          <LinkButton.Root variant='black' size='medium' underline>
            Upgrade
          </LinkButton.Root>
        </Banner.Content>
        <Banner.CloseButton>
          <RiCloseLine className='size-5' />
        </Banner.CloseButton>
      </Banner.Root>
    </div>
  ),
};

export const Success = {
  render: () => (
    <div className='space-y-6'>
      <Banner.Root variant='filled' status='success'>
        <Banner.Content>
          <Banner.Icon as={RiCheckboxCircleFill} />
          <span className='text-label-sm'>Insert your alert title here!</span>
          <span>&#8901;</span>
          <span className='text-paragraph-sm'>
            Insert your description here.
          </span>
          <LinkButton.Root variant='modifiable' size='medium' underline>
            Upgrade
          </LinkButton.Root>
        </Banner.Content>
        <Banner.CloseButton>
          <RiCloseLine className='size-5' />
        </Banner.CloseButton>
      </Banner.Root>

      <Banner.Root variant='light' status='success'>
        <Banner.Content>
          <Banner.Icon as={RiCheckboxCircleFill} />
          <span className='text-label-sm'>Insert your alert title here!</span>
          <span>&#8901;</span>
          <span className='text-paragraph-sm'>
            Insert your description here.
          </span>
          <LinkButton.Root variant='black' size='medium' underline>
            Upgrade
          </LinkButton.Root>
        </Banner.Content>
        <Banner.CloseButton>
          <RiCloseLine className='size-5' />
        </Banner.CloseButton>
      </Banner.Root>

      <Banner.Root variant='lighter' status='success'>
        <Banner.Content>
          <Banner.Icon as={RiCheckboxCircleFill} />
          <span className='text-label-sm'>Insert your alert title here!</span>
          <span>&#8901;</span>
          <span className='text-paragraph-sm'>
            Insert your description here.
          </span>
          <LinkButton.Root variant='black' size='medium' underline>
            Upgrade
          </LinkButton.Root>
        </Banner.Content>
        <Banner.CloseButton>
          <RiCloseLine className='size-5' />
        </Banner.CloseButton>
      </Banner.Root>

      <Banner.Root variant='stroke' status='success'>
        <Banner.Content>
          <Banner.Icon as={RiCheckboxCircleFill} />
          <span className='text-label-sm'>Insert your alert title here!</span>
          <span>&#8901;</span>
          <span className='text-paragraph-sm'>
            Insert your description here.
          </span>
          <LinkButton.Root variant='black' size='medium' underline>
            Upgrade
          </LinkButton.Root>
        </Banner.Content>
        <Banner.CloseButton>
          <RiCloseLine className='size-5' />
        </Banner.CloseButton>
      </Banner.Root>
    </div>
  ),
};

export const Information = {
  render: () => (
    <div className='space-y-6'>
      <Banner.Root variant='filled' status='information'>
        <Banner.Content>
          <Banner.Icon as={RiInformationFill} />
          <span className='text-label-sm'>Insert your alert title here!</span>
          <span>&#8901;</span>
          <span className='text-paragraph-sm'>
            Insert your description here.
          </span>
          <LinkButton.Root variant='modifiable' size='medium' underline>
            Upgrade
          </LinkButton.Root>
        </Banner.Content>
        <Banner.CloseButton>
          <RiCloseLine className='size-5' />
        </Banner.CloseButton>
      </Banner.Root>

      <Banner.Root variant='light' status='information'>
        <Banner.Content>
          <Banner.Icon as={RiInformationFill} />
          <span className='text-label-sm'>Insert your alert title here!</span>
          <span>&#8901;</span>
          <span className='text-paragraph-sm'>
            Insert your description here.
          </span>
          <LinkButton.Root variant='black' size='medium' underline>
            Upgrade
          </LinkButton.Root>
        </Banner.Content>
        <Banner.CloseButton>
          <RiCloseLine className='size-5' />
        </Banner.CloseButton>
      </Banner.Root>

      <Banner.Root variant='lighter' status='information'>
        <Banner.Content>
          <Banner.Icon as={RiInformationFill} />
          <span className='text-label-sm'>Insert your alert title here!</span>
          <span>&#8901;</span>
          <span className='text-paragraph-sm'>
            Insert your description here.
          </span>
          <LinkButton.Root variant='black' size='medium' underline>
            Upgrade
          </LinkButton.Root>
        </Banner.Content>
        <Banner.CloseButton>
          <RiCloseLine className='size-5' />
        </Banner.CloseButton>
      </Banner.Root>

      <Banner.Root variant='stroke' status='information'>
        <Banner.Content>
          <Banner.Icon as={RiInformationFill} />
          <span className='text-label-sm'>Insert your alert title here!</span>
          <span>&#8901;</span>
          <span className='text-paragraph-sm'>
            Insert your description here.
          </span>
          <LinkButton.Root variant='black' size='medium' underline>
            Upgrade
          </LinkButton.Root>
        </Banner.Content>
        <Banner.CloseButton>
          <RiCloseLine className='size-5' />
        </Banner.CloseButton>
      </Banner.Root>
    </div>
  ),
};

export const Feature = {
  render: () => (
    <div className='space-y-6'>
      <Banner.Root variant='filled' status='feature'>
        <Banner.Content>
          <Banner.Icon as={RiMagicFill} />
          <span className='text-label-sm'>Insert your alert title here!</span>
          <span>&#8901;</span>
          <span className='text-paragraph-sm'>
            Insert your description here.
          </span>
          <LinkButton.Root variant='modifiable' size='medium' underline>
            Upgrade
          </LinkButton.Root>
        </Banner.Content>
        <Banner.CloseButton>
          <RiCloseLine className='size-5' />
        </Banner.CloseButton>
      </Banner.Root>

      <Banner.Root variant='light' status='feature'>
        <Banner.Content>
          <Banner.Icon as={RiMagicFill} />
          <span className='text-label-sm'>Insert your alert title here!</span>
          <span>&#8901;</span>
          <span className='text-paragraph-sm'>
            Insert your description here.
          </span>
          <LinkButton.Root variant='black' size='medium' underline>
            Upgrade
          </LinkButton.Root>
        </Banner.Content>
        <Banner.CloseButton>
          <RiCloseLine className='size-5' />
        </Banner.CloseButton>
      </Banner.Root>

      <Banner.Root variant='lighter' status='feature'>
        <Banner.Content>
          <Banner.Icon as={RiMagicFill} />
          <span className='text-label-sm'>Insert your alert title here!</span>
          <span>&#8901;</span>
          <span className='text-paragraph-sm'>
            Insert your description here.
          </span>
          <LinkButton.Root variant='black' size='medium' underline>
            Upgrade
          </LinkButton.Root>
        </Banner.Content>
        <Banner.CloseButton>
          <RiCloseLine className='size-5' />
        </Banner.CloseButton>
      </Banner.Root>

      <Banner.Root variant='stroke' status='feature'>
        <Banner.Content>
          <Banner.Icon as={RiMagicFill} />
          <span className='text-label-sm'>Insert your alert title here!</span>
          <span>&#8901;</span>
          <span className='text-paragraph-sm'>
            Insert your description here.
          </span>
          <LinkButton.Root variant='black' size='medium' underline>
            Upgrade
          </LinkButton.Root>
        </Banner.Content>
        <Banner.CloseButton>
          <RiCloseLine className='size-5' />
        </Banner.CloseButton>
      </Banner.Root>
    </div>
  ),
};

export const Primary = {
  render: () => (
    <div className='space-y-6'>
      <Banner.Root variant='filled' status='primary'>
        <Banner.Content>
          <Banner.Icon as={RiSparklingFill} />
          <span className='text-label-sm'>Insert your alert title here!</span>
          <span>&#8901;</span>
          <span className='text-paragraph-sm'>
            Insert your description here.
          </span>
          <LinkButton.Root variant='modifiable' size='medium' underline>
            Upgrade
          </LinkButton.Root>
        </Banner.Content>
        <Banner.CloseButton>
          <RiCloseLine className='size-5' />
        </Banner.CloseButton>
      </Banner.Root>

      <Banner.Root variant='light' status='primary'>
        <Banner.Content>
          <Banner.Icon as={RiSparklingFill} />
          <span className='text-label-sm'>Insert your alert title here!</span>
          <span>&#8901;</span>
          <span className='text-paragraph-sm'>
            Insert your description here.
          </span>
          <LinkButton.Root variant='black' size='medium' underline>
            Upgrade
          </LinkButton.Root>
        </Banner.Content>
        <Banner.CloseButton>
          <RiCloseLine className='size-5' />
        </Banner.CloseButton>
      </Banner.Root>

      <Banner.Root variant='lighter' status='primary'>
        <Banner.Content>
          <Banner.Icon as={RiSparklingFill} />
          <span className='text-label-sm'>Insert your alert title here!</span>
          <span>&#8901;</span>
          <span className='text-paragraph-sm'>
            Insert your description here.
          </span>
          <LinkButton.Root variant='black' size='medium' underline>
            Upgrade
          </LinkButton.Root>
        </Banner.Content>
        <Banner.CloseButton>
          <RiCloseLine className='size-5' />
        </Banner.CloseButton>
      </Banner.Root>

      <Banner.Root variant='stroke' status='primary'>
        <Banner.Content>
          <Banner.Icon as={RiSparklingFill} />
          <span className='text-label-sm'>Insert your alert title here!</span>
          <span>&#8901;</span>
          <span className='text-paragraph-sm'>
            Insert your description here.
          </span>
          <LinkButton.Root variant='black' size='medium' underline>
            Upgrade
          </LinkButton.Root>
        </Banner.Content>
        <Banner.CloseButton>
          <RiCloseLine className='size-5' />
        </Banner.CloseButton>
      </Banner.Root>
    </div>
  ),
};
