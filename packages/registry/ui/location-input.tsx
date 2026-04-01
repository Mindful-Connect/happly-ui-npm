'use client';

import * as React from 'react';
import { RiMapPinLine } from '@remixicon/react';
import * as ScrollAreaPrimitives from '@radix-ui/react-scroll-area';
import { RemoveScroll } from 'react-remove-scroll';
import { useDebounce } from 'use-debounce';

import * as Input from './input';
import * as Popover from './popover';
import { useFormField } from '@/lib/happly-ui/form-field-context';
import { cn } from '@/lib/happly-ui/happly-ui-utils';
import { useFormFieldBinding } from '@/lib/happly-ui/use-form-field-binding';

// ─── Types ─────────────────────────────────────────────────

declare global {
  interface Window {
    google: typeof google;
  }
}

interface Suggestion {
  description: string;
  place_id: string;
}

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface PlaceResult {
  address_components?: AddressComponent[];
  geometry?: {
    location?: {
      lat: () => number;
      lng: () => number;
    };
  };
}

export type LocationRequest = {
  place_id: string;
  city?: string | null;
  region?: string | null;
  country: string;
  country_code: string;
  address: string;
  formatted_address: string;
  latitude: number;
  longitude: number;
} | null;

// ─── Helpers ───────────────────────────────────────────────

function normalizeAddress(address: string): string {
  return address.replaceAll('null,', '').trim();
}

function resolvePlace(
  placeId: string,
  callback: (location: NonNullable<LocationRequest>) => void
) {
  const placesService = new window.google.maps.places.PlacesService(
    document.createElement('div')
  );
  placesService.getDetails(
    {
      placeId,
      fields: ['geometry', 'address_components'],
    },
    (place: PlaceResult | null, status: string) => {
      if (status !== 'OK' || !place) return;

      const get = (
        type: string,
        field: 'long_name' | 'short_name' = 'long_name'
      ) =>
        place.address_components?.find((c) => c.types.includes(type))?.[
          field
        ] ?? '';

      const streetNumber = get('street_number');
      const route = get('route');
      const city = get('locality');
      const region = get('administrative_area_level_1', 'short_name');
      const country = get('country');
      const countryCode = get('country', 'short_name');
      const address = `${streetNumber} ${route}`.trim();

      const parts = [address, city, region, country].filter(Boolean);
      const formatted_address = normalizeAddress(parts.join(', '));

      callback({
        place_id: placeId,
        address,
        city: city || null,
        region: region || null,
        country,
        country_code: countryCode,
        formatted_address,
        latitude: place.geometry?.location?.lat() ?? 0,
        longitude: place.geometry?.location?.lng() ?? 0,
      });
    }
  );
}

const DEFAULT_COUNTRY_RESTRICTIONS = ['ca', 'us', 'fr'];

// ─── LocationInput ─────────────────────────────────────────

type LocationInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'size'
> & {
  /** Current location value (optional — auto-binds to RHF when inside FormField.Root) */
  location?: LocationRequest;
  /** Callback when a location is selected or cleared */
  onLocationChange?: (location: LocationRequest) => void;
  /** Leading icon component */
  icon?: React.ElementType;
  /** Input size */
  size?: 'medium' | 'small' | 'xsmall';
  /** Error state */
  hasError?: boolean;
  /** Country restrictions for autocomplete (ISO 3166-1 alpha-2 codes) */
  countryRestrictions?: string[];
};

const LocationInputRoot = React.forwardRef<
  HTMLInputElement,
  LocationInputProps
>(
  (
    {
      location: locationProp,
      onLocationChange: onLocationChangeProp,
      placeholder = 'Search address...',
      icon: Icon = RiMapPinLine,
      size,
      hasError,
      disabled,
      countryRestrictions,
      className,
      ...rest
    },
    forwardedRef
  ) => {
    const formField = useFormField();
    const resolvedHasError = hasError ?? formField.hasError;
    const resolvedDisabled = disabled ?? formField.disabled;

    // Auto-bind: stores full LocationRequest object in RHF
    const binding = useFormFieldBinding<LocationRequest>({
      parse: (stored: unknown) =>
        stored && typeof stored === 'object' ? (stored as LocationRequest) : null,
      format: (value: LocationRequest) => value ?? undefined,
    });

    // Priority: explicit props > RHF binding > null
    const location =
      locationProp !== undefined ? locationProp : (binding?.value ?? null);

    const onLocationChange =
      onLocationChangeProp ??
      (binding
        ? (loc: LocationRequest) => binding.onChange(loc)
        : undefined);

    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState(
      location?.formatted_address ?? ''
    );
    const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);
    const [anchorWidth, setAnchorWidth] = React.useState(0);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const searchActiveRef = React.useRef(false);
    const countryRestrictionsKey = (
      countryRestrictions ?? DEFAULT_COUNTRY_RESTRICTIONS
    ).join(',');

    // Sync search text when location prop changes externally (e.g. form reset)
    React.useEffect(() => {
      setSearch(location?.formatted_address ?? '');
    }, [location?.formatted_address]);

    const [debouncedSearch] = useDebounce(search, 500, {
      leading: false,
      trailing: true,
    });

    const selectingRef = React.useRef(false);

    function handleOpenChange(newOpen: boolean) {
      if (newOpen && anchorRef.current) {
        setAnchorWidth(anchorRef.current.offsetWidth);
      }
      setOpen(newOpen);
      if (!newOpen && !selectingRef.current) formField.onBlur?.();
      selectingRef.current = false;
    }

    const onLocationChangeRef = React.useRef(onLocationChange);
    onLocationChangeRef.current = onLocationChange;

    // Fetch suggestions on debounced search change
    React.useEffect(() => {
      if (!searchActiveRef.current) return;
      if (!window.google?.maps?.places) return;

      if (debouncedSearch.length < 3) {
        setSuggestions([]);
        if (debouncedSearch.length === 0) onLocationChangeRef.current?.(null);
        return;
      }

      const countries = countryRestrictionsKey.split(',');
      const autocompleteService =
        new window.google.maps.places.AutocompleteService();
      autocompleteService
        .getPlacePredictions({
          input: debouncedSearch,
          componentRestrictions: { country: countries },
          types: ['address'],
        })
        .then(({ predictions }) => {
          setSuggestions(predictions);
          if (predictions.length > 0) handleOpenChange(true);
        })
        .catch(() => {});
    }, [debouncedSearch, countryRestrictionsKey]);

    function handleSelect(suggestion: Suggestion) {
      resolvePlace(suggestion.place_id, (resolved) => {
        setSearch(suggestion.description);
        onLocationChange?.(resolved);
        selectingRef.current = true;
        setOpen(false);
        searchActiveRef.current = false;
      });
    }

    return (
      <Popover.Root open={open} onOpenChange={handleOpenChange}>
        <Popover.Anchor asChild>
          <div ref={anchorRef} className={className}>
            <Input.Root size={size} hasError={resolvedHasError}>
              <Input.Wrapper>
                <Input.Icon as={Icon} />
                <Input.Input
                  ref={forwardedRef}
                  role='combobox'
                  aria-expanded={open}
                  aria-haspopup='listbox'
                  value={search}
                  onChange={(e) => {
                    searchActiveRef.current = true;
                    setSearch(e.target.value);
                  }}
                  onFocus={() => {
                    if (!resolvedDisabled && suggestions.length > 0) {
                      handleOpenChange(true);
                    }
                  }}
                  onBlur={() => {
                    if (!open) formField.onBlur?.();
                  }}
                  placeholder={placeholder}
                  disabled={resolvedDisabled}
                  {...rest}
                />
              </Input.Wrapper>
            </Input.Root>
          </div>
        </Popover.Anchor>

        {suggestions.length > 0 && (
          <Popover.Content
            align='start'
            sideOffset={8}
            collisionPadding={8}
            showArrow={false}
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) => {
              if (anchorRef.current?.contains(e.target as Node)) {
                e.preventDefault();
              }
            }}
            style={{ width: anchorWidth || undefined }}
            className='overflow-hidden p-0'
          >
            <RemoveScroll allowPinchZoom>
              <ScrollAreaPrimitives.Root type='auto'>
                <ScrollAreaPrimitives.Viewport
                  style={{ overflowY: undefined }}
                  className='max-h-[196px] w-full scroll-py-2 overflow-auto p-2'
                  role='listbox'
                >
                  <div className='flex flex-col gap-1'>
                    {suggestions.map((suggestion) => (
                      <div
                        key={suggestion.place_id}
                        role='option'
                        aria-selected={
                          location?.place_id === suggestion.place_id
                        }
                        onClick={() => handleSelect(suggestion)}
                        className={cn(
                          'flex w-full cursor-pointer select-none items-center gap-2 rounded-10 p-2 text-left text-paragraph-sm text-text-strong-950',
                          'transition duration-200 ease-out',
                          'hover:bg-bg-weak-50'
                        )}
                        title={suggestion.description}
                      >
                        <span className='line-clamp-1'>
                          {suggestion.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </ScrollAreaPrimitives.Viewport>
                <ScrollAreaPrimitives.Scrollbar orientation='vertical'>
                  <ScrollAreaPrimitives.Thumb className='!w-1 rounded bg-bg-soft-200' />
                </ScrollAreaPrimitives.Scrollbar>
              </ScrollAreaPrimitives.Root>
            </RemoveScroll>
          </Popover.Content>
        )}
      </Popover.Root>
    );
  }
);
LocationInputRoot.displayName = 'LocationInputRoot';

export { LocationInputRoot as Root, type LocationInputProps };
