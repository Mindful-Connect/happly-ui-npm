'use client';

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { cn } from '@/lib/happly-ui-utils';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

/**
 * @component PopoverContent
 *
 * @description
 * Content wrapper for the Popover component. By default, it uses a React Portal
 * to render at the end of the document body (`usePortal={true}`).
 *
 * ⚠️ **MODAL INTEGRATION WARNING (Headless UI Dialogs)** ⚠️
 * When nesting a Popover (or components that use it, like `SearchableMultiCombobox`)
 * inside a strict FocusTrap or outside-click listener like `@headlessui/react`'s `<Dialog>`,
 * portal-rendered popovers often face z-index issues (appearing behind the modal)
 * or unintentional modal-closing behaviors (because the dialog considers clicks on
 * the portal as "outside" the dialog).
 *
 * **To fix these issues:**
 * Pass `usePortal={false}` to this component (or to the wrapper component, if it
 * exposes the prop). This forces the popover content to render inline in the DOM
 * hierarchy where it was declared, respecting z-indexes inherited from the Dialog.
 */
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    usePortal?: boolean;
  }
>(
  (
    { className, align = 'center', sideOffset = 4, usePortal = true, ...props },
    ref
  ) => {
    const content = (
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'border-ds-soft-200 bg-popover text-popover-foreground shadow-regular-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-[--radix-popover-content-transform-origin] rounded-2xl border p-2 outline-none',
          className
        )}
        {...props}
      />
    );

    return usePortal ? (
      <PopoverPrimitive.Portal>{content}</PopoverPrimitive.Portal>
    ) : (
      content
    );
  }
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
