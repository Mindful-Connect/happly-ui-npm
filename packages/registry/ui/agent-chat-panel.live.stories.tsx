import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RiBuildingLine, RiFileTextLine } from '@remixicon/react';
import { useAgentChat } from '@mindful-connect/agent-client/react';

import { AgentChatPanel, type QuickStart } from './agent-chat-panel';

/**
 * HW-740 B4 — the panel driven by the REAL protocol, end to end.
 *
 * This story is the reference integration: `useAgentChat` (the shared client
 * loop from @mindful-connect/agent-client) feeding `AgentChatPanel`, exactly as
 * a host app would wire it. Everything a host adds beyond this is visuals.
 *
 * It talks to the local stack and only works when it is running:
 *
 *   agent service      localhost:8080   (bun run dev, epic branch)
 *   credential proxy   localhost:8090   (local-harness/server.ts — holds the
 *                                        agent-session token; the browser
 *                                        never sees a credential)
 *   provider-api       Herd             (happly-provider-api-agent.test)
 *
 * Without the stack the story still renders — the first send just fails with
 * the hook's error state, which is itself worth seeing.
 */
const LIVE_ENDPOINT = 'http://localhost:8090/api/chat';

const quickStarts: readonly QuickStart[] = [
  {
    key: 'profile',
    label: 'Look up my business profile',
    icon: RiBuildingLine,
    color: '#7D52F4',
    prompt: 'Use your tools to look up my business profile and summarise it.',
  },
  {
    key: 'update',
    label: 'Update my organisation name',
    icon: RiFileTextLine,
    color: '#47C2FF',
    prompt: 'Set my organisation name to "Dinesh Inc" using your tools.',
  },
];

function LiveAgentChat() {
  const chat = useAgentChat({ endpoint: LIVE_ENDPOINT });
  return (
    <AgentChatPanel
      turns={chat.turns}
      steps={chat.steps}
      blocks={chat.blocks}
      suggestions={chat.suggestions}
      quickStarts={quickStarts}
      blockComponents={{}}
      approval={chat.approval}
      busy={chat.busy}
      pendingQuery={chat.pendingQuery}
      onSend={chat.send}
      onSuggestion={chat.send}
      onApprove={chat.approve}
    />
  );
}

const meta: Meta<typeof LiveAgentChat> = {
  title: 'UI/AgentChatPanel/Live',
  component: LiveAgentChat,
  decorators: [
    (Story) => (
      <div className='h-[600px] w-[420px]'>
        <Story />
      </div>
    ),
  ],
};
export default meta;

export const AgainstLocalStack: StoryObj<typeof LiveAgentChat> = {};
