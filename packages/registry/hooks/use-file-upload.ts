import * as React from 'react';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import type { UppyFile } from '@uppy/core';

// ─── Types ──────────────────────────────────────────────────────────────────

type UploadFileStatus = 'pending' | 'uploading' | 'completed' | 'failed';

interface UploadFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: UploadFileStatus;
  url?: string;
  key?: string;
  preview?: string;
  error?: string;
}

interface UseFileUploadOptions {
  endpoint: string;
  baseUrl?: string;
  headers?: () => Record<string, string>;
  providerId: string;
  assetType: string;
  acl?: 'private' | 'public-read';
  maxFiles?: number;
  maxFileSize?: number;
  allowedFileTypes?: string[];
  onUploadSuccess?: (file: UploadFile) => void;
  onUploadError?: (file: UploadFile, error: Error) => void;
  onFileRemove?: (file: UploadFile) => void;
}

interface UseFileUploadReturn {
  files: UploadFile[];
  isUploading: boolean;
  isDraggingOver: boolean;
  addFiles: (files: File[]) => void;
  removeFile: (id: string) => void;
  retryFile: (id: string) => void;
  clearFiles: () => void;
  openFilePicker: () => void;
  getInputProps: () => React.InputHTMLAttributes<HTMLInputElement> & {
    ref: React.RefObject<HTMLInputElement>;
  };
  getRootProps: () => {
    onDrop: (e: React.DragEvent) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDragEnter: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
  };
}

// ─── Meta types ─────────────────────────────────────────────────────────────

interface UppyMeta extends Record<string, unknown> {
  publicUrl?: string;
  key?: string;
  signedHeaders?: Record<string, string>;
}

type UppyBody = Record<string, unknown>;

// ─── Hook ───────────────────────────────────────────────────────────────────

export function useFileUpload(
  options: UseFileUploadOptions
): UseFileUploadReturn {
  const {
    endpoint,
    baseUrl = '',
    headers,
    providerId,
    assetType,
    acl = 'private',
    maxFiles = 1,
    maxFileSize = 5 * 1024 * 1024,
    allowedFileTypes,
    onUploadSuccess,
    onUploadError,
    onFileRemove,
  } = options;

  const [files, setFiles] = React.useState<UploadFile[]>([]);
  const [isDraggingOver, setIsDraggingOver] = React.useState(false);
  const dragCounterRef = React.useRef(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const rawFilesRef = React.useRef<Map<string, File>>(new Map());

  // Latest props ref to avoid stale closures in async Uppy callbacks
  const latestPropsRef = React.useRef({
    headers,
    providerId,
    assetType,
    acl,
    onUploadSuccess,
    onUploadError,
    onFileRemove,
  });

  React.useEffect(() => {
    latestPropsRef.current = {
      headers,
      providerId,
      assetType,
      acl,
      onUploadSuccess,
      onUploadError,
      onFileRemove,
    };
  }, [
    headers,
    providerId,
    assetType,
    acl,
    onUploadSuccess,
    onUploadError,
    onFileRemove,
  ]);

  // Create Uppy instance
  const [uppy] = React.useState(() => {
    const uppyInstance = new Uppy<UppyMeta, UppyBody>({
      autoProceed: false,
      restrictions: {
        maxFileSize,
        maxNumberOfFiles: maxFiles,
        allowedFileTypes: allowedFileTypes ?? null,
      },
    });

    uppyInstance.use(XHRUpload, {
      endpoint: async (
        file: UppyFile<UppyMeta, UppyBody> | UppyFile<UppyMeta, UppyBody>[]
      ) => {
        if (Array.isArray(file)) throw new Error('Bundling not supported');

        const {
          headers: getHeaders,
          providerId: pid,
          assetType: at,
          acl: a,
        } = latestPropsRef.current;
        const authHeaders = getHeaders?.() ?? {};

        const preSignedResponse = await fetch(`${baseUrl}${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...authHeaders,
          },
          body: JSON.stringify({
            type: at,
            provider_id: pid,
            content_type: file.type,
            acl: a,
          }),
        });

        if (!preSignedResponse.ok) {
          const errorData = await preSignedResponse.json().catch(() => ({}));
          throw new Error(errorData.message || 'Failed to get upload URL');
        }

        const { item } = await preSignedResponse.json();

        uppyInstance.setFileMeta(file.id, {
          publicUrl: item.url,
          key: item.key,
          signedHeaders: item.headers,
        });

        return item.signedUrl;
      },
      method: 'PUT',
      formData: false,
      headers: (file: UppyFile<UppyMeta, UppyBody>) => {
        const extraHeaders = file?.meta?.signedHeaders || {};
        return {
          'Content-Type': file.type,
          ...extraHeaders,
        };
      },
      getResponseData() {
        return { url: '' };
      },
    });

    return uppyInstance;
  });

  // Wire Uppy events
  React.useEffect(() => {
    const onFileAdded = (file: UppyFile<UppyMeta, UppyBody>) => {
      if (!file) return;

      const preview = file.type?.startsWith('image/')
        ? URL.createObjectURL(file.data as Blob)
        : undefined;

      setFiles((prev) => [
        ...prev,
        {
          id: file.id,
          name: file.name ?? 'unknown',
          size: file.size ?? 0,
          type: file.type ?? '',
          progress: 0,
          status: 'uploading',
          preview,
        },
      ]);

      uppy.upload();
    };

    const onUploadProgress = (
      file: UppyFile<UppyMeta, UppyBody> | undefined,
      progress: { bytesTotal: number | null; bytesUploaded: number }
    ) => {
      if (!file) return;
      const pct = progress.bytesTotal
        ? Math.round((progress.bytesUploaded / progress.bytesTotal) * 100)
        : 0;

      setFiles((prev) =>
        prev.map((f) => (f.id === file.id ? { ...f, progress: pct } : f))
      );
    };

    const onUploadSuccess = (
      file: UppyFile<UppyMeta, UppyBody> | undefined
    ) => {
      if (!file) return;

      setFiles((prev) =>
        prev.map((f) => {
          if (f.id !== file.id) return f;
          const updated: UploadFile = {
            ...f,
            status: 'completed',
            progress: 100,
            url: (file.meta?.publicUrl as string) ?? undefined,
            key: (file.meta?.key as string) ?? undefined,
          };
          latestPropsRef.current.onUploadSuccess?.(updated);
          return updated;
        })
      );
    };

    const onUploadError = (
      file: UppyFile<UppyMeta, UppyBody> | undefined,
      error: { name: string; message: string; details?: string }
    ) => {
      if (!file) return;

      setFiles((prev) =>
        prev.map((f) => {
          if (f.id !== file.id) return f;
          const updated: UploadFile = {
            ...f,
            status: 'failed',
            error: error?.message ?? 'Upload failed',
          };
          latestPropsRef.current.onUploadError?.(
            updated,
            new Error(error.message)
          );
          return updated;
        })
      );
    };

    const onRestrictionFailed = (
      file: UppyFile<UppyMeta, UppyBody> | undefined,
      error: Error
    ) => {
      if (!file) return;

      setFiles((prev) =>
        prev.map((f) => {
          if (f.id !== file.id) return f;
          return {
            ...f,
            status: 'failed' as const,
            error: error?.message ?? 'File not allowed',
          };
        })
      );
    };

    uppy.on('file-added', onFileAdded);
    uppy.on('upload-progress', onUploadProgress);
    uppy.on('upload-success', onUploadSuccess);
    uppy.on('upload-error', onUploadError);
    uppy.on('restriction-failed', onRestrictionFailed);

    return () => {
      uppy.off('file-added', onFileAdded);
      uppy.off('upload-progress', onUploadProgress);
      uppy.off('upload-success', onUploadSuccess);
      uppy.off('upload-error', onUploadError);
      uppy.off('restriction-failed', onRestrictionFailed);
    };
  }, [uppy]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      // Revoke all preview URLs
      files.forEach((f) => {
        if (f.preview) URL.revokeObjectURL(f.preview);
      });
      uppy.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Methods ──────────────────────────────────────────────────────────────

  const addFiles = React.useCallback(
    (newFiles: File[]) => {
      // When maxFiles is 1, clear existing files so the new one can replace it
      const currentFiles = uppy.getFiles();
      if (maxFiles === 1 && currentFiles.length > 0) {
        currentFiles.forEach((f) => {
          const existing = files.find((ef) => ef.id === f.id);
          if (existing?.preview) URL.revokeObjectURL(existing.preview);
          uppy.removeFile(f.id);
        });
        rawFilesRef.current.clear();
        setFiles([]);
      }

      newFiles.forEach((file) => {
        try {
          const added = uppy.addFile({
            source: 'file input',
            name: file.name,
            type: file.type,
            data: file,
          });
          rawFilesRef.current.set(added, file);
        } catch (err) {
          if (!(err as { isRestriction?: boolean })?.isRestriction) {
            console.error('useFileUpload: add file error', err);
          }
        }
      });

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [uppy, maxFiles, files]
  );

  const removeFile = React.useCallback(
    (id: string) => {
      const file = files.find((f) => f.id === id);
      if (file?.preview) URL.revokeObjectURL(file.preview);

      setFiles((prev) => prev.filter((f) => f.id !== id));
      rawFilesRef.current.delete(id);

      try {
        uppy.removeFile(id);
      } catch {
        // File may already be removed from Uppy
      }

      if (file) latestPropsRef.current.onFileRemove?.(file);
    },
    [files, uppy]
  );

  const retryFile = React.useCallback(
    (id: string) => {
      const rawFile = rawFilesRef.current.get(id);
      if (!rawFile) return;

      // Remove old entry
      try {
        uppy.removeFile(id);
      } catch {
        // Already removed
      }

      setFiles((prev) => prev.filter((f) => f.id !== id));
      rawFilesRef.current.delete(id);

      // Re-add
      try {
        const newId = uppy.addFile({
          source: 'file input',
          name: rawFile.name,
          type: rawFile.type,
          data: rawFile,
        });
        rawFilesRef.current.set(newId, rawFile);
      } catch (err) {
        console.error('useFileUpload: retry error', err);
      }
    },
    [uppy]
  );

  const clearFiles = React.useCallback(() => {
    files.forEach((f) => {
      if (f.preview) URL.revokeObjectURL(f.preview);
    });
    setFiles([]);
    rawFilesRef.current.clear();
    uppy.clear();
  }, [files, uppy]);

  const openFilePicker = React.useCallback(() => {
    inputRef.current?.click();
  }, []);

  const getInputProps = React.useCallback(
    () => ({
      type: 'file' as const,
      className: 'hidden',
      tabIndex: -1,
      multiple: maxFiles !== 1,
      accept: allowedFileTypes?.join(','),
      ref: inputRef as React.RefObject<HTMLInputElement>,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          addFiles(Array.from(e.target.files));
        }
      },
    }),
    [maxFiles, allowedFileTypes, addFiles]
  );

  const getRootProps = React.useCallback(
    () => ({
      onDrop: (e: React.DragEvent) => {
        e.preventDefault();
        dragCounterRef.current = 0;
        setIsDraggingOver(false);
        if (e.dataTransfer.files) {
          addFiles(Array.from(e.dataTransfer.files));
        }
      },
      onDragOver: (e: React.DragEvent) => {
        e.preventDefault();
      },
      onDragEnter: (e: React.DragEvent) => {
        e.preventDefault();
        dragCounterRef.current++;
        if (dragCounterRef.current === 1) {
          setIsDraggingOver(true);
        }
      },
      onDragLeave: (e: React.DragEvent) => {
        e.preventDefault();
        dragCounterRef.current--;
        if (dragCounterRef.current === 0) {
          setIsDraggingOver(false);
        }
      },
    }),
    [addFiles]
  );

  const isUploading = files.some((f) => f.status === 'uploading');

  return {
    files,
    isUploading,
    isDraggingOver,
    addFiles,
    removeFile,
    retryFile,
    clearFiles,
    openFilePicker,
    getInputProps,
    getRootProps,
  };
}

export type {
  UploadFile,
  UploadFileStatus,
  UseFileUploadOptions,
  UseFileUploadReturn,
};
