'use client';

import * as React from 'react';
import * as MarkdownEditor from './markdown-editor';
import * as FormField from './form-field';

export default { title: 'Form/Markdown Editor' };

// ---------------------------------------------------------------------------
// Default — shows English/French toggle, manages {en: "", fr: ""} internally
// ---------------------------------------------------------------------------

export const Default = {
  render: () => (
    <div className='w-full min-w-[560px]'>
      <MarkdownEditor.Composed placeholder='Describe your ideal successor and transition structure…' />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Single language — no toggle, value is a plain string
// ---------------------------------------------------------------------------

export const SingleLanguage = {
  render: () => (
    <div className='w-full min-w-[560px]'>
      <MarkdownEditor.Composed
        toggleItems={false}
        placeholder='Write in a single language…'
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Controlled multi-language — parent owns the {en, fr} object
// ---------------------------------------------------------------------------

function ControlledMultiRender() {
  const [values, setValues] = React.useState<MarkdownEditor.LocalizedValue>({
    en: 'Hello **world**',
    fr: 'Bonjour **le monde**',
  });

  return (
    <div className='w-full min-w-[560px] space-y-4'>
      <MarkdownEditor.Composed
        placeholder='Write here…'
        value={values}
        onChange={setValues}
      />
      <pre className='bg-bg-soft-200 text-paragraph-xs rounded-lg p-3'>
        {JSON.stringify(values, null, 2)}
      </pre>
    </div>
  );
}

export const ControlledMulti = {
  render: () => <ControlledMultiRender />,
};

// ---------------------------------------------------------------------------
// Custom toggle items
// ---------------------------------------------------------------------------

export const CustomToggle = {
  render: () => (
    <div className='w-full min-w-[560px]'>
      <MarkdownEditor.Composed
        placeholder='Editor with custom toggle items…'
        toggleItems={[
          { value: 'en', label: 'EN' },
          { value: 'fr', label: 'FR' },
          { value: 'es', label: 'ES' },
        ]}
        defaultToggleValue='en'
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Flag toggle (compact)
// ---------------------------------------------------------------------------

export const FlagToggle = {
  render: () => (
    <div className='w-full min-w-[560px]'>
      <MarkdownEditor.Composed
        placeholder='Editor with flag-only language toggle…'
        toggleItems={MarkdownEditor.DEFAULT_FLAG_TOGGLE_ITEMS}
        defaultToggleValue='en'
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Compound (manual wiring)
// ---------------------------------------------------------------------------

function CompoundRender() {
  const [previewing, setPreviewing] = React.useState(false);
  const [value, setValue] = React.useState('');
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const format = MarkdownEditor.useMarkdownFormatting(textareaRef, setValue);

  return (
    <div className='w-full min-w-[560px]'>
      <MarkdownEditor.Root previewing={previewing}>
        <MarkdownEditor.Toolbar>
          <MarkdownEditor.ToolbarGroup>
            <MarkdownEditor.ToolbarButton
              onClick={() => format('bold')}
              aria-label='Bold'
              disabled={previewing}
            >
              B
            </MarkdownEditor.ToolbarButton>
            <MarkdownEditor.ToolbarButton
              onClick={() => format('italic')}
              aria-label='Italic'
              disabled={previewing}
            >
              I
            </MarkdownEditor.ToolbarButton>
            <MarkdownEditor.ToolbarButton
              onClick={() => setPreviewing((p) => !p)}
              active={previewing}
              aria-label={previewing ? 'Edit' : 'Preview'}
            >
              {previewing ? '✏️' : '👁'}
            </MarkdownEditor.ToolbarButton>
          </MarkdownEditor.ToolbarGroup>
          <MarkdownEditor.Toggle
            items={MarkdownEditor.DEFAULT_TOGGLE_ITEMS}
            defaultValue='en'
          />
        </MarkdownEditor.Toolbar>
        <MarkdownEditor.Content
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='Write something with custom toolbar…'
        />
      </MarkdownEditor.Root>
    </div>
  );
}

export const Compound = {
  render: () => <CompoundRender />,
};

// ---------------------------------------------------------------------------
// With FormField
// ---------------------------------------------------------------------------

export const WithFormField = {
  render: () => (
    <div className='w-full min-w-[560px]'>
      <FormField.Root
        label='Business description'
        htmlFor='description'
        required
        hint='Describe your business in detail.'
      >
        <MarkdownEditor.Composed
          id='description'
          placeholder='Describe your ideal successor and transition structure…'
        />
      </FormField.Root>
    </div>
  ),
};

export const WithError = {
  render: () => (
    <div className='w-full min-w-[560px]'>
      <FormField.Root
        label='Business description'
        htmlFor='description'
        required
        error='Add a description to continue.'
      >
        <MarkdownEditor.Composed
          id='description'
          hasError
          placeholder='Describe your ideal successor and transition structure…'
        />
      </FormField.Root>
    </div>
  ),
};

export const Disabled = {
  render: () => (
    <div className='w-full min-w-[560px]'>
      <FormField.Root
        label='Business description'
        htmlFor='description'
        disabled
      >
        <MarkdownEditor.Composed
          id='description'
          disabled
          placeholder='Describe your ideal successor and transition structure…'
        />
      </FormField.Root>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With default content (preview all markdown features)
// ---------------------------------------------------------------------------

function WithDefaultContentRender() {
  const defaultValues = {
    en: `# Heading 1
## Heading 2

This is **bold**, _italic_, and ~~strikethrough~~ text.

- [x] Completed task
- [ ] Pending task

1. First item
2. Second item
3. Third item

- Bullet one
- Bullet two

> This is a blockquote

\`inline code\` and a [link](https://example.com)

\`\`\`
code block
\`\`\``,
    fr: `# Titre 1

Ceci est du texte en **gras** et en _italique_.

1. Premier élément
2. Deuxième élément`,
  };

  return (
    <div className='w-full min-w-[560px]'>
      <MarkdownEditor.Composed
        defaultValue={defaultValues}
        placeholder='Start editing…'
      />
    </div>
  );
}

export const WithDefaultContent = {
  render: () => <WithDefaultContentRender />,
};
