'use client';

import * as React from 'react';

import * as TagInput from './tag-input';

export default { title: 'Form/Composed Inputs/Tag Input' };

export const Playground = {
  args: {
    size: 'medium',
    hasError: false,
    disabled: false,
    placeholder: 'Add tags...',
    tagVariant: 'stroke',
  },
  argTypes: {
    size: { control: 'select', options: ['medium', 'small', 'xsmall'] },
    hasError: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    tagVariant: { control: 'select', options: ['stroke', 'gray'] },
  },
  render: (args: any) => (
    <div className='w-full max-w-[300px]'>
      <TagInput.Root
        defaultValue={['Example', 'Tags']}
        size={args.size}
        hasError={args.hasError}
        disabled={args.disabled}
        placeholder={args.placeholder}
        tagVariant={args.tagVariant}
      />
    </div>
  ),
};

export const Default = {
  render: () => (
    <div className='w-full max-w-[300px]'>
      <TagInput.Root defaultValue={['Berlin', 'London', 'Paris']} />
    </div>
  ),
};

export const Controlled = {
  render: () => {
    const [tags, setTags] = React.useState(['React', 'TypeScript']);

    return (
      <div className='w-full max-w-[300px]'>
        <TagInput.Root value={tags} onValueChange={setTags} />
        <p className='mt-2 text-paragraph-xs text-text-sub-600'>
          Tags: {tags.join(', ')}
        </p>
      </div>
    );
  },
};

export const MaxTags = {
  render: () => (
    <div className='w-full max-w-[300px]'>
      <TagInput.Root
        defaultValue={['Tag 1']}
        maxTags={3}
        placeholder='Max 3 tags...'
      />
    </div>
  ),
};

export const GrayVariant = {
  render: () => (
    <div className='w-full max-w-[300px]'>
      <TagInput.Root
        defaultValue={['Design', 'Dev', 'QA']}
        tagVariant='gray'
      />
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div className='flex w-full max-w-[300px] flex-col gap-6'>
      <TagInput.Root size='medium' defaultValue={['Medium']} />
      <TagInput.Root size='small' defaultValue={['Small']} />
      <TagInput.Root size='xsmall' defaultValue={['XSmall']} />
    </div>
  ),
};
