'use client';

import * as React from 'react';
import { RiMapPinLine } from '@remixicon/react';

import { Button } from './button';
import * as ComboBox from './combo-box';
import * as FormField from './form-field';
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
        <FormField.Root>
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
        </FormField.Root>
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
        <FormField.Root>
          <Label.Root>Tags</Label.Root>
          <ComboBox.Root
            options={TAG_OPTIONS}
            value={value}
            onValueChange={setValue}
          />
        </FormField.Root>
      </div>
    );
  },
};

export const Uncontrolled = {
  render: () => (
    <div className='w-[300px]'>
      <FormField.Root>
        <Label.Root>Sectors</Label.Root>
        <ComboBox.Root
          options={SECTOR_OPTIONS}
          defaultValue={['grants', 'loans']}
          name='sectors'
        />
      </FormField.Root>
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
        <FormField.Root>
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
        </FormField.Root>
        <Button type='submit' className='mt-4 w-full'>
          Submit
        </Button>
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
          <FormField.Root>
            <Label.Root>Medium (default)</Label.Root>
            <ComboBox.Root
              options={TAG_OPTIONS}
              value={medium}
              onValueChange={setMedium}
            />
          </FormField.Root>
        </div>
        <div className='w-[300px]'>
          <FormField.Root>
            <Label.Root>Small</Label.Root>
            <ComboBox.Root
              options={TAG_OPTIONS}
              value={small}
              onValueChange={setSmall}
              size='small'
            />
          </FormField.Root>
        </div>
        <div className='w-[300px]'>
          <FormField.Root>
            <Label.Root>XSmall</Label.Root>
            <ComboBox.Root
              options={TAG_OPTIONS}
              value={xsmall}
              onValueChange={setXsmall}
              size='xsmall'
            />
          </FormField.Root>
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
          <FormField.Root>
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
          </FormField.Root>
        </div>
        <div className='w-[300px]'>
          <FormField.Root>
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
          </FormField.Root>
        </div>
        <div className='w-[300px]'>
          <FormField.Root>
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
          </FormField.Root>
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
          <FormField.Root>
            <Label.Root>Gray (default)</Label.Root>
            <ComboBox.Root
              options={TAG_OPTIONS}
              value={gray}
              onValueChange={setGray}
              tagVariant='gray'
            />
          </FormField.Root>
        </div>
        <div className='w-[300px]'>
          <FormField.Root>
            <Label.Root>Stroke</Label.Root>
            <ComboBox.Root
              options={TAG_OPTIONS}
              value={stroke}
              onValueChange={setStroke}
              tagVariant='stroke'
            />
          </FormField.Root>
        </div>
        <div className='w-[300px]'>
          <FormField.Root>
            <Label.Root>Select All Label</Label.Root>
            <ComboBox.Root
              options={TAG_OPTIONS}
              value={all}
              onValueChange={setAll}
              selectAllLabel='All tags'
            />
          </FormField.Root>
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
          <FormField.Root>
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
          </FormField.Root>
        </div>
        <div className='w-[300px]'>
          <FormField.Root>
            <Label.Root disabled>Disabled</Label.Root>
            <ComboBox.Root
              options={SECTOR_OPTIONS}
              value={['grants', 'vc-funding']}
              onValueChange={() => {}}
              disabled
            />
          </FormField.Root>
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
          <FormField.Root>
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
          </FormField.Root>
        </div>
        <div className='w-[300px]'>
          <FormField.Root>
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
          </FormField.Root>
        </div>
        <div className='w-[300px]'>
          <FormField.Root>
            <Label.Root>Custom Empty Message</Label.Root>
            <ComboBox.Root
              options={TAG_OPTIONS}
              value={tags}
              onValueChange={setTags}
              emptyMessage='No matching tags. Try a different search.'
            />
          </FormField.Root>
        </div>
      </div>
    );
  },
};
