'use client';

import { useCallback, useRef, useState } from 'react';

// ─── Types ──────────────────────────────────────────────────────────────────

interface UseFileDownloadOptions {
  /**
   * API endpoint path that returns a signed URL for the given storage key.
   * Called with `POST { key }` and expected to return `{ data: { url } }`.
   */
  endpoint: string;
  /**
   * Base URL prepended to the endpoint.
   * @default ''
   */
  baseUrl?: string;
  /**
   * Function returning headers for the signed-URL request
   * (e.g. auth tokens, workspace keys). Called on each download.
   */
  headers?: () => Record<string, string>;
}

interface UseFileDownloadReturn {
  /** Download a private file by its storage key. */
  download: (key: string, fileName?: string) => Promise<void>;
  /** Whether a download is currently in progress. */
  isDownloading: boolean;
  /** The key currently being downloaded (null when idle). */
  activeKey: string | null;
  /** Last error, if any. */
  error: Error | null;
}

// ─── Hook ───────────────────────────────────────────────────────────────────

export function useFileDownload(
  options: UseFileDownloadOptions
): UseFileDownloadReturn {
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Store options in a ref so the callback doesn't depend on them
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const download = useCallback(async (key: string, fileName?: string) => {
    if (!key) return;

    // Abort any in-flight request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsDownloading(true);
    setActiveKey(key);
    setError(null);

    try {
      const opts = optionsRef.current;
      const baseUrl = opts.baseUrl ?? '';
      const apiUrl = `${baseUrl}${opts.endpoint}`;

      // 1. Get signed URL from the API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...opts.headers?.(),
        },
        body: JSON.stringify({ key }),
        signal: controller.signal,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message ?? 'Failed to get download URL');
      }

      const signedUrl: string | undefined = result.data?.url;
      if (!signedUrl) {
        throw new Error('No download URL returned');
      }

      // 2. Fetch the file as a blob so we can control the filename
      //    (cross-origin URLs ignore the `download` attribute)
      const fileResponse = await fetch(signedUrl, {
        signal: controller.signal,
      });

      if (!fileResponse.ok) {
        throw new Error('Failed to fetch file');
      }

      const blob = await fileResponse.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName ?? 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setError(err instanceof Error ? err : new Error('Download failed'));
    } finally {
      setIsDownloading(false);
      setActiveKey(null);
      abortRef.current = null;
    }
  }, []);

  return { download, isDownloading, activeKey, error };
}

export type { UseFileDownloadOptions, UseFileDownloadReturn };
