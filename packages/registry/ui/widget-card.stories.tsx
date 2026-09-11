import * as Button from './button';
import * as WidgetCard from './widget-card';

export default { title: 'Charts/Widget Card', component: WidgetCard.Root };

const Placeholder = () => (
  <div className='bg-bg-weak-50 text-paragraph-xs text-text-soft-400 flex h-full items-center justify-center rounded-xl'>
    Content
  </div>
);

export const Default = {
  render: () => (
    <WidgetCard.Root className='h-[288px] w-[352px]'>
      <WidgetCard.Header>
        <WidgetCard.Title>Card title</WidgetCard.Title>
      </WidgetCard.Header>
      <WidgetCard.Content>
        <Placeholder />
      </WidgetCard.Content>
    </WidgetCard.Root>
  ),
};

export const WithDetails = {
  render: () => (
    <WidgetCard.Root className='h-[288px] w-[352px]'>
      <WidgetCard.Header>
        <WidgetCard.Title>Card title</WidgetCard.Title>
        <Button.Root variant='neutral' mode='stroke' size='xxsmall'>
          Details
        </Button.Root>
      </WidgetCard.Header>
      <WidgetCard.Content>
        <Placeholder />
      </WidgetCard.Content>
    </WidgetCard.Root>
  ),
};

export const CompactTitle = {
  render: () => (
    <WidgetCard.Root className='w-[352px] gap-1'>
      <WidgetCard.Header>
        <WidgetCard.Title className='text-paragraph-sm text-text-sub-600'>
          Metric title
        </WidgetCard.Title>
      </WidgetCard.Header>
      <WidgetCard.Content>
        <span className='text-title-h4 text-text-strong-950 tabular-nums'>
          1,234
        </span>
      </WidgetCard.Content>
    </WidgetCard.Root>
  ),
};
