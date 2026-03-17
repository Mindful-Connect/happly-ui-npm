import * as ThemeProvider from './theme-provider';

export default {
  title: 'Providers/Theme Provider',
  component: ThemeProvider.Root,
};

const SCALE_STEPS = [
  950, 900, 800, 700, 600, 500, 400, 300, 200, 100, 50,
] as const;

const SEMANTIC_TOKENS = [
  { name: 'base', variable: '--color-primary-base' },
  { name: 'dark', variable: '--color-primary-dark' },
  { name: 'darker', variable: '--color-primary-darker' },
  { name: 'light', variable: '--color-primary-light' },
  { name: 'lighter', variable: '--color-primary-lighter' },
] as const;

const ALPHA_TOKENS = [
  { name: 'alpha-24', variable: '--color-primary-alpha-24' },
  { name: 'alpha-16', variable: '--color-primary-alpha-16' },
  { name: 'alpha-10', variable: '--color-primary-alpha-10' },
] as const;

const ScaleRow = ({ label }: { label: string }) => (
  <div className='flex flex-col gap-1.5'>
    <span className='text-text-sub-600 text-xs font-medium'>{label}</span>
    <div className='flex gap-1'>
      {SCALE_STEPS.map((step) => (
        <div key={step} className='flex flex-1 flex-col items-center gap-1'>
          <div
            className='h-10 w-full rounded-md ring-1 ring-black/5'
            style={{ background: `var(--color-primary-${step})` }}
          />
          <span className='text-text-soft-400 text-[10px] tabular-nums'>
            {step}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const SemanticRow = ({
  label,
  tokens,
}: {
  label: string;
  tokens: ReadonlyArray<{ name: string; variable: string }>;
}) => (
  <div className='flex flex-col gap-1.5'>
    <span className='text-text-sub-600 text-xs font-medium'>{label}</span>
    <div className='flex gap-1'>
      {tokens.map((token) => (
        <div
          key={token.name}
          className='flex flex-1 flex-col items-center gap-1'
        >
          <div
            className='h-10 w-full rounded-md ring-1 ring-black/5'
            style={{ background: `var(${token.variable})` }}
          />
          <span className='text-text-soft-400 text-[10px]'>{token.name}</span>
        </div>
      ))}
    </div>
  </div>
);

const FullPalette = ({ label, color }: { label: string; color: string }) => (
  <ThemeProvider.Root primaryColor={color} className='flex flex-col gap-5'>
    <div className='flex items-center gap-2'>
      <div
        className='h-4 w-4 rounded-full ring-1 ring-black/5'
        style={{ background: color }}
      />
      <span className='text-text-strong-950 text-sm font-semibold'>
        {label}
      </span>
      <span className='text-text-soft-400 font-mono text-xs'>{color}</span>
    </div>

    <ScaleRow label='Scale (950–50)' />
    <SemanticRow label='Semantic' tokens={SEMANTIC_TOKENS} />
    <SemanticRow label='Alpha' tokens={ALPHA_TOKENS} />
  </ThemeProvider.Root>
);

export const Default = {
  render: () => <FullPalette label='Purple (default)' color='#7d52f4' />,
};

export const Global = {
  render: () => (
    <ThemeProvider.Root primaryColor='#0891b2' scope='global'>
      <FullPalette label='Cyan (global scope)' color='#0891b2' />
    </ThemeProvider.Root>
  ),
};

export const MultipleThemes = {
  render: () => (
    <div className='flex flex-col gap-10'>
      <FullPalette label='Rose' color='#e11d48' />
      <FullPalette label='Blue' color='#2563eb' />
      <FullPalette label='Green' color='#16a34a' />
      <FullPalette label='Orange' color='#ea580c' />
    </div>
  ),
};
