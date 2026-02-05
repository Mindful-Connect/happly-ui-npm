'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { RiCloseFill } from 'react-icons/ri';

export type ObjectValues<T> = T[keyof T];

export const TAG_CATEGORY = {
  Sector: 'sector',
  Skill: 'skill',
  OpportunityType: 'opportunity_type',
  Perk: 'perk',
  Demographic: 'demographic',
  IncorporationType: 'incorporation_type',
  General: 'general',
  SpaceAccommodation: 'space_accommodation',
  LiveStreamTopic: 'live_stream_topic',
  EventTopic: 'event_topic',
  Group: 'group',
} as const;
export type TagCategory = ObjectValues<typeof TAG_CATEGORY>;

export interface Tag {
  id: number;
  slug: string;
  label: string;
  category: TagCategory;
}

/**
 * shadcn/ui Tag component
 *
 * Usage:
 * <Tag variant="stroke">Label</Tag>
 * <Tag variant="stroke">
 *   <Tag.Icon><Icon /></Tag.Icon>
 *   Text
 *   <Tag.Close />
 * </Tag>
 */

export const tagRoot = cva(
  [
    'group inline-flex items-center min-h-[36px] gap-2 rounded-lg px-2 !text-label-sm text-ds-sub-600',
    'transition duration-200 ease-out ring-1 ring-inset',
  ].join(' '),
  {
    variants: {
      variant: {
        stroke: [
          'bg-ds-white-0 ring-ds-stroke-soft-200',
          'hover:bg-ds-weak-50 hover:ring-transparent',
          'focus-within:bg-ds-weak-50 focus-within:ring-transparent',
        ].join(' '),
        gray: [
          'bg-ds-weak-50 ring-transparent',
          'hover:bg-ds-white-0 hover:ring-ds-stroke-soft-200',
        ].join(' '),
      },
      disabled: {
        true: [
          'pointer-events-none bg-ds-weak-50 text-ds-disabled-300 ring-transparent',
        ].join(' '),
      },
    },
    defaultVariants: {
      variant: 'stroke',
      disabled: false,
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagRoot> {
  asChild?: boolean;
}

export const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ asChild, variant, disabled, className, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(tagRoot({ variant, disabled, class: className }))}
        aria-disabled={disabled ?? undefined}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Tag.displayName = 'Tag';

// Slot for an icon inside the Tag
type TagIconProps = {
  asChild?: boolean;
} & VariantProps<typeof tagRoot> &
  React.HTMLAttributes<HTMLElement>;

export const TagIcon = React.forwardRef<HTMLElement, TagIconProps>(
  ({ asChild, variant, disabled, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span';
    return (
      <Comp
        ref={ref}
        className={cn(
          'flex h-4 w-4 shrink-0 select-none items-center justify-center',
          'text-ds-soft-400 transition duration-200 ease-out',
          'group-focus-within:text-ds-sub-600 group-hover:text-ds-sub-600',
          className
        )}
        {...props}
      />
    );
  }
);
TagIcon.displayName = 'TagIcon';

// Dismiss (close) button inside Tag
export type TagCloseProps = Omit<VariantProps<typeof tagRoot>, 'disabled'> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    disabled?: boolean;
  };

export const TagClose = React.forwardRef<HTMLButtonElement, TagCloseProps>(
  ({ asChild, variant, disabled, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        type='button'
        className={cn(
          'flex h-4 w-4 shrink-0 items-center justify-center focus:outline-none',
          'text-ds-soft-400 transition duration-200 ease-out',
          'group-focus-within:text-ds-sub-600 group-hover:text-ds-sub-600',
          className
        )}
        aria-disabled={disabled}
        {...props}
      >
        <RiCloseFill className='h-4 w-4' />
      </Comp>
    );
  }
);
TagClose.displayName = 'TagClose';
