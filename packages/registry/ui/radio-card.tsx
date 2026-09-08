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
      // ring + shadow both compile to box-shadow in Tailwind v4
      'transition-[background-color,box-shadow] duration-150 ease-out',
      // hover
      'hover:bg-bg-weak-50 hover:ring-transparent',
      // keyboard focus only — avoid sticky ring after mouse-click selection
      'has-[:focus-visible]:shadow-button-important-focus has-[:focus-visible]:ring-stroke-strong-950',
      // checked
      'data-[state=checked]:ring-stroke-strong-950',
      // disabled — unchecked flattens to gray, checked keeps the white card
      'data-[disabled]:pointer-events-none',
      'data-[disabled]:data-[state=unchecked]:bg-bg-weak-50 data-[disabled]:data-[state=unchecked]:ring-transparent data-[disabled]:data-[state=unchecked]:shadow-none',
      'data-[disabled]:data-[state=checked]:ring-stroke-soft-200',
    ],
    content: 'flex min-w-0 flex-1',
    title: [
      'text-label-sm text-text-strong-950 text-balance break-words',
      'transition-[color] duration-150 ease-out',
      // disabled — stacked group-data variants would compile to nested groups
      'group-[[data-disabled][data-state=unchecked]]/card:text-text-disabled-300',
      'group-[[data-disabled][data-state=checked]]/card:text-text-sub-600',
    ],
    description: [
      'text-paragraph-sm text-text-sub-600 text-pretty break-words',
      'transition-[color] duration-150 ease-out',
      // disabled — checked keeps the base sub-600
      'group-[[data-disabled][data-state=unchecked]]/card:text-text-disabled-300',
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

// Interactive content: a label does not forward a click that started inside
// one of these to its control, so no forwarded click follows.
const NO_LABEL_FORWARDING = 'a[href],button,input,select,textarea';

type RadioCardSharedProps = VariantProps<typeof radioCardVariants>;

// ─── Context ──────────────────────────────────────────────

type RadioCardContextType = RadioCardSharedProps & {
  allowDeselect?: boolean;
  disabled?: boolean;
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
      disabled: disabledProp,
      onValueChange: onValueChangeProp,
      value: valueProp,
      ...rest
    },
    forwardedRef
  ) => {
    const formField = useFormField();
    const resolvedHasError = hasError ?? formField.hasError;
    // Priority: explicit prop > form-field context (mirrors Radio.Group)
    const resolvedDisabled = disabledProp ?? formField.disabled;
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
          disabled: resolvedDisabled,
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
          disabled={resolvedDisabled}
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
      disabled: groupDisabled,
      onValueChange,
      value: groupValue,
    } = React.useContext(RadioCardContext);
    const { item } = radioCardVariants({ hasError });
    const isChecked = groupValue === value;
    const resolvedDisabled = disabled ?? groupDisabled;
    // <label> does not reliably name a role="radio" button, so the title and
    // description are wired to the indicator explicitly.
    const contentId = React.useId();
    const titleId = `${contentId}-title`;
    const descriptionId = `${contentId}-description`;

    // A click anywhere on the card is forwarded by the browser to the control
    // the label wraps — the Radix radio button — and that forwarded click
    // bubbles back through the label, so this handler saw two clicks per
    // gesture. With `allowDeselect` the pair deselected and immediately
    // re-selected, making a selected card impossible to turn off.
    //
    // Verified in Storybook (Chrome): the forwarded click carries
    // `detail: 1` and `isTrusted: true` exactly like the real one, so only
    // state can tell them apart. We arm on a click the browser will forward,
    // and swallow the one click that comes back targeting the radio. The
    // timer is a safety net for an arm whose echo never arrives.
    //
    // Paths checked — 1 handled call each, none swallowed by mistake:
    // click on the card body (real click handled, forwarded click swallowed) ·
    // click on the Indicator, Space on the Indicator, click on a button or
    // link inside the card (a label never forwards a click that started on
    // interactive content, so no echo and nothing is armed) · deselect click
    // (its `preventDefault` cancels the forwarding, so nothing is armed) ·
    // two clicks in quick succession (the echo is dispatched inside the first
    // click's own task, so the flag is always disarmed before the second
    // click — the previous version relied on a `setTimeout(0)` for this and
    // swallowed a second click that landed ~9ms later) · click while disabled
    // (blocked by `pointer-events-none`, and the deselect is guarded below).
    //
    // The swallow now runs before `onClick`, so a consumer's own handler is
    // called once per gesture rather than once per click event.
    const isEchoPendingRef = React.useRef(false);
    const echoTimerRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);

    React.useEffect(() => () => clearTimeout(echoTimerRef.current), []);

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLLabelElement>) => {
        const target = e.target instanceof Element ? e.target : null;

        if (isEchoPendingRef.current && target?.closest('[role="radio"]')) {
          isEchoPendingRef.current = false;
          clearTimeout(echoTimerRef.current);
          return;
        }

        onClick?.(e);

        if (!resolvedDisabled && allowDeselect && groupValue === value) {
          e.preventDefault();
          onValueChange?.('');
        }

        // The click is forwarded unless it was cancelled above or started on
        // interactive content, which a label never forwards from.
        if (
          !e.isDefaultPrevented() &&
          target &&
          !target.closest(NO_LABEL_FORWARDING)
        ) {
          isEchoPendingRef.current = true;
          clearTimeout(echoTimerRef.current);
          echoTimerRef.current = setTimeout(() => {
            isEchoPendingRef.current = false;
          }, 0);
        }
      },
      [
        allowDeselect,
        groupValue,
        value,
        onValueChange,
        onClick,
        resolvedDisabled,
      ]
    );

    return (
      <RadioCardItemContext.Provider
        value={{ value, disabled: resolvedDisabled, titleId, descriptionId }}
      >
        <label
          ref={forwardedRef}
          className={item({ class: className })}
          data-state={isChecked ? 'checked' : 'unchecked'}
          data-disabled={resolvedDisabled ? '' : undefined}
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
  titleId?: string;
  descriptionId?: string;
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
>(
  (
    {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    forwardedRef
  ) => {
    const { value, disabled, titleId, descriptionId } =
      React.useContext(RadioCardItemContext);

    return (
      <Radio.Item
        ref={forwardedRef}
        value={value}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabel ? undefined : (ariaLabelledBy ?? titleId)}
        aria-describedby={ariaDescribedBy ?? descriptionId}
        {...props}
      />
    );
  }
);
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
>(({ className, id, ...rest }, forwardedRef) => {
  const { hasError } = React.useContext(RadioCardContext);
  const { titleId } = React.useContext(RadioCardItemContext);
  const { title } = radioCardVariants({ hasError });

  return (
    <span
      ref={forwardedRef}
      id={id ?? titleId}
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
>(({ className, id, ...rest }, forwardedRef) => {
  const { hasError } = React.useContext(RadioCardContext);
  const { descriptionId } = React.useContext(RadioCardItemContext);
  const { description } = radioCardVariants({ hasError });

  return (
    <p
      ref={forwardedRef}
      id={id ?? descriptionId}
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
