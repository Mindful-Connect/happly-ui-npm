import { ObjectValues } from '@/lib/utils';

export const TAG_CATEGORY = {
  Sector: 'sector',
  Skill: 'skill',
  OpportunityType: 'opportunity_type',
  Perk: 'perk',
  Demographic: 'demographic',
  IncorporationType: 'incorporation_type',
  General: 'general',
  SpaceAccommodation: 'space_accommodation',
  LiveStreamTopic: 'live_stream_topic',
  EventTopic: 'event_topic',
  Group: 'group',
} as const;
export type TagCategory = ObjectValues<typeof TAG_CATEGORY>;

export interface Tag {
  id: number;
  slug: string;
  label: string;
  category: TagCategory;
}
