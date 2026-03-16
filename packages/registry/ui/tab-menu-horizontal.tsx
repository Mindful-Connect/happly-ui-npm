'use client';

import * as React from 'react';

import { motion } from 'framer-motion';

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

export const tabMenuHorizontalVariants = tv({
  slots: {
    root: '-m-1 flex items-center gap-2 overflow-x-auto p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    item: [
      'flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border px-4 py-2 text-label-sm',
      'transition-colors duration-150 ease-out',
      'disabled:pointer-events-none disabled:opacity-50',
    ],
    icon: 'size-5 shrink-0',
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
        item: 'cursor-default border-transparent bg-primary-base text-static-white',
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

  const sharedProps: TabMenuHorizontalSharedProps = { variant };

  const extendedChildren = recursiveCloneChildren(
    children as React.ReactElement[],
    sharedProps,
    [TAB_MENU_ITEM_NAME],
    uniqueId,
  );

  const maskImage = buildMaskImage(canScrollLeft, canScrollRight);

  return (
    <div
      ref={scrollRef}
      role='tablist'
      className={root({ class: className })}
      onScroll={updateScrollState}
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
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'>;

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
    uniqueId,
  );

  return (
    <motion.button
      ref={ref}
      type='button'
      role='tab'
      aria-selected={selected === true}
      whileTap={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={item({ class: className })}
      {...rest}
    >
      {extendedChildren}
    </motion.button>
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
      variant="filled"
      color="red"
      size="small"
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
