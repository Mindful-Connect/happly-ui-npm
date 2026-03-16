import { RiFilter3Line, RiSpotifyFill, RiNetflixFill } from '@remixicon/react';

import * as PromotionalCard from './promotional-card';

export default {
  title: 'Cards/Promotional Card',
  component: PromotionalCard.Root,
};

export const Stroke = {
  render: () => (
    <PromotionalCard.Root variant='stroke'>
      <PromotionalCard.Icon as={RiFilter3Line} />
      <PromotionalCard.Decoration as={RiFilter3Line} />
      <PromotionalCard.Content>
        <PromotionalCard.Title>Let me filter</PromotionalCard.Title>
        <PromotionalCard.Description>
          Apply filter based on what you exactly need
        </PromotionalCard.Description>
      </PromotionalCard.Content>
    </PromotionalCard.Root>
  ),
};

export const Filled = {
  render: () => (
    <PromotionalCard.Root variant='filled'>
      <PromotionalCard.Icon as={RiSpotifyFill} />
      <PromotionalCard.Decoration as={RiSpotifyFill} />
      <PromotionalCard.Content>
        <PromotionalCard.Title>
          50% discount on Spotify
        </PromotionalCard.Title>
        <div className='flex items-center gap-1'>
          <PromotionalCard.Description>
            For only $4.99 per month!
          </PromotionalCard.Description>
          <PromotionalCard.Link href='#'>Learn More</PromotionalCard.Link>
        </div>
      </PromotionalCard.Content>
    </PromotionalCard.Root>
  ),
};

export const Clickable = {
  render: () => (
    <div className='flex gap-4'>
      <PromotionalCard.Root asChild clickable variant='stroke'>
        <a href='#'>
          <PromotionalCard.Icon as={RiFilter3Line} />
          <PromotionalCard.Decoration as={RiFilter3Line} />
          <PromotionalCard.Content>
            <PromotionalCard.Title>Let me filter</PromotionalCard.Title>
            <PromotionalCard.Description>
              Apply filter based on what you exactly need
            </PromotionalCard.Description>
          </PromotionalCard.Content>
        </a>
      </PromotionalCard.Root>

      <PromotionalCard.Root asChild clickable variant='filled'>
        <a href='#'>
          <PromotionalCard.Icon as={RiSpotifyFill} />
          <PromotionalCard.Decoration as={RiSpotifyFill} />
          <PromotionalCard.Content>
            <PromotionalCard.Title>
              50% discount on Spotify
            </PromotionalCard.Title>
            <PromotionalCard.Description>
              For only $4.99 per month!
            </PromotionalCard.Description>
          </PromotionalCard.Content>
        </a>
      </PromotionalCard.Root>
    </div>
  ),
};

export const Composed = {
  render: () => (
    <div className='flex gap-4'>
      <PromotionalCard.Composed
        variant='stroke'
        icon={RiFilter3Line}

        title='Let me filter'
        description='Apply filter based on what you exactly need'
      />
      <PromotionalCard.Composed
        variant='filled'
        icon={RiSpotifyFill}

        title='50% discount on Spotify'
        description='For only $4.99 per month!'
        linkText='Learn More'
        linkHref='#'
      />
    </div>
  ),
};

export const Grid = {
  render: () => (
    <div className='flex flex-wrap justify-center gap-4'>
      <PromotionalCard.Composed
        variant='filled'
        icon={RiSpotifyFill}

        title='50% discount on Spotify'
        description='For only $4.99 per month!'
        linkText='Learn More'
        linkHref='#'
      />
      <PromotionalCard.Composed
        variant='filled'
        icon={RiNetflixFill}

        title='50% discount on Netflix'
        description='For only $4.99 per month!'
        linkText='Learn More'
        linkHref='#'
      />
      <PromotionalCard.Composed
        variant='stroke'
        icon={RiFilter3Line}

        title='Let me filter'
        description='Apply filter based on what you exactly need'
      />
    </div>
  ),
};
