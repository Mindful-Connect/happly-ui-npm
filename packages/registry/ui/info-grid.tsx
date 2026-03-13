import * as React from 'react';

import { cn } from '@/lib/happly-ui-utils';
import { tv } from '@/lib/tv';
import * as KeyIcon from '@/components/ui/key-icon';

// ─── Variants ────────────────────────────────────────────────────────────────

const infoGridRootVariants = tv({
  base: [
    'flex flex-col overflow-hidden rounded-[20px]',
    'bg-bg-white-0 ring-1 ring-inset ring-stroke-soft-200 shadow-regular-xs',
  ],
});

const infoGridRowVariants = tv({
  base: [
    'flex w-full items-stretch',
    // all rows except the first get a top divider
    'not-first:border-t not-first:border-stroke-soft-200',
  ],
});

const infoGridCellVariants = tv({
  base: [
    'flex min-w-0 flex-1 flex-col gap-3 p-5',
    // all cells except the last in a row get a right divider
    'not-last:border-r not-last:border-stroke-soft-200',
  ],
  variants: {},
});

// ─── Root ────────────────────────────────────────────────────────────────────

type InfoGridRootProps = React.ComponentPropsWithoutRef<'div'>;

const InfoGridRoot = React.forwardRef<HTMLDivElement, InfoGridRootProps>(
  ({ className, ...rest }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        className={cn(infoGridRootVariants(), className)}
        {...rest}
      />
    );
  },
);
InfoGridRoot.displayName = 'InfoGridRoot';

// ─── Row ─────────────────────────────────────────────────────────────────────

type InfoGridRowProps = React.ComponentPropsWithoutRef<'div'>;

const InfoGridRow = React.forwardRef<HTMLDivElement, InfoGridRowProps>(
  ({ className, ...rest }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        className={cn(infoGridRowVariants(), className)}
        {...rest}
      />
    );
  },
);
InfoGridRow.displayName = 'InfoGridRow';

// ─── Cell ────────────────────────────────────────────────────────────────────

type InfoGridCellProps = React.ComponentPropsWithoutRef<'div'>;

const InfoGridCell = React.forwardRef<HTMLDivElement, InfoGridCellProps>(
  ({ className, ...rest }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        className={cn(infoGridCellVariants(), className)}
        {...rest}
      />
    );
  },
);
InfoGridCell.displayName = 'InfoGridCell';

// ─── Group (composed) ────────────────────────────────────────────────────────

type InfoGridGroupItem = {
  icon: React.ReactNode;
  label: React.ReactNode;
  children: React.ReactNode;
};

type InfoGridGroupRow = {
  items: InfoGridGroupItem[];
};

type InfoGridGroupProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> & {
  rows: InfoGridGroupRow[];
};

const InfoGridGroup = React.forwardRef<HTMLDivElement, InfoGridGroupProps>(
  ({ rows, ...rest }, forwardedRef) => {
    return (
      <InfoGridRoot ref={forwardedRef} {...rest}>
        {rows.map((row, rowIndex) => (
          <InfoGridRow key={rowIndex}>
            {row.items.map((item, cellIndex) => (
              <InfoGridCell key={cellIndex}>
                <KeyIcon.Root icon={item.icon} />
                <div className='flex flex-col gap-1'>
                  <p className='text-label-xs text-text-strong-950'>{item.label}</p>
                  {item.children}
                </div>
              </InfoGridCell>
            ))}
          </InfoGridRow>
        ))}
      </InfoGridRoot>
    );
  },
);
InfoGridGroup.displayName = 'InfoGridGroup';

// ─── Exports ─────────────────────────────────────────────────────────────────

export {
  InfoGridRoot as Root,
  InfoGridRow as Row,
  InfoGridCell as Cell,
  InfoGridGroup as Group,
  infoGridRootVariants,
  infoGridRowVariants,
  infoGridCellVariants,
};

export type { InfoGridGroupItem, InfoGridGroupRow, InfoGridGroupProps };
