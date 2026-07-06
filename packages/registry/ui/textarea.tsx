'use client';

import * as React from 'react';

import { useFormField } from '@/lib/form-field-context';
import { cn } from '@/lib/happly-ui-utils';

// Edge-fade on overflow — same gradient/mask trick as `fade-scroll`, applied
// directly to the textarea element (a textarea is its own scroll container,
// so it can't be wrapped by FadeScroll.Root).

const FADE_SIZE = 24;

function buildVerticalMaskImage(canScrollUp: boolean, canScrollDown: boolean) {
  if (!canScrollUp && !canScrollDown) return 'none';
  const top = canScrollUp
    ? `linear-gradient(to bottom, transparent, black ${FADE_SIZE}px)`
    : 'linear-gradient(black, black)';
  const bottom = canScrollDown
    ? `linear-gradient(to top, transparent, black ${FADE_SIZE}px)`
    : 'linear-gradient(black, black)';
  return `${top}, ${bottom}`;
}

const maskCompositeStyle = {
  maskComposite: 'intersect',
  WebkitMaskComposite: 'source-in',
} as React.CSSProperties;

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    hasError?: boolean;
    simple?: boolean;
    fadeScroll?: boolean;
  }
>(
  (
    {
      className,
      hasError,
      simple,
      disabled,
      fadeScroll = true,
      onScroll,
      onInput,
      style,
      ...rest
    },
    forwardedRef
  ) => {
    const innerRef = React.useRef<HTMLTextAreaElement>(null);
    React.useImperativeHandle(forwardedRef, () => innerRef.current!, []);

    const [canScrollUp, setCanScrollUp] = React.useState(false);
    const [canScrollDown, setCanScrollDown] = React.useState(false);

    const updateScrollState = React.useCallback(() => {
      const el = innerRef.current;
      if (!el) return;
      setCanScrollUp(el.scrollTop > 0);
      setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
    }, []);

    React.useEffect(() => {
      updateScrollState();
      const el = innerRef.current;
      if (!el) return;

      const observer = new ResizeObserver(updateScrollState);
      observer.observe(el);
      return () => observer.disconnect();
    }, [updateScrollState]);

    // The simple variant paints its own ring/background on the textarea, so
    // masking it would fade the border too — fades only apply to the wrapped
    // variant where the container paints the chrome.
    const hasFade = fadeScroll && !simple;
    const maskImage = hasFade
      ? buildVerticalMaskImage(canScrollUp, canScrollDown)
      : 'none';

    // Whether the consumer enabled native resizing (resize / resize-x /
    // resize-y utility) on the simple variant.
    const resizeEnabled =
      !!simple && /(?:^|\s)resize(?:-[xy])?(?:\s|$)/.test(className ?? '');

    return (
      <textarea
        onScroll={(e) => {
          updateScrollState();
          onScroll?.(e);
        }}
        onInput={(e) => {
          updateScrollState();
          onInput?.(e);
        }}
        style={
          maskImage !== 'none'
            ? {
                maskImage,
                WebkitMaskImage: maskImage,
                ...maskCompositeStyle,
                ...style,
              }
            : style
        }
        className={cn(
          [
            // base
            'text-paragraph-sm text-text-strong-950 block w-full resize-none border-none shadow-none ring-0 outline-none',
            !simple && [
              'pointer-events-auto h-full min-h-[82px] bg-transparent pt-2.5 pr-2.5 pl-3',
            ],
            // Hide the native scrollbar — the edge fades replace it visually.
            hasFade && '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
            simple && [
              'bg-bg-white-0 shadow-regular-xs min-h-28 rounded-xl px-3 py-2.5',
              'ring-stroke-soft-200 ring-1 ring-inset',
              'transition duration-200 ease-out',
              // When resizing is enabled (consumer adds resize-y / resize),
              // swap the native grabber for the same handle glyph the wrapped
              // variant renders (ResizeHandle), inset 10px like the wrapped
              // footer. Styling ::-webkit-resizer disables the browser's
              // default painting while keeping the drag behavior, and the
              // glyph is painted as a background on the textarea itself since
              // the pseudo's box can't be enlarged or offset. The color is
              // hardcoded (#99A0AE = text-soft-400) because a data-URI can't
              // reference tokens. Firefox falls back to its native grabber.
              resizeEnabled && [
                '[&::-webkit-resizer]:bg-transparent',
                '[background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDEyIDEyIiBmaWxsPSJub25lIj48cGF0aCBkPSJNOS4xMTExMSAyTDIgOS4xMTExMU0xMCA2LjQ0NDQ0TDYuNDQ0NDQgMTAiIHN0cm9rZT0iIzk5QTBBRSIvPjwvc3ZnPg==)]',
                '[background-position:right_10px_bottom_10px] bg-no-repeat',
              ],
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
              // focus — neutralize any upstream :focus ring/shadow bleed (the
              // wrapper paints the focus ring; the element itself stays clean).
              'focus:shadow-none focus:ring-0 focus:ring-offset-0 focus:outline-none',
              'focus-visible:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none',
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
        ref={innerRef}
        disabled={disabled}
        {...rest}
      />
    );
  }
);
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

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  maxResizeHeight?: number | string;
  fadeScroll?: boolean;
} & (
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
    {
      containerClassName,
      children,
      hasError,
      simple,
      maxResizeHeight,
      disabled,
      ...rest
    },
    forwardedRef
  ) => {
    const formField = useFormField();
    const resolvedHasError = hasError ?? formField.hasError;
    const resolvedDisabled = disabled ?? formField.disabled;
    if (simple) {
      return (
        <Textarea
          ref={forwardedRef}
          simple
          hasError={resolvedHasError}
          disabled={resolvedDisabled}
          {...rest}
        />
      );
    }

    return (
      <div
        aria-invalid={resolvedHasError || undefined}
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
          !resolvedHasError && [
            // hover
            'hover:[&:not(:focus-within)]:ring-transparent',
            // focus
            'focus-within:shadow-button-important-focus focus-within:ring-stroke-strong-950',
          ],
          resolvedHasError && [
            // base
            'ring-error-base',
            // focus
            'focus-within:shadow-button-error-focus focus-within:ring-error-base',
          ],
          containerClassName
        )}
      >
        <div className='grid flex-1'>
          <div className='pointer-events-none relative z-10 flex flex-col gap-2 [grid-area:1/1]'>
            <Textarea
              ref={forwardedRef}
              hasError={resolvedHasError}
              disabled={resolvedDisabled}
              {...rest}
            />
            <div className='pointer-events-none flex items-center justify-end gap-1.5 pr-2.5 pl-3'>
              {children}
              <ResizeHandle />
            </div>
          </div>
          <div
            className='min-h-full resize-y overflow-hidden opacity-0 [grid-area:1/1]'
            style={maxResizeHeight ? { maxHeight: maxResizeHeight } : undefined}
          />
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
