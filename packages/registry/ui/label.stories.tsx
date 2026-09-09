import * as React from 'react';

import * as Label from './label';

export default { title: 'Form/Label', component: Label.Root };

export const Playground = {
  args: {
    children: 'Label text',
    disabled: false,
    showAsterisk: false,
    subText: 'Optional',
    subParens: true,
  },
  argTypes: {
    children: { control: 'text' },
    disabled: { control: 'boolean' },
    showAsterisk: { control: 'boolean' },
    subText: { control: 'text' },
    subParens: { control: 'boolean' },
  },
  render: (args: any) => (
    <Label.Root disabled={args.disabled}>
      {args.children}
      {args.showAsterisk && <Label.Asterisk />}
      {args.subText && (
        <Label.Sub parens={args.subParens}>{args.subText}</Label.Sub>
      )}
      <Label.InfoIcon />
    </Label.Root>
  ),
};

export const Demo = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <Label.Root>
        Last name
        <Label.Asterisk />
        <Label.Info>We use this on invoices and contracts.</Label.Info>
      </Label.Root>

      <Label.Root>
        Email
        <Label.Asterisk />
        <Label.Info>
          We use this address for account and billing updates.
        </Label.Info>
      </Label.Root>
    </div>
  ),
};

export const Composed = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <Label.Composed required info='We use this on invoices and contracts.'>
        Last name
      </Label.Composed>

      <Label.Composed
        required
        info='We use this address for account and billing updates.'
      >
        Email
      </Label.Composed>

      <Label.Composed disabled sub='Optional' subParens>
        Disabled label
      </Label.Composed>
    </div>
  ),
};
