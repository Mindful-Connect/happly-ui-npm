'use client';

import * as React from 'react';

import { cn } from '../lib/happly-ui-utils';

// Edge-fade scroll container — same gradient/mask trick used by
// `tab-menu-horizontal`, generalized to either orientation. The native
// scrollbar is hidden; soft fades only appear on the edge that has more
// content to reveal.

const DEFAULT_FADE_SIZE = 24;

function buildVerticalMaskImage(
  canScrollUp: boolean,
  canScrollDown: boolean,
  fadeSize: number
) {
  if (!canScrollUp && !canScrollDown) return 'none';
  const top = canScrollUp
    ? `linear-gradient(to bottom, transparent, black ${fadeSize}px)`
    : 'linear-gradient(black, black)';
  const bottom = canScrollDown
    ? `linear-gradient(to top, transparent, black ${fadeSize}px)`
    : 'linear-gradient(black, black)';
  return `${top}, ${bottom}`;
}

function buildHorizontalMaskImage(
  canScrollLeft: boolean,
  canScrollRight: boolean,
  fadeSize: number
) {
  if (!canScrollLeft && !canScrollRight) return 'none';
  const left = canScrollLeft
    ? `linear-gradient(to right, transparent, black ${fadeSize}px)`
    : 'linear-gradient(black, black)';
  const right = canScrollRight
    ? `linear-gradient(to left, transparent, black ${fadeSize}px)`
    : 'linear-gradient(black, black)';
  return `${left}, ${right}`;
}

const maskCompositeStyle = {
  maskComposite: 'intersect',
  WebkitMaskComposite: 'source-in',
} as React.CSSProperties;

type FadeScrollOrientation = 'vertical' | 'horizontal';

type FadeScrollRootProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: FadeScrollOrientation;
  fadeSize?: number;
};

const FadeScrollRoot = React.forwardRef<HTMLDivElement, FadeScrollRootProps>(
  (
    {
      className,
      children,
      orientation = 'vertical',
      fadeSize = DEFAULT_FADE_SIZE,
      onScroll,
      style,
      ...rest
    },
    forwardedRef
  ) => {
    const innerRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(forwardedRef, () => innerRef.current!, []);

    const [canScrollStart, setCanScrollStart] = React.useState(false);
    const [canScrollEnd, setCanScrollEnd] = React.useState(false);
    const isVertical = orientation === 'vertical';

    const updateScrollState = React.useCallback(() => {
      const el = innerRef.current;
      if (!el) return;
      if (isVertical) {
        setCanScrollStart(el.scrollTop > 0);
        setCanScrollEnd(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
      } else {
        setCanScrollStart(el.scrollLeft > 0);
        setCanScrollEnd(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
      }
    }, [isVertical]);

    React.useEffect(() => {
      updateScrollState();
      const el = innerRef.current;
      if (!el) return;

      const observer = new ResizeObserver(updateScrollState);
      observer.observe(el);
      // Also observe child size changes so dynamic content (e.g. validation
      // errors expanding inputs) re-evaluates the fade visibility.
      Array.from(el.children).forEach((child) => observer.observe(child));
      return () => observer.disconnect();
    }, [updateScrollState]);

    const maskImage = isVertical
      ? buildVerticalMaskImage(canScrollStart, canScrollEnd, fadeSize)
      : buildHorizontalMaskImage(canScrollStart, canScrollEnd, fadeSize);

    return (
      <div
        ref={innerRef}
        onScroll={(e) => {
          updateScrollState();
          onScroll?.(e);
        }}
        className={cn(
          // Hide the native scrollbar — fades replace it visually.
          '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          isVertical ? 'overflow-y-auto' : 'overflow-x-auto',
          // Prevent flex/grid from compressing direct children below their
          // natural size — without this, items collapse instead of overflowing.
          '[&>*]:shrink-0',
          className
        )}
        style={
          maskImage !== 'none'
            ? {
                maskImage,
                WebkitMaskImage: maskImage,
                ...maskCompositeStyle,
                ...style,
              }
            : style
        }
        {...rest}
      >
        {children}
      </div>
    );
  }
);
FadeScrollRoot.displayName = 'FadeScrollRoot';

export { FadeScrollRoot as Root };
export type { FadeScrollOrientation, FadeScrollRootProps };
