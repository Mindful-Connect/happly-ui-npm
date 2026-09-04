'use client';

import * as React from 'react';
import {
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiEyeLine,
  RiEyeOffLine,
  RiLock2Line,
} from '@remixicon/react';

import { useFormField } from '@/lib/form-field-context';
import { cn } from '@/lib/happly-ui-utils';

import * as Input from './input';
import { LevelBar } from './level-bar';

// Cross-fade between the two eye glyphs: both stay in the DOM (one absolute),
// so the swap animates in and out without a motion dependency.
const EYE_ICON = [
  'h-5 w-5',
  'transition-[opacity,filter,scale] duration-300 ease-[cubic-bezier(0.2,0,0,1)]',
];
// `blur-0` does not exist in Tailwind v4 — `blur-none` is the "no blur" utility.
const EYE_ICON_SHOWN = 'scale-100 opacity-100 blur-none';
const EYE_ICON_HIDDEN = 'scale-[0.25] opacity-0 blur-[4px]';

type PasswordCriterion = {
  key: string;
  label: string;
  met: boolean;
};

type PasswordInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
> & {
  size?: 'medium' | 'small' | 'xsmall';
  hasError?: boolean;
  leadingIcon?: React.ElementType;
  showIcon?: React.ElementType;
  hideIcon?: React.ElementType;
  showStrength?: boolean;
  criteria?: PasswordCriterion[];
  criteriaLabel?: string;
};

const PasswordInputRoot = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    {
      size,
      hasError,
      placeholder = '••••••••••',
      leadingIcon: LeadingIcon = RiLock2Line,
      showIcon: ShowIcon = RiEyeLine,
      hideIcon: HideIcon = RiEyeOffLine,
      showStrength = false,
      criteria,
      criteriaLabel = 'Must contain at least:',
      disabled,
      ...rest
    },
    forwardedRef
  ) => {
    const formField = useFormField();
    const resolvedHasError = hasError ?? formField.hasError;
    const resolvedDisabled = disabled ?? formField.disabled;
    const [visible, setVisible] = React.useState(false);

    const metCount = criteria?.filter((c) => c.met).length ?? 0;
    const totalCriteria = criteria?.length ?? 0;

    return (
      <div className='flex flex-col gap-1'>
        <Input.Root size={size} hasError={resolvedHasError}>
          <Input.Wrapper>
            <Input.Icon as={LeadingIcon} />
            <Input.Input
              ref={forwardedRef}
              type={visible ? 'text' : 'password'}
              placeholder={placeholder}
              disabled={resolvedDisabled}
              {...rest}
            />
            <button
              type='button'
              onClick={() => setVisible((v) => !v)}
              disabled={resolvedDisabled}
              aria-label={visible ? 'Hide password' : 'Show password'}
              aria-pressed={visible}
              className={cn(
                'relative flex h-5 w-5 shrink-0 items-center justify-center rounded-md',
                'text-text-soft-400 transition-[color,box-shadow] duration-150 ease-out',
                'hover:text-text-strong-950',
                'focus-visible:shadow-button-important-focus focus-visible:outline-none',
                'disabled:text-text-disabled-300',
                // 24px hit area around the 20px glyph (WCAG 2.5.8)
                'after:absolute after:top-1/2 after:left-1/2 after:size-6 after:-translate-1/2'
              )}
            >
              <HideIcon
                aria-hidden='true'
                className={cn(
                  EYE_ICON,
                  'absolute inset-0',
                  visible ? EYE_ICON_SHOWN : EYE_ICON_HIDDEN
                )}
              />
              <ShowIcon
                aria-hidden='true'
                className={cn(
                  EYE_ICON,
                  visible ? EYE_ICON_HIDDEN : EYE_ICON_SHOWN
                )}
              />
            </button>
          </Input.Wrapper>
        </Input.Root>

        {showStrength && criteria && totalCriteria > 0 && (
          <div className='flex flex-col gap-2 pt-1.5'>
            <LevelBar levels={totalCriteria} level={metCount} />
            <div className='text-paragraph-xs text-text-sub-600'>
              {criteriaLabel}
            </div>
            {criteria.map((c) => (
              <div
                key={c.key}
                className='text-paragraph-xs text-text-sub-600 flex items-center gap-1.5'
              >
                {c.met ? (
                  <RiCheckboxCircleFill
                    aria-hidden='true'
                    className='text-success-base h-4 w-4 shrink-0'
                  />
                ) : (
                  <RiCloseCircleFill
                    aria-hidden='true'
                    className='text-text-soft-400 h-4 w-4 shrink-0'
                  />
                )}
                {c.label}
                {/* The icon and its color are the only "met" cue on screen —
                    give assistive tech the same information as text. */}
                <span className='sr-only'>{c.met ? 'Met' : 'Not met'}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);
PasswordInputRoot.displayName = 'PasswordInputRoot';

export { PasswordInputRoot as Root, type PasswordCriterion };
