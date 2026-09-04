'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import { useFormField } from '@/lib/form-field-context';
import type { PolymorphicComponentProps } from '@/lib/polymorphic';
import { recursiveCloneChildren } from '@/lib/recursive-clone-children';
import { tv, type VariantProps } from '@/lib/tv';

const INPUT_ROOT_NAME = 'InputRoot';
const INPUT_WRAPPER_NAME = 'InputWrapper';
const INPUT_EL_NAME = 'InputEl';
const INPUT_ICON_NAME = 'InputIcon';
const INPUT_AFFIX_NAME = 'InputAffixButton';
const INPUT_INLINE_AFFIX_NAME = 'InputInlineAffixButton';

export const inputVariants = tv({
  slots: {
    root: [
      // base
      'group relative flex w-full overflow-hidden bg-bg-white-0 text-text-strong-950 shadow-regular-xs',
      'transition-[box-shadow] duration-150 ease-out',
      'divide-x divide-stroke-soft-200',
      // before
      'before:absolute before:inset-0 before:ring-1 before:ring-inset before:ring-stroke-soft-200',
      'before:pointer-events-none before:rounded-[inherit]',
      'before:transition-[box-shadow] before:duration-150 before:ease-out',
      // hover
      'hover:shadow-none',
      // hover override inside section toggle (keep shadow + ring visible against toggle bg)
      '[[data-section-toggle-open]_&]:hover:shadow-regular-xs',
      // focus
      'has-[input:focus]:shadow-button-important-focus has-[input:focus]:before:ring-stroke-strong-950',
      // disabled
      'has-[input:disabled]:shadow-none has-[input:disabled]:before:ring-transparent',
    ],
    wrapper: [
      // base
      'group/input-wrapper flex w-full cursor-text items-center bg-bg-white-0',
      'transition-[background-color] duration-150 ease-out',
      // hover
      'hover:[&:not(&:has(input:focus))]:bg-bg-weak-50',
      // hover override inside section toggle (bg-weak-50 clashes with toggle bg)
      '[[data-section-toggle-open]_&]:hover:[&:not(&:has(input:focus))]:bg-bg-white-0',
      // disabled
      'has-[input:disabled]:pointer-events-none has-[input:disabled]:bg-bg-weak-50',
    ],
    input: [
      // base
      // 16px below `sm`: iOS Safari zooms the page whenever a focused field
      // is under 16px, and the zoom does not come back on blur. 14px from
      // `sm` up, which is every viewport where the zoom cannot happen.
      'w-full border-0 bg-transparent bg-none p-0 text-paragraph-md sm:text-paragraph-sm text-text-strong-950 outline-none ring-0 focus:border-0 focus:ring-0',
      'transition-[color] duration-150 ease-out',
      // placeholder
      'placeholder:select-none placeholder:text-text-soft-400 placeholder:transition-[color] placeholder:duration-150 placeholder:ease-out',
      // hover placeholder
      'group-hover/input-wrapper:placeholder:text-text-sub-600',
      // focus — bare `focus:` is deliberate on text inputs, not an oversight.
      // Browsers match `:focus-visible` on a text field for pointer focus too,
      // so `focus-visible:` here is a no-op with a regression risk. The visible
      // ring is painted by the wrapper anyway. Do not "fix" this.
      'focus:outline-none',
      // focus placeholder
      'group-has-[input:focus]:placeholder:text-text-sub-600',
      // disabled
      'disabled:text-text-disabled-300 disabled:placeholder:text-text-disabled-300',
    ],
    icon: [
      // base
      'flex w-5 h-5 shrink-0 select-none items-center justify-center',
      'transition-[color] duration-150 ease-out',
      // placeholder state
      'group-has-[:placeholder-shown]:text-text-soft-400',
      // filled state
      'text-text-sub-600',
      // hover
      'group-has-[:placeholder-shown]:group-hover/input-wrapper:text-text-sub-600',
      // focus
      'group-has-[:placeholder-shown]:group-has-[input:focus]/input-wrapper:text-text-sub-600',
      // disabled
      'group-has-[input:disabled]/input-wrapper:text-text-disabled-300',
    ],
    affix: [
      // base
      'shrink-0 bg-bg-white-0 text-paragraph-sm text-text-sub-600',
      'flex items-center justify-center truncate',
      'transition-[color] duration-150 ease-out',
      // placeholder state
      'group-has-[:placeholder-shown]:text-text-soft-400',
      // focus state
      'group-has-[:placeholder-shown]:group-has-[input:focus]:text-text-sub-600',
    ],
    inlineAffix: [
      // base
      'text-paragraph-sm text-text-sub-600',
      // placeholder state
      'group-has-[:placeholder-shown]:text-text-soft-400',
      // focus state
      'group-has-[:placeholder-shown]:group-has-[input:focus]:text-text-sub-600',
      // disabled
      'group-has-[input:disabled]/input-wrapper:text-text-disabled-300',
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
          // base
          'before:ring-error-base',
          // base
          'hover:before:ring-error-base hover:[&:not(&:has(input:focus)):has(>:only-child)]:before:ring-error-base',
          // focus
          'has-[input:focus]:shadow-button-error-focus has-[input:focus]:before:ring-error-base',
        ],
      },
      false: {
        root: [
          // hover
          'hover:[&:not(:has(input:focus)):has(>:only-child)]:before:ring-transparent',
          // hover override inside section toggle (keep ring visible against toggle bg)
          '[[data-section-toggle-open]_&]:hover:[&:not(:has(input:focus)):has(>:only-child)]:before:ring-stroke-soft-200',
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
});

type InputSharedProps = VariantProps<typeof inputVariants>;

function InputRoot({
  className,
  children,
  size,
  hasError,
  asChild,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> &
  InputSharedProps & {
    asChild?: boolean;
  }) {
  const formField = useFormField();
  const resolvedHasError = hasError ?? formField.hasError;
  const uniqueId = React.useId();
  const Component = asChild ? Slot : 'div';

  const { root } = inputVariants({
    size,
    hasError: resolvedHasError,
  });

  const sharedProps: InputSharedProps = {
    size,
    hasError: resolvedHasError,
  };

  const extendedChildren = recursiveCloneChildren(
    children as React.ReactElement[],
    sharedProps,
    [
      INPUT_WRAPPER_NAME,
      INPUT_EL_NAME,
      INPUT_ICON_NAME,
      INPUT_AFFIX_NAME,
      INPUT_INLINE_AFFIX_NAME,
    ],
    uniqueId,
    asChild
  );

  return (
    <Component
      className={root({ class: className })}
      aria-invalid={resolvedHasError || undefined}
      {...rest}
    >
      {extendedChildren}
    </Component>
  );
}
InputRoot.displayName = INPUT_ROOT_NAME;

function InputWrapper({
  className,
  children,
  size,
  hasError,
  asChild,
  ...rest
}: React.HTMLAttributes<HTMLLabelElement> &
  InputSharedProps & {
    asChild?: boolean;
  }) {
  const Component = asChild ? Slot : 'label';

  const { wrapper } = inputVariants({
    size,
    hasError,
  });

  return (
    <Component className={wrapper({ class: className })} {...rest}>
      {children}
    </Component>
  );
}
InputWrapper.displayName = INPUT_WRAPPER_NAME;

const InputEl = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> &
    InputSharedProps & {
      asChild?: boolean;
    }
>(
  (
    {
      className,
      type = 'text',
      size,
      hasError,
      asChild,
      placeholder,
      disabled,
      'aria-describedby': ariaDescribedBy,
      'aria-required': ariaRequired,
      ...rest
    },
    forwardedRef
  ) => {
    const Component = asChild ? Slot : 'input';
    const formField = useFormField();
    const resolvedDisabled = disabled ?? formField.disabled;
    const resolvedHasError = hasError ?? formField.hasError;
    // The field's hint/error is announced with the control, alongside any
    // description the consumer passed in.
    const resolvedDescribedBy =
      [ariaDescribedBy, formField.describedBy].filter(Boolean).join(' ') ||
      undefined;
    const resolvedRequired = ariaRequired ?? (formField.required || undefined);

    const { input } = inputVariants({
      size,
      hasError: resolvedHasError,
    });

    return (
      <Component
        type={type}
        className={input({ class: className })}
        ref={forwardedRef}
        placeholder={placeholder ?? '\u200B'}
        disabled={resolvedDisabled}
        // The error state has to live on the control itself — `aria-invalid` on
        // the wrapper div is not exposed for the input by assistive tech.
        aria-invalid={resolvedHasError || undefined}
        aria-describedby={resolvedDescribedBy}
        aria-required={resolvedRequired}
        {...rest}
      />
    );
  }
);
InputEl.displayName = INPUT_EL_NAME;

function InputIcon<T extends React.ElementType = 'div'>({
  size,
  hasError,
  as,
  className,
  ...rest
}: PolymorphicComponentProps<T, InputSharedProps>) {
  const Component = as || 'div';
  const { icon } = inputVariants({ size, hasError });

  return <Component className={icon({ class: className })} {...rest} />;
}
InputIcon.displayName = INPUT_ICON_NAME;

function InputAffix({
  className,
  children,
  size,
  hasError,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & InputSharedProps) {
  const { affix } = inputVariants({
    size,
    hasError,
  });

  return (
    <div
      className={affix({ class: className })}
      // The affix truncates, so keep the full value reachable on hover.
      title={typeof children === 'string' ? children : undefined}
      {...rest}
    >
      {children}
    </div>
  );
}
InputAffix.displayName = INPUT_AFFIX_NAME;

function InputInlineAffix({
  className,
  children,
  size,
  hasError,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement> & InputSharedProps) {
  const { inlineAffix } = inputVariants({
    size,
    hasError,
  });

  return (
    <span className={inlineAffix({ class: className })} {...rest}>
      {children}
    </span>
  );
}
InputInlineAffix.displayName = INPUT_INLINE_AFFIX_NAME;

type InputProps = React.ComponentPropsWithoutRef<typeof InputEl> &
  Pick<
    React.ComponentPropsWithoutRef<typeof InputRoot>,
    'hasError' | 'size'
  > & {
    leadingIcon?: React.ElementType;
    trailingIcon?: React.ElementType;
    leadingNode?: React.ReactNode;
    trailingNode?: React.ReactNode;
    inlineLeadingNode?: React.ReactNode;
    inlineTrailingNode?: React.ReactNode;
  };

const InputComposed = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size,
      hasError,
      leadingIcon: LeadingIcon,
      trailingIcon: TrailingIcon,
      leadingNode,
      trailingNode,
      inlineLeadingNode,
      inlineTrailingNode,
      ...rest
    },
    forwardedRef
  ) => {
    return (
      <InputRoot size={size} hasError={hasError}>
        {leadingNode}
        <InputWrapper>
          {inlineLeadingNode}
          {LeadingIcon && <InputIcon as={LeadingIcon} />}
          <InputEl ref={forwardedRef} type='text' {...rest} />
          {TrailingIcon && <InputIcon as={TrailingIcon} />}
          {inlineTrailingNode}
        </InputWrapper>
        {trailingNode}
      </InputRoot>
    );
  }
);
InputComposed.displayName = 'InputComposed';

export {
  InputRoot as Root,
  InputWrapper as Wrapper,
  InputEl as Input,
  InputIcon as Icon,
  InputAffix as Affix,
  InputInlineAffix as InlineAffix,
  InputComposed as Composed,
};
