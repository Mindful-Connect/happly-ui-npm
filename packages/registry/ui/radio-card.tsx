'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import * as Radio from './radio';
import { useFormField } from '@/lib/form-field-context';
import { cn } from '@/lib/happly-ui-utils';
import { useFormFieldBinding } from '@/lib/use-form-field-binding';
import { tv, type VariantProps } from '@/lib/tv';

const radioCardVariants = tv({
  slots: {
    root: 'flex flex-col gap-2',
    item: [
      // base
      'group/card relative flex w-full cursor-pointer items-center gap-3.5 rounded-xl p-4',
      'bg-bg-white-0 shadow-regular-xs',
      'ring-1 ring-inset ring-stroke-soft-200',
      'transition duration-200 ease-out',
      // hover
      'hover:bg-bg-weak-50 hover:ring-transparent',
      // keyboard focus only — avoid sticky ring after mouse-click selection
      'has-[:focus-visible]:shadow-button-important-focus has-[:focus-visible]:ring-stroke-strong-950',
      // checked
      'data-[state=checked]:ring-stroke-strong-950',
      // disabled (must override checked state)
      'data-[disabled]:pointer-events-none data-[disabled]:shadow-none data-[disabled]:bg-bg-weak-50',
      'data-[disabled]:ring-stroke-soft-200',
      'data-[disabled]:data-[state=checked]:ring-stroke-soft-200',
    ],
    content: 'flex min-w-0 flex-1',
    title: [
      'text-label-sm text-text-strong-950',
      'transition duration-200 ease-out',
      // disabled
      'group-data-[disabled]/card:text-text-disabled-300',
    ],
    description: [
      'text-paragraph-sm text-text-sub-600',
      'transition duration-200 ease-out',
      // disabled
      'group-data-[disabled]/card:text-text-disabled-300',
    ],
  },
  variants: {
    hasError: {
      true: {
        item: [
          // base
          'ring-error-base',
          // keyboard focus only — avoid sticky ring after mouse-click selection
          'has-[:focus-visible]:shadow-button-error-focus has-[:focus-visible]:ring-error-base',
          // checked
          'data-[state=checked]:ring-error-base',
        ],
      },
    },
    variant: {
      primary: {},
      neutral: {},
    },
  },
  defaultVariants: {
    variant: 'neutral',
  },
});

type RadioCardSharedProps = VariantProps<typeof radioCardVariants>;

// ─── Context ──────────────────────────────────────────────

type RadioCardContextType = RadioCardSharedProps & {
  allowDeselect?: boolean;
  onValueChange?: (value: string) => void;
  value?: string | null;
};

const RadioCardContext = React.createContext<RadioCardContextType>({});

// ─── Root ─────────────────────────────────────────────────

type RadioCardRootProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Root
> &
  RadioCardSharedProps & {
    allowDeselect?: boolean;
  };

const RadioCardRoot = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  RadioCardRootProps
>(
  (
    {
      className,
      children,
      hasError,
      variant = 'neutral',
      allowDeselect,
      onValueChange: onValueChangeProp,
      value: valueProp,
      ...rest
    },
    forwardedRef
  ) => {
    const formField = useFormField();
    const resolvedHasError = hasError ?? formField.hasError;
    const { root } = radioCardVariants({ hasError: resolvedHasError, variant });
    const binding = useFormFieldBinding<string>();

    // Priority: explicit props > RHF binding > undefined
    const resolvedValue = valueProp !== undefined ? valueProp : binding?.value;
    const resolvedOnValueChange = onValueChangeProp ?? binding?.onChange;

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        resolvedOnValueChange?.(newValue);
      },
      [resolvedOnValueChange]
    );

    return (
      <RadioCardContext.Provider
        value={{
          hasError: resolvedHasError,
          variant,
          allowDeselect,
          onValueChange: resolvedOnValueChange,
          value: resolvedValue,
        }}
      >
        <Radio.Group
          variant={variant === 'primary' ? 'primary' : 'neutral'}
          ref={forwardedRef}
          className={root({ class: className })}
          value={resolvedValue}
          onValueChange={handleValueChange}
          {...rest}
        >
          {children}
        </Radio.Group>
      </RadioCardContext.Provider>
    );
  }
);
RadioCardRoot.displayName = 'RadioCardRoot';

// ─── Item ─────────────────────────────────────────────────

type RadioCardItemProps = React.ComponentPropsWithoutRef<'label'> & {
  value: string;
  disabled?: boolean;
};

const RadioCardItem = React.forwardRef<HTMLLabelElement, RadioCardItemProps>(
  (
    { className, children, value, disabled, onClick, ...rest },
    forwardedRef
  ) => {
    const {
      hasError,
      allowDeselect,
      onValueChange,
      value: groupValue,
    } = React.useContext(RadioCardContext);
    const { item } = radioCardVariants({ hasError });
    const isChecked = groupValue === value;

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLLabelElement>) => {
        onClick?.(e);
        if (allowDeselect && groupValue === value) {
          e.preventDefault();
          onValueChange?.('');
        }
      },
      [allowDeselect, groupValue, value, onValueChange, onClick]
    );

    return (
      <RadioCardItemContext.Provider value={{ value, disabled }}>
        <label
          ref={forwardedRef}
          className={item({ class: className })}
          data-state={isChecked ? 'checked' : 'unchecked'}
          data-disabled={disabled ? '' : undefined}
          onClick={handleClick}
          {...rest}
        >
          {children}
        </label>
      </RadioCardItemContext.Provider>
    );
  }
);
RadioCardItem.displayName = 'RadioCardItem';

type RadioCardItemContextType = {
  value: string;
  disabled?: boolean;
};

const RadioCardItemContext = React.createContext<RadioCardItemContextType>({
  value: '',
});

// ─── Indicator ────────────────────────────────────────────

type RadioCardIndicatorProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
  'value' | 'disabled' | 'children'
>;

const RadioCardIndicator = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  RadioCardIndicatorProps
>((props, forwardedRef) => {
  const { value, disabled } = React.useContext(RadioCardItemContext);

  return (
    <Radio.Item
      ref={forwardedRef}
      value={value}
      disabled={disabled}
      {...props}
    />
  );
});
RadioCardIndicator.displayName = 'RadioCardIndicator';

// ─── Content ──────────────────────────────────────────────

type RadioCardContentProps = React.ComponentPropsWithoutRef<'div'> & {
  inline?: boolean;
};

const RadioCardContent = React.forwardRef<
  HTMLDivElement,
  RadioCardContentProps
>(({ className, inline, ...rest }, forwardedRef) => {
  const { hasError } = React.useContext(RadioCardContext);
  const { content } = radioCardVariants({ hasError });

  return (
    <div
      ref={forwardedRef}
      className={content({
        class: cn(
          inline ? 'flex-wrap items-center gap-x-1.5' : 'flex-col gap-1',
          className
        ),
      })}
      {...rest}
    />
  );
});
RadioCardContent.displayName = 'RadioCardContent';

// ─── Title ────────────────────────────────────────────────

const RadioCardTitle = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<'span'>
>(({ className, ...rest }, forwardedRef) => {
  const { hasError } = React.useContext(RadioCardContext);
  const { title } = radioCardVariants({ hasError });

  return (
    <span
      ref={forwardedRef}
      className={title({ class: className })}
      {...rest}
    />
  );
});
RadioCardTitle.displayName = 'RadioCardTitle';

// ─── Description ──────────────────────────────────────────

const RadioCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<'p'>
>(({ className, ...rest }, forwardedRef) => {
  const { hasError } = React.useContext(RadioCardContext);
  const { description } = radioCardVariants({ hasError });

  return (
    <p
      ref={forwardedRef}
      className={description({ class: className })}
      {...rest}
    />
  );
});
RadioCardDescription.displayName = 'RadioCardDescription';

// ─── Composed ─────────────────────────────────────────────

type RadioCardComposedProps = Omit<
  React.ComponentPropsWithoutRef<'label'>,
  'title'
> & {
  value: string;
  disabled?: boolean;
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  inline?: boolean;
};

const RadioCardComposed = React.forwardRef<
  HTMLLabelElement,
  RadioCardComposedProps
>(
  (
    { title, description, icon, badge, inline, value, disabled, ...rest },
    forwardedRef
  ) => {
    return (
      <RadioCardItem
        ref={forwardedRef}
        value={value}
        disabled={disabled}
        {...rest}
      >
        {icon}
        <RadioCardContent inline={inline}>
          {badge ? (
            <div className='flex items-center gap-2'>
              <RadioCardTitle>{title}</RadioCardTitle>
              {badge}
            </div>
          ) : (
            <RadioCardTitle>{title}</RadioCardTitle>
          )}
          {description && (
            <RadioCardDescription>{description}</RadioCardDescription>
          )}
        </RadioCardContent>
        <RadioCardIndicator />
      </RadioCardItem>
    );
  }
);
RadioCardComposed.displayName = 'RadioCardComposed';

// ─── Exports ──────────────────────────────────────────────

export {
  RadioCardRoot as Root,
  RadioCardItem as Item,
  RadioCardIndicator as Indicator,
  RadioCardContent as Content,
  RadioCardTitle as Title,
  RadioCardDescription as Description,
  RadioCardComposed as Composed,
  RadioCardComposed as RadioCard,
};
