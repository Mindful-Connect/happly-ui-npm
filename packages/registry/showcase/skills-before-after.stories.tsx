'use client';

/**
 * Design tweaks — before & after.
 *
 * A single page laid out like jakub.kr/skills (644px column, #fcfcfc ground,
 * 16/26 Inter, mono slash headings with a hairline, framed preview cards split
 * into two panes with a pill label under each) and filled with the real
 * HapplyUI components: on the left the verbatim snapshot of `production` from
 * ./before, on the right the current component.
 *
 * The "before" pane also restores the token values those components were
 * rendered with (alpha focus rings, the blue dark-mode accent).
 *
 * Fonts: jakub.kr uses Inter Variable and Berkeley Mono; Berkeley Mono is a
 * licensed face, so JetBrains Mono stands in for it here.
 */

import * as React from 'react';
import {
  RiCloseLine,
  RiHome5Line,
  RiInformationFill,
  RiLinkM,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiSearchLine,
  RiUploadCloud2Line,
  RiFilter3Line,
} from '@remixicon/react';

import * as AvatarA from '@/components/ui/avatar';
import * as CurrencyInputA from '@/components/ui/currency-input';
import * as BadgeA from '@/components/ui/badge';
import * as BannerA from '@/components/ui/banner';
import * as ButtonA from '@/components/ui/button';
import * as CheckboxA from '@/components/ui/checkbox';
import * as EmptyStateA from '@/components/ui/empty-state';
import * as FileUploadA from '@/components/ui/file-upload';
import * as FormFieldA from '@/components/ui/form-field';
import * as InputA from '@/components/ui/input';
import * as PaginationA from '@/components/ui/pagination';
import * as PasswordInputA from '@/components/ui/password-input';
import * as SwitchA from '@/components/ui/switch';
import * as TagA from '@/components/ui/tag';
import * as ChatA from '@/components/ui/chat';
import * as FileFormatIconA from '@/components/ui/file-format-icon';
import * as StepIndicatorA from '@/components/ui/step-indicator';
import * as ButtonGroupA from '@/components/ui/button-group';
import * as ComboBoxA from '@/components/ui/combo-box';
import * as DigitInputA from '@/components/ui/digit-input';
import * as EmojiDialogA from '@/components/ui/emoji-dialog';
import * as FancyButtonA from '@/components/ui/fancy-button';
import * as MarkdownEditorA from '@/components/ui/markdown-editor';
import * as PromotionalCardA from '@/components/ui/promotional-card';
import * as RadioCardA from '@/components/ui/radio-card';
import * as TableA from '@/components/ui/table';
import PublicationStatusBadgeA from '@/components/ui/publication-status-badge';
import SocialsInputA from '@/components/ui/socials-input';
import TimelineStatusBadgeA from '@/components/ui/timeline-status-badge';

import * as AvatarB from './before/ui/avatar';
import * as CurrencyInputB from './before/ui/currency-input';
import * as BadgeB from './before/ui/badge';
import * as BannerB from './before/ui/banner';
import * as ButtonB from './before/ui/button';
import * as CheckboxB from './before/ui/checkbox';
import * as EmptyStateB from './before/ui/empty-state';
import * as FileUploadB from './before/ui/file-upload';
import * as FormFieldB from './before/ui/form-field';
import * as InputB from './before/ui/input';
import * as PaginationB from './before/ui/pagination';
import * as PasswordInputB from './before/ui/password-input';
import * as SwitchB from './before/ui/switch';
import * as TagB from './before/ui/tag';
import * as ChatB from './before/ui/chat';
import * as FileFormatIconB from './before/ui/file-format-icon';
import * as StepIndicatorB from './before/ui/step-indicator';
import * as ButtonGroupB from './before/ui/button-group';
import * as ComboBoxB from './before/ui/combo-box';
import * as DigitInputB from './before/ui/digit-input';
import * as EmojiDialogB from './before/ui/emoji-dialog';
import * as FancyButtonB from './before/ui/fancy-button';
import * as MarkdownEditorB from './before/ui/markdown-editor';
import * as PromotionalCardB from './before/ui/promotional-card';
import * as RadioCardB from './before/ui/radio-card';
import * as TableB from './before/ui/table';
import PublicationStatusBadgeB from './before/ui/publication-status-badge';
import SocialsInputB from './before/ui/socials-input';
import TimelineStatusBadgeB from './before/ui/timeline-status-badge';

export default {
  title: 'Design/Tweaks before and after',
  parameters: { layout: 'fullscreen' },
};

/* ------------------------------------------------------------------ */
/* Page chrome — values read from jakub.kr/skills, which this follows  */
/* ------------------------------------------------------------------ */

const JK_CSS = `
.jk {
  --jk-bg: #fcfcfc;
  --jk-gray-100: #fcfcfc;
  --jk-gray-200: #f6f6f6;
  --jk-gray-300: #f0f0f0;
  --jk-gray-400: #e8e8e8;
  --jk-gray-600: #d9d9d9;
  --jk-gray-800: #bbbbbb;
  --jk-gray-1000: #838383;
  --jk-gray-1100: #6f6f6f;
  --jk-gray-1200: #202020;
  --jk-preview-bg: #ffffff;
  --jk-preview-border: #e8e8e8;
  --jk-paragraph: #424242;
  --jk-shadow: 0px 0px 0px 1px #0000000f, 0px 1px 2px -1px #0000000f, 0px 2px 4px 0px #0000000a;
  --jk-sans: 'Inter', 'Inter Variable', system-ui, Arial, sans-serif;
  --jk-mono: 'JetBrains Mono', 'Berkeley Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  background: var(--jk-bg);
  color: var(--jk-gray-1200);
  font-family: var(--jk-sans);
  font-size: 16px;
  line-height: 26px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}
@media (prefers-color-scheme: dark) {
  .jk {
    --jk-bg: #101010;
    --jk-gray-100: #111111;
    --jk-gray-200: #191919;
    --jk-gray-300: #222222;
    --jk-gray-400: #2a2a2a;
    --jk-gray-600: #3a3a3a;
    --jk-gray-800: #606060;
    --jk-gray-1000: #7b7b7b;
    --jk-gray-1100: #b5b5b5;
    --jk-gray-1200: #eeeeee;
    --jk-preview-bg: #0b0b0b;
    --jk-preview-border: #1f1f1f;
    --jk-paragraph: #dbdbdb;
    --jk-shadow: 0 0 0 1px #ffffff14;
  }
}
.jk-page { width: 100%; max-width: 684px; margin: 0 auto; padding: 96px 20px; }
.jk-header { display: flex; min-height: 36px; width: 100%; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 96px; user-select: none; }
.jk-round { display: flex; width: 36px; height: 36px; flex-shrink: 0; align-items: center; justify-content: center; border-radius: 9999px; background: var(--jk-gray-300); color: var(--jk-gray-1000); border: 0; cursor: pointer; transition: color .2s ease-out, background-color .2s ease-out, scale .2s ease-out; }
.jk-round:hover { background: var(--jk-gray-400); color: var(--jk-gray-1200); }
.jk-round:active { scale: .97; }
.jk-round svg { width: 16px; height: 16px; }
.jk h1 { margin: 0 0 16px; font-size: 24px; line-height: 32px; font-weight: 600; }
.jk h2 { display: flex; align-items: center; gap: 12px; margin: 80px 0 20px; font-size: 16px; line-height: 26px; font-weight: 550; color: var(--jk-gray-1200); scroll-margin-top: 80px; }
.jk h2 .jk-rule { height: 1px; flex: 1; background: var(--jk-gray-400); }
.jk .jk-slash { margin-right: 4px; color: var(--jk-gray-800); }
.jk p { margin: 0; width: 100%; color: var(--jk-paragraph); }
.jk p strong { font-weight: 500; color: var(--jk-gray-1200); }
.jk a.jk-ul { color: inherit; text-decoration: underline; text-decoration-color: var(--jk-gray-600); text-underline-offset: 3px; transition: color .2s ease-out, text-decoration-color .2s ease-out; }
.jk a.jk-ul:hover { color: var(--jk-gray-1200); text-decoration-color: var(--jk-gray-1100); }
.jk-demo { margin: 32px 0; display: flex; width: 100%; flex-direction: column; align-items: center; }
.jk-card { display: flex; width: 100%; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; border-radius: 12px; background: var(--jk-bg); padding: 4px; box-shadow: var(--jk-shadow); }
.jk-card-inner { display: flex; height: 100%; width: 100%; overflow: hidden; border-radius: 8px; border: 1px solid var(--jk-preview-border); background: var(--jk-preview-bg); }
.jk-split { display: flex; width: 100%; height: 100%; flex-direction: column; }
.jk-split > * + * { border-top: 1px solid var(--jk-preview-border); }
@media (min-width: 640px) {
  .jk-split.row { flex-direction: row; }
  .jk-split.row > * + * { border-top: 0; border-left: 1px solid var(--jk-preview-border); }
}
.jk-controls { margin: -20px 0 32px; display: flex; width: 100%; justify-content: center; gap: 8px; }
.jk-controls button { border-radius: 9999px; background: var(--jk-bg); box-shadow: var(--jk-shadow); padding: 6px 14px; font-family: var(--jk-mono); font-size: 12px; color: var(--jk-gray-1100); cursor: pointer; border: 0; transition: scale 150ms ease-out; }
.jk-controls button:hover { scale: 1.03; }
.jk-controls button:active { scale: 0.97; }
.jk-controls button:disabled { opacity: 0.4; cursor: default; scale: 1; }
.jk-pane { display: flex; min-width: 0; flex: 1; flex-direction: column; }
.jk-pane-body { display: flex; width: 100%; flex-grow: 1; min-height: 0; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 32px 16px; }
.jk-pane-foot { display: flex; min-height: 61px; width: 100%; align-items: center; justify-content: center; border-top: 1px solid var(--jk-preview-border); background: var(--jk-gray-100); padding: 12px 16px; }
.jk-pill-wrap { display: flex; width: fit-content; align-items: center; justify-content: center; gap: 4px; border-radius: 9999px; background: var(--jk-bg); padding: 4px; box-shadow: var(--jk-shadow); user-select: none; }
.jk-pill { display: flex; height: 32px; width: fit-content; align-items: center; justify-content: center; gap: 8px; white-space: nowrap; border-radius: 9999px; background: var(--jk-preview-bg); border: 1px solid var(--jk-gray-400); padding: 0 16px; font-family: var(--jk-mono); font-size: 14px; line-height: 20px; color: var(--jk-gray-1100); text-transform: capitalize; }
.jk-code { font-family: var(--jk-mono); font-size: 14px; color: var(--jk-gray-1200); }

/* The token values the "before" components were rendered with. Tailwind
   inlines --shadow-* tokens, so the old rings are restored on the compiled
   utilities; the accent is read through the colour variables. */
.before-tokens .shadow-button-primary-focus,
.before-tokens .focus-visible\\:shadow-button-primary-focus:focus-visible {
  --tw-shadow: 0 0 0 2px var(--color-bg-white-0), 0 0 0 4px var(--color-primary-alpha-10);
}
.before-tokens .shadow-button-important-focus,
.before-tokens .focus-visible\\:shadow-button-important-focus:focus-visible,
.before-tokens .has-\\[input\\:focus\\]\\:shadow-button-important-focus:has(input:focus) {
  --tw-shadow: 0 0 0 2px var(--color-bg-white-0), 0 0 0 4px var(--color-neutral-alpha-16);
}
.before-tokens .dark {
  --color-primary-base: var(--color-blue-400);
  --color-primary-light: var(--color-blue-alpha-16);
  --color-primary-lighter: var(--color-blue-alpha-10);
  --color-primary-contrast: #0e121b;
}
@media (prefers-color-scheme: dark) {
  .before-tokens {
    --color-primary-base: var(--color-blue-400);
    --color-primary-light: var(--color-blue-alpha-16);
    --color-primary-lighter: var(--color-blue-alpha-10);
    --color-primary-contrast: #0e121b;
  }
}
`;

const FONTS =
  'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:wght@400;500&display=swap';

// A pale portrait-like image, so the missing edge on a light photo is visible.
const LIGHT_PHOTO =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>
      <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='#fbfbfd'/><stop offset='1' stop-color='#eef0f6'/>
      </linearGradient></defs>
      <rect width='160' height='160' fill='url(#g)'/>
      <circle cx='80' cy='64' r='30' fill='#e3e6ef'/>
      <ellipse cx='80' cy='150' rx='58' ry='44' fill='#e3e6ef'/>
    </svg>`
  );

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

function Heading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id}>
      <span>
        <span className='jk-slash' aria-hidden='true'>
          /
        </span>
        {children}
      </span>
      <span className='jk-rule' aria-hidden='true' />
    </h2>
  );
}

function Pane({
  side,
  dark,
  children,
}: {
  side: 'before' | 'after';
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={['jk-pane', side === 'before' ? 'before-tokens' : ''].join(
        ' '
      )}
    >
      <div
        className={['jk-pane-body', dark ? 'dark bg-bg-white-0' : ''].join(' ')}
      >
        {children}
      </div>
      <div className='jk-pane-foot'>
        <div className='jk-pill-wrap'>
          <div className='jk-pill'>{side}</div>
        </div>
      </div>
    </div>
  );
}

function Demo({
  before,
  after,
  height = 320,
  dark = false,
  stacked = false,
}: {
  before: React.ReactNode;
  after: React.ReactNode;
  /** Card height on ≥640px, like jakub.kr's --dw-h-sm. */
  height?: number | 'auto';
  dark?: boolean;
  /** Panes one under the other, full width. */
  stacked?: boolean;
}) {
  return (
    <div className='jk-demo'>
      <div
        className='jk-card'
        style={height === 'auto' ? undefined : { height }}
      >
        <div className='jk-card-inner'>
          <div className={['jk-split', stacked ? '' : 'row'].join(' ')}>
            <Pane side='before' dark={dark}>
              {before}
            </Pane>
            <Pane side='after' dark={dark}>
              {after}
            </Pane>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClickArea({
  size,
  children,
}: {
  size: 20 | 24;
  children: React.ReactNode;
}) {
  // Dashed guide drawn around the real clickable area (20px before, 24px after).
  const inset = size === 24 ? -2 : 0;
  return (
    <span className='relative inline-flex'>
      {children}
      <span
        aria-hidden='true'
        className='border-primary-base pointer-events-none absolute rounded-md border border-dashed'
        style={{ inset }}
      />
    </span>
  );
}

function ConfirmCard({
  Button,
  title,
  body,
  keep,
  destroy,
}: {
  Button: typeof ButtonA | typeof ButtonB;
  title: string;
  body: string;
  keep: string;
  destroy: string;
}) {
  return (
    <div className='bg-bg-white-0 ring-stroke-soft-200 shadow-regular-md rounded-20 w-full max-w-[280px] ring-1'>
      <div className='border-stroke-soft-200 border-b px-5 py-4'>
        <div className='text-label-sm text-text-strong-950 text-balance'>
          {title}
        </div>
        <p className='text-paragraph-xs text-text-sub-600 mt-1 text-pretty'>
          {body}
        </p>
      </div>
      <div className='flex justify-end gap-2 px-5 py-3'>
        <Button.Root variant='neutral' mode='stroke' size='xsmall'>
          {keep}
        </Button.Root>
        <Button.Root variant='error' mode='filled' size='xsmall'>
          {destroy}
        </Button.Root>
      </div>
    </div>
  );
}

const LONG_TAG = 'Ontario early-stage innovation grant';

function PagerDemo({
  Pagination,
  Icon,
}: {
  Pagination: typeof PaginationA | typeof PaginationB;
  Icon: { left: React.ElementType; right: React.ElementType };
}) {
  return (
    <Pagination.Root>
      <Pagination.NavButton disabled aria-label='Go to previous page'>
        <Pagination.NavIcon as={Icon.left} />
      </Pagination.NavButton>
      {[1, 2, 3].map((n) => (
        <Pagination.Item key={n} current={n === 1}>
          {n}
        </Pagination.Item>
      ))}
      <Pagination.NavButton aria-label='Go to next page'>
        <Pagination.NavIcon as={Icon.right} />
      </Pagination.NavButton>
    </Pagination.Root>
  );
}

function Ramp({ labels }: { labels: string[] }) {
  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  return (
    <div className='w-full max-w-[260px]'>
      <div className='ring-stroke-soft-200 flex overflow-hidden rounded-lg ring-1'>
        {steps.map((s) => (
          <span
            key={s}
            className='h-10 flex-1'
            style={{ background: `var(--color-purple-${s})` }}
          />
        ))}
      </div>
      <div
        className='mt-1.5 grid grid-cols-11 text-center text-[9px] leading-3 tabular-nums'
        style={{ fontFamily: 'var(--jk-mono)', color: 'var(--jk-gray-1100)' }}
      >
        {labels.map((l, i) => (
          <span key={i} className='min-w-0 truncate'>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

/** Eight file types: four whose label colour changed, four that kept white. */
const FORMATS = ['PDF', 'DOC', 'XLS', 'PPT', 'PNG', 'MP3', 'ZIP', 'MP4'];

function FormatRow({ side }: { side: 'before' | 'after' }) {
  const Icon = side === 'before' ? FileFormatIconB.Root : FileFormatIconA.Root;
  return (
    <div className='flex flex-wrap justify-center gap-3'>
      {FORMATS.map((f) => (
        <Icon key={f} format={f} />
      ))}
    </div>
  );
}

/** A loaded conversation plus whatever has been sent since it opened. */
const HISTORY = [
  { side: 'received', text: 'Are the reviewer notes ready?' },
  { side: 'sent', text: 'Finishing the last one now.' },
  { side: 'received', text: 'No rush — end of day is fine.' },
] as const;

function ChatPane({
  side,
  extra,
}: {
  side: 'before' | 'after';
  extra: number;
}) {
  const C = side === 'before' ? ChatB : ChatA;
  return (
    <div className='h-[190px] w-full'>
      <C.Root>
        <C.List>
          {HISTORY.map((m, i) => (
            <C.Message key={i} side={m.side}>
              <C.Bubble>{m.text}</C.Bubble>
            </C.Message>
          ))}
          {Array.from({ length: extra }).map((_, i) => (
            <C.Message key={`new-${i}`} side='sent'>
              <C.Bubble>Just sent them over.</C.Bubble>
            </C.Message>
          ))}
        </C.List>
      </C.Root>
    </div>
  );
}

function ChatDemo() {
  const [sent, setSent] = React.useState(0);
  // Bumping this remounts both lists, which is what opening a conversation
  // does — the whole history arrives at once.
  const [epoch, setEpoch] = React.useState(0);
  return (
    <>
      <Demo
        height={260}
        before={<ChatPane key={`b${epoch}`} side='before' extra={sent} />}
        after={<ChatPane key={`a${epoch}`} side='after' extra={sent} />}
      />
      <div className='jk-controls'>
        <button type='button' onClick={() => setSent((n) => n + 1)}>
          Send a message
        </button>
        <button
          type='button'
          onClick={() => {
            setSent(0);
            setEpoch((n) => n + 1);
          }}
        >
          Reopen the conversation
        </button>
      </div>
    </>
  );
}

/**
 * Flips both panes between light and dark. The right-hand pane carries
 * `data-theme-switching` for the commit the theme changes in, which is exactly
 * what `withoutThemeTransitions()` does on <html> in a real app: the attribute
 * and the new colours land in the same paint, so nothing has a chance to ease.
 */
function ThemeSmearDemo() {
  const [dark, setDark] = React.useState(false);
  const [suppress, setSuppress] = React.useState(false);

  const flip = () => {
    // Both set in one event, so React commits them together.
    setSuppress(true);
    setDark((d) => !d);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setSuppress(false))
    );
  };

  const swatches = (Cmp: typeof ButtonA) => (
    <div className='flex flex-col items-center gap-3'>
      <Cmp.Root variant='primary' mode='filled'>
        Submit
      </Cmp.Root>
      <Cmp.Root variant='neutral' mode='stroke'>
        Cancel
      </Cmp.Root>
    </div>
  );

  const shellClass = [
    dark ? 'dark' : '',
    'bg-bg-white-0 flex w-full items-center justify-center rounded-2xl p-6',
  ].join(' ');

  return (
    <>
      <Demo
        height={220}
        before={
          <div className={shellClass}>
            {swatches(ButtonB as unknown as typeof ButtonA)}
          </div>
        }
        after={
          <div
            className={shellClass}
            data-theme-switching={suppress ? '' : undefined}
          >
            {swatches(ButtonA)}
          </div>
        }
      />
      <div className='jk-controls'>
        <button type='button' onClick={flip}>
          Switch to {dark ? 'light' : 'dark'}
        </button>
      </div>
    </>
  );
}

/** Walks the same application forward one step at a time in both panes. */
const STEPS = [
  { title: 'Eligibility', description: 'Confirmed' },
  { title: 'Documents', description: 'Uploaded' },
  { title: 'Review', description: 'In progress' },
  { title: 'Decision', description: 'Pending' },
];

function StepDemo() {
  const [step, setStep] = React.useState(0);

  const items = STEPS.map((it, i) => ({
    ...it,
    status: (i < step ? 'completed' : i === step ? 'active' : 'pending') as
      | 'completed'
      | 'active'
      | 'pending',
    progress: i === step ? 40 : 0,
    icon: RiInformationFill,
  }));

  return (
    <>
      <Demo
        height={300}
        before={
          <div className='w-full max-w-[220px]'>
            <StepIndicatorB.Composed items={items} />
          </div>
        }
        after={
          <div className='w-full max-w-[220px]'>
            <StepIndicatorA.Composed items={items} />
          </div>
        }
      />
      <div className='jk-controls'>
        <button
          type='button'
          onClick={() => setStep((n) => Math.min(n + 1, STEPS.length - 1))}
          disabled={step === STEPS.length - 1}
        >
          Complete this step
        </button>
        <button type='button' onClick={() => setStep(0)} disabled={step === 0}>
          Start over
        </button>
      </div>
    </>
  );
}

/** A pasted note that carries its own markup. Only the old preview runs it. */
const PASTED_NOTE =
  '**Note pasted in from a client**\n\nLooks good to me — approve when you can.\n' +
  '<img src=x style="display:none" onerror="this.parentElement.style.cssText=' +
  "'background:#e5484d;color:#fff;padding:8px;border-radius:8px;font:600 13px system-ui';" +
  "this.parentElement.textContent='This pasted note just ran its own code inside your app.'\">";

/** Two radio cards whose first title is a long unbroken address. */
function RadioCardPane({ side }: { side: 'before' | 'after' }) {
  const R = side === 'before' ? RadioCardB : RadioCardA;
  const [contact, setContact] = React.useState('finance');
  return (
    <div className='w-[210px]'>
      <R.Root value={contact} onValueChange={setContact}>
        <R.Item value='finance'>
          <R.Content>
            <R.Title>
              accountspayable@northwindholdingsinternational.example
            </R.Title>
            <R.Description>Primary billing contact</R.Description>
          </R.Content>
          <R.Indicator />
        </R.Item>
        <R.Item value='ops'>
          <R.Content>
            <R.Title>Accounts payable</R.Title>
            <R.Description>Shared team inbox</R.Description>
          </R.Content>
          <R.Indicator />
        </R.Item>
      </R.Root>
    </div>
  );
}

function PromoPane({ side }: { side: 'before' | 'after' }) {
  const P = side === 'before' ? PromotionalCardB : PromotionalCardA;
  return (
    <div className='w-[268px]'>
      <P.Root variant='stroke'>
        <P.Icon as={RiFilter3Line} />
        <P.Decoration as={RiFilter3Line} />
        <P.Content>
          <P.Title>Match with a buyer</P.Title>
          <P.Description>
            Every Monday we compare your listing against each active buyer
            profile in the region, then send you the three closest matches with
            the reason each one fits.
          </P.Description>
        </P.Content>
      </P.Root>
    </div>
  );
}

function TablePane({ side }: { side: 'before' | 'after' }) {
  const T = side === 'before' ? TableB : TableA;
  // `numeric` did not exist before — passing it to the old Table would land it
  // on the DOM as an unknown attribute. Its absence IS the before state.
  const num = side === 'after' ? { numeric: true } : {};
  const rows: Array<[string, string]> = [
    ['Sophia Williams', '$1,240.00'],
    ['Wei Chen', '$89.50'],
    ['Arthur Taylor', '$12,004.25'],
  ];
  return (
    <div className='w-full max-w-[260px]'>
      <T.Root>
        <T.Header>
          <T.Row>
            <T.Head>Applicant</T.Head>
            <T.Head {...num}>Amount</T.Head>
          </T.Row>
        </T.Header>
        <T.Body>
          {rows.map(([name, amount]) => (
            <T.Row key={name}>
              <T.Cell className='text-paragraph-sm h-10'>{name}</T.Cell>
              <T.Cell {...num} className='text-paragraph-sm h-10'>
                {amount}
              </T.Cell>
            </T.Row>
          ))}
        </T.Body>
      </T.Root>
    </div>
  );
}

/** The dialog's decorative scrim on its own — no Radix context, no portal. */
function ScrimPane({ side }: { side: 'before' | 'after' }) {
  const E = side === 'before' ? EmojiDialogB : EmojiDialogA;
  return (
    <div className='bg-bg-white-0 border-stroke-soft-200 rounded-20 relative flex h-[170px] w-full max-w-[250px] shrink-0 flex-col justify-end gap-1 overflow-hidden border p-5'>
      <E.Background />
      <div className='text-title-h6 text-text-strong-950 relative z-10 text-center'>
        Invite your team
      </div>
      <div className='text-label-sm text-text-sub-600 relative z-10 text-center'>
        Everyone you add gets an email.
      </div>
    </div>
  );
}

function Page() {
  return (
    <div className='jk'>
      <link rel='stylesheet' href={FONTS} />
      <style>{JK_CSS}</style>
      <div className='jk-page'>
        <header>
          <div className='jk-header'>
            <a
              className='jk-round'
              href='https://ui.happly.cloud'
              aria-label='Home'
            >
              <RiHome5Line aria-hidden='true' />
            </a>
            <button
              type='button'
              className='jk-round'
              aria-label='Copy link to clipboard'
              onClick={() =>
                navigator.clipboard
                  ?.writeText(window.location.href)
                  .catch(() => {})
              }
            >
              <RiLinkM aria-hidden='true' />
            </button>
          </div>
        </header>

        <main className='w-full'>
          <article className='w-full'>
            <div className='flex w-full flex-col gap-1'>
              <h1>
                <span className='jk-slash' aria-hidden='true'>
                  /
                </span>
                tweaks
              </h1>
              <p>
                A pass over the Happly design system. Every pair below is the
                real HapplyUI component: on the left exactly as it shipped
                before, on the right after the tweaks. Ordered by how much each
                one matters — what was broken first, polish last. Some are worth
                trying rather than reading: hold a button down, type in a field,
                press Tab.
              </p>
            </div>

            {/* ---------------------------------------------------------- */}
            <Heading id='broken'>broken</Heading>
            <p>
              Start with what was simply not working. These are not matters of
              taste — the component did the wrong thing, or nothing at all.
            </p>
            <p>
              The kind of thing you only find by using a component rather than
              reading it. Three inputs — currency, verification code and social
              links — held <strong>no state of their own</strong>. Used the way
              the documentation showed them, they were inert: you typed and
              nothing happened. Click into both fields below and type.
            </p>
            <Demo
              height={220}
              before={
                <div className='w-full max-w-[260px]'>
                  <CurrencyInputB.Root />
                </div>
              }
              after={
                <div className='w-full max-w-[260px]'>
                  <CurrencyInputA.Root />
                </div>
              }
            />
            <p>
              White labels sat on every coloured chip, whatever the colour was
              underneath. On the light end of the palette that is not a
              near-miss — white on the yellow chip measured{' '}
              <strong>1.8:1</strong>, where 4.5:1 is the readable floor and 3:1
              is the bare minimum for any interface element at all. At 11px it
              was effectively unlabelled.
            </p>
            <Demo
              height={200}
              before={<FormatRow side='before' />}
              after={<FormatRow side='after' />}
            />
            <p>
              The fix does not touch a single one of the colours: the label
              flips to near-black on the four hues where white was failing, and
              stays white on the four where it was fine. Red, blue, purple and
              pink are identical in both panes — that is the point, only what
              was broken moved. The same rule now runs through badges, banners,
              alerts, buttons and status icons from one token, so a new
              component cannot get it wrong by accident.
            </p>
            <Demo
              height={210}
              before={
                <div className='flex flex-wrap justify-center gap-2'>
                  {(['green', 'orange', 'yellow', 'sky', 'red'] as const).map(
                    (c) => (
                      <BadgeB.Root key={c} variant='filled' color={c}>
                        Approved
                      </BadgeB.Root>
                    )
                  )}
                </div>
              }
              after={
                <div className='flex flex-wrap justify-center gap-2'>
                  {(['green', 'orange', 'yellow', 'sky', 'red'] as const).map(
                    (c) => (
                      <BadgeA.Root key={c} variant='filled' color={c}>
                        Approved
                      </BadgeA.Root>
                    )
                  )}
                </div>
              }
            />
            <p>
              Two are deliberately left alone. The red chip reads 4.15:1 and the
              pink 3.91:1 — both under the 4.5 mark, both far above the 1.8 that
              made the yellow one unusable. Turning a destructive button&rsquo;s
              label dark to gain a third of a point is a bigger change to how
              the system looks than it is a gain in reading, so that one is
              yours to call rather than mine.
            </p>
            <p>
              Nothing had been tried with awkward content. A label longer than
              its container used to wrap onto a second line inside a pill that
              is only one line tall, so the text{' '}
              <strong>rendered outside its own background</strong>. The pills
              now keep the label on one line and grow to fit it.
            </p>
            <Demo
              height={220}
              before={
                <div className='flex w-full max-w-[180px] flex-col items-start gap-3'>
                  <TagB.Root>{LONG_TAG}</TagB.Root>
                  <BadgeB.Root color='primary' size='medium'>
                    {LONG_TAG}
                  </BadgeB.Root>
                </div>
              }
              after={
                <div className='flex w-full max-w-[180px] flex-col items-start gap-3'>
                  <TagA.Root>{LONG_TAG}</TagA.Root>
                  <BadgeA.Root color='primary' size='medium'>
                    {LONG_TAG}
                  </BadgeA.Root>
                </div>
              }
            />
            <p>
              Pagination had no disabled styling at all, so the arrow at the
              first page looked exactly as available as the one that works.
            </p>
            <Demo
              height={190}
              before={
                <PagerDemo
                  Pagination={PaginationB}
                  Icon={{ left: RiArrowLeftSLine, right: RiArrowRightSLine }}
                />
              }
              after={
                <PagerDemo
                  Pagination={PaginationA}
                  Icon={{ left: RiArrowLeftSLine, right: RiArrowRightSLine }}
                />
              }
            />

            <p>
              The banner&rsquo;s three-column layout had a typo in its grid
              definition that browsers silently ignored, so the{' '}
              <strong>close button hugged the message</strong> instead of
              sitting at the edge, and a longer message was clipped instead of
              wrapping.
            </p>
            <Demo
              stacked
              height='auto'
              before={
                <BannerB.Root
                  variant='lighter'
                  status='information'
                  className='w-full rounded-lg'
                >
                  <BannerB.Content>
                    <BannerB.Icon as={RiInformationFill} />
                    <span className='text-label-sm'>
                      Applications close 31 March
                    </span>
                    <span className='text-paragraph-sm'>
                      Submit your draft before then.
                    </span>
                  </BannerB.Content>
                  <BannerB.CloseButton aria-label='Dismiss'>
                    <RiCloseLine aria-hidden='true' className='h-5 w-5' />
                  </BannerB.CloseButton>
                </BannerB.Root>
              }
              after={
                <BannerA.Root
                  variant='lighter'
                  status='information'
                  className='w-full rounded-lg'
                >
                  <BannerA.Content>
                    <BannerA.Icon as={RiInformationFill} />
                    <span className='text-label-sm'>
                      Applications close 31 March
                    </span>
                    <span className='text-paragraph-sm'>
                      Submit your draft before then.
                    </span>
                  </BannerA.Content>
                  <BannerA.CloseButton>
                    <RiCloseLine aria-hidden='true' className='h-5 w-5' />
                  </BannerA.CloseButton>
                </BannerA.Root>
              }
            />

            <p>
              The same class of bug as the currency field above, in the
              verification-code boxes. Click the first box in each pane and type{' '}
              <strong>1234</strong>. The old one takes the keystrokes and shows
              nothing — the focus ring walks across four boxes that stay empty.
            </p>
            <Demo
              height={200}
              before={
                <div className='w-full max-w-[240px]'>
                  <DigitInputB.Root numInputs={4} onChange={() => {}} />
                </div>
              }
              after={
                <div className='w-full max-w-[240px]'>
                  <DigitInputA.Root numInputs={4} onChange={() => {}} />
                </div>
              }
            />
            <p>
              Cards were built as fixed boxes with the text placed at fixed
              coordinates inside them, so real content had nowhere to go. A long
              address in a card title <strong>ran straight off the edge</strong>
              ; a long description was sliced off at the bottom. Both cards now
              lay out in flow and grow to fit what is in them.
            </p>
            <Demo
              height={230}
              before={<RadioCardPane side='before' />}
              after={<RadioCardPane side='after' />}
            />
            <Demo
              height={340}
              before={<PromoPane side='before' />}
              after={<PromoPane side='after' />}
            />
            <p>
              The note below was pasted in from someone else, and it carries a
              little markup of its own. The old preview handed that markup
              straight to the browser and it <strong>ran inside the app</strong>
              . The preview now sanitises what it renders, so the note shows up
              as the text it claims to be.
            </p>
            <Demo
              height={280}
              before={
                <div className='w-full max-w-[260px]'>
                  <MarkdownEditorB.Root previewing>
                    <MarkdownEditorB.Content
                      height='150px'
                      value={PASTED_NOTE}
                    />
                  </MarkdownEditorB.Root>
                </div>
              }
              after={
                <div className='w-full max-w-[260px]'>
                  <MarkdownEditorA.Root previewing>
                    <MarkdownEditorA.Content
                      height='150px'
                      value={PASTED_NOTE}
                    />
                  </MarkdownEditorA.Root>
                </div>
              }
            />
            {/* ---------------------------------------------------------- */}
            <Heading id='keyboard'>keyboard</Heading>
            <p>
              Everything below is invisible with a mouse and decisive without
              one: whether you can see where you are, and whether you can reach
              the control at all.
            </p>
            <p>
              Things you only notice with a keyboard or a touch screen: a{' '}
              <strong>focus ring you can actually see</strong>, click areas at
              least <strong>24 px</strong> wide, and no control that only a
              mouse can reach.
            </p>
            <Demo
              height={240}
              before={
                <div className='flex flex-col items-center gap-3'>
                  <ButtonB.Root
                    variant='primary'
                    mode='filled'
                    className='shadow-button-primary-focus'
                  >
                    Save changes
                  </ButtonB.Root>
                  <ButtonB.Root
                    variant='neutral'
                    mode='stroke'
                    className='shadow-button-important-focus'
                  >
                    Cancel
                  </ButtonB.Root>
                </div>
              }
              after={
                <div className='flex flex-col items-center gap-3'>
                  <ButtonA.Root
                    variant='primary'
                    mode='filled'
                    className='shadow-button-primary-focus'
                  >
                    Save changes
                  </ButtonA.Root>
                  <ButtonA.Root
                    variant='neutral'
                    mode='stroke'
                    className='shadow-button-important-focus'
                  >
                    Cancel
                  </ButtonA.Root>
                </div>
              }
            />
            <p>
              How a focused button looked: a faint halo before, a solid ring
              after. Click in a pane and press Tab to try the live version. The
              dashed guides below show the clickable area of a checkbox, a
              switch and the × on a tag.
            </p>
            <Demo
              height={200}
              before={
                <div className='flex items-center gap-8'>
                  <ClickArea size={20}>
                    <CheckboxB.Root
                      defaultChecked
                      aria-label='Include closed grants'
                    />
                  </ClickArea>
                  <ClickArea size={20}>
                    <SwitchB.Root
                      defaultChecked
                      aria-label='Email me updates'
                    />
                  </ClickArea>
                  <TagB.Root>
                    Ontario
                    <TagB.DismissButton aria-label='Remove Ontario' />
                  </TagB.Root>
                </div>
              }
              after={
                <div className='flex items-center gap-8'>
                  <ClickArea size={24}>
                    <CheckboxA.Root
                      defaultChecked
                      aria-label='Include closed grants'
                    />
                  </ClickArea>
                  <ClickArea size={24}>
                    <SwitchA.Root
                      defaultChecked
                      aria-label='Email me updates'
                    />
                  </ClickArea>
                  <TagA.Root>
                    Ontario
                    <TagA.DismissButton />
                  </TagA.Root>
                </div>
              }
            />
            <Demo
              height={200}
              before={
                <div className='w-full max-w-[260px]'>
                  <PasswordInputB.Root />
                </div>
              }
              after={
                <div className='w-full max-w-[260px]'>
                  <PasswordInputA.Root />
                </div>
              }
            />
            <p>
              Click into the password field and press Tab. Before, the eye icon
              was skipped entirely; now the keyboard lands on it, it shows a
              ring, and a screen reader hears &ldquo;Show password&rdquo;.
            </p>

            <p>
              Two more controls that gave the keyboard nothing at all. Click
              inside a pane, then press Tab a few times. On the left the focus
              lands somewhere invisible; on the right every stop is marked.
            </p>
            <Demo
              height={220}
              before={
                <div className='flex flex-col items-center gap-3'>
                  <FancyButtonB.Root variant='primary'>
                    Save changes
                  </FancyButtonB.Root>
                  <FancyButtonB.Root variant='error'>
                    Delete grant
                  </FancyButtonB.Root>
                </div>
              }
              after={
                <div className='flex flex-col items-center gap-3'>
                  <FancyButtonA.Root variant='primary'>
                    Save changes
                  </FancyButtonA.Root>
                  <FancyButtonA.Root variant='error'>
                    Delete grant
                  </FancyButtonA.Root>
                </div>
              }
            />
            <Demo
              height={200}
              before={
                <ButtonGroupB.Root>
                  <ButtonGroupB.Item>Day</ButtonGroupB.Item>
                  <ButtonGroupB.Item>Week</ButtonGroupB.Item>
                  <ButtonGroupB.Item>Month</ButtonGroupB.Item>
                </ButtonGroupB.Root>
              }
              after={
                <ButtonGroupA.Root>
                  <ButtonGroupA.Item>Day</ButtonGroupA.Item>
                  <ButtonGroupA.Item>Week</ButtonGroupA.Item>
                  <ButtonGroupA.Item>Month</ButtonGroupA.Item>
                </ButtonGroupA.Root>
              }
            />

            {/* ---------------------------------------------------------- */}
            <Heading id='dark-mode'>dark mode</Heading>
            <p>
              The theme flipped, but a lot of the artwork and one very important
              colour did not follow it.
            </p>
            <p>
              Every colour is now written in <strong>OKLCH</strong>, a way of
              describing a colour by how light and how vivid it looks. Measuring
              the palette that way showed that{' '}
              <strong>dark mode had switched the Happly purple to blue</strong>,
              and that several illustrations were painted in light-mode colours
              only.
            </p>
            <Demo
              dark
              height={240}
              before={
                <div className='flex flex-col items-center gap-3'>
                  <ButtonB.Root variant='primary' mode='filled'>
                    Apply for this grant
                  </ButtonB.Root>
                  <ButtonB.Root variant='primary' mode='lighter'>
                    Save for later
                  </ButtonB.Root>
                </div>
              }
              after={
                <div className='flex flex-col items-center gap-3'>
                  <ButtonA.Root variant='primary' mode='filled'>
                    Apply for this grant
                  </ButtonA.Root>
                  <ButtonA.Root variant='primary' mode='lighter'>
                    Save for later
                  </ButtonA.Root>
                </div>
              }
            />
            <p>
              Dark mode, same primary button: before, the accent had been
              pointed at a blue with a dark label; after, Happly purple with a
              white label, the same as in light mode. The upload illustration
              and the dashed empty-state frame below were fixed light greys that
              glowed on a dark surface; they now take their colours from the
              theme.
            </p>
            <Demo
              dark
              height={420}
              before={
                <FileUploadB.Dropzone type='document' className='w-full' />
              }
              after={
                <FileUploadA.Dropzone type='document' className='w-full' />
              }
            />
            <Demo
              dark
              height={280}
              before={
                <div className='w-full'>
                  <EmptyStateB.Composed
                    bordered
                    icon={<RiSearchLine />}
                    title='No saved grants'
                    description='Grants you save appear here.'
                    size='sm'
                  />
                </div>
              }
              after={
                <div className='w-full'>
                  <EmptyStateA.Composed
                    bordered
                    icon={<RiSearchLine />}
                    title='No saved grants'
                    description='Grants you save appear here.'
                    size='sm'
                  />
                </div>
              }
            />
            <Demo
              height={200}
              before={
                <Ramp
                  labels={[
                    '#efebff',
                    '#dcd5ff',
                    '#cac0ff',
                    '#a897ff',
                    '#8c71f6',
                    '#7d52f4',
                    '#693ee0',
                    '#5b2cc9',
                    '#4c25a7',
                    '#3d1d86',
                    '#351a75',
                  ]}
                />
              }
              after={
                <Ramp
                  labels={[
                    '.949',
                    '.892',
                    '.838',
                    '.734',
                    '.639',
                    '.577',
                    '.516',
                    '.461',
                    '.406',
                    '.348',
                    '.319',
                  ]}
                />
              }
            />
            <p>
              The purple ramp as it is written in the tokens: the same colours,
              labelled by hex before and by lightness after. The hue stays put
              from 50 to 950 and the vividness peaks in the middle.
            </p>

            <p>
              The worst one. A dialog paints a decorative wash behind its
              contents, and that wash was a hardcoded white. In dark mode it
              became <strong>a solid white slab across the bottom half</strong>{' '}
              — and the heading sitting on it is white too, so the heading
              simply vanished. The wash now follows the surface colour, and its
              faint grid follows the text colour, so both appear in either
              theme.
            </p>
            <Demo
              dark
              height={300}
              before={<ScrimPane side='before' />}
              after={<ScrimPane side='after' />}
            />

            {/* ---------------------------------------------------------- */}
            <Heading id='motion'>motion</Heading>
            <p>
              How the interface responds to being used — the layer you feel
              rather than read. The press below repeats on every click you ever
              make, so it is worth getting right.
            </p>
            <Demo
              height={220}
              before={
                <ButtonB.Root variant='primary' mode='filled'>
                  Hold to press
                </ButtonB.Root>
              }
              after={
                <ButtonA.Root variant='primary' mode='filled'>
                  Hold to press
                </ButtonA.Root>
              }
            />
            <p>
              Press and hold either button. The new one shrinks a touch while it
              is held, so a click feels like a click.
            </p>
            <p>
              Photographs used to disappear into a white card. Every image now
              carries a 1px hairline at 10% — black on a light surface, white on
              a dark one, from a theme token so it follows either way of
              switching themes.
            </p>
            <Demo
              height={220}
              before={
                <div className='bg-bg-white-0 flex items-center gap-4 rounded-2xl p-5'>
                  <AvatarB.Root size='56'>
                    <AvatarB.Image src={LIGHT_PHOTO} alt='' />
                  </AvatarB.Root>
                  <div>
                    <div className='text-label-sm'>Nadia Rahimi</div>
                    <div className='text-paragraph-xs text-text-sub-600'>
                      Grant reviewer
                    </div>
                  </div>
                </div>
              }
              after={
                <div className='bg-bg-white-0 flex items-center gap-4 rounded-2xl p-5'>
                  <AvatarA.Root size='56'>
                    <AvatarA.Image src={LIGHT_PHOTO} alt='' />
                  </AvatarA.Root>
                  <div>
                    <div className='text-label-sm'>Nadia Rahimi</div>
                    <div className='text-paragraph-xs text-text-sub-600'>
                      Grant reviewer
                    </div>
                  </div>
                </div>
              }
            />

            <p>
              A message arriving is worth an entrance — it is the one moment in
              a conversation where something genuinely new appears. Press{' '}
              <em>Send a message</em> and watch both panes.
            </p>
            <ChatDemo />
            <p>
              The trap is the history. A plain entrance replays for every
              message already loaded, so opening a conversation would animate
              every bubble in it at once. Press <em>Reopen the conversation</em>
              : the loaded messages appear instantly, and only what you send
              afterwards moves.
            </p>
            <p>
              Switching between light and dark used to drag. Around fifty
              surfaces each ease their background over 200ms, so the flip
              smeared instead of landing. Watch the left pane, then the right.
            </p>
            <ThemeSmearDemo />
            <p>
              Colour transitions are for pointer feedback — a hover, a press.
              For a theme change they are wrong, so the new theme suppresses
              them for the single frame the switch happens in.
            </p>
            <p>
              A progress rail used to take 500ms to fill while the icon beside
              it changed colour in 300ms, so the rail trailed the state it was
              meant to be reporting. Complete the steps one at a time and watch
              the purple line grow between the circles — the left one arrives
              200ms after the marker it belongs to.
            </p>
            <StepDemo />
            <p>
              Two things here you cannot see on a desktop screen, so take them
              on trust or check them on a phone. Text fields are now 16px on
              small screens instead of 14px, because iOS Safari zooms the whole
              page whenever you focus a field smaller than that and never zooms
              back out — above tablet width they are still 14px, exactly as
              designed. And for anyone who has asked their system for less
              motion, the indeterminate progress bar used to freeze mid-slide
              into a still, 40%-wide segment that read as <em>40% complete</em>{' '}
              — a number it never meant. It now sits at full width, which reads
              as what it actually is: working, amount unknown.
            </p>

            {/* ---------------------------------------------------------- */}
            <Heading id='detail'>detail</Heading>
            <p>
              The quiet layer: numbers that hold still, headings that break
              evenly, corners that agree with each other.
            </p>
            <p>
              Numbers that hold still and titles that wrap evenly. Counts, page
              numbers and amounts now use <strong>digits of equal width</strong>
              , and headings break into <strong>two balanced lines</strong>{' '}
              instead of a long line and a stray word.
            </p>
            <Demo
              height={240}
              before={
                <div className='flex flex-col items-start gap-2'>
                  <BadgeB.Root color='primary' size='medium'>
                    1,204 applicants
                  </BadgeB.Root>
                  <BadgeB.Root color='primary' size='medium'>
                    1,111 applicants
                  </BadgeB.Root>
                  <BadgeB.Root color='gray' size='medium'>
                    Step 11 of 12
                  </BadgeB.Root>
                </div>
              }
              after={
                <div className='flex flex-col items-start gap-2'>
                  <BadgeA.Root color='primary' size='medium'>
                    1,204 applicants
                  </BadgeA.Root>
                  <BadgeA.Root color='primary' size='medium'>
                    1,111 applicants
                  </BadgeA.Root>
                  <BadgeA.Root color='gray' size='medium'>
                    Step 11 of 12
                  </BadgeA.Root>
                </div>
              }
            />
            <Demo
              height={200}
              before={
                <PaginationB.Root>
                  {[9, 10, 11, 12, 13].map((n) => (
                    <PaginationB.Item key={n} current={n === 11}>
                      {n}
                    </PaginationB.Item>
                  ))}
                </PaginationB.Root>
              }
              after={
                <PaginationA.Root>
                  {[9, 10, 11, 12, 13].map((n) => (
                    <PaginationA.Item key={n} current={n === 11}>
                      {n}
                    </PaginationA.Item>
                  ))}
                </PaginationA.Root>
              }
            />
            <Demo
              height={320}
              before={
                <div className='w-full max-w-[260px]'>
                  <EmptyStateB.Composed
                    icon={<RiUploadCloud2Line />}
                    title='No grant applications match these filters yet'
                    description='Change or clear a filter to see applications from other programs and years.'
                    size='sm'
                  />
                </div>
              }
              after={
                <div className='w-full max-w-[260px]'>
                  <EmptyStateA.Composed
                    icon={<RiUploadCloud2Line />}
                    title='No grant applications match these filters yet'
                    description='Change or clear a filter to see applications from other programs and years.'
                    size='sm'
                  />
                </div>
              }
            />

            <p>
              Money in a table used to sit left-aligned and ragged, so you could
              not compare two amounts by looking at them. A column marked as
              numeric now right-aligns and uses even-width digits, which is what
              lets the decimal points line up.
            </p>
            <Demo
              height={250}
              before={<TablePane side='before' />}
              after={<TablePane side='after' />}
            />
            {/* ---------------------------------------------------------- */}
            <Heading id='copy'>copy</Heading>
            <p>
              The words inside the components and in the examples the docs show:{' '}
              <strong>buttons say what they do</strong>, a confirmation repeats
              what will happen, an{' '}
              <strong>error tells you how to fix it</strong>, and an empty
              search names what you searched for.
            </p>
            <Demo
              height={260}
              before={
                <ConfirmCard
                  Button={ButtonB}
                  title='Delete Your Account?'
                  body='This action cannot be undone. Please confirm to continue.'
                  keep='Keep Account'
                  destroy='Delete Forever'
                />
              }
              after={
                <ConfirmCard
                  Button={ButtonA}
                  title='Delete your account?'
                  body='Deleting removes your applications and saved grants. This can’t be undone.'
                  keep='Keep account'
                  destroy='Delete account'
                />
              }
            />
            <Demo
              height={300}
              before={
                <div className='w-full max-w-[280px]'>
                  <EmptyStateB.Composed
                    icon={<RiSearchLine />}
                    title='No results found'
                    description="We couldn't find anything matching your search. Try different keywords."
                    size='sm'
                  />
                </div>
              }
              after={
                <div className='w-full max-w-[280px]'>
                  <EmptyStateA.Composed
                    icon={<RiSearchLine />}
                    title='No results for “quarterly”'
                    description='Try a shorter search term, or clear the filters to see everything again.'
                    size='sm'
                    actions={
                      <ButtonA.Root
                        variant='neutral'
                        mode='stroke'
                        size='xsmall'
                      >
                        Clear filters
                      </ButtonA.Root>
                    }
                  />
                </div>
              }
            />
            <Demo
              height={220}
              before={
                <div className='w-full max-w-[280px]'>
                  <FormFieldB.Root
                    label='Email'
                    htmlFor='email-before'
                    error='Please enter a valid email address.'
                  >
                    <InputB.Composed
                      id='email-before'
                      defaultValue='nadia@happly'
                    />
                  </FormFieldB.Root>
                </div>
              }
              after={
                <div className='w-full max-w-[280px]'>
                  <FormFieldA.Root
                    label='Email'
                    htmlFor='email-after'
                    error='Enter a valid email address, like name@example.com.'
                  >
                    <InputA.Composed
                      id='email-after'
                      defaultValue='nadia@happly'
                    />
                  </FormFieldA.Root>
                </div>
              }
            />
            <p>
              A search that found nothing used to say so and stop there. It now
              repeats what you searched for and offers the way back. Type{' '}
              <strong>zzz</strong> into each field.
            </p>
            <Demo
              height={260}
              before={
                <div className='w-[260px]'>
                  <ComboBoxB.Composed
                    preview
                    options={[
                      { value: 'grants', label: 'Grants' },
                      { value: 'loans', label: 'Loans' },
                      { value: 'hiring', label: 'Hiring' },
                    ]}
                  />
                </div>
              }
              after={
                <div className='w-[260px]'>
                  <ComboBoxA.Composed
                    preview
                    options={[
                      { value: 'grants', label: 'Grants' },
                      { value: 'loans', label: 'Loans' },
                      { value: 'hiring', label: 'Hiring' },
                    ]}
                  />
                </div>
              }
            />
            <p>
              Two labels that had gone wrong on their own. The social links
              picker asked you to “Choose the social media…” and stopped
              mid-sentence; it now says what it wants in three words.
            </p>
            <Demo
              height={260}
              before={
                <div className='w-full max-w-[260px]'>
                  <SocialsInputB name='socials' />
                </div>
              }
              after={
                <div className='w-full max-w-[260px]'>
                  <SocialsInputA name='socials' />
                </div>
              }
            />
            <p>
              And the status badges: “waiting for review” wore a{' '}
              <strong>no-entry sign</strong>, which reads as rejected rather
              than pending, and two sibling states used two different metaphors
              for the same idea. A waiting state now shows a clock, and the two
              “soon” states agree.
            </p>
            <Demo
              height={250}
              before={
                <div className='flex flex-col items-start gap-2.5'>
                  <PublicationStatusBadgeB status='waiting_for_review' />
                  <PublicationStatusBadgeB status='require_changes' />
                  <TimelineStatusBadgeB status='open_soon' />
                  <TimelineStatusBadgeB status='closing_soon' />
                </div>
              }
              after={
                <div className='flex flex-col items-start gap-2.5'>
                  <PublicationStatusBadgeA status='waiting_for_review' />
                  <PublicationStatusBadgeA status='require_changes' />
                  <TimelineStatusBadgeA status='open_soon' />
                  <TimelineStatusBadgeA status='closing_soon' />
                </div>
              }
            />
          </article>
        </main>
      </div>
    </div>
  );
}

export const BeforeAndAfter = {
  render: () => <Page />,
};
