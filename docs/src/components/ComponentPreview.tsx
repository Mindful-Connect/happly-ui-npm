'use client';

import { type ReactNode } from 'react';

interface ComponentPreviewProps {
  children: ReactNode;
}

export function ComponentPreview({ children }: ComponentPreviewProps) {
  return (
    <div className='overflow-hidden not-prose my-6 rounded-xl border border-slate-200 bg-white text-sm text-ds-neutral-950 dark:border-slate-800 dark:bg-slate-900/50'>
      <div className='flex min-h-[200px] flex-wrap items-center justify-center gap-4 bg-bg-weak-50/50 p-10'>
        {children}
      </div>
    </div>
  );
}
