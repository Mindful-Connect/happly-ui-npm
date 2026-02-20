import { ProgressBar } from '@/components/ui/progress-bar';

interface DemoProgressBarProps {
  variant?: 'neutral' | 'primary';
  progress?: number;
}

export function DemoProgressBar({
  variant = 'neutral',
  progress = 0,
}: DemoProgressBarProps) {
  return (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <ProgressBar variant={variant} progress={progress} />
    </div>
  );
}
