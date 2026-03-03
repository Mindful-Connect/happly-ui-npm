import { CircularProgress } from './circular-progress';

export default { title: 'UI/CircularProgress', component: CircularProgress };

export const Default = {
  render: () => <CircularProgress fraction={0.25} size={40} />,
};

export const WithColorVariants = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <CircularProgress variant="green" fraction={0.7} size={40} />
      <CircularProgress variant="blue" fraction={0.5} size={40} />
      <CircularProgress variant="pink" fraction={0.9} size={40} />
    </div>
  ),
};
