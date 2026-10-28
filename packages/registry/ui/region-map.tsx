'use client';

import * as React from 'react';
import { RiAddLine, RiSubtractLine } from '@remixicon/react';
import type {
  GeoJSONSource,
  Map as MapLibreMap,
  MapLayerMouseEvent,
} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import * as ChartTooltip from '@/components/ui/chart-tooltip';
import * as CompactButton from '@/components/ui/compact-button';
import { WORLD_LAND } from '@/components/ui/region-map-land';
import { cn } from '@/lib/happly-ui-utils';

export type RegionMapPoint = {
  /** The tooltip caption: the city, country or region the point stands for. */
  label: string;
  value: number;
  lat: number;
  lng: number;
};

type RegionMapProps = React.HTMLAttributes<HTMLDivElement> & {
  /** One marker per point. They can change after mount; the view is kept. */
  points: RegionMapPoint[];
  /** What the values count, beside the value in the tooltip ("Items"). */
  unit?: string;
  /** Accessible name of the zoom-in button. */
  zoomInLabel?: string;
  /** Accessible name of the zoom-out button. */
  zoomOutLabel?: string;
  /**
   * The leading place, above the map: a caption over its figure, a tag with
   * its name, and a strip of its three biggest parts. Omit it for the bare map.
   */
  top?: {
    /** The caption over the figure: "Top country". */
    label: string;
    value: number;
    /** The place's name, in the tag beside the figure. */
    name: string;
    /** An image before the name, e.g. a flag. */
    image?: string;
    /** Its three biggest parts, left to right, each with its share in percent. */
    shares: { label: string; percent: number }[];
  };
};

// The design's dotted continents: dots of r=1.25 on a 4px grid.
const DOT_SPACING = 4;
const DOT_RADIUS = 1.25;

// Marker geometry, from the design's Dot component.
const MARKER_RADIUS = 9;
const MARKER_CORE_RADIUS = 4;
// The design's ring measures ~2.2px; drawn outside the radius, 2.5 reads thin.
const MARKER_STROKE_WIDTH = 2.5;
const MARKER_HALO_RADIUS = 17;

// GeoJSON as MapLibre takes it, named through its own API so the component
// does not depend on @types/geojson being installed.
type GeoJSONData = Parameters<GeoJSONSource['setData']>[0];

const SOURCE = 'regions';
const HIT_LAYER = 'regions-ring';

// The view the map opens on: every landmass at once, whatever the data.
// Latitudes stop short of the poles because the outline has no Antarctica and
// Mercator stretches the far north into mostly empty canvas.
const LAND_BOUNDS: [[number, number], [number, number]] = [
  [-180, -56],
  [180, 84],
];

/**
 * A theme colour as rgba. MapLibre paints on a canvas and parses neither CSS
 * variables nor oklch(), so the token is resolved against the page and read
 * back off a one-pixel canvas.
 */
function themeColor(element: HTMLElement, token: string) {
  const ctx = document.createElement('canvas').getContext('2d')!;
  ctx.fillStyle = getComputedStyle(element).getPropertyValue(token).trim();
  ctx.fillRect(0, 0, 1, 1);
  // Indexed rather than destructured: a typed array only destructures with
  // downlevelIteration, which an ES5-target project may not have.
  const { data } = ctx.getImageData(0, 0, 1, 1);
  return `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
}

// Web Mercator's latitude limit: the projection runs to infinity at the poles.
const MAX_LATITUDE = 85.051129;

let landPath: string | undefined;

/**
 * The land outline as SVG path data in Mercator world units, the whole world
 * being 1x1 with its origin at the north-west corner. Mercator is linear in
 * these units, so the path is built once and placed with a transform as the
 * map moves.
 */
function getLandPath() {
  if (landPath === undefined) {
    landPath = WORLD_LAND.geometry.coordinates
      .map((polygon) =>
        polygon
          .map((ring) => {
            const points = ring.map(([lng, lat]) => {
              const phi =
                (Math.max(-MAX_LATITUDE, Math.min(MAX_LATITUDE, lat)) *
                  Math.PI) /
                180;
              const x = (lng + 180) / 360;
              const y =
                (1 - Math.log(Math.tan(Math.PI / 4 + phi / 2)) / Math.PI) / 2;
              return `${x.toFixed(6)},${y.toFixed(6)}`;
            });
            return `M${points.join('L')}Z`;
          })
          .join('')
      )
      .join('');
  }
  return landPath;
}

function toFeatureCollection(points: RegionMapPoint[]): GeoJSONData {
  return {
    type: 'FeatureCollection',
    features: points.map((point, index) => ({
      type: 'Feature' as const,
      // Feature state, which drives the hover styling, is keyed by id, and
      // GeoJSON ids have to be numbers.
      id: index,
      geometry: { type: 'Point' as const, coordinates: [point.lng, point.lat] },
      properties: { index },
    })),
  };
}

/**
 * A dotted world map with a marker per point and its count on hover.
 *
 * Tile-less on purpose: the only geography is a bundled land outline filled
 * with a dot pattern, so there is no tile provider, no API key and no
 * per-load cost.
 */
function RegionMap({
  points,
  unit,
  zoomInLabel = 'Zoom in',
  zoomOutLabel = 'Zoom out',
  top,
  className,
  ...rest
}: RegionMapProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const landRef = React.useRef<SVGPathElement>(null);
  const dotsRef = React.useRef<SVGPatternElement>(null);
  const svgId = React.useId();
  const mapRef = React.useRef<MapLibreMap | null>(null);
  const hoveredRef = React.useRef<number | null>(null);
  const [tooltip, setTooltip] = React.useState<{
    point: RegionMapPoint;
    left: number;
    top: number;
  } | null>(null);

  // Points live in a ref so the map is built once: rebuilding it on every
  // change would tear the canvas down and lose the user's pan.
  const pointsRef = React.useRef(points);
  pointsRef.current = points;

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let map: MapLibreMap | undefined;
    let cancelled = false;
    let themeObserver: MutationObserver | undefined;
    let themeMedia: MediaQueryList | undefined;
    let syncTheme: (() => void) | undefined;

    // Loaded here rather than imported at the top: maplibre-gl touches
    // `window` as it loads, so a static import would break server rendering.
    import('maplibre-gl').then(({ Map }) => {
      if (cancelled) return;
      const color = (token: string) => themeColor(container, token);

      const instance = new Map({
        container,
        style: {
          version: 8,
          sources: {
            [SOURCE]: {
              type: 'geojson',
              data: toFeatureCollection(pointsRef.current),
            },
          },
          layers: [],
        },
        bounds: LAND_BOUNDS,
        fitBoundsOptions: { padding: 8 },
        // One world, no rotation, no scroll hijacking: the map sits in a
        // scrolling page and offers zoom buttons, not a gesture.
        renderWorldCopies: false,
        scrollZoom: false,
        dragRotate: false,
        pitchWithRotate: false,
        touchZoomRotate: false,
        maxPitch: 0,
        maxZoom: 8,
        attributionControl: false,
      });
      map = instance;
      mapRef.current = instance;
      // The SVG land is placed by translate and scale alone, so the map must
      // never turn or tilt: Shift+arrows would otherwise do both.
      instance.keyboard.disableRotation();

      const syncTooltip = () => {
        const index = hoveredRef.current;
        const point = index === null ? undefined : pointsRef.current[index];
        if (!point) {
          setTooltip(null);
          return;
        }
        const { x, y } = instance.project([point.lng, point.lat]);
        setTooltip({ point, left: x, top: y - MARKER_RADIUS });
      };

      const setHovered = (index: number | null) => {
        if (hoveredRef.current === index) return;
        if (hoveredRef.current !== null) {
          instance.setFeatureState(
            { source: SOURCE, id: hoveredRef.current },
            { hover: false }
          );
        }
        hoveredRef.current = index;
        if (index !== null) {
          instance.setFeatureState(
            { source: SOURCE, id: index },
            { hover: true }
          );
        }
        syncTooltip();
      };

      // The land is SVG under the transparent canvas, so its dots stay sharp
      // at any zoom and pixel density. The outline is scaled to the world's
      // current size; the dot grid is not, so it stays at DOT_SPACING, and it
      // is offset with the world so the dots travel with the land on a pan.
      const syncLand = () => {
        const origin = instance.project([-180, MAX_LATITUDE]);
        const size = instance.project([180, MAX_LATITUDE]).x - origin.x;
        landRef.current?.setAttribute(
          'transform',
          `translate(${origin.x} ${origin.y}) scale(${size})`
        );
        dotsRef.current?.setAttribute('x', String(origin.x));
        dotsRef.current?.setAttribute('y', String(origin.y));
      };
      landRef.current?.setAttribute('d', getLandPath());
      syncLand();

      instance.on('load', () => {
        const active = color('--color-chart-marker-active');

        instance.addLayer({
          id: 'regions-halo',
          type: 'circle',
          source: SOURCE,
          paint: {
            'circle-radius': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              MARKER_HALO_RADIUS,
              0,
            ],
            'circle-color': color('--color-chart-marker-halo'),
          },
        });
        instance.addLayer({
          id: HIT_LAYER,
          type: 'circle',
          source: SOURCE,
          paint: {
            'circle-radius': MARKER_RADIUS,
            'circle-color': color('--color-bg-white-0'),
            'circle-stroke-width': MARKER_STROKE_WIDTH,
            'circle-stroke-color': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              active,
              color('--color-stroke-soft-200'),
            ],
          },
        });
        instance.addLayer({
          id: 'regions-core',
          type: 'circle',
          source: SOURCE,
          paint: {
            'circle-radius': MARKER_CORE_RADIUS,
            'circle-color': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              active,
              color('--color-chart-marker'),
            ],
          },
        });

        // Canvas paint cannot follow CSS variables on its own. Refresh it
        // when a theme class, inline token or system preference changes,
        // without rebuilding the map or losing its view.
        syncTheme = () => {
          const currentActive = color('--color-chart-marker-active');
          instance.setPaintProperty(
            'regions-halo',
            'circle-color',
            color('--color-chart-marker-halo')
          );
          instance.setPaintProperty(
            HIT_LAYER,
            'circle-color',
            color('--color-bg-white-0')
          );
          instance.setPaintProperty(HIT_LAYER, 'circle-stroke-color', [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            currentActive,
            color('--color-stroke-soft-200'),
          ]);
          instance.setPaintProperty('regions-core', 'circle-color', [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            currentActive,
            color('--color-chart-marker'),
          ]);
        };

        themeObserver = new MutationObserver(() => syncTheme?.());
        for (
          let element: HTMLElement | null = container;
          element;
          element = element.parentElement
        ) {
          themeObserver.observe(element, {
            attributes: true,
            attributeFilter: ['class', 'style'],
          });
        }
        themeMedia = window.matchMedia('(prefers-color-scheme: dark)');
        themeMedia.addEventListener('change', syncTheme);
      });

      instance.on('mousemove', HIT_LAYER, (event: MapLayerMouseEvent) => {
        const index = event.features?.[0]?.properties?.index;
        instance.getCanvas().style.cursor = 'pointer';
        setHovered(typeof index === 'number' ? index : null);
      });
      instance.on('mouseleave', HIT_LAYER, () => {
        instance.getCanvas().style.cursor = '';
        setHovered(null);
      });
      // The tooltip is anchored to the marker, not the cursor, so it has to
      // follow the marker while the map moves under it.
      instance.on('move', syncTooltip);
      // Fires for a pan, every frame of a zoom, and a container resize.
      instance.on('move', syncLand);
    });

    return () => {
      cancelled = true;
      themeObserver?.disconnect();
      if (themeMedia && syncTheme)
        themeMedia.removeEventListener('change', syncTheme);
      map?.remove();
      mapRef.current = null;
    };
  }, []);

  React.useEffect(() => {
    const map = mapRef.current;
    const source = map?.getSource(SOURCE) as GeoJSONSource | undefined;
    if (hoveredRef.current !== null && source) {
      map?.setFeatureState(
        { source: SOURCE, id: hoveredRef.current },
        { hover: false }
      );
    }
    hoveredRef.current = null;
    setTooltip(null);
    if (map) map.getCanvas().style.cursor = '';
    source?.setData(toFeatureCollection(points));
  }, [points]);

  return (
    <div
      className={cn('flex h-full w-full flex-col gap-4', className)}
      {...rest}
    >
      {top ? (
        <>
          <div className='flex shrink-0 flex-col gap-1'>
            <p className='text-paragraph-sm text-text-sub-600'>{top.label}</p>
            <div className='flex items-center gap-2'>
              <span className='text-title-h5 text-text-strong-950 font-bold tabular-nums'>
                {top.value.toLocaleString()}
              </span>
              <span className='border-stroke-soft-200 bg-bg-white-0 flex shrink-0 items-center gap-1 overflow-clip rounded-md border py-1 ps-1 pe-2'>
                {top.image ? (
                  // The name beside it says what the image shows.
                  <img
                    src={top.image}
                    alt=''
                    className='outline-image-outline size-4 shrink-0 rounded-full outline-1 -outline-offset-1'
                  />
                ) : null}
                <span className='text-label-xs text-text-sub-600'>
                  {top.name}
                </span>
              </span>
            </div>
          </div>
          <ul className='border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs flex w-full shrink-0 items-center gap-[3px] overflow-clip rounded-lg border p-1.5'>
            {top.shares.map((share, i) => (
              <React.Fragment key={share.label}>
                {i > 0 ? (
                  <li
                    aria-hidden
                    className='text-label-xs text-text-disabled-300 shrink-0'
                  >
                    ∙
                  </li>
                ) : null}
                {/* flex-auto, not flex-1: the spare width is shared out, so
                    the three spread evenly without capping the longest name
                    at a third of the strip. */}
                <li
                  className='text-label-xs min-w-0 flex-auto truncate text-center'
                  title={`${share.label} ${share.percent}%`}
                >
                  <span className='text-text-soft-400'>{share.label}</span>
                  <span className='text-text-sub-600 tabular-nums'>
                    {' '}
                    {share.percent}%
                  </span>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </>
      ) : null}
      <div className='relative min-h-0 w-full flex-1 overflow-clip'>
        {/* The canvas only answers a pointer, so the same counts are listed
          for a screen reader. */}
        <svg
          aria-hidden
          className='pointer-events-none absolute inset-0 size-full'
        >
          <defs>
            <pattern
              ref={dotsRef}
              id={`${svgId}dots`}
              width={DOT_SPACING}
              height={DOT_SPACING}
              patternUnits='userSpaceOnUse'
            >
              <circle
                cx={DOT_SPACING / 2}
                cy={DOT_SPACING / 2}
                r={DOT_RADIUS}
                style={{ fill: 'var(--color-chart-map-land)' }}
              />
            </pattern>
            <clipPath id={`${svgId}land`}>
              <path ref={landRef} clipRule='evenodd' />
            </clipPath>
          </defs>
          <rect
            width='100%'
            height='100%'
            fill={`url(#${svgId}dots)`}
            clipPath={`url(#${svgId}land)`}
          />
        </svg>
        <div ref={containerRef} aria-hidden className='h-full w-full' />
        <ul className='sr-only'>
          {points.map((point) => (
            <li key={point.label}>
              {point.label}: {point.value.toLocaleString()}
              {unit ? ` ${unit}` : null}
            </li>
          ))}
        </ul>
        {tooltip ? (
          <ChartTooltip.Root
            caption={tooltip.point.label}
            className='absolute z-20 -translate-x-1/2 -translate-y-full'
            style={{ left: tooltip.left, top: tooltip.top }}
          >
            <ChartTooltip.Value>
              {tooltip.point.value.toLocaleString()}
            </ChartTooltip.Value>
            {unit ? <ChartTooltip.Unit>{unit}</ChartTooltip.Unit> : null}
          </ChartTooltip.Root>
        ) : null}
        {/* MapLibre skips its zoom animation under reduced motion itself. */}
        <div className='absolute start-0 bottom-0 flex flex-col gap-2'>
          <CompactButton.Root
            aria-label={zoomInLabel}
            onClick={() => mapRef.current?.zoomIn()}
          >
            <CompactButton.Icon as={RiAddLine} />
          </CompactButton.Root>
          <CompactButton.Root
            aria-label={zoomOutLabel}
            onClick={() => mapRef.current?.zoomOut()}
          >
            <CompactButton.Icon as={RiSubtractLine} />
          </CompactButton.Root>
        </div>
      </div>
    </div>
  );
}
RegionMap.displayName = 'RegionMap';

export { RegionMap as Root };
