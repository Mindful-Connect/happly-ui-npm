'use client';

import * as React from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { RiLoader2Fill } from 'react-icons/ri';
import { colord } from 'colord';

// FULL-SIZE <Button>
const modeBase: Record<string, string> = {
  filled: '',
  stroke: 'ring-1 ring-inset',
  lighter:
    'ring-1 ring-inset relative isolate after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:-z-10 after:transition after:duration-200 after:ease-out disabled:after:hidden',
  ghost: 'ring-1 ring-inset',
};

// generate compoundVariants with correct literal types
export type Variant = 'primary' | 'neutral' | 'error' | 'success' | 'warning';
type Mode = 'filled' | 'stroke' | 'lighter' | 'ghost';

const compoundVariants: { variant: Variant; mode: Mode; className: string }[] =
  Object.entries({
    primary: {
      filled:
        'bg-ds-primary-base text-ds-static-white hover:bg-ds-primary-dark focus-visible:shadow-button-primary-focus',
      stroke:
        'bg-ds-white-0 text-ds-primary-base ring-ds-primary-base hover:bg-ds-primary-alpha-10 hover:ring-transparent focus-visible:shadow-button-primary-focus',
      lighter:
        'bg-white text-ds-primary-base ring-transparent after:bg-ds-primary-alpha-10 hover:ring-ds-primary-base hover:after:bg-transparent focus-visible:ring-ds-primary-base focus-visible:after:bg-transparent focus-visible:shadow-button-primary-focus',
      ghost:
        'bg-transparent text-ds-primary-base ring-transparent hover:bg-ds-primary-alpha-10 focus-visible:bg-ds-white-0 focus-visible:ring-ds-primary-base focus-visible:shadow-button-primary-focus',
    },
    neutral: {
      filled:
        'bg-ds-strong-950 text-ds-white-0 hover:bg-ds-surface-800 focus-visible:shadow-button-important-focus',
      stroke:
        'bg-ds-white-0 text-ds-sub-600 ring-ds-stroke-soft-200 shadow-regular-xs hover:bg-ds-weak-50 hover:text-ds-strong-950 hover:shadow-none focus-visible:text-ds-strong-950 focus-visible:ring-ds-stroke-strong-950 focus-visible:shadow-button-important-focus',
      lighter:
        'bg-white text-ds-sub-600 ring-transparent after:bg-ds-weak-50 hover:text-ds-strong-950 hover:shadow-regular-xs hover:ring-ds-stroke-soft-200 hover:after:bg-transparent focus-visible:text-ds-strong-950 focus-visible:ring-ds-stroke-strong-950 focus-visible:after:bg-transparent focus-visible:shadow-button-important-focus',
      ghost:
        'bg-transparent text-ds-sub-600 ring-transparent hover:bg-ds-weak-50 hover:text-ds-strong-950 focus-visible:bg-ds-white-0 focus-visible:text-ds-strong-950 focus-visible:ring-ds-stroke-strong-950 focus-visible:shadow-button-important-focus',
    },
    error: {
      filled:
        'bg-ds-error-base text-ds-static-white hover:bg-ds-error-dark focus-visible:shadow-button-error-focus',
      stroke:
        'bg-ds-white-0 text-ds-error-base ring-ds-error-base hover:bg-ds-error-alpha-10 hover:ring-transparent focus-visible:shadow-button-error-focus',
      lighter:
        'bg-white text-ds-error-base ring-transparent after:bg-ds-error-alpha-10 hover:ring-ds-error-base hover:after:bg-transparent focus-visible:ring-ds-error-base focus-visible:after:bg-transparent focus-visible:shadow-button-error-focus',
      ghost:
        'bg-transparent text-ds-error-base ring-transparent hover:bg-ds-error-alpha-10 focus-visible:bg-ds-white-0 focus-visible:ring-ds-error-base focus-visible:shadow-button-error-focus',
    },
    success: {
      filled:
        'bg-ds-success-base text-ds-static-white hover:bg-ds-green-600 focus-visible:shadow-button-success-focus',
      stroke:
        'bg-ds-white-0 text-ds-success-base ring-ds-success-base hover:bg-ds-success-alpha-10 hover:ring-transparent focus-visible:shadow-button-success-focus',
      lighter:
        'bg-white text-ds-success-base ring-transparent after:bg-ds-success-alpha-10 hover:ring-ds-success-base hover:after:bg-transparent focus-visible:ring-ds-success-base focus-visible:after:bg-transparent focus-visible:shadow-button-success-focus',
      ghost:
        'bg-transparent text-ds-success-base ring-transparent hover:bg-ds-success-alpha-10 focus-visible:bg-ds-white-0 focus-visible:ring-ds-success-base focus-visible:shadow-button-success-focus',
    },
    warning: {
      filled:
        'bg-ds-warning-base text-ds-static-white hover:bg-ds-yellow-600 focus-visible:shadow-button-warning-focus',
      stroke:
        'bg-ds-white-0 text-ds-warning-base ring-ds-warning-base hover:bg-ds-warning-alpha-10 hover:ring-transparent focus-visible:shadow-button-warning-focus',
      lighter:
        'bg-white text-ds-warning-base ring-transparent after:bg-ds-warning-alpha-10 hover:ring-ds-warning-base hover:after:bg-transparent focus-visible:ring-ds-warning-base focus-visible:after:bg-transparent focus-visible:shadow-button-warning-focus',
      ghost:
        'bg-transparent text-ds-warning-base ring-transparent hover:bg-ds-warning-alpha-10 focus-visible:bg-ds-white-0 focus-visible:ring-ds-warning-base focus-visible:shadow-button-warning-focus',
    },
  } as {
    [variant in Variant]: {
      [mode in Mode]: string;
    };
  }).flatMap(([variant, modes]) =>
    Object.entries(modes).map(([mode, cls]) => ({
      variant: variant as Variant, // satisfy the union type
      mode: mode as Mode,
      className: cls,
    }))
  );

const fullRoot = cva(
  [
    'group relative inline-flex items-center justify-center whitespace-nowrap outline-none select-none',
    'transition duration-200 ease-out [&>svg]:transition-all [&>svg]:duration-200 [&>svg]:ease-out',
    'disabled:pointer-events-none disabled:bg-ds-weak-50 disabled:text-ds-disabled-300 disabled:ring-transparent',
  ].join(' '),
  {
    variants: {
      /* primary | neutral | error | success  +  mode (filled, stroke, …) stay
         because they come from your token system                     */
      variant: {
        primary: '',
        neutral: '',
        error: '',
        success: '',
        warning: '',
      },
      mode: modeBase,
      size: {
        medium:
          'h-10 gap-3 rounded-10 p-2 ps-2.5 pe-2.5 !text-label-sm [&>svg]:h-5 [&>svg]:w-5',
        small:
          'h-9 gap-1.5 rounded-8  p-1.5 ps-2 !text-label-sm [&>svg]:h-4 [&>svg]:w-4',
        xsmall:
          'h-8 gap-2.5 rounded-8 p-1 ps-1.5 !text-label-sm [&>svg]:h-3 [&>svg]:w-3',
        xxsmall:
          'h-7 gap-2.5 rounded-8 p-1 ps-1 !text-label-sm [&>svg]:h-2.5 [&>svg]:w-2.5',
      },
    },
    compoundVariants,
    defaultVariants: { variant: 'primary', mode: 'filled', size: 'medium' },
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof fullRoot> {
  asChild?: boolean;
  /** Shows loading spinner and disables the button */
  loading?: boolean;
  /** Custom text to show when loading (replaces children) */
  loadingText?: string;
  providerThemePrimaryColor?: string;
}

const ButtonBase = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild,
      className,
      variant,
      mode,
      size,
      loading,
      loadingText,
      disabled,
      children,
      providerThemePrimaryColor,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    const isPrimaryLight = providerThemePrimaryColor
      ? colord(providerThemePrimaryColor).isLight()
      : false;

    const contrastText =
      (variant ?? 'primary') === 'primary' && (mode ?? 'filled') === 'filled'
        ? isPrimaryLight
          ? 'text-ds-static-black'
          : 'text-ds-static-white'
        : undefined;

    const isDisabled = disabled || loading;

    return (
      <Comp
        ref={ref}
        className={cn(
          fullRoot({ variant, mode, size }),
          contrastText,
          loading && 'gap-1', // 4px gap when loading
          className
        )}
        disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <RiLoader2Fill className='animate-spin-smooth h-5 w-5 shrink-0' />
        )}
        {asChild ? (
          <Slottable>
            {loading && loadingText ? loadingText : children}
          </Slottable>
        ) : loading && loadingText ? (
          loadingText
        ) : (
          children
        )}
      </Comp>
    );
  }
);
ButtonBase.displayName = 'Button';

// ICON-ONLY <ButtonCompact>
const compactRoot = cva(
  [
    'relative flex shrink-0 items-center justify-center outline-none',
    'transition duration-200 ease-out [&>svg]:transition-all [&>svg]:duration-200 [&>svg]:ease-out',
    'disabled:pointer-events-none disabled:border-transparent disabled:bg-transparent disabled:text-ds-disabled-300 [&>svg]:disabled:text-ds-disabled-300 disabled:shadow-none',
  ].join(' '),
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
export { compactRoot as compactButtonVariants };

const compactIcon = cva('', {
  variants: {
    size: { large: 'h-5 w-5', medium: 'h-[18px] w-[18px]' },
  },
  defaultVariants: { size: 'large' },
});

type CompactCtx = Pick<VariantProps<typeof compactRoot>, 'variant' | 'size'>;
const CompactContext = React.createContext<CompactCtx | null>(null);

export interface CompactProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof compactRoot> {
  asChild?: boolean;
}

const CompactButton = React.forwardRef<HTMLButtonElement, CompactProps>(
  (
    { asChild, variant, size, fullRadius, className, children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <CompactContext.Provider value={{ variant, size }}>
        <Comp
          ref={ref}
          className={cn(compactRoot({ variant, size, fullRadius, className }))}
          {...props}
        >
          {children}
        </Comp>
      </CompactContext.Provider>
    );
  }
);
CompactButton.displayName = 'ButtonCompact';

export interface CompactIconProps
  extends React.HTMLAttributes<HTMLElement>, CompactCtx {
  asChild?: boolean;
}

const CompactIcon = React.forwardRef<HTMLElement, CompactIconProps>(
  ({ asChild, size, className, ...props }, ref) => {
    const ctx = React.useContext(CompactContext);
    const finalSize = size ?? ctx?.size ?? 'large';
    const Comp = asChild ? Slot : 'span';
    return (
      <Comp
        ref={ref}
        className={cn(
          'flex items-center justify-center',
          compactIcon({ size: finalSize, className })
        )}
        {...props}
      />
    );
  }
);
CompactIcon.displayName = 'ButtonCompactIcon';

// MERGED EXPORT
export const Button = Object.assign(ButtonBase, {
  Compact: Object.assign(CompactButton, { Icon: CompactIcon }),
});

/* optional re-export if other components want raw CVA */
export { CompactButton as ButtonCompact, CompactIcon as ButtonCompactIcon };
export { fullRoot as buttonVariants };
