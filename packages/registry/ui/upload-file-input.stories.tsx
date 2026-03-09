'use client';

import UploadFile from './upload-file-input';

export default { title: 'Form/Composed Inputs/Upload File Input', component: UploadFile };

const t = (key: string, params?: Record<string, string>) => {
  const translations: Record<string, string> = {
    '_domain.uploadFile.error.fileType': 'Invalid file type. Accepted: {fileTypes}',
    '_domain.uploadFile.error.fileSize': 'File size is too large. Max size: {maxSize}',
    '_domain.uploadFile.uploadedOn': 'Uploaded on',
    '_domain.uploadFile.change': 'Change',
    '_domain.uploadFile.image.title': 'Choose an existing image or upload a new one.',
    '_domain.uploadFile.image.formats': 'Supported formats: JPG, PNG. Max size: 3MB',
    '_domain.uploadFile.image.recommended.module': 'Recommended size: 1200 x 675 px (16:9 ratio, horizontal layout)',
    '_domain.uploadFile.attachment.title': 'Drag and drop files here',
    '_domain.uploadFile.attachment.formats': 'PDF, DOCX, XLSX, PPTX, ZIP',
    '_domain.uploadFile.attachment.maxSize': 'Max size: {size}',
    '_domain.uploadFile.browseFile': 'Browse file',
    '_domain.uploadFile.video.title': 'Choose an existing video file or upload a new one.',
    '_domain.uploadFile.video.formats': 'Supported formats: MP4, AVI, MOV. Max size: {bytesFormatted}',
    '_domain.uploadFile.video.recommended': 'Recommended resolution: 1920 x 1080 px (16:9 Full HD)',
    '_domain.uploadFile.video.preview.title.thumbnail': 'Video file',
    '_domain.uploadFile.document.title': 'Choose an existing file or upload a new one',
    '_domain.uploadFile.document.formats': 'Supported formats: PDF, DOCX, XLSX, PPTX, ZIP. Max size: 50MB',
    '_domain.uploadFile.document.preview.title.thumbnail': 'File uploaded',
    '_domain.remove': 'Remove',
    '_domain.change': 'Change',
    '_domain.upload': 'Upload',
    'programEditor.logo.title': 'Program logo preview',
    'programEditor.logo.descr.1': 'Supports JPEG or PNG files (max 3MB)',
    'programEditor.logo.descr.2': 'Use a square image (1:1). Best size: 400 x 400 px',
    'components.fileUploadCard.ready': 'Ready',
    'components.fileUploadCard.uploading': 'Uploading',
    'components.fileUploadCard.completed': 'Completed',
    'components.fileUploadCard.failed': 'Failed',
    'components.fileUploadCard.tryAgain': 'Try Again',
    'team.addMemberForm.inputFields.uploadImage': 'Upload Image',
    'team.addMemberForm.inputFields.recommendedImage': 'Recommended: 400x400px, JPG or PNG format, max 5MB',
    '_domain.bytes.bBytes': 'B',
    '_domain.bytes.kBytes': 'KB',
    '_domain.bytes.mBytes': 'MB',
    '_domain.bytes.gBytes': 'GB',
  };

  let value = translations[key] || key;
  if (params) {
    Object.keys(params).forEach((paramKey) => {
      value = value.replace(new RegExp(`{${paramKey}}`, 'g'), String(params[paramKey]));
    });
  }
  return value;
};

const apiFetch = async () => new Response(JSON.stringify({}), { status: 200 });
const addAlert = () => {};

const defaultProps = {
  t,
  apiFetch,
  addAlert,
  authToken: 'dummy-token',
  providerId: 'dummy-provider',
  providerEmblemURL: '',
  providerCurrentWorkspaceKey: 'dummy-workspace-key',
  onUploadSuccess: () => {},
  onRemove: () => {},
  handleChange: () => {},
  handleFileChange: () => {},
  onError: () => {},
  disabled: true,
};

export const Showcase = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', maxWidth: '672px' }}>
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Image Variant</h3>
        <UploadFile {...defaultProps} variant="module-image" />
      </div>
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Archive Variant</h3>
        <UploadFile {...defaultProps} variant="archive" />
      </div>
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Document Variant</h3>
        <UploadFile {...defaultProps} variant="document" />
      </div>
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Attachment Variant</h3>
        <UploadFile {...defaultProps} variant="attachment" />
      </div>
    </div>
  ),
};
