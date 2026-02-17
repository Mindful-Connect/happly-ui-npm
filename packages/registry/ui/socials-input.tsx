import React, { useState } from 'react';
import { z } from 'zod';

import { Popover, Transition } from '@headlessui/react';
import { cn } from '@/lib/happly-ui-utils';
import { Input } from '@/components/ui/input';
import {
  RiCalendarTodoLine,
  RiCloseLine,
  RiFacebookCircleFill,
  RiInstagramLine,
  RiLinkedinFill,
  RiTiktokFill,
  RiTwitterXLine,
  RiYoutubeFill,
} from 'react-icons/ri';

export interface SocialsInputLabels {
  addSocialMedia: string;
  errorSocialUrl: string;
  errorCalendarUrl: string;
  errorZoomUrl: string;
}

const defaultLabels: SocialsInputLabels = {
  addSocialMedia: 'Add social media', // fr: "Ajouter un média social"
  errorSocialUrl: 'Please enter a valid URL', // fr: "Veuillez saisir une URL de réseau social ou un nom d'utilisateur valide"
  errorCalendarUrl: 'Please enter a valid calendar URL', // fr: "Veuillez saisir une URL valide"
  errorZoomUrl: 'Please enter a valid Zoom URL', // fr: "Veuillez saisir une URL Zoom valide"
};

export default function SocialsInputsSelectableDS({
  name,
  readOnly = false,
  availableSocials = [
    'linkedin',
    'instagram',
    'facebook',
    'youtube',
    'x-twitter',
    'tiktok',
  ],
  formValue,
  setFormValue,
  labels,
}: {
  name: string;
  readOnly?: boolean;
  availableSocials?: string[] | null;
  formValue: Record<string, string>;
  setFormValue: (value: Record<string, string>) => void;
  labels?: Partial<SocialsInputLabels>;
}) {
  const t = (key: string) =>
    labels?.[key as keyof SocialsInputLabels] ??
    defaultLabels[key as keyof SocialsInputLabels];

  const [errorTimeout, setErrorTimeout] = useState<number>();
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  // console.log('socials input errors:', errors);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const socialsDict: Record<
    string,
    {
      key: string;
      label: string;
      icon: React.ReactNode;
      placeholder: string;
    }
  > = {
    linkedin: {
      key: 'linkedin',
      label: 'LinkedIn',
      icon: linkedInIcon,
      placeholder: 'https://www.linkedin.com',
    },
    instagram: {
      key: 'instagram',
      label: 'Instagram',
      icon: instagramIcon,
      placeholder: 'https://www.instagram.com',
    },
    facebook: {
      key: 'facebook',
      label: 'Facebook',
      icon: facebookIcon,
      placeholder: 'https://www.facebook.com',
    },
    youtube: {
      key: 'youtube',
      label: 'YouTube',
      icon: youtubeIcon,
      placeholder: 'https://www.youtube.com',
    },
    'x-twitter': {
      key: 'x-twitter',
      label: 'X (Twitter)',
      icon: xIcon,
      placeholder: 'https://x.com',
    },
    tiktok: {
      key: 'tiktok',
      label: 'TikTok',
      icon: tiktokIcon,
      placeholder: 'https://www.tiktok.com',
    },
    zoom: {
      key: 'zoom',
      label: 'Zoom',
      icon: zoomIcon,
      placeholder: 'https://zoom.us',
    },
    calendar: {
      key: 'calendar',
      label: 'Calendar',
      icon: calendarIcon,
      placeholder: 'https://socialmedia.com',
    },
  };

  const socials: {
    key: string;
    label: string;
    icon: React.ReactNode;
    placeholder: string;
  }[] = [];

  if (!availableSocials) {
    Object.keys(socialsDict).forEach((social) => {
      if (socials.includes(socialsDict[social])) return;
      socials.push(socialsDict[social]);
    });
  } else {
    availableSocials.forEach((social) => {
      if (!socialsDict[social] || socials.includes(socialsDict[social])) return;
      socials.push(socialsDict[social]);
    });
  }

  function addSocialInput(key: string) {
    if (readOnly) return;
    // if (!field.value) return;
    if (!formValue) return;

    // const allEntries = { ...field.value };
    const allEntries = { ...formValue };

    const emptyEntries = Object.keys(formValue).filter((fieldKey) => {
      if (fieldKey === key) return false;
      return !formValue[fieldKey];
    });

    // remove empty entries
    emptyEntries.forEach((entry) => {
      delete allEntries[entry];
      const newErrors = { ...errors };
      delete newErrors[`${name}.${entry}`];
      setErrors({
        ...newErrors,
      });
    });
    // console.log('allEntries', allEntries);

    const erroredEntries = Object.entries(
      allEntries as Record<string, string>
    ).some(([fieldKey, value]) => {
      if (
        fieldKey === 'business_socials_link' ||
        fieldKey === 'phone' ||
        fieldKey === 'website'
      )
        return false;
      return !validateURL(value);
    });

    if (erroredEntries) return;

    if (key && allEntries[key]) return;

    setFormValue({
      ...allEntries,
      [key]: '',
    });
  }

  function handleCheckSocialUrl({
    key,
    url,
    t: _t,
  }: {
    key: string;
    url: string;
    t?: (key: string, values?: Record<string, string | number>) => string;
  }) {
    const message = t('errorSocialUrl');
    const result = getSocialUrlSchema(message).safeParse({
      [`${name}.${key}`]: url,
    });

    if (!result.success && !((key === 'calendar') /* || key === 'zoom' */)) {
      const issues = result.error.issues;
      const newErrors = {} as Record<string, string | undefined>;
      issues.forEach((issue) => {
        if (issue.path[0] === `${name}.${key}`) {
          newErrors[issue.path[0]] = issue.message;
        }
      });

      setErrorTimeout(
        window.setTimeout(() => {
          setErrors({
            ...errors,
            ...newErrors,
          });
        }, 80)
      );

      return false;
    } else {
      const newErrors = { ...errors };
      delete newErrors[`${name}.${key}`];
      setErrors({
        ...newErrors,
      });
      return true;
    }
  }

  const handleInputBlur = async ({
    key,
    value,
  }: {
    key: string;
    value: string;
  }) => {
    if (!value || value.includes(' ')) {
      setErrorTimeout(
        window.setTimeout(() => {
          setErrors({
            ...errors,
            [`${name}.${key}`]: t('errorSocialUrl'),
          });
        }, 80)
      );
      return;
    }

    let message = '';
    if (key === 'calendar') {
      message = t('errorCalendarUrl');
    } else if (key === 'zoom') {
      message = t('errorZoomUrl');
    } else {
      message = t('errorSocialUrl');
    }
    const validateURLResult = validateURL(value);

    if (key === 'calendar' /* || key === 'zoom' */ && !validateURLResult) {
      setErrorTimeout(
        window.setTimeout(() => {
          setErrors({
            ...errors,
            [`${name}.${key}`]: message,
          });
        }, 80)
      );
      return;
    }

    if (
      key !== 'calendar' &&
      /* key !== 'zoom' && */
      validateURLResult &&
      (!allowedSocialDomains.some((domain) => value.includes(domain)) ||
        !allowedSocialInputDomains[
          key as keyof typeof allowedSocialInputDomains
        ].some((domain) => value.includes(domain)))
    ) {
      setErrorTimeout(
        window.setTimeout(() => {
          setErrors({
            ...errors,
            [`${name}.${key}`]: message,
          });
        }, 80)
      );
      return;
    }

    let url = value;

    /* generate full social URL from handle */
    if (
      key !== 'calendar' &&
      key !== 'zoom' &&
      !value.includes('instagram.com') &&
      !value.includes('facebook.com') &&
      !value.includes('tiktok.com') &&
      !value.includes('youtube.com') &&
      !value.includes('linkedin.com') &&
      !value.includes('twitter.com') &&
      !value.includes('x.com')
    ) {
      url = generateSocialURLFromHandle(key, value);
    }

    const result = handleCheckSocialUrl({
      key,
      url: url,
    });

    if (result) {
      setFormValue({
        ...formValue,
        [key]: url,
      });
    }
  };

  const handleInputPaste = async ({
    e,
    key,
    t,
  }: {
    e: React.ClipboardEvent<HTMLInputElement>;
    key: string;
    t: (key: string, values?: Record<string, string | number>) => string;
  }) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text');

    if (!text || text.includes(' ')) {
      setErrorTimeout(
        window.setTimeout(() => {
          setErrors({
            ...errors,
            [`${name}.${key}`]: t('customForms.components.errorSocialURL'),
          });
        }, 80)
      );
      return;
    }

    let message = '';
    if (key === 'calendar') {
      message = t('team.errorURL');
    } else if (key === 'zoom') {
      message = t('team.errorZoomURL');
    } else {
      message = t('customForms.components.errorSocialURL');
    }
    const validateURLResult = validateURL(text);

    if (key === 'calendar' /* || key === 'zoom' */ && !validateURLResult) {
      setFormValue({
        ...formValue,
        [key]: text,
      });

      setErrorTimeout(
        window.setTimeout(() => {
          setErrors({
            ...errors,
            [`${name}.${key}`]: message,
          });
        }, 80)
      );
      return;
    }

    if (
      key !== 'calendar' &&
      /* key !== 'zoom' && */
      validateURLResult &&
      (!allowedSocialDomains.some((domain) => text.includes(domain)) ||
        !allowedSocialInputDomains[
          key as keyof typeof allowedSocialInputDomains
        ].some((domain) => text.includes(domain)))
    ) {
      setErrorTimeout(
        window.setTimeout(() => {
          setErrors({
            ...errors,
            [`${name}.${key}`]: message,
          });
        }, 80)
      );
      return;
    }

    let url = text;

    /* generate full social URL from handle */
    if (
      text &&
      key !== 'calendar' &&
      key !== 'zoom' &&
      !text.includes('/instagram.com') &&
      !text.includes('facebook.com') &&
      !text.includes('tiktok.com') &&
      !text.includes('youtube.com') &&
      !text.includes('linkedin.com') &&
      !text.includes('twitter.com') &&
      !text.includes('x.com') &&
      !text.includes('zoom.us')
    ) {
      url = generateSocialURLFromHandle(key, text);
    }

    const result = handleCheckSocialUrl({
      key,
      url: url,
      t,
    });

    if (result) {
      setFormValue({
        ...formValue,
        [key]: url,
      });
    }
  };

  function getInputPlaceholder(key: string) {
    if (key === 'linkedin') {
      return 'https://linkedin.com/in/';
    }

    if (key === 'instagram') {
      return 'https://instagram.com';
    }

    if (key === 'facebook') {
      return 'https://facebook.com';
    }

    if (key === 'youtube') {
      return 'https://youtube.com';
    }

    if (key === 'x-twitter') {
      return 'https://x.com';
    }

    if (key === 'tiktok') {
      return 'https://tiktok.com';
    }

    if (key === 'zoom') {
      return 'https://zoom.us';
    }

    return 'https://socialmedia.com';
  }

  function generateSocialURLFromHandle(key: string, text: string) {
    let url = '';
    let username = text;
    switch (key) {
      // add "@":
      case 'tiktok':
        if (text[0] !== '@') {
          username = '@' + text;
        }
        url = `https://tiktok.com/${username}`;
        break;

      case 'youtube':
        if (text[0] !== '@') {
          username = '@' + text;
        }
        url = `https://youtube.com/${username}`;
        break;

      // remove "@":
      case 'instagram':
        if (text[0] === '@') {
          username = text.substring(1);
        }
        if (username) {
          url = `https://instagram.com/${username}`;
        }
        break;

      case 'facebook':
        if (text[0] === '@') {
          username = text.substring(1);
        }
        if (username) {
          url = `https://facebook.com/${username}`;
        }
        break;

      case 'x-twitter':
        if (text[0] === '@') {
          username = text.substring(1);
        }
        if (username) {
          url = `https://x.com/${username}`;
        }
        break;

      case 'linkedin':
        if (text[0] === '@') {
          username = text.substring(1);
        }
        if (username) {
          url = `https://linkedin.com/in/${username}`;
        }
        break;

      case 'zoom':
        url = text;
        break;

      case 'calendar':
        url = text;
        break;

      default:
        url = text;
        break;
    }
    return url;
  }

  return (
    <>
      <Popover className='z-50'>
        {({ open, close }) => (
          <>
            <Popover.Button
              onClick={(e) => {
                if (readOnly) {
                  e.preventDefault();
                  e.stopPropagation();
                  return;
                }
              }}
              className={cn(
                readOnly ? '' : '',
                'flex w-fit cursor-pointer items-center gap-x-1.5 text-sm font-medium text-[#35344E] outline-none select-none hover:brightness-90'
              )}
            >
              {PlusIconSquircle(open)}
              <span>{t('_domain.addSocialMedia')}</span>
            </Popover.Button>

            <Transition
              show={open}
              enter='transition-opacity duration-150'
              enterFrom='absolute opacity-0 z-[200] w-full sm:w-[360px]'
              enterTo='absolute opacity-100 z-[200] w-full sm:w-[360px]'
              leave='transition-opacity duration-150'
              leaveFrom='absolute opacity-100 z-[200] w-full sm:w-[360px]'
              leaveTo='absolute opacity-0 z-[200] w-full sm:w-[360px]'
            >
              <Popover.Panel
                static
                className='absolute z-[60] mt-2 w-full overflow-hidden rounded-[12px] bg-[#F7F7FC] shadow-lg transition-all sm:w-[360px]'
              >
                <>
                  {socials.map((social, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          if (readOnly) return;
                          addSocialInput(social.key);
                          close();
                        }}
                        className='hover:bg-clarity-4 flex cursor-pointer items-center gap-x-[18px] p-2 shadow-[0px_4.548px_4.548px_0px_rgba(0,_0,_0,_0.01)]'
                      >
                        <div className='h-[30px] w-[30px]'>{social.icon}</div>
                        <span className='text-sm text-[#575759]'>
                          {social.label}
                        </span>
                      </div>
                    );
                  })}
                </>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>

      {/* {field.value && Object.entries(field.value).length > 0 && ( */}
      {formValue && Object.entries(formValue).length > 0 && (
        <div className='mt-4 flex flex-col gap-y-4'>
          {Object.entries(formValue as Record<string, string>)
            .filter(([key]) => {
              if (
                key === 'business_socials_link' ||
                !availableSocials?.includes(key)
              ) {
                return false;
              }
              return true;
            })
            .map(([key, value]) => {
              if (key === 'business_socials_link') return null;
              return (
                <div className='relative flex flex-col gap-y-1.5' key={key}>
                  <Input
                    placeholder={getInputPlaceholder(key)}
                    disabled={readOnly}
                    tabIndex={1}
                    autoFocus={value ? false : true}
                    spellCheck={false}
                    value={value || ''}
                    hasError={!!errors[`${name}.${key}`]}
                    rightAffixClassName='border-none p-0'
                    rightAffix={
                      <button
                        type='button'
                        className='hover:!text-ds-red-600 flex h-full w-10 items-center justify-center'
                        onClick={() => {
                          if (readOnly) return;
                          clearTimeout(errorTimeout);
                          const newErrors = { ...errors };
                          delete newErrors[`${name}.${key}`];
                          setErrors({
                            ...newErrors,
                          });
                          // const newValue = { ...field.value };
                          const newValue = { ...formValue };
                          delete newValue[key];
                          setFormValue(newValue);
                        }}
                      >
                        <RiCloseLine size={20} />
                      </button>
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        // @ts-expect-error - e.target is typed as EventTarget which lacks blur method
                        e.target.blur();
                      }
                    }}
                    onPaste={async (e) => {
                      handleInputPaste({
                        e,
                        key,
                        t,
                      });
                    }}
                    onFocus={() => {
                      setFocusedInput(key);
                    }}
                    onBlur={async (e) => {
                      if (focusedInput === key) {
                        setFocusedInput(null);
                      }
                      handleInputBlur({
                        key,
                        value: e.currentTarget.value,
                      });
                    }}
                    onChange={(e) => {
                      setFormValue({
                        ...formValue,
                        [key]: e.target.value,
                      });
                    }}
                    leftIcon={
                      key === 'linkedin' ? (
                        <RiLinkedinFill />
                      ) : key === 'instagram' ? (
                        <RiInstagramLine />
                      ) : key === 'facebook' ? (
                        <RiFacebookCircleFill />
                      ) : key === 'youtube' ? (
                        <RiYoutubeFill />
                      ) : key === 'x-twitter' ? (
                        <RiTwitterXLine />
                      ) : key === 'tiktok' ? (
                        <RiTiktokFill />
                      ) : key === 'zoom' ? (
                        zoomInputIcon
                      ) : key === 'calendar' ? (
                        <RiCalendarTodoLine />
                      ) : undefined
                    }
                  />

                  {errors[`${name}.${key}`] && (
                    <div className='errorLine text-sm text-red-500'>
                      {errors[`${name}.${key}`]}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </>
  );
}

function validateURL(value: string) {
  // use regex to validate url. current issue with Zod's .url() : https://github.com/colinhacks/zod/issues/2236#issuecomment-1853298984
  const urlRegex =
    /^(?:https:\/\/|zoommtg:\/\/)[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/g;
  return urlRegex.test(value);
}

function getSocialUrlSchema(message: string) {
  return z.record(
    z.string(),
    z
      .string()
      .refine(validateURL, message)
      .refine(
        (value) => {
          const containsDomain = allowedSocialDomains.some((domain) =>
            value.includes(domain)
          );
          console.log('containsDomain:', {
            value,
            containsDomain,
          });
          return containsDomain;
        },
        { message }
      )
  );
}

const allowedSocialDomains = [
  '/facebook.com',
  '.facebook.com',
  '/linkedin.com',
  '.linkedin.com',
  '/twitter.com',
  '.twitter.com',
  '/x.com',
  '.x.com',
  '/instagram.com',
  '.instagram.com',
  '/youtube.com',
  '.youtube.com',
  '/tiktok.com',
  '.tiktok.com',
  '/zoom.us',
  '.zoom.us',
];

const allowedSocialInputDomains = {
  facebook: ['/facebook.com', '.facebook.com'],
  linkedin: ['/linkedin.com', '.linkedin.com'],
  'x-twitter': ['/twitter.com', '.twitter.com', '/x.com', '.x.com'],
  instagram: ['/instagram.com', '.instagram.com'],
  youtube: ['/youtube.com', '.youtube.com'],
  tiktok: ['/tiktok.com', '.tiktok.com'],
  zoom: ['/zoom.us', '.zoom.us'],
};

//

const PlusIconSquircle = (pressed: boolean) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    // rotate 45 degrees when pressed, animate
    className={'transition-transform ' + (pressed ? 'rotate-45' : '')}
  >
    <path
      d='M16.662 2.00098C20.062 2.00098 22.002 3.92098 22.002 7.33098V16.671C22.002 20.061 20.072 22.001 16.672 22.001H7.33195C3.92195 22.001 2.00195 20.061 2.00195 16.671L2.00195 7.33098C2.00195 3.92098 3.92195 2.00098 7.33195 2.00098L16.662 2.00098ZM11.992 7.51098C11.532 7.51098 11.162 7.88098 11.162 8.34098V11.161H8.33195C8.11195 11.161 7.90195 11.251 7.74195 11.401C7.59195 11.561 7.50195 11.77 7.50195 11.991C7.50195 12.451 7.87195 12.821 8.33195 12.831H11.162V15.661C11.162 16.121 11.532 16.491 11.992 16.491C12.452 16.491 12.822 16.121 12.822 15.661V12.831H15.662C16.122 12.821 16.492 12.451 16.492 11.991C16.492 11.531 16.122 11.161 15.662 11.161H12.822V8.34098C12.822 7.88098 12.452 7.51098 11.992 7.51098Z'
      fill='currentColor'
    />
  </svg>
);

//

const linkedInIcon = (
  <svg
    width='31'
    height='32'
    viewBox='0 0 31 32'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M23.1311 21.2572C23.1311 21.9187 22.5942 22.4556 21.9327 22.4556C21.2712 22.4556 20.7343 21.9187 20.7343 21.2572V15.8083C20.7343 14.2041 19.4336 12.9002 17.8341 12.9002C16.2346 12.9002 14.9339 14.2041 14.9339 15.8083V21.2572C14.9339 21.9187 14.397 22.4556 13.7355 22.4556C13.074 22.4556 12.5371 21.9187 12.5371 21.2572V15.8083C12.5371 12.8826 14.9132 10.5033 17.8341 10.5033C20.7551 10.5033 23.1311 12.8826 23.1311 15.8083V21.2572ZM8.42889 12.0053C7.76737 12.0053 7.17295 11.4045 7.17295 10.743C7.17295 10.0815 7.76737 9.48066 8.42889 9.48066C9.09042 9.48066 9.68164 10.0815 9.68164 10.743C9.68164 11.4045 9.09042 12.0053 8.42889 12.0053ZM9.62572 21.2572C9.62572 21.9187 9.08882 22.4556 8.4273 22.4556C7.76577 22.4556 7.22888 21.9187 7.22888 21.2572V15.2315C7.22888 14.57 7.76577 14.0331 8.4273 14.0331C9.08882 14.0331 9.62572 14.57 9.62572 15.2315V21.2572ZM21.9183 0.820068H8.44168C3.39233 0.820068 0 4.37219 0 9.65643V22.3437C0 27.628 3.39233 31.1801 8.44168 31.1801H21.9167C26.9661 31.1801 30.36 27.628 30.36 22.3437V9.65643C30.36 4.37219 26.9677 0.820068 21.9183 0.820068Z'
      fill='#30303B'
    />
  </svg>
);

const instagramIcon = (
  <svg
    width='31'
    height='31'
    viewBox='0 0 31 31'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M22.9522 9.90192C22.0414 9.90192 21.2983 9.16369 21.2983 8.25769C21.2983 7.34848 22.0414 6.61026 22.9522 6.61026C23.863 6.61026 24.6044 7.34848 24.6044 8.25769C24.6044 9.16369 23.863 9.90192 22.9522 9.90192ZM14.9307 22.9583C11.1853 22.9583 8.13648 19.9127 8.13648 16.1673C8.13648 12.4218 11.1853 9.37621 14.9307 9.37621C18.6778 9.37621 21.725 12.4218 21.725 16.1673C21.725 19.9127 18.6778 22.9583 14.9307 22.9583ZM21.9183 0.459961H8.44008C3.39233 0.459961 0 4.01048 0 9.29632V21.9836C0 27.2679 3.39233 30.82 8.44008 30.82H21.9167C26.9661 30.82 30.36 27.2679 30.36 21.9836V9.29632C30.36 4.01048 26.9677 0.459961 21.9183 0.459961Z'
      fill='#30303B'
    />
  </svg>
);

const facebookIcon = (
  <svg
    width='31'
    height='31'
    viewBox='0 0 31 31'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M21.9183 0.100098H8.44008C3.39233 0.100098 0 3.65222 0 8.93645V21.6238C0 26.908 3.39233 30.4601 8.44008 30.4601H15.1225C15.1193 30.4266 15.1017 30.3962 15.1017 30.361V19.3835H13.2418C12.5802 19.3835 12.0433 18.8466 12.0433 18.1851C12.0433 17.5236 12.5802 16.9867 13.2418 16.9867H15.1017V15.0532C15.1017 11.907 17.6631 9.34871 20.811 9.34871H22.4153C23.0768 9.34871 23.6137 9.8856 23.6137 10.5471C23.6137 11.2087 23.0768 11.7456 22.4153 11.7456H20.811C18.9846 11.7456 17.4985 13.2284 17.4985 15.0532V16.9867H21.6499C22.3114 16.9867 22.8483 17.5236 22.8483 18.1851C22.8483 18.8466 22.3114 19.3835 21.6499 19.3835H17.4985V30.361C17.4985 30.3962 17.4826 30.4266 17.4794 30.4601H21.9167C26.9661 30.4601 30.36 26.908 30.36 21.6238V8.93645C30.36 3.65222 26.9677 0.100098 21.9183 0.100098Z'
      fill='#30303B'
    />
  </svg>
);

const youtubeIcon = (
  <svg
    width='31'
    height='32'
    viewBox='0 0 31 32'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M24.9306 30.5822C18.4515 31.2734 11.9172 31.2734 5.43813 30.5822C4.17995 30.4493 3.00532 29.8892 2.11007 28.9952C1.21483 28.1012 0.653062 26.9274 0.51843 25.6694C-0.17281 19.1903 -0.17281 12.656 0.51843 6.1769C0.651296 4.91872 1.21141 3.74409 2.1054 2.84884C2.99939 1.9536 4.17323 1.39183 5.43123 1.2572C11.9103 0.56596 18.4446 0.56596 24.9237 1.2572C26.1819 1.39007 27.3565 1.95018 28.2518 2.84417C29.147 3.73816 29.7088 4.912 29.8434 6.17C30.5347 12.6491 30.5347 19.1834 29.8434 25.6625C29.7106 26.9207 29.1504 28.0953 28.2565 28.9906C27.3625 29.8858 26.1886 30.4476 24.9306 30.5822Z'
      fill='#30303B'
    />
    <path
      d='M24.2235 11.3557C23.844 10.1879 22.5882 9.48066 21.4325 9.31851C17.2754 8.8769 13.0833 8.8769 8.92621 9.31851C7.77046 9.48066 6.5112 10.181 6.13515 11.3557C5.54349 14.3705 5.54349 17.4714 6.13515 20.4862C6.51465 21.6523 7.77046 22.3612 8.92621 22.5234C13.0833 22.965 17.2754 22.965 21.4325 22.5234C22.5882 22.3612 23.8475 21.6609 24.2235 20.4862C24.8152 17.4714 24.8152 14.3705 24.2235 11.3557ZM12.9092 19.5564V12.2838L18.8294 15.9201C16.8336 17.1466 14.8964 18.3351 12.9092 19.5564Z'
      fill='white'
    />
  </svg>
);

const xIcon = (
  <svg
    width='31'
    height='32'
    viewBox='0 0 31 32'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g clipPath='url(#clip0_9345_89310)'>
      <rect
        y='0.0839844'
        width='30.9524'
        height='30.9524'
        rx='9.52381'
        fill='white'
      />
      <path
        d='M8.84766 8.0271L20.2949 22.9939H22.0488L10.7319 8.0271H8.84766Z'
        fill='#30303B'
      />
      <path
        d='M0 0.0839844V31.0364H30.9524V0.0839844H0ZM19.4265 24.8872L14.4354 18.3678L8.73244 24.8872H5.5624L12.9562 16.4346L5.15873 6.23319H11.6871L16.1933 12.1928L21.4074 6.23319H24.5736L17.6596 14.1338L25.7936 24.8859L19.4265 24.8872Z'
        fill='#30303B'
      />
    </g>
    <defs>
      <clipPath id='clip0_9345_89310'>
        <rect
          y='0.0839844'
          width='30.9524'
          height='30.9524'
          rx='9.52381'
          fill='white'
        />
      </clipPath>
    </defs>
  </svg>
);

const tiktokIcon = (
  <svg
    width='31'
    height='32'
    viewBox='0 0 31 32'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g clipPath='url(#clip0_9345_89313)'>
      <rect
        y='0.723877'
        width='30.9524'
        height='30.9524'
        rx='9.52381'
        fill='white'
      />
      <path
        d='M28.7201 0.723877H2.23232C0.999363 0.723877 0 1.72324 0 2.9562V29.4439C0 30.6769 0.999363 31.6763 2.23232 31.6763H28.7201C29.953 31.6763 30.9524 30.6769 30.9524 29.4439V2.9562C30.9524 1.72324 29.953 0.723877 28.7201 0.723877ZM23.2292 12.5704V14.6628C22.2425 14.6632 21.2838 14.4699 20.3796 14.0884C19.7982 13.8429 19.2566 13.5266 18.7611 13.1445L18.776 19.5854C18.7698 21.0357 18.196 22.3984 17.1575 23.4248C16.3124 24.2603 15.2414 24.7916 14.0807 24.9635C13.808 25.0039 13.5304 25.0246 13.2497 25.0246C12.0072 25.0246 10.8275 24.6221 9.86257 23.8795C9.68096 23.7396 9.50734 23.5881 9.34194 23.4248C8.21647 22.3124 7.63611 20.8047 7.7338 19.2187C7.8084 18.0114 8.29173 16.86 9.09752 15.9575C10.1636 14.7633 11.6551 14.1004 13.2497 14.1004C13.5304 14.1004 13.808 14.1215 14.0807 14.1619V14.9356V17.0878C13.8222 17.0025 13.546 16.9556 13.2584 16.9556C11.8014 16.9556 10.6228 18.1443 10.6445 19.6022C10.6583 20.5351 11.1679 21.3506 11.9195 21.8C12.2727 22.0113 12.6791 22.1421 13.1127 22.166C13.4524 22.1846 13.7786 22.1373 14.0807 22.0376C15.1216 21.6937 15.8725 20.716 15.8725 19.5629L15.876 15.2497V7.3755H18.7577C18.7605 7.66102 18.7894 7.93965 18.8433 8.20958C19.0608 9.30228 19.6767 10.2503 20.5339 10.8966C21.2814 11.4604 22.2121 11.7946 23.221 11.7946C23.2217 11.7946 23.2299 11.7946 23.2293 11.7939L23.2292 12.5704Z'
        fill='#30303B'
      />
    </g>
    <defs>
      <clipPath id='clip0_9345_89313'>
        <rect
          y='0.723877'
          width='30.9524'
          height='30.9524'
          rx='9.52381'
          fill='white'
        />
      </clipPath>
    </defs>
  </svg>
);

const zoomIcon = (
  <svg
    width='32'
    height='32'
    viewBox='0 0 32 32'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M20.5488 16.776L22.9728 18.2624V13.832L20.5488 15.3184V16.776Z'
      fill='#30303B'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M25.3726 20.4063C25.3726 20.8399 25.1374 21.2399 24.7582 21.4527C24.5758 21.5551 24.3742 21.6063 24.1726 21.6063C23.955 21.6063 23.7374 21.5471 23.5454 21.4303L20.5486 19.5919V19.9903C20.5486 21.2607 19.515 22.2943 18.2462 22.2943H11.1006C8.635 22.2943 6.6286 20.2927 6.6286 17.8319V12.0879C6.6286 10.8174 7.6606 9.78224 8.9294 9.78224H16.075C17.9854 9.78224 19.6078 10.995 20.2478 12.6863L23.5454 10.6638C23.915 10.4398 24.379 10.4302 24.7582 10.6398C25.1374 10.8526 25.3726 11.2526 25.3726 11.6878V20.4063ZM22.747 0.839844H9.25101C4.1966 0.839844 0.799805 4.39504 0.799805 9.68784V22.3903C0.799805 27.6831 4.1966 31.2399 9.25101 31.2399H22.7454C27.803 31.2399 31.1998 27.6831 31.1998 22.3903V9.68784C31.1998 4.39504 27.803 0.839844 22.747 0.839844Z'
      fill='#30303B'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M18.1989 17.1628L18.1493 14.2636C18.1493 13.1164 17.2181 12.1836 16.0757 12.1836H9.0293V17.8316C9.0293 18.9692 9.9589 19.894 11.1013 19.894H18.2469L18.2101 17.7916C18.1477 17.5884 18.1461 17.3756 18.1989 17.1628Z'
      fill='#30303B'
    />
  </svg>
);

const calendarIcon = (
  <svg
    width='32'
    height='32'
    viewBox='0 0 31 32'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M0 8.62109C0 4.20282 3.58172 0.621094 8 0.621094H23C27.4183 0.621094 31 4.20282 31 8.62109V23.6211C31 28.0394 27.4183 31.6211 23 31.6211H8C3.58172 31.6211 0 28.0394 0 23.6211V8.62109Z'
      fill='#30303B'
    />
    <g clipPath='url(#clip0_20623_32250)'>
      <path
        d='M7.48828 13.2852H23.5298'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M19.1445 6.62109V9.58283'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M11.873 6.62109V9.58283'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M19.3184 8.04297H11.698C9.05446 8.04297 7.4043 9.51508 7.4043 12.2209V20.3667C7.4043 23.1154 9.05446 24.6215 11.698 24.6215H19.3106C21.962 24.6215 23.6044 23.1416 23.6044 20.4348V12.2209C23.6121 9.51508 21.9698 8.04297 19.3184 8.04297Z'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M15.5376 20.543H11.9629'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M19.0475 17.2891H15.4727'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
    <defs>
      <clipPath id='clip0_20623_32250'>
        <rect
          width='19'
          height='20'
          fill='white'
          transform='translate(6 5.62109)'
        />
      </clipPath>
    </defs>
  </svg>
);

//

const zoomInputIcon = (
  <svg
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M2.5 5.08933V11.2692C2.5 13.0548 3.94612 14.5009 5.73167 14.5009H12.7855C13.387 14.5009 13.8748 14.0131 13.8748 13.4116V7.23168C13.8748 5.4477 12.4287 4 10.6431 4H3.58933C2.98782 4 2.5 4.48783 2.5 5.08933Z'
      stroke='#575759'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M14 8L16.5316 6.02373C17.1759 5.42921 18.2492 5.86689 18.2492 6.72415V12.0026C18.2492 12.8599 17.1759 13.2976 16.5316 12.7031L14 10.5'
      stroke='#575759'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
