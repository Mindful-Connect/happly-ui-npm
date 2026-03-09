'use client';

import * as React from 'react';
import {
  RiBuildingLine,
  RiFileList2Line,
  RiFlashlightLine,
  RiGlobalLine,
  RiHandCoinLine,
  RiHome4Line,
  RiInformationFill,
  RiSmartphoneLine,
  RiUser6Line,
} from '@remixicon/react';

import * as Avatar from './avatar';
import * as Hint from './hint';
import * as Input from './input';
import * as Label from './label';
import * as Select from './select';

export default { title: 'Form/Select', component: Select.Root };

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'carrot', label: 'Carrot' },
  { value: 'banana', label: 'Banana' },
  { value: 'broccoli', label: 'Broccoli' },
];

const payments = [
  { icon: RiFlashlightLine, value: 'utility-payment', label: 'Utility Payment' },
  { icon: RiHome4Line, value: 'rent-payment', label: 'Rent Payment' },
  { icon: RiHandCoinLine, value: 'donation', label: 'Donation' },
  { icon: RiFileList2Line, value: 'tax-payment', label: 'Tax Payment', disabled: true },
  { icon: RiBuildingLine, value: 'tuition-fee', label: 'Tuition Fee' },
  { icon: RiSmartphoneLine, value: 'phone-bill', label: 'Phone Bill' },
];

const countries = [
  { icon: 'https://mindful-connect.github.io/circle-flags/flags/us.svg', value: 'us', label: 'United States' },
  { icon: 'https://mindful-connect.github.io/circle-flags/flags/de.svg', value: 'germany', label: 'Germany' },
  { icon: 'https://mindful-connect.github.io/circle-flags/flags/fr.svg', value: 'france', label: 'France', disabled: true },
  { icon: 'https://mindful-connect.github.io/circle-flags/flags/tr.svg', value: 'turkey', label: 'Turkey' },
  { icon: 'https://mindful-connect.github.io/circle-flags/flags/dk.svg', value: 'denmark', label: 'Denmark' },
  { icon: 'https://mindful-connect.github.io/circle-flags/flags/fi.svg', value: 'finland', label: 'Finland' },
];

const countriesShort = [
  { icon: 'https://mindful-connect.github.io/circle-flags/flags/us.svg', value: 'us', label: 'US' },
  { icon: 'https://mindful-connect.github.io/circle-flags/flags/de.svg', value: 'de', label: 'DE' },
  { icon: 'https://mindful-connect.github.io/circle-flags/flags/fr.svg', value: 'fr', label: 'FR', disabled: true },
  { icon: 'https://mindful-connect.github.io/circle-flags/flags/tr.svg', value: 'tr', label: 'TR' },
  { icon: 'https://mindful-connect.github.io/circle-flags/flags/dk.svg', value: 'dk', label: 'DK' },
  { icon: 'https://mindful-connect.github.io/circle-flags/flags/fi.svg', value: 'fi', label: 'FI' },
];

const pages = [
  { value: '5', label: '5' },
  { value: '10', label: '10' },
  { value: '25', label: '25' },
  { value: '100', label: '100' },
];

const currencies = [
  { icon: 'https://mindful-connect.github.io/circle-flags/flags/eu.svg', value: 'EUR', label: 'EUR' },
  { icon: 'https://mindful-connect.github.io/circle-flags/flags/us.svg', value: 'USD', label: 'USD' },
  { icon: 'https://mindful-connect.github.io/circle-flags/flags/tr.svg', value: 'TRY', label: 'TRY' },
];

const users = [
  { image: 'https://i.pravatar.cc/160?img=1', color: 'yellow' as const, value: 'sophia-williams', name: 'Sophia Williams', handle: '@sophia' },
  { image: 'https://i.pravatar.cc/160?img=3', color: 'blue' as const, value: 'arthur-taylor', name: 'Arthur Taylor', handle: '@arthur' },
  { image: 'https://i.pravatar.cc/160?img=5', color: 'gray' as const, value: 'james-brown', name: 'James Brown', handle: '@james' },
  { image: 'https://i.pravatar.cc/160?img=7', color: 'sky' as const, value: 'emma-wright', name: 'Emma Wright', handle: '@emma' },
  { image: 'https://i.pravatar.cc/160?img=9', color: 'purple' as const, value: 'matthew-johnson', name: 'Matthew Johnson', handle: '@matthew' },
  { image: 'https://i.pravatar.cc/160?img=12', color: 'red' as const, value: 'laura-perez', name: 'Laura Perez', handle: '@laura' },
];

export const Demo = {
  render: () => (
    <div className='w-full min-w-[300px] max-w-[300px]'>
      <Select.Root>
        <Select.Trigger>
          <Select.Value placeholder='Select your favorite fruit...' />
        </Select.Trigger>
        <Select.Content>
          {fruits.map((item) => (
            <Select.Item key={item.value} value={item.value}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </div>
  ),
};

export const WithLabelHint = {
  render: () => (
    <div className='w-full min-w-[300px] max-w-[300px]'>
      <div className='flex flex-col gap-1'>
        <Label.Root htmlFor='fruit'>Fruit</Label.Root>
        <Select.Root>
          <Select.Trigger id='fruit'>
            <Select.Value placeholder='Select your favorite fruit...' />
          </Select.Trigger>
          <Select.Content>
            {fruits.map((item) => (
              <Select.Item key={item.value} value={item.value}>
                {item.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
        <Hint.Root>
          <Hint.Icon as={RiInformationFill} />
          This is a hint text to help user.
        </Hint.Root>
      </div>
    </div>
  ),
};

export const WithIcons = {
  render: () => (
    <div className='w-full min-w-[300px] max-w-[300px]'>
      <Select.Root defaultValue='utility-payment'>
        <Select.Trigger>
          <Select.Value placeholder='Select a payment...' />
        </Select.Trigger>
        <Select.Content>
          {payments.map((item) => (
            <Select.Item
              key={item.value}
              value={item.value}
              disabled={item.disabled}
            >
              <Select.ItemIcon as={item.icon} />
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div className='w-full min-w-[300px] max-w-[300px] space-y-6'>
      <Select.Root defaultValue='utility-payment'>
        <Select.Trigger>
          <Select.Value placeholder='Select a payment...' />
        </Select.Trigger>
        <Select.Content>
          {payments.map((item) => (
            <Select.Item
              key={item.value}
              value={item.value}
              disabled={item.disabled}
            >
              <Select.ItemIcon as={item.icon} />
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>

      <Select.Root defaultValue='utility-payment' size='small'>
        <Select.Trigger>
          <Select.Value placeholder='Select a payment...' />
        </Select.Trigger>
        <Select.Content>
          {payments.map((item) => (
            <Select.Item
              key={item.value}
              value={item.value}
              disabled={item.disabled}
            >
              <Select.ItemIcon as={item.icon} />
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>

      <Select.Root defaultValue='utility-payment' size='xsmall'>
        <Select.Trigger>
          <Select.Value placeholder='Select a payment...' />
        </Select.Trigger>
        <Select.Content>
          {payments.map((item) => (
            <Select.Item
              key={item.value}
              value={item.value}
              disabled={item.disabled}
            >
              <Select.ItemIcon as={item.icon} />
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </div>
  ),
};

export const WithCountryFlags = {
  render: () => (
    <div className='w-full min-w-[300px] max-w-[300px]'>
      <Select.Root>
        <Select.Trigger>
          <Select.Value
            placeholder={
              <div className='flex items-center gap-2'>
                <Select.TriggerIcon as={RiGlobalLine} /> Select a country...
              </div>
            }
          />
        </Select.Trigger>
        <Select.Content>
          {countries.map((item) => (
            <Select.Item
              key={item.value}
              value={item.value}
              disabled={item.disabled}
            >
              <Select.ItemIcon
                style={{ backgroundImage: `url(${item.icon})` }}
              />
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </div>
  ),
};

export const WithUsers = {
  render: () => (
    <div className='w-full min-w-[300px] max-w-[300px]'>
      <Select.Root>
        <Select.Trigger>
          <Select.Value placeholder='Select a user...' />
        </Select.Trigger>
        <Select.Content>
          {users.map((item) => (
            <Select.Item key={item.value} value={item.value}>
              <Select.ItemIcon as={Avatar.Root} size='20' color={item.color}>
                <Avatar.Image src={item.image} />
              </Select.ItemIcon>
              <div className='flex items-center gap-1'>
                {item.name}
                <span className='text-paragraph-xs text-text-soft-400 group-has-[&]/trigger:hidden'>
                  {item.handle}
                </span>
              </div>
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </div>
  ),
};

export const Disabled = {
  render: () => (
    <div className='w-full min-w-[300px] max-w-[300px] space-y-6'>
      <Select.Root disabled>
        <Select.Trigger>
          <Select.Value
            placeholder={
              <div className='flex items-center gap-2'>
                <Select.TriggerIcon as={RiGlobalLine} /> Select a country...
              </div>
            }
          />
        </Select.Trigger>
        <Select.Content>
          {countries.map((item) => (
            <Select.Item
              key={item.value}
              value={item.value}
              disabled={item.disabled}
            >
              <Select.ItemIcon
                style={{ backgroundImage: `url(${item.icon})` }}
              />
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>

      <Select.Root disabled defaultValue='laura-perez'>
        <Select.Trigger>
          <Select.Value placeholder='Select a user...' />
        </Select.Trigger>
        <Select.Content>
          {users.map((item) => (
            <Select.Item key={item.value} value={item.value}>
              <Select.ItemIcon as={Avatar.Root} size='20' color={item.color}>
                <Avatar.Image src={item.image} />
              </Select.ItemIcon>
              <div className='flex items-center gap-1'>
                {item.name}
                <span className='text-paragraph-xs text-text-soft-400 group-has-[&]/trigger:hidden'>
                  {item.handle}
                </span>
              </div>
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </div>
  ),
};

export const Compact = {
  render: () => (
    <Select.Root variant='compact' defaultValue='25'>
      <Select.Trigger>
        <Select.Value />
      </Select.Trigger>
      <Select.Content align='center'>
        {pages.map((item) => (
          <Select.Item key={item.value} value={item.value}>
            {item.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  ),
};

export const CompactCountry = {
  render: () => (
    <Select.Root variant='compact'>
      <Select.Trigger className='pl-2.5'>
        <Select.Value placeholder={<Select.TriggerIcon as={RiGlobalLine} />} />
      </Select.Trigger>
      <Select.Content align='center'>
        {countries.map((item) => (
          <Select.Item
            key={item.value}
            value={item.value}
            disabled={item.disabled}
          >
            <Select.ItemIcon
              style={{ backgroundImage: `url(${item.icon})` }}
            />
            <span className='group-has-[&]/trigger:hidden'>{item.label}</span>
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  ),
};

export const CompactSizes = {
  render: () => (
    <div className='flex gap-6'>
      <div className='flex flex-col items-center gap-6'>
        <Select.Root variant='compact'>
          <Select.Trigger>
            <Select.Value
              placeholder={<Select.TriggerIcon as={RiGlobalLine} />}
            />
          </Select.Trigger>
          <Select.Content align='center'>
            {countries.map((item) => (
              <Select.Item
                key={item.value}
                value={item.value}
                disabled={item.disabled}
              >
                <Select.ItemIcon
                  style={{ backgroundImage: `url(${item.icon})` }}
                />
                <span className='group-has-[&]/trigger:hidden'>
                  {item.label}
                </span>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>

        <Select.Root variant='compact' size='small'>
          <Select.Trigger>
            <Select.Value
              placeholder={<Select.TriggerIcon as={RiGlobalLine} />}
            />
          </Select.Trigger>
          <Select.Content align='center'>
            {countries.map((item) => (
              <Select.Item
                key={item.value}
                value={item.value}
                disabled={item.disabled}
              >
                <Select.ItemIcon
                  style={{ backgroundImage: `url(${item.icon})` }}
                />
                <span className='group-has-[&]/trigger:hidden'>
                  {item.label}
                </span>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>

        <Select.Root variant='compact' size='xsmall'>
          <Select.Trigger>
            <Select.Value
              placeholder={<Select.TriggerIcon as={RiGlobalLine} />}
            />
          </Select.Trigger>
          <Select.Content align='center'>
            {countries.map((item) => (
              <Select.Item
                key={item.value}
                value={item.value}
                disabled={item.disabled}
              >
                <Select.ItemIcon
                  style={{ backgroundImage: `url(${item.icon})` }}
                />
                <span className='group-has-[&]/trigger:hidden'>
                  {item.label}
                </span>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </div>

      <div className='flex flex-col items-center gap-6'>
        <Select.Root variant='compact' defaultValue='25'>
          <Select.Trigger>
            <Select.Value />
          </Select.Trigger>
          <Select.Content align='center'>
            {pages.map((item) => (
              <Select.Item key={item.value} value={item.value}>
                {item.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>

        <Select.Root variant='compact' size='small' defaultValue='25'>
          <Select.Trigger>
            <Select.Value />
          </Select.Trigger>
          <Select.Content align='center'>
            {pages.map((item) => (
              <Select.Item key={item.value} value={item.value}>
                {item.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>

        <Select.Root variant='compact' size='xsmall' defaultValue='25'>
          <Select.Trigger>
            <Select.Value />
          </Select.Trigger>
          <Select.Content align='center'>
            {pages.map((item) => (
              <Select.Item key={item.value} value={item.value}>
                {item.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </div>
    </div>
  ),
};

export const InlineCountry = {
  render: () => (
    <Select.Root variant='inline'>
      <Select.Trigger>
        <Select.Value
          placeholder={
            <div className='flex items-center'>
              <Select.TriggerIcon as={RiGlobalLine} /> Select
            </div>
          }
        />
      </Select.Trigger>
      <Select.Content>
        {countriesShort.map((item) => (
          <Select.Item
            key={item.value}
            value={item.value}
            disabled={item.disabled}
          >
            <Select.ItemIcon
              style={{ backgroundImage: `url(${item.icon})` }}
            />
            {item.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  ),
};

export const InputWithInlineSelect = {
  render: () => {
    const data = [
      { value: 'view', label: 'can view' },
      { value: 'edit', label: 'can edit' },
    ];

    return (
      <div className='w-full min-w-[300px] max-w-[300px]'>
        <Input.Root>
          <Input.Wrapper>
            <Input.Icon as={RiUser6Line} />
            <Input.Input placeholder='Placeholder text...' />
            <Select.Root variant='inline' defaultValue='view'>
              <Select.Trigger>
                <Select.TriggerIcon as={RiGlobalLine} />
                <Select.Value />
              </Select.Trigger>
              <Select.Content>
                {data.map((item) => (
                  <Select.Item key={item.value} value={item.value}>
                    {item.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Input.Wrapper>
        </Input.Root>
      </div>
    );
  },
};

export const WithInput = {
  render: () => (
    <div className='w-full min-w-[300px] max-w-[300px]'>
      <Input.Root>
        <Input.Wrapper>
          <Input.InlineAffix>&euro;</Input.InlineAffix>
          <Input.Input placeholder='0.00' />
        </Input.Wrapper>
        <Select.Root variant='compactForInput' defaultValue='EUR'>
          <Select.Trigger>
            <Select.Value />
          </Select.Trigger>
          <Select.Content>
            {currencies.map((item) => (
              <Select.Item key={item.value} value={item.value}>
                <Select.ItemIcon
                  style={{ backgroundImage: `url(${item.icon})` }}
                />
                {item.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Input.Root>
    </div>
  ),
};

export const WithInputSizes = {
  render: () => {
    function CurrencySelect({
      size,
    }: {
      size?: 'medium' | 'small' | 'xsmall';
    }) {
      return (
        <Select.Root variant='compactForInput' defaultValue='EUR' size={size}>
          <Select.Trigger>
            <Select.Value />
          </Select.Trigger>
          <Select.Content>
            {currencies.map((item) => (
              <Select.Item key={item.value} value={item.value}>
                <Select.ItemIcon
                  style={{ backgroundImage: `url(${item.icon})` }}
                />
                {item.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      );
    }

    return (
      <div className='flex w-full min-w-[300px] max-w-[300px] flex-col gap-6'>
        <Input.Root size='medium'>
          <Input.Wrapper>
            <Input.InlineAffix>&euro;</Input.InlineAffix>
            <Input.Input placeholder='0.00' />
          </Input.Wrapper>
          <CurrencySelect size='medium' />
        </Input.Root>

        <Input.Root size='small'>
          <Input.Wrapper>
            <Input.InlineAffix>&euro;</Input.InlineAffix>
            <Input.Input placeholder='0.00' />
          </Input.Wrapper>
          <CurrencySelect size='small' />
        </Input.Root>

        <Input.Root size='xsmall'>
          <Input.Wrapper>
            <Input.InlineAffix>&euro;</Input.InlineAffix>
            <Input.Input placeholder='0.00' />
          </Input.Wrapper>
          <CurrencySelect size='xsmall' />
        </Input.Root>
      </div>
    );
  },
};
