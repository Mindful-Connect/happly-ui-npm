'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { RiCloseLine } from '@remixicon/react';
import { motion } from 'framer-motion';

import { tv, type VariantProps } from '@/lib/tv';
import { cn } from '@/lib/happly-ui-utils';
import { getMemojiUrl, PERSONS, POSTURES } from '@/lib/memoji';
import type {
  MemojiConfig,
  Gender,
  Person,
  SkinTone,
  Posture,
} from '@/lib/memoji';

// Animation spring configs
const entrySpring = { stiffness: 180, damping: 22, mass: 0.6 };

// 7 hardcoded floating satellite memojis
const FLOATING_MEMOJIS = [
  {
    memoji: {
      gender: 'female' as const,
      person: 'ezra' as const,
      skinTone: 'black' as const,
      posture: 'victory-22' as const,
    },
    gradient: 'linear-gradient(135deg, #FFD6D6 0%, #FFBCBC 100%)',
    top: '9%',
    left: '5%',
    size: 49,
  },
  {
    memoji: {
      gender: 'male' as const,
      person: 'chris' as const,
      skinTone: 'white' as const,
      posture: 'fisting-24' as const,
    },
    gradient: 'linear-gradient(135deg, #E8DFF5 0%, #D5C8EE 100%)',
    top: '24%',
    left: '21%',
    size: 40,
  },
  {
    memoji: {
      gender: 'male' as const,
      person: 'krishna' as const,
      skinTone: 'white' as const,
      posture: 'happy-1' as const,
    },
    gradient: 'linear-gradient(135deg, #FFD6D6 0%, #FFBCBC 100%)',
    top: '58%',
    left: '5%',
    size: 32,
  },
  {
    memoji: {
      gender: 'male' as const,
      person: 'donald' as const,
      skinTone: 'white' as const,
      posture: 'thinking-28' as const,
    },
    gradient: 'linear-gradient(135deg, #C8F0E6 0%, #A8E6D4 100%)',
    top: '72%',
    left: '22%',
    size: 42,
  },
  {
    memoji: {
      gender: 'male' as const,
      person: 'george' as const,
      skinTone: 'white' as const,
      posture: 'happy-1' as const,
    },
    gradient: 'linear-gradient(135deg, #D6EAFF 0%, #BCD8FF 100%)',
    top: '11%',
    left: '74%',
    size: 31,
  },
  {
    memoji: {
      gender: 'male' as const,
      person: 'mattew' as const,
      skinTone: 'white' as const,
      posture: 'like-20' as const,
    },
    gradient: 'linear-gradient(135deg, #FFE4CC 0%, #FFD4B0 100%)',
    top: '29%',
    left: '83%',
    size: 54,
  },
  {
    memoji: {
      gender: 'female' as const,
      person: 'ishanvi' as const,
      skinTone: 'white' as const,
      posture: 'victory-22' as const,
    },
    gradient: 'linear-gradient(135deg, #FFD6E8 0%, #FFBCD5 100%)',
    top: '70%',
    left: '73%',
    size: 41,
  },
] as const;

// Context for animation toggle
interface AnimationContextType {
  disableAnimations: boolean;
}

const AnimationContext = React.createContext<AnimationContextType>({
  disableAnimations: false,
});

const useAnimationContext = () => React.useContext(AnimationContext);

// --- Root ---

const EmojiDialogRoot = DialogPrimitive.Root;

// --- Trigger ---

const EmojiDialogTrigger = DialogPrimitive.Trigger;

// --- Close ---

const EmojiDialogClose = DialogPrimitive.Close;

// --- Portal ---

const EmojiDialogPortal = DialogPrimitive.Portal;

// --- Overlay ---

const EmojiDialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...rest }, forwardedRef) => (
  <DialogPrimitive.Overlay
    ref={forwardedRef}
    className={cn(
      // base
      'bg-overlay fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto p-4 backdrop-blur-[10px]',
      // animation
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...rest}
  />
));
EmojiDialogOverlay.displayName = 'EmojiDialogOverlay';

// --- Content ---

type EmojiDialogContentProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> & {
  showClose?: boolean;
  showBackground?: boolean;
  disableAnimations?: boolean;
};

const EmojiDialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  EmojiDialogContentProps
>(
  (
    {
      className,
      children,
      showClose = true,
      showBackground = true,
      disableAnimations = false,
      ...rest
    },
    forwardedRef
  ) => (
    <AnimationContext.Provider value={{ disableAnimations }}>
      <EmojiDialogPortal>
        <EmojiDialogOverlay>
          <DialogPrimitive.Content
            ref={forwardedRef}
            className={cn(
              // base
              'relative flex w-[calc(100%-2rem)] max-w-[526px] flex-col gap-8 sm:w-full',
              'rounded-20 border-stroke-soft-200 bg-bg-white-0 shadow-regular-md overflow-hidden border p-10',
              // animation
              'data-[state=open]:animate-in data-[state=closed]:animate-out',
              'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
              'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
              className
            )}
            {...rest}
          >
            {showBackground && <EmojiDialogBackground />}
            {children}
            {showClose && (
              <DialogPrimitive.Close
                className={cn(
                  'absolute top-[34px] right-[34px] z-10',
                  'flex h-8 w-8 items-center justify-center rounded-full',
                  'bg-bg-weak-50 text-text-sub-600',
                  'hover:text-text-strong-950 transition-colors hover:bg-neutral-100',
                  'focus:ring-stroke-soft-200 focus:ring-2 focus:ring-offset-2 focus:outline-none',
                  'disabled:pointer-events-none'
                )}
              >
                <div className='border-stroke-soft-200 bg-bg-white-0 flex h-6 w-6 items-center justify-center rounded-full border'>
                  <RiCloseLine className='h-4 w-4' />
                </div>
                <span className='sr-only'>Close</span>
              </DialogPrimitive.Close>
            )}
          </DialogPrimitive.Content>
        </EmojiDialogOverlay>
      </EmojiDialogPortal>
    </AnimationContext.Provider>
  )
);
EmojiDialogContent.displayName = 'EmojiDialogContent';

// --- Header ---

function EmojiDialogHeader({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  const { disableAnimations } = useAnimationContext();

  if (disableAnimations) {
    return (
      <div
        className={cn(
          'relative z-10 flex flex-col items-center gap-2 text-center',
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        delay: 0.25,
        duration: 0.5,
        type: 'spring',
        ...entrySpring,
      }}
      className={cn(
        'relative z-10 flex flex-col items-center gap-2 text-center',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
EmojiDialogHeader.displayName = 'EmojiDialogHeader';

// --- Footer ---

function EmojiDialogFooter({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  const { disableAnimations } = useAnimationContext();

  if (disableAnimations) {
    return (
      <div
        className={cn(
          'relative z-10 flex w-full flex-col-reverse gap-4 *:flex-1 sm:flex-row',
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        delay: 0.35,
        duration: 0.5,
        type: 'spring',
        ...entrySpring,
      }}
      className={cn(
        'relative z-10 flex w-full flex-col-reverse gap-4 *:flex-1 sm:flex-row',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
EmojiDialogFooter.displayName = 'EmojiDialogFooter';

// --- Title ---

const EmojiDialogTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...rest }, forwardedRef) => (
  <DialogPrimitive.Title
    ref={forwardedRef}
    className={cn('text-title-h6 text-text-strong-950 text-center', className)}
    {...rest}
  />
));
EmojiDialogTitle.displayName = 'EmojiDialogTitle';

// --- Description ---

type EmojiDialogDescriptionProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Description
> & {
  lines?: string[];
};

const EmojiDialogDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  EmojiDialogDescriptionProps
>(({ className, children, lines, ...rest }, forwardedRef) => (
  <DialogPrimitive.Description
    ref={forwardedRef}
    className={cn('text-label-sm text-text-sub-600 text-center', className)}
    {...rest}
  >
    {lines
      ? lines.map((text, index) => (
          <React.Fragment key={index}>
            {index > 0 && <br />}
            {text}
          </React.Fragment>
        ))
      : children}
  </DialogPrimitive.Description>
));
EmojiDialogDescription.displayName = 'EmojiDialogDescription';

// --- Background ---

interface EmojiDialogBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  opacity?: number;
}

const EmojiDialogBackground = React.forwardRef<
  HTMLDivElement,
  EmojiDialogBackgroundProps
>(({ className, opacity = 0.15, style, ...rest }, forwardedRef) => (
  <div
    ref={forwardedRef}
    className={cn(
      'pointer-events-none absolute inset-0 z-0 overflow-hidden',
      className
    )}
    style={{
      backgroundImage: [
        `linear-gradient(to top, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%)`,
        `repeating-linear-gradient(90deg, rgba(0,0,0,${opacity}) 0px, rgba(0,0,0,${opacity * 0.15}) 1px, transparent 1px, transparent 60px)`,
        `repeating-linear-gradient(0deg, rgba(0,0,0,${opacity}) 0px, rgba(0,0,0,${opacity * 0.15}) 1px, transparent 1px, transparent 60px)`,
      ].join(','),
      backgroundSize: 'auto, 60px 60px, 60px 60px',
      backgroundRepeat: 'no-repeat, repeat, repeat',
      backgroundPosition: 'bottom, 0 0, 0 0',
      ...style,
    }}
    {...rest}
  />
));
EmojiDialogBackground.displayName = 'EmojiDialogBackground';

// --- Glassmorphism Circle SVG ---

function GlassmorphismCircle({
  disableAnimations,
}: {
  disableAnimations: boolean;
}) {
  const circleContent = (
    <svg
      width='182'
      height='182'
      viewBox='0 0 182 182'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
    >
      <defs>
        <filter
          id='stroke-inner-shadow'
          x='-50%'
          y='-50%'
          width='200%'
          height='200%'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='BackgroundImageFix'
            result='shape'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dx='2' />
          <feGaussianBlur stdDeviation='1.75' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.7 0'
          />
          <feBlend mode='normal' in2='shape' result='effect1_innerShadow' />
        </filter>
        <filter
          id='circle-blur'
          x='0'
          y='0'
          width='181.273'
          height='181.273'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='BackgroundImageFix'
            result='shape'
          />
          <feGaussianBlur stdDeviation='22' result='effect1_foregroundBlur' />
        </filter>
      </defs>

      <g filter='url(#stroke-inner-shadow)'>
        <path
          d='M31.9338 85.8339C31.9338 85.8339 24.5633 99.4199 34.5498 111.214'
          stroke='#F3F3F3'
          strokeWidth='6'
          strokeMiterlimit='10'
          strokeLinecap='round'
        />
      </g>
      <g filter='url(#stroke-inner-shadow)'>
        <path
          d='M53.8471 46.5431C53.8471 46.5431 39.028 50.9386 37.7512 66.3414'
          stroke='#F3F3F3'
          strokeWidth='6'
          strokeMiterlimit='10'
          strokeLinecap='round'
        />
      </g>
      <g filter='url(#stroke-inner-shadow)'>
        <path
          d='M97.1195 34.2558C97.1195 34.2558 83.5335 26.8853 71.7394 36.8719'
          stroke='#F3F3F3'
          strokeWidth='6'
          strokeMiterlimit='10'
          strokeLinecap='round'
        />
      </g>
      <g filter='url(#stroke-inner-shadow)'>
        <path
          d='M136.409 56.1676C136.409 56.1676 132.013 41.3485 116.61 40.0717'
          stroke='#F3F3F3'
          strokeWidth='6'
          strokeMiterlimit='10'
          strokeLinecap='round'
        />
      </g>
      <g filter='url(#stroke-inner-shadow)'>
        <path
          d='M148.695 99.4417C148.695 99.4417 156.065 85.8557 146.079 74.0616'
          stroke='#F3F3F3'
          strokeWidth='6'
          strokeMiterlimit='10'
          strokeLinecap='round'
        />
      </g>
      <g filter='url(#stroke-inner-shadow)'>
        <path
          d='M126.789 138.729C126.789 138.729 141.608 134.334 142.885 118.931'
          stroke='#F3F3F3'
          strokeWidth='6'
          strokeMiterlimit='10'
          strokeLinecap='round'
        />
      </g>
      <g filter='url(#stroke-inner-shadow)'>
        <path
          d='M83.5135 151.017C83.5135 151.017 97.0996 158.387 108.894 148.401'
          stroke='#F3F3F3'
          strokeWidth='6'
          strokeMiterlimit='10'
          strokeLinecap='round'
        />
      </g>
      <g filter='url(#stroke-inner-shadow)'>
        <path
          d='M44.2217 129.108C44.2217 129.108 48.6171 143.927 64.02 145.204'
          stroke='#F3F3F3'
          strokeWidth='6'
          strokeMiterlimit='10'
          strokeLinecap='round'
        />
      </g>

      <g filter='url(#circle-blur)'>
        <circle
          cx='90.6364'
          cy='90.6364'
          r='46.6364'
          fill='#F1F1F1'
          fillOpacity='0.8'
        />
      </g>
      <g filter='url(#circle-blur)'>
        <circle
          cx='91.1281'
          cy='90.6364'
          r='46.6364'
          fill='#F1F1F1'
          fillOpacity='0.8'
        />
      </g>

      <circle
        cx='90.6364'
        cy='90.6364'
        r='46.6364'
        fill='#5B5B59'
        fillOpacity='0.06'
      />
      <circle
        cx='91.1281'
        cy='90.6364'
        r='46.6364'
        fill='#5B5B59'
        fillOpacity='0.06'
      />
    </svg>
  );

  if (disableAnimations) {
    return circleContent;
  }

  return (
    <motion.div
      initial={{ scale: 0.5, rotate: -25, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{
        delay: 0,
        duration: 0.6,
        type: 'spring',
        ...entrySpring,
      }}
      className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
    >
      <motion.div
        animate={{ rotate: [0, 3, 0, -3, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {circleContent}
      </motion.div>
    </motion.div>
  );
}

// --- Animated Memoji Wrapper ---

function AnimatedMemoji({
  children,
  disableAnimations,
}: {
  children: React.ReactNode;
  disableAnimations: boolean;
}) {
  if (disableAnimations) {
    return (
      <div className='relative z-10 flex h-28 w-28 items-center justify-center'>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: 30, opacity: 0, scale: 0.7 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{
        delay: 0.12,
        duration: 0.6,
        type: 'spring',
        ...entrySpring,
      }}
      className='relative z-10 flex h-28 w-28 items-center justify-center'
    >
      <motion.div
        animate={{
          y: [0, -8, 0, -4, 0],
          x: [0, 2, 0, -2, 0],
          rotate: [0, 1, 0, -1, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
        className='h-full w-full'
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// --- Floating Memoji ---

function FloatingMemoji({
  entry,
}: {
  entry: (typeof FLOATING_MEMOJIS)[number];
}) {
  return (
    <div
      style={{
        position: 'absolute',
        top: entry.top,
        left: entry.left,
        width: entry.size,
        height: entry.size,
      }}
    >
      <div
        className='relative h-full w-full overflow-hidden rounded-full'
        style={{ background: entry.gradient }}
      >
        <img
          src={getMemojiUrl(entry.memoji)}
          alt={entry.memoji.person}
          className='absolute inset-0 h-full w-full object-cover'
        />
      </div>
    </div>
  );
}

// --- Emoji Area ---

interface EmojiDialogEmojiAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  customContent?: boolean;
  memoji?: MemojiConfig;
  floatingMemojis?: boolean;
}

const EmojiDialogEmojiArea = React.forwardRef<
  HTMLDivElement,
  EmojiDialogEmojiAreaProps
>(
  (
    {
      className,
      children,
      customContent = false,
      memoji,
      floatingMemojis = false,
      ...rest
    },
    forwardedRef
  ) => {
    const { disableAnimations } = useAnimationContext();

    const childArray = React.Children.toArray(children);
    const bubbleChildren = childArray.filter(
      (child) => React.isValidElement(child) && child.type === EmojiDialogBubble
    );
    const avatarChildren = childArray.filter(
      (child) =>
        !React.isValidElement(child) || child.type !== EmojiDialogBubble
    );

    if (customContent) {
      return (
        <div
          ref={forwardedRef}
          className={cn(
            'relative z-10 flex h-[198px] w-full items-end justify-center',
            className
          )}
          {...rest}
        >
          {children}
        </div>
      );
    }

    const avatarContent = memoji ? (
      <img
        src={getMemojiUrl(memoji)}
        alt={memoji.person}
        className='h-full w-full object-contain'
      />
    ) : (
      avatarChildren
    );

    const floatingMemojisContent = floatingMemojis ? (
      <div className='pointer-events-none absolute top-0 -right-10 bottom-0 -left-10 z-[5] overflow-visible'>
        {FLOATING_MEMOJIS.map((entry, index) => (
          <FloatingMemoji key={index} entry={entry} />
        ))}
        <div
          className='absolute top-0 left-0 h-full w-[157px]'
          style={{
            background:
              'linear-gradient(to right, white 0%, rgba(255,255,255,0) 100%)',
          }}
        />
        <div
          className='absolute top-0 right-0 h-full w-[157px]'
          style={{
            background:
              'linear-gradient(to left, white 0%, rgba(255,255,255,0) 100%)',
          }}
        />
      </div>
    ) : null;

    const containerContent = (
      <>
        <GlassmorphismCircle disableAnimations={disableAnimations} />
        <AnimatedMemoji disableAnimations={disableAnimations}>
          {avatarContent}
        </AnimatedMemoji>
      </>
    );

    return (
      <div
        ref={forwardedRef}
        className={cn(
          'relative z-10 flex h-[198px] w-full items-end justify-center',
          className
        )}
        {...rest}
      >
        {floatingMemojisContent}
        <div className='relative flex h-[128px] w-[182px] items-center justify-center'>
          {containerContent}
        </div>
        {bubbleChildren}
      </div>
    );
  }
);
EmojiDialogEmojiArea.displayName = 'EmojiDialogEmojiArea';

// --- Bubble ---

const bubbleVariants = tv({
  base: '',
  variants: {
    variant: {
      secondary: 'bg-bg-strong-950',
      warning: 'bg-warning-base',
      danger: 'bg-error-base',
    },
  },
  defaultVariants: {
    variant: 'secondary',
  },
});

type BubbleVariant = 'secondary' | 'warning' | 'danger';

interface EmojiDialogBubbleProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof bubbleVariants> {
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const EmojiDialogBubble = React.forwardRef<
  HTMLDivElement,
  EmojiDialogBubbleProps
>(({ className, children, icon, variant = 'secondary' }, forwardedRef) => {
  const { disableAnimations } = useAnimationContext();

  const bubbleContent = (
    <>
      <div
        className={cn(
          'text-label-xs text-static-white flex items-center gap-2 rounded-full py-1 pr-3 pl-1 whitespace-nowrap',
          'shadow-[0_4px_15px_rgba(0,0,0,0.1)]',
          bubbleVariants({ variant })
        )}
      >
        {icon && (
          <div className='bg-bg-white-0 text-text-strong-950 flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-[0_15px_50px_0_rgba(0,0,0,0.15)] *:w-5'>
            {icon}
          </div>
        )}
        {children}
      </div>
      <div className='absolute -bottom-[3px] left-[55px]'>
        <div
          className={cn(
            'h-2.5 w-2.5 rounded-[2px]',
            bubbleVariants({ variant })
          )}
          style={{
            transform: 'matrix(0.82, -0.57, 0.32, 0.95, 0, 0) rotate(-18deg)',
          }}
        />
      </div>
    </>
  );

  if (disableAnimations) {
    return (
      <div
        ref={forwardedRef}
        className={cn(
          'absolute top-[17px] left-[38%] origin-bottom-left rotate-[18.286deg]',
          className
        )}
      >
        {bubbleContent}
      </div>
    );
  }

  return (
    <motion.div
      ref={forwardedRef}
      initial={{ scale: 0.3, opacity: 0, rotate: 18.286, y: 10 }}
      animate={{ scale: 1, opacity: 1, rotate: 18.286, y: 0 }}
      transition={{
        delay: 0.35,
        duration: 0.5,
        type: 'spring',
        stiffness: 350,
        damping: 18,
      }}
      className={cn(
        'absolute top-[17px] left-[38%] origin-bottom-left',
        className
      )}
    >
      <motion.div
        animate={{
          y: [0, -3, 0],
          rotate: [0, 1, 0, -1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {bubbleContent}
      </motion.div>
    </motion.div>
  );
});
EmojiDialogBubble.displayName = 'EmojiDialogBubble';

// --- Exports ---

export {
  EmojiDialogRoot as Root,
  EmojiDialogTrigger as Trigger,
  EmojiDialogClose as Close,
  EmojiDialogPortal as Portal,
  EmojiDialogOverlay as Overlay,
  EmojiDialogContent as Content,
  EmojiDialogHeader as Header,
  EmojiDialogFooter as Footer,
  EmojiDialogTitle as Title,
  EmojiDialogDescription as Description,
  EmojiDialogBackground as Background,
  EmojiDialogEmojiArea as EmojiArea,
  EmojiDialogBubble as Bubble,
  FLOATING_MEMOJIS,
  PERSONS,
  POSTURES,
};

export type {
  BubbleVariant,
  EmojiDialogBubbleProps,
  MemojiConfig,
  Gender,
  Person,
  SkinTone,
  Posture,
};
