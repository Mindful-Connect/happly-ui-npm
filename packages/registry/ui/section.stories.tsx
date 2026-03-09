import * as Section from './section';

export default { title: 'Sections/Section', component: Section.Root };

export const Playground = {
  args: {
    title: 'Section Title',
    description: 'This is a description for the section.',
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
  render: (args: any) => (
    <Section.Root className='w-full'>
      <Section.Header>
        <Section.Title>{args.title}</Section.Title>
        <Section.Description>{args.description}</Section.Description>
      </Section.Header>
      <Section.Content>
        <div className='h-10 rounded-[10px] border border-stroke-soft-200 bg-bg-white-0 px-3 py-2.5 text-paragraph-sm text-text-soft-400 shadow-regular-xs'>
          Content field 1
        </div>
        <div className='h-10 rounded-[10px] border border-stroke-soft-200 bg-bg-white-0 px-3 py-2.5 text-paragraph-sm text-text-soft-400 shadow-regular-xs'>
          Content field 2
        </div>
      </Section.Content>
    </Section.Root>
  ),
};

export const Default = {
  render: () => (
    <Section.Root className='w-full'>
      <Section.Header>
        <Section.Title>Enter your business details</Section.Title>
        <Section.Description>
          Share the key details about your business so buyers can understand the
          opportunity.
        </Section.Description>
      </Section.Header>
      <Section.Content>
        <div className='h-10 rounded-[10px] border border-stroke-soft-200 bg-bg-white-0 px-3 py-2.5 text-paragraph-sm text-text-soft-400 shadow-regular-xs'>
          E.g., Prairie Coffee Co.
        </div>
        <div className='h-10 rounded-[10px] border border-stroke-soft-200 bg-bg-white-0 px-3 py-2.5 text-paragraph-sm text-text-soft-400 shadow-regular-xs'>
          Select a category
        </div>
        <div className='h-10 rounded-[10px] border border-stroke-soft-200 bg-bg-white-0 px-3 py-2.5 text-paragraph-sm text-text-soft-400 shadow-regular-xs'>
          Where is the business located?
        </div>
        <div className='h-10 rounded-[10px] border border-stroke-soft-200 bg-bg-white-0 px-3 py-2.5 text-paragraph-sm text-text-soft-400 shadow-regular-xs'>
          What year was the business founded?
        </div>
      </Section.Content>
    </Section.Root>
  ),
};

export const WithCustomHeaderWidth = {
  render: () => (
    <Section.Root className='w-full'>
      <Section.Header className='w-[200px]'>
        <Section.Title>Short header</Section.Title>
        <Section.Description>Narrower left column.</Section.Description>
      </Section.Header>
      <Section.Content>
        <div className='h-10 rounded-[10px] border border-stroke-soft-200 bg-bg-white-0 px-3 py-2.5 text-paragraph-sm text-text-soft-400 shadow-regular-xs'>
          Content area
        </div>
        <div className='h-10 rounded-[10px] border border-stroke-soft-200 bg-bg-white-0 px-3 py-2.5 text-paragraph-sm text-text-soft-400 shadow-regular-xs'>
          Another field
        </div>
      </Section.Content>
    </Section.Root>
  ),
};

export const Composed = {
  render: () => (
    <Section.Section
      className='w-full'
      title='Enter your business details'
      description='Share the key details about your business so buyers can understand the opportunity.'
    >
      <div className='h-10 rounded-[10px] border border-stroke-soft-200 bg-bg-white-0 px-3 py-2.5 text-paragraph-sm text-text-soft-400 shadow-regular-xs'>
        E.g., Prairie Coffee Co.
      </div>
      <div className='h-10 rounded-[10px] border border-stroke-soft-200 bg-bg-white-0 px-3 py-2.5 text-paragraph-sm text-text-soft-400 shadow-regular-xs'>
        Select a category
      </div>
      <div className='h-10 rounded-[10px] border border-stroke-soft-200 bg-bg-white-0 px-3 py-2.5 text-paragraph-sm text-text-soft-400 shadow-regular-xs'>
        Where is the business located?
      </div>
    </Section.Section>
  ),
};
