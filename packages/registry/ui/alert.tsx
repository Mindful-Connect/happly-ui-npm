'use client';

import * as React from 'react';
import {
  RiAlertFill,
  RiCheckboxCircleFill,
  RiCloseLine,
  RiErrorWarningFill,
  RiInformationFill,
  RiSparklingFill,
} from '@remixicon/react';

import type { PolymorphicComponentProps } from '@/lib/polymorphic';
import { recursiveCloneChildren } from '@/lib/recursive-clone-children';
import { tv, type ClassValue, type VariantProps } from '@/lib/tv';

const ALERT_ROOT_NAME = 'AlertRoot';
const ALERT_ICON_NAME = 'AlertIcon';
const ALERT_CLOSE_ICON_NAME = 'AlertCloseIcon';

export const alertVariants = tv({
  slots: {
    root: 'w-full',
    wrapper: [
      'grid w-full auto-cols-auto grid-flow-col grid-cols-[auto_minmax(0,1fr)] items-start',
      'transition-[background-color,color] duration-150 ease-out',
    ],
    icon: 'shrink-0',
    // The resting opacity is AlignUI's treatment. Hover and keyboard focus on
    // the button that wraps the glyph restore it to full, so the only control
    // in the alert is legible while it is being used — same rule as
    // `Banner.CloseButton`.
    closeIcon:
      'transition-opacity duration-150 ease-out [:hover>&]:opacity-100 [:focus-visible>&]:opacity-100',
  },
  variants: {
    variant: {
      filled: {
        closeIcon: 'opacity-[.72]',
      },
      light: {
        root: 'text-text-strong-950',
        closeIcon: 'text-text-strong-950 opacity-40',
      },
      lighter: {
        root: 'text-text-strong-950',
        closeIcon: 'text-text-strong-950 opacity-40',
      },
      stroke: {
        root: 'bg-bg-white-0 text-text-strong-950 shadow-regular-md ring-1 ring-inset ring-stroke-soft-200',
        closeIcon: 'text-text-strong-950 opacity-40',
      },
    },
    status: {
      error: {},
      warning: {},
      success: {},
      information: {},
      feature: {},
    },
    size: {
      xsmall: {
        root: 'rounded-lg p-2 text-paragraph-xs',
        wrapper: 'gap-2',
        icon: 'w-4 h-4',
        closeIcon: 'w-4 h-4',
      },
      small: {
        root: 'rounded-lg px-2.5 py-2 text-paragraph-sm',
        wrapper: 'gap-2',
        icon: 'w-5 h-5',
        closeIcon: 'w-5 h-5',
      },
      large: {
        root: 'rounded-xl p-3.5 pb-4 text-paragraph-sm',
        wrapper: 'items-start gap-3',
        icon: 'w-5 h-5',
        closeIcon: 'w-5 h-5',
      },
    },
  },
  compoundVariants: [
    //#region filled
    {
      variant: 'filled',
      status: 'error',
      class: {
        root: 'bg-error-base text-error-contrast',
      },
    },
    {
      variant: 'filled',
      status: 'warning',
      class: {
        root: 'bg-warning-base text-warning-contrast',
      },
    },
    {
      variant: 'filled',
      status: 'success',
      class: {
        root: 'bg-success-base text-success-contrast',
      },
    },
    {
      variant: 'filled',
      status: 'information',
      class: {
        root: 'bg-information-base text-information-contrast',
      },
    },
    {
      variant: 'filled',
      status: 'feature',
      class: {
        root: 'bg-faded-base text-faded-contrast',
      },
    },
    //#endregion

    //#region light
    {
      variant: 'light',
      status: 'error',
      class: {
        root: 'bg-error-light',
      },
    },
    {
      variant: 'light',
      status: 'warning',
      class: {
        root: 'bg-warning-light',
      },
    },
    {
      variant: 'light',
      status: 'success',
      class: {
        root: 'bg-success-light',
      },
    },
    {
      variant: 'light',
      status: 'information',
      class: {
        root: 'bg-information-light',
      },
    },
    {
      variant: 'light',
      status: 'feature',
      class: {
        root: 'bg-faded-light',
      },
    },
    //#endregion

    //#region lighter
    {
      variant: 'lighter',
      status: 'error',
      class: {
        root: 'bg-error-lighter',
      },
    },
    {
      variant: 'lighter',
      status: 'warning',
      class: {
        root: 'bg-warning-lighter',
      },
    },
    {
      variant: 'lighter',
      status: 'success',
      class: {
        root: 'bg-success-lighter',
      },
    },
    {
      variant: 'lighter',
      status: 'information',
      class: {
        root: 'bg-information-lighter',
      },
    },
    {
      variant: 'lighter',
      status: 'feature',
      class: {
        root: 'bg-faded-lighter',
      },
    },
    //#endregion

    //#region light, lighter, stroke
    {
      variant: ['light', 'lighter', 'stroke'],
      status: 'error',
      class: {
        icon: 'text-error-base',
      },
    },
    {
      variant: ['light', 'lighter', 'stroke'],
      status: 'warning',
      class: {
        icon: 'text-warning-base',
      },
    },
    {
      variant: ['light', 'lighter', 'stroke'],
      status: 'success',
      class: {
        icon: 'text-success-base',
      },
    },
    {
      variant: ['light', 'lighter', 'stroke'],
      status: 'information',
      class: {
        icon: 'text-information-base',
      },
    },
    {
      variant: ['light', 'lighter', 'stroke'],
      status: 'feature',
      class: {
        icon: 'text-faded-base',
      },
    },
    //#endregion
  ],
  defaultVariants: {
    size: 'small',
    variant: 'filled',
    status: 'information',
  },
});

const STATUS_ICONS = {
  error: RiErrorWarningFill,
  warning: RiAlertFill,
  success: RiCheckboxCircleFill,
  information: RiInformationFill,
  feature: RiSparklingFill,
} as const;

type AlertSharedProps = VariantProps<typeof alertVariants>;

export type AlertProps = VariantProps<typeof alertVariants> &
  React.HTMLAttributes<HTMLDivElement> & {
    wrapperClassName?: ClassValue;
  };

const AlertRoot = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    { children, className, wrapperClassName, size, variant, status, ...rest },
    forwardedRef
  ) => {
    const uniqueId = React.useId();
    const { root, wrapper } = alertVariants({ size, variant, status });

    const sharedProps: AlertSharedProps = {
      size,
      variant,
      status,
    };

    const extendedChildren = recursiveCloneChildren(
      children as React.ReactElement[],
      sharedProps,
      [ALERT_ICON_NAME, ALERT_CLOSE_ICON_NAME],
      uniqueId
    );

    return (
      <div ref={forwardedRef} className={root({ class: className })} {...rest}>
        <div className={wrapper({ class: wrapperClassName })}>
          {extendedChildren}
        </div>
      </div>
    );
  }
);
AlertRoot.displayName = ALERT_ROOT_NAME;

function AlertIcon<T extends React.ElementType>({
  size,
  variant,
  status,
  className,
  as,
  ...rest
}: PolymorphicComponentProps<T, AlertSharedProps>) {
  const Component = as || STATUS_ICONS[status ?? 'information'];
  const { icon } = alertVariants({ size, variant, status });

  // The status is already carried by the alert's text and background, so the
  // glyph is decorative. Pass `aria-hidden={false}` to override.
  return (
    <Component
      aria-hidden='true'
      className={icon({ class: className })}
      {...rest}
    />
  );
}
AlertIcon.displayName = ALERT_ICON_NAME;

function AlertCloseIcon<T extends React.ElementType>({
  size,
  variant,
  status,
  className,
  as,
  ...rest
}: PolymorphicComponentProps<T, AlertSharedProps>) {
  const Component = as || RiCloseLine;
  const { closeIcon } = alertVariants({ size, variant, status });

  // Render inside a <button aria-label="Dismiss">; the glyph itself is
  // decorative, and `rest` is forwarded so consumers can wire it up.
  return (
    <Component
      aria-hidden='true'
      className={closeIcon({ class: className })}
      {...rest}
    />
  );
}
AlertCloseIcon.displayName = ALERT_CLOSE_ICON_NAME;

export { AlertRoot as Root, AlertIcon as Icon, AlertCloseIcon as CloseIcon };
