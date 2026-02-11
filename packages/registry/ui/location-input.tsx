import {
  Fragment,
  ReactElement,
  SVGProps,
  useEffect,
  useState,
} from 'react';
import { useDebounce } from 'use-debounce';

import { cn } from '@/lib/utils';
import { importLibrary, setOptions } from '@googlemaps/js-api-loader';
import { Combobox, Transition } from '@headlessui/react';

export interface Suggestion {
  description: string;
  place_id: string;
}

export type LocationRequest = {
  place_id: string;
  city?: string | null;
  region?: string | null;
  country: string;
  address: string;
  formatted_address: string;
  latitude: number;
  longitude: number;
} | null;

function normalizeAddress(address: string): string {
  return address.replaceAll('null,', '').trim();
}

export function LocationInput({
  location,
  setLocation,
  placeholder = 'Select a location...',
  icon,
}: {
  location: LocationRequest;
  setLocation: (location: LocationRequest) => void;
  placeholder?: string;
  icon?: ReactElement<SVGProps<SVGSVGElement>>;
}) {
  const [locationSearchActive, setLocationSearchActive] = useState(false);
  const [locationSearch, setLocationSearch] = useState(
    location?.formatted_address ?? ''
  );
  const [locationSuggestions, setLocationSuggestions] = useState<Suggestion[]>(
    []
  );
  const [debouncedLocationSearch] = useDebounce(locationSearch, 500, {
    leading: false,
    trailing: true,
  });
  const [isFocused, setIsFocused] = useState(false);

  // load google maps script with places library
  useEffect(() => {
    setOptions({
      key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
      libraries: ['places'],
    });
    importLibrary('places').then(() => {});
  }, []);

  useEffect(() => {
    (async () => {
      if (locationSearch.length < 3) setLocationSuggestions([]);
      if (locationSearch.length === 0) setLocation(null);
      else {
        if (!locationSearchActive) return;
        const autocompleteService =
          new window.google.maps.places.AutocompleteService();
        const { predictions } = await autocompleteService.getPlacePredictions({
          input: locationSearch,
          componentRestrictions: { country: ['ca', 'us', 'fr'] },
          types: ['address'],
          // types: ['(regions)'],
        });
        setLocationSuggestions(predictions);
      }
    })();
  }, [debouncedLocationSearch]);

  return (
    <Combobox
      nullable
      value={locationSearch}
      onChange={async (value) => {
        if (!value) return setLocation(null);

        const selectedPlace = locationSuggestions.find(
          (suggestion) => suggestion.place_id === value
        );
        if (!selectedPlace) return;
        const location = {
          place_id: selectedPlace.place_id,
          address: '',
          city: '',
          region: '',
          country: '',
          formatted_address: '',
          latitude: 0,
          longitude: 0,
        };
        const placesService = new window.google.maps.places.PlacesService(
          document.createElement('div')
        );
        placesService.getDetails(
          {
            placeId: selectedPlace.place_id,
            fields: ['geometry', 'address_components'],
          },
          (place, status) => {
            if (status !== 'OK' || !place) return;
            location.address =
              (place.address_components?.find((c) =>
                c.types.includes('street_number')
              )?.long_name ?? '') +
              ' ' +
              (place.address_components?.find((c) => c.types.includes('route'))
                ?.long_name ?? '');
            location.city =
              place.address_components?.find((c) =>
                c.types.includes('locality')
              )?.long_name ?? '';
            location.region =
              place.address_components?.find((c) =>
                c.types.includes('administrative_area_level_1')
              )?.short_name ?? '';
            location.latitude = place.geometry?.location?.lat() ?? 0;
            location.longitude = place.geometry?.location?.lng() ?? 0;
            location.country =
              place.address_components?.find((c) => c.types.includes('country'))
                ?.long_name ?? '';
            location.formatted_address = normalizeAddress(
              `${location.address ? location.address + ',' : ''} ${
                location.city ? location.city + ',' : ''
              } ${location.region ? location.region + ',' : ''} ${
                location.country ? location.country : ''
              }`
            );

            setLocationSearch(
              locationSuggestions.find(
                (suggestion) => suggestion.place_id === value
              )?.description ?? ''
            );

            setLocation(location);
          }
        );
      }}
    >
      {({ open }) => {
        return (
          <div className='relative w-full'>
            <div
              className={cn(
                'flex h-10 items-center rounded-[10px] border bg-white py-2 pl-2.5 pr-2 shadow-[0px_1px_2px_0px_rgba(10,13,20,0.03)]',
                'hover:[&:not(:focus-within)]:border-ds-neutral-200 hover:[&:not(:focus-within)]:bg-ds-weak-50',
                'focus-within:shadow-button-important-focus focus-within:before:ring-ds-stroke-strong-950',
                isFocused ? 'border-ds-neutral-950' : 'border-ds-neutral-200'
              )}
            >
              {icon && (
                <span
                  className={cn(
                    '',
                    !!location ? 'text-ds-neutral-600' : 'text-ds-neutral-400'
                  )}
                >
                  {icon}
                </span>
              )}
              <Combobox.Input
                value={locationSearch}
                className='w-full border-none bg-transparent pl-1.5 text-sm text-ds-neutral-950 placeholder:text-ds-neutral-600 focus:outline-none focus:ring-0'
                onFocus={() => {
                  setLocationSearchActive(true);
                  setIsFocused(true);
                }}
                onBlur={() => {
                  setLocationSearchActive(false);
                  setIsFocused(false);
                }}
                onChange={(event) => {
                  setLocationSearch(event.target.value);
                }}
                placeholder={placeholder}
              />
            </div>

            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div>
                {locationSuggestions.length > 0 && (
                  <Combobox.Options className='absolute z-10 mt-2.5 max-h-60 w-full overflow-auto rounded-2xl border border-ds-neutral-200 bg-white p-2 text-sm shadow-lg ring-0 focus:outline-none'>
                    {locationSuggestions.map((suggestion, suggestionIndex) => (
                      <Combobox.Option
                        key={suggestionIndex}
                        value={suggestion.place_id}
                      >
                        {({ active, selected }) => (
                          <div
                            className='cursor-default select-none rounded-[10px] px-3 py-2 hover:bg-ds-neutral-50'
                            title={suggestion.description}
                          >
                            <span
                              className={cn(
                                'block truncate',
                                selected && 'font-medium'
                              )}
                            >
                              {suggestion.description}
                            </span>
                          </div>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}
              </div>
            </Transition>
          </div>
        );
      }}
    </Combobox>
  );
}
