'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCalendarEventLine, RiMailLine, RiUser6Line } from '@remixicon/react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import * as Button from './button';
import * as Checkbox from './checkbox';
import * as ComboBox from './combo-box';
import * as CurrencyInput from './currency-input';
import * as FormField from './form-field';
import * as Input from './input';
import * as MarkdownEditor from './markdown-editor';
import * as PasswordInput from './password-input';
import * as RadioCard from './radio-card';
import * as Select from './select';
import * as Switch from './switch';
import * as TagInput from './tag-input';
import * as Textarea from './textarea';

export default { title: 'Form/Form Field' };

// ─── Playground ──────────────────────────────────────────

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

// ─── Demo (standalone, no RHF) ───────────────────────────

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

// ─── Error / Disabled / Compound ─────────────────────────

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

// ─── Form Validation (auto-binding) ──────────────────────
//
// Demonstrates the recommended pattern for building forms with
// React Hook Form. Native inputs use register(), non-native
// components auto-bind through FormField.Root's `name` prop.
// No Controller, no watch/setValue wiring needed.

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
        {/* Native input — uses register() */}
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

        {/* Native input — uses register() */}
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

        {/* Select — auto-binds via FormField name, no Controller needed */}
        <FormField.Root name='role' label='Role' required>
          <Select.Root>
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

        {/* Native input — uses register() */}
        <FormField.Root
          name='password'
          label='Password'
          required
          hint='Minimum 8 characters.'
        >
          <PasswordInput.Root {...register('password')} />
        </FormField.Root>

        {/* Native input — uses register() */}
        <FormField.Root
          name='confirmPassword'
          label='Confirm Password'
          required
        >
          <PasswordInput.Root {...register('confirmPassword')} />
        </FormField.Root>

        {/* Native textarea — uses register() */}
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

// ─── Auto-Binding Showcase ───────────────────────────────
//
// A comprehensive form demonstrating auto-binding across every
// non-native input component. Each component binds to RHF
// automatically through the FormField.Root `name` prop —
// no watch(), setValue(), or Controller wiring needed.

const INDUSTRY_OPTIONS = [
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Finance' },
  { value: 'education', label: 'Education' },
  { value: 'retail', label: 'Retail' },
];

const PRIORITY_OPTIONS = ['low', 'medium', 'high', 'critical'] as const;

const showcaseSchema = z.object({
  // Native inputs (register)
  name: z.string().min(2, 'Name is required.'),
  foundedYear: z.coerce.number().min(1900).max(new Date().getFullYear()),
  // Select (auto-bind)
  category: z.string().min(1, 'Please select a category.'),
  // RadioCard (auto-bind)
  priority: z.string().min(1, 'Please select a priority.'),
  // ComboBox (auto-bind)
  industries: z.array(z.string()).min(1, 'Select at least one industry.'),
  // TagInput (auto-bind)
  keywords: z.array(z.string()),
  // CurrencyInput (auto-bind)
  budget: z.coerce.number().min(0).optional(),
  budgetCurrency: z.string(),
  // Switch (auto-bind)
  isPublic: z.boolean(),
  // Checkbox (auto-bind)
  termsAccepted: z.boolean().refine((v) => v, 'You must accept the terms.'),
  // MarkdownEditor single-lang (auto-bind)
  notes: z.string().optional(),
  // MarkdownEditor multi-lang (auto-bind via name override)
  description: z.object({
    en: z.string().min(1, 'English description is required.'),
    fr: z.string().optional(),
  }),
});

type ShowcaseFormValues = z.infer<typeof showcaseSchema>;

function AutoBindingShowcaseRender() {
  const methods = useForm<ShowcaseFormValues>({
    resolver: zodResolver(showcaseSchema),
    mode: 'onTouched',
    defaultValues: {
      industries: [],
      keywords: [],
      budgetCurrency: 'CAD',
      isPublic: false,
      termsAccepted: false,
      description: { en: '', fr: '' },
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: ShowcaseFormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex w-[480px] flex-col gap-6'
        noValidate
      >
        <h3 className='text-label-md text-text-strong-950'>
          Auto-Binding Showcase
        </h3>
        <p className='text-paragraph-sm text-text-sub-600 -mt-4'>
          Every non-native component below auto-binds to React Hook Form through{' '}
          <code className='bg-bg-weak-50 text-paragraph-xs rounded px-1 py-0.5'>
            FormField.Root name=&quot;...&quot;
          </code>
          . No Controller, watch, or setValue needed.
        </p>

        {/* ── Native inputs: use register() ──────────────── */}

        <FormField.Root name='name' label='Project Name' required>
          <Input.Composed
            leadingIcon={RiUser6Line}
            placeholder='My Project'
            {...register('name')}
          />
        </FormField.Root>

        <FormField.Root name='foundedYear' label='Founded Year' required>
          <Input.Composed
            leadingIcon={RiCalendarEventLine}
            type='number'
            placeholder='2024'
            {...register('foundedYear', { valueAsNumber: true })}
          />
        </FormField.Root>

        {/* ── Select: auto-binds ─────────────────────────── */}

        <FormField.Root name='category' label='Category' required>
          <Select.Root>
            <Select.Trigger>
              <Select.Value placeholder='Select a category...' />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value='startup'>Startup</Select.Item>
              <Select.Item value='enterprise'>Enterprise</Select.Item>
              <Select.Item value='nonprofit'>Non-profit</Select.Item>
              <Select.Item value='government'>Government</Select.Item>
            </Select.Content>
          </Select.Root>
        </FormField.Root>

        {/* ── RadioCard: auto-binds ──────────────────────── */}

        <FormField.Root name='priority' label='Priority' required>
          <RadioCard.Root className='grid grid-cols-2 gap-2'>
            {PRIORITY_OPTIONS.map((option) => (
              <RadioCard.Composed
                key={option}
                value={option}
                title={option.charAt(0).toUpperCase() + option.slice(1)}
              />
            ))}
          </RadioCard.Root>
        </FormField.Root>

        {/* ── ComboBox: auto-binds ───────────────────────── */}

        <FormField.Root name='industries' label='Industries' required>
          <ComboBox.Composed
            options={INDUSTRY_OPTIONS}
            placeholder='Search industries...'
            min={1}
          />
        </FormField.Root>

        {/* ── TagInput: auto-binds ───────────────────────── */}

        <FormField.Root
          name='keywords'
          label='Keywords'
          hint='Press Enter to add a tag.'
        >
          <TagInput.Root placeholder='Add keyword...' />
        </FormField.Root>

        {/* ── CurrencyInput: auto-binds with currencyName ── */}

        <FormField.Root
          name='budget'
          label='Budget'
          labelSub='Optional'
          labelSubParens
        >
          <CurrencyInput.Root
            currencyName='budgetCurrency'
            placeholder='0.00'
          />
        </FormField.Root>

        {/* ── Switch: auto-binds ─────────────────────────── */}

        <FormField.Root name='isPublic'>
          <div className='flex items-center justify-between'>
            <div>
              <div className='text-label-sm text-text-strong-950'>
                Public project
              </div>
              <div className='text-paragraph-xs text-text-sub-600'>
                Make this project visible to everyone.
              </div>
            </div>
            <Switch.Root />
          </div>
        </FormField.Root>

        {/* ── MarkdownEditor single-lang: auto-binds ─────── */}

        <FormField.Root
          name='notes'
          label='Internal Notes'
          labelSub='Optional'
          labelSubParens
        >
          <MarkdownEditor.Composed
            toggleItems={false}
            placeholder='Add any notes...'
            height='120px'
          />
        </FormField.Root>

        {/* ── MarkdownEditor multi-lang: name override ───── */}

        <FormField.Root
          name='description.en'
          label='Description'
          required
          hint='Available in English and French.'
        >
          <MarkdownEditor.Composed
            name='description'
            placeholder='Describe the project...'
            height='150px'
          />
        </FormField.Root>

        {/* ── Checkbox: auto-binds ───────────────────────── */}

        <FormField.Root name='termsAccepted'>
          <div className='flex items-center gap-2'>
            <Checkbox.Root />
            <span className='text-paragraph-sm text-text-strong-950'>
              I accept the terms and conditions
            </span>
          </div>
        </FormField.Root>

        <Button.Root type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button.Root>
      </form>
    </FormProvider>
  );
}

export const AutoBindingShowcase = {
  render: () => <AutoBindingShowcaseRender />,
  parameters: {
    docs: {
      description: {
        story: `
**How auto-binding works:**

1. Wrap your form in \`FormProvider\` from react-hook-form
2. Give each \`FormField.Root\` a \`name\` matching your schema
3. Components inside auto-bind — no \`Controller\`, \`watch()\`, or \`setValue()\` needed

**Native inputs** (\`Input\`, \`Textarea\`, \`PasswordInput\`) still use \`register()\` since they render native \`<input>\`/\`<textarea>\` elements.

**Non-native components** (\`Select\`, \`RadioCard\`, \`ComboBox\`, \`TagInput\`, \`CurrencyInput\`, \`Switch\`, \`Checkbox\`, \`Slider\`, \`MarkdownEditor\`, etc.) auto-bind through \`FormField.Root\`'s \`name\` prop.

**Dual-field components** like \`CurrencyInput\` and \`PhoneInput\` accept a secondary name prop (\`currencyName\`, \`countryName\`) to bind the second field.

**MarkdownEditor** in multi-lang mode accepts a \`name\` prop to override the FormField context name, allowing error display on \`description.en\` while binding to the parent \`description\` object.

**Priority:** Explicit props always win. If you pass \`value\`/\`onValueChange\` directly, auto-binding is skipped.
        `,
      },
    },
  },
};
