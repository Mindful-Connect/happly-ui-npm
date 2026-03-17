import * as FileUpload from './file-upload';

export default {
  title: 'Form/File Upload/File Upload',
  component: FileUpload.Root,
};

export const Document = {
  render: () => (
    <FileUpload.Dropzone type='document' className='min-w-[480px]' />
  ),
};

export const Image = {
  render: () => <FileUpload.Dropzone type='image' className='min-w-[480px]' />,
};

export const Video = {
  render: () => <FileUpload.Dropzone type='video' className='min-w-[480px]' />,
};

export const Audio = {
  render: () => <FileUpload.Dropzone type='audio' className='min-w-[480px]' />,
};

export const Attachment = {
  render: () => (
    <FileUpload.Dropzone type='attachment' className='min-w-[480px]' />
  ),
};

export const CustomOverrides = {
  render: () => (
    <FileUpload.Dropzone
      type='image'
      title='Upload your banner image'
      description='Recommended size: 1200 × 675 px (16:9 ratio, horizontal layout)'
      buttonText='Choose Image'
      inputProps={{ accept: 'image/*' }}
      className='min-w-[480px]'
    />
  ),
};

export const Dragging = {
  render: () => (
    <FileUpload.Root dragging className='min-w-[480px]'>
      <FileUpload.Content>
        <FileUpload.Title>Drop your file here</FileUpload.Title>
        <FileUpload.Description>Release to upload</FileUpload.Description>
      </FileUpload.Content>
      <FileUpload.Button>Browse File</FileUpload.Button>
    </FileUpload.Root>
  ),
};
