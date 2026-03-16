import React, { useState } from 'react';
import {
  RiCalendarTodoLine,
  RiCheckLine,
  RiCloseLine,
  RiFacebookCircleFill,
  RiInstagramLine,
  RiLinkM,
  RiLinkedinFill,
  RiTiktokFill,
  RiTwitterXLine,
  RiVideoChatLine,
  RiYoutubeFill,
} from '@remixicon/react';

import * as Button from '@/components/ui/button';
import * as ComboBox from '@/components/ui/combo-box';
import * as Hint from '@/components/ui/hint';
import * as Input from '@/components/ui/input';
import * as Tag from '@/components/ui/tag';

// ─── Types ───────────────────────────────────────────────────────────

export type SocialKey =
  | 'linkedin'
  | 'instagram'
  | 'facebook'
  | 'youtube'
  | 'x-twitter'
  | 'tiktok'
  | 'zoom'
  | 'calendar';

export interface SocialsInputLabels {
  placeholder: string;
  errorUrl: string;
  errorCalendarUrl: string;
  errorZoomUrl: string;
}

export interface SocialsInputProps {
  /** Field name for form integration */
  name: string;
  /** Whether the input is read-only */
  readOnly?: boolean;
  /** External error state (e.g. from form validation) */
  hasError?: boolean;
  /** Social platforms to show. Defaults to 6 main socials. Pass null for all. */
  availableSocials?: SocialKey[] | null;
  /** Current form values: social key → URL */
  formValue: Partial<Record<SocialKey, string>>;
  /** Setter for the form values */
  setFormValue: (value: Partial<Record<SocialKey, string>>) => void;
  /** Override labels for i18n */
  labels?: Partial<SocialsInputLabels>;
}

// ─── Social Platform Config ──────────────────────────────────────────

interface SocialConfig {
  key: SocialKey;
  label: string;
  icon: React.ElementType;
  inputPlaceholder: string;
  domains: string[];
  extractHandle: (url: string) => string;
  generateUrl: (handle: string) => string;
}

const SOCIAL_CONFIGS: Record<SocialKey, SocialConfig> = {
  instagram: {
    key: 'instagram',
    label: 'Instagram',
    icon: RiInstagramLine,
    inputPlaceholder: 'instagram.com/',
    domains: ['/instagram.com', '.instagram.com'],
    extractHandle: (url) => {
      const match = url.match(/instagram\.com\/([^/?#]+)/);
      return match ? `@${match[1]}` : url;
    },
    generateUrl: (text) => {
      const username = text.startsWith('@') ? text.substring(1) : text;
      return username ? `https://instagram.com/${username}` : '';
    },
  },
  'x-twitter': {
    key: 'x-twitter',
    label: 'X (Twitter)',
    icon: RiTwitterXLine,
    inputPlaceholder: 'x.com/',
    domains: ['/twitter.com', '.twitter.com', '/x.com', '.x.com'],
    extractHandle: (url) => {
      const match = url.match(/(?:x|twitter)\.com\/([^/?#]+)/);
      return match ? `@${match[1]}` : url;
    },
    generateUrl: (text) => {
      const username = text.startsWith('@') ? text.substring(1) : text;
      return username ? `https://x.com/${username}` : '';
    },
  },
  linkedin: {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: RiLinkedinFill,
    inputPlaceholder: 'linkedin.com/in/',
    domains: ['/linkedin.com', '.linkedin.com'],
    extractHandle: (url) => {
      const match = url.match(/linkedin\.com\/in\/([^/?#]+)/);
      if (!match) return url;
      return match[1]
        .split('-')
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ');
    },
    generateUrl: (text) => {
      const username = text.startsWith('@') ? text.substring(1) : text;
      return username ? `https://linkedin.com/in/${username}` : '';
    },
  },
  facebook: {
    key: 'facebook',
    label: 'Facebook',
    icon: RiFacebookCircleFill,
    inputPlaceholder: 'facebook.com/',
    domains: ['/facebook.com', '.facebook.com'],
    extractHandle: (url) => {
      const match = url.match(/facebook\.com\/([^/?#]+)/);
      if (!match) return url;
      return match[1]
        .split('.')
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ');
    },
    generateUrl: (text) => {
      const username = text.startsWith('@') ? text.substring(1) : text;
      return username ? `https://facebook.com/${username}` : '';
    },
  },
  youtube: {
    key: 'youtube',
    label: 'YouTube',
    icon: RiYoutubeFill,
    inputPlaceholder: 'youtube.com/@',
    domains: ['/youtube.com', '.youtube.com'],
    extractHandle: (url) => {
      const match = url.match(/youtube\.com\/(@?[^/?#]+)/);
      return match
        ? match[1].startsWith('@')
          ? match[1]
          : `@${match[1]}`
        : url;
    },
    generateUrl: (text) => {
      const username = text.startsWith('@') ? text : `@${text}`;
      return `https://youtube.com/${username}`;
    },
  },
  tiktok: {
    key: 'tiktok',
    label: 'TikTok',
    icon: RiTiktokFill,
    inputPlaceholder: 'tiktok.com/@',
    domains: ['/tiktok.com', '.tiktok.com'],
    extractHandle: (url) => {
      const match = url.match(/tiktok\.com\/(@?[^/?#]+)/);
      return match
        ? match[1].startsWith('@')
          ? match[1]
          : `@${match[1]}`
        : url;
    },
    generateUrl: (text) => {
      const username = text.startsWith('@') ? text : `@${text}`;
      return `https://tiktok.com/${username}`;
    },
  },
  zoom: {
    key: 'zoom',
    label: 'Zoom',
    icon: RiVideoChatLine,
    inputPlaceholder: 'zoom.us/',
    domains: ['/zoom.us', '.zoom.us'],
    extractHandle: (url) => {
      try {
        return new URL(url).hostname;
      } catch {
        return url;
      }
    },
    generateUrl: (text) => text,
  },
  calendar: {
    key: 'calendar',
    label: 'Calendar',
    icon: RiCalendarTodoLine,
    inputPlaceholder: 'calendly.com/...',
    domains: [],
    extractHandle: (url) => {
      try {
        return new URL(url).hostname;
      } catch {
        return url;
      }
    },
    generateUrl: (text) => text,
  },
};

const DEFAULT_SOCIALS: SocialKey[] = [
  'instagram',
  'x-twitter',
  'linkedin',
  'facebook',
  'youtube',
  'tiktok',
];

const DEFAULT_LABELS: SocialsInputLabels = {
  placeholder: 'Choose the social media...',
  errorUrl: 'Please enter a valid URL',
  errorCalendarUrl: 'Please enter a valid calendar URL',
  errorZoomUrl: 'Please enter a valid Zoom URL',
};

// ─── Validation ──────────────────────────────────────────────────────

const URL_REGEX =
  /^(?:https:\/\/|zoommtg:\/\/)[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/;

function validateURL(value: string) {
  return URL_REGEX.test(value);
}

function getErrorMessage(key: SocialKey, labels: SocialsInputLabels) {
  if (key === 'calendar') return labels.errorCalendarUrl;
  if (key === 'zoom') return labels.errorZoomUrl;
  return labels.errorUrl;
}

// ─── Picker Items ────────────────────────────────────────────────────

function SocialPickerItems() {
  const ctx = ComboBox.useComboBoxContext();

  if (ctx.filteredOptions.length === 0) {
    return <ComboBox.Empty>No matching platforms.</ComboBox.Empty>;
  }

  return (
    <div className='flex flex-col gap-1'>
      {ctx.filteredOptions.map((option) => (
        <ComboBox.Item
          key={option.value}
          value={option.value}
          showIndicator={false}
        />
      ))}
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────

export default function SocialsInput({
  name,
  readOnly = false,
  hasError: hasErrorProp,
  availableSocials,
  formValue,
  setFormValue,
  labels: labelsProp,
}: SocialsInputProps) {
  const labels = { ...DEFAULT_LABELS, ...labelsProp };

  const [editingKey, setEditingKey] = useState<SocialKey | null>(null);
  const [editValue, setEditValue] = useState('');
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  // Error state: external prop or any internal validation error
  const hasInternalError = Object.values(errors).some(Boolean);
  const hasError = hasErrorProp || hasInternalError;

  // Resolve which socials to show
  const effectiveSocials =
    availableSocials === null
      ? (Object.keys(SOCIAL_CONFIGS) as SocialKey[])
      : (availableSocials ?? DEFAULT_SOCIALS);

  const socials = effectiveSocials
    .filter((key) => SOCIAL_CONFIGS[key])
    .map((key) => SOCIAL_CONFIGS[key]);

  // Keys already in formValue that map to a known social config
  const addedKeys = (Object.keys(formValue) as SocialKey[]).filter(
    (key) => key in SOCIAL_CONFIGS,
  );

  // Socials not yet added — these are the ComboBox options
  const remainingOptions = socials.filter(
    (s) => !addedKeys.includes(s.key),
  );

  // Saved socials (have a non-empty URL)
  const savedEntries = addedKeys.filter(
    (key) => formValue[key] && SOCIAL_CONFIGS[key],
  );

  // ComboBox options — only platforms not yet added
  const comboBoxOptions = remainingOptions.map((s) => ({
    value: s.key,
    label: s.label,
    icon: s.icon,
  }));

  // ─── Handlers ────────────────────────────────────────────────────

  function processAndSave(key: SocialKey, rawInput: string): boolean {
    const config = SOCIAL_CONFIGS[key];
    const errorKey = `${name}.${key}`;
    const value = rawInput.trim();

    if (!value || value.includes(' ')) {
      setErrors((prev) => ({
        ...prev,
        [errorKey]: getErrorMessage(key, labels),
      }));
      return false;
    }

    let url: string;

    if (
      value.startsWith('https://') ||
      value.startsWith('http://') ||
      value.startsWith('zoommtg://')
    ) {
      url = value;
    } else if (value.includes('.')) {
      url = `https://${value}`;
    } else if (key === 'calendar' || key === 'zoom') {
      url = `https://${value}`;
    } else {
      url = config.generateUrl(value);
    }

    if (!validateURL(url)) {
      setErrors((prev) => ({
        ...prev,
        [errorKey]: getErrorMessage(key, labels),
      }));
      return false;
    }

    if (key !== 'calendar') {
      const isValidDomain = config.domains.some((domain) =>
        url.includes(domain),
      );
      if (!isValidDomain) {
        setErrors((prev) => ({
          ...prev,
          [errorKey]: getErrorMessage(key, labels),
        }));
        return false;
      }
    }

    setErrors((prev) => {
      const next = { ...prev };
      delete next[errorKey];
      return next;
    });
    setFormValue({ ...formValue, [key]: url });
    return true;
  }

  function handleSelectSocial(key: SocialKey) {
    if (readOnly) return;

    // If already editing another social with no value, remove it
    if (editingKey && !formValue[editingKey]) {
      const newValue = { ...formValue };
      delete newValue[editingKey];
      setFormValue({ ...newValue, [key]: '' });
    } else if (!formValue[key]) {
      setFormValue({ ...formValue, [key]: '' });
    }

    // Clear previous editing errors
    if (editingKey) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[`${name}.${editingKey}`];
        return next;
      });
    }

    setEditingKey(key);
    setEditValue('');
  }

  function handleComboBoxValueChange(values: string[]) {
    const newKey = values.find(
      (v) => !addedKeys.includes(v as SocialKey),
    ) as SocialKey | undefined;
    if (newKey) {
      handleSelectSocial(newKey);
    }
  }

  function handleConfirmEdit() {
    if (!editingKey) return;

    if (!editValue.trim()) {
      handleRemoveSocial(editingKey);
      return;
    }

    if (processAndSave(editingKey, editValue)) {
      setEditingKey(null);
      setEditValue('');
    }
  }

  function handleCancelEdit() {
    if (!editingKey) return;

    setErrors((prev) => {
      const next = { ...prev };
      delete next[`${name}.${editingKey}`];
      return next;
    });

    if (!formValue[editingKey]) {
      const newValue = { ...formValue };
      delete newValue[editingKey];
      setFormValue(newValue);
    }

    setEditingKey(null);
    setEditValue('');
  }

  function handleRemoveSocial(key: SocialKey) {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[`${name}.${key}`];
      return next;
    });

    const newValue = { ...formValue };
    delete newValue[key];
    setFormValue(newValue);

    if (editingKey === key) {
      setEditingKey(null);
      setEditValue('');
    }
  }

  function handleInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleConfirmEdit();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      handleCancelEdit();
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const text = e.clipboardData.getData('text').trim();
    if (!text) return;
    // Strip protocol for display since https:// is shown as a visual prefix
    setEditValue(text.replace(/^https?:\/\//, ''));
  }

  function handleInputChange(value: string) {
    setEditValue(value.replace(/^https?:\/\//, ''));
  }

  // ─── Render ──────────────────────────────────────────────────────

  return (
    <div className='flex flex-col gap-3'>
      {/* Social Platform Picker */}
      <ComboBox.Root
        options={comboBoxOptions}
        value={[]}
        onValueChange={handleComboBoxValueChange}
        disabled={readOnly || remainingOptions.length === 0}
        hasError={hasError}
      >
        <ComboBox.SearchTrigger
          leadingIcon={RiLinkM}
          placeholder={labels.placeholder}
        />
        <ComboBox.Content>
          <SocialPickerItems />
        </ComboBox.Content>
      </ComboBox.Root>

      {/* Tags */}
      {savedEntries.length > 0 && (
        <div className='flex flex-wrap gap-1.5'>
          {savedEntries.map((key) => {
            const config = SOCIAL_CONFIGS[key];
            const displayName = config.extractHandle(formValue[key]!);
            return (
              <Tag.Root key={key} variant='gray' disabled={readOnly}>
                <Tag.Icon as={config.icon} />
                <span>{displayName}</span>
                {!readOnly && (
                  <Tag.DismissButton
                    onClick={() => handleRemoveSocial(key)}
                  />
                )}
              </Tag.Root>
            );
          })}
        </div>
      )}

      {/* Editing Input */}
      {editingKey && !readOnly && (
        <div className='flex flex-col gap-1'>
          <div className='flex gap-2'>
            <Input.Root
              hasError={!!errors[`${name}.${editingKey}`]}
              className='flex-1'
            >
              <Input.Affix>
                <Input.Icon as={SOCIAL_CONFIGS[editingKey].icon} /></Input.Affix>
              <Input.Wrapper>
                <Input.Input
                  autoFocus
                  spellCheck={false}
                  placeholder={SOCIAL_CONFIGS[editingKey].inputPlaceholder}
                  value={editValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  onPaste={handlePaste}
                />
                <button
                  type='button'
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleConfirmEdit}
                  className='shrink-0 text-text-sub-600 transition duration-200 ease-out hover:text-success-base'
                >
                  <RiCheckLine className='w-5 h-5' />
                </button>
              </Input.Wrapper>
            </Input.Root>

            <Button.Root
              variant='error'
              mode='lighter'
              size='medium'
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleCancelEdit}
              className='shrink-0 px-0 w-10'
            >
              <Button.Icon as={RiCloseLine} />
            </Button.Root>
          </div>

          {errors[`${name}.${editingKey}`] && (
            <Hint.Root hasError>
              {errors[`${name}.${editingKey}`]}
            </Hint.Root>
          )}
        </div>
      )}
    </div>
  );
}
