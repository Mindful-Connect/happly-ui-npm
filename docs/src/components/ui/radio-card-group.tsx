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
  icon?: (isChecked: boolean) => React.ReactNode;
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
  name,
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
  /** Prefix for id/htmlFor so multiple groups on the same page have unique ids (e.g. question.key). */
  name?: string;
  onValueChange: (value: string) => void;
}) {
  const idPrefix = name ? `${name}-` : '';
  return (
    <RadioGroup
      className={cn('', className)}
      value={value ?? ''}
      onValueChange={(v) => {
        onValueChange(v ?? '');
      }}
    >
      {items.map((item, index) => {
        const itemId = `${idPrefix}${item.value}`;
        const handleCardClick = (e: React.MouseEvent) => {
          if (disabled || item.readOnly) {
            e.preventDefault();
            return;
          }
          if (allowDeselect && value === item.value) {
            e.preventDefault();
            onValueChange('');
          }
        };
        return (
          <Label
            key={`${index}-${item.value}`}
            htmlFor={disabled || item.readOnly ? undefined : itemId}
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
            onClick={handleCardClick}
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

              <div className='flex flex-col gap-1'>
                <div className='flex gap-x-2'>
                  <div className='flex h-5 flex-wrap items-center gap-x-1.5'>
                    <span
                      className={cn(
                        'line-clamp-1 font-medium transition-colors duration-75',
                        disabled || item.readOnly
                          ? 'text-ds-neutral-600'
                          : 'text-ds-neutral-950'
                      )}
                    >
                      {item.title}
                    </span>
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
                      } as BadgeProps & { size?: string; colorVar?: string })}
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
              id={itemId}
              value={item.value}
              className='peer'
            />
          </Label>
        );
      })}
    </RadioGroup>
  );
}
