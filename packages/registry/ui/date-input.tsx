'use client';

import * as React from 'react';
import { RiCalendarLine } from '@remixicon/react';
import { format } from 'date-fns';

import { Calendar, type CalendarProps } from '@/components/ui/datepicker';
import * as Input from '@/components/ui/input';
import * as Popover from '@/components/ui/popover';
import { useFormField } from '@/lib/form-field-context';
import type { VariantProps } from '@/lib/tv';
import { inputVariants } from '@/components/ui/input';

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
  disabled = false,
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

  const handleSelect = React.useCallback(
    (selected: Date | undefined) => {
      if (value === undefined) {
        setInternalDate(selected);
      }
      onChange?.(selected);
      setOpen(false);
    },
    [value, onChange]
  );

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild disabled={disabled}>
        <div>
          <Input.Composed
            readOnly
            leadingIcon={LeadingIcon}
            value={date ? format(date, formatStr) : ''}
            placeholder={placeholder}
            size={size}
            hasError={resolvedHasError}
            className='cursor-pointer'
          />
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
