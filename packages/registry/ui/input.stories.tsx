'use client';

import * as React from 'react';
import {
  RiAddLine,
  RiBankCardLine,
  RiCalendarLine,
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiEyeLine,
  RiEyeOffLine,
  RiFileCopyLine,
  RiGlobalLine,
  RiInformationFill,
  RiLinksLine,
  RiLock2Line,
  RiMailLine,
  RiSearchLine,
  RiSearch2Line,
  RiSubtractLine,
  RiUser6Line,
} from '@remixicon/react';
import {
  Button as ReactAriaButton,
  DateField as ReactAriaDateField,
  DateInput as ReactAriaDateInput,
  DateSegment as ReactAriaDateSegment,
  Group as ReactAriaGroup,
  Input as ReactAriaInput,
  Label as ReactAriaLabel,
  NumberField as ReactAriaNumberField,
} from 'react-aria-components';
import { usePaymentInputs } from 'react-payment-inputs';

import { compactButtonVariants } from './compact-button';
import * as FormField from './form-field';
import * as Hint from './hint';
import * as Input from './input';
import { inputVariants } from './input';
import * as Kbd from './kbd';
import * as Label from './label';
import * as Select from './select';
import * as Tag from './tag';
import { cn } from '@/lib/happly-ui-utils';

export default { title: 'Form/Input' };

export const Playground = {
  args: {
    size: 'medium',
    hasError: false,
    placeholder: 'Placeholder text...',
    disabled: false,
  },
  argTypes: {
    size: { control: 'select', options: ['medium', 'small', 'xsmall'] },
    hasError: { control: 'boolean' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  render: (args: any) => (
    <div className='w-full max-w-[300px]'>
      <Input.Root size={args.size} hasError={args.hasError}>
        <Input.Wrapper>
          <Input.Input placeholder={args.placeholder} disabled={args.disabled} />
        </Input.Wrapper>
      </Input.Root>
    </div>
  ),
};

export const WithIcon = {
  render: () => (
    <div className='flex w-full max-w-[300px] flex-col gap-6'>
      <Input.Root>
        <Input.Wrapper>
          <Input.Icon as={RiUser6Line} />
          <Input.Input type='text' placeholder='Placeholder text...' />
        </Input.Wrapper>
      </Input.Root>

      <Input.Root>
        <Input.Wrapper>
          <Input.Input type='text' placeholder='Placeholder text...' />
          <Input.Icon as={RiSearchLine} />
        </Input.Wrapper>
      </Input.Root>
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div className='flex w-full max-w-[300px] flex-col gap-6'>
      <Input.Root size='medium'>
        <Input.Wrapper>
          <Input.Icon as={RiUser6Line} />
          <Input.Input type='text' placeholder='Placeholder text...' />
        </Input.Wrapper>
      </Input.Root>

      <Input.Root size='small'>
        <Input.Wrapper>
          <Input.Icon as={RiUser6Line} />
          <Input.Input type='text' placeholder='Placeholder text...' />
        </Input.Wrapper>
      </Input.Root>

      <Input.Root size='xsmall'>
        <Input.Wrapper>
          <Input.Icon as={RiUser6Line} />
          <Input.Input type='text' placeholder='Placeholder text...' />
        </Input.Wrapper>
      </Input.Root>
    </div>
  ),
};

export const WithAffix = {
  render: () => (
    <div className='flex w-full max-w-[300px] flex-col gap-6'>
      <Input.Root>
        <Input.Affix>https://</Input.Affix>
        <Input.Wrapper>
          <Input.Input placeholder='www.example.com' />
        </Input.Wrapper>
      </Input.Root>

      <Input.Root>
        <Input.Wrapper>
          <Input.Input type='email' placeholder='example' />
        </Input.Wrapper>
        <Input.Affix>@gmail.com</Input.Affix>
      </Input.Root>
    </div>
  ),
};

export const WithInlineAffix = {
  render: () => (
    <div className='flex w-full max-w-[300px] flex-col gap-6'>
      <Input.Root>
        <Input.Wrapper>
          <Input.InlineAffix>€</Input.InlineAffix>
          <Input.Input placeholder='0.00' />
        </Input.Wrapper>
      </Input.Root>
    </div>
  ),
};

export const LabelAndHint = {
  render: () => (
    <div className='flex w-full max-w-[300px] flex-col gap-6'>
      <FormField.Root>
        <Label.Root htmlFor='email'>
          Email Address
          <Label.Asterisk />
          <Label.Sub>(Optional)</Label.Sub>
          <Label.InfoIcon />
        </Label.Root>

        <Input.Root>
          <Input.Wrapper>
            <Input.Icon as={RiMailLine} />
            <Input.Input
              id='email'
              type='email'
              placeholder='hello@alignui.com'
            />
          </Input.Wrapper>
        </Input.Root>

        <Hint.Root>
          <Hint.Icon as={RiInformationFill} />
          This is a hint text to help user.
        </Hint.Root>
      </FormField.Root>
    </div>
  ),
};

function IconCmd(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='10'
      height='10'
      viewBox='0 0 10 10'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M1.90057 9.11932C1.55398 9.11932 1.2358 9.03409 0.946023 8.86364C0.65625 8.69034 0.426136 8.46023 0.255682 8.1733C0.0852273 7.88352 0 7.56534 0 7.21875C0 6.86932 0.0852273 6.55114 0.255682 6.2642C0.426136 5.97443 0.65625 5.7429 0.946023 5.5696C1.2358 5.39631 1.55398 5.30966 1.90057 5.30966H2.83807V3.80114H1.90057C1.55398 3.80114 1.2358 3.71591 0.946023 3.54545C0.65625 3.375 0.426136 3.14631 0.255682 2.85938C0.0852273 2.5696 0 2.25 0 1.90057C0 1.55114 0.0852273 1.23295 0.255682 0.946023C0.426136 0.659091 0.65625 0.430398 0.946023 0.259943C1.2358 0.0866477 1.55398 0 1.90057 0C2.25 0 2.56818 0.0866477 2.85511 0.259943C3.14489 0.430398 3.375 0.659091 3.54545 0.946023C3.71875 1.23295 3.8054 1.55114 3.8054 1.90057V2.82955H5.31818V1.90057C5.31818 1.55114 5.40341 1.23295 5.57386 0.946023C5.74432 0.659091 5.97301 0.430398 6.25994 0.259943C6.54972 0.0866477 6.86932 0 7.21875 0C7.56818 0 7.88636 0.0866477 8.1733 0.259943C8.46023 0.430398 8.68892 0.659091 8.85938 0.946023C9.02983 1.23295 9.11506 1.55114 9.11506 1.90057C9.11506 2.25 9.02983 2.5696 8.85938 2.85938C8.68892 3.14631 8.46023 3.375 8.1733 3.54545C7.88636 3.71591 7.56818 3.80114 7.21875 3.80114H6.28551V5.30966H7.21875C7.56818 5.30966 7.88636 5.39631 8.1733 5.5696C8.46023 5.7429 8.68892 5.97443 8.85938 6.2642C9.02983 6.55114 9.11506 6.86932 9.11506 7.21875C9.11506 7.56534 9.02983 7.88352 8.85938 8.1733C8.68892 8.46023 8.46023 8.69034 8.1733 8.86364C7.88636 9.03409 7.56818 9.11932 7.21875 9.11932C6.86932 9.11932 6.54972 9.03409 6.25994 8.86364C5.97301 8.69034 5.74432 8.46023 5.57386 8.1733C5.40341 7.88352 5.31818 7.56534 5.31818 7.21875V6.28125H3.8054V7.21875C3.8054 7.56534 3.71875 7.88352 3.54545 8.1733C3.375 8.46023 3.14489 8.69034 2.85511 8.86364C2.56818 9.03409 2.25 9.11932 1.90057 9.11932ZM1.90057 8.14773C2.07386 8.14773 2.23011 8.10653 2.36932 8.02415C2.51136 7.94176 2.625 7.82955 2.71023 7.6875C2.79545 7.54546 2.83807 7.3892 2.83807 7.21875V6.28125H1.90057C1.73011 6.28125 1.57386 6.32386 1.43182 6.40909C1.28977 6.49148 1.17614 6.60369 1.09091 6.74574C1.00852 6.88778 0.96733 7.04545 0.96733 7.21875C0.96733 7.3892 1.00852 7.54546 1.09091 7.6875C1.17614 7.82955 1.28977 7.94176 1.43182 8.02415C1.57386 8.10653 1.73011 8.14773 1.90057 8.14773ZM1.90057 2.82955H2.83807V1.90057C2.83807 1.72727 2.79545 1.57102 2.71023 1.43182C2.625 1.28977 2.51136 1.17756 2.36932 1.09517C2.23011 1.01278 2.07386 0.971591 1.90057 0.971591C1.73011 0.971591 1.57386 1.01278 1.43182 1.09517C1.28977 1.17756 1.17614 1.28977 1.09091 1.43182C1.00852 1.57102 0.96733 1.72727 0.96733 1.90057C0.96733 2.07386 1.00852 2.23153 1.09091 2.37358C1.17614 2.51278 1.28977 2.62358 1.43182 2.70597C1.57386 2.78835 1.73011 2.82955 1.90057 2.82955ZM6.28551 2.82955H7.21875C7.39205 2.82955 7.5483 2.78835 7.6875 2.70597C7.8267 2.62358 7.9375 2.51278 8.01989 2.37358C8.10511 2.23153 8.14773 2.07386 8.14773 1.90057C8.14773 1.72727 8.10511 1.57102 8.01989 1.43182C7.9375 1.28977 7.8267 1.17756 7.6875 1.09517C7.5483 1.01278 7.39205 0.971591 7.21875 0.971591C7.04545 0.971591 6.88778 1.01278 6.74574 1.09517C6.60369 1.17756 6.49148 1.28977 6.40909 1.43182C6.3267 1.57102 6.28551 1.72727 6.28551 1.90057V2.82955ZM7.21875 8.14773C7.39205 8.14773 7.5483 8.10653 7.6875 8.02415C7.8267 7.94176 7.9375 7.82955 8.01989 7.6875C8.10511 7.54546 8.14773 7.3892 8.14773 7.21875C8.14773 7.04545 8.10511 6.88778 8.01989 6.74574C7.9375 6.60369 7.8267 6.49148 7.6875 6.40909C7.5483 6.32386 7.39205 6.28125 7.21875 6.28125H6.28551V7.21875C6.28551 7.3892 6.3267 7.54546 6.40909 7.6875C6.49148 7.82955 6.60369 7.94176 6.74574 8.02415C6.88778 8.10653 7.04545 8.14773 7.21875 8.14773ZM3.8054 5.30966H5.31818V3.80114H3.8054V5.30966Z'
        fill='currentColor'
      />
    </svg>
  );
}

export const WithKbd = {
  render: () => (
    <div className='w-full max-w-[300px]'>
      <Input.Root>
        <Input.Wrapper>
          <Input.Icon as={RiSearch2Line} />
          <Input.Input placeholder='Search...' />
          <Kbd.Root>
            <IconCmd className='size-2.5' />1
          </Kbd.Root>
        </Input.Wrapper>
      </Input.Root>
    </div>
  ),
};

export const Password = {
  render: () => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className='flex w-full max-w-[300px] flex-col gap-6'>
        <FormField.Root>
          <Label.Root htmlFor='password1'>Password</Label.Root>

          <Input.Root>
            <Input.Wrapper>
              <Input.Icon as={RiLock2Line} />
              <Input.Input
                id='password1'
                type={showPassword ? 'text' : 'password'}
                placeholder='••••••••••'
              />
              <button
                type='button'
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? (
                  <RiEyeOffLine className='size-5 text-text-soft-400 group-has-[disabled]:text-text-disabled-300' />
                ) : (
                  <RiEyeLine className='size-5 text-text-soft-400 group-has-[disabled]:text-text-disabled-300' />
                )}
              </button>
            </Input.Wrapper>
          </Input.Root>

          <Hint.Root>
            <Hint.Icon as={RiInformationFill} />
            This is a hint text to help user.
          </Hint.Root>
        </FormField.Root>
      </div>
    );
  },
};

const defaultLevelColors: Record<number, string> = {
  1: 'text-error-base',
  2: 'text-warning-base',
  3: 'text-success-base',
};

function LevelBar({
  levels = 3,
  level = 1,
  levelColors = defaultLevelColors,
  className,
  ...rest
}: {
  level: number;
  levels?: number;
  levelColors?: Record<number, string>;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'relative flex gap-2 overflow-hidden rounded-full',
        levelColors[1],
        className,
        levelColors[level],
      )}
      {...rest}
    >
      {Array.from({ length: levels }, (_, i) => i).map((currentLevel) => (
        <LevelBarItem
          key={currentLevel}
          level={level}
          levels={levels}
          active={currentLevel < level}
        />
      ))}
    </div>
  );
}

function LevelBarItem({
  active,
  levels,
  level,
  ...rest
}: {
  active?: boolean;
  level: number;
  levels: number;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className='h-1 w-full rounded-full bg-bg-soft-200'
      style={{
        clipPath: 'inset(0 round 99px)',
      }}
      {...rest}
    >
      <div
        className='absolute left-0 top-0 h-full w-0 rounded-full bg-current duration-500 ease-out'
        style={{
          transitionProperty: 'width',
          width: `calc((100% / ${levels}) * ${level})`,
        }}
      />
    </div>
  );
}

export const PasswordWithLevel = {
  render: () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [newPassword, setNewPassword] = React.useState('');

    const [criteria, setCriteria] = React.useState({
      length: false,
      uppercase: false,
      number: false,
    });

    const handleNewPasswordChange = (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const value = e.target.value;
      setNewPassword(value);
      setCriteria({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        number: /[0-9]/.test(value),
      });
    };

    const countTrueCriteria = (c: Record<string, boolean>): number => {
      return Object.values(c).filter((v) => v).length;
    };

    const trueCriteriaCount = countTrueCriteria(criteria);

    return (
      <div className='flex w-full max-w-[300px] flex-col gap-6'>
        <FormField.Root>
          <Label.Root htmlFor='password-with-level'>New Password</Label.Root>

          <Input.Root>
            <Input.Wrapper>
              <Input.Icon as={RiLock2Line} />
              <Input.Input
                id='password-with-level'
                type={showPassword ? 'text' : 'password'}
                placeholder='••••••••••'
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
              <button
                type='button'
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? (
                  <RiEyeOffLine className='size-5 text-text-soft-400 group-has-[disabled]:text-text-disabled-300' />
                ) : (
                  <RiEyeLine className='size-5 text-text-soft-400 group-has-[disabled]:text-text-disabled-300' />
                )}
              </button>
            </Input.Wrapper>
          </Input.Root>

          <div className='flex flex-col gap-2 pt-1.5'>
            <LevelBar levels={3} level={trueCriteriaCount} />
            <div className='text-paragraph-xs text-text-sub-600'>
              Must contain at least;
            </div>
            <div className='flex items-center gap-1.5 text-paragraph-xs text-text-sub-600'>
              {criteria.uppercase ? (
                <RiCheckboxCircleFill className='size-4 shrink-0 text-success-base' />
              ) : (
                <RiCloseCircleFill className='size-4 shrink-0 text-text-soft-400' />
              )}
              At least 1 uppercase
            </div>
            <div className='flex items-center gap-1.5 text-paragraph-xs text-text-sub-600'>
              {criteria.number ? (
                <RiCheckboxCircleFill className='size-4 shrink-0 text-success-base' />
              ) : (
                <RiCloseCircleFill className='size-4 shrink-0 text-text-soft-400' />
              )}
              At least 1 number
            </div>
            <div className='flex items-center gap-1.5 text-paragraph-xs text-text-sub-600'>
              {criteria.length ? (
                <RiCheckboxCircleFill className='size-4 shrink-0 text-success-base' />
              ) : (
                <RiCloseCircleFill className='size-4 shrink-0 text-text-soft-400' />
              )}
              At least 8 characters
            </div>
          </div>
        </FormField.Root>
      </div>
    );
  },
};

export const Disabled = {
  render: () => (
    <div className='flex w-full max-w-[300px]'>
      <Input.Root>
        <Input.Wrapper>
          <Input.Icon as={RiUser6Line} />
          <Input.Input
            type='text'
            placeholder='Placeholder text...'
            disabled
          />
        </Input.Wrapper>
      </Input.Root>
    </div>
  ),
};

export const ErrorState = {
  render: () => (
    <div className='flex w-full max-w-[300px]'>
      <Input.Root hasError>
        <Input.Wrapper>
          <Input.Icon as={RiUser6Line} />
          <Input.Input type='text' placeholder='Placeholder text...' />
        </Input.Wrapper>
      </Input.Root>
    </div>
  ),
};

export const WithButton = {
  render: () => (
    <div className='w-full max-w-[300px]'>
      <FormField.Root>
        <Label.Root>Share Link</Label.Root>

        <Input.Root>
          <Input.Wrapper>
            <Input.Icon as={RiLinksLine} />
            <Input.Input placeholder='www.alignui.com' />
          </Input.Wrapper>
          <button
            type='button'
            className={cn(
              'inline-flex h-10 items-center justify-center gap-3 rounded-none bg-transparent px-3.5 text-label-sm text-text-sub-600 outline-none ring-1 ring-inset ring-transparent transition duration-200 ease-out',
              'hover:bg-bg-weak-50 hover:text-text-strong-950',
              'focus-visible:bg-bg-weak-50 focus-visible:text-text-strong-950 focus-visible:ring-transparent',
            )}
          >
            <RiFileCopyLine className='-mx-1 size-5 shrink-0' />
          </button>
        </Input.Root>
      </FormField.Root>
    </div>
  ),
};

export const WithTags = {
  render: () => {
    const [tags, setTags] = React.useState(['Berlin', 'London', 'Paris']);
    const [inputValue, setInputValue] = React.useState('');

    const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && inputValue.trim()) {
        setTags([...tags, inputValue.trim()]);
        setInputValue('');
      }
    };

    const removeTag = (tag: string) => {
      setTags(tags.filter((t) => t !== tag));
    };

    return (
      <div className='flex w-full max-w-[300px] flex-col gap-6'>
        <FormField.Root>
          <Label.Root htmlFor='tags'>Tag Input</Label.Root>

          <Input.Root>
            <Input.Wrapper>
              <Input.Input
                id='tags'
                placeholder='Add tags...'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={addTag}
              />
            </Input.Wrapper>
          </Input.Root>

          <div className='mt-2 flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <Tag.Root key={tag}>
                {tag}
                <Tag.DismissButton onClick={() => removeTag(tag)} />
              </Tag.Root>
            ))}
          </div>
        </FormField.Root>
      </div>
    );
  },
};

export const DateFieldStory = {
  name: 'Date Field (React Aria)',
  render: () => {
    const { root, wrapper, icon } = inputVariants();
    return (
      <div className='w-full max-w-[300px]'>
        <ReactAriaDateField className='flex flex-col gap-1'>
          <Label.Root asChild>
            <ReactAriaLabel>Date</ReactAriaLabel>
          </Label.Root>
          <div className={root()}>
            <div className={wrapper({ class: 'h-10' })}>
              <RiCalendarLine className={icon()} />
              <ReactAriaDateInput className='flex'>
                {(segment) => (
                  <ReactAriaDateSegment
                    segment={segment}
                    className='flex items-center rounded p-0.5 text-paragraph-sm uppercase leading-none text-text-strong-950 caret-transparent outline-none focus:bg-bg-weak-50 focus:outline-none'
                  />
                )}
              </ReactAriaDateInput>
            </div>
          </div>
        </ReactAriaDateField>
      </div>
    );
  },
};

export const PaymentInput = {
  render: () => {
    const { getCardNumberProps, meta } = usePaymentInputs();
    const { cardType } = meta;

    const cardIcon = React.useMemo(() => {
      if (cardType?.displayName === 'Visa') {
        return '/images/payment-methods/visa.svg';
      }
      if (cardType?.displayName === 'Mastercard') {
        return '/images/payment-methods/mastercard.svg';
      }
      if (cardType?.displayName === 'American Express') {
        return '/images/payment-methods/amex.svg';
      }
      return '/images/payment-methods/placeholder.svg';
    }, [cardType?.displayName]);

    return (
      <div className='w-full max-w-[300px]'>
        <FormField.Root>
          <Label.Root htmlFor='card-number'>
            Card Number <Label.Asterisk />
          </Label.Root>

          <Input.Root>
            <Input.Wrapper className='pr-2'>
              <Input.Icon as={RiBankCardLine} />
              <Input.Input
                {...getCardNumberProps()}
                id='card-number'
                placeholder='0000 0000 0000 0000'
              />
              <img src={cardIcon} alt='' className='h-6 w-8 shrink-0' />
            </Input.Wrapper>
          </Input.Root>
        </FormField.Root>
      </div>
    );
  },
};

const currencies = [
  { icon: 'https://mindful-connect.github.io/circle-flags/flags/eu.svg', value: 'EUR', label: 'EUR' },
  { icon: 'https://mindful-connect.github.io/circle-flags/flags/us.svg', value: 'USD', label: 'USD' },
  { icon: 'https://mindful-connect.github.io/circle-flags/flags/tr.svg', value: 'TRY', label: 'TRY' },
];

export const WithSelect = {
  render: () => (
    <div className='w-full max-w-[300px]'>
      <Input.Root>
        <Input.Wrapper>
          <Input.InlineAffix>€</Input.InlineAffix>
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
                  style={{
                    backgroundImage: `url(${item.icon})`,
                  }}
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

const permissions = [
  { value: 'view', label: 'can view' },
  { value: 'edit', label: 'can edit' },
];

export const WithInlineSelect = {
  render: () => (
    <div className='w-full max-w-[300px]'>
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
              {permissions.map((item) => (
                <Select.Item key={item.value} value={item.value}>
                  {item.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Input.Wrapper>
      </Input.Root>
    </div>
  ),
};

export const CounterInput = {
  name: 'Counter Input (React Aria)',
  render: () => {
    const { root: inputRoot, wrapper: inputWrapper, input } = inputVariants();
    const { root: compactButtonRoot, icon: compactButtonIcon } =
      compactButtonVariants({ variant: 'ghost' });

    return (
      <div className='w-full max-w-[300px]'>
        <ReactAriaNumberField
          defaultValue={16}
          minValue={0}
          className='flex flex-col gap-1'
        >
          <Label.Root asChild>
            <ReactAriaLabel>
              Counter Input
              <Label.Asterisk />
            </ReactAriaLabel>
          </Label.Root>

          <div className={inputRoot()}>
            <ReactAriaGroup className={inputWrapper()}>
              <ReactAriaButton
                slot='decrement'
                className={compactButtonRoot()}
              >
                <RiSubtractLine className={compactButtonIcon()} />
              </ReactAriaButton>
              <ReactAriaInput className={input({ class: 'text-center' })} />
              <ReactAriaButton
                slot='increment'
                className={compactButtonRoot()}
              >
                <RiAddLine className={compactButtonIcon()} />
              </ReactAriaButton>
            </ReactAriaGroup>
          </div>
        </ReactAriaNumberField>
      </div>
    );
  },
};

export const Composition = {
  render: () => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className='flex w-full max-w-[300px] flex-col gap-6'>
        <FormField.Root>
          <Label.Root htmlFor='password2'>Password</Label.Root>

          <Input.Composed
            leadingIcon={RiLock2Line}
            id='password2'
            type={showPassword ? 'text' : 'password'}
            placeholder='••••••••••'
            inlineTrailingNode={
              <button
                type='button'
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? (
                  <RiEyeOffLine className='size-5 text-text-soft-400 group-has-[disabled]:text-text-disabled-300' />
                ) : (
                  <RiEyeLine className='size-5 text-text-soft-400 group-has-[disabled]:text-text-disabled-300' />
                )}
              </button>
            }
          />
        </FormField.Root>
      </div>
    );
  },
};
