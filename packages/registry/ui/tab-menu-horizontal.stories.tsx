/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import {
  RiHome5Line,
  RiSettings3Line,
  RiUserLine,
  RiNotification3Line,
} from '@remixicon/react';

import * as TabMenuHorizontal from './tab-menu-horizontal';

export default {
  title: 'Layout/Tab Menu Horizontal',
  component: TabMenuHorizontal.Root,
};

export const Default = {
  render: () => {
    const [selected, setSelected] = useState('overview');
    return (
      <TabMenuHorizontal.Root>
        <TabMenuHorizontal.Item
          selected={selected === 'overview'}
          onClick={() => setSelected('overview')}
        >
          <span>Overview</span>
        </TabMenuHorizontal.Item>
        <TabMenuHorizontal.Item
          selected={selected === 'details'}
          onClick={() => setSelected('details')}
        >
          <span>Details</span>
        </TabMenuHorizontal.Item>
        <TabMenuHorizontal.Item
          selected={selected === 'settings'}
          onClick={() => setSelected('settings')}
        >
          <span>Settings</span>
        </TabMenuHorizontal.Item>
      </TabMenuHorizontal.Root>
    );
  },
};

export const Primary = {
  render: () => {
    const [selected, setSelected] = useState('overview');
    return (
      <TabMenuHorizontal.Root variant='primary'>
        <TabMenuHorizontal.Item
          selected={selected === 'overview'}
          onClick={() => setSelected('overview')}
        >
          <span>Overview</span>
        </TabMenuHorizontal.Item>
        <TabMenuHorizontal.Item
          selected={selected === 'details'}
          onClick={() => setSelected('details')}
        >
          <span>Details</span>
        </TabMenuHorizontal.Item>
        <TabMenuHorizontal.Item
          selected={selected === 'settings'}
          onClick={() => setSelected('settings')}
        >
          <span>Settings</span>
        </TabMenuHorizontal.Item>
      </TabMenuHorizontal.Root>
    );
  },
};

export const WithIcons = {
  render: () => {
    const [selected, setSelected] = useState('home');
    return (
      <TabMenuHorizontal.Root>
        <TabMenuHorizontal.Item
          selected={selected === 'home'}
          onClick={() => setSelected('home')}
        >
          <TabMenuHorizontal.Icon as={RiHome5Line} />
          <span>Home</span>
        </TabMenuHorizontal.Item>
        <TabMenuHorizontal.Item
          selected={selected === 'profile'}
          onClick={() => setSelected('profile')}
        >
          <TabMenuHorizontal.Icon as={RiUserLine} />
          <span>Profile</span>
        </TabMenuHorizontal.Item>
        <TabMenuHorizontal.Item
          selected={selected === 'notifications'}
          onClick={() => setSelected('notifications')}
        >
          <TabMenuHorizontal.Icon as={RiNotification3Line} />
          <span>Notifications</span>
        </TabMenuHorizontal.Item>
        <TabMenuHorizontal.Item
          selected={selected === 'settings'}
          onClick={() => setSelected('settings')}
        >
          <TabMenuHorizontal.Icon as={RiSettings3Line} />
          <span>Settings</span>
        </TabMenuHorizontal.Item>
      </TabMenuHorizontal.Root>
    );
  },
};

export const WithCounter = {
  render: () => {
    const [selected, setSelected] = useState('opportunities');
    return (
      <TabMenuHorizontal.Root>
        <TabMenuHorizontal.Item
          selected={selected === 'opportunities'}
          onClick={() => setSelected('opportunities')}
        >
          <span>My opportunities</span>
          <TabMenuHorizontal.Counter count={3} />
        </TabMenuHorizontal.Item>
        <TabMenuHorizontal.Item
          selected={selected === 'applications'}
          onClick={() => setSelected('applications')}
        >
          <span>Applications</span>
          <TabMenuHorizontal.Counter count={12} />
        </TabMenuHorizontal.Item>
        <TabMenuHorizontal.Item
          selected={selected === 'saved'}
          onClick={() => setSelected('saved')}
        >
          <span>Saved</span>
        </TabMenuHorizontal.Item>
      </TabMenuHorizontal.Root>
    );
  },
};

export const Composed = {
  render: () => {
    const [value, setValue] = useState('overview');
    return (
      <TabMenuHorizontal.Composed
        value={value}
        onValueChange={setValue}
        items={[
          { label: 'Overview', value: 'overview', icon: RiHome5Line },
          { label: 'Profile', value: 'profile', icon: RiUserLine, count: 5 },
          { label: 'Settings', value: 'settings', icon: RiSettings3Line },
        ]}
      />
    );
  },
};

export const Overflow = {
  render: () => {
    const [selected, setSelected] = useState('dashboard');
    const tabs = [
      'Dashboard',
      'Analytics',
      'Reports',
      'Customers',
      'Products',
      'Orders',
      'Inventory',
      'Marketing',
      'Settings',
      'Integrations',
      'Billing',
      'Support',
    ];
    return (
      <div className='max-w-md'>
        <TabMenuHorizontal.Root>
          {tabs.map((tab) => {
            const value = tab.toLowerCase();
            return (
              <TabMenuHorizontal.Item
                key={value}
                selected={selected === value}
                onClick={() => setSelected(value)}
              >
                <span>{tab}</span>
              </TabMenuHorizontal.Item>
            );
          })}
        </TabMenuHorizontal.Root>
      </div>
    );
  },
};

export const Disabled = {
  render: () => {
    const [selected, setSelected] = useState('overview');
    return (
      <TabMenuHorizontal.Root>
        <TabMenuHorizontal.Item
          selected={selected === 'overview'}
          onClick={() => setSelected('overview')}
        >
          <span>Overview</span>
        </TabMenuHorizontal.Item>
        <TabMenuHorizontal.Item
          selected={selected === 'details'}
          onClick={() => setSelected('details')}
        >
          <span>Details</span>
        </TabMenuHorizontal.Item>
        <TabMenuHorizontal.Item disabled>
          <span>Disabled</span>
        </TabMenuHorizontal.Item>
      </TabMenuHorizontal.Root>
    );
  },
};
