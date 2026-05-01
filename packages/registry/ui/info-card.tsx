'use client';

import * as React from 'react';

import { RiArrowRightUpLine } from '@remixicon/react';

import { Root as StatusIndicator } from '@/components/ui/status-indicator';
import { cn } from '@/lib/happly-ui-utils';
import { tv } from '@/lib/tv';

export const infoCardVariants = tv({
  slots: {
    root: [
      '@container',
      'relative overflow-clip rounded-2xl border border-stroke-soft-200/50 bg-bg-white-0/60 p-2',
      'flex flex-col gap-2',
    ],
    item: [
      'flex flex-1 flex-col gap-1.5 overflow-clip rounded-xl bg-bg-white-0 p-2',
      'shadow-[0px_2px_5px_-1px_rgba(0,0,0,0.04),0px_12px_40px_-8px_rgba(0,0,0,0.08),0px_0px_0px_1px_var(--color-bg-white-0),0px_0px_0px_1.5px_rgba(153,160,174,0.1)]',
    ],
    action: [
      'flex items-center justify-center overflow-visible rounded-xl bg-bg-white-0 p-2',
      'shadow-[0px_2px_5px_-1px_rgba(0,0,0,0.04),0px_12px_40px_-8px_rgba(0,0,0,0.08),0px_0px_0px_1px_var(--color-bg-white-0),0px_0px_0px_1.5px_rgba(153,160,174,0.1)]',
      'transition-colors hover:bg-bg-weak-50 cursor-pointer',
    ],
    label: 'text-label-xs font-medium text-text-strong-950',
    value: 'flex items-center gap-1 text-label-xs text-text-sub-600',
  },
});

type InfoCardRootProps = React.HTMLAttributes<HTMLDivElement>;

const InfoCardRoot = React.forwardRef<HTMLDivElement, InfoCardRootProps>(
  ({ className, ...rest }, forwardedRef) => {
    const { root } = infoCardVariants();

    return (
      <div
        ref={forwardedRef}
        className={root({ class: className })}
        {...rest}
      />
    );
  }
);
InfoCardRoot.displayName = 'InfoCardRoot';

type InfoCardItemProps = React.HTMLAttributes<HTMLDivElement>;

const InfoCardItem = React.forwardRef<HTMLDivElement, InfoCardItemProps>(
  ({ className, ...rest }, forwardedRef) => {
    const { item } = infoCardVariants();

    return (
      <div
        ref={forwardedRef}
        className={item({ class: className })}
        {...rest}
      />
    );
  }
);
InfoCardItem.displayName = 'InfoCardItem';

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
InfoCardLabel.displayName = 'InfoCardLabel';

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
InfoCardValue.displayName = 'InfoCardValue';

type InfoCardActionProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href?: string;
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
InfoCardAction.displayName = 'InfoCardAction';

export {
  InfoCardRoot as Root,
  InfoCardItem as Item,
  InfoCardLabel as Label,
  InfoCardValue as Value,
  InfoCardAction as Action,
};
