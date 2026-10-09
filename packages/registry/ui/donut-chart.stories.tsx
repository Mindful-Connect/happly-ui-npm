import * as React from 'react';

import * as Button from './button';
import * as DonutChart from './donut-chart';
import * as WidgetCard from './widget-card';

export default { title: 'Charts/Donut Chart', component: DonutChart.Root };

const Card = ({
  height,
  children,
}: {
  height: string;
  children: React.ReactNode;
}) => (
  <WidgetCard.Root className={`${height} w-[352px]`}>
    <WidgetCard.Header>
      <WidgetCard.Title>Card title</WidgetCard.Title>
      <Button.Root variant='neutral' mode='stroke' size='xxsmall'>
        Details
      </Button.Root>
    </WidgetCard.Header>
    <WidgetCard.Content>{children}</WidgetCard.Content>
  </WidgetCard.Root>
);

export const Default = {
  render: () => (
    <Card height='h-[280px]'>
      <DonutChart.Root
        items={[
          { label: 'Category A', value: 29 },
          { label: 'Category B', value: 21 },
        ]}
      />
    </Card>
  ),
};

export const SmallSegment = {
  render: () => (
    <Card height='h-[280px]'>
      <DonutChart.Root
        items={[
          { label: 'Category A', value: 120 },
          { label: 'Category B', value: 64 },
          { label: 'Category C', value: 1 },
        ]}
        unit='Items'
      />
    </Card>
  ),
};

export const WithTotal = {
  render: () => (
    <Card height='h-[360px]'>
      <DonutChart.Root
        items={[
          { label: 'Category A', value: 10 },
          { label: 'Category B', value: 55 },
        ]}
        highlighted='Category B'
        total={{ label: 'Total', value: 65 }}
        unit='Items'
      />
    </Card>
  ),
};

export const WithShortLabels = {
  render: () => (
    <Card height='h-[280px]'>
      <DonutChart.Root
        items={[
          { label: 'Category Alpha (CA)', shortLabel: 'CA', value: 18 },
          { label: 'Category Beta (CB)', shortLabel: 'CB', value: 24 },
          { label: 'Category Gamma (CG)', shortLabel: 'CG', value: 8 },
        ]}
        highlighted='Category Beta (CB)'
      />
    </Card>
  ),
};

export const SinglePositiveCategory = {
  render: () => (
    <Card height='h-[280px]'>
      <DonutChart.Root
        items={[
          { label: 'Category Alpha', shortLabel: 'Alpha', value: 29 },
          { label: 'Category Beta', value: 0 },
        ]}
        highlighted='Category Beta'
        unit='Items'
      />
    </Card>
  ),
};

export const AllZero = {
  render: () => (
    <Card height='h-[280px]'>
      <DonutChart.Root
        items={[
          { label: 'Category A', value: 0 },
          { label: 'Category B', value: 0 },
        ]}
        unit='Items'
      />
    </Card>
  ),
};

function CategoryTransitionExample() {
  const [single, setSingle] = React.useState(false);
  return (
    <div className='flex w-[352px] flex-col gap-4'>
      <div className='grid grid-cols-2 gap-2'>
        <Button.Root onClick={() => setSingle(true)}>One category</Button.Root>
        <Button.Root onClick={() => setSingle(false)}>
          Two categories
        </Button.Root>
      </div>
      <Card height='h-[280px]'>
        <DonutChart.Root
          items={[
            { label: 'Category A', value: 7 },
            { label: 'Category B', value: single ? 0 : 3 },
          ]}
          highlighted='Category A'
          unit='Items'
        />
      </Card>
    </div>
  );
}

export const CategoryTransition = {
  render: () => <CategoryTransitionExample />,
};
