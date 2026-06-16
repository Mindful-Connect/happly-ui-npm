'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import {
  RiAddLine,
  RiArrowDownSLine,
  RiSubtractLine,
} from '@remixicon/react';

import type { PolymorphicComponentProps } from '@/lib/polymorphic';
import { cn } from '@/lib/happly-ui-utils';
import { tv, type VariantProps } from '@/lib/tv';

const ACCORDION_ROOT_NAME = 'AccordionRoot';
const ACCORDION_ITEM_NAME = 'AccordionItem';
const ACCORDION_ICON_NAME = 'AccordionIcon';
const ACCORDION_ARROW_NAME = 'AccordionArrow';
const ACCORDION_CHEVRON_NAME = 'AccordionChevron';
const ACCORDION_TRIGGER_NAME = 'AccordionTrigger';
const ACCORDION_CONTENT_NAME = 'AccordionContent';

const accordionItemVariants = tv({
  base: [
    'group/accordion',
    'rounded-10 overflow-hidden ring-1 ring-inset',
    'transition duration-200 ease-out',
  ],
  variants: {
    variant: {
      filled: [
        'bg-bg-white-0 ring-stroke-soft-200',
        'hover:bg-bg-weak-50 hover:ring-transparent',
        'has-[:focus-visible]:bg-bg-weak-50 has-[:focus-visible]:ring-transparent',
        'data-[state=open]:bg-bg-weak-50 data-[state=open]:ring-transparent',
      ],
      stroke: [
        'bg-bg-white-0 ring-stroke-soft-200',
        'hover:ring-stroke-sub-300',
        'has-[:focus-visible]:ring-stroke-sub-300',
        'data-[state=open]:ring-stroke-sub-300',
      ],
      // Connected list: items joined inside one bordered container,
      // separated by top dividers. The container styling lives on the
      // parent (Accordion.Root / Accordion.Group), not the item.
      list: [
        'rounded-none ring-0 bg-bg-white-0 border-stroke-soft-200',
        'border-t first:border-t-0',
        // Mirrors the filled variant's bg fill (same bg-weak-50 token) on
        // hover/focus/open. The divider border stays constant so the
        // connected list keeps its seams.
        'hover:bg-bg-weak-50',
        'has-[:focus-visible]:bg-bg-weak-50',
        'data-[state=open]:bg-bg-weak-50',
      ],
    },
  },
  defaultVariants: {
    variant: 'filled',
  },
});

type AccordionItemProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Item
> &
  VariantProps<typeof accordionItemVariants>;

const AccordionRoot = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <AccordionPrimitive.Root
      ref={forwardedRef}
      className={cn('w-full', className)}
      {...rest}
    />
  );
});
AccordionRoot.displayName = ACCORDION_ROOT_NAME;

const AccordionHeader = AccordionPrimitive.Header;

const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, variant, ...rest }, forwardedRef) => {
  return (
    <AccordionPrimitive.Item
      ref={forwardedRef}
      className={accordionItemVariants({ variant, class: className })}
      {...rest}
    />
  );
});
AccordionItem.displayName = ACCORDION_ITEM_NAME;

const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ children, className, ...rest }, forwardedRef) => {
  return (
    <AccordionPrimitive.Trigger
      ref={forwardedRef}
      className={cn(
        'text-label-sm text-text-strong-950 w-full text-left',
        'grid auto-cols-auto grid-flow-col grid-cols-[auto_minmax(0,1fr)] items-center gap-2.5',
        'p-3.5',
        'outline-none focus:outline-none',
        className
      )}
      {...rest}
    >
      {children}
    </AccordionPrimitive.Trigger>
  );
});
AccordionTrigger.displayName = ACCORDION_TRIGGER_NAME;

function AccordionIcon<T extends React.ElementType>({
  className,
  as,
  ...rest
}: PolymorphicComponentProps<T>) {
  const Component = as || 'div';

  return (
    <Component
      className={cn('text-text-sub-600 h-5 w-5', className)}
      {...rest}
    />
  );
}
AccordionIcon.displayName = ACCORDION_ICON_NAME;

type AccordionArrowProps = React.HTMLAttributes<HTMLDivElement> & {
  openIcon?: React.ElementType;
  closeIcon?: React.ElementType;
};

function AccordionArrow({
  className,
  openIcon: OpenIcon = RiAddLine,
  closeIcon: CloseIcon = RiSubtractLine,
  ...rest
}: AccordionArrowProps) {
  return (
    <span className='flex shrink-0'>
      <OpenIcon
        className={cn(
          'text-text-soft-400 h-5 w-5',
          'transition duration-200 ease-out',
          'group-hover/accordion:text-text-sub-600',
          'group-data-[state=open]/accordion:hidden',
          className
        )}
        {...rest}
      />
      <CloseIcon
        className={cn(
          'text-text-sub-600 h-5 w-5',
          'hidden group-data-[state=open]/accordion:block',
          className
        )}
        {...rest}
      />
    </span>
  );
}
AccordionArrow.displayName = ACCORDION_ARROW_NAME;

type AccordionChevronProps = React.HTMLAttributes<HTMLSpanElement> & {
  icon?: React.ElementType;
};

function AccordionChevron({
  className,
  icon: Icon = RiArrowDownSLine,
  ...rest
}: AccordionChevronProps) {
  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center rounded-lg p-1.5',
        'border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs border',
        'transition duration-200 ease-out',
        className
      )}
      {...rest}
    >
      <Icon
        className={cn(
          'text-text-sub-600 h-5 w-5',
          'transition-transform duration-200 ease-out',
          'group-data-[state=open]/accordion:rotate-180'
        )}
      />
    </span>
  );
}
AccordionChevron.displayName = ACCORDION_CHEVRON_NAME;

const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ children, className, ...rest }, forwardedRef) => {
  return (
    <AccordionPrimitive.Content
      ref={forwardedRef}
      className='data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden'
      {...rest}
    >
      <div
        className={cn(
          'text-paragraph-sm text-text-sub-600 px-3.5 pt-1.5 pb-3.5',
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
});
AccordionContent.displayName = ACCORDION_CONTENT_NAME;

const ACCORDION_GROUP_NAME = 'AccordionGroup';

type AccordionGroupItem = {
  value: string;
  title: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ElementType;
};

type AccordionGroupProps = Omit<
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>,
  'children'
> & {
  items: AccordionGroupItem[];
  variant?: VariantProps<typeof accordionItemVariants>['variant'];
  arrowPosition?: 'start' | 'end';
  collapsible?: boolean;
};

const AccordionGroup = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Root>,
  AccordionGroupProps
>(
  (
    { items, variant, arrowPosition = 'end', className, ...rest },
    forwardedRef
  ) => {
    const isList = variant === 'list';
    const Indicator = isList ? AccordionChevron : AccordionArrow;

    return (
      <AccordionRoot
        ref={forwardedRef}
        className={cn(
          isList
            ? 'border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden rounded-2xl border'
            : 'space-y-6',
          className
        )}
        {...(rest as any)}
      >
        {items.map((item) => {
          const hasIcon = !!item.icon;
          const contentPadding = isList
            ? cn('px-5 pt-0 pb-4', hasIcon && 'pl-[50px]')
            : arrowPosition === 'start' || hasIcon
              ? 'pl-[30px]'
              : undefined;

          return (
            <AccordionItem
              key={item.value}
              value={item.value}
              variant={variant}
            >
              <AccordionTrigger className={isList ? 'py-4 pr-3 pl-5' : undefined}>
                {arrowPosition === 'start' && <Indicator />}
                {item.icon && <AccordionIcon as={item.icon} />}
                {item.title}
                {arrowPosition === 'end' && <Indicator />}
              </AccordionTrigger>
              <AccordionContent className={contentPadding}>
                {item.content}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </AccordionRoot>
    );
  }
);
AccordionGroup.displayName = ACCORDION_GROUP_NAME;

export {
  AccordionRoot as Root,
  AccordionHeader as Header,
  AccordionItem as Item,
  AccordionTrigger as Trigger,
  AccordionIcon as Icon,
  AccordionArrow as Arrow,
  AccordionChevron as Chevron,
  AccordionContent as Content,
  AccordionGroup as Group,
  accordionItemVariants,
};

export type { AccordionGroupItem, AccordionGroupProps };
