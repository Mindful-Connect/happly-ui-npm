import * as React from 'react'
import { type ClassValue } from 'clsx'
import { cn } from '@/lib/utils'
import { ReactElement, SVGProps } from 'react'

const inputClassConfig = {
  slots: {
    root: [
      // base
      'group relative flex w-full overflow-hidden bg-ds-white-0 text-ds-strong-950 shadow-regular-xs',
      'transition duration-200 ease-out',
      // before pseudo-element for border/ring
      'before:absolute before:inset-0 before:ring-1 before:ring-inset before:ring-ds-stroke-soft-200',
      'before:pointer-events-none before:rounded-[inherit]',
      'before:transition before:duration-200 before:ease-out',
      // focus state
      'focus-within:shadow-button-important-focus focus-within:before:ring-ds-stroke-strong-950',
      // disabled state
      '[&:has(input:disabled)]:pointer-events-none',
      '[&:has(input:disabled)]:!bg-ds-weak-50',
      '[&:has(input:disabled)]:shadow-none',

      // '[&:has(input:disabled)]:before:ring-transparent',
      '[&:has(input:disabled)]:before:ring-transparent',
      '[&:has(input:disabled):not(:has([data-affix]))]:before:ring-transparent',
      '[&:has(input:disabled):has([data-affix])]:before:ring-ds-stroke-soft-200',

      '[&:has(input:disabled)]:hover:before:ring-ds-neutral-200',
    ],
    wrapper: [
      'group/input-wrapper flex w-full cursor-text items-center bg-ds-white-0',
      'transition duration-200 ease-out',
      'hover:[&:not(&:has(:focus-within))]:bg-ds-white-0',
      // disabled state
      '[&:has(input:disabled)]:pointer-events-none',
      '[&:has(input:disabled)]:!bg-ds-weak-50',
    ],
    input: [
      'w-full bg-transparent !text-sm text-ds-strong-950 outline-none',
      'transition duration-200 ease-out',
      'placeholder:select-none placeholder:text-ds-soft-400 placeholder:transition placeholder:duration-200 placeholder:ease-out',
      'group-hover/input-wrapper:[&:not(:focus-within)]:placeholder:text-ds-sub-600',
      'focus-within:placeholder:text-ds-sub-600',
      'group-has-[input:focus]:placeholder:text-ds-sub-600',
      'disabled:text-ds-disabled-300 disabled:placeholder:!text-ds-disabled-300',
    ],
    icon: [
      'flex h-5 w-5 shrink-0 select-none items-center justify-center',
      'transition duration-200 ease-out',
      'text-ds-soft-400',
      'group-hover:text-ds-sub-600',
      'group-focus-within:text-ds-sub-600',
    ],
    affix: [
      'shrink-0 bg-ds-white-0 !text-sm text-ds-soft-400',
      'flex items-center justify-center truncate',
      'transition duration-200 ease-out',

      'group-hover/input-wrapper:text-ds-sub-600',
      'group-focus-within:text-ds-sub-600',
    ],
    inlineAffix: [
      '!text-sm text-ds-soft-400',
      'transition duration-200 ease-out',
      'group-hover/input-wrapper:text-ds-sub-600',
      'group-focus-within:text-ds-sub-600',
    ],
  },
  variants: {
    size: {
      medium: {
        root: 'rounded-10',
        wrapper: 'gap-2 px-3',
        input: 'h-10',
      },
      small: {
        root: 'rounded-lg',
        wrapper: 'gap-2 px-2.5',
        input: 'h-9',
      },
      xsmall: {
        root: 'rounded-lg',
        wrapper: 'gap-1.5 px-2',
        input: 'h-8',
      },
    },
    hasError: {
      true: {
        root: [
          'before:ring-ds-error-base',
          'hover:ring-ds-error-base',
          'focus-within:shadow-button-error-focus focus-within:before:ring-ds-error-base',
          'has-error',
        ],
      },
      false: {
        root: [
          'hover:[&:not(:has(input:focus)):has(>:only-child)]:before:ring-ds-neutral-300',
        ],
      },
    },
  },
  compoundVariants: [
    {
      size: 'medium',
      class: {
        affix: 'px-3',
      },
    },
    {
      size: ['small', 'xsmall'],
      class: {
        affix: 'px-2.5',
      },
    },
  ],
  defaultVariants: {
    size: 'medium',
  },
}

// Type definition for the slots in inputClassConfig
type InputSlotName = keyof (typeof inputClassConfig)['slots']

// Props for the Input component
export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> {
  size?: 'medium' | 'small' | 'xsmall'
  hasError?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  leftAffix?: React.ReactNode
  rightAffix?: React.ReactNode
  inlineAffix?: React.ReactNode
  wrapperClassName?: string
  inputClassName?: string
  leftIconClassName?: string
  rightIconClassName?: string
  leftAffixClassName?: string
  rightAffixClassName?: string
  inlineAffixClassName?: string
}

// Helper function to generate class strings for a specific slot
function generateSlotClasses(
  slotName: InputSlotName,
  props: { size?: 'medium' | 'small' | 'xsmall'; hasError?: boolean },
  additionalClasses?: ClassValue,
): string {
  const { size = inputClassConfig.defaultVariants.size, hasError = false } =
    props
  const classes: ClassValue[] = []

  if (inputClassConfig.slots[slotName]) {
    classes.push(inputClassConfig.slots[slotName])
  }

  const sizeVariant =
    inputClassConfig.variants.size[
      size as keyof typeof inputClassConfig.variants.size
    ]
  if (sizeVariant && sizeVariant[slotName as keyof typeof sizeVariant]) {
    classes.push(sizeVariant[slotName as keyof typeof sizeVariant])
  }

  const errorVariantKey = hasError ? 'true' : 'false'
  const errorVariant =
    inputClassConfig.variants.hasError[
      errorVariantKey as keyof typeof inputClassConfig.variants.hasError
    ]
  if (errorVariant && errorVariant[slotName as keyof typeof errorVariant]) {
    classes.push(errorVariant[slotName as keyof typeof errorVariant])
  }

  // 4. Compound variants
  inputClassConfig.compoundVariants.forEach((cv) => {
    let match = true
    if (cv.size) {
      if (Array.isArray(cv.size)) {
        match = match && cv.size.includes(size)
      } else {
        match = match && cv.size === size
      }
    }

    if (match && cv.class && cv.class[slotName as keyof typeof cv.class]) {
      classes.push(cv.class[slotName as keyof typeof cv.class])
    }
  })

  if (additionalClasses) {
    classes.push(additionalClasses)
  }

  return cn(classes)
}

function renderSlotContent(
  node: React.ReactNode,
  slot: InputSlotName,
  variantProps: Parameters<typeof generateSlotClasses>[1],
  extraClass?: string,
): React.ReactNode {
  if (!React.isValidElement(node)) return null

  const el = node as ReactElement<SVGProps<SVGSVGElement>>
  return React.cloneElement(el, {
    className: generateSlotClasses(slot, variantProps, extraClass),
  })
}

// The main Input component, styled like shadcn/ui components.
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      wrapperClassName,
      inputClassName,
      leftIconClassName,
      rightIconClassName,
      leftAffixClassName,
      rightAffixClassName,
      inlineAffixClassName,
      type = 'text',
      size: propSize,
      hasError: propHasError,
      leftIcon,
      rightIcon,
      leftAffix,
      rightAffix,
      inlineAffix,
      id,
      ...props
    },
    ref,
  ) => {
    type InputSize = keyof typeof inputClassConfig.variants.size // "medium" | "small" | "xsmall"
    const currentSize: InputSize = (propSize ??
      inputClassConfig.defaultVariants.size) as InputSize
    const currentHasError = propHasError || false
    const variantProps: Parameters<typeof generateSlotClasses>[1] = {
      size: currentSize,
      hasError: currentHasError,
    }

    const inputId = id || React.useId()

    const renderedLeftIcon = renderSlotContent(
      leftIcon,
      'icon',
      variantProps,
      leftIconClassName,
    )
    const renderedRightIcon = renderSlotContent(
      rightIcon,
      'icon',
      variantProps,
      rightIconClassName,
    )

    return (
      <div
        className={generateSlotClasses('root', variantProps, className)}
        ref={ref}
      >
        {leftAffix && (
          <div
            data-affix
            className={generateSlotClasses(
              'affix',
              variantProps,
              leftAffixClassName,
            )}
          >
            {leftAffix}
          </div>
        )}

        <div
          // htmlFor={inputId}
          className={generateSlotClasses(
            'wrapper',
            variantProps,
            cn(
              wrapperClassName,
              leftAffix && 'border-l border-ds-stroke-soft-200',
            ),
          )}
        >
          {renderedLeftIcon}
          <input
            {...props} // Spread other native input attributes (placeholder, disabled, value, onChange, etc.)
            type={type}
            id={inputId}
            ref={ref}
            className={cn(
              generateSlotClasses('input', variantProps, inputClassName),
              'border-none bg-transparent p-0 outline-none focus:border-none focus:ring-0 focus:outline-none',
            )}
          />
          {inlineAffix && (
            <span
              className={generateSlotClasses(
                'inlineAffix',
                variantProps,
                inlineAffixClassName,
              )}
            >
              {inlineAffix}
            </span>
          )}
          {renderedRightIcon}
        </div>

        {rightAffix && (
          <div
            data-affix
            className={generateSlotClasses(
              'affix',
              variantProps,
              cn('border-l border-ds-stroke-soft-200', rightAffixClassName),
            )}
          >
            {rightAffix}
          </div>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
