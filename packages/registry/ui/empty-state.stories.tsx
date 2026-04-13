import {
  RiAddLine,
  RiCalendarLine,
  RiFileList3Line,
  RiFolder5Line,
  RiInboxLine,
  RiSearchLine,
  RiUploadCloud2Line,
  RiUserAddLine,
} from '@remixicon/react';

import * as Button from './button';
import * as EmptyState from './empty-state';

export default {
  title: 'Feedback/Empty State',
};

export const Default = {
  render: () => (
    <EmptyState.Root bordered>
      <EmptyState.Icon icon={<RiUploadCloud2Line />} />
      <EmptyState.Description>
        You don&apos;t have any folder or file uploaded yet
      </EmptyState.Description>
      <EmptyState.Actions>
        <Button.Root size='xsmall' variant='neutral' mode='stroke'>
          <Button.Icon as={RiAddLine} />
          Add your first resource
        </Button.Root>
      </EmptyState.Actions>
    </EmptyState.Root>
  ),
};

export const WithTitle = {
  render: () => (
    <EmptyState.Root bordered>
      <EmptyState.Icon icon={<RiInboxLine />} />
      <div className='flex flex-col items-center gap-1'>
        <EmptyState.Title>No items yet</EmptyState.Title>
        <EmptyState.Description>
          Items you create will appear here. Get started by adding your first
          one.
        </EmptyState.Description>
      </div>
      <EmptyState.Actions>
        <Button.Root size='xsmall' variant='neutral' mode='stroke'>
          <Button.Icon as={RiAddLine} />
          Create item
        </Button.Root>
      </EmptyState.Actions>
    </EmptyState.Root>
  ),
};

export const SearchNoResults = {
  render: () => (
    <EmptyState.Root bordered>
      <EmptyState.Icon icon={<RiSearchLine />} />
      <div className='flex flex-col items-center gap-1'>
        <EmptyState.Title>No results found</EmptyState.Title>
        <EmptyState.Description>
          We couldn&apos;t find anything matching your search. Try different
          keywords or remove some filters.
        </EmptyState.Description>
      </div>
    </EmptyState.Root>
  ),
};

export const NoFiles = {
  render: () => (
    <EmptyState.Root bordered>
      <EmptyState.Icon icon={<RiFolder5Line />} />
      <div className='flex flex-col items-center gap-1'>
        <EmptyState.Title>No files uploaded</EmptyState.Title>
        <EmptyState.Description>
          Drag and drop files here, or click the button below to upload.
        </EmptyState.Description>
      </div>
      <EmptyState.Actions>
        <Button.Root size='xsmall' variant='neutral' mode='stroke'>
          <Button.Icon as={RiUploadCloud2Line} />
          Upload file
        </Button.Root>
      </EmptyState.Actions>
    </EmptyState.Root>
  ),
};

export const WithMultipleActions = {
  render: () => (
    <EmptyState.Root bordered>
      <EmptyState.Icon icon={<RiUserAddLine />} />
      <div className='flex flex-col items-center gap-1'>
        <EmptyState.Title>No team members</EmptyState.Title>
        <EmptyState.Description>
          Invite people to collaborate on this project together.
        </EmptyState.Description>
      </div>
      <EmptyState.Actions>
        <Button.Root size='xsmall' variant='neutral' mode='stroke'>
          Skip for now
        </Button.Root>
        <Button.Root size='xsmall'>
          <Button.Icon as={RiAddLine} />
          Invite member
        </Button.Root>
      </EmptyState.Actions>
    </EmptyState.Root>
  ),
};

export const Unbounded = {
  render: () => (
    <div className='border-stroke-soft-200 bg-bg-white-0 rounded-xl border p-5'>
      <EmptyState.Root>
        <EmptyState.Icon icon={<RiCalendarLine />} />
        <div className='flex flex-col items-center gap-1'>
          <EmptyState.Title>No upcoming events</EmptyState.Title>
          <EmptyState.Description>
            Your schedule is clear. Enjoy the free time or plan something new.
          </EmptyState.Description>
        </div>
      </EmptyState.Root>
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div className='flex flex-col gap-8'>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <EmptyState.Root key={size} size={size} bordered>
          <EmptyState.Icon
            size={size === 'sm' ? 'md' : size === 'md' ? 'lg' : 'xl'}
            icon={<RiFileList3Line />}
          />
          <div className='flex flex-col items-center gap-1'>
            <EmptyState.Title>Empty state — {size}</EmptyState.Title>
            <EmptyState.Description>
              This is the {size} size variant of the empty state component.
            </EmptyState.Description>
          </div>
          <EmptyState.Actions>
            <Button.Root
              size={size === 'lg' ? 'small' : 'xsmall'}
              variant='neutral'
              mode='stroke'
            >
              <Button.Icon as={RiAddLine} />
              Add item
            </Button.Root>
          </EmptyState.Actions>
        </EmptyState.Root>
      ))}
    </div>
  ),
};

export const Filled = {
  render: () => (
    <EmptyState.Root filled>
      <EmptyState.Icon icon={<RiInboxLine />} />
      <div className='flex flex-col items-center gap-1'>
        <EmptyState.Title>No items yet</EmptyState.Title>
        <EmptyState.Description>
          Items you create will appear here. Get started by adding your first
          one.
        </EmptyState.Description>
      </div>
      <EmptyState.Actions>
        <Button.Root size='xsmall' variant='neutral' mode='stroke'>
          <Button.Icon as={RiAddLine} />
          Create item
        </Button.Root>
      </EmptyState.Actions>
    </EmptyState.Root>
  ),
};

export const Composed = {
  render: () => (
    <EmptyState.Composed
      bordered
      icon={<RiUploadCloud2Line />}
      description="You don't have any folder or file uploaded yet"
      actions={
        <Button.Root size='xsmall' variant='neutral' mode='stroke'>
          <Button.Icon as={RiAddLine} />
          Add your first resource
        </Button.Root>
      }
    />
  ),
};
