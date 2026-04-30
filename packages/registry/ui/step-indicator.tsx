'use client';

import * as React from 'react';
import { RiCheckLine } from '@remixicon/react';

import { cn } from '@/lib/happly-ui-utils';
import * as ProgressCircle from './progress-circle';

type StepStatus = 'pending' | 'active' | 'completed';

// Marker brand attached to the Item component so Root can identify which
// children are step items (vs. arbitrary slotted content).
const ITEM_BRAND = '__stepIndicatorItem';

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

type StepIndicatorRootProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Tailwind class for the filled rail. Defaults to a primary-400→500 gradient. */
  railFilledClassName?: string;
  /** Tailwind class for the unfilled rail track. */
  railTrackClassName?: string;
  /** Transition duration for the rail-fill animation, in ms. */
  fillTransitionMs?: number;
  /**
   * Fires when any step is clicked. Receives the step's zero-based index.
   * Items become interactive (cursor + keyboard support) when this is set
   * or when an item has its own `onClick`. Per-item `onClick` runs first
   * and can call `event.preventDefault()` to suppress this callback.
   */
  onItemClick?: (index: number, event: React.SyntheticEvent<HTMLDivElement>) => void;
};

const StepIndicatorRoot = React.forwardRef<HTMLDivElement, StepIndicatorRootProps>(
  (
    {
      className,
      children,
      railFilledClassName = 'bg-gradient-to-b from-primary-400 to-primary-500',
      railTrackClassName = 'bg-bg-soft-200',
      fillTransitionMs = 500,
      onItemClick,
      ...rest
    },
    ref
  ) => {
    const allChildren = React.Children.toArray(children);
    const isItem = (child: React.ReactNode) =>
      React.isValidElement(child) &&
      Boolean(
        (child.type as unknown as { [k: string]: unknown })[ITEM_BRAND]
      );

    const itemFilled: boolean[] = [];
    allChildren.forEach((child) => {
      if (isItem(child)) {
        const status = (
          child as React.ReactElement<StepIndicatorItemProps>
        ).props.status;
        itemFilled.push(status !== 'pending');
      }
    });

    let lastFilledIndex = -1;
    for (let i = itemFilled.length - 1; i >= 0; i--) {
      if (itemFilled[i]) {
        lastFilledIndex = i;
        break;
      }
    }
    const itemCount = itemFilled.length;
    const allFilled = itemCount > 0 && lastFilledIndex === itemCount - 1;

    // The fill is rendered as a single absolute element whose height is
    // measured to land exactly at the bottom of the last filled item's
    // bulge (or the very bottom when all items are filled). CSS transitions
    // the height change for a smooth fill animation between states.
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const iconCellRefs = React.useRef<(HTMLDivElement | null)[]>([]);
    const [fillHeight, setFillHeight] = React.useState<number>(0);
    // Suppress the height transition until after the initial layout pass —
    // otherwise the rail would visibly fill from zero on every mount.
    const [animateEnabled, setAnimateEnabled] = React.useState(false);

    React.useLayoutEffect(() => {
      const measure = () => {
        const container = containerRef.current;
        if (!container) return;
        if (lastFilledIndex < 0) {
          setFillHeight(0);
          return;
        }
        const containerRect = container.getBoundingClientRect();
        if (allFilled) {
          setFillHeight(containerRect.height);
          return;
        }
        const iconCell = iconCellRefs.current[lastFilledIndex];
        if (!iconCell) return;
        const iconRect = iconCell.getBoundingClientRect();
        const iconCenter = iconRect.top + iconRect.height / 2;
        // Extend the fill past the bulge bottom (icon center + 9px) by a
        // few extra pixels of breathing room. Without this, the bottom
        // rounded cap starts exactly at the icon center, which reads as a
        // squished oval when the first step is the last filled (because
        // there's only 9px of straight fill above the icon as well).
        setFillHeight(Math.max(0, iconCenter + 13 - containerRect.top));
      };

      measure();

      const ro = new ResizeObserver(measure);
      if (containerRef.current) ro.observe(containerRef.current);
      iconCellRefs.current.forEach((el) => el && ro.observe(el));
      return () => ro.disconnect();
    }, [lastFilledIndex, allFilled, itemCount]);

    React.useEffect(() => {
      const id = requestAnimationFrame(() => setAnimateEnabled(true));
      return () => cancelAnimationFrame(id);
    }, []);

    let itemIndex = -1;
    const decorated = allChildren.map((child) => {
      if (!isItem(child)) return child;
      itemIndex++;
      const i = itemIndex;
      const childProps = (child as React.ReactElement<StepIndicatorItemProps>)
        .props;
      const userOnClick = childProps.onClick;
      // Compose the per-item handler with Root's onItemClick. Per-item
      // handler runs first; if it calls `event.preventDefault()`, the
      // Root-level callback is suppressed.
      const composedOnClick =
        userOnClick || onItemClick
          ? (event: React.MouseEvent<HTMLDivElement>) => {
              userOnClick?.(event);
              if (!event.defaultPrevented) onItemClick?.(i, event);
            }
          : undefined;
      return React.cloneElement(
        child as React.ReactElement<StepIndicatorItemProps>,
        {
          __isFilled: itemFilled[i],
          __iconCellRef: (el: HTMLDivElement | null) => {
            iconCellRefs.current[i] = el;
          },
          __onActivate: composedOnClick
            ? (event: React.SyntheticEvent<HTMLDivElement>) => {
                if (event.type === 'click') {
                  composedOnClick(event as React.MouseEvent<HTMLDivElement>);
                } else {
                  // Keyboard activation — synthesize the same flow.
                  userOnClick?.(
                    event as unknown as React.MouseEvent<HTMLDivElement>
                  );
                  if (!event.defaultPrevented) onItemClick?.(i, event);
                }
              }
            : undefined,
          // Strip the user's onClick from the cloned element — we route
          // activation through __onActivate instead so both cells (and
          // keyboard) trigger it consistently.
          onClick: undefined,
        } as Partial<StepIndicatorItemProps>
      );
    });

    const setRootRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    return (
      <div
        ref={setRootRef}
        className={cn(
          'relative grid w-full grid-cols-[18px_1fr] gap-x-5',
          className
        )}
        {...rest}
      >
        {/* Continuous gray rail — single rounded capsule, full height. */}
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute left-0 top-0 h-full w-[18px] rounded-full',
            railTrackClassName
          )}
        />
        {/* Filled overlay — single rounded capsule whose height animates as
            items move through their states. */}
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute left-0 top-0 w-[18px] rounded-full',
            railFilledClassName
          )}
          style={{
            height: `${fillHeight}px`,
            transition: animateEnabled
              ? `height ${fillTransitionMs}ms cubic-bezier(0.4, 0, 0.2, 1)`
              : undefined,
          }}
        />
        {decorated}
      </div>
    );
  }
);
StepIndicatorRoot.displayName = 'StepIndicatorRoot';

// ---------------------------------------------------------------------------
// Item
// ---------------------------------------------------------------------------

type StepIndicatorItemProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> & {
  status: StepStatus;
  /** Icon shown inside the rail bulge (12×12 inside the 18px-wide rail). */
  icon: React.ElementType;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Progress 0–100 for the right-side ring when status === 'active'. */
  progress?: number;
  // Internal — populated by Root.
  __isFilled?: boolean;
  __iconCellRef?: React.Ref<HTMLDivElement>;
  __onActivate?: (event: React.SyntheticEvent<HTMLDivElement>) => void;
};

const StepIndicatorItem = React.forwardRef<HTMLDivElement, StepIndicatorItemProps>(
  (
    {
      status,
      icon: Icon,
      title,
      description,
      progress = 50,
      className,
      onClick,
      __isFilled,
      __iconCellRef,
      __onActivate,
      ...rest
    },
    ref
  ) => {
    const isFilled = __isFilled ?? status !== 'pending';
    // When used inside Root, __onActivate is the composed click handler.
    // When used standalone, fall back to the item's own onClick (wrapped so
    // both mouse and keyboard events flow through a single signature).
    const activate:
      | ((event: React.SyntheticEvent<HTMLDivElement>) => void)
      | undefined =
      __onActivate ??
      (onClick
        ? (event) =>
            onClick(event as React.MouseEvent<HTMLDivElement>)
        : undefined);
    const interactive = !!activate;

    const handleKeyDown = interactive
      ? (event: React.KeyboardEvent<HTMLDivElement>) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            activate?.(event);
          }
        }
      : undefined;

    return (
      // `display: contents` lets the item contribute two grid cells (icon
      // + content) directly to the parent grid without a wrapper element
      // affecting layout.
      <div ref={ref} className={cn('contents', className)} {...rest}>
        {/* Outer flex aligns the bulge with the title row instead of the
            row's vertical center. Offset = py-2 (8px) + half title
            line-height (10px) - half bulge height (9px) = 9px. */}
        <div
          className={cn(
            'relative z-[1] flex justify-center pt-[9px]',
            interactive && 'cursor-pointer'
          )}
          onClick={
            interactive
              ? (event: React.MouseEvent<HTMLDivElement>) => activate?.(event)
              : undefined
          }
        >
          <div
            ref={__iconCellRef}
            className='flex size-[18px] items-center justify-center'
          >
            <Icon
              className={cn(
                'size-3 transition-colors duration-300',
                isFilled ? 'text-static-white' : 'text-text-soft-400'
              )}
            />
          </div>
        </div>
        <div
          className={cn(
            'group/step flex min-w-0 items-center justify-between gap-3 rounded-md py-2 outline-none transition-colors',
            interactive &&
              'cursor-pointer'
          )}
          onClick={
            interactive
              ? (event: React.MouseEvent<HTMLDivElement>) => activate?.(event)
              : undefined
          }
          onKeyDown={handleKeyDown}
          role={interactive ? 'button' : undefined}
          tabIndex={interactive ? 0 : undefined}
          aria-label={
            interactive && typeof title === 'string' ? title : undefined
          }
        >
          <div className='flex min-w-0 flex-1 flex-col gap-0.5'>
            <p className='truncate text-label-sm text-text-strong-950'>
              {title}
            </p>
            {description ? (
              <p className='truncate text-paragraph-xs text-text-soft-400'>
                {description}
              </p>
            ) : null}
          </div>
          <DefaultStatusAdornment status={status} progress={progress} />
        </div>
      </div>
    );
  }
);
StepIndicatorItem.displayName = 'StepIndicatorItem';
(StepIndicatorItem as unknown as Record<string, unknown>)[ITEM_BRAND] = true;

// ---------------------------------------------------------------------------
// Status adornment — cross-fades between pending / active / completed so
// the progress circle morphs smoothly into the green check on completion.
// ---------------------------------------------------------------------------

function DefaultStatusAdornment({
  status,
  progress,
}: {
  status: StepStatus;
  progress: number;
}) {
  return (
    <div className='relative size-5 shrink-0'>
      <div
        aria-hidden
        className={cn(
          'absolute inset-0 rounded-full border-[1.5px] border-bg-soft-200 transition-all duration-300 ease-out',
          status === 'pending' ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        )}
      />
      <div
        aria-hidden
        className={cn(
          'absolute inset-0 transition-all duration-300 ease-out',
          status === 'active' ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        )}
      >
        <ProgressCircle.Root
          size={20}
          value={progress}
          color='stroke-text-strong-950'
        />
      </div>
      <div
        aria-hidden
        className={cn(
          'absolute inset-0 flex items-center justify-center rounded-full bg-success-base text-static-white transition-all duration-300 ease-out',
          status === 'completed' ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        )}
      >
        <RiCheckLine className='size-3.5' />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Composed (data-driven shorthand)
// ---------------------------------------------------------------------------

type StepIndicatorComposedItem = {
  status: StepStatus;
  icon: React.ElementType;
  title: React.ReactNode;
  description?: React.ReactNode;
  progress?: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

type StepIndicatorComposedProps = Omit<StepIndicatorRootProps, 'children'> & {
  items: StepIndicatorComposedItem[];
};

const StepIndicatorComposed = React.forwardRef<
  HTMLDivElement,
  StepIndicatorComposedProps
>(({ items, ...rest }, ref) => {
  return (
    <StepIndicatorRoot ref={ref} {...rest}>
      {items.map((item, i) => (
        <StepIndicatorItem key={i} {...item} />
      ))}
    </StepIndicatorRoot>
  );
});
StepIndicatorComposed.displayName = 'StepIndicatorComposed';

export {
  StepIndicatorRoot as Root,
  StepIndicatorItem as Item,
  StepIndicatorComposed as Composed,
};
export type {
  StepStatus,
  StepIndicatorRootProps,
  StepIndicatorItemProps,
  StepIndicatorComposedItem,
  StepIndicatorComposedProps,
};
