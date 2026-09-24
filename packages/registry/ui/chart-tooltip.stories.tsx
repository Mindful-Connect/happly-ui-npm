import * as ChartTooltip from './chart-tooltip';

export default { title: 'Charts/Chart Tooltip', component: ChartTooltip.Root };

export const WithUnit = {
  render: () => (
    <ChartTooltip.Root caption='10 - 19 Group'>
      <ChartTooltip.Value>168</ChartTooltip.Value>
      <ChartTooltip.Unit>Items</ChartTooltip.Unit>
    </ChartTooltip.Root>
  ),
};

export const WithoutUnit = {
  render: () => (
    <ChartTooltip.Root caption='Tue, Aug 12'>
      <ChartTooltip.Value>1,284</ChartTooltip.Value>
    </ChartTooltip.Root>
  ),
};

export const WithChange = {
  render: () => (
    <ChartTooltip.Root caption='Tue, Aug 12'>
      <ChartTooltip.Value>1,284</ChartTooltip.Value>
      <ChartTooltip.Delta value={4.2}>vs prev.</ChartTooltip.Delta>
    </ChartTooltip.Root>
  ),
};
