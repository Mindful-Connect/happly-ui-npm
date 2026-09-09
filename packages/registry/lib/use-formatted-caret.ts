'use client';

import * as React from 'react';

/**
 * Caret preservation for a controlled input whose displayed value is
 * reformatted as it is typed (`"(416) 555-1234"`, `"1,234.50"`).
 *
 * Without it the browser collapses the caret to the END after each controlled
 * re-render, so editing mid-value pushes the rest of the characters to the end.
 * The trick is to count the *significant* characters before the caret on change
 * (the ones formatting never adds or removes — digits, a decimal point) and map
 * that count back to an index once the reformatted value has rendered.
 *
 * Usage — call `queueCaret` in `onChange`, before handing the new value on, and
 * merge `inputRef` onto the input:
 *
 * ```tsx
 * const { inputRef, queueCaret } = useFormattedCaret(displayValue, isDigit);
 * // …in onChange: queueCaret(digitsBeforeCaret, nextFormattedValue)
 * <input ref={mergeRefs(forwardedRef, inputRef)} value={displayValue} />
 * ```
 *
 * @param displayValue The formatted value currently rendered in the input.
 * @param isSignificant Predicate for characters formatting cannot introduce.
 */
function useFormattedCaret(
  displayValue: string,
  isSignificant: (char: string) => boolean
) {
  // Merged with the consumer's forwarded ref at the call site (`mergeRefs`)
  // rather than here: passing a ref object to a function during render is what
  // the `react-hooks/refs` rule forbids, and `ref={mergeRefs(...)}` is already
  // the house pattern (switch-toggle).
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const pendingCaretRef = React.useRef<number | null>(null);
  // Last rendered value, read from the change handler to detect the no-op
  // reformat below. Kept in sync by the layout effect, never during render.
  const displayValueRef = React.useRef(displayValue);

  /** Place the caret after the `target`-th significant char of `formatted`. */
  const applyCaret = React.useCallback(
    (formatted: string, target: number) => {
      const el = inputRef.current;
      if (!el) return;

      let index = 0;
      if (target > 0) {
        let count = 0;
        index = formatted.length;
        for (let i = 0; i < formatted.length; i++) {
          if (isSignificant(formatted[i])) {
            count++;
            if (count === target) {
              index = i + 1;
              break;
            }
          }
        }
      }
      el.setSelectionRange(index, index);
    },
    [isSignificant]
  );

  /**
   * @param significantBeforeCaret Significant chars preceding the caret.
   * @param nextDisplayValue The value the input is about to display.
   */
  const queueCaret = React.useCallback(
    (significantBeforeCaret: number, nextDisplayValue: string) => {
      if (nextDisplayValue === displayValueRef.current) {
        // Reformatting produced the value already on screen (Backspace over a
        // bracket, typing a letter), so the state update bails out, no render
        // happens and the layout effect below never runs. React's controlled
        // restore would then rewrite the node and drop the caret at the end.
        // Write both now: the restore finds a node that already matches the
        // value prop and leaves the selection alone.
        const el = inputRef.current;
        if (el) {
          if (el.value !== nextDisplayValue) el.value = nextDisplayValue;
          applyCaret(nextDisplayValue, significantBeforeCaret);
        }
        pendingCaretRef.current = null;
        return;
      }
      pendingCaretRef.current = significantBeforeCaret;
    },
    [applyCaret]
  );

  // Restore the caret once the reformatted value has rendered. Runs every
  // render but only acts when a change just queued a caret position.
  React.useLayoutEffect(() => {
    displayValueRef.current = displayValue;

    const target = pendingCaretRef.current;
    if (target == null) return;
    pendingCaretRef.current = null;
    applyCaret(displayValue, target);
  });

  return { inputRef, queueCaret };
}

export { useFormattedCaret };
