import * as React from 'react';

import * as Chat from './chat';

export default { title: 'UI/Chat', component: Chat.Root };

const them = <Chat.Avatar src='https://i.pravatar.cc/160?img=12' />;
const me = (
  <Chat.Avatar color='yellow' src='https://i.pravatar.cc/160?img=68' />
);

/** The full thread from the design: received/sent bubbles, pills, and dividers. */
export const Default = {
  render: () => (
    <div className='h-[600px] w-full max-w-2xl'>
      <Chat.Root>
        <Chat.List>
          <Chat.Message side='received' avatar={them}>
            <Chat.Bubble>
              Join us for an engaging seminar where we delve into user-centered
              design principles and their vital role in product development.
              Participants will collaborate on hands-on activities to identify
              user needs, craft detailed personas, and build effective
              prototypes.
              <Chat.Timestamp>3:00 PM</Chat.Timestamp>
            </Chat.Bubble>
          </Chat.Message>

          <Chat.Message side='sent'>
            <Chat.Bubble>
              Explore the fundamentals of user-centered design in our upcoming
              seminar. Attendees will participate in interactive sessions aimed
              at uncovering user needs, developing personas, and creating
              prototypes.
              <Chat.Timestamp>3:00 PM</Chat.Timestamp>
            </Chat.Bubble>
          </Chat.Message>

          <Chat.Message side='sent' avatar={me}>
            <Chat.Bubble>
              {`This seminar will cover the essentials of user-centered design and its impact on product development. Let's build products that truly resonate with users!`}
              <Chat.Timestamp>3:00 PM</Chat.Timestamp>
            </Chat.Bubble>
          </Chat.Message>

          <Chat.Divider>23 May, 2025</Chat.Divider>

          <Chat.Message side='received'>
            <Chat.Bubble shape='pill'>
              Hey!
              <Chat.Timestamp>3:00 PM</Chat.Timestamp>
            </Chat.Bubble>
          </Chat.Message>
          <Chat.Message side='received'>
            <Chat.Bubble shape='pill'>
              How are you?
              <Chat.Timestamp>3:00 PM</Chat.Timestamp>
            </Chat.Bubble>
          </Chat.Message>

          <Chat.Divider variant='feature'>New message</Chat.Divider>

          <Chat.Message side='received' avatar={them}>
            <Chat.Bubble tone='highlight'>
              Dive into the principles of user-centered design at our seminar.
              Together, we can create products that genuinely resonate with
              users!
              <Chat.Timestamp>3:00 PM</Chat.Timestamp>
            </Chat.Bubble>
          </Chat.Message>
        </Chat.List>

        <Chat.Input onSend={() => {}} />
      </Chat.Root>
    </div>
  ),
};

/** Sent vs received bubbles side by side. */
export const Bubbles = {
  render: () => (
    <div className='flex w-full max-w-2xl flex-col gap-6'>
      <Chat.Message side='received' avatar={them}>
        <Chat.Bubble>
          A received message in the soft gray tone.
          <Chat.Timestamp>3:00 PM</Chat.Timestamp>
        </Chat.Bubble>
      </Chat.Message>
      <Chat.Message side='sent' avatar={me}>
        <Chat.Bubble>
          A sent message in the primary tone.
          <Chat.Timestamp>3:00 PM</Chat.Timestamp>
        </Chat.Bubble>
      </Chat.Message>
      <Chat.Message side='received'>
        <Chat.Bubble tone='highlight'>
          {`A highlighted "new" message.`}
          <Chat.Timestamp>3:00 PM</Chat.Timestamp>
        </Chat.Bubble>
      </Chat.Message>
    </div>
  ),
};

/** Short pill messages and both divider variants. */
export const PillsAndDividers = {
  render: () => (
    <div className='flex w-full max-w-2xl flex-col gap-6'>
      <Chat.Message side='received'>
        <Chat.Bubble shape='pill'>
          Hey!
          <Chat.Timestamp>3:00 PM</Chat.Timestamp>
        </Chat.Bubble>
      </Chat.Message>
      <Chat.Divider>23 May, 2025</Chat.Divider>
      <Chat.Message side='received'>
        <Chat.Bubble shape='pill'>
          How are you?
          <Chat.Timestamp>3:00 PM</Chat.Timestamp>
        </Chat.Bubble>
      </Chat.Message>
      <Chat.Divider variant='feature'>New message</Chat.Divider>
    </div>
  ),
};

function InputDemo() {
  const [last, setLast] = React.useState<string | null>(null);
  return (
    <div className='flex w-full max-w-2xl flex-col gap-3'>
      <Chat.Input onSend={(text) => setLast(text)} />
      {last && (
        <p className='text-paragraph-xs text-text-soft-400'>{`Sent: "${last}"`}</p>
      )}
    </div>
  );
}

/** The default input bar (20px below the list). */
export const Input = {
  render: () => <InputDemo />,
};

type DemoMessage = { id: number; side: 'sent' | 'received'; text: string };

function InteractiveDemo() {
  const [messages, setMessages] = React.useState<DemoMessage[]>([
    { id: 1, side: 'received', text: 'Hey! How can I help you today?' },
  ]);

  const send = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, side: 'sent', text },
    ]);
  };

  return (
    <div className='h-[480px] w-full max-w-2xl'>
      <Chat.Root>
        <Chat.List>
          {messages.map((message) => (
            <Chat.Message
              key={message.id}
              side={message.side}
              avatar={message.side === 'received' ? them : me}
            >
              <Chat.Bubble>
                {message.text}
                <Chat.Timestamp>Now</Chat.Timestamp>
              </Chat.Bubble>
            </Chat.Message>
          ))}
        </Chat.List>
        <Chat.Input onSend={send} placeholder='Type a message and hit Enter…' />
      </Chat.Root>
    </div>
  );
}

/** A live thread: type and send to append messages; the list sticks to bottom. */
export const Interactive = {
  render: () => <InteractiveDemo />,
};

/** Replace the default input clusters via the `leading` / `actions` slots. */
export const CustomInput = {
  render: () => (
    <div className='w-full max-w-2xl'>
      <Chat.Input
        placeholder='Ask anything…'
        showAttachment={false}
        actions={<Chat.SendButton variant='primary' mode='filled' />}
        onSend={() => {}}
      />
    </div>
  ),
};

/** Disabled input. */
export const Disabled = {
  render: () => (
    <div className='w-full max-w-2xl'>
      <Chat.Input
        disabled
        placeholder='You cannot type here…'
        onSend={() => {}}
      />
    </div>
  ),
};
