import {
  RiBuilding2Line,
  RiBuilding4Line,
  RiCalendarLine,
  RiGlobalLine,
  RiGroup2Line,
  RiHandCoinLine,
  RiHeartLine,
  RiMapPinLine,
  RiMoneyDollarBoxLine,
  RiMoneyDollarCircleLine,
  RiRefund2Line,
  RiSortDesc,
  RiSuitcaseLine,
  RiUser2Line,
} from '@remixicon/react';

import type { InfoGridGroupRow } from './info-grid';

import * as Badge from './badge';
import * as InfoGrid from './info-grid';
import * as KeyIcon from './key-icon';

export default {
  title: 'Displaying Data/Info Grid',
};

export const BusinessProfile = {
  render: () => (
    <InfoGrid.Root className='w-[960px]'>
      {/* Row 1: Full-width — Category */}
      <InfoGrid.Row>
        <InfoGrid.Cell>
          <KeyIcon.Root icon={<RiHeartLine />} />
          <div className='flex flex-col gap-2'>
            <p className='text-label-xs text-text-strong-950'>Category</p>
            <p className='text-paragraph-sm text-text-sub-600'>SaaS</p>
          </div>
        </InfoGrid.Cell>
      </InfoGrid.Row>

      {/* Row 2: 3-column — Business info */}
      <InfoGrid.Row>
        <InfoGrid.Cell>
          <KeyIcon.Root icon={<RiSuitcaseLine />} />
          <div className='flex flex-col gap-1'>
            <p className='text-label-xs text-text-strong-950'>Business name</p>
            <p className='text-paragraph-sm text-text-sub-600'>Happly</p>
          </div>
        </InfoGrid.Cell>

        <InfoGrid.Cell>
          <KeyIcon.Root icon={<RiMapPinLine />} />
          <div className='flex flex-col gap-1'>
            <p className='text-label-xs text-text-strong-950'>Location</p>
            <p className='text-paragraph-sm text-text-sub-600'>Vancouver, BC</p>
          </div>
        </InfoGrid.Cell>

        <InfoGrid.Cell>
          <KeyIcon.Root icon={<RiGlobalLine />} />
          <div className='flex flex-col gap-1'>
            <p className='text-label-xs text-text-strong-950'>Website</p>
            <p className='text-paragraph-sm text-text-sub-600'>www.happly.ai</p>
          </div>
        </InfoGrid.Cell>
      </InfoGrid.Row>

      {/* Row 3: 3-column — Founded, Team size, Business model (with badge) */}
      <InfoGrid.Row>
        <InfoGrid.Cell>
          <KeyIcon.Root icon={<RiCalendarLine />} />
          <div className='flex flex-col gap-1'>
            <p className='text-label-xs text-text-strong-950'>Founded</p>
            <p className='text-paragraph-sm text-text-sub-600'>2 years</p>
          </div>
        </InfoGrid.Cell>

        <InfoGrid.Cell>
          <KeyIcon.Root icon={<RiGroup2Line />} />
          <div className='flex flex-col gap-1'>
            <p className='text-label-xs text-text-strong-950'>Team size</p>
            <p className='text-paragraph-sm text-text-sub-600'>10</p>
          </div>
        </InfoGrid.Cell>

        <InfoGrid.Cell>
          <KeyIcon.Root icon={<RiBuilding4Line />} />
          <div className='flex flex-col items-start gap-1'>
            <p className='text-label-xs text-text-strong-950'>Business model</p>
            <Badge.Root size='small' variant='lighter' color='gray'>
              B2B
            </Badge.Root>
          </div>
        </InfoGrid.Cell>
      </InfoGrid.Row>

      {/* Row 4: Full-width — Industry (wrapping badges) */}
      <InfoGrid.Row>
        <InfoGrid.Cell>
          <KeyIcon.Root icon={<RiBuilding2Line />} />
          <div className='flex flex-col gap-2'>
            <p className='text-label-xs text-text-strong-950'>Industry</p>
            <Badge.Group
              size='medium'
              maxVisible={6}
              items={[
                { label: 'Aerospace' },
                { label: 'Agriculture' },
                { label: 'Environmental Sustainability' },
                { label: 'Healthcare' },
                { label: 'Industrial' },
                { label: 'Manufacturing' },
                { label: 'Telecommunications' },
                { label: 'Research and Discovery' },
                { label: 'Med Tech' },
              ]}
            />
          </div>
        </InfoGrid.Cell>
      </InfoGrid.Row>
    </InfoGrid.Root>
  ),
};

export const FinancialData = {
  render: () => (
    <InfoGrid.Root className='w-[1080px]'>
      {/* Row 1: 3-column — Revenue metrics */}
      <InfoGrid.Row>
        <InfoGrid.Cell>
          <KeyIcon.Root icon={<RiMoneyDollarCircleLine />} />
          <div className='flex flex-col gap-0.5'>
            <p className='text-label-xs text-text-strong-950'>Annual revenue</p>
            <div className='flex flex-wrap items-center gap-1'>
              <span className='text-label-md text-success-dark'>
                $34,000 CAD
              </span>
              <span className='text-label-xs text-text-soft-400'>
                (last 12 months)
              </span>
            </div>
          </div>
        </InfoGrid.Cell>

        <InfoGrid.Cell>
          <KeyIcon.Root icon={<RiMoneyDollarCircleLine />} />
          <div className='flex flex-col gap-0.5'>
            <p className='text-label-xs text-text-strong-950'>Revenue</p>
            <div className='flex flex-wrap items-center gap-1'>
              <span className='text-label-md text-success-dark'>
                85,000 CAD
              </span>
              <span className='text-label-xs text-text-soft-400'>
                (last month)
              </span>
            </div>
          </div>
        </InfoGrid.Cell>

        <InfoGrid.Cell>
          <KeyIcon.Root icon={<RiRefund2Line />} />
          <div className='flex flex-col gap-1'>
            <p className='text-label-xs text-text-strong-950'>
              Annual Recurring Revenue
            </p>
            <div className='flex flex-wrap items-center gap-1'>
              <span className='text-label-md text-success-dark'>
                85,000 CAD
              </span>
              <span className='text-label-xs text-text-soft-400'>
                (last month)
              </span>
            </div>
          </div>
        </InfoGrid.Cell>
      </InfoGrid.Row>

      {/* Row 2: 3-column — MRR, Net profit */}
      <InfoGrid.Row>
        <InfoGrid.Cell>
          <KeyIcon.Root icon={<RiRefund2Line />} />
          <div className='flex flex-col gap-1'>
            <p className='text-label-xs text-text-strong-950'>
              Monthly Recurring Revenue
            </p>
            <div className='flex flex-wrap items-center gap-1'>
              <span className='text-label-md text-success-dark'>
                85,000 CAD
              </span>
              <span className='text-label-xs text-text-soft-400'>
                (last month)
              </span>
            </div>
          </div>
        </InfoGrid.Cell>

        <InfoGrid.Cell>
          <KeyIcon.Root icon={<RiMoneyDollarBoxLine />} />
          <div className='flex flex-col gap-0.5'>
            <p className='text-label-xs text-text-strong-950'>Net profit</p>
            <div className='flex flex-wrap items-center gap-1'>
              <span className='text-label-md text-success-dark'>
                $34,000 CAD
              </span>
              <span className='text-label-xs text-text-soft-400'>
                (last 12 months)
              </span>
            </div>
          </div>
        </InfoGrid.Cell>

        <InfoGrid.Cell>
          <KeyIcon.Root icon={<RiMoneyDollarBoxLine />} />
          <div className='flex flex-col gap-0.5'>
            <p className='text-label-xs text-text-strong-950'>Net profit</p>
            <div className='flex flex-wrap items-center gap-1'>
              <span className='text-label-md text-success-dark'>
                85,000 CAD
              </span>
              <span className='text-label-xs text-text-soft-400'>
                (last month)
              </span>
            </div>
          </div>
        </InfoGrid.Cell>
      </InfoGrid.Row>

      {/* Row 3: 3-column — Clients, Churn, Funding (badges) */}
      <InfoGrid.Row>
        <InfoGrid.Cell>
          <KeyIcon.Root icon={<RiUser2Line />} />
          <div className='flex flex-col gap-1'>
            <p className='text-label-xs text-text-strong-950'>Active clients</p>
            <p className='text-paragraph-sm text-text-sub-600'>5</p>
          </div>
        </InfoGrid.Cell>

        <InfoGrid.Cell>
          <KeyIcon.Root icon={<RiSortDesc />} />
          <div className='flex flex-col gap-1'>
            <p className='text-label-xs text-text-strong-950'>Churn trend</p>
            <p className='text-paragraph-sm text-text-sub-600'>Decreasing</p>
          </div>
        </InfoGrid.Cell>

        <InfoGrid.Cell>
          <KeyIcon.Root icon={<RiHandCoinLine />} />
          <div className='flex flex-col gap-1'>
            <p className='text-label-xs text-text-strong-950'>
              Funding history
            </p>
            <Badge.Group
              size='medium'
              maxVisible={3}
              items={[
                { label: 'Bootstrapped' },
                { label: 'Seed Funded' },
                { label: 'Series A' },
                { label: 'Series B' },
                { label: 'Series C' },
                { label: 'Venture Capital' },
                { label: 'Angel Investment' },
                { label: 'Grants' },
                { label: 'Crowdfunding' },
                { label: 'Private Equity' },
                { label: 'IPO' },
                { label: 'Debt Financing' },
              ]}
            />
          </div>
        </InfoGrid.Cell>
      </InfoGrid.Row>
    </InfoGrid.Root>
  ),
};

export const TwoColumns = {
  render: () => (
    <InfoGrid.Root className='w-[640px]'>
      <InfoGrid.Row>
        <InfoGrid.Cell>
          <KeyIcon.Root icon={<RiUser2Line />} />
          <div className='flex flex-col gap-1'>
            <p className='text-label-xs text-text-strong-950'>Applicants</p>
            <p className='text-paragraph-sm text-text-sub-600'>128</p>
          </div>
        </InfoGrid.Cell>

        <InfoGrid.Cell>
          <KeyIcon.Root icon={<RiCalendarLine />} />
          <div className='flex flex-col gap-1'>
            <p className='text-label-xs text-text-strong-950'>Deadline</p>
            <p className='text-paragraph-sm text-text-sub-600'>
              March 31, 2026
            </p>
          </div>
        </InfoGrid.Cell>
      </InfoGrid.Row>
    </InfoGrid.Root>
  ),
};

export const MobileResponsive = {
  render: () => (
    <InfoGrid.Root className='w-[400px]'>
      <InfoGrid.Row>
        <InfoGrid.Cell>
          <KeyIcon.Root icon={<RiHeartLine />} />
          <div className='flex flex-col gap-2'>
            <p className='text-label-xs text-text-strong-950'>Category</p>
            <p className='text-paragraph-sm text-text-sub-600'>SaaS</p>
          </div>
        </InfoGrid.Cell>
      </InfoGrid.Row>

      <InfoGrid.Row>
        <InfoGrid.Cell>
          <KeyIcon.Root icon={<RiSuitcaseLine />} />
          <div className='flex flex-col gap-1'>
            <p className='text-label-xs text-text-strong-950'>Business name</p>
            <p className='text-paragraph-sm text-text-sub-600'>Happly</p>
          </div>
        </InfoGrid.Cell>

        <InfoGrid.Cell>
          <KeyIcon.Root icon={<RiMapPinLine />} />
          <div className='flex flex-col gap-1'>
            <p className='text-label-xs text-text-strong-950'>Location</p>
            <p className='text-paragraph-sm text-text-sub-600'>Vancouver, BC</p>
          </div>
        </InfoGrid.Cell>
      </InfoGrid.Row>

      <InfoGrid.Row>
        <InfoGrid.Cell>
          <KeyIcon.Root icon={<RiBuilding2Line />} />
          <div className='flex flex-col gap-2'>
            <p className='text-label-xs text-text-strong-950'>Industry</p>
            <Badge.Group
              size='medium'
              items={[
                { label: 'Aerospace' },
                { label: 'Agriculture' },
                { label: 'Healthcare' },
              ]}
            />
          </div>
        </InfoGrid.Cell>
      </InfoGrid.Row>
    </InfoGrid.Root>
  ),
};

export const ComposedGroup = {
  render: () => {
    const rows: InfoGridGroupRow[] = [
      {
        items: [
          {
            icon: <RiHeartLine />,
            label: 'Category',
            children: (
              <p className='text-paragraph-sm text-text-sub-600'>SaaS</p>
            ),
          },
        ],
      },
      {
        items: [
          {
            icon: <RiSuitcaseLine />,
            label: 'Business name',
            children: (
              <p className='text-paragraph-sm text-text-sub-600'>Happly</p>
            ),
          },
          {
            icon: <RiMapPinLine />,
            label: 'Location',
            children: (
              <p className='text-paragraph-sm text-text-sub-600'>
                Vancouver, BC
              </p>
            ),
          },
          {
            icon: <RiGlobalLine />,
            label: 'Website',
            children: (
              <p className='text-paragraph-sm text-text-sub-600'>
                www.happly.ai
              </p>
            ),
          },
        ],
      },
      {
        items: [
          {
            icon: <RiCalendarLine />,
            label: 'Founded',
            children: (
              <p className='text-paragraph-sm text-text-sub-600'>2 years</p>
            ),
          },
          {
            icon: <RiGroup2Line />,
            label: 'Team size',
            children: (
              <p className='text-paragraph-sm text-text-sub-600'>10</p>
            ),
          },
          {
            icon: <RiBuilding4Line />,
            label: 'Business model',
            children: (
              <Badge.Root>
                B2B
              </Badge.Root>
            ),
          },
        ],
      },
    ];

    return <InfoGrid.Group className='w-[960px]' rows={rows} />;
  },
};
