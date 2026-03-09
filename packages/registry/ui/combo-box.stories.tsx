'use client';

import * as React from 'react';
import { RiMapPinLine } from '@remixicon/react';

import * as ComboBox from './combo-box';
import * as Label from './label';

export default { title: 'Form/Composed Inputs/Combo Box' };

const SECTOR_OPTIONS = [
  { value: 'grants', label: 'Grants' },
  { value: 'incubators', label: 'Incubators & Accelerators' },
  { value: 'vc-funding', label: 'VC Funding' },
  { value: 'competition', label: 'Competition' },
  { value: 'loans', label: 'Loans' },
  { value: 'hiring', label: 'Hiring' },
  { value: 'training', label: 'Training' },
];

const TAG_OPTIONS = [
  { value: 'ai', label: 'AI' },
  { value: 'product', label: 'Product' },
  { value: 'saas', label: 'SaaS' },
  { value: 'fintech', label: 'Fintech' },
  { value: 'healthtech', label: 'Healthtech' },
];

export const Default = {
  render: () => {
    const [value, setValue] = React.useState<string[]>([]);

    return (
      <div className='w-[300px]'>
        <div className='flex flex-col gap-1'>
          <Label.Root>
            Searchable Combo Box
            <Label.Asterisk />
            <Label.Sub>(Optional)</Label.Sub>
          </Label.Root>
          <ComboBox.Root
            options={SECTOR_OPTIONS}
            value={value}
            onValueChange={setValue}
          />
        </div>
      </div>
    );
  },
};

export const WithPreselectedValues = {
  render: () => {
    const [value, setValue] = React.useState<string[]>([
      'ai',
      'product',
      'saas',
    ]);

    return (
      <div className='w-[300px]'>
        <div className='flex flex-col gap-1'>
          <Label.Root>Tags</Label.Root>
          <ComboBox.Root
            options={TAG_OPTIONS}
            value={value}
            onValueChange={setValue}
          />
        </div>
      </div>
    );
  },
};

export const Uncontrolled = {
  render: () => (
    <div className='w-[300px]'>
      <div className='flex flex-col gap-1'>
        <Label.Root>Sectors</Label.Root>
        <ComboBox.Root
          options={SECTOR_OPTIONS}
          defaultValue={['grants', 'loans']}
          name='sectors'
        />
      </div>
    </div>
  ),
};

export const FormSubmission = {
  render: () => {
    const [value, setValue] = React.useState<string[]>(['ai', 'saas']);

    return (
      <form
        className='w-[300px]'
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          alert(
            `Form submitted with tags: ${formData.getAll('tags').join(', ')}`,
          );
        }}
      >
        <div className='flex flex-col gap-1'>
          <Label.Root>
            Tags
            <Label.Asterisk />
          </Label.Root>
          <ComboBox.Root
            options={TAG_OPTIONS}
            value={value}
            onValueChange={setValue}
            name='tags'
          />
        </div>
        <button
          type='submit'
          className='mt-4 rounded-lg bg-primary-base px-4 py-2 text-label-sm text-white'
        >
          Submit
        </button>
      </form>
    );
  },
};

export const Sizes = {
  render: () => {
    const [medium, setMedium] = React.useState<string[]>(['ai']);
    const [small, setSmall] = React.useState<string[]>(['ai', 'product']);
    const [xsmall, setXsmall] = React.useState<string[]>(['ai']);

    return (
      <div className='flex flex-col gap-6'>
        <div className='w-[300px]'>
          <div className='flex flex-col gap-1'>
            <Label.Root>Medium (default)</Label.Root>
            <ComboBox.Root
              options={TAG_OPTIONS}
              value={medium}
              onValueChange={setMedium}
            />
          </div>
        </div>
        <div className='w-[300px]'>
          <div className='flex flex-col gap-1'>
            <Label.Root>Small</Label.Root>
            <ComboBox.Root
              options={TAG_OPTIONS}
              value={small}
              onValueChange={setSmall}
              size='small'
            />
          </div>
        </div>
        <div className='w-[300px]'>
          <div className='flex flex-col gap-1'>
            <Label.Root>XSmall</Label.Root>
            <ComboBox.Root
              options={TAG_OPTIONS}
              value={xsmall}
              onValueChange={setXsmall}
              size='xsmall'
            />
          </div>
        </div>
      </div>
    );
  },
};

export const SelectionConstraints = {
  render: () => {
    const [maxVal, setMaxVal] = React.useState<string[]>(['ai']);
    const [minVal, setMinVal] = React.useState<string[]>([
      'grants',
      'vc-funding',
    ]);
    const [rangeVal, setRangeVal] = React.useState<string[]>([
      'grants',
      'vc-funding',
    ]);

    return (
      <div className='flex flex-col gap-6'>
        <div className='w-[300px]'>
          <div className='flex flex-col gap-1'>
            <Label.Root>
              Max 3
              <Label.Sub>(select up to 3)</Label.Sub>
            </Label.Root>
            <ComboBox.Root
              options={TAG_OPTIONS}
              value={maxVal}
              onValueChange={setMaxVal}
              max={3}
            />
          </div>
        </div>
        <div className='w-[300px]'>
          <div className='flex flex-col gap-1'>
            <Label.Root>
              Min 1
              <Label.Asterisk />
            </Label.Root>
            <ComboBox.Root
              options={SECTOR_OPTIONS}
              value={minVal}
              onValueChange={setMinVal}
              min={1}
            />
          </div>
        </div>
        <div className='w-[300px]'>
          <div className='flex flex-col gap-1'>
            <Label.Root>
              Min 1, Max 3
              <Label.Sub>(1–3 required)</Label.Sub>
            </Label.Root>
            <ComboBox.Root
              options={SECTOR_OPTIONS}
              value={rangeVal}
              onValueChange={setRangeVal}
              min={1}
              max={3}
            />
          </div>
        </div>
      </div>
    );
  },
};

export const TagVariants = {
  render: () => {
    const [gray, setGray] = React.useState<string[]>(['ai', 'saas']);
    const [stroke, setStroke] = React.useState<string[]>(['ai', 'saas']);
    const [all, setAll] = React.useState<string[]>(
      TAG_OPTIONS.map((o) => o.value),
    );

    return (
      <div className='flex flex-col gap-6'>
        <div className='w-[300px]'>
          <div className='flex flex-col gap-1'>
            <Label.Root>Gray (default)</Label.Root>
            <ComboBox.Root
              options={TAG_OPTIONS}
              value={gray}
              onValueChange={setGray}
              tagVariant='gray'
            />
          </div>
        </div>
        <div className='w-[300px]'>
          <div className='flex flex-col gap-1'>
            <Label.Root>Stroke</Label.Root>
            <ComboBox.Root
              options={TAG_OPTIONS}
              value={stroke}
              onValueChange={setStroke}
              tagVariant='stroke'
            />
          </div>
        </div>
        <div className='w-[300px]'>
          <div className='flex flex-col gap-1'>
            <Label.Root>Select All Label</Label.Root>
            <ComboBox.Root
              options={TAG_OPTIONS}
              value={all}
              onValueChange={setAll}
              selectAllLabel='All tags'
            />
          </div>
        </div>
      </div>
    );
  },
};

export const States = {
  render: () => {
    const [errorVal, setErrorVal] = React.useState<string[]>([]);

    return (
      <div className='flex flex-col gap-6'>
        <div className='w-[300px]'>
          <div className='flex flex-col gap-1'>
            <Label.Root>
              Error
              <Label.Asterisk />
            </Label.Root>
            <ComboBox.Root
              options={SECTOR_OPTIONS}
              value={errorVal}
              onValueChange={setErrorVal}
              hasError
            />
          </div>
        </div>
        <div className='w-[300px]'>
          <div className='flex flex-col gap-1'>
            <Label.Root disabled>Disabled</Label.Root>
            <ComboBox.Root
              options={SECTOR_OPTIONS}
              value={['grants', 'vc-funding']}
              onValueChange={() => {}}
              disabled
            />
          </div>
        </div>
      </div>
    );
  },
};

export const Customization = {
  render: () => {
    const [cities, setCities] = React.useState<string[]>([]);
    const [skills, setSkills] = React.useState<string[]>([]);
    const [tags, setTags] = React.useState<string[]>([]);

    return (
      <div className='flex flex-col gap-6'>
        <div className='w-[300px]'>
          <div className='flex flex-col gap-1'>
            <Label.Root>Custom Icon</Label.Root>
            <ComboBox.Root
              options={[
                { value: 'toronto', label: 'Toronto' },
                { value: 'vancouver', label: 'Vancouver' },
                { value: 'montreal', label: 'Montreal' },
                { value: 'calgary', label: 'Calgary' },
                { value: 'ottawa', label: 'Ottawa' },
              ]}
              value={cities}
              onValueChange={setCities}
              icon={RiMapPinLine}
              placeholder='Search cities...'
            />
          </div>
        </div>
        <div className='w-[300px]'>
          <div className='flex flex-col gap-1'>
            <Label.Root>Custom Placeholder</Label.Root>
            <ComboBox.Root
              options={[
                { value: 'react', label: 'React' },
                { value: 'typescript', label: 'TypeScript' },
                { value: 'node', label: 'Node.js' },
                { value: 'python', label: 'Python' },
                { value: 'go', label: 'Go' },
              ]}
              value={skills}
              onValueChange={setSkills}
              placeholder='Type to filter skills...'
            />
          </div>
        </div>
        <div className='w-[300px]'>
          <div className='flex flex-col gap-1'>
            <Label.Root>Custom Empty Message</Label.Root>
            <ComboBox.Root
              options={TAG_OPTIONS}
              value={tags}
              onValueChange={setTags}
              emptyMessage='No matching tags. Try a different search.'
            />
          </div>
        </div>
      </div>
    );
  },
};
