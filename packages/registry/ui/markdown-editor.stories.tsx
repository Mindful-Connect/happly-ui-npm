'use client';

import * as React from 'react';
import * as MarkdownEditor from './markdown-editor';
import * as FormField from './form-field';

export default { title: 'Form/Markdown Editor' };

const LANG_ITEMS = [
  { value: 'english', label: 'English' },
  { value: 'french', label: 'French' },
];

export const Default = {
  render: () => (
    <div className='w-full min-w-[560px]'>
      <MarkdownEditor.Composed
        placeholder='Describe your ideal successor and transition structure...'
      />
    </div>
  ),
};

export const WithToggle = {
  render: () => (
    <div className='w-full min-w-[560px]'>
      <MarkdownEditor.Composed
        placeholder='Describe your ideal successor and transition structure...'
        toggleItems={LANG_ITEMS}
        defaultToggleValue='english'
      />
    </div>
  ),
};

function ControlledToggleRender() {
  const [lang, setLang] = React.useState('english');
  const [values, setValues] = React.useState({
    english: '',
    french: '',
  });

  return (
    <div className='w-full min-w-[560px]'>
      <MarkdownEditor.Composed
        placeholder={
          lang === 'english'
            ? 'Write in English...'
            : 'Écrivez en français...'
        }
        toggleItems={LANG_ITEMS}
        toggleValue={lang}
        onToggleChange={setLang}
        value={values[lang as keyof typeof values]}
        onChange={(html) =>
          setValues((prev) => ({ ...prev, [lang]: html }))
        }
      />
    </div>
  );
}

export const ControlledToggle = {
  render: () => <ControlledToggleRender />,
};

function CompoundRender() {
  const editor = MarkdownEditor.useMarkdownEditorState({
    placeholder: 'Write something with custom toolbar...',
  });

  return (
    <div className='w-full min-w-[560px]'>
      <MarkdownEditor.Root editor={editor}>
        <MarkdownEditor.Toolbar>
          <MarkdownEditor.DefaultToolbar />
          <MarkdownEditor.Toggle
            items={LANG_ITEMS}
            defaultValue='english'
          />
        </MarkdownEditor.Toolbar>
        <MarkdownEditor.Content />
      </MarkdownEditor.Root>
    </div>
  );
}

export const Compound = {
  render: () => <CompoundRender />,
};

export const WithFormField = {
  render: () => (
    <div className='w-full min-w-[560px]'>
      <FormField.Root
        label='Business Description'
        htmlFor='description'
        required
        hint='Describe your business in detail.'
      >
        <MarkdownEditor.Composed
          id='description'
          placeholder='Describe your ideal successor and transition structure...'
          toggleItems={LANG_ITEMS}
          defaultToggleValue='english'
        />
      </FormField.Root>
    </div>
  ),
};

export const WithError = {
  render: () => (
    <div className='w-full min-w-[560px]'>
      <FormField.Root
        label='Business Description'
        htmlFor='description'
        required
        error='This field is required.'
      >
        <MarkdownEditor.Composed
          id='description'
          hasError
          placeholder='Describe your ideal successor and transition structure...'
          toggleItems={LANG_ITEMS}
          defaultToggleValue='english'
        />
      </FormField.Root>
    </div>
  ),
};

export const Disabled = {
  render: () => (
    <div className='w-full min-w-[560px]'>
      <FormField.Root
        label='Business Description'
        htmlFor='description'
        disabled
      >
        <MarkdownEditor.Composed
          id='description'
          disabled
          placeholder='Describe your ideal successor and transition structure...'
          toggleItems={LANG_ITEMS}
          defaultToggleValue='english'
        />
      </FormField.Root>
    </div>
  ),
};

function WithDefaultContentRender() {
  return (
    <div className='w-full min-w-[560px]'>
      <MarkdownEditor.Composed
        defaultValue='<p>This is <strong>bold</strong> and <em>italic</em> text.</p><ul data-type="taskList"><li data-type="taskItem" data-checked="true"><label><input type="checkbox" checked><span></span></label><div>Completed task</div></li><li data-type="taskItem" data-checked="false"><label><input type="checkbox"><span></span></label><div>Pending task</div></li></ul>'
        placeholder='Start editing...'
        toggleItems={LANG_ITEMS}
        defaultToggleValue='english'
      />
    </div>
  );
}

export const WithDefaultContent = {
  render: () => <WithDefaultContentRender />,
};
