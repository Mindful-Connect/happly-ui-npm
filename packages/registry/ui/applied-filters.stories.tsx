import { useCallback, useState } from 'react';
import {
  RiFilterLine,
  RiLoader2Fill,
  RiSearchLine,
  RiSettings3Line,
  RiUserSettingsLine,
} from '@remixicon/react';

import * as AppliedFilters from './applied-filters';
import type { AppliedFilterGroup } from './applied-filters';
import * as Button from './button';
import * as FilterDropdown from './filter-dropdown';

export default {
  title: 'UI/Applied Filters',
  component: AppliedFilters.Root,
};

// ─── Shared data ──────────────────────────────────────────

const FILTER_GROUPS: AppliedFilterGroup[] = [
  {
    key: 'accountType',
    label: 'Account type',
    icon: RiUserSettingsLine,
    options: [
      { value: 'business', label: 'Business' },
      { value: 'personal', label: 'Personal' },
      { value: 'enterprise', label: 'Enterprise' },
    ],
  },
  {
    key: 'role',
    label: 'Role',
    icon: RiSettings3Line,
    options: [
      { value: 'admin', label: 'Admin' },
      { value: 'member', label: 'Team member' },
      { value: 'viewer', label: 'Viewer' },
      { value: 'owner', label: 'Owner' },
    ],
  },
  {
    key: 'status',
    label: 'Status',
    icon: RiLoader2Fill,
    options: [
      { value: 'active', label: 'Active' },
      { value: 'suspended', label: 'Suspended' },
      { value: 'not_invited', label: 'Not invited' },
      { value: 'pending', label: 'Pending' },
    ],
  },
];

// ─── Hook ─────────────────────────────────────────────────

function useFilterState(initial: Record<string, string[]> = {}) {
  const [selected, setSelected] = useState<Record<string, string[]>>(initial);

  const handleRemove = useCallback((key: string, value: string) => {
    setSelected((prev) => ({
      ...prev,
      [key]: (prev[key] ?? []).filter((v) => v !== value),
    }));
  }, []);

  const handleRemoveGroup = useCallback((key: string) => {
    setSelected((prev) => ({ ...prev, [key]: [] }));
  }, []);

  const handleResetAll = useCallback(() => {
    setSelected({});
  }, []);

  const handleSelectedChange = useCallback(
    (key: string, values: string[]) => {
      setSelected((prev) => ({ ...prev, [key]: values }));
    },
    []
  );

  return {
    selected,
    handleRemove,
    handleRemoveGroup,
    handleResetAll,
    handleSelectedChange,
  };
}

// ─── Default ──────────────────────────────────────────────

export const Default = {
  render: () => {
    const {
      selected,
      handleRemove,
      handleRemoveGroup,
      handleResetAll,
    } = useFilterState({
      accountType: ['business'],
      role: ['admin', 'member'],
      status: ['suspended', 'not_invited'],
    });

    return (
      <AppliedFilters.Root
        filters={FILTER_GROUPS}
        selected={selected}
        onRemove={handleRemove}
        onRemoveGroup={handleRemoveGroup}
        onResetAll={handleResetAll}
      />
    );
  },
};

// ─── Single Group ─────────────────────────────────────────

export const SingleGroup = {
  render: () => {
    const { selected, handleRemove, handleResetAll } = useFilterState({
      role: ['admin'],
    });

    return (
      <AppliedFilters.Root
        filters={FILTER_GROUPS}
        selected={selected}
        onRemove={handleRemove}
        onResetAll={handleResetAll}
      />
    );
  },
};

// ─── Many Tags (overflow) ─────────────────────────────────

export const ManyTags = {
  render: () => {
    const { selected, handleRemove, handleResetAll } = useFilterState({
      accountType: ['business', 'personal', 'enterprise'],
      role: ['admin', 'member', 'viewer', 'owner'],
      status: ['active', 'suspended', 'not_invited', 'pending'],
    });

    return (
      <div className='max-w-2xl'>
        <AppliedFilters.Root
          filters={FILTER_GROUPS}
          selected={selected}
          onRemove={handleRemove}
          onResetAll={handleResetAll}
        />
      </div>
    );
  },
};

// ─── Custom Group ─────────────────────────────────────────

export const CustomGroup = {
  render: () => {
    const [search, setSearch] = useState('john doe');
    const {
      selected,
      handleRemove,
      handleResetAll,
    } = useFilterState({
      role: ['admin'],
    });

    const handleFullReset = () => {
      handleResetAll();
      setSearch('');
    };

    return (
      <AppliedFilters.Root
        filters={FILTER_GROUPS}
        selected={selected}
        onRemove={handleRemove}
        onResetAll={handleFullReset}
      >
        {search && (
          <AppliedFilters.CustomGroup label='Search' icon={RiSearchLine}>
            <AppliedFilters.Tag onDismiss={() => setSearch('')}>
              {search}
            </AppliedFilters.Tag>
          </AppliedFilters.CustomGroup>
        )}
      </AppliedFilters.Root>
    );
  },
};

// ─── Without Reset Button ─────────────────────────────────

export const WithoutResetButton = {
  render: () => {
    const { selected, handleRemove } = useFilterState({
      accountType: ['business'],
      status: ['suspended'],
    });

    return (
      <AppliedFilters.Root
        filters={FILTER_GROUPS}
        selected={selected}
        onRemove={handleRemove}
      />
    );
  },
};

// ─── With FilterDropdown ──────────────────────────────────

export const WithFilterDropdown = {
  render: () => {
    const {
      selected,
      handleRemove,
      handleRemoveGroup,
      handleResetAll,
      handleSelectedChange,
    } = useFilterState({
      role: ['admin', 'member'],
    });

    return (
      <div className='flex flex-col gap-3'>
        <FilterDropdown.Composed
          filters={FILTER_GROUPS.map((g) => ({
            key: g.key,
            label: g.label,
            icon: g.icon,
            options: g.options,
          }))}
          selected={selected}
          onSelectedChange={handleSelectedChange}
        >
          <Button.Root variant='neutral' mode='stroke'>
            <Button.Icon as={RiFilterLine} />
            Filters
          </Button.Root>
        </FilterDropdown.Composed>

        <AppliedFilters.Root
          filters={FILTER_GROUPS}
          selected={selected}
          onRemove={handleRemove}
          onRemoveGroup={handleRemoveGroup}
          onResetAll={handleResetAll}
        />
      </div>
    );
  },
};

// ─── Empty (renders nothing) ──────────────────────────────

export const Empty = {
  render: () => {
    return (
      <div>
        <p className='text-label-sm text-text-sub-600 mb-2'>
          Component renders nothing when no filters are active:
        </p>
        <AppliedFilters.Root
          filters={FILTER_GROUPS}
          selected={{}}
          onRemove={() => {}}
          onResetAll={() => {}}
        />
        <p className='text-label-sm text-text-sub-600 mt-2'>
          (nothing above this line)
        </p>
      </div>
    );
  },
};
