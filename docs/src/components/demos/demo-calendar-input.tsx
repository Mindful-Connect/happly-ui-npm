import * as React from 'react';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker';
import { Popover, Transition } from '@headlessui/react';
import { enCA, frCA } from 'react-day-picker/locale';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

// =============================================================================
// CSS (Inline for Demo)
// =============================================================================
const styles = `
.datepicker-ds select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>');
  background-repeat: no-repeat;
  background-position: right 2px center;
  background-size: 16px;
  padding-right: 20px;
}

.datepicker-ds .rdp-dropdown_year,
.datepicker-ds .rdp-dropdown_month {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
  z-index: 10;
}

/* Thin Scrollbar for Dropdowns */
.thin-scrollbar-gray::-webkit-scrollbar {
  width: 6px;
}

.thin-scrollbar-gray::-webkit-scrollbar-track {
  background: transparent;
}

.thin-scrollbar-gray::-webkit-scrollbar-thumb {
  background-color: var(--color-neutral-200, #e5e7eb);
  border-radius: 20px;
}

.thin-scrollbar-gray::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-neutral-300, #d1d5db);
}

.datepicker-ds .rdp-caption_label {
  z-index: 5;
  position: relative;
  pointer-events: none;
}
`;

// =============================================================================
// BUTTON COMPONENT (Ported & Adapted for Demo using cva)
// =============================================================================

// Root variants (simplified from tv slots)
const buttonRootVariants = cva(
  [
    'group relative inline-flex items-center justify-center whitespace-nowrap outline-none',
    'transition duration-200 ease-out',
    'font-medium text-sm leading-none tracking-[-0.006em]',
    'focus:outline-none focus:ring-0',
    'disabled:pointer-events-none disabled:bg-bg-weak-50 disabled:text-text-disabled-300 disabled:ring-transparent',
  ],
  {
    variants: {
      variant: {
        primary: {},
        neutral: {},
        error: {},
      },
      mode: {
        filled: {},
        stroke: 'ring-1 ring-inset',
        lighter: 'ring-1 ring-inset',
        ghost: 'ring-1 ring-inset',
      },
      size: {
        large: 'h-11 gap-4 rounded-xl px-4',
        medium: 'h-10 gap-3 rounded-xl px-3.5',
        small: 'h-9 gap-3 rounded-lg px-3',
        xsmall: 'h-8 gap-2.5 rounded-lg px-2.5',
        xxsmall: 'h-7 gap-2.5 rounded-lg px-2',
      },
      iconOnly: {
        true: 'px-0',
      },
    },
    compoundVariants: [
      { iconOnly: true, size: 'medium', class: 'w-10' },
      { iconOnly: true, size: 'small', class: 'w-9' },
      { iconOnly: true, size: 'xsmall', class: 'w-8' },
      { iconOnly: true, size: 'xxsmall', class: 'w-7' },

      // Primary
      {
        variant: 'primary',
        mode: 'filled',
        class:
          'bg-primary-base text-static-white hover:bg-primary-darker focus-visible:shadow-button-primary-focus',
      },
      {
        variant: 'primary',
        mode: 'stroke',
        class:
          'bg-bg-white-0 text-primary-base ring-primary-base hover:bg-primary-alpha-10 hover:ring-transparent focus-visible:shadow-button-primary-focus',
      },
      {
        variant: 'primary',
        mode: 'lighter',
        class:
          'bg-primary-alpha-10 text-primary-base ring-transparent hover:bg-bg-white-0 hover:ring-primary-base focus-visible:bg-bg-white-0 focus-visible:shadow-button-primary-focus focus-visible:ring-primary-base',
      },
      {
        variant: 'primary',
        mode: 'ghost',
        class:
          'bg-transparent text-primary-base ring-transparent hover:bg-primary-alpha-10 focus-visible:bg-bg-white-0 focus-visible:shadow-button-primary-focus focus-visible:ring-primary-base',
      },

      // Neutral
      {
        variant: 'neutral',
        mode: 'filled',
        class:
          'bg-bg-strong-950 text-text-white-0 hover:bg-bg-surface-800 focus-visible:shadow-button-important-focus',
      },
      {
        variant: 'neutral',
        mode: 'stroke',
        class:
          'bg-bg-white-0 text-text-sub-600 shadow-regular-xs ring-stroke-soft-200 hover:bg-bg-weak-50 hover:text-text-strong-950 hover:shadow-none hover:ring-transparent focus-visible:text-text-strong-950 focus-visible:shadow-button-important-focus focus-visible:ring-stroke-strong-950',
      },
      {
        variant: 'neutral',
        mode: 'lighter',
        class:
          'bg-bg-weak-50 text-text-sub-600 ring-transparent hover:bg-bg-white-0 hover:text-text-strong-950 hover:shadow-regular-xs hover:ring-stroke-soft-200 focus-visible:bg-bg-white-0 focus-visible:text-text-strong-950 focus-visible:shadow-button-important-focus focus-visible:ring-stroke-strong-950',
      },
      {
        variant: 'neutral',
        mode: 'ghost',
        class:
          'bg-transparent text-text-sub-600 ring-transparent hover:bg-bg-weak-50 hover:text-text-strong-950 focus-visible:bg-bg-white-0 focus-visible:text-text-strong-950 focus-visible:shadow-button-important-focus focus-visible:ring-stroke-strong-950',
      },

      // Error
      {
        variant: 'error',
        mode: 'filled',
        class:
          'bg-error-base text-static-white hover:bg-red-700 focus-visible:shadow-button-error-focus',
      },
      {
        variant: 'error',
        mode: 'stroke',
        class:
          'bg-bg-white-0 text-error-base ring-error-base hover:bg-red-alpha-10 hover:ring-transparent focus-visible:shadow-button-error-focus',
      },
      {
        variant: 'error',
        mode: 'lighter',
        class:
          'bg-red-alpha-10 text-error-base ring-transparent hover:bg-bg-white-0 hover:ring-error-base focus-visible:bg-bg-white-0 focus-visible:shadow-button-error-focus focus-visible:ring-error-base',
      },
      {
        variant: 'error',
        mode: 'ghost',
        class:
          'bg-transparent text-error-base ring-transparent hover:bg-red-alpha-10 focus-visible:bg-bg-white-0 focus-visible:shadow-button-error-focus focus-visible:ring-error-base',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      mode: 'filled',
      size: 'medium',
    },
  }
);

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonRootVariants>
>((props, ref) => {
  const { className, variant, mode, size, iconOnly, ...rest } = props;
  return (
    <button
      ref={ref}
      className={cn(
        buttonRootVariants({ variant, mode, size, iconOnly }),
        className
      )}
      {...rest}
    />
  );
});
Button.displayName = 'Button';

// Compact Button Variants
const compactButtonVariants = cva(
  [
    'relative flex shrink-0 items-center justify-center outline-none',
    'transition duration-200 ease-out [&>svg]:transition-all [&>svg]:duration-200 [&>svg]:ease-out',
    'disabled:pointer-events-none disabled:border-transparent disabled:bg-transparent disabled:text-ds-disabled-300 [&>svg]:disabled:text-ds-disabled-300 disabled:shadow-none',
  ],
  {
    variants: {
      variant: {
        stroke:
          'border border-ds-stroke-soft-200 bg-ds-white-0 text-ds-sub-600 shadow-regular-xs ' +
          'hover:border-transparent hover:bg-ds-weak-50 hover:text-ds-strong-950 hover:shadow-none ' +
          'focus-visible:border-transparent focus-visible:bg-ds-strong-950 focus-visible:text-ds-white-0',
        ghost:
          'bg-transparent text-ds-sub-600 ' +
          'hover:bg-ds-weak-50 hover:text-ds-strong-950 ' +
          'focus-visible:bg-ds-strong-950 focus-visible:text-ds-white-0',
        white:
          'bg-ds-white-0 text-ds-sub-600 shadow-regular-xs ' +
          'hover:bg-ds-weak-50 hover:text-ds-strong-950 ' +
          'focus-visible:bg-ds-strong-950 focus-visible:text-ds-white-0',
        modifiable: '',
      },
      size: {
        large: 'h-6 w-6',
        medium: 'h-5 w-5',
      },
      fullRadius: {
        true: 'rounded-full',
        false: 'rounded-md',
      },
    },
    defaultVariants: { variant: 'stroke', size: 'large', fullRadius: false },
  }
);

// =============================================================================
// DATEPICKER (Calendar) COMPONENT
// =============================================================================

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
        'data-[selected-single=true]:text-primary-foreground hover:data-[selected-single=true]:text-primary-foreground flex aspect-square h-10 w-10 shrink-0 items-center justify-center p-0 text-center data-[selected-single=true]:bg-ds-primary-base hover:data-[selected-single=true]:bg-ds-primary-base',
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
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
        formatMonthDropdown: (date) =>
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
        weekdays: cn('flex gap-1', defaultClassNames.weekdays),
        weekday: cn(
          'text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none uppercase',
          defaultClassNames.weekday
        ),
        week: cn('flex w-full mt-1 gap-1', defaultClassNames.week),
        week_number_header: cn(
          'select-none w-(--cell-size)',
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          'text-[0.8rem] select-none text-muted-foreground',
          defaultClassNames.week_number
        ),
        head_row: 'flex gap-1',
        head_cell:
          'text-ds-soft-400 text-label-sm uppercase h-10 w-10 flex items-center justify-center text-center select-none',
        row: 'grid grid-flow-col auto-cols-auto w-full mt-1 gap-1',
        day_outside: cn(
          '!text-ds-disabled-300 aria-[selected]:!text-ds-static-white',
          defaultClassNames.outside
        ),
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
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot='calendar'
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        Chevron: ({ className, orientation, ...props }) => {
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
        WeekNumber: ({ children, ...props }) => {
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

// =============================================================================
// CALENDAR INPUT COMPONENT
// =============================================================================

function CalendarInput({
  date,
  locale = 'en',
  placeholder,
  className,
  setDate,
}: {
  date: string | null;
  locale?: 'en' | 'fr';
  placeholder?: string;
  className?: string;
  setDate: (date: string | null) => void;
}) {
  return (
    <div className={cn('relative', className)}>
      <style>{styles}</style>
      <Popover as='div' className='relative'>
        {({ open }) => (
          <>
            <Popover.Button className='relative flex h-10 w-full items-center space-x-2 rounded-[10px] border border-ds-neutral-200 bg-white p-3 text-sm placeholder:text-[#575759] focus:border-ds-neutral-950 focus:ring-ds-neutral-950 focus:outline-none'>
              <CalendarIcon
                className={cn(
                  'size-4',
                  open ? 'fill-ds-neutral-950' : 'fill-ds-neutral-400'
                )}
              />
              {date ? (
                <span>
                  {new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                  })}
                </span>
              ) : (
                <span className='text-ds-neutral-400'>
                  {placeholder || 'Select date'}
                </span>
              )}
            </Popover.Button>

            <Transition
              as={React.Fragment}
              enter='transition ease-out duration-75'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Popover.Panel className='absolute z-10 mt-1'>
                {({ close }) => (
                  <Calendar
                    className='rounded-[16px] border border-[#e1e7ef] bg-white shadow'
                    mode='single'
                    showOutsideDays={false}
                    captionLayout='dropdown'
                    locale={
                      locale === 'en' ? enCA : locale === 'fr' ? frCA : enCA
                    }
                    defaultMonth={
                      date ? new Date(date + 'T00:00:00') : undefined
                    }
                    selected={date ? new Date(date + 'T00:00:00') : undefined}
                    onSelect={(value) => {
                      if (value instanceof Date) {
                        const [month, day, year] = value
                          .toLocaleDateString('en-US')
                          .split('/');
                        const valueToStore = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                        setDate(valueToStore);
                        close();
                      }
                    }}
                  />
                )}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

// =============================================================================
// DEMO WRAPPER
// =============================================================================

export function DemoCalendarInput() {
  const [date, setDate] = React.useState<string | null>(null);

  return (
    <div className='flex w-full items-center justify-center p-8'>
      <div className='w-full max-w-sm'>
        <CalendarInput
          date={date}
          setDate={setDate}
          placeholder='Pick a date'
        />
      </div>
    </div>
  );
}

const CalendarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width='19'
      height='20'
      viewBox='0 0 19 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M12.6667 18.5106H6.33333C3.44375 18.5106 1.78125 16.8481 1.78125 13.9585V7.22933C1.78125 4.33975 3.44375 2.67725 6.33333 2.67725H12.6667C15.5563 2.67725 17.2188 4.33975 17.2188 7.22933V13.9585C17.2188 16.8481 15.5563 18.5106 12.6667 18.5106ZM6.33333 3.86475C4.06917 3.86475 2.96875 4.96516 2.96875 7.22933V13.9585C2.96875 16.2227 4.06917 17.3231 6.33333 17.3231H12.6667C14.9308 17.3231 16.0312 16.2227 16.0312 13.9585V7.22933C16.0312 4.96516 14.9308 3.86475 12.6667 3.86475H6.33333Z' />
      <path d='M16.2298 8.29004H2.77148C2.61433 8.289 2.46391 8.22611 2.35279 8.11499C2.24166 8.00386 2.17877 7.85344 2.17773 7.69629C2.17877 7.53914 2.24166 7.38872 2.35279 7.27759C2.46391 7.16647 2.61433 7.10358 2.77148 7.10254H16.2298C16.387 7.10358 16.5374 7.16647 16.6485 7.27759C16.7596 7.38872 16.8225 7.53914 16.8236 7.69629C16.8225 7.85344 16.7596 8.00386 16.6485 8.11499C16.5374 8.22611 16.387 8.289 16.2298 8.29004Z' />
      <path d='M12.2702 14.7496C12.0606 14.7465 11.8599 14.6645 11.7081 14.52C11.6348 14.4457 11.5782 14.3566 11.5418 14.2588C11.5013 14.1636 11.4798 14.0614 11.4785 13.9579C11.4799 13.8547 11.5014 13.7528 11.5418 13.6579C11.5782 13.56 11.6348 13.471 11.7081 13.3966C11.8003 13.3054 11.9134 13.2381 12.0377 13.2009C12.1619 13.1636 12.2934 13.1574 12.4206 13.1829C12.473 13.1902 12.5239 13.2063 12.571 13.2304C12.6215 13.2477 12.6694 13.2717 12.7135 13.3016C12.755 13.3309 12.7947 13.3626 12.8323 13.3966C12.9766 13.5482 13.0586 13.7486 13.0618 13.9579C13.0588 14.1675 12.9768 14.3682 12.8323 14.52C12.6805 14.6645 12.4798 14.7465 12.2702 14.7496Z' />
      <path d='M9.50065 14.7504C9.2914 14.748 9.09073 14.6668 8.93857 14.5232C8.79348 14.3708 8.71146 14.1691 8.70898 13.9587C8.71024 13.8553 8.73175 13.7531 8.77232 13.6579C8.80875 13.5603 8.86541 13.4716 8.93857 13.3974C9.09167 13.2562 9.29234 13.1777 9.50065 13.1777C9.70896 13.1777 9.90964 13.2562 10.0627 13.3974C10.136 13.4718 10.1926 13.5608 10.229 13.6587C10.2694 13.7536 10.291 13.8555 10.2923 13.9587C10.2892 14.1683 10.2073 14.369 10.0627 14.5208C9.91094 14.6653 9.71023 14.7473 9.50065 14.7504Z' />
      <path d='M6.72917 14.7504C6.62571 14.7491 6.52351 14.7276 6.42833 14.6871C6.3326 14.6476 6.24426 14.5922 6.16708 14.5232C6.022 14.3708 5.93998 14.1691 5.9375 13.9587C5.93875 13.8553 5.96027 13.7531 6.00083 13.6579C6.03727 13.5603 6.09392 13.4716 6.16708 13.3974C6.32018 13.2562 6.52086 13.1777 6.72917 13.1777C6.93748 13.1777 7.13815 13.2562 7.29125 13.3974C7.4356 13.549 7.51756 13.7494 7.52083 13.9587C7.51776 14.1683 7.43578 14.369 7.29125 14.5208C7.13945 14.6653 6.93874 14.7473 6.72917 14.7504Z' />
      <path d='M12.2702 11.9802C12.1667 11.9789 12.0645 11.9574 11.9693 11.9168C11.8725 11.8786 11.7838 11.8221 11.7081 11.7506L11.6131 11.6318C11.5831 11.5877 11.5592 11.5398 11.5418 11.4893C11.519 11.4445 11.503 11.3964 11.4943 11.3468C11.4855 11.2945 11.4802 11.2416 11.4785 11.1885C11.4814 10.9786 11.5634 10.7776 11.7081 10.6256C11.7838 10.554 11.8725 10.4976 11.9693 10.4594C12.1135 10.3987 12.2724 10.3822 12.426 10.4118C12.5796 10.4413 12.7209 10.5158 12.8323 10.6256C12.977 10.7776 13.059 10.9786 13.0618 11.1885C13.0601 11.2416 13.0548 11.2945 13.046 11.3468C13.0374 11.3964 13.0214 11.4445 12.9985 11.4893C12.9812 11.5398 12.9573 11.5877 12.9273 11.6318C12.898 11.6733 12.8663 11.713 12.8323 11.7506C12.6805 11.8951 12.4798 11.9771 12.2702 11.9802Z' />
      <path d='M9.50065 11.9802C9.3972 11.9789 9.29499 11.9574 9.19982 11.9168C9.10293 11.8786 9.01426 11.8221 8.93857 11.7506C8.79275 11.5996 8.71055 11.3984 8.70898 11.1885C8.71013 11.0848 8.73165 10.9823 8.77232 10.8869C8.81248 10.791 8.8687 10.7026 8.93857 10.6256C9.01426 10.554 9.10293 10.4976 9.19982 10.4594C9.34399 10.3987 9.50289 10.3822 9.65646 10.4118C9.81004 10.4413 9.95141 10.5158 10.0627 10.6256C10.2074 10.7776 10.2894 10.9786 10.2923 11.1885C10.2906 11.2416 10.2853 11.2945 10.2765 11.3468C10.2679 11.3964 10.2519 11.4445 10.229 11.4893C10.2117 11.5398 10.1877 11.5877 10.1577 11.6318C10.1285 11.6733 10.0968 11.713 10.0627 11.7506C9.91094 11.8951 9.71023 11.9771 9.50065 11.9802Z' />
      <path d='M6.72917 11.9794C6.62571 11.9781 6.52351 11.9566 6.42833 11.916C6.33119 11.8768 6.2425 11.8193 6.16708 11.7466C6.02201 11.5965 5.93987 11.3965 5.9375 11.1877C5.93875 11.0843 5.96027 10.9821 6.00083 10.8869C6.04099 10.791 6.09722 10.7026 6.16708 10.6256C6.24277 10.5541 6.33145 10.4976 6.42833 10.4594C6.57288 10.4009 6.73125 10.3855 6.88436 10.415C7.03747 10.4445 7.17878 10.5176 7.29125 10.6256C7.43578 10.7774 7.51776 10.9781 7.52083 11.1877C7.5191 11.2408 7.51381 11.2937 7.505 11.346C7.49638 11.3957 7.48037 11.4437 7.4575 11.4885C7.4402 11.539 7.41624 11.5869 7.38625 11.631C7.35703 11.6725 7.3253 11.7122 7.29125 11.7498C7.13945 11.8943 6.93874 11.9763 6.72917 11.9794Z' />
      <path d='M12.666 5.05225C12.5089 5.05121 12.3584 4.98832 12.2473 4.87719C12.1362 4.76607 12.0733 4.61565 12.0723 4.4585V2.0835C12.0733 1.92634 12.1362 1.77592 12.2473 1.6648C12.3584 1.55367 12.5089 1.49078 12.666 1.48975C12.8232 1.49078 12.9736 1.55367 13.0847 1.6648C13.1958 1.77592 13.2587 1.92634 13.2598 2.0835V4.4585C13.2587 4.61565 13.1958 4.76607 13.0847 4.87719C12.9736 4.98832 12.8232 5.05225 12.666 5.05225Z' />
      <path d='M6.33398 5.05225C6.17683 5.05121 6.02641 4.98832 5.91529 4.87719C5.80416 4.76607 5.74127 4.61565 5.74023 4.4585V2.0835C5.74127 1.92634 5.80416 1.77592 5.91529 1.6648C6.02641 1.55367 6.17683 1.49078 6.33398 1.48975C6.49114 1.49078 6.64156 1.55367 6.75268 1.6648C6.86381 1.77592 6.9267 1.92634 6.92773 2.0835V4.4585C6.9267 4.61565 6.86381 4.76607 6.75268 4.87719C6.64156 4.98832 6.49114 5.05225 6.33398 5.05225Z' />
    </svg>
  );
};
