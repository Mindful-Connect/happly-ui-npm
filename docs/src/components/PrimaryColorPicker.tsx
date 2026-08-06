'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { parseColor } from 'react-aria-components';
import type { Color } from 'react-aria-components';

import * as ColorPicker from '@/components/ui/color-picker';

const STORAGE_KEY = 'happly-docs-primary-color';
const DEFAULT_COLOR = '#7c3aed';

function colorToHex6(color: Color): string {
  const rgb = color.toFormat('rgb');
  const r = Math.round(rgb.getChannelValue('red'));
  const g = Math.round(rgb.getChannelValue('green'));
  const b = Math.round(rgb.getChannelValue('blue'));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export function usePrimaryColor() {
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setColor(saved);
    setMounted(true);
  }, []);

  const setPrimaryColor = useCallback((hex: string) => {
    setColor(hex);
    localStorage.setItem(STORAGE_KEY, hex);
  }, []);

  return { color, setPrimaryColor, mounted };
}

export function PrimaryColorPicker({
  color,
  onColorChange,
}: {
  color: string;
  onColorChange: (hex: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [pickerColor, setPickerColor] = useState<Color>(() =>
    parseColor(color).toFormat('hsb')
  );
  const lastExternalColor = useRef(color);

  // Only sync from parent when the color prop changes externally (not from our own onChange)
  useEffect(() => {
    if (color !== lastExternalColor.current) {
      lastExternalColor.current = color;
      try {
        setPickerColor(parseColor(color).toFormat('hsb'));
      } catch {
        // ignore invalid color
      }
    }
  }, [color]);

  const handleChange = (value: Color) => {
    setPickerColor(value);
    const hex = colorToHex6(value);
    lastExternalColor.current = hex;
    onColorChange(hex);
  };

  return (
    <div className='relative z-10'>
      <button
        type='button'
        onClick={() => setOpen(!open)}
        className='flex h-6 w-6 items-center justify-center rounded-lg shadow-md ring-1 shadow-black/5 ring-black/5 dark:ring-white/5 dark:ring-inset'
        aria-label='Pick primary color'
      >
        <span
          className='h-4 w-4 rounded-md'
          style={{ backgroundColor: color }}
        />
      </button>

      {open && (
        <>
          <div className='fixed inset-0 z-40' onClick={() => setOpen(false)} />
          <div className='absolute top-full right-0 z-50 mt-3 w-[240px] rounded-xl bg-white p-3 shadow-md ring-1 shadow-black/5 ring-black/5 dark:bg-slate-800 dark:ring-white/5'>
            <ColorPicker.Root value={pickerColor} onChange={handleChange}>
              <ColorPicker.Area
                colorSpace='hsb'
                xChannel='saturation'
                yChannel='brightness'
                className='!h-[160px]'
              >
                <ColorPicker.Thumb className='ring-static-white' />
              </ColorPicker.Area>

              <ColorPicker.Slider colorSpace='hsb' channel='hue'>
                <ColorPicker.SliderTrack>
                  <ColorPicker.Thumb className='top-1/2' />
                </ColorPicker.SliderTrack>
              </ColorPicker.Slider>

              <div className='mt-2 flex flex-wrap gap-1'>
                {[
                  '#7c3aed',
                  '#2563eb',
                  '#0891b2',
                  '#059669',
                  '#d97706',
                  '#dc2626',
                  '#db2777',
                  '#9333ea',
                ].map((hex) => (
                  <button
                    key={hex}
                    type='button'
                    className='h-5 w-5 rounded-full ring-1 ring-black/10 transition-transform hover:scale-110 dark:ring-white/10'
                    style={{ backgroundColor: hex }}
                    onClick={() => {
                      lastExternalColor.current = hex;
                      setPickerColor(parseColor(hex).toFormat('hsb'));
                      onColorChange(hex);
                    }}
                    aria-label={`Set primary color to ${hex}`}
                  />
                ))}
              </div>

              <button
                type='button'
                onClick={() => {
                  lastExternalColor.current = DEFAULT_COLOR;
                  setPickerColor(parseColor(DEFAULT_COLOR).toFormat('hsb'));
                  onColorChange(DEFAULT_COLOR);
                }}
                className='mt-2 w-full rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
              >
                Reset to default
              </button>
            </ColorPicker.Root>
          </div>
        </>
      )}
    </div>
  );
}
