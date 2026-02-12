'use client';

import * as React from 'react';
import * as ScrollAreaPrimitives from '@radix-ui/react-scroll-area';
import * as SelectPrimitives from '@radix-ui/react-select';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { RiArrowDownSLine, RiCheckLine } from 'react-icons/ri';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// --- CVA Definitions for Select Variants ---

const selectTriggerRootVariants = cva(
  [
    // base
    'group/trigger min-w-0 shrink-0 bg-ds-white-0 shadow-regular-xs outline-none ring-1 ring-inset ring-ds-stroke-soft-200',
    '!text-paragraph-sm text-ds-strong-950',
    'flex items-center text-left',
    'transition duration-200 ease-out',
    // hover
    'hover:ring-transparent hover:data-[placeholder]:text-ds-sub-600',
    // focus
    'focus:shadow-button-important-focus focus:outline-none focus:ring-ds-stroke-strong-950',
    'focus:text-ds-strong-950 data-[placeholder]:focus:text-ds-strong-950',
    // disabled
    'disabled:pointer-events-none disabled:bg-ds-weak-50 disabled:text-ds-disabled-300 disabled:shadow-none disabled:ring-transparent data-[placeholder]:disabled:text-ds-disabled-300',
    // placeholder state
    'data-[placeholder]:text-ds-soft-400',
  ],
  {
    variants: {
      variant: {
        default: 'w-full hover:[&:not(:focus-within)]:bg-ds-weak-50',
        compact: 'w-auto hover:[&:not(:focus-within)]:bg-ds-weak-50',
        compactForInput: [
          'w-auto rounded-none shadow-none ring-0',
          'focus:bg-ds-weak-50 focus:shadow-none focus:ring-0 focus:ring-transparent',
        ],
        inline: [
          'h-5 min-h-5 w-auto gap-0 rounded-none bg-transparent p-0 text-ds-sub-600 !shadow-none ring-0',
          'focus:shadow-none ms-2',
          'data-[state=open]:text-ds-strong-950',
        ],
      },
      size: {
        medium: '', // Specific styles applied via compoundVariants
        small: '', // Specific styles applied via compoundVariants
        xsmall: '', // Specific styles applied via compoundVariants
      },
      hasError: {
        true: [
          'ring-ds-error-base',
          'focus:shadow-button-error-focus focus:ring-ds-error-base hover:ring-ds-error-base',
        ],
        false: '',
      },
    },
    compoundVariants: [
      // default variant sizes
      {
        variant: 'default',
        size: 'medium',
        className: 'h-10 min-h-10 gap-2 rounded-10 p-2.5 pl-3',
      },
      {
        variant: 'default',
        size: 'small',
        className: 'h-9 min-h-9 gap-2 rounded-lg p-2 pl-2.5 ',
      },
      {
        variant: 'default',
        size: 'xsmall',
        className: 'h-8 min-h-8 gap-1.5 rounded-lg p-1.5 pl-2',
      },
      // compact variant sizes
      {
        variant: 'compact',
        size: 'medium',
        className: 'h-10 gap-1 rounded-10 p-2.5 pl-3 ',
      },
      {
        variant: 'compact',
        size: 'small',
        className: 'h-9 gap-1 rounded-lg p-2 pl-3 ',
      },
      {
        variant: 'compact',
        size: 'xsmall',
        className: 'h-8 gap-0.5 rounded-lg p-1.5 pl-2.5',
      },
      {
        variant: 'compact',
        size: 'xsmall',
        className: 'h-8 gap-0.5 rounded-lg p-1.5 pl-2.5',
      },
      // compactForInput variant sizes
      { variant: 'compactForInput', size: 'medium', className: 'pl-2.5 pr-2' },
      { variant: 'compactForInput', size: 'small', className: 'px-2' },
      { variant: 'compactForInput', size: 'xsmall', className: 'pl-2 pr-1.5' },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'medium',
      hasError: false,
    },
  }
);

const selectTriggerArrowVariants = cva(
  [
    // base
    'ml-auto h-5 w-5 shrink-0',
    'transition duration-200 ease-out',
    // placeholder state
    'group-data-[placeholder]/trigger:text-ds-soft-400',
    // filled state
    'text-ds-sub-600',
    // hover
    'group-hover/trigger:text-ds-sub-600 group-data-[placeholder]/trigger:group-hover:text-ds-sub-600',
    // focus
    'group-focus/trigger:text-ds-strong-950 group-data-[placeholder]/trigger:group-focus/trigger:text-ds-strong-950',
    // disabled
    'group-disabled/trigger:text-ds-disabled-300 group-data-[placeholder]/trigger:group-disabled/trigger:text-ds-disabled-300',
    // open
    'group-data-[state=open]/trigger:rotate-180',
  ],
  {
    variants: {
      variant: {
        default: '',
        compact: '',
        compactForInput: 'ml-0.5',
        inline: [
          'ml-0.5',
          'group-hover/trigger:text-ds-strong-950',
          'group-data-[state=open]/trigger:text-ds-strong-950',
        ],
      },
      size: {
        // Size variants might affect arrow if specific styles were needed
        medium: '',
        small: '',
        xsmall: '',
      },
    },
  }
);

const selectTriggerIconVariants = cva(
  [
    // base
    'h-5 w-auto min-w-0 shrink-0 object-contain text-ds-sub-600',
    'transition duration-200 ease-out',
    // placeholder state
    'group-data-[placeholder]/trigger:text-ds-soft-400',
    // hover
    'group-hover/trigger:text-ds-sub-600 group-data-[placeholder]/trigger:group-hover:text-ds-sub-600',
    // disabled
    'group-disabled/trigger:text-ds-disabled-300 group-data-[placeholder]/trigger:group-disabled/trigger:text-ds-disabled-300',
    'group-disabled/trigger:[&:not(.remixicon)]:opacity-[.48]',
  ],
  {
    variants: {
      variant: {
        default: '',
        compact: '-ml-0.5',
        compactForInput: 'mr-2', // Default variant, specific sizes adjust this
        inline: [
          'mr-1.5 text-ds-soft-400',
          'group-hover/trigger:text-ds-sub-600',
          'group-data-[state=open]/trigger:text-ds-sub-600',
        ],
      },
      size: {
        medium: '',
        small: '',
        xsmall: 'h-4 w-4', // Applied generally for xsmall, might need compound for specific variants
      },
    },
    compoundVariants: [
      { variant: 'compact', size: 'medium', className: '-ml-0.5' },
      { variant: 'compact', size: 'small', className: '-ml-0.5' },
      { variant: 'compact', size: 'xsmall', className: '-ml-0.5 h-4 w-4' },
      {
        variant: 'compactForInput',
        size: 'xsmall',
        className: 'mr-1.5 h-4 w-4',
      },
    ],
  }
);

const selectItemIconVariants = cva(
  [
    'h-5 w-5 shrink-0 bg-[length:1.25rem] text-ds-sub-600',
    // disabled
    '[[data-disabled]_&:not(.remixicon)]:opacity-[.48] [[data-disabled]_&]:text-ds-disabled-300',
  ],
  {
    variants: {
      variant: {
        default: '',
        compact: 'group-has-[&]/trigger:-ml-0.5', // This selector might be tricky with CVA alone if it depends on trigger context
        compactForInput: '',
        inline: 'text-ds-soft-400 group-hover/trigger:text-ds-sub-600', // group-hover/trigger might be an issue here if not child of trigger
      },
      size: {
        medium: '',
        small: '',
        xsmall: 'h-4 w-4 bg-[length:1rem]',
      },
    },
    compoundVariants: [
      {
        variant: 'compact',
        size: 'medium',
        className: 'group-has-[&]/trigger:-ml-0.5',
      }, // Consider how to achieve group-has-[&]/trigger
      {
        variant: 'compact',
        size: 'small',
        className: 'group-has-[&]/trigger:-ml-0.5',
      },
      {
        variant: 'compact',
        size: 'xsmall',
        className: 'h-4 w-4 bg-[length:1rem] group-has-[&]/trigger:-ml-0.5',
      },
      {
        variant: 'compactForInput',
        size: 'xsmall',
        className: 'h-4 w-4 bg-[length:1rem]',
      },
    ],
  }
);

type SelectContextType = VariantProps<typeof selectTriggerRootVariants>;

const SelectContext = React.createContext<
  Omit<SelectContextType, 'className'> | undefined
>(undefined);

const useSelectContext = () => {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error('useSelectContext must be used within a SelectProvider');
  }
  return context;
};

interface SelectRootProps
  extends
    React.ComponentProps<typeof SelectPrimitives.Root>,
    Omit<SelectContextType, 'className' | 'children'> {}

const Select = ({
  size = 'medium',
  variant = 'default',
  hasError = false,
  ...props
}: SelectRootProps) => {
  return (
    <SelectContext.Provider value={{ size, variant, hasError }}>
      <SelectPrimitives.Root {...props} />
    </SelectContext.Provider>
  );
};
Select.displayName = 'Select';

const SelectGroup = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.Group>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.Group>
>(({ className, ...props }, ref) => (
  <SelectPrimitives.Group
    ref={ref}
    className={cn('p-1', className)} // Example: adding some default padding if desired, like shadcn
    {...props}
  />
));
SelectGroup.displayName = SelectPrimitives.Group.displayName;

const SelectValue = SelectPrimitives.Value;
SelectValue.displayName = SelectPrimitives.Value.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitives.Separator
    ref={ref}
    className={cn('bg-ds-stroke-soft-200 -mx-1 my-1 h-px', className)} // Example styling
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitives.Separator.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitives.Label
    ref={ref}
    className={cn(
      'text-ds-sub-600 px-2 py-1.5 text-sm font-semibold',
      className
    )} // Example styling
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitives.Label.displayName;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.Trigger>
>(({ className, children, ...props }, ref) => {
  const { size, variant, hasError } = useSelectContext();

  return (
    <SelectPrimitives.Trigger
      ref={ref}
      className={cn(
        selectTriggerRootVariants({ size, variant, hasError }),
        className
      )}
      {...props}
    >
      <Slottable>{children}</Slottable>
      <SelectPrimitives.Icon asChild>
        <RiArrowDownSLine
          className={cn(selectTriggerArrowVariants({ variant, size }))}
        />
      </SelectPrimitives.Icon>
    </SelectPrimitives.Trigger>
  );
});
SelectTrigger.displayName = SelectPrimitives.Trigger.displayName;

// Simplified TriggerIcon: A styled span wrapper.
// It's up to the user to pass an actual icon component as children.
const SelectTriggerIcon = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot> & { asChild?: boolean }
>(({ className, children, ...props }, ref) => {
  const { size, variant } = useSelectContext();
  const base = selectTriggerIconVariants({ size, variant });
  return (
    <Slot
      // asChild={asChild}
      ref={ref}
      className={cn(base, className)}
      {...props}
    >
      {children}
    </Slot>
  );
});
SelectTriggerIcon.displayName = 'SelectTriggerIcon';

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.Content>
>(
  (
    {
      className,
      position = 'popper',
      children,
      sideOffset = 8, // Original was 8, shadcn default is 4
      collisionPadding = 8,
      ...props
    },
    ref
  ) => (
    <SelectPrimitives.Portal>
      <SelectPrimitives.Content
        ref={ref}
        className={cn(
          // base
          'bg-ds-white-0 shadow-regular-md ring-ds-stroke-soft-200 relative z-50 overflow-hidden rounded-2xl ring-1 ring-inset',
          // widths
          'max-w-[max(var(--radix-select-trigger-width),320px)] min-w-[--radix-select-trigger-width]',
          // heights - consider shadcn's approach: 'max-h-96'
          'max-h-[--radix-select-content-available-height]',
          // animation
          'data-[state=open]:animate-in data-[state=open]:fade-in-0',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
          position === 'popper' && // shadcn specific positioning animations
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className
        )}
        sideOffset={sideOffset}
        position={position}
        collisionPadding={collisionPadding}
        {...props}
      >
        <ScrollAreaPrimitives.Root type='auto'>
          <SelectPrimitives.Viewport asChild>
            <ScrollAreaPrimitives.Viewport
              style={{ overflowY: undefined }} // Keep this if it's intentional
              className={cn(
                'max-h-[196px] w-full scroll-py-2 p-2', // Original padding
                // Shadcn uses different padding based on position, e.g. 'p-1' for popper
                position === 'popper' && '' // Adjust if mimicking shadcn viewport padding for popper
              )}
            >
              {children}
            </ScrollAreaPrimitives.Viewport>
          </SelectPrimitives.Viewport>
          <ScrollAreaPrimitives.Scrollbar orientation='vertical'>
            <ScrollAreaPrimitives.Thumb className='bg-ds-soft-200 !w-1 rounded' />
          </ScrollAreaPrimitives.Scrollbar>
        </ScrollAreaPrimitives.Root>
      </SelectPrimitives.Content>
    </SelectPrimitives.Portal>
  )
);
SelectContent.displayName = SelectPrimitives.Content.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.Item>
>(({ className, children, ...props }, ref) => {
  const context = useSelectContext(); // Get context for size if needed
  const size = context?.size || 'medium'; // Fallback if context isn't strictly required here by CVA

  return (
    <SelectPrimitives.Item
      ref={ref}
      className={cn(
        // base
        'group text-ds-strong-950 relative cursor-pointer rounded-lg p-2 pr-9 text-sm select-none',
        'flex items-center gap-2 transition duration-200 ease-out',
        // disabled
        'data-[disabled]:text-ds-disabled-300 data-[disabled]:pointer-events-none',
        // hover, focus
        'data-[highlighted]:bg-ds-weak-50 focus:bg-ds-weak-50 data-[highlighted]:outline-0', // Added focus style similar to highlighted for consistency
        {
          'gap-1.5 pr-[34px]': size === 'xsmall', // Adjusted padding for checkmark space
        },
        className
      )}
      {...props}
    >
      <SelectPrimitives.ItemText asChild>
        <span
          className={cn(
            // base
            'flex flex-1 items-center gap-2',
            // disabled - inherited by parent, but can be explicit if needed
            // 'group-disabled:text-disabled-300', (already handled by Item's disabled state)
            {
              'gap-1.5': size === 'xsmall',
            }
          )}
        >
          {/* Allow direct string or ReactNode children for flexibility */}
          {children}
        </span>
      </SelectPrimitives.ItemText>
      <SelectPrimitives.ItemIndicator asChild>
        <RiCheckLine className='text-ds-sub-600 absolute top-1/2 right-2 h-5 w-5 shrink-0 -translate-y-1/2' />
      </SelectPrimitives.ItemIndicator>
    </SelectPrimitives.Item>
  );
});
SelectItem.displayName = SelectPrimitives.Item.displayName;

// Simplified SelectItemIcon: A styled span wrapper.
// User passes an actual icon component as children.
const SelectItemIcon = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => {
  const { size, variant } = useSelectContext();
  // Note: some original selectItemIcon styles had selectors like 'group-has-[&]/trigger'
  // or 'group-hover/trigger'. These are hard to replicate perfectly if this component
  // is not a direct child of the element with the 'group/trigger' class.
  // The CVA here applies styles directly to this span.
  return (
    <span
      ref={ref}
      className={cn(selectItemIconVariants({ size, variant }), className)}
      {...props}
    >
      {children}
    </span>
  );
});
SelectItemIcon.displayName = 'SelectItemIcon';

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectTriggerIcon,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectItemIcon,
  SelectSeparator,
};

export {
  SelectContext,
  useSelectContext,
  selectTriggerRootVariants,
  selectTriggerArrowVariants,
  selectTriggerIconVariants,
  selectItemIconVariants,
};
