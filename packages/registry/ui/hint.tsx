'use client';

import * as React from 'react';

import type { PolymorphicComponentProps } from '@/lib/polymorphic';
import { recursiveCloneChildren } from '@/lib/recursive-clone-children';
import { tv, type VariantProps } from '@/lib/tv';

const HINT_ROOT_NAME = 'HintRoot';
const HINT_ICON_NAME = 'HintIcon';

export const hintVariants = tv({
  slots: {
    root: 'group flex items-center gap-1 text-paragraph-xs text-text-sub-600',
    icon: 'size-4 shrink-0 text-text-soft-400',
  },
  variants: {
    disabled: {
      true: {
        root: 'text-text-disabled-300',
        icon: 'text-text-disabled-300',
      },
    },
    hasError: {
      true: {
        root: 'text-error-base',
        icon: 'text-error-base',
      },
    },
  },
});

type HintSharedProps = VariantProps<typeof hintVariants>;

type HintRootProps = VariantProps<typeof hintVariants> &
  React.HTMLAttributes<HTMLDivElement>;

function HintRoot({
  children,
  hasError,
  disabled,
  className,
  ...rest
}: HintRootProps) {
  const uniqueId = React.useId();
  const { root } = hintVariants({ hasError, disabled });

  const sharedProps: HintSharedProps = {
    hasError,
    disabled,
  };

  const extendedChildren = recursiveCloneChildren(
    children as React.ReactElement[],
    sharedProps,
    [HINT_ICON_NAME],
    uniqueId,
  );

  return (
    <div className={root({ class: className })} {...rest}>
      {extendedChildren}
    </div>
  );
}
HintRoot.displayName = HINT_ROOT_NAME;

function HintIcon<T extends React.ElementType>({
  as,
  className,
  hasError,
  disabled,
  ...rest
}: PolymorphicComponentProps<T, HintSharedProps>) {
  const Component = as || 'div';
  const { icon } = hintVariants({ hasError, disabled });

  return <Component className={icon({ class: className })} {...rest} />;
}
HintIcon.displayName = HINT_ICON_NAME;

function HintDefaultIcon({
  className,
  ...rest
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      {...rest}
    >
      <path d='M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 7V9H13V7H11ZM11 11V17H13V11H11Z' />
    </svg>
  );
}

type HintComposedProps = VariantProps<typeof hintVariants> &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
    children: React.ReactNode;
    icon?: React.ElementType;
  };

function HintComposed({
  children,
  icon,
  hasError,
  disabled,
  ...rest
}: HintComposedProps) {
  return (
    <HintRoot hasError={hasError} disabled={disabled} {...rest}>
      <HintIcon as={icon || HintDefaultIcon} />
      {children}
    </HintRoot>
  );
}
HintComposed.displayName = 'HintComposed';

export {
  HintRoot as Root,
  HintIcon as Icon,
  HintDefaultIcon as DefaultIcon,
  HintComposed as Composed,
};
