'use client';

import * as React from 'react';

import * as Input from './input';
import * as Tag from './tag';

type TagInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'defaultValue' | 'size'
> & {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (tags: string[]) => void;
  size?: 'medium' | 'small' | 'xsmall';
  hasError?: boolean;
  tagVariant?: 'stroke' | 'gray';
  maxTags?: number;
  allowDuplicates?: boolean;
  triggerKeys?: string[];
};

const TagInputRoot = React.forwardRef<HTMLInputElement, TagInputProps>(
  (
    {
      value: controlledValue,
      defaultValue = [],
      onValueChange,
      size,
      hasError,
      placeholder = 'Add tags...',
      tagVariant = 'gray',
      maxTags,
      allowDuplicates = false,
      triggerKeys = ['Enter'],
      disabled,
      ...rest
    },
    forwardedRef
  ) => {
    const [uncontrolledTags, setUncontrolledTags] =
      React.useState<string[]>(defaultValue);
    const [inputValue, setInputValue] = React.useState('');

    const isControlled = controlledValue !== undefined;
    const tags = isControlled ? controlledValue : uncontrolledTags;

    const setTags = React.useCallback(
      (newTags: string[]) => {
        if (!isControlled) {
          setUncontrolledTags(newTags);
        }
        onValueChange?.(newTags);
      },
      [isControlled, onValueChange]
    );

    const addTag = React.useCallback(
      (tag: string) => {
        const trimmed = tag.trim();
        if (!trimmed) return;
        if (!allowDuplicates && tags.includes(trimmed)) return;
        if (maxTags && tags.length >= maxTags) return;
        setTags([...tags, trimmed]);
        setInputValue('');
      },
      [tags, setTags, allowDuplicates, maxTags]
    );

    const removeTag = React.useCallback(
      (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
      },
      [tags, setTags]
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (triggerKeys.includes(e.key) && inputValue.trim()) {
          e.preventDefault();
          addTag(inputValue);
        } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
          removeTag(tags.length - 1);
        }
      },
      [triggerKeys, inputValue, addTag, tags.length, removeTag]
    );

    return (
      <div className='flex flex-col gap-2'>
        <Input.Root size={size} hasError={hasError}>
          <Input.Wrapper>
            <Input.Input
              ref={forwardedRef}
              placeholder={placeholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              {...rest}
            />
          </Input.Wrapper>
        </Input.Root>

        {tags.length > 0 && (
          <div className='flex flex-wrap gap-2'>
            {tags.map((tag, index) => (
              <Tag.Root
                key={`${tag}-${index}`}
                variant={tagVariant}
                disabled={disabled}
              >
                {tag}
                <Tag.DismissButton
                  onClick={() => removeTag(index)}
                  disabled={disabled}
                />
              </Tag.Root>
            ))}
          </div>
        )}
      </div>
    );
  }
);
TagInputRoot.displayName = 'TagInputRoot';

export { TagInputRoot as Root };
