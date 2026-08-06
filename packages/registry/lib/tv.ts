import { tv as tvBase, type VariantProps } from 'tailwind-variants';
import { twMergeConfig } from '@/lib/happly-ui-utils';
export type { VariantProps, ClassValue } from 'tailwind-variants';

/**
 * Tailwind Variants wrapper with cn() for class merging
 * Re-exports tv and VariantProps from tailwind-variants
 */
const tv: typeof tvBase = (options, config) =>
  tvBase(options, {
    ...config,
    twMerge: true,
    twMergeConfig,
  });

export { tv };
