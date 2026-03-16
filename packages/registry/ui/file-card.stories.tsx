import * as FileFormatIcon from './file-format-icon';
import * as FileCard from './file-card';

export default { title: 'Form/File Upload/File Card', component: FileCard.Root };

// ─── Default Variant: Upload States ─────────────────────────────────────────

export const UploadStates = {
  render: () => (
    <div className='flex w-full flex-col gap-6'>
      <FileCard.Root className='w-full'>
        <FileCard.Thumbnail>
          <FileFormatIcon.Root format='PDF' color='red' size='medium' />
        </FileCard.Thumbnail>
        <FileCard.Content>
          <FileCard.UploadBody>
            <FileCard.InfoGroup>
              <FileCard.Name>DataAnalysis.pdf</FileCard.Name>
              <FileCard.Status status='uploading'>Uploading...</FileCard.Status>
            </FileCard.InfoGroup>
            <FileCard.Progress value={10} />
          </FileCard.UploadBody>
          <FileCard.Actions>
            <FileCard.CloseButton />
          </FileCard.Actions>
        </FileCard.Content>
      </FileCard.Root>

      <FileCard.Root className='w-full'>
        <FileCard.Thumbnail>
          <FileFormatIcon.Root format='PDF' color='red' size='medium' />
        </FileCard.Thumbnail>
        <FileCard.Content>
          <FileCard.UploadBody>
            <FileCard.InfoGroup>
              <FileCard.Name>DataAnalysis.pdf</FileCard.Name>
              <FileCard.Status status='failed'>Failed</FileCard.Status>
            </FileCard.InfoGroup>
            <FileCard.RetryLink />
          </FileCard.UploadBody>
          <FileCard.Actions>
            <FileCard.RemoveButton />
          </FileCard.Actions>
        </FileCard.Content>
      </FileCard.Root>
    </div>
  ),
};

// ─── Default Variant: Completed Media Types ─────────────────────────────────

export const CompletedMediaTypes = {
  render: () => (
    <div className='flex w-full flex-col gap-6'>
      <FileCard.Root className='w-full'>
        <FileCard.Thumbnail>
          <FileFormatIcon.Root format='PDF' color='red' size='medium' />
        </FileCard.Thumbnail>
        <FileCard.Content>
          <FileCard.Body>
            <FileCard.Name>DataAnalysis.pdf</FileCard.Name>
            <FileCard.Meta>2.5 MB</FileCard.Meta>
            <FileCard.Hint>Uploaded on: June 5, 2023</FileCard.Hint>
          </FileCard.Body>
          <FileCard.Actions>
            <FileCard.RemoveButton />
          </FileCard.Actions>
        </FileCard.Content>
      </FileCard.Root>

      <FileCard.Root className='w-full'>
        <FileCard.Thumbnail className='bg-transparent'>
          <FileCard.Image src='https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=352&h=208&fit=crop' />
        </FileCard.Thumbnail>
        <FileCard.Content>
          <FileCard.Body>
            <FileCard.Name>Team_Photo_2025.jpg</FileCard.Name>
            <FileCard.Meta>2.5 MB</FileCard.Meta>
            <FileCard.Hint>
              Use a horizontal image (16:9). Best size: 1200 × 675 px.
            </FileCard.Hint>
          </FileCard.Body>
          <FileCard.Actions>
            <FileCard.RemoveButton />
          </FileCard.Actions>
        </FileCard.Content>
      </FileCard.Root>

      <FileCard.Root className='w-full'>
        <FileCard.Thumbnail className='bg-transparent'>
          <FileCard.Video src='https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=352&h=208&fit=crop' />
        </FileCard.Thumbnail>
        <FileCard.Content>
          <FileCard.Body>
            <FileCard.Name>Founder_Intro_Video.mp4</FileCard.Name>
            <FileCard.Meta>2.5 MB</FileCard.Meta>
            <FileCard.Hint>Uploaded on: June 5, 2023</FileCard.Hint>
          </FileCard.Body>
          <FileCard.Actions>
            <FileCard.RemoveButton />
          </FileCard.Actions>
        </FileCard.Content>
      </FileCard.Root>

      <FileCard.Root className='w-full'>
        <FileCard.Thumbnail>
          <FileCard.Audio />
        </FileCard.Thumbnail>
        <FileCard.Content>
          <FileCard.Body>
            <FileCard.Name>Podcast_Clip_Startup_Journey.mp3</FileCard.Name>
            <FileCard.Meta>2.5 MB</FileCard.Meta>
            <FileCard.Hint>Uploaded on: June 5, 2023</FileCard.Hint>
          </FileCard.Body>
          <FileCard.Actions>
            <FileCard.RemoveButton />
          </FileCard.Actions>
        </FileCard.Content>
      </FileCard.Root>
    </div>
  ),
};

// ─── Default Variant: Download ──────────────────────────────────────────────

export const Download = {
  render: () => (
    <div className='flex w-full flex-col gap-6'>
      <FileCard.Root className='w-full'>
        <FileCard.Thumbnail>
          <FileFormatIcon.Root format='PDF' color='red' size='medium' />
        </FileCard.Thumbnail>
        <FileCard.Content>
          <FileCard.Body>
            <FileCard.Name>DataAnalysis.pdf</FileCard.Name>
            <FileCard.Meta>2.5 MB</FileCard.Meta>
            <FileCard.Hint>Uploaded on: June 5, 2023</FileCard.Hint>
          </FileCard.Body>
          <FileCard.Actions>
            <FileCard.DownloadButton />
          </FileCard.Actions>
        </FileCard.Content>
      </FileCard.Root>

      <FileCard.Root className='w-full'>
        <FileCard.Thumbnail className='bg-transparent'>
          <FileCard.Image src='https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=352&h=208&fit=crop' />
        </FileCard.Thumbnail>
        <FileCard.Content>
          <FileCard.Body>
            <FileCard.Name>Team_Photo_2025.jpg</FileCard.Name>
            <FileCard.Meta>2.5 MB</FileCard.Meta>
          </FileCard.Body>
          <FileCard.Actions>
            <FileCard.DownloadButton />
          </FileCard.Actions>
        </FileCard.Content>
      </FileCard.Root>
    </div>
  ),
};

// ─── Compact Variant ────────────────────────────────────────────────────────

export const Compact = {
  render: () => (
    <div className='mx-auto flex w-[400px] flex-col gap-6'>
      <FileCard.CompactRoot>
        <FileCard.CompactContent>
          <FileFormatIcon.Root format='PDF' color='red' size='medium' />
          <FileCard.CompactBody>
            <FileCard.Name>my-cv.pdf</FileCard.Name>
            <FileCard.CompactDescription>
              <FileCard.Meta>0 KB of 120 KB</FileCard.Meta>
              <FileCard.Dot />
              <FileCard.CompactStatus status='uploading'>Uploading...</FileCard.CompactStatus>
            </FileCard.CompactDescription>
          </FileCard.CompactBody>
          <FileCard.CloseButton />
        </FileCard.CompactContent>
        <FileCard.Progress value={10} />
      </FileCard.CompactRoot>

      <FileCard.CompactRoot>
        <FileCard.CompactContent>
          <FileFormatIcon.Root format='PDF' color='red' size='medium' />
          <FileCard.CompactBody>
            <FileCard.Name>my-cv.pdf</FileCard.Name>
            <FileCard.CompactDescription>
              <FileCard.Meta>0 KB of 120 KB</FileCard.Meta>
              <FileCard.Dot />
              <FileCard.CompactStatus status='completed'>Completed</FileCard.CompactStatus>
            </FileCard.CompactDescription>
          </FileCard.CompactBody>
          <FileCard.DeleteButton />
        </FileCard.CompactContent>
      </FileCard.CompactRoot>

      <FileCard.CompactRoot error>
        <FileCard.CompactContent>
          <FileFormatIcon.Root format='PDF' color='red' size='medium' />
          <FileCard.CompactErrorBody>
            <FileCard.CompactBody>
              <FileCard.Name>my-cv.pdf</FileCard.Name>
              <FileCard.CompactDescription>
                <FileCard.Meta>0 KB of 120 KB</FileCard.Meta>
                <FileCard.Dot />
                <FileCard.CompactStatus status='failed'>Failed</FileCard.CompactStatus>
              </FileCard.CompactDescription>
            </FileCard.CompactBody>
            <FileCard.RetryLink />
          </FileCard.CompactErrorBody>
          <FileCard.DeleteButton />
        </FileCard.CompactContent>
      </FileCard.CompactRoot>
    </div>
  ),
};

// ─── Item Preset ────────────────────────────────────────────────────────────

export const Item = {
  render: () => (
    <div className='flex w-full flex-col gap-6'>
      <FileCard.Item
        file={{
          id: '1',
          name: 'DataAnalysis.pdf',
          size: 2621440,
          type: 'application/pdf',
          progress: 35,
          status: 'uploading',
        }}
        onClose={() => {}}
      />

      <FileCard.Item
        file={{
          id: '2',
          name: 'DataAnalysis.pdf',
          size: 2621440,
          type: 'application/pdf',
          progress: 0,
          status: 'failed',
          error: 'Network error',
        }}
        onRemove={() => {}}
        onRetry={() => {}}
      />

      <FileCard.Item
        file={{
          id: '3',
          name: 'DataAnalysis.pdf',
          size: 2621440,
          type: 'application/pdf',
          progress: 100,
          status: 'completed',
        }}
        onRemove={() => {}}
      />

      <FileCard.Item
        file={{
          id: '4',
          name: 'Team_Photo_2025.jpg',
          size: 2621440,
          type: 'image/jpeg',
          progress: 100,
          status: 'completed',
          preview: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=352&h=208&fit=crop',
        }}
        onRemove={() => {}}
      />
    </div>
  ),
};

// ─── Item Preset: Download ──────────────────────────────────────────────────

export const ItemDownload = {
  render: () => (
    <div className='flex w-full flex-col gap-6'>
      <FileCard.Item
        file={{
          id: '8',
          name: 'DataAnalysis.pdf',
          size: 2621440,
          type: 'application/pdf',
          progress: 100,
          status: 'completed',
        }}
        onDownload={() => {}}
      />

      <FileCard.Item
        file={{
          id: '9',
          name: 'Team_Photo_2025.jpg',
          size: 2621440,
          type: 'image/jpeg',
          progress: 100,
          status: 'completed',
          preview: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=352&h=208&fit=crop',
        }}
        onDownload={() => {}}
      />
    </div>
  ),
};

// ─── Item Preset: Compact ───────────────────────────────────────────────────

export const ItemCompact = {
  render: () => (
    <div className='mx-auto flex w-[400px] flex-col gap-6'>
      <FileCard.Item
        variant='compact'
        file={{
          id: '5',
          name: 'my-cv.pdf',
          size: 122880,
          type: 'application/pdf',
          progress: 10,
          status: 'uploading',
        }}
        onClose={() => {}}
      />

      <FileCard.Item
        variant='compact'
        file={{
          id: '6',
          name: 'my-cv.pdf',
          size: 122880,
          type: 'application/pdf',
          progress: 100,
          status: 'completed',
        }}
        onRemove={() => {}}
      />

      <FileCard.Item
        variant='compact'
        file={{
          id: '7',
          name: 'my-cv.pdf',
          size: 122880,
          type: 'application/pdf',
          progress: 0,
          status: 'failed',
          error: 'Upload failed',
        }}
        onRemove={() => {}}
        onRetry={() => {}}
      />
    </div>
  ),
};
