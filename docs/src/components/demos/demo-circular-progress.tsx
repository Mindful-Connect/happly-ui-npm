import { CircularProgress } from '@/components/ui/circular-progress';

interface DemoCircularProgressProps {
  fraction?: number;
  size?: number;
  variant?:
    | 'default'
    | 'green'
    | 'orange'
    | 'purple'
    | 'red'
    | 'blue'
    | 'yellow'
    | 'sky'
    | 'pink'
    | 'teal';
}

export function DemoCircularProgress({
  fraction = 0.5,
  size = 40,
  variant = 'default',
}: DemoCircularProgressProps) {
  return (
    <div className='flex items-center justify-center p-4'>
      <CircularProgress fraction={fraction} size={size} variant={variant} />
    </div>
  );
}
