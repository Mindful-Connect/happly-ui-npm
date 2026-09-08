import * as React from 'react';

import { tv, type VariantProps } from '@/lib/tv';
import * as KeyIcon from '@/components/ui/key-icon';

// Inline SVG dashed border so the dash pattern matches the design spec instead
// of the browser default, and so the stroke can read `stroke-sub-300` from the
// theme (a data: URI would have to hardcode a hex and stay light-mode grey).
// The rect is inset by half the stroke width and the SVG does not clip, so the
// whole 1px line is drawn — a stroke centred on the element edge loses its
// outer half and shaves the rounded corners. rx/ry match rounded-2xl (16px)
// minus the half-stroke inset.
function DashedBorder() {
  return (
    // The wrapper is inset by half the stroke width and the SVG fills it, so
    // the stroke — centred on the SVG's edge and never clipped — lands wholly
    // inside the card. `calc()` in the rect's own geometry does the same thing
    // but only in Chromium.
    <div
      aria-hidden='true'
      className='text-stroke-sub-300 pointer-events-none absolute inset-[0.5px]'
    >
      <svg fill='none' className='h-full w-full overflow-visible'>
        <rect
          width='100%'
          height='100%'
          rx='15.5'
          ry='15.5'
          stroke='currentColor'
          strokeWidth='1'
          strokeDasharray='6 4'
        />
      </svg>
    </div>
  );
}

const EMPTY_STATE_ROOT_NAME = 'EmptyStateRoot';
const EMPTY_STATE_ICON_NAME = 'EmptyStateIcon';
const EMPTY_STATE_TITLE_NAME = 'EmptyStateTitle';
const EMPTY_STATE_DESCRIPTION_NAME = 'EmptyStateDescription';
const EMPTY_STATE_ACTIONS_NAME = 'EmptyStateActions';

export const emptyStateVariants = tv({
  slots: {
    root: 'relative flex flex-col items-center justify-center text-center',
    title: 'text-text-sub-600 text-balance',
    description: 'max-w-xs text-text-soft-400 text-pretty',
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
        root: 'rounded-2xl',
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
      {bordered && <DashedBorder />}
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
      className='text-text-soft-400 shadow-regular-deep ring-0'
      icon={icon}
    />
  );
}
EmptyStateIcon.displayName = EMPTY_STATE_ICON_NAME;

type EmptyStateTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  /**
   * The `size` the parent Root was given. Repeated on the slot because tv() is
   * called per component: without it every slot resolves `defaultVariants`
   * (`md`), so a Root marked `size='lg'` still rendered `md` typography and
   * spacing. Composed passes it through automatically; hand-composed usage
   * should pass the same value it gives Root.
   */
  size?: VariantProps<typeof emptyStateVariants>['size'];
};

function EmptyStateTitle({ className, size, ...rest }: EmptyStateTitleProps) {
  const { title } = emptyStateVariants({ size });

  return <h3 className={title({ class: className })} {...rest} />;
}
EmptyStateTitle.displayName = EMPTY_STATE_TITLE_NAME;

type EmptyStateDescriptionProps = React.HTMLAttributes<HTMLParagraphElement> & {
  /** See {@link EmptyStateTitleProps.size}. */
  size?: VariantProps<typeof emptyStateVariants>['size'];
};

function EmptyStateDescription({
  className,
  size,
  ...rest
}: EmptyStateDescriptionProps) {
  const { description } = emptyStateVariants({ size });

  return <p className={description({ class: className })} {...rest} />;
}
EmptyStateDescription.displayName = EMPTY_STATE_DESCRIPTION_NAME;

type EmptyStateActionsProps = React.HTMLAttributes<HTMLDivElement> & {
  /** See {@link EmptyStateTitleProps.size}. */
  size?: VariantProps<typeof emptyStateVariants>['size'];
};

function EmptyStateActions({
  className,
  size,
  ...rest
}: EmptyStateActionsProps) {
  const { actions } = emptyStateVariants({ size });

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
          {title && <EmptyStateTitle size={size}>{title}</EmptyStateTitle>}
          {description && (
            <EmptyStateDescription size={size}>
              {description}
            </EmptyStateDescription>
          )}
        </div>
      )}
      {actions && <EmptyStateActions size={size}>{actions}</EmptyStateActions>}
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
