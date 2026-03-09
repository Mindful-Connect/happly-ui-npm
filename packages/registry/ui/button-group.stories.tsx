import * as ButtonGroup from './button-group';
import { RiLayout2Line, RiLayoutGridLine, RiListCheck } from '@remixicon/react';

export default { title: 'Actions/Button Group', component: ButtonGroup.Root };

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
