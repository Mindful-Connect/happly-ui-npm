'use client';

import * as React from 'react';

export function IconEmptyUser(props: React.SVGProps<SVGSVGElement>) {
  const clipPathId = React.useId();

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 80 80'
      aria-hidden='true'
      {...props}
    >
      <g fill='#fff' clipPath={`url(#${clipPathId})`}>
        <ellipse cx={40} cy={78} fillOpacity={0.72} rx={32} ry={24} />
        <circle cx={40} cy={32} r={16} opacity={0.9} />
      </g>
      <defs>
        <clipPath id={clipPathId}>
          <rect width={80} height={80} fill='#fff' />
        </clipPath>
      </defs>
    </svg>
  );
}

export function IconEmptyCompany(props: React.SVGProps<SVGSVGElement>) {
  const clipPathId = React.useId();
  const maskId1 = React.useId();
  const maskId2 = React.useId();

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={56}
      height={56}
      fill='none'
      viewBox='0 0 56 56'
      aria-hidden='true'
      {...props}
    >
      <defs>
        <clipPath id={clipPathId}>
          <rect width={56} height={56} fill='#fff' />
        </clipPath>
        {/* Back building mask: building white, windows + front building area black (holes) */}
        <mask id={maskId1}>
          <path
            fill='#fff'
            d='M7 24.9a2.8 2.8 0 012.8-2.8h21a2.8 2.8 0 012.8 2.8v49a2.8 2.8 0 01-2.8 2.8h-21A2.8 2.8 0 017 73.9v-49z'
          />
          <path
            fill='#000'
            d='M12.6 28.7a.7.7 0 01.7-.7h4.2a.7.7 0 01.7.7v4.2a.7.7 0 01-.7.7h-4.2a.7.7 0 01-.7-.7v-4.2zm0 9.8a.7.7 0 01.7-.7h4.2a.7.7 0 01.7.7v4.2a.7.7 0 01-.7.7h-4.2a.7.7 0 01-.7-.7v-4.2zm0 9.8a.7.7 0 01.7-.7h4.2a.7.7 0 01.7.7v4.2a.7.7 0 01-.7.7h-4.2a.7.7 0 01-.7-.7v-4.2z'
          />
          {/* Cut out front building area so it doesn't bleed through front windows */}
          <path
            fill='#000'
            d='M21 14a2.8 2.8 0 012.8-2.8h21a2.8 2.8 0 012.8 2.8v49a2.8 2.8 0 01-2.8 2.8h-21A2.8 2.8 0 0121 63V14z'
          />
        </mask>
        {/* Front building mask: building shape white (visible), windows black (holes) */}
        <mask id={maskId2}>
          <path
            fill='#fff'
            d='M21 14a2.8 2.8 0 012.8-2.8h21a2.8 2.8 0 012.8 2.8v49a2.8 2.8 0 01-2.8 2.8h-21A2.8 2.8 0 0121 63V14z'
          />
          <path
            fill='#000'
            d='M26.6 17.8a.7.7 0 01.7-.7h4.2a.7.7 0 01.7.7V22a.7.7 0 01-.7.7h-4.2a.7.7 0 01-.7-.7v-4.2zm0 9.8a.7.7 0 01.7-.7h4.2a.7.7 0 01.7.7v4.2a.7.7 0 01-.7.7h-4.2a.7.7 0 01-.7-.7v-4.2zm0 9.8a.7.7 0 01.7-.7h4.2a.7.7 0 01.7.7v4.2a.7.7 0 01-.7.7h-4.2a.7.7 0 01-.7-.7v-4.2zm0 9.8a.7.7 0 01.7-.7h4.2a.7.7 0 01.7.7v4.2a.7.7 0 01-.7.7h-4.2a.7.7 0 01-.7-.7v-4.2zm9.8-29.4a.7.7 0 01.7-.7h4.2a.7.7 0 01.7.7V22a.7.7 0 01-.7.7h-4.2a.7.7 0 01-.7-.7v-4.2zm0 9.8a.7.7 0 01.7-.7h4.2a.7.7 0 01.7.7v4.2a.7.7 0 01-.7.7h-4.2a.7.7 0 01-.7-.7v-4.2zm0 9.8a.7.7 0 01.7-.7h4.2a.7.7 0 01.7.7v4.2a.7.7 0 01-.7.7h-4.2a.7.7 0 01-.7-.7v-4.2zm0 9.8a.7.7 0 01.7-.7h4.2a.7.7 0 01.7.7v4.2a.7.7 0 01-.7.7h-4.2a.7.7 0 01-.7-.7v-4.2z'
          />
        </mask>
      </defs>
      <g clipPath={`url(#${clipPathId})`}>
        {/* Back building with window cutouts */}
        <rect
          mask={`url(#${maskId1})`}
          x={7}
          y={22.1}
          width={26.6}
          height={54.6}
          fill='#fff'
          fillOpacity={0.48}
        />
        {/* Front building with window cutouts */}
        <rect
          mask={`url(#${maskId2})`}
          x={21}
          y={11.2}
          width={26.6}
          height={54.6}
          fill='#fff'
          fillOpacity={0.8}
        />
      </g>
    </svg>
  );
}
