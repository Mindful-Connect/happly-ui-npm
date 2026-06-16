import {
  RiAccountCircleLine,
  RiMapPinTimeLine,
  RiQuestionLine,
  RiSuitcaseLine,
  RiUser3Line,
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

export const ListVariant = {
  render: () => (
    <div className='w-[480px]'>
      <Accordion.Root
        type='single'
        collapsible
        className='border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden rounded-2xl border'
      >
        <Accordion.Item value='a' variant='list'>
          <Accordion.Trigger className='py-4 pr-3 pl-5'>
            <Accordion.Icon as={RiUser3Line} />
            Business profile
            <Accordion.Chevron />
          </Accordion.Trigger>
          <Accordion.Content className='px-5 pt-0 pb-4 pl-[50px]'>
            Manage your company name, logo, and other organisation details
            shown across the platform.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value='b' variant='list'>
          <Accordion.Trigger className='py-4 pr-3 pl-5'>
            <Accordion.Icon as={RiSuitcaseLine} />
            Personal profile
            <Accordion.Chevron />
          </Accordion.Trigger>
          <Accordion.Content className='px-5 pt-0 pb-4 pl-[50px]'>
            Update your name, contact information, and personal preferences.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value='c' variant='list'>
          <Accordion.Trigger className='py-4 pr-3 pl-5'>
            <Accordion.Icon as={RiQuestionLine} />
            Billing &amp; payments
            <Accordion.Chevron />
          </Accordion.Trigger>
          <Accordion.Content className='px-5 pt-0 pb-4 pl-[50px]'>
            Review invoices, update your payment method, and manage your
            subscription.
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

const profileItems: Accordion.AccordionGroupItem[] = [
  {
    value: 'a',
    title: 'Business profile',
    content:
      'Manage your company name, logo, and other organisation details shown across the platform.',
    icon: RiUser3Line,
  },
  {
    value: 'b',
    title: 'Personal profile',
    content:
      'Update your name, contact information, and personal preferences.',
    icon: RiSuitcaseLine,
  },
  {
    value: 'c',
    title: 'Billing & payments',
    content:
      'Review invoices, update your payment method, and manage your subscription.',
    icon: RiQuestionLine,
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

export const GroupList = {
  render: () => (
    <div className='w-[480px]'>
      <Accordion.Group
        type='single'
        collapsible
        items={profileItems}
        variant='list'
      />
    </div>
  ),
};
