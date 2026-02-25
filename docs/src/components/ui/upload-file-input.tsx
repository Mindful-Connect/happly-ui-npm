'use client';

import { useEffect, useState, useRef, useId } from 'react';
import Uppy from '@uppy/core';
import AwsS3 from '@uppy/aws-s3'; // Compatible with GCS S3-compatible API
import XHRUpload from '@uppy/xhr-upload';
import { UppyContextProvider, useDropzone } from '@uppy/react';
import type { UppyFile, Meta } from '@uppy/core';

import {
  RiDeleteBin6Line,
  RiPencilLine,
  RiCloseLine,
  RiLoader2Fill,
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiLoader4Line,
} from 'react-icons/ri';
import { cn } from '@/lib/happly-ui-utils';
import { AlertModel } from '@/lib/alert-utils';

import { Button, ButtonCompact } from '@/components/ui/button';

import {
  ACL_TYPE,
  S3_ASSET_TYPE as ASSET_TYPE,
  UploadedFileInfo,
  UploadFileProps,
  FileUploadTriggerProps,
  AttachmentListItemProps,
  WorkspaceKeyHeader,
  formatBytes,
  MimeType,
  fileTypes,
  AttachmentType,
  checkImageDimensions,
} from '@/lib/upload-file-input';
import {
  fileIcon,
  imgUploadIcon,
  vidUploadIcon,
  videoIcon,
  attachmentUploadIcon,
  getFileThumbnailIcon,
} from '@/lib/upload-file-input-icons';
import { formatUploadProgress, formatFileSize } from '@/lib/upload-file-input';

import { ProgressBar } from '@/components/ui/progress-bar';
import {
  FileFormatIcon as RequestFileFormatIcon,
  FileDownloadIcon,
} from '@/lib/upload-file-input/file-format-icon';

type UploadingFileStatus = 'uploading' | 'success' | 'error';
interface UploadingFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  state: UploadingFileStatus;
}

interface UppyMeta extends Record<string, unknown> {
  publicUrl?: string;
  signedHeaders?: Record<string, string>;
}

type UppyBody = Record<string, unknown>;

export default function UploadFile({
  alt = '',
  disabled,
  maxFileSize = 5 * 1024 * 1024, // 5MB default
  maxImageWidth,
  maxImageHeight,
  src,
  placeholder,
  variant = 'default',
  onError,
  onRemove,
  onUploadSuccess,
  attachments = [],
  onAttachmentRemove,
  onAttachmentDownload,
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
  allowedFileTypes: allowedFileTypesProp,
}: UploadFileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [uploadedFileSize, setUploadedFileSize] = useState<number>(0);

  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  const latestPropsRef = useRef({
    authToken,
    providerCurrentWorkspaceKey,
    assetType,
    providerId,
    acl,
    apiFetch,
  });

  useEffect(() => {
    latestPropsRef.current = {
      authToken,
      providerCurrentWorkspaceKey,
      assetType,
      providerId,
      acl,
      apiFetch,
    };
  }, [
    authToken,
    providerCurrentWorkspaceKey,
    assetType,
    providerId,
    acl,
    apiFetch,
  ]);

  // Determine upload mode based on variant (attachment uses presigned URL by default)
  const effectiveUploadMode =
    uploadMode || (variant === 'attachment' ? 'presigned-url' : 'multipart');

  // Allowed file types based on variant
  const allowedFileTypes =
    allowedFileTypesProp ||
    (variant === 'lesson-file' || variant === 'attachment'
      ? (fileTypes.document as MimeType[])
      : variant === 'lesson-video'
        ? (fileTypes.video as MimeType[])
        : (fileTypes.image as MimeType[]));

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
    const uppyInstance = new Uppy<UppyMeta, UppyBody>({
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
        endpoint: async (
          file: UppyFile<UppyMeta, UppyBody> | UppyFile<UppyMeta, UppyBody>[]
        ) => {
          if (Array.isArray(file)) throw new Error('Bundling not supported');
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
        headers: (file: UppyFile<UppyMeta, UppyBody>) => {
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
        getResponseData(_xhr: XMLHttpRequest) {
          // GCS presigned URLs return empty response bodies, which causes XHRUpload
          // to throw JSON parsing errors. This intercepts the response to prevent that.
          return { url: '' };
        },
      });
    } else {
      uppyInstance.use(AwsS3, {
        limit: 6,
        shouldUseMultipart: (file: UppyFile<UppyMeta, UppyBody>) =>
          (file.size || 0) > chunkSize,
        getChunkSize: (file: { size: number }) => {
          if ((file.size || 0) > chunkSize) {
            return chunkSize;
          }
          return file.size || 0;
        },

        async createMultipartUpload(file) {
          try {
            const { apiFetch } = latestPropsRef.current;
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
            const { apiFetch } = latestPropsRef.current;
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
            const { apiFetch } = latestPropsRef.current;
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
            const { apiFetch } = latestPropsRef.current;
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
            const { apiFetch } = latestPropsRef.current;
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
            const { apiFetch } = latestPropsRef.current;
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
    uppy.setOptions({
      restrictions: {
        maxFileSize,
        maxNumberOfFiles: effectiveMaxFiles,
        allowedFileTypes,
      },
    });
  }, [uppy, maxFileSize, effectiveMaxFiles, allowedFileTypes]);

  useEffect(() => {
    if (!uppy) return;

    const onFileAdded = async (file: UppyFile<UppyMeta, UppyBody>) => {
      if (!file || disabled) return;
      setDragging(false);
      uppy.upload();
      setUploading(true);
    };

    const onUploadSuccessHandler = (
      file: UppyFile<UppyMeta, UppyBody> | undefined,
      response: {
        body?: { location?: string; [key: string]: unknown };
        status: number;
        [key: string]: unknown;
      }
    ) => {
      if (!file) return;
      setUploadingFiles((prev: UploadingFile[]) =>
        prev.map((f: UploadingFile) =>
          f.id === file.id ? { ...f, state: 'success', progress: 100 } : f
        )
      );

      // Remove from list after delay
      const timer: NodeJS.Timeout = setTimeout(() => {
        setUploadingFiles((prev: UploadingFile[]) =>
          prev.filter((f) => f.id !== file.id)
        );
      }, 2000);
      timeoutRefs.current.push(timer);

      setUploading(false);
      // Use location from response (S3 multipart) or fallback to publicUrl from meta (presigned)
      const location = response.body?.location || file.meta?.publicUrl;

      if (!file || !location) return;

      setUploadedFileName(file?.name as string);
      setUploadedFileSize(file?.size as number);

      const fileInfo: UploadedFileInfo = {
        url: location,
        name: file?.name as string,
        size: file?.size as number,
        type: file?.type as string,
        lastModified: 0,
      };

      // Await success callback before removing from list if using sync pattern
      onUploadSuccess(fileInfo);
    };

    const onRestrictionFailed = (
      arg1: UppyFile<UppyMeta, UppyBody> | Error | undefined,
      arg2: UppyFile<UppyMeta, UppyBody> | Error | undefined
    ) => {
      const error = (arg1 instanceof Error ? arg1 : arg2) as Error;
      // const file = (arg1 instanceof Error ? arg2 : arg1) as UppyFile<UppyMeta, UppyBody> | undefined;
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

    const onErrorHandler = (error: Error) => {
      setUploading(false);
      console.error('Uppy error:', error);
      addAlert(
        new AlertModel({
          type: 'error',
          message: t('_domain.errorGeneric'),
          timeout: 3000,
        })
      );
      uppy.clear();
    };

    const onUploadErrorHandler = (
      arg1: UppyFile<UppyMeta, UppyBody> | Error | undefined,
      arg2: UppyFile<UppyMeta, UppyBody> | Error | undefined
    ) => {
      const error = (arg1 instanceof Error ? arg1 : arg2) as Error;
      const file = (arg1 instanceof Error ? arg2 : arg1) as
        | UppyFile<UppyMeta, UppyBody>
        | undefined;
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
        uppy.removeFile(file.id);
      }
    };

    const onUploadProgress = (
      file: UppyFile<UppyMeta, UppyBody> | undefined,
      progress: {
        bytesTotal: number | null;
        bytesUploaded: number;
      }
    ) => {
      if (!file) return;
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
              size: file.size || 0,
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

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach((timer: NodeJS.Timeout) =>
        clearTimeout(timer)
      );
      timeoutRefs.current = [];
    };
  }, []);

  const handleFileChange = async (
    file: File | null | undefined,
    fileInputRef: React.RefObject<HTMLInputElement | null>
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
      await checkImageDimensions(
        file,
        undefined,
        undefined,
        maxImageWidth,
        maxImageHeight
      );

      // Add file to Uppy (handles calling .upload() largely via onFileAdded)
      // Note: we don't need to manually call uppy.upload() here because onFileAdded does it.
      const fileId = uppy.addFile({
        source: 'file input',
        name: file.name,
        type: file.type,
        data: file,
      });

      // Update state to show loading immediately
      setUploadingFiles((prev: UploadingFile[]) => [
        ...prev,
        {
          id: fileId,
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
    'custom-image',
  ].includes(variant);

  if (effectiveUploadMode === 'presigned-url' && isImageVariant) {
    return (
      <div className='space-y-3'>
        {!src ? (
          <>
            {uploadingFiles.length === 0 && (
              <div
                className={cn(
                  'flex w-full flex-col items-center justify-center gap-5 rounded-[16px] border border-dashed p-8',
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
                    {description ||
                      (variant === 'custom-image'
                        ? t('_domain.uploadFile.image.custom.formats', {
                            fileSize: formatBytes({ bytes: maxFileSize, t }),
                          })
                        : t('_domain.uploadFile.image.formats'))}
                  </p>
                  <p className='text-ds-neutral-600 text-xs'>
                    {secondaryDescription ||
                      (variant === 'custom-image'
                        ? t('_domain.uploadFile.image.custom.size', {
                            width: maxImageWidth,
                            height: maxImageHeight,
                          })
                        : t('_domain.uploadFile.image.recommended.module'))}
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
                  variant='neutral'
                  mode='stroke'
                  onClick={() => fileInputRef.current?.click()}
                >
                  <span className='px-1'>
                    {t('_domain.uploadFile.browseFile')}
                  </span>
                </Button>
              </div>
            )}
            {uploadingFiles.length > 0 && (
              <div className='space-y-4'>
                {uploadingFiles.map((file) => (
                  <AttachmentListItem
                    key={file.id}
                    attachment={{
                      id: file.id,
                      file_name: file.name,
                      file_size: file.size,
                      mime_type: file.type,
                    }}
                    state={file.state}
                    progress={file.progress}
                    onRemove={() => {
                      setUploadingFiles((prev: UploadingFile[]) =>
                        prev.filter((f) => f.id !== file.id)
                      );
                    }}
                    t={t}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {uploadingFiles.length === 0 && (
              <div
                className={cn(
                  'flex h-[104px] items-center overflow-hidden rounded-[16px] border',
                  dragging
                    ? 'border-ds-neutral-400 bg-ds-primary-50'
                    : 'border-ds-neutral-200'
                )}
              >
                <div className='flex h-full w-[176px] shrink-0 items-center justify-center overflow-hidden'>
                  <img
                    src={src}
                    alt=''
                    className={cn(
                      'h-full w-full',
                      variant === 'custom-image'
                        ? 'object-contain'
                        : 'object-cover'
                    )}
                  />
                </div>
                <div className='flex min-w-0 grow items-center justify-between gap-4 px-5'>
                  <div className='flex min-w-0 flex-col gap-0.5'>
                    <p className='text-ds-neutral-900 truncate text-sm font-medium'>
                      {uploadedFileName ||
                        t('_domain.uploadFile.image.preview.title.thumbnail')}
                    </p>
                    <p className='text-ds-neutral-500 text-xs'>
                      {uploadedFileSize > 0
                        ? formatBytes({ bytes: uploadedFileSize, t })
                        : description || t('_domain.uploadFile.image.formats')}
                    </p>
                    <p className='text-ds-neutral-500 text-xs'>
                      {secondaryDescription ||
                        (variant === 'custom-image'
                          ? t('_domain.uploadFile.image.custom.size', {
                              width: maxImageWidth,
                              height: maxImageHeight,
                            })
                          : t('_domain.uploadFile.image.recommended.module'))}
                    </p>
                  </div>

                  <div className='flex shrink-0 gap-3'>
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

            {uploadingFiles.length > 0 && (
              <div className='space-y-4'>
                {uploadingFiles.map((file) => (
                  <AttachmentListItem
                    key={file.id}
                    attachment={{
                      id: file.id,
                      file_name: file.name,
                      file_size: file.size,
                      mime_type: file.type,
                    }}
                    state={file.state}
                    progress={file.progress}
                    onRemove={() => {
                      setUploadingFiles((prev: UploadingFile[]) =>
                        prev.filter((f) => f.id !== file.id)
                      );
                    }}
                    t={t}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  if (effectiveUploadMode === 'presigned-url' && variant === 'file-request') {
    return (
      <div className='w-full space-y-3'>
        {/* Idle state - waiting for file upload */}
        {uploadingFiles.length === 0 && attachments.length === 0 && (
          <div
            className={cn(
              'border-ds-neutral-200 flex h-[72px] w-full items-center justify-between gap-6 rounded-[15px] border bg-white py-4 pr-4 pl-6 transition-colors',
              dragging
                ? 'border-ds-primary-400 bg-ds-primary-50'
                : 'border-ds-neutral-200'
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className='flex items-center gap-2'>
              <div>
                <RequestFileFormatIcon
                  fileType={
                    allowedFileTypes && allowedFileTypes.length === 1
                      ? (Object.keys(fileTypes).find((type) =>
                          fileTypes[type as keyof typeof fileTypes].includes(
                            allowedFileTypes[0] as MimeType
                          )
                        ) as unknown as AttachmentType) || 'any'
                      : 'any'
                  }
                />
              </div>

              <span className='flex flex-col text-sm font-bold text-[#474754]'>
                <span>
                  {uploadLabel || t('_domain.uploadFile.attachment.title')}
                </span>
                {maxFileSize && (
                  <div className='font-normal'>
                    {t('_form.maxFileSize')}:{' '}
                    {formatBytes({ bytes: maxFileSize, t })}
                  </div>
                )}
              </span>
            </div>

            <Button
              type='button'
              disabled={uploading || disabled}
              variant='neutral'
              mode='stroke'
              onClick={() => fileInputRef.current?.click()}
            >
              {t('_domain.uploadFile.browseFile')}
            </Button>
            <input
              ref={fileInputRef}
              type='file'
              className='hidden'
              multiple={multiple}
              accept={allowedFileTypes.join(',')}
              onChange={(e) => handlePresignedUrlUpload(e.target.files)}
            />
          </div>
        )}

        {/* Uploading State */}
        {uploadingFiles.length > 0 && (
          <div className='space-y-3'>
            {uploadingFiles.map((file) => (
              <div
                key={file.id}
                className={cn(
                  'flex h-[72px] w-full items-center justify-between gap-6 rounded-[15px] border bg-white py-4 pr-4 pl-6',
                  file.state === 'error'
                    ? 'border-ds-error-500'
                    : 'border-ds-neutral-200'
                )}
              >
                <div className='flex w-full items-center gap-2'>
                  <div className='shrink-0'>
                    <RequestFileFormatIcon
                      fileType={
                        ((
                          Object.keys(fileTypes) as Array<
                            keyof typeof fileTypes
                          >
                        ).find((type) =>
                          fileTypes[type].includes(file.type as MimeType)
                        ) as unknown as AttachmentType) || 'any'
                      }
                    />
                  </div>

                  <div className='flex flex-grow flex-col gap-1 overflow-hidden'>
                    <div className='flex w-full items-center justify-between text-sm'>
                      <span className='truncate font-medium text-[#474754]'>
                        {file.name}
                      </span>
                      {file.state === 'uploading' && (
                        <span className='shrink-0 font-medium text-[#474754]'>
                          {formatUploadProgress(
                            Math.round((file.progress / 100) * file.size),
                            file.size
                          )}{' '}
                          • {file.progress}%
                        </span>
                      )}
                      {file.state === 'error' && (
                        <span className='text-ds-error-500 shrink-0 font-medium'>
                          Upload Error
                        </span>
                      )}
                    </div>
                    {file.state === 'uploading' && (
                      <ProgressBar
                        progress={file.progress}
                        variant='neutral'
                        className='mt-1'
                      />
                    )}
                    {file.state === 'error' && (
                      <span className='text-xs text-[#474754]'>
                        {formatFileSize(file.size)}
                      </span>
                    )}
                  </div>
                </div>

                <div className='flex shrink-0 items-center gap-3'>
                  {file.state === 'error' && (
                    <Button
                      type='button'
                      variant='error'
                      mode='stroke'
                      size='small'
                      onClick={() => {
                        setUploadingFiles((prev: UploadingFile[]) =>
                          prev.filter((f) => f.id !== file.id)
                        );
                        try {
                          uppy.removeFile(file.id);
                        } catch {
                          /* ignore */
                        }
                        fileInputRef.current?.click();
                      }}
                    >
                      Try Again
                    </Button>
                  )}
                  <button
                    type='button'
                    className='text-[#484854] hover:text-red-500'
                    disabled={disabled}
                    onClick={() => {
                      setUploadingFiles((prev: UploadingFile[]) =>
                        prev.filter((f) => f.id !== file.id)
                      );
                      uppy.removeFile(file.id);
                    }}
                  >
                    <RiCloseLine size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Completed State (Attachments list) */}
        {attachments.length > 0 && uploadingFiles.length === 0 && (
          <div className='space-y-4'>
            {attachments.map((attachment) => (
              <div
                key={attachment.id}
                className='border-ds-neutral-200 flex h-[72px] w-full items-center justify-between gap-6 rounded-[15px] border bg-white py-4 pr-4 pl-6'
              >
                <div className='flex items-center gap-2'>
                  <div>
                    <RequestFileFormatIcon
                      fileType={
                        ((
                          Object.keys(fileTypes) as Array<
                            keyof typeof fileTypes
                          >
                        ).find((type) =>
                          fileTypes[type].includes(
                            attachment.mime_type as MimeType
                          )
                        ) as unknown as AttachmentType) || 'any'
                      }
                    />
                  </div>

                  <span className='flex flex-col text-sm text-[#474754]'>
                    <span className='font-bold'>
                      {uploadLabel ||
                        t('_domain.uploadFile.attachment.title') ||
                        attachment.file_name}
                    </span>
                    <div className='text-ds-neutral-600 flex items-center gap-1 font-normal'>
                      <RiCheckboxCircleFill
                        size={12}
                        className='text-green-600'
                      />
                      <span>
                        Completed • {formatFileSize(attachment.file_size)}
                      </span>
                    </div>
                  </span>
                </div>

                <div className='flex items-center gap-4'>
                  {onAttachmentDownload && (
                    <button
                      className='hover:text-ds-primary-500 text-[#484854]'
                      type='button'
                      title={t('_domain.download')}
                      disabled={disabled}
                      onClick={() => onAttachmentDownload(attachment.id)}
                    >
                      {FileDownloadIcon(false)}
                    </button>
                  )}
                  <button
                    className='text-[#484854] hover:text-red-500'
                    type='button'
                    title={t('_domain.delete')}
                    disabled={disabled}
                    onClick={() => onAttachmentRemove?.(attachment.id)}
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </div>
              </div>
            ))}
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

        {/* Upload progress cards and attachments list */}
        {(() => {
          const attachmentNames = new Set(attachments.map((a) => a.file_name));
          // Hide uploading cards for files that already appear in the attachments list
          const visibleUploads = uploadingFiles.filter(
            (f) => !attachmentNames.has(f.name)
          );

          return (
            <>
              {visibleUploads.length > 0 && (
                <div className='space-y-4'>
                  {visibleUploads.map((file) => (
                    <AttachmentListItem
                      key={file.id}
                      attachment={{
                        id: file.id,
                        file_name: file.name,
                        file_size: file.size,
                        mime_type: file.type,
                      }}
                      state={file.state}
                      progress={file.progress}
                      onRemove={() => {
                        setUploadingFiles((prev: UploadingFile[]) =>
                          prev.filter((f) => f.id !== file.id)
                        );
                        try {
                          uppy.removeFile(file.id);
                        } catch {
                          /* ignore */
                        }
                      }}
                      t={t}
                    />
                  ))}
                </div>
              )}

              {attachments.length > 0 && (
                <div className='space-y-4'>
                  {attachments.map((attachment) => (
                    <AttachmentListItem
                      key={attachment.id}
                      attachment={attachment}
                      onRemove={() => onAttachmentRemove?.(attachment.id)}
                      t={t}
                    />
                  ))}
                </div>
              )}
            </>
          );
        })()}
      </div>
    );
  }

  return (
    <UppyContextProvider
      uppy={uppy as unknown as Uppy<Meta, Record<string, never>>}
    >
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
                      'flex flex-col items-center justify-center gap-3 rounded-[16px] border border-dashed p-6 transition-colors',
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
                            t={t}
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
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
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
                          {t('_domain.uploadFile.image.recommended')}
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
                          className='h-full w-full object-cover'
                        />
                      </div>
                      <div className='flex min-w-0 flex-1 flex-col justify-center'>
                        <p className='truncate font-medium'>
                          {uploadedFileName || (
                            <span className='invisible'>...</span>
                          )}
                        </p>

                        <p className='text-ds-neutral-600 mt-1 text-xs'>
                          {t('_domain.uploadFile.image.formats')}
                        </p>

                        {/* <p className='mt-0.5 text-xs text-ds-neutral-600'>
                          {t('_domain.uploadFile.image.recommended.module')} */}
                        {/* </p> */}

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
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
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
                            className='h-full w-full object-cover'
                          />
                        )}
                        <span className='absolute inset-0 flex items-center justify-center mix-blend-plus-lighter'>
                          {videoIcon}
                        </span>
                      </div>
                      <div className='flex min-w-0 flex-1 flex-col justify-center'>
                        <p className='truncate font-medium'>
                          {uploadedFileName || (
                            <span className='invisible'>...</span>
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
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      {attachmentUploadIcon}

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

                      <div className='py-4 pr-4'>
                        <div className='flex min-w-0 flex-1 flex-col justify-center'>
                          <p className='truncate font-medium'>
                            {uploadedFileName || (
                              <span className='invisible'>...</span>
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
  handleFileChange,
  uploading,
}: FileUploadTriggerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    getRootProps: getDropZoneRootProps,
    getInputProps: getDropZoneInputProps,
  } = useDropzone({
    noClick: true,

    onDrop: (acceptedFiles: File[]) => {
      if (!acceptedFiles || acceptedFiles.length === 0) {
        return;
      }
      acceptedFiles.forEach((file) => {
        handleFileChange(file, fileInputRef);
      });
    },
  });

  const getButtonProps = () => ({
    type: 'button',
    onClick: () => {
      fileInputRef.current?.click();
    },
  });

  const acceptAttr = allowedFileTypes.join(',');

  return (
    <>
      <WrapperTag
        role='button'
        className={cn('', className)}
        style={{
          display: 'block',
        }}
        tabIndex={0}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (uploading) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
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
        ref={fileInputRef}
        type='file'
        accept={acceptAttr}
        className='hidden'
        disabled={uploading}
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            handleFileChange(files[0], fileInputRef);
          }
        }}
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
  state,
  progress = 0,
  onRemove,
  deleting,
  t,
}: AttachmentListItemProps) {
  const isImage = attachment.mime_type?.startsWith('image/');
  const isUploading = state === 'uploading';
  const isError = state === 'error';

  // Format date for display (e.g., "Jan 14, 2026")
  const formattedDate = attachment.created_at
    ? new Date(attachment.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <div
      className={cn(
        'border-ds-neutral-200 flex h-[104px] items-center gap-4 overflow-hidden rounded-[16px] border bg-white pr-6',
        isError && 'border-ds-error-base'
      )}
    >
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

        {/* Status indicator */}
        {isUploading && (
          <div className='flex items-center gap-1'>
            <RiLoader2Fill className='text-ds-information-base h-3.5 w-3.5 animate-spin' />
            <span className='text-ds-neutral-600 text-xs'>
              {t('components.fileUploadCard.uploading')}
            </span>
          </div>
        )}

        {isError && (
          <div className='flex items-center gap-1'>
            <RiErrorWarningFill className='text-ds-error-base h-3.5 w-3.5' />
            <span className='text-ds-error-base text-xs'>
              {t('components.fileUploadCard.failed')}
            </span>
          </div>
        )}

        {!state && formattedDate && (
          <p className='text-ds-neutral-400 text-xs'>
            {t('_domain.uploadFile.uploadedOn')}: {formattedDate}
          </p>
        )}

        {/* Progress bar */}
        {isUploading && (
          <div className='bg-ds-soft-200 mt-1 h-1.5 w-full overflow-hidden rounded-full'>
            <div
              className='bg-ds-information-base h-full rounded-full transition-all duration-300'
              style={{
                width: `${Math.min(100, Math.max(0, progress))}%`,
              }}
            />
          </div>
        )}
      </div>

      {/* Action button */}
      {isUploading ? (
        <button
          type='button'
          className='hover:bg-ds-weak-100 rounded-6 text-ds-sub-600 hover:text-ds-strong-950 shrink-0 p-1 transition-colors'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove();
          }}
        >
          <RiCloseLine className='h-5 w-5' />
        </button>
      ) : (
        <Button
          type='button'
          variant='error'
          mode='stroke'
          size='small'
          disabled={deleting}
          className='min-w-[74px] shrink-0'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove();
          }}
        >
          {deleting ? (
            <RiLoader4Line size={20} className='animate-spin' />
          ) : (
            t('_domain.remove')
          )}
        </Button>
      )}
    </div>
  );
}
