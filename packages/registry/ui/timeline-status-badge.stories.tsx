import TimelineStatusBadge from './timeline-status-badge';

export default {
  title: 'UI/Timeline Status Badge',
  component: TimelineStatusBadge,
};

export const Open = {
  render: () => <TimelineStatusBadge status='open' />,
};

export const OpenSoon = {
  render: () => <TimelineStatusBadge status='open_soon' />,
};

export const ClosingSoon = {
  render: () => <TimelineStatusBadge status='closing_soon' />,
};

export const Closed = {
  render: () => <TimelineStatusBadge status='closed' />,
};

export const MediumSize = {
  render: () => (
    <div className='flex items-center gap-2'>
      <TimelineStatusBadge status='open' size='medium' />
      <TimelineStatusBadge status='open_soon' size='medium' />
      <TimelineStatusBadge status='closing_soon' size='medium' />
      <TimelineStatusBadge status='closed' size='medium' />
    </div>
  ),
};

export const AllStatuses = {
  render: () => (
    <div className='flex items-center gap-2'>
      <TimelineStatusBadge status='open' />
      <TimelineStatusBadge status='open_soon' />
      <TimelineStatusBadge status='closing_soon' />
      <TimelineStatusBadge status='closed' />
    </div>
  ),
};

export const CustomLabel = {
  render: () => (
    <TimelineStatusBadge status='open'>Ouvert</TimelineStatusBadge>
  ),
};
