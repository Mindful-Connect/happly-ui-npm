'use client';

import * as React from 'react';
import {
  ColorArea as AriaColorArea,
  ColorAreaProps as AriaColorAreaProps,
  ColorField as AriaColorField,
  ColorPicker as AriaColorPicker,
  ColorSlider as AriaColorSlider,
  ColorSliderProps as AriaColorSliderProps,
  ColorSwatch as AriaColorSwatch,
  ColorSwatchPicker as AriaColorSwatchPicker,
  ColorSwatchPickerItem as AriaColorSwatchPickerItem,
  ColorSwatchPickerItemProps as AriaColorSwatchPickerItemProps,
  ColorSwatchPickerProps as AriaColorSwatchPickerProps,
  ColorSwatchProps as AriaColorSwatchProps,
  ColorThumb as AriaColorThumb,
  ColorThumbProps as AriaColorThumbProps,
  SliderTrack as AriaSliderTrack,
  SliderTrackProps as AriaSliderTrackProps,
  ColorPickerStateContext,
  composeRenderProps,
  parseColor,
} from 'react-aria-components';

import { cn } from '@/lib/happly-ui-utils';

const ColorField = AriaColorField;
const ColorPicker = AriaColorPicker;

function ColorSlider({ className, ...props }: AriaColorSliderProps) {
  return (
    <AriaColorSlider
      className={composeRenderProps(className, (className) =>
        cn('py-1', className)
      )}
      {...props}
    />
  );
}

function ColorArea({ className, ...props }: AriaColorAreaProps) {
  return (
    <AriaColorArea
      className={composeRenderProps(className, (className) =>
        cn('h-[232px] w-full rounded-lg', className)
      )}
      {...props}
    />
  );
}

function SliderTrack({ className, style, ...props }: AriaSliderTrackProps) {
  return (
    <AriaSliderTrack
      className={composeRenderProps(className, (className) =>
        cn('h-2 w-full rounded-full', className)
      )}
      style={({ defaultStyle }) => ({
        ...style,
        background: `${defaultStyle.background},
          repeating-conic-gradient(
            #fff 0 90deg,
            rgba(0,0,0,.3) 0 180deg)
          0% -25%/6px 6px`,
      })}
      {...props}
    />
  );
}

function ColorThumb({ className, ...props }: AriaColorThumbProps) {
  return (
    <AriaColorThumb
      className={composeRenderProps(className, (className) =>
        cn(
          'ring-stroke-white-0 z-50 h-3 w-3 rounded-full ring-2 outline-none',
          // 24×24 hit area around the 12px thumb (WCAG 2.5.8)
          'after:absolute after:top-1/2 after:left-1/2 after:size-6 after:-translate-x-1/2 after:-translate-y-1/2',
          'focus-visible:shadow-button-important-focus data-[focus-visible]:shadow-button-important-focus',
          className
        )
      )}
      {...props}
    />
  );
}

function ColorSwatchPicker({
  className,
  ...props
}: AriaColorSwatchPickerProps) {
  return (
    <AriaColorSwatchPicker
      className={composeRenderProps(className, (className) =>
        cn('flex w-full flex-wrap gap-1', className)
      )}
      {...props}
    />
  );
}

function ColorSwatchPickerItem({
  className,
  ...props
}: AriaColorSwatchPickerItemProps) {
  return (
    <AriaColorSwatchPickerItem
      className={composeRenderProps(className, (className) =>
        cn(
          // p-1 around the 16px swatch gives a 24×24 target
          'group/swatch-item cursor-pointer rounded-full p-1 outline-none',
          'focus-visible:shadow-button-important-focus data-[focus-visible]:shadow-button-important-focus',
          className
        )
      )}
      {...props}
    />
  );
}

function ColorSwatch({ className, style, ...props }: AriaColorSwatchProps) {
  return (
    <AriaColorSwatch
      className={composeRenderProps(className, (className) =>
        cn(
          'border-stroke-white-0 h-4 w-4 rounded-full group-data-[selected=true]/swatch-item:border-2 group-data-[selected=true]/swatch-item:ring-[1.5px]',
          className
        )
      )}
      style={({ defaultStyle }) => ({
        ...style,
        background: `${defaultStyle.background},
        repeating-conic-gradient(
          #fff 0 90deg,
          rgba(0,0,0,.3) 0 180deg)
        0% -25%/6px 6px`,
      })}
      {...props}
    />
  );
}

const EyeDropperButton = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ ...rest }, forwardedRef) => {
  const state = React.useContext(ColorPickerStateContext)!;

  // eslint-disable-next-line
  // @ts-ignore
  if (typeof EyeDropper === 'undefined') {
    return null;
  }

  return (
    <button
      ref={forwardedRef}
      type='button'
      aria-label='Pick a color from the screen'
      onClick={() => {
        // eslint-disable-next-line
        // @ts-ignore
        new EyeDropper()
          .open()
          .then((result: { sRGBHex: string }) =>
            state.setColor(parseColor(result.sRGBHex))
          );
      }}
      {...rest}
    />
  );
});
EyeDropperButton.displayName = 'EyeDropperButton';

export {
  ColorPicker as Root,
  ColorField as Field,
  ColorArea as Area,
  ColorSlider as Slider,
  SliderTrack,
  ColorThumb as Thumb,
  ColorSwatchPicker as SwatchPicker,
  ColorSwatchPickerItem as SwatchPickerItem,
  ColorSwatch as Swatch,
  EyeDropperButton,
};
