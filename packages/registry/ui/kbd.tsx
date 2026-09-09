'use client';

import * as React from 'react';

import { cn } from '@/lib/happly-ui-utils';

function Kbd({ className, ...rest }: React.HTMLAttributes<HTMLElement>) {
  return (
    // `<kbd>` is the element for key input; `font-sans` keeps the UI face
    // instead of the user-agent monospace default, and `tabular-nums` keeps
    // digit keys the same width as letters in a row of shortcuts.
    <kbd
      className={cn(
        'bg-bg-white-0 text-subheading-xs text-text-soft-400 ring-stroke-soft-200 flex h-5 items-center gap-0.5 rounded px-1.5 font-sans whitespace-nowrap tabular-nums ring-1 ring-inset',
        className
      )}
      {...rest}
    />
  );
}

export { Kbd as Root };
