'use client';

import * as React from 'react';
import { RiSipLine } from '@remixicon/react';
import {
  Input as AriaInput,
  getColorChannels,
  parseColor,
} from 'react-aria-components';
import type { ColorSpace } from 'react-aria-components';

import * as Button from './button';
import * as ColorPicker from './color-picker';
import * as FormField from './form-field';
import * as Divider from './divider';
import * as Input from './input';
import * as Popover from './popover';
import * as Select from './select';

export default { title: 'Form/Color Picker', component: ColorPicker.Root };

function PlaygroundRender(args: any) {
  const [color, setColor] = React.useState(parseColor(args.defaultColor));

  return (
    <div className='bg-bg-white-0 shadow-regular-md ring-stroke-soft-200 flex w-[272px] flex-col gap-3 rounded-2xl p-4 ring-1 ring-inset'>
      <ColorPicker.Root value={color} onChange={setColor}>
        <ColorPicker.Area
          colorSpace='hsl'
          xChannel='saturation'
          yChannel='lightness'
        >
          <ColorPicker.Thumb className='ring-static-white' />
        </ColorPicker.Area>

        <ColorPicker.Slider colorSpace='hsl' channel='hue'>
          <ColorPicker.SliderTrack>
            <ColorPicker.Thumb className='top-1/2' />
          </ColorPicker.SliderTrack>
        </ColorPicker.Slider>

        <ColorPicker.Slider colorSpace='hsl' channel='alpha'>
          <ColorPicker.SliderTrack>
            <ColorPicker.Thumb className='top-1/2' />
          </ColorPicker.SliderTrack>
        </ColorPicker.Slider>
      </ColorPicker.Root>
    </div>
  );
}

export const Playground = {
  args: {
    defaultColor: 'hsl(228, 100%, 60%)',
  },
  argTypes: {
    defaultColor: { control: 'text' },
  },
  render: (args: any) => <PlaygroundRender {...args} />,
};

function EyeDropperButton() {
  return (
    <Button.Root
      size='xsmall'
      variant='neutral'
      mode='stroke'
      className='hover:[&:not(:focus-within)]:!ring-stroke-soft-200 rounded-r-none focus-visible:z-10'
      asChild
    >
      <ColorPicker.EyeDropperButton>
        <Button.Icon as={RiSipLine} />
      </ColorPicker.EyeDropperButton>
    </Button.Root>
  );
}

const colorSwatches = [
  '#717784',
  '#335CFF',
  '#FF8447',
  '#FB3748',
  '#1FC16B',
  '#F6B51E',
  '#7D52F4',
  '#47C2FF',
];

function ColorPickerPanel() {
  const [space, setSpace] = React.useState<ColorSpace | 'hex'>('hsl');

  return (
    <>
      <ColorPicker.Area
        colorSpace='hsl'
        xChannel='saturation'
        yChannel='lightness'
      >
        <ColorPicker.Thumb className='ring-static-white' />
      </ColorPicker.Area>

      <ColorPicker.Slider colorSpace='hsl' channel='hue'>
        <ColorPicker.SliderTrack>
          <ColorPicker.Thumb className='top-1/2' />
        </ColorPicker.SliderTrack>
      </ColorPicker.Slider>

      <ColorPicker.Slider colorSpace='hsl' channel='alpha'>
        <ColorPicker.SliderTrack>
          <ColorPicker.Thumb className='top-1/2' />
        </ColorPicker.SliderTrack>
      </ColorPicker.Slider>

      <div className='flex flex-col items-start gap-1'>
        <Select.Root
          value={space}
          onValueChange={(s) => setSpace(s as ColorSpace)}
          aria-label='Color space'
          variant='inline'
        >
          <Select.Trigger>
            <Select.Value />
          </Select.Trigger>
          <Select.Content aria-label='Color formats'>
            <Select.Item id='hex' value='hex'>
              HEX
            </Select.Item>
            <Select.Item id='rgb' value='rgb'>
              RGB
            </Select.Item>
            <Select.Item id='hsl' value='hsl'>
              HSL
            </Select.Item>
            <Select.Item id='hsb' value='hsb'>
              HSB
            </Select.Item>
          </Select.Content>
        </Select.Root>

        <div className='flex w-full -space-x-px'>
          <EyeDropperButton />
          <div className='flex -space-x-px'>
            {space === 'hex' ? (
              <Input.Root
                size='xsmall'
                className='hover:[&:not(:focus-within)]:before:!ring-stroke-soft-200 flex-[3] overflow-visible rounded-none focus-within:z-10'
                asChild
              >
                <ColorPicker.Field colorSpace='hsb'>
                  <Input.Wrapper className='px-0'>
                    <Input.Input className='text-center' asChild>
                      <AriaInput />
                    </Input.Input>
                  </Input.Wrapper>
                </ColorPicker.Field>
              </Input.Root>
            ) : (
              getColorChannels(space).map((channel) => (
                <Input.Root
                  key={channel}
                  size='xsmall'
                  className='hover:[&:not(:focus-within)]:before:!ring-stroke-soft-200 flex-1 overflow-visible rounded-none focus-within:z-10'
                  asChild
                >
                  <ColorPicker.Field colorSpace={space} channel={channel}>
                    <Input.Wrapper className='px-0'>
                      <Input.Input className='text-center' asChild>
                        <AriaInput aria-label={channel.toString()} />
                      </Input.Input>
                    </Input.Wrapper>
                  </ColorPicker.Field>
                </Input.Root>
              ))
            )}
            <Input.Root
              size='xsmall'
              className='hover:[&:not(:focus-within)]:before:!ring-stroke-soft-200 flex-1 overflow-visible rounded-l-none focus-within:z-10'
              asChild
            >
              <ColorPicker.Field channel='alpha'>
                <Input.Wrapper className='px-0'>
                  <Input.Input className='text-center' asChild>
                    <AriaInput aria-label='Alpha' />
                  </Input.Input>
                </Input.Wrapper>
              </ColorPicker.Field>
            </Input.Root>
          </div>
        </div>
      </div>

      <Divider.Root className='-mx-4 my-1 w-auto' />

      <div className='flex flex-col gap-2'>
        <div className='text-paragraph-xs text-text-sub-600'>
          Recommended colors
        </div>
        <ColorPicker.SwatchPicker>
          {colorSwatches.map((color) => (
            <ColorPicker.SwatchPickerItem key={color} color={color}>
              <ColorPicker.Swatch
                style={{
                  ['--tw-ring-color' as any]: color,
                }}
              />
            </ColorPicker.SwatchPickerItem>
          ))}
        </ColorPicker.SwatchPicker>
      </div>
    </>
  );
}

function DemoRender() {
  const [color, setColor] = React.useState(parseColor('hsl(228, 100%, 60%)'));

  return (
    <div className='bg-bg-white-0 shadow-regular-md ring-stroke-soft-200 flex w-[272px] flex-col gap-3 rounded-2xl p-4 ring-1 ring-inset'>
      <ColorPicker.Root value={color} onChange={setColor}>
        <ColorPickerPanel />
      </ColorPicker.Root>
    </div>
  );
}

export const Demo = {
  render: () => <DemoRender />,
};

function PopoverDemoRender() {
  const [color, setColor] = React.useState(parseColor('hsl(228, 100%, 60%)'));

  return (
    <ColorPicker.Root value={color} onChange={setColor}>
      <Popover.Root>
        <Popover.Trigger asChild>
          <Button.Root variant='neutral' mode='stroke'>
            <Button.Icon as={ColorPicker.Swatch} className='rounded' />
            Pick color
          </Button.Root>
        </Popover.Trigger>
        <Popover.Content className='bg-bg-white-0 shadow-regular-md ring-stroke-soft-200 flex w-[272px] flex-col gap-3 rounded-2xl p-4 ring-1 ring-inset'>
          <ColorPickerPanel />
        </Popover.Content>
      </Popover.Root>
    </ColorPicker.Root>
  );
}

export const PopoverDemo = {
  render: () => <PopoverDemoRender />,
};

function WithFormFieldRender() {
  const [color, setColor] = React.useState(parseColor('hsl(228, 100%, 60%)'));

  return (
    <FormField.Root label='Brand color' hint='Choose your brand primary color.'>
      <div className='bg-bg-white-0 shadow-regular-md ring-stroke-soft-200 flex w-[272px] flex-col gap-3 rounded-2xl p-4 ring-1 ring-inset'>
        <ColorPicker.Root value={color} onChange={setColor}>
          <ColorPicker.Area
            colorSpace='hsl'
            xChannel='saturation'
            yChannel='lightness'
          >
            <ColorPicker.Thumb className='ring-static-white' />
          </ColorPicker.Area>

          <ColorPicker.Slider colorSpace='hsl' channel='hue'>
            <ColorPicker.SliderTrack>
              <ColorPicker.Thumb className='top-1/2' />
            </ColorPicker.SliderTrack>
          </ColorPicker.Slider>
        </ColorPicker.Root>
      </div>
    </FormField.Root>
  );
}

export const WithFormField = {
  render: () => <WithFormFieldRender />,
};
