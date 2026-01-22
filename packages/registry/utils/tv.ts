import { tv as tvBase, type VariantProps } from "tailwind-variants";

import { cn } from "@/lib/utils";

/**
 * Tailwind Variants wrapper with cn() for class merging
 * Re-exports tv and VariantProps from tailwind-variants
 */
const tv: typeof tvBase = (options, config) =>
  tvBase(options, {
    ...config,
    twMerge: true,
    twMergeConfig: {
      classGroups: {
        "font-size": [{ text: ["xs", "sm", "base", "lg", "xl", "2xl"] }],
      },
    },
  });

export { tv, type VariantProps };
