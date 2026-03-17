'use client';

import * as React from 'react';
import * as LabelPrimitives from '@radix-ui/react-label';

import * as Tooltip from '@/components/ui/tooltip';
import { cn } from '@/lib/happly-ui-utils';

const LabelRoot = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitives.Root> & {
    disabled?: boolean;
  }
>(({ className, disabled, ...rest }, forwardedRef) => {
  return (
    <LabelPrimitives.Root
      ref={forwardedRef}
      className={cn(
        'group text-label-sm text-text-strong-950 cursor-pointer',
        'inline',
        // disabled
        'aria-disabled:text-text-disabled-300',
        className,
      )}
      aria-disabled={disabled}
      {...rest}
    />
  );
});
LabelRoot.displayName = 'LabelRoot';

function LabelAsterisk({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'ml-px text-error-base',
        // disabled
        'group-aria-disabled:text-text-disabled-300',
        className,
      )}
      {...rest}
    >
      {children || '*'}
    </span>
  );
}

function LabelSub({
  children,
  className,
  parens,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement> & {
  parens?: boolean;
}) {
  return (
    <span
      className={cn(
        'ml-px text-paragraph-sm text-text-sub-600',
        // disabled
        'group-aria-disabled:text-text-disabled-300',
        className,
      )}
      {...rest}
    >
      {parens ? `(${children})` : children}
    </span>
  );
}

function LabelInfoIcon({
  className,
  ...rest
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('w-5 h-5 text-text-disabled-300', className)}
      {...rest}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10 16.25a6.25 6.25 0 100-12.5 6.25 6.25 0 000 12.5zm1.116-3.041l.1-.408a1.709 1.709 0 01-.25.083 1.176 1.176 0 01-.308.048c-.193 0-.329-.032-.407-.095-.079-.064-.118-.184-.118-.359a3.514 3.514 0 01.118-.672l.373-1.318c.037-.121.062-.255.075-.4a3.73 3.73 0 00.02-.304.866.866 0 00-.292-.678c-.195-.174-.473-.26-.833-.26-.2 0-.412.035-.636.106-.224.07-.459.156-.704.256l-.1.409c.073-.028.16-.057.262-.087.101-.03.2-.045.297-.045.198 0 .331.034.4.1.07.066.105.185.105.354 0 .093-.01.197-.034.31a6.216 6.216 0 01-.084.36l-.374 1.325c-.033.14-.058.264-.073.374-.015.11-.022.22-.022.325 0 .272.1.496.301.673.201.177.483.265.846.265.236 0 .443-.03.621-.092s.417-.152.717-.27zM11.05 7.85a.772.772 0 00.26-.587.78.78 0 00-.26-.59.885.885 0 00-.628-.244.893.893 0 00-.63.244.778.778 0 00-.264.59c0 .23.088.426.263.587a.897.897 0 00.63.243.888.888 0 00.629-.243z'
        fill='currentColor'
      />
    </svg>
  );
}

function LabelInfo({
  children,
  iconClassName,
}: {
  children: React.ReactNode;
  iconClassName?: string;
}) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button type='button' className='ml-px inline-flex align-middle'>
            <LabelInfoIcon className={iconClassName} />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content size='xsmall'>{children}</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

type LabelComposedProps = React.ComponentPropsWithoutRef<
  typeof LabelPrimitives.Root
> & {
  required?: boolean;
  sub?: React.ReactNode;
  subParens?: boolean;
  info?: React.ReactNode;
  disabled?: boolean;
};

const LabelComposed = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitives.Root>,
  LabelComposedProps
>(
  (
    { children, required, sub, subParens, info, disabled, ...rest },
    forwardedRef,
  ) => {
    return (
      <LabelRoot ref={forwardedRef} disabled={disabled} {...rest}>
        {children}
        {required && <LabelAsterisk />}
        {sub && <LabelSub parens={subParens}>{sub}</LabelSub>}
        {info && <LabelInfo>{info}</LabelInfo>}
      </LabelRoot>
    );
  },
);
LabelComposed.displayName = 'LabelComposed';

export {
  LabelRoot as Root,
  LabelAsterisk as Asterisk,
  LabelSub as Sub,
  LabelInfoIcon as InfoIcon,
  LabelInfo as Info,
  LabelComposed as Composed,
};
