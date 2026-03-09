export type Gender = 'female' | 'male';

export type SkinTone = 'black' | 'white';

export const PERSONS = {
  female: [
    'angela',
    'ariana',
    'darlene',
    'ezra',
    'helen',
    'ishanvi',
    'jeniffer',
    'kate',
    'kim',
    'kulthum',
    'mary',
    'monica',
    'priyanka',
    'rosa',
  ] as const,
  male: [
    'alfred',
    'chris',
    'donald',
    'ed',
    'francis',
    'george',
    'john',
    'justin',
    'karim',
    'krishna',
    'mattew',
    'michael',
    'salman',
    'usman',
  ] as const,
} as const;

export const POSTURES = [
  'angry-12',
  'bad-word-14',
  'crossing-finger-26',
  'crying-4',
  'dislike-21',
  'fisting-24',
  'grinning-15',
  'happy-1',
  'happy-winking-17',
  'heart-eye-5',
  'hugging-23',
  'kiss-10',
  'like-20',
  'lovely-9',
  'luaghing-2',
  'mind-blowing-7',
  'mouth-covering-25',
  'party-11',
  'rolling-eyes-19',
  'sad-3',
  'scream-29',
  'sh!-27',
  'shocked-18',
  'sleeping-6',
  'star-eye-8',
  'thinking-28',
  'triumph-13',
  'victory-22',
  'winking-16',
] as const;

export type Person =
  | (typeof PERSONS.male)[number]
  | (typeof PERSONS.female)[number];
export type Posture = (typeof POSTURES)[number];

export interface MemojiConfig {
  gender: Gender;
  person: Person;
  skinTone: SkinTone;
  posture: Posture;
}

const MEMOJI_BASE = 'https://storage.googleapis.com/happly-memojis';

export function getMemojiUrl(config: MemojiConfig) {
  return `${MEMOJI_BASE}/${config.gender}/${config.person}/${config.skinTone}/${config.posture}.svg`;
}
