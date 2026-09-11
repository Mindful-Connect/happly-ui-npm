import * as Button from './button';
import * as DonutChart from './donut-chart';
import * as WidgetCard from './widget-card';

export default { title: 'Charts/Donut Chart', component: DonutChart.Root };

const Card = ({ height, children }: { height: string; children: React.ReactNode }) => (
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
        highlighted='Category A'
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
