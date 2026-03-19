'use client';

import * as React from 'react';

import { RiArrowRightUpLine } from '@remixicon/react';

import { Root as StatusIndicator } from '@/components/ui/status-indicator';
import { cn } from '@/lib/happly-ui-utils';
import { tv, type VariantProps } from '@/lib/tv';

const INFO_CARD_ROOT_NAME = 'InfoCardRoot';
const INFO_CARD_ITEM_NAME = 'InfoCardItem';
const INFO_CARD_LABEL_NAME = 'InfoCardLabel';
const INFO_CARD_VALUE_NAME = 'InfoCardValue';
const INFO_CARD_ACTION_NAME = 'InfoCardAction';

export const infoCardVariants = tv({
  slots: {
    root: [
      'relative overflow-clip rounded-2xl border border-stroke-soft-200/50 bg-bg-white-0/60 p-3',
      'flex flex-col gap-2',
    ],
    item: [
      'flex flex-col gap-1.5 overflow-clip rounded-xl bg-bg-white-0 p-3',
      'shadow-[0px_2px_5px_-1px_rgba(0,0,0,0.04),0px_12px_40px_-8px_rgba(0,0,0,0.08),0px_0px_0px_1px_var(--color-bg-white-0),0px_0px_0px_1.5px_rgba(153,160,174,0.1)]',
    ],
    action: [
      'flex items-center justify-center overflow-visible rounded-xl bg-bg-white-0 p-3',
      'shadow-[0px_2px_5px_-1px_rgba(0,0,0,0.04),0px_12px_40px_-8px_rgba(0,0,0,0.08),0px_0px_0px_1px_var(--color-bg-white-0),0px_0px_0px_1.5px_rgba(153,160,174,0.1)]',
      'transition-colors hover:bg-bg-weak-50 cursor-pointer',
      '@sm:aspect-square @sm:self-center',
    ],
    label: 'text-label-xs font-medium text-text-strong-950',
    value: 'flex items-center gap-1 text-label-xs text-text-sub-600',
  },
  variants: {
    layout: {
      inline: {
        root: ['@sm:flex-row @sm:flex-wrap', '@sm:[&>div]:flex-[1_0_10rem]'],
      },
      grid: {
        root: '@sm:grid',
      },
      stack: {},
      wrap: {
        root: '@sm:flex-row @sm:flex-wrap',
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
      class: { root: '@sm:grid-cols-2' },
    },
    {
      layout: 'grid',
      columns: 3,
      class: { root: '@sm:grid-cols-3' },
    },
    {
      layout: 'grid',
      columns: 4,
      class: { root: '@sm:grid-cols-4' },
    },
  ],
  defaultVariants: {
    layout: 'inline',
  },
});

type InfoCardRootProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof infoCardVariants>;

const InfoCardRoot = React.forwardRef<HTMLDivElement, InfoCardRootProps>(
  ({ layout, columns, className, children, ...rest }, forwardedRef) => {
    const { root } = infoCardVariants({ layout, columns });

    return (
      <div ref={forwardedRef} className='@container'>
        <div className={root({ class: className })} {...rest}>
          {children}
        </div>
      </div>
    );
  }
);
InfoCardRoot.displayName = INFO_CARD_ROOT_NAME;

type InfoCardItemProps = React.HTMLAttributes<HTMLDivElement> & {
  /** When true, the item spans the full width (useful in inline/wrap layouts). */
  fullWidth?: boolean;
};

const InfoCardItem = React.forwardRef<HTMLDivElement, InfoCardItemProps>(
  ({ fullWidth, className, style, ...rest }, forwardedRef) => {
    const { item } = infoCardVariants();

    return (
      <div
        ref={forwardedRef}
        className={item({ class: className })}
        style={fullWidth ? { ...style, flex: '1 0 100%' } : style}
        {...rest}
      />
    );
  }
);
InfoCardItem.displayName = INFO_CARD_ITEM_NAME;

type InfoCardLabelProps = React.HTMLAttributes<HTMLParagraphElement>;

const InfoCardLabel = React.forwardRef<
  HTMLParagraphElement,
  InfoCardLabelProps
>(({ className, ...rest }, forwardedRef) => {
  const { label } = infoCardVariants();

  return (
    <p ref={forwardedRef} className={label({ class: className })} {...rest} />
  );
});
InfoCardLabel.displayName = INFO_CARD_LABEL_NAME;

type InfoCardValueProps = React.HTMLAttributes<HTMLDivElement>;

const InfoCardValue = React.forwardRef<HTMLDivElement, InfoCardValueProps>(
  ({ className, ...rest }, forwardedRef) => {
    const { value } = infoCardVariants();

    return (
      <div
        ref={forwardedRef}
        className={value({ class: className })}
        {...rest}
      />
    );
  }
);
InfoCardValue.displayName = INFO_CARD_VALUE_NAME;

type InfoCardActionProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href?: string;
    /** Show a notification dot in the top-right corner. */
    notification?: boolean;
  };

const ActionNotification = () => (
  <span className='absolute -top-1 -right-1'>
    <StatusIndicator status='notification' />
  </span>
);

const InfoCardAction = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  InfoCardActionProps
>(({ className, children, href, notification, ...rest }, forwardedRef) => {
  const { action } = infoCardVariants();
  const cls = action({ class: cn('relative', className) });
  const content = children ?? (
    <RiArrowRightUpLine className='text-icon-sub-600 size-5' />
  );

  if (href) {
    return (
      <a
        ref={forwardedRef as React.Ref<HTMLAnchorElement>}
        href={href}
        className={cls}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
        {notification && <ActionNotification />}
      </a>
    );
  }

  return (
    <button
      ref={forwardedRef as React.Ref<HTMLButtonElement>}
      className={cls}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
      {notification && <ActionNotification />}
    </button>
  );
});
InfoCardAction.displayName = INFO_CARD_ACTION_NAME;

export {
  InfoCardRoot as Root,
  InfoCardItem as Item,
  InfoCardLabel as Label,
  InfoCardValue as Value,
  InfoCardAction as Action,
};
