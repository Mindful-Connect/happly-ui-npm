'use client';

import * as React from 'react';

import {
  RiAddLine,
  RiCloseLine,
  RiPushpinFill,
  RiStarFill,
} from '@remixicon/react';

import { cn } from '@/lib/happly-ui-utils';
import { tv, type VariantProps } from '@/lib/tv';

const STATUS_INDICATOR_ROOT_NAME = 'StatusIndicatorRoot';

export const statusIndicatorVariants = tv({
  base: 'flex items-center justify-center rounded-full drop-shadow-[0_2px_4px_#1b1c1d0a]',
  variants: {
    status: {
      verified: 'size-8 rounded-none',
      pin: 'box-content size-6 border-2 border-bg-white-0 bg-purple-500',
      favorite: 'box-content size-6 border-2 border-bg-white-0 bg-success-base',
      add: 'box-content size-6 border-2 border-bg-white-0 bg-faded-dark',
      remove: 'box-content size-6 border-2 border-bg-white-0 bg-error-base',
      notification: 'box-content size-3 border-2 border-bg-white-0 bg-error-base',
      online: 'box-content size-3 border-4 border-bg-white-0 bg-success-base',
      offline: 'box-content size-3 border-4 border-bg-white-0 bg-faded-base',
      busy: 'box-content size-3 border-4 border-bg-white-0 bg-error-base',
      away: 'box-content size-3 border-4 border-bg-white-0 bg-away-base',
      company: 'box-content size-6 overflow-hidden border-2 border-bg-white-0',
    },
  },
  defaultVariants: {
    status: 'online',
  },
});

type StatusIndicatorRootProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof statusIndicatorVariants>;

const topIcons: Record<string, React.ReactNode> = {
  pin: <RiPushpinFill className='size-3.5 text-text-white-0' />,
  favorite: <RiStarFill className='size-3.5 text-text-white-0' />,
  add: <RiAddLine className='size-3.5 text-text-white-0' />,
  remove: <RiCloseLine className='size-3.5 text-text-white-0' />,
};

function VerifiedBadge() {
  return (
    <svg viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M22.3431 5.51481L20.1212 3.29299C18.9497 2.12141 17.0502 2.12141 15.8786 3.29299L13.6568 5.51481H10.5146C8.85778 5.51481 7.51463 6.85796 7.51463 8.51481V11.6569L5.2928 13.8788C4.12123 15.0503 4.12123 16.9498 5.2928 18.1214L7.51463 20.3432V23.4854C7.51463 25.1422 8.85777 26.4854 10.5146 26.4854H13.6568L15.8786 28.7072C17.0502 29.8788 18.9497 29.8788 20.1212 28.7072L22.3431 26.4854H25.4852C27.142 26.4854 28.4852 25.1422 28.4852 23.4854V20.3432L30.707 18.1214C31.8786 16.9498 31.8786 15.0503 30.707 13.8788L28.4852 11.6569V8.51481C28.4852 6.85796 27.142 5.51481 25.4852 5.51481H22.3431ZM21.2217 7.22192C21.4093 7.40946 21.6636 7.51481 21.9288 7.51481H25.4852C26.0375 7.51481 26.4852 7.96253 26.4852 8.51481V12.0712C26.4852 12.3364 26.5905 12.5907 26.7781 12.7783L29.2928 15.293C29.6833 15.6835 29.6833 16.3167 29.2928 16.7072L26.7781 19.2219C26.5905 19.4095 26.4852 19.6638 26.4852 19.929V23.4854C26.4852 24.0377 26.0375 24.4854 25.4852 24.4854H21.9288C21.6636 24.4854 21.4093 24.5907 21.2217 24.7783L18.707 27.293C18.3165 27.6835 17.6833 27.6835 17.2928 27.293L14.7781 24.7783C14.5905 24.5907 14.3362 24.4854 14.071 24.4854H10.5146C9.96234 24.4854 9.51463 24.0377 9.51463 23.4854V19.929C9.51463 19.6638 9.40927 19.4095 9.22174 19.2219L6.70702 16.7072C6.31649 16.3167 6.31649 15.6835 6.70702 15.293L9.22174 12.7783C9.40927 12.5907 9.51463 12.3364 9.51463 12.0712V8.51481C9.51463 7.96253 9.96234 7.51481 10.5146 7.51481H14.071C14.3362 7.51481 14.5905 7.40946 14.7781 7.22192L17.2928 4.7072C17.6833 4.31668 18.3165 4.31668 18.707 4.7072L21.2217 7.22192Z'
        className='fill-bg-white-0'
      />
      <path
        d='M21.9288 7.51457C21.6636 7.51457 21.4092 7.40921 21.2217 7.22167L18.707 4.70696C18.3164 4.31643 17.6833 4.31643 17.2927 4.70696L14.778 7.22167C14.5905 7.40921 14.3361 7.51457 14.0709 7.51457H10.5146C9.96228 7.51457 9.51457 7.96228 9.51457 8.51457V12.0709C9.51457 12.3361 9.40921 12.5905 9.22167 12.778L6.70696 15.2927C6.31643 15.6833 6.31643 16.3164 6.70696 16.707L9.22167 19.2217C9.40921 19.4092 9.51457 19.6636 9.51457 19.9288V23.4851C9.51457 24.0374 9.96228 24.4851 10.5146 24.4851H14.0709C14.3361 24.4851 14.5905 24.5905 14.778 24.778L17.2927 27.2927C17.6833 27.6833 18.3164 27.6833 18.707 27.2927L21.2217 24.778C21.4092 24.5905 21.6636 24.4851 21.9288 24.4851H25.4851C26.0374 24.4851 26.4851 24.0374 26.4851 23.4851V19.9288C26.4851 19.6636 26.5905 19.4092 26.778 19.2217L29.2927 16.707C29.6833 16.3164 29.6833 15.6833 29.2927 15.2927L26.778 12.778C26.5905 12.5905 26.4851 12.3361 26.4851 12.0709V8.51457C26.4851 7.96228 26.0374 7.51457 25.4851 7.51457H21.9288Z'
        fill='#47C2FF'
      />
      <path
        d='M23.3737 13.3739L16.6666 20.081L13.2928 16.7073L14.707 15.2931L16.6666 17.2526L21.9595 11.9597L23.3737 13.3739Z'
        className='fill-text-white-0'
      />
    </svg>
  );
}

const StatusIndicatorRoot = React.forwardRef<
  HTMLDivElement,
  StatusIndicatorRootProps
>(({ status, className, children, ...rest }, forwardedRef) => {
  const resolvedStatus = status ?? 'online';

  const defaultContent =
    resolvedStatus === 'verified' ? (
      <VerifiedBadge />
    ) : (
      topIcons[resolvedStatus]
    );

  return (
    <div
      ref={forwardedRef}
      className={cn(statusIndicatorVariants({ status }), className)}
      {...rest}
    >
      {children ?? defaultContent}
    </div>
  );
});
StatusIndicatorRoot.displayName = STATUS_INDICATOR_ROOT_NAME;

export { StatusIndicatorRoot as Root };
