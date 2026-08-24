import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  RiFileTextLine,
  RiHistoryLine,
  RiLightbulbLine,
} from '@remixicon/react';

import { AgentChatPanel, type QuickStart } from './agent-chat-panel';

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
  quickStarts: [],
  blockComponents: {},
  onSend: () => {},
  onSuggestion: () => {},
  onApprove: () => {},
};

// Generic, opportunity-free examples — the panel takes quick starts from the
// host precisely so this fixture data never has to mean anything about the
// component itself (visual-parity spec §3).
const sampleQuickStarts: readonly QuickStart[] = [
  {
    key: 'explain',
    label: 'Explain how this works',
    icon: RiLightbulbLine,
    color: '#7d52f4',
    prompt: 'Explain how this works',
  },
  {
    key: 'recent',
    label: 'Show recent activity',
    icon: RiHistoryLine,
    color: '#1fc16b',
    prompt: 'Show me recent activity',
  },
  {
    key: 'summarize',
    label: 'Summarize this page',
    icon: RiFileTextLine,
    color: '#ff8447',
    prompt: 'Summarize this page for me',
  },
];

export const Idle: StoryObj<typeof AgentChatPanel> = {
  args: { ...base },
};

export const IdleWithQuickStarts: StoryObj<typeof AgentChatPanel> = {
  args: { ...base, quickStarts: sampleQuickStarts },
};

// The composer measures the textarea's real scrollHeight to decide when to
// reflow, so this story drives it through the DOM (native value setter +
// input event) rather than a controlled prop — the draft is intentionally
// uncontrolled, matching the plain-textarea contract from B1.
function MultilineDemo() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const textarea = containerRef.current?.querySelector('textarea');
    if (!textarea) return;
    const setValue = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype,
      'value'
    )?.set;
    setValue?.call(
      textarea,
      'This draft is long enough to wrap past a single line, so the composer reflows: the textarea takes the full row and the sparkle and send button drop beneath it.'
    );
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
  }, []);

  return (
    <div ref={containerRef} className='h-full'>
      <AgentChatPanel {...base} quickStarts={sampleQuickStarts} />
    </div>
  );
}

export const ComposerMultiline: StoryObj<typeof AgentChatPanel> = {
  render: () => <MultilineDemo />,
};

export const ComposerBusy: StoryObj<typeof AgentChatPanel> = {
  args: {
    ...base,
    busy: true,
    pendingQuery: 'Summarize this page for me',
  },
};

export const Thinking: StoryObj<typeof AgentChatPanel> = {
  args: {
    ...base,
    busy: true,
    turns: [{ id: 'u1', role: 'user', text: 'Show me grants in Montréal' }],
    steps: [
      { id: 's1', label: 'Reading your business profile', status: 'done' },
      { id: 's2', label: 'Searching programs', status: 'active' },
    ],
  },
};

export const WithBlockAndSuggestions: StoryObj<typeof AgentChatPanel> = {
  args: {
    ...base,
    turns: [
      { id: 'u1', role: 'user', text: 'Show me grants in Montréal' },
      {
        id: 'a1',
        role: 'assistant',
        text: 'Found 8 that fit. Want me to narrow it down?',
      },
    ],
    blocks: [
      {
        id: 'b1',
        name: 'opportunity-summary',
        data: { count: 8, funding: 3650000 },
      },
    ],
    blockComponents: {
      'opportunity-summary': ({ data }: { data: never }) => (
        <div className='rounded-10 border-stroke-soft-200 text-label-sm border p-3'>
          {(data as { count: number }).count} opportunities
        </div>
      ),
    },
    suggestions: [
      { label: 'Under $50K', prompt: 'Only ones under $50K' },
      { label: 'Closing soon', prompt: 'Which are closing soon?' },
    ],
  },
};

export const Error: StoryObj<typeof AgentChatPanel> = {
  args: {
    ...base,
    turns: [
      { id: 'u1', role: 'user', text: 'Show me grants in Montréal' },
      {
        id: 'a1',
        role: 'assistant',
        text: 'Something went wrong reaching the assistant. Try again.',
      },
    ],
  },
};

// The failure mode that must never break the thread.
export const UnknownBlock: StoryObj<typeof AgentChatPanel> = {
  args: {
    ...base,
    turns: [{ id: 'a1', role: 'assistant', text: 'Here is what I found.' }],
    blocks: [{ id: 'b1', name: 'block-from-the-future' as never, data: {} }],
  },
};
