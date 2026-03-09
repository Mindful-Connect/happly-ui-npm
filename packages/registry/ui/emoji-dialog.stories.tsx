import {
  RiSparklingLine,
  RiDeleteBinLine,
  RiAlertLine,
  RiCheckLine,
  RiMailLine,
  RiLock2Line,
  RiGroupLine,
} from '@remixicon/react';

import * as EmojiDialog from './emoji-dialog';
import * as Button from './button';
import * as Input from './input';
import * as Label from './label';

export default {
  title: 'Overlays/Emoji Dialog',
};

export const Playground = {
  args: {
    showClose: true,
    showBackground: true,
    disableAnimations: false,
    bubbleVariant: 'secondary',
  },
  argTypes: {
    showClose: { control: 'boolean' },
    showBackground: { control: 'boolean' },
    disableAnimations: { control: 'boolean' },
    bubbleVariant: {
      control: 'select',
      options: ['secondary', 'warning', 'danger'],
    },
  },
  render: (args: any) => (
    <EmojiDialog.Root defaultOpen>
      <EmojiDialog.Content
        showClose={args.showClose}
        showBackground={args.showBackground}
        disableAnimations={args.disableAnimations}
      >
        <EmojiDialog.EmojiArea
          memoji={{
            gender: 'female',
            person: 'angela',
            skinTone: 'black',
            posture: 'happy-1',
          }}
        >
          <EmojiDialog.Bubble variant={args.bubbleVariant} icon={<RiSparklingLine />}>
            Hello there!
          </EmojiDialog.Bubble>
        </EmojiDialog.EmojiArea>
        <EmojiDialog.Header>
          <EmojiDialog.Title>Playground Dialog</EmojiDialog.Title>
          <EmojiDialog.Description>
            Use the controls to customize this dialog.
          </EmojiDialog.Description>
        </EmojiDialog.Header>
        <EmojiDialog.Footer>
          <EmojiDialog.Close asChild>
            <Button.Root variant='neutral' mode='stroke'>
              Cancel
            </Button.Root>
          </EmojiDialog.Close>
          <Button.Root>Confirm</Button.Root>
        </EmojiDialog.Footer>
      </EmojiDialog.Content>
    </EmojiDialog.Root>
  ),
};

export const Default = {
  render: () => (
    <EmojiDialog.Root>
      <EmojiDialog.Trigger asChild>
        <Button.Root>Open Welcome Dialog</Button.Root>
      </EmojiDialog.Trigger>
      <EmojiDialog.Content>
        <EmojiDialog.EmojiArea
          memoji={{
            gender: 'female',
            person: 'angela',
            skinTone: 'black',
            posture: 'happy-1',
          }}
        >
          <EmojiDialog.Bubble icon={<RiSparklingLine />}>
            Welcome aboard!
          </EmojiDialog.Bubble>
        </EmojiDialog.EmojiArea>
        <EmojiDialog.Header>
          <EmojiDialog.Title>Welcome to Happly!</EmojiDialog.Title>
          <EmojiDialog.Description>
            Your workspace is ready. Let&apos;s get you started with a quick
            tour of the platform.
          </EmojiDialog.Description>
        </EmojiDialog.Header>
        <EmojiDialog.Footer>
          <EmojiDialog.Close asChild>
            <Button.Root variant='neutral' mode='stroke'>
              Skip Tour
            </Button.Root>
          </EmojiDialog.Close>
          <Button.Root>
            <Button.Icon as={RiSparklingLine} />
            Start Tour
          </Button.Root>
        </EmojiDialog.Footer>
      </EmojiDialog.Content>
    </EmojiDialog.Root>
  ),
};

export const DeleteConfirmation = {
  render: () => (
    <EmojiDialog.Root>
      <EmojiDialog.Trigger asChild>
        <Button.Root variant='error'>
          <Button.Icon as={RiDeleteBinLine} />
          Delete Account
        </Button.Root>
      </EmojiDialog.Trigger>
      <EmojiDialog.Content>
        <EmojiDialog.EmojiArea
          memoji={{
            gender: 'female',
            person: 'rosa',
            skinTone: 'white',
            posture: 'sad-3',
          }}
        >
          <EmojiDialog.Bubble variant='danger' icon={<RiDeleteBinLine />}>
            This can&apos;t be undone
          </EmojiDialog.Bubble>
        </EmojiDialog.EmojiArea>
        <EmojiDialog.Header>
          <EmojiDialog.Title>Delete Your Account?</EmojiDialog.Title>
          <EmojiDialog.Description
            lines={[
              'All your projects, files, and settings will be permanently removed.',
              'This action cannot be reversed.',
            ]}
          />
        </EmojiDialog.Header>
        <EmojiDialog.Footer>
          <EmojiDialog.Close asChild>
            <Button.Root variant='neutral' mode='stroke'>
              Keep Account
            </Button.Root>
          </EmojiDialog.Close>
          <Button.Root variant='error'>
            <Button.Icon as={RiDeleteBinLine} />
            Delete Forever
          </Button.Root>
        </EmojiDialog.Footer>
      </EmojiDialog.Content>
    </EmojiDialog.Root>
  ),
};

export const UnsavedChanges = {
  render: () => (
    <EmojiDialog.Root>
      <EmojiDialog.Trigger asChild>
        <Button.Root variant='warning'>
          <Button.Icon as={RiAlertLine} />
          Leave Page
        </Button.Root>
      </EmojiDialog.Trigger>
      <EmojiDialog.Content>
        <EmojiDialog.EmojiArea
          memoji={{
            gender: 'female',
            person: 'kate',
            skinTone: 'white',
            posture: 'thinking-28',
          }}
        >
          <EmojiDialog.Bubble variant='warning' icon={<RiAlertLine />}>
            Wait a moment!
          </EmojiDialog.Bubble>
        </EmojiDialog.EmojiArea>
        <EmojiDialog.Header>
          <EmojiDialog.Title>Unsaved Changes</EmojiDialog.Title>
          <EmojiDialog.Description>
            You have unsaved changes that will be lost if you leave this page.
          </EmojiDialog.Description>
        </EmojiDialog.Header>
        <EmojiDialog.Footer>
          <EmojiDialog.Close asChild>
            <Button.Root variant='neutral' mode='stroke'>
              Discard Changes
            </Button.Root>
          </EmojiDialog.Close>
          <Button.Root>Save &amp; Continue</Button.Root>
        </EmojiDialog.Footer>
      </EmojiDialog.Content>
    </EmojiDialog.Root>
  ),
};

export const SuccessConfirmation = {
  render: () => (
    <EmojiDialog.Root>
      <EmojiDialog.Trigger asChild>
        <Button.Root variant='success'>
          <Button.Icon as={RiCheckLine} />
          Complete Payment
        </Button.Root>
      </EmojiDialog.Trigger>
      <EmojiDialog.Content showBackground={false}>
        <EmojiDialog.EmojiArea
          memoji={{
            gender: 'male',
            person: 'chris',
            skinTone: 'white',
            posture: 'party-11',
          }}
        >
          <EmojiDialog.Bubble icon={<RiCheckLine />}>
            All done!
          </EmojiDialog.Bubble>
        </EmojiDialog.EmojiArea>
        <EmojiDialog.Header>
          <EmojiDialog.Title>Payment Successful</EmojiDialog.Title>
          <EmojiDialog.Description>
            Your Pro subscription is now active. You have access to all premium
            features.
          </EmojiDialog.Description>
        </EmojiDialog.Header>
        <EmojiDialog.Footer>
          <Button.Root>
            <Button.Icon as={RiSparklingLine} />
            Explore Pro Features
          </Button.Root>
        </EmojiDialog.Footer>
      </EmojiDialog.Content>
    </EmojiDialog.Root>
  ),
};

export const WithFormContent = {
  render: () => (
    <EmojiDialog.Root>
      <EmojiDialog.Trigger asChild>
        <Button.Root>
          <Button.Icon as={RiMailLine} />
          Invite Teammate
        </Button.Root>
      </EmojiDialog.Trigger>
      <EmojiDialog.Content>
        <EmojiDialog.EmojiArea
          memoji={{
            gender: 'male',
            person: 'karim',
            skinTone: 'black',
            posture: 'happy-winking-17',
          }}
        >
          <EmojiDialog.Bubble icon={<RiGroupLine />}>
            The more the merrier!
          </EmojiDialog.Bubble>
        </EmojiDialog.EmojiArea>
        <EmojiDialog.Header>
          <EmojiDialog.Title>Invite a Teammate</EmojiDialog.Title>
          <EmojiDialog.Description>
            Send an invite to collaborate on your workspace.
          </EmojiDialog.Description>
        </EmojiDialog.Header>
        <div className='relative z-10 flex flex-col gap-4'>
          <div className='flex flex-col gap-1.5'>
            <Label.Root htmlFor='invite-email'>Email address</Label.Root>
            <Input.Root>
              <Input.Wrapper>
                <Input.Icon as={RiMailLine} />
                <Input.Input
                  id='invite-email'
                  type='email'
                  placeholder='colleague@company.com'
                />
              </Input.Wrapper>
            </Input.Root>
          </div>
          <div className='flex flex-col gap-1.5'>
            <Label.Root htmlFor='invite-message'>
              Personal message
              <span className='ml-1 text-text-soft-400'>(optional)</span>
            </Label.Root>
            <Input.Root>
              <Input.Wrapper>
                <Input.Input
                  id='invite-message'
                  type='text'
                  placeholder='Hey, come check out this project!'
                />
              </Input.Wrapper>
            </Input.Root>
          </div>
        </div>
        <EmojiDialog.Footer>
          <EmojiDialog.Close asChild>
            <Button.Root variant='neutral' mode='stroke'>
              Cancel
            </Button.Root>
          </EmojiDialog.Close>
          <Button.Root>
            <Button.Icon as={RiMailLine} />
            Send Invite
          </Button.Root>
        </EmojiDialog.Footer>
      </EmojiDialog.Content>
    </EmojiDialog.Root>
  ),
};

export const WithFloatingMemojis = {
  render: () => (
    <EmojiDialog.Root>
      <EmojiDialog.Trigger asChild>
        <Button.Root>
          <Button.Icon as={RiGroupLine} />
          Meet the Team
        </Button.Root>
      </EmojiDialog.Trigger>
      <EmojiDialog.Content>
        <EmojiDialog.EmojiArea
          floatingMemojis
          memoji={{
            gender: 'female',
            person: 'angela',
            skinTone: 'black',
            posture: 'party-11',
          }}
        >
          <EmojiDialog.Bubble icon={<RiSparklingLine />}>
            We&apos;re glad you&apos;re here!
          </EmojiDialog.Bubble>
        </EmojiDialog.EmojiArea>
        <EmojiDialog.Header>
          <EmojiDialog.Title>You&apos;re All Set!</EmojiDialog.Title>
          <EmojiDialog.Description>
            Your team workspace has been created. Invite your teammates and start
            collaborating.
          </EmojiDialog.Description>
        </EmojiDialog.Header>
        <EmojiDialog.Footer>
          <EmojiDialog.Close asChild>
            <Button.Root variant='neutral' mode='stroke'>
              I&apos;ll Do This Later
            </Button.Root>
          </EmojiDialog.Close>
          <Button.Root>
            <Button.Icon as={RiMailLine} />
            Invite Team
          </Button.Root>
        </EmojiDialog.Footer>
      </EmojiDialog.Content>
    </EmojiDialog.Root>
  ),
};

export const StaticNoAnimations = {
  render: () => (
    <EmojiDialog.Root>
      <EmojiDialog.Trigger asChild>
        <Button.Root variant='neutral' mode='stroke'>
          <Button.Icon as={RiLock2Line} />
          Session Expired
        </Button.Root>
      </EmojiDialog.Trigger>
      <EmojiDialog.Content disableAnimations>
        <EmojiDialog.EmojiArea
          memoji={{
            gender: 'male',
            person: 'justin',
            skinTone: 'black',
            posture: 'sleeping-6',
          }}
        >
          <EmojiDialog.Bubble icon={<RiLock2Line />}>
            Session timed out
          </EmojiDialog.Bubble>
        </EmojiDialog.EmojiArea>
        <EmojiDialog.Header>
          <EmojiDialog.Title>Session Expired</EmojiDialog.Title>
          <EmojiDialog.Description>
            Your session has expired due to inactivity. Please sign in again to
            continue.
          </EmojiDialog.Description>
        </EmojiDialog.Header>
        <EmojiDialog.Footer>
          <Button.Root>
            <Button.Icon as={RiLock2Line} />
            Sign In Again
          </Button.Root>
        </EmojiDialog.Footer>
      </EmojiDialog.Content>
    </EmojiDialog.Root>
  ),
};

export const CustomEmojiArea = {
  render: () => (
    <EmojiDialog.Root>
      <EmojiDialog.Trigger asChild>
        <Button.Root variant='neutral' mode='stroke'>
          Open Celebration
        </Button.Root>
      </EmojiDialog.Trigger>
      <EmojiDialog.Content>
        <EmojiDialog.EmojiArea customContent>
          <div className='flex items-end justify-center gap-2 pb-4 text-[64px]'>
            <span className='-rotate-12'>🎊</span>
            <span className='text-[80px]'>🎉</span>
            <span className='rotate-12'>🎊</span>
          </div>
        </EmojiDialog.EmojiArea>
        <EmojiDialog.Header>
          <EmojiDialog.Title>Milestone Reached!</EmojiDialog.Title>
          <EmojiDialog.Description>
            Your project just hit 10,000 users. Congratulations to the entire
            team!
          </EmojiDialog.Description>
        </EmojiDialog.Header>
        <EmojiDialog.Footer>
          <EmojiDialog.Close asChild>
            <Button.Root variant='neutral' mode='stroke'>
              Dismiss
            </Button.Root>
          </EmojiDialog.Close>
          <Button.Root>Share the News</Button.Root>
        </EmojiDialog.Footer>
      </EmojiDialog.Content>
    </EmojiDialog.Root>
  ),
};
