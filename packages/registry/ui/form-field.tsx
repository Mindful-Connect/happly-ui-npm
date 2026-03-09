import * as React from 'react';

import { cn } from '@/lib/happly-ui-utils';

function FormFieldRoot({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-1', className)} {...rest} />;
}

export { FormFieldRoot as Root };
