'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import {
  IconEmptyCompany,
  IconEmptyUser,
} from '@/components/ui/avatar-empty-icons';
import { cn } from '@/lib/happly-ui-utils';
import { recursiveCloneChildren } from '@/lib/recursive-clone-children';
import { tv, type VariantProps } from '@/lib/tv';

export const AVATAR_ROOT_NAME = 'AvatarRoot';
const AVATAR_IMAGE_NAME = 'AvatarImage';
const AVATAR_INDICATOR_NAME = 'AvatarIndicator';

export const avatarVariants = tv({
  slots: {
    root: [
      'relative flex shrink-0 items-center justify-center rounded-full',
      'text-center uppercase',
      'ring-1 ring-stroke-soft-200',
    ],
    image: 'w-full h-full overflow-hidden rounded-[inherit] object-cover',
    indicator: 'absolute flex w-8 h-8 items-center justify-center',
  },
  variants: {
    size: {
      '80': {
        root: 'w-20 h-20 text-title-h5',
      },
      '72': {
        root: 'size-[72px] text-title-h5',
      },
      '64': {
        root: 'w-16 h-16 text-title-h5',
      },
      '56': {
        root: 'w-14 h-14 text-label-lg',
      },
      '48': {
        root: 'w-12 h-12 text-label-lg',
      },
      '40': {
        root: 'w-10 h-10 text-label-md',
      },
      '32': {
        root: 'w-8 h-8 text-label-sm',
      },
      '24': {
        root: 'w-6 h-6 text-label-xs',
      },
      '20': {
        root: 'w-5 h-5 text-label-xs',
      },
    },
    color: {
      white: {
        root: 'bg-bg-white-0 text-static-black',
      },
      gray: {
        root: 'bg-bg-soft-200 text-static-black',
      },
      yellow: {
        root: 'bg-yellow-200 text-yellow-950',
      },
      blue: {
        root: 'bg-blue-200 text-blue-950',
      },
      sky: {
        root: 'bg-sky-200 text-sky-950',
      },
      purple: {
        root: 'bg-purple-200 text-purple-950',
      },
      red: {
        root: 'bg-red-200 text-red-950',
      },
      primary: {
        root: 'bg-primary-200 text-primary-950',
      },
    },
  },
  compoundVariants: [
    {
      size: ['80', '72'],
      class: {
        indicator: '-right-2',
      },
    },
    {
      size: '64',
      class: {
        indicator: '-right-2 scale-[.875]',
      },
    },
    {
      size: '56',
      class: {
        indicator: '-right-1.5 scale-75',
      },
    },
    {
      size: '48',
      class: {
        indicator: '-right-1.5 scale-[.625]',
      },
    },
    {
      size: '40',
      class: {
        indicator: '-right-1.5 scale-[.5625]',
      },
    },
    {
      size: '32',
      class: {
        indicator: '-right-1.5 scale-50',
      },
    },
    {
      size: '24',
      class: {
        indicator: '-right-1 scale-[.375]',
      },
    },
    {
      size: '20',
      class: {
        indicator: '-right-1 scale-[.3125]',
      },
    },
  ],
  defaultVariants: {
    size: '80',
    color: 'gray',
  },
});

type AvatarSharedProps = VariantProps<typeof avatarVariants>;

export type AvatarRootProps = VariantProps<typeof avatarVariants> &
  React.HTMLAttributes<HTMLDivElement> & {
    asChild?: boolean;
    placeholderType?: 'user' | 'company';
    placeholder?: React.ReactNode;
  };

// What an Image falls back to when its photo is missing or fails to load.
const AvatarPlaceholderContext = React.createContext<
  Pick<AvatarRootProps, 'placeholder' | 'placeholderType'>
>({});

const AvatarRoot = React.forwardRef<HTMLDivElement, AvatarRootProps>(
  (
    {
      asChild,
      children,
      size,
      color,
      className,
      placeholderType = 'user',
      placeholder,
      ...rest
    },
    forwardedRef
  ) => {
    const uniqueId = React.useId();
    const Component = asChild ? Slot : 'div';
    const { root } = avatarVariants({ size, color });

    const sharedProps: AvatarSharedProps = {
      size,
      color,
    };

    // use placeholder when no children provided
    if (!children) {
      if (placeholder) {
        return (
          <div
            ref={forwardedRef}
            className={root({ class: className })}
            {...rest}
          >
            {placeholder}
          </div>
        );
      }

      return (
        <div
          ref={forwardedRef}
          className={root({ class: className })}
          {...rest}
        >
          <AvatarImage asChild>
            {placeholderType === 'company' ? (
              <IconEmptyCompany />
            ) : (
              <IconEmptyUser />
            )}
          </AvatarImage>
        </div>
      );
    }

    const extendedChildren = recursiveCloneChildren(
      children as React.ReactElement[],
      sharedProps,
      [AVATAR_IMAGE_NAME, AVATAR_INDICATOR_NAME],
      uniqueId,
      asChild
    );

    return (
      // Outside the Component: with `asChild` its one child takes the merged
      // props, and a Provider would discard them.
      <AvatarPlaceholderContext.Provider
        value={{ placeholder, placeholderType }}
      >
        <Component
          ref={forwardedRef}
          className={root({ class: className })}
          {...rest}
        >
          {extendedChildren}
        </Component>
      </AvatarPlaceholderContext.Provider>
    );
  }
);
AvatarRoot.displayName = AVATAR_ROOT_NAME;

type AvatarImageProps = AvatarSharedProps &
  Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'color'> & {
    asChild?: boolean;
  };

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  (
    { asChild, className, size, color, alt, src, onError, ...rest },
    forwardedRef
  ) => {
    const Component = asChild ? Slot : 'img';
    const { image } = avatarVariants({ size, color });
    const { placeholder, placeholderType } = React.useContext(
      AvatarPlaceholderContext
    );
    const innerRef = React.useRef<HTMLImageElement | null>(null);
    const setImageRef = React.useCallback(
      (node: HTMLImageElement | null) => {
        innerRef.current = node;
        if (typeof forwardedRef === 'function') forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [forwardedRef]
    );
    // The src that failed rather than a flag, so a new src gets a fresh try.
    const [failedSrc, setFailedSrc] = React.useState<AvatarImageProps['src']>();

    // A server-rendered photo can fail before React attaches onError. A
    // finished image with no pixels is the sign, but an SVG without intrinsic
    // size reports the same, so the src is loaded again to tell them apart.
    React.useEffect(() => {
      const img = innerRef.current;
      if (!(img instanceof HTMLImageElement) || typeof src !== 'string') return;
      if (!img.complete || img.naturalWidth > 0) return;
      const probe = new window.Image();
      // The same request the img made, so it sends no referrer or cookies
      // the img was told not to.
      probe.referrerPolicy = img.referrerPolicy;
      probe.crossOrigin = img.crossOrigin;
      probe.onerror = () => setFailedSrc(src);
      probe.src = src;
      return () => {
        probe.onerror = null;
      };
    }, [src]);

    if (!asChild && (!src || failedSrc === src)) {
      if (placeholder) return <>{placeholder}</>;
      return (
        <AvatarImage asChild>
          {placeholderType === 'company' ? (
            <IconEmptyCompany />
          ) : (
            <IconEmptyUser />
          )}
        </AvatarImage>
      );
    }

    return (
      <Component
        // `asChild` hands its ref to the child, which may be a function
        // component, so it only gets one the caller asked for.
        ref={asChild ? forwardedRef : setImageRef}
        src={src}
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          setFailedSrc(src);
          onError?.(e);
        }}
        // an avatar normally sits beside the person's name, so it is
        // decorative unless the consumer says otherwise — never unnamed
        alt={asChild ? alt : (alt ?? '')}
        className={image({
          class: cn(
            // real photos get the neutral 1px image outline; `asChild` renders
            // placeholder artwork, which already sits inside the root's ring
            !asChild &&
              'outline-image-outline outline outline-1 -outline-offset-1',
            className
          ),
        })}
        {...rest}
      />
    );
  }
);
AvatarImage.displayName = AVATAR_IMAGE_NAME;

function AvatarIndicator({
  size,
  color,
  className,
  position = 'bottom',
  ...rest
}: AvatarSharedProps &
  React.HTMLAttributes<HTMLDivElement> & {
    position?: 'top' | 'bottom';
  }) {
  const { indicator } = avatarVariants({ size, color });

  return (
    <div
      className={cn(indicator({ class: className }), {
        'top-0 origin-top-right': position === 'top',
        'bottom-0 origin-bottom-right': position === 'bottom',
      })}
      {...rest}
    />
  );
}
AvatarIndicator.displayName = AVATAR_INDICATOR_NAME;

export {
  AvatarRoot as Root,
  AvatarImage as Image,
  AvatarIndicator as Indicator,
};
