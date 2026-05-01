import * as ButtonGroup from './button-group';
import {
  RiBold,
  RiItalic,
  RiLayout2Line,
  RiLayoutGridLine,
  RiListCheck,
  RiUnderline,
} from '@remixicon/react';

export default { title: 'Actions/Button Group', component: ButtonGroup.Root };

export const Playground = {
  args: {
    size: 'small',
  },
  argTypes: {
    size: { control: 'select', options: ['small', 'xsmall', 'xxsmall'] },
  },
  render: (args: any) => (
    <ButtonGroup.Root {...args}>
      <ButtonGroup.Item>
        <ButtonGroup.Icon as={RiLayoutGridLine} />
        Grid view
      </ButtonGroup.Item>
      <ButtonGroup.Item>
        <ButtonGroup.Icon as={RiListCheck} />
        List view
      </ButtonGroup.Item>
      <ButtonGroup.Item>
        <ButtonGroup.Icon as={RiLayout2Line} />
        Gallery view
      </ButtonGroup.Item>
    </ButtonGroup.Root>
  ),
};

export const Default = {
  render: () => (
    <ButtonGroup.Root>
      <ButtonGroup.Item>
        <ButtonGroup.Icon as={RiLayoutGridLine} />
        Grid view
      </ButtonGroup.Item>
      <ButtonGroup.Item>
        <ButtonGroup.Icon as={RiListCheck} />
        List view
      </ButtonGroup.Item>
      <ButtonGroup.Item>
        <ButtonGroup.Icon as={RiLayout2Line} />
        Gallery view
      </ButtonGroup.Item>
    </ButtonGroup.Root>
  ),
};

// Icon-only: px-3 py-2 (12 horizontal, 8 vertical) per the Figma spec.
// Override icon's default -mx-2 (which is meant to hug an adjacent text
// label) so the icon sits in the full padded area.
export const IconsOnly = {
  render: () => (
    <ButtonGroup.Root>
      <ButtonGroup.Item className='px-3' aria-label='Bold'>
        <ButtonGroup.Icon as={RiBold} className='mx-0' />
      </ButtonGroup.Item>
      <ButtonGroup.Item className='px-3' aria-label='Italic'>
        <ButtonGroup.Icon as={RiItalic} className='mx-0' />
      </ButtonGroup.Item>
      <ButtonGroup.Item className='px-3' aria-label='Underline'>
        <ButtonGroup.Icon as={RiUnderline} className='mx-0' />
      </ButtonGroup.Item>
    </ButtonGroup.Root>
  ),
};

// Text-only: px-4 py-2 (16 horizontal, 8 vertical) — matches the default
// small variant's padding, so no overrides needed.
export const TextOnly = {
  render: () => (
    <ButtonGroup.Root>
      <ButtonGroup.Item>Day</ButtonGroup.Item>
      <ButtonGroup.Item>Week</ButtonGroup.Item>
      <ButtonGroup.Item>Month</ButtonGroup.Item>
    </ButtonGroup.Root>
  ),
};

export const Sizes = {
  render: () => (
    <div className='flex flex-col items-center gap-6'>
      <ButtonGroup.Root>
        <ButtonGroup.Item>
          <ButtonGroup.Icon as={RiLayoutGridLine} />
          Grid view
        </ButtonGroup.Item>
        <ButtonGroup.Item>
          <ButtonGroup.Icon as={RiListCheck} />
          List view
        </ButtonGroup.Item>
        <ButtonGroup.Item>
          <ButtonGroup.Icon as={RiLayout2Line} />
          Gallery view
        </ButtonGroup.Item>
      </ButtonGroup.Root>

      <ButtonGroup.Root size='xsmall'>
        <ButtonGroup.Item>
          <ButtonGroup.Icon as={RiLayoutGridLine} />
          Grid view
        </ButtonGroup.Item>
        <ButtonGroup.Item>
          <ButtonGroup.Icon as={RiListCheck} />
          List view
        </ButtonGroup.Item>
        <ButtonGroup.Item>
          <ButtonGroup.Icon as={RiLayout2Line} />
          Gallery view
        </ButtonGroup.Item>
      </ButtonGroup.Root>

      <ButtonGroup.Root size='xxsmall'>
        <ButtonGroup.Item>
          <ButtonGroup.Icon as={RiLayoutGridLine} />
          Grid view
        </ButtonGroup.Item>
        <ButtonGroup.Item>
          <ButtonGroup.Icon as={RiListCheck} />
          List view
        </ButtonGroup.Item>
        <ButtonGroup.Item>
          <ButtonGroup.Icon as={RiLayout2Line} />
          Gallery view
        </ButtonGroup.Item>
      </ButtonGroup.Root>
    </div>
  ),
};
