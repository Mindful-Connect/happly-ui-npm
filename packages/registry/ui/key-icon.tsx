import { cn } from '@/lib/happly-ui-utils';
import { cva } from 'class-variance-authority';

type Color =
  | 'blue'
  | 'gray'
  | 'orange'
  | 'red'
  | 'green'
  | 'yellow'
  | 'purple'
  | 'pink'
  | 'teal';
type Style = 'stroke' | 'lighter';

const compoundVariants: { color: Color; style: Style; className: string }[] =
  Object.entries({
    blue: {
      stroke: 'border border-ds-neutral-200',
      lighter: 'border bg-ds-blue-50 border-ds-blue-100',
    },
    gray: {
      stroke: 'border border-ds-neutral-200',
      lighter: 'border bg-ds-blue-100 border-ds-blue-200',
    },
    orange: {
      stroke: 'border border-ds-neutral-200',
      lighter: 'border bg-ds-blue-50 border-ds-blue-100',
    },
    red: {
      stroke: 'border border-ds-neutral-200',
      lighter: 'border bg-ds-blue-50 border-ds-blue-100',
    },
    green: {
      stroke: 'border border-ds-neutral-200',
      lighter: 'border bg-ds-green-100 border-ds-green-200',
    },
    yellow: {
      stroke: 'border border-ds-neutral-200',
      lighter: 'border bg-ds-blue-50 border-ds-blue-100',
    },
    purple: {
      stroke: 'border border-ds-neutral-200',
      lighter: 'border bg-ds-blue-50 border-ds-blue-100',
    },
    pink: {
      stroke: 'border border-ds-neutral-200',
      lighter: 'border bg-ds-blue-50 border-ds-blue-100',
    },
    teal: {
      stroke: 'border border-ds-neutral-200',
      lighter: 'border bg-ds-sky-100 border-ds-sky-200',
    },
  }).flatMap(([color, styles]) =>
    Object.entries(styles).map(([style, cls]) => ({
      color: color as Color,
      style: style as Style,
      className: cls,
    }))
  );

const keyIconVariants = cva('flex items-center justify-center rounded-full', {
  variants: {
    color: {
      blue: '',
      gray: '',
      orange: '',
      red: '',
      green: '',
      yellow: '',
      purple: '',
      pink: '',
      teal: '',
    },
    size: {
      sm: 'w-8 h-8 [&_svg]:size-4',
      md: 'w-10 h-10 [&_svg]:size-4',
      lg: 'w-12 h-12 [&_svg]:size-6',
      xl: 'w-14 h-14[&_svg]:size-7',
      '2xl': 'w-16 h-16 [&_svg]:size-8',
    },
    style: {
      stroke: '',
      lighter: '',
    },
  },
  compoundVariants,
  defaultVariants: {
    size: 'md',
    style: 'stroke',
    color: 'gray',
  },
});

export default function KeyIcon({
  color = 'gray',
  icon,
  size = 'md',
  style = 'stroke',
  className,
}: {
  color?:
    | 'blue'
    | 'gray'
    | 'orange'
    | 'red'
    | 'green'
    | 'yellow'
    | 'purple'
    | 'pink'
    | 'teal';
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  style?: 'stroke' | 'lighter';
  className?: string;
}) {
  return (
    <div
      className={cn(
        keyIconVariants({
          color,
          size,
          style,
        }),
        'shrink-0',
        className
      )}
    >
      {icon}
    </div>
  );
}
