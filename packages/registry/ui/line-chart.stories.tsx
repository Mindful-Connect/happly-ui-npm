import * as LineChart from './line-chart';
import * as WidgetCard from './widget-card';

export default { title: 'Charts/Line Chart', component: LineChart.Root };

const values = [0, 0, 2, 6, 9, 10, 7, 3, 4, 6, 6, 6, 4, 3, 3, 3, 1, 0, 0, 0];
const points = values.map((value, i) => ({
  label: new Date(Date.UTC(2026, 7, 11 + i)).toLocaleDateString('en', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }),
  value,
}));

export const Default = {
  render: () => (
    <WidgetCard.Root className='h-[360px] w-[728px]'>
      <WidgetCard.Header>
        <WidgetCard.Title>Card title</WidgetCard.Title>
      </WidgetCard.Header>
      <WidgetCard.Content>
        <LineChart.Root
          points={points}
          total={{
            label: 'Total',
            value: 68,
            delta: 33.3,
            comparison: 'vs previous period',
          }}
          pointComparison='vs prev.'
        />
      </WidgetCard.Content>
    </WidgetCard.Root>
  ),
};

export const WithoutDelta = {
  render: () => (
    <WidgetCard.Root className='h-[360px] w-[728px]'>
      <WidgetCard.Header>
        <WidgetCard.Title>Card title</WidgetCard.Title>
      </WidgetCard.Header>
      <WidgetCard.Content>
        <LineChart.Root points={points} total={{ label: 'Total', value: 68 }} />
      </WidgetCard.Content>
    </WidgetCard.Root>
  ),
};
