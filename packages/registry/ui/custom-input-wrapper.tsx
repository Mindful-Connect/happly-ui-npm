import * as React from 'react';
import { cn } from '@/lib/utils';

type CustomInputWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  hasError?: boolean;
  disabled?: boolean;
};

export const CustomInputWrapper = React.forwardRef<
  HTMLDivElement,
  CustomInputWrapperProps
>(
  (
    { className, hasError = false, disabled = false, children, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          // ─── container reset & layout ─────────────────────────────────────────
          'group relative block w-full rounded-12 bg-ds-white-0 shadow-regular-xs',
          disabled
            ? 'bg-ds-weak-50'
            : 'hover:[&:not(:focus-within)]:bg-ds-weak-50',
          // ─── ring (inset) ────────────────────────────────────────────────────
          hasError
            ? 'ring-1 ring-inset ring-ds-error-base hover:ring-ds-error-base'
            : 'ring-1 ring-inset ring-ds-stroke-soft-200 hover:[&:not(:focus-within)]:ring-transparent',
          // ─── focus ring & shadow ─────────────────────────────────────────────
          'focus-within:ring-1 focus-within:ring-inset',
          hasError
            ? 'focus-within:shadow-button-error-focus focus-within:ring-ds-error-base'
            : 'focus-within:shadow-button-important-focus focus-within:ring-ds-stroke-strong-950',
          // ─── transitions & state resets ──────────────────────────────────────
          'transition duration-200 ease-out',
          disabled && 'ring-transparent',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CustomInputWrapper.displayName = 'CustomInputWrapper';
