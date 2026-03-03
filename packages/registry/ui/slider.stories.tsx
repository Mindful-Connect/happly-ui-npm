'use client';

import * as React from 'react';

import * as Slider from './slider';
import * as Tooltip from './tooltip';

export default { title: 'UI/Slider', component: Slider.Root };

export const Demo = {
  render: () => (
    <div className='w-full min-w-[320px] max-w-xs'>
      <Slider.Root defaultValue={[33]} max={100} step={1}>
        <Slider.Thumb />
      </Slider.Root>
    </div>
  ),
};

export const Variants = {
  render: () => (
    <div className='flex w-full min-w-[320px] max-w-xs flex-col gap-6'>
      <div className='flex flex-col gap-3'>
        <span className='text-subheading-xs text-text-sub-600'>Primary</span>
        <Slider.Root variant='primary' defaultValue={[50]} max={100} step={1}>
          <Slider.Thumb />
        </Slider.Root>
      </div>
      <div className='flex flex-col gap-3'>
        <span className='text-subheading-xs text-text-sub-600'>Neutral</span>
        <Slider.Root variant='neutral' defaultValue={[50]} max={100} step={1}>
          <Slider.Thumb />
        </Slider.Root>
      </div>
    </div>
  ),
};

export const Range = {
  render: () => (
    <div className='w-full min-w-[320px] max-w-xs'>
      <Slider.Root defaultValue={[300, 450]} min={0} max={600} step={1}>
        <Slider.Thumb />
        <Slider.Thumb />
      </Slider.Root>
    </div>
  ),
};

export const WithTooltip = {
  render: () => {
    const [value, setValue] = React.useState<number[]>([300, 450]);
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
      setIsOpen(true);
    }, []);

    const formatCurrency = (val: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(val);
    };

    return (
      <Tooltip.Provider>
      <div className='w-full min-w-[320px] max-w-xs'>
        <Slider.Root
          defaultValue={[300, 450]}
          min={0}
          max={600}
          step={1}
          onValueChange={(val) => {
            setValue(val);
          }}
        >
          <Tooltip.Root open={isOpen}>
            <Tooltip.Trigger asChild>
              <Slider.Thumb />
            </Tooltip.Trigger>
            <Tooltip.Content size='xsmall' side='top' forceMount>
              {formatCurrency(value[0] ?? 0)}
            </Tooltip.Content>
          </Tooltip.Root>
          <Tooltip.Root open={isOpen}>
            <Tooltip.Trigger asChild>
              <Slider.Thumb />
            </Tooltip.Trigger>
            <Tooltip.Content size='xsmall' side='top' forceMount>
              {formatCurrency(value[1] ?? 0)}
            </Tooltip.Content>
          </Tooltip.Root>
        </Slider.Root>
      </div>
      </Tooltip.Provider>
    );
  },
};
