'use client';

import { useState } from 'react';
import { LocationInput, type LocationRequest } from './location-input';

export default { title: 'Form/Composed Inputs/Location Input', component: LocationInput };

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
