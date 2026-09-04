'use client';

import * as React from 'react';
import { RiCalendarLine } from '@remixicon/react';
import { format } from 'date-fns';

import { Calendar, type CalendarProps } from './datepicker';
import * as Input from './input';
import * as Popover from './popover';
import { useFormField } from '../lib/form-field-context';
import type { VariantProps } from '../lib/tv';
import { inputVariants } from './input';

type InputVariants = VariantProps<typeof inputVariants>;

type DateInputProps = {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  formatStr?: string;
  calendarProps?: Omit<CalendarProps, 'mode' | 'selected' | 'onSelect'>;
  size?: InputVariants['size'];
  hasError?: InputVariants['hasError'];
  leadingIcon?: React.ElementType;
  popoverAlign?: 'start' | 'center' | 'end';
  popoverSide?: 'top' | 'right' | 'bottom' | 'left';
};

function DateInput({
  value,
  defaultValue,
  onChange,
  placeholder = 'Select a date',
  disabled,
  formatStr = 'LLL dd, y',
  calendarProps,
  size,
  hasError,
  leadingIcon: LeadingIcon = RiCalendarLine,
  popoverAlign = 'start',
  popoverSide,
}: DateInputProps) {
  const [open, setOpen] = React.useState(false);
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    defaultValue
  );

  const date = value ?? internalDate;

  const formField = useFormField();
  const resolvedHasError = hasError ?? formField.hasError;
  const resolvedDisabled = disabled ?? formField.disabled ?? false;

  const handleSelect: NonNullable<
    Extract<CalendarProps, { mode: 'single' }>['onSelect']
  > = React.useCallback(
    (selected) => {
      if (value === undefined) {
        setInternalDate(selected);
      }
      onChange?.(selected);
      setOpen(false);
    },
    [value, onChange]
  );

  return (
    // `disabled` gates the popover state directly: the Trigger is a div
    // (asChild), which ignores the `disabled` attribute — clicks on it would
    // still open the popover even though the inner input is disabled.
    <Popover.Root
      open={!resolvedDisabled && open}
      onOpenChange={(next) => {
        if (resolvedDisabled) return;
        setOpen(next);
      }}
    >
      <Popover.Trigger asChild disabled={resolvedDisabled}>
        <div>
          <Input.Root size={size} hasError={resolvedHasError}>
            <Input.Wrapper className='cursor-pointer'>
              <Input.Icon as={LeadingIcon} />
              <Input.Input
                readOnly
                disabled={resolvedDisabled}
                value={date ? format(date, formatStr) : ''}
                placeholder={placeholder}
                className='cursor-pointer'
              />
            </Input.Wrapper>
          </Input.Root>
        </div>
      </Popover.Trigger>
      <Popover.Content
        align={popoverAlign}
        side={popoverSide}
        className='p-0'
        showArrow={false}
      >
        <Calendar
          mode='single'
          selected={date}
          defaultMonth={date}
          onSelect={handleSelect}
          {...calendarProps}
        />
      </Popover.Content>
    </Popover.Root>
  );
}
DateInput.displayName = 'DateInput';

export { DateInput as Root, type DateInputProps };
