'use client';

import * as React from 'react';
import * as TabsPrimitives from '@radix-ui/react-tabs';

import * as DotStepper from './dot-stepper';

export default { title: 'Navigation/Dot Stepper', component: DotStepper.Root };

function PlaygroundRender(args: any) {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <DotStepper.Root size={args.size}>
      {Array.from({ length: args.steps }, (_, idx) => (
        <DotStepper.Item
          key={idx}
          aria-label={`Go to step ${idx}`}
          active={activeStep === idx}
          onClick={() => setActiveStep(idx)}
        />
      ))}
    </DotStepper.Root>
  );
}
export const Playground = {
  args: {
    size: 'small',
    steps: 4,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'xsmall'],
    },
    steps: {
      control: { type: 'range', min: 2, max: 8, step: 1 },
    },
  },
  render: (args: any) => <PlaygroundRender {...args} />,
};

function DemoRender() {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <div className='flex flex-col items-center gap-6'>
      <DotStepper.Root size='small'>
        {Array.from({ length: 4 }, (_, i) => i).map((_, idx) => (
          <DotStepper.Item
            key={idx}
            aria-label={`Go to step ${idx}`}
            active={activeStep === idx}
            onClick={() => setActiveStep(idx)}
          />
        ))}
      </DotStepper.Root>

      <DotStepper.Root size='xsmall'>
        {Array.from({ length: 4 }, (_, i) => i).map((_, idx) => (
          <DotStepper.Item
            key={idx}
            aria-label={`Go to step ${idx}`}
            active={activeStep === idx}
            onClick={() => setActiveStep(idx)}
          />
        ))}
      </DotStepper.Root>
    </div>
  );
}
export const Demo = {
  render: () => <DemoRender />,
};

const STEPS = [
  { id: '0', label: 'Step 1', content: 'content 1' },
  { id: '1', label: 'Step 2', content: 'content 2' },
  { id: '2', label: 'Step 3', content: 'content 3' },
  { id: '3', label: 'Step 4', content: 'content 4' },
];

function WithRadixTabsRender() {
  const [activeStep, setActiveStep] = React.useState(STEPS[0].id);

  return (
    <TabsPrimitives.Root value={activeStep} onValueChange={setActiveStep}>
      <DotStepper.Root asChild>
        <TabsPrimitives.List>
          {STEPS.map((step) => (
            <DotStepper.Item
              key={step.id}
              aria-label={`Go to ${step.label}`}
              active={activeStep === step.id}
              asChild
            >
              <TabsPrimitives.Trigger value={step.id} />
            </DotStepper.Item>
          ))}
        </TabsPrimitives.List>
      </DotStepper.Root>

      <div className='mt-4'>
        {STEPS.map((step) => (
          <TabsPrimitives.Content
            key={step.id}
            value={step.id}
            className='text-paragraph-sm text-text-sub-600'
          >
            {step.content}
          </TabsPrimitives.Content>
        ))}
      </div>
    </TabsPrimitives.Root>
  );
}
export const WithRadixTabs = {
  render: () => <WithRadixTabsRender />,
};
