'use client';

import * as StatusBadge from '@/components/ui/status-badge';
import {
  RiAlertFill,
  RiCheckboxCircleFill,
  RiEditCircleFill,
  RiErrorWarningFill,
  RiTimeFill,
} from '@remixicon/react';

const MODERATION_STATUSES = [
  'draft',
  'waiting_for_review',
  'approved',
  'require_changes',
  'declined',
] as const;
export type ModerationStatus = (typeof MODERATION_STATUSES)[number];

type StatusBadgeStatus = 'completed' | 'pending' | 'failed' | 'disabled';

const STATUS_CONFIG: Record<
  ModerationStatus,
  {
    icon: React.ElementType;
    status: StatusBadgeStatus;
    label: string;
  }
> = {
  draft: { icon: RiEditCircleFill, status: 'disabled', label: 'Draft' },
  waiting_for_review: {
    // waiting reads as time passing, not as a blocked/forbidden state
    icon: RiTimeFill,
    status: 'disabled',
    label: 'Waiting for review',
  },
  approved: {
    icon: RiCheckboxCircleFill,
    status: 'completed',
    label: 'Approved',
  },
  require_changes: {
    icon: RiAlertFill,
    status: 'pending',
    label: 'Changes requested',
  },
  declined: {
    icon: RiErrorWarningFill,
    status: 'failed',
    label: 'Declined',
  },
};

type PublicationStatusBadgeProps = {
  status: ModerationStatus;
  variant?: 'stroke' | 'light';
  children?: React.ReactNode;
};

export default function PublicationStatusBadge({
  status,
  variant = 'stroke',
  children,
}: PublicationStatusBadgeProps) {
  const cfg = STATUS_CONFIG[status];

  return (
    <StatusBadge.Root variant={variant} status={cfg.status}>
      <StatusBadge.Icon as={cfg.icon} />
      {children ?? cfg.label}
    </StatusBadge.Root>
  );
}
