import * as React from 'react';
import { RiInformationFill, RiMailLine } from '@remixicon/react';

import * as ComboBox from './combo-box';
import * as FormField from './form-field';
import * as Hint from './hint';
import * as Input from './input';
import * as Label from './label';

export default { title: 'Form/Form Field' };

const TAG_OPTIONS = [
  { value: 'ai', label: 'AI' },
  { value: 'product', label: 'Product' },
  { value: 'saas', label: 'SaaS' },
  { value: 'fintech', label: 'Fintech' },
  { value: 'healthtech', label: 'Healthtech' },
];

export const Demo = {
  render: () => {
    const [tags, setTags] = React.useState<string[]>([]);

    return (
      <div className='flex w-[300px] flex-col gap-6'>
        <FormField.Root>
          <Label.Root htmlFor='email'>
            Email Address
            <Label.Asterisk />
            <Label.Sub>(Required)</Label.Sub>
            <Label.Info>We&apos;ll use this to contact you.</Label.Info>
          </Label.Root>
          <Input.Root>
            <Input.Wrapper>
              <Input.Icon as={RiMailLine} />
              <Input.Input
                id='email'
                type='email'
                placeholder='hello@example.com'
              />
            </Input.Wrapper>
          </Input.Root>
          <Hint.Root>
            <Hint.Icon as={RiInformationFill} />
            This is a hint text to help user.
          </Hint.Root>
        </FormField.Root>

        <FormField.Root>
          <Label.Root>
            Tags
            <Label.Asterisk />
          </Label.Root>
          <ComboBox.Root
            options={TAG_OPTIONS}
            value={tags}
            onValueChange={setTags}
            name='tags'
          />
        </FormField.Root>

        <FormField.Root>
          <Label.Root htmlFor='name'>Full Name</Label.Root>
          <Input.Root>
            <Input.Wrapper>
              <Input.Input id='name' placeholder='John Doe' />
            </Input.Wrapper>
          </Input.Root>
        </FormField.Root>
      </div>
    );
  },
};
