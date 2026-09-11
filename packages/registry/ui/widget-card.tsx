'use client';

import * as React from 'react';

import { cn } from '@/lib/happly-ui-utils';

function WidgetCardRoot({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'bg-bg-white-0 ring-stroke-soft-200 shadow-regular-xs flex flex-col gap-4 rounded-2xl p-5 ring-1',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
WidgetCardRoot.displayName = 'WidgetCardRoot';

function WidgetCardHeader({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-start justify-between gap-3', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
WidgetCardHeader.displayName = 'WidgetCardHeader';

function WidgetCardTitle({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'text-label-md text-text-strong-950 text-balance',
        className
      )}
      {...rest}
    >
      {children}
    </h3>
  );
}
WidgetCardTitle.displayName = 'WidgetCardTitle';

function WidgetCardContent({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    // min-h-0 is load-bearing: a flex child defaults to min-height:auto and
    // refuses to shrink below its content, so in a fixed-height card a tall
    // list overflows past the rounded edge instead of scrolling inside it.
    <div className={cn('min-h-0 flex-1', className)} {...rest}>
      {children}
    </div>
  );
}
WidgetCardContent.displayName = 'WidgetCardContent';

export {
  WidgetCardRoot as Root,
  WidgetCardHeader as Header,
  WidgetCardTitle as Title,
  WidgetCardContent as Content,
};
