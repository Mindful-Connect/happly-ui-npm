'use client';

import { type ReactNode } from 'react';

import { clsx } from 'clsx';

interface ComponentPreviewProps {
  children: ReactNode;
  className?: string;
}

export function ComponentPreview({
  children,
  className,
}: ComponentPreviewProps) {
  return (
    <div className='not-prose text-ds-neutral-950 my-6 overflow-hidden rounded-xl border border-slate-200 bg-white text-sm dark:border-slate-800 dark:bg-slate-900/50'>
      <div
        className={clsx(
          'flex min-h-[200px] flex-wrap items-center justify-center gap-4 p-10',
          className || 'bg-bg-white-0'
        )}
      >
        {children}
      </div>
    </div>
  );
}
