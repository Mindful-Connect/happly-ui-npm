'use client';

import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { RiArrowRightSLine } from '@remixicon/react';

import { cn } from '@/lib/happly-ui-utils';
import type { PolymorphicComponentProps } from '@/lib/polymorphic';

const DropdownRoot = DropdownMenuPrimitive.Root;
const DropdownTrigger = DropdownMenuPrimitive.Trigger;
const DropdownPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownCheckboxItem = DropdownMenuPrimitive.CheckboxItem;
const DropdownRadioGroup = DropdownMenuPrimitive.RadioGroup;
const DropdownRadioItem = DropdownMenuPrimitive.RadioItem;
const DropdownSeparator = DropdownMenuPrimitive.Separator;
const DropdownArrow = DropdownMenuPrimitive.Arrow;

const DropdownContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 8, ...rest }, forwardedRef) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={forwardedRef}
      sideOffset={sideOffset}
      className={cn(
        'bg-bg-white-0 shadow-regular-md ring-stroke-soft-200 pointer-events-auto z-50 w-[300px] overflow-hidden rounded-2xl p-2 ring-1 ring-inset',
        'flex flex-col gap-1',
        // origin
        'data-[side=bottom]:origin-top data-[side=left]:origin-right data-[side=right]:origin-left data-[side=top]:origin-bottom',
        // animation
        'data-[state=open]:animate-in data-[state=open]:fade-in-0',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...rest}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownContent.displayName = 'DropdownContent';

const DropdownItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: 'default' | 'error';
  }
>(({ className, inset, variant = 'default', ...rest }, forwardedRef) => (
  <DropdownMenuPrimitive.Item
    ref={forwardedRef}
    data-variant={variant}
    className={cn(
      // base
      'group/item text-paragraph-sm text-text-strong-950 relative cursor-pointer rounded-lg p-2 outline-none select-none',
      'flex items-center gap-2',
      'transition duration-200 ease-out',
      // hover
      'data-[highlighted]:bg-bg-weak-50',
      // focus
      'focus:outline-none',
      // disabled
      'data-[disabled]:text-text-disabled-300',
      // variant
      variant === 'error' && 'text-error-base',
      inset && 'pl-9',
      className
    )}
    {...rest}
  />
));
DropdownItem.displayName = 'DropdownItem';

function DropdownItemIcon<T extends React.ElementType>({
  className,
  as,
  ...rest
}: PolymorphicComponentProps<T>) {
  const Component = as || 'div';

  return (
    <Component
      className={cn(
        // base
        'text-text-sub-600 h-5 w-5',
        // disabled
        'group-data-[disabled]/item:text-text-disabled-300',
        // variant
        'group-data-[variant=error]/item:text-error-base',
        className
      )}
      {...rest}
    />
  );
}
DropdownItemIcon.displayName = 'DropdownItemIcon';

const DropdownGroup = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Group>
>(({ className, ...rest }, forwardedRef) => (
  <DropdownMenuPrimitive.Group
    ref={forwardedRef}
    className={cn('flex flex-col gap-1', className)}
    {...rest}
  />
));
DropdownGroup.displayName = 'DropdownGroup';

const DropdownLabel = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, ...rest }, forwardedRef) => (
  <DropdownMenuPrimitive.Label
    ref={forwardedRef}
    className={cn(
      'text-subheading-xs text-text-soft-400 px-2 py-1 uppercase',
      className
    )}
    {...rest}
  />
));
DropdownLabel.displayName = 'DropdownLabel';

const DropdownMenuSubTrigger = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...rest }, forwardedRef) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={forwardedRef}
    className={cn(
      // base
      'group/item text-paragraph-sm text-text-strong-950 relative cursor-pointer rounded-lg p-2 outline-0 select-none',
      'flex items-center gap-2',
      'transition duration-200 ease-out',
      // hover
      'data-[highlighted]:bg-bg-weak-50',
      // disabled
      'data-[disabled]:text-text-disabled-300',
      inset && 'pl-9',
      className
    )}
    {...rest}
  >
    {children}
    <span className='flex-1' />
    <DropdownItemIcon as={RiArrowRightSLine} />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

const DropdownMenuSubContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...rest }, forwardedRef) => (
  <DropdownMenuPrimitive.SubContent
    ref={forwardedRef}
    className={cn(
      'bg-bg-white-0 shadow-regular-md ring-stroke-soft-200 pointer-events-auto z-50 w-max overflow-hidden rounded-2xl p-2 ring-1 ring-inset',
      'flex flex-col gap-1',
      // animation
      'data-[state=open]:animate-in data-[state=open]:fade-in-0',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...rest}
  />
));
DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';

// --- Composed ---

type DropdownMenuItem = {
  label: React.ReactNode;
  icon?: React.ElementType;
  variant?: 'default' | 'error';
  disabled?: boolean;
  onSelect?: () => void;
  href?: string;
};

type DropdownMenuGroup = {
  label?: string;
  items: DropdownMenuItem[];
};

type DropdownComposedProps = {
  /** The trigger element. Rendered via asChild. */
  children: React.ReactNode;
  /** Menu items. Accepts a flat array of items or grouped arrays. */
  groups: DropdownMenuGroup[];
  /** Content alignment relative to trigger. */
  align?: 'start' | 'center' | 'end';
  /** Content side relative to trigger. */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Distance in pixels from the trigger. */
  sideOffset?: number;
  /** Additional className for the content panel. */
  contentClassName?: string;
  /** Header content rendered above menu items. */
  header?: React.ReactNode;
  /** Footer content rendered below menu items. */
  footer?: React.ReactNode;
  /** Controlled open state. */
  open?: boolean;
  /** Callback when open state changes. */
  onOpenChange?: (open: boolean) => void;
};

function DropdownComposed({
  children,
  groups,
  align = 'start',
  side,
  sideOffset,
  contentClassName,
  header,
  footer,
  open,
  onOpenChange,
}: DropdownComposedProps) {
  return (
    <DropdownRoot open={open} onOpenChange={onOpenChange}>
      <DropdownTrigger asChild>{children}</DropdownTrigger>
      <DropdownContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={contentClassName}
      >
        {header}
        {groups.map((group, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {groupIndex > 0 && (
              <DropdownSeparator className='bg-stroke-soft-200 my-1 h-px' />
            )}
            <DropdownGroup>
              {group.label && <DropdownLabel>{group.label}</DropdownLabel>}
              {group.items.map((item, itemIndex) => {
                const itemContent = (
                  <>
                    {item.icon && <DropdownItemIcon as={item.icon} />}
                    {item.label}
                  </>
                );

                if (item.href) {
                  return (
                    <DropdownItem
                      key={itemIndex}
                      variant={item.variant}
                      disabled={item.disabled}
                      asChild
                    >
                      <a href={item.href}>{itemContent}</a>
                    </DropdownItem>
                  );
                }

                return (
                  <DropdownItem
                    key={itemIndex}
                    variant={item.variant}
                    disabled={item.disabled}
                    onSelect={item.onSelect}
                  >
                    {itemContent}
                  </DropdownItem>
                );
              })}
            </DropdownGroup>
          </React.Fragment>
        ))}
        {footer}
      </DropdownContent>
    </DropdownRoot>
  );
}
DropdownComposed.displayName = 'DropdownComposed';

export {
  DropdownRoot as Root,
  DropdownPortal as Portal,
  DropdownTrigger as Trigger,
  DropdownContent as Content,
  DropdownItem as Item,
  DropdownItemIcon as ItemIcon,
  DropdownGroup as Group,
  DropdownLabel as Label,
  DropdownMenuSub as MenuSub,
  DropdownMenuSubTrigger as MenuSubTrigger,
  DropdownMenuSubContent as MenuSubContent,
  DropdownCheckboxItem as CheckboxItem,
  DropdownRadioGroup as RadioGroup,
  DropdownRadioItem as RadioItem,
  DropdownSeparator as Separator,
  DropdownArrow as Arrow,
  DropdownComposed as Composed,
};
export type { DropdownMenuItem, DropdownMenuGroup, DropdownComposedProps };
