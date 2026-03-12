'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { type DateRange } from 'react-day-picker';

import * as Button from './button';
import * as Datepicker from './datepicker';
import * as FormField from './form-field';
import * as Popover from './popover';

export default { title: 'Form/Datepicker', component: Datepicker.Calendar };

export const Playground = {
  args: {
    showOutsideDays: true,
  },
  argTypes: {
    showOutsideDays: { control: 'boolean' },
  },
  render: (args: any) => {
    const [date, setDate] = React.useState<Date | undefined>(undefined);

    return (
      <Datepicker.Calendar
        mode='single'
        selected={date}
        onSelect={setDate}
        showOutsideDays={args.showOutsideDays}
      />
    );
  },
};

export const Demo = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(undefined);

    return (
      <Datepicker.Calendar mode='single' selected={date} onSelect={setDate} />
    );
  },
};

export const PopoverDemo = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(undefined);

    const handleSelect = (value: Date | undefined) => {
      setDate(value);
      setOpen(false);
    };

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <Button.Root variant='neutral' mode='stroke'>
            {date ? format(date, 'LLL dd, y') : 'Select a date'}
          </Button.Root>
        </Popover.Trigger>
        <Popover.Content className='p-0' showArrow={false}>
          <Datepicker.Calendar
            mode='single'
            selected={date}
            onSelect={handleSelect}
          />
        </Popover.Content>
      </Popover.Root>
    );
  },
};

export const ApprovalDemo = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const [tempDate, setTempDate] = React.useState<Date | undefined>(
      undefined,
    );

    const handleOpenChange = (isOpen: boolean) => {
      if (isOpen) {
        setTempDate(date);
      } else {
        setTempDate(date);
      }
      setOpen(isOpen);
    };

    const handleCancel = () => {
      setTempDate(date);
    };

    const handleApply = () => {
      setDate(tempDate);
    };

    return (
      <Popover.Root open={open} onOpenChange={handleOpenChange}>
        <Popover.Trigger asChild>
          <Button.Root variant='neutral' mode='stroke'>
            {date ? format(date, 'LLL dd, y') : 'Select a date'}
          </Button.Root>
        </Popover.Trigger>
        <Popover.Content className='p-0' showArrow={false}>
          <Datepicker.Calendar
            mode='single'
            selected={tempDate}
            onSelect={setTempDate}
          />
          <div className='flex items-center justify-between gap-4 border-t border-stroke-soft-200 p-4 py-5'>
            <Popover.Close unstyled asChild>
              <Button.Root
                variant='neutral'
                mode='stroke'
                size='small'
                className='w-full'
                onClick={handleCancel}
              >
                Cancel
              </Button.Root>
            </Popover.Close>
            <Popover.Close unstyled asChild>
              <Button.Root
                variant='primary'
                mode='filled'
                size='small'
                className='w-full'
                onClick={handleApply}
              >
                Apply
              </Button.Root>
            </Popover.Close>
          </div>
        </Popover.Content>
      </Popover.Root>
    );
  },
};

export const RangeDemo = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [range, setRange] = React.useState<DateRange | undefined>(undefined);

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <Button.Root variant='neutral' mode='stroke'>
            {range?.from ? (
              <>
                {format(range.from, 'LLL dd, y')}
                {range.to && <> - {format(range.to, 'LLL dd, y')}</>}
              </>
            ) : (
              <span>Select a range</span>
            )}
          </Button.Root>
        </Popover.Trigger>
        <Popover.Content className='p-0' showArrow={false}>
          <Datepicker.Calendar
            mode='range'
            selected={range}
            onSelect={setRange}
          />
        </Popover.Content>
      </Popover.Root>
    );
  },
};

export const WithFormField = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(undefined);

    return (
      <FormField.Root
        label='Date of Birth'
        required
        hint='Select your date of birth.'
      >
        <Datepicker.Calendar mode='single' selected={date} onSelect={setDate} />
      </FormField.Root>
    );
  },
};
