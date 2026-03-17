'use client';

import * as React from 'react';

import * as Avatar from '@/components/ui/avatar';
import * as Button from '@/components/ui/button';
import { cn } from '@/lib/happly-ui-utils';
import { tv, type VariantProps } from '@/lib/tv';
import type { UploadFile } from '@/hooks/use-file-upload';

// ─── Variants ────────────────────────────────────────────────────────────────

const logoUploadVariants = tv({
  slots: {
    root: [
      '@container rounded-2xl border border-stroke-soft-200 bg-bg-white-0',
    ],
    inner: [
      'flex flex-col items-start gap-5 p-4 @[350px]:flex-row @[350px]:items-center',
    ],
    preview: 'shrink-0',
    content: 'flex min-w-0 flex-1 flex-col gap-4',
    header: 'flex flex-col gap-2',
    title: 'text-label-sm text-text-strong-950',
    description: 'flex flex-col gap-1.5 text-paragraph-xs text-text-sub-600',
    actions: 'flex items-center',
  },
});

const { root, inner, preview, content, title, description, actions } =
  logoUploadVariants();

// ─── Types ───────────────────────────────────────────────────────────────────

type LogoUploadRootProps = React.HTMLAttributes<HTMLDivElement>;

type LogoUploadPreviewProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  file?: UploadFile;
  placeholderType?: 'user' | 'company';
  avatarColor?: React.ComponentProps<typeof Avatar.Root>['color'];
  avatarClassName?: string;
  placeholder?: React.ReactNode;
};

type LogoUploadContentProps = React.HTMLAttributes<HTMLDivElement>;
type LogoUploadTitleProps = React.HTMLAttributes<HTMLParagraphElement>;
type LogoUploadDescriptionProps = React.HTMLAttributes<HTMLDivElement>;
type LogoUploadActionsProps = React.HTMLAttributes<HTMLDivElement>;

// ─── Components ──────────────────────────────────────────────────────────────

function LogoUploadRoot({ className, children, ...rest }: LogoUploadRootProps) {
  return (
    <div className={root({ class: className })} {...rest}>
      <div className={inner()}>{children}</div>
    </div>
  );
}

function LogoUploadPreview({
  file,
  placeholderType = 'company',
  avatarColor = 'gray',
  avatarClassName,
  placeholder,
  className,
  ...rest
}: LogoUploadPreviewProps) {
  const hasImage =
    file &&
    (file.status === 'completed' || file.preview) &&
    (file.url || file.preview);

  return (
    <div className={preview({ class: className })} {...rest}>
      {hasImage ? (
        <Avatar.Root
          className={cn(
            'text-title-h5 size-[88px] @[350px]:size-[111px] rounded-xl',
            avatarClassName
          )}
        >
          <Avatar.Image
            src={file.url ?? file.preview}
            alt='Logo'
            className='rounded-xl object-cover'
          />
        </Avatar.Root>
      ) : (
        <Avatar.Root
          color={avatarColor}
          placeholderType={placeholderType}
          placeholder={placeholder}
          className={cn(
            'text-title-h5 size-[88px] @[350px]:size-[111px] rounded-xl',
            avatarClassName
          )}
        />
      )}
    </div>
  );
}

function LogoUploadContent({ className, ...rest }: LogoUploadContentProps) {
  return <div className={content({ class: className })} {...rest} />;
}

function LogoUploadTitle({ className, ...rest }: LogoUploadTitleProps) {
  return <p className={title({ class: className })} {...rest} />;
}

function LogoUploadDescription({
  className,
  ...rest
}: LogoUploadDescriptionProps) {
  return <div className={description({ class: className })} {...rest} />;
}

function LogoUploadActions({ className, ...rest }: LogoUploadActionsProps) {
  return <div className={actions({ class: className })} {...rest} />;
}

// ─── Composed ────────────────────────────────────────────────────────────────

interface LogoUploadItemProps {
  file?: UploadFile;
  label: string;
  description?: React.ReactNode;
  placeholderType?: 'user' | 'company';
  avatarColor?: React.ComponentProps<typeof Avatar.Root>['color'];
  avatarClassName?: string;
  placeholder?: React.ReactNode;
  buttonLabel?: string;
  onButtonClick?: () => void;
  className?: string;
}

function LogoUploadItem({
  file,
  label,
  description: descriptionContent,
  placeholderType = 'company',
  avatarColor = 'gray',
  avatarClassName,
  placeholder,
  buttonLabel = 'Change',
  onButtonClick,
  className,
}: LogoUploadItemProps) {
  return (
    <LogoUploadRoot className={className}>
      <LogoUploadPreview
        file={file}
        placeholderType={placeholderType}
        avatarColor={avatarColor}
        avatarClassName={avatarClassName}
        placeholder={placeholder}
      />
      <LogoUploadContent>
        <div className='flex flex-col gap-2'>
          <LogoUploadTitle>{label}</LogoUploadTitle>
          {descriptionContent && (
            <LogoUploadDescription>{descriptionContent}</LogoUploadDescription>
          )}
        </div>
        <LogoUploadActions>
          <Button.Root
            variant='neutral'
            mode='stroke'
            size='xsmall'
            onClick={onButtonClick}
          >
            {buttonLabel}
          </Button.Root>
        </LogoUploadActions>
      </LogoUploadContent>
    </LogoUploadRoot>
  );
}

// ─── Exports ─────────────────────────────────────────────────────────────────

export {
  LogoUploadRoot as Root,
  LogoUploadPreview as Preview,
  LogoUploadContent as Content,
  LogoUploadTitle as Title,
  LogoUploadDescription as Description,
  LogoUploadActions as Actions,
  LogoUploadItem as Item,
};
