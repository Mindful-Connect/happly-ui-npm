import {
  RiAddLine,
  RiCalendar2Line,
  RiComputerLine,
  RiDriveLine,
  RiFileList2Line,
  RiGlobeLine,
  RiLayoutGridLine,
  RiLinksLine,
  RiLogoutBoxRLine,
  RiPencilLine,
  RiPulseLine,
  RiRocketLine,
  RiSettings2Line,
} from '@remixicon/react';

import * as Avatar from './avatar';
import * as Badge from './badge';
import * as Button from './button';
import * as Divider from './divider';
import * as Dropdown from './dropdown';

export default { title: 'Overlays/Dropdown', component: Dropdown.Root };

export const Demo = {
  render: () => (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <Button.Root variant='neutral' mode='stroke'>
          Open Dropdown
        </Button.Root>
      </Dropdown.Trigger>
      <Dropdown.Content align='start'>
        <div className='flex items-center gap-3 p-2'>
          <Avatar.Root size='40' />
          <div className='flex-1'>
            <div className='text-label-sm text-text-strong-950'>Wei Chen</div>
            <div className='mt-1 text-paragraph-xs text-text-sub-600'>
              wei@alignui.com
            </div>
          </div>
          <Badge.Root variant='light' color='green' size='medium'>
            PRO
          </Badge.Root>
        </div>
        <Divider.Root variant='line-spacing' />
        <Dropdown.Group>
          <Dropdown.Item>
            <Dropdown.ItemIcon as={RiPulseLine} />
            Activity
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.ItemIcon as={RiLayoutGridLine} />
            Integrations
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.ItemIcon as={RiSettings2Line} />
            Settings
          </Dropdown.Item>
        </Dropdown.Group>
        <Divider.Root variant='line-spacing' />
        <Dropdown.Group>
          <Dropdown.Item>
            <Dropdown.ItemIcon as={RiAddLine} />
            Add Account
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.ItemIcon as={RiLogoutBoxRLine} />
            Logout
          </Dropdown.Item>
        </Dropdown.Group>
        <div className='p-2 text-paragraph-sm text-text-soft-400'>
          v.1.5.69 · Terms & Conditions
        </div>
      </Dropdown.Content>
    </Dropdown.Root>
  ),
};

export const SubMenu = {
  render: () => (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <Button.Root variant='neutral' mode='stroke'>
          Open
        </Button.Root>
      </Dropdown.Trigger>
      <Dropdown.Content align='start'>
        <Dropdown.Group>
          <Dropdown.Item>
            <Dropdown.ItemIcon as={RiAddLine} />
            New post creation
          </Dropdown.Item>
          <Dropdown.MenuSub>
            <Dropdown.MenuSubTrigger>
              <Dropdown.ItemIcon as={RiFileList2Line} />
              Template Options
            </Dropdown.MenuSubTrigger>
            <Dropdown.MenuSubContent>
              <Dropdown.Item>
                <Dropdown.ItemIcon as={RiPencilLine} />
                Draft Post
              </Dropdown.Item>
              <Dropdown.Item>
                <Dropdown.ItemIcon as={RiRocketLine} />
                Publish Now
              </Dropdown.Item>
              <Dropdown.Item>
                <Dropdown.ItemIcon as={RiCalendar2Line} />
                Schedule Post
              </Dropdown.Item>
            </Dropdown.MenuSubContent>
          </Dropdown.MenuSub>
        </Dropdown.Group>
        <Divider.Root variant='line-spacing' />
        <Dropdown.Group>
          <Dropdown.MenuSub>
            <Dropdown.MenuSubTrigger>
              <Dropdown.ItemIcon as={RiLinksLine} />
              Import Content from File
            </Dropdown.MenuSubTrigger>
            <Dropdown.MenuSubContent>
              <Dropdown.Item>
                <Dropdown.ItemIcon as={RiComputerLine} />
                Upload from Computer
              </Dropdown.Item>
              <Dropdown.Item>
                <Dropdown.ItemIcon as={RiGlobeLine} />
                Import from URL
              </Dropdown.Item>
            </Dropdown.MenuSubContent>
          </Dropdown.MenuSub>
          <Dropdown.Item>
            <Dropdown.ItemIcon as={RiDriveLine} />
            Import from Google Drive
          </Dropdown.Item>
        </Dropdown.Group>
      </Dropdown.Content>
    </Dropdown.Root>
  ),
};
