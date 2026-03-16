'use client';

import * as React from 'react';
import * as LabelPrimitives from '@radix-ui/react-label';

import * as Badge from './badge';
import * as FormField from './form-field';
import * as Label from './label';
import * as LinkButton from './link-button';
import * as Radio from './radio';

export default { title: 'Form/Radio', component: Radio.Group };

export const Playground = {
  args: {
    variant: 'primary',
    disabled: false,
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'neutral'] },
    disabled: { control: 'boolean' },
  },
  render: (args: any) => (
    <Radio.Group variant={args.variant} defaultValue='r1' className='flex gap-2'>
      <Radio.Item value='r1' disabled={args.disabled} />
      <Radio.Item value='r2' disabled={args.disabled} />
      <Radio.Item value='r3' disabled={args.disabled} />
    </Radio.Group>
  ),
};

export const Demo = {
  render: () => (
    <Radio.Group defaultValue='r1' className='flex gap-2'>
      <Radio.Item value='r1' />
      <Radio.Item value='r2' />
    </Radio.Group>
  ),
};

export const Variants = {
  render: () => (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-3'>
        <span className='text-subheading-xs text-text-sub-600'>Primary</span>
        <Radio.Group
          variant='primary'
          defaultValue='p1'
          className='flex gap-2'
        >
          <Radio.Item value='p1' />
          <Radio.Item value='p2' />
        </Radio.Group>
      </div>
      <div className='flex flex-col gap-3'>
        <span className='text-subheading-xs text-text-sub-600'>Neutral</span>
        <Radio.Group
          variant='neutral'
          defaultValue='n1'
          className='flex gap-2'
        >
          <Radio.Item value='n1' />
          <Radio.Item value='n2' />
        </Radio.Group>
      </div>
    </div>
  ),
};

export const Disabled = {
  render: () => (
    <Radio.Group defaultValue='r1' className='flex gap-2'>
      <Radio.Item value='r1' disabled />
      <Radio.Item value='r2' disabled />
    </Radio.Group>
  ),
};

export const WithLabel = {
  render: () => (
    <Radio.Group defaultValue='spam' className='space-y-5'>
      <div className='group/radio flex items-start gap-2'>
        <Radio.Item value='spam' id='l1' />
        <Label.Root
          htmlFor='l1'
          className='flex-col gap-1 text-text-sub-600 group-has-[[data-state=checked]]/radio:text-text-strong-950'
        >
          Spam
        </Label.Root>
      </div>

      <div className='group/radio flex items-start gap-2'>
        <Radio.Item value='harrassment' id='l2' />
        <Label.Root
          htmlFor='l2'
          className='flex-col gap-1 text-text-sub-600 group-has-[[data-state=checked]]/radio:text-text-strong-950'
        >
          Harrassment
        </Label.Root>
      </div>

      <div className='group/radio flex items-start gap-2'>
        <Radio.Item value='violation' id='l3' />
        <Label.Root
          htmlFor='l3'
          className='flex-col gap-1 text-text-sub-600 group-has-[[data-state=checked]]/radio:text-text-strong-950'
        >
          Violation of Rules
        </Label.Root>
      </div>
    </Radio.Group>
  ),
};

function WithLabelExtendedRender() {
  const uniqueId = React.useId();

  return (
    <Radio.Group
      defaultValue={`${uniqueId}-r3`}
      className='flex flex-col gap-12 md:flex-row'
    >
      <div className='flex flex-col gap-12'>
        <div className='flex items-center gap-2'>
          <Radio.Item value={`${uniqueId}-r1`} id={`${uniqueId}-r1`} />
          <Label.Root
            className='flex-1 gap-1 text-paragraph-sm'
            htmlFor={`${uniqueId}-r1`}
          >
            Label
            <Label.Sub>(Sublabel)</Label.Sub>
            <Badge.Root variant='light' color='blue' size='small'>
              NEW
            </Badge.Root>
          </Label.Root>
        </div>

        <div className='flex items-start gap-2'>
          <Radio.Item value={`${uniqueId}-r2`} id={`${uniqueId}-r2`} />
          <div className='flex flex-1 flex-col items-start'>
            <LabelPrimitives.Root
              className='cursor-pointer'
              htmlFor={`${uniqueId}-r2`}
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
                Insert the radio description here.
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
            htmlFor={`${uniqueId}-r3`}
          >
            Label
            <Label.Sub>(Sublabel)</Label.Sub>
            <Badge.Root variant='light' color='blue' size='small'>
              NEW
            </Badge.Root>
          </Label.Root>
          <Radio.Item value={`${uniqueId}-r3`} id={`${uniqueId}-r3`} />
        </div>

        <div className='flex items-start gap-2'>
          <div className='flex flex-1 flex-col items-start'>
            <LabelPrimitives.Root
              className='cursor-pointer'
              htmlFor={`${uniqueId}-r4`}
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
                Insert the radio description here.
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
          <Radio.Item value={`${uniqueId}-r4`} id={`${uniqueId}-r4`} />
        </div>
      </div>
    </Radio.Group>
  );
}

export const WithLabelExtended = {
  render: () => <WithLabelExtendedRender />,
};

export const WithFormField = {
  render: () => (
    <FormField.Root label='Report Reason' required hint='Select the reason for your report.'>
      <Radio.Group defaultValue='spam' className='flex flex-col gap-3'>
        <div className='flex items-center gap-2'>
          <Radio.Item value='spam' id='report-spam' />
          <Label.Root htmlFor='report-spam' className='text-paragraph-sm'>
            Spam
          </Label.Root>
        </div>
        <div className='flex items-center gap-2'>
          <Radio.Item value='harassment' id='report-harassment' />
          <Label.Root htmlFor='report-harassment' className='text-paragraph-sm'>
            Harassment
          </Label.Root>
        </div>
        <div className='flex items-center gap-2'>
          <Radio.Item value='violation' id='report-violation' />
          <Label.Root htmlFor='report-violation' className='text-paragraph-sm'>
            Violation of Rules
          </Label.Root>
        </div>
      </Radio.Group>
    </FormField.Root>
  ),
};
