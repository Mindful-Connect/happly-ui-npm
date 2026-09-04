'use client';

import * as React from 'react';

import type { PolymorphicComponentProps } from '@/lib/polymorphic';
import { cn } from '@/lib/happly-ui-utils';
import { recursiveCloneChildren } from '@/lib/recursive-clone-children';
import { tv, type VariantProps } from '@/lib/tv';

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

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function isEnabledTab(tab: HTMLElement) {
  return (
    !tab.hasAttribute('disabled') &&
    tab.getAttribute('aria-disabled') !== 'true'
  );
}

/**
 * Roving `tabindex` (ARIA APG): a tablist is one Tab stop, not one per tab.
 * The stop belongs to the selected tab, or — when nothing is selected, which
 * this component allows on every item — to the first enabled tab, so the list
 * is never dropped out of the tab order entirely. Driven from the Root over
 * the rendered nodes rather than as an `Item` prop, because items are cloned
 * children of arbitrary depth and the Root cannot address them individually.
 */
function setTabStop(tabs: HTMLElement[], stop: HTMLElement | undefined) {
  for (const tab of tabs) {
    tab.tabIndex = tab === stop ? 0 : -1;
  }
}

function syncRovingTabIndex(container: HTMLElement | null) {
  if (!container) return;

  const tabs = Array.from(
    container.querySelectorAll<HTMLElement>('[role="tab"]')
  );
  if (tabs.length === 0) return;

  const enabled = tabs.filter(isEnabledTab);
  const selected = enabled.find(
    (tab) => tab.getAttribute('aria-selected') === 'true'
  );

  setTabStop(tabs, selected ?? enabled[0]);
}

/**
 * ARIA APG tabs keyboard model: arrow keys move focus between tabs (wrapping),
 * Home/End jump to the first/last. Activation stays manual — the native
 * `<button>` already handles Enter and Space. The tab that receives focus also
 * takes over the tablist's single Tab stop.
 */
function moveTabFocus(
  event: React.KeyboardEvent<HTMLElement>,
  container: HTMLElement | null
) {
  const { key } = event;
  if (
    !container ||
    (key !== 'ArrowRight' &&
      key !== 'ArrowLeft' &&
      key !== 'Home' &&
      key !== 'End')
  ) {
    return;
  }

  const allTabs = Array.from(
    container.querySelectorAll<HTMLElement>('[role="tab"]')
  );
  const tabs = allTabs.filter(isEnabledTab);
  const current = tabs.indexOf(document.activeElement as HTMLElement);
  if (tabs.length === 0 || current === -1) return;

  event.preventDefault();
  const isRtl = getComputedStyle(container).direction === 'rtl';
  const forward = isRtl ? key === 'ArrowLeft' : key === 'ArrowRight';
  const next =
    key === 'Home'
      ? 0
      : key === 'End'
        ? tabs.length - 1
        : (current + (forward ? 1 : -1) + tabs.length) % tabs.length;

  const target = tabs[next];
  target.focus();
  setTabStop(allTabs, target);
}

export const menuTabBarVariants = tv({
  slots: {
    root: 'relative flex items-center gap-8 overflow-x-auto border-b border-stroke-soft-200 px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    item: [
      'relative flex shrink-0 cursor-pointer items-center justify-center gap-[3px] pb-3.5 text-label-xs',
      'transition-colors duration-150 ease-out',
      'rounded-sm outline-none focus-visible:shadow-button-important-focus',
      'disabled:pointer-events-none disabled:opacity-50',
    ],
    icon: 'size-4 shrink-0',
    indicator:
      // Switching tabs is high-frequency: the slide stays <=150ms and eases
      // out. The active tab is also marked by its label color, so the tab
      // stays identifiable when the transition is suppressed or interrupted.
      'absolute bottom-0 left-0 h-0.5 rounded-full transition-[transform,width] duration-150 ease-out',
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
  onKeyDown,
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
      syncRovingTabIndex(container);
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

  // Runs after every render, so a change of selection (or of the item list)
  // moves the single Tab stop with it. Intentionally has no dependency array.
  React.useEffect(() => {
    syncRovingTabIndex(containerRef.current);
  });

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
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (!event.defaultPrevented)
            moveTabFocus(event, containerRef.current);
        }}
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
            // Smooth scrolling is motion; jump straight there when the user
            // has asked for reduced motion.
            const behavior: ScrollBehavior = prefersReducedMotion()
              ? 'auto'
              : 'smooth';
            if (scroller) {
              // Scroll within the actual scroll container, not the window.
              const top =
                scroller.scrollTop +
                target.getBoundingClientRect().top -
                scroller.getBoundingClientRect().top -
                margin;
              scroller.scrollTo({ top, behavior });
            } else {
              // The page itself is the scroller.
              const top =
                target.getBoundingClientRect().top + window.scrollY - margin;
              window.scrollTo({ top, behavior });
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
