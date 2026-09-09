'use client';

import * as React from 'react';
import { RiInformationFill } from '@remixicon/react';

import type { PolymorphicComponentProps } from '@/lib/polymorphic';
import { recursiveCloneChildren } from '@/lib/recursive-clone-children';
import { tv, type VariantProps } from '@/lib/tv';

const HINT_ROOT_NAME = 'HintRoot';
const HINT_ICON_NAME = 'HintIcon';

export const hintVariants = tv({
  slots: {
    root: 'group flex items-center gap-1 text-paragraph-xs text-text-sub-600',
    icon: 'w-4 h-4 shrink-0 text-text-soft-400',
  },
  variants: {
    // Disabled fields keep the hint at its normal colors (the new disabled
    // design only mutes the control itself); the prop is kept for API compat.
    disabled: {
      true: {},
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
    uniqueId
  );

  return (
    <div className={root({ class: className })} {...rest}>
      {extendedChildren}
    </div>
  );
}
HintRoot.displayName = HINT_ROOT_NAME;

function HintIcon<T extends React.ElementType = typeof RiInformationFill>({
  as,
  className,
  hasError,
  disabled,
  ...rest
}: PolymorphicComponentProps<T, HintSharedProps>) {
  const Component = as || RiInformationFill;
  const { icon } = hintVariants({ hasError, disabled });

  // Decorative: the hint text beside it carries the meaning.
  return (
    <Component
      aria-hidden='true'
      className={icon({ class: className })}
      {...rest}
    />
  );
}
HintIcon.displayName = HINT_ICON_NAME;

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
      <HintIcon as={icon} />
      {children}
    </HintRoot>
  );
}
HintComposed.displayName = 'HintComposed';

export { HintRoot as Root, HintIcon as Icon, HintComposed as Composed };
