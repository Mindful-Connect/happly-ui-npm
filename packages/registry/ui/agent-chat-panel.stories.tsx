import type { Meta, StoryObj } from '@storybook/react';
import { AgentChatPanel } from './agent-chat-panel';

const meta: Meta<typeof AgentChatPanel> = {
  title: 'UI/AgentChatPanel',
  component: AgentChatPanel,
  decorators: [
    (Story) => (
      <div className='h-[600px] w-[420px]'>
        <Story />
      </div>
    ),
  ],
};
export default meta;

const base = {
  turns: [],
  steps: [],
  blocks: [],
  suggestions: [],
  blockComponents: {},
  onSend: () => {},
  onSuggestion: () => {},
  onApprove: () => {},
};

export const Idle: StoryObj<typeof AgentChatPanel> = {
  args: {
    ...base,
    emptyState: <p className='text-paragraph-sm'>Ask me about funding.</p>,
  },
};
