import PublicationStatusBadge from './publication-status-badge';

export default {
  title: 'UI/Publication Status Badge',
  component: PublicationStatusBadge,
};

export const Draft = {
  render: () => <PublicationStatusBadge status='draft' />,
};

export const WaitingForReview = {
  render: () => <PublicationStatusBadge status='waiting_for_review' />,
};

export const Approved = {
  render: () => <PublicationStatusBadge status='approved' />,
};

export const RequireChanges = {
  render: () => <PublicationStatusBadge status='require_changes' />,
};

export const Declined = {
  render: () => <PublicationStatusBadge status='declined' />,
};

export const AllStatuses = {
  render: () => (
    <div className='flex flex-wrap items-center gap-2'>
      <PublicationStatusBadge status='draft' />
      <PublicationStatusBadge status='waiting_for_review' />
      <PublicationStatusBadge status='approved' />
      <PublicationStatusBadge status='require_changes' />
      <PublicationStatusBadge status='declined' />
    </div>
  ),
};

export const LightVariant = {
  render: () => (
    <div className='flex flex-wrap items-center gap-2'>
      <PublicationStatusBadge status='draft' variant='light' />
      <PublicationStatusBadge status='waiting_for_review' variant='light' />
      <PublicationStatusBadge status='approved' variant='light' />
      <PublicationStatusBadge status='require_changes' variant='light' />
      <PublicationStatusBadge status='declined' variant='light' />
    </div>
  ),
};

export const CustomLabel = {
  render: () => (
    <PublicationStatusBadge status='approved'>Approuvé</PublicationStatusBadge>
  ),
};
