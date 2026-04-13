import { useCallback, useState } from 'react';
import {
  RiCalendarEventLine,
  RiEyeLine,
  RiFilterLine,
  RiLoader2Fill,
  RiPuzzle2Line,
  RiUserLine,
} from '@remixicon/react';

import * as Avatar from './avatar';
import * as Button from './button';
import * as FilterDropdown from './filter-dropdown';
import type { RemoteFetchResult } from './filter-dropdown';
import * as StatusBadge from './status-badge';
import TimelineStatusBadge from './timeline-status-badge';
import type { TimelineStatus } from './timeline-status-badge';

export default {
  title: 'Overlays/Filter Dropdown',
  component: FilterDropdown.Root,
};

// ─── Helpers ───────────────────────────────────────────────

function useMultiSelect(options: string[]) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const toggle = (value: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  const selectAll = () =>
    setSelected(
      selected.size === options.length ? new Set() : new Set(options)
    );
  const reset = () => setSelected(new Set());
  const allChecked =
    selected.size === options.length
      ? true
      : selected.size > 0
        ? ('indeterminate' as const)
        : false;
  return { selected, toggle, selectAll, reset, allChecked };
}

// ─── Category Menu ─────────────────────────────────────────

export const CategoryMenu = {
  render: () => (
    <FilterDropdown.Root>
      <FilterDropdown.Trigger asChild>
        <Button.Root variant='neutral' mode='stroke'>
          <Button.Icon as={RiFilterLine} />
          Filters
        </Button.Root>
      </FilterDropdown.Trigger>
      <FilterDropdown.Content className='w-[224px]'>
        <FilterDropdown.CategoryList>
          <FilterDropdown.CategoryItem
            icon={RiPuzzle2Line}
            onClick={() => alert('Types clicked')}
          >
            Types
          </FilterDropdown.CategoryItem>
          <FilterDropdown.CategoryItem
            icon={RiEyeLine}
            onClick={() => alert('Visibility clicked')}
          >
            Visibility
          </FilterDropdown.CategoryItem>
          <FilterDropdown.CategoryItem
            icon={RiCalendarEventLine}
            onClick={() => alert('Deadline status clicked')}
          >
            Deadline status
          </FilterDropdown.CategoryItem>
          <FilterDropdown.CategoryItem
            icon={RiUserLine}
            onClick={() => alert('Funder clicked')}
          >
            Funder
          </FilterDropdown.CategoryItem>
        </FilterDropdown.CategoryList>
      </FilterDropdown.Content>
    </FilterDropdown.Root>
  ),
};

// ─── Text Options ──────────────────────────────────────────

const TYPE_OPTIONS = [
  'Grant',
  'Incubators & Accelerators',
  'VC Funding',
  'Competition',
  'Tax Credits',
  'Loan',
  'Hiring program',
  'Training program',
  'Internship / Co-op',
  'Investment',
  'Procurement',
  'Market expansion',
  'Research & development',
  'Other',
];

export const TextOptions = {
  render: function Render() {
    const { selected, toggle, selectAll, reset, allChecked } =
      useMultiSelect(TYPE_OPTIONS);

    return (
      <FilterDropdown.Root>
        <FilterDropdown.Trigger asChild>
          <Button.Root variant='neutral' mode='stroke'>
            <Button.Icon as={RiFilterLine} />
            Types
          </Button.Root>
        </FilterDropdown.Trigger>
        <FilterDropdown.Content>
          <FilterDropdown.Header onBack={() => alert('Back')} onReset={reset} />
          <FilterDropdown.SelectAll
            checked={allChecked}
            onCheckedChange={selectAll}
          />
          <FilterDropdown.Group>
            {TYPE_OPTIONS.map((option) => (
              <FilterDropdown.Item
                key={option}
                checked={selected.has(option)}
                onCheckedChange={() => toggle(option)}
              >
                {option}
              </FilterDropdown.Item>
            ))}
          </FilterDropdown.Group>
          <FilterDropdown.Apply onClick={() => alert('Applied')} />
        </FilterDropdown.Content>
      </FilterDropdown.Root>
    );
  },
};

// ─── Badge Options ─────────────────────────────────────────

const DEADLINE_OPTIONS: { value: TimelineStatus; label: string }[] = [
  { value: 'open', label: 'Open' },
  { value: 'closing_soon', label: 'Closing Soon' },
  { value: 'open_soon', label: 'Opening Soon' },
  { value: 'closed', label: 'Closed' },
];

export const BadgeOptions = {
  render: function Render() {
    const { selected, toggle, selectAll, reset, allChecked } = useMultiSelect(
      DEADLINE_OPTIONS.map((o) => o.value)
    );

    return (
      <FilterDropdown.Root>
        <FilterDropdown.Trigger asChild>
          <Button.Root variant='neutral' mode='stroke'>
            <Button.Icon as={RiFilterLine} />
            Deadline status
          </Button.Root>
        </FilterDropdown.Trigger>
        <FilterDropdown.Content>
          <FilterDropdown.Header onBack={() => alert('Back')} onReset={reset} />
          <FilterDropdown.SelectAll
            checked={allChecked}
            onCheckedChange={selectAll}
          />
          <FilterDropdown.Group>
            {DEADLINE_OPTIONS.map((option) => (
              <FilterDropdown.Item
                key={option.value}
                checked={selected.has(option.value)}
                onCheckedChange={() => toggle(option.value)}
              >
                <TimelineStatusBadge status={option.value} />
              </FilterDropdown.Item>
            ))}
          </FilterDropdown.Group>
          <FilterDropdown.Apply onClick={() => alert('Applied')} />
        </FilterDropdown.Content>
      </FilterDropdown.Root>
    );
  },
};

// ─── Status Badge Options ──────────────────────────────────

const STATUS_OPTIONS = [
  'Waiting for review',
  'Require changes',
  'Declined',
] as const;

export const StatusBadgeOptions = {
  render: function Render() {
    const { selected, toggle, selectAll, reset, allChecked } = useMultiSelect([
      ...STATUS_OPTIONS,
    ]);

    return (
      <FilterDropdown.Root>
        <FilterDropdown.Trigger asChild>
          <Button.Root variant='neutral' mode='stroke'>
            <Button.Icon as={RiFilterLine} />
            Publication status
          </Button.Root>
        </FilterDropdown.Trigger>
        <FilterDropdown.Content>
          <FilterDropdown.Header onBack={() => alert('Back')} onReset={reset} />
          <FilterDropdown.SelectAll
            checked={allChecked}
            onCheckedChange={selectAll}
          />
          <FilterDropdown.Group>
            {STATUS_OPTIONS.map((option) => (
              <FilterDropdown.Item
                key={option}
                checked={selected.has(option)}
                onCheckedChange={() => toggle(option)}
              >
                <StatusBadge.Root>{option}</StatusBadge.Root>
              </FilterDropdown.Item>
            ))}
          </FilterDropdown.Group>
          <FilterDropdown.Apply onClick={() => alert('Applied')} />
        </FilterDropdown.Content>
      </FilterDropdown.Root>
    );
  },
};

// ─── With Search ───────────────────────────────────────────

const PEOPLE = [
  'Arlene McCoy',
  'Jane Cooper',
  'Ronald Richards',
  'Darlene Robertson',
  'Cody Fisher',
  'Annette Black',
  'Cameron Williamson',
];

export const WithSearch = {
  render: function Render() {
    const [search, setSearch] = useState('');
    const { selected, toggle, selectAll, reset, allChecked } =
      useMultiSelect(PEOPLE);
    const filtered = PEOPLE.filter((p) =>
      p.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <FilterDropdown.Root>
        <FilterDropdown.Trigger asChild>
          <Button.Root variant='neutral' mode='stroke'>
            <Button.Icon as={RiFilterLine} />
            Created by
          </Button.Root>
        </FilterDropdown.Trigger>
        <FilterDropdown.Content>
          <FilterDropdown.Header
            onBack={() => alert('Back')}
            onReset={() => {
              reset();
              setSearch('');
            }}
          />
          <FilterDropdown.Search
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FilterDropdown.SelectAll
            checked={allChecked}
            onCheckedChange={selectAll}
          />
          <FilterDropdown.Group>
            {filtered.map((person) => (
              <FilterDropdown.Item
                key={person}
                checked={selected.has(person)}
                onCheckedChange={() => toggle(person)}
              >
                <span className='bg-bg-soft-200 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-medium'>
                  {person.charAt(0)}
                </span>
                {person}
              </FilterDropdown.Item>
            ))}
          </FilterDropdown.Group>
          <FilterDropdown.Apply onClick={() => alert('Applied')} />
        </FilterDropdown.Content>
      </FilterDropdown.Root>
    );
  },
};

// ─── Two-Level Navigation ──────────────────────────────────

const VISIBILITY_OPTIONS = ['Visible for members', 'Hidden from members'];

export const TwoLevelNavigation = {
  render: function Render() {
    const [view, setView] = useState<'categories' | 'types' | 'visibility'>(
      'categories'
    );
    const types = useMultiSelect(TYPE_OPTIONS);
    const visibility = useMultiSelect(VISIBILITY_OPTIONS);

    return (
      <FilterDropdown.Root
        onOpenChange={(open) => {
          if (!open) setView('categories');
        }}
      >
        <FilterDropdown.Trigger asChild>
          <Button.Root variant='neutral' mode='stroke'>
            <Button.Icon as={RiFilterLine} />
            Filters
          </Button.Root>
        </FilterDropdown.Trigger>
        <FilterDropdown.Content
          className={view === 'categories' ? 'w-[224px]' : undefined}
        >
          {view === 'categories' && (
            <FilterDropdown.CategoryList>
              <FilterDropdown.CategoryItem
                icon={RiPuzzle2Line}
                onClick={() => setView('types')}
              >
                Types
              </FilterDropdown.CategoryItem>
              <FilterDropdown.CategoryItem
                icon={RiLoader2Fill}
                onClick={() => setView('visibility')}
              >
                Visibility
              </FilterDropdown.CategoryItem>
            </FilterDropdown.CategoryList>
          )}

          {view === 'types' && (
            <>
              <FilterDropdown.Header
                onBack={() => setView('categories')}
                onReset={types.reset}
              />
              <FilterDropdown.SelectAll
                checked={types.allChecked}
                onCheckedChange={types.selectAll}
              />
              <FilterDropdown.Group>
                {TYPE_OPTIONS.map((option) => (
                  <FilterDropdown.Item
                    key={option}
                    checked={types.selected.has(option)}
                    onCheckedChange={() => types.toggle(option)}
                  >
                    {option}
                  </FilterDropdown.Item>
                ))}
              </FilterDropdown.Group>
              <FilterDropdown.Apply onClick={() => alert('Applied types')} />
            </>
          )}

          {view === 'visibility' && (
            <>
              <FilterDropdown.Header
                onBack={() => setView('categories')}
                onReset={visibility.reset}
              />
              <FilterDropdown.SelectAll
                checked={visibility.allChecked}
                onCheckedChange={visibility.selectAll}
              />
              <FilterDropdown.Group>
                {VISIBILITY_OPTIONS.map((option) => (
                  <FilterDropdown.Item
                    key={option}
                    checked={visibility.selected.has(option)}
                    onCheckedChange={() => visibility.toggle(option)}
                  >
                    {option}
                  </FilterDropdown.Item>
                ))}
              </FilterDropdown.Group>
              <FilterDropdown.Apply
                onClick={() => alert('Applied visibility')}
              />
            </>
          )}
        </FilterDropdown.Content>
      </FilterDropdown.Root>
    );
  },
};

// ─── Flat Filter (no categories) ───────────────────────────

export const FlatFilter = {
  render: function Render() {
    const { selected, toggle, selectAll, reset, allChecked } =
      useMultiSelect(VISIBILITY_OPTIONS);

    return (
      <FilterDropdown.Root>
        <FilterDropdown.Trigger asChild>
          <Button.Root variant='neutral' mode='stroke'>
            <Button.Icon as={RiFilterLine} />
            Visibility
          </Button.Root>
        </FilterDropdown.Trigger>
        <FilterDropdown.Content>
          <FilterDropdown.Header onReset={reset} />
          <FilterDropdown.SelectAll
            checked={allChecked}
            onCheckedChange={selectAll}
          />
          <FilterDropdown.Group>
            {VISIBILITY_OPTIONS.map((option) => (
              <FilterDropdown.Item
                key={option}
                checked={selected.has(option)}
                onCheckedChange={() => toggle(option)}
              >
                {option}
              </FilterDropdown.Item>
            ))}
          </FilterDropdown.Group>
          <FilterDropdown.Apply onClick={() => alert('Applied')} />
        </FilterDropdown.Content>
      </FilterDropdown.Root>
    );
  },
};

// ─── Composed (Two-Level) ──────────────────────────────────

export const ComposedTwoLevel = {
  render: function Render() {
    const [selected, setSelected] = useState<Record<string, string[]>>({
      types: [],
      visibility: [],
      deadline: [],
    });

    return (
      <FilterDropdown.Composed
        filters={[
          {
            key: 'types',
            label: 'Types',
            icon: RiPuzzle2Line,
            options: TYPE_OPTIONS.map((o) => ({ value: o, label: o })),
          },
          {
            key: 'visibility',
            label: 'Visibility',
            icon: RiEyeLine,
            options: VISIBILITY_OPTIONS.map((o) => ({ value: o, label: o })),
          },
          {
            key: 'deadline',
            label: 'Deadline status',
            icon: RiCalendarEventLine,
            options: DEADLINE_OPTIONS.map((o) => ({
              value: o.value,
              label: <TimelineStatusBadge status={o.value} />,
            })),
          },
        ]}
        selected={selected}
        onSelectedChange={(key, values) =>
          setSelected((prev) => ({ ...prev, [key]: values }))
        }
        onApply={(sel) => alert(JSON.stringify(sel, null, 2))}
      >
        <Button.Root variant='neutral' mode='stroke'>
          <Button.Icon as={RiFilterLine} />
          Filters
        </Button.Root>
      </FilterDropdown.Composed>
    );
  },
};

// ─── Composed (Single-Level / Flat) ────────────────────────

export const ComposedFlat = {
  render: function Render() {
    const [selected, setSelected] = useState<Record<string, string[]>>({
      visibility: [],
    });

    return (
      <FilterDropdown.Composed
        filters={[
          {
            key: 'visibility',
            label: 'Visibility',
            icon: RiEyeLine,
            options: VISIBILITY_OPTIONS.map((o) => ({ value: o, label: o })),
          },
        ]}
        selected={selected}
        onSelectedChange={(key, values) =>
          setSelected((prev) => ({ ...prev, [key]: values }))
        }
        onApply={(sel) => alert(JSON.stringify(sel, null, 2))}
      >
        <Button.Root variant='neutral' mode='stroke'>
          <Button.Icon as={RiFilterLine} />
          Visibility
        </Button.Root>
      </FilterDropdown.Composed>
    );
  },
};

// ─── Composed with Search ──────────────────────────────────

export const ComposedWithSearch = {
  render: function Render() {
    const [selected, setSelected] = useState<Record<string, string[]>>({
      people: [],
    });

    return (
      <FilterDropdown.Composed
        filters={[
          {
            key: 'people',
            label: 'Created by',
            icon: RiUserLine,
            searchable: true,
            searchPlaceholder: 'Search people...',
            options: PEOPLE.map((p) => ({ value: p, label: p })),
          },
        ]}
        selected={selected}
        onSelectedChange={(key, values) =>
          setSelected((prev) => ({ ...prev, [key]: values }))
        }
        onApply={(sel) => alert(JSON.stringify(sel, null, 2))}
      >
        <Button.Root variant='neutral' mode='stroke'>
          <Button.Icon as={RiFilterLine} />
          Created by
        </Button.Root>
      </FilterDropdown.Composed>
    );
  },
};

// ─── Composed with ReactNode Labels ────────────────────────

export const ComposedWithBadges = {
  render: function Render() {
    const [selected, setSelected] = useState<Record<string, string[]>>({
      deadline: [],
    });

    return (
      <FilterDropdown.Composed
        filters={[
          {
            key: 'deadline',
            label: 'Deadline status',
            icon: RiCalendarEventLine,
            options: DEADLINE_OPTIONS.map((o) => ({
              value: o.value,
              label: <TimelineStatusBadge status={o.value} />,
            })),
          },
        ]}
        selected={selected}
        onSelectedChange={(key, values) =>
          setSelected((prev) => ({ ...prev, [key]: values }))
        }
        onApply={(sel) => alert(JSON.stringify(sel, null, 2))}
      >
        <Button.Root variant='neutral' mode='stroke'>
          <Button.Icon as={RiFilterLine} />
          Deadline status
        </Button.Root>
      </FilterDropdown.Composed>
    );
  },
};

// ─── Remote Search with Infinite Scroll ───────────────────

const ALL_PROVIDERS = Array.from({ length: 85 }, (_, i) => ({
  id: `provider-${i + 1}`,
  name:
    [
      'Acme Corp',
      'Globex Industries',
      'Initech',
      'Umbrella Corp',
      'Stark Industries',
      'Wayne Enterprises',
      'Oscorp',
      'LexCorp',
      'Cyberdyne Systems',
      'Soylent Corp',
      'Wonka Industries',
      'Tyrell Corp',
      'Weyland-Yutani',
      'Aperture Science',
      'Black Mesa',
      'Massive Dynamic',
      'Dharma Initiative',
      'Hooli',
      'Pied Piper',
      'Prestige Worldwide',
    ][i % 20] + ` ${Math.floor(i / 20) + 1}`,
  logo: i % 3 === 0 ? `https://i.pravatar.cc/40?u=company-${i}` : null,
}));

function simulateProviderFetch({
  query,
  page,
  limit = 15,
}: {
  query: string;
  page: number;
  limit?: number;
}): Promise<RemoteFetchResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = query
        ? ALL_PROVIDERS.filter((p) =>
            p.name.toLowerCase().includes(query.toLowerCase())
          )
        : ALL_PROVIDERS;

      const start = (page - 1) * limit;
      const pageItems = filtered.slice(start, start + limit);

      resolve({
        options: pageItems.map((p) => ({
          value: p.id,
          label: (
            <span className='flex items-center gap-2'>
              <Avatar.Root size='20' placeholderType='company'>
                {p.logo ? <Avatar.Image src={p.logo} alt={p.name} /> : null}
              </Avatar.Root>
              {p.name}
            </span>
          ),
        })),
        hasMore: start + limit < filtered.length,
      });
    }, 600);
  });
}

export const ComposedWithRemoteSearch = {
  render: function Render() {
    const [selected, setSelected] = useState<Record<string, string[]>>({
      providers: [],
    });

    const fetchProviders = useCallback(
      ({ query, page }: { query: string; page: number }) =>
        simulateProviderFetch({ query, page, limit: 15 }),
      []
    );

    return (
      <FilterDropdown.Composed
        filters={[
          {
            key: 'providers',
            label: 'Providers',
            icon: RiUserLine,
            searchable: true,
            searchPlaceholder: 'Search providers...',
            options: [],
            remote: {
              onFetch: fetchProviders,
              debounceMs: 300,
            },
          },
        ]}
        selected={selected}
        onSelectedChange={(key, values) =>
          setSelected((prev) => ({ ...prev, [key]: values }))
        }
        onApply={(sel) => alert(JSON.stringify(sel, null, 2))}
      >
        <Button.Root variant='neutral' mode='stroke'>
          <Button.Icon as={RiFilterLine} />
          Providers
          {selected.providers.length > 0 && (
            <span className='bg-primary-base text-primary-contrast flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-medium'>
              {selected.providers.length}
            </span>
          )}
        </Button.Root>
      </FilterDropdown.Composed>
    );
  },
};

// ─── Two-Level with Remote Category ───────────────────────

export const ComposedTwoLevelWithRemote = {
  render: function Render() {
    const [selected, setSelected] = useState<Record<string, string[]>>({
      types: [],
      providers: [],
    });

    const fetchProviders = useCallback(
      ({ query, page }: { query: string; page: number }) =>
        simulateProviderFetch({ query, page, limit: 15 }),
      []
    );

    return (
      <FilterDropdown.Composed
        filters={[
          {
            key: 'types',
            label: 'Types',
            icon: RiPuzzle2Line,
            searchable: true,
            searchPlaceholder: 'Search types...',
            options: TYPE_OPTIONS.map((o) => ({ value: o, label: o })),
          },
          {
            key: 'providers',
            label: 'Providers',
            icon: RiUserLine,
            searchable: true,
            searchPlaceholder: 'Search providers...',
            options: [],
            remote: {
              onFetch: fetchProviders,
              debounceMs: 300,
            },
          },
        ]}
        selected={selected}
        onSelectedChange={(key, values) =>
          setSelected((prev) => ({ ...prev, [key]: values }))
        }
        onApply={(sel) => alert(JSON.stringify(sel, null, 2))}
      >
        <Button.Root variant='neutral' mode='stroke'>
          <Button.Icon as={RiFilterLine} />
          Filters
        </Button.Root>
      </FilterDropdown.Composed>
    );
  },
};
