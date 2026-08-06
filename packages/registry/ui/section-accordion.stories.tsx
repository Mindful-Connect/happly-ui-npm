import * as React from 'react';
import {
  RiCheckboxCircleFill,
  RiFileTextFill,
  RiQuestionFill,
  RiVideoFill,
  RiVolumeUpFill,
} from '@remixicon/react';

import * as SectionAccordion from './section-accordion';

export default {
  title: 'UI/Section Accordion',
  component: SectionAccordion.Root,
};

// --- Example lesson row used inside a section's content ---------------------

type LessonKind = 'video' | 'reading' | 'audio' | 'assignment' | 'quiz';

const LESSON_META: Record<
  LessonKind,
  { icon: React.ElementType; iconBg: string; iconColor: string; label: string }
> = {
  video: {
    icon: RiVideoFill,
    iconBg: 'bg-error-light',
    iconColor: 'text-error-base',
    label: 'Video',
  },
  reading: {
    icon: RiFileTextFill,
    iconBg: 'bg-faded-light',
    iconColor: 'text-faded-base',
    label: 'Reading',
  },
  audio: {
    icon: RiVolumeUpFill,
    iconBg: 'bg-information-light',
    iconColor: 'text-information-base',
    label: 'Audio',
  },
  assignment: {
    icon: RiCheckboxCircleFill,
    iconBg: 'bg-away-light',
    iconColor: 'text-away-base',
    label: 'Assignment',
  },
  quiz: {
    icon: RiQuestionFill,
    iconBg: 'bg-feature-light',
    iconColor: 'text-feature-base',
    label: 'Quiz',
  },
};

function Lesson({
  kind,
  title,
  duration,
}: {
  kind: LessonKind;
  title: string;
  duration?: string;
}) {
  const meta = LESSON_META[kind];
  const Icon = meta.icon;

  return (
    <button
      type='button'
      className='bg-bg-white-0 border-stroke-soft-200 shadow-regular-xs flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition duration-200 ease-out hover:bg-bg-weak-50'
    >
      <span
        className={`flex size-8 shrink-0 items-center justify-center rounded-full ${meta.iconBg}`}
      >
        <Icon className={`size-5 ${meta.iconColor}`} />
      </span>
      <span className='flex min-w-0 flex-col gap-1'>
        <span className='text-paragraph-sm text-text-strong-950 truncate'>
          {title}
        </span>
        <span className='text-paragraph-xs text-text-sub-600 flex items-center gap-1.5'>
          {meta.label}
          {duration && (
            <>
              <span className='bg-bg-soft-200 size-1 rounded-full' />
              {duration}
            </>
          )}
        </span>
      </span>
    </button>
  );
}

// --- Data -------------------------------------------------------------------

const sections = [
  {
    value: 'welcome',
    title: 'Welcome & Foundations',
    description: '2 Lessons',
    lessons: (
      <>
        <Lesson kind='video' title='Course overview' duration='4m 30s' />
        <Lesson kind='reading' title='How to use this course' />
      </>
    ),
  },
  {
    value: 'idea-validation',
    title: 'Idea Validation & Market Research',
    description: '8 Lessons',
    lessons: (
      <>
        <Lesson
          kind='video'
          title='Finding and defining a real problem'
          duration='15m 5s'
        />
        <Lesson
          kind='video'
          title='Identifying your target audience'
          duration='18m'
        />
        <Lesson kind='reading' title='Market research basics (simple methods)' />
        <Lesson kind='reading' title='Competitor analysis (what to look for)' />
        <Lesson
          kind='video'
          title='Defining your value proposition'
          duration='15m 5s'
        />
        <Lesson
          kind='audio'
          title='Customer interviews (how to ask the right questions)'
          duration='1h 55m 5s'
        />
        <Lesson kind='assignment' title='Validating demand before building' />
        <Lesson kind='quiz' title='Refining your idea based on feedback' />
      </>
    ),
  },
  {
    value: 'business-model',
    title: 'Business Model & Strategy',
    description: '8 Lessons',
    lessons: (
      <>
        <Lesson kind='video' title='Choosing a business model' duration='12m' />
        <Lesson kind='reading' title='Pricing strategy essentials' />
      </>
    ),
  },
  {
    value: 'mvp',
    title: 'Building Your Product (MVP)',
    description: '7 Lessons',
    lessons: (
      <>
        <Lesson kind='video' title='Scoping your MVP' duration='9m 40s' />
        <Lesson kind='assignment' title='Ship your first prototype' />
      </>
    ),
  },
  {
    value: 'launch',
    title: 'Launch & Go-to-Market',
    description: '5 Lessons',
    disabled: true,
    lessons: <Lesson kind='reading' title='Planning your launch' />,
  },
];

// --- Stories ----------------------------------------------------------------

/**
 * The full sectioned accordion. Only one section can be open at a time —
 * opening a closed section automatically closes the open one. The last
 * section is disabled.
 */
export const Default = {
  render: () => (
    <div className='mx-auto w-full max-w-2xl'>
      <SectionAccordion.Root defaultValue='idea-validation'>
        {sections.map((section) => (
          <SectionAccordion.Item
            key={section.value}
            value={section.value}
            disabled={section.disabled}
          >
            <SectionAccordion.Header>
              <SectionAccordion.Trigger>
                <SectionAccordion.Heading>
                  <SectionAccordion.Title>
                    {section.title}
                  </SectionAccordion.Title>
                  <SectionAccordion.Description>
                    {section.description}
                  </SectionAccordion.Description>
                </SectionAccordion.Heading>
                <SectionAccordion.Chevron />
              </SectionAccordion.Trigger>
            </SectionAccordion.Header>
            <SectionAccordion.Content>
              {section.lessons}
            </SectionAccordion.Content>
          </SectionAccordion.Item>
        ))}
      </SectionAccordion.Root>
    </div>
  ),
};

/**
 * The composed `SectionAccordion.Group` renders sections from an array of
 * items — the quickest way to use the component.
 */
export const Group = {
  render: () => (
    <div className='mx-auto w-full max-w-2xl'>
      <SectionAccordion.Group
        defaultValue='idea-validation'
        items={sections.map((section) => ({
          value: section.value,
          title: section.title,
          description: section.description,
          disabled: section.disabled,
          content: section.lessons,
        }))}
      />
    </div>
  ),
};

/**
 * Content can be anything — here plain text instead of lesson rows.
 */
export const ArbitraryContent = {
  render: () => (
    <div className='mx-auto w-full max-w-2xl'>
      <SectionAccordion.Group
        defaultValue='overview'
        items={[
          {
            value: 'overview',
            title: 'Overview',
            description: 'Getting started',
            content: (
              <p className='text-paragraph-sm text-text-sub-600 px-1'>
                Any React node can go here — cards, forms, lists, or plain text.
              </p>
            ),
          },
          {
            value: 'details',
            title: 'Details',
            description: 'The fine print',
            content: (
              <p className='text-paragraph-sm text-text-sub-600 px-1'>
                Only one section is open at a time.
              </p>
            ),
          },
          {
            value: 'locked',
            title: 'Locked section',
            description: 'Unavailable',
            disabled: true,
            content: null,
          },
        ]}
      />
    </div>
  ),
};
