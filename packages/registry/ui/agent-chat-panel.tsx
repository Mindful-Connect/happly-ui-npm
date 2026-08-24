'use client';

import * as React from 'react';
import { RiArrowUpLine, RiStopFill } from '@remixicon/react';
import { motion, useReducedMotion } from 'framer-motion';
import type { BlockName } from '@happly/agent-client';

import { cn } from '@/lib/happly-ui-utils';

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

/**
 * One entry in the idle-state quick-start list (visual-parity spec §3). The
 * prototype hardcodes funding-specific chips; this panel stays free of
 * opportunity concepts, so the host supplies the set.
 */
export interface QuickStart {
  readonly key: string;
  readonly label: string;
  readonly icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  readonly color: string;
  readonly prompt: string;
}

export interface AgentChatPanelProps {
  readonly turns: readonly AgentTurn[];
  readonly steps: readonly AgentStep[];
  readonly blocks: readonly AgentBlock[];
  readonly suggestions: readonly {
    readonly label: string;
    readonly prompt: string;
  }[];
  /**
   * Idle-state entry shortcuts (visual-parity spec §3). Clicking one fires
   * `onSuggestion` — the prototype treats entry shortcuts and follow-up
   * suggestions as the same affordance, and this panel does too.
   */
  readonly quickStarts: readonly QuickStart[];
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
  /**
   * True while a reply is in flight. Swaps the composer for the busy variant:
   * the sent query stays visible, greyed, and the send button becomes Stop
   * (visual-parity spec §2). The panel has no stream yet — that lands with the
   * turn/step wiring in a later task — so this pair is the host's only lever
   * until then.
   */
  readonly busy?: boolean;
  /** The query shown, greyed, in the busy composer. Ignored unless `busy`. */
  readonly pendingQuery?: string;
  /** Overrides the built-in idle content (label + quick-start chips) entirely. */
  readonly emptyState?: React.ReactNode;
}

// The prototype's exact multicolour gradient star (Figma 10879-18438),
// inlined rather than fetched as a public asset — a copy-paste registry has no
// asset host of its own, and the source SVG is small and self-contained.
// Gradient ids are namespaced per instance so two sparkles on one page never
// collide.
function ComposerSparkle({ className }: { className?: string }) {
  const uid = React.useId().replace(/:/g, '');
  return (
    <svg
      aria-hidden
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M17.633 12.417L15.8862 11.8315C13.9792 11.1924 12.469 9.6002 11.8237 7.54855L11.2988 5.87955C11.1655 5.452 10.7957 5.17565 10.3592 5.17565C9.92168 5.17565 9.55289 5.452 9.4185 5.87955L8.90276 7.53237C8.26023 9.59151 6.74699 11.1905 4.83451 11.8311L3.0884 12.416C2.67818 12.5505 2.40234 12.9405 2.40234 13.3879C2.40234 13.8342 2.67818 14.2242 3.08638 14.3577L4.82295 14.9372C6.73349 15.5747 8.24695 17.1686 8.89294 19.2233L9.4185 20.8951C9.55289 21.3226 9.92168 21.6 10.3592 21.6C10.7957 21.6 11.1655 21.3226 11.2988 20.8951L11.816 19.24C12.4589 17.1822 13.9716 15.5844 15.8831 14.944L17.63 14.3587C18.0402 14.2242 18.317 13.8342 18.317 13.3879C18.317 12.9405 18.0402 12.5505 17.633 12.417Z'
        fill={`url(#${uid}-a)`}
      />
      <path
        d='M21.2527 5.36993C20.0372 4.96323 19.0774 3.97465 18.6843 2.72223C18.5499 2.29259 17.8578 2.29259 17.7234 2.72223C17.3304 3.97465 16.3705 4.96323 15.155 5.36993C14.9469 5.4398 14.8054 5.64002 14.8054 5.86631C14.8054 6.09156 14.9469 6.29178 15.155 6.36165C16.3685 6.7673 17.3284 7.7611 17.7234 9.01977C17.7901 9.23459 17.9851 9.38059 18.2034 9.38059C18.4226 9.38059 18.6176 9.23459 18.6843 9.01977C19.0794 7.7611 20.0393 6.7673 21.2527 6.36165C21.4609 6.29178 21.6023 6.09156 21.6023 5.86631C21.6023 5.64002 21.4609 5.4398 21.2527 5.36993Z'
        fill={`url(#${uid}-b)`}
      />
      <defs>
        <linearGradient
          id={`${uid}-a`}
          x1='13.125'
          y1='25.8749'
          x2='3.375'
          y2='1.87495'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='0.2' stopColor='#FBD570' />
          <stop offset='0.35' stopColor='#FF5D53' stopOpacity='0.9' />
          <stop offset='0.7' stopColor='#536FFF' />
          <stop offset='0.898804' stopColor='#53E0FF' />
        </linearGradient>
        <linearGradient
          id={`${uid}-b`}
          x1='13.125'
          y1='25.8749'
          x2='3.375'
          y2='1.87495'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='0.2' stopColor='#FBD570' />
          <stop offset='0.35' stopColor='#FF5D53' stopOpacity='0.9' />
          <stop offset='0.7' stopColor='#536FFF' />
          <stop offset='0.898804' stopColor='#53E0FF' />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function AgentChatPanel({
  turns,
  blocks,
  quickStarts,
  emptyState,
  busy = false,
  pendingQuery,
  onSend,
  onSuggestion,
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

  // Composer auto-grows with its content up to ~2 lines, then scrolls. Once it
  // wraps past one line it reflows ChatGPT-style: the textarea takes the full
  // first row and the sparkle + send button drop to a row beneath it
  // (visual-parity spec §2).
  const composerRef = React.useRef<HTMLTextAreaElement>(null);
  const [multiline, setMultiline] = React.useState(false);
  React.useEffect(() => {
    const el = composerRef.current;
    if (!el) {
      setMultiline(false);
      return;
    }
    el.style.height = 'auto';
    const full = el.scrollHeight;
    // Cap at ~2 lines (16px line-height + 8px vertical padding); scroll beyond.
    el.style.height = `${Math.min(full, 40)}px`;
    setMultiline(full > 34);
  }, [draft, busy]);

  // The idle block (label + quick starts) collapses once the conversation
  // starts, rather than unmounting outright, so it can animate out (spec §3).
  const reduceMotion = useReducedMotion();
  const started = turns.length > 0 || busy;
  const collapseTransition = reduceMotion
    ? { duration: 0.2, ease: 'easeOut' as const }
    : { type: 'spring' as const, bounce: 0, duration: 0.65 };

  return (
    <div className='flex h-full flex-col'>
      <div className='flex-1 overflow-y-auto px-6 py-4'>
        {/* Turn rendering arrives in a later task; until then this area holds
            only the idle content below. */}
        <motion.div
          initial={false}
          animate={{
            height: started ? 0 : 'auto',
            opacity: started ? 0 : 1,
            filter: reduceMotion || !started ? 'blur(0px)' : 'blur(6px)',
          }}
          transition={collapseTransition}
          className='overflow-hidden will-change-[filter,opacity]'
        >
          {emptyState ?? (
            <div className='flex flex-col gap-3'>
              <p className='text-label-sm text-text-sub-600 font-medium'>
                Tell me what you&apos;re after, or pick a quick start below.
              </p>
              <div className='flex flex-col items-start gap-2'>
                {quickStarts.map((c) => (
                  <button
                    key={c.key}
                    type='button'
                    onClick={() => onSuggestion(c.prompt)}
                    className='bg-bg-white-0 text-label-xs shadow-regular-xs hover:bg-bg-weak-50 flex items-center gap-[3px] rounded-full border border-[rgba(14,18,27,0.1)] py-1.5 pr-2 pl-1.5 font-medium text-[#717784] transition-colors'
                  >
                    <c.icon
                      className='size-4 shrink-0'
                      style={{ color: c.color }}
                    />
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
      <div className='flex shrink-0 flex-col gap-3 p-3'>
        {/* Composer is local rather than Chat.Input: that component carries attachment and
            emoji affordances for person-to-person chat, and stripping them leaves less than
            it adds. Revisit if the agent surface grows attachments. */}
        <div className='rounded-20 border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs relative z-[1] flex flex-wrap items-center gap-x-2 gap-y-1.5 border-[0.5px] py-2 pr-2 pl-4'>
          {busy ? (
            <>
              <ComposerSparkle className='order-1 size-6 shrink-0' />
              {/* The sent query stays in place, greyed, while the agent works —
                  not a "Generating…" label (visual-parity spec §2). */}
              <span className='text-text-soft-400 order-2 flex-1 truncate text-[12px] leading-4 tracking-[-0.06px]'>
                {pendingQuery}
              </span>
            </>
          ) : (
            <>
              <ComposerSparkle
                className={cn(
                  'size-6 shrink-0',
                  multiline ? 'order-2' : 'order-1'
                )}
              />
              <textarea
                ref={composerRef}
                rows={1}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && draft.trim() !== '') {
                    e.preventDefault();
                    submit();
                  }
                }}
                placeholder="Tell H what you're looking for…"
                className={cn(
                  'scrollbar-minimal text-text-strong-950 placeholder:text-text-soft-400 max-h-[120px] min-w-0 resize-none border-none bg-transparent px-0 py-1 text-[12px] leading-4 tracking-[-0.06px] outline-none focus:ring-0 focus:outline-none',
                  multiline ? 'order-1 basis-full' : 'order-2 flex-1'
                )}
              />
            </>
          )}
          {busy ? (
            // No handler yet: cancellation isn't wired until the stream lands
            // (later task) — the panel currently has no in-flight request to stop.
            <button
              type='button'
              aria-label='Stop'
              className='rounded-10 bg-primary-base text-static-white order-3 flex shrink-0 items-center justify-center border-[0.5px] border-[rgba(14,18,27,0.1)] p-2 shadow-[0px_1px_2px_0px_rgba(14,18,27,0.24)]'
            >
              <RiStopFill className='h-5 w-5' />
            </button>
          ) : (
            <button
              type='button'
              aria-label='Send'
              disabled={draft.trim() === ''}
              onClick={submit}
              className={cn(
                'rounded-10 order-3 flex shrink-0 items-center justify-center border-[0.5px] p-2 transition-colors',
                multiline && 'ml-auto',
                draft.trim() !== ''
                  ? 'bg-primary-base text-static-white border-[rgba(14,18,27,0.1)] shadow-[0px_1px_2px_0px_rgba(14,18,27,0.24)]'
                  : 'bg-bg-weak-50 text-text-soft-400 cursor-not-allowed border-transparent'
              )}
            >
              <RiArrowUpLine className='h-5 w-5' />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
