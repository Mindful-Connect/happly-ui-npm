import * as FileFormatIcon from './file-format-icon';
import * as FileUploadCard from './file-upload-card';

export default { title: 'Form/File Upload/File Upload Card', component: FileUploadCard.Root };

export const Uploading = {
  render: () => (
    <FileUploadCard.Root className='w-full'>
      <FileUploadCard.Thumbnail>
        <FileFormatIcon.Root format='PDF' color='red' size='medium' />
      </FileUploadCard.Thumbnail>
      <FileUploadCard.Content>
        <FileUploadCard.UploadBody>
          <FileUploadCard.InfoGroup>
            <FileUploadCard.Name>DataAnalysis.pdf</FileUploadCard.Name>
            <FileUploadCard.Status status='uploading'>Uploading...</FileUploadCard.Status>
          </FileUploadCard.InfoGroup>
          <FileUploadCard.Progress value={10} />
        </FileUploadCard.UploadBody>
        <FileUploadCard.Actions>
          <FileUploadCard.CloseButton />
        </FileUploadCard.Actions>
      </FileUploadCard.Content>
    </FileUploadCard.Root>
  ),
};

export const Failed = {
  render: () => (
    <FileUploadCard.Root className='w-full'>
      <FileUploadCard.Thumbnail>
        <FileFormatIcon.Root format='PDF' color='red' size='medium' />
      </FileUploadCard.Thumbnail>
      <FileUploadCard.Content>
        <FileUploadCard.UploadBody>
          <FileUploadCard.InfoGroup>
            <FileUploadCard.Name>DataAnalysis.pdf</FileUploadCard.Name>
            <FileUploadCard.Status status='failed'>Failed</FileUploadCard.Status>
          </FileUploadCard.InfoGroup>
          <FileUploadCard.RetryLink />
        </FileUploadCard.UploadBody>
        <FileUploadCard.Actions>
          <FileUploadCard.RemoveButton />
        </FileUploadCard.Actions>
      </FileUploadCard.Content>
    </FileUploadCard.Root>
  ),
};

export const CompletedDocument = {
  render: () => (
    <FileUploadCard.Root className='w-full'>
      <FileUploadCard.Thumbnail>
        <FileFormatIcon.Root format='PDF' color='red' size='medium' />
      </FileUploadCard.Thumbnail>
      <FileUploadCard.Content>
        <FileUploadCard.Body>
          <FileUploadCard.Name>DataAnalysis.pdf</FileUploadCard.Name>
          <FileUploadCard.Meta>2.5 MB</FileUploadCard.Meta>
          <FileUploadCard.Hint>Uploaded on: June 5, 2023</FileUploadCard.Hint>
        </FileUploadCard.Body>
        <FileUploadCard.Actions>
          <FileUploadCard.RemoveButton />
        </FileUploadCard.Actions>
      </FileUploadCard.Content>
    </FileUploadCard.Root>
  ),
};

export const CompletedImage = {
  render: () => (
    <FileUploadCard.Root className='w-full'>
      <FileUploadCard.Thumbnail className='bg-transparent'>
        <FileUploadCard.Image src='https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=352&h=208&fit=crop' />
      </FileUploadCard.Thumbnail>
      <FileUploadCard.Content>
        <FileUploadCard.Body>
          <FileUploadCard.Name>Team_Photo_2025.jpg</FileUploadCard.Name>
          <FileUploadCard.Meta>2.5 MB</FileUploadCard.Meta>
          <FileUploadCard.Hint>
            Use a horizontal image (16:9). Best size: 1200 × 675 px.
          </FileUploadCard.Hint>
        </FileUploadCard.Body>
        <FileUploadCard.Actions>
          <FileUploadCard.RemoveButton />
        </FileUploadCard.Actions>
      </FileUploadCard.Content>
    </FileUploadCard.Root>
  ),
};

export const CompletedVideo = {
  render: () => (
    <FileUploadCard.Root className='w-full'>
      <FileUploadCard.Thumbnail className='bg-transparent'>
        <FileUploadCard.Video src='https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=352&h=208&fit=crop' />
      </FileUploadCard.Thumbnail>
      <FileUploadCard.Content>
        <FileUploadCard.Body>
          <FileUploadCard.Name>Founder_Intro_Video.mp4</FileUploadCard.Name>
          <FileUploadCard.Meta>2.5 MB</FileUploadCard.Meta>
          <FileUploadCard.Hint>Uploaded on: June 5, 2023</FileUploadCard.Hint>
        </FileUploadCard.Body>
        <FileUploadCard.Actions>
          <FileUploadCard.RemoveButton />
        </FileUploadCard.Actions>
      </FileUploadCard.Content>
    </FileUploadCard.Root>
  ),
};

export const CompletedAudio = {
  render: () => (
    <FileUploadCard.Root className='w-full'>
      <FileUploadCard.Thumbnail>
        <FileUploadCard.Audio />
      </FileUploadCard.Thumbnail>
      <FileUploadCard.Content>
        <FileUploadCard.Body>
          <FileUploadCard.Name>Podcast_Clip_Startup_Journey.mp3</FileUploadCard.Name>
          <FileUploadCard.Meta>2.5 MB</FileUploadCard.Meta>
          <FileUploadCard.Hint>Uploaded on: June 5, 2023</FileUploadCard.Hint>
        </FileUploadCard.Body>
        <FileUploadCard.Actions>
          <FileUploadCard.RemoveButton />
        </FileUploadCard.Actions>
      </FileUploadCard.Content>
    </FileUploadCard.Root>
  ),
};

// ─── Compact Variant Stories ────────────────────────────────────────────────

export const CompactUploading = {
  render: () => (
    <FileUploadCard.CompactRoot className='w-[400px]'>
      <FileUploadCard.CompactContent>
        <FileFormatIcon.Root format='PDF' color='red' size='medium' />
        <FileUploadCard.CompactBody>
          <FileUploadCard.Name>my-cv.pdf</FileUploadCard.Name>
          <FileUploadCard.CompactDescription>
            <FileUploadCard.Meta>0 KB of 120 KB</FileUploadCard.Meta>
            <FileUploadCard.Dot />
            <FileUploadCard.CompactStatus status='uploading'>Uploading...</FileUploadCard.CompactStatus>
          </FileUploadCard.CompactDescription>
        </FileUploadCard.CompactBody>
        <FileUploadCard.CloseButton />
      </FileUploadCard.CompactContent>
      <FileUploadCard.Progress value={10} />
    </FileUploadCard.CompactRoot>
  ),
};

export const CompactCompleted = {
  render: () => (
    <FileUploadCard.CompactRoot className='w-[400px]'>
      <FileUploadCard.CompactContent>
        <FileFormatIcon.Root format='PDF' color='red' size='medium' />
        <FileUploadCard.CompactBody>
          <FileUploadCard.Name>my-cv.pdf</FileUploadCard.Name>
          <FileUploadCard.CompactDescription>
            <FileUploadCard.Meta>0 KB of 120 KB</FileUploadCard.Meta>
            <FileUploadCard.Dot />
            <FileUploadCard.CompactStatus status='completed'>Completed</FileUploadCard.CompactStatus>
          </FileUploadCard.CompactDescription>
        </FileUploadCard.CompactBody>
        <FileUploadCard.DeleteButton />
      </FileUploadCard.CompactContent>
    </FileUploadCard.CompactRoot>
  ),
};

export const CompactFailed = {
  render: () => (
    <FileUploadCard.CompactRoot error className='w-[400px]'>
      <FileUploadCard.CompactContent>
        <FileFormatIcon.Root format='PDF' color='red' size='medium' />
        <FileUploadCard.CompactErrorBody>
          <FileUploadCard.CompactBody>
            <FileUploadCard.Name>my-cv.pdf</FileUploadCard.Name>
            <FileUploadCard.CompactDescription>
              <FileUploadCard.Meta>0 KB of 120 KB</FileUploadCard.Meta>
              <FileUploadCard.Dot />
              <FileUploadCard.CompactStatus status='failed'>Failed</FileUploadCard.CompactStatus>
            </FileUploadCard.CompactDescription>
          </FileUploadCard.CompactBody>
          <FileUploadCard.RetryLink />
        </FileUploadCard.CompactErrorBody>
        <FileUploadCard.DeleteButton />
      </FileUploadCard.CompactContent>
    </FileUploadCard.CompactRoot>
  ),
};

// ─── Item Preset Stories ──────────────────────────────────────────────────

export const ItemUploading = {
  render: () => (
    <FileUploadCard.Item
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
  ),
};

export const ItemFailed = {
  render: () => (
    <FileUploadCard.Item
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
  ),
};

export const ItemCompletedDocument = {
  render: () => (
    <FileUploadCard.Item
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
  ),
};

export const ItemCompletedImage = {
  render: () => (
    <FileUploadCard.Item
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
  ),
};

export const ItemCompactUploading = {
  render: () => (
    <FileUploadCard.Item
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
      className='w-[400px]'
    />
  ),
};

export const ItemCompactCompleted = {
  render: () => (
    <FileUploadCard.Item
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
      className='w-[400px]'
    />
  ),
};

export const ItemCompactFailed = {
  render: () => (
    <FileUploadCard.Item
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
      className='w-[400px]'
    />
  ),
};
