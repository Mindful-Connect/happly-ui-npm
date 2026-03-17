'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiMailLine, RiUser6Line } from '@remixicon/react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import * as Button from './button';
import * as ComboBox from './combo-box';
import * as FormField from './form-field';
import * as Input from './input';
import * as PasswordInput from './password-input';
import * as Select from './select';
import * as Textarea from './textarea';

export default { title: 'Form/Form Field' };

export const Playground = {
  args: {
    label: 'Email Address',
    placeholder: 'hello@example.com',
    hint: 'This is a hint text to help user.',
    required: true,
    labelSub: 'Required',
    labelSubParens: true,
    labelInfo: "We'll use this to contact you.",
    error: '',
    disabled: false,
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    hint: { control: 'text' },
    required: { control: 'boolean' },
    labelSub: { control: 'text' },
    labelSubParens: { control: 'boolean' },
    labelInfo: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  render: (args: any) => (
    <div className='w-[300px]'>
      <FormField.Root
        label={args.label}
        htmlFor='playground-email'
        required={args.required}
        labelSub={args.labelSub}
        labelSubParens={args.labelSubParens}
        labelInfo={args.labelInfo}
        hint={args.hint}
        error={args.error}
        disabled={args.disabled}
      >
        <Input.Composed
          leadingIcon={RiMailLine}
          type='email'
          placeholder={args.placeholder}
        />
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

function DemoRender() {
  const [tags, setTags] = React.useState<string[]>([]);

  return (
    <div className='flex w-[300px] flex-col gap-6'>
      <FormField.Root
        label='Email Address'
        htmlFor='email'
        required
        labelSub='Required'
        labelSubParens
        labelInfo="We'll use this to contact you."
        hint='This is a hint text to help user.'
      >
        <Input.Composed
          id='email'
          leadingIcon={RiMailLine}
          type='email'
          placeholder='hello@example.com'
        />
      </FormField.Root>

      <FormField.Root label='Tags' required>
        <ComboBox.Composed
          options={TAG_OPTIONS}
          value={tags}
          onValueChange={setTags}
          name='tags'
        />
      </FormField.Root>

      <FormField.Root label='Full Name' htmlFor='name'>
        <Input.Composed id='name' placeholder='John Doe' />
      </FormField.Root>
    </div>
  );
}

export const Demo = {
  render: () => <DemoRender />,
};

export const WithError = {
  render: () => (
    <div className='w-[300px]'>
      <FormField.Root
        label='Email Address'
        htmlFor='error-email'
        required
        hint='This is a hint text to help user.'
        error='Please enter a valid email address.'
      >
        <Input.Composed
          leadingIcon={RiMailLine}
          type='email'
          placeholder='hello@example.com'
        />
      </FormField.Root>
    </div>
  ),
};

export const Disabled = {
  render: () => (
    <div className='w-[300px]'>
      <FormField.Root
        label='Email Address'
        htmlFor='disabled-email'
        required
        hint='This is a hint text to help user.'
        disabled
      >
        <Input.Composed
          leadingIcon={RiMailLine}
          type='email'
          placeholder='hello@example.com'
        />
      </FormField.Root>
    </div>
  ),
};

export const CompoundMode = {
  render: () => (
    <div className='w-[300px]'>
      <FormField.Root htmlFor='compound-email' hasError>
        <FormField.Label required sub='Required' subParens>
          Email Address
        </FormField.Label>
        <Input.Root>
          <Input.Wrapper>
            <Input.Icon as={RiMailLine} />
            <Input.Input
              id='compound-email'
              type='email'
              placeholder='hello@example.com'
            />
          </Input.Wrapper>
        </Input.Root>
        <FormField.Error>Please enter a valid email address.</FormField.Error>
      </FormField.Root>
    </div>
  ),
};

const signUpSchema = z
  .object({
    fullName: z.string().min(2, 'Name must be at least 2 characters.'),
    email: z.string().email('Please enter a valid email address.'),
    role: z.string().min(1, 'Please select a role.'),
    password: z.string().min(8, 'Password must be at least 8 characters.'),
    confirmPassword: z.string(),
    bio: z
      .string()
      .max(200, 'Bio must be 200 characters or less.')
      .optional()
      .or(z.literal('')),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

function FormValidationRender() {
  const methods = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: SignUpFormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex w-[360px] flex-col gap-5'
        noValidate
      >
        <FormField.Root
          name='fullName'
          label='Full Name'
          required
          hint='Your first and last name.'
        >
          <Input.Composed
            leadingIcon={RiUser6Line}
            placeholder='John Doe'
            {...register('fullName')}
          />
        </FormField.Root>

        <FormField.Root
          name='email'
          label='Email Address'
          required
          hint="We'll never share your email."
        >
          <Input.Composed
            leadingIcon={RiMailLine}
            type='email'
            placeholder='hello@example.com'
            {...register('email')}
          />
        </FormField.Root>

        <Controller
          control={control}
          name='role'
          render={({ field }) => (
            <FormField.Root name='role' label='Role' required>
              <Select.Root value={field.value} onValueChange={field.onChange}>
                <Select.Trigger>
                  <Select.Value placeholder='Select a role...' />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value='developer'>Developer</Select.Item>
                  <Select.Item value='designer'>Designer</Select.Item>
                  <Select.Item value='manager'>Manager</Select.Item>
                  <Select.Item value='other'>Other</Select.Item>
                </Select.Content>
              </Select.Root>
            </FormField.Root>
          )}
        />

        <FormField.Root
          name='password'
          label='Password'
          required
          hint='Minimum 8 characters.'
        >
          <PasswordInput.Root {...register('password')} />
        </FormField.Root>

        <FormField.Root
          name='confirmPassword'
          label='Confirm Password'
          required
        >
          <PasswordInput.Root {...register('confirmPassword')} />
        </FormField.Root>

        <FormField.Root
          name='bio'
          label='Bio'
          labelSub='Optional'
          labelSubParens
          hint='Tell us a bit about yourself.'
        >
          <Textarea.Root
            simple
            placeholder='A few words about you...'
            {...register('bio')}
          />
        </FormField.Root>

        <Button.Root type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Create Account'}
        </Button.Root>
      </form>
    </FormProvider>
  );
}

export const FormValidation = {
  render: () => <FormValidationRender />,
};
