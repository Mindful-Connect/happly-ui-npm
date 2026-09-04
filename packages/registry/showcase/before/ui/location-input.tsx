'use client';

import * as React from 'react';
import { RiAddLine, RiMapPinLine, RiSubtractLine } from '@remixicon/react';
import * as ScrollAreaPrimitives from '@radix-ui/react-scroll-area';
import { RemoveScroll } from 'react-remove-scroll';
import { useDebounce } from 'use-debounce';

import * as Input from './input';
import * as Popover from './popover';
import { useFormField } from '../lib/form-field-context';
import { cn } from '../lib/happly-ui-utils';
import { useFormFieldBinding } from '../lib/use-form-field-binding';

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
  /** Leading icon component. Pass `null` to omit the leading icon. */
  icon?: React.ElementType | null;
  /** Input size */
  size?: 'medium' | 'small' | 'xsmall';
  /** Error state */
  hasError?: boolean;
  /** Country restrictions for autocomplete (ISO 3166-1 alpha-2 codes) */
  countryRestrictions?: string[];
  /**
   * Google Places autocomplete prediction types. Defaults to `['address']`
   * for street-level results; pass `['(cities)']` for city-level autocomplete.
   */
  types?: string[];
  /** Place IDs to exclude from suggestions — used by `Multi` to prevent
   * the same address from being picked across multiple rows. */
  excludePlaceIds?: string[];
  /** Optional slot rendered inside the input wrapper after the input.
   * Used by `Multi` to inline a per-row remove button. */
  trailing?: React.ReactNode;
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
      types = ['address'],
      excludePlaceIds,
      className,
      trailing,
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
        stored && typeof stored === 'object'
          ? (stored as LocationRequest)
          : null,
      format: (value: LocationRequest) => value ?? undefined,
    });

    // Priority: explicit props > RHF binding > null
    const location =
      locationProp !== undefined ? locationProp : (binding?.value ?? null);

    const onLocationChange =
      onLocationChangeProp ??
      (binding ? (loc: LocationRequest) => binding.onChange(loc) : undefined);

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
    const excludePlaceIdsKey = (excludePlaceIds ?? []).join(',');
    const typesKey = types.join(',');

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
      const excluded = excludePlaceIdsKey ? excludePlaceIdsKey.split(',') : [];
      const autocompleteService =
        new window.google.maps.places.AutocompleteService();
      autocompleteService
        .getPlacePredictions({
          input: debouncedSearch,
          componentRestrictions: { country: countries },
          types: typesKey.split(','),
        })
        .then(({ predictions }) => {
          const filtered = excluded.length
            ? predictions.filter((p) => !excluded.includes(p.place_id))
            : predictions;
          setSuggestions(filtered);
          if (filtered.length > 0) handleOpenChange(true);
        })
        .catch(() => {});
    }, [debouncedSearch, countryRestrictionsKey, excludePlaceIdsKey, typesKey]);

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
                {Icon && <Input.Icon as={Icon} />}
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
                {trailing}
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
                          'rounded-10 text-paragraph-sm text-text-strong-950 flex w-full cursor-pointer items-center gap-2 p-2 text-left select-none',
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
                  <ScrollAreaPrimitives.Thumb className='bg-bg-soft-200 !w-1 rounded' />
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

// ─── LocationInputMulti ────────────────────────────────────

type LocationInputMultiProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange'
> & {
  /** Selected locations (optional — auto-binds to RHF when inside FormField.Root) */
  locations?: LocationRequest[];
  /** Callback when the list of selected locations changes */
  onLocationsChange?: (locations: NonNullable<LocationRequest>[]) => void;
  /** Input size variant */
  size?: 'medium' | 'small' | 'xsmall';
  /** Error state — applied to every row */
  hasError?: boolean;
  /** Disabled state — applied to every row and the add button */
  disabled?: boolean;
  /** Country restrictions for autocomplete (ISO 3166-1 alpha-2 codes) */
  countryRestrictions?: string[];
  /** Placeholder for each row's input */
  placeholder?: string;
  /** Maximum number of rows. When reached, the add button is disabled. */
  maxLocations?: number;
  /** Minimum visible rows. The remove button is hidden once at the floor. Defaults to 1. */
  minLocations?: number;
  /** Label for the add-row button. Defaults to "Add another location". */
  addLabel?: string;
};

type LocationInputMultiRow = {
  id: string;
  location: LocationRequest;
};

let multiRowIdCounter = 0;
function makeRowId() {
  multiRowIdCounter += 1;
  return `loc-row-${multiRowIdCounter}`;
}

function LocationInputMulti({
  locations: locationsProp,
  onLocationsChange,
  size,
  hasError,
  disabled,
  countryRestrictions,
  placeholder,
  maxLocations,
  minLocations = 1,
  addLabel = 'Add another location',
  className,
  ...rest
}: LocationInputMultiProps) {
  const formField = useFormField();
  const resolvedHasError = hasError ?? formField.hasError;
  const resolvedDisabled = disabled ?? formField.disabled;

  const binding = useFormFieldBinding<NonNullable<LocationRequest>[]>({
    parse: (stored: unknown) =>
      Array.isArray(stored) ? (stored as NonNullable<LocationRequest>[]) : [],
    format: (value) => value,
    defaultValue: [],
  });

  const externalValue =
    locationsProp !== undefined ? locationsProp : (binding?.value ?? []);
  const onChange = onLocationsChange ?? binding?.onChange;

  // Internal rows include drafts (rows being typed in that haven't selected a place yet).
  const [rows, setRows] = React.useState<LocationInputMultiRow[]>(() =>
    externalValue.length > 0
      ? externalValue.map((loc) => ({ id: makeRowId(), location: loc }))
      : Array.from({ length: minLocations }, () => ({
          id: makeRowId(),
          location: null,
        }))
  );

  // Reconcile when the external list changes (form reset, parent-driven update).
  // The lastEmitted ref guards against the loop from our own emitChange calls.
  const lastEmittedRef = React.useRef<NonNullable<LocationRequest>[]>([]);
  React.useEffect(() => {
    const sameAsLast =
      externalValue.length === lastEmittedRef.current.length &&
      externalValue.every(
        (v, i) => v?.place_id === lastEmittedRef.current[i]?.place_id
      );
    if (sameAsLast) return;
    setRows(
      externalValue.length > 0
        ? externalValue.map((loc) => ({ id: makeRowId(), location: loc }))
        : Array.from({ length: minLocations }, () => ({
            id: makeRowId(),
            location: null,
          }))
    );
  }, [externalValue, minLocations]);

  function emitChange(nextRows: LocationInputMultiRow[]) {
    const filtered = nextRows
      .map((r) => r.location)
      .filter(
        (l): l is NonNullable<LocationRequest> => l !== null && l !== undefined
      );
    lastEmittedRef.current = filtered;
    onChange?.(filtered);
  }

  function handleRowChange(id: string, location: LocationRequest) {
    setRows((prev) => {
      const next = prev.map((r) => (r.id === id ? { ...r, location } : r));
      emitChange(next);
      return next;
    });
  }

  function handleAdd() {
    if (resolvedDisabled) return;
    if (maxLocations && rows.length >= maxLocations) return;
    if (rows.some((r) => !r.location)) return;
    setRows((prev) => [...prev, { id: makeRowId(), location: null }]);
  }

  function handleRemove(id: string) {
    if (resolvedDisabled) return;
    setRows((prev) => {
      if (prev.length <= minLocations) return prev;
      const next = prev.filter((r) => r.id !== id);
      emitChange(next);
      return next;
    });
  }

  const allRowsFilled = rows.every((r) => r.location);
  const canAdd = allRowsFilled && (!maxLocations || rows.length < maxLocations);
  const canRemove = rows.length > minLocations;

  // Place IDs already chosen across all rows — used to filter suggestions
  // so the same address can't be picked twice.
  const selectedPlaceIds = rows
    .map((r) => r.location?.place_id)
    .filter((id): id is string => Boolean(id));

  return (
    <div className={cn('flex flex-col gap-2', className)} {...rest}>
      {rows.map((row) => (
        <LocationInputRoot
          key={row.id}
          icon={null}
          location={row.location}
          onLocationChange={(loc) => handleRowChange(row.id, loc)}
          size={size}
          hasError={resolvedHasError}
          disabled={resolvedDisabled}
          countryRestrictions={countryRestrictions}
          placeholder={placeholder}
          excludePlaceIds={selectedPlaceIds.filter(
            (id) => id !== row.location?.place_id
          )}
          trailing={
            canRemove ? (
              <button
                type='button'
                tabIndex={-1}
                onClick={() => handleRemove(row.id)}
                disabled={resolvedDisabled}
                aria-label='Remove location'
                className={cn(
                  'flex size-5 shrink-0 items-center justify-center',
                  'text-text-soft-400 transition duration-200 ease-out',
                  'hover:text-text-strong-950',
                  'disabled:text-text-disabled-300 disabled:pointer-events-none'
                )}
              >
                <RiSubtractLine className='size-5' />
              </button>
            ) : null
          }
        />
      ))}

      <button
        type='button'
        onClick={handleAdd}
        disabled={resolvedDisabled || !canAdd}
        className={cn(
          'rounded-8 flex w-fit items-center gap-0.5 py-1.5',
          'text-text-sub-600',
          'transition duration-200 ease-out',
          'hover:text-text-strong-950',
          'disabled:text-text-disabled-300 disabled:pointer-events-none'
        )}
      >
        <RiAddLine className='size-5' />
        <span className='text-label-sm px-1'>{addLabel}</span>
      </button>
    </div>
  );
}
LocationInputMulti.displayName = 'LocationInputMulti';

export {
  LocationInputRoot as Root,
  LocationInputMulti as Multi,
  type LocationInputProps,
  type LocationInputMultiProps,
};
