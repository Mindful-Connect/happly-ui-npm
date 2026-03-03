import { Textarea } from './textarea';

export default { title: 'UI/Textarea', component: Textarea };

export const Default = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <Textarea placeholder="Type your message here." />
    </div>
  ),
};

export const Disabled = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <Textarea disabled placeholder="Type your message here." />
    </div>
  ),
};

export const WithLabel = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <div className="grid w-full gap-1.5">
        <label htmlFor="message" style={{ fontSize: '14px', fontWeight: 500 }}>
          Your message
        </label>
        <Textarea placeholder="Type your message here." id="message" />
      </div>
    </div>
  ),
};

export const WithMaximumLength = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <Textarea placeholder="Type your message here." maxLength={250} />
    </div>
  ),
};
