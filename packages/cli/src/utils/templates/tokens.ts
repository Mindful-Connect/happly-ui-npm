/**
 * HapplyUI Design Tokens — aligned with align-ui design system.
 *
 * Used by the v3 Tailwind config injector (tailwind.config.js extend).
 * For v4, tokens live in happly-theme.css via @theme block.
 */

export const texts = {
  'title-h1': [
    '3.5rem',
    {
      lineHeight: '4rem',
      letterSpacing: '-0.01em',
      fontWeight: '500',
    },
  ],
  'title-h2': [
    '3rem',
    {
      lineHeight: '3.5rem',
      letterSpacing: '-0.01em',
      fontWeight: '500',
    },
  ],
  'title-h3': [
    '2.5rem',
    {
      lineHeight: '3rem',
      letterSpacing: '-0.01em',
      fontWeight: '500',
    },
  ],
  'title-h4': [
    '2rem',
    {
      lineHeight: '2.5rem',
      letterSpacing: '-0.005em',
      fontWeight: '500',
    },
  ],
  'title-h5': [
    '1.5rem',
    {
      lineHeight: '2rem',
      letterSpacing: '0em',
      fontWeight: '500',
    },
  ],
  'title-h6': [
    '1.25rem',
    {
      lineHeight: '1.75rem',
      letterSpacing: '0em',
      fontWeight: '500',
    },
  ],
  'label-xl': [
    '1.5rem',
    {
      lineHeight: '2rem',
      letterSpacing: '-0.015em',
      fontWeight: '500',
    },
  ],
  'label-lg': [
    '1.125rem',
    {
      lineHeight: '1.5rem',
      letterSpacing: '-0.015em',
      fontWeight: '500',
    },
  ],
  'label-md': [
    '1rem',
    {
      lineHeight: '1.5rem',
      letterSpacing: '-0.011em',
      fontWeight: '500',
    },
  ],
  'label-sm': [
    '.875rem',
    {
      lineHeight: '1.25rem',
      letterSpacing: '-0.006em',
      fontWeight: '500',
    },
  ],
  'label-xs': [
    '.75rem',
    {
      lineHeight: '1rem',
      letterSpacing: '0em',
      fontWeight: '500',
    },
  ],
  'paragraph-xl': [
    '1.5rem',
    {
      lineHeight: '2rem',
      letterSpacing: '-0.015em',
      fontWeight: '400',
    },
  ],
  'paragraph-lg': [
    '1.125rem',
    {
      lineHeight: '1.5rem',
      letterSpacing: '-0.015em',
      fontWeight: '400',
    },
  ],
  'paragraph-md': [
    '1rem',
    {
      lineHeight: '1.5rem',
      letterSpacing: '-0.011em',
      fontWeight: '400',
    },
  ],
  'paragraph-sm': [
    '.875rem',
    {
      lineHeight: '1.25rem',
      letterSpacing: '-0.006em',
      fontWeight: '400',
    },
  ],
  'paragraph-xs': [
    '.75rem',
    {
      lineHeight: '1rem',
      letterSpacing: '0em',
      fontWeight: '400',
    },
  ],
  'paragraph-xxs': [
    '.688rem',
    {
      lineHeight: '.75rem',
      letterSpacing: '-0.007rem',
      fontWeight: '500',
    },
  ],
  'subheading-md': [
    '1rem',
    {
      lineHeight: '1.5rem',
      letterSpacing: '0.06em',
      fontWeight: '500',
    },
  ],
  'subheading-sm': [
    '.875rem',
    {
      lineHeight: '1.25rem',
      letterSpacing: '0.06em',
      fontWeight: '500',
    },
  ],
  'subheading-xs': [
    '.75rem',
    {
      lineHeight: '1rem',
      letterSpacing: '0.04em',
      fontWeight: '500',
    },
  ],
  'subheading-2xs': [
    '.6875rem',
    {
      lineHeight: '.75rem',
      letterSpacing: '0.02em',
      fontWeight: '500',
    },
  ],
  'doc-label': [
    '1.125rem',
    {
      lineHeight: '2rem',
      letterSpacing: '-0.015em',
      fontWeight: '500',
    },
  ],
  'doc-paragraph': [
    '1.125rem',
    {
      lineHeight: '2rem',
      letterSpacing: '-0.015em',
      fontWeight: '400',
    },
  ],
  inherit: 'inherit',
};

export const shadows = {
  'regular-xs': '0 1px 2px 0 #0a0d1408',
  'regular-sm': '0 2px 4px #1b1c1d0a',
  'regular-md': '0 16px 32px -12px #0e121b1a',

  'button-primary-focus':
    '0 0 0 2px var(--color-bg-white-0), 0 0 0 4px var(--color-primary-alpha-10)',
  'button-important-focus':
    '0 0 0 2px var(--color-bg-white-0), 0 0 0 4px var(--color-neutral-alpha-16)',
  'button-error-focus':
    '0 0 0 2px var(--color-bg-white-0), 0 0 0 4px var(--color-red-alpha-10)',
  'button-warning-focus':
    '0 0 0 2px var(--color-bg-white-0), 0 0 0 4px var(--color-orange-alpha-10)',
  'button-success-focus':
    '0 0 0 2px var(--color-bg-white-0), 0 0 0 4px var(--color-green-alpha-10)',

  'fancy-buttons-neutral': '0 1px 2px 0 #1b1c1d7a, 0 0 0 1px #242628',
  'fancy-buttons-primary':
    '0 1px 2px 0 #0e121b3d, 0 0 0 1px var(--color-primary-base)',
  'fancy-buttons-error':
    '0 1px 2px 0 #0e121b3d, 0 0 0 1px var(--color-error-base)',
  'fancy-buttons-stroke':
    '0 1px 3px 0 #0e121b1f, 0 0 0 1px var(--color-stroke-soft-200)',

  'toggle-switch': '0 6px 10px 0 #0e121b0f, 0 2px 4px 0 #0e121b08',
  'switch-thumb': '0 4px 8px 0 #1b1c1d0f, 0 2px 4px 0 #0e121b14',
  tooltip: '0 12px 24px 0 #0e121b0f, 0 1px 2px 0 #0e121b08',

  'custom-xs':
    '0 0 0 1px rgba(51, 51, 51, 0.04), 0 4px 8px -2px rgba(51, 51, 51, 0.06), 0 2px 4px rgba(51, 51, 51, 0.04), 0 1px 2px rgba(51, 51, 51, 0.04), inset 0 -1px 1px -0.5px rgba(51, 51, 51, 0.06)',
  'custom-sm':
    '0 0 0 1px rgba(51, 51, 51, 0.04), 0 16px 8px -8px rgba(51, 51, 51, 0.01), 0 12px 6px -6px rgba(51, 51, 51, 0.02), 0 5px 5px -2.5px rgba(51, 51, 51, 0.08), 0 1px 3px -1.5px rgba(51, 51, 51, 0.16), inset 0 -0.5px 0.5px rgba(51, 51, 51, 0.08)',
  'custom-md':
    '0 0 0 1px rgba(51, 51, 51, 0.04), 0 1px 1px 0.5px rgba(51, 51, 51, 0.04), 0 3px 3px -1.5px rgba(51, 51, 51, 0.02), 0 6px 6px -3px rgba(51, 51, 51, 0.04), 0 12px 12px -6px rgba(51, 51, 51, 0.04), 0 24px 24px -12px rgba(51, 51, 51, 0.04), 0 48px 48px -24px rgba(51, 51, 51, 0.04), inset 0 -1px 1px -0.5px rgba(51, 51, 51, 0.06)',
  'custom-lg':
    '0 0 0 1px rgba(51, 51, 51, 0.04), 0 1px 1px 0.5px rgba(51, 51, 51, 0.04), 0 3px 3px -1.5px rgba(51, 51, 51, 0.02), 0 6px 6px -3px rgba(51, 51, 51, 0.04), 0 12px 12px -6px rgba(51, 51, 51, 0.04), 0 24px 24px -12px rgba(51, 51, 51, 0.04), 0 48px 48px -24px rgba(51, 51, 51, 0.04), 0 96px 96px -32px rgba(51, 51, 51, 0.06), inset 0 -1px 1px -0.5px rgba(51, 51, 51, 0.06)',

  'complex-12':
    '0 80px 80px -40px rgba(23, 23, 23, 0.04), 0 48px 48px -24px rgba(23, 23, 23, 0.04)',
  complex:
    '0 20px 20px -10px rgba(23, 23, 23, 0.04), 0 10px 10px -5px rgba(23, 23, 23, 0.04), 0 6px 6px -3px rgba(23, 23, 23, 0.04), 0 3px 3px -1.5px rgba(23, 23, 23, 0.04), 0 1px 1px -0.5px rgba(23, 23, 23, 0.04), 0 0 0 1px rgba(23, 23, 23, 0.08), 0 -1px 1px -0.5px rgba(23, 23, 23, 0.06) inset',
  'complex-2':
    '0 10px 10px -5px rgba(23, 23, 23, 0.02), 0 6px 6px -3px rgba(23, 23, 23, 0.04), 0 3px 3px -1.5px rgba(23, 23, 23, 0.04), 0 1px 1px -0.5px rgba(23, 23, 23, 0.04), 0 0 0 1px rgba(23, 23, 23, 0.02)',
  'complex-4':
    '0 3px 3px -1.5px rgba(23, 23, 23, 0.04), 0 1px 1px -0.5px rgba(23, 23, 23, 0.04), 0 0 0 1px rgba(23, 23, 23, 0.02)',
  'complex-5':
    '0 0 6px 0 rgba(255, 255, 255, 0.24) inset, 0 40px 40px -20px rgba(23, 23, 23, 0.06), 0 10px 10px -5px rgba(23, 23, 23, 0.06), 0 6px 6px -3px rgba(23, 23, 23, 0.04), 0 3px 3px -1.5px rgba(23, 23, 23, 0.04), 0 1px 1px -0.5px rgba(23, 23, 23, 0.04)',
  'complex-6':
    '0 40px 40px -20px rgba(23, 23, 23, 0.06), 0 10px 10px -5px rgba(23, 23, 23, 0.06), 0 6px 6px -3px rgba(23, 23, 23, 0.04), 0 3px 3px -1.5px rgba(23, 23, 23, 0.04), 0 1px 1px -0.5px rgba(23, 23, 23, 0.04), 0 0 6px 0 rgba(255, 255, 255, 0.24) inset',
  'complex-7': '0 1px 2px 0 rgba(14, 18, 27, 0.24), 0 0 0 1px #335cff',
  'complex-8':
    '0 20px 20px -10px rgba(23, 23, 23, 0), 0 10px 10px -5px rgba(23, 23, 23, 0), 0 6px 6px -3px rgba(23, 23, 23, 0), 0 3px 3px -1.5px rgba(23, 23, 23, 0), 0 1px 1px -0.5px rgba(23, 23, 23, 0), 0 0 0 1px rgba(23, 23, 23, 0.08), 0 -1px 1px -0.5px rgba(23, 23, 23, 0.06) inset',
  'complex-9':
    '0 80px 40px -20px rgba(23, 23, 23, 0.06), 0 40px 40px -20px rgba(23, 23, 23, 0.06), 0 10px 10px -5px rgba(23, 23, 23, 0.06), 0 6px 6px -3px rgba(23, 23, 23, 0.04), 0 3px 3px -1.5px rgba(23, 23, 23, 0.04), 0 1px 1px -0.5px rgba(23, 23, 23, 0.04), 0 0 6px 0 rgba(255, 255, 255, 0.04) inset',
  'complex-10':
    '0 3px 3px -1.5px rgba(23, 23, 23, 0.04), 0 1px 1px -0.5px rgba(23, 23, 23, 0.04)',
  'complex-11':
    '0 -1px 1px -0.5px rgba(23, 23, 23, 0.06) inset, 0 20px 20px -10px rgba(23, 23, 23, 0.04), 0 10px 10px -5px rgba(23, 23, 23, 0.04), 0 6px 6px -3px rgba(23, 23, 23, 0.04), 0 3px 3px -1.5px rgba(23, 23, 23, 0.04), 0 1px 1px -0.5px rgba(23, 23, 23, 0.04), 0 0 0 1px rgba(23, 23, 23, 0.04)',

  'custom-input':
    '0 3px 3px -1.5px rgba(23, 23, 23, 0.04), 0 1px 1px -0.5px rgba(23, 23, 23, 0.04), 0 0 0 1px rgba(23, 23, 23, 0.08)',
  'custom-input-2':
    '0 3px 3px -1.5px rgba(23, 23, 23, 0.04), 0 1px 1px -0.5px rgba(23, 23, 23, 0.04), 0 0 0 1px var(--color-bg-soft-200)',
  'custom-input-4':
    '0 3px 3px -1.5px rgba(23, 23, 23, 0.06), 0 1px 1px -0.5px rgba(23, 23, 23, 0.06), 0 0 0 1px rgba(23, 23, 23, 0.02)',
  'custom-input-active':
    '0 6px 6px -3px rgba(23, 23, 23, 0.02), 0 3px 3px -1.5px rgba(23, 23, 23, 0.04), 0 1px 1px -0.5px rgba(23, 23, 23, 0.04), 0 0 0 1.4px #335cff',

  'gray-shadow': '0 0 0 1px rgba(23, 23, 23, 0.08)',
};

export const borderRadii = {
  '8': '0.5rem',
  '10': '0.625rem',
  '12': '0.75rem',
  '16': '1rem',
  '20': '1.25rem',
};

export const colors = {
  ds: {
    // Static
    'static-black': 'var(--color-static-black)',
    'static-white': 'var(--color-static-white)',

    // Bg and Text
    'strong-950': 'var(--color-text-strong-950)',
    'sub-600': 'var(--color-text-sub-600)',
    'soft-400': 'var(--color-text-soft-400)',
    'disabled-300': 'var(--color-text-disabled-300)',
    'surface-800': 'var(--color-bg-surface-800)',
    'sub-300': 'var(--color-bg-sub-300)',
    'soft-200': 'var(--color-bg-soft-200)',
    'weak-50': 'var(--color-bg-weak-50)',
    'white-0': 'var(--color-bg-white-0)',

    // Stroke
    'stroke-strong-950': 'var(--color-stroke-strong-950)',
    'stroke-sub-300': 'var(--color-stroke-sub-300)',
    'stroke-soft-200': 'var(--color-stroke-soft-200)',
    'stroke-white-0': 'var(--color-stroke-white-0)',

    // Primary
    'primary-dark': 'var(--color-primary-dark)',
    'primary-darker': 'var(--color-primary-darker)',
    'primary-base': 'var(--color-primary-base)',
    'primary-light': 'var(--color-primary-light)',
    'primary-lighter': 'var(--color-primary-lighter)',
    'primary-alpha-24': 'var(--color-primary-alpha-24)',
    'primary-alpha-20': 'var(--color-primary-alpha-20)',
    'primary-alpha-16': 'var(--color-primary-alpha-16)',
    'primary-alpha-10': 'var(--color-primary-alpha-10)',

    // Faded
    'faded-dark': 'var(--color-faded-dark)',
    'faded-base': 'var(--color-faded-base)',
    'faded-light': 'var(--color-faded-light)',
    'faded-lighter': 'var(--color-faded-lighter)',

    // Information
    'information-dark': 'var(--color-information-dark)',
    'information-base': 'var(--color-information-base)',
    'information-light': 'var(--color-information-light)',
    'information-lighter': 'var(--color-information-lighter)',

    // Warning
    'warning-dark': 'var(--color-warning-dark)',
    'warning-darker': 'var(--color-warning-darker)',
    'warning-base': 'var(--color-warning-base)',
    'warning-light': 'var(--color-warning-light)',
    'warning-lighter': 'var(--color-warning-lighter)',
    'warning-alpha-10': 'var(--color-warning-alpha-10)',

    // Error
    'error-darker': 'var(--color-error-darker)',
    'error-dark': 'var(--color-error-dark)',
    'error-base': 'var(--color-error-base)',
    'error-light': 'var(--color-error-light)',
    'error-lighter': 'var(--color-error-lighter)',
    'error-alpha-10': 'var(--color-error-alpha-10)',

    // Success
    'success-dark': 'var(--color-success-dark)',
    'success-darker': 'var(--color-success-darker)',
    'success-base': 'var(--color-success-base)',
    'success-light': 'var(--color-success-light)',
    'success-lighter': 'var(--color-success-lighter)',
    'success-alpha-10': 'var(--color-success-alpha-10)',

    // Away
    'away-dark': 'var(--color-away-dark)',
    'away-base': 'var(--color-away-base)',
    'away-light': 'var(--color-away-light)',
    'away-lighter': 'var(--color-away-lighter)',

    // Feature
    'feature-dark': 'var(--color-feature-dark)',
    'feature-base': 'var(--color-feature-base)',
    'feature-light': 'var(--color-feature-light)',
    'feature-lighter': 'var(--color-feature-lighter)',

    // Verified
    'verified-dark': 'var(--color-verified-dark)',
    'verified-base': 'var(--color-verified-base)',
    'verified-light': 'var(--color-verified-light)',
    'verified-lighter': 'var(--color-verified-lighter)',

    // Highlighted
    'highlighted-dark': 'var(--color-highlighted-dark)',
    'highlighted-base': 'var(--color-highlighted-base)',
    'highlighted-light': 'var(--color-highlighted-light)',
    'highlighted-lighter': 'var(--color-highlighted-lighter)',

    // Stable
    'stable-dark': 'var(--color-stable-dark)',
    'stable-base': 'var(--color-stable-base)',
    'stable-light': 'var(--color-stable-light)',
    'stable-lighter': 'var(--color-stable-lighter)',

    // Primary scale
    primary: {
      50: 'var(--color-primary-50)',
      100: 'var(--color-primary-100)',
      200: 'var(--color-primary-200)',
      300: 'var(--color-primary-300)',
      400: 'var(--color-primary-400)',
      500: 'var(--color-primary-500)',
      600: 'var(--color-primary-600)',
      700: 'var(--color-primary-700)',
      800: 'var(--color-primary-800)',
      900: 'var(--color-primary-900)',
      950: 'var(--color-primary-950)',
    },

    // Neutral scale
    neutral: {
      0: 'var(--color-neutral-0)',
      50: 'var(--color-neutral-50)',
      100: 'var(--color-neutral-100)',
      200: 'var(--color-neutral-200)',
      300: 'var(--color-neutral-300)',
      400: 'var(--color-neutral-400)',
      500: 'var(--color-neutral-500)',
      600: 'var(--color-neutral-600)',
      700: 'var(--color-neutral-700)',
      800: 'var(--color-neutral-800)',
      900: 'var(--color-neutral-900)',
      950: 'var(--color-neutral-950)',
    },

    // Alpha colors
    alpha: {
      neutral: {
        24: 'var(--color-neutral-alpha-24)',
        16: 'var(--color-neutral-alpha-16)',
        10: 'var(--color-neutral-alpha-10)',
      },
      blue: {
        24: 'var(--color-blue-alpha-24)',
        16: 'var(--color-blue-alpha-16)',
        10: 'var(--color-blue-alpha-10)',
      },
      orange: {
        24: 'var(--color-orange-alpha-24)',
        16: 'var(--color-orange-alpha-16)',
        10: 'var(--color-orange-alpha-10)',
      },
      red: {
        24: 'var(--color-red-alpha-24)',
        16: 'var(--color-red-alpha-16)',
        10: 'var(--color-red-alpha-10)',
      },
      green: {
        24: 'var(--color-green-alpha-24)',
        16: 'var(--color-green-alpha-16)',
        10: 'var(--color-green-alpha-10)',
      },
      yellow: {
        24: 'var(--color-yellow-alpha-24)',
        16: 'var(--color-yellow-alpha-16)',
        10: 'var(--color-yellow-alpha-10)',
      },
      purple: {
        24: 'var(--color-purple-alpha-24)',
        16: 'var(--color-purple-alpha-16)',
        10: 'var(--color-purple-alpha-10)',
      },
      sky: {
        24: 'var(--color-sky-alpha-24)',
        16: 'var(--color-sky-alpha-16)',
        10: 'var(--color-sky-alpha-10)',
      },
      pink: {
        24: 'var(--color-pink-alpha-24)',
        16: 'var(--color-pink-alpha-16)',
        10: 'var(--color-pink-alpha-10)',
      },
      teal: {
        24: 'var(--color-teal-alpha-24)',
        16: 'var(--color-teal-alpha-16)',
        10: 'var(--color-teal-alpha-10)',
      },
      black: {
        24: 'var(--color-black-alpha-24)',
        16: 'var(--color-black-alpha-16)',
        10: 'var(--color-black-alpha-10)',
      },
    },
    white: {
      24: 'var(--color-white-alpha-24)',
      16: 'var(--color-white-alpha-16)',
      10: 'var(--color-white-alpha-10)',
    },
  },

  // Semantic layer colors (non-prefixed — matches Tailwind v4 @theme auto-generation)
  // These enable classes like bg-bg-white-0, text-text-strong-950, ring-stroke-soft-200
  bg: {
    'strong-950': 'var(--color-bg-strong-950)',
    'surface-800': 'var(--color-bg-surface-800)',
    'sub-300': 'var(--color-bg-sub-300)',
    'soft-200': 'var(--color-bg-soft-200)',
    'soft-600': 'var(--color-bg-soft-600)',
    'weak-50': 'var(--color-bg-weak-50)',
    'weak-25': 'var(--color-bg-weak-25)',
    'white-0': 'var(--color-bg-white-0)',
  },
  text: {
    'strong-950': 'var(--color-text-strong-950)',
    'sub-600': 'var(--color-text-sub-600)',
    'soft-400': 'var(--color-text-soft-400)',
    'disabled-300': 'var(--color-text-disabled-300)',
    'white-0': 'var(--color-text-white-0)',
  },
  stroke: {
    'strong-950': 'var(--color-stroke-strong-950)',
    'sub-300': 'var(--color-stroke-sub-300)',
    'soft-200': 'var(--color-stroke-soft-200)',
    'white-0': 'var(--color-stroke-white-0)',
  },
  static: {
    black: 'var(--color-static-black)',
    white: 'var(--color-static-white)',
  },
  primary: {
    darker: 'var(--color-primary-darker)',
    dark: 'var(--color-primary-dark)',
    base: 'var(--color-primary-base)',
    light: 'var(--color-primary-light)',
    lighter: 'var(--color-primary-lighter)',
    'alpha-24': 'var(--color-primary-alpha-24)',
    'alpha-20': 'var(--color-primary-alpha-20)',
    'alpha-16': 'var(--color-primary-alpha-16)',
    'alpha-10': 'var(--color-primary-alpha-10)',
  },
  faded: {
    dark: 'var(--color-faded-dark)',
    base: 'var(--color-faded-base)',
    light: 'var(--color-faded-light)',
    lighter: 'var(--color-faded-lighter)',
  },
  information: {
    dark: 'var(--color-information-dark)',
    base: 'var(--color-information-base)',
    light: 'var(--color-information-light)',
    lighter: 'var(--color-information-lighter)',
  },
  warning: {
    darker: 'var(--color-warning-darker)',
    dark: 'var(--color-warning-dark)',
    base: 'var(--color-warning-base)',
    light: 'var(--color-warning-light)',
    lighter: 'var(--color-warning-lighter)',
    'alpha-10': 'var(--color-warning-alpha-10)',
  },
  error: {
    darker: 'var(--color-error-darker)',
    dark: 'var(--color-error-dark)',
    base: 'var(--color-error-base)',
    light: 'var(--color-error-light)',
    lighter: 'var(--color-error-lighter)',
    'alpha-10': 'var(--color-error-alpha-10)',
  },
  success: {
    darker: 'var(--color-success-darker)',
    dark: 'var(--color-success-dark)',
    base: 'var(--color-success-base)',
    light: 'var(--color-success-light)',
    lighter: 'var(--color-success-lighter)',
    'alpha-10': 'var(--color-success-alpha-10)',
  },
  away: {
    dark: 'var(--color-away-dark)',
    base: 'var(--color-away-base)',
    light: 'var(--color-away-light)',
    lighter: 'var(--color-away-lighter)',
  },
  feature: {
    dark: 'var(--color-feature-dark)',
    base: 'var(--color-feature-base)',
    light: 'var(--color-feature-light)',
    lighter: 'var(--color-feature-lighter)',
  },
  verified: {
    dark: 'var(--color-verified-dark)',
    base: 'var(--color-verified-base)',
    light: 'var(--color-verified-light)',
    lighter: 'var(--color-verified-lighter)',
  },
  highlighted: {
    dark: 'var(--color-highlighted-dark)',
    base: 'var(--color-highlighted-base)',
    light: 'var(--color-highlighted-light)',
    lighter: 'var(--color-highlighted-lighter)',
  },
  stable: {
    dark: 'var(--color-stable-dark)',
    base: 'var(--color-stable-base)',
    light: 'var(--color-stable-light)',
    lighter: 'var(--color-stable-lighter)',
  },
  neutral: {
    0: 'var(--color-neutral-0)',
    50: 'var(--color-neutral-50)',
    100: 'var(--color-neutral-100)',
    200: 'var(--color-neutral-200)',
    300: 'var(--color-neutral-300)',
    400: 'var(--color-neutral-400)',
    500: 'var(--color-neutral-500)',
    600: 'var(--color-neutral-600)',
    700: 'var(--color-neutral-700)',
    800: 'var(--color-neutral-800)',
    900: 'var(--color-neutral-900)',
    950: 'var(--color-neutral-950)',
  },
  overlay: {
    DEFAULT: 'var(--color-overlay)',
    gray: 'var(--color-overlay-gray)',
    slate: 'var(--color-overlay-slate)',
  },

  // Raw palette colors (hex) — for Tailwind v3 utility classes
  gray: {
    0: '#ffffff',
    50: '#f7f7f7',
    100: '#f5f5f5',
    200: '#ebebeb',
    300: '#d1d1d1',
    400: '#a3a3a3',
    500: '#7b7b7b',
    600: '#5c5c5c',
    700: '#333333',
    800: '#262626',
    900: '#1c1c1c',
    950: '#171717',
  },
  slate: {
    0: '#ffffff',
    50: '#f5f7fa',
    100: '#f2f5f8',
    200: '#eaecf0',
    300: '#cacfd8',
    400: '#99a0ae',
    500: '#717784',
    600: '#525866',
    700: '#2b303b',
    800: '#222530',
    900: '#181b25',
    950: '#0e121b',
  },
  blue: {
    50: '#ebf1ff',
    100: '#d5e2ff',
    200: '#c0d5ff',
    300: '#97baff',
    400: '#4d82ff',
    500: '#335cff',
    600: '#3559e9',
    700: '#2547d0',
    800: '#1f3bad',
    900: '#182f8b',
    950: '#122368',
  },
  orange: {
    50: '#fff3eb',
    100: '#ffe6d5',
    200: '#ffd9c0',
    300: '#ffc197',
    400: '#ffa468',
    500: '#fa7319',
    600: '#e16614',
    700: '#ce5e12',
    800: '#b75310',
    900: '#96440d',
    950: '#71330a',
  },
  red: {
    50: '#ffebec',
    100: '#ffd5d8',
    200: '#ffc0c5',
    300: '#ff97a0',
    400: '#ff6875',
    500: '#fb3748',
    600: '#e93544',
    700: '#d02533',
    800: '#ad1f2b',
    900: '#8b1822',
    950: '#681219',
  },
  green: {
    50: '#e3f7ec',
    100: '#d6f5e8',
    200: '#c2f5da',
    300: '#84ebb4',
    400: '#3ee089',
    500: '#1fc16b',
    600: '#1daf61',
    700: '#178c4e',
    800: '#1a7544',
    900: '#16643b',
    950: '#0b4627',
  },
  yellow: {
    50: '#fffaeb',
    100: '#ffefcc',
    200: '#ffecc0',
    300: '#ffe097',
    400: '#ffd268',
    500: '#f6b51e',
    600: '#e6a819',
    700: '#c99a2c',
    800: '#a78025',
    900: '#86661d',
    950: '#624c18',
  },
  purple: {
    50: '#efebff',
    100: '#dcd5ff',
    200: '#cac0ff',
    300: '#a897ff',
    400: '#8c71f6',
    500: '#7d52f4',
    600: '#693ee0',
    700: '#5b2cc9',
    800: '#4c25a7',
    900: '#3d1d86',
    950: '#351a75',
  },
  sky: {
    50: '#ebf8ff',
    100: '#d5f1ff',
    200: '#c0eaff',
    300: '#97dcff',
    400: '#68cdff',
    500: '#47c2ff',
    600: '#35ade9',
    700: '#2597d0',
    800: '#1f7ead',
    900: '#18658b',
    950: '#124b68',
  },
  pink: {
    50: '#ffebf4',
    100: '#ffd5ea',
    200: '#ffc0df',
    300: '#ff97cb',
    400: '#ff68b3',
    500: '#fb4ba3',
    600: '#e9358f',
    700: '#d0257a',
    800: '#ad1f66',
    900: '#8b1852',
    950: '#68123d',
  },
  teal: {
    50: '#e4fbf8',
    100: '#d0fbf5',
    200: '#c2f5ee',
    300: '#84ebdd',
    400: '#3fdec9',
    500: '#22d3bb',
    600: '#1daf9c',
    700: '#178c7d',
    800: '#1a7569',
    900: '#16645a',
    950: '#0b463e',
  },
};

export const fontFamilies = {
  thunder: [
    'var(--font-thunder)',
    'var(--font-inter)',
    'ui-sans-serif',
    'system-ui',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Noto Color Emoji"',
  ],
  sans: [
    'var(--font-inter)',
    'ui-sans-serif',
    'system-ui',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Noto Color Emoji"',
  ],
  ubuntu: ['var(--font-ubuntu)'],
  inter: ['var(--font-inter)', 'sans-serif'],
  poppins: ['Poppins', 'sans-serif'],
};

export const backgroundImage = {
  'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  'gradient-conic':
    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
};

export const screens = {
  xs: '480px',
  '1200px': '1200px',
  '3xl': '1920px',
  '4xl': '2560px',
  tall: { raw: '(min-height: 910px)' },
};

export const keyframes = {
  'accordion-down': {
    from: { height: '0' },
    to: { height: 'var(--radix-accordion-content-height)' },
  },
  'accordion-up': {
    from: { height: 'var(--radix-accordion-content-height)' },
    to: { height: '0' },
  },
  'spin-smooth': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  'copy-success': {
    '0%': { transform: 'scale(0.5)', opacity: '0' },
    '50%': { transform: 'scale(1.2)' },
    '100%': { transform: 'scale(1)', opacity: '1' },
  },
};

export const animations = {
  'accordion-down': 'accordion-down 0.2s ease-out',
  'accordion-up': 'accordion-up 0.2s ease-out',
  'spin-smooth': 'spin-smooth 1s linear infinite',
  'copy-success': 'copy-success 0.3s ease-out forwards',
};
