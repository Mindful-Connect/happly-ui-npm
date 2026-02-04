import * as React from 'react'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Calendar as CalendarIcon,
} from 'lucide-react'
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker'
import { Popover, Transition } from '@headlessui/react'
import { enCA, frCA } from 'react-day-picker/locale'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

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
`

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
  },
)

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonRootVariants>
>((props, ref) => {
  const { className, variant, mode, size, iconOnly, ...rest } = props
  return (
    <button
      ref={ref}
      className={cn(
        buttonRootVariants({ variant, mode, size, iconOnly }),
        className,
      )}
      {...rest}
    />
  )
})
Button.displayName = 'Button'

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
  },
)

// =============================================================================
// DATEPICKER (Calendar) COMPONENT
// =============================================================================

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="neutral"
      mode="ghost"
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
        className,
      )}
      {...props}
    />
  )
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
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'datepicker-ds group/calendar bg-background p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
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
          'thin-scrollbar-gray min-w-[92px]',
        ),
        root: cn('w-fit', defaultClassNames.root),
        months: cn(
          'flex gap-4 flex-col md:flex-row relative min-w-[80px]',
          defaultClassNames.months,
        ),
        months_dropdown: cn(
          defaultClassNames.months_dropdown,
          'thin-scrollbar-gray min-w-[82px] transition-all duration-75',
        ),
        month: cn('flex flex-col w-full gap-4', defaultClassNames.month),
        caption: cn(
          'flex justify-between items-center relative rounded-lg h-9 bg-ds-weak-50 px-3',
        ),
        nav: cn('absolute inset-0 w-full top-1', defaultClassNames.nav),
        button_previous: cn(
          compactButtonVariants({ variant: 'ghost', size: 'large' }),
          'p-0 select-none aria-disabled:opacity-50',
          'absolute left-1.5',
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          compactButtonVariants({ variant: 'ghost', size: 'large' }),
          'p-0 select-none aria-disabled:opacity-50',
          'absolute right-1.5',
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          'flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)',
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          'flex items-center text-label-sm font-medium justify-center h-(--cell-size) gap-2',
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          defaultClassNames.dropdown_root,
          'relative cursor-pointer hover:border-ds-neutral-300 has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md shrink-0 flex grow justify-between min-w-[82px]',
        ),
        dropdown: cn(defaultClassNames.dropdown, 'absolute inset-0 opacity-0'),
        caption_label: cn(
          defaultClassNames.caption_label,
          'select-none font-medium',
          captionLayout === 'label'
            ? 'text-sm'
            : 'rounded-8 w-full pl-3 pr-2.5 flex items-center justify-between grow gap-2 text-label-sm h-8 [&>svg]:text-muted-foreground [&>svg]:w-3.5 [&>svg]:h-3.5',
        ),
        table: 'w-full border-collapse',
        weekdays: cn('flex gap-1', defaultClassNames.weekdays),
        weekday: cn(
          'text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none uppercase',
          defaultClassNames.weekday,
        ),
        week: cn('flex w-full mt-1 gap-1', defaultClassNames.week),
        week_number_header: cn(
          'select-none w-(--cell-size)',
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          'text-[0.8rem] select-none text-muted-foreground',
          defaultClassNames.week_number,
        ),
        head_row: 'flex gap-1',
        head_cell:
          'text-ds-soft-400 text-label-sm uppercase h-10 w-10 flex items-center justify-center text-center select-none',
        row: 'grid grid-flow-col auto-cols-auto w-full mt-1 gap-1',
        day_outside: cn(
          '!text-ds-disabled-300 aria-[selected]:!text-ds-static-white',
          defaultClassNames.outside,
        ),
        range_start: cn(
          'rounded-l-md bg-accent',
          defaultClassNames.range_start,
        ),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn('rounded-r-md bg-accent', defaultClassNames.range_end),
        today: cn(
          'bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none',
          defaultClassNames.today,
        ),
        disabled: cn(
          'text-muted-foreground opacity-50',
          defaultClassNames.disabled,
        ),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return (
              <ChevronLeftIcon className={cn('size-4', className)} {...props} />
            )
          }
          if (orientation === 'right') {
            return (
              <ChevronRightIcon
                className={cn('size-4', className)}
                {...props}
              />
            )
          }
          return (
            <ChevronDownIcon className={cn('size-4', className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
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
  date: string | null
  locale?: 'en' | 'fr'
  placeholder?: string
  className?: string
  setDate: (date: string | null) => void
}) {
  return (
    <div className={cn('relative', className)}>
      <style>{styles}</style>
      <Popover as="div" className="relative">
        {({ open }) => (
          <>
            <Popover.Button className="relative flex h-10 w-full items-center space-x-2 rounded-[10px] border border-ds-neutral-200 bg-white p-3 text-sm placeholder:text-[#575759] focus:border-ds-neutral-950 focus:ring-ds-neutral-950 focus:outline-none">
              <div
                className={cn(
                  open ? 'text-ds-neutral-950' : 'text-ds-neutral-400',
                )}
              >
                <CalendarIcon className="size-4" />
              </div>
              {date ? (
                <span>
                  {new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                  })}
                </span>
              ) : (
                <span className="text-ds-neutral-400">
                  {placeholder || 'Select date'}
                </span>
              )}
            </Popover.Button>

            <Transition
              as={React.Fragment}
              enter="transition ease-out duration-75"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Popover.Panel className="absolute z-10 mt-1">
                {({ close }) => (
                  <Calendar
                    className="rounded-[16px] border border-[#e1e7ef] bg-white shadow"
                    mode="single"
                    showOutsideDays={false}
                    captionLayout="dropdown"
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
                          .split('/')
                        const valueToStore = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
                        setDate(valueToStore)
                        close()
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
  )
}

// =============================================================================
// DEMO WRAPPER
// =============================================================================

export function DemoCalendarInput() {
  const [date, setDate] = React.useState<string | null>(null)

  return (
    <div className="flex w-full items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <CalendarInput
          date={date}
          setDate={setDate}
          placeholder="Pick a date"
        />
      </div>
    </div>
  )
}
