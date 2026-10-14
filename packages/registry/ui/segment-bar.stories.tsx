import * as SegmentBar from './segment-bar';
import * as WidgetCard from './widget-card';

export default { title: 'Charts/Segment Bar', component: SegmentBar.Root };

const items = [
  { label: 'Category A', value: 1300 },
  { label: 'Category B', value: 900 },
  { label: 'Category C', value: 700 },
  { label: 'Category D', value: 12 },
  { label: 'Category E', value: 0 },
];

export const Default = {
  render: () => (
    <WidgetCard.Root className='h-[280px] w-[352px]'>
      <WidgetCard.Header>
        <WidgetCard.Title>Card title</WidgetCard.Title>
      </WidgetCard.Header>
      <WidgetCard.Content>
        <SegmentBar.Root items={items} />
      </WidgetCard.Content>
    </WidgetCard.Root>
  ),
};

export const RowsLegend = {
  render: () => (
    <WidgetCard.Root className='h-[360px] w-[352px]'>
      <WidgetCard.Header>
        <WidgetCard.Title>Card title</WidgetCard.Title>
      </WidgetCard.Header>
      <WidgetCard.Content>
        <SegmentBar.Root items={items} legend='rows' />
      </WidgetCard.Content>
    </WidgetCard.Root>
  ),
};
