'use client';

import * as React from 'react';
import { Slottable } from '@radix-ui/react-slot';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import mergeRefs from 'merge-refs';

import { useTabObserver } from '@/hooks/use-tab-observer';
import { cn } from '@/lib/happly-ui-utils';

const SwitchToggleRoot = TabsPrimitive.Root;
SwitchToggleRoot.displayName = 'SwitchToggleRoot';

const SwitchToggleList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    floatingBgClassName?: string;
    disabled?: boolean;
  }
>(
  (
    { children, className, floatingBgClassName, disabled, ...rest },
    forwardedRef
  ) => {
    const [lineStyle, setLineStyle] = React.useState({ width: 0, left: 0 });

    const { mounted, listRef } = useTabObserver({
      onActiveTabChange: (_, activeTab) => {
        const { offsetWidth: width, offsetLeft: left } = activeTab;
        setLineStyle({ width, left });
      },
    });

    return (
      <TabsPrimitive.List
        ref={mergeRefs(forwardedRef, listRef)}
        aria-disabled={disabled || undefined}
        className={cn(
          'bg-bg-weak-50 relative isolate grid w-full auto-cols-fr grid-flow-col gap-1 rounded-full p-1',
          disabled && 'pointer-events-none opacity-50',
          className
        )}
        {...rest}
      >
        <Slottable>{children}</Slottable>

        {/* floating bg */}
        <div
          className={cn(
            'bg-bg-white-0 shadow-toggle-switch absolute inset-y-1 left-0 -z-10 rounded-full transition-transform duration-300',
            {
              hidden: !mounted,
            },
            floatingBgClassName
          )}
          style={{
            transform: `translate3d(${lineStyle.left}px, 0, 0)`,
            width: `${lineStyle.width}px`,
            transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)',
          }}
          aria-hidden='true'
        />
      </TabsPrimitive.List>
    );
  }
);
SwitchToggleList.displayName = 'SwitchToggleList';

const SwitchToggleTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <TabsPrimitive.Trigger
      ref={forwardedRef}
      className={cn(
        // base
        'peer',
        'text-label-sm text-text-sub-600 relative z-10 h-7 rounded-full px-3 whitespace-nowrap outline-none',
        'flex items-center justify-center gap-1.5',
        'transition duration-300 ease-out',
        // focus
        'focus:outline-none',
        // active
        'data-[state=active]:text-text-strong-950',
        // inactive hover
        'data-[state=inactive]:hover:shadow-toggle-switch',
        className
      )}
      {...rest}
    />
  );
});
SwitchToggleTrigger.displayName = 'SwitchToggleTrigger';

const SwitchToggleContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ ...rest }, forwardedRef) => {
  return <TabsPrimitive.Content ref={forwardedRef} {...rest} />;
});
SwitchToggleContent.displayName = 'SwitchToggleContent';

const SWITCH_TOGGLE_GROUP_NAME = 'SwitchToggleGroup';

type SwitchToggleGroupItem = {
  value: string;
  label: React.ReactNode;
  icon?: React.ElementType;
};

type SwitchToggleGroupProps = Omit<
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>,
  'children'
> & {
  items: SwitchToggleGroupItem[];
  listClassName?: string;
  floatingBgClassName?: string;
  disabled?: boolean;
};

const SwitchToggleGroup = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Root>,
  SwitchToggleGroupProps
>(
  (
    { items, listClassName, floatingBgClassName, disabled, ...rest },
    forwardedRef
  ) => {
    return (
      <SwitchToggleRoot ref={forwardedRef} {...rest}>
        <SwitchToggleList
          className={listClassName}
          floatingBgClassName={floatingBgClassName}
          disabled={disabled}
        >
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <SwitchToggleTrigger key={item.value} value={item.value}>
                {Icon && <Icon className='h-5 w-5 shrink-0' />}
                {item.label}
              </SwitchToggleTrigger>
            );
          })}
        </SwitchToggleList>
      </SwitchToggleRoot>
    );
  }
);
SwitchToggleGroup.displayName = SWITCH_TOGGLE_GROUP_NAME;

export {
  SwitchToggleRoot as Root,
  SwitchToggleList as List,
  SwitchToggleTrigger as Trigger,
  SwitchToggleContent as Content,
  SwitchToggleGroup as Group,
};

export type { SwitchToggleGroupItem, SwitchToggleGroupProps };
