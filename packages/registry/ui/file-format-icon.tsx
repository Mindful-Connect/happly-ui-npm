import * as React from 'react';

import { cn } from '@/lib/happly-ui-utils';
import { tv, type VariantProps } from '@/lib/tv';

const fileFormatIconVariants = tv({
  slots: {
    root: 'relative shrink-0',
    formatBox:
      'absolute bottom-1.5 left-0 flex h-4 items-center rounded px-[3px] py-0.5 text-[11px] font-semibold leading-none text-static-white',
  },
  variants: {
    size: {
      medium: {
        root: 'w-10 h-10',
      },
      small: {
        root: 'w-8 h-8',
      },
    },
    color: {
      red: {
        formatBox: 'bg-error-base',
      },
      orange: {
        formatBox: 'bg-warning-base',
      },
      yellow: {
        formatBox: 'bg-away-base',
      },
      green: {
        formatBox: 'bg-success-base',
      },
      sky: {
        formatBox: 'bg-verified-base',
      },
      blue: {
        formatBox: 'bg-information-base',
      },
      purple: {
        formatBox: 'bg-feature-base',
      },
      pink: {
        formatBox: 'bg-highlighted-base',
      },
      gray: {
        formatBox: 'bg-faded-base',
      },
    },
  },
  defaultVariants: {
    color: 'gray',
    size: 'medium',
  },
});

type FormatColor = NonNullable<VariantProps<typeof fileFormatIconVariants>['color']>;

const FORMAT_COLOR_MAP: Record<string, FormatColor> = {
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

function getFormatColor(format: string): FormatColor {
  return FORMAT_COLOR_MAP[format.toUpperCase()] ?? 'gray';
}

type FileFormatIconProps = React.SVGProps<SVGSVGElement> &
  VariantProps<typeof fileFormatIconVariants> & {
    /** The file format text to display in the badge (e.g., 'PDF', 'DOC'). */
    format?: string;
  };

const FileFormatIconRoot = React.forwardRef<SVGSVGElement, FileFormatIconProps>(
  ({ format, className, color, size, ...rest }, forwardedRef) => {
    const resolvedColor = color ?? (format ? getFormatColor(format) : undefined);
    const { root, formatBox } = fileFormatIconVariants({ color: resolvedColor, size });

    return (
      <svg
        ref={forwardedRef}
        width='40'
        height='40'
        viewBox='0 0 40 40'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={cn(root(), className)}
        {...rest}
      >
        <path
          d='M30 39.25H10C7.10051 39.25 4.75 36.8995 4.75 34V6C4.75 3.10051 7.10051 0.75 10 0.75H20.5147C21.9071 0.75 23.2425 1.30312 24.227 2.28769L33.7123 11.773C34.6969 12.7575 35.25 14.0929 35.25 15.4853V34C35.25 36.8995 32.8995 39.25 30 39.25Z'
          className='fill-bg-white-0 stroke-stroke-sub-300'
          strokeWidth='1.5'
        />
        <path
          d='M23 1V9C23 11.2091 24.7909 13 27 13H35'
          className='stroke-stroke-sub-300'
          strokeWidth='1.5'
        />
        <foreignObject x='0' y='0' width='40' height='40'>
          {/* @ts-ignore */}
          <div xmlns='http://www.w3.org/1999/xhtml' className={formatBox()}>
            {format}
          </div>
        </foreignObject>
      </svg>
    );
  },
);
FileFormatIconRoot.displayName = 'FileFormatIconRoot';

export { FileFormatIconRoot as Root, fileFormatIconVariants, getFormatColor, FORMAT_COLOR_MAP };
