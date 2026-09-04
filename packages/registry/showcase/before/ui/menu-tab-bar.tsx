'use client';

import * as React from 'react';

import type { PolymorphicComponentProps } from '../lib/polymorphic';
import { cn } from '../lib/happly-ui-utils';
import { recursiveCloneChildren } from '../lib/recursive-clone-children';
import { tv, type VariantProps } from '../lib/tv';

const MENU_TAB_BAR_ROOT_NAME = 'MenuTabBarRoot';
const MENU_TAB_BAR_ITEM_NAME = 'MenuTabBarItem';
const MENU_TAB_BAR_ICON_NAME = 'MenuTabBarIcon';

const FADE_SIZE = 24;

type MenuTabBarContextValue = {
  rootRef: React.RefObject<HTMLDivElement | null>;
  scrollMargin: number;
};

const MenuTabBarContext = React.createContext<MenuTabBarContextValue | null>(
  null
);

function buildMaskImage(canScrollLeft: boolean, canScrollRight: boolean) {
  if (!canScrollLeft && !canScrollRight) return 'none';

  const left = canScrollLeft
    ? `linear-gradient(to right, transparent, black ${FADE_SIZE}px)`
    : 'linear-gradient(black, black)';
  const right = canScrollRight
    ? `linear-gradient(to left, transparent, black ${FADE_SIZE}px)`
    : 'linear-gradient(black, black)';

  return `${left}, ${right}`;
}

const maskCompositeStyle = {
  maskComposite: 'intersect',
  WebkitMaskComposite: 'source-in',
} as React.CSSProperties;

export const menuTabBarVariants = tv({
  slots: {
    root: 'relative flex items-center gap-8 overflow-x-auto border-b border-stroke-soft-200 px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
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
};

type MenuTabBarRootProps = Pick<
  VariantProps<typeof menuTabBarVariants>,
  'variant'
> &
  React.HTMLAttributes<HTMLDivElement> & {
    /**
     * Gap in pixels left above the target section when scrolling to it.
     * Works whether the page or a nested overflow element is the scroller.
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
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const updateScrollState = React.useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

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
        left: tabRect.left - containerRect.left + container.scrollLeft,
      });
    }
  }, []);

  React.useEffect(() => {
    setMounted(true);

    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      updateIndicator();
      updateScrollState();
    };

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(container);

    const mutationObserver = new MutationObserver(update);
    mutationObserver.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-selected'],
    });

    update();

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [updateIndicator, updateScrollState]);

  const handleScroll = React.useCallback(() => {
    updateScrollState();
    updateIndicator();
  }, [updateScrollState, updateIndicator]);

  const sharedProps: MenuTabBarSharedProps = {
    variant,
  };

  const extendedChildren = recursiveCloneChildren(
    children as React.ReactElement[],
    sharedProps,
    [MENU_TAB_BAR_ITEM_NAME],
    uniqueId
  );

  const maskImage = buildMaskImage(canScrollLeft, canScrollRight);

  const ctxValue = React.useMemo<MenuTabBarContextValue>(
    () => ({ rootRef: containerRef, scrollMargin }),
    [scrollMargin]
  );

  return (
    <MenuTabBarContext.Provider value={ctxValue}>
      <div
        ref={containerRef}
        role='tablist'
        className={root({ class: className })}
        onScroll={handleScroll}
        style={
          maskImage !== 'none'
            ? { maskImage, WebkitMaskImage: maskImage, ...maskCompositeStyle }
            : undefined
        }
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
    </MenuTabBarContext.Provider>
  );
}
MenuTabBarRoot.displayName = MENU_TAB_BAR_ROOT_NAME;

type MenuTabBarItemProps = MenuTabBarSharedProps &
  VariantProps<typeof menuTabBarVariants> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    /** Element ID to scroll to when clicked. */
    scrollTo?: string;
  };

/**
 * Find the nearest scrollable ancestor of an element, or null when the page
 * itself is the scroller. Lets scrollTo work inside nested overflow containers,
 * not only when the whole window scrolls.
 */
function getScrollableParent(el: HTMLElement | null): HTMLElement | null {
  let node = el?.parentElement ?? null;
  while (node) {
    const { overflowY } = window.getComputedStyle(node);
    const scrollable =
      overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay';
    if (scrollable && node.scrollHeight > node.clientHeight) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
}

const MenuTabBarItem = React.forwardRef<HTMLButtonElement, MenuTabBarItemProps>(
  (
    { children, className, variant, selected, scrollTo, onClick, ...rest },
    ref
  ) => {
    const uniqueId = React.useId();
    const ctx = React.useContext(MenuTabBarContext);
    const { item } = menuTabBarVariants({ variant, selected });

    const sharedProps: MenuTabBarSharedProps = {
      variant,
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
            const margin = ctx?.scrollMargin ?? 16;
            const scroller = getScrollableParent(target);
            if (scroller) {
              // Scroll within the actual scroll container, not the window.
              const top =
                scroller.scrollTop +
                target.getBoundingClientRect().top -
                scroller.getBoundingClientRect().top -
                margin;
              scroller.scrollTo({ top, behavior: 'smooth' });
            } else {
              // The page itself is the scroller.
              const top =
                target.getBoundingClientRect().top + window.scrollY - margin;
              window.scrollTo({ top, behavior: 'smooth' });
            }
          }
        }
        onClick?.(e);
      },
      [scrollTo, ctx, onClick]
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
