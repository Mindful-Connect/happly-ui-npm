/// <reference lib="dom" />
import { FileFormatIconColor } from './types';

/**
 * Helper to format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 KB';

  const units = ['B', 'KB', 'MB', 'GB'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = bytes / Math.pow(k, i);

  return `${size.toFixed(i > 0 ? 1 : 0)} ${units[i]}`;
}

/**
 * Helper to format upload progress description
 */
export function formatUploadProgress(
  uploadedBytes: number,
  totalBytes: number
): string {
  return `${formatFileSize(uploadedBytes)} of ${formatFileSize(totalBytes)}`;
}

/**
 * Get the appropriate color for a file extension
 */
export function getColorForExtension(extension: string): FileFormatIconColor {
  const ext = extension.toLowerCase();

  // Red - PDFs
  if (ext === 'pdf') return 'red';

  // Blue - Word documents
  if (['doc', 'docx', 'odt', 'rtf'].includes(ext)) return 'blue';

  // Green - Spreadsheets
  if (['xls', 'xlsx', 'csv', 'ods'].includes(ext)) return 'green';

  // Orange - Presentations
  if (['ppt', 'pptx', 'odp'].includes(ext)) return 'orange';

  // Purple - Images
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico'].includes(ext))
    return 'purple';

  // Teal - Videos
  if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'].includes(ext))
    return 'teal';

  // Pink - Audio
  if (['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a'].includes(ext)) return 'pink';

  // Yellow - Archives
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return 'yellow';

  // Gray - default for unknown types
  return 'gray';
}

/**
 * Extract file extension from filename or mime type
 */
export function getExtensionFromFile(
  filename: string,
  mimeType?: string
): string {
  // Try to get from filename first
  const parts = filename.split('.');
  if (parts.length > 1) {
    return parts[parts.length - 1].toUpperCase();
  }

  // Fallback to mime type mapping
  if (mimeType) {
    const mimeMap: Record<string, string> = {
      'application/pdf': 'PDF',
      'application/msword': 'DOC',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        'DOCX',
      'application/vnd.ms-excel': 'XLS',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        'XLSX',
      'application/vnd.ms-powerpoint': 'PPT',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        'PPTX',
      'text/csv': 'CSV',
      'text/plain': 'TXT',
      'image/jpeg': 'JPG',
      'image/png': 'PNG',
      'image/gif': 'GIF',
      'image/webp': 'WEBP',
      'image/svg+xml': 'SVG',
      'video/mp4': 'MP4',
      'video/webm': 'WEBM',
      'audio/mpeg': 'MP3',
      'audio/wav': 'WAV',
      'application/zip': 'ZIP',
      'application/x-rar-compressed': 'RAR',
    };
    return mimeMap[mimeType] || 'FILE';
  }

  return 'FILE';
}

export const checkImageDimensions = (
  file: File,
  minWidth?: number,
  minHeight?: number,
  maxWidth?: number,
  maxHeight?: number
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    if (
      !file.type.startsWith('image/') ||
      (!minWidth && !minHeight && !maxWidth && !maxHeight)
    ) {
      resolve({ width: 0, height: 0 });
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      URL.revokeObjectURL(objectUrl);
      const errors: string[] = [];
      if (minWidth && width < minWidth) errors.push(`min width ${minWidth}px`);
      if (minHeight && height < minHeight)
        errors.push(`min height ${minHeight}px`);
      if (maxWidth && width > maxWidth) errors.push(`max width ${maxWidth}px`);
      if (maxHeight && height > maxHeight)
        errors.push(`max height ${maxHeight}px`);

      if (errors.length > 0) {
        reject(
          `Image dimensions invalid: requires ${errors.join(', ')} (is ${width}x${height})`
        );
      } else {
        resolve({ width, height });
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(
        'Could not read image file. It might be corrupted or not a valid image.'
      );
    };

    img.src = objectUrl;
  });
};

export const formatBytes = ({
  bytes,
  t,
}: {
  bytes: number;
  t: (key: string) => string;
}) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = [
    t('_domain.bytes.bBytes'),
    t('_domain.bytes.kBytes'),
    t('_domain.bytes.mBytes'),
    t('_domain.bytes.gBytes'),
  ];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};
