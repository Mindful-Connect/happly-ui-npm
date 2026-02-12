import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import {
  RiAlertFill,
  RiCheckboxCircleFill,
  RiCloseLine,
  RiErrorWarningFill,
  RiInformationFill,
  RiSparklingFill,
} from 'react-icons/ri';

import { AlertStatus, AlertStyle, AlertVariant } from '@/lib/alert-utils';

// =============================================================================
// Variant Definitions
// =============================================================================

const alertVariants = cva('relative flex items-start text-sm', {
  variants: {
    variant: {
      // Error variants
      errorFilled: 'bg-ds-error-base text-white',
      errorLight: 'bg-ds-error-light text-ds-neutral-950',
      errorLighter: 'bg-ds-error-lighter text-ds-neutral-950',
      errorOutline:
        'border border-ds-neutral-200 text-ds-neutral-950 [&_.alert-title]:-mt-[1px]',

      // Warning variants
      warningFilled: 'bg-ds-warning-base text-white',
      warningLight: 'bg-ds-warning-light text-ds-neutral-950',
      warningLighter: 'bg-ds-warning-lighter text-ds-neutral-950',
      warningOutline:
        'border border-ds-neutral-200 text-ds-neutral-950 [&_.alert-title]:-mt-[1px]',

      // Success variants
      successFilled: 'bg-ds-success-base text-white',
      successLight: 'bg-ds-success-light text-ds-neutral-950',
      successLighter: 'bg-ds-success-lighter text-ds-neutral-950',
      successOutline:
        'border border-ds-neutral-200 text-ds-neutral-950 [&_.alert-title]:-mt-[1px]',

      // Info variants
      infoFilled: 'bg-ds-information-base text-white',
      infoLight: 'bg-ds-information-light text-ds-neutral-950',
      infoLighter: 'bg-ds-information-lighter text-ds-neutral-950',
      infoOutline:
        'border border-ds-neutral-200 text-ds-neutral-950 [&_.alert-title]:-mt-[1px]',

      // Feature variants
      featureFilled: 'bg-ds-feature-base text-white',
      featureLight: 'bg-ds-feature-light text-ds-neutral-950',
      featureLighter: 'bg-ds-feature-lighter text-ds-neutral-950',
      featureOutline:
        'border border-ds-neutral-200 text-ds-neutral-950 [&_.alert-title]:-mt-[1px]',

      // Special variants
      infoPrimaryFilled: 'bg-primaryColor text-primaryColorText',
      infoDarkFilled: 'bg-ds-strong-950 text-white',
    },
    size: {
      // Large: 14px padding, 12px icon gap, 4px title-desc gap, 10px to actions
      md: 'px-[14px] py-[14px] gap-x-3 rounded-[12px] [&_.alert-title]:mb-1 [&_.alert-title]:font-medium [&_.alert-description]:opacity-[0.72] [&_.alert-actions]:mt-2.5',
      sm: 'min-h-9 px-2.5 py-2 gap-x-2 rounded-[8px] [&_.alert-description]:hidden [&_.alert-actions]:hidden [&_.alert-title]:-mt-[1px]',
      xs: 'py-0 items-center min-h-8 px-2 py-2 gap-x-2 text-xs rounded-[8px] [&_.alert-title]:-mt-[1px] [&_.alert-description]:hidden [&_.alert-actions]:hidden',
    },
  },
  defaultVariants: {
    variant: 'warningLighter',
    size: 'sm',
  },
});

const alertLinkVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap outline-none',
    'transition duration-200 ease-out',
    'underline-offset-[3px]',
    'hover:underline',
    'focus:outline-none focus-visible:underline',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: 'opacity-100',
        primary: 'text-primaryColor/80',
        underline: 'underline opacity-100',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// =============================================================================
// Helper Functions
// =============================================================================

function getStatusFromVariant(variant: string | null | undefined): AlertStatus {
  if (!variant) return 'warning';
  if (variant.includes('error')) return 'error';
  if (variant.includes('warning')) return 'warning';
  if (variant.includes('success')) return 'success';
  if (variant.includes('info')) return 'info';
  if (variant.includes('feature')) return 'feature';
  return 'warning';
}

function isFilledVariant(variant: string | null | undefined): boolean {
  return variant?.includes('Filled') ?? false;
}

function isOutlineVariant(variant: string | null | undefined): boolean {
  return variant?.includes('Outline') ?? false;
}

// =============================================================================
// Icon Components
// =============================================================================

const STATUS_ICONS: Record<
  AlertStatus,
  React.ComponentType<{ className?: string }>
> = {
  error: RiErrorWarningFill,
  warning: RiAlertFill,
  success: RiCheckboxCircleFill,
  info: RiInformationFill,
  feature: RiSparklingFill,
};

const STATUS_COLORS: Record<AlertStatus, string> = {
  error: 'text-ds-error-base',
  warning: 'text-ds-warning-base',
  success: 'text-ds-success-base',
  info: 'text-ds-information-base',
  feature: 'text-ds-feature-base',
};

function AlertIcon({
  variant,
  size,
}: {
  variant: string | null | undefined;
  size: string;
}) {
  const status = getStatusFromVariant(variant);
  const isFilled = isFilledVariant(variant);
  const isOutline = isOutlineVariant(variant);
  const Icon = STATUS_ICONS[status];

  const iconSize = size === 'xs' ? 'h-4 w-4' : 'h-5 w-5';
  const iconColor = isFilled ? 'text-white' : STATUS_COLORS[status];

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center',
        isOutline && size !== 'md' && '-mt-[1px]'
      )}
    >
      <Icon className={cn(iconSize, iconColor)} />
    </div>
  );
}

function DismissIcon({ isFilled }: { isFilled: boolean }) {
  return (
    <RiCloseLine
      className={cn(
        'h-5 w-5 transition-opacity duration-75',
        isFilled
          ? 'opacity-70 hover:opacity-100'
          : 'opacity-40 hover:opacity-75'
      )}
    />
  );
}

// =============================================================================
// Alert Components
// =============================================================================

type AlertProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants> & {
    dismissButton?: boolean;
    onDismiss?: () => void;
  };

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = 'warningLighter',
      size = 'sm',
      dismissButton,
      onDismiss,
      children,
      ...props
    },
    ref
  ) => {
    const isFilled = isFilledVariant(variant);
    const isOutline = isOutlineVariant(variant);

    return (
      <div
        ref={ref}
        role='alert'
        className={cn(alertVariants({ variant, size }), className)}
        {...props}
      >
        <AlertIcon variant={variant} size={size as string} />

        <div
          className={cn(
            'alert-content flex w-full leading-tight',
            size === 'md' && 'flex-col'
          )}
        >
          {children}
        </div>

        {dismissButton && (
          <button
            type='button'
            className={cn('dismiss-button ml-auto', isOutline && '-mt-[1px]')}
            onClick={onDismiss}
          >
            <DismissIcon isFilled={isFilled} />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('alert-title line-clamp-1', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('alert-description text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

type AlertActionsProps = React.HTMLAttributes<HTMLDivElement> & {
  separator?: React.ReactNode;
};

const AlertActions = React.forwardRef<HTMLDivElement, AlertActionsProps>(
  ({ className, separator, children, ...props }, ref) => {
    const childArray = React.Children.toArray(children);

    return (
      <div
        ref={ref}
        className={cn('alert-actions flex items-center gap-2', className)}
        {...props}
      >
        {childArray.map((child, index) => (
          <React.Fragment key={index}>
            {child}
            {separator && index < childArray.length - 1 && (
              <span className='text-current opacity-[0.48]'>{separator}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
);
AlertActions.displayName = 'AlertActions';

type AlertLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof alertLinkVariants> & {
    asChild?: boolean;
  };

const AlertLink = React.forwardRef<HTMLAnchorElement, AlertLinkProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a';
    return (
      <Comp
        ref={ref}
        className={cn(alertLinkVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
AlertLink.displayName = 'AlertLink';

type AlertButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof alertLinkVariants>;

const AlertButton = React.forwardRef<HTMLButtonElement, AlertButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(alertLinkVariants({ variant, size }), className)}
      {...props}
    />
  )
);
AlertButton.displayName = 'AlertButton';

// =============================================================================
// Utility Function for Alerts.tsx
// =============================================================================

export function getAlertVariant(
  type: AlertStatus | undefined,
  style: AlertStyle = 'light'
): AlertVariant {
  const typeMap: Record<AlertStatus, string> = {
    success: 'success',
    error: 'error',
    info: 'info',
    warning: 'warning',
    feature: 'feature',
  };
  const styleMap: Record<AlertStyle, string> = {
    filled: 'Filled',
    light: 'Light',
    lighter: 'Lighter',
    outline: 'Outline',
  };

  const alertType = typeMap[type ?? 'error'] ?? 'error';
  const alertStyle = styleMap[style ?? 'lighter'] ?? 'Lighter';

  return `${alertType}${alertStyle}` as AlertVariant;
}

// =============================================================================
// Exports
// =============================================================================

export {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertActions,
  AlertLink,
  AlertButton,
  alertVariants,
  alertLinkVariants,
};
