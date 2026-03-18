'use client';

import * as React from 'react';
import * as LabelPrimitives from '@radix-ui/react-label';

import * as Badge from './badge';
import * as Checkbox from './checkbox';
import * as FormField from './form-field';
import * as Label from './label';
import * as LinkButton from './link-button';

export default { title: 'Form/Checkbox', component: Checkbox.Root };

export const Playground = {
  args: {
    variant: 'primary',
    disabled: false,
    defaultChecked: false,
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'neutral'] },
    disabled: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
  },
  render: (args: any) => <Checkbox.Root {...args} />,
};

export const Demo = {
  render: () => <Checkbox.Root />,
};

export const Variants = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-3'>
        <Checkbox.Root variant='primary' />
        <Checkbox.Root variant='primary' defaultChecked />
        <Checkbox.Root variant='primary' checked='indeterminate' />
        <span className='text-paragraph-sm text-text-sub-600'>Primary</span>
      </div>
      <div className='flex items-center gap-3'>
        <Checkbox.Root variant='neutral' />
        <Checkbox.Root variant='neutral' defaultChecked />
        <Checkbox.Root variant='neutral' checked='indeterminate' />
        <span className='text-paragraph-sm text-text-sub-600'>Neutral</span>
      </div>
    </div>
  ),
};

export const Disabled = {
  render: () => (
    <div className='flex gap-2'>
      <Checkbox.Root disabled />
      <Checkbox.Root disabled checked />
      <Checkbox.Root disabled checked='indeterminate' />
    </div>
  ),
};

function WithLabelRender() {
  const uniqueId = React.useId();

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-2'>
        <Checkbox.Root id={`${uniqueId}-c1`} />
        <Label.Root className='text-paragraph-sm' htmlFor={`${uniqueId}-c1`}>
          SMS Verification
        </Label.Root>
      </div>
      <div className='flex items-center gap-2'>
        <Checkbox.Root id={`${uniqueId}-c2`} />
        <Label.Root className='text-paragraph-sm' htmlFor={`${uniqueId}-c2`}>
          Authenticator App
        </Label.Root>
      </div>
      <div className='flex items-center gap-2'>
        <Checkbox.Root id={`${uniqueId}-c3`} disabled />
        <Label.Root className='text-paragraph-sm' htmlFor={`${uniqueId}-c3`}>
          Disabled
        </Label.Root>
      </div>
      <div className='flex items-center gap-2'>
        <Checkbox.Root id={`${uniqueId}-c4`} disabled defaultChecked />
        <Label.Root className='text-paragraph-sm' htmlFor={`${uniqueId}-c4`}>
          Disabled but default checked
        </Label.Root>
      </div>
    </div>
  );
}

export const WithLabel = {
  render: () => <WithLabelRender />,
};

function WithLabelExtendedRender() {
  const uniqueId = React.useId();

  return (
    <div className='flex flex-col gap-12 md:flex-row'>
      <div className='flex flex-col gap-12'>
        <div className='flex items-center gap-2'>
          <Checkbox.Root id={`${uniqueId}-c1`} />
          <Label.Root
            className='text-paragraph-sm inline-flex flex-1 items-center gap-1'
            htmlFor={`${uniqueId}-c1`}
          >
            Label
            <Label.Sub>(Sublabel)</Label.Sub>
            <Badge.Root variant='light' color='blue' size='small'>
              NEW
            </Badge.Root>
          </Label.Root>
        </div>

        <div className='flex items-center gap-2'>
          <Checkbox.Root id={`${uniqueId}-c2`} defaultChecked />
          <Label.Root
            className='text-paragraph-sm inline-flex flex-1 items-center gap-1'
            htmlFor={`${uniqueId}-c2`}
          >
            Label
            <Label.Sub>(Sublabel)</Label.Sub>
            <Badge.Root variant='light' color='blue' size='small'>
              NEW
            </Badge.Root>
          </Label.Root>
        </div>

        <div className='flex items-start gap-2'>
          <Checkbox.Root id={`${uniqueId}-c3`} />
          <div className='flex flex-1 flex-col items-start'>
            <LabelPrimitives.Root
              className='cursor-pointer'
              htmlFor={`${uniqueId}-c3`}
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
              <div className='text-paragraph-xs text-text-sub-600 mt-1'>
                Insert the checkbox description here.
              </div>
            </LabelPrimitives.Root>
            <LinkButton.Root variant='primary' size='small' className='mt-2.5'>
              Link Button
            </LinkButton.Root>
          </div>
        </div>

        <div className='flex items-start gap-2'>
          <Checkbox.Root id={`${uniqueId}-c4`} defaultChecked />
          <div className='flex flex-1 flex-col items-start'>
            <LabelPrimitives.Root
              className='cursor-pointer'
              htmlFor={`${uniqueId}-c4`}
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
              <div className='text-paragraph-xs text-text-sub-600 mt-1'>
                Insert the checkbox description here.
              </div>
            </LabelPrimitives.Root>
            <LinkButton.Root variant='primary' size='small' className='mt-2.5'>
              Link Button
            </LinkButton.Root>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-12'>
        <div className='flex items-center gap-2'>
          <Label.Root
            className='text-paragraph-sm inline-flex flex-1 items-center gap-1'
            htmlFor={`${uniqueId}-c5`}
          >
            Label
            <Label.Sub>(Sublabel)</Label.Sub>
            <Badge.Root variant='light' color='blue' size='small'>
              NEW
            </Badge.Root>
          </Label.Root>
          <Checkbox.Root id={`${uniqueId}-c5`} />
        </div>

        <div className='flex items-center gap-2'>
          <Label.Root
            className='text-paragraph-sm inline-flex flex-1 items-center gap-1'
            htmlFor={`${uniqueId}-c6`}
          >
            Label
            <Label.Sub>(Sublabel)</Label.Sub>
            <Badge.Root variant='light' color='blue' size='small'>
              NEW
            </Badge.Root>
          </Label.Root>
          <Checkbox.Root id={`${uniqueId}-c6`} defaultChecked />
        </div>

        <div className='flex items-start gap-2'>
          <div className='flex flex-1 flex-col items-start'>
            <LabelPrimitives.Root
              className='cursor-pointer'
              htmlFor={`${uniqueId}-c7`}
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
              <div className='text-paragraph-xs text-text-sub-600 mt-1'>
                Insert the checkbox description here.
              </div>
            </LabelPrimitives.Root>
            <LinkButton.Root variant='primary' size='small' className='mt-2.5'>
              Link Button
            </LinkButton.Root>
          </div>
          <Checkbox.Root id={`${uniqueId}-c7`} />
        </div>

        <div className='flex items-start gap-2'>
          <div className='flex flex-1 flex-col items-start'>
            <LabelPrimitives.Root
              className='cursor-pointer'
              htmlFor={`${uniqueId}-c8`}
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
              <div className='text-paragraph-xs text-text-sub-600 mt-1'>
                Insert the checkbox description here.
              </div>
            </LabelPrimitives.Root>
            <LinkButton.Root variant='primary' size='small' className='mt-2.5'>
              Link Button
            </LinkButton.Root>
          </div>
          <Checkbox.Root id={`${uniqueId}-c8`} defaultChecked />
        </div>
      </div>
    </div>
  );
}

export const WithLabelExtended = {
  render: () => <WithLabelExtendedRender />,
};

function WithFormFieldRender() {
  const uniqueId = React.useId();

  return (
    <FormField.Root
      label='Notifications'
      hint='Choose how you want to be notified.'
    >
      <div className='flex flex-col gap-3'>
        <div className='flex items-center gap-2'>
          <Checkbox.Root id={`${uniqueId}-email`} defaultChecked />
          <Label.Root
            htmlFor={`${uniqueId}-email`}
            className='text-paragraph-sm'
          >
            Email notifications
          </Label.Root>
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox.Root id={`${uniqueId}-sms`} />
          <Label.Root htmlFor={`${uniqueId}-sms`} className='text-paragraph-sm'>
            SMS notifications
          </Label.Root>
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox.Root id={`${uniqueId}-push`} />
          <Label.Root
            htmlFor={`${uniqueId}-push`}
            className='text-paragraph-sm'
          >
            Push notifications
          </Label.Root>
        </div>
      </div>
    </FormField.Root>
  );
}

export const WithFormField = {
  render: () => <WithFormFieldRender />,
};
