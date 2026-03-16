'use client';

import * as React from 'react';

import { cn } from '@/lib/happly-ui-utils';
import { tv, type VariantProps } from '@/lib/tv';

const INFO_CARD_ROOT_NAME = 'InfoCardRoot';
const INFO_CARD_ITEM_NAME = 'InfoCardItem';
const INFO_CARD_LABEL_NAME = 'InfoCardLabel';
const INFO_CARD_VALUE_NAME = 'InfoCardValue';

export const infoCardVariants = tv({
  slots: {
    root: [
      'relative overflow-clip rounded-2xl border border-stroke-soft-200/50 bg-bg-white-0/60 p-3',
    ],
    item: [
      'flex flex-col gap-1.5 overflow-clip rounded-xl bg-white p-3',
      'shadow-[0px_2px_5px_-1px_rgba(0,0,0,0.04),0px_12px_40px_-8px_rgba(0,0,0,0.08),0px_0px_0px_1px_var(--color-white),0px_0px_0px_1.5px_rgba(153,160,174,0.1)]',
    ],
    label: 'text-label-xs font-medium text-text-strong-950',
    value: 'flex items-center gap-1 text-label-xs text-text-sub-600',
  },
  variants: {
    layout: {
      inline: {
        root: 'flex flex-wrap gap-2',
        item: 'flex-1 min-w-0',
      },
      grid: {
        root: 'grid gap-2',
      },
      stack: {
        root: 'flex flex-col gap-2',
      },
      wrap: {
        root: 'flex flex-wrap gap-2',
      },
    },
    columns: {
      1: {},
      2: {},
      3: {},
      4: {},
    },
  },
  compoundVariants: [
    {
      layout: 'grid',
      columns: 2,
      class: { root: 'grid-cols-2' },
    },
    {
      layout: 'grid',
      columns: 3,
      class: { root: 'grid-cols-3' },
    },
    {
      layout: 'grid',
      columns: 4,
      class: { root: 'grid-cols-4' },
    },
  ],
  defaultVariants: {
    layout: 'inline',
  },
});

type InfoCardRootProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof infoCardVariants>;

const InfoCardRoot = React.forwardRef<HTMLDivElement, InfoCardRootProps>(
  ({ layout, columns, className, ...rest }, forwardedRef) => {
    const { root } = infoCardVariants({ layout, columns });

    return (
      <div ref={forwardedRef} className={root({ class: className })} {...rest} />
    );
  },
);
InfoCardRoot.displayName = INFO_CARD_ROOT_NAME;

type InfoCardItemProps = React.HTMLAttributes<HTMLDivElement> & {
  /** When true, the item spans the full width (useful in inline/wrap layouts). */
  fullWidth?: boolean;
};

const InfoCardItem = React.forwardRef<HTMLDivElement, InfoCardItemProps>(
  ({ fullWidth, className, ...rest }, forwardedRef) => {
    const { item } = infoCardVariants();

    return (
      <div
        ref={forwardedRef}
        className={item({
          class: cn(fullWidth && 'w-full flex-none', className),
        })}
        {...rest}
      />
    );
  },
);
InfoCardItem.displayName = INFO_CARD_ITEM_NAME;

type InfoCardLabelProps = React.HTMLAttributes<HTMLParagraphElement>;

const InfoCardLabel = React.forwardRef<
  HTMLParagraphElement,
  InfoCardLabelProps
>(({ className, ...rest }, forwardedRef) => {
  const { label } = infoCardVariants();

  return <p ref={forwardedRef} className={label({ class: className })} {...rest} />;
});
InfoCardLabel.displayName = INFO_CARD_LABEL_NAME;

type InfoCardValueProps = React.HTMLAttributes<HTMLDivElement>;

const InfoCardValue = React.forwardRef<HTMLDivElement, InfoCardValueProps>(
  ({ className, ...rest }, forwardedRef) => {
    const { value } = infoCardVariants();

    return (
      <div ref={forwardedRef} className={value({ class: className })} {...rest} />
    );
  },
);
InfoCardValue.displayName = INFO_CARD_VALUE_NAME;

export {
  InfoCardRoot as Root,
  InfoCardItem as Item,
  InfoCardLabel as Label,
  InfoCardValue as Value,
};
