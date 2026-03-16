import * as AvatarGroup from './avatar-group';
import * as Avatar from './avatar';

export default { title: 'Displaying Data/Avatar Group', component: AvatarGroup.Root };

export const Playground = {
  args: {
    size: '80',
  },
  argTypes: {
    size: { control: 'select', options: ['80', '72', '64', '56', '48', '40', '32', '24', '20'] },
  },
  render: (args: any) => (
    <AvatarGroup.Root {...args}>
      <Avatar.Root>
        <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
      </Avatar.Root>
      <Avatar.Root>
        <Avatar.Image src='https://i.pravatar.cc/160?img=1' />
      </Avatar.Root>
      <Avatar.Root>
        <Avatar.Image src='https://i.pravatar.cc/160?img=9' />
      </Avatar.Root>
      <AvatarGroup.Overflow>+9</AvatarGroup.Overflow>
    </AvatarGroup.Root>
  ),
};

export const Size = {
  render: () => (
    <div className='flex flex-col items-center gap-6'>
      <AvatarGroup.Root>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        </Avatar.Root>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=1' />
        </Avatar.Root>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=9' />
        </Avatar.Root>
        <AvatarGroup.Overflow>+9</AvatarGroup.Overflow>
      </AvatarGroup.Root>

      <AvatarGroup.Root size='72'>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        </Avatar.Root>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=1' />
        </Avatar.Root>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=9' />
        </Avatar.Root>
        <AvatarGroup.Overflow>+9</AvatarGroup.Overflow>
      </AvatarGroup.Root>

      <AvatarGroup.Root size='64'>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        </Avatar.Root>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=1' />
        </Avatar.Root>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=9' />
        </Avatar.Root>
        <AvatarGroup.Overflow>+9</AvatarGroup.Overflow>
      </AvatarGroup.Root>

      <AvatarGroup.Root size='56'>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        </Avatar.Root>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=1' />
        </Avatar.Root>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=9' />
        </Avatar.Root>
        <AvatarGroup.Overflow>+9</AvatarGroup.Overflow>
      </AvatarGroup.Root>

      <AvatarGroup.Root size='48'>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        </Avatar.Root>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=1' />
        </Avatar.Root>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=9' />
        </Avatar.Root>
        <AvatarGroup.Overflow>+9</AvatarGroup.Overflow>
      </AvatarGroup.Root>

      <AvatarGroup.Root size='40'>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        </Avatar.Root>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=1' />
        </Avatar.Root>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=9' />
        </Avatar.Root>
        <AvatarGroup.Overflow>+9</AvatarGroup.Overflow>
      </AvatarGroup.Root>

      <AvatarGroup.Root size='32'>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        </Avatar.Root>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=1' />
        </Avatar.Root>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=9' />
        </Avatar.Root>
        <AvatarGroup.Overflow>+9</AvatarGroup.Overflow>
      </AvatarGroup.Root>

      <AvatarGroup.Root size='24'>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        </Avatar.Root>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=1' />
        </Avatar.Root>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=9' />
        </Avatar.Root>
        <AvatarGroup.Overflow>+9</AvatarGroup.Overflow>
      </AvatarGroup.Root>

      <AvatarGroup.Root size='20'>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        </Avatar.Root>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=1' />
        </Avatar.Root>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=9' />
        </Avatar.Root>
        <AvatarGroup.Overflow>+9</AvatarGroup.Overflow>
      </AvatarGroup.Root>
    </div>
  ),
};
