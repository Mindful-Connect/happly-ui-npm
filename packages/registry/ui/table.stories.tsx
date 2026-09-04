'use client';

import * as React from 'react';
import {
  RiArrowDownSFill,
  RiArrowUpSFill,
  RiExpandUpDownFill,
  RiMore2Line,
} from '@remixicon/react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type Column,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';

import * as Avatar from './avatar';
import * as Button from './button';
import * as Table from './table';

const data: Data[] = [
  {
    id: '326860c3',
    member: {
      name: 'James Brown',
      email: 'james@example.com',
      image: 'https://i.pravatar.cc/160?img=1',
    },
    title: {
      name: 'Marketing Manager',
      date: 'Since Aug, 2021',
    },
    status: 'Active',
  },
  {
    id: '8a2c57d0',
    member: {
      name: 'Sophia Williams',
      email: 'sophia@example.com',
      image: 'https://i.pravatar.cc/160?img=5',
    },
    title: {
      name: 'HR Assistant',
      date: 'Since Aug, 2021',
    },
    status: 'Active',
  },
  {
    id: '1a6256ab',
    member: {
      name: 'Arthur Taylor',
      email: 'arthur@example.com',
      image: 'https://i.pravatar.cc/160?img=3',
    },
    title: {
      name: 'Entrepreneur / CEO',
      date: 'Since May, 2022',
    },
    status: 'Absent',
  },
  {
    id: '9f92efe3',
    member: {
      name: 'Emma Wright',
      email: 'emma@example.com',
      image: 'https://i.pravatar.cc/160?img=9',
    },
    title: {
      name: 'Front-end Developer',
      date: 'Since Sep, 2022',
    },
    status: 'Active',
  },
  {
    id: 'a5b7b936',
    member: {
      name: 'Matthew Johnson',
      email: 'matthew@example.com',
      image: 'https://i.pravatar.cc/160?img=7',
    },
    title: {
      name: 'Data Software Engineer',
      date: 'Since Feb, 2022',
    },
    status: 'Active',
  },
  {
    id: '0153ab9a',
    member: {
      name: 'Laura Perez',
      email: 'laura@example.com',
      image: 'https://i.pravatar.cc/160?img=12',
    },
    title: {
      name: 'Fashion Designer',
      date: 'Since Mar, 2022',
    },
    status: 'Absent',
  },
  {
    id: 'e18b8b38',
    member: {
      name: 'Wei Chen',
      email: 'wei@example.com',
      image: 'https://i.pravatar.cc/160?img=15',
    },
    title: {
      name: 'Operations Manager',
      date: 'Since July, 2021',
    },
    status: 'Active',
  },
];

type Data = {
  id: string;
  member: {
    name: string;
    email: string;
    image: string;
  };
  title: {
    name: string;
    date: string;
  };
  status: string;
};

const getSortingIcon = (state: 'asc' | 'desc' | false) => {
  if (state === 'asc')
    return (
      <RiArrowUpSFill
        aria-hidden='true'
        className='text-text-sub-600 h-5 w-5'
      />
    );
  if (state === 'desc')
    return (
      <RiArrowDownSFill
        aria-hidden='true'
        className='text-text-sub-600 h-5 w-5'
      />
    );
  return (
    <RiExpandUpDownFill
      aria-hidden='true'
      className='text-text-sub-600 h-5 w-5'
    />
  );
};

// A named 24×24 target — the glyph alone is 20px and would announce nothing.
function SortButton({
  column,
  label,
}: {
  column: Column<Data, unknown>;
  label: string;
}) {
  return (
    <button
      type='button'
      aria-label={`Sort by ${label}`}
      className='focus-visible:shadow-button-important-focus -my-0.5 flex size-6 cursor-pointer items-center justify-center rounded outline-none'
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {getSortingIcon(column.getIsSorted())}
    </button>
  );
}

const columns: ColumnDef<Data>[] = [
  {
    id: 'member',
    accessorKey: 'member.name',
    header: ({ column }) => (
      <div className='flex items-center gap-0.5'>
        Member name
        <SortButton column={column} label='member name' />
      </div>
    ),
    enableSorting: true,
    cell: ({ row }) => (
      <div className='flex items-center gap-3'>
        <Avatar.Root size='40'>
          <Avatar.Image src={row.original.member.image} alt='' />
        </Avatar.Root>
        <div className='flex flex-col gap-0.5'>
          <span className='text-label-sm text-text-strong-950'>
            {row.original.member.name}
          </span>
          <span className='text-paragraph-xs text-text-sub-600'>
            {row.original.member.email}
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'title',
    accessorKey: 'title.name',
    header: ({ column }) => (
      <div className='flex min-w-36 items-center gap-0.5'>
        Title
        <SortButton column={column} label='title' />
      </div>
    ),
    cell: ({ row }) => (
      <div className='flex flex-col gap-0.5'>
        <span className='text-label-sm text-text-strong-950'>
          {row.original.title.name}
        </span>
        <span className='text-paragraph-xs text-text-sub-600'>
          {row.original.title.date}
        </span>
      </div>
    ),
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => (
      <div className='flex items-center gap-0.5'>
        Status
        <SortButton column={column} label='status' />
      </div>
    ),
    cell: ({ row }) => (
      <span className='text-paragraph-sm text-text-sub-600'>
        {row.original.status}
      </span>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: () => (
      <Button.Root
        variant='neutral'
        mode='ghost'
        size='xsmall'
        aria-label='Open row actions'
      >
        <Button.Icon as={RiMore2Line} />
      </Button.Root>
    ),
  },
];

function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    initialState: {
      sorting: [
        {
          id: 'member',
          desc: true,
        },
      ],
    },
  });

  return (
    <div className='w-full max-w-[1104px]'>
      <Table.Root>
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Table.Head
                    key={header.id}
                    aria-sort={
                      header.column.getCanSort()
                        ? header.column.getIsSorted() === 'asc'
                          ? 'ascending'
                          : header.column.getIsSorted() === 'desc'
                            ? 'descending'
                            : 'none'
                        : undefined
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Table.Head>
                );
              })}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {table.getRowModel().rows?.length > 0 &&
            table.getRowModel().rows.map((row, i, arr) => (
              <React.Fragment key={row.id}>
                <Table.Row data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
                {i < arr.length - 1 && <Table.RowDivider />}
              </React.Fragment>
            ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

export default { title: 'Displaying Data/Table', component: Table.Root };

export const Default = {
  render: () => <DataTableDemo />,
};

// ─── Numeric columns ────────────────────────────────────────────────────────
// Digits that align down a column need a fixed width and a trailing edge, so
// `numeric` sets `text-end tabular-nums` on both the header and its cells.

const invoices = [
  { id: 'INV-1042', plan: 'Team', seats: 12, amount: '$1,188.00' },
  { id: 'INV-1041', plan: 'Starter', seats: 3, amount: '$99.00' },
  { id: 'INV-1040', plan: 'Enterprise', seats: 148, amount: '$17,760.00' },
];

export const NumericColumns = {
  render: () => (
    <div className='w-full max-w-[720px]'>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Invoice</Table.Head>
            <Table.Head>Plan</Table.Head>
            <Table.Head numeric>Seats</Table.Head>
            <Table.Head numeric>Amount</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {invoices.map((invoice) => (
            <Table.Row key={invoice.id}>
              <Table.Cell className='text-label-sm text-text-strong-950'>
                {invoice.id}
              </Table.Cell>
              <Table.Cell className='text-paragraph-sm text-text-sub-600'>
                {invoice.plan}
              </Table.Cell>
              <Table.Cell
                numeric
                className='text-paragraph-sm text-text-sub-600'
              >
                {invoice.seats}
              </Table.Cell>
              <Table.Cell
                numeric
                className='text-label-sm text-text-strong-950'
              >
                {invoice.amount}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  ),
};

// ─── Empty ──────────────────────────────────────────────────────────────────

export const EmptyState = {
  render: () => (
    <div className='w-full max-w-[720px]'>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Invoice</Table.Head>
            <Table.Head>Plan</Table.Head>
            <Table.Head numeric>Amount</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell colSpan={3} className='h-32 text-center'>
              <p className='text-label-sm text-text-strong-950 text-balance'>
                No invoices yet
              </p>
              <p className='text-paragraph-sm text-text-sub-600 mt-1 text-pretty'>
                Invoices appear here once a subscription renews.
              </p>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </div>
  ),
};
