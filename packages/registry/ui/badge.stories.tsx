import { Badge } from './badge';

export default { title: 'UI/Badge', component: Badge };

export const Default = {
  render: () => <Badge>Default</Badge>,
};

export const ColorVariants = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      <Badge colorVar="blueFilled">Blue</Badge>
      <Badge colorVar="redFilled">Red</Badge>
      <Badge colorVar="greenText">Green Text</Badge>
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      <Badge size="default">Default Size</Badge>
      <Badge size="sm">Small Size</Badge>
    </div>
  ),
};
