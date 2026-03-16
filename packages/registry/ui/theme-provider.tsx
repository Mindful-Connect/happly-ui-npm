'use client';

import * as React from 'react';

// ---------------------------------------------------------------------------
// Color math: hex ↔ sRGB ↔ linear RGB ↔ OKLab ↔ OKLCH
// Based on Björn Ottosson's OKLab specification.
// ---------------------------------------------------------------------------

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const n = h.length === 3
    ? [h[0]+h[0], h[1]+h[1], h[2]+h[2]]
    : [h.slice(0,2), h.slice(2,4), h.slice(4,6)];
  return [parseInt(n[0],16)/255, parseInt(n[1],16)/255, parseInt(n[2],16)/255];
}

function rgbToHex(r: number, g: number, b: number): string {
  const to = (c: number) => Math.round(Math.min(1, Math.max(0, c)) * 255)
    .toString(16).padStart(2, '0');
  return `#${to(r)}${to(g)}${to(b)}`;
}

function linearize(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function delinearize(c: number): number {
  const v = Math.min(1, Math.max(0, c));
  return v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
}

function rgbToOklch(r: number, g: number, b: number): [number, number, number] {
  const lr = linearize(r), lg = linearize(g), lb = linearize(b);

  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  const l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s);

  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
  const b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

  const C = Math.sqrt(a * a + b_ * b_);
  let H = Math.atan2(b_, a) * (180 / Math.PI);
  if (H < 0) H += 360;

  return [L, C, H];
}

function oklchToRgb(L: number, C: number, H: number): [number, number, number] {
  const hRad = (H * Math.PI) / 180;
  const a = C * Math.cos(hRad);
  const b = C * Math.sin(hRad);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  const r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bv = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

  return [delinearize(r), delinearize(g), delinearize(bv)];
}

// ---------------------------------------------------------------------------
// Scale generation
// ---------------------------------------------------------------------------

// Calibrated from HapplyUI's reference purple palette.
// Each entry: [targetLightness, chromaFactor]
const SCALE_MAP: Record<number, [number, number]> = {
  950: [0.32, 0.63],
  900: [0.35, 0.70],
  800: [0.41, 0.83],
  700: [0.46, 0.97],
  600: [0.52, 1.00],
  500: [0.58, 1.00],
  400: [0.64, 0.84],
  300: [0.73, 0.65],
  200: [0.84, 0.38],
  100: [0.89, 0.25],
  50:  [0.95, 0.12],
};

function clampToGamut(L: number, C: number, H: number): [number, number, number] {
  let lo = 0;
  let hi = C;
  let rgb = oklchToRgb(L, C, H);

  // If already in gamut, return immediately
  if (rgb.every((c) => c >= -0.001 && c <= 1.001)) {
    return [Math.min(1, Math.max(0, rgb[0])), Math.min(1, Math.max(0, rgb[1])), Math.min(1, Math.max(0, rgb[2]))];
  }

  // Binary search to find max chroma that stays in gamut
  for (let i = 0; i < 20; i++) {
    const mid = (lo + hi) / 2;
    rgb = oklchToRgb(L, mid, H);
    if (rgb.every((c) => c >= -0.001 && c <= 1.001)) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  rgb = oklchToRgb(L, lo, H);
  return [Math.min(1, Math.max(0, rgb[0])), Math.min(1, Math.max(0, rgb[1])), Math.min(1, Math.max(0, rgb[2]))];
}

interface GeneratedScale {
  raw: Record<string, string>;
  alpha: Record<string, string>;
  light: Record<string, string>;
  dark: Record<string, string>;
}

function generateScale(hex: string): GeneratedScale {
  const [r, g, b] = hexToRgb(hex);
  const [, baseC, baseH] = rgbToOklch(r, g, b);

  const raw: Record<string, string> = {};

  for (const [step, [targetL, chromaFactor]] of Object.entries(SCALE_MAP)) {
    const c = baseC * chromaFactor;
    const [cr, cg, cb] = clampToGamut(targetL, c, baseH);
    raw[step] = rgbToHex(cr, cg, cb);
  }

  // Alpha variants from the 500 step
  const base500 = raw['500'];
  const alpha: Record<string, string> = {
    '24': `${base500}3d`,
    '16': `${base500}29`,
    '10': `${base500}1a`,
  };

  // Light-mode semantic aliases
  const light: Record<string, string> = {
    base: raw['500'],
    dark: raw['800'],
    darker: raw['700'],
    light: raw['100'],
    lighter: raw['50'],
  };

  // Dark-mode semantic aliases
  const dark: Record<string, string> = {
    base: raw['400'],
    dark: raw['800'],
    darker: raw['700'],
    light: `${raw['500']}29`,   // alpha-16
    lighter: `${raw['500']}1a`, // alpha-10
  };

  return { raw, alpha, light, dark };
}

function buildCssVars(
  scale: GeneratedScale,
  isDark: boolean,
): Record<string, string> {
  const vars: Record<string, string> = {};

  // Raw scale (always set, mode-independent)
  for (const [step, hex] of Object.entries(scale.raw)) {
    vars[`--color-primary-${step}`] = hex;
  }

  // Alpha variants
  vars['--color-primary-alpha-24'] = scale.alpha['24'];
  vars['--color-primary-alpha-16'] = scale.alpha['16'];
  vars['--color-primary-alpha-10'] = scale.alpha['10'];

  // Semantic aliases (mode-dependent)
  const semantic = isDark ? scale.dark : scale.light;
  vars['--color-primary-base'] = semantic.base;
  vars['--color-primary-dark'] = semantic.dark;
  vars['--color-primary-darker'] = semantic.darker;
  vars['--color-primary-light'] = semantic.light;
  vars['--color-primary-lighter'] = semantic.lighter;

  return vars;
}

// ---------------------------------------------------------------------------
// Dark mode detection hook
// ---------------------------------------------------------------------------

type DarkModeStrategy = 'media' | 'class' | 'both';

function useDarkMode(strategy: DarkModeStrategy): boolean {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const cleanups: (() => void)[] = [];

    if (strategy === 'media' || strategy === 'both') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => setIsDark((prev) => {
        if (strategy === 'both') return e.matches || document.documentElement.classList.contains('dark');
        return e.matches;
      });
      setIsDark((prev) => {
        if (strategy === 'both') return mq.matches || document.documentElement.classList.contains('dark');
        return mq.matches;
      });
      mq.addEventListener('change', handler);
      cleanups.push(() => mq.removeEventListener('change', handler));
    }

    if (strategy === 'class' || strategy === 'both') {
      const check = () => document.documentElement.classList.contains('dark');
      setIsDark((prev) => {
        if (strategy === 'both') {
          return check() || window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return check();
      });
      const observer = new MutationObserver(() => {
        setIsDark((prev) => {
          if (strategy === 'both') {
            return check() || window.matchMedia('(prefers-color-scheme: dark)').matches;
          }
          return check();
        });
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });
      cleanups.push(() => observer.disconnect());
    }

    return () => cleanups.forEach((fn) => fn());
  }, [strategy]);

  return isDark;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const THEME_PROVIDER_ROOT_NAME = 'ThemeProviderRoot';

interface ThemeProviderRootProps extends React.ComponentPropsWithoutRef<'div'> {
  primaryColor: string;
  scope?: 'global' | 'scoped';
  darkMode?: DarkModeStrategy;
}

const ThemeProviderRoot = React.forwardRef<
  HTMLDivElement,
  ThemeProviderRootProps
>(
  (
    {
      primaryColor,
      scope = 'scoped',
      darkMode = 'media',
      style,
      children,
      ...rest
    },
    forwardedRef,
  ) => {
    const isDark = useDarkMode(darkMode);

    const scale = React.useMemo(() => generateScale(primaryColor), [primaryColor]);
    const cssVars = React.useMemo(() => buildCssVars(scale, isDark), [scale, isDark]);

    // Global mode: apply to :root via useEffect
    React.useEffect(() => {
      if (scope !== 'global') return;

      const root = document.documentElement;
      const keys = Object.keys(cssVars);
      for (const key of keys) {
        root.style.setProperty(key, cssVars[key]);
      }
      return () => {
        for (const key of keys) {
          root.style.removeProperty(key);
        }
      };
    }, [scope, cssVars]);

    if (scope === 'global') {
      return <>{children}</>;
    }

    return (
      <div
        ref={forwardedRef}
        style={{ ...cssVars, ...style } as React.CSSProperties}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
ThemeProviderRoot.displayName = THEME_PROVIDER_ROOT_NAME;

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { ThemeProviderRoot as Root, generateScale, buildCssVars };
