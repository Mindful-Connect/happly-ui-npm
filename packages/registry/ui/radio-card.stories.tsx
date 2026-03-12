'use client';

import * as React from 'react';
import {
  RiBankCardLine,
  RiBankLine,
  RiCalendarLine,
  RiFlashlightLine,
  RiStarLine,
  RiWalletLine,
} from '@remixicon/react';

import * as Badge from './badge';
import * as FormField from './form-field';
import * as KeyIcon from './key-icon';
import * as RadioCard from './radio-card';

export default { title: 'Form/Radio Card' };

export const Playground = {
  args: {
    variant: 'neutral',
    hasError: false,
    allowDeselect: false,
    disabled: false,
  },
  argTypes: {
    variant: { control: 'select', options: ['neutral', 'primary'] },
    hasError: { control: 'boolean' },
    allowDeselect: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  render: (args: any) => {
    const [value, setValue] = React.useState('option-1');

    return (
      <div className='w-[480px]'>
        <RadioCard.Root
          value={value}
          onValueChange={setValue}
          variant={args.variant}
          hasError={args.hasError}
          allowDeselect={args.allowDeselect}
        >
          <RadioCard.Item value='option-1' disabled={args.disabled}>
            <RadioCard.Content>
              <RadioCard.Title>Option 1</RadioCard.Title>
              <RadioCard.Description>
                First option description
              </RadioCard.Description>
            </RadioCard.Content>
            <RadioCard.Indicator />
          </RadioCard.Item>

          <RadioCard.Item value='option-2' disabled={args.disabled}>
            <RadioCard.Content>
              <RadioCard.Title>Option 2</RadioCard.Title>
              <RadioCard.Description>
                Second option description
              </RadioCard.Description>
            </RadioCard.Content>
            <RadioCard.Indicator />
          </RadioCard.Item>

          <RadioCard.Item value='option-3' disabled={args.disabled}>
            <RadioCard.Content>
              <RadioCard.Title>Option 3</RadioCard.Title>
              <RadioCard.Description>
                Third option description
              </RadioCard.Description>
            </RadioCard.Content>
            <RadioCard.Indicator />
          </RadioCard.Item>
        </RadioCard.Root>
      </div>
    );
  },
};

export const Default = {
  render: () => {
    const [value, setValue] = React.useState('personal');

    return (
      <div className='w-[480px]'>
        <RadioCard.Root value={value} onValueChange={setValue}>
          <RadioCard.Item value='personal'>
            <RadioCard.Content>
              <RadioCard.Title>Personal</RadioCard.Title>
              <RadioCard.Description>
                For individual use
              </RadioCard.Description>
            </RadioCard.Content>
            <RadioCard.Indicator />
          </RadioCard.Item>

          <RadioCard.Item value='team'>
            <RadioCard.Content>
              <RadioCard.Title>Team</RadioCard.Title>
              <RadioCard.Description>
                For small teams
              </RadioCard.Description>
            </RadioCard.Content>
            <RadioCard.Indicator />
          </RadioCard.Item>

          <RadioCard.Item value='enterprise'>
            <RadioCard.Content>
              <RadioCard.Title>Enterprise</RadioCard.Title>
              <RadioCard.Description>
                For large organizations
              </RadioCard.Description>
            </RadioCard.Content>
            <RadioCard.Indicator />
          </RadioCard.Item>
        </RadioCard.Root>
      </div>
    );
  },
};

export const WithKeyIcons = {
  render: () => {
    const [value, setValue] = React.useState('card');

    return (
      <div className='w-[480px]'>
        <RadioCard.Root value={value} onValueChange={setValue}>
          <RadioCard.Item value='card'>
            <KeyIcon.Root icon={<RiBankCardLine />} />
            <RadioCard.Content>
              <RadioCard.Title>Credit Card</RadioCard.Title>
              <RadioCard.Description>
                Pay with credit card
              </RadioCard.Description>
            </RadioCard.Content>
            <RadioCard.Indicator />
          </RadioCard.Item>

          <RadioCard.Item value='wallet'>
            <KeyIcon.Root icon={<RiWalletLine />} />
            <RadioCard.Content>
              <RadioCard.Title>Digital Wallet</RadioCard.Title>
              <RadioCard.Description>
                Pay with digital wallet
              </RadioCard.Description>
            </RadioCard.Content>
            <RadioCard.Indicator />
          </RadioCard.Item>

          <RadioCard.Item value='bank'>
            <KeyIcon.Root icon={<RiBankLine />} />
            <RadioCard.Content>
              <RadioCard.Title>Bank Transfer</RadioCard.Title>
              <RadioCard.Description>
                Direct bank transfer
              </RadioCard.Description>
            </RadioCard.Content>
            <RadioCard.Indicator />
          </RadioCard.Item>
        </RadioCard.Root>
      </div>
    );
  },
};

export const WithSimpleIcons = {
  render: () => {
    const [value, setValue] = React.useState('card');

    return (
      <div className='w-[480px]'>
        <RadioCard.Root value={value} onValueChange={setValue}>
          <RadioCard.Item value='card'>
            <RiBankCardLine className='size-5 shrink-0 text-text-sub-600' />
            <RadioCard.Content>
              <RadioCard.Title>Credit Card</RadioCard.Title>
              <RadioCard.Description>
                Pay with credit card
              </RadioCard.Description>
            </RadioCard.Content>
            <RadioCard.Indicator />
          </RadioCard.Item>

          <RadioCard.Item value='wallet'>
            <RiWalletLine className='size-5 shrink-0 text-text-sub-600' />
            <RadioCard.Content>
              <RadioCard.Title>Digital Wallet</RadioCard.Title>
              <RadioCard.Description>
                Pay with digital wallet
              </RadioCard.Description>
            </RadioCard.Content>
            <RadioCard.Indicator />
          </RadioCard.Item>

          <RadioCard.Item value='bank'>
            <RiBankLine className='size-5 shrink-0 text-text-sub-600' />
            <RadioCard.Content>
              <RadioCard.Title>Bank Transfer</RadioCard.Title>
              <RadioCard.Description>
                Direct bank transfer
              </RadioCard.Description>
            </RadioCard.Content>
            <RadioCard.Indicator />
          </RadioCard.Item>
        </RadioCard.Root>
      </div>
    );
  },
};

export const WithBadges = {
  render: () => {
    const [value, setValue] = React.useState('pro');

    return (
      <div className='w-[480px]'>
        <RadioCard.Root value={value} onValueChange={setValue}>
          <RadioCard.Item value='pro'>
            <KeyIcon.Root icon={<RiFlashlightLine />} />
            <RadioCard.Content>
              <div className='flex items-center gap-2'>
                <RadioCard.Title>Pro Plan</RadioCard.Title>
                <Badge.Root variant='light' color='blue' size='small'>
                  Popular
                </Badge.Root>
              </div>
              <RadioCard.Description>
                Advanced features for power users
              </RadioCard.Description>
            </RadioCard.Content>
            <RadioCard.Indicator />
          </RadioCard.Item>

          <RadioCard.Item value='starter'>
            <KeyIcon.Root icon={<RiStarLine />} />
            <RadioCard.Content>
              <RadioCard.Title>Starter Plan</RadioCard.Title>
              <RadioCard.Description>
                Basic features to get started
              </RadioCard.Description>
            </RadioCard.Content>
            <RadioCard.Indicator />
          </RadioCard.Item>
        </RadioCard.Root>
      </div>
    );
  },
};

export const InlineDescription = {
  render: () => {
    const [value, setValue] = React.useState('monthly');

    return (
      <div className='w-[480px]'>
        <RadioCard.Root value={value} onValueChange={setValue}>
          <RadioCard.Item value='monthly'>
            <KeyIcon.Root icon={<RiCalendarLine />} />
            <RadioCard.Content inline>
              <RadioCard.Title>Monthly</RadioCard.Title>
              <RadioCard.Description>$10/mo</RadioCard.Description>
            </RadioCard.Content>
            <RadioCard.Indicator />
          </RadioCard.Item>

          <RadioCard.Item value='yearly'>
            <KeyIcon.Root icon={<RiCalendarLine />} />
            <RadioCard.Content inline>
              <RadioCard.Title>Yearly</RadioCard.Title>
              <RadioCard.Description>$100/yr</RadioCard.Description>
              <Badge.Root variant='light' color='green' size='small'>
                Save 17%
              </Badge.Root>
            </RadioCard.Content>
            <RadioCard.Indicator />
          </RadioCard.Item>
        </RadioCard.Root>
      </div>
    );
  },
};

export const AllowDeselect = {
  render: () => {
    const [value, setValue] = React.useState('personal');

    return (
      <div className='w-[480px]'>
        <RadioCard.Root
          value={value}
          onValueChange={setValue}
          allowDeselect
        >
          <RadioCard.Item value='personal'>
            <RadioCard.Content>
              <RadioCard.Title>Personal</RadioCard.Title>
              <RadioCard.Description>
                For individual use
              </RadioCard.Description>
            </RadioCard.Content>
            <RadioCard.Indicator />
          </RadioCard.Item>

          <RadioCard.Item value='team'>
            <RadioCard.Content>
              <RadioCard.Title>Team</RadioCard.Title>
              <RadioCard.Description>
                For small teams
              </RadioCard.Description>
            </RadioCard.Content>
            <RadioCard.Indicator />
          </RadioCard.Item>
        </RadioCard.Root>
      </div>
    );
  },
};

export const Disabled = {
  render: () => (
    <div className='w-[480px]'>
      <RadioCard.Root value='personal' onValueChange={() => {}}>
        <RadioCard.Item value='personal' disabled>
          <RadioCard.Content>
            <RadioCard.Title>Personal</RadioCard.Title>
            <RadioCard.Description>
              For individual use
            </RadioCard.Description>
          </RadioCard.Content>
          <RadioCard.Indicator />
        </RadioCard.Item>

        <RadioCard.Item value='team' disabled>
          <RadioCard.Content>
            <RadioCard.Title>Team</RadioCard.Title>
            <RadioCard.Description>
              For small teams
            </RadioCard.Description>
          </RadioCard.Content>
          <RadioCard.Indicator />
        </RadioCard.Item>
      </RadioCard.Root>
    </div>
  ),
};

export const ErrorState = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <div className='w-[480px]'>
        <RadioCard.Root
          value={value}
          onValueChange={setValue}
          hasError
        >
          <RadioCard.Item value='personal'>
            <RadioCard.Content>
              <RadioCard.Title>Personal</RadioCard.Title>
              <RadioCard.Description>
                For individual use
              </RadioCard.Description>
            </RadioCard.Content>
            <RadioCard.Indicator />
          </RadioCard.Item>

          <RadioCard.Item value='team'>
            <RadioCard.Content>
              <RadioCard.Title>Team</RadioCard.Title>
              <RadioCard.Description>
                For small teams
              </RadioCard.Description>
            </RadioCard.Content>
            <RadioCard.Indicator />
          </RadioCard.Item>
        </RadioCard.Root>
      </div>
    );
  },
};

export const Composed = {
  render: () => {
    const [value, setValue] = React.useState('card');

    return (
      <div className='w-[480px]'>
        <RadioCard.Root value={value} onValueChange={setValue}>
          <RadioCard.RadioCard
            value='card'
            title='Credit Card'
            description='Pay with credit card'
            icon={<KeyIcon.Root icon={<RiBankCardLine />} />}
          />
          <RadioCard.RadioCard
            value='wallet'
            title='Digital Wallet'
            description='Pay with digital wallet'
            icon={<KeyIcon.Root icon={<RiWalletLine />} />}
            badge={
              <Badge.Root variant='light' color='blue' size='small'>
                Popular
              </Badge.Root>
            }
          />
          <RadioCard.RadioCard
            value='bank'
            title='Bank Transfer'
            description='Direct bank transfer'
            icon={<KeyIcon.Root icon={<RiBankLine />} />}
          />
        </RadioCard.Root>
      </div>
    );
  },
};

export const PrimaryVariant = {
  render: () => {
    const [value, setValue] = React.useState('small');

    return (
      <div className='w-[480px]'>
        <RadioCard.Root
          value={value}
          onValueChange={setValue}
          variant='primary'
        >
          <RadioCard.Item value='small'>
            <RadioCard.Content>
              <RadioCard.Title>Small</RadioCard.Title>
            </RadioCard.Content>
            <RadioCard.Indicator />
          </RadioCard.Item>

          <RadioCard.Item value='medium'>
            <RadioCard.Content>
              <RadioCard.Title>Medium</RadioCard.Title>
            </RadioCard.Content>
            <RadioCard.Indicator />
          </RadioCard.Item>

          <RadioCard.Item value='large'>
            <RadioCard.Content>
              <RadioCard.Title>Large</RadioCard.Title>
            </RadioCard.Content>
            <RadioCard.Indicator />
          </RadioCard.Item>
        </RadioCard.Root>
      </div>
    );
  },
};

export const WithFormField = {
  render: () => {
    const [value, setValue] = React.useState('personal');

    return (
      <div className='w-[480px]'>
        <FormField.Root label='Select Plan' required hint='Choose the plan that works for you.'>
          <RadioCard.Root value={value} onValueChange={setValue}>
            <RadioCard.Item value='personal'>
              <RadioCard.Content>
                <RadioCard.Title>Personal</RadioCard.Title>
                <RadioCard.Description>
                  For individual use
                </RadioCard.Description>
              </RadioCard.Content>
              <RadioCard.Indicator />
            </RadioCard.Item>

            <RadioCard.Item value='team'>
              <RadioCard.Content>
                <RadioCard.Title>Team</RadioCard.Title>
                <RadioCard.Description>
                  For small teams
                </RadioCard.Description>
              </RadioCard.Content>
              <RadioCard.Indicator />
            </RadioCard.Item>

            <RadioCard.Item value='enterprise'>
              <RadioCard.Content>
                <RadioCard.Title>Enterprise</RadioCard.Title>
                <RadioCard.Description>
                  For large organizations
                </RadioCard.Description>
              </RadioCard.Content>
              <RadioCard.Indicator />
            </RadioCard.Item>
          </RadioCard.Root>
        </FormField.Root>
      </div>
    );
  },
};
