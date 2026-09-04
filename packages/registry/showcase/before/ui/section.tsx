'use client';

import * as React from 'react';

import { cn } from '../lib/happly-ui-utils';

function SectionRoot({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'bg-bg-white-0 flex flex-col gap-6 rounded-3xl p-5 lg:flex-row lg:gap-[88px] lg:p-6',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
SectionRoot.displayName = 'SectionRoot';

function SectionHeader({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex shrink-0 flex-col gap-1 lg:w-[286px]', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
SectionHeader.displayName = 'SectionHeader';

function SectionTitle({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-label-md text-text-strong-950', className)}
      {...rest}
    >
      {children}
    </h3>
  );
}
SectionTitle.displayName = 'SectionTitle';

function SectionDescription({
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
SectionDescription.displayName = 'SectionDescription';

function SectionContent({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex min-w-0 flex-1 flex-col gap-6', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
SectionContent.displayName = 'SectionContent';

type SectionComposedProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  description?: string;
  headerClassName?: string;
  contentClassName?: string;
};

function Section({
  title,
  description,
  children,
  className,
  headerClassName,
  contentClassName,
  ...rest
}: SectionComposedProps) {
  return (
    <SectionRoot className={className} {...rest}>
      <SectionHeader className={headerClassName}>
        <SectionTitle>{title}</SectionTitle>
        {description && <SectionDescription>{description}</SectionDescription>}
      </SectionHeader>
      <SectionContent className={contentClassName}>{children}</SectionContent>
    </SectionRoot>
  );
}
Section.displayName = 'Section';

export {
  SectionRoot as Root,
  SectionHeader as Header,
  SectionTitle as Title,
  SectionDescription as Description,
  SectionContent as Content,
  Section as Composed,
};
