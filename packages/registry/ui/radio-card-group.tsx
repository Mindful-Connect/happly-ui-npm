'use client';

import { Badge, BadgeProps } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/happly-ui-utils';
import KeyIcon from '@/components/ui/key-icon';

export type RadioCardItem = {
  badge?: {
    colorVar: string;
    size: 'sm' | 'default';
    text: string;
  };
  description?: string;
  icon?: React.ReactNode;
  readOnly?: boolean;
  title: string;
  value: string;
};

// USING THIS INSIDE FORMIK <Form> COMPONENT CAUSES A BUG. JUST REMOVE THE <FORM> TAG FROM INSIDE THE <Formik> COMPONENT

export default function RadioCardGroup({
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
  allowDeselect?: boolean; // this component sets an empty string when deselecting. please handle in the parent
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
          onClick={() => {
            if (disabled || item.readOnly) return;
            if (allowDeselect && value === item.value) {
              onValueChange('');
              return;
            }
            onValueChange(item.value);
          }}
        >
          <div className={cn('flex', simpleIcons ? 'gap-2' : 'gap-[14px]')}>
            {!!item.icon &&
              (simpleIcons ? item.icon : <KeyIcon icon={item.icon} />)}

            <div className='flex flex-col gap-1'>
              <div className='flex gap-x-2'>
                <div className='flex flex-wrap items-center gap-x-1.5'>
                  <Label
                    htmlFor={item.value}
                    className={cn(
                      'line-clamp-1 font-medium transition-colors duration-75',
                      disabled || item.readOnly
                        ? 'text-ds-neutral-600'
                        : 'text-ds-neutral-950 cursor-pointer'
                    )}
                  >
                    {item.title}
                  </Label>
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
                  <Badge
                    {...({
                      size: item.badge.size,
                      colorVar: item.badge.colorVar,
                    } as any)}
                    className={disabled || item.readOnly ? 'opacity-50' : ''}
                  >
                    {item.badge.text}
                  </Badge>
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
