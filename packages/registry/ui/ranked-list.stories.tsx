import * as Button from './button';
import * as RankedList from './ranked-list';
import * as WidgetCard from './widget-card';

export default { title: 'Charts/Ranked List', component: RankedList.Root };

const items = [
  { label: 'Category A', value: 3264 },
  { label: 'Category B', value: 2731 },
  { label: 'Category C', value: 1950 },
  { label: 'Category D', value: 1740 },
];

export const Default = {
  render: () => (
    <WidgetCard.Root className='h-[288px] w-[352px]'>
      <WidgetCard.Header>
        <WidgetCard.Title>Card title</WidgetCard.Title>
        <Button.Root variant='neutral' mode='stroke' size='xxsmall'>
          Details
        </Button.Root>
      </WidgetCard.Header>
      <WidgetCard.Content>
        <RankedList.Root items={items} columnLabels={['Category', 'Count']} />
      </WidgetCard.Content>
    </WidgetCard.Root>
  ),
};

export const ManyRows = {
  render: () => (
    <WidgetCard.Root className='h-[288px] w-[352px]'>
      <WidgetCard.Header>
        <WidgetCard.Title>Card title</WidgetCard.Title>
      </WidgetCard.Header>
      <WidgetCard.Content>
        <RankedList.Root
          items={[
            ...items,
            { label: 'Category E with a much longer name than the rest', value: 912 },
            { label: 'Category F', value: 640 },
            { label: 'Category G', value: 215 },
            { label: 'Category H', value: 88 },
          ]}
          columnLabels={['Category', 'Count']}
        />
      </WidgetCard.Content>
    </WidgetCard.Root>
  ),
};
