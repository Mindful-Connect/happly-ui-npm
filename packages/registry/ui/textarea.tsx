'use client';

import * as React from 'react';

import { cn } from '@/lib/happly-ui-utils';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    hasError?: boolean;
    simple?: boolean;
  }
>(({ className, hasError, simple, disabled, ...rest }, forwardedRef) => {
  return (
    <textarea
      className={cn(
        [
          // base
          'text-paragraph-sm text-text-strong-950 block w-full resize-none border-none shadow-none ring-0 outline-none',
          !simple && [
            'pointer-events-auto h-full min-h-[82px] bg-transparent pt-2.5 pr-2.5 pl-3',
          ],
          simple && [
            'bg-bg-white-0 shadow-regular-xs min-h-28 rounded-xl px-3 py-2.5',
            'ring-stroke-soft-200 ring-1 ring-inset',
            'transition duration-200 ease-out',
            // hover
            'hover:[&:not(:focus)]:bg-bg-weak-50',
            !hasError && [
              // hover
              'hover:[&:not(:focus)]:ring-transparent',
              // focus
              'focus:shadow-button-important-focus focus:ring-stroke-strong-950',
            ],
            hasError && [
              // base
              'ring-error-base',
              // focus
              'focus:shadow-button-error-focus focus:ring-error-base',
            ],
            disabled && ['bg-bg-weak-50 ring-transparent'],
          ],
          !disabled && [
            // placeholder
            'placeholder:text-text-soft-400 placeholder:transition placeholder:duration-200 placeholder:ease-out placeholder:select-none',
            // hover placeholder
            'group-hover/textarea:placeholder:text-text-sub-600',
            // focus
            'focus:outline-none',
            // focus placeholder
            'focus:placeholder:text-text-sub-600',
          ],
          disabled && [
            // disabled
            'text-text-disabled-300 placeholder:text-text-disabled-300',
          ],
        ],
        className
      )}
      ref={forwardedRef}
      disabled={disabled}
      {...rest}
    />
  );
});
Textarea.displayName = 'Textarea';

function ResizeHandle() {
  return (
    <div className='pointer-events-none h-3 w-3 cursor-s-resize'>
      <svg
        width='12'
        height='12'
        viewBox='0 0 12 12'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M9.11111 2L2 9.11111M10 6.44444L6.44444 10'
          className='stroke-text-soft-400'
        />
      </svg>
    </div>
  );
}
ResizeHandle.displayName = 'ResizeHandle';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  (
    | {
        simple: true;
        children?: never;
        containerClassName?: never;
        hasError?: boolean;
      }
    | {
        simple?: false;
        children?: React.ReactNode;
        containerClassName?: string;
        hasError?: boolean;
      }
  );

const TextareaRoot = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { containerClassName, children, hasError, simple, ...rest },
    forwardedRef
  ) => {
    if (simple) {
      return (
        <Textarea ref={forwardedRef} simple hasError={hasError} {...rest} />
      );
    }

    return (
      <div
        className={cn(
          [
            // base
            'group/textarea bg-bg-white-0 shadow-regular-xs relative flex w-full flex-col rounded-xl pb-2.5',
            'ring-stroke-soft-200 ring-1 ring-inset',
            'transition duration-200 ease-out',
            // hover
            'hover:[&:not(:focus-within)]:bg-bg-weak-50',
            // disabled
            'has-[[disabled]]:bg-bg-weak-50 has-[[disabled]]:pointer-events-none has-[[disabled]]:ring-transparent',
          ],
          !hasError && [
            // hover
            'hover:[&:not(:focus-within)]:ring-transparent',
            // focus
            'focus-within:shadow-button-important-focus focus-within:ring-stroke-strong-950',
          ],
          hasError && [
            // base
            'ring-error-base',
            // focus
            'focus-within:shadow-button-error-focus focus-within:ring-error-base',
          ],
          containerClassName
        )}
      >
        <div className='grid'>
          <div className='pointer-events-none relative z-10 flex flex-col gap-2 [grid-area:1/1]'>
            <Textarea ref={forwardedRef} hasError={hasError} {...rest} />
            <div className='pointer-events-none flex items-center justify-end gap-1.5 pr-2.5 pl-3'>
              {children}
              <ResizeHandle />
            </div>
          </div>
          <div className='min-h-full resize-y overflow-hidden opacity-0 [grid-area:1/1]' />
        </div>
      </div>
    );
  }
);
TextareaRoot.displayName = 'TextareaRoot';

function CharCounter({
  current,
  max,
  className,
}: {
  current?: number;
  max?: number;
} & React.HTMLAttributes<HTMLSpanElement>) {
  if (current === undefined || max === undefined) return null;

  const isError = current > max;

  return (
    <span
      className={cn(
        'text-subheading-2xs text-text-soft-400',
        // disabled
        'group-has-[[disabled]]/textarea:text-text-disabled-300',
        {
          'text-error-base': isError,
        },
        className
      )}
    >
      {current}/{max}
    </span>
  );
}
CharCounter.displayName = 'CharCounter';

export { TextareaRoot as Root, CharCounter };
