import {
  RiBankCardLine,
  RiCalendarLine,
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiForbidFill,
  RiMoneyDollarCircleLine,
  RiPlayFill,
  RiQuestionFill,
  RiStarLine,
  RiSurveyFill,
  RiTBoxFill,
  RiTimeFill,
  RiVolumeUpFill,
} from '@remixicon/react';

import * as KeyIcon from './key-icon';
import * as StatStrip from './stat-strip';

export default { title: 'Charts/Stat Strip', component: StatStrip.Root };

export const Default = {
  render: () => (
    <StatStrip.Root className='w-[1064px]'>
      <StatStrip.Item
        icon={
          <KeyIcon.Root icon={<RiForbidFill className='text-faded-base' />} />
        }
        label='New'
        value={11435}
      />
      <StatStrip.Item
        icon={
          <KeyIcon.Root icon={<RiTimeFill className='text-warning-base' />} />
        }
        label='Review'
        value={3654}
      />
      <StatStrip.Item
        icon={
          <KeyIcon.Root icon={<RiTimeFill className='text-warning-base' />} />
        }
        label='Waiting'
        value={3654}
      />
      <StatStrip.Item
        icon={
          <KeyIcon.Root
            icon={<RiCloseCircleFill className='text-error-base' />}
          />
        }
        label='Declined'
        value={3654}
      />
      <StatStrip.Item
        icon={
          <KeyIcon.Root
            icon={<RiCheckboxCircleFill className='text-success-base' />}
          />
        }
        label='Approved'
        value={3654}
      />
      <StatStrip.Item
        icon={
          <KeyIcon.Root
            icon={<RiCheckboxCircleFill className='text-text-strong-950' />}
          />
        }
        label='Fulfilled'
        value={1112}
      />
    </StatStrip.Root>
  ),
};

export const ColouredIcons = {
  render: () => (
    <StatStrip.Root className='w-[1064px]'>
      <StatStrip.Item
        icon={
          <KeyIcon.Root
            style='lighter'
            color='red'
            icon={<RiPlayFill className='text-error-dark' />}
          />
        }
        label='Category A'
        value={15}
      />
      <StatStrip.Item
        icon={
          <KeyIcon.Root
            style='lighter'
            color='blue'
            icon={<RiVolumeUpFill className='text-information-dark' />}
          />
        }
        label='Category B'
        value={2}
      />
      <StatStrip.Item
        icon={
          <KeyIcon.Root
            style='lighter'
            color='gray'
            icon={<RiTBoxFill className='text-faded-dark' />}
          />
        }
        label='Category C'
        value={12}
      />
      <StatStrip.Item
        icon={
          <KeyIcon.Root
            style='lighter'
            color='purple'
            icon={<RiQuestionFill className='text-feature-dark' />}
          />
        }
        label='Category D'
        value={5}
      />
      <StatStrip.Item
        icon={
          <KeyIcon.Root
            style='lighter'
            color='yellow'
            icon={<RiCheckboxCircleFill className='text-away-dark' />}
          />
        }
        label='Category E'
        value={3}
      />
      <StatStrip.Item
        icon={
          <KeyIcon.Root
            style='lighter'
            color='green'
            icon={<RiSurveyFill className='text-success-dark' />}
          />
        }
        label='Category F'
        value={0}
      />
    </StatStrip.Root>
  ),
};

export const WithDelta = {
  render: () => (
    <StatStrip.Root className='w-[1064px]'>
      <StatStrip.Item
        icon={
          <KeyIcon.Root
            icon={<RiMoneyDollarCircleLine className='text-text-sub-600' />}
          />
        }
        label='Metric A'
        value='$96,000.00'
        delta={5}
      />
      <StatStrip.Item
        icon={
          <KeyIcon.Root
            icon={<RiBankCardLine className='text-text-sub-600' />}
          />
        }
        label='Metric B'
        value='$6,000.00'
        delta={5}
      />
      <StatStrip.Item
        icon={
          <KeyIcon.Root icon={<RiStarLine className='text-text-sub-600' />} />
        }
        label='Metric C'
        value='$24,000.00'
        delta={-3}
      />
      <StatStrip.Item
        icon={
          <KeyIcon.Root
            icon={<RiCalendarLine className='text-text-sub-600' />}
          />
        }
        label='Metric D'
        value='$14,000.00'
      />
    </StatStrip.Root>
  ),
};

export const RoundedZero = {
  render: () => (
    <StatStrip.Root className='w-[480px]'>
      <StatStrip.Item
        icon={<KeyIcon.Root icon={<RiStarLine />} />}
        label='Small increase'
        value={120}
        delta={0.3}
      />
      <StatStrip.Item
        icon={<KeyIcon.Root icon={<RiStarLine />} />}
        label='Small decrease'
        value={120}
        delta={-0.3}
      />
    </StatStrip.Root>
  ),
};
