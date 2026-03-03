import { ProgressBar } from './progress-bar';

export default { title: 'UI/ProgressBar', component: ProgressBar };

export const Default = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <ProgressBar variant="neutral" progress={45} />
    </div>
  ),
};

export const PrimaryVariant = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <ProgressBar variant="primary" progress={75} />
    </div>
  ),
};
