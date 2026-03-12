'use client';

import * as React from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import { DayPicker } from 'react-day-picker';

import { compactButtonVariants } from '@/components/ui/compact-button';
import { cn } from '@/lib/happly-ui-utils';

type CalendarView = 'days' | 'months' | 'years';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const navButtonClass = compactButtonVariants({
  variant: 'white',
  size: 'large',
}).root({ class: 'absolute' });

const gridCellClass = cn(
  'flex items-center justify-center rounded-lg text-label-sm text-text-sub-600 outline-none',
  'transition duration-200 ease-out cursor-pointer select-none',
  'hover:bg-bg-weak-50 hover:text-text-strong-950',
  'focus:outline-none focus-visible:bg-bg-weak-50 focus-visible:text-text-strong-950',
);

const gridCellActiveClass =
  'bg-primary-base text-static-white hover:bg-primary-base hover:text-static-white';

function MonthGrid({
  displayYear,
  currentMonth,
  currentYear,
  onSelectMonth,
  onPrevYear,
  onNextYear,
  onClickCaption,
}: {
  displayYear: number;
  currentMonth: number;
  currentYear: number;
  onSelectMonth: (month: number) => void;
  onPrevYear: () => void;
  onNextYear: () => void;
  onClickCaption: () => void;
}) {
  return (
    <div className='w-[368px] space-y-2 p-5'>
      <div className='relative flex h-9 items-center justify-center rounded-lg bg-bg-weak-50'>
        <button
          type='button'
          className={cn(navButtonClass, 'top-1/2 left-1.5 -translate-y-1/2')}
          onClick={onPrevYear}
        >
          <RiArrowLeftSLine className='size-5' />
        </button>
        <button
          type='button'
          className='text-label-sm text-text-sub-600 cursor-pointer select-none transition-colors hover:text-text-strong-950'
          onClick={onClickCaption}
        >
          {displayYear}
        </button>
        <button
          type='button'
          className={cn(navButtonClass, 'top-1/2 right-1.5 -translate-y-1/2')}
          onClick={onNextYear}
        >
          <RiArrowRightSLine className='size-5' />
        </button>
      </div>
      <div className='grid grid-cols-4 gap-2'>
        {MONTHS.map((name, i) => (
          <button
            key={name}
            type='button'
            className={cn(
              gridCellClass,
              'h-10',
              i === currentMonth &&
                displayYear === currentYear &&
                gridCellActiveClass,
            )}
            onClick={() => onSelectMonth(i)}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}

function YearGrid({
  startYear,
  currentYear,
  onSelectYear,
  onPrevChunk,
  onNextChunk,
}: {
  startYear: number;
  currentYear: number;
  onSelectYear: (year: number) => void;
  onPrevChunk: () => void;
  onNextChunk: () => void;
}) {
  const years = Array.from({ length: 12 }, (_, i) => startYear + i);
  const endYear = startYear + 11;

  return (
    <div className='w-[368px] space-y-2 p-5'>
      <div className='relative flex h-9 items-center justify-center rounded-lg bg-bg-weak-50'>
        <button
          type='button'
          className={cn(navButtonClass, 'top-1/2 left-1.5 -translate-y-1/2')}
          onClick={onPrevChunk}
        >
          <RiArrowLeftSLine className='size-5' />
        </button>
        <span className='text-label-sm text-text-sub-600 select-none'>
          {startYear} – {endYear}
        </span>
        <button
          type='button'
          className={cn(navButtonClass, 'top-1/2 right-1.5 -translate-y-1/2')}
          onClick={onNextChunk}
        >
          <RiArrowRightSLine className='size-5' />
        </button>
      </div>
      <div className='grid grid-cols-4 gap-2'>
        {years.map((year) => (
          <button
            key={year}
            type='button'
            className={cn(
              gridCellClass,
              'h-10',
              year === currentYear && gridCellActiveClass,
            )}
            onClick={() => onSelectYear(year)}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
}

function Calendar({
  classNames,
  showOutsideDays = true,
  month: controlledMonth,
  onMonthChange,
  defaultMonth,
  ...rest
}: CalendarProps) {
  const [view, setView] = React.useState<CalendarView>('days');
  const [internalMonth, setInternalMonth] = React.useState(
    () => defaultMonth ?? new Date(),
  );

  const displayMonth = controlledMonth ?? internalMonth;

  const handleMonthChange = React.useCallback(
    (date: Date) => {
      onMonthChange?.(date);
      if (!controlledMonth) {
        setInternalMonth(date);
      }
    },
    [controlledMonth, onMonthChange],
  );

  const [yearGridStart, setYearGridStart] = React.useState(() => {
    const y = displayMonth.getFullYear();
    return y - (y % 12);
  });

  const handleCaptionClick = () => {
    setView('months');
  };

  const handleMonthSelect = (monthIndex: number) => {
    const next = new Date(displayMonth);
    next.setMonth(monthIndex);
    handleMonthChange(next);
    setView('days');
  };

  const handleYearSelect = (year: number) => {
    const next = new Date(displayMonth);
    next.setFullYear(year);
    handleMonthChange(next);
    setView('months');
  };

  if (view === 'years') {
    return (
      <YearGrid
        startYear={yearGridStart}
        currentYear={displayMonth.getFullYear()}
        onSelectYear={handleYearSelect}
        onPrevChunk={() => setYearGridStart((s) => s - 12)}
        onNextChunk={() => setYearGridStart((s) => s + 12)}
      />
    );
  }

  if (view === 'months') {
    return (
      <MonthGrid
        displayYear={displayMonth.getFullYear()}
        currentMonth={displayMonth.getMonth()}
        currentYear={displayMonth.getFullYear()}
        onSelectMonth={handleMonthSelect}
        onPrevYear={() => {
          const next = new Date(displayMonth);
          next.setFullYear(next.getFullYear() - 1);
          handleMonthChange(next);
        }}
        onNextYear={() => {
          const next = new Date(displayMonth);
          next.setFullYear(next.getFullYear() + 1);
          handleMonthChange(next);
        }}
        onClickCaption={() => {
          setYearGridStart(
            displayMonth.getFullYear() - (displayMonth.getFullYear() % 12),
          );
          setView('years');
        }}
      />
    );
  }

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      month={displayMonth}
      onMonthChange={handleMonthChange}
      classNames={{
        multiple_months: '',
        caption_start: 'p-5',
        caption_end: 'p-5',
        months: 'flex divide-x divide-stroke-soft-200',
        month: 'space-y-2',
        caption:
          'flex justify-center items-center relative rounded-lg bg-bg-weak-50 h-9',
        caption_label:
          'text-label-sm text-text-sub-600 select-none cursor-pointer transition-colors hover:text-text-strong-950',
        nav: 'flex items-center',
        nav_button: compactButtonVariants({
          variant: 'white',
          size: 'large',
        }).root({ class: 'absolute' }),
        nav_button_previous: 'top-1/2 -translate-y-1/2 left-1.5',
        nav_button_next: 'top-1/2 -translate-y-1/2 right-1.5',
        table: 'w-full border-collapse',
        head_row: 'flex gap-2',
        head_cell:
          'text-text-soft-400 text-label-sm uppercase size-10 flex items-center justify-center text-center select-none',
        row: 'grid grid-flow-col auto-cols-auto w-full mt-2 gap-2',
        cell: cn(
          // base
          'group/cell relative size-10 shrink-0 select-none p-0',
          // range
          '[&:has(.day-range-middle)]:bg-primary-alpha-10',
          'first:[&:has([aria-selected])]:rounded-l-lg last:[&:has([aria-selected])]:rounded-r-lg',
          // first range el
          '[&:not(:has(button))+:has(.day-range-middle)]:rounded-l-lg',
          // last range el
          '[&:not(:has(+_*_button))]:rounded-r-lg',
          // hide before if next sibling not selected
          '[&:not(:has(+_*_[type=button]))]:before:hidden',
          // merged bg
          'before:absolute before:inset-y-0 before:-right-2 before:hidden before:w-2 before:bg-primary-alpha-10',
          'last:[&:has(.day-range-middle)]:before:hidden',
          // middle
          '[&:has(.day-range-middle)]:before:block',
          // start
          '[&:has(.day-range-start)]:before:block [&:has(.day-range-start)]:before:w-3',
          // end
          '[&:has(.day-range-end):not(:first-child)]:before:!block [&:has(.day-range-end)]:before:left-0 [&:has(.day-range-end)]:before:right-auto',
        ),
        day: cn(
          // base
          'flex size-10 shrink-0 items-center justify-center rounded-lg text-center text-label-sm text-text-sub-600 outline-none',
          'transition duration-200 ease-out',
          // hover
          'hover:bg-bg-weak-50 hover:text-text-strong-950',
          // selected
          'aria-[selected]:bg-primary-base aria-[selected]:text-static-white',
          // focus visible
          'focus:outline-none focus-visible:bg-bg-weak-50 focus-visible:text-text-strong-950',
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected: 'day-selected',
        day_range_middle:
          'day-range-middle !text-primary-base !bg-transparent',
        day_today: 'day-today',
        day_outside:
          'day-outside !text-text-disabled-300 aria-[selected]:!text-static-white',
        day_disabled: 'day-disabled !text-text-disabled-300',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }: { orientation?: string }) =>
          orientation === 'left' ? (
            <RiArrowLeftSLine className='size-5' />
          ) : (
            <RiArrowRightSLine className='size-5' />
          ),
        CaptionLabel: ({ displayMonth: captionDate }: { displayMonth: Date }) => {
          const label = captionDate.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          });
          return (
            <button
              type='button'
              onClick={handleCaptionClick}
              className='text-label-sm text-text-sub-600 cursor-pointer select-none transition-colors hover:text-text-strong-950'
            >
              {label}
            </button>
          );
        },
      }}
      {...rest}
    />
  );
}

export { Calendar };
