'use client';

import { useState } from 'react';
import * as LocationInput from './location-input';
import type { LocationRequest } from './location-input';

export default {
  title: 'Form/Composed Inputs/Location Input',
  component: LocationInput.Root,
};

function PlaygroundRender(args: any) {
  const [location, setLocation] = useState<LocationRequest>(null);

  return (
    <div style={{ maxWidth: '672px', width: '100%' }}>
      <LocationInput.Root
        location={location}
        onLocationChange={setLocation}
        placeholder={args.placeholder}
        size={args.size}
        hasError={args.hasError}
        disabled={args.disabled}
      />
    </div>
  );
}

export const Playground = {
  args: {
    placeholder: 'Search address...',
    size: 'medium',
    hasError: false,
    disabled: false,
  },
  argTypes: {
    placeholder: { control: 'text' },
    size: {
      control: 'select',
      options: ['medium', 'small', 'xsmall'],
    },
    hasError: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  render: (args: any) => <PlaygroundRender {...args} />,
};

function DefaultRender() {
  const [location, setLocation] = useState<LocationRequest>(null);

  return (
    <div style={{ maxWidth: '672px', width: '100%' }}>
      <LocationInput.Root location={location} onLocationChange={setLocation} />
    </div>
  );
}

export const Default = {
  render: () => <DefaultRender />,
};

function WithErrorRender() {
  const [location, setLocation] = useState<LocationRequest>(null);

  return (
    <div style={{ maxWidth: '672px', width: '100%' }}>
      <LocationInput.Root
        location={location}
        onLocationChange={setLocation}
        hasError
      />
    </div>
  );
}

export const WithError = {
  render: () => <WithErrorRender />,
};

function MultiRender() {
  const [locations, setLocations] = useState<NonNullable<LocationRequest>[]>(
    []
  );

  return (
    <div style={{ maxWidth: '672px', width: '100%' }}>
      <LocationInput.Multi
        locations={locations}
        onLocationsChange={setLocations}
      />
    </div>
  );
}

export const Multi = {
  render: () => <MultiRender />,
};

function MultiWithMaxRender() {
  const [locations, setLocations] = useState<NonNullable<LocationRequest>[]>(
    []
  );

  return (
    <div style={{ maxWidth: '672px', width: '100%' }}>
      <LocationInput.Multi
        locations={locations}
        onLocationsChange={setLocations}
        maxLocations={3}
        addLabel='Add location (max 3)'
      />
    </div>
  );
}

export const MultiWithMax = {
  render: () => <MultiWithMaxRender />,
};
