import { ReactNode, ElementType, RefObject } from 'react';
import { ObjectValues, ApiFetch } from '@/lib/happly-ui-utils';
import { AlertModel } from '@/lib/alert-utils';
import { fileTypes, S3_ASSET_TYPE, ACL_TYPE } from './constants';

export type MimeType = (typeof fileTypes)[keyof typeof fileTypes][number];

export type S3AssetType = ObjectValues<typeof S3_ASSET_TYPE>;
export type AclType = ObjectValues<typeof ACL_TYPE>;

export type UploadMode = 'multipart' | 'presigned-url';

export type AssetType = S3AssetType;

export interface UploadedFileInfo {
  url: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
  width?: number;
  height?: number;
}

export interface FileUploadTriggerProps {
  /**
   * @param isLoading - True if an upload is currently in progress.
   * @returns The ReactNode to render as the trigger.
   */
  children: ({
    getButtonProps,
    getDropZoneRootProps,
  }: {
    getButtonProps: () => Record<string, unknown>;
    getDropZoneRootProps: () => Record<string, unknown>;
  }) => ReactNode;
  acl: AclType;
  assetType: AssetType;
  allowedFileTypes: MimeType[];
  maxFileSize?: number;

  /** Minimum allowed image width in pixels. Only checked for image types. */
  minWidth?: number;
  /** Minimum allowed image height in pixels. Only checked for image types. */
  minHeight?: number;
  /** Maximum allowed image width in pixels. Only checked for image types. */
  maxWidth?: number;
  /** Maximum allowed image height in pixels. Only checked for image types. */
  maxHeight?: number;

  /** Optional callback triggered right before the upload process starts (after validation). */
  onUploadStart?: () => void;
  /**
   * Required callback triggered when the file upload is successful.
   * @param fileInfo - An object containing details of the uploaded file.
   */
  onUploadSuccess: (fileInfo: UploadedFileInfo) => void;
  /**
   * Optional callback triggered when any error occurs during validation or upload.
   * @param error - A string describing the error.
   */
  onError?: (error: string) => void;

  className?: string;
  as?: ElementType;

  handleFileChange: (
    file: File | null | undefined,
    fileInputRef: RefObject<HTMLInputElement | null>
  ) => void;
  uploading: boolean;
}

export type UploadFileVariant =
  | 'default'
  | 'default-image'
  | 'lesson-video'
  | 'lesson-image'
  | 'lesson-file'
  | 'module-image'
  | 'programs'
  | 'attachment'
  | 'file-request';

export interface UploadFileProps {
  alt?: string;
  disabled?: boolean;
  maxFileSize?: number;
  src?: string | null;
  placeholder?: React.ReactNode;
  variant?: UploadFileVariant;
  onError?: (error: string) => void;
  onRemove: () => void;
  onUploadSuccess: (fileInfo: UploadedFileInfo) => void;
  /** For attachment variant - list of existing attachments */
  attachments?: Array<{
    id: string;
    file_name: string;
    file_size: number;
    mime_type: string;
    file_url?: string;
    created_at?: string;
    created_at_formatted?: string;
  }>;
  /** For attachment variant - callback when attachment is removed */
  onAttachmentRemove?: (attachmentId: string) => void;
  /** For attachment variant - callback when attachment download is clicked */
  onAttachmentDownload?: (attachmentId: string) => void;
  /** Maximum number of files allowed (for attachment variant, defaults to 5) */
  maxNumberOfFiles?: number;
  /** Accept multiple files */
  multiple?: boolean;
  /** Custom label for upload button */
  uploadLabel?: string;
  /** Custom description text (formats line) */
  description?: string;
  /** Secondary description text (recommended size line) */
  secondaryDescription?: string;
  /** Upload mode: 'multipart' for large files via S3/Uppy, 'presigned-url' for simple GCS uploads */
  uploadMode?: UploadMode;
  /** Asset type for presigned URL uploads (required when uploadMode is 'presigned-url') */
  assetType?: AssetType;
  /** ACL for presigned URL uploads: 'public-read' for public bucket, 'private' for private bucket */
  acl?: AclType;
  /** Translation function */
  // eslint-disable-next-line
  t: (key: string, params?: any) => string;
  /** Provider ID for presigned URL uploads. const { provider_id } = useProvider(); */
  providerId: string;
  /** Provider emblem URL for presigned URL uploads. const { emblem_url } = useProvider(); */
  providerEmblemURL: string;
  /** Workspace key for presigned URL uploads. const { current_workspace_key } = useProvider(); */
  providerCurrentWorkspaceKey: string;
  /** Auth token for presigned URL uploads. const { token } = useAuth(); */
  authToken: string;
  /** API fetch function. const apiFetch = useApiFetch(); */
  apiFetch: ApiFetch;
  /** Add alert function. const { addAlert } = useAlerts(); */
  addAlert: (alert: AlertModel) => void;
  /** Override allowed file types */
  allowedFileTypes?: string[];
}

export type FileFormatIconColor =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'gray';

export type FileFormatIconSize = 'md' | 'xs' | 'lg';

export interface FileFormatIconProps {
  /** File extension to display (e.g., "PDF", "DOC", "XLS"). Omit for plain document icon. */
  format?: string;
  /** Color of the format badge */
  color?: FileFormatIconColor;
  /** Size of the icon */
  size?: FileFormatIconSize;
  /** Show as plain document with lines (no format badge) - used for custom resources */
  variant?: 'default' | 'plain';
  /** Additional CSS classes */
  className?: string;
}

// Attachment list item component matching Figma design
export interface AttachmentListItemProps {
  attachment: {
    id: string;
    file_name: string;
    file_size: number;
    mime_type: string;
    file_url?: string;
    created_at?: string;
    created_at_formatted?: string;
  };
  state?: 'uploading' | 'success' | 'error';
  progress?: number;
  onRemove: () => void;
  /** Whether the attachment is currently being deleted */
  deleting?: boolean;
  /** Translation function */
  t: (key: string, params?: Record<string, string>) => string;
}

export type FileUploadState =
  | 'pending'
  | 'uploading'
  | 'success'
  | 'error'
  | 'deleting';

export interface FileUploadCardProps {
  /** File name to display */
  fileName: string;
  /** File size description (e.g., "0 KB of 120 KB" or "120 KB") */
  fileSize: string;
  /** Current upload state */
  state: FileUploadState;
  /** Upload progress percentage (0-100), only used when state is 'uploading' */
  progress?: number;
  /** Show the status indicator */
  showStatus?: boolean;
  /** Callback when close/delete button is clicked */
  onRemove?: () => void;
  /** Callback when "Try Again" is clicked (only for error state) */
  onRetry?: () => void;
  /** Optional mime type for better icon detection */
  mimeType?: string;
  /** Additional CSS classes */
  className?: string;
  /** Translation function */
  t: (key: string, params?: Record<string, string>) => string;
}

export type AttachmentType =
  | 'pdf' // e.g. .pdf
  | 'image' // e.g. .jpg, .png, .gif
  | 'video' // e.g. .mp4, .avi, .mov, .mkv
  | 'audio' // e.g. .mp3, .wav, .ogg, .flac
  | 'document_file' // e.g. .odt, .doc, .docx
  | 'spreadsheet_document' // e.g. .xls, .xlsx .ods
  | 'presentation_document' // e.g. .ppt, .pptx, .odp
  | 'plain_text' // e.g. .txt, .md
  | 'compressed_file' // e.g. .zip, .rar, .7z
  | 'any';
