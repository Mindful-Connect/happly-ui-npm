import { createTV } from 'tailwind-variants';

import { twMergeConfig } from './happly-ui-utils';

export type { VariantProps, ClassValue } from 'tailwind-variants';

export const tv = createTV({
  twMergeConfig,
});
