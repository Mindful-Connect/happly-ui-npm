import { ObjectValues } from '@/lib/happly-ui-utils';

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export const LANGUAGE_TYPE = {
  English: 'en',
  French: 'fr',
  Spanish: 'es',
  Portuguese: 'pt',
  German: 'de',
  Italian: 'it',
  Japanese: 'ja',
  Korean: 'ko',
  ChineseSimplified: 'zh-CN',
  ChineseTraditional: 'zh-TW',
  Arabic: 'ar',
  Hindi: 'hi',
  Russian: 'ru',
  Turkish: 'tr',
  Vietnamese: 'vi',
  Polish: 'pl',
  Dutch: 'nl',
  Romanian: 'ro',
  Hungarian: 'hu',
} as const;
export type LanguageType = ObjectValues<typeof LANGUAGE_TYPE>;

export type Translatable = AtLeastOne<{
  [K in LanguageType]?: string;
}>;
