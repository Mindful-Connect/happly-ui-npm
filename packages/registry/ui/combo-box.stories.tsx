'use client';

import * as React from 'react';
import {
  RiFlashlightLine,
  RiHandCoinLine,
  RiHome4Line,
  RiMapPinLine,
} from '@remixicon/react';

import { Button } from './button';
import * as Checkbox from './checkbox';
import * as ComboBox from './combo-box';
import * as FormField from './form-field';
import * as Label from './label';
import * as Tag from './tag';

export default { title: 'Form/Composed Inputs/Combo Box' };

const PLAYGROUND_OPTIONS = [
  { value: 'option-1', label: 'Option 1' },
  { value: 'option-2', label: 'Option 2' },
  { value: 'option-3', label: 'Option 3' },
  { value: 'option-4', label: 'Option 4' },
  { value: 'option-5', label: 'Option 5' },
];

export const Playground = {
  args: {
    size: 'medium',
    hasError: false,
    disabled: false,
    placeholder: 'Choose or search...',
    tagVariant: 'gray',
  },
  argTypes: {
    size: { control: 'select', options: ['medium', 'small', 'xsmall'] },
    hasError: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    tagVariant: { control: 'select', options: ['stroke', 'gray'] },
  },
  render: (args: any) => {
    const [value, setValue] = React.useState<string[]>([]);

    return (
      <div className='w-[300px]'>
        <ComboBox.Composed
          options={PLAYGROUND_OPTIONS}
          value={value}
          onValueChange={setValue}
          size={args.size}
          hasError={args.hasError}
          disabled={args.disabled}
          placeholder={args.placeholder}
          tagVariant={args.tagVariant}
        />
      </div>
    );
  },
};

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
          <ComboBox.Composed
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
          <ComboBox.Composed
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
        <ComboBox.Composed
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
          <ComboBox.Composed
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
            <ComboBox.Composed
              options={TAG_OPTIONS}
              value={medium}
              onValueChange={setMedium}
            />
          </FormField.Root>
        </div>
        <div className='w-[300px]'>
          <FormField.Root>
            <Label.Root>Small</Label.Root>
            <ComboBox.Composed
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
            <ComboBox.Composed
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
            <ComboBox.Composed
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
            <ComboBox.Composed
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
            <ComboBox.Composed
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
            <ComboBox.Composed
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
            <ComboBox.Composed
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
            <ComboBox.Composed
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
            <ComboBox.Composed
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
            <ComboBox.Composed
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
            <ComboBox.Composed
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
            <ComboBox.Composed
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
            <ComboBox.Composed
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

const ICON_OPTIONS = [
  { value: 'utility', label: 'Utility Payment', icon: RiFlashlightLine },
  { value: 'rent', label: 'Rent Payment', icon: RiHome4Line },
  { value: 'donation', label: 'Donation', icon: RiHandCoinLine },
];

const FLAG_OPTIONS = [
  { value: 'us', label: 'United States', icon: 'https://mindful-connect.github.io/circle-flags/flags/us.svg' },
  { value: 'de', label: 'Germany', icon: 'https://mindful-connect.github.io/circle-flags/flags/de.svg' },
  { value: 'fr', label: 'France', icon: 'https://mindful-connect.github.io/circle-flags/flags/fr.svg' },
  { value: 'tr', label: 'Turkey', icon: 'https://mindful-connect.github.io/circle-flags/flags/tr.svg' },
];

export const WithIcons = {
  render: () => {
    const [icons, setIcons] = React.useState<string[]>(['utility']);
    const [flags, setFlags] = React.useState<string[]>(['us', 'de']);

    return (
      <div className='flex flex-col gap-6'>
        <div className='w-[300px]'>
          <FormField.Root>
            <Label.Root>Payment Types</Label.Root>
            <ComboBox.Composed
              options={ICON_OPTIONS}
              value={icons}
              onValueChange={setIcons}
            />
          </FormField.Root>
        </div>
        <div className='w-[300px]'>
          <FormField.Root>
            <Label.Root>Countries</Label.Root>
            <ComboBox.Composed
              options={FLAG_OPTIONS}
              value={flags}
              onValueChange={setFlags}
              placeholder='Search countries...'
            />
          </FormField.Root>
        </div>
      </div>
    );
  },
};

const TEAM_MEMBERS = [
  {
    value: 'alice',
    label: 'Alice Johnson',
    icon: 'https://i.pravatar.cc/40?u=alice',
  },
  {
    value: 'bob',
    label: 'Bob Smith',
    icon: 'https://i.pravatar.cc/40?u=bob',
  },
  {
    value: 'carol',
    label: 'Carol Williams',
    icon: 'https://i.pravatar.cc/40?u=carol',
  },
  {
    value: 'dave',
    label: 'Dave Brown',
    icon: 'https://i.pravatar.cc/40?u=dave',
  },
  {
    value: 'eve',
    label: 'Eve Davis',
    icon: 'https://i.pravatar.cc/40?u=eve',
  },
];

export const CompoundCustomItems = {
  render: () => {
    function CompoundDemo() {
      const [value, setValue] = React.useState<string[]>(['alice']);

      return (
        <div className='w-[320px]'>
          <FormField.Root>
            <Label.Root>Team Members</Label.Root>
            <ComboBox.Root
              options={TEAM_MEMBERS}
              value={value}
              onValueChange={setValue}
            >
              <ComboBox.SearchTrigger placeholder='Search team members...' />
              <ComboBox.Content>
                <CompoundItems />
              </ComboBox.Content>
              <ComboBox.Tags variant='stroke' />
            </ComboBox.Root>
          </FormField.Root>
        </div>
      );
    }

    function CompoundItems() {
      const ctx = ComboBox.useComboBoxContext();

      if (ctx.filteredOptions.length === 0) {
        return <ComboBox.Empty>No members found.</ComboBox.Empty>;
      }

      return (
        <div className='flex flex-col gap-1'>
          {ctx.filteredOptions.map((option) => {
            const selected = ctx.isSelected(option.value);
            return (
              <ComboBox.Item
                key={option.value}
                value={option.value}
                showIndicator={false}
              >
                <Checkbox.Root
                  checked={selected}
                  tabIndex={-1}
                  className='pointer-events-none'
                />
                {option.icon && (
                  <div
                    className='size-6 shrink-0 rounded-full bg-cover bg-center bg-no-repeat'
                    style={{ backgroundImage: `url(${option.icon})` }}
                  />
                )}
                <span className='line-clamp-1'>{option.label}</span>
              </ComboBox.Item>
            );
          })}
        </div>
      );
    }

    return <CompoundDemo />;
  },
};

export const CompoundCustomTags = {
  render: () => {
    function CustomTagsDemo() {
      const [value, setValue] = React.useState<string[]>([
        'alice',
        'bob',
      ]);

      return (
        <div className='w-[320px]'>
          <FormField.Root>
            <Label.Root>Assignees</Label.Root>
            <ComboBox.Root
              options={TEAM_MEMBERS}
              value={value}
              onValueChange={setValue}
            >
              <ComboBox.SearchTrigger placeholder='Add assignee...' />
              <ComboBox.Content />
              <CustomTags />
            </ComboBox.Root>
          </FormField.Root>
        </div>
      );
    }

    function CustomTags() {
      const ctx = ComboBox.useComboBoxContext();

      if (ctx.value.length === 0) return null;

      const selected = ctx.value
        .map((v) => ctx.options.find((o) => o.value === v))
        .filter(Boolean) as ComboBox.ComboBoxOption[];

      return (
        <div className='flex flex-wrap gap-1.5'>
          {selected.map((opt) => (
            <Tag.Root key={opt.value} variant='stroke'>
              {opt.icon && (
                <Tag.Icon
                  className='rounded-full bg-cover bg-center bg-no-repeat'
                  style={{ backgroundImage: `url(${opt.icon})` }}
                />
              )}
              <span>{opt.label.split(' ')[0]}</span>
              <Tag.DismissButton onClick={() => ctx.remove(opt.value)} />
            </Tag.Root>
          ))}
        </div>
      );
    }

    return <CustomTagsDemo />;
  },
};
