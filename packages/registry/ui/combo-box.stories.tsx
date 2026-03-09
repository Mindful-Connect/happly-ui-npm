'use client';

import * as React from 'react';
import { RiSearchLine, RiGlobalLine } from '@remixicon/react';

import * as ComboBox from './combo-box';

export default { title: 'Form/Composed Inputs/Combo Box' };

const SECTOR_OPTIONS = [
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Finance' },
  { value: 'education', label: 'Education' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'retail', label: 'Retail' },
  { value: 'energy', label: 'Energy' },
];

const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'French' },
  { value: 'es', label: 'Spanish' },
  { value: 'de', label: 'German' },
  { value: 'pt', label: 'Portuguese' },
];

export const Default = {
  render: () => {
    const [value, setValue] = React.useState<string[]>(['technology']);

    return (
      <div className='w-[360px]'>
        <ComboBox.Root
          options={SECTOR_OPTIONS}
          value={value}
          onValueChange={setValue}
          placeholder='Select sectors...'
          searchPlaceholder='Search sectors...'
        />
      </div>
    );
  },
};

export const WithIcon = {
  render: () => {
    const [value, setValue] = React.useState<string[]>([]);

    return (
      <div className='w-[360px]'>
        <ComboBox.Root
          options={LANGUAGE_OPTIONS}
          value={value}
          onValueChange={setValue}
          placeholder='Select languages...'
          searchPlaceholder='Search languages...'
          icon={RiGlobalLine}
        />
      </div>
    );
  },
};

export const MaxSelection = {
  render: () => {
    const [value, setValue] = React.useState<string[]>(['technology']);

    return (
      <div className='w-[360px]'>
        <ComboBox.Root
          options={SECTOR_OPTIONS}
          value={value}
          onValueChange={setValue}
          placeholder='Select up to 3...'
          searchPlaceholder='Search sectors...'
          max={3}
        />
      </div>
    );
  },
};

export const MinSelection = {
  render: () => {
    const [value, setValue] = React.useState<string[]>([
      'technology',
      'healthcare',
    ]);

    return (
      <div className='w-[360px]'>
        <ComboBox.Root
          options={SECTOR_OPTIONS}
          value={value}
          onValueChange={setValue}
          placeholder='Select sectors (min 1)...'
          searchPlaceholder='Search sectors...'
          min={1}
        />
      </div>
    );
  },
};

export const SelectAll = {
  render: () => {
    const [value, setValue] = React.useState<string[]>(
      LANGUAGE_OPTIONS.map((o) => o.value),
    );

    return (
      <div className='w-[360px]'>
        <ComboBox.Root
          options={LANGUAGE_OPTIONS}
          value={value}
          onValueChange={setValue}
          placeholder='Select languages...'
          searchPlaceholder='Search languages...'
          selectAllLabel='All languages'
          icon={RiGlobalLine}
        />
      </div>
    );
  },
};

export const ErrorState = {
  render: () => {
    const [value, setValue] = React.useState<string[]>([]);

    return (
      <div className='w-[360px]'>
        <ComboBox.Root
          options={SECTOR_OPTIONS}
          value={value}
          onValueChange={setValue}
          placeholder='Select sectors...'
          searchPlaceholder='Search sectors...'
          hasError
        />
      </div>
    );
  },
};

export const Disabled = {
  render: () => (
    <div className='w-[360px]'>
      <ComboBox.Root
        options={SECTOR_OPTIONS}
        value={['technology', 'healthcare']}
        onValueChange={() => {}}
        placeholder='Select sectors...'
        disabled
      />
    </div>
  ),
};

export const SmallSize = {
  render: () => {
    const [value, setValue] = React.useState<string[]>(['en', 'fr']);

    return (
      <div className='w-[360px]'>
        <ComboBox.Root
          options={LANGUAGE_OPTIONS}
          value={value}
          onValueChange={setValue}
          placeholder='Select languages...'
          searchPlaceholder='Search...'
          size='small'
          icon={RiGlobalLine}
        />
      </div>
    );
  },
};
