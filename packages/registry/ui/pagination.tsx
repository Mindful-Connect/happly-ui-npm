'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/happly-ui-utils';
import type { PolymorphicComponentProps } from '@/lib/polymorphic';
import { recursiveCloneChildren } from '@/lib/recursive-clone-children';
import { tv, type VariantProps } from '@/lib/tv';

const PAGINATION_ROOT_NAME = 'PaginationRoot';
const PAGINATION_ITEM_NAME = 'PaginationItem';
const PAGINATION_NAV_BUTTON_NAME = 'PaginationNavButton';
const PAGINATION_NAV_ICON_NAME = 'PaginationNavIcon';

export const paginationVariants = tv({
  slots: {
    root: 'flex flex-wrap items-center justify-center',
    item: [
      'flex items-center justify-center text-center text-label-sm tabular-nums text-text-sub-600',
      'transition-[background-color,color,box-shadow] duration-150 ease-out',
      'outline-none focus-visible:shadow-button-important-focus',
      // a disabled page / arrow looked identical to an enabled one
      'disabled:pointer-events-none disabled:text-text-disabled-300',
    ],
    navButton: [
      'flex items-center justify-center text-text-sub-600',
      'transition-[background-color,color,box-shadow] duration-150 ease-out',
      'outline-none focus-visible:shadow-button-important-focus',
      'disabled:pointer-events-none disabled:text-text-disabled-300',
    ],
    navIcon: 'w-5 h-5',
  },
  variants: {
    variant: {
      basic: {
        root: 'gap-2',
        item: [
          // base
          'h-8 min-w-8 rounded-lg px-1.5 ring-1 ring-inset ring-stroke-soft-200',
          // hover
          'hover:bg-bg-weak-50 hover:ring-transparent',
        ],
        navButton: [
          // base
          'w-8 h-8 rounded-lg',
          // hover
          'hover:bg-bg-weak-50',
        ],
      },
      rounded: {
        root: 'gap-2',
        item: [
          // base
          'h-8 min-w-8 rounded-full px-1.5 ring-1 ring-inset ring-stroke-soft-200',
          // hover
          'hover:bg-bg-weak-50 hover:ring-transparent',
        ],
        navButton: [
          // base
          'w-8 h-8 rounded-full',
          // hover
          'hover:bg-bg-weak-50',
        ],
      },
      group: {
        root: 'divide-x divide-stroke-soft-200 overflow-hidden rounded-lg border border-stroke-soft-200',
        item: [
          // base
          'h-8 min-w-10 px-1.5',
          // hover
          'hover:bg-bg-weak-50',
        ],
        navButton: [
          // base
          'h-8 w-10 px-1.5',
          // hover
          'hover:bg-bg-weak-50',
        ],
      },
    },
  },
  defaultVariants: {
    variant: 'basic',
  },
});

type PaginationSharedProps = VariantProps<typeof paginationVariants>;

type PaginationRootProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof paginationVariants> & {
    asChild?: boolean;
  };

function PaginationRoot({
  asChild,
  children,
  className,
  variant,
  'aria-label': ariaLabel = 'Pagination',
  ...rest
}: PaginationRootProps) {
  const uniqueId = React.useId();
  // A pagination control is a navigation landmark (ARIA APG); multiple
  // landmarks of one type need distinguishing labels.
  const Component = asChild ? Slot : 'nav';
  const { root } = paginationVariants({ variant });

  const sharedProps: PaginationSharedProps = {
    variant,
  };

  const extendedChildren = recursiveCloneChildren(
    children as React.ReactElement[],
    sharedProps,
    [
      PAGINATION_ITEM_NAME,
      PAGINATION_NAV_BUTTON_NAME,
      PAGINATION_NAV_ICON_NAME,
    ],
    uniqueId,
    asChild
  );

  return (
    <Component
      aria-label={ariaLabel}
      className={root({ class: className })}
      {...rest}
    >
      {extendedChildren}
    </Component>
  );
}
PaginationRoot.displayName = PAGINATION_ROOT_NAME;

type PaginationItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  PaginationSharedProps & {
    asChild?: boolean;
    current?: boolean;
  };

const PaginationItem = React.forwardRef<HTMLButtonElement, PaginationItemProps>(
  (
    { asChild, children, className, variant, current, ...rest },
    forwardedRef
  ) => {
    const Component = asChild ? Slot : 'button';
    const { item } = paginationVariants({ variant });

    return (
      <Component
        ref={forwardedRef}
        aria-current={current ? 'page' : undefined}
        className={cn(item({ class: className }), {
          'text-text-strong-950': current,
        })}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);
PaginationItem.displayName = PAGINATION_ITEM_NAME;

type PaginationNavButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  PaginationSharedProps & {
    asChild?: boolean;
  };

const PaginationNavButton = React.forwardRef<
  HTMLButtonElement,
  PaginationNavButtonProps
>(({ asChild, children, className, variant, ...rest }, forwardedRef) => {
  const Component = asChild ? Slot : 'button';
  const { navButton } = paginationVariants({ variant });

  return (
    <Component
      ref={forwardedRef}
      className={navButton({ class: className })}
      {...rest}
    >
      {children}
    </Component>
  );
});
PaginationNavButton.displayName = PAGINATION_NAV_BUTTON_NAME;

function PaginationNavIcon<T extends React.ElementType>({
  variant,
  className,
  as,
  ...rest
}: PolymorphicComponentProps<T, PaginationSharedProps>) {
  const Component = as || 'div';
  const { navIcon } = paginationVariants({ variant });

  return <Component className={navIcon({ class: className })} {...rest} />;
}
PaginationNavIcon.displayName = PAGINATION_NAV_ICON_NAME;

export {
  PaginationRoot as Root,
  PaginationItem as Item,
  PaginationNavButton as NavButton,
  PaginationNavIcon as NavIcon,
};
