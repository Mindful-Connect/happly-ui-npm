import * as React from 'react';

import { cn } from '../lib/happly-ui-utils';

type AiOrbProps = Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height'> & {
  /** Size in pixels. Defaults to 40. */
  size?: number;
  /** Enable aurora drift and shimmer animations. Defaults to true. */
  animated?: boolean;
};

const AiOrbRoot = React.forwardRef<SVGSVGElement, AiOrbProps>(
  ({ className, size = 40, style, animated = true, ...rest }, forwardedRef) => {
    const uid = React.useId().replace(/:/g, '');

    return (
      <svg
        ref={forwardedRef}
        width={size}
        height={size}
        viewBox='0 0 112 112'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        style={{ isolation: 'isolate', ...style }}
        colorInterpolation='sRGB'
        className={cn('shrink-0', className)}
        {...rest}
      >
        {animated && (
          <style>{`
            @keyframes ${uid}-drift-a {
              0%, 100% { transform: rotate(-30deg); }
              50% { transform: rotate(30deg); }
            }
            @keyframes ${uid}-drift-b {
              0%, 100% { transform: rotate(25deg); }
              50% { transform: rotate(-25deg); }
            }
            @keyframes ${uid}-shimmer {
              0%, 100% { transform: translateX(-80px) rotate(25deg); }
              50% { transform: translateX(80px) rotate(25deg); }
            }
            .${uid}-drift-a {
              transform-origin: 56px 56px;
              animation: ${uid}-drift-a 10s ease-in-out infinite;
            }
            .${uid}-drift-b {
              transform-origin: 56px 56px;
              animation: ${uid}-drift-b 14s ease-in-out infinite;
            }
            .${uid}-shimmer {
              animation: ${uid}-shimmer 6s ease-in-out infinite;
            }
          `}</style>
        )}
        <defs>
          <clipPath id={`${uid}-clip`}>
            <circle cx='56' cy='56' r='56' />
          </clipPath>

          {/* ── Rainbow layer 1 blur filters ── */}
          <filter
            id={`${uid}-rb1-f0`}
            x='70'
            y='0'
            width='193.101'
            height='193.101'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='bg' />
            <feBlend mode='normal' in='SourceGraphic' in2='bg' result='shape' />
            <feGaussianBlur stdDeviation='30.3333' />
          </filter>
          <filter
            id={`${uid}-rb1-f1`}
            x='49'
            y='60.6667'
            width='193.101'
            height='193.101'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='bg' />
            <feBlend mode='normal' in='SourceGraphic' in2='bg' result='shape' />
            <feGaussianBlur stdDeviation='30.3333' />
          </filter>
          <filter
            id={`${uid}-rb1-f2`}
            x='0'
            y='49'
            width='193.101'
            height='193.101'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='bg' />
            <feBlend mode='normal' in='SourceGraphic' in2='bg' result='shape' />
            <feGaussianBlur stdDeviation='30.3333' />
          </filter>
          <filter
            id={`${uid}-rb1-f3`}
            x='14'
            y='9.33333'
            width='193.101'
            height='193.101'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='bg' />
            <feBlend mode='normal' in='SourceGraphic' in2='bg' result='shape' />
            <feGaussianBlur stdDeviation='30.3333' />
          </filter>

          {/* ── Rainbow layer 2 blur filters ── */}
          <filter
            id={`${uid}-rb2-f0`}
            x='70'
            y='0'
            width='183.768'
            height='183.768'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='bg' />
            <feBlend mode='normal' in='SourceGraphic' in2='bg' result='shape' />
            <feGaussianBlur stdDeviation='28' />
          </filter>
          <filter
            id={`${uid}-rb2-f1`}
            x='49'
            y='60.667'
            width='183.768'
            height='183.768'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='bg' />
            <feBlend mode='normal' in='SourceGraphic' in2='bg' result='shape' />
            <feGaussianBlur stdDeviation='28' />
          </filter>
          <filter
            id={`${uid}-rb2-f2`}
            x='0'
            y='49'
            width='183.768'
            height='183.768'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='bg' />
            <feBlend mode='normal' in='SourceGraphic' in2='bg' result='shape' />
            <feGaussianBlur stdDeviation='28' />
          </filter>
          <filter
            id={`${uid}-rb2-f3`}
            x='14'
            y='9.333'
            width='183.768'
            height='183.768'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='bg' />
            <feBlend mode='normal' in='SourceGraphic' in2='bg' result='shape' />
            <feGaussianBlur stdDeviation='28' />
          </filter>

          {/* ── Large sparkle (color-dodge) inner shadow + gradients ── */}
          <filter
            id={`${uid}-sp1-is`}
            x='0'
            y='-0.233333'
            width='38.6705'
            height='36.9681'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='bg' />
            <feBlend mode='normal' in='SourceGraphic' in2='bg' result='shape' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='-0.233333' />
            <feGaussianBlur stdDeviation='2.33333' />
            <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'
            />
            <feBlend mode='normal' in2='shape' />
          </filter>
          <radialGradient
            id={`${uid}-sp1-rg`}
            cx='0'
            cy='0'
            r='1'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(19.5334 18.6333) rotate(113.295) scale(89.7191 96.9991)'
          >
            <stop stopColor='white' stopOpacity='0' />
            <stop offset='0.133937' stopColor='white' />
          </radialGradient>
          <linearGradient
            id={`${uid}-sp1-lg`}
            x1='-29.2644'
            y1='11.6583'
            x2='-6.88784'
            y2='100.731'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='white' />
            <stop offset='1' stopColor='#FBD570' stopOpacity='0' />
          </linearGradient>

          {/* ── Small sparkle (color-dodge) inner shadow + gradients ── */}
          <filter
            id={`${uid}-sp2-is`}
            x='0'
            y='-0.233333'
            width='16.5155'
            height='15.8461'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='bg' />
            <feBlend mode='normal' in='SourceGraphic' in2='bg' result='shape' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='-0.233333' />
            <feGaussianBlur stdDeviation='2.33333' />
            <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'
            />
            <feBlend mode='normal' in2='shape' />
          </filter>
          <radialGradient
            id={`${uid}-sp2-rg`}
            cx='0'
            cy='0'
            r='1'
            gradientTransform='matrix(-15.1535 35.0233 -38.0496 -16.3037 8.34239 7.91944)'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='white' stopOpacity='0' />
            <stop offset='0.133937' stopColor='white' />
          </radialGradient>
          <linearGradient
            id={`${uid}-sp2-lg`}
            x1='-12.4984'
            y1='4.95496'
            x2='-3.02865'
            y2='42.8338'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='white' />
            <stop offset='1' stopColor='#FBD570' stopOpacity='0' />
          </linearGradient>

          {/* ── Top highlight blur (plus-lighter) ── */}
          <filter
            id={`${uid}-hl-top`}
            x='0'
            y='0'
            width='141.167'
            height='91'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='bg' />
            <feBlend mode='normal' in='SourceGraphic' in2='bg' result='shape' />
            <feGaussianBlur stdDeviation='12.8333' />
          </filter>
          <linearGradient
            id={`${uid}-hl-top-lg`}
            x1='51.3333'
            y1='42'
            x2='82.2725'
            y2='97.2401'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='white' />
            <stop offset='1' stopColor='white' stopOpacity='0' />
          </linearGradient>

          {/* ── Bottom highlight blur (plus-lighter) ── */}
          <filter
            id={`${uid}-hl-bot`}
            x='0'
            y='0'
            width='108.5'
            height='72.3515'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='bg' />
            <feBlend mode='normal' in='SourceGraphic' in2='bg' result='shape' />
            <feGaussianBlur stdDeviation='12.8333' />
          </filter>
          <linearGradient
            id={`${uid}-hl-bot-lg`}
            x1='49.0003'
            y1='35.0006'
            x2='54.2499'
            y2='46.6849'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='white' stopOpacity='0' />
            <stop offset='1' stopColor='white' />
          </linearGradient>

          {/* ── Shimmer blur ── */}
          <filter
            id={`${uid}-shimmer-blur`}
            x='-100%'
            y='-100%'
            width='300%'
            height='300%'
            colorInterpolationFilters='sRGB'
          >
            <feGaussianBlur stdDeviation='8' />
          </filter>

          {/* ── Inner shadow filter ── */}
          <filter
            id={`${uid}-inner-shadow`}
            x='-10%'
            y='-10%'
            width='120%'
            height='120%'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodColor='black' floodOpacity='1' />
            <feComposite in2='SourceGraphic' operator='in' />
            <feGaussianBlur stdDeviation='5.7' />
            <feOffset dy='-1.5' />
            <feComposite in2='SourceGraphic' operator='out' result='shadow' />
            <feFlood floodColor='black' floodOpacity='0.55' />
            <feComposite in2='shadow' operator='in' />
          </filter>
        </defs>

        <g clipPath={`url(#${uid}-clip)`}>
          {/* ── Layer 1: White background ── */}
          <circle cx='56' cy='56' r='56' fill='white' />

          {/* ── Layer 2: Sparkle shapes (white, normal blend) ── */}
          <g transform='translate(28, 30.33)'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M56.4302 8.18361C52.7915 7.06296 49.9181 4.33892 48.7415 0.887898C48.3392 -0.295966 46.2673 -0.295966 45.865 0.887898C44.6884 4.33892 41.8149 7.06296 38.1762 8.18361C37.5531 8.37613 37.1297 8.92783 37.1297 9.55137C37.1297 10.172 37.5531 10.7237 38.1762 10.9163C41.8089 12.034 44.6823 14.7724 45.865 18.2407C46.0646 18.8326 46.6484 19.2349 47.3017 19.2349C47.9581 19.2349 48.5418 18.8326 48.7415 18.2407C49.9241 14.7724 52.7976 12.034 56.4302 10.9163C57.0533 10.7237 57.4768 10.172 57.4768 9.55137C57.4768 8.92783 57.0533 8.37613 56.4302 8.18361Z'
              fill='white'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M45.5942 27.6017L36.9575 24.9372C33.3895 23.8365 30.564 21.0945 29.3567 17.5612L26.6324 9.58786C26.2331 8.40974 25.1261 7.64828 23.8194 7.64828C22.5098 7.64828 21.4057 8.40974 21.0035 9.58786L18.311 17.5301C17.1089 21.0763 14.2776 23.83 10.6994 24.9332L2.05377 27.5988C0.825741 27.9695 0 29.0442 0 30.2769C0 31.5067 0.825741 32.5814 2.04772 32.9492L10.6607 35.5948C14.2353 36.6927 17.067 39.4376 18.2756 42.9763L21.0035 50.9629C21.4057 52.141 22.5098 52.9054 23.8194 52.9054C25.1261 52.9054 26.2331 52.141 26.6324 50.9629L29.3297 43.0168C30.5327 39.4729 33.3628 36.7212 36.9392 35.6184L45.5851 32.9521C46.8131 32.5814 47.6419 31.5067 47.6419 30.2769C47.6419 29.0442 46.8131 27.9695 45.5942 27.6017Z'
              fill='white'
            />
          </g>

          {/* ── Layer 3: Rainbow gradient 1 (normal blend) ── */}
          <g className={animated ? `${uid}-drift-a` : undefined}>
            <g opacity='0.999' transform='translate(-68, -77.4)'>
              {/* Cyan */}
              <g filter={`url(#${uid}-rb1-f0)`}>
                <circle
                  cx='166.551'
                  cy='96.5506'
                  r='35.8793'
                  transform='rotate(32.262 166.551 96.5506)'
                  fill='#20D4FF'
                />
              </g>
              {/* Yellow — boosted from #FBD570 to compensate sRGB vs Display P3 */}
              <g filter={`url(#${uid}-rb1-f1)`}>
                <circle
                  cx='145.551'
                  cy='157.217'
                  r='35.8793'
                  transform='rotate(32.262 145.551 157.217)'
                  fill='#FFE040'
                />
              </g>
              {/* Red — boosted from #FF5D53 */}
              <g filter={`url(#${uid}-rb1-f2)`}>
                <circle
                  cx='96.5506'
                  cy='145.551'
                  r='35.8793'
                  transform='rotate(32.262 96.5506 145.551)'
                  fill='#FF1A0A'
                />
              </g>
              {/* Blue */}
              <g filter={`url(#${uid}-rb1-f3)`}>
                <circle
                  cx='110.551'
                  cy='105.884'
                  r='35.8793'
                  transform='rotate(32.262 110.551 105.884)'
                  fill='#536FFF'
                />
              </g>
            </g>
          </g>

          {/* ── Layer 4: Rainbow gradient 2 (hard-light, 20% opacity, rotated 19.67°) ── */}
          <g className={animated ? `${uid}-drift-b` : undefined}>
            <g
              style={{ mixBlendMode: 'hard-light' }}
              opacity='0.2'
              transform='translate(56, 56) rotate(19.67) translate(-126.884, -122.218)'
            >
              <g filter={`url(#${uid}-rb2-f0)`}>
                <circle
                  cx='161.883'
                  cy='91.8839'
                  r='35.8793'
                  transform='rotate(32.262 161.883 91.8839)'
                  fill='#20D4FF'
                />
              </g>
              <g filter={`url(#${uid}-rb2-f1)`}>
                <circle
                  cx='140.884'
                  cy='152.551'
                  r='35.8793'
                  transform='rotate(32.262 140.884 152.551)'
                  fill='#FFE040'
                />
              </g>
              <g filter={`url(#${uid}-rb2-f2)`}>
                <circle
                  cx='91.8839'
                  cy='140.884'
                  r='35.8793'
                  transform='rotate(32.262 91.8839 140.884)'
                  fill='#FF1A0A'
                />
              </g>
              <g filter={`url(#${uid}-rb2-f3)`}>
                <circle
                  cx='105.883'
                  cy='101.218'
                  r='35.8793'
                  transform='rotate(32.262 105.883 101.218)'
                  fill='#536FFF'
                />
              </g>
            </g>
          </g>

          {/* ── Layer 5: Large sparkle star (color-dodge) ── */}
          <g
            style={{ mixBlendMode: 'color-dodge' }}
            transform='translate(28.68, 42.25)'
          >
            <g filter={`url(#${uid}-sp1-is)`}>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M37.0084 16.196L32.7638 14.8866C28.1301 13.457 24.4606 9.89596 22.8927 5.30722L21.6173 1.57434C21.2932 0.618075 20.3946 0 19.334 0C18.2709 0 17.3748 0.618075 17.0483 1.57434L15.7951 5.27104C14.2338 9.87652 10.5569 13.4528 5.90983 14.8855L1.66702 16.1937C0.670246 16.4945 0 17.3668 0 18.3674C0 19.3657 0.670246 20.238 1.66211 20.5365L5.88174 21.8326C10.5241 23.2585 14.2016 26.8234 15.7713 31.4191L17.0483 35.1581C17.3748 36.1143 18.2709 36.7347 19.334 36.7347C20.3946 36.7347 21.2932 36.1143 21.6173 35.1581L22.8738 31.4563C24.4362 26.8538 28.1117 23.2802 32.7563 21.8479L37.001 20.5388C37.9978 20.238 38.6705 19.3657 38.6705 18.3674C38.6705 17.3668 37.9978 16.4945 37.0084 16.196Z'
                fill='white'
                fillOpacity='0.4'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M37.0084 16.196L32.7638 14.8866C28.1301 13.457 24.4606 9.89596 22.8927 5.30722L21.6173 1.57434C21.2932 0.618075 20.3946 0 19.334 0C18.2709 0 17.3748 0.618075 17.0483 1.57434L15.7951 5.27104C14.2338 9.87652 10.5569 13.4528 5.90983 14.8855L1.66702 16.1937C0.670246 16.4945 0 17.3668 0 18.3674C0 19.3657 0.670246 20.238 1.66211 20.5365L5.88174 21.8326C10.5241 23.2585 14.2016 26.8234 15.7713 31.4191L17.0483 35.1581C17.3748 36.1143 18.2709 36.7347 19.334 36.7347C20.3946 36.7347 21.2932 36.1143 21.6173 35.1581L22.8738 31.4563C24.4362 26.8538 28.1117 23.2802 32.7563 21.8479L37.001 20.5388C37.9978 20.238 38.6705 19.3657 38.6705 18.3674C38.6705 17.3668 37.9978 16.4945 37.0084 16.196Z'
                fill={`url(#${uid}-sp1-rg)`}
                fillOpacity='0.4'
              />
            </g>
            <path
              d='M19.334 0.116211C20.3481 0.116211 21.1998 0.705984 21.5068 1.61133V1.6123L22.7822 5.34473C24.3622 9.9688 28.0601 13.5575 32.7295 14.998L36.9736 16.3076H36.9746C37.9176 16.5921 38.5536 17.4211 38.5537 18.3672C38.5537 19.3105 37.9182 20.1396 36.9678 20.4268L37.001 20.5391L36.9814 20.4756L36.9668 20.4268V20.4277L32.7217 21.7363C28.0414 23.1797 24.338 26.7811 22.7637 31.4189L21.5068 35.1201V35.1211C21.1998 36.0266 20.3479 36.6182 19.334 36.6182C18.3176 36.6182 17.4686 36.0262 17.1592 35.1201L15.8818 31.3818C14.3001 26.7507 10.5941 23.1576 5.91602 21.7207L1.69629 20.4248H1.69531C0.750148 20.1401 0.116211 19.3109 0.116211 18.3672C0.116318 17.4212 0.750793 16.5925 1.70117 16.3057V16.3047L5.94434 14.9971C10.6271 13.5533 14.332 9.94941 15.9053 5.30859L17.1592 1.6123C17.4685 0.706408 18.3174 0.116221 19.334 0.116211Z'
              stroke={`url(#${uid}-sp1-lg)`}
              style={{ mixBlendMode: 'overlay' }}
              strokeWidth='0.233333'
            />
          </g>

          {/* ── Layer 6: Small sparkle star (color-dodge) ── */}
          <g
            style={{ mixBlendMode: 'color-dodge' }}
            transform='translate(62.82, 35.04)'
          >
            <g filter={`url(#${uid}-sp2-is)`}>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M15.6661 6.64255C12.7126 5.73293 10.3802 3.52186 9.42518 0.720698C9.09865 -0.240233 7.4169 -0.240233 7.09037 0.720698C6.13533 3.52186 3.80297 5.73293 0.849469 6.64255C0.343716 6.79882 0 7.24663 0 7.75275C0 8.25654 0.343716 8.70436 0.849469 8.86062C3.79806 9.76791 6.13042 11.9906 7.09037 14.8058C7.2524 15.2863 7.72624 15.6128 8.25655 15.6128C8.7893 15.6128 9.26314 15.2863 9.42518 14.8058C10.3851 11.9906 12.7175 9.76791 15.6661 8.86062C16.1718 8.70436 16.5155 8.25654 16.5155 7.75275C16.5155 7.24663 16.1718 6.79882 15.6661 6.64255Z'
                fill='white'
                fillOpacity='0.4'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M15.6661 6.64255C12.7126 5.73293 10.3802 3.52186 9.42518 0.720698C9.09865 -0.240233 7.4169 -0.240233 7.09037 0.720698C6.13533 3.52186 3.80297 5.73293 0.849469 6.64255C0.343716 6.79882 0 7.24663 0 7.75275C0 8.25654 0.343716 8.70436 0.849469 8.86062C3.79806 9.76791 6.13042 11.9906 7.09037 14.8058C7.2524 15.2863 7.72624 15.6128 8.25655 15.6128C8.7893 15.6128 9.26314 15.2863 9.42518 14.8058C10.3851 11.9906 12.7175 9.76791 15.6661 8.86062C16.1718 8.70436 16.5155 8.25654 16.5155 7.75275C16.5155 7.24663 16.1718 6.79882 15.6661 6.64255Z'
                fill={`url(#${uid}-sp2-rg)`}
                fillOpacity='0.4'
              />
            </g>
            <path
              d='M8.25781 0.116211C8.73002 0.116224 9.17278 0.341684 9.31445 0.757812V0.758789C10.2823 3.59706 12.6446 5.83391 15.6318 6.75391C16.092 6.89615 16.3984 7.30146 16.3984 7.75293C16.3984 8.20184 16.092 8.60673 15.6318 8.74902C12.7422 9.63818 10.4356 11.7771 9.41016 14.5029L9.31445 14.7686C9.16954 15.1981 8.743 15.496 8.25684 15.4961C7.83339 15.4961 7.45293 15.268 7.26758 14.9229L7.20117 14.7686L7.10547 14.5029C6.11303 11.8648 3.92072 9.77662 1.16113 8.83887L0.883789 8.74902C0.423563 8.60676 0.116291 8.20186 0.116211 7.75293C0.116211 7.30144 0.423601 6.89613 0.883789 6.75391C3.87098 5.8339 6.23337 3.59706 7.20117 0.758789V0.757812C7.34286 0.341688 7.7856 0.116211 8.25781 0.116211Z'
              stroke={`url(#${uid}-sp2-lg)`}
              style={{ mixBlendMode: 'overlay' }}
              strokeWidth='0.233333'
            />
          </g>

          {/* ── Layer 7: Top glass highlight (plus-lighter) ── */}
          <g
            style={{
              mixBlendMode:
                'plus-lighter' as React.CSSProperties['mixBlendMode'],
            }}
            transform='translate(-14, -17.5)'
          >
            <g filter={`url(#${uid}-hl-top)`}>
              <path
                d='M71.1667 25.6667C102.9 25.6667 115.5 65.3333 115.5 65.3333C115.5 65.3333 90.7505 36.0595 71.1667 35C51.0202 33.9101 25.6667 61.8333 25.6667 61.8333C25.6667 61.8333 39.4333 25.6667 71.1667 25.6667Z'
                fill={`url(#${uid}-hl-top-lg)`}
              />
            </g>
          </g>

          {/* ── Layer 8: Bottom glass highlight (plus-lighter) ── */}
          <g
            style={{
              mixBlendMode:
                'plus-lighter' as React.CSSProperties['mixBlendMode'],
            }}
            transform='translate(7, 51.34)'
          >
            <g filter={`url(#${uid}-hl-bot)`}>
              <path
                d='M82.833 25.6667C78.1665 36.1666 60.2001 54.3664 25.6667 43.1667C36.1664 43.9443 62.2993 41.5329 82.833 25.6667Z'
                fill={`url(#${uid}-hl-bot-lg)`}
              />
            </g>
          </g>

          {/* ── Layer 9: Soft-light overlay ── */}
          <circle
            cx='56'
            cy='56'
            r='56'
            fill='black'
            style={{ mixBlendMode: 'soft-light' }}
          />

          {/* ── Layer 10: Overlay at 10% ── */}
          <circle
            cx='56'
            cy='56'
            r='56'
            fill='black'
            opacity='0.1'
            style={{ mixBlendMode: 'overlay' }}
          />

          {/* ── Shimmer ── */}
          {animated && (
            <g className={`${uid}-shimmer`}>
              <ellipse
                cx='56'
                cy='56'
                rx='12'
                ry='70'
                fill='white'
                opacity='0.18'
                filter={`url(#${uid}-shimmer-blur)`}
              />
            </g>
          )}

          {/* ── Layer 11: Inner shadow (inset 0px -11.667px 44.333px -4.667px black) ── */}
          <circle
            cx='56'
            cy='56'
            r='56'
            fill='transparent'
            filter={`url(#${uid}-inner-shadow)`}
          />
        </g>
      </svg>
    );
  }
);
AiOrbRoot.displayName = 'AiOrbRoot';

export { AiOrbRoot as Root };
