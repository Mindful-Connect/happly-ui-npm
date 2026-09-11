import * as BarChart from './bar-chart';
import * as Button from './button';
import * as WidgetCard from './widget-card';

export default { title: 'Charts/Bar Chart', component: BarChart.Root };

const items = [
  { label: '0 - 9', value: 111 },
  { label: '10 - 19', value: 168 },
  { label: '20 - 29', value: 72 },
  { label: '30 - 39', value: 58 },
  { label: '40 - 49', value: 123 },
  { label: '50 - 59', value: 144 },
  { label: '60 - 69', value: 0 },
  { label: '70+', value: 121 },
];

export const Default = {
  render: () => (
    <WidgetCard.Root className='h-[288px] w-[728px]'>
      <WidgetCard.Header>
        <WidgetCard.Title>Card title</WidgetCard.Title>
        <Button.Root variant='neutral' mode='stroke' size='xxsmall'>
          Details
        </Button.Root>
      </WidgetCard.Header>
      <WidgetCard.Content>
        <BarChart.Root
          items={items}
          highlighted='10 - 19'
          dimension='Group'
          unit='Items'
        />
      </WidgetCard.Content>
    </WidgetCard.Root>
  ),
};

export const WithoutHighlight = {
  render: () => (
    <WidgetCard.Root className='h-[288px] w-[728px]'>
      <WidgetCard.Header>
        <WidgetCard.Title>Card title</WidgetCard.Title>
      </WidgetCard.Header>
      <WidgetCard.Content>
        <BarChart.Root items={items} dimension='Group' unit='Items' />
      </WidgetCard.Content>
    </WidgetCard.Root>
  ),
};
