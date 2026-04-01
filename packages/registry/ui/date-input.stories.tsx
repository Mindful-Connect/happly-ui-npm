'use client';

import * as React from 'react';

import * as DateInput from './date-input';
import * as FormField from './form-field';

export default { title: 'Form/Composed Inputs/Date Input', component: DateInput.Root };

function DefaultRender() {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return <DateInput.Root value={date} onChange={setDate} />;
}
export const Default = {
  render: () => <DefaultRender />,
};

function WithPlaceholderRender() {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <DateInput.Root
      value={date}
      onChange={setDate}
      placeholder='Pick a start date'
    />
  );
}
export const WithPlaceholder = {
  render: () => <WithPlaceholderRender />,
};

function CustomFormatRender() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <DateInput.Root
      value={date}
      onChange={setDate}
      formatStr='MM/dd/yyyy'
      placeholder='MM/DD/YYYY'
    />
  );
}
export const CustomFormat = {
  render: () => <CustomFormatRender />,
};

function SizesRender() {
  const [date1, setDate1] = React.useState<Date | undefined>(new Date());
  const [date2, setDate2] = React.useState<Date | undefined>(new Date());
  const [date3, setDate3] = React.useState<Date | undefined>(new Date());

  return (
    <div className='flex flex-col gap-4'>
      <div>
        <p className='text-label-sm text-text-sub-600 mb-2'>Medium (default)</p>
        <DateInput.Root size='medium' value={date1} onChange={setDate1} />
      </div>
      <div>
        <p className='text-label-sm text-text-sub-600 mb-2'>Small</p>
        <DateInput.Root size='small' value={date2} onChange={setDate2} />
      </div>
      <div>
        <p className='text-label-sm text-text-sub-600 mb-2'>XSmall</p>
        <DateInput.Root size='xsmall' value={date3} onChange={setDate3} />
      </div>
    </div>
  );
}
export const Sizes = {
  render: () => <SizesRender />,
};

function DisabledRender() {
  return <DateInput.Root disabled value={new Date()} placeholder='Disabled' />;
}
export const Disabled = {
  render: () => <DisabledRender />,
};

function ErrorStateRender() {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <DateInput.Root
      hasError
      value={date}
      onChange={setDate}
      placeholder='Invalid date'
    />
  );
}
export const ErrorState = {
  render: () => <ErrorStateRender />,
};

function WithFormFieldRender() {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <FormField.Root
      label='Start Date'
      required
      hint='When should this go live?'
    >
      <DateInput.Root value={date} onChange={setDate} />
    </FormField.Root>
  );
}
export const WithFormField = {
  render: () => <WithFormFieldRender />,
};

function UncontrolledRender() {
  return (
    <DateInput.Root
      defaultValue={new Date()}
      onChange={(d) => console.log('Selected:', d)}
    />
  );
}
export const Uncontrolled = {
  render: () => <UncontrolledRender />,
};

function PlaygroundRender(args: any) {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <DateInput.Root
      value={date}
      onChange={setDate}
      placeholder={args.placeholder}
      disabled={args.disabled}
      hasError={args.hasError}
      size={args.size}
      formatStr={args.formatStr}
    />
  );
}
export const Playground = {
  args: {
    placeholder: 'Select a date',
    disabled: false,
    hasError: false,
    size: 'medium',
    formatStr: 'LLL dd, y',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['medium', 'small', 'xsmall'],
    },
    disabled: { control: 'boolean' },
    hasError: { control: 'boolean' },
    placeholder: { control: 'text' },
    formatStr: { control: 'text' },
  },
  render: (args: any) => <PlaygroundRender {...args} />,
};
