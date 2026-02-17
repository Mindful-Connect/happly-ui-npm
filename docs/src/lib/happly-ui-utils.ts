import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ObjectValues<T> = T[keyof T];

type ParamsOfFetch = Parameters<typeof fetch>;

export type ApiFetch = (
  input: ParamsOfFetch[0],
  init?: ParamsOfFetch[1] &
    (
      | {
          unauthenticated?: boolean;
          noWorkspaceKey?: boolean;
        }
      | undefined
    )
) => ReturnType<typeof fetch>;
