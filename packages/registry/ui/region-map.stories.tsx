import * as React from 'react';

import * as Button from './button';
import * as RegionMap from './region-map';
import * as WidgetCard from './widget-card';

export default { title: 'Charts/Region Map', component: RegionMap.Root };

const points = [
  { label: 'Location A', value: 120, lat: 43.65, lng: -79.38 },
  { label: 'Location B', value: 84, lat: 51.51, lng: -0.13 },
  { label: 'Location C', value: 46, lat: 19.43, lng: -99.13 },
  { label: 'Location D', value: 38, lat: -23.55, lng: -46.63 },
  { label: 'Location E', value: 27, lat: 28.61, lng: 77.21 },
  { label: 'Location F', value: 12, lat: -33.87, lng: 151.21 },
];

const updatedPoints = [
  { label: 'Location G', value: 72, lat: 43.65, lng: -79.38 },
  { label: 'Location H', value: 31, lat: 51.51, lng: -0.13 },
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
        <RegionMap.Root points={points} unit='Items' />
      </WidgetCard.Content>
    </WidgetCard.Root>
  ),
};

export const WithTopRegion = {
  render: () => (
    <WidgetCard.Root className='h-[448px] w-[352px]'>
      <WidgetCard.Header>
        <WidgetCard.Title>Card title</WidgetCard.Title>
      </WidgetCard.Header>
      <WidgetCard.Content>
        <RegionMap.Root
          points={points}
          unit='Items'
          top={{
            label: 'Top region',
            value: 120,
            name: 'Region A',
            image:
              'https://mindful-connect.github.io/circle-flags/flags/xx.svg',
            shares: [
              { label: 'Location A', percent: 50 },
              { label: 'Location B', percent: 30 },
              { label: 'Location C', percent: 20 },
            ],
          }}
        />
      </WidgetCard.Content>
    </WidgetCard.Root>
  ),
};

function UpdatesStory() {
  const [updated, setUpdated] = React.useState(false);
  const [dark, setDark] = React.useState(false);

  return (
    <div className={dark ? 'dark' : undefined}>
      <div className='mb-3 flex gap-2'>
        <Button.Root
          variant='neutral'
          mode='stroke'
          size='xsmall'
          onClick={() => setUpdated((value) => !value)}
        >
          Change points
        </Button.Root>
        <Button.Root
          variant='neutral'
          mode='stroke'
          size='xsmall'
          onClick={() => setDark((value) => !value)}
        >
          Toggle dark
        </Button.Root>
      </div>
      <WidgetCard.Root className='h-[288px] w-[352px]'>
        <WidgetCard.Header>
          <WidgetCard.Title>Changing map</WidgetCard.Title>
        </WidgetCard.Header>
        <WidgetCard.Content>
          <RegionMap.Root
            points={updated ? updatedPoints : points}
            unit='Items'
          />
        </WidgetCard.Content>
      </WidgetCard.Root>
    </div>
  );
}

export const Updates = { render: () => <UpdatesStory /> };
