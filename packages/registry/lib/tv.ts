import { createTV } from 'tailwind-variants';

import { twMergeConfig } from '@/lib/happly-ui-utils';

export type { VariantProps, ClassValue } from 'tailwind-variants';

export const tv = createTV({
  twMergeConfig,
});
