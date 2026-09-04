'use client';

import * as Badge from './badge';
import {
  RiAlarmWarningFill,
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiTimeFill,
} from '@remixicon/react';

const TIMELINE_STATUSES = [
  'open',
  'open_soon',
  'closing_soon',
  'closed',
] as const;
export type TimelineStatus = (typeof TIMELINE_STATUSES)[number];

const STATUS_CONFIG: Record<
  TimelineStatus,
  {
    color: 'green' | 'purple' | 'yellow' | 'red';
    icon: React.ElementType;
    label: string;
  }
> = {
  open: { color: 'green', icon: RiCheckboxCircleFill, label: 'Open' },
  open_soon: { color: 'purple', icon: RiTimeFill, label: 'Opening Soon' },
  closing_soon: {
    color: 'yellow',
    icon: RiAlarmWarningFill,
    label: 'Closing Soon',
  },
  closed: { color: 'red', icon: RiCloseCircleFill, label: 'Closed' },
};

type TimelineStatusBadgeProps = {
  status: TimelineStatus;
  size?: 'small' | 'medium';
  children?: React.ReactNode;
};

export default function TimelineStatusBadge({
  status,
  size = 'small',
  children,
}: TimelineStatusBadgeProps) {
  const cfg = STATUS_CONFIG[status];

  return (
    <Badge.Root variant='lighter' color={cfg.color} size={size}>
      <Badge.Icon as={cfg.icon} />
      {children ?? cfg.label}
    </Badge.Root>
  );
}
