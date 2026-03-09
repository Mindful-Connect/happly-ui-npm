'use client';

import { useState } from 'react';
import { LocationInput, type LocationRequest } from './location-input';

export default { title: 'Needs Refactor/Location Input', component: LocationInput };

export const Playground = {
  args: {
    placeholder: 'Select a location...',
  },
  argTypes: {
    placeholder: { control: 'text' },
  },
  render: (args: any) => {
    const [location, setLocation] = useState<LocationRequest>(null);

    return (
      <div style={{ maxWidth: '672px', width: '100%' }}>
        <LocationInput
          location={location}
          setLocation={setLocation}
          placeholder={args.placeholder}
        />
      </div>
    );
  },
};

export const Default = {
  render: () => {
    const [location, setLocation] = useState<LocationRequest>(null);

    return (
      <div style={{ maxWidth: '672px', width: '100%' }}>
        <LocationInput location={location} setLocation={setLocation} />
      </div>
    );
  },
};
