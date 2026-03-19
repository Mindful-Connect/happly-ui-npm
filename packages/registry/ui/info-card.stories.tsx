import {
  RiAlertFill,
  RiCalendarLine,
  RiExternalLinkLine,
  RiTimeLine,
} from '@remixicon/react';

import * as Avatar from './avatar';
import * as Badge from './badge';
import * as InfoCard from './info-card';
import * as StatusBadge from './status-badge';

export default { title: 'Cards/Info Card' };

export const Inline = {
  render: () => (
    <div className='w-full'>
      <InfoCard.Root layout='inline'>
        <InfoCard.Item>
          <InfoCard.Label>Submitted date</InfoCard.Label>
          <InfoCard.Value>
            <RiTimeLine className='h-4 w-4' />
            <span>Jan 3, 2025</span>
          </InfoCard.Value>
        </InfoCard.Item>
        <InfoCard.Item>
          <InfoCard.Label>Created by</InfoCard.Label>
          <InfoCard.Value>
            <Avatar.Root size='20'>
              <Avatar.Image src='https://i.pravatar.cc/40?u=sean' />
            </Avatar.Root>
            <span>Sean Muir</span>
          </InfoCard.Value>
        </InfoCard.Item>
      </InfoCard.Root>
    </div>
  ),
};

export const InlineWithFullWidthItem = {
  render: () => (
    <div className='w-full'>
      <InfoCard.Root layout='inline'>
        <InfoCard.Item>
          <InfoCard.Label>Submitted date</InfoCard.Label>
          <InfoCard.Value>
            <RiTimeLine className='h-4 w-4' />
            <span>Jan 3, 2025</span>
          </InfoCard.Value>
        </InfoCard.Item>
        <InfoCard.Item>
          <InfoCard.Label>Created by</InfoCard.Label>
          <InfoCard.Value>
            <Avatar.Root size='20'>
              <Avatar.Image src='https://i.pravatar.cc/40?u=sean' />
            </Avatar.Root>
            <span>Sean Muir</span>
          </InfoCard.Value>
        </InfoCard.Item>
        <InfoCard.Item fullWidth>
          <InfoCard.Label>Publication status</InfoCard.Label>
          <InfoCard.Value>
            <StatusBadge.Root status='pending'>
              <StatusBadge.Icon as={RiAlertFill} />
              Require changes
            </StatusBadge.Root>
          </InfoCard.Value>
        </InfoCard.Item>
      </InfoCard.Root>
    </div>
  ),
};

export const Grid2Columns = {
  render: () => (
    <div className='w-full'>
      <InfoCard.Root layout='grid' columns={2}>
        <InfoCard.Item>
          <InfoCard.Label>Start date</InfoCard.Label>
          <InfoCard.Value>
            <RiCalendarLine className='h-4 w-4' />
            <span>Mar 1, 2025</span>
          </InfoCard.Value>
        </InfoCard.Item>
        <InfoCard.Item>
          <InfoCard.Label>End date</InfoCard.Label>
          <InfoCard.Value>
            <RiCalendarLine className='h-4 w-4' />
            <span>Jun 30, 2025</span>
          </InfoCard.Value>
        </InfoCard.Item>
        <InfoCard.Item>
          <InfoCard.Label>Category</InfoCard.Label>
          <InfoCard.Value>
            <Badge.Root variant='lighter' color='blue'>
              Technology
            </Badge.Root>
          </InfoCard.Value>
        </InfoCard.Item>
        <InfoCard.Item>
          <InfoCard.Label>Priority</InfoCard.Label>
          <InfoCard.Value>
            <Badge.Root variant='lighter' color='red'>
              High
            </Badge.Root>
          </InfoCard.Value>
        </InfoCard.Item>
      </InfoCard.Root>
    </div>
  ),
};

export const Stacked = {
  render: () => (
    <div className='w-full'>
      <InfoCard.Root layout='stack'>
        <InfoCard.Item>
          <InfoCard.Label>Application ID</InfoCard.Label>
          <InfoCard.Value>
            <span>#APP-2025-0142</span>
          </InfoCard.Value>
        </InfoCard.Item>
        <InfoCard.Item>
          <InfoCard.Label>Applicant</InfoCard.Label>
          <InfoCard.Value>
            <Avatar.Root size='20'>
              <Avatar.Image src='https://i.pravatar.cc/40?u=jane' />
            </Avatar.Root>
            <span>Jane Cooper</span>
          </InfoCard.Value>
        </InfoCard.Item>
        <InfoCard.Item>
          <InfoCard.Label>Status</InfoCard.Label>
          <InfoCard.Value>
            <StatusBadge.Root status='completed' variant='light'>
              <StatusBadge.Dot />
              Approved
            </StatusBadge.Root>
          </InfoCard.Value>
        </InfoCard.Item>
      </InfoCard.Root>
    </div>
  ),
};

export const WithAction = {
  render: () => (
    <div className='w-full'>
      <InfoCard.Root layout='inline'>
        <InfoCard.Item>
          <InfoCard.Label>Submitted date</InfoCard.Label>
          <InfoCard.Value>
            <RiTimeLine className='h-4 w-4' />
            <span>Jan 3, 2025</span>
          </InfoCard.Value>
        </InfoCard.Item>
        <InfoCard.Item>
          <InfoCard.Label>Created by</InfoCard.Label>
          <InfoCard.Value>
            <Avatar.Root size='20'>
              <Avatar.Image src='https://i.pravatar.cc/40?u=sean' />
            </Avatar.Root>
            <span>Sean Muir</span>
          </InfoCard.Value>
        </InfoCard.Item>
        <InfoCard.Action />
      </InfoCard.Root>
    </div>
  ),
};

export const WithCustomAction = {
  render: () => (
    <div className='w-full'>
      <InfoCard.Root layout='inline'>
        <InfoCard.Item>
          <InfoCard.Label>Application ID</InfoCard.Label>
          <InfoCard.Value>
            <span>#APP-2025-0142</span>
          </InfoCard.Value>
        </InfoCard.Item>
        <InfoCard.Item>
          <InfoCard.Label>Status</InfoCard.Label>
          <InfoCard.Value>
            <StatusBadge.Root status='completed' variant='light'>
              <StatusBadge.Dot />
              Approved
            </StatusBadge.Root>
          </InfoCard.Value>
        </InfoCard.Item>
        <InfoCard.Action className='h-[70px] @sm:w-[70px]'>
          <RiExternalLinkLine className='size-5 text-icon-sub-600' />
        </InfoCard.Action>
      </InfoCard.Root>
    </div>
  ),
};

export const Grid3Columns = {
  render: () => (
    <div className='w-full'>
      <InfoCard.Root layout='grid' columns={3}>
        <InfoCard.Item>
          <InfoCard.Label>Amount</InfoCard.Label>
          <InfoCard.Value>
            <span>$25,000</span>
          </InfoCard.Value>
        </InfoCard.Item>
        <InfoCard.Item>
          <InfoCard.Label>Duration</InfoCard.Label>
          <InfoCard.Value>
            <Badge.Root variant='stroke'>12 months</Badge.Root>
          </InfoCard.Value>
        </InfoCard.Item>
        <InfoCard.Item>
          <InfoCard.Label>Deadline</InfoCard.Label>
          <InfoCard.Value>
            <RiCalendarLine className='h-4 w-4' />
            <span>Dec 31, 2025</span>
          </InfoCard.Value>
        </InfoCard.Item>
      </InfoCard.Root>
    </div>
  ),
};
