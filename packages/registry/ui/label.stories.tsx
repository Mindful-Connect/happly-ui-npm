import * as React from 'react';

import * as Label from './label';

export default { title: 'Form/Label', component: Label.Root };

export const Demo = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <Label.Root>
        Last Name
        <Label.Asterisk />
        <Label.Sub>(Optional)</Label.Sub>
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
