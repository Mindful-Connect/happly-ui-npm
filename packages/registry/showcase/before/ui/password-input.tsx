'use client';

import * as React from 'react';
import {
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiEyeLine,
  RiEyeOffLine,
  RiLock2Line,
} from '@remixicon/react';

import { useFormField } from '../lib/form-field-context';

import * as Input from './input';
import { LevelBar } from './level-bar';

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
      criteriaLabel = 'Must contain at least;',
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
              tabIndex={-1}
            >
              {visible ? (
                <HideIcon className='text-text-soft-400 group-has-[disabled]:text-text-disabled-300 h-5 w-5' />
              ) : (
                <ShowIcon className='text-text-soft-400 group-has-[disabled]:text-text-disabled-300 h-5 w-5' />
              )}
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
                  <RiCheckboxCircleFill className='text-success-base h-4 w-4 shrink-0' />
                ) : (
                  <RiCloseCircleFill className='text-text-soft-400 h-4 w-4 shrink-0' />
                )}
                {c.label}
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
