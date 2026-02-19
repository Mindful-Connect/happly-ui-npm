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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: (key: string, params?: any) => string; // pass t from useI18n for stranslations
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
}

const noMatchesFoundTranslatable: Translatable = {
  en: 'No matches found',
  fr: 'Aucun résultat trouvé',
};

const pressEnterToAddTranslatable: Translatable = {
  en: 'Press Enter to add what you typed',
  fr: 'Appuyez sur Entrée pour ajouter ce que vous avez tapé',
};

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
  ..._props
}: SearchableMultiComboboxProps & React.InputHTMLAttributes<HTMLInputElement>) {
  let prioritySlugs;

  // Here we can force an order for the tags of different taggable categories
  if (tag === 'demographic' && !isPreview) {
    prioritySlugs = ['not-applied-to-me'];
  }

  const [open, setOpen] = React.useState(false);
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
        onOpenChange={setOpen}
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
                'text-ds-soft-400 group-hover:text-ds-neutral-600 inline flex-1 capitalize select-none',
                isPreview ? ' ' : ''
              )}
            >
              {placeholder ? placeholder : `${t('_domain.select')} ${tag}`}
            </span>
            <ChevronsUpDown className='h-4 w-4 flex-shrink-0' />
          </CustomInputWrapper>
        </ConditionalPopoverTrigger>

        <ConditionalPopoverContent isPreview={isPreview}>
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
                        key={option.slug}
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
          {selected.map((tag) => (
            <TagPill key={tag.id} variant='stroke'>
              <span className='ms-1'>{tag.label}</span>
              <TagClose
                onClick={() => handleToggle(tag)}
                disabled={disabled || selected.length <= min}
              />
            </TagPill>
          ))}
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
}: {
  isPreview: boolean | undefined;
  children: React.ReactNode;
}) {
  if (isPreview) {
    return (
      <div className='w-full rounded-12 border border-ds-soft-200 bg-popover p-0.5 text-popover-foreground shadow-regular-md outline-none'>
        {children}
      </div>
    );
  }

  return (
    <PopoverContent
      align='start'
      sideOffset={4}
      className='mt-2 w-[--radix-popover-trigger-width] p-0'
    >
      {children}
    </PopoverContent>
  );
}
