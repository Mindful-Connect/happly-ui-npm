import * as React from 'react';
import {
  RiCheckboxCircleFill,
  RiCloseLine,
  RiDeleteBinLine,
  RiErrorWarningFill,
  RiLoader2Fill,
  RiVideoFill,
  RiVolumeUpFill,
} from '@remixicon/react';

import { cn } from '@/lib/happly-ui-utils';
import { tv, type VariantProps } from '@/lib/tv';
import * as Button from '@/components/ui/button';
import * as FileFormatIcon from '@/components/ui/file-format-icon';

// ─── Variants ────────────────────────────────────────────────────────────────

const fileUploadCardVariants = tv({
  base: 'flex w-full flex-col items-stretch overflow-clip rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs @sm:flex-row @sm:items-center',
});

// ─── Root ────────────────────────────────────────────────────────────────────

type FileUploadCardRootProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof fileUploadCardVariants>;

const FileUploadCardRoot = React.forwardRef<HTMLDivElement, FileUploadCardRootProps>(
  ({ className, ...rest }, forwardedRef) => {
    return (
      <div className='@container w-full'>
        <div ref={forwardedRef} className={cn(fileUploadCardVariants(), className)} {...rest} />
      </div>
    );
  },
);
FileUploadCardRoot.displayName = 'FileUploadCardRoot';

// ─── Thumbnail ───────────────────────────────────────────────────────────────

const FileUploadCardThumbnail = React.forwardRef<
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
FileUploadCardThumbnail.displayName = 'FileUploadCardThumbnail';

// ─── Image Thumbnail ─────────────────────────────────────────────────────────

const FileUploadCardImage = React.forwardRef<
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
FileUploadCardImage.displayName = 'FileUploadCardImage';

// ─── Video Thumbnail ─────────────────────────────────────────────────────────

const FileUploadCardVideo = React.forwardRef<
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
FileUploadCardVideo.displayName = 'FileUploadCardVideo';

// ─── Audio Thumbnail ─────────────────────────────────────────────────────────

const FileUploadCardAudio = React.forwardRef<
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
FileUploadCardAudio.displayName = 'FileUploadCardAudio';

// ─── Content ─────────────────────────────────────────────────────────────────

const FileUploadCardContent = React.forwardRef<
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
FileUploadCardContent.displayName = 'FileUploadCardContent';

// ─── Body (filename + meta stacked vertically) ──────────────────────────────

const FileUploadCardBody = React.forwardRef<
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
FileUploadCardBody.displayName = 'FileUploadCardBody';

// ─── Upload Body (uploading/failed: different gap structure) ─────────────────

const FileUploadCardUploadBody = React.forwardRef<
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
FileUploadCardUploadBody.displayName = 'FileUploadCardUploadBody';

// ─── Info Group (name + status with gap-1.5 for upload states) ───────────────

const FileUploadCardInfoGroup = React.forwardRef<
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
FileUploadCardInfoGroup.displayName = 'FileUploadCardInfoGroup';

// ─── Name ────────────────────────────────────────────────────────────────────

const FileUploadCardName = React.forwardRef<
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
FileUploadCardName.displayName = 'FileUploadCardName';

// ─── Meta ────────────────────────────────────────────────────────────────────

const FileUploadCardMeta = React.forwardRef<
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
FileUploadCardMeta.displayName = 'FileUploadCardMeta';

// ─── Hint ────────────────────────────────────────────────────────────────────

const FileUploadCardHint = React.forwardRef<
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
FileUploadCardHint.displayName = 'FileUploadCardHint';

// ─── Status ──────────────────────────────────────────────────────────────────

type FileUploadCardStatusProps = React.HTMLAttributes<HTMLDivElement> & {
  status: 'uploading' | 'failed';
};

const FileUploadCardStatus = React.forwardRef<HTMLDivElement, FileUploadCardStatusProps>(
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
FileUploadCardStatus.displayName = 'FileUploadCardStatus';

// ─── Progress ────────────────────────────────────────────────────────────────

type FileUploadCardProgressProps = React.HTMLAttributes<HTMLDivElement> & {
  value?: number;
  max?: number;
};

const FileUploadCardProgress = React.forwardRef<HTMLDivElement, FileUploadCardProgressProps>(
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
FileUploadCardProgress.displayName = 'FileUploadCardProgress';

// ─── Actions ─────────────────────────────────────────────────────────────────

const FileUploadCardActions = React.forwardRef<
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
FileUploadCardActions.displayName = 'FileUploadCardActions';

// ─── Remove Button ───────────────────────────────────────────────────────────

const FileUploadCardRemoveButton = React.forwardRef<
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
FileUploadCardRemoveButton.displayName = 'FileUploadCardRemoveButton';

// ─── Close Button ────────────────────────────────────────────────────────────

const FileUploadCardCloseButton = React.forwardRef<
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
FileUploadCardCloseButton.displayName = 'FileUploadCardCloseButton';

// ─── Retry Link ──────────────────────────────────────────────────────────────

const FileUploadCardRetryLink = React.forwardRef<
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
FileUploadCardRetryLink.displayName = 'FileUploadCardRetryLink';

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

const FileUploadCardCompactRoot = React.forwardRef<HTMLDivElement, CompactRootProps>(
  ({ className, error, children, ...rest }, forwardedRef) => {
    return (
      <div ref={forwardedRef} className={cn(compactRootVariants({ error }), className)} {...rest}>
        {children}
      </div>
    );
  },
);
FileUploadCardCompactRoot.displayName = 'FileUploadCardCompactRoot';

// ─── Compact Content ────────────────────────────────────────────────────────

const FileUploadCardCompactContent = React.forwardRef<
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
FileUploadCardCompactContent.displayName = 'FileUploadCardCompactContent';

// ─── Compact Body ───────────────────────────────────────────────────────────

const FileUploadCardCompactBody = React.forwardRef<
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
FileUploadCardCompactBody.displayName = 'FileUploadCardCompactBody';

// ─── Compact Error Body ─────────────────────────────────────────────────────

const FileUploadCardCompactErrorBody = React.forwardRef<
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
FileUploadCardCompactErrorBody.displayName = 'FileUploadCardCompactErrorBody';

// ─── Compact Description ────────────────────────────────────────────────────

const FileUploadCardCompactDescription = React.forwardRef<
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
FileUploadCardCompactDescription.displayName = 'FileUploadCardCompactDescription';

// ─── Compact Dot Separator ──────────────────────────────────────────────────

function FileUploadCardDot({ className }: { className?: string }) {
  return (
    <span className={cn('shrink-0 text-paragraph-xs text-text-sub-600', className)}>∙</span>
  );
}
FileUploadCardDot.displayName = 'FileUploadCardDot';

// ─── Compact Status ─────────────────────────────────────────────────────────

type CompactStatusProps = React.HTMLAttributes<HTMLDivElement> & {
  status: 'uploading' | 'completed' | 'failed';
};

const FileUploadCardCompactStatus = React.forwardRef<HTMLDivElement, CompactStatusProps>(
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
FileUploadCardCompactStatus.displayName = 'FileUploadCardCompactStatus';

// ─── Delete Button ──────────────────────────────────────────────────────────

const FileUploadCardDeleteButton = React.forwardRef<
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
FileUploadCardDeleteButton.displayName = 'FileUploadCardDeleteButton';

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

function getFormatColor(format: string): 'red' | 'orange' | 'yellow' | 'green' | 'sky' | 'blue' | 'purple' | 'pink' | 'gray' {
  const map: Record<string, 'red' | 'orange' | 'yellow' | 'green' | 'sky' | 'blue' | 'purple' | 'pink' | 'gray'> = {
    PDF: 'red',
    DOC: 'blue', DOCX: 'blue',
    XLS: 'green', XLSX: 'green', CSV: 'green',
    PPT: 'orange', PPTX: 'orange',
    ZIP: 'purple', RAR: 'purple', '7Z': 'purple',
    PNG: 'sky', JPG: 'sky', JPEG: 'sky', GIF: 'sky', WEBP: 'sky', SVG: 'sky',
    MP4: 'pink', MOV: 'pink', AVI: 'pink', WEBM: 'pink',
    MP3: 'yellow', WAV: 'yellow', OGG: 'yellow',
    TXT: 'gray', JSON: 'gray', XML: 'gray',
  };
  return map[format] ?? 'gray';
}

function isImageType(type: string): boolean {
  return type.startsWith('image/');
}

// ─── Item component ─────────────────────────────────────────────────────────

interface FileUploadCardItemFile {
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

interface FileUploadCardItemProps {
  file: FileUploadCardItemFile;
  variant?: 'default' | 'compact';
  onRemove?: () => void;
  onRetry?: () => void;
  onClose?: () => void;
  className?: string;
}

function FileUploadCardItem({ file, variant = 'default', onRemove, onRetry, onClose, className }: FileUploadCardItemProps) {
  const format = getFileFormat(file.name);
  const color = getFormatColor(format);
  const size = formatFileSize(file.size);
  const isImage = isImageType(file.type);
  const isActive = file.status === 'uploading' || file.status === 'pending';

  if (variant === 'compact') {
    if (file.status === 'failed') {
      return (
        <FileUploadCardCompactRoot error className={className}>
          <FileUploadCardCompactContent>
            <FileFormatIcon.Root format={format} color={color} size='medium' />
            <FileUploadCardCompactErrorBody>
              <FileUploadCardCompactBody>
                <FileUploadCardName>{file.name}</FileUploadCardName>
                <FileUploadCardCompactDescription>
                  <FileUploadCardMeta>{size}</FileUploadCardMeta>
                  <FileUploadCardDot />
                  <FileUploadCardCompactStatus status='failed'>Failed</FileUploadCardCompactStatus>
                </FileUploadCardCompactDescription>
              </FileUploadCardCompactBody>
              {onRetry && <FileUploadCardRetryLink onClick={onRetry} />}
            </FileUploadCardCompactErrorBody>
            {onRemove && <FileUploadCardDeleteButton onClick={onRemove} />}
          </FileUploadCardCompactContent>
        </FileUploadCardCompactRoot>
      );
    }

    return (
      <FileUploadCardCompactRoot className={className}>
        <FileUploadCardCompactContent>
          <FileFormatIcon.Root format={format} color={color} size='medium' />
          <FileUploadCardCompactBody>
            <FileUploadCardName>{file.name}</FileUploadCardName>
            <FileUploadCardCompactDescription>
              <FileUploadCardMeta>
                {isActive ? `${formatFileSize(Math.round(file.size * file.progress / 100))} of ${size}` : size}
              </FileUploadCardMeta>
              <FileUploadCardDot />
              <FileUploadCardCompactStatus status={file.status === 'completed' ? 'completed' : 'uploading'}>
                {file.status === 'completed' ? 'Completed' : 'Uploading...'}
              </FileUploadCardCompactStatus>
            </FileUploadCardCompactDescription>
          </FileUploadCardCompactBody>
          {isActive && onClose && <FileUploadCardCloseButton onClick={onClose} />}
          {file.status === 'completed' && onRemove && <FileUploadCardDeleteButton onClick={onRemove} />}
        </FileUploadCardCompactContent>
        {isActive && <FileUploadCardProgress value={file.progress} />}
      </FileUploadCardCompactRoot>
    );
  }

  // ─── Default variant ────────────────────────────────────────────────────

  if (isActive) {
    return (
      <FileUploadCardRoot className={className}>
        <FileUploadCardThumbnail>
          <FileFormatIcon.Root format={format} color={color} size='medium' />
        </FileUploadCardThumbnail>
        <FileUploadCardContent>
          <FileUploadCardUploadBody>
            <FileUploadCardInfoGroup>
              <FileUploadCardName>{file.name}</FileUploadCardName>
              <FileUploadCardStatus status='uploading'>Uploading...</FileUploadCardStatus>
            </FileUploadCardInfoGroup>
            <FileUploadCardProgress value={file.progress} />
          </FileUploadCardUploadBody>
          <FileUploadCardActions>
            {onClose && <FileUploadCardCloseButton onClick={onClose} />}
          </FileUploadCardActions>
        </FileUploadCardContent>
      </FileUploadCardRoot>
    );
  }

  if (file.status === 'failed') {
    return (
      <FileUploadCardRoot className={className}>
        <FileUploadCardThumbnail>
          <FileFormatIcon.Root format={format} color={color} size='medium' />
        </FileUploadCardThumbnail>
        <FileUploadCardContent>
          <FileUploadCardUploadBody>
            <FileUploadCardInfoGroup>
              <FileUploadCardName>{file.name}</FileUploadCardName>
              <FileUploadCardStatus status='failed'>Failed</FileUploadCardStatus>
            </FileUploadCardInfoGroup>
            {onRetry && <FileUploadCardRetryLink onClick={onRetry} />}
          </FileUploadCardUploadBody>
          <FileUploadCardActions>
            {onRemove && <FileUploadCardRemoveButton onClick={onRemove} />}
          </FileUploadCardActions>
        </FileUploadCardContent>
      </FileUploadCardRoot>
    );
  }

  // Completed
  const thumbnailSrc = file.preview ?? file.url;

  return (
    <FileUploadCardRoot className={className}>
      <FileUploadCardThumbnail className={isImage && thumbnailSrc ? 'bg-transparent' : undefined}>
        {isImage && thumbnailSrc ? (
          <FileUploadCardImage src={thumbnailSrc} alt={file.name} />
        ) : (
          <FileFormatIcon.Root format={format} color={color} size='medium' />
        )}
      </FileUploadCardThumbnail>
      <FileUploadCardContent>
        <FileUploadCardBody>
          <FileUploadCardName>{file.name}</FileUploadCardName>
          <FileUploadCardMeta>{size}</FileUploadCardMeta>
          {isImage && <FileUploadCardHint>Image uploaded successfully</FileUploadCardHint>}
        </FileUploadCardBody>
        <FileUploadCardActions>
          {onRemove && <FileUploadCardRemoveButton onClick={onRemove} />}
        </FileUploadCardActions>
      </FileUploadCardContent>
    </FileUploadCardRoot>
  );
}
FileUploadCardItem.displayName = 'FileUploadCardItem';

export {
  FileUploadCardRoot as Root,
  FileUploadCardThumbnail as Thumbnail,
  FileUploadCardImage as Image,
  FileUploadCardVideo as Video,
  FileUploadCardAudio as Audio,
  FileUploadCardContent as Content,
  FileUploadCardBody as Body,
  FileUploadCardUploadBody as UploadBody,
  FileUploadCardInfoGroup as InfoGroup,
  FileUploadCardName as Name,
  FileUploadCardMeta as Meta,
  FileUploadCardHint as Hint,
  FileUploadCardStatus as Status,
  FileUploadCardProgress as Progress,
  FileUploadCardActions as Actions,
  FileUploadCardRemoveButton as RemoveButton,
  FileUploadCardCloseButton as CloseButton,
  FileUploadCardRetryLink as RetryLink,
  FileUploadCardCompactRoot as CompactRoot,
  FileUploadCardCompactContent as CompactContent,
  FileUploadCardCompactBody as CompactBody,
  FileUploadCardCompactErrorBody as CompactErrorBody,
  FileUploadCardCompactDescription as CompactDescription,
  FileUploadCardDot as Dot,
  FileUploadCardCompactStatus as CompactStatus,
  FileUploadCardDeleteButton as DeleteButton,
  FileUploadCardItem as Item,
  fileUploadCardVariants,
  compactRootVariants,
};
