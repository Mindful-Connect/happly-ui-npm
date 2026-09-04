import { FileFormatIconColor } from './types';

export const fileTypes = {
  document: [
    'application/pdf',
    'application/vnd.ms-excel',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
    'application/vnd.ms-word.document.macroEnabled.12',
    'application/vnd.ms-word.template.macroEnabled.12',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
    'application/vnd.ms-excel.sheet.macroEnabled.12',
    'application/vnd.ms-excel.template.macroEnabled.12',
    'application/vnd.ms-excel.addin.macroEnabled.12',
    'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-officedocument.presentationml.template',
    'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
    'application/vnd.ms-access',
    '.pdf',
    '.doc',
    '.docx',
    '.xls',
    '.xlsx',
    '.ppt',
    '.pptx',
    '.mdb',
  ],
  // No HEIC/HEIF here: this list feeds cover/logo image uploads that are
  // rendered inline via <img>, which browsers cannot do for HEIC. WebP is fine.
  image: [
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.webp',
  ],
  video: [
    'video/mp4',
    'video/mpeg',
    'video/quicktime',
    '.mp4',
    '.mov',
    '.mpeg',
    '.mpg',
  ],
  compressed_file: [
    'application/gzip',
    'application/vnd.bzip3',
    'application/vnd.genozip',
    'application/vnd.laszip',
    'application/vnd.rar',
    'application/x-7z-compressed',
    'application/x-bzip',
    'application/x-bzip2',
    'application/x-freearc',
    'application/x-gzip',
    'application/x-rar-compressed',
    'application/x-tar',
    'application/zip',
    // Windows reports .zip as application/x-zip-compressed
    'application/x-zip-compressed',
    '.zip',
    '.rar',
    '.7z',
    '.tar',
    '.gz',
    '.bz2',
  ],
  any: ['*/*'],
};

export const S3_ASSET_TYPE = {
  Asset: 'asset',
  Attachment: 'attachment',
  Avatar: 'avatar',
  Cover: 'cover',
  Logo: 'logo',
} as const;

export const ACL_TYPE = {
  Private: 'private',
  PublicRead: 'public-read',
} as const;

export const colorFallbacks: Record<FileFormatIconColor, string> = {
  red: '#FB3748',
  orange: '#FF8447',
  yellow: '#F6B51E',
  green: '#1FC16B',
  teal: '#47C2FF',
  blue: '#335CFF',
  purple: '#7D52F4',
  pink: '#FB4BA3',
  gray: '#717784',
};

export const WorkspaceKeyHeader = 'X-Happly-Workspace-Key';
