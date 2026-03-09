import * as React from 'react';
import { RiInformationFill, RiMailLine } from '@remixicon/react';

import * as ComboBox from './combo-box';
import * as FormField from './form-field';
import * as Hint from './hint';
import * as Input from './input';
import * as Label from './label';

export default { title: 'Form/Form Field' };

export const Playground = {
  args: {
    label: 'Email Address',
    placeholder: 'hello@example.com',
    hint: 'This is a hint text to help user.',
    showAsterisk: true,
    subText: '(Required)',
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    hint: { control: 'text' },
    showAsterisk: { control: 'boolean' },
    subText: { control: 'text' },
  },
  render: (args: any) => (
    <div className='w-[300px]'>
      <FormField.Root>
        <Label.Root>
          {args.label}
          {args.showAsterisk && <Label.Asterisk />}
          {args.subText && <Label.Sub>{args.subText}</Label.Sub>}
        </Label.Root>
        <Input.Root>
          <Input.Wrapper>
            <Input.Icon as={RiMailLine} />
            <Input.Input placeholder={args.placeholder} />
          </Input.Wrapper>
        </Input.Root>
        {args.hint && (
          <Hint.Root>
            <Hint.Icon as={RiInformationFill} />
            {args.hint}
          </Hint.Root>
        )}
      </FormField.Root>
    </div>
  ),
};

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
