import {
  RiArrowLeftDoubleLine,
  RiArrowLeftSLine,
  RiArrowRightDoubleLine,
  RiArrowRightSLine,
} from '@remixicon/react';

import * as Pagination from './pagination';

export default { title: 'Navigation/Pagination', component: Pagination.Root };

export const Playground = {
  args: {
    variant: 'basic',
    totalPages: 5,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['basic', 'rounded', 'group'],
    },
    totalPages: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
    },
  },
  render: (args: any) => (
    <Pagination.Root variant={args.variant}>
      <Pagination.NavButton aria-label='Go to previous page'>
        <Pagination.NavIcon as={RiArrowLeftSLine} />
      </Pagination.NavButton>
      {Array.from({ length: args.totalPages }, (_, idx) => (
        <Pagination.Item key={idx} current={idx === 0}>
          {idx + 1}
        </Pagination.Item>
      ))}
      <Pagination.NavButton aria-label='Go to next page'>
        <Pagination.NavIcon as={RiArrowRightSLine} />
      </Pagination.NavButton>
    </Pagination.Root>
  ),
};

export const Demo = {
  render: () => (
    <Pagination.Root>
      <Pagination.NavButton aria-label='Go to first page'>
        <Pagination.NavIcon as={RiArrowLeftDoubleLine} />
      </Pagination.NavButton>
      <Pagination.NavButton aria-label='Go to previous page'>
        <Pagination.NavIcon as={RiArrowLeftSLine} />
      </Pagination.NavButton>
      <Pagination.Item>1</Pagination.Item>
      <Pagination.Item>2</Pagination.Item>
      <Pagination.Item>3</Pagination.Item>
      <Pagination.Item current>4</Pagination.Item>
      <Pagination.Item>5</Pagination.Item>
      <Pagination.Item asChild>
        <span aria-hidden='true'>…</span>
      </Pagination.Item>
      <Pagination.Item>16</Pagination.Item>
      <Pagination.NavButton aria-label='Go to last page'>
        <Pagination.NavIcon as={RiArrowRightDoubleLine} />
      </Pagination.NavButton>
      <Pagination.NavButton aria-label='Go to next page'>
        <Pagination.NavIcon as={RiArrowRightSLine} />
      </Pagination.NavButton>
    </Pagination.Root>
  ),
};

export const Rounded = {
  render: () => (
    <Pagination.Root variant='rounded'>
      <Pagination.NavButton aria-label='Go to first page'>
        <Pagination.NavIcon as={RiArrowLeftDoubleLine} />
      </Pagination.NavButton>
      <Pagination.NavButton aria-label='Go to previous page'>
        <Pagination.NavIcon as={RiArrowLeftSLine} />
      </Pagination.NavButton>
      <Pagination.Item>1</Pagination.Item>
      <Pagination.Item>2</Pagination.Item>
      <Pagination.Item>3</Pagination.Item>
      <Pagination.Item current>4</Pagination.Item>
      <Pagination.Item>5</Pagination.Item>
      <Pagination.Item asChild>
        <span aria-hidden='true'>…</span>
      </Pagination.Item>
      <Pagination.Item>16</Pagination.Item>
      <Pagination.NavButton aria-label='Go to last page'>
        <Pagination.NavIcon as={RiArrowRightDoubleLine} />
      </Pagination.NavButton>
      <Pagination.NavButton aria-label='Go to next page'>
        <Pagination.NavIcon as={RiArrowRightSLine} />
      </Pagination.NavButton>
    </Pagination.Root>
  ),
};

export const Group = {
  render: () => (
    <Pagination.Root variant='group'>
      <Pagination.NavButton aria-label='Go to first page'>
        <Pagination.NavIcon as={RiArrowLeftDoubleLine} />
      </Pagination.NavButton>
      <Pagination.NavButton aria-label='Go to previous page'>
        <Pagination.NavIcon as={RiArrowLeftSLine} />
      </Pagination.NavButton>
      <Pagination.Item>1</Pagination.Item>
      <Pagination.Item>2</Pagination.Item>
      <Pagination.Item>3</Pagination.Item>
      <Pagination.Item current>4</Pagination.Item>
      <Pagination.Item>5</Pagination.Item>
      <Pagination.Item asChild>
        <span aria-hidden='true'>…</span>
      </Pagination.Item>
      <Pagination.Item>16</Pagination.Item>
      <Pagination.NavButton aria-label='Go to last page'>
        <Pagination.NavIcon as={RiArrowRightDoubleLine} />
      </Pagination.NavButton>
      <Pagination.NavButton aria-label='Go to next page'>
        <Pagination.NavIcon as={RiArrowRightSLine} />
      </Pagination.NavButton>
    </Pagination.Root>
  ),
};

export const AsLink = {
  render: () => (
    <Pagination.Root>
      <Pagination.NavButton asChild>
        <a href='/page/1' aria-label='Go to first page'>
          <Pagination.NavIcon as={RiArrowLeftDoubleLine} />
        </a>
      </Pagination.NavButton>
      <Pagination.NavButton asChild>
        <a href='/page/3' aria-label='Go to previous page'>
          <Pagination.NavIcon as={RiArrowLeftSLine} />
        </a>
      </Pagination.NavButton>
      <Pagination.Item asChild>
        <a href='/page/1'>1</a>
      </Pagination.Item>
      <Pagination.Item asChild>
        <a href='/page/2'>2</a>
      </Pagination.Item>
      <Pagination.Item asChild>
        <a href='/page/3'>3</a>
      </Pagination.Item>
      <Pagination.Item current asChild>
        <a href='/page/4'>4</a>
      </Pagination.Item>
      <Pagination.Item asChild>
        <a href='/page/5'>5</a>
      </Pagination.Item>
      <Pagination.Item asChild>
        <span aria-hidden='true'>…</span>
      </Pagination.Item>
      <Pagination.Item asChild>
        <a href='/page/16'>16</a>
      </Pagination.Item>
      <Pagination.NavButton asChild>
        <a href='/page/5' aria-label='Go to last page'>
          <Pagination.NavIcon as={RiArrowRightDoubleLine} />
        </a>
      </Pagination.NavButton>
      <Pagination.NavButton asChild>
        <a href='/page/16' aria-label='Go to next page'>
          <Pagination.NavIcon as={RiArrowRightSLine} />
        </a>
      </Pagination.NavButton>
    </Pagination.Root>
  ),
};
