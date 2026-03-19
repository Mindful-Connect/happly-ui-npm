import { useState } from 'react';

import {
  RiBarChartBoxLine,
  RiBriefcaseLine,
  RiHome5Line,
  RiMoneyDollarCircleLine,
  RiSettings3Line,
  RiUserLine,
} from '@remixicon/react';

import * as MenuTabBar from './menu-tab-bar';

export default {
  title: 'Navigation/Menu Tab Bar',
};

export const Default = {
  render: () => {
    const [selected, setSelected] = useState('business');
    return (
      <MenuTabBar.Root>
        <MenuTabBar.Item
          selected={selected === 'business'}
          onClick={() => setSelected('business')}
        >
          <MenuTabBar.Icon as={RiBriefcaseLine} />
          <span>Business overview</span>
        </MenuTabBar.Item>
        <MenuTabBar.Item
          selected={selected === 'financial'}
          onClick={() => setSelected('financial')}
        >
          <MenuTabBar.Icon as={RiBarChartBoxLine} />
          <span>Financial overview</span>
        </MenuTabBar.Item>
        <MenuTabBar.Item
          selected={selected === 'sale'}
          onClick={() => setSelected('sale')}
        >
          <MenuTabBar.Icon as={RiMoneyDollarCircleLine} />
          <span>Sale details</span>
        </MenuTabBar.Item>
      </MenuTabBar.Root>
    );
  },
};

export const Primary = {
  render: () => {
    const [selected, setSelected] = useState('business');
    return (
      <MenuTabBar.Root variant='primary'>
        <MenuTabBar.Item
          selected={selected === 'business'}
          onClick={() => setSelected('business')}
        >
          <MenuTabBar.Icon as={RiBriefcaseLine} />
          <span>Business overview</span>
        </MenuTabBar.Item>
        <MenuTabBar.Item
          selected={selected === 'financial'}
          onClick={() => setSelected('financial')}
        >
          <MenuTabBar.Icon as={RiBarChartBoxLine} />
          <span>Financial overview</span>
        </MenuTabBar.Item>
        <MenuTabBar.Item
          selected={selected === 'sale'}
          onClick={() => setSelected('sale')}
        >
          <MenuTabBar.Icon as={RiMoneyDollarCircleLine} />
          <span>Sale details</span>
        </MenuTabBar.Item>
      </MenuTabBar.Root>
    );
  },
};

export const WithoutIcons = {
  render: () => {
    const [selected, setSelected] = useState('overview');
    return (
      <MenuTabBar.Root>
        <MenuTabBar.Item
          selected={selected === 'overview'}
          onClick={() => setSelected('overview')}
        >
          <span>Overview</span>
        </MenuTabBar.Item>
        <MenuTabBar.Item
          selected={selected === 'details'}
          onClick={() => setSelected('details')}
        >
          <span>Details</span>
        </MenuTabBar.Item>
        <MenuTabBar.Item
          selected={selected === 'settings'}
          onClick={() => setSelected('settings')}
        >
          <span>Settings</span>
        </MenuTabBar.Item>
      </MenuTabBar.Root>
    );
  },
};

export const Composed = {
  render: () => {
    const [value, setValue] = useState('home');
    return (
      <MenuTabBar.Composed
        value={value}
        onValueChange={setValue}
        items={[
          { label: 'Home', value: 'home', icon: RiHome5Line },
          { label: 'Profile', value: 'profile', icon: RiUserLine },
          { label: 'Settings', value: 'settings', icon: RiSettings3Line },
        ]}
      />
    );
  },
};

export const ScrollToSection = {
  render: () => {
    const [selected, setSelected] = useState('business');

    const sectionStyle =
      'h-[400px] rounded-lg border border-stroke-soft-200 p-6 text-label-sm text-text-sub-600';

    return (
      <div>
        <MenuTabBar.Root className='bg-bg-white-0 sticky top-0 z-10'>
          <MenuTabBar.Item
            selected={selected === 'business'}
            scrollTo='business'
            onClick={() => setSelected('business')}
          >
            <MenuTabBar.Icon as={RiBriefcaseLine} />
            <span>Business overview</span>
          </MenuTabBar.Item>
          <MenuTabBar.Item
            selected={selected === 'financial'}
            scrollTo='financial'
            onClick={() => setSelected('financial')}
          >
            <MenuTabBar.Icon as={RiBarChartBoxLine} />
            <span>Financial overview</span>
          </MenuTabBar.Item>
          <MenuTabBar.Item
            selected={selected === 'sale'}
            scrollTo='sale'
            onClick={() => setSelected('sale')}
          >
            <MenuTabBar.Icon as={RiMoneyDollarCircleLine} />
            <span>Sale details</span>
          </MenuTabBar.Item>
        </MenuTabBar.Root>

        <div className='flex flex-col gap-8 p-6'>
          <div id='business' className={sectionStyle}>
            Business overview section
          </div>
          <div id='financial' className={sectionStyle}>
            Financial overview section
          </div>
          <div id='sale' className={sectionStyle}>
            Sale details section
          </div>
        </div>
      </div>
    );
  },
};

export const Disabled = {
  render: () => {
    const [selected, setSelected] = useState('active');
    return (
      <MenuTabBar.Root>
        <MenuTabBar.Item
          selected={selected === 'active'}
          onClick={() => setSelected('active')}
        >
          <span>Active</span>
        </MenuTabBar.Item>
        <MenuTabBar.Item disabled>
          <span>Disabled</span>
        </MenuTabBar.Item>
        <MenuTabBar.Item
          selected={selected === 'another'}
          onClick={() => setSelected('another')}
        >
          <span>Another tab</span>
        </MenuTabBar.Item>
      </MenuTabBar.Root>
    );
  },
};
