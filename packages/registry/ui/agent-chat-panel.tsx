'use client';

import * as React from 'react';
import type { BlockName } from '@happly/agent-client';

export interface AgentTurn {
  readonly id: string;
  readonly role: 'user' | 'assistant';
  /** For assistant turns this is the text revealed SO FAR, not the whole reply. */
  readonly text: string;
}

export interface AgentStep {
  readonly id: string;
  readonly label: string;
  readonly status: 'active' | 'done';
}

export interface AgentBlock {
  readonly id: string;
  readonly name: BlockName;
  readonly data: Record<string, unknown>;
}

export interface AgentApproval {
  readonly approvalId: string;
  readonly toolName: string;
  readonly summary: string;
}

export interface AgentChatPanelProps {
  readonly turns: readonly AgentTurn[];
  readonly steps: readonly AgentStep[];
  readonly blocks: readonly AgentBlock[];
  readonly suggestions: readonly {
    readonly label: string;
    readonly prompt: string;
  }[];
  readonly approval?: AgentApproval | undefined;
  /** Host-supplied renderers. A name with no entry renders nothing. */
  readonly blockComponents: Partial<
    Record<BlockName, React.ComponentType<{ data: never }>>
  >;
  readonly onSend: (text: string) => void;
  readonly onSuggestion: (prompt: string) => void;
  readonly onApprove: (approvalId: string, approved: boolean) => void;
  /**
   * Fires for every block IN ADDITION to rendering it (spec §2.1).
   *
   * This is how the host drives its own filters and listing off the same event
   * the panel is displaying — one mechanism, two consumers. Without it the host
   * would need a second channel to learn what the agent just decided.
   */
  readonly onBlock?: (name: BlockName, data: Record<string, unknown>) => void;
  readonly emptyState?: React.ReactNode;
}

export function AgentChatPanel({
  turns,
  blocks,
  emptyState,
  onSend,
  onBlock,
}: AgentChatPanelProps) {
  const [draft, setDraft] = React.useState('');
  const submit = () => {
    const text = draft.trim();
    if (text === '') return;
    onSend(text);
    setDraft('');
  };

  // Notify the host once per block, on arrival. Rendering and notifying are the
  // same event by design (spec §2.1), so this deliberately keys off the same list.
  const notified = React.useRef(new Set<string>());
  React.useEffect(() => {
    for (const block of blocks) {
      if (notified.current.has(block.id)) continue;
      notified.current.add(block.id);
      onBlock?.(block.name, block.data);
    }
  }, [blocks, onBlock]);

  return (
    <div className='flex h-full flex-col'>
      <div className='flex-1 overflow-y-auto px-6 py-4'>
        {turns.length === 0 ? emptyState : null}
      </div>
      <div className='shrink-0 px-6 pb-6'>
        {/* Composer is local rather than Chat.Input: that component carries attachment and
            emoji affordances for person-to-person chat, and stripping them leaves less than
            it adds. Revisit if the agent surface grows attachments. */}
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder='Ask anything…'
          className='rounded-12 border-stroke-soft-200 text-paragraph-sm w-full resize-none border p-3'
        />
      </div>
    </div>
  );
}
