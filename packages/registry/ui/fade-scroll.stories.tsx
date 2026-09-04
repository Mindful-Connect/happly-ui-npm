import * as FadeScroll from './fade-scroll';

export default {
  title: 'Layout/Fade Scroll',
  component: FadeScroll.Root,
};

const longParagraphs = [
  'Edge fades only appear on the side that still has more content to reveal — once you reach the top or bottom, that fade disappears.',
  'The native scrollbar is hidden, so the fades carry the entire affordance for "there is more here". This works equally well in a vertical or horizontal arrangement.',
  'Resize observers watch both the container and its direct children, so dynamically growing content (e.g. expanding validation errors, async-loaded items) keeps the fades accurate.',
  'Use the `fadeSize` prop to make the fade softer or harder. Use `className` to style the container itself — width, height, padding, gap, etc.',
  'Because the component composes around `overflow-auto`, you can drop any layout inside it: a flex column of cards, a grid, a list of buttons, or just plain prose like this.',
  'Try scrolling. The top fade will appear once you move past the first line, and the bottom fade will disappear once you reach the last paragraph.',
  'This last paragraph exists purely so that there is enough content for the bottom fade to be visible at rest — without overflow there would be nothing to fade.',
];

export const Vertical = {
  render: () => (
    <FadeScroll.Root
      label='About the fade scroll container'
      className='text-text-sub-600 h-64 max-w-md space-y-3 pr-2 text-sm'
    >
      {longParagraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </FadeScroll.Root>
  ),
};

export const Horizontal = {
  render: () => (
    <FadeScroll.Root
      label='Cards'
      orientation='horizontal'
      className='flex max-w-lg gap-3 pb-1'
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className='border-stroke-soft-200 bg-bg-weak-50 text-text-strong-950 flex h-24 w-40 items-center justify-center rounded-lg border text-sm font-medium'
        >
          Card {i + 1}
        </div>
      ))}
    </FadeScroll.Root>
  ),
};

export const VerticalList = {
  render: () => (
    <FadeScroll.Root
      label='List items'
      className='border-stroke-soft-200 bg-bg-white-0 h-72 w-72 rounded-lg border'
    >
      <ul>
        {Array.from({ length: 24 }).map((_, i) => (
          <li
            key={i}
            className='border-stroke-soft-200 text-text-strong-950 border-b px-4 py-3 text-sm last:border-0'
          >
            List item #{i + 1}
          </li>
        ))}
      </ul>
    </FadeScroll.Root>
  ),
};

export const CustomFadeSize = {
  render: () => (
    <div className='flex flex-col gap-6'>
      <div>
        <p className='text-text-sub-600 mb-2 text-xs uppercase'>
          fadeSize=8 (subtle)
        </p>
        <FadeScroll.Root
          label='Items with a subtle fade'
          orientation='horizontal'
          fadeSize={8}
          className='flex max-w-lg gap-3'
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className='border-stroke-soft-200 bg-bg-weak-50 flex h-16 w-32 items-center justify-center rounded-lg border text-sm'
            >
              Item {i + 1}
            </div>
          ))}
        </FadeScroll.Root>
      </div>
      <div>
        <p className='text-text-sub-600 mb-2 text-xs uppercase'>
          fadeSize=64 (dramatic)
        </p>
        <FadeScroll.Root
          label='Items with a dramatic fade'
          orientation='horizontal'
          fadeSize={64}
          className='flex max-w-lg gap-3'
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className='border-stroke-soft-200 bg-bg-weak-50 flex h-16 w-32 items-center justify-center rounded-lg border text-sm'
            >
              Item {i + 1}
            </div>
          ))}
        </FadeScroll.Root>
      </div>
    </div>
  ),
};

export const NoOverflow = {
  render: () => (
    <FadeScroll.Root className='text-text-sub-600 h-64 max-w-md space-y-3 text-sm'>
      <p>
        When content fits, no fades appear at all — the component is invisible
        in the layout until scroll is actually possible.
      </p>
    </FadeScroll.Root>
  ),
};
