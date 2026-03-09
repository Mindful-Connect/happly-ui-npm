import {
  RiArrowLeftDoubleLine,
  RiArrowLeftSLine,
  RiArrowRightDoubleLine,
  RiArrowRightSLine,
} from '@remixicon/react';

import * as Pagination from './pagination';

export default { title: 'Navigation/Pagination', component: Pagination.Root };

export const Demo = {
  render: () => (
    <Pagination.Root>
      <Pagination.NavButton>
        <Pagination.NavIcon as={RiArrowLeftDoubleLine} />
      </Pagination.NavButton>
      <Pagination.NavButton>
        <Pagination.NavIcon as={RiArrowLeftSLine} />
      </Pagination.NavButton>
      <Pagination.Item>1</Pagination.Item>
      <Pagination.Item>2</Pagination.Item>
      <Pagination.Item>3</Pagination.Item>
      <Pagination.Item current>4</Pagination.Item>
      <Pagination.Item>5</Pagination.Item>
      <Pagination.Item>...</Pagination.Item>
      <Pagination.Item>16</Pagination.Item>
      <Pagination.NavButton>
        <Pagination.NavIcon as={RiArrowRightDoubleLine} />
      </Pagination.NavButton>
      <Pagination.NavButton>
        <Pagination.NavIcon as={RiArrowRightSLine} />
      </Pagination.NavButton>
    </Pagination.Root>
  ),
};

export const Rounded = {
  render: () => (
    <Pagination.Root variant='rounded'>
      <Pagination.NavButton>
        <Pagination.NavIcon as={RiArrowLeftDoubleLine} />
      </Pagination.NavButton>
      <Pagination.NavButton>
        <Pagination.NavIcon as={RiArrowLeftSLine} />
      </Pagination.NavButton>
      <Pagination.Item>1</Pagination.Item>
      <Pagination.Item>2</Pagination.Item>
      <Pagination.Item>3</Pagination.Item>
      <Pagination.Item current>4</Pagination.Item>
      <Pagination.Item>5</Pagination.Item>
      <Pagination.Item>...</Pagination.Item>
      <Pagination.Item>16</Pagination.Item>
      <Pagination.NavButton>
        <Pagination.NavIcon as={RiArrowRightDoubleLine} />
      </Pagination.NavButton>
      <Pagination.NavButton>
        <Pagination.NavIcon as={RiArrowRightSLine} />
      </Pagination.NavButton>
    </Pagination.Root>
  ),
};

export const Group = {
  render: () => (
    <Pagination.Root variant='group'>
      <Pagination.NavButton>
        <Pagination.NavIcon as={RiArrowLeftDoubleLine} />
      </Pagination.NavButton>
      <Pagination.NavButton>
        <Pagination.NavIcon as={RiArrowLeftSLine} />
      </Pagination.NavButton>
      <Pagination.Item>1</Pagination.Item>
      <Pagination.Item>2</Pagination.Item>
      <Pagination.Item>3</Pagination.Item>
      <Pagination.Item current>4</Pagination.Item>
      <Pagination.Item>5</Pagination.Item>
      <Pagination.Item>...</Pagination.Item>
      <Pagination.Item>16</Pagination.Item>
      <Pagination.NavButton>
        <Pagination.NavIcon as={RiArrowRightDoubleLine} />
      </Pagination.NavButton>
      <Pagination.NavButton>
        <Pagination.NavIcon as={RiArrowRightSLine} />
      </Pagination.NavButton>
    </Pagination.Root>
  ),
};

export const AsLink = {
  render: () => (
    <Pagination.Root>
      <Pagination.NavButton asChild>
        <a href='/page/1'>
          <Pagination.NavIcon as={RiArrowLeftDoubleLine} />
        </a>
      </Pagination.NavButton>
      <Pagination.NavButton asChild>
        <a href='/page/3'>
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
      <Pagination.Item>...</Pagination.Item>
      <Pagination.Item asChild>
        <a href='/page/16'>16</a>
      </Pagination.Item>
      <Pagination.NavButton asChild>
        <a href='/page/5'>
          <Pagination.NavIcon as={RiArrowRightDoubleLine} />
        </a>
      </Pagination.NavButton>
      <Pagination.NavButton asChild>
        <a href='/page/16'>
          <Pagination.NavIcon as={RiArrowRightSLine} />
        </a>
      </Pagination.NavButton>
    </Pagination.Root>
  ),
};
