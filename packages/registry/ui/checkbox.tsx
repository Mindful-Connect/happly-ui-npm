'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { useFormField } from '@/lib/form-field-context';
import { cn } from '@/lib/happly-ui-utils';
import { useFormFieldBinding } from '@/lib/use-form-field-binding';

function IconCheck({ ...rest }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='10'
      height='8'
      viewBox='0 0 10 8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      {...rest}
    >
      <path
        d='M1 3.5L4 6.5L9 1.5'
        strokeWidth='1.5'
        className='stroke-inherit'
      />
    </svg>
  );
}

function IconIndeterminate({ ...rest }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='8'
      height='2'
      viewBox='0 0 8 2'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      {...rest}
    >
      <path d='M0 1H8' strokeWidth='1.5' className='stroke-inherit' />
    </svg>
  );
}

const FILL_CLASSES = {
  primary: {
    outer: [
      'group-hover/checkbox:group-data-[state=checked]/checkbox:fill-primary-darker',
      'group-hover/checkbox:group-data-[state=indeterminate]/checkbox:fill-primary-darker',
      'group-focus-visible/checkbox:fill-primary-base',
      'group-focus-visible/checkbox:group-data-[state=checked]/checkbox:fill-primary-dark',
      'group-focus-visible/checkbox:group-data-[state=indeterminate]/checkbox:fill-primary-dark',
      'group-data-[state=checked]/checkbox:fill-primary-base',
      'group-data-[state=indeterminate]/checkbox:fill-primary-base',
    ],
    stroke: 'stroke-primary-contrast',
    focusRing: 'focus-visible:before:shadow-button-primary-focus',
  },
  neutral: {
    outer: [
      'group-hover/checkbox:group-data-[state=checked]/checkbox:fill-text-strong-950',
      'group-hover/checkbox:group-data-[state=indeterminate]/checkbox:fill-text-strong-950',
      'group-focus-visible/checkbox:fill-text-strong-950',
      'group-focus-visible/checkbox:group-data-[state=checked]/checkbox:fill-text-strong-950',
      'group-focus-visible/checkbox:group-data-[state=indeterminate]/checkbox:fill-text-strong-950',
      'group-data-[state=checked]/checkbox:fill-text-strong-950',
      'group-data-[state=indeterminate]/checkbox:fill-text-strong-950',
    ],
    stroke: 'stroke-static-white',
    focusRing: 'focus-visible:before:shadow-button-important-focus',
  },
} as const;

const CheckboxRoot = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    variant?: 'primary' | 'neutral';
  }
>(
  (
    {
      className,
      checked: checkedProp,
      onCheckedChange: onCheckedChangeProp,
      variant = 'primary',
      disabled: disabledProp,
      'aria-describedby': ariaDescribedBy,
      'aria-required': ariaRequired,
      ...rest
    },
    forwardedRef
  ) => {
    const formField = useFormField();
    const binding = useFormFieldBinding<boolean>();
    const disabled = disabledProp ?? formField.disabled;

    // The field's hint/error is announced with the control, alongside any
    // description the consumer passed in (mirrors Input/Textarea).
    const describedBy =
      [ariaDescribedBy, formField.describedBy].filter(Boolean).join(' ') ||
      undefined;
    const required = ariaRequired ?? (formField.required || undefined);

    // Priority: explicit props > RHF binding > undefined (Radix uncontrolled)
    const checked = checkedProp !== undefined ? checkedProp : binding?.value;
    const onCheckedChange = onCheckedChangeProp ?? binding?.onChange;

    const filterId = React.useId();

    // precalculated by .getTotalLength()
    const TOTAL_LENGTH_CHECK = 11.313708305358887;
    const TOTAL_LENGTH_INDETERMINATE = 8;

    const fills = FILL_CLASSES[variant];

    return (
      <CheckboxPrimitive.Root
        ref={forwardedRef}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        aria-describedby={describedBy}
        aria-required={required}
        className={cn(
          'group/checkbox relative flex h-5 w-5 shrink-0 items-center justify-center outline-none',
          // 24×24 hit area around the 20px visual (WCAG 2.5.8)
          'after:absolute after:-inset-0.5',
          // focus ring traced on the 16px visual box, so checked+focus stays
          // distinguishable from checked (the fill alone is too close)
          'before:pointer-events-none before:absolute before:top-1/2 before:left-1/2 before:size-4 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-[4px]',
          fills.focusRing,
          className
        )}
        {...rest}
      >
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect
            x='2'
            y='2'
            width='16'
            height='16'
            rx='4'
            className={cn(
              'fill-bg-soft-200 transition-[fill] duration-150 ease-out',
              // hover
              'group-hover/checkbox:fill-bg-sub-300',
              // disabled
              'group-disabled/checkbox:fill-bg-soft-200',
              // disabled checked
              'group-disabled/checkbox:group-data-[state=checked]/checkbox:fill-bg-soft-200',
              'group-disabled/checkbox:group-data-[state=indeterminate]/checkbox:fill-bg-soft-200',
              // variant-specific
              fills.outer
            )}
          />
          <g filter={`url(#${filterId})`}>
            <rect
              x='3.5'
              y='3.5'
              width='13'
              height='13'
              rx='2.6'
              className={cn(
                'fill-bg-white-0 transition-[opacity] duration-150 ease-out',
                // disabled
                'group-disabled/checkbox:hidden',
                // checked
                'group-data-[state=checked]/checkbox:opacity-0',
                'group-data-[state=indeterminate]/checkbox:opacity-0'
              )}
            />
          </g>
          <defs>
            <filter
              id={filterId}
              x='1.5'
              y='3.5'
              width='17'
              height='17'
              filterUnits='userSpaceOnUse'
              colorInterpolationFilters='sRGB'
            >
              <feFlood floodOpacity='0' result='BackgroundImageFix' />
              <feColorMatrix
                in='SourceAlpha'
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                result='hardAlpha'
              />
              <feOffset dy='2' />
              <feGaussianBlur stdDeviation='1' />
              <feColorMatrix
                type='matrix'
                values='0 0 0 0 0.105882 0 0 0 0 0.109804 0 0 0 0 0.113725 0 0 0 0.12 0'
              />
              <feBlend
                mode='normal'
                in2='BackgroundImageFix'
                result='effect1_dropShadow'
              />
              <feBlend
                mode='normal'
                in='SourceGraphic'
                in2='effect1_dropShadow'
                result='shape'
              />
            </filter>
          </defs>
        </svg>
        <CheckboxPrimitive.Indicator
          forceMount
          // The glyph swap is the `stroke-dashoffset` draw-on, not a cross-fade:
          // both glyphs share one 20px box and draw themselves in, so the
          // scale/blur icon recipe would make the tick grow while it is being
          // drawn. `opacity-0` alone hides the inactive glyph (the `invisible`
          // classes that used to sit alongside it were redundant — measured).
          className='[&_path]:transition-[stroke-dashoffset] [&_path]:duration-300 [&_path]:ease-out [&_svg]:opacity-0'
        >
          <IconCheck
            className={cn(
              'absolute top-1/2 left-1/2 shrink-0 -translate-x-1/2 -translate-y-1/2',
              fills.stroke,
              // checked
              'group-data-[state=checked]/checkbox:opacity-100',
              'group-data-[state=checked]/checkbox:[&>path]:[stroke-dashoffset:0]',
              // path
              '[&>path]:[stroke-dasharray:var(--total-length)] [&>path]:[stroke-dashoffset:var(--total-length)]',
              // disabled
              'group-disabled/checkbox:!stroke-text-disabled-300'
            )}
            style={{
              ['--total-length' as any]: TOTAL_LENGTH_CHECK,
            }}
          />
          <IconIndeterminate
            className={cn(
              'absolute top-1/2 left-1/2 shrink-0 -translate-x-1/2 -translate-y-1/2',
              fills.stroke,
              // indeterminate
              'group-data-[state=indeterminate]/checkbox:opacity-100',
              'group-data-[state=indeterminate]/checkbox:[&>path]:[stroke-dashoffset:0]',
              // path
              '[&>path]:[stroke-dasharray:var(--total-length)] [&>path]:[stroke-dashoffset:var(--total-length)]',
              // disabled
              'group-disabled/checkbox:!stroke-text-disabled-300'
            )}
            style={{
              ['--total-length' as any]: TOTAL_LENGTH_INDETERMINATE,
            }}
          />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  }
);
CheckboxRoot.displayName = 'CheckboxRoot';

export { CheckboxRoot as Root };
