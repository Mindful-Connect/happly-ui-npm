import * as Button from './button';
import * as SegmentBar from './segment-bar';
import * as WidgetCard from './widget-card';

export default { title: 'Charts/Segment Bar', component: SegmentBar.Root };

const items = [
  { label: 'Category A', value: 13 },
  { label: 'Category B', value: 9 },
  { label: 'Category C', value: 7 },
  { label: 'Category D', value: 6 },
  { label: 'Category E', value: 5 },
];

export const Default = {
  render: () => (
    <WidgetCard.Root className='h-[280px] w-[352px]'>
      <WidgetCard.Header>
        <WidgetCard.Title>Card title</WidgetCard.Title>
        <Button.Root variant='neutral' mode='stroke' size='xxsmall'>
          Details
        </Button.Root>
      </WidgetCard.Header>
      <WidgetCard.Content>
        <SegmentBar.Root items={items} highlighted='Category A' />
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
        <SegmentBar.Root items={items} highlighted='Category B' legend='rows' />
      </WidgetCard.Content>
    </WidgetCard.Root>
  ),
};
