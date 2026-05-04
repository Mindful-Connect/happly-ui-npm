import {
  RiUser3Fill,
  RiMoneyDollarCircleFill,
  RiQuestionFill,
  RiFileFill,
} from '@remixicon/react';

import * as StepIndicator from './step-indicator';

export default {
  title: 'Layout/Step Indicator',
  component: StepIndicator.Root,
};

const baseItems = [
  {
    icon: RiUser3Fill,
    title: 'Capability & Fit',
    description: '3 Questions',
  },
  {
    icon: RiMoneyDollarCircleFill,
    title: 'Offer Details',
    description: '3 Questions',
  },
  {
    icon: RiQuestionFill,
    title: 'Financing & Readiness',
    description: '4 Questions',
  },
  {
    icon: RiFileFill,
    title: 'Supporting Documents',
    description: '2 Questions',
  },
] as const;

const card =
  'rounded-2xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs w-[320px]';

export const FirstStepActive = {
  render: () => (
    <div className={card}>
      <StepIndicator.Composed
        items={[
          { status: 'active', progress: 30, ...baseItems[0] },
          { status: 'pending', ...baseItems[1] },
          { status: 'pending', ...baseItems[2] },
          { status: 'pending', ...baseItems[3] },
        ]}
      />
    </div>
  ),
};

export const MidProgress = {
  render: () => (
    <div className={card}>
      <StepIndicator.Composed
        items={[
          { status: 'completed', ...baseItems[0] },
          { status: 'active', progress: 50, ...baseItems[1] },
          { status: 'pending', ...baseItems[2] },
          { status: 'pending', ...baseItems[3] },
        ]}
      />
    </div>
  ),
};

export const LastStepActive = {
  render: () => (
    <div className={card}>
      <StepIndicator.Composed
        items={[
          { status: 'completed', ...baseItems[0] },
          { status: 'completed', ...baseItems[1] },
          { status: 'completed', ...baseItems[2] },
          { status: 'active', progress: 70, ...baseItems[3] },
        ]}
      />
    </div>
  ),
};

export const AllCompleted = {
  render: () => (
    <div className={card}>
      <StepIndicator.Composed
        items={[
          { status: 'completed', ...baseItems[0] },
          { status: 'completed', ...baseItems[1] },
          { status: 'completed', ...baseItems[2] },
          { status: 'completed', ...baseItems[3] },
        ]}
      />
    </div>
  ),
};

export const Compound = {
  render: () => (
    <div className={card}>
      <StepIndicator.Root>
        <StepIndicator.Item
          status='completed'
          icon={RiUser3Fill}
          title='Capability & Fit'
          description='3 Questions'
        />
        <StepIndicator.Item
          status='active'
          progress={50}
          icon={RiMoneyDollarCircleFill}
          title='Offer Details'
          description='3 Questions'
        />
        <StepIndicator.Item
          status='pending'
          icon={RiQuestionFill}
          title='Financing & Readiness'
          description='4 Questions'
        />
        <StepIndicator.Item
          status='pending'
          icon={RiFileFill}
          title='Supporting Documents'
          description='2 Questions'
        />
      </StepIndicator.Root>
    </div>
  ),
};

export const Clickable = {
  render: () => (
    <div className={card}>
      <StepIndicator.Composed
        onItemClick={(index) => {
          // eslint-disable-next-line no-console
          console.log('Step clicked:', index);
        }}
        items={[
          { status: 'completed', ...baseItems[0] },
          { status: 'active', progress: 50, ...baseItems[1] },
          { status: 'pending', ...baseItems[2] },
          { status: 'pending', ...baseItems[3] },
        ]}
      />
    </div>
  ),
};

export const CustomRailColors = {
  render: () => (
    <div className={card}>
      <StepIndicator.Composed
        railFilledClassName='bg-information-base'
        railTrackClassName='bg-bg-weak-50'
        items={[
          { status: 'completed', ...baseItems[0] },
          { status: 'active', progress: 50, ...baseItems[1] },
          { status: 'pending', ...baseItems[2] },
          { status: 'pending', ...baseItems[3] },
        ]}
      />
    </div>
  ),
};
