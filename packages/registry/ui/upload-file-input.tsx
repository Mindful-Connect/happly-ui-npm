'use client';

import { useEffect, useState, useRef, useId } from 'react';
import Uppy from '@uppy/core';
import AwsS3 from '@uppy/aws-s3'; // Compatible with GCS S3-compatible API
import XHRUpload from '@uppy/xhr-upload';
import { UppyContextProvider, useDropzone, useFileInput } from '@uppy/react';

import {
  RiDeleteBin6Line,
  RiPencilLine,
  RiCloseLine,
  RiDeleteBinLine,
  RiLoader2Fill,
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiLoader4Line,
} from 'react-icons/ri';
import { cn } from '@/lib/utils';
import { AlertModel } from '@/lib/alert-utils';

import { Button, ButtonCompact } from '@/components/ui/button';

import {
  ACL_TYPE,
  S3_ASSET_TYPE as ASSET_TYPE,
  UploadedFileInfo,
  UploadFileProps,
  FileUploadTriggerProps,
  AttachmentListItemProps,
  FileUploadCardProps,
  WorkspaceKeyHeader,
  formatBytes,
  MimeType,
  fileTypes,
  checkImageDimensions,
  FileFormatIconProps,
  colorFallbacks,
} from '@/lib/upload-file-input';

import {
  fileUploadIcon,
  fileIcon,
  imgUploadIcon,
  vidUploadIcon,
  videoIcon,
  attachmentUploadIcon,
  getFileThumbnailIcon,
} from '@/lib/upload-file-input-icons';
import {
  getColorForExtension,
  getExtensionFromFile,
  formatUploadProgress,
  formatFileSize,
} from '@/lib/upload-file-input';

type UploadingFileStatus = 'uploading' | 'success' | 'error';
interface UploadingFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  state: UploadingFileStatus;
}

export default function UploadFile({
  alt = '',
  disabled,
  maxFileSize = 5 * 1024 * 1024, // 5MB default
  src,
  placeholder,
  variant = 'default',
  onError,
  onRemove,
  onUploadSuccess,
  attachments = [],
  onAttachmentRemove,
  maxNumberOfFiles = 1,
  multiple = false,
  uploadLabel,
  description,
  secondaryDescription,
  uploadMode = 'multipart',
  assetType = ASSET_TYPE.Attachment,
  acl = ACL_TYPE.PublicRead,
  t,
  providerId,
  providerEmblemURL,
  providerCurrentWorkspaceKey,
  authToken,
  apiFetch,
  addAlert,
}: UploadFileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);

  const latestPropsRef = useRef({
    authToken,
    providerCurrentWorkspaceKey,
    assetType,
    providerId,
    acl,
  });

  useEffect(() => {
    latestPropsRef.current = {
      authToken,
      providerCurrentWorkspaceKey,
      assetType,
      providerId,
      acl,
    };
  }, [authToken, providerCurrentWorkspaceKey, assetType, providerId, acl]);

  // Determine upload mode based on variant (attachment uses presigned URL by default)
  const effectiveUploadMode =
    uploadMode || (variant === 'attachment' ? 'presigned-url' : 'multipart');

  // Allowed file types based on variant
  const allowedFileTypes =
    variant === 'lesson-file' || variant === 'attachment'
      ? (fileTypes.document as MimeType[])
      : variant === 'lesson-video'
        ? (fileTypes.video as MimeType[])
        : (fileTypes.image as MimeType[]);

  // Presigned URL upload handler using Uppy
  const handlePresignedUrlUpload = (files: FileList | null) => {
    if (!files || !uppy || disabled) return;

    Array.from(files).forEach((file) => {
      try {
        uppy.addFile({
          source: 'file input',
          name: file.name,
          type: file.type,
          data: file,
        });
      } catch (err) {
        if ((err as { isRestriction?: boolean })?.isRestriction) {
          // Restriction errors are handled by 'restriction-failed' event
          console.error('Restriction failed:', err);
        } else {
          console.error('Uppy add file error:', err);
        }
      }
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Drag handlers for presigned URL mode
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (effectiveUploadMode === 'presigned-url') {
      handlePresignedUrlUpload(e.dataTransfer.files);
    }
  };

  useEffect(() => {
    if (variant !== 'lesson-video' || !src) return;

    // get a thumbnail from the video
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.src = src;
    const canvas = document.createElement('canvas');

    video.addEventListener('loadeddata', async () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      video.currentTime = 2;
    });

    video.addEventListener('timeupdate', () => {
      canvas
        .getContext('2d')
        ?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const thumbnail = canvas.toDataURL('image/jpeg', 0.9);
      setThumbnail(thumbnail);
    });

    return () => {
      video.removeEventListener('loadeddata', () => {});
      video.removeEventListener('timeupdate', () => {});
    };
  }, [src, variant]);

  const chunkSize = 200 * 1024 * 1024;
  const effectiveMaxFiles =
    variant === 'attachment' ? maxNumberOfFiles || 5 : 1;

  const id = useId();
  const [uppy] = useState(() => {
    const uppyInstance = new Uppy({
      id: `${id}-${variant}`,
      debug: process.env.NODE_ENV === 'development',
      autoProceed: false,
      restrictions: {
        maxFileSize,
        maxNumberOfFiles: effectiveMaxFiles,
        allowedFileTypes,
      },
    });

    if (effectiveUploadMode === 'presigned-url') {
      uppyInstance.use(XHRUpload, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        endpoint: async (file: any) => {
          const {
            authToken,
            providerCurrentWorkspaceKey,
            assetType,
            providerId,
            acl,
          } = latestPropsRef.current;

          const preSignedResponse = await fetch(
            `${process.env.NEXT_PUBLIC_NEXT_API_URL}/assets/pre-signed`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
                [WorkspaceKeyHeader]: providerCurrentWorkspaceKey,
              },
              body: JSON.stringify({
                type: assetType,
                provider_id: providerId,
                content_type: file.type,
                acl: acl,
              }),
            }
          );

          if (!preSignedResponse.ok) {
            const errorData = await preSignedResponse.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to get upload URL');
          }

          const { item } = await preSignedResponse.json();
          // XHRUpload expects { url, method, headers } or similar.
          // Since we want to PUT to the signedUrl, we return it here.
          // Uppy XHR endpoint can be a string or object.
          // However, XHRUpload plugin creates an XHR request to `endpoint`.
          // If we want to use the signed URL as the endpoint, we return it.

          // Store the public URL and any required signed headers in metadata
          // for use in onUploadSuccess and when configuring XHR headers.
          // Store the public URL and any required signed headers in metadata
          // for use in onUploadSuccess and when configuring XHR headers.
          uppyInstance.setFileMeta(file.id, {
            publicUrl: item.url,
            // Optional: backend may return additional headers required by the
            // presigned URL (e.g. x-amz-acl, x-amz-meta-*). If present, we
            // forward them via the XHRUpload headers callback.
            signedHeaders: item.headers,
          });

          return item.signedUrl;
        },
        method: 'PUT',
        formData: false, // Send body as raw file bytes
        // We need to set Content-Type header to the file type for S3 presigned URLs.
        // Additionally, some presigned URLs may require extra headers (for example,
        // x-amz-acl or x-amz-meta-*). If the backend provides these headers along
        // with the presigned URL, we forward them here.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        headers: (file: any) => {
          const extraHeaders =
            (file &&
              file.meta &&
              (file.meta as { signedHeaders?: Record<string, string> })
                .signedHeaders) ||
            {};

          return {
            'Content-Type': file.type,
            ...extraHeaders,
          };
        },
      });
    } else {
      uppyInstance.use(AwsS3, {
        limit: 6,
        shouldUseMultipart: (file: { size: number }) => file.size > chunkSize,
        getChunkSize: (file: { size: number }) => {
          if (file.size > chunkSize) {
            return chunkSize;
          }
          return file.size;
        },

        async createMultipartUpload(file) {
          try {
            const response = await apiFetch('/owner/assets/s3/multipart', {
              method: 'POST',
              body: JSON.stringify({
                filename: file.name,
                type: file.type,
                metadata: file.meta,
              }),
            });

            return response.json();
          } catch (error) {
            throw new Error('Network response was not ok', { cause: error });
          }
        },

        async listParts(file, { uploadId, key }) {
          try {
            const response = await apiFetch(`/owner/assets/s3/multipart/list`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                key,
                uploadId,
              }),
            });
            return response.json();
          } catch (error) {
            console.error('Multipart upload creation failed:', error);
            throw new Error('Network response was not ok', { cause: error });
          }
        },

        async signPart(file, { uploadId, key, partNumber }) {
          try {
            const response = await apiFetch(
              `/owner/assets/s3/multipart/${uploadId}/${partNumber}?key=${encodeURIComponent(key)}`
            );
            return response.json();
          } catch (error) {
            console.error('Sign part failed:', error);
            throw new Error('Network response was not ok', { cause: error });
          }
        },

        async completeMultipartUpload(file, { uploadId, key, parts }) {
          try {
            const response = await apiFetch(
              `/owner/assets/s3/multipart/${uploadId}/complete?key=${encodeURIComponent(key)}`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ parts, key }),
              }
            );
            return response.json();
          } catch (error) {
            console.error('Complete multipart upload failed:', error);
            throw new Error('Network response was not ok', { cause: error });
          }
        },

        async abortMultipartUpload(file, { uploadId, key }) {
          try {
            const response = await apiFetch(
              `/owner/assets/s3/multipart/${uploadId}?key=${encodeURIComponent(key)}`,
              {
                method: 'DELETE',
              }
            );
            return response.json();
          } catch (error) {
            console.error('Abort multipart upload failed:', error);
            throw new Error('Network response was not ok', { cause: error });
          }
        },

        async getUploadParameters(file) {
          try {
            const response = await apiFetch(
              '/owner/assets/s3/getUploadParameters',
              {
                method: 'POST',
                body: JSON.stringify({
                  filename: file.name,
                  contentType: file.type,
                }),
              }
            );

            return response.json();
          } catch (error) {
            throw new Error('Network response was not ok', { cause: error });
          }
        },
      });
    }

    return uppyInstance;
  });

  useEffect(() => {
    if (!uppy) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFileAdded = async (file: any) => {
      if (!file || disabled) return;
      setDragging(false);
      uppy.upload();
      setUploading(true);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onUploadSuccessHandler = (file: any, response: any) => {
      setUploadingFiles((prev: UploadingFile[]) =>
        prev.map((f: UploadingFile) =>
          f.id === file.id ? { ...f, state: 'success', progress: 100 } : f
        )
      );

      // Remove from list after delay
      setTimeout(() => {
        setUploadingFiles((prev: UploadingFile[]) =>
          prev.filter((f) => f.id !== file.id)
        );
      }, 2000);

      setUploading(false);
      // Use location from response (S3 multipart) or fallback to publicUrl from meta (presigned)
      const location = response.body?.location || file.meta?.publicUrl;

      if (!file || !location) return;
      const fileInfo: UploadedFileInfo = {
        url: location,
        name: file?.name as string,
        size: file?.size as number,
        type: file?.type as string,
        lastModified: 0,
      };
      onUploadSuccess(fileInfo);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onRestrictionFailed = (file: any, error: any) => {
      setUploading(false);
      console.error('Uppy restriction failed:', error);
      addAlert(
        new AlertModel({
          type: 'error',
          message: error.message,
          timeout: 3000,
        })
      );
      uppy.clear();
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onErrorHandler = (file: any, error: any) => {
      setUploading(false);
      console.error('Uppy error:', error);
      addAlert(
        new AlertModel({
          type: 'error',
          message: t('_domain.errorGeneric'),
          timeout: 3000,
        })
      );

      if (file && file.id) {
        setUploadingFiles((prev: UploadingFile[]) =>
          prev.map((f: UploadingFile) =>
            f.id === file.id ? { ...f, state: 'error' } : f
          )
        );
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onUploadErrorHandler = (file: any, error: any) => {
      setUploading(false);
      console.error('Uppy upload error:', error);
      addAlert(
        new AlertModel({
          type: 'error',
          message: t('_domain.errorGeneric'),
          timeout: 3000,
        })
      );

      if (file && file.id) {
        setUploadingFiles((prev: UploadingFile[]) =>
          prev.map((f: UploadingFile) =>
            f.id === file.id ? { ...f, state: 'error' } : f
          )
        );
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onUploadProgress = (file: any, progress: any) => {
      // Sync progress to React state for UI
      setUploadingFiles((prev: UploadingFile[]) => {
        const existing = prev.find((f) => f.id === file.id);
        if (existing) {
          return prev.map((f) =>
            f.id === file.id
              ? {
                  ...f,
                  progress: progress.bytesTotal
                    ? Math.round(
                        (progress.bytesUploaded / progress.bytesTotal) * 100
                      )
                    : 0,
                }
              : f
          );
        } else {
          // File started uploading but wasn't in state (rare, but possible if added directly)
          return [
            ...prev,
            {
              id: file.id,
              name: file.name,
              size: file.size,
              type: file.type,
              progress: 0,
              state: 'uploading',
            },
          ];
        }
      });
    };

    uppy.on('file-added', onFileAdded);
    uppy.on('upload-progress', onUploadProgress);
    uppy.on('upload-success', onUploadSuccessHandler);
    uppy.on('restriction-failed', onRestrictionFailed);
    uppy.on('error', onErrorHandler);
    uppy.on('upload-error', onUploadErrorHandler);

    return () => {
      uppy.off('file-added', onFileAdded);
      uppy.off('upload-progress', onUploadProgress);
      uppy.off('upload-success', onUploadSuccessHandler);
      uppy.off('restriction-failed', onRestrictionFailed);
      uppy.off('error', onErrorHandler);
      uppy.off('upload-error', onUploadErrorHandler);
    };
  }, [uppy, addAlert, disabled, onUploadSuccess, t]);

  const handleFileChange = async (
    file: File | null | undefined,
    fileInputRef: React.RefObject<HTMLInputElement>
  ) => {
    if (fileInputRef.current) fileInputRef.current.value = '';

    if (!file) return;

    try {
      // 1. Type Validation
      if (!allowedFileTypes.includes(file.type as MimeType)) {
        addAlert(
          new AlertModel({
            type: 'error',
            message: t('_domain.uploadFile.error.fileType', {
              fileTypes: allowedFileTypes.join(', '),
            }),
            timeout: 3000,
          })
        );

        throw new Error(
          `Invalid file type. Accepted: ${allowedFileTypes.join(', ')}`
        );
      }

      // 2. Size Validation
      if (file.size > maxFileSize) {
        const maxSizeMB = (maxFileSize / (1024 * 1024)).toFixed(1);
        addAlert(
          new AlertModel({
            type: 'error',
            message: t('_domain.uploadFile.error.fileSize', {
              maxSize: formatBytes({ bytes: maxFileSize, t }),
            }),
            timeout: 3000,
          })
        );
        throw new Error(
          `File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum size: ${maxSizeMB}MB`
        );
      }

      // 3. Dimension Validation (Async)
      await checkImageDimensions(file);

      // Add file to Uppy (handles calling .upload() largely via onFileAdded)
      // Note: we don't need to manually call uppy.upload() here because onFileAdded does it.
      uppy.addFile({
        source: 'file input',
        name: file.name,
        type: file.type,
        data: file,
      });

      // Update state to show loading immediately
      setUploadingFiles((prev: UploadingFile[]) => [
        ...prev,
        {
          id: '', // temporary, will be synced with actual ID in progress handler if needed or we can generate one.
          name: file.name,
          size: file.size,
          type: file.type,
          progress: 0,
          state: 'uploading',
        },
      ]);
      // Remove the direct setUploadingFiles call here to avoid Sync issues.
      // onFileAdded -> uppy.upload() -> upload events.
    } catch (error: unknown) {
      console.error('File upload process failed:', error);

      let detailedErrorMessage: string;

      if (typeof error === 'string') {
        detailedErrorMessage = error;
      } else if (error instanceof Error && error.message) {
        detailedErrorMessage = error.message;
      } else {
        detailedErrorMessage =
          'An unknown error occurred during validation or upload.';
      }

      onError?.(detailedErrorMessage);
    } finally {
      setUploading(false);
    }
  };

  // For presigned URL mode, use simpler native upload to GCS
  // Supports attachment and image variants
  const isImageVariant = [
    'module-image',
    'lesson-image',
    'default',
    'default-image',
    'programs',
  ].includes(variant);

  if (effectiveUploadMode === 'presigned-url' && isImageVariant) {
    return (
      <div className='space-y-3'>
        {!src ? (
          <div
            className={cn(
              'rounded-12 flex w-full flex-col items-center justify-center gap-5 border border-dashed p-8',
              dragging
                ? 'border-ds-primary-400 bg-ds-primary-50'
                : 'border-ds-neutral-200'
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {imgUploadIcon}

            <div className='flex flex-col items-center gap-1 text-center'>
              <p className='font-medium'>
                {uploadLabel || t('_domain.uploadFile.image.title')}
              </p>
              <p className='text-ds-neutral-600 text-xs'>
                {description || t('_domain.uploadFile.image.formats')}
              </p>
              <p className='text-ds-neutral-600 text-xs'>
                {secondaryDescription ||
                  t('_domain.uploadFile.image.recommended.module')}
              </p>
            </div>

            <input
              ref={fileInputRef}
              type='file'
              className='hidden'
              accept={allowedFileTypes.join(',')}
              onChange={(e) => handlePresignedUrlUpload(e.target.files)}
            />
            <Button
              type='button'
              disabled={uploading}
              variant='neutral'
              mode='stroke'
              onClick={() => fileInputRef.current?.click()}
            >
              <span className='px-1'>
                {uploading ? (
                  <RiLoader4Line size={20} className='animate-spin' />
                ) : (
                  t('_domain.uploadFile.browseFile')
                )}
              </span>
            </Button>
          </div>
        ) : (
          <div
            className={cn(
              'rounded-16 flex items-center gap-5 border p-4',
              dragging
                ? 'border-ds-primary-400 bg-ds-primary-50'
                : 'border-ds-neutral-200'
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div
              className={cn(
                'flex h-[108px] w-[192px] shrink-0 items-center justify-center overflow-hidden',
                variant === 'default' || variant === 'module-image'
                  ? 'rounded-8 h-[108px] w-[192px]'
                  : variant === 'default-image'
                    ? 'rounded-8 h-[80px] w-[80px]'
                    : variant === 'lesson-image'
                      ? 'h-[80px] w-[80px] rounded-full'
                      : variant === 'programs'
                        ? 'rounded-12 h-[110px] w-[110px]'
                        : ''
              )}
            >
              <img
                src={src}
                alt=''
                width='192'
                height='108'
                className='shrink-0 object-cover'
              />
            </div>

            <div>
              <p className='font-medium'>
                {uploadLabel ||
                  t('_domain.uploadFile.image.preview.title.thumbnail')}
              </p>

              <p className='text-ds-neutral-600 mt-1 text-xs'>
                {description || t('_domain.uploadFile.image.formats')}
              </p>

              <p className='text-ds-neutral-600 mt-0.5 text-xs'>
                {secondaryDescription ||
                  t('_domain.uploadFile.image.recommended.module')}
              </p>

              <div className='mt-3 flex w-fit gap-3'>
                <Button
                  disabled={uploading}
                  type='button'
                  variant='error'
                  mode='stroke'
                  size='small'
                  className='min-w-[74px]'
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onRemove();
                  }}
                >
                  {t('_domain.remove')}
                </Button>

                <input
                  ref={fileInputRef}
                  type='file'
                  className='hidden'
                  accept={allowedFileTypes.join(',')}
                  onChange={(e) => handlePresignedUrlUpload(e.target.files)}
                />
                <Button
                  type='button'
                  disabled={uploading}
                  variant='neutral'
                  mode='stroke'
                  size='small'
                  className='min-w-[72px]'
                  onClick={() => fileInputRef.current?.click()}
                >
                  {uploading ? (
                    <RiLoader4Line size={20} className='animate-spin' />
                  ) : (
                    t('_domain.change')
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (effectiveUploadMode === 'presigned-url' && variant === 'attachment') {
    return (
      <div className='space-y-3'>
        {/* Upload area with native file input - FIRST */}
        <div
          className={cn(
            'rounded-12 flex flex-col items-center justify-center gap-3 border border-dashed p-6 transition-colors',
            dragging
              ? 'border-ds-primary-400 bg-ds-primary-50'
              : 'border-ds-neutral-200'
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {attachmentUploadIcon}

          <div className='flex flex-col items-center gap-1 text-center'>
            <p className='text-ds-neutral-700 text-sm font-medium'>
              {uploadLabel || t('_domain.uploadFile.attachment.title')}
            </p>
            <p className='text-ds-neutral-500 text-xs'>
              {description || t('_domain.uploadFile.attachment.formats')}
            </p>
            <p className='text-ds-neutral-500 text-xs'>
              {t('_domain.uploadFile.attachment.maxSize', {
                size: formatBytes({ bytes: maxFileSize, t }),
              })}
            </p>
          </div>

          <input
            ref={fileInputRef}
            type='file'
            className='hidden'
            multiple={multiple}
            accept={allowedFileTypes.join(',')}
            onChange={(e) => handlePresignedUrlUpload(e.target.files)}
          />
          <Button
            type='button'
            disabled={uploading}
            variant='neutral'
            mode='stroke'
            size='small'
            onClick={() => fileInputRef.current?.click()}
          >
            <span className='px-2'>{t('_domain.uploadFile.browseFile')}</span>
          </Button>
        </div>

        {/* Upload progress cards */}
        {uploadingFiles.length > 0 && (
          <div className='space-y-3'>
            {uploadingFiles.map((file) => (
              <FileUploadCard
                key={file.id}
                fileName={file.name}
                fileSize={
                  file.state === 'uploading'
                    ? formatUploadProgress(
                        Math.round((file.progress / 100) * file.size),
                        file.size
                      )
                    : formatFileSize(file.size)
                }
                state={file.state}
                progress={file.progress}
                mimeType={file.type}
                onRemove={() => {
                  setUploadingFiles((prev: UploadingFile[]) =>
                    prev.filter((f) => f.id !== file.id)
                  );
                }}
              />
            ))}
          </div>
        )}

        {/* Attachments list - BELOW upload area */}
        {attachments.length > 0 && (
          <div className='space-y-4'>
            {attachments.map((attachment) => (
              <AttachmentListItem
                key={attachment.id}
                attachment={attachment}
                onRemove={() => onAttachmentRemove?.(attachment.id)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <UppyContextProvider uppy={uppy}>
      <FileUploadTrigger
        acl={ACL_TYPE.PublicRead}
        assetType={ASSET_TYPE.Avatar}
        maxFileSize={maxFileSize}
        allowedFileTypes={allowedFileTypes}
        onUploadSuccess={onUploadSuccess}
        onError={
          onError
            ? onError
            : (error) => {
                console.error('File upload error:', error);
              }
        }
        handleFileChange={handleFileChange}
        uploading={uploading}
      >
        {({ getButtonProps, getDropZoneRootProps }) => (
          <div {...getDropZoneRootProps()} className='dropZone flex flex-col'>
            <div
              onDragOver={() => {
                setDragging(true);
              }}
              onDragLeave={() => {
                setDragging(false);
              }}
            >
              {/* Attachment variant for Uppy multipart mode (fallback) */}
              {variant === 'attachment' && (
                <div className='space-y-3'>
                  {/* Upload area - FIRST */}
                  <div
                    className={cn(
                      'rounded-12 flex flex-col items-center justify-center gap-3 border border-dashed p-6 transition-colors',
                      dragging
                        ? 'border-ds-primary-400 bg-ds-primary-50'
                        : 'border-ds-neutral-200'
                    )}
                  >
                    {attachmentUploadIcon}

                    <div className='flex flex-col items-center gap-1 text-center'>
                      <p className='text-ds-neutral-700 text-sm font-medium'>
                        {uploadLabel ||
                          t('_domain.uploadFile.attachment.title')}
                      </p>
                      <p className='text-ds-neutral-500 text-xs'>
                        {description ||
                          t('_domain.uploadFile.attachment.formats')}
                      </p>
                      <p className='text-ds-neutral-500 text-xs'>
                        {t('_domain.uploadFile.attachment.maxSize', {
                          size: formatBytes({ bytes: maxFileSize, t }),
                        })}
                      </p>
                    </div>

                    <Button
                      {...getButtonProps()}
                      disabled={uploading}
                      variant='neutral'
                      mode='stroke'
                      size='small'
                    >
                      <span className='px-2'>
                        {uploading ? (
                          <RiLoader4Line size={20} className='animate-spin' />
                        ) : (
                          t('_domain.uploadFile.browseFile')
                        )}
                      </span>
                    </Button>
                  </div>

                  {/* Attachments list - BELOW upload area */}
                  {attachments.length > 0 && (
                    <div className='space-y-4'>
                      {attachments.map(
                        (attachment: AttachmentListItemProps['attachment']) => (
                          <AttachmentListItem
                            key={attachment.id}
                            attachment={attachment}
                            onRemove={() => onAttachmentRemove?.(attachment.id)}
                          />
                        )
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Default and Programs variants */}
              {(variant === 'programs' || variant === 'default') && (
                <div
                  className={cn(
                    'flex items-center gap-5',
                    variant === 'programs'
                      ? dragging
                        ? 'rounded-16 border-ds-neutral-400 border p-4'
                        : 'rounded-16 border-ds-neutral-200 border p-4'
                      : ''
                  )}
                >
                  <div
                    className={cn(
                      'flex items-center justify-center overflow-hidden',
                      variant === 'programs'
                        ? 'rounded-12 h-[110px] w-[110px]'
                        : 'h-[80px] w-[80px] rounded-full'
                    )}
                  >
                    {variant === 'programs' || src ? (
                      <img
                        src={src || providerEmblemURL}
                        alt={alt}
                        className={cn(
                          'object-cover',
                          variant === 'programs' ? 'rounded-12' : 'rounded-full'
                        )}
                      />
                    ) : (
                      <div className=''>{placeholder}</div>
                    )}
                  </div>

                  <div>
                    <h3
                      className={cn(
                        'text-ds-neutral-950 mb-0.5 text-sm font-medium',
                        variant === 'programs' ? 'mb-2' : ''
                      )}
                    >
                      {variant === 'programs'
                        ? t('programEditor.logo.title')
                        : t('team.addMemberForm.inputFields.uploadImage')}
                    </h3>

                    <div
                      className={cn(variant === 'programs' ? 'mb-4' : 'mb-2')}
                    >
                      <p
                        className={cn(
                          'text-ds-neutral-600',
                          variant === 'programs'
                            ? 'mb-1.5 text-xs leading-none'
                            : 'text-sm leading-tight'
                        )}
                      >
                        {variant === 'programs'
                          ? t('programEditor.logo.descr.1')
                          : t(
                              'team.addMemberForm.inputFields.recommendedImage'
                            )}
                      </p>

                      {variant === 'programs' && (
                        <p
                          className={cn(
                            'text-ds-neutral-600',
                            variant === 'programs'
                              ? 'text-xs leading-none'
                              : 'mb-2 text-sm leading-tight'
                          )}
                        >
                          {t('programEditor.logo.descr.2')}
                        </p>
                      )}
                    </div>

                    <div className='flex w-fit cursor-default items-center gap-3'>
                      {src && (
                        <Button
                          disabled={uploading}
                          type='button'
                          variant='error'
                          mode='stroke'
                          size='small'
                          className='min-w-[68px]'
                          onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onRemove();
                            uppy.clear();
                          }}
                        >
                          {t('_domain.remove')}
                        </Button>
                      )}

                      <Button
                        {...getButtonProps()}
                        disabled={uploading}
                        variant='neutral'
                        mode='stroke'
                        size='small'
                        className='min-w-[68px]'
                      >
                        {uploading ? (
                          <RiLoader4Line size={20} className='animate-spin' />
                        ) : src ? (
                          t('_domain.change')
                        ) : (
                          t('_domain.upload')
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Lesson Image variant */}
              {variant === 'lesson-image' && (
                <div
                  className={cn(
                    'flex items-center gap-5',
                    dragging
                      ? 'rounded-16 border-ds-neutral-400 border p-4'
                      : 'rounded-16 border-ds-neutral-200 border p-4'
                  )}
                >
                  <div className='flex h-[80px] w-[80px] items-center justify-center overflow-hidden rounded-full'>
                    {src ? (
                      <img
                        src={src}
                        alt={alt}
                        className='rounded-full object-cover'
                      />
                    ) : (
                      <div className=''>{placeholder}</div>
                    )}
                  </div>

                  <div>
                    <h3 className='text-ds-neutral-950 mb-0.5 text-sm font-medium'>
                      {t('team.addMemberForm.inputFields.uploadImage')}
                    </h3>

                    <div className='mb-2'>
                      <p className='text-ds-neutral-600 text-sm leading-tight'>
                        {t('team.addMemberForm.inputFields.recommendedImage')}
                      </p>
                    </div>

                    <div className='flex w-fit cursor-default items-center gap-3'>
                      {src && (
                        <Button
                          disabled={uploading}
                          type='button'
                          variant='error'
                          mode='stroke'
                          size='small'
                          className='min-w-[68px]'
                          onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onRemove();
                            uppy.clear();
                          }}
                        >
                          {t('_domain.remove')}
                        </Button>
                      )}

                      <Button
                        {...getButtonProps()}
                        disabled={uploading}
                        variant='neutral'
                        mode='stroke'
                        size='small'
                        className='min-w-[68px]'
                      >
                        {uploading ? (
                          <RiLoader4Line size={20} className='animate-spin' />
                        ) : src ? (
                          t('_domain.change')
                        ) : (
                          t('_domain.upload')
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Module Image variant */}
              {variant === 'module-image' && (
                <>
                  {!src ? (
                    <div
                      className={cn(
                        'rounded-12 flex w-full flex-col items-center justify-center gap-5 border border-dashed p-8',
                        dragging
                          ? 'border-ds-neutral-400'
                          : 'border-ds-neutral-200'
                      )}
                    >
                      {imgUploadIcon}

                      <div className='flex flex-col items-center gap-1 text-center'>
                        <p className='font-medium'>
                          {t('_domain.uploadFile.image.title')}
                        </p>
                        <p className='text-ds-neutral-600 text-xs'>
                          {t('_domain.uploadFile.image.formats')}
                        </p>
                        {/* <p className='text-xs text-ds-neutral-600'>
                          {t('_domain.uploadFile.image.recommended.module')}
                        </p> */}
                      </div>

                      <Button
                        {...getButtonProps()}
                        disabled={uploading}
                        variant='neutral'
                        mode='stroke'
                        className='min-w-[94px]'
                      >
                        <span className='px-1'>
                          {uploading ? (
                            <RiLoader4Line size={20} className='animate-spin' />
                          ) : (
                            t('_domain.uploadFile.browseFile')
                          )}
                        </span>
                      </Button>
                    </div>
                  ) : (
                    <div
                      className={cn(
                        'rounded-16 flex items-center gap-5 border p-4',
                        dragging
                          ? 'border-ds-neutral-400'
                          : 'border-ds-neutral-200'
                      )}
                    >
                      <div className='rounded-8 flex h-[108px] w-[192px] shrink-0 items-center justify-center overflow-hidden'>
                        <img
                          src={src}
                          alt=''
                          width='192'
                          height='108'
                          className='shrink-0 object-cover'
                        />
                      </div>

                      <div>
                        <p className='font-medium'>
                          {t(
                            '_domain.uploadFile.image.preview.title.thumbnail'
                          )}
                        </p>

                        <p className='text-ds-neutral-600 mt-1 text-xs'>
                          {t('_domain.uploadFile.image.formats')}
                        </p>

                        {/* <p className='mt-0.5 text-xs text-ds-neutral-600'>
                          {t('_domain.uploadFile.image.recommended.module')}
                        </p> */}

                        <div className='mt-3 flex w-fit gap-3'>
                          <Button
                            disabled={uploading}
                            type='button'
                            variant='error'
                            mode='stroke'
                            size='small'
                            className='min-w-[74px]'
                            onClick={(e: React.MouseEvent) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onRemove();
                              uppy.clear();
                            }}
                          >
                            {t('_domain.remove')}
                          </Button>

                          <Button
                            {...getButtonProps()}
                            disabled={uploading}
                            variant='neutral'
                            mode='stroke'
                            size='small'
                            className='min-w-[72px]'
                          >
                            {uploading ? (
                              <RiLoader4Line
                                size={20}
                                className='animate-spin'
                              />
                            ) : (
                              t('_domain.change')
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Lesson Video variant */}
              {variant === 'lesson-video' && (
                <>
                  {!src ? (
                    <div
                      className={cn(
                        'drag rounded-12 flex flex-col items-center justify-center gap-5 border border-dashed p-8 transition-colors duration-75',
                        dragging
                          ? 'border-ds-neutral-400'
                          : 'border-ds-neutral-200'
                      )}
                    >
                      {vidUploadIcon}

                      <div className='flex flex-col items-center gap-1 text-center'>
                        <p className='font-medium'>
                          {t('_domain.uploadFile.video.title')}
                        </p>
                        <p className='text-ds-neutral-600 text-xs'>
                          {t('_domain.uploadFile.video.formats', {
                            bytesFormatted: formatBytes({
                              bytes: maxFileSize,
                              t,
                            }),
                          })}
                        </p>
                        <p className='text-ds-neutral-600 text-xs'>
                          {t('_domain.uploadFile.video.recommended')}
                        </p>
                      </div>

                      <Button
                        {...getButtonProps()}
                        disabled={uploading}
                        variant='neutral'
                        mode='stroke'
                        className='min-w-[94px]'
                      >
                        <span className='px-1'>
                          {uploading ? (
                            <RiLoader4Line size={20} className='animate-spin' />
                          ) : (
                            t('_domain.uploadFile.browseFile')
                          )}
                        </span>
                      </Button>
                    </div>
                  ) : (
                    <div className='rounded-16 border-ds-neutral-200 flex items-center gap-5 border p-4'>
                      <div className='rounded-8 bg-ds-neutral-200 relative flex h-[108px] w-[192px] shrink-0 items-center justify-center overflow-hidden'>
                        {thumbnail && (
                          <img
                            src={thumbnail}
                            alt=''
                            width='192'
                            height='108'
                            className='shrink-0 object-cover'
                          />
                        )}
                        {videoIcon}
                      </div>

                      <div>
                        <p className='font-medium'>
                          {t(
                            '_domain.uploadFile.video.preview.title.thumbnail'
                          )}
                        </p>

                        <p className='text-ds-neutral-600 mt-1 text-xs'>
                          {t('_domain.uploadFile.video.formats', {
                            bytesFormatted: formatBytes({
                              bytes: maxFileSize,
                              t,
                            }),
                          })}
                        </p>

                        <p className='text-ds-neutral-600 mt-0.5 text-xs'>
                          {t('_domain.uploadFile.video.recommended')}
                        </p>

                        <div className='mt-3 flex w-fit gap-3'>
                          <Button
                            disabled={uploading}
                            type='button'
                            variant='error'
                            mode='stroke'
                            size='small'
                            className='min-w-[74px]'
                            onClick={(e: React.MouseEvent) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onRemove();
                              uppy.clear();
                            }}
                          >
                            {t('_domain.remove')}
                          </Button>

                          <Button
                            {...getButtonProps()}
                            disabled={uploading}
                            variant='neutral'
                            mode='stroke'
                            size='small'
                            className='min-w-[72px]'
                          >
                            {uploading ? (
                              <RiLoader4Line
                                size={20}
                                className='animate-spin'
                              />
                            ) : (
                              t('_domain.change')
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Lesson File variant */}
              {variant === 'lesson-file' && (
                <>
                  {!src ? (
                    <div
                      className={cn(
                        'rounded-12 flex flex-col items-center justify-center gap-5 border border-dashed p-8',
                        dragging
                          ? 'border-ds-neutral-400'
                          : 'border-ds-neutral-200'
                      )}
                    >
                      {fileUploadIcon}

                      <div className='flex flex-col items-center gap-1 text-center'>
                        <p className='font-medium'>
                          {t('_domain.uploadFile.document.title')}
                        </p>
                        <p className='text-ds-neutral-600 text-xs'>
                          {t('_domain.uploadFile.document.formats')}
                        </p>
                      </div>

                      <Button
                        {...getButtonProps()}
                        disabled={uploading}
                        variant='neutral'
                        mode='stroke'
                        className='min-w-[94px]'
                      >
                        <span className='px-1'>
                          {uploading ? (
                            <RiLoader4Line size={20} className='animate-spin' />
                          ) : (
                            t('_domain.uploadFile.browseFile')
                          )}
                        </span>
                      </Button>
                    </div>
                  ) : (
                    <div className='rounded-16 border-ds-neutral-200 flex items-center gap-5 overflow-hidden border'>
                      <div className='flex h-[104px] w-[176px] shrink-0 items-center justify-center overflow-hidden bg-gradient-to-t from-[#f2f2f3] via-[#f7f8f8] to-[#fcfcfc]'>
                        {fileIcon}
                      </div>

                      <div className='flex grow items-center justify-between gap-4'>
                        <div>
                          <p className='font-medium'>
                            {t(
                              '_domain.uploadFile.document.preview.title.thumbnail'
                            )}
                          </p>

                          <p className='text-ds-neutral-600 mt-1 text-xs'>
                            {t('_domain.uploadFile.document.formats')}
                          </p>
                        </div>

                        <div className='flex w-fit gap-3 pr-6'>
                          <ButtonCompact
                            {...getButtonProps()}
                            disabled={uploading}
                            variant='modifiable'
                            className='text-ds-neutral-600'
                          >
                            {uploading ? (
                              <RiLoader4Line
                                size={20}
                                className='animate-spin'
                              />
                            ) : (
                              <RiPencilLine size={22} />
                            )}
                          </ButtonCompact>

                          <ButtonCompact
                            title=''
                            disabled={uploading}
                            type='button'
                            variant='modifiable'
                            className='text-ds-neutral-600 hover:text-ds-red-600'
                            onClick={(e: React.MouseEvent) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onRemove();
                              uppy.clear();
                            }}
                          >
                            <RiDeleteBin6Line size={22} />
                          </ButtonCompact>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </FileUploadTrigger>
    </UppyContextProvider>
  );
}

function FileUploadTrigger({
  children,
  allowedFileTypes,
  className,
  as: WrapperTag = 'div',
  uploading,
}: FileUploadTriggerProps) {
  const {
    getRootProps: getDropZoneRootProps,
    getInputProps: getDropZoneInputProps,
  } = useDropzone({
    noClick: true,
  });
  const { getButtonProps, getInputProps: getFileInputProps } = useFileInput();

  const acceptAttr = allowedFileTypes.join(',');

  return (
    <>
      <WrapperTag
        className={cn('', className)}
        style={{
          display: 'block',
        }}
        tabIndex={0}
        aria-disabled={uploading}
        title={
          uploading
            ? 'Uploading...'
            : `Upload file (${allowedFileTypes.join(',')})`
        }
      >
        {children({
          getDropZoneRootProps,
          getButtonProps,
        })}
      </WrapperTag>

      <input
        {...getFileInputProps()}
        accept={acceptAttr}
        className='hidden'
        disabled={uploading}
      />

      <input
        {...getDropZoneInputProps()}
        accept={acceptAttr}
        className='hidden'
        disabled={uploading}
      />
    </>
  );
}

function AttachmentListItem({
  attachment,
  onRemove,
  t,
}: AttachmentListItemProps) {
  const isImage = attachment.mime_type?.startsWith('image/');

  // Format date for display (e.g., "Jan 14, 2026")
  const formattedDate = attachment.created_at
    ? new Date(attachment.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <div className='rounded-16 border-ds-neutral-200 flex h-[104px] items-center gap-4 overflow-hidden border bg-white pr-6'>
      {/* Thumbnail/Icon */}
      <div
        className='flex h-full w-[176px] shrink-0 items-center justify-center overflow-hidden bg-gradient-to-t from-[#f2f2f3] via-[#f7f8f8] to-[#fcfcfc]'
        style={{ borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px' }}
      >
        {isImage && attachment.file_url ? (
          <img
            src={attachment.file_url}
            alt={attachment.file_name}
            className='h-full w-full object-cover'
          />
        ) : (
          getFileThumbnailIcon(attachment.mime_type, attachment.file_name)
        )}
      </div>

      {/* File info */}
      <div className='flex min-w-0 flex-1 flex-col gap-0.5'>
        <p className='text-ds-neutral-900 truncate text-sm font-medium'>
          {attachment.file_name}
        </p>
        <p className='text-ds-neutral-500 text-xs'>
          {formatBytes({ bytes: attachment.file_size, t })}
        </p>
        {formattedDate && (
          <p className='text-ds-neutral-400 text-xs'>
            {t('_domain.uploadFile.uploadedOn')}: {formattedDate}
          </p>
        )}
      </div>

      {/* Remove button */}
      <Button
        type='button'
        variant='error'
        mode='stroke'
        size='small'
        className='min-w-[74px] shrink-0'
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRemove();
        }}
      >
        {t('_domain.remove')}
      </Button>
    </div>
  );
}

function FileUploadCard({
  fileName,
  fileSize,
  state,
  progress = 0,
  showStatus = true,
  onRemove,
  onRetry,
  mimeType,
  className,
  t,
}: FileUploadCardProps) {
  // Get file extension and color
  const extension = getExtensionFromFile(fileName, mimeType);
  const iconColor = getColorForExtension(extension);

  const isPending = state === 'pending';
  const isUploading = state === 'uploading';
  const isSuccess = state === 'success';
  const isError = state === 'error';
  const isDeleting = state === 'deleting';

  return (
    <div
      className={cn(
        'rounded-12 bg-ds-white-0 flex w-full flex-col gap-4 overflow-hidden border py-4 pr-4 pl-3.5',
        isError ? 'border-ds-error-base' : 'border-ds-soft-200',
        className
      )}
    >
      {/* Main content row */}
      <div className='flex w-full items-start gap-3'>
        {/* File icon */}
        <FileFormatIcon format={extension} color={iconColor} size='md' />

        {/* Text content */}
        <div className='flex min-w-0 flex-1 flex-col gap-1'>
          {/* File name */}
          <p className='text-label-sm text-ds-strong-950 truncate'>
            {fileName}
          </p>

          {/* Description row */}
          <div className='flex flex-wrap items-center gap-1'>
            <span className='text-paragraph-xs text-ds-sub-600'>
              {fileSize}
            </span>

            {showStatus && (
              <>
                <span className='text-paragraph-xs text-ds-sub-600'>·</span>

                {/* Status indicator */}
                {isPending && (
                  <span className='text-paragraph-xs text-ds-sub-600'>
                    {t('components.fileUploadCard.ready')}
                  </span>
                )}

                {isUploading && (
                  <div className='flex items-center gap-1'>
                    <RiLoader2Fill className='text-ds-information-base h-4 w-4 animate-spin' />
                    <span className='text-paragraph-xs text-ds-strong-950'>
                      {t('components.fileUploadCard.uploading')}
                    </span>
                  </div>
                )}

                {isSuccess && (
                  <div className='flex items-center gap-1'>
                    <RiCheckboxCircleFill className='text-ds-success-base h-4 w-4' />
                    <span className='text-paragraph-xs text-ds-strong-950'>
                      {t('components.fileUploadCard.completed')}
                    </span>
                  </div>
                )}

                {isError && (
                  <div className='flex items-center gap-1'>
                    <RiErrorWarningFill className='text-ds-error-base h-4 w-4' />
                    <span className='text-paragraph-xs text-ds-strong-950'>
                      {t('components.fileUploadCard.failed')}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Try Again link for error state */}
          {isError && onRetry && (
            <button
              type='button'
              onClick={onRetry}
              className='text-label-sm text-ds-error-base hover:text-ds-error-dark mt-1 w-fit underline'
            >
              {t('components.fileUploadCard.tryAgain')}
            </button>
          )}
        </div>

        {/* Action button */}
        <button
          type='button'
          onClick={onRemove}
          disabled={isDeleting}
          className={cn(
            'rounded-6 shrink-0 p-0.5 transition-colors',
            isDeleting
              ? 'text-ds-sub-400 cursor-not-allowed'
              : isError
                ? 'text-ds-error-base hover:bg-ds-error-lighter hover:text-ds-error-dark'
                : 'hover:bg-ds-weak-100 text-ds-sub-600 hover:text-ds-strong-950'
          )}
        >
          {isUploading || isPending ? (
            <RiCloseLine className='h-5 w-5' />
          ) : (
            <RiDeleteBinLine className='h-5 w-5' />
          )}
        </button>
      </div>

      {/* Progress bar for uploading state */}
      {isUploading && (
        <div className='bg-ds-soft-200 h-1.5 w-full overflow-hidden rounded-full'>
          <div
            className='bg-ds-information-base h-full rounded-full transition-all duration-300'
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
    </div>
  );
}

function FileFormatIcon({
  format,
  color = 'gray',
  size = 'md',
  variant = 'default',
  className,
}: FileFormatIconProps) {
  const badgeColor = colorFallbacks[color];

  // Large size (56x56) - used for custom resources
  if (size === 'lg') {
    const isPlain = variant === 'plain';
    return (
      <div
        className={cn('relative shrink-0', className)}
        style={{ width: 56, height: 56 }}
      >
        <svg
          width='56'
          height='56'
          viewBox='0 0 56 56'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          {/* Document body */}
          <path
            d='M13.2441 1.34653H28.2471C30.1549 1.34653 31.9863 2.09689 33.3457 3.43539L46.7188 16.6024C48.1057 17.9682 48.8866 19.8335 48.8867 21.7801V47.37C48.8867 51.3833 45.6334 54.6364 41.6201 54.6366H13.2441C9.2309 54.6364 5.97754 51.3832 5.97754 47.37V8.61313C5.9777 4.59999 9.231 1.34669 13.2441 1.34653Z'
            fill='white'
            stroke='#CACFD8'
            strokeWidth='2.07625'
          />
          {/* Folded corner */}
          <path
            d='M31.9771 2.03848V13.8039C31.9771 16.8617 34.4559 19.3405 37.5137 19.3405H49.2791'
            stroke='#CACFD8'
            strokeWidth='2.07625'
          />
          {isPlain && (
            <>
              {/* Small square icon */}
              <rect
                x='13.9204'
                y='19.5905'
                width='9.32014'
                height='9.32014'
                rx='2.59531'
                fill='#CACFD8'
              />
              {/* Text lines */}
              <path
                d='M15.001 36.0815H33.2396'
                stroke='#CACFD8'
                strokeWidth='2.59531'
                strokeLinecap='round'
              />
              <path
                d='M15.001 43.0025H40.9406'
                stroke='#CACFD8'
                strokeWidth='2.59531'
                strokeLinecap='round'
              />
            </>
          )}
        </svg>
        {!isPlain && format && (
          <div
            className='absolute bottom-2 left-1 flex items-center overflow-hidden rounded px-1 py-0.5 text-[13px] leading-4 font-semibold tracking-[0.26px] text-white'
            style={{ backgroundColor: badgeColor }}
          >
            <span className='uppercase'>{format}</span>
          </div>
        )}
      </div>
    );
  }

  // Medium size (40x40)
  if (size === 'md') {
    const isPlain = variant === 'plain';
    return (
      <div
        className={cn('relative shrink-0', className)}
        style={{ width: 40, height: 40 }}
      >
        <svg
          width='32'
          height='40'
          viewBox='0 0 32 40'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='absolute top-0 left-1/2 -translate-x-1/2'
        >
          <path
            d='M4 1H20L31 12V36C31 37.6569 29.6569 39 28 39H4C2.34315 39 1 37.6569 1 36V4C1 2.34315 2.34315 1 4 1Z'
            fill='white'
            stroke='#CACFD8'
            strokeWidth='1.2'
          />
          <path
            d='M20 1V9C20 10.6569 21.3431 12 23 12H31'
            stroke='#CACFD8'
            strokeWidth='1.2'
          />
          {isPlain && (
            <>
              {/* Small square icon */}
              <rect
                x='6'
                y='14'
                width='6.5'
                height='6.5'
                rx='1.8'
                fill='#CACFD8'
              />
              {/* Text lines */}
              <path
                d='M6.5 26H20'
                stroke='#CACFD8'
                strokeWidth='1.8'
                strokeLinecap='round'
              />
              <path
                d='M6.5 31H25.5'
                stroke='#CACFD8'
                strokeWidth='1.8'
                strokeLinecap='round'
              />
            </>
          )}
        </svg>
        {!isPlain && format && (
          <div
            className='absolute bottom-1.5 left-0 flex items-center overflow-hidden rounded px-[3px] py-0.5 text-[11px] leading-3 font-semibold tracking-[0.22px] text-white'
            style={{ backgroundColor: badgeColor }}
          >
            <span className='uppercase'>{format}</span>
          </div>
        )}
      </div>
    );
  }

  // XS size (32x32)
  const isPlainXs = variant === 'plain';
  return (
    <div
      className={cn('relative shrink-0', className)}
      style={{ width: 32, height: 32 }}
    >
      <svg
        width='26'
        height='32'
        viewBox='0 0 26 32'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='absolute top-0 left-1/2 -translate-x-1/2'
      >
        <path
          d='M3 1H16L25 10V29C25 30.1046 24.1046 31 23 31H3C1.89543 31 1 30.1046 1 29V3C1 1.89543 1.89543 1 3 1Z'
          fill='white'
          stroke='#CACFD8'
          strokeWidth='1'
        />
        <path
          d='M16 1V7C16 8.65685 17.3431 10 19 10H25'
          stroke='#CACFD8'
          strokeWidth='1'
        />
        {isPlainXs && (
          <>
            {/* Small square icon */}
            <rect x='5' y='11' width='5' height='5' rx='1.4' fill='#CACFD8' />
            {/* Text lines */}
            <path
              d='M5.5 21H16'
              stroke='#CACFD8'
              strokeWidth='1.4'
              strokeLinecap='round'
            />
            <path
              d='M5.5 25H20.5'
              stroke='#CACFD8'
              strokeWidth='1.4'
              strokeLinecap='round'
            />
          </>
        )}
      </svg>
      {!isPlainXs && format && (
        <div
          className='absolute bottom-1 left-0 flex items-center overflow-hidden rounded-[3px] px-[3px] py-0.5 text-[8.8px] leading-[9.6px] font-semibold tracking-[0.176px] text-white'
          style={{ backgroundColor: badgeColor }}
        >
          <span className='uppercase'>{format}</span>
        </div>
      )}
    </div>
  );
}
