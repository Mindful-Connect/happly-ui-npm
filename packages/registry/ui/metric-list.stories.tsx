import * as Avatar from './avatar';
import * as Button from './button';
import * as MetricList from './metric-list';
import * as WidgetCard from './widget-card';

export default { title: 'Charts/Metric List', component: MetricList.Root };

const Card = ({ children }: { children: React.ReactNode }) => (
  <WidgetCard.Root className='w-[624px]'>
    <WidgetCard.Header>
      <WidgetCard.Title>Card title</WidgetCard.Title>
      <Button.Root variant='neutral' mode='stroke' size='xxsmall'>
        Details
      </Button.Root>
    </WidgetCard.Header>
    <WidgetCard.Content>{children}</WidgetCard.Content>
  </WidgetCard.Root>
);

const people = [
  { name: 'Person one', company: 'Company one', value: 'No app activity' },
  { name: 'Person two', company: 'Company two', value: '5d ago' },
  { name: 'Person three', company: 'Company three', value: '2w ago' },
  { name: 'Person four', value: '—' },
];

export const Default = {
  render: () => (
    <Card>
      <MetricList.Root>
        <MetricList.Header>
          <MetricList.Column>Name</MetricList.Column>
          <MetricList.Column className='w-[120px]'>
            Last activity
          </MetricList.Column>
        </MetricList.Header>
        <MetricList.Body>
          {people.map((person) => (
            <MetricList.Row key={person.name}>
              <MetricList.Entity
                media={
                  <Avatar.Root size='32' color='gray' placeholderType='user' />
                }
                label={person.name}
                sublabel={person.company}
              />
              <MetricList.Value>{person.value}</MetricList.Value>
            </MetricList.Row>
          ))}
        </MetricList.Body>
      </MetricList.Root>
    </Card>
  ),
};

export const TwoFigures = {
  render: () => (
    <Card>
      <MetricList.Root>
        <MetricList.Header>
          <MetricList.Column>Name</MetricList.Column>
          <MetricList.Column className='w-[88px]'>Sessions</MetricList.Column>
          <MetricList.Column className='w-[72px]'>Booked %</MetricList.Column>
        </MetricList.Header>
        <MetricList.Body>
          {[
            {
              name: 'Person one',
              company: 'Company one',
              booked: 128,
              rate: '92%',
            },
            {
              name: 'Person two',
              company: 'Company two',
              booked: 96,
              rate: '74%',
            },
            {
              name: 'Person three',
              company: 'Company three',
              booked: 54,
              rate: '61%',
            },
            {
              name: 'Person four',
              company: 'Company four',
              booked: 12,
              rate: '18%',
            },
          ].map((person) => (
            <MetricList.Row key={person.name}>
              <MetricList.Entity
                media={
                  <Avatar.Root size='32' color='gray' placeholderType='user' />
                }
                label={person.name}
                sublabel={person.company}
              />
              <MetricList.Value>
                {person.booked.toLocaleString()}
              </MetricList.Value>
              <MetricList.Value>{person.rate}</MetricList.Value>
            </MetricList.Row>
          ))}
        </MetricList.Body>
      </MetricList.Root>
    </Card>
  ),
};

export const Compact = {
  render: () => (
    <Card>
      <MetricList.Root size='sm'>
        <MetricList.Header>
          <MetricList.Column>Session</MetricList.Column>
          <MetricList.Column className='w-[88px]'>Attendees</MetricList.Column>
          <MetricList.Column className='w-[88px]'>Comments</MetricList.Column>
        </MetricList.Header>
        <MetricList.Body>
          {[
            { title: 'Session one', attendees: 1240, comments: 86 },
            { title: 'Session two', attendees: 980, comments: 54 },
            {
              title: 'Session three with a much longer name than the rest',
              attendees: 612,
              comments: 41,
            },
            { title: 'Session four', attendees: 240, comments: 12 },
          ].map((session) => (
            <MetricList.Row key={session.title}>
              <MetricList.Entity
                media={
                  <span className='bg-bg-weak-50 h-5 w-9 shrink-0 rounded' />
                }
                label={session.title}
              />
              <MetricList.Value>
                {session.attendees.toLocaleString()}
              </MetricList.Value>
              <MetricList.Value>{session.comments}</MetricList.Value>
            </MetricList.Row>
          ))}
        </MetricList.Body>
      </MetricList.Root>
    </Card>
  ),
};
