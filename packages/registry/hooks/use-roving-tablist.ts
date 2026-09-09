import * as React from 'react';

function isEnabledTab(tab: HTMLElement) {
  return (
    !tab.hasAttribute('disabled') &&
    tab.getAttribute('aria-disabled') !== 'true'
  );
}

/**
 * Roving `tabindex` (ARIA APG): a tablist is one Tab stop, not one per tab.
 * The stop belongs to the selected tab, or — when nothing is selected, which
 * these components allow on every item — to the first enabled tab, so the list
 * is never dropped out of the tab order entirely. Driven from the Root over
 * the rendered nodes rather than as an `Item` prop, because items are cloned
 * children of arbitrary depth and the Root cannot address them individually.
 */
function setTabStop(tabs: HTMLElement[], stop: HTMLElement | undefined) {
  for (const tab of tabs) {
    tab.tabIndex = tab === stop ? 0 : -1;
  }
}

function syncRovingTabIndex(container: HTMLElement | null) {
  if (!container) return;

  const tabs = Array.from(
    container.querySelectorAll<HTMLElement>('[role="tab"]')
  );
  if (tabs.length === 0) return;

  const enabled = tabs.filter(isEnabledTab);

  // Focus wins over selection. Arrow-keying to an unselected tab scrolls the
  // strip, which re-renders the Root, which re-runs this sync — handing the
  // stop back to the selected tab while focus sits elsewhere would send
  // Shift+Tab to the wrong tab instead of out of the tablist.
  const active =
    typeof document !== 'undefined'
      ? (document.activeElement as HTMLElement | null)
      : null;
  const focused = active && enabled.includes(active) ? active : undefined;

  const selected = enabled.find(
    (tab) => tab.getAttribute('aria-selected') === 'true'
  );

  setTabStop(tabs, focused ?? selected ?? enabled[0]);
}

/**
 * ARIA APG tabs keyboard model: arrow keys move focus between tabs (wrapping),
 * Home/End jump to the first/last. Activation stays manual — the native
 * `<button>` already handles Enter and Space. The tab that receives focus also
 * takes over the tablist's single Tab stop.
 */
function moveTabFocus(
  event: React.KeyboardEvent<HTMLElement>,
  container: HTMLElement | null
) {
  const { key } = event;
  if (
    !container ||
    (key !== 'ArrowRight' &&
      key !== 'ArrowLeft' &&
      key !== 'Home' &&
      key !== 'End')
  ) {
    return;
  }

  const allTabs = Array.from(
    container.querySelectorAll<HTMLElement>('[role="tab"]')
  );
  const tabs = allTabs.filter(isEnabledTab);
  const current = tabs.indexOf(document.activeElement as HTMLElement);
  if (tabs.length === 0 || current === -1) return;

  event.preventDefault();
  const isRtl = getComputedStyle(container).direction === 'rtl';
  const forward = isRtl ? key === 'ArrowLeft' : key === 'ArrowRight';
  const next =
    key === 'Home'
      ? 0
      : key === 'End'
        ? tabs.length - 1
        : (current + (forward ? 1 : -1) + tabs.length) % tabs.length;

  const target = tabs[next];
  target.focus();
  setTabStop(allTabs, target);
}

/**
 * Roving-tabindex keyboard behaviour for a `role="tablist"` container whose
 * tabs are cloned children the Root cannot address individually.
 *
 * Attach `onKeyDown` to the container and call `syncTabStop()` from any
 * observer that already watches the tab nodes; the hook also re-syncs after
 * every render so a change of selection or of the item list moves the stop.
 */
export function useRovingTablist<T extends HTMLElement>(
  containerRef: React.RefObject<T | null>
) {
  const syncTabStop = React.useCallback(() => {
    syncRovingTabIndex(containerRef.current);
  }, [containerRef]);

  // Intentionally has no dependency array: selection lives in the DOM
  // (`aria-selected` on cloned children), not in props this Root can watch.
  React.useEffect(() => {
    syncTabStop();
  });

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      moveTabFocus(event, containerRef.current);
    },
    [containerRef]
  );

  return { onKeyDown, syncTabStop };
}
