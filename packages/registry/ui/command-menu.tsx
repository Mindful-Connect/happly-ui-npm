'use client';

import * as React from 'react';
import { type DialogProps } from '@radix-ui/react-dialog';
import { Command } from 'cmdk';

import * as Modal from '@/components/ui/modal';
import { cn } from '@/lib/happly-ui-utils';
import type { PolymorphicComponentProps } from '@/lib/polymorphic';
import { tv, type VariantProps } from '@/lib/tv';

const CommandMenuDialogTitle = Modal.Title;
const CommandMenuDialogDescription = Modal.Description;

const CommandMenuDialog = ({
  children,
  className,
  overlayClassName,
  ...rest
}: DialogProps & {
  className?: string;
  overlayClassName?: string;
}) => {
  return (
    <Modal.Root {...rest}>
      <Modal.Content
        overlayClassName={cn('justify-start pt-20', overlayClassName)}
        showClose={false}
        className={cn(
          'flex max-h-full max-w-[720px] flex-col overflow-hidden rounded-2xl',
          className
        )}
      >
        <Command
          className={cn(
            'divide-stroke-soft-200 divide-y',
            'grid min-h-0 auto-cols-auto grid-flow-row',
            '[&>[cmdk-label]+*]:!border-t-0'
          )}
        >
          {children}
        </Command>
      </Modal.Content>
    </Modal.Root>
  );
};

const CommandMenuInput = React.forwardRef<
  React.ComponentRef<typeof Command.Input>,
  React.ComponentPropsWithoutRef<typeof Command.Input>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <Command.Input
      ref={forwardedRef}
      className={cn(
        // base
        'text-paragraph-sm text-text-strong-950 w-full border-none bg-transparent shadow-none ring-0 outline-none',
        'transition-[color] duration-150 ease-out',
        // placeholder
        'placeholder:[transition:inherit]',
        'placeholder:text-text-soft-400',
        // hover
        'group-hover/cmd-input:placeholder:text-text-sub-600',
        className
      )}
      {...rest}
    />
  );
});
CommandMenuInput.displayName = 'CommandMenuInput';

const CommandMenuList = React.forwardRef<
  React.ComponentRef<typeof Command.List>,
  React.ComponentPropsWithoutRef<typeof Command.List>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <Command.List
      ref={forwardedRef}
      className={cn(
        'flex max-h-min min-h-0 flex-1 flex-col',
        '[&>[cmdk-list-sizer]]:divide-stroke-soft-200 [&>[cmdk-list-sizer]]:divide-y',
        '[&>[cmdk-list-sizer]]:overflow-auto [&>[cmdk-list-sizer]]:overscroll-contain',
        className
      )}
      {...rest}
    />
  );
});
CommandMenuList.displayName = 'CommandMenuList';

const CommandMenuGroup = React.forwardRef<
  React.ComponentRef<typeof Command.Group>,
  React.ComponentPropsWithoutRef<typeof Command.Group>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <Command.Group
      ref={forwardedRef}
      className={cn(
        'relative px-2 py-3',
        // heading
        '[&>[cmdk-group-heading]]:text-label-xs [&>[cmdk-group-heading]]:text-text-sub-600',
        '[&>[cmdk-group-heading]]:mb-2 [&>[cmdk-group-heading]]:px-3 [&>[cmdk-group-heading]]:pt-1',
        className
      )}
      {...rest}
    />
  );
});
CommandMenuGroup.displayName = 'CommandMenuGroup';

const commandMenuItemVariants = tv({
  base: [
    'flex items-center gap-3 rounded-10 bg-bg-white-0',
    'cursor-pointer text-paragraph-sm text-text-strong-950',
    'transition-[background-color,color] duration-150 ease-out',
    // hover/selected
    'data-[selected=true]:bg-bg-weak-50',
  ],
  variants: {
    size: {
      small: 'px-3 py-2.5',
      medium: 'px-3 py-3',
    },
  },
  defaultVariants: {
    size: 'small',
  },
});

type CommandMenuItemProps = VariantProps<typeof commandMenuItemVariants> &
  React.ComponentPropsWithoutRef<typeof Command.Item>;

const CommandMenuItem = React.forwardRef<
  React.ComponentRef<typeof Command.Item>,
  CommandMenuItemProps
>(({ className, size, ...rest }, forwardedRef) => {
  return (
    <Command.Item
      ref={forwardedRef}
      className={commandMenuItemVariants({ size, class: className })}
      {...rest}
    />
  );
});
CommandMenuItem.displayName = 'CommandMenuItem';

function CommandMenuItemIcon<T extends React.ElementType>({
  className,
  as,
  ...rest
}: PolymorphicComponentProps<T>) {
  const Component = as || 'div';

  return (
    <Component
      className={cn('text-text-sub-600 h-5 w-5 shrink-0', className)}
      {...rest}
    />
  );
}

function CommandMenuFooter({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex h-12 items-center justify-between gap-3 px-5',
        className
      )}
      {...rest}
    />
  );
}

function CommandMenuFooterKeyBox({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'bg-bg-weak-50 text-text-sub-600 ring-stroke-soft-200 flex h-5 w-5 shrink-0 items-center justify-center rounded ring-1 ring-inset',
        className
      )}
      {...rest}
    />
  );
}

export {
  CommandMenuDialog as Dialog,
  CommandMenuDialogTitle as DialogTitle,
  CommandMenuDialogDescription as DialogDescription,
  CommandMenuInput as Input,
  CommandMenuList as List,
  CommandMenuGroup as Group,
  CommandMenuItem as Item,
  CommandMenuItemIcon as ItemIcon,
  CommandMenuFooter as Footer,
  CommandMenuFooterKeyBox as FooterKeyBox,
};
