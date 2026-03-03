import { Button } from './button';
import { RiMailLine } from 'react-icons/ri';

export default { title: 'UI/Button', component: Button };

export const PrimaryVariant = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      <Button variant="primary" mode="filled">Filled</Button>
      <Button variant="primary" mode="stroke">Stroke</Button>
      <Button variant="primary" mode="lighter">Lighter</Button>
      <Button variant="primary" mode="ghost">Ghost</Button>
    </div>
  ),
};

export const NeutralVariant = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      <Button variant="neutral" mode="filled">Filled</Button>
      <Button variant="neutral" mode="stroke">Stroke</Button>
      <Button variant="neutral" mode="lighter">Lighter</Button>
      <Button variant="neutral" mode="ghost">Ghost</Button>
    </div>
  ),
};

export const ErrorVariant = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      <Button variant="error" mode="filled">Filled</Button>
      <Button variant="error" mode="stroke">Stroke</Button>
      <Button variant="error" mode="lighter">Lighter</Button>
      <Button variant="error" mode="ghost">Ghost</Button>
    </div>
  ),
};

export const SuccessVariant = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      <Button variant="success" mode="filled">Filled</Button>
      <Button variant="success" mode="stroke">Stroke</Button>
      <Button variant="success" mode="lighter">Lighter</Button>
      <Button variant="success" mode="ghost">Ghost</Button>
    </div>
  ),
};

export const WarningVariant = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      <Button variant="warning" mode="filled">Filled</Button>
      <Button variant="warning" mode="stroke">Stroke</Button>
      <Button variant="warning" mode="lighter">Lighter</Button>
      <Button variant="warning" mode="ghost">Ghost</Button>
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
      <Button size="medium">Medium</Button>
      <Button size="small">Small</Button>
      <Button size="xsmall">XSmall</Button>
      <Button size="xxsmall">XXSmall</Button>
    </div>
  ),
};

export const WithIcons = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      <Button variant="primary" mode="filled">
        <RiMailLine />
        Send Email
      </Button>
    </div>
  ),
};
