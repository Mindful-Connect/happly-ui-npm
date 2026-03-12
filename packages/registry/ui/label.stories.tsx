import * as React from 'react';

import * as Label from './label';

export default { title: 'Form/Label', component: Label.Root };

export const Playground = {
  args: {
    children: 'Label Text',
    disabled: false,
    showAsterisk: true,
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
        Last Name
        <Label.Asterisk />
        <Label.Sub parens>Optional</Label.Sub>
        <Label.InfoIcon />
      </Label.Root>

      <Label.Root>
        Email
        <Label.Asterisk />
        <Label.Info>We will use this email to send you updates.</Label.Info>
      </Label.Root>
    </div>
  ),
};

export const Composed = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <Label.Composed required sub='Optional' subParens>
        Last Name
      </Label.Composed>

      <Label.Composed
        required
        info='We will use this email to send you updates.'
      >
        Email
      </Label.Composed>

      <Label.Composed disabled required sub='Optional' subParens>
        Disabled Label
      </Label.Composed>
    </div>
  ),
};
