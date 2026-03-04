import React, { useState } from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import {
  CreditCard,
  Wallet,
  Banknote,
  Building,
  Zap,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/happly-ui-utils';
import { DemoBadge, DemoLabel } from '../ComponentPreview';

// ============================================================================
// RadioGroup Implementation
// ============================================================================

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    selectElementColor?: string;
    variant?: 'default' | 'primary';
  }
>(({ className, color, variant = 'default', ...props }, ref) => {
  return (
    <div className='flex h-5 w-5 shrink-0 items-center justify-center'>
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          'aspect-square h-[16px] w-[16px] rounded-full border-2 border-neutral-200 text-primary transition-all duration-75 focus:outline-none focus-visible:ring-0 disabled:cursor-default disabled:opacity-50 data-[state=checked]:border-0 [&[data-state=checked]_.unchecked-shadow]:hidden',
          props.disabled && 'cursor-default',
          className
        )}
        {...props}
      >
        {/* This div is invisible when the RadioGroupItem is checked  */}
        <div className='unchecked-shadow h-full w-full rounded-full bg-white shadow-sm' />

        {/* RadioGroupPrimitive.Indicator is invisible when the RadioGroupItem is not checked  */}
        <RadioGroupPrimitive.Indicator className='flex h-full items-center justify-center transition-all duration-75'>
          <div
            style={{ borderColor: color }}
            className={cn(
              'h-full w-full rounded-full border-4 transition-all duration-75',
              variant === 'primary'
                ? 'border-primaryColor'
                : 'border-ds-neutral-950'
            )}
          />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
    </div>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

// ============================================================================
// KeyIcon Implementation
// ============================================================================

type Color =
  | 'blue'
  | 'gray'
  | 'orange'
  | 'red'
  | 'green'
  | 'yellow'
  | 'purple'
  | 'pink'
  | 'teal';
type Style = 'stroke' | 'lighter';

const styleMap: Record<Color, Record<Style, string>> = {
  blue: {
    stroke: 'border border-ds-neutral-200',
    lighter: 'border bg-ds-blue-50 border-ds-blue-100',
  },
  gray: {
    stroke: 'border border-ds-neutral-200',
    lighter: 'border bg-ds-blue-100 border-ds-blue-200',
  },
  orange: {
    stroke: 'border border-ds-neutral-200',
    lighter: 'border bg-ds-blue-50 border-ds-blue-100',
  },
  red: {
    stroke: 'border border-ds-neutral-200',
    lighter: 'border bg-ds-blue-50 border-ds-blue-100',
  },
  green: {
    stroke: 'border border-ds-neutral-200',
    lighter: 'border bg-ds-green-100 border-ds-green-200',
  },
  yellow: {
    stroke: 'border border-ds-neutral-200',
    lighter: 'border bg-ds-blue-50 border-ds-blue-100',
  },
  purple: {
    stroke: 'border border-ds-neutral-200',
    lighter: 'border bg-ds-blue-50 border-ds-blue-100',
  },
  pink: {
    stroke: 'border border-ds-neutral-200',
    lighter: 'border bg-ds-blue-50 border-ds-blue-100',
  },
  teal: {
    stroke: 'border border-ds-neutral-200',
    lighter: 'border bg-ds-sky-100 border-ds-sky-200',
  },
};

const sizeClasses = {
  sm: 'w-8 h-8 [&_svg]:size-4',
  md: 'w-10 h-10 [&_svg]:size-4',
  lg: 'w-12 h-12 [&_svg]:size-6',
  xl: 'w-14 h-14 [&_svg]:size-7',
  '2xl': 'w-16 h-16 [&_svg]:size-8',
};

function KeyIcon({
  color = 'gray',
  icon,
  size = 'md',
  style = 'stroke',
  className,
}: {
  color?: Color;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  style?: 'stroke' | 'lighter';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full',
        sizeClasses[size],
        styleMap[color][style],
        'shrink-0',
        className
      )}
    >
      {icon}
    </div>
  );
}

// ============================================================================
// RadioCardGroup Implementation
// ============================================================================

export type RadioCardItem = {
  badge?: {
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
    text: string;
  };
  description?: string;
  icon?: (isChecked: boolean) => React.ReactNode;
  readOnly?: boolean;
  title: string;
  value: string;
};

function RadioCardGroup({
  allowDeselect,
  className,
  descriptionInTitle,
  disabled,
  itemClassName,
  items,
  noBorderHighlightWhenSeected,
  simpleIcons,
  value,
  variant = 'default',
  onValueChange,
}: {
  allowDeselect?: boolean;
  className?: string;
  descriptionInTitle?: boolean;
  disabled?: boolean;
  itemClassName?: string;
  items: RadioCardItem[];
  noBorderHighlightWhenSeected?: boolean;
  simpleIcons?: boolean;
  value: string | undefined;
  variant?: 'default' | 'primary';
  onValueChange: (value: string) => void;
}) {
  return (
    <RadioGroup
      className={cn('', className)}
      value={value}
      onValueChange={() => {}}
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      {items.map((item, index) => (
        <div
          key={`${index}-${item.value}`}
          className={cn(
            'flex w-full justify-between gap-x-3.5 rounded-xl border p-4 transition-colors duration-75',
            disabled || item.readOnly
              ? 'cursor-default border-neutral-200'
              : [
                  'cursor-pointer',
                  value === item.value && !noBorderHighlightWhenSeected
                    ? variant === 'primary'
                      ? 'border-primaryColor'
                      : 'border-neutral-950'
                    : 'border-ds-neutral-200 hover:border-ds-neutral-200 hover:bg-ds-neutral-50',
                ],
            itemClassName
          )}
          onClick={(e) => {
            if (disabled || item.readOnly) return;
            if (allowDeselect && value === item.value) {
              onValueChange('');
              return;
            }
            onValueChange(item.value);
          }}
        >
            <div
              className={cn(
                'flex items-center',
                simpleIcons ? 'gap-2' : 'gap-[14px]'
              )}
            >
              {!!item.icon &&
                (simpleIcons ? (
                  item.icon(value === item.value)
                ) : (
                  <KeyIcon icon={item.icon(value === item.value)} />
                ))}

            <div className='flex h-min flex-col gap-1'>
              <div className='flex gap-x-2'>
                <div className='flex flex-wrap items-center gap-x-1.5'>
                  <DemoLabel disabled={disabled || item.readOnly}>
                    {item.title}
                  </DemoLabel>
                  {descriptionInTitle && item.description && (
                    <span
                      className={cn(
                        'transition-colors duration-75',
                        disabled || item.readOnly
                          ? 'text-ds-neutral-400'
                          : 'text-ds-neutral-600'
                      )}
                    >
                      {item.description}
                    </span>
                  )}
                </div>
                {item.badge && (
                  <DemoBadge variant={item.badge.variant}>
                    {item.badge.text}
                  </DemoBadge>
                )}
              </div>

              {!descriptionInTitle && item.description && (
                <p
                  className={cn(
                    'transition-colors duration-75',
                    disabled || item.readOnly
                      ? 'text-ds-neutral-400'
                      : 'text-ds-neutral-600'
                  )}
                >
                  {item.description}
                </p>
              )}
            </div>
          </div>

          <RadioGroupItem
            variant={variant}
            disabled={disabled || item.readOnly}
            id={item.value}
            value={item.value}
            className='peer'
            onClick={() => {
              if (disabled || item.readOnly) return;
              onValueChange(item.value);
            }}
          />
        </div>
      ))}
    </RadioGroup>
  );
}

// Basic usage items
const basicItems: RadioCardItem[] = [
  {
    title: 'Personal',
    value: 'personal',
    description: 'For individual use',
  },
  {
    title: 'Team',
    value: 'team',
    description: 'For small teams',
  },
  {
    title: 'Enterprise',
    value: 'enterprise',
    description: 'For large organizations',
  },
];

// Items without descriptions
const noDescriptionItems: RadioCardItem[] = [
  {
    title: 'Small',
    value: 'small',
  },
  {
    title: 'Medium',
    value: 'medium',
  },
  {
    title: 'Large',
    value: 'large',
  },
];

// Items with icons
const iconItems: RadioCardItem[] = [
  {
    title: 'Card',
    value: 'card',
    icon: (isChecked: boolean) => <CreditCard className={cn('h-5 w-5', isChecked ? 'text-primary' : '')} />,
    description: 'Pay with credit card',
  },
  {
    title: 'Wallet',
    value: 'wallet',
    icon: (isChecked: boolean) => <Wallet className={cn('h-5 w-5', isChecked ? 'text-primary' : '')} />,
    description: 'Pay with digital wallet',
  },
  {
    title: 'Bank Transfer',
    value: 'bank',
    icon: (isChecked: boolean) => <Banknote className={cn('h-5 w-5', isChecked ? 'text-primary' : '')} />,
    description: 'Direct bank transfer',
  },
];

// Items with icons and badges
const complexItems: RadioCardItem[] = [
  {
    title: 'Pro Plan',
    value: 'pro',
    icon: (isChecked: boolean) => <Zap className={cn('h-5 w-5', isChecked ? 'text-primary' : '')} />,
    description: 'Advanced features for power users',
    badge: {
      text: 'Popular',
      variant: 'default',
    },
  },
  {
    title: 'Business Plan',
    value: 'business',
    icon: (isChecked: boolean) => <Building className={cn('h-5 w-5', isChecked ? 'text-primary' : '')} />,
    description: 'Complete solution for businesses',
    badge: {
      text: 'New',
      variant: 'secondary',
    },
  },
  {
    title: 'Starter Plan',
    value: 'starter',
    icon: (isChecked: boolean) => <Star className={cn('h-5 w-5', isChecked ? 'text-primary' : '')} />,
    description: 'Basic features to get started',
  },
];

export default function DemoRadioCardGroup() {
  const [basicValue, setBasicValue] = useState('personal');
  const [iconValue, setIconValue] = useState('card');
  const [complexValue, setComplexValue] = useState('pro');
  const [deselectValue, setDeselectValue] = useState<string>('personal');

  const [noDescriptionValue, setNoDescriptionValue] = useState('medium');

  return (
    <div className='flex w-full flex-col gap-10'>
      {/* Items without Description */}
      <div className='flex flex-col gap-4'>
        <h3 className='text-lg font-semibold'>Without Descriptions</h3>
        <p className='text-sm text-gray-500'>
          Radio cards can be used without descriptions for a minimal look.
        </p>
        <RadioCardGroup
          items={noDescriptionItems}
          value={noDescriptionValue}
          onValueChange={setNoDescriptionValue}
        />
      </div>

      {/* Basic Usage */}
      <div className='flex flex-col gap-4'>
        <h3 className='text-lg font-semibold'>Basic Usage</h3>
        <p className='text-sm text-gray-500'>
          Standard radio card group with default styling.
        </p>
        <RadioCardGroup
          items={basicItems}
          value={basicValue}
          onValueChange={setBasicValue}
        />
      </div>

      {/* With Icons and Description in Title */}
      <div className='flex flex-col gap-4'>
        <h3 className='text-lg font-semibold'>
          With Icons & Description in Title
        </h3>
        <p className='text-sm text-gray-500'>
          Items can have icons, and descriptions can be placed inline with the
          title using <code>descriptionInTitle</code>.
        </p>
        <RadioCardGroup
          items={iconItems}
          value={iconValue}
          onValueChange={setIconValue}
          descriptionInTitle={true}
        />
      </div>

      {/* With Badges and Descriptions */}
      <div className='flex flex-col gap-4'>
        <h3 className='text-lg font-semibold'>With Badges</h3>
        <p className='text-sm text-gray-500'>
          Items can also include badges for status or emphasis.
        </p>
        <RadioCardGroup
          items={complexItems}
          value={complexValue}
          onValueChange={setComplexValue}
        />
      </div>

      {/* Basic Usage with Deselect */}
      <div className='flex flex-col gap-4'>
        <h3 className='text-lg font-semibold'>Allow Deselect</h3>
        <p className='text-sm text-gray-500'>
          Clicking the selected item will deselect it (returns empty string).
        </p>
        <RadioCardGroup
          items={basicItems}
          value={deselectValue}
          onValueChange={setDeselectValue}
          allowDeselect={true}
        />
      </div>

      {/* Disabled State */}
      <div className='flex flex-col gap-4'>
        <h3 className='text-lg font-semibold'>Disabled</h3>
        <RadioCardGroup
          items={basicItems}
          value='personal'
          onValueChange={() => {}}
          disabled={true}
        />
      </div>
    </div>
  );
}
