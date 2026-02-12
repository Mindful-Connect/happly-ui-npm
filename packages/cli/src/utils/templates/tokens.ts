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
  'regular-deep':
    '0 0 0 1px rgba(14, 18, 27, 0.04), 0 1px 1px 0.5px rgba(14, 18, 27, 0.04), 0 3px 3px -1.5px rgba(14, 18, 27, 0.02), 0 6px 6px -3px rgba(14, 18, 27, 0.04), 0 12px 12px -6px rgba(14, 18, 27, 0.04), 0 24px 24px -12px rgba(14, 18, 27, 0.04), 0 48px 48px -24px rgba(14, 18, 27, 0.04), 0 -1px 1px -0.5px rgba(14, 18, 27, 0.06) inset',

  'toggle-switch':
    '0 6px 10px 0 rgba(14, 18, 27, 0.06), 0 2px 4px 0 rgba(14, 18, 27, 0.03)',
  'fancy-buttons-stroke':
    '0 1px 3px 0 rgba(14, 18, 27, 0.12), 0 0 0 1px var(--stroke-soft-200, #E1E4EA)',
  'button-primary-focus': [
    // use the correct theme path:
    '0 0 0 2px theme("colors.ds.white-0")',
    '0 0 0 4px theme("colors.ds.primary-alpha-10")',
  ].join(', '),

  'button-important-focus': [
    '0 0 0 2px theme("colors.ds.white-0")',
    '0 0 0 4px theme("colors.ds.alpha.neutral[16]")',
  ].join(', '),

  'button-error-focus': [
    '0 0 0 2px theme("colors.ds.white-0")',
    '0 0 0 4px theme("colors.ds.error-alpha-10")',
  ].join(', '),
};

export const borderRadii = {
  lg: 'var(--radius)',
  md: 'calc(var(--radius) - 2px)',
  sm: 'calc(var(--radius) - 4px)',
  '8': '0.5rem',
  '10': '.625rem',
  '12': '0.75rem',
  '16': '1rem',
  '20': '1.25rem',
};

export const colors = {
  primaryColor: 'rgb(var(--primary-color-rgb) / <alpha-value>)',
  primaryColorText: 'var(--primary-color-text)',
  secondaryColor: 'var(--secondary-color)',
  secondaryColorText: 'var(--secondary-color-text)',
  primaryBase: '#335CFF',
  turquoise: '#2aceb6',
  glitter: '#e4e9fe',
  clarity: {
    '0.1': '#484854',
    0: '#575759',
    1: '#7F7F82',
    2: '#95A0BC',
    3: '#B1B1C4',
    '3.5': '#CFCFD4',
    '3.75': '#D9D9E2',
    4: '#E6E6EC',
    5: '#F9FAFB',
    black: '#2f2f30',
    blue: {
      0: '#595782',
      25: '#F8F9FF',
      40: '#E6E6EC',
      50: '#E6ECFF',
    },
    bg: '#f5f6ff',
    bg2: '#F7F7FC',
    cyan: '#13B6E7',
    gray: '#9292A1',
    verified: '#1393E7',
    green: '#2AAF3C',
    pink: '#DD438E',
    purple: '#4A4DEE',
    red: '#FF472E',
    yellow: '#E9A91E',
    orange: '#FF8447',
  },
  ds: {
    // region "Happly UI Static"
    'static-black': 'var(--color-static-black)',
    'static-white': 'var(--color-static-white)',
    // endregion

    // region "Happly UI Bg and Text"
    'strong-950': 'var(--color-text-strong-950)',
    'sub-600': 'var(--color-text-sub-600)',
    'soft-400': 'var(--color-text-soft-400)',
    'disabled-300': 'var(--color-text-disabled-300)',
    'surface-800': 'var(--color-bg-surface-800)',
    'sub-300': 'var(--color-bg-sub-300)',
    'soft-200': 'var(--color-bg-soft-200)',
    'weak-50': 'var(--color-bg-weak-50)',
    'white-0': 'var(--color-bg-white-0)',
    // endregion

    // region "Happly UI Stroke"
    'stroke-strong-950': 'var(--color-stroke-strong-950)',
    'stroke-sub-300': 'var(--color-stroke-sub-300)',
    'stroke-soft-200': 'var(--color-stroke-soft-200)',
    'stroke-white-0': 'var(--color-stroke-white-0)',
    // endregion

    // region "Happly UI Primary"
    'primary-dark': 'var(--color-primary-dark)',
    'primary-darker': 'var(--color-primary-darker)',
    'primary-base': 'var(--color-primary-base)',
    'primary-light': 'var(--color-primary-light)',
    'primary-lighter': 'var(--color-primary-lighter)',
    'primary-alpha-24': 'var(--color-primary-alpha-24)',
    'primary-alpha-20': 'var(--color-primary-alpha-20)',
    'primary-alpha-16': 'var(--color-primary-alpha-16)',
    'primary-alpha-10': 'var(--color-primary-alpha-10)',
    // endregion

    // region "Happly UI Faded"
    'faded-dark': 'var(--color-faded-dark)',
    'faded-base': 'var(--color-faded-base)',
    'faded-light': 'var(--color-faded-light)',
    'faded-lighter': 'var(--color-faded-lighter)',
    // endregion

    // region "Happly UI Information"
    'information-dark': 'var(--color-information-dark)',
    'information-base': 'var(--color-information-base)',
    'information-light': 'var(--color-information-light)',
    'information-lighter': 'var(--color-information-lighter)',
    // endregion

    // region "Happly UI Warning"
    'warning-dark': 'var(--color-warning-dark)',
    'warning-base': 'var(--color-warning-base)',
    'warning-light': 'var(--color-warning-light)',
    'warning-lighter': 'var(--color-warning-lighter)',
    // endregion

    // region "Happly UI Error"
    'error-darker': 'var(--color-error-darker)',
    'error-dark': 'var(--color-error-dark)',
    'error-base': 'var(--color-error-base)',
    'error-light': 'var(--color-error-light)',
    'error-lighter': 'var(--color-error-lighter)',
    'error-alpha-10': 'var(--color-error-alpha-10)',
    // endregion

    // region "Happly UI Success"
    'success-dark': 'var(--color-success-dark)',
    'success-base': 'var(--color-success-base)',
    'success-light': 'var(--color-success-light)',
    'success-lighter': 'var(--color-success-lighter)',
    // endregion

    // region "Happly UI Away"
    'away-dark': 'var(--color-away-dark)',
    'away-base': 'var(--color-away-base)',
    'away-light': 'var(--color-away-light)',
    'away-lighter': 'var(--color-away-lighter)',
    // endregion

    // region "Happly UI Feature"
    'feature-dark': 'var(--color-feature-dark)',
    'feature-base': 'var(--color-feature-base)',
    'feature-light': 'var(--color-feature-light)',
    'feature-lighter': 'var(--color-feature-lighter)',
    // endregion

    // region "Happly UI Verified"
    'verified-dark': 'var(--color-verified-dark)',
    'verified-base': 'var(--color-verified-base)',
    'verified-light': 'var(--color-verified-light)',
    'verified-lighter': 'var(--color-verified-lighter)',
    // endregion

    // region "Happly UI Highlighted"
    'highlighted-dark': 'var(--color-highlighted-dark)',
    'highlighted-base': 'var(--color-highlighted-base)',
    'highlighted-light': 'var(--color-highlighted-light)',
    'highlighted-lighter': 'var(--color-highlighted-lighter)',
    // endregion

    // region "Happly UI Stable"
    'stable-dark': 'var(--color-stable-dark)',
    'stable-base': 'var(--color-stable-base)',
    'stable-light': 'var(--color-stable-light)',
    'stable-lighter': 'var(--color-stable-lighter)',
    // endregion

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
    neutral: {
      0: '#FFFFFF',
      50: '#F5F7FA',
      100: '#F2F5F8',
      200: '#E1E4EA',
      300: '#CACFD8',
      400: '#99A0AE',
      500: '#717784',
      600: '#525866',
      700: '#2B303B',
      800: '#222530',
      900: '#181B25',
      950: '#0E121B',
    },
    blue: {
      50: '#EBF1FF',
      100: '#D5E2FF',
      200: '#C0D5FF',
      300: '#97BAFF',
      400: '#6895FF',
      500: '#335CFF',
      600: '#3559E9',
      700: '#2547D0',
      800: '#1F3BAD',
      900: '#182F8B',
      950: '#122368',
    },
    orange: {
      50: '#FFF3EB',
      100: '#FFE6D5',
      200: '#FFD9C0',
      300: '#FFC197',
      400: '#FFA468',
      500: '#FF9147',
      600: '#E97D35',
      700: '#D06925',
      800: '#AD581F',
      900: '#8B4618',
      950: '#683412',
    },
    red: {
      50: '#FFEBEC',
      100: '#FFD5D8',
      200: '#FFC0C5',
      300: '#FF97A0',
      400: '#FF6875',
      500: '#FB3748',
      600: '#E93544',
      700: '#D02533',
      800: '#AD1F2B',
      900: '#8B1822',
      950: '#681219',
    },
    green: {
      50: '#E0FAEC',
      100: '#D0FBE9',
      200: '#C2F5DA',
      300: '#84EBB4',
      400: '#3EE089',
      500: '#1FC16B',
      600: '#1DAF61',
      700: '#178C4E',
      800: '#1A7544',
      900: '#16643B',
      950: '#0B4627',
    },
    yellow: {
      50: '#FFF4D6',
      100: '#FFEFCC',
      200: '#FFECC0',
      300: '#FFE097',
      400: '#FFD268',
      500: '#F6B51E',
      600: '#E6A819',
      700: '#C99A2C',
      800: '#A78025',
      900: '#86661D',
      950: '#624C18',
    },
    purple: {
      50: '#EFEBFF',
      100: '#DCD5FF',
      200: '#CAC0FF',
      300: '#A897FF',
      400: '#8C71F6',
      500: '#7D52F4',
      600: '#693EE0',
      700: '#5B2CC9',
      800: '#4C25A7',
      900: '#3D1D86',
      950: '#351A75',
    },
    sky: {
      50: '#EBF8FF',
      100: '#D5F1FF',
      200: '#C0EAFF',
      300: '#97DCFF',
      400: '#68CDFF',
      500: '#47C2FF',
      600: '#35ADE9',
      700: '#2597D0',
      800: '#1F7EAD',
      900: '#18658B',
      950: '#124B68',
    },
    pink: {
      50: '#FFEBF4',
      100: '#FFD5EA',
      200: '#FFC0DF',
      300: '#FF97CB',
      400: '#FF68B3',
      500: '#FB4BA3',
      600: '#E9358F',
      700: '#D0257A',
      800: '#AD1F66',
      900: '#8B1852',
      950: '#68123D',
    },
    teal: {
      50: '#E4FBF8',
      100: '#D0FBF5',
      200: '#C2F5EE',
      300: '#84EBDD',
      400: '#3FDEC9',
      500: '#22D3BB',
      600: '#1DAF9C',
      700: '#178C7D',
      800: '#1A7569',
      900: '#16645A',
      950: '#0B463E',
    },
    alpha: {
      neutral: {
        24: 'rgba(153, 160, 174, 0.24)',
        16: 'rgba(153, 160, 174, 0.16)',
        10: 'rgba(153, 160, 174, 0.10)',
      },
      blue: {
        24: 'rgba(71, 108, 255, 0.24)',
        16: 'rgba(71, 108, 255, 0.16)',
        10: 'rgba(71, 108, 255, 0.10)',
      },
      orange: {
        24: 'rgba(255, 145, 71, 0.24)',
        16: 'rgba(255, 145, 71, 0.16)',
        10: 'rgba(255, 145, 71, 0.10)',
      },
      red: {
        24: 'rgba(251, 55, 72, 0.24)',
        16: 'rgba(251, 55, 72, 0.16)',
        10: 'rgba(251, 55, 72, 0.10)',
      },
      green: {
        24: 'rgba(31, 193, 107, 0.24)',
        16: 'rgba(31, 193, 107, 0.16)',
        10: 'rgba(31, 193, 107, 0.10)',
      },
      yellow: {
        24: 'rgba(251, 198, 75, 0.24)',
        16: 'rgba(251, 198, 75, 0.16)',
        10: 'rgba(251, 198, 75, 0.10)',
      },
      purple: {
        24: 'rgba(120, 77, 239, 0.24)',
        16: 'rgba(120, 77, 239, 0.16)',
        10: 'rgba(120, 77, 239, 0.10)',
      },
      sky: {
        24: 'rgba(71, 194, 255, 0.24)',
        16: 'rgba(71, 194, 255, 0.16)',
        10: 'rgba(71, 194, 255, 0.10)',
      },
      pink: {
        24: 'rgba(251, 75, 163, 0.24)',
        16: 'rgba(251, 75, 163, 0.16)',
        10: 'rgba(251, 75, 163, 0.10)',
      },
      teal: {
        24: 'rgba(34, 211, 187, 0.24)',
        16: 'rgba(34, 211, 187, 0.16)',
        10: 'rgba(34, 211, 187, 0.10)',
      },
      black: {
        24: 'rgba(0, 0, 0, 0.24)',
        16: 'rgba(0, 0, 0, 0.16)',
        10: 'rgba(0, 0, 0, 0.10)',
      },
    },
    white: {
      16: 'rgba(255, 255, 255, 0.16)',
    },
  },
  overlay: {
    DEFAULT: 'rgb(var(--color-overlay))',
  },
};

export const semanticMappings = {
  // Static
  'static-black': '#171717',
  'static-white': 'var(--color-neutral-0)',

  // Text
  'text-strong-950': 'var(--color-neutral-950)',
  'text-sub-600': 'var(--color-neutral-600)',
  'text-soft-400': 'var(--color-neutral-400)',
  'text-disabled-300': 'var(--color-neutral-300)',
  'text-white-0': 'var(--color-neutral-0)',

  // Overlay
  overlay: '0 0 0 / 0.75',

  // Bg
  'bg-strong-950': 'var(--color-neutral-950)',
  'bg-surface-800': 'var(--color-neutral-800)',
  'bg-sub-300': 'var(--color-neutral-300)',
  'bg-soft-200': 'var(--color-neutral-200)',
  'bg-weak-50': 'var(--color-neutral-50)',
  'bg-white-0': 'var(--color-neutral-0)',

  // Stroke
  'stroke-strong-950': 'var(--color-neutral-950)',
  'stroke-sub-300': 'var(--color-neutral-300)',
  'stroke-soft-200': 'var(--color-neutral-200)',
  'stroke-white-0': 'var(--color-neutral-0)',

  // Primary
  'primary-darker': 'var(--color-blue-800)',
  'primary-dark': 'var(--color-blue-700)',
  'primary-base': 'var(--color-blue-500)',
  'primary-light': 'var(--color-blue-200)',
  'primary-lighter': 'var(--color-blue-100)',
  'primary-alpha-24': 'var(--color-blue-alpha-24)',
  'primary-alpha-20': 'var(--color-blue-alpha-20)',
  'primary-alpha-16': 'var(--color-blue-alpha-16)',
  'primary-alpha-10': 'var(--color-blue-alpha-10)',
  'primary-50': 'var(--color-blue-50)',
  'primary-100': 'var(--color-blue-100)',
  'primary-200': 'var(--color-blue-200)',
  'primary-300': 'var(--color-blue-300)',
  'primary-400': 'var(--color-blue-400)',
  'primary-500': 'var(--color-blue-500)',
  'primary-600': 'var(--color-blue-600)',
  'primary-700': 'var(--color-blue-700)',
  'primary-800': 'var(--color-blue-800)',
  'primary-900': 'var(--color-blue-900)',
  'primary-950': 'var(--color-blue-950)',

  // Faded
  'faded-dark': 'var(--color-neutral-800)',
  'faded-base': 'var(--color-neutral-500)',
  'faded-light': 'var(--color-neutral-200)',
  'faded-lighter': 'var(--color-neutral-100)',

  // Information
  'information-dark': 'var(--color-blue-950)',
  'information-base': 'var(--color-blue-500)',
  'information-light': 'var(--color-blue-200)',
  'information-lighter': 'var(--color-blue-50)',

  // Warning
  'warning-dark': 'var(--color-yellow-950)',
  'warning-base': 'var(--color-yellow-500)',
  'warning-light': 'var(--color-yellow-200)',
  'warning-lighter': 'var(--color-yellow-50)',

  // Error
  'error-darker': 'var(--color-red-950)',
  'error-dark': 'var(--color-red-700)',
  'error-base': 'var(--color-red-500)',
  'error-light': 'var(--color-red-200)',
  'error-lighter': 'var(--color-red-50)',
  'error-alpha-10': 'var(--color-red-alpha-10)',

  // Success
  'success-dark': 'var(--color-green-950)',
  'success-base': 'var(--color-green-500)',
  'success-light': 'var(--color-green-200)',
  'success-lighter': 'var(--color-green-50)',

  // Away
  'away-dark': 'var(--color-yellow-950)',
  'away-base': 'var(--color-yellow-500)',
  'away-light': 'var(--color-yellow-200)',
  'away-lighter': 'var(--color-yellow-50)',

  // Feature
  'feature-dark': 'var(--color-purple-950)',
  'feature-base': 'var(--color-purple-500)',
  'feature-light': 'var(--color-purple-200)',
  'feature-lighter': 'var(--color-purple-50)',

  // Verified
  'verified-dark': 'var(--color-sky-950)',
  'verified-base': 'var(--color-sky-500)',
  'verified-light': 'var(--color-sky-200)',
  'verified-lighter': 'var(--color-sky-50)',

  // Highlighted
  'highlighted-dark': 'var(--color-pink-950)',
  'highlighted-base': 'var(--color-pink-500)',
  'highlighted-light': 'var(--color-pink-200)',
  'highlighted-lighter': 'var(--color-pink-50)',

  // Stable
  'stable-dark': 'var(--color-teal-950)',
  'stable-base': 'var(--color-teal-500)',
  'stable-light': 'var(--color-teal-200)',
  'stable-lighter': 'var(--color-teal-50)',
};

export const baseSemanticColors = {
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  card: {
    DEFAULT: 'hsl(var(--card))',
    foreground: 'hsl(var(--card-foreground))',
  },
  popover: {
    DEFAULT: 'hsl(var(--popover))',
    foreground: 'hsl(var(--popover-foreground))',
  },
  primary: {
    DEFAULT: 'hsl(var(--primary))',
    foreground: 'hsl(var(--primary-foreground))',
  },
  secondary: {
    DEFAULT: 'hsl(var(--secondary))',
    foreground: 'hsl(var(--secondary-foreground))',
  },
  muted: {
    DEFAULT: 'hsl(var(--muted))',
    foreground: 'hsl(var(--muted-foreground))',
  },
  accent: {
    DEFAULT: 'hsl(var(--accent))',
    foreground: 'hsl(var(--accent-foreground))',
  },
  destructive: {
    DEFAULT: 'hsl(var(--destructive))',
    foreground: 'hsl(var(--destructive-foreground))',
  },
  border: 'hsl(var(--border))',
  input: 'hsl(var(--input))',
  ring: 'hsl(var(--ring))',
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
