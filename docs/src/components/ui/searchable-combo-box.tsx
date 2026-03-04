'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { CustomInputWrapper } from '@/components/ui/custom-input-wrapper';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tag as TagPill, TagClose } from '@/components/ui/tag';
import { Tag, TagCategory } from '@/lib/tag-utils';
import { cn } from '@/lib/happly-ui-utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import { ReactElement, SVGProps } from 'react';
import { LanguageType, Translatable } from '@/lib/searchable-combo-box-utils';

// translation strings you'll need:
/* 
  // en:
  {
    _domain: {
      search: 'Search',
    },
    inputs: {
      tag_combobox: {
        noMatchesFound: 'No matches found',
        orAdd: ' or add yours',
        pressEnterToAdd: 'Press Enter to add what you typed',
      },
    }
  }
  // fr:
  {
    _domain: {
      search: 'Rechercher',
    },
    inputs: {
      tag_combobox: {
        noMatchesFound: 'Aucun résultat trouvé',
        orAdd: ' ou ajoutez-le',
        pressEnterToAdd: 'Appuyez sur Entrée pour ajouter ce que vous avez tapé',
      },
    },
  }
 */

interface SearchableMultiComboboxProps {
  allowAdding?: boolean;
  className?: string;
  disabled?: boolean;
  excludeTagSlugs?: string[];
  hasError?: boolean;
  icon?: React.ReactNode;
  isPreview?: boolean;
  max?: number;
  min?: number;
  placeholder?: string;
  selected: Tag[];
  selectedLang?: LanguageType;
  setSelected: (tags: Tag[]) => void;
  tag: TagCategory;
  customTagOptions?: Tag[]; // to convert FormOption to Tag, use value as id
  t: (key: string, params?: unknown) => string; // pass t from useI18n for stranslations
  useTags: ({
    tagCategory,
    enabled,
    excludeTagSlugs,
    prioritySlugs,
    translatable,
    customTagOptions,
  }: {
    tagCategory?: TagCategory | 'payment-features' | undefined;
    enabled?: boolean;
    excludeTagSlugs?: string[];
    prioritySlugs?: string[];
    translatable?: boolean;
    customTagOptions?: Tag[];
  }) => {
    tags:
      | {
          id: number;
          slug: string;
          label: string;
          category: TagCategory | string;
        }[]
      | undefined;
    status: 'loading' | 'error' | 'success' | 'pending';
  };
  usePortal?: boolean;
  popoverProps?: React.ComponentPropsWithoutRef<typeof PopoverContent>;
  onOpenChange?: (open: boolean) => void;
  selectAllLabel?: string;
}

const noMatchesFoundTranslatable: Translatable = {
  en: 'No matches found',
  fr: 'Aucun résultat trouvé',
};

const pressEnterToAddTranslatable: Translatable = {
  en: 'Press Enter to add what you typed',
  fr: 'Appuyez sur Entrée pour ajouter ce que vous avez tapé',
};

/**
 * @component SearchableMultiCombobox
 *
 * @description
 * Complete multi-select combo box with searchable features and an option
 * to permit ad-hoc creation. Supports API integration and localization.
 *
 * ⚠️ **MODAL INTEGRATION WARNING (Headless UI Dialogs)** ⚠️
 * When using this Combobox inside a strict FocusTrap or outside-click listener like
 * `@headlessui/react`'s `<Dialog>`, you might experience buggy behavior where the
 * dropdown gets trapped behind the modal or closes the modal unintentionally.
 *
 * **To safely use this Combobox inside a Headless UI `<Dialog>`:**
 *
 * 1. Disable the portal on this component:
 *    `<SearchableMultiCombobox usePortal={false}>`
 *
 * 2. Stop event propagation on the popover wrapper so Headless UI doesn't see "outside" clicks
 *    (note: you may or may not need this depending on your layout, but if interacting with the
 *    dropdown instantly dismisses your popover, passing this object avoids it):
 *    `<SearchableMultiCombobox
 *       popoverProps={{
 *         className: 'z-[300]', // bring it in front of the dialog
 *         onMouseDown: (e) => e.stopPropagation(),
 *         onMouseUp: (e) => e.stopPropagation(),
 *         onClick: (e) => e.stopPropagation(),
 *         onPointerDown: (e) => e.stopPropagation(),
 *         onPointerUp: (e) => e.stopPropagation(),
 *       }}
 *     >`
 *
 * 3. Give your Headless UI Dialog.Panel auto pointer events to overcome Radix's body lock:
 *    `<Dialog.Panel className="pointer-events-auto ...">`
 *
 * 4. Control Dialog close behavior using `onOpenChange` to debounce outside click closure logic.
 */
export function SearchableMultiCombobox({
  allowAdding,
  className = 'w-full',
  disabled,
  excludeTagSlugs,
  hasError = false,
  icon,
  isPreview,
  max = Infinity,
  min = 0,
  placeholder = '',
  selected,
  selectedLang = 'en',
  setSelected,
  tag,
  customTagOptions, // if tagOptions are passed, we're not fetching tags
  t,
  useTags,
  usePortal = true,
  popoverProps,
  onOpenChange,
  selectAllLabel,
  ..._props
}: SearchableMultiComboboxProps & React.InputHTMLAttributes<HTMLInputElement>) {
  let prioritySlugs;

  // Here we can force an order for the tags of different taggable categories
  if (tag === 'demographic' && !isPreview) {
    prioritySlugs = ['not-applied-to-me'];
  }

  const [open, setOpen] = React.useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };

  const { tags = [] } = useTags({
    tagCategory: tag,
    excludeTagSlugs,
    prioritySlugs,
    translatable: isPreview,
    customTagOptions:
      customTagOptions &&
      Array.isArray(customTagOptions) &&
      customTagOptions.length > 0
        ? customTagOptions
        : undefined,
  });

  const isTagSelected = (tag: Tag) =>
    selected.some((t: Tag) => t.slug === tag.slug);

  const handleToggle = (tag: Tag) => {
    if (isPreview) return;

    const isSelected = isTagSelected(tag);

    if (isSelected) {
      if (selected.length > min) {
        setSelected(selected.filter((t: Tag) => t.slug !== tag.slug));
      }
    } else {
      if (selected.length < max) {
        setSelected([...selected, tag]);
      }
    }
  };

  let sizedIcon: React.ReactNode = null;
  if (React.isValidElement(icon)) {
    const svgIcon = icon as ReactElement<SVGProps<SVGSVGElement>>;
    sizedIcon = React.cloneElement(svgIcon, {
      className: cn(
        'h-5 w-5 flex-shrink-0',
        svgIcon.props.className,
        'text-ds-soft-400'
      ),
    });
  }

  const recognizableTag =
    tag === 'demographic' ||
    tag === 'incorporation_type' ||
    tag === 'opportunity_type' ||
    tag === 'perk' ||
    tag === 'sector' ||
    tag === 'skill';

  // #region CommandInput placeholder
  const substringSearchForPreview = {
    en: 'Search ',
    fr: 'Rechercher ',
  }[selectedLang as 'en' | 'fr'];
  const substringTagCategory = customTagOptions
    ? ''
    : recognizableTag
      ? isPreview
        ? {
            en: {
              demographic: 'demographic',
              incorporation_type: 'incorporation type',
              opportunity_type: 'opportunity type',
              perk: 'perk',
              sector: 'sector',
              skill: 'skill',
            },
            fr: {
              demographic: 'démographique',
              incorporation_type: 'type d’incorporation',
              opportunity_type: 'type d’opportunité',
              perk: 'avantage',
              sector: 'secteur',
              skill: 'compétence',
            },
          }[selectedLang as 'en' | 'fr'][tag]
        : t(`_domain.tagCategory.${tag}`)
      : tag;
  const substringForAllowAdding = allowAdding
    ? isPreview
      ? {
          en: 'or add yours',
          fr: 'ou ajoutez-le',
        }[selectedLang as 'en' | 'fr']
      : t('inputs.tag_combobox.orAdd')
    : '';

  // 'Search <tagCategory>...' or 'Search <tagCategory> or add yours...'
  const commandInputPlaceholder: string = isPreview
    ? `${substringSearchForPreview}${substringTagCategory}${substringForAllowAdding}`
    : `${t('_domain.search')} ${substringTagCategory}${substringForAllowAdding}...`;
  // #endregion

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <ConditionalPopover
        isPreview={isPreview}
        open={open}
        onOpenChange={handleOpenChange}
      >
        <ConditionalPopoverTrigger isPreview={isPreview}>
          <CustomInputWrapper
            className={cn(
              'group flex h-10 cursor-pointer flex-row items-center gap-2 rounded-[10px] p-2 px-4'
            )}
            hasError={hasError}
          >
            {sizedIcon}
            <span
              className={cn(
                'inline grow truncate text-sm text-ds-soft-400 capitalize select-none group-hover:text-ds-neutral-600',
                isPreview ? ' ' : ''
              )}
            >
              {placeholder
                ? placeholder
                : `${t('_domain.select')} ${tag.split('_').join(' ')}`}
            </span>
            <ChevronsUpDown className='h-4 w-4 flex-shrink-0' />
          </CustomInputWrapper>
        </ConditionalPopoverTrigger>

        <ConditionalPopoverContent
          isPreview={isPreview}
          usePortal={usePortal}
          {...popoverProps}
        >
          <Command>
            <CommandInput placeholder={commandInputPlaceholder} />

            <CommandList>
              <CommandEmpty>
                <span className='text-ds-sub-600'>
                  {isPreview
                    ? `${noMatchesFoundTranslatable[selectedLang!]}${allowAdding ? `. ${pressEnterToAddTranslatable[selectedLang!]}` : ''}`
                    : `${t('inputs.tag_combobox.noMatchesFound')}${allowAdding ? `. ${t('inputs.tag_combobox.pressEnterToAdd')}` : ''}`}
                </span>
              </CommandEmpty>

              {tags.length > 0 && (
                <CommandGroup>
                  {tags.map((option) => {
                    const isSelected = isTagSelected(option as unknown as Tag);
                    const atMax = !isSelected && selected.length >= max;

                    return (
                      <CommandItem
                        key={crypto.randomUUID()}
                        onSelect={() =>
                          !atMax && handleToggle(option as unknown as Tag)
                        }
                        disabled={disabled || (atMax && !isSelected)}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            isSelected ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                        {isPreview
                          ? (option.label as Translatable)[selectedLang!]
                          : option.label}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </ConditionalPopoverContent>
      </ConditionalPopover>

      {!isPreview && selected.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {selectAllLabel &&
          tags.length > 0 &&
          selected.length === tags.length ? (
            <TagPill variant='stroke'>
              <span>{selectAllLabel}</span>
              <TagClose
                onClick={() => {
                  if (disabled) {
                    return;
                  }
                  setSelected([]);
                }}
                disabled={disabled}
              />
            </TagPill>
          ) : (
            selected.map((tag) => (
              <TagPill key={crypto.randomUUID()} variant='stroke'>
                <span>{tag.label}</span>
                <TagClose
                  onClick={() => {
                    if (disabled) {
                      return;
                    }
                    handleToggle(tag);
                  }}
                  disabled={disabled || selected.length <= min}
                />
              </TagPill>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function ConditionalPopover({
  isPreview,
  children,
  open,
  onOpenChange,
}: {
  isPreview: boolean | undefined;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (isPreview) {
    return <>{children}</>;
  }

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      {children}
    </Popover>
  );
}

function ConditionalPopoverTrigger({
  isPreview,
  children,
}: {
  isPreview: boolean | undefined;
  children: React.ReactNode;
}) {
  if (isPreview) {
    return <>{children}</>;
  }

  return <PopoverTrigger asChild>{children}</PopoverTrigger>;
}

function ConditionalPopoverContent({
  isPreview,
  children,
  usePortal = true,
  className,
  ...props
}: {
  isPreview: boolean | undefined;
  children: React.ReactNode;
  usePortal?: boolean;
  className?: string;
} & React.ComponentPropsWithoutRef<typeof PopoverContent>) {
  if (isPreview) {
    return (
      <div
        className={cn(
          'w-full rounded-12 border border-ds-soft-200 bg-popover p-0.5 text-popover-foreground shadow-regular-md outline-none',
          className
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <PopoverContent
      align='start'
      sideOffset={4}
      className={cn('mt-2 w-[--radix-popover-trigger-width] p-0', className)}
      usePortal={usePortal}
      {...props}
    >
      {children}
    </PopoverContent>
  );
}
