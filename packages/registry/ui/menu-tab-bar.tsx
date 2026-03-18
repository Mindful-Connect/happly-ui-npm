'use client';

import * as React from 'react';

import type { PolymorphicComponentProps } from '@/lib/polymorphic';
import { cn } from '@/lib/happly-ui-utils';
import { recursiveCloneChildren } from '@/lib/recursive-clone-children';
import { tv, type VariantProps } from '@/lib/tv';

const MENU_TAB_BAR_ROOT_NAME = 'MenuTabBarRoot';
const MENU_TAB_BAR_ITEM_NAME = 'MenuTabBarItem';
const MENU_TAB_BAR_ICON_NAME = 'MenuTabBarIcon';

export const menuTabBarVariants = tv({
  slots: {
    root: 'relative flex items-center gap-8 border-b border-stroke-soft-200 px-6',
    item: [
      'relative flex shrink-0 cursor-pointer items-center justify-center gap-[3px] pb-3.5 text-label-xs',
      'transition-colors duration-300 ease-out',
      'disabled:pointer-events-none disabled:opacity-50',
    ],
    icon: 'size-4 shrink-0',
    indicator:
      'absolute bottom-0 left-0 h-0.5 rounded-full transition-[transform,width] duration-300',
  },
  variants: {
    variant: {
      neutral: {},
      primary: {},
    },
    selected: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variant: 'neutral',
      selected: true,
      class: { item: 'text-text-strong-950' },
    },
    {
      variant: 'neutral',
      selected: false,
      class: { item: 'text-text-sub-600 hover:text-text-strong-950' },
    },
    {
      variant: 'primary',
      selected: true,
      class: { item: 'text-primary-base' },
    },
    {
      variant: 'primary',
      selected: false,
      class: { item: 'text-text-sub-600 hover:text-text-strong-950' },
    },
  ],
  defaultVariants: {
    variant: 'neutral',
    selected: false,
  },
});

type MenuTabBarSharedProps = {
  variant?: VariantProps<typeof menuTabBarVariants>['variant'];
  rootRef?: React.RefObject<HTMLDivElement | null>;
  scrollMargin?: number;
};

type MenuTabBarRootProps = Pick<
  VariantProps<typeof menuTabBarVariants>,
  'variant'
> &
  React.HTMLAttributes<HTMLDivElement> & {
    /**
     * Extra pixels to add below the auto-detected offset.
     * The component already accounts for sticky headers by measuring
     * its own bottom edge — use this only for additional spacing.
     * @default 16
     */
    scrollMargin?: number;
  };

function MenuTabBarRoot({
  children,
  className,
  variant,
  scrollMargin = 16,
  ...rest
}: MenuTabBarRootProps) {
  const uniqueId = React.useId();
  const { root, indicator } = menuTabBarVariants({ variant });
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const [lineStyle, setLineStyle] = React.useState({ width: 0, left: 0 });

  const updateIndicator = React.useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeTab = container.querySelector(
      '[role="tab"][aria-selected="true"]'
    ) as HTMLElement | null;

    if (activeTab) {
      const containerRect = container.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();
      setLineStyle({
        width: tabRect.width,
        left: tabRect.left - containerRect.left,
      });
    }
  }, []);

  React.useEffect(() => {
    setMounted(true);

    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(updateIndicator);
    resizeObserver.observe(container);

    const mutationObserver = new MutationObserver(updateIndicator);
    mutationObserver.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-selected'],
    });

    updateIndicator();

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [updateIndicator]);

  const sharedProps: MenuTabBarSharedProps = {
    variant,
    rootRef: containerRef,
    scrollMargin,
  };

  const extendedChildren = recursiveCloneChildren(
    children as React.ReactElement[],
    sharedProps,
    [MENU_TAB_BAR_ITEM_NAME],
    uniqueId
  );

  return (
    <div
      ref={containerRef}
      role='tablist'
      className={root({ class: className })}
      {...rest}
    >
      {extendedChildren}

      {/* sliding indicator */}
      <div
        className={cn(indicator(), {
          hidden: !mounted,
          'bg-text-strong-950': variant !== 'primary',
          'bg-primary-base': variant === 'primary',
        })}
        style={{
          width: `${lineStyle.width}px`,
          transform: `translateX(${lineStyle.left}px)`,
          transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)',
        }}
        aria-hidden='true'
      />
    </div>
  );
}
MenuTabBarRoot.displayName = MENU_TAB_BAR_ROOT_NAME;

type MenuTabBarItemProps = MenuTabBarSharedProps &
  VariantProps<typeof menuTabBarVariants> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    /** Element ID to scroll to when clicked. */
    scrollTo?: string;
  };

const MenuTabBarItem = React.forwardRef<
  HTMLButtonElement,
  MenuTabBarItemProps
>(
  (
    {
      children,
      className,
      variant,
      selected,
      scrollTo,
      rootRef,
      scrollMargin = 16,
      onClick,
      ...rest
    },
    ref
  ) => {
    const uniqueId = React.useId();
    const { item } = menuTabBarVariants({ variant, selected });

    const sharedProps: MenuTabBarSharedProps = {
      variant,
      rootRef,
      scrollMargin,
    };

    const extendedChildren = recursiveCloneChildren(
      children as React.ReactElement[],
      sharedProps,
      [MENU_TAB_BAR_ICON_NAME],
      uniqueId
    );

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (scrollTo) {
          const target = document.getElementById(scrollTo);
          if (target) {
            // Auto-detect offset from the tab bar's bottom edge.
            // This accounts for any sticky headers above it.
            const barBottom = rootRef?.current
              ? rootRef.current.getBoundingClientRect().bottom
              : 0;

            const top =
              target.getBoundingClientRect().top +
              window.scrollY -
              barBottom -
              scrollMargin;

            window.scrollTo({ top, behavior: 'smooth' });
          }
        }
        onClick?.(e);
      },
      [scrollTo, rootRef, scrollMargin, onClick]
    );

    return (
      <button
        ref={ref}
        type='button'
        role='tab'
        aria-selected={selected === true}
        className={item({ class: className })}
        onClick={handleClick}
        {...rest}
      >
        {extendedChildren}
      </button>
    );
  }
);
MenuTabBarItem.displayName = MENU_TAB_BAR_ITEM_NAME;

type MenuTabBarIconProps = MenuTabBarSharedProps &
  React.HTMLAttributes<HTMLDivElement>;

function MenuTabBarIcon<T extends React.ElementType>({
  className,
  as,
  ...rest
}: PolymorphicComponentProps<T, MenuTabBarIconProps>) {
  const Component = as || 'div';
  const { icon } = menuTabBarVariants();

  return <Component className={icon({ class: className })} {...rest} />;
}
MenuTabBarIcon.displayName = MENU_TAB_BAR_ICON_NAME;

type MenuTabBarComposedProps = Omit<MenuTabBarRootProps, 'children'> & {
  value: string;
  onValueChange?: (value: string) => void;
  items: {
    label: string;
    value: string;
    disabled?: boolean;
    icon?: React.ElementType;
    /** Element ID to scroll to. Defaults to the item's `value`. */
    scrollTo?: string;
  }[];
};

function MenuTabBarComposed({
  value,
  onValueChange,
  items,
  variant,
  scrollMargin,
  ...rest
}: MenuTabBarComposedProps) {
  return (
    <MenuTabBarRoot variant={variant} scrollMargin={scrollMargin} {...rest}>
      {items.map((tab) => (
        <MenuTabBarItem
          key={tab.value}
          selected={value === tab.value}
          disabled={tab.disabled}
          scrollTo={tab.scrollTo ?? tab.value}
          onClick={() => onValueChange?.(tab.value)}
        >
          {tab.icon && <MenuTabBarIcon as={tab.icon} />}
          <span>{tab.label}</span>
        </MenuTabBarItem>
      ))}
    </MenuTabBarRoot>
  );
}
MenuTabBarComposed.displayName = 'MenuTabBarComposed';

export {
  MenuTabBarRoot as Root,
  MenuTabBarItem as Item,
  MenuTabBarIcon as Icon,
  MenuTabBarComposed as Composed,
  MenuTabBarComposed as MenuTabBar,
};
