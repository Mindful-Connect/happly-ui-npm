import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/happly-ui-utils';
import type { PolymorphicComponentProps } from '@/lib/polymorphic';

// ─── Dropzone icons ──────────────────────────────────────────────────────────

const DocumentUploadIcon = () => (
  <svg
    width='79'
    height='54'
    viewBox='0 0 79 54'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g filter='url(#fu_doc_f)'>
      <path
        d='M16.128 1.284h46.432c3.473 0 6.287 2.815 6.288 6.287v23.024c0 3.472-2.815 6.287-6.288 6.287H16.128c-3.472 0-6.287-2.815-6.287-6.287V7.571c0-3.472 2.815-6.287 6.287-6.287Z'
        fill='#F2F5F8'
        stroke='#E1E4EA'
        strokeWidth='.691'
      />
      <path
        d='M44.442 13.689l-6.779-3.955c-1.474-.86-3.325.203-3.325 1.91v8.191c0 1.737 1.91 2.796 3.383 1.875l6.779-4.236c1.41-.882 1.38-2.947-.058-3.785Z'
        fill='#E1E4EA'
      />
      <rect
        x='21.892'
        y='28.097'
        width='27.565'
        height='2.293'
        rx='1.146'
        transform='rotate(.274 21.892 28.097)'
        fill='#E1E4EA'
      />
      <circle
        cx='52.948'
        cy='29.309'
        r='1.106'
        transform='rotate(10.293 52.948 29.309)'
        fill='#E1E4EA'
      />
      <circle
        cx='55.518'
        cy='29.309'
        r='1.106'
        transform='rotate(10.293 55.518 29.309)'
        fill='#E1E4EA'
      />
      <path
        d='M10.323 5.73h58.041c4.388 0 7.945 3.557 7.946 7.945v29.47c0 4.388-3.557 7.946-7.946 7.946H10.323c-4.388 0-7.945-3.558-7.945-7.946V13.675c0-4.388 3.557-7.945 7.945-7.945Z'
        fill='#fff'
        stroke='#E1E4EA'
        strokeWidth='.691'
      />
      <g clipPath='url(#fu_doc_c)'>
        <path
          d='M32.434 15.11h7.265c.962 0 1.884.382 2.564 1.062l6.555 6.554c.68.68 1.063 1.603 1.063 2.564v12.793c0 2.003-1.625 3.628-3.628 3.628H32.434c-2.003 0-3.627-1.625-3.627-3.628V18.737c0-2.003 1.624-3.627 3.627-3.627Z'
          fill='#fff'
          stroke='#E1E4EA'
          strokeWidth='1.036'
        />
        <path
          d='M41.416 15.283v5.527c0 1.527 1.237 2.764 2.764 2.764h5.528'
          stroke='#E1E4EA'
          strokeWidth='1.036'
        />
      </g>
    </g>
    <defs>
      <filter
        id='fu_doc_f'
        x='.65'
        y='.248'
        width='77.387'
        height='53.262'
        filterUnits='userSpaceOnUse'
        colorInterpolationFilters='sRGB'
      >
        <feFlood floodOpacity='0' result='bg' />
        <feColorMatrix
          in='SourceAlpha'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          result='a'
        />
        <feOffset dy='.691' />
        <feGaussianBlur stdDeviation='.691' />
        <feComposite in2='a' operator='out' />
        <feColorMatrix values='0 0 0 0 .039 0 0 0 0 .051 0 0 0 0 .078 0 0 0 .03 0' />
        <feBlend in2='bg' result='s' />
        <feBlend in='SourceGraphic' in2='s' />
      </filter>
      <clipPath id='fu_doc_c'>
        <rect
          width='27.638'
          height='27.638'
          fill='#fff'
          transform='translate(25.524 14.591)'
        />
      </clipPath>
    </defs>
  </svg>
);

const ImageUploadIcon = () => (
  <svg
    width='87'
    height='56'
    viewBox='0 0 87.3 55.44'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M8.29 9.73h58.04c4.39 0 7.95 3.56 7.95 7.95v29.47c0 4.39-3.56 7.95-7.95 7.95H8.29c-4.39 0-7.95-3.56-7.95-7.95V17.68c0-4.39 3.56-7.95 7.95-7.95Z'
      fill='#F2F5F8'
      stroke='#E1E4EA'
      strokeWidth='.691'
    />
    <path
      d='M12.29 5.73h58.04c4.39 0 7.95 3.56 7.95 7.95v29.47c0 4.39-3.56 7.95-7.95 7.95H12.29c-4.39 0-7.95-3.56-7.95-7.95V13.68c0-4.39 3.56-7.95 7.95-7.95Z'
      fill='#fff'
      stroke='#E1E4EA'
      strokeWidth='.691'
    />
    <path
      d='M26.06 35.85l7.29-8.13c.6-.67 1.66-.65 2.23.04l3.05 3.68c.43.52 1.26.46 1.6-.13l3.97-6.75c.54-.92 1.84-.98 2.46-.11l8.28 11.48c.43.59 0 1.41-.72 1.41H26.73c-.77 0-1.18-.91-.67-1.49Z'
      fill='#E1E4EA'
    />
    <circle opacity='.9' cx='30.91' cy='23.48' r='2.16' fill='#E1E4EA' />
    <path
      d='M80.2 8.66c-.14 0-.25-.1-.29-.23-.1-.42-.3-.87-.6-1.35-.35-.57-.86-1.1-1.51-1.59-.57-.43-1.14-.72-1.71-.88-.13-.04-.23-.16-.23-.3 0-.13.09-.25.23-.29.56-.16 1.09-.42 1.61-.78.59-.41 1.09-.91 1.49-1.49.35-.51.59-1.02.72-1.53.04-.13.15-.23.29-.23.14 0 .26.1.29.23.08.3.19.61.35.93.2.39.46.77.78 1.13.32.35.68.67 1.08.96.52.37 1.05.63 1.59.78.13.04.23.15.23.29 0 .14-.1.26-.23.29-.34.09-.7.24-1.05.45-.44.26-.84.56-1.22.91-.38.35-.68.71-.92 1.09-.3.48-.5.93-.61 1.36-.03.13-.15.23-.28.23Z'
      fill='#E1E4EA'
    />
    <path
      d='M84.6 13.13c-.09 0-.16-.06-.18-.14-.07-.27-.19-.55-.38-.84-.22-.36-.54-.69-.94-.99-.36-.27-.71-.45-1.07-.55-.08-.02-.15-.1-.15-.19 0-.08.06-.16.14-.18.35-.1.68-.26 1.01-.48.37-.26.68-.57.93-.93.22-.32.37-.64.45-.96.02-.08.1-.14.18-.14.09 0 .16.06.18.15.05.19.12.38.22.58.13.24.29.48.49.7.2.22.43.42.68.6.32.23.65.39.99.49.08.02.14.1.14.18 0 .09-.06.16-.15.18-.21.06-.43.15-.66.28-.27.16-.52.35-.76.57-.23.22-.43.44-.58.68-.19.3-.31.58-.38.85-.02.08-.09.14-.18.14Z'
      fill='#E1E4EA'
    />
  </svg>
);

const VideoUploadIcon = () => (
  <svg
    width='79'
    height='54'
    viewBox='0 0 79 54'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g filter='url(#fu_vid_f)'>
      <path
        d='M16.128 1.284h46.432c3.473 0 6.287 2.815 6.288 6.287v23.024c0 3.472-2.815 6.287-6.288 6.287H16.128c-3.472 0-6.287-2.815-6.287-6.287V7.571c0-3.472 2.815-6.287 6.287-6.287Z'
        fill='#F2F5F8'
        stroke='#E1E4EA'
        strokeWidth='.691'
      />
      <path
        d='M44.442 13.689l-6.779-3.955c-1.474-.86-3.325.203-3.325 1.91v8.191c0 1.737 1.91 2.796 3.383 1.875l6.779-4.236c1.41-.882 1.38-2.947-.058-3.785Z'
        fill='#E1E4EA'
      />
      <rect
        x='21.892'
        y='28.097'
        width='27.565'
        height='2.293'
        rx='1.146'
        transform='rotate(.274 21.892 28.097)'
        fill='#E1E4EA'
      />
      <circle
        cx='52.948'
        cy='29.309'
        r='1.106'
        transform='rotate(10.293 52.948 29.309)'
        fill='#E1E4EA'
      />
      <circle
        cx='55.518'
        cy='29.309'
        r='1.106'
        transform='rotate(10.293 55.518 29.309)'
        fill='#E1E4EA'
      />
      <path
        d='M10.323 5.73h58.041c4.388 0 7.945 3.557 7.946 7.945v29.47c0 4.388-3.557 7.946-7.946 7.946H10.323c-4.388 0-7.945-3.558-7.945-7.946V13.675c0-4.388 3.557-7.945 7.945-7.945Z'
        fill='#fff'
        stroke='#E1E4EA'
        strokeWidth='.691'
      />
      <path
        d='M47.503 23.689l-6.779-3.955c-1.474-.86-3.325.203-3.325 1.91v8.191c0 1.737 1.91 2.796 3.383 1.875l6.779-4.236c1.41-.882 1.38-2.947-.058-3.785Z'
        fill='#E1E4EA'
      />
      <rect
        x='24.953'
        y='38.097'
        width='27.565'
        height='2.293'
        rx='1.146'
        transform='rotate(.274 24.953 38.097)'
        fill='#E1E4EA'
      />
      <circle
        cx='56.01'
        cy='39.309'
        r='1.106'
        transform='rotate(10.293 56.01 39.309)'
        fill='#E1E4EA'
      />
      <circle
        cx='58.58'
        cy='39.309'
        r='1.106'
        transform='rotate(10.293 58.58 39.309)'
        fill='#E1E4EA'
      />
    </g>
    <defs>
      <filter
        id='fu_vid_f'
        x='.65'
        y='.248'
        width='77.387'
        height='53.262'
        filterUnits='userSpaceOnUse'
        colorInterpolationFilters='sRGB'
      >
        <feFlood floodOpacity='0' result='bg' />
        <feColorMatrix
          in='SourceAlpha'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          result='a'
        />
        <feOffset dy='.691' />
        <feGaussianBlur stdDeviation='.691' />
        <feComposite in2='a' operator='out' />
        <feColorMatrix values='0 0 0 0 .039 0 0 0 0 .051 0 0 0 0 .078 0 0 0 .03 0' />
        <feBlend in2='bg' result='s' />
        <feBlend in='SourceGraphic' in2='s' />
      </filter>
    </defs>
  </svg>
);

const AudioUploadIcon = () => (
  <svg
    width='108'
    height='58'
    viewBox='0 0 108 58'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect
      x='4'
      y='12.46'
      width='91.57'
      height='44.98'
      rx='8'
      fill='#F2F5F8'
      stroke='#E1E4EA'
      strokeWidth='.691'
    />
    <rect
      x='9.57'
      y='4'
      width='88'
      height='44.98'
      rx='8'
      fill='#fff'
      stroke='#E1E4EA'
      strokeWidth='.691'
    />
    <circle
      cx='26.57'
      cy='26.49'
      r='11'
      fill='#fff'
      stroke='#E1E4EA'
      strokeWidth='.691'
    />
    <path
      d='M31.07 25.02l-6.1-3.56c-1.05-.61-2.37.15-2.37 1.36v7.34c0 1.24 1.36 2 2.41 1.34l6.1-3.78c1-.62.98-2.1-.04-2.7Z'
      fill='#E1E4EA'
    />
    <g opacity='.8'>
      <rect
        x='44'
        y='21.49'
        width='2.63'
        height='8.53'
        rx='1.31'
        fill='#E1E4EA'
      />
      <rect
        x='48'
        y='18'
        width='2.63'
        height='15.75'
        rx='1.31'
        fill='#E1E4EA'
      />
      <rect
        x='52'
        y='22.49'
        width='2.63'
        height='5.25'
        rx='1.31'
        fill='#E1E4EA'
      />
      <rect
        x='56'
        y='20.19'
        width='2.63'
        height='11.16'
        rx='1.31'
        fill='#E1E4EA'
      />
      <rect
        x='60'
        y='18'
        width='2.63'
        height='15.75'
        rx='1.31'
        fill='#E1E4EA'
      />
    </g>
    <g opacity='.5'>
      <rect
        x='64'
        y='22.49'
        width='2.63'
        height='5.25'
        rx='1.31'
        fill='#E1E4EA'
      />
      <rect
        x='68'
        y='23.8'
        width='2.63'
        height='2.63'
        rx='1.31'
        fill='#E1E4EA'
      />
      <rect
        x='72'
        y='23.8'
        width='2.63'
        height='2.63'
        rx='1.31'
        fill='#E1E4EA'
      />
      <rect
        x='76'
        y='22.49'
        width='2.63'
        height='5.25'
        rx='1.31'
        fill='#E1E4EA'
      />
      <rect
        x='80'
        y='22.49'
        width='2.63'
        height='5.25'
        rx='1.31'
        fill='#E1E4EA'
      />
      <rect
        x='84'
        y='18'
        width='2.63'
        height='15.75'
        rx='1.31'
        fill='#E1E4EA'
      />
      <rect
        x='88'
        y='19.31'
        width='2.63'
        height='13.13'
        rx='1.31'
        fill='#E1E4EA'
      />
    </g>
    <path
      d='M101.2 8.66c-.14 0-.25-.1-.29-.23-.1-.42-.3-.87-.6-1.35-.35-.57-.86-1.1-1.51-1.59-.57-.43-1.14-.72-1.71-.88-.13-.04-.23-.16-.23-.3 0-.13.09-.25.23-.29.56-.16 1.09-.42 1.61-.78.59-.41 1.09-.91 1.49-1.49.35-.51.59-1.02.72-1.53.04-.13.15-.23.29-.23.14 0 .26.1.29.23.08.3.19.61.35.93.2.39.46.77.78 1.13.32.35.68.67 1.08.96.52.37 1.05.63 1.59.78.13.04.23.15.23.29 0 .14-.1.26-.23.29-.34.09-.7.24-1.05.45-.44.26-.84.56-1.22.91-.38.35-.68.71-.92 1.09-.3.48-.5.93-.61 1.36-.03.13-.15.23-.28.23Z'
      fill='#E1E4EA'
    />
  </svg>
);

const AttachmentUploadIcon = () => (
  <svg
    width='79'
    height='54'
    viewBox='0 0 79 54'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g filter='url(#fu_att_f)'>
      <path
        d='M16.128 1.284h46.432c3.473 0 6.287 2.815 6.288 6.287v23.024c0 3.472-2.815 6.287-6.288 6.287H16.128c-3.472 0-6.287-2.815-6.287-6.287V7.571c0-3.472 2.815-6.287 6.287-6.287Z'
        fill='#F2F5F8'
        stroke='#E1E4EA'
        strokeWidth='.691'
      />
      <path
        d='M44.442 13.689l-6.779-3.955c-1.474-.86-3.325.203-3.325 1.91v8.191c0 1.737 1.91 2.796 3.383 1.875l6.779-4.236c1.41-.882 1.38-2.947-.058-3.785Z'
        fill='#E1E4EA'
      />
      <rect
        x='21.892'
        y='28.097'
        width='27.565'
        height='2.293'
        rx='1.146'
        transform='rotate(.274 21.892 28.097)'
        fill='#E1E4EA'
      />
      <circle
        cx='52.948'
        cy='29.309'
        r='1.106'
        transform='rotate(10.293 52.948 29.309)'
        fill='#E1E4EA'
      />
      <circle
        cx='55.518'
        cy='29.309'
        r='1.106'
        transform='rotate(10.293 55.518 29.309)'
        fill='#E1E4EA'
      />
      <path
        d='M10.323 5.73h58.041c4.388 0 7.945 3.557 7.946 7.945v29.47c0 4.388-3.557 7.946-7.946 7.946H10.323c-4.388 0-7.945-3.558-7.945-7.946V13.675c0-4.388 3.557-7.945 7.945-7.945Z'
        fill='#fff'
        stroke='#E1E4EA'
        strokeWidth='.691'
      />
      <g clipPath='url(#fu_att_c)'>
        <path
          d='M32.434 15.11h7.265c.962 0 1.884.382 2.564 1.062l6.555 6.554c.68.68 1.063 1.603 1.063 2.564v12.793c0 2.003-1.625 3.628-3.628 3.628H32.434c-2.003 0-3.627-1.625-3.627-3.628V18.737c0-2.003 1.624-3.627 3.627-3.627Z'
          fill='#fff'
          stroke='#E1E4EA'
          strokeWidth='1.036'
        />
        <path
          d='M41.416 15.283v5.527c0 1.527 1.237 2.764 2.764 2.764h5.528'
          stroke='#E1E4EA'
          strokeWidth='1.036'
        />
      </g>
    </g>
    <defs>
      <filter
        id='fu_att_f'
        x='.65'
        y='.248'
        width='77.387'
        height='53.262'
        filterUnits='userSpaceOnUse'
        colorInterpolationFilters='sRGB'
      >
        <feFlood floodOpacity='0' result='bg' />
        <feColorMatrix
          in='SourceAlpha'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          result='a'
        />
        <feOffset dy='.691' />
        <feGaussianBlur stdDeviation='.691' />
        <feComposite in2='a' operator='out' />
        <feColorMatrix values='0 0 0 0 .039 0 0 0 0 .051 0 0 0 0 .078 0 0 0 .03 0' />
        <feBlend in2='bg' result='s' />
        <feBlend in='SourceGraphic' in2='s' />
      </filter>
      <clipPath id='fu_att_c'>
        <rect
          width='27.638'
          height='27.638'
          fill='#fff'
          transform='translate(25.524 14.591)'
        />
      </clipPath>
    </defs>
  </svg>
);

// ─── Dropzone presets ────────────────────────────────────────────────────────

type FileUploadType = 'document' | 'image' | 'video' | 'audio' | 'attachment';

const DROPZONE_PRESETS: Record<
  FileUploadType,
  {
    icon: React.ReactNode;
    title: string;
    description: string;
    button: string;
  }
> = {
  document: {
    icon: <DocumentUploadIcon />,
    title: 'Choose an existing file or upload a new one.',
    description:
      'Supported formats: PDF, DOCX, XLSX, PPTX, ZIP. Max size: 50MB.',
    button: 'Browse File',
  },
  image: {
    icon: <ImageUploadIcon />,
    title: 'Choose an existing image or upload a new one.',
    description: 'Supported formats: JPG, PNG. Max size: 3MB.',
    button: 'Browse File',
  },
  video: {
    icon: <VideoUploadIcon />,
    title: 'Choose an existing video file or upload a new one.',
    description: 'Supported formats: MP4, AVI, MOV. Max size: 50MB.',
    button: 'Browse File',
  },
  audio: {
    icon: <AudioUploadIcon />,
    title: 'Choose an existing audio file or upload a new one.',
    description: 'Supported formats: MP3, WAV. Max size: 50MB.',
    button: 'Browse File',
  },
  attachment: {
    icon: <AttachmentUploadIcon />,
    title: 'Choose an existing file or upload a new one.',
    description:
      'Supported formats: PDF, DOCX, XLSX, PPTX, ZIP. Max size: 50MB.',
    button: 'Upload',
  },
};

// ─── Compound components ─────────────────────────────────────────────────────

const FileUploadRoot = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & {
    asChild?: boolean;
    dragging?: boolean;
  }
>(
  (
    { className, asChild, dragging, onDragOver, onDragLeave, onDrop, ...rest },
    forwardedRef
  ) => {
    const Component = asChild ? Slot : 'label';
    const [internalDragging, setInternalDragging] = React.useState(false);
    const dragCounter = React.useRef(0);

    const isDragging = dragging ?? internalDragging;

    const handleDragOver = React.useCallback(
      (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        onDragOver?.(e);
      },
      [onDragOver]
    );

    const handleDragEnter = React.useCallback(
      (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        dragCounter.current++;
        if (dragCounter.current === 1) {
          setInternalDragging(true);
        }
      },
      []
    );

    const handleDragLeave = React.useCallback(
      (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        dragCounter.current--;
        if (dragCounter.current === 0) {
          setInternalDragging(false);
        }
        onDragLeave?.(e);
      },
      [onDragLeave]
    );

    const handleDrop = React.useCallback(
      (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        dragCounter.current = 0;
        setInternalDragging(false);
        onDrop?.(e);
      },
      [onDrop]
    );

    return (
      <Component
        ref={forwardedRef}
        {...rest}
        className={cn(
          'border-stroke-sub-300 bg-bg-white-0 flex w-full cursor-pointer flex-col items-center gap-5 rounded-xl border border-dashed p-8 text-center',
          'transition duration-200 ease-out',
          'hover:bg-bg-weak-50',
          isDragging && 'border-primary-base bg-primary-alpha-10',
          className
        )}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      />
    );
  }
);
FileUploadRoot.displayName = 'FileUploadRoot';

const FileUploadButton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    asChild?: boolean;
  }
>(({ className, asChild, ...rest }, forwardedRef) => {
  const Component = asChild ? Slot : 'div';

  return (
    <Component
      ref={forwardedRef}
      className={cn(
        'bg-bg-white-0 text-label-sm text-text-sub-600 inline-flex h-8 items-center justify-center gap-2.5 rounded-lg px-2.5 whitespace-nowrap',
        'ring-stroke-soft-200 shadow-regular-xs pointer-events-none ring-1 ring-inset',
        className
      )}
      {...rest}
    />
  );
});
FileUploadButton.displayName = 'FileUploadButton';

function FileUploadIcon<T extends React.ElementType>({
  className,
  as,
  ...rest
}: PolymorphicComponentProps<T>) {
  const Component = as || 'div';

  return (
    <Component
      className={cn('text-text-sub-600 h-6 w-6', className)}
      {...rest}
    />
  );
}
FileUploadIcon.displayName = 'FileUploadIcon';

const FileUploadTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <div
      ref={forwardedRef}
      className={cn('text-label-sm text-text-strong-950', className)}
      {...rest}
    />
  );
});
FileUploadTitle.displayName = 'FileUploadTitle';

const FileUploadDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <div
      ref={forwardedRef}
      className={cn('text-paragraph-xs text-text-sub-600', className)}
      {...rest}
    />
  );
});
FileUploadDescription.displayName = 'FileUploadDescription';

const FileUploadContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <div
      ref={forwardedRef}
      className={cn('space-y-1.5', className)}
      {...rest}
    />
  );
});
FileUploadContent.displayName = 'FileUploadContent';

// ─── Dropzone preset component ──────────────────────────────────────────────

type FileUploadDropzoneProps = Omit<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  'children'
> & {
  type: FileUploadType;
  title?: string;
  description?: string;
  buttonText?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const FileUploadDropzone = React.forwardRef<
  HTMLLabelElement,
  FileUploadDropzoneProps
>(
  (
    { type, title, description, buttonText, inputProps, className, ...rest },
    forwardedRef
  ) => {
    const preset = DROPZONE_PRESETS[type];

    return (
      <FileUploadRoot ref={forwardedRef} className={className} {...rest}>
        <input type='file' tabIndex={-1} className='hidden' {...inputProps} />
        {preset.icon}
        <FileUploadContent>
          <FileUploadTitle>{title ?? preset.title}</FileUploadTitle>
          <FileUploadDescription>
            {description ?? preset.description}
          </FileUploadDescription>
        </FileUploadContent>
        <FileUploadButton>{buttonText ?? preset.button}</FileUploadButton>
      </FileUploadRoot>
    );
  }
);
FileUploadDropzone.displayName = 'FileUploadDropzone';

export {
  FileUploadRoot as Root,
  FileUploadButton as Button,
  FileUploadIcon as Icon,
  FileUploadTitle as Title,
  FileUploadDescription as Description,
  FileUploadContent as Content,
  FileUploadDropzone as Dropzone,
  DROPZONE_PRESETS as presets,
};
