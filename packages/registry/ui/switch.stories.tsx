'use client';

import * as React from 'react';
import * as LabelPrimitives from '@radix-ui/react-label';

import * as Badge from './badge';
import * as Label from './label';
import * as LinkButton from './link-button';
import * as Switch from './switch';

export default { title: 'UI/Switch', component: Switch.Root };

export const Demo = {
  render: () => <Switch.Root />,
};

export const Variants = {
  render: () => (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-3'>
        <span className='text-subheading-xs text-text-sub-600'>Primary</span>
        <div className='flex items-center gap-4'>
          <Switch.Root variant='primary' />
          <Switch.Root variant='primary' defaultChecked />
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        <span className='text-subheading-xs text-text-sub-600'>Neutral</span>
        <div className='flex items-center gap-4'>
          <Switch.Root variant='neutral' />
          <Switch.Root variant='neutral' defaultChecked />
        </div>
      </div>
    </div>
  ),
};

export const Disabled = {
  render: () => (
    <div className='flex flex-col items-center gap-6'>
      <Switch.Root disabled />
      <Switch.Root disabled checked />
    </div>
  ),
};

export const WithLabel = {
  render: () => {
    const uniqueId = React.useId();

    return (
      <div className='flex flex-col gap-3'>
        <div className='flex items-center gap-2'>
          <Switch.Root id={`${uniqueId}-s1`} />
          <Label.Root
            className='text-paragraph-sm'
            htmlFor={`${uniqueId}-s1`}
          >
            SMS Verification
          </Label.Root>
        </div>
        <div className='flex items-center gap-2'>
          <Switch.Root id={`${uniqueId}-s2`} />
          <Label.Root
            className='text-paragraph-sm'
            htmlFor={`${uniqueId}-s2`}
          >
            Authenticator App
          </Label.Root>
        </div>
        <div className='flex items-center gap-2'>
          <Switch.Root id={`${uniqueId}-s3`} disabled />
          <Label.Root
            className='text-paragraph-sm'
            htmlFor={`${uniqueId}-s3`}
          >
            Disabled
          </Label.Root>
        </div>
        <div className='flex items-center gap-2'>
          <Switch.Root id={`${uniqueId}-s4`} disabled defaultChecked />
          <Label.Root
            className='text-paragraph-sm'
            htmlFor={`${uniqueId}-s4`}
          >
            Disabled but default checked
          </Label.Root>
        </div>
      </div>
    );
  },
};

export const WithLabelExtended = {
  render: () => {
    const uniqueId = React.useId();

    return (
      <div className='flex flex-col gap-12 md:flex-row'>
        <div className='flex flex-col gap-12'>
          <div className='flex items-center gap-2'>
            <Switch.Root id={`${uniqueId}-s1`} />
            <Label.Root
              className='flex-1 gap-1 text-paragraph-sm'
              htmlFor={`${uniqueId}-s1`}
            >
              Label
              <Label.Sub>(Sublabel)</Label.Sub>
              <Badge.Root variant='light' color='blue' size='small'>
                NEW
              </Badge.Root>
            </Label.Root>
          </div>

          <div className='flex items-center gap-2'>
            <Switch.Root id={`${uniqueId}-s2`} defaultChecked />
            <Label.Root
              className='flex-1 gap-1 text-paragraph-sm'
              htmlFor={`${uniqueId}-s2`}
            >
              Label
              <Label.Sub>(Sublabel)</Label.Sub>
              <Badge.Root variant='light' color='blue' size='small'>
                NEW
              </Badge.Root>
            </Label.Root>
          </div>

          <div className='flex items-start gap-2'>
            <Switch.Root id={`${uniqueId}-s3`} />
            <div className='flex flex-1 flex-col items-start'>
              <LabelPrimitives.Root
                className='cursor-pointer'
                htmlFor={`${uniqueId}-s3`}
              >
                <div className='flex items-center gap-1'>
                  <span className='text-paragraph-sm text-text-strong-950'>
                    Label
                  </span>
                  <Label.Sub>(Sublabel)</Label.Sub>
                  <Badge.Root variant='light' color='blue' size='small'>
                    NEW
                  </Badge.Root>
                </div>
                <div className='mt-1 text-paragraph-xs text-text-sub-600'>
                  Insert the Switch description here.
                </div>
              </LabelPrimitives.Root>
              <LinkButton.Root
                variant='primary'
                size='small'
                className='mt-2.5'
              >
                Link Button
              </LinkButton.Root>
            </div>
          </div>

          <div className='flex items-start gap-2'>
            <Switch.Root id={`${uniqueId}-s4`} defaultChecked />
            <div className='flex flex-1 flex-col items-start'>
              <LabelPrimitives.Root
                className='cursor-pointer'
                htmlFor={`${uniqueId}-s4`}
              >
                <div className='flex items-center gap-1'>
                  <span className='text-paragraph-sm text-text-strong-950'>
                    Label
                  </span>
                  <Label.Sub>(Sublabel)</Label.Sub>
                  <Badge.Root variant='light' color='blue' size='small'>
                    NEW
                  </Badge.Root>
                </div>
                <div className='mt-1 text-paragraph-xs text-text-sub-600'>
                  Insert the Switch description here.
                </div>
              </LabelPrimitives.Root>
              <LinkButton.Root
                variant='primary'
                size='small'
                className='mt-2.5'
              >
                Link Button
              </LinkButton.Root>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-12'>
          <div className='flex items-center gap-2'>
            <Label.Root
              className='flex-1 gap-1 text-paragraph-sm'
              htmlFor={`${uniqueId}-s5`}
            >
              Label
              <Label.Sub>(Sublabel)</Label.Sub>
              <Badge.Root variant='light' color='blue' size='small'>
                NEW
              </Badge.Root>
            </Label.Root>
            <Switch.Root id={`${uniqueId}-s5`} />
          </div>

          <div className='flex items-center gap-2'>
            <Label.Root
              className='flex-1 gap-1 text-paragraph-sm'
              htmlFor={`${uniqueId}-s6`}
            >
              Label
              <Label.Sub>(Sublabel)</Label.Sub>
              <Badge.Root variant='light' color='blue' size='small'>
                NEW
              </Badge.Root>
            </Label.Root>
            <Switch.Root id={`${uniqueId}-s6`} defaultChecked />
          </div>

          <div className='flex items-start gap-2'>
            <div className='flex flex-1 flex-col items-start'>
              <LabelPrimitives.Root
                className='cursor-pointer'
                htmlFor={`${uniqueId}-s7`}
              >
                <div className='flex items-center gap-1'>
                  <span className='text-paragraph-sm text-text-strong-950'>
                    Label
                  </span>
                  <Label.Sub>(Sublabel)</Label.Sub>
                  <Badge.Root variant='light' color='blue' size='small'>
                    NEW
                  </Badge.Root>
                </div>
                <div className='mt-1 text-paragraph-xs text-text-sub-600'>
                  Insert the Switch description here.
                </div>
              </LabelPrimitives.Root>
              <LinkButton.Root
                variant='primary'
                size='small'
                className='mt-2.5'
              >
                Link Button
              </LinkButton.Root>
            </div>
            <Switch.Root id={`${uniqueId}-s7`} />
          </div>

          <div className='flex items-start gap-2'>
            <div className='flex flex-1 flex-col items-start'>
              <LabelPrimitives.Root
                className='cursor-pointer'
                htmlFor={`${uniqueId}-s8`}
              >
                <div className='flex items-center gap-1'>
                  <span className='text-paragraph-sm text-text-strong-950'>
                    Label
                  </span>
                  <Label.Sub>(Sublabel)</Label.Sub>
                  <Badge.Root variant='light' color='blue' size='small'>
                    NEW
                  </Badge.Root>
                </div>
                <div className='mt-1 text-paragraph-xs text-text-sub-600'>
                  Insert the Switch description here.
                </div>
              </LabelPrimitives.Root>
              <LinkButton.Root
                variant='primary'
                size='small'
                className='mt-2.5'
              >
                Link Button
              </LinkButton.Root>
            </div>
            <Switch.Root id={`${uniqueId}-s8`} defaultChecked />
          </div>
        </div>
      </div>
    );
  },
};
