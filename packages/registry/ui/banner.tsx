'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import type { PolymorphicComponentProps } from '@/lib/polymorphic';
import { recursiveCloneChildren } from '@/lib/recursive-clone-children';
import { tv, type VariantProps } from '@/lib/tv';

const BANNER_ROOT_NAME = 'BannerRoot';
const BANNER_CONTENT_NAME = 'BannerContent';
const BANNER_ICON_NAME = 'BannerIcon';
const BANNER_CLOSE_BUTTON_NAME = 'BannerCloseButton';

export const bannerVariants = tv({
  slots: {
    // `min-h` (not `h`) so a longer or translated message wraps instead of
    // being clipped. Track list uses underscores: commas produce invalid CSS.
    root: 'relative grid min-h-11 w-full grid-cols-[1fr_auto_1fr] items-center justify-center gap-3 px-3 py-2',
    content: 'col-start-2 flex items-center justify-center gap-3',
    icon: 'w-5 h-5 shrink-0',
    // 20px visual, 24px hit area (WCAG 2.5.8) via a transparent overlay.
    // The resting opacity is AlignUI's treatment; hover and keyboard focus
    // restore it to full so the only control in the banner is legible while
    // it is being used.
    closeButton:
      'relative col-start-3 row-start-1 ml-auto w-5 h-5 after:absolute after:top-1/2 after:left-1/2 after:size-6 after:-translate-x-1/2 after:-translate-y-1/2 transition-opacity duration-150 ease-out hover:opacity-100 focus-visible:opacity-100',
  },
  variants: {
    variant: {
      filled: {},
      light: {},
      lighter: {},
      stroke: {
        root: 'bg-bg-white-0 text-text-strong-950 before:absolute before:bottom-0 before:h-px before:w-full before:bg-stroke-soft-200',
      },
    },
    status: {
      error: {},
      warning: {},
      success: {},
      information: {},
      feature: {},
      primary: {},
    },
  },
  compoundVariants: [
    //#region closeButton
    {
      variant: 'filled',
      class: {
        closeButton: 'opacity-[.72]',
      },
    },
    {
      variant: ['light', 'lighter', 'stroke'],
      class: {
        closeButton: 'opacity-[.48]',
      },
    },
    //#endregion

    //#region status=error
    {
      variant: 'filled',
      status: 'error',
      class: {
        icon: 'text-error-contrast',
        root: 'bg-error-base text-error-contrast',
      },
    },
    {
      variant: 'light',
      status: 'error',
      class: {
        icon: 'text-error-base',
        root: 'bg-error-light text-text-strong-950',
      },
    },
    {
      variant: 'lighter',
      status: 'error',
      class: {
        icon: 'text-error-base',
        root: 'bg-error-lighter text-text-strong-950',
      },
    },
    {
      variant: 'stroke',
      status: 'error',
      class: {
        icon: 'text-error-base',
      },
    },
    //#endregion

    //#region status=warning
    {
      variant: 'filled',
      status: 'warning',
      class: {
        icon: 'text-warning-contrast',
        root: 'bg-warning-base text-warning-contrast',
      },
    },
    {
      variant: 'light',
      status: 'warning',
      class: {
        icon: 'text-warning-base',
        root: 'bg-warning-light text-text-strong-950',
      },
    },
    {
      variant: 'lighter',
      status: 'warning',
      class: {
        icon: 'text-warning-base',
        root: 'bg-warning-lighter text-text-strong-950',
      },
    },
    {
      variant: 'stroke',
      status: 'warning',
      class: {
        icon: 'text-warning-base',
      },
    },
    //#endregion

    //#region status=success
    {
      variant: 'filled',
      status: 'success',
      class: {
        icon: 'text-success-contrast',
        root: 'bg-success-base text-success-contrast',
      },
    },
    {
      variant: 'light',
      status: 'success',
      class: {
        icon: 'text-success-base',
        root: 'bg-success-light text-text-strong-950',
      },
    },
    {
      variant: 'lighter',
      status: 'success',
      class: {
        icon: 'text-success-base',
        root: 'bg-success-lighter text-text-strong-950',
      },
    },
    {
      variant: 'stroke',
      status: 'success',
      class: {
        icon: 'text-success-base',
      },
    },
    //#endregion

    //#region status=information
    {
      variant: 'filled',
      status: 'information',
      class: {
        icon: 'text-information-contrast',
        root: 'bg-information-base text-information-contrast',
      },
    },
    {
      variant: 'light',
      status: 'information',
      class: {
        icon: 'text-information-base',
        root: 'bg-information-light text-text-strong-950',
      },
    },
    {
      variant: 'lighter',
      status: 'information',
      class: {
        icon: 'text-information-base',
        root: 'bg-information-lighter text-text-strong-950',
      },
    },
    {
      variant: 'stroke',
      status: 'information',
      class: {
        icon: 'text-information-base',
      },
    },
    //#endregion

    //#region status=feature
    {
      variant: 'filled',
      status: 'feature',
      class: {
        icon: 'text-faded-contrast',
        root: 'bg-faded-base text-faded-contrast',
      },
    },
    {
      variant: 'light',
      status: 'feature',
      class: {
        icon: 'text-faded-base',
        root: 'bg-faded-light text-text-strong-950',
      },
    },
    {
      variant: 'lighter',
      status: 'feature',
      class: {
        icon: 'text-faded-base',
        root: 'bg-faded-lighter text-text-strong-950',
      },
    },
    {
      variant: 'stroke',
      status: 'feature',
      class: {
        icon: 'text-faded-base',
      },
    },
    //#endregion

    //#region status=primary
    {
      variant: 'filled',
      status: 'primary',
      class: {
        icon: 'text-primary-contrast',
        root: 'bg-primary-base text-primary-contrast',
      },
    },
    {
      variant: 'light',
      status: 'primary',
      class: {
        icon: 'text-primary-base',
        root: 'bg-primary-light text-text-strong-950',
      },
    },
    {
      variant: 'lighter',
      status: 'primary',
      class: {
        icon: 'text-primary-base',
        root: 'bg-primary-lighter text-text-strong-950',
      },
    },
    {
      variant: 'stroke',
      status: 'primary',
      class: {
        icon: 'text-primary-base',
      },
    },
    //#endregion
  ],
  defaultVariants: {
    variant: 'filled',
    status: 'feature',
  },
});

type BannerSharedProps = VariantProps<typeof bannerVariants>;

type BannerProps = VariantProps<typeof bannerVariants> &
  React.HTMLAttributes<HTMLDivElement>;

function BannerRoot({
  children,
  className,
  variant,
  status,
  ...rest
}: BannerProps) {
  const uniqueId = React.useId();
  const { root } = bannerVariants({ variant, status });

  const sharedProps: BannerSharedProps = {
    variant,
    status,
  };

  const extendedChildren = recursiveCloneChildren(
    children as React.ReactElement[],
    sharedProps,
    [BANNER_ICON_NAME, BANNER_CLOSE_BUTTON_NAME],
    uniqueId
  );

  return (
    <div className={root({ class: className })} {...rest}>
      {extendedChildren}
    </div>
  );
}
BannerRoot.displayName = BANNER_ROOT_NAME;

function BannerContent({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  const { content } = bannerVariants();

  return <div className={content({ class: className })} {...rest} />;
}
BannerContent.displayName = BANNER_CONTENT_NAME;

type BannerIconProps = BannerSharedProps & React.HTMLAttributes<HTMLDivElement>;

function BannerIcon<T extends React.ElementType>({
  className,
  variant,
  status,
  as,
  ...rest
}: PolymorphicComponentProps<T, BannerIconProps>) {
  const Component = as || 'div';
  const { icon } = bannerVariants({ variant, status });

  return <Component className={icon({ class: className })} {...rest} />;
}
BannerIcon.displayName = BANNER_ICON_NAME;

type BannerCloseButtonProps = BannerSharedProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
  };

const BannerCloseButton = React.forwardRef<
  HTMLButtonElement,
  BannerCloseButtonProps
>(
  (
    { asChild, children, variant, status, className, ...rest },
    forwardedRef
  ) => {
    const Component = asChild ? Slot : 'button';
    const { closeButton } = bannerVariants({ variant, status });

    return (
      <Component
        ref={forwardedRef}
        type={asChild ? undefined : 'button'}
        aria-label='Dismiss'
        className={closeButton({ class: className })}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);
BannerCloseButton.displayName = BANNER_CLOSE_BUTTON_NAME;

export {
  BannerRoot as Root,
  BannerContent as Content,
  BannerIcon as Icon,
  BannerCloseButton as CloseButton,
};
