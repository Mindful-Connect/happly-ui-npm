'use client';

import { type ReactNode } from 'react';

import { clsx } from 'clsx';

interface ComponentPreviewProps {
  children: ReactNode;
  className?: string;
}

export function ComponentPreview({ children, className }: ComponentPreviewProps) {
  return (
    <div className='overflow-hidden not-prose my-6 rounded-xl border border-slate-200 bg-white text-sm text-ds-neutral-950 dark:border-slate-800 dark:bg-slate-900/50'>
      <div className={clsx('flex min-h-[200px] flex-wrap items-center justify-center gap-4 p-10', className || 'bg-primary-alpha-10/10')}>
        {children}
      </div>
    </div>
  );
}
