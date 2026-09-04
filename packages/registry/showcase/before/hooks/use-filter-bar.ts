'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type React from 'react';

// ─── Types ───────────────────────────────────────────────

type FilterState = Record<string, unknown>;

type UseFilterBarOptions<T extends FilterState> = {
  /** The filter keys managed by the dropdown (must be array-valued in state) */
  filterKeys: readonly string[];
  /** Current committed filter state */
  filters: T;
  /** State setter for the committed filters */
  setFilters: React.Dispatch<React.SetStateAction<T>>;
  /** Page setter — called with 1 on every filter change */
  setPage?: (page: number) => void;
};

type UseFilterBarReturn = {
  /** Local working selections for FilterDropdown.Composed `selected` prop */
  selections: Record<string, string[]>;
  /** Handler for FilterDropdown.Composed `onSelectedChange` prop */
  onSelectedChange: (key: string, values: string[]) => void;
  /** Handler for FilterDropdown.Composed `onApply` prop */
  onApply: (selected: Record<string, string[]>) => void;
  /** Applied filter values derived from committed state (for AppliedFilters.Root `selected`) */
  applied: Record<string, string[]>;
  /** Remove a single value from an applied filter group */
  onRemove: (key: string, value: string) => void;
  /** Clear all managed filter keys from state */
  onResetAll: () => void;
  /** Whether any managed filters are currently applied */
  hasAppliedFilters: boolean;
};

// ─── Hook ────────────────────────────────────────────────

function useFilterBar<T extends FilterState>({
  filterKeys,
  filters,
  setFilters,
  setPage,
}: UseFilterBarOptions<T>): UseFilterBarReturn {
  const [selections, setSelections] = useState<Record<string, string[]>>({});

  // Sync local selections when committed filters change
  useEffect(() => {
    const next: Record<string, string[]> = {};
    for (const key of filterKeys) {
      const val = (filters as Record<string, unknown>)[key];
      if (Array.isArray(val) && val.length > 0) {
        next[key] = val as string[];
      }
    }
    setSelections(next);
  }, [filters, filterKeys]);

  const onSelectedChange = useCallback((key: string, values: string[]) => {
    setSelections((prev) => ({ ...prev, [key]: values }));
  }, []);

  const onApply = useCallback(
    (selected: Record<string, string[]>) => {
      setFilters((prev) => {
        const next = { ...prev };
        for (const key of filterKeys) {
          const vals = selected[key];
          if (vals && vals.length > 0) {
            (next as Record<string, unknown>)[key] = vals;
          } else {
            delete (next as Record<string, unknown>)[key];
          }
        }
        return next;
      });
      setPage?.(1);
    },
    [filterKeys, setFilters, setPage]
  );

  const onRemove = useCallback(
    (key: string, value: string) => {
      setFilters((prev) => {
        const next = { ...prev };
        const current = (next as Record<string, unknown>)[key];
        if (Array.isArray(current)) {
          const updated = current.filter((v: string) => v !== value);
          if (updated.length > 0) {
            (next as Record<string, unknown>)[key] = updated;
          } else {
            delete (next as Record<string, unknown>)[key];
          }
        }
        return next;
      });
      setPage?.(1);
    },
    [setFilters, setPage]
  );

  const onResetAll = useCallback(() => {
    setFilters((prev) => {
      const next = { ...prev };
      for (const key of filterKeys) {
        delete (next as Record<string, unknown>)[key];
      }
      return next;
    });
    setPage?.(1);
  }, [filterKeys, setFilters, setPage]);

  const applied = useMemo(() => {
    const result: Record<string, string[]> = {};
    for (const key of filterKeys) {
      const val = (filters as Record<string, unknown>)[key];
      if (Array.isArray(val) && val.length > 0) {
        result[key] = val as string[];
      }
    }
    return result;
  }, [filters, filterKeys]);

  return {
    selections,
    onSelectedChange,
    onApply,
    applied,
    onRemove,
    onResetAll,
    hasAppliedFilters: Object.keys(applied).length > 0,
  };
}

export { useFilterBar };
export type { UseFilterBarOptions, UseFilterBarReturn };
