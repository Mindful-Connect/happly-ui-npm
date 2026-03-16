import { RiBuildingLine } from '@remixicon/react';

import * as Button from './button';
import * as FormField from './form-field';
import * as LogoUpload from './logo-upload';
import type { UploadFile } from '../hooks/use-file-upload';

export default { title: 'Form/File Upload/Logo Upload', component: LogoUpload.Root };

const mockCompletedFile: UploadFile = {
  id: '1',
  name: 'logo.png',
  size: 245000,
  type: 'image/png',
  progress: 100,
  status: 'completed',
  url: 'https://placehold.co/200x200/e2e8f0/475569?text=Logo',
  preview: 'https://placehold.co/200x200/e2e8f0/475569?text=Logo',
};

const mockUploadingFile: UploadFile = {
  id: '2',
  name: 'new-logo.png',
  size: 1200000,
  type: 'image/png',
  progress: 45,
  status: 'uploading',
};

const mockFailedFile: UploadFile = {
  id: '3',
  name: 'bad-logo.png',
  size: 5500000,
  type: 'image/png',
  progress: 0,
  status: 'failed',
  error: 'File exceeds maximum size of 3MB',
};

export const Default = {
  render: () => (
    <div className="w-[480px]">
      <LogoUpload.Root>
        <LogoUpload.Preview placeholderType="company" />
        <LogoUpload.Content>
          <div className="flex flex-col gap-2">
            <LogoUpload.Title>Business logo</LogoUpload.Title>
            <LogoUpload.Description>
              <p>Supports JPEG or PNG files (max 3MB).</p>
              <p>Use a horizontal image (16:9). Best size: 1200 × 675 px.</p>
            </LogoUpload.Description>
          </div>
          <LogoUpload.Actions>
            <Button.Root variant="neutral" mode="stroke" size="xsmall">
              Change
            </Button.Root>
          </LogoUpload.Actions>
        </LogoUpload.Content>
      </LogoUpload.Root>
    </div>
  ),
};

export const WithLogo = {
  render: () => (
    <div className="w-[480px]">
      <LogoUpload.Root>
        <LogoUpload.Preview file={mockCompletedFile} />
        <LogoUpload.Content>
          <div className="flex flex-col gap-2">
            <LogoUpload.Title>Business logo</LogoUpload.Title>
            <LogoUpload.Description>
              <p>Supports JPEG or PNG files (max 3MB).</p>
              <p>Use a horizontal image (16:9). Best size: 1200 × 675 px.</p>
            </LogoUpload.Description>
          </div>
          <LogoUpload.Actions>
            <Button.Root variant="neutral" mode="stroke" size="xsmall">
              Change
            </Button.Root>
          </LogoUpload.Actions>
        </LogoUpload.Content>
      </LogoUpload.Root>
    </div>
  ),
};

export const Uploading = {
  render: () => (
    <div className="w-[480px]">
      <LogoUpload.Root>
        <LogoUpload.Preview file={mockUploadingFile} />
        <LogoUpload.Content>
          <div className="flex flex-col gap-2">
            <LogoUpload.Title>Business logo</LogoUpload.Title>
            <LogoUpload.Description>
              <p>Uploading new-logo.png… 45%</p>
            </LogoUpload.Description>
          </div>
        </LogoUpload.Content>
      </LogoUpload.Root>
    </div>
  ),
};

export const Failed = {
  render: () => (
    <div className="w-[480px]">
      <LogoUpload.Root>
        <LogoUpload.Preview file={mockFailedFile} />
        <LogoUpload.Content>
          <div className="flex flex-col gap-2">
            <LogoUpload.Title>Business logo</LogoUpload.Title>
            <LogoUpload.Description>
              <p className="text-error-base">{mockFailedFile.error}</p>
            </LogoUpload.Description>
          </div>
          <LogoUpload.Actions>
            <Button.Root variant="error" mode="stroke" size="xsmall">
              Retry
            </Button.Root>
          </LogoUpload.Actions>
        </LogoUpload.Content>
      </LogoUpload.Root>
    </div>
  ),
};

export const CustomPreview = {
  render: () => (
    <div className="w-[480px]">
      <LogoUpload.Root>
        <LogoUpload.Preview
          placeholder={<RiBuildingLine className="size-[60px] text-[#B8ACF6]" />}
          avatarClassName="bg-[#EFEBFF] ring-[1.26px] ring-[rgba(14,18,27,0.1)]"
        />
        <LogoUpload.Content>
          <div className="flex flex-col gap-2">
            <LogoUpload.Title>Business logo</LogoUpload.Title>
            <LogoUpload.Description>
              <p>Supports JPEG or PNG files (max 3MB).</p>
              <p>Use a horizontal image (16:9). Best size: 1200 × 675 px.</p>
            </LogoUpload.Description>
          </div>
          <LogoUpload.Actions>
            <Button.Root variant="neutral" mode="stroke" size="xsmall">
              Change
            </Button.Root>
          </LogoUpload.Actions>
        </LogoUpload.Content>
      </LogoUpload.Root>
    </div>
  ),
};

export const UserAvatar = {
  render: () => (
    <div className="w-[480px]">
      <LogoUpload.Root>
        <LogoUpload.Preview placeholderType="user" />
        <LogoUpload.Content>
          <div className="flex flex-col gap-2">
            <LogoUpload.Title>Profile photo</LogoUpload.Title>
            <LogoUpload.Description>
              <p>Supports JPEG or PNG files (max 3MB).</p>
              <p>Use a square image. Best size: 400 × 400 px.</p>
            </LogoUpload.Description>
          </div>
          <LogoUpload.Actions>
            <Button.Root variant="neutral" mode="stroke" size="xsmall">
              Change
            </Button.Root>
          </LogoUpload.Actions>
        </LogoUpload.Content>
      </LogoUpload.Root>
    </div>
  ),
};

export const Composed = {
  render: () => (
    <div className="w-[480px]">
      <LogoUpload.Item
        label="Business logo"
        description={
          <>
            <p>Supports JPEG or PNG files (max 3MB).</p>
            <p>Use a horizontal image (16:9). Best size: 1200 × 675 px.</p>
          </>
        }
      />
    </div>
  ),
};

export const WithFormField = {
  render: () => (
    <div className="w-[480px] space-y-6">
      <FormField.Root label="Business logo" hint="Used on your public profile and invoices.">
        <LogoUpload.Item
          label="Upload a logo"
          description={
            <>
              <p>Supports JPEG or PNG files (max 3MB).</p>
              <p>Use a horizontal image (16:9). Best size: 1200 × 675 px.</p>
            </>
          }
        />
      </FormField.Root>

      <FormField.Root
        label="Business logo"
        error="Please upload a logo before continuing."
      >
        <LogoUpload.Item
          label="Upload a logo"
          description={<p>Supports JPEG or PNG files (max 3MB).</p>}
        />
      </FormField.Root>
    </div>
  ),
};

export const ComposedWithLogo = {
  render: () => (
    <div className="w-[480px]">
      <LogoUpload.Item
        file={mockCompletedFile}
        label="Business logo"
        description={
          <>
            <p>Supports JPEG or PNG files (max 3MB).</p>
            <p>Use a horizontal image (16:9). Best size: 1200 × 675 px.</p>
          </>
        }
      />
    </div>
  ),
};
