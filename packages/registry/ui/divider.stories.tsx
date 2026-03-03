import { Root } from './divider';

export default { title: 'UI/Divider', component: Root };

export const Line = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <Root variant="line" />
    </div>
  ),
};

export const LineWithSpacing = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <Root variant="line-spacing" />
    </div>
  ),
};

export const LineWithText = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Root variant="line-text">OR</Root>
      <Root variant="line-text">Continue with</Root>
    </div>
  ),
};

export const TextOnly = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <Root variant="text">Section</Root>
    </div>
  ),
};

export const SolidText = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <Root variant="solid-text">OR</Root>
    </div>
  ),
};

export const Content = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <Root variant="content">
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            border: '1px solid #e5e5e5',
            background: 'white',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          +
        </button>
      </Root>
    </div>
  ),
};
