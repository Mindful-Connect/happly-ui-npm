'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiMailLine, RiUser6Line } from '@remixicon/react';
import { Controller, useForm } from 'react-hook-form';
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
          id='playground-email'
          leadingIcon={RiMailLine}
          type='email'
          placeholder={args.placeholder}
          hasError={!!args.error}
          disabled={args.disabled}
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
          id='error-email'
          leadingIcon={RiMailLine}
          type='email'
          placeholder='hello@example.com'
          hasError
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
          id='disabled-email'
          leadingIcon={RiMailLine}
          type='email'
          placeholder='hello@example.com'
          disabled
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
        <Input.Root hasError>
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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
  });

  const onSubmit = (data: SignUpFormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex w-[360px] flex-col gap-5'
      noValidate
    >
      <FormField.Root
        label='Full Name'
        htmlFor='signup-name'
        required
        hint='Your first and last name.'
        error={errors.fullName?.message}
      >
        <Input.Composed
          id='signup-name'
          leadingIcon={RiUser6Line}
          placeholder='John Doe'
          hasError={!!errors.fullName}
          {...register('fullName')}
        />
      </FormField.Root>

      <FormField.Root
        label='Email Address'
        htmlFor='signup-email'
        required
        hint="We'll never share your email."
        error={errors.email?.message}
      >
        <Input.Composed
          id='signup-email'
          leadingIcon={RiMailLine}
          type='email'
          placeholder='hello@example.com'
          hasError={!!errors.email}
          {...register('email')}
        />
      </FormField.Root>

      <Controller
        control={control}
        name='role'
        render={({ field }) => (
          <FormField.Root
            label='Role'
            htmlFor='signup-role'
            required
            error={errors.role?.message}
          >
            <Select.Root
              value={field.value}
              onValueChange={field.onChange}
              hasError={!!errors.role}
            >
              <Select.Trigger id='signup-role'>
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
        label='Password'
        htmlFor='signup-password'
        required
        hint='Minimum 8 characters.'
        error={errors.password?.message}
      >
        <PasswordInput.Root
          id='signup-password'
          hasError={!!errors.password}
          {...register('password')}
        />
      </FormField.Root>

      <FormField.Root
        label='Confirm Password'
        htmlFor='signup-confirm'
        required
        error={errors.confirmPassword?.message}
      >
        <PasswordInput.Root
          id='signup-confirm'
          hasError={!!errors.confirmPassword}
          {...register('confirmPassword')}
        />
      </FormField.Root>

      <FormField.Root
        label='Bio'
        htmlFor='signup-bio'
        labelSub='Optional'
        labelSubParens
        hint='Tell us a bit about yourself.'
        error={errors.bio?.message}
      >
        <Textarea.Root
          id='signup-bio'
          simple
          placeholder='A few words about you...'
          hasError={!!errors.bio}
          {...register('bio')}
        />
      </FormField.Root>

      <Button.Root type='submit' disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Create Account'}
      </Button.Root>
    </form>
  );
}

export const FormValidation = {
  render: () => <FormValidationRender />,
};
