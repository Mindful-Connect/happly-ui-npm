import * as FileFormatIcon from './file-format-icon';
import * as FileUploadCard from './file-upload-card';

export default { title: 'UI/File Upload Card', component: FileUploadCard.Root };

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
