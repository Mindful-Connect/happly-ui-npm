'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { RiArrowDownSLine } from '@remixicon/react';

import { cn } from '@/lib/happly-ui-utils';

const SECTION_ACCORDION_ROOT_NAME = 'SectionAccordionRoot';
const SECTION_ACCORDION_ITEM_NAME = 'SectionAccordionItem';
const SECTION_ACCORDION_TRIGGER_NAME = 'SectionAccordionTrigger';
const SECTION_ACCORDION_HEADING_NAME = 'SectionAccordionHeading';
const SECTION_ACCORDION_TITLE_NAME = 'SectionAccordionTitle';
const SECTION_ACCORDION_DESCRIPTION_NAME = 'SectionAccordionDescription';
const SECTION_ACCORDION_CHEVRON_NAME = 'SectionAccordionChevron';
const SECTION_ACCORDION_CONTENT_NAME = 'SectionAccordionContent';
const SECTION_ACCORDION_GROUP_NAME = 'SectionAccordionGroup';

// `type` is required on Radix's Root union; make it optional here so the
// common single-accordion case needs no props, while still allowing 'multiple'.
type SectionAccordionRootProps = Omit<
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>,
  'type'
> & {
  type?: 'single' | 'multiple';
  collapsible?: boolean;
};

/**
 * Root — the bordered container that holds the sections.
 *
 * Defaults to `type="single"` and `collapsible` so that only one section can
 * be open at a time (opening a closed section closes the open one), which
 * matches the sectioned-accordion design. Both can be overridden via props.
 */
const SectionAccordionRoot = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Root>,
  SectionAccordionRootProps
>(({ className, type = 'single', collapsible, ...rest }, forwardedRef) => {
  // Only single accordions accept `collapsible`; default it to true.
  const singleProps = type === 'single' ? { collapsible: collapsible ?? true } : {};

  return (
    <AccordionPrimitive.Root
      ref={forwardedRef}
      className={cn(
        'border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs w-full overflow-hidden rounded-2xl border',
        className
      )}
      {...({ type, ...singleProps, ...rest } as React.ComponentPropsWithoutRef<
        typeof AccordionPrimitive.Root
      >)}
    />
  );
});
SectionAccordionRoot.displayName = SECTION_ACCORDION_ROOT_NAME;

/**
 * Item — one section. Fills with a subtle background when open. Set `disabled`
 * to prevent the section from being opened.
 */
const SectionAccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <AccordionPrimitive.Item
      ref={forwardedRef}
      className={cn(
        'group/section',
        'border-stroke-soft-200 border-t first:border-t-0',
        'bg-bg-white-0 data-[state=open]:bg-bg-weak-50',
        'transition-colors duration-200 ease-out',
        className
      )}
      {...rest}
    />
  );
});
SectionAccordionItem.displayName = SECTION_ACCORDION_ITEM_NAME;

const SectionAccordionHeader = AccordionPrimitive.Header;

/**
 * Trigger — the clickable section header. Lay out the heading and a
 * `<SectionAccordion.Chevron />` inside it.
 */
const SectionAccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ children, className, ...rest }, forwardedRef) => {
  return (
    <AccordionPrimitive.Trigger
      ref={forwardedRef}
      className={cn(
        'flex w-full items-center justify-between gap-3 text-left',
        'py-4 pr-3 pl-5',
        'outline-none focus-visible:outline-none',
        'transition-colors duration-200 ease-out',
        'enabled:data-[state=closed]:hover:bg-bg-weak-50',
        'disabled:cursor-not-allowed',
        className
      )}
      {...rest}
    >
      {children}
    </AccordionPrimitive.Trigger>
  );
});
SectionAccordionTrigger.displayName = SECTION_ACCORDION_TRIGGER_NAME;

/**
 * Heading — vertical stack for the title and description.
 */
const SectionAccordionHeading = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <div
      ref={forwardedRef}
      className={cn('flex min-w-0 flex-col items-start gap-1.5', className)}
      {...rest}
    />
  );
});
SectionAccordionHeading.displayName = SECTION_ACCORDION_HEADING_NAME;

const SectionAccordionTitle = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <span
      ref={forwardedRef}
      className={cn(
        'text-label-sm text-text-strong-950 truncate',
        'group-data-[disabled]/section:text-text-disabled-300',
        className
      )}
      {...rest}
    />
  );
});
SectionAccordionTitle.displayName = SECTION_ACCORDION_TITLE_NAME;

/**
 * Description — the secondary line (e.g. "8 Lessons"). Brightens from soft to
 * sub when its section is open, matching the design.
 */
const SectionAccordionDescription = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <span
      ref={forwardedRef}
      className={cn(
        'text-paragraph-xs text-text-soft-400 truncate',
        'group-data-[state=open]/section:text-text-sub-600',
        'group-data-[disabled]/section:text-text-disabled-300',
        className
      )}
      {...rest}
    />
  );
});
SectionAccordionDescription.displayName = SECTION_ACCORDION_DESCRIPTION_NAME;

type SectionAccordionChevronProps = React.HTMLAttributes<HTMLSpanElement> & {
  icon?: React.ElementType;
};

/**
 * Chevron — the boxed toggle indicator on the right of the header. Rotates
 * 180° when the section opens.
 */
function SectionAccordionChevron({
  className,
  icon: Icon = RiArrowDownSLine,
  ...rest
}: SectionAccordionChevronProps) {
  return (
    <span
      className={cn(
        'flex size-10 shrink-0 items-center justify-center rounded-10 p-2.5',
        'border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs border',
        'transition duration-200 ease-out',
        'group-data-[disabled]/section:border-stroke-soft-200 group-data-[disabled]/section:shadow-none',
        className
      )}
      {...rest}
    >
      <Icon
        className={cn(
          'text-text-sub-600 size-5',
          'transition-transform duration-200 ease-out',
          'group-data-[state=open]/section:rotate-180',
          'group-data-[disabled]/section:text-text-disabled-300'
        )}
      />
    </span>
  );
}
SectionAccordionChevron.displayName = SECTION_ACCORDION_CHEVRON_NAME;

/**
 * Content — the collapsible body. Renders arbitrary children with a slide
 * animation.
 */
const SectionAccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ children, className, ...rest }, forwardedRef) => {
  return (
    <AccordionPrimitive.Content
      ref={forwardedRef}
      className='data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden'
      {...rest}
    >
      <div className={cn('flex flex-col gap-1.5 px-3 pt-0 pb-4', className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
});
SectionAccordionContent.displayName = SECTION_ACCORDION_CONTENT_NAME;

type SectionAccordionGroupItem = {
  value: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
};

type SectionAccordionGroupProps = Omit<SectionAccordionRootProps, 'children'> & {
  items: SectionAccordionGroupItem[];
  chevronIcon?: React.ElementType;
};

/**
 * Group — composed sectioned accordion that renders sections from an array.
 * Handles the header, chevron, and content layout automatically. This is the
 * quickest way to use the component.
 */
const SectionAccordionGroup = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Root>,
  SectionAccordionGroupProps
>(({ items, chevronIcon, ...rest }, forwardedRef) => {
  return (
    <SectionAccordionRoot ref={forwardedRef} {...rest}>
      {items.map((item) => (
        <SectionAccordionItem
          key={item.value}
          value={item.value}
          disabled={item.disabled}
        >
          <SectionAccordionHeader>
            <SectionAccordionTrigger>
              <SectionAccordionHeading>
                <SectionAccordionTitle>{item.title}</SectionAccordionTitle>
                {item.description != null && (
                  <SectionAccordionDescription>
                    {item.description}
                  </SectionAccordionDescription>
                )}
              </SectionAccordionHeading>
              <SectionAccordionChevron icon={chevronIcon} />
            </SectionAccordionTrigger>
          </SectionAccordionHeader>
          <SectionAccordionContent>{item.content}</SectionAccordionContent>
        </SectionAccordionItem>
      ))}
    </SectionAccordionRoot>
  );
});
SectionAccordionGroup.displayName = SECTION_ACCORDION_GROUP_NAME;

export {
  SectionAccordionRoot as Root,
  SectionAccordionItem as Item,
  SectionAccordionHeader as Header,
  SectionAccordionTrigger as Trigger,
  SectionAccordionHeading as Heading,
  SectionAccordionTitle as Title,
  SectionAccordionDescription as Description,
  SectionAccordionChevron as Chevron,
  SectionAccordionContent as Content,
  SectionAccordionGroup as Group,
};

export type { SectionAccordionGroupItem, SectionAccordionGroupProps };
