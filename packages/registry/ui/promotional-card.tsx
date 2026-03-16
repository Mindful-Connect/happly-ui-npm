'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import type { PolymorphicComponentProps } from '@/lib/polymorphic';
import { recursiveCloneChildren } from '@/lib/recursive-clone-children';
import { tv, type VariantProps } from '@/lib/tv';

const PROMOTIONAL_CARD_ROOT_NAME = 'PromotionalCardRoot';
const PROMOTIONAL_CARD_ICON_NAME = 'PromotionalCardIcon';
const PROMOTIONAL_CARD_DECORATION_NAME = 'PromotionalCardDecoration';
const PROMOTIONAL_CARD_TITLE_NAME = 'PromotionalCardTitle';
const PROMOTIONAL_CARD_DESCRIPTION_NAME = 'PromotionalCardDescription';
const PROMOTIONAL_CARD_LINK_NAME = 'PromotionalCardLink';

export const promotionalCardVariants = tv({
  slots: {
    root: [
      'relative h-[124px] w-80 overflow-hidden rounded-xl',
      'transition duration-200 ease-out',
    ],
    icon: 'absolute left-4 top-4 size-8',
    decoration:
      'pointer-events-none absolute -top-[70px] left-[calc(100%-88px)] size-[164px]',
    content: 'absolute top-16 left-4 right-4 flex flex-col gap-1',
    title: 'text-label-sm text-text-strong-950 truncate',
    descriptionRow: 'flex items-center gap-1',
    description: 'text-paragraph-xs text-text-sub-600 truncate',
    link: [
      'text-label-xs text-text-sub-600 underline shrink-0',
      'transition duration-200 ease-out',
      'hover:text-text-strong-950',
    ],
  },
  variants: {
    variant: {
      filled: {
        root: [
          // base
          'bg-bg-weak-50',
          // hover
          'hover:bg-bg-white-0 hover:shadow-regular-xs hover:ring-1 hover:ring-stroke-soft-200',
        ],
      },
      stroke: {
        root: [
          // base
          'bg-bg-white-0 border border-stroke-soft-200 shadow-regular-xs',
          // hover
          'hover:bg-bg-weak-50 hover:shadow-none hover:border-transparent',
        ],
        decoration: 'opacity-[0.02]',
      },
    },
    clickable: {
      true: {
        root: 'cursor-pointer',
      },
    },
  },
  defaultVariants: {
    variant: 'stroke',
  },
});

type PromotionalCardSharedProps = VariantProps<typeof promotionalCardVariants>;

type PromotionalCardRootProps = VariantProps<typeof promotionalCardVariants> &
  React.HTMLAttributes<HTMLDivElement> & {
    asChild?: boolean;
  };

const PromotionalCardRoot = React.forwardRef<
  HTMLDivElement,
  PromotionalCardRootProps
>(({ asChild, children, className, variant, clickable, ...rest }, ref) => {
  const uniqueId = React.useId();
  const Component = asChild ? Slot : 'div';
  const { root } = promotionalCardVariants({ variant, clickable });

  const sharedProps: PromotionalCardSharedProps = { variant };

  const extendedChildren = recursiveCloneChildren(
    children as React.ReactElement[],
    sharedProps,
    [PROMOTIONAL_CARD_DECORATION_NAME],
    uniqueId,
    asChild,
  );

  return (
    <Component ref={ref} className={root({ class: className })} {...rest}>
      {extendedChildren}
    </Component>
  );
});
PromotionalCardRoot.displayName = PROMOTIONAL_CARD_ROOT_NAME;

type PromotionalCardIconProps = React.HTMLAttributes<HTMLDivElement>;

function PromotionalCardIcon<T extends React.ElementType>({
  className,
  as,
  ...rest
}: PolymorphicComponentProps<T, PromotionalCardIconProps>) {
  const Component = as || 'div';
  const { icon } = promotionalCardVariants();

  return <Component className={icon({ class: className })} {...rest} />;
}
PromotionalCardIcon.displayName = PROMOTIONAL_CARD_ICON_NAME;

type PromotionalCardDecorationProps = PromotionalCardSharedProps &
  React.HTMLAttributes<HTMLDivElement>;

function PromotionalCardDecoration<T extends React.ElementType>({
  className,
  variant,
  as,
  ...rest
}: PolymorphicComponentProps<T, PromotionalCardDecorationProps>) {
  const Component = as || 'div';
  const { decoration } = promotionalCardVariants({ variant });

  return <Component className={decoration({ class: className })} {...rest} />;
}
PromotionalCardDecoration.displayName = PROMOTIONAL_CARD_DECORATION_NAME;

function PromotionalCardContent({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  const { content } = promotionalCardVariants();

  return (
    <div className={content({ class: className })} {...rest}>
      {children}
    </div>
  );
}
PromotionalCardContent.displayName = 'PromotionalCardContent';

function PromotionalCardTitle({
  className,
  ...rest
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const { title } = promotionalCardVariants();

  return <p className={title({ class: className })} {...rest} />;
}
PromotionalCardTitle.displayName = PROMOTIONAL_CARD_TITLE_NAME;

function PromotionalCardDescription({
  className,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement>) {
  const { description } = promotionalCardVariants();

  return <span className={description({ class: className })} {...rest} />;
}
PromotionalCardDescription.displayName = PROMOTIONAL_CARD_DESCRIPTION_NAME;

type PromotionalCardLinkProps =
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

function PromotionalCardLink({
  className,
  ...rest
}: PromotionalCardLinkProps) {
  const { link } = promotionalCardVariants();

  return <a className={link({ class: className })} {...rest} />;
}
PromotionalCardLink.displayName = PROMOTIONAL_CARD_LINK_NAME;

type PromotionalCardComposedProps = React.ComponentPropsWithoutRef<
  typeof PromotionalCardRoot
> & {
  icon?: React.ElementType;
  decorationIcon?: React.ElementType;
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
};

const PromotionalCardComposed = React.forwardRef<
  HTMLDivElement,
  PromotionalCardComposedProps
>(
  (
    { icon, decorationIcon, title, description, linkText, linkHref, ...rest },
    ref,
  ) => {
    const DecorationComponent = decorationIcon ?? icon;

    return (
      <PromotionalCardRoot ref={ref} {...rest}>
        {icon && <PromotionalCardIcon as={icon} />}
        {DecorationComponent && (
          <PromotionalCardDecoration as={DecorationComponent} />
        )}
        <PromotionalCardContent>
          <PromotionalCardTitle>{title}</PromotionalCardTitle>
          <div className='flex items-center gap-1'>
            <PromotionalCardDescription>
              {description}
            </PromotionalCardDescription>
            {linkText && (
              <PromotionalCardLink href={linkHref}>
                {linkText}
              </PromotionalCardLink>
            )}
          </div>
        </PromotionalCardContent>
      </PromotionalCardRoot>
    );
  },
);
PromotionalCardComposed.displayName = 'PromotionalCardComposed';

export {
  PromotionalCardRoot as Root,
  PromotionalCardIcon as Icon,
  PromotionalCardDecoration as Decoration,
  PromotionalCardContent as Content,
  PromotionalCardTitle as Title,
  PromotionalCardDescription as Description,
  PromotionalCardLink as Link,
  PromotionalCardComposed as Composed,
  PromotionalCardComposed as PromotionalCard,
};
