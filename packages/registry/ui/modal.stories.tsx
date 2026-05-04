'use client';

import * as React from 'react';
import {
  RiChatSettingsLine,
  RiCheckboxCircleFill,
  RiQuillPenLine,
} from '@remixicon/react';

import * as Button from './button';
import * as Modal from './modal';

export default { title: 'Overlays/Modal', component: Modal.Root };

export const Playground = {
  args: {
    showClose: true,
    variant: 'default',
    closeVariant: 'default',
  },
  argTypes: {
    showClose: { control: 'boolean' },
    variant: {
      control: 'radio',
      options: ['default', 'pattern'],
    },
    closeVariant: {
      control: 'radio',
      options: ['default', 'badge'],
    },
  },
  render: (args: any) => (
    <Modal.Root defaultOpen>
      <Modal.Content
        showClose={args.showClose}
        variant={args.variant}
        closeVariant={args.closeVariant}
      >
        <Modal.Body>
          <div className='text-label-md text-text-strong-950'>Modal Title</div>
          <div className='text-paragraph-sm text-text-sub-600'>
            Modal content goes here.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close asChild>
            <Button.Root
              variant='neutral'
              mode='stroke'
              size='small'
              className='w-full'
            >
              Cancel
            </Button.Root>
          </Modal.Close>
          <Button.Root size='small' className='w-full'>
            Confirm
          </Button.Root>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  ),
};

function DemoRender() {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal.Root open={open} onOpenChange={setOpen}>
      <Modal.Trigger asChild>
        <Button.Root
          variant='neutral'
          mode='stroke'
          onClick={() => setOpen(true)}
        >
          Click to open
        </Button.Root>
      </Modal.Trigger>
      <Modal.Content className='max-w-[440px]'>
        <Modal.Body className='flex items-start gap-4'>
          <div className='rounded-10 bg-success-lighter flex h-10 w-10 shrink-0 items-center justify-center'>
            <RiCheckboxCircleFill className='text-success-base h-6 w-6' />
          </div>
          <div className='space-y-1'>
            <div className='text-label-md text-text-strong-950'>
              Payment Received
            </div>
            <div className='text-paragraph-sm text-text-sub-600'>
              Your payment has been successfully received. You have unlocked
              premium services now.
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close asChild>
            <Button.Root
              variant='neutral'
              mode='stroke'
              size='small'
              className='w-full'
            >
              Cancel
            </Button.Root>
          </Modal.Close>
          <Button.Root size='small' className='w-full'>
            View Receipt
          </Button.Root>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}

export const Demo = {
  render: () => <DemoRender />,
};

function WithHeaderRender() {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal.Root open={open} onOpenChange={setOpen}>
      <Modal.Trigger asChild>
        <Button.Root
          variant='neutral'
          mode='stroke'
          onClick={() => setOpen(true)}
        >
          Click to open
        </Button.Root>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header
          icon={RiChatSettingsLine}
          title='Communication Preferences'
          description='Choose contact preferences for companies.'
        />
        <Modal.Body>
          <div className='space-y-5'>
            <div className='flex items-center gap-3.5'>
              <div className='bg-bg-weak-50 flex h-10 w-10 shrink-0 items-center justify-center rounded-full'>
                <span className='text-label-sm text-text-sub-600'>A</span>
              </div>
              <div className='flex-1 space-y-1'>
                <div className='text-label-sm text-text-strong-950'>Apex</div>
                <div className='text-paragraph-xs text-text-sub-600'>
                  Allow Apex to contact you.
                </div>
              </div>
            </div>
            <div className='flex items-center gap-3.5'>
              <div className='bg-bg-weak-50 flex h-10 w-10 shrink-0 items-center justify-center rounded-full'>
                <span className='text-label-sm text-text-sub-600'>B</span>
              </div>
              <div className='flex-1 space-y-1'>
                <div className='text-label-sm text-text-strong-950'>Aurora</div>
                <div className='text-paragraph-xs text-text-sub-600'>
                  Allow Aurora to contact you.
                </div>
              </div>
            </div>
            <div className='flex items-center gap-3.5'>
              <div className='bg-bg-weak-50 flex h-10 w-10 shrink-0 items-center justify-center rounded-full'>
                <span className='text-label-sm text-text-sub-600'>S</span>
              </div>
              <div className='flex-1 space-y-1'>
                <div className='text-label-sm text-text-strong-950'>
                  Solaris
                </div>
                <div className='text-paragraph-xs text-text-sub-600'>
                  Allow Solaris to contact you.
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close asChild>
            <Button.Root
              variant='neutral'
              mode='stroke'
              size='small'
              className='w-full'
            >
              Cancel
            </Button.Root>
          </Modal.Close>
          <Button.Root size='small' className='w-full'>
            Update Changes
          </Button.Root>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}

export const WithHeader = {
  render: () => <WithHeaderRender />,
};

function PatternRender() {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal.Root open={open} onOpenChange={setOpen}>
      <Modal.Trigger asChild>
        <Button.Root
          variant='neutral'
          mode='stroke'
          onClick={() => setOpen(true)}
        >
          Click to open
        </Button.Root>
      </Modal.Trigger>
      <Modal.Content
        variant='pattern'
        closeVariant='badge'
        className='max-w-[560px]'
      >
        <div className='flex flex-col items-start gap-6 p-10'>
          <div className='bg-bg-white-0 ring-stroke-soft-200 shadow-regular-md flex h-14 w-14 shrink-0 items-center justify-center rounded-full ring-1 ring-inset'>
            <RiQuillPenLine className='text-text-sub-600 h-7 w-7' />
          </div>
          <div className='space-y-2'>
            <Modal.Title className='text-title-h6 text-text-strong-950'>
              Confirm your intent before submitting
            </Modal.Title>
            <Modal.Description className='text-paragraph-sm text-text-sub-600'>
              You are formally expressing interest in this business opportunity.
            </Modal.Description>
          </div>
          <div className='flex w-full gap-3'>
            <Modal.Close asChild>
              <Button.Root
                variant='neutral'
                mode='stroke'
                size='small'
                className='flex-1'
              >
                Cancel
              </Button.Root>
            </Modal.Close>
            <Button.Root size='small' className='flex-1'>
              Continue
            </Button.Root>
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}

export const Pattern = {
  render: () => <PatternRender />,
};
