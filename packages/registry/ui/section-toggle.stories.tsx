import { useState } from 'react';

import * as Switch from './switch';
import * as SectionToggle from './section-toggle';

const CONTENT = (
  <div className='flex items-end gap-3'>
    <div className='border-stroke-soft-200 bg-bg-white-0 text-paragraph-sm text-text-soft-400 shadow-regular-xs h-10 flex-1 rounded-lg border px-3 py-2.5'>
      Select a date
    </div>
    <span className='text-paragraph-xs text-text-soft-400 pb-2.5'>To</span>
    <div className='border-stroke-soft-200 bg-bg-white-0 text-paragraph-sm text-text-soft-400 shadow-regular-xs h-10 flex-1 rounded-lg border px-3 py-2.5'>
      Select a time
    </div>
  </div>
);

export default {
  title: 'Sections/Section Toggle',
  component: SectionToggle.Root,
};

function PlaygroundRender(args: any) {
  const [open, setOpen] = useState(args.defaultOpen);

  return (
    <SectionToggle.Composed
      className='w-full max-w-[682px]'
      title={args.title}
      description={args.description}
      open={open}
      onOpenChange={setOpen}
    >
      {CONTENT}
    </SectionToggle.Composed>
  );
}

export const Playground = {
  args: {
    title: 'Toggle section title',
    description: 'Toggle this section open or closed.',
    defaultOpen: true,
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    defaultOpen: { control: 'boolean' },
  },
  render: (args: any) => <PlaygroundRender {...args} />,
};

function DefaultRender() {
  const [open, setOpen] = useState(true);

  return (
    <SectionToggle.Root open={open} className='w-full max-w-[682px]'>
      <SectionToggle.Header open={open} onOpenChange={setOpen}>
        <SectionToggle.TextGroup>
          <SectionToggle.Title>
            Do you want to set a closing date for offers?
          </SectionToggle.Title>
          <SectionToggle.Description>
            Set the date when offers stop being accepted for this program.
          </SectionToggle.Description>
        </SectionToggle.TextGroup>
        <Switch.Root
          variant='neutral'
          checked={open}
          onCheckedChange={setOpen}
          aria-label='Set a closing date for offers'
        />
      </SectionToggle.Header>
      <SectionToggle.Content open={open}>{CONTENT}</SectionToggle.Content>
    </SectionToggle.Root>
  );
}

export const Default = {
  render: () => <DefaultRender />,
};

function CollapsedRender() {
  const [open, setOpen] = useState(false);

  return (
    <SectionToggle.Root open={open} className='w-full max-w-[682px]'>
      <SectionToggle.Header open={open} onOpenChange={setOpen}>
        <SectionToggle.TextGroup>
          <SectionToggle.Title>
            Do you want to set a closing date for offers?
          </SectionToggle.Title>
          <SectionToggle.Description>
            Set the date when offers stop being accepted for this program.
          </SectionToggle.Description>
        </SectionToggle.TextGroup>
        <Switch.Root
          variant='neutral'
          checked={open}
          onCheckedChange={setOpen}
          aria-label='Set a closing date for offers'
        />
      </SectionToggle.Header>
      <SectionToggle.Content open={open}>{CONTENT}</SectionToggle.Content>
    </SectionToggle.Root>
  );
}

export const Collapsed = {
  render: () => <CollapsedRender />,
};

function ComposedRender() {
  const [open, setOpen] = useState(true);

  return (
    <SectionToggle.Composed
      className='w-full max-w-[682px]'
      title='Do you want to set a closing date for offers?'
      description='Set the date when offers stop being accepted for this program.'
      open={open}
      onOpenChange={setOpen}
    >
      {CONTENT}
    </SectionToggle.Composed>
  );
}

export const Composed = {
  render: () => <ComposedRender />,
};
