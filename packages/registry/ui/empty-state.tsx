import * as React from 'react';

import { tv, type VariantProps } from '@/lib/tv';
import * as KeyIcon from '@/components/ui/key-icon';

const EMPTY_STATE_ROOT_NAME = 'EmptyStateRoot';
const EMPTY_STATE_ICON_NAME = 'EmptyStateIcon';
const EMPTY_STATE_TITLE_NAME = 'EmptyStateTitle';
const EMPTY_STATE_DESCRIPTION_NAME = 'EmptyStateDescription';
const EMPTY_STATE_ACTIONS_NAME = 'EmptyStateActions';

export const emptyStateVariants = tv({
  slots: {
    root: 'flex flex-col items-center justify-center text-center',
    title: 'text-text-sub-600',
    description: 'max-w-xs text-text-soft-400',
    actions: 'flex items-center',
  },
  variants: {
    size: {
      sm: {
        root: 'gap-3 px-6 py-8',
        title: 'text-label-sm',
        description: 'text-paragraph-xs',
        actions: 'gap-2',
      },
      md: {
        root: 'gap-3.5 px-6 py-10',
        title: 'text-label-sm',
        description: 'text-paragraph-xs',
        actions: 'gap-3',
      },
      lg: {
        root: 'gap-4 px-6 py-14',
        title: 'text-label-md',
        description: 'text-paragraph-sm',
        actions: 'gap-3',
      },
    },
    bordered: {
      true: {
        root: 'rounded-2xl border border-dashed border-stroke-soft-200',
      },
      false: {},
    },
    filled: {
      true: {
        root: 'rounded-2xl bg-bg-white-0 shadow-regular-xs',
      },
      false: {},
    },
  },
  defaultVariants: {
    size: 'md',
    bordered: false,
    filled: false,
  },
});

/** Maps empty state size → KeyIcon size */
const iconSizeMap = {
  sm: 'md',
  md: 'lg',
  lg: 'xl',
} as const;

type EmptyStateRootProps = VariantProps<typeof emptyStateVariants> &
  React.HTMLAttributes<HTMLDivElement>;

function EmptyStateRoot({
  children,
  className,
  size,
  bordered,
  filled,
  ...rest
}: EmptyStateRootProps) {
  const { root } = emptyStateVariants({ size, bordered, filled });

  return (
    <div className={root({ class: className })} {...rest}>
      {children}
    </div>
  );
}
EmptyStateRoot.displayName = EMPTY_STATE_ROOT_NAME;

type EmptyStateIconProps = {
  /** The icon element to render. */
  icon: React.ReactNode;
  /** KeyIcon size. @default 'lg' */
  size?: React.ComponentPropsWithoutRef<typeof KeyIcon.Root>['size'];
};

function EmptyStateIcon({ icon, size = 'lg' }: EmptyStateIconProps) {
  return (
    <KeyIcon.Root
      size={size}
      className='text-text-soft-400 shadow-regular-deep'
      icon={icon}
    />
  );
}
EmptyStateIcon.displayName = EMPTY_STATE_ICON_NAME;

type EmptyStateTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

function EmptyStateTitle({ className, ...rest }: EmptyStateTitleProps) {
  const { title } = emptyStateVariants();

  return <h3 className={title({ class: className })} {...rest} />;
}
EmptyStateTitle.displayName = EMPTY_STATE_TITLE_NAME;

type EmptyStateDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

function EmptyStateDescription({
  className,
  ...rest
}: EmptyStateDescriptionProps) {
  const { description } = emptyStateVariants();

  return <p className={description({ class: className })} {...rest} />;
}
EmptyStateDescription.displayName = EMPTY_STATE_DESCRIPTION_NAME;

type EmptyStateActionsProps = React.HTMLAttributes<HTMLDivElement>;

function EmptyStateActions({ className, ...rest }: EmptyStateActionsProps) {
  const { actions } = emptyStateVariants();

  return <div className={actions({ class: className })} {...rest} />;
}
EmptyStateActions.displayName = EMPTY_STATE_ACTIONS_NAME;

type EmptyStateComposedProps = Omit<EmptyStateRootProps, 'children'> & {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
};

function EmptyStateComposed({
  icon,
  title,
  description,
  actions,
  size = 'md',
  ...rest
}: EmptyStateComposedProps) {
  return (
    <EmptyStateRoot size={size} {...rest}>
      {icon && <EmptyStateIcon size={iconSizeMap[size ?? 'md']} icon={icon} />}
      {(title || description) && (
        <div className='flex flex-col items-center gap-1'>
          {title && <EmptyStateTitle>{title}</EmptyStateTitle>}
          {description && (
            <EmptyStateDescription>{description}</EmptyStateDescription>
          )}
        </div>
      )}
      {actions && <EmptyStateActions>{actions}</EmptyStateActions>}
    </EmptyStateRoot>
  );
}
EmptyStateComposed.displayName = 'EmptyStateComposed';

export {
  EmptyStateRoot as Root,
  EmptyStateIcon as Icon,
  EmptyStateTitle as Title,
  EmptyStateDescription as Description,
  EmptyStateActions as Actions,
  EmptyStateComposed as Composed,
  EmptyStateComposed as EmptyState,
};
