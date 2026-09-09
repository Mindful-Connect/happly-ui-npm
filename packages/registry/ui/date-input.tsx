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
  const inputRef = React.useRef<HTMLInputElement>(null);
  // Set when the popover closes because the user interacted with something
  // outside it (see `onCloseAutoFocus` below).
  const closedByOutsideInteraction = React.useRef(false);

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
        if (next) closedByOutsideInteraction.current = false;
        setOpen(next);
      }}
    >
      <Popover.Trigger asChild disabled={resolvedDisabled}>
        <div>
          <Input.Root size={size} hasError={resolvedHasError}>
            <Input.Wrapper className='cursor-pointer'>
              <Input.Icon as={LeadingIcon} />
              <Input.Input
                ref={inputRef}
                readOnly
                disabled={resolvedDisabled}
                value={date ? format(date, formatStr) : ''}
                placeholder={placeholder}
                className='cursor-pointer tabular-nums'
                // The Trigger is a div, so it takes clicks but no keyboard.
                // The input is the field's only tab stop — it has to open the
                // calendar too, and announce that it opens one.
                aria-haspopup='dialog'
                aria-expanded={open}
                onKeyDown={(event) => {
                  if (resolvedDisabled) return;
                  if (
                    event.key === 'Enter' ||
                    event.key === ' ' ||
                    event.key === 'ArrowDown'
                  ) {
                    event.preventDefault();
                    setOpen(true);
                  }
                }}
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
        onInteractOutside={() => {
          closedByOutsideInteraction.current = true;
        }}
        // Radix returns focus to the Trigger, which is a non-focusable div —
        // focus would fall back to <body>. Send it to the field instead.
        //
        // Except when the close came from an interaction outside the popover:
        // that click already put focus where the user asked for it (a textarea
        // further down the form), and the exit animation means this fires
        // ~150ms later — long enough to read as the page yanking focus back.
        // Radix's own handler skips the trigger refocus in that case, so
        // leaving the event alone keeps the focus the user chose.
        onCloseAutoFocus={(event) => {
          if (closedByOutsideInteraction.current) {
            closedByOutsideInteraction.current = false;
            return;
          }
          event.preventDefault();
          inputRef.current?.focus();
        }}
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
