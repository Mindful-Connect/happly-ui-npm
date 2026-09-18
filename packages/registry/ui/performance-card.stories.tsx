import {
  RiCalendarLine,
  RiMapPinLine,
  RiTimeLine,
  RiUserFill,
} from '@remixicon/react';

import * as Badge from './badge';
import * as Button from './button';
import * as PerformanceCard from './performance-card';

export default {
  title: 'Charts/Performance Card',
  component: PerformanceCard.Root,
};

export const Default = {
  render: () => (
    <PerformanceCard.Root className='w-[900px]'>
      <PerformanceCard.Header
        media={<PerformanceCard.Media className='h-[152px] w-[270px]' />}
        action={
          <Button.Root variant='neutral' mode='stroke' size='xsmall'>
            Details
          </Button.Root>
        }
      >
        <PerformanceCard.Title className='text-title-h6 truncate'>
          Session title
        </PerformanceCard.Title>
        <PerformanceCard.Meta>
          <RiCalendarLine aria-hidden className='size-4' />
          12 Feb 2026
          <PerformanceCard.Rule />
          <RiTimeLine aria-hidden className='size-4' />
          10:00 (GMT+1)
          <PerformanceCard.Rule />
          <Badge.Root variant='lighter' color='gray'>
            Embedded tool
          </Badge.Root>
          <PerformanceCard.Rule />
          <Badge.Root variant='lighter' color='gray'>
            Public
          </Badge.Root>
        </PerformanceCard.Meta>
        <PerformanceCard.Stats>
          <PerformanceCard.Stat value={32458} label='Total views' />
          <PerformanceCard.Stat value='18m 42s' label='Avg. watch time' />
          <PerformanceCard.Stat value='24:10' label='Drop-off peak' />
          <PerformanceCard.Stat value={128} label='Comments' />
        </PerformanceCard.Stats>
      </PerformanceCard.Header>
    </PerformanceCard.Root>
  ),
};

export const WithSublabels = {
  render: () => (
    <PerformanceCard.Root className='w-[900px]'>
      <PerformanceCard.Header
        media={
          <PerformanceCard.Media
            className='size-36'
            placeholder={
              <RiUserFill aria-hidden className='text-text-soft-400 size-10' />
            }
          />
        }
        action={
          <Button.Root variant='neutral' mode='stroke' size='xsmall'>
            Details
          </Button.Root>
        }
      >
        <PerformanceCard.Title sublabels={['Role', 'name@example.com']}>
          Person name
        </PerformanceCard.Title>
        <PerformanceCard.Meta>
          <RiMapPinLine aria-hidden className='size-4' />
          In-person meeting
          <PerformanceCard.Rule />
          <Badge.Root variant='lighter' color='gray'>
            Group A
          </Badge.Root>
          <PerformanceCard.Rule />
          <Badge.Root variant='lighter' color='gray'>
            Group B
          </Badge.Root>
        </PerformanceCard.Meta>
        <PerformanceCard.Stats>
          <PerformanceCard.Stat value={214} label='Bookings' />
          <PerformanceCard.Stat value={186} label='Attended' />
          <PerformanceCard.Stat value='87%' label='Attendance rate' />
          <PerformanceCard.Stat value='42m' label='Avg. duration' />
          <PerformanceCard.Stat value={12} label='Cancellations' />
        </PerformanceCard.Stats>
      </PerformanceCard.Header>
    </PerformanceCard.Root>
  ),
};

export const WithMetrics = {
  render: () => (
    <PerformanceCard.Root className='w-[900px]'>
      <PerformanceCard.Header
        media={<PerformanceCard.Media className='h-[152px] w-[270px]' />}
        action={
          <Button.Root variant='neutral' mode='stroke' size='xsmall'>
            Details
          </Button.Root>
        }
      >
        <PerformanceCard.Title className='text-title-h6 truncate'>
          Event name
        </PerformanceCard.Title>
        <PerformanceCard.Meta>
          <RiCalendarLine aria-hidden className='size-4' />
          12 Feb 2026
          <PerformanceCard.Rule />
          <RiMapPinLine aria-hidden className='size-4' />
          Somewhere
          <PerformanceCard.Rule />
          <Badge.Root variant='lighter' color='gray'>
            Public
          </Badge.Root>
        </PerformanceCard.Meta>
        <PerformanceCard.Stats>
          <PerformanceCard.Metric
            value={240}
            label='Total tickets sold'
            delta={-5.4}
            comparison='vs last week'
          />
          <PerformanceCard.Metric
            value='$112,241.00'
            label='Revenue generated'
            delta={7.2}
            comparison='vs last week'
          />
        </PerformanceCard.Stats>
      </PerformanceCard.Header>
    </PerformanceCard.Root>
  ),
};

export const WithContentBelow = {
  render: () => (
    <PerformanceCard.Root className='w-[900px]'>
      <PerformanceCard.Header
        media={<PerformanceCard.Media className='h-[152px] w-[270px]' />}
      >
        <PerformanceCard.Title className='text-title-h6'>
          Session title
        </PerformanceCard.Title>
        <PerformanceCard.Meta>
          <RiCalendarLine aria-hidden className='size-4' />
          12 Feb 2026
        </PerformanceCard.Meta>
        <PerformanceCard.Stats>
          <PerformanceCard.Stat value={32458} label='Total views' />
          <PerformanceCard.Stat value={128} label='Comments' />
        </PerformanceCard.Stats>
      </PerformanceCard.Header>
      {/* Anything can follow the header; it meets the card's border directly. */}
      <div className='bg-bg-weak-50 border-stroke-soft-200 text-paragraph-xs text-text-sub-600 border-y px-6 py-3'>
        A table's header band runs edge to edge
      </div>
      <div className='text-paragraph-sm text-text-sub-600 px-6 py-4'>A row</div>
    </PerformanceCard.Root>
  ),
};
