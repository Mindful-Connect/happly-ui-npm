'use client';

import {
  Button,
  compactButtonVariants,
  type Variant as ButtonVariant,
} from './button';
import { cn } from '@/lib/happly-ui-utils';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  type LucideProps,
} from 'lucide-react';
import * as React from 'react';
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker';
import './datepicker.css';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: ButtonVariant;
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'datepicker-ds group/calendar bg-background p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date: Date) =>
          date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        day: cn('min-w-[42px]'),
        years_dropdown: cn(
          defaultClassNames.years_dropdown,
          'thin-scrollbar-gray min-w-[92px]'
        ),
        root: cn('w-fit', defaultClassNames.root),
        months: cn(
          'flex gap-4 flex-col md:flex-row relative min-w-[80px]',
          defaultClassNames.months
        ),
        months_dropdown: cn(
          defaultClassNames.months_dropdown,
          'thin-scrollbar-gray min-w-[82px] transition-all duration-75'
        ),
        month: cn('flex flex-col w-full gap-4', defaultClassNames.month),
        caption: cn(
          'flex justify-between items-center relative rounded-lg h-9 bg-ds-weak-50 px-3'
        ),
        nav: cn('absolute inset-0 w-full top-1', defaultClassNames.nav),
        button_previous: cn(
          compactButtonVariants({ variant: 'ghost', size: 'large' }),
          'p-0 select-none aria-disabled:opacity-50',
          'absolute left-1.5',
          defaultClassNames.button_previous
        ),
        button_next: cn(
          compactButtonVariants({ variant: 'ghost', size: 'large' }),
          'p-0 select-none aria-disabled:opacity-50',
          'absolute right-1.5',
          defaultClassNames.button_next
        ),
        month_caption: cn(
          'flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)',
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          'flex items-center text-label-sm font-medium justify-center h-(--cell-size) gap-2',
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          defaultClassNames.dropdown_root,
          'relative cursor-pointer hover:border-ds-neutral-300 has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md shrink-0 flex grow justify-between min-w-[82px]'
        ),
        dropdown: cn(defaultClassNames.dropdown, 'absolute inset-0 opacity-0'),
        caption_label: cn(
          defaultClassNames.caption_label,
          'select-none font-medium',
          captionLayout === 'label'
            ? 'text-sm'
            : 'rounded-8 w-full pl-3 pr-2.5 flex items-center justify-between grow gap-2 text-label-sm h-8 [&>svg]:text-muted-foreground [&>svg]:w-3.5 [&>svg]:h-3.5'
        ),
        table: 'w-full border-collapse',
        // --- Weekday Names Caps and Gaps ---
        weekdays: cn('flex gap-1', defaultClassNames.weekdays), // Gap for weekday names (cols)
        weekday: cn(
          'text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none uppercase', // Added uppercase
          defaultClassNames.weekday
        ),
        week: cn('flex w-full mt-1 gap-1', defaultClassNames.week), // Gap between days in a week (cols)
        // --- End Weekday Names Caps and Gaps ---

        week_number_header: cn(
          'select-none w-(--cell-size)',
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          'text-[0.8rem] select-none text-muted-foreground',
          defaultClassNames.week_number
        ),
        // CUSTOM overrides from your previous snippet.
        // Ensure these are placed AFTER defaultClassNames to take precedence.
        head_row: 'flex gap-1', // Ensure gap-2 for weekday headers
        head_cell:
          'text-ds-soft-400 text-label-sm uppercase h-10 w-10 flex items-center justify-center text-center select-none',
        row: 'grid grid-flow-col auto-cols-auto w-full mt-1 gap-1', // This handles gaps between cells within a row (cols)

        // --- Font Color for Days Outside Current Month ---
        day_outside: cn(
          // Use !important to ensure it overrides other styles if necessary
          '!text-ds-disabled-300 aria-[selected]:!text-ds-static-white', // Changed from text-muted-foreground
          defaultClassNames.outside
        ),
        // --- End Font Color ---
        range_start: cn(
          'rounded-l-md bg-accent',
          defaultClassNames.range_start
        ),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn('rounded-r-md bg-accent', defaultClassNames.range_end),
        today: cn(
          'bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none',
          defaultClassNames.today
        ),
        disabled: cn(
          'text-muted-foreground opacity-50',
          defaultClassNames.disabled
        ),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({
          className,
          rootRef,
          ...props
        }: React.HTMLAttributes<HTMLDivElement> & {
          rootRef?: React.Ref<HTMLDivElement>;
        }) => {
          return (
            <div
              data-slot='calendar'
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        Chevron: ({
          className,
          orientation,
          ...props
        }: LucideProps & {
          orientation?: 'left' | 'right' | 'up' | 'down';
        }) => {
          if (orientation === 'left') {
            return (
              <ChevronLeftIcon className={cn('size-4', className)} {...props} />
            );
          }

          if (orientation === 'right') {
            return (
              <ChevronRightIcon
                className={cn('size-4', className)}
                {...props}
              />
            );
          }

          return (
            <ChevronDownIcon className={cn('size-4', className)} {...props} />
          );
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({
          children,
          ...props
        }: React.TdHTMLAttributes<HTMLTableCellElement>) => {
          return (
            <td {...props}>
              <div className='flex size-(--cell-size) items-center justify-center text-center'>
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant='neutral'
      mode='ghost'
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        // 'aspect-square size-auto min-w-(--cell-size) flex w-full flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-start=true]:rounded-l-md data-[range-end=true]:bg-primary data-[range-middle=true]:bg-accent data-[range-start=true]:bg-primary data-[selected-single=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:text-accent-foreground data-[range-start=true]:text-primary-foreground data-[selected-single=true]:text-primary-foreground group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground [&>span]:text-xs [&>span]:opacity-70',
        'flex aspect-square h-10 w-10 shrink-0 items-center justify-center p-0 text-center data-[selected-single=true]:bg-ds-primary-base data-[selected-single=true]:text-primary-foreground hover:data-[selected-single=true]:bg-ds-primary-base hover:data-[selected-single=true]:text-primary-foreground',
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
