import {
  RiAccountCircleLine,
  RiMapPinTimeLine,
  RiQuestionLine,
} from '@remixicon/react';

import * as Accordion from './accordion';

export default { title: 'Layout/Accordion', component: Accordion.Root };

export const Default = {
  render: () => (
    <div className='w-96'>
      <Accordion.Root type='single' collapsible className='space-y-6'>
        <Accordion.Item value='a'>
          <Accordion.Trigger>
            <Accordion.Icon as={RiAccountCircleLine} />
            How do I update my account information?
            <Accordion.Arrow />
          </Accordion.Trigger>
          <Accordion.Content className='px-[30px]'>
            Insert the accordion description here. It would look better as two
            lines of text.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value='b'>
          <Accordion.Trigger>
            <Accordion.Icon as={RiQuestionLine} />
            What payment methods are accepted?
            <Accordion.Arrow />
          </Accordion.Trigger>
          <Accordion.Content className='px-[30px]'>
            Major credit and debit cards like Visa, MasterCard, and American
            Express, as well as digital payment options like PayPal and Apple
            Pay.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value='c'>
          <Accordion.Trigger>
            <Accordion.Icon as={RiMapPinTimeLine} />
            How can I track my order?
            <Accordion.Arrow />
          </Accordion.Trigger>
          <Accordion.Content className='px-[30px]'>
            Insert the accordion description here. It would look better as two
            lines of text.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  ),
};

export const ArrowStart = {
  render: () => (
    <div className='w-96'>
      <Accordion.Root type='single' collapsible className='space-y-6'>
        <Accordion.Item value='a'>
          <Accordion.Trigger>
            <Accordion.Arrow />
            Insert your accordion title here
          </Accordion.Trigger>
          <Accordion.Content className='pl-[30px]'>
            Insert the accordion description here. It would look better as two
            lines of text.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value='b'>
          <Accordion.Trigger>
            <Accordion.Arrow />
            Insert your accordion title here
          </Accordion.Trigger>
          <Accordion.Content className='pl-[30px]'>
            Insert the accordion description here. It would look better as two
            lines of text.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value='c'>
          <Accordion.Trigger>
            <Accordion.Arrow />
            Insert your accordion title here
          </Accordion.Trigger>
          <Accordion.Content className='pl-[30px]'>
            Insert the accordion description here. It would look better as two
            lines of text.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  ),
};

export const StrokeVariant = {
  render: () => (
    <div className='w-96'>
      <Accordion.Root type='single' collapsible className='space-y-6'>
        <Accordion.Item value='a' variant='stroke'>
          <Accordion.Trigger>
            <Accordion.Icon as={RiAccountCircleLine} />
            How do I update my account information?
            <Accordion.Arrow />
          </Accordion.Trigger>
          <Accordion.Content className='px-[30px]'>
            Insert the accordion description here. It would look better as two
            lines of text.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value='b' variant='stroke'>
          <Accordion.Trigger>
            <Accordion.Icon as={RiQuestionLine} />
            What payment methods are accepted?
            <Accordion.Arrow />
          </Accordion.Trigger>
          <Accordion.Content className='px-[30px]'>
            Major credit and debit cards like Visa, MasterCard, and American
            Express, as well as digital payment options like PayPal and Apple
            Pay.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value='c' variant='stroke'>
          <Accordion.Trigger>
            <Accordion.Icon as={RiMapPinTimeLine} />
            How can I track my order?
            <Accordion.Arrow />
          </Accordion.Trigger>
          <Accordion.Content className='px-[30px]'>
            Insert the accordion description here. It would look better as two
            lines of text.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  ),
};

export const StrokeArrowStart = {
  render: () => (
    <div className='w-96'>
      <Accordion.Root type='single' collapsible className='space-y-6'>
        <Accordion.Item value='a' variant='stroke'>
          <Accordion.Trigger>
            <Accordion.Arrow />
            Insert your accordion title here
          </Accordion.Trigger>
          <Accordion.Content className='pl-[30px]'>
            Insert the accordion description here. It would look better as two
            lines of text.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value='b' variant='stroke'>
          <Accordion.Trigger>
            <Accordion.Arrow />
            Insert your accordion title here
          </Accordion.Trigger>
          <Accordion.Content className='pl-[30px]'>
            Insert the accordion description here. It would look better as two
            lines of text.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value='c' variant='stroke'>
          <Accordion.Trigger>
            <Accordion.Arrow />
            Insert your accordion title here
          </Accordion.Trigger>
          <Accordion.Content className='pl-[30px]'>
            Insert the accordion description here. It would look better as two
            lines of text.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  ),
};

// --- Composed (Group) stories ---

const faqItems: Accordion.AccordionGroupItem[] = [
  {
    value: 'a',
    title: 'How do I update my account information?',
    content:
      'Insert the accordion description here. It would look better as two lines of text.',
    icon: RiAccountCircleLine,
  },
  {
    value: 'b',
    title: 'What payment methods are accepted?',
    content:
      'Major credit and debit cards like Visa, MasterCard, and American Express, as well as digital payment options like PayPal and Apple Pay.',
    icon: RiQuestionLine,
  },
  {
    value: 'c',
    title: 'How can I track my order?',
    content:
      'Insert the accordion description here. It would look better as two lines of text.',
    icon: RiMapPinTimeLine,
  },
];

const simpleItems: Accordion.AccordionGroupItem[] = [
  {
    value: 'a',
    title: 'Insert your accordion title here',
    content:
      'Insert the accordion description here. It would look better as two lines of text.',
  },
  {
    value: 'b',
    title: 'Insert your accordion title here',
    content:
      'Insert the accordion description here. It would look better as two lines of text.',
  },
  {
    value: 'c',
    title: 'Insert your accordion title here',
    content:
      'Insert the accordion description here. It would look better as two lines of text.',
  },
];

export const GroupDefault = {
  render: () => (
    <div className='w-96'>
      <Accordion.Group type='single' collapsible items={faqItems} />
    </div>
  ),
};

export const GroupArrowStart = {
  render: () => (
    <div className='w-96'>
      <Accordion.Group
        type='single'
        collapsible
        items={simpleItems}
        arrowPosition='start'
      />
    </div>
  ),
};

export const GroupStroke = {
  render: () => (
    <div className='w-96'>
      <Accordion.Group
        type='single'
        collapsible
        items={faqItems}
        variant='stroke'
      />
    </div>
  ),
};

export const GroupStrokeArrowStart = {
  render: () => (
    <div className='w-96'>
      <Accordion.Group
        type='single'
        collapsible
        items={simpleItems}
        variant='stroke'
        arrowPosition='start'
      />
    </div>
  ),
};
