'use client';

import * as React from 'react';

import type { PolymorphicComponentProps } from '@/lib/polymorphic';
import { recursiveCloneChildren } from '@/lib/recursive-clone-children';
import { tv, type VariantProps } from '@/lib/tv';
import * as Badge from '@/components/ui/badge';

const TAB_MENU_ROOT_NAME = 'TabMenuHorizontalRoot';
const TAB_MENU_ITEM_NAME = 'TabMenuHorizontalItem';
const TAB_MENU_ICON_NAME = 'TabMenuHorizontalIcon';
const TAB_MENU_COUNTER_NAME = 'TabMenuHorizontalCounter';

const FADE_SIZE = 24;

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

export const tabMenuHorizontalVariants = tv({
  slots: {
    root: '-m-1 flex items-center gap-2 overflow-x-auto p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    item: [
      'flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border px-4 py-2 text-label-sm',
      'transition-colors duration-150 ease-out',
      'outline-none focus-visible:shadow-button-important-focus',
      'disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
    ],
    icon: 'w-5 h-5 shrink-0',
    counter: 'shrink-0',
  },
  variants: {
    variant: {
      primary: {},
      neutral: {},
    },
    selected: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    // neutral selected
    {
      variant: 'neutral',
      selected: true,
      class: {
        item: 'cursor-default border-transparent bg-bg-strong-950 text-text-white-0',
      },
    },
    // neutral unselected
    {
      variant: 'neutral',
      selected: false,
      class: {
        item: [
          'border-stroke-soft-200 bg-bg-white-0 text-text-sub-600 shadow-regular-xs',
          'hover:border-neutral-400 hover:text-text-strong-950',
        ],
      },
    },
    // primary selected
    {
      variant: 'primary',
      selected: true,
      class: {
        item: 'cursor-default border-transparent bg-primary-base text-primary-contrast',
      },
    },
    // primary unselected
    {
      variant: 'primary',
      selected: false,
      class: {
        item: [
          'border-stroke-soft-200 bg-bg-white-0 text-text-sub-600 shadow-regular-xs',
          'hover:border-neutral-400 hover:text-text-strong-950',
        ],
      },
    },
  ],
  defaultVariants: {
    variant: 'neutral',
    selected: false,
  },
});

type TabMenuHorizontalSharedProps = {
  variant?: VariantProps<typeof tabMenuHorizontalVariants>['variant'];
};

type TabMenuHorizontalRootProps = Pick<
  VariantProps<typeof tabMenuHorizontalVariants>,
  'variant'
> &
  React.HTMLAttributes<HTMLDivElement> & {
    asChild?: boolean;
  };

function TabMenuHorizontalRoot({
  children,
  className,
  variant,
  onKeyDown,
  ...rest
}: TabMenuHorizontalRootProps) {
  const uniqueId = React.useId();
  const { root } = tabMenuHorizontalVariants();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const updateScrollState = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  React.useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;

    const observer = new ResizeObserver(updateScrollState);
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateScrollState]);

  // Runs after every render, so a change of selection (or of the item list)
  // moves the single Tab stop with it. Intentionally has no dependency array.
  React.useEffect(() => {
    syncRovingTabIndex(scrollRef.current);
  });

  const sharedProps: TabMenuHorizontalSharedProps = { variant };

  const extendedChildren = recursiveCloneChildren(
    children as React.ReactElement[],
    sharedProps,
    [TAB_MENU_ITEM_NAME],
    uniqueId
  );

  const maskImage = buildMaskImage(canScrollLeft, canScrollRight);

  return (
    <div
      ref={scrollRef}
      role='tablist'
      className={root({ class: className })}
      onScroll={updateScrollState}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented) moveTabFocus(event, scrollRef.current);
      }}
      style={
        maskImage !== 'none'
          ? { maskImage, WebkitMaskImage: maskImage, ...maskCompositeStyle }
          : undefined
      }
      {...rest}
    >
      {extendedChildren}
    </div>
  );
}
TabMenuHorizontalRoot.displayName = TAB_MENU_ROOT_NAME;

type TabMenuHorizontalItemProps = TabMenuHorizontalSharedProps &
  VariantProps<typeof tabMenuHorizontalVariants> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const TabMenuHorizontalItem = React.forwardRef<
  HTMLButtonElement,
  TabMenuHorizontalItemProps
>(({ children, className, variant, selected, ...rest }, ref) => {
  const uniqueId = React.useId();
  const { item } = tabMenuHorizontalVariants({ variant, selected });

  const sharedProps: TabMenuHorizontalSharedProps = { variant };

  const extendedChildren = recursiveCloneChildren(
    children as React.ReactElement[],
    sharedProps,
    [TAB_MENU_ICON_NAME, TAB_MENU_COUNTER_NAME],
    uniqueId
  );

  return (
    <button
      ref={ref}
      type='button'
      role='tab'
      aria-selected={selected === true}
      className={item({ class: className })}
      {...rest}
    >
      {extendedChildren}
    </button>
  );
});
TabMenuHorizontalItem.displayName = TAB_MENU_ITEM_NAME;

type TabMenuHorizontalIconProps = TabMenuHorizontalSharedProps &
  React.HTMLAttributes<HTMLDivElement>;

function TabMenuHorizontalIcon<T extends React.ElementType>({
  className,
  as,
  ...rest
}: PolymorphicComponentProps<T, TabMenuHorizontalIconProps>) {
  const Component = as || 'div';
  const { icon } = tabMenuHorizontalVariants();

  return <Component className={icon({ class: className })} {...rest} />;
}
TabMenuHorizontalIcon.displayName = TAB_MENU_ICON_NAME;

type TabMenuHorizontalCounterProps = React.HTMLAttributes<HTMLSpanElement> & {
  count: number;
};

function TabMenuHorizontalCounter({
  className,
  count,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  variant: _variant,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  color: _color,
  ...rest
}: TabMenuHorizontalCounterProps & { variant?: string; color?: string }) {
  const { counter } = tabMenuHorizontalVariants();

  if (count <= 0) return null;

  return (
    <Badge.Root
      variant='filled'
      color='red'
      size='small'
      square
      className={counter({ class: className })}
      {...rest}
    >
      {count > 99 ? '99+' : count}
    </Badge.Root>
  );
}
TabMenuHorizontalCounter.displayName = TAB_MENU_COUNTER_NAME;

type TabMenuHorizontalComposedProps = Omit<
  TabMenuHorizontalRootProps,
  'children'
> & {
  value: string;
  onValueChange?: (value: string) => void;
  items: {
    label: string;
    value: string;
    disabled?: boolean;
    icon?: React.ElementType;
    count?: number;
  }[];
};

function TabMenuHorizontalComposed({
  value,
  onValueChange,
  items,
  variant,
  ...rest
}: TabMenuHorizontalComposedProps) {
  return (
    <TabMenuHorizontalRoot variant={variant} {...rest}>
      {items.map((tab) => (
        <TabMenuHorizontalItem
          key={tab.value}
          variant={variant}
          selected={value === tab.value}
          disabled={tab.disabled}
          onClick={() => onValueChange?.(tab.value)}
        >
          {tab.icon && <TabMenuHorizontalIcon as={tab.icon} />}
          <span>{tab.label}</span>
          {tab.count != null && tab.count > 0 && (
            <TabMenuHorizontalCounter count={tab.count} />
          )}
        </TabMenuHorizontalItem>
      ))}
    </TabMenuHorizontalRoot>
  );
}
TabMenuHorizontalComposed.displayName = 'TabMenuHorizontalComposed';

export {
  TabMenuHorizontalRoot as Root,
  TabMenuHorizontalItem as Item,
  TabMenuHorizontalIcon as Icon,
  TabMenuHorizontalCounter as Counter,
  TabMenuHorizontalComposed as Composed,
  TabMenuHorizontalComposed as TabMenuHorizontal,
};
