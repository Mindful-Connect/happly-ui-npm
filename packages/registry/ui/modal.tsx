'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { RiCloseLine, type RemixiconComponentType } from '@remixicon/react';

import * as CompactButton from '@/components/ui/compact-button';
import { cn } from '@/lib/happly-ui-utils';

type ModalContentVariant = 'default' | 'pattern';
type ModalCloseVariant = 'default' | 'badge';

const PATTERN_BACKGROUND_OPACITY = 0.15;

// Decorative hairlines follow the text color so the grid stays visible on both themes
// (black on the light surface, white on the dark one) instead of a fixed rgba(0,0,0).
const patternLine = (opacity: number) =>
  `color-mix(in srgb, var(--color-text-strong-950) ${Math.round(opacity * 1000) / 10}%, transparent)`;

const PATTERN_BACKGROUND_STYLE: React.CSSProperties = {
  backgroundImage: [
    // Fades into the modal surface, so it follows the theme in dark mode.
    `linear-gradient(to top, var(--color-bg-white-0) 50%, transparent 100%)`,
    `repeating-linear-gradient(90deg, ${patternLine(PATTERN_BACKGROUND_OPACITY)} 0px, ${patternLine(PATTERN_BACKGROUND_OPACITY * 0.15)} 1px, transparent 1px, transparent 60px)`,
    `repeating-linear-gradient(0deg, ${patternLine(PATTERN_BACKGROUND_OPACITY)} 0px, ${patternLine(PATTERN_BACKGROUND_OPACITY * 0.15)} 1px, transparent 1px, transparent 60px)`,
  ].join(','),
  backgroundSize: 'auto, 60px 60px, 60px 60px',
  backgroundRepeat: 'no-repeat, repeat, repeat',
  backgroundPosition: 'bottom, 0 0, 0 0',
};

const ModalRoot = DialogPrimitive.Root;
const ModalTrigger = DialogPrimitive.Trigger;
const ModalClose = DialogPrimitive.Close;
const ModalPortal = DialogPrimitive.Portal;

const ModalOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <DialogPrimitive.Overlay
      ref={forwardedRef}
      className={cn(
        // base
        'bg-overlay fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto p-4 backdrop-blur-[10px]',
        // animation — enter 200ms, exit 150ms, ease-out both ways, matching
        // every other overlay in the set.
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-200 data-[state=open]:ease-out',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-150 data-[state=closed]:ease-out',
        className
      )}
      {...rest}
    />
  );
});
ModalOverlay.displayName = 'ModalOverlay';

const ModalContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    variant?: ModalContentVariant;
    closeVariant?: ModalCloseVariant;
    overlayClassName?: string;
    showClose?: boolean;
    ariaTitle?: string;
  }
>(
  (
    {
      className,
      overlayClassName,
      children,
      showClose = true,
      ariaTitle = 'Dialog',
      variant = 'default',
      closeVariant = 'default',
      ...rest
    },
    forwardedRef
  ) => {
    const isPattern = variant === 'pattern';
    const isBadgeClose = closeVariant === 'badge';

    return (
      <ModalPortal>
        <ModalOverlay className={overlayClassName}>
          <DialogPrimitive.Content
            ref={forwardedRef}
            className={cn(
              // base
              'relative w-full max-w-[400px]',
              'rounded-20 bg-bg-white-0 shadow-regular-md',
              // focus
              'focus:outline-none',
              // animation — enter 200ms, exit 150ms, ease-out both ways.
              'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-200 data-[state=open]:ease-out',
              'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-150 data-[state=closed]:ease-out',
              'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
              // pattern
              isPattern && 'border-stroke-soft-200 overflow-hidden border',
              className
            )}
            {...rest}
          >
            {isPattern && (
              <div
                aria-hidden
                className='pointer-events-none absolute inset-0 z-0 overflow-hidden'
                style={PATTERN_BACKGROUND_STYLE}
              />
            )}
            <VisuallyHidden>
              <DialogPrimitive.Title>{ariaTitle}</DialogPrimitive.Title>
            </VisuallyHidden>
            {isPattern ? (
              <div className='relative z-10'>{children}</div>
            ) : (
              children
            )}
            {showClose &&
              (isBadgeClose ? (
                <DialogPrimitive.Close
                  className={cn(
                    'absolute top-[34px] right-[34px] z-10',
                    'flex h-8 w-8 items-center justify-center rounded-full',
                    'bg-bg-weak-50 text-text-sub-600',
                    'hover:text-text-strong-950 hover:bg-bg-soft-200 transition-colors',
                    'focus-visible:shadow-button-important-focus outline-none',
                    'disabled:pointer-events-none'
                  )}
                >
                  <div className='border-stroke-soft-200 bg-bg-white-0 flex h-6 w-6 items-center justify-center rounded-full border'>
                    <RiCloseLine className='h-4 w-4' />
                  </div>
                  <span className='sr-only'>Close</span>
                </DialogPrimitive.Close>
              ) : (
                <ModalClose asChild>
                  <CompactButton.Root
                    variant='ghost'
                    size='large'
                    aria-label='Close'
                    className='absolute top-4 right-4'
                  >
                    <CompactButton.Icon as={RiCloseLine} aria-hidden='true' />
                  </CompactButton.Root>
                </ModalClose>
              ))}
          </DialogPrimitive.Content>
        </ModalOverlay>
      </ModalPortal>
    );
  }
);
ModalContent.displayName = 'ModalContent';

function ModalHeader({
  className,
  children,
  icon: Icon,
  title,
  description,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & {
  icon?: RemixiconComponentType;
  title?: string;
  description?: string;
}) {
  return (
    <div
      className={cn(
        'before:border-stroke-soft-200 relative flex items-start gap-3.5 py-4 pr-14 pl-5 before:absolute before:inset-x-0 before:bottom-0 before:border-b',
        className
      )}
      {...rest}
    >
      {children || (
        <>
          {Icon && (
            <div className='bg-bg-white-0 ring-stroke-soft-200 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1 ring-inset'>
              <Icon className='text-text-sub-600 h-5 w-5' />
            </div>
          )}
          {(title || description) && (
            <div className='flex-1 space-y-1'>
              {title && <ModalTitle>{title}</ModalTitle>}
              {description && (
                <ModalDescription>{description}</ModalDescription>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
ModalHeader.displayName = 'ModalHeader';

const ModalTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <DialogPrimitive.Title
      ref={forwardedRef}
      className={cn(
        'text-label-sm text-text-strong-950 text-balance',
        className
      )}
      {...rest}
    />
  );
});
ModalTitle.displayName = 'ModalTitle';

const ModalDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <DialogPrimitive.Description
      ref={forwardedRef}
      className={cn(
        'text-paragraph-xs text-text-sub-600 text-pretty',
        className
      )}
      {...rest}
    />
  );
});
ModalDescription.displayName = 'ModalDescription';

function ModalBody({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-5', className)} {...rest} />;
}
ModalBody.displayName = 'ModalBody';

function ModalFooter({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'border-stroke-soft-200 flex items-center justify-between gap-3 border-t px-5 py-4',
        className
      )}
      {...rest}
    />
  );
}
ModalFooter.displayName = 'ModalFooter';

export {
  ModalRoot as Root,
  ModalTrigger as Trigger,
  ModalClose as Close,
  ModalPortal as Portal,
  ModalOverlay as Overlay,
  ModalContent as Content,
  ModalHeader as Header,
  ModalTitle as Title,
  ModalDescription as Description,
  ModalBody as Body,
  ModalFooter as Footer,
};
