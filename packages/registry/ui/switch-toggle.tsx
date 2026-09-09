'use client';

import * as React from 'react';
import { Slottable } from '@radix-ui/react-slot';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import mergeRefs from 'merge-refs';

import { useTabObserver } from '@/hooks/use-tab-observer';
import { cn } from '@/lib/happly-ui-utils';

const SwitchToggleRoot = TabsPrimitive.Root;
SwitchToggleRoot.displayName = 'SwitchToggleRoot';

// `disabled` on the List has to reach the triggers themselves: aria-disabled
// and pointer-events-none stop the mouse and nothing else, so without this the
// triggers stay reachable by Tab and switchable with the arrow keys.
const SwitchToggleDisabledContext = React.createContext(false);

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
      <SwitchToggleDisabledContext.Provider value={!!disabled}>
        <TabsPrimitive.List
          ref={mergeRefs(forwardedRef, listRef)}
          aria-disabled={disabled || undefined}
          className={cn(
            'group/switch-toggle bg-bg-weak-50 relative isolate grid w-full auto-cols-fr grid-flow-col gap-1 rounded-full p-1',
            disabled && 'pointer-events-none',
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
              disabled && 'shadow-none',
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
      </SwitchToggleDisabledContext.Provider>
    );
  }
);
SwitchToggleList.displayName = 'SwitchToggleList';

const SwitchToggleTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, disabled, ...rest }, forwardedRef) => {
  const listDisabled = React.useContext(SwitchToggleDisabledContext);
  const isDisabled = listDisabled || disabled;

  return (
    <TabsPrimitive.Trigger
      ref={forwardedRef}
      disabled={isDisabled}
      className={cn(
        // base
        'peer',
        'text-label-sm text-text-sub-600 relative z-10 h-7 rounded-full px-3 whitespace-nowrap outline-none',
        'flex items-center justify-center gap-1.5',
        'transition-[background-color,color,box-shadow] duration-150 ease-out',
        // focus
        'focus-visible:shadow-button-important-focus',
        // active
        'data-[state=active]:text-text-strong-950',
        // inactive hover — one step darker than the default weak-50 track
        // (bg-100 is indistinguishable from it). Darker-track contexts flip
        // the hover lighter via Group's triggerClassName instead.
        'data-[state=inactive]:enabled:hover:bg-bg-soft-200',
        // disabled — the trigger's own `disabled` (set by the List, or per
        // trigger) and the List's aria-disabled resolve to the same colour.
        // The active pairing needs two variants to outrank the rule above.
        //
        // The SELECTED option keeps `text-sub-600` rather than dropping to
        // `disabled-300`, matching radio-card (`radio-card.tsx:39`): a disabled
        // control still has to show which option is chosen. Fading every label
        // equally leaves `aria-selected` as the only cue, which sighted users
        // cannot see.
        'disabled:text-text-disabled-300',
        'data-[state=active]:disabled:text-text-sub-600',
        'group-aria-disabled/switch-toggle:text-text-disabled-300',
        'data-[state=active]:group-aria-disabled/switch-toggle:text-text-sub-600',
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
  triggerClassName?: string;
  floatingBgClassName?: string;
  disabled?: boolean;
};

const SwitchToggleGroup = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Root>,
  SwitchToggleGroupProps
>(
  (
    {
      items,
      listClassName,
      triggerClassName,
      floatingBgClassName,
      disabled,
      ...rest
    },
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
              <SwitchToggleTrigger
                key={item.value}
                value={item.value}
                className={triggerClassName}
                // Also on the trigger, not just the List. The List only gets
                // `aria-disabled` + `pointer-events-none`, which stops the mouse
                // and nothing else — Radix Tabs triggers stay reachable by Tab
                // and switchable with the arrow keys.
                disabled={disabled}
              >
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
