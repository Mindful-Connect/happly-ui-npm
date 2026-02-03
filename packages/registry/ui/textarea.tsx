import * as React from 'react';
import { cn } from '@/lib/utils';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      hasError = false,
      disabled,
      maxLength,
      defaultValue,
      value: externalValue,
      onChange,
      ...props
    },
    ref
  ) => {
    // Internal state for uncontrolled usage
    const [value, setValue] = React.useState<string>(() =>
      typeof defaultValue === 'string' ? defaultValue : ''
    );

    // Keep in sync if it's a controlled component
    React.useEffect(() => {
      if (externalValue !== undefined) {
        setValue(String(externalValue));
      }
    }, [externalValue]);

    // Combined change handler
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      onChange?.(e);
    };

    return (
      <div className='group relative'>
        <textarea
          ref={ref}
          disabled={disabled}
          maxLength={maxLength}
          value={externalValue !== undefined ? externalValue : value}
          onChange={handleChange}
          className={cn(
            // base reset
            'block w-full resize-none border-none !text-paragraph-sm text-ds-strong-950 outline-none',

            // box + padding
            'min-h-[160px] rounded-12 bg-ds-white-0 px-3 py-2.5 shadow-regular-xs',

            // base inset ring
            'ring-1 ring-inset ring-ds-stroke-soft-200',

            // smooth transitions
            'transition duration-200 ease-out',

            // hover BG & hide stroke when unfocused
            'hover:[&:not(:focus)]:bg-ds-weak-50',
            !hasError && 'hover:[&:not(:focus)]:ring-transparent',

            // error at rest & on hover
            hasError && 'ring-ds-error-base hover:ring-ds-error-base',

            // focus: recolor the same inset stroke + shadow
            'focus-visible:shadow-button-important-focus focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ds-stroke-strong-950',

            // error on focus
            hasError &&
              'focus-visible:shadow-button-error-focus focus-visible:ring-ds-error-base',

            // disabled
            disabled && 'bg-ds-weak-50 ring-transparent',

            // placeholder styling
            !disabled &&
              'placeholder:select-none placeholder:text-ds-soft-400 placeholder:transition placeholder:duration-200 placeholder:ease-out hover:placeholder:text-ds-sub-600 focus-visible:placeholder:text-ds-sub-600',

            // disabled placeholder/text
            disabled && 'text-ds-disabled-300 placeholder:text-ds-disabled-300',

            className
          )}
          {...props}
        />

        {typeof maxLength === 'number' && (
          <span
            className={cn(
              'pointer-events-none absolute bottom-2 right-3 !text-paragraph-xxs',
              disabled ? 'text-ds-disabled-300' : 'text-ds-soft-400'
            )}
          >
            {value.length} / {maxLength}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
export { Textarea };
