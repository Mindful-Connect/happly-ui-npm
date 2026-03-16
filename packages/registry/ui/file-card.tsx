import * as React from 'react';
import {
  RiCheckboxCircleFill,
  RiCloseLine,
  RiDeleteBinLine,
  RiDownloadLine,
  RiErrorWarningFill,
  RiLoader2Fill,
  RiVideoFill,
  RiVolumeUpFill,
} from '@remixicon/react';

import { cn } from '@/lib/happly-ui-utils';
import { tv, type VariantProps } from '@/lib/tv';
import * as Button from '@/components/ui/button';
import * as FileFormatIcon from '@/components/ui/file-format-icon';
import { getFormatColor } from '@/components/ui/file-format-icon';

// ─── Variants ────────────────────────────────────────────────────────────────

const fileCardVariants = tv({
  base: 'flex w-full flex-col items-stretch overflow-clip rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs @sm:flex-row @sm:items-center',
});

// ─── Root ────────────────────────────────────────────────────────────────────

type FileCardRootProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof fileCardVariants>;

const FileCardRoot = React.forwardRef<HTMLDivElement, FileCardRootProps>(
  ({ className, ...rest }, forwardedRef) => {
    return (
      <div className='@container w-full'>
        <div ref={forwardedRef} className={cn(fileCardVariants(), className)} {...rest} />
      </div>
    );
  },
);
FileCardRoot.displayName = 'FileCardRoot';

// ─── Thumbnail ───────────────────────────────────────────────────────────────

const FileCardThumbnail = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...rest }, forwardedRef) => {
  return (
    <div
      ref={forwardedRef}
      className={cn(
        'flex h-[104px] w-full shrink-0 items-center justify-center overflow-clip bg-bg-weak-50 @sm:w-44',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});
FileCardThumbnail.displayName = 'FileCardThumbnail';

// ─── Image Thumbnail ─────────────────────────────────────────────────────────

const FileCardImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, alt = '', ...rest }, forwardedRef) => {
  return (
    <img
      ref={forwardedRef}
      alt={alt}
      className={cn('h-full w-full object-cover', className)}
      {...rest}
    />
  );
});
FileCardImage.displayName = 'FileCardImage';

// ─── Video Thumbnail ─────────────────────────────────────────────────────────

const FileCardVideo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { src: string; alt?: string }
>(({ className, src, alt = '', children, ...rest }, forwardedRef) => {
  return (
    <div ref={forwardedRef} className={cn('relative h-full w-full', className)} {...rest}>
      <img src={src} alt={alt} className='h-full w-full object-cover' />
      <div className='absolute inset-0 flex items-center justify-center'>
        <RiVideoFill className='size-8 text-text-soft-400' />
      </div>
      {children}
    </div>
  );
});
FileCardVideo.displayName = 'FileCardVideo';

// ─── Audio Thumbnail ─────────────────────────────────────────────────────────

const FileCardAudio = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <div
      ref={forwardedRef}
      className={cn('flex h-full w-full items-center justify-center bg-bg-weak-50', className)}
      {...rest}
    >
      <div className='flex items-center justify-center rounded-full bg-white/40 p-2.5'>
        <RiVolumeUpFill className='size-8 text-text-sub-600' />
      </div>
    </div>
  );
});
FileCardAudio.displayName = 'FileCardAudio';

// ─── Content ─────────────────────────────────────────────────────────────────

const FileCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <div
      ref={forwardedRef}
      className={cn(
        'flex min-w-0 flex-1 items-center gap-4 self-stretch pl-5 pr-6 py-4',
        className,
      )}
      {...rest}
    />
  );
});
FileCardContent.displayName = 'FileCardContent';

// ─── Body (filename + meta stacked vertically) ──────────────────────────────

const FileCardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <div
      ref={forwardedRef}
      className={cn('flex min-w-0 flex-1 flex-col justify-center gap-1', className)}
      {...rest}
    />
  );
});
FileCardBody.displayName = 'FileCardBody';

// ─── Upload Body (uploading/failed: different gap structure) ─────────────────

const FileCardUploadBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <div
      ref={forwardedRef}
      className={cn('flex min-w-0 flex-1 flex-col justify-center gap-3', className)}
      {...rest}
    />
  );
});
FileCardUploadBody.displayName = 'FileCardUploadBody';

// ─── Info Group (name + status with gap-1.5 for upload states) ───────────────

const FileCardInfoGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <div
      ref={forwardedRef}
      className={cn('flex flex-col gap-1.5', className)}
      {...rest}
    />
  );
});
FileCardInfoGroup.displayName = 'FileCardInfoGroup';

// ─── Name ────────────────────────────────────────────────────────────────────

const FileCardName = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <p
      ref={forwardedRef}
      className={cn('truncate text-label-sm text-text-strong-950', className)}
      {...rest}
    />
  );
});
FileCardName.displayName = 'FileCardName';

// ─── Meta ────────────────────────────────────────────────────────────────────

const FileCardMeta = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <p
      ref={forwardedRef}
      className={cn('truncate text-paragraph-xs text-text-sub-600', className)}
      {...rest}
    />
  );
});
FileCardMeta.displayName = 'FileCardMeta';

// ─── Hint ────────────────────────────────────────────────────────────────────

const FileCardHint = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <p
      ref={forwardedRef}
      className={cn('truncate text-paragraph-xs text-text-soft-400', className)}
      {...rest}
    />
  );
});
FileCardHint.displayName = 'FileCardHint';

// ─── Status ──────────────────────────────────────────────────────────────────

type FileCardStatusProps = React.HTMLAttributes<HTMLDivElement> & {
  status: 'uploading' | 'failed';
};

const FileCardStatus = React.forwardRef<HTMLDivElement, FileCardStatusProps>(
  ({ className, status, children, ...rest }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        className={cn('flex items-center gap-1', className)}
        {...rest}
      >
        {status === 'uploading' && (
          <RiLoader2Fill className='size-4 shrink-0 animate-spin text-text-sub-600' />
        )}
        {status === 'failed' && (
          <RiErrorWarningFill className='size-4 shrink-0 text-error-base' />
        )}
        <span className='text-paragraph-xs text-text-strong-950'>{children}</span>
      </div>
    );
  },
);
FileCardStatus.displayName = 'FileCardStatus';

// ─── Progress ────────────────────────────────────────────────────────────────

type FileCardProgressProps = React.HTMLAttributes<HTMLDivElement> & {
  value?: number;
  max?: number;
};

const FileCardProgress = React.forwardRef<HTMLDivElement, FileCardProgressProps>(
  ({ className, value = 0, max = 100, ...rest }, forwardedRef) => {
    const safeValue = Math.min(max, Math.max(value, 0));

    return (
      <div
        ref={forwardedRef}
        className={cn('h-1.5 w-full overflow-clip rounded-full bg-bg-soft-200', className)}
        {...rest}
      >
        <div
          className='h-full rounded-full bg-information-base transition-all duration-300 ease-out'
          style={{ width: `${(safeValue / max) * 100}%` }}
          role='progressbar'
          aria-valuenow={safeValue}
          aria-valuemax={max}
        />
      </div>
    );
  },
);
FileCardProgress.displayName = 'FileCardProgress';

// ─── Actions ─────────────────────────────────────────────────────────────────

const FileCardActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <div
      ref={forwardedRef}
      className={cn('flex shrink-0 items-center', className)}
      {...rest}
    />
  );
});
FileCardActions.displayName = 'FileCardActions';

// ─── Remove Button ───────────────────────────────────────────────────────────

const FileCardRemoveButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button.Root>
>(({ className, children = 'Remove', ...rest }, forwardedRef) => {
  return (
    <Button.Root
      ref={forwardedRef}
      variant='error'
      mode='stroke'
      size='xsmall'
      className={className}
      {...rest}
    >
      {children}
    </Button.Root>
  );
});
FileCardRemoveButton.displayName = 'FileCardRemoveButton';

// ─── Download Button ─────────────────────────────────────────────────────────

const FileCardDownloadButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <button
      ref={forwardedRef}
      type='button'
      className={cn(
        'flex shrink-0 items-center justify-center rounded-md p-0.5 text-text-sub-600',
        'transition duration-200 ease-out hover:text-text-strong-950',
        className,
      )}
      {...rest}
    >
      <RiDownloadLine className='size-5' />
    </button>
  );
});
FileCardDownloadButton.displayName = 'FileCardDownloadButton';

// ─── Close Button ────────────────────────────────────────────────────────────

const FileCardCloseButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <button
      ref={forwardedRef}
      type='button'
      className={cn(
        'flex shrink-0 items-center justify-center rounded-md p-0.5 text-text-sub-600',
        'transition duration-200 ease-out hover:text-text-strong-950',
        className,
      )}
      {...rest}
    >
      <RiCloseLine className='size-5' />
    </button>
  );
});
FileCardCloseButton.displayName = 'FileCardCloseButton';

// ─── Retry Link ──────────────────────────────────────────────────────────────

const FileCardRetryLink = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children = 'Try Again', ...rest }, forwardedRef) => {
  return (
    <button
      ref={forwardedRef}
      type='button'
      className={cn(
        'self-start text-label-sm text-error-base underline decoration-solid',
        'transition duration-200 ease-out hover:text-error-dark',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
});
FileCardRetryLink.displayName = 'FileCardRetryLink';

// ═══════════════════════════════════════════════════════════════════════════════
// COMPACT VARIANT
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Compact Root ───────────────────────────────────────────────────────────

const compactRootVariants = tv({
  base: 'flex w-full flex-col items-start justify-center gap-4 overflow-clip rounded-xl border bg-bg-white-0 pl-3.5 pr-4 py-4',
  variants: {
    error: {
      true: 'border-error-base',
      false: 'border-stroke-soft-200',
    },
  },
  defaultVariants: {
    error: false,
  },
});

type CompactRootProps = React.HTMLAttributes<HTMLDivElement> & {
  error?: boolean;
};

const FileCardCompactRoot = React.forwardRef<HTMLDivElement, CompactRootProps>(
  ({ className, error, children, ...rest }, forwardedRef) => {
    return (
      <div ref={forwardedRef} className={cn(compactRootVariants({ error }), className)} {...rest}>
        {children}
      </div>
    );
  },
);
FileCardCompactRoot.displayName = 'FileCardCompactRoot';

// ─── Compact Content ────────────────────────────────────────────────────────

const FileCardCompactContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <div
      ref={forwardedRef}
      className={cn('flex w-full items-start gap-3', className)}
      {...rest}
    />
  );
});
FileCardCompactContent.displayName = 'FileCardCompactContent';

// ─── Compact Body ───────────────────────────────────────────────────────────

const FileCardCompactBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <div
      ref={forwardedRef}
      className={cn('flex min-w-0 flex-1 flex-col items-start gap-1', className)}
      {...rest}
    />
  );
});
FileCardCompactBody.displayName = 'FileCardCompactBody';

// ─── Compact Error Body ─────────────────────────────────────────────────────

const FileCardCompactErrorBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <div
      ref={forwardedRef}
      className={cn('flex min-w-0 flex-1 flex-col items-start gap-2', className)}
      {...rest}
    />
  );
});
FileCardCompactErrorBody.displayName = 'FileCardCompactErrorBody';

// ─── Compact Description ────────────────────────────────────────────────────

const FileCardCompactDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <div
      ref={forwardedRef}
      className={cn('flex w-full items-center gap-1', className)}
      {...rest}
    />
  );
});
FileCardCompactDescription.displayName = 'FileCardCompactDescription';

// ─── Compact Dot Separator ──────────────────────────────────────────────────

function FileCardDot({ className }: { className?: string }) {
  return (
    <span className={cn('shrink-0 text-paragraph-xs text-text-sub-600', className)}>∙</span>
  );
}
FileCardDot.displayName = 'FileCardDot';

// ─── Compact Status ─────────────────────────────────────────────────────────

type CompactStatusProps = React.HTMLAttributes<HTMLDivElement> & {
  status: 'uploading' | 'completed' | 'failed';
};

const FileCardCompactStatus = React.forwardRef<HTMLDivElement, CompactStatusProps>(
  ({ className, status, children, ...rest }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        className={cn('flex shrink-0 items-start gap-1', className)}
        {...rest}
      >
        {status === 'uploading' && (
          <RiLoader2Fill className='size-4 shrink-0 animate-spin text-text-sub-600' />
        )}
        {status === 'completed' && (
          <RiCheckboxCircleFill className='size-4 shrink-0 text-success-base' />
        )}
        {status === 'failed' && (
          <RiErrorWarningFill className='size-4 shrink-0 text-error-base' />
        )}
        <span className='text-paragraph-xs text-text-strong-950'>{children}</span>
      </div>
    );
  },
);
FileCardCompactStatus.displayName = 'FileCardCompactStatus';

// ─── Delete Button ──────────────────────────────────────────────────────────

const FileCardDeleteButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <button
      ref={forwardedRef}
      type='button'
      className={cn(
        'flex shrink-0 items-center justify-center rounded-md p-0.5 text-text-sub-600',
        'transition duration-200 ease-out hover:text-text-strong-950',
        className,
      )}
      {...rest}
    >
      <RiDeleteBinLine className='size-5' />
    </button>
  );
});
FileCardDeleteButton.displayName = 'FileCardDeleteButton';

// ═══════════════════════════════════════════════════════════════════════════════
// ITEM PRESET
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Inline helpers ─────────────────────────────────────────────────────────

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

function getFileFormat(name: string): string {
  const ext = name.split('.').pop()?.toUpperCase() ?? '';
  return ext;
}


function isImageType(type: string): boolean {
  return type.startsWith('image/');
}

// ─── Item component ─────────────────────────────────────────────────────────

interface FileCardItemFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'failed';
  url?: string;
  preview?: string;
  error?: string;
}

interface FileCardItemProps {
  file: FileCardItemFile;
  variant?: 'default' | 'compact';
  onRemove?: () => void;
  onRetry?: () => void;
  onClose?: () => void;
  onDownload?: () => void;
  className?: string;
}

function FileCardItem({ file, variant = 'default', onRemove, onRetry, onClose, onDownload, className }: FileCardItemProps) {
  const format = getFileFormat(file.name);
  const color = getFormatColor(format);
  const size = formatFileSize(file.size);
  const isImage = isImageType(file.type);
  const isActive = file.status === 'uploading' || file.status === 'pending';

  if (variant === 'compact') {
    if (file.status === 'failed') {
      return (
        <FileCardCompactRoot error className={className}>
          <FileCardCompactContent>
            <FileFormatIcon.Root format={format} color={color} size='medium' />
            <FileCardCompactErrorBody>
              <FileCardCompactBody>
                <FileCardName>{file.name}</FileCardName>
                <FileCardCompactDescription>
                  <FileCardMeta>{size}</FileCardMeta>
                  <FileCardDot />
                  <FileCardCompactStatus status='failed'>Failed</FileCardCompactStatus>
                </FileCardCompactDescription>
              </FileCardCompactBody>
              {onRetry && <FileCardRetryLink onClick={onRetry} />}
            </FileCardCompactErrorBody>
            {onRemove && <FileCardDeleteButton onClick={onRemove} />}
          </FileCardCompactContent>
        </FileCardCompactRoot>
      );
    }

    return (
      <FileCardCompactRoot className={className}>
        <FileCardCompactContent>
          <FileFormatIcon.Root format={format} color={color} size='medium' />
          <FileCardCompactBody>
            <FileCardName>{file.name}</FileCardName>
            <FileCardCompactDescription>
              <FileCardMeta>
                {isActive ? `${formatFileSize(Math.round(file.size * file.progress / 100))} of ${size}` : size}
              </FileCardMeta>
              <FileCardDot />
              <FileCardCompactStatus status={file.status === 'completed' ? 'completed' : 'uploading'}>
                {file.status === 'completed' ? 'Completed' : 'Uploading...'}
              </FileCardCompactStatus>
            </FileCardCompactDescription>
          </FileCardCompactBody>
          {isActive && onClose && <FileCardCloseButton onClick={onClose} />}
          {file.status === 'completed' && onDownload && <FileCardDownloadButton onClick={onDownload} />}
          {file.status === 'completed' && onRemove && <FileCardDeleteButton onClick={onRemove} />}
        </FileCardCompactContent>
        {isActive && <FileCardProgress value={file.progress} />}
      </FileCardCompactRoot>
    );
  }

  // ─── Default variant ────────────────────────────────────────────────────

  if (isActive) {
    return (
      <FileCardRoot className={className}>
        <FileCardThumbnail>
          <FileFormatIcon.Root format={format} color={color} size='medium' />
        </FileCardThumbnail>
        <FileCardContent>
          <FileCardUploadBody>
            <FileCardInfoGroup>
              <FileCardName>{file.name}</FileCardName>
              <FileCardStatus status='uploading'>Uploading...</FileCardStatus>
            </FileCardInfoGroup>
            <FileCardProgress value={file.progress} />
          </FileCardUploadBody>
          <FileCardActions>
            {onClose && <FileCardCloseButton onClick={onClose} />}
          </FileCardActions>
        </FileCardContent>
      </FileCardRoot>
    );
  }

  if (file.status === 'failed') {
    return (
      <FileCardRoot className={className}>
        <FileCardThumbnail>
          <FileFormatIcon.Root format={format} color={color} size='medium' />
        </FileCardThumbnail>
        <FileCardContent>
          <FileCardUploadBody>
            <FileCardInfoGroup>
              <FileCardName>{file.name}</FileCardName>
              <FileCardStatus status='failed'>Failed</FileCardStatus>
            </FileCardInfoGroup>
            {onRetry && <FileCardRetryLink onClick={onRetry} />}
          </FileCardUploadBody>
          <FileCardActions>
            {onRemove && <FileCardRemoveButton onClick={onRemove} />}
          </FileCardActions>
        </FileCardContent>
      </FileCardRoot>
    );
  }

  // Completed
  const thumbnailSrc = file.preview ?? file.url;

  return (
    <FileCardRoot className={className}>
      <FileCardThumbnail className={isImage && thumbnailSrc ? 'bg-transparent' : undefined}>
        {isImage && thumbnailSrc ? (
          <FileCardImage src={thumbnailSrc} alt={file.name} />
        ) : (
          <FileFormatIcon.Root format={format} color={color} size='medium' />
        )}
      </FileCardThumbnail>
      <FileCardContent>
        <FileCardBody>
          <FileCardName>{file.name}</FileCardName>
          <FileCardMeta>{size}</FileCardMeta>
          {isImage && <FileCardHint>Image uploaded successfully</FileCardHint>}
        </FileCardBody>
        <FileCardActions>
          {onDownload && <FileCardDownloadButton onClick={onDownload} />}
          {onRemove && <FileCardRemoveButton onClick={onRemove} />}
        </FileCardActions>
      </FileCardContent>
    </FileCardRoot>
  );
}
FileCardItem.displayName = 'FileCardItem';

export {
  FileCardRoot as Root,
  FileCardThumbnail as Thumbnail,
  FileCardImage as Image,
  FileCardVideo as Video,
  FileCardAudio as Audio,
  FileCardContent as Content,
  FileCardBody as Body,
  FileCardUploadBody as UploadBody,
  FileCardInfoGroup as InfoGroup,
  FileCardName as Name,
  FileCardMeta as Meta,
  FileCardHint as Hint,
  FileCardStatus as Status,
  FileCardProgress as Progress,
  FileCardActions as Actions,
  FileCardRemoveButton as RemoveButton,
  FileCardDownloadButton as DownloadButton,
  FileCardCloseButton as CloseButton,
  FileCardRetryLink as RetryLink,
  FileCardCompactRoot as CompactRoot,
  FileCardCompactContent as CompactContent,
  FileCardCompactBody as CompactBody,
  FileCardCompactErrorBody as CompactErrorBody,
  FileCardCompactDescription as CompactDescription,
  FileCardDot as Dot,
  FileCardCompactStatus as CompactStatus,
  FileCardDeleteButton as DeleteButton,
  FileCardItem as Item,
  fileCardVariants,
  compactRootVariants,
};
