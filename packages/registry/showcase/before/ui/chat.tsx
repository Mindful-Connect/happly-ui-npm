'use client';

import * as React from 'react';
import { RiArrowUpLine, RiAttachment2, RiEmotionLine } from '@remixicon/react';

import * as Avatar from './avatar';
import * as Button from './button';
import { cn } from '../lib/happly-ui-utils';
import { tv, type VariantProps } from '../lib/tv';

type ChatSide = 'sent' | 'received';
type ChatTone = 'received' | 'highlight' | 'sent';
type ChatShape = 'bubble' | 'pill';

// -----------------------------------------------------------------------------
// Contexts
// -----------------------------------------------------------------------------

const MessageContext = React.createContext<{ side: ChatSide } | null>(null);
const BubbleContext = React.createContext<{
  tone: ChatTone;
  shape: ChatShape;
} | null>(null);

// -----------------------------------------------------------------------------
// Root — fills its parent; pins the input 20px below the message list.
// -----------------------------------------------------------------------------

const ChatRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...rest }, forwardedRef) => (
  <div
    ref={forwardedRef}
    className={cn('flex h-full w-full flex-col gap-5', className)}
    {...rest}
  >
    {children}
  </div>
));
ChatRoot.displayName = 'ChatRoot';

// -----------------------------------------------------------------------------
// List — scroll container that sticks to the bottom as new messages arrive,
// unless the user has scrolled up to read history.
// -----------------------------------------------------------------------------

type ChatListProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Auto-scroll to the newest message when near the bottom. Default `true`. */
  autoScroll?: boolean;
};

const ChatList = React.forwardRef<HTMLDivElement, ChatListProps>(
  (
    { className, children, autoScroll = true, onScroll, ...rest },
    forwardedRef
  ) => {
    const innerRef = React.useRef<HTMLDivElement | null>(null);
    const stickRef = React.useRef(true);

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        innerRef.current = node;
        if (typeof forwardedRef === 'function') forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [forwardedRef]
    );

    const handleScroll = React.useCallback(
      (event: React.UIEvent<HTMLDivElement>) => {
        const el = innerRef.current;
        if (el) {
          const distanceFromBottom =
            el.scrollHeight - el.scrollTop - el.clientHeight;
          stickRef.current = distanceFromBottom <= 24;
        }
        onScroll?.(event);
      },
      [onScroll]
    );

    React.useLayoutEffect(() => {
      const el = innerRef.current;
      if (el && autoScroll && stickRef.current) {
        el.scrollTop = el.scrollHeight;
      }
    });

    return (
      <div
        ref={setRefs}
        onScroll={handleScroll}
        role='log'
        aria-live='polite'
        aria-relevant='additions'
        className={cn(
          'flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto',
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
ChatList.displayName = 'ChatList';

// -----------------------------------------------------------------------------
// Message — one row. Reserves a 44px gutter (32px avatar + 12px gap) on both
// sides so avatar-less rows stay aligned with rows that have an avatar.
// -----------------------------------------------------------------------------

type ChatMessageProps = React.HTMLAttributes<HTMLDivElement> & {
  side: ChatSide;
  avatar?: React.ReactNode;
};

const ChatMessage = React.forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ side, avatar, className, children, ...rest }, forwardedRef) => {
    const isSent = side === 'sent';
    const ctx = React.useMemo(() => ({ side }), [side]);

    return (
      <MessageContext.Provider value={ctx}>
        <div
          ref={forwardedRef}
          className={cn(
            'flex w-full items-end gap-3',
            isSent ? 'justify-end' : 'justify-start',
            // far-side gutter (always 44px)
            isSent ? 'pl-11' : 'pr-11',
            // near-side gutter when there's no avatar to fill it
            !avatar && (isSent ? 'pr-11' : 'pl-11'),
            className
          )}
          {...rest}
        >
          {!isSent && avatar}
          {children}
          {isSent && avatar}
        </div>
      </MessageContext.Provider>
    );
  }
);
ChatMessage.displayName = 'ChatMessage';

// -----------------------------------------------------------------------------
// Avatar — thin wrapper around the registry Avatar, sized for chat rows (32px).
// Pass `src` for the common case, or compose Avatar parts as children.
// -----------------------------------------------------------------------------

type ChatAvatarProps = React.ComponentPropsWithoutRef<typeof Avatar.Root> & {
  src?: string;
  alt?: string;
  imageProps?: Omit<
    React.ComponentPropsWithoutRef<typeof Avatar.Image>,
    'src' | 'alt'
  >;
};

const ChatAvatar = React.forwardRef<HTMLDivElement, ChatAvatarProps>(
  ({ src, alt, size = '32', imageProps, children, ...rest }, forwardedRef) => (
    <Avatar.Root ref={forwardedRef} size={size} {...rest}>
      {src ? <Avatar.Image src={src} alt={alt} {...imageProps} /> : children}
    </Avatar.Root>
  )
);
ChatAvatar.displayName = 'ChatAvatar';

// -----------------------------------------------------------------------------
// Bubble
// -----------------------------------------------------------------------------

export const chatBubbleVariants = tv({
  slots: {
    root: 'text-paragraph-sm break-words',
    timestamp: 'text-paragraph-xs shrink-0',
  },
  variants: {
    shape: {
      bubble: { root: 'flex min-w-0 flex-1 flex-col gap-3 rounded-2xl p-4' },
      pill: {
        root: 'flex shrink-0 items-center gap-3 rounded-full px-4 py-2.5',
      },
    },
    tone: {
      received: {
        root: 'bg-bg-weak-50 text-text-sub-600',
        timestamp: 'text-text-soft-400',
      },
      highlight: {
        root: 'bg-neutral-100 text-text-sub-600',
        timestamp: 'text-text-soft-400',
      },
      sent: {
        root: 'bg-primary-base text-static-white shadow-regular-xs',
        timestamp: 'text-primary-200',
      },
    },
  },
  compoundVariants: [
    // In a stacked bubble, the timestamp sits flush-right under the text.
    { shape: 'bubble', class: { timestamp: 'self-end' } },
  ],
  defaultVariants: {
    shape: 'bubble',
    tone: 'received',
  },
});

type ChatBubbleProps = React.HTMLAttributes<HTMLDivElement> & {
  shape?: ChatShape;
  /** Defaults to the parent Message's side (`sent` → sent, otherwise received). */
  tone?: ChatTone;
};

const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ shape = 'bubble', tone, className, children, ...rest }, forwardedRef) => {
    const message = React.useContext(MessageContext);
    const resolvedTone: ChatTone =
      tone ?? (message?.side === 'sent' ? 'sent' : 'received');
    const { root } = chatBubbleVariants({ shape, tone: resolvedTone });
    const ctx = React.useMemo(
      () => ({ tone: resolvedTone, shape }),
      [resolvedTone, shape]
    );

    return (
      <BubbleContext.Provider value={ctx}>
        <div
          ref={forwardedRef}
          className={root({ class: className })}
          {...rest}
        >
          {children}
        </div>
      </BubbleContext.Provider>
    );
  }
);
ChatBubble.displayName = 'ChatBubble';

// -----------------------------------------------------------------------------
// Timestamp — adapts its color/position to the surrounding bubble.
// -----------------------------------------------------------------------------

const ChatTimestamp = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...rest }, forwardedRef) => {
  const bubble = React.useContext(BubbleContext);
  const { timestamp } = chatBubbleVariants({
    tone: bubble?.tone ?? 'received',
    shape: bubble?.shape ?? 'bubble',
  });

  return (
    <span
      ref={forwardedRef}
      className={timestamp({ class: className })}
      {...rest}
    >
      {children}
    </span>
  );
});
ChatTimestamp.displayName = 'ChatTimestamp';

// -----------------------------------------------------------------------------
// Divider — date separator or highlighted "NEW MESSAGE" rule.
// -----------------------------------------------------------------------------

export const chatDividerVariants = tv({
  slots: {
    root: 'flex w-full items-center justify-center gap-2.5',
    line: 'h-px min-w-0 flex-1 bg-stroke-soft-200',
    label: 'text-subheading-2xs shrink-0 whitespace-nowrap uppercase',
  },
  variants: {
    variant: {
      default: { label: 'text-text-soft-400' },
      feature: { label: 'text-primary-base' },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type ChatDividerProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof chatDividerVariants>;

const ChatDivider = React.forwardRef<HTMLDivElement, ChatDividerProps>(
  ({ variant, className, children, ...rest }, forwardedRef) => {
    const { root, line, label } = chatDividerVariants({ variant });

    return (
      <div ref={forwardedRef} className={root({ class: className })} {...rest}>
        <span className={line()} />
        <span className={label()}>{children}</span>
        <span className={line()} />
      </div>
    );
  }
);
ChatDivider.displayName = 'ChatDivider';

// -----------------------------------------------------------------------------
// Input building blocks
// -----------------------------------------------------------------------------

// A square, icon-only Button used for the attachment / emoji controls.
type ChatIconButtonProps = React.ComponentPropsWithoutRef<
  typeof Button.Root
> & {
  icon: React.ElementType;
};

const ChatIconButton = React.forwardRef<HTMLButtonElement, ChatIconButtonProps>(
  (
    {
      icon,
      className,
      type = 'button',
      variant = 'neutral',
      mode = 'ghost',
      ...rest
    },
    forwardedRef
  ) => (
    <Button.Root
      ref={forwardedRef}
      type={type}
      variant={variant}
      mode={mode}
      size='medium'
      className={cn('text-text-soft-400 w-10 px-0', className)}
      {...rest}
    >
      <Button.Icon as={icon} className='mx-0 size-6' />
    </Button.Root>
  )
);
ChatIconButton.displayName = 'ChatIconButton';

type ChatSendButtonProps = React.ComponentPropsWithoutRef<typeof Button.Root>;

const ChatSendButton = React.forwardRef<HTMLButtonElement, ChatSendButtonProps>(
  (
    {
      className,
      children,
      type = 'button',
      variant = 'neutral',
      mode = 'lighter',
      ...rest
    },
    forwardedRef
  ) => (
    <Button.Root
      ref={forwardedRef}
      type={type}
      variant={variant}
      mode={mode}
      size='medium'
      className={cn('w-10 px-0', className)}
      {...rest}
    >
      {children ?? <Button.Icon as={RiArrowUpLine} className='mx-0 size-5' />}
    </Button.Root>
  )
);
ChatSendButton.displayName = 'ChatSendButton';

// -----------------------------------------------------------------------------
// Input — batteries-included composer. Uncontrolled by default; pass
// value/onChange to control it. Enter sends, Shift+Enter inserts a newline.
// -----------------------------------------------------------------------------

type ChatInputProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'value' | 'onChange'
> & {
  /** Controlled value. Omit for uncontrolled behavior. */
  value?: string;
  /** Fired on every keystroke (controlled or uncontrolled). */
  onChange?: (value: string) => void;
  /** Fired when the user sends (Enter or send button). Receives trimmed text. */
  onSend?: (value: string) => void;
  onAttach?: () => void;
  onEmoji?: () => void;
  showAttachment?: boolean;
  showEmoji?: boolean;
  /** Replace the left cluster (attachment) entirely. */
  leading?: React.ReactNode;
  /** Replace the right cluster (emoji + send) entirely. */
  actions?: React.ReactNode;
  /** Disable sending even when there is text. */
  sendDisabled?: boolean;
  /** Max auto-grow height in px before the field scrolls. Default `128`. */
  maxHeight?: number;
  containerClassName?: string;
};

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  (
    {
      value: valueProp,
      onChange,
      onSend,
      onAttach,
      onEmoji,
      onKeyDown,
      placeholder = 'Write a message...',
      showAttachment = true,
      showEmoji = true,
      leading,
      actions,
      disabled,
      sendDisabled,
      maxHeight = 128,
      rows = 1,
      className,
      containerClassName,
      ...rest
    },
    forwardedRef
  ) => {
    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = React.useState('');
    const value = isControlled ? (valueProp as string) : internalValue;

    const innerRef = React.useRef<HTMLTextAreaElement | null>(null);
    const setRefs = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        innerRef.current = node;
        if (typeof forwardedRef === 'function') forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [forwardedRef]
    );

    // Auto-grow up to maxHeight, then scroll.
    React.useLayoutEffect(() => {
      const el = innerRef.current;
      if (!el) return;
      el.style.height = 'auto';
      el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
    }, [value, maxHeight]);

    const setValue = (next: string) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    };

    const canSend = value.trim().length > 0 && !disabled && !sendDisabled;

    const send = () => {
      if (!canSend) return;
      onSend?.(value.trim());
      if (!isControlled) setInternalValue('');
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      onKeyDown?.(event);
      if (
        event.key === 'Enter' &&
        !event.shiftKey &&
        !event.nativeEvent.isComposing
      ) {
        event.preventDefault();
        send();
      }
    };

    return (
      <div
        className={cn(
          'bg-bg-white-0 flex w-full items-end gap-2 rounded-2xl p-2',
          'shadow-regular-xs ring-stroke-soft-200 ring-1 ring-inset',
          'has-[textarea:disabled]:bg-bg-weak-50 has-[textarea:disabled]:ring-transparent',
          containerClassName
        )}
      >
        {leading ??
          (showAttachment && (
            <ChatIconButton
              icon={RiAttachment2}
              onClick={onAttach}
              disabled={disabled}
              aria-label='Add attachment'
            />
          ))}

        <textarea
          ref={setRefs}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          style={{ maxHeight }}
          className={cn(
            'text-paragraph-sm text-text-strong-950 flex-1 resize-none self-center',
            'overflow-y-auto border-none bg-transparent px-1 py-2 ring-0 outline-none',
            'placeholder:text-text-soft-400 disabled:text-text-disabled-300',
            className
          )}
          {...rest}
        />

        {actions ?? (
          <div className='flex shrink-0 items-center gap-4'>
            {showEmoji && (
              <ChatIconButton
                icon={RiEmotionLine}
                onClick={onEmoji}
                disabled={disabled}
                aria-label='Add emoji'
              />
            )}
            <ChatSendButton
              onClick={send}
              disabled={!canSend}
              aria-label='Send message'
            />
          </div>
        )}
      </div>
    );
  }
);
ChatInput.displayName = 'ChatInput';

export {
  ChatRoot as Root,
  ChatList as List,
  ChatMessage as Message,
  ChatAvatar as Avatar,
  ChatBubble as Bubble,
  ChatTimestamp as Timestamp,
  ChatDivider as Divider,
  ChatInput as Input,
  ChatSendButton as SendButton,
};
