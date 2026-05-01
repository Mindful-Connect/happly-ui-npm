import clsx, { type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

export { type ClassValue } from 'clsx';

// AlignUI Typography Classes - Dynamic Pattern Matching

const typographyConfig = {
  title: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  label: ['xl', 'lg', 'md', 'sm', 'xs', '2xs'],
  paragraph: ['xl', 'lg', 'md', 'sm', 'xs'],
  subheading: ['md', 'sm', 'xs', '2xs'],
  doc: ['label', 'paragraph'],
};

const typographyPatterns = Object.entries(typographyConfig).flatMap(
  ([category, sizes]) => sizes.map((size) => `${category}-${size}`)
);

// Custom shadow tokens defined in the theme. Without registering these,
// tailwind-merge can't tell that e.g. `shadow-regular-xs` belongs to the same
// group as `shadow-none`, so conflicting overrides (variant `shadow-none` over
// base `shadow-regular-xs`) leave both classes and the CSS cascade picks the
// one declared later in the stylesheet — usually the wrong one.
const customShadows = [
  'regular-xs',
  'regular-sm',
  'regular-md',
  'regular-deep',
  'button-primary-focus',
  'button-important-focus',
  'button-error-focus',
  'button-warning-focus',
  'button-success-focus',
  'fancy-buttons-neutral',
  'fancy-buttons-primary',
  'fancy-buttons-error',
  'fancy-buttons-stroke',
  'toggle-switch',
  'switch-thumb',
  'tooltip',
  'custom-xs',
  'custom-sm',
  'custom-md',
  'custom-lg',
  'custom-input',
  'custom-input-2',
  'custom-input-4',
  'custom-input-active',
  'gray-shadow',
  'complex',
  'complex-2',
  'complex-4',
  'complex-5',
  'complex-6',
  'complex-7',
  'complex-8',
  'complex-9',
  'complex-10',
  'complex-11',
  'complex-12',
];

export const twMergeConfig = {
  extend: {
    classGroups: {
      'font-size': [
        {
          text: typographyPatterns,
        },
      ],
      shadow: [{ shadow: customShadows }],
    },
  },
};

const customTwMerge = extendTailwindMerge(twMergeConfig);

/**
 * Utilizes `clsx` with `tailwind-merge`, use in cases of possible class conflicts.
 */
export function cn(...classes: ClassValue[]) {
  return customTwMerge(clsx(...classes));
}

export type ObjectValues<T> = T[keyof T];
