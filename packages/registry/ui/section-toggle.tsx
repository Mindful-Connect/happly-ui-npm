'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Root as SwitchRoot } from '@/components/ui/switch';
import { cn } from '@/lib/happly-ui-utils';

type SectionToggleRootProps = React.HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
};

function SectionToggleRoot({
  children,
  className,
  open = false,
  ...rest
}: SectionToggleRootProps) {
  return (
    <div
      className={cn(
        'border-stroke-soft-200 shadow-regular-xs overflow-hidden rounded-2xl border p-2 transition-colors duration-200',
        open ? 'bg-bg-weak-50' : 'bg-bg-white-0 cursor-pointer',
        className
      )}
      {...(open && { 'data-section-toggle-open': '' })}
      {...rest}
    >
      {children}
    </div>
  );
}
SectionToggleRoot.displayName = 'SectionToggleRoot';

type SectionToggleHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

function SectionToggleHeader({
  children,
  className,
  open = false,
  onOpenChange,
  ...rest
}: SectionToggleHeaderProps) {
  return (
    <div
      className={cn('flex items-start gap-3.5 p-2', className)}
      {...(!open &&
        onOpenChange && {
          role: 'button',
          tabIndex: 0,
          onClick: () => onOpenChange(true),
        })}
      {...rest}
    >
      {children}
    </div>
  );
}
SectionToggleHeader.displayName = 'SectionToggleHeader';

function SectionToggleTextGroup({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex min-w-0 flex-1 flex-col gap-1', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
SectionToggleTextGroup.displayName = 'SectionToggleTextGroup';

function SectionToggleTitle({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={cn('text-label-sm text-text-strong-950', className)}
      {...rest}
    >
      {children}
    </h4>
  );
}
SectionToggleTitle.displayName = 'SectionToggleTitle';

function SectionToggleDescription({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-paragraph-xs text-text-sub-600', className)}
      {...rest}
    >
      {children}
    </p>
  );
}
SectionToggleDescription.displayName = 'SectionToggleDescription';

type SectionToggleContentProps = React.HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
};

function SectionToggleContent({
  children,
  className,
  open = false,
  ...rest
}: SectionToggleContentProps) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            duration: 0.2,
            ease: 'easeInOut',
            opacity: { duration: 0.1 },
          }}
          className='overflow-hidden'
        >
          <div className={cn('pt-4', className)} {...rest}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
SectionToggleContent.displayName = 'SectionToggleContent';

type SectionToggleComposedProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> & {
  title: React.ReactNode;
  description?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  contentClassName?: string;
};

function SectionToggle({
  title,
  description,
  children,
  className,
  open = false,
  onOpenChange,
  contentClassName,
  ...rest
}: SectionToggleComposedProps) {
  return (
    <SectionToggleRoot open={open} className={className} {...rest}>
      <SectionToggleHeader
        open={open}
        {...(!open && {
          role: 'button',
          tabIndex: 0,
          onClick: () => onOpenChange?.(true),
        })}
      >
        <SectionToggleTextGroup>
          <SectionToggleTitle>{title}</SectionToggleTitle>
          {description && (
            <SectionToggleDescription>{description}</SectionToggleDescription>
          )}
        </SectionToggleTextGroup>
        {/* Stop propagation to prevent Radix Switch's hidden input
            synthetic click from bubbling to the header's onClick */}
        <div onClick={(e) => e.stopPropagation()}>
          <SwitchRoot
            variant='neutral'
            checked={open}
            onCheckedChange={onOpenChange}
          />
        </div>
      </SectionToggleHeader>
      <SectionToggleContent open={open} className={contentClassName}>
        {children}
      </SectionToggleContent>
    </SectionToggleRoot>
  );
}
SectionToggle.displayName = 'SectionToggle';

export {
  SectionToggleRoot as Root,
  SectionToggleHeader as Header,
  SectionToggleTextGroup as TextGroup,
  SectionToggleTitle as Title,
  SectionToggleDescription as Description,
  SectionToggleContent as Content,
  SectionToggle as Composed,
};
