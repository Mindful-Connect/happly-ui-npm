import * as AvatarGroupCompact from './avatar-group-compact';
import * as Avatar from './avatar';

export default {
  title: 'Displaying Data/Avatar Group Compact',
  component: AvatarGroupCompact.Root,
};

export const Default = {
  render: () => (
    <AvatarGroupCompact.Root variant='stroke'>
      <AvatarGroupCompact.Stack>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
        </Avatar.Root>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=1' />
        </Avatar.Root>
        <Avatar.Root>
          <Avatar.Image src='https://i.pravatar.cc/160?img=9' />
        </Avatar.Root>
      </AvatarGroupCompact.Stack>
      <AvatarGroupCompact.Overflow>+9</AvatarGroupCompact.Overflow>
    </AvatarGroupCompact.Root>
  ),
};

export const Size = {
  render: () => (
    <div className='flex flex-col items-center gap-6'>
      <AvatarGroupCompact.Root>
        <AvatarGroupCompact.Stack>
          <Avatar.Root>
            <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
          </Avatar.Root>
          <Avatar.Root>
            <Avatar.Image src='https://i.pravatar.cc/160?img=1' />
          </Avatar.Root>
          <Avatar.Root>
            <Avatar.Image src='https://i.pravatar.cc/160?img=9' />
          </Avatar.Root>
        </AvatarGroupCompact.Stack>
        <AvatarGroupCompact.Overflow>+9</AvatarGroupCompact.Overflow>
      </AvatarGroupCompact.Root>

      <AvatarGroupCompact.Root size='32'>
        <AvatarGroupCompact.Stack>
          <Avatar.Root>
            <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
          </Avatar.Root>
          <Avatar.Root>
            <Avatar.Image src='https://i.pravatar.cc/160?img=1' />
          </Avatar.Root>
          <Avatar.Root>
            <Avatar.Image src='https://i.pravatar.cc/160?img=9' />
          </Avatar.Root>
        </AvatarGroupCompact.Stack>
        <AvatarGroupCompact.Overflow>+9</AvatarGroupCompact.Overflow>
      </AvatarGroupCompact.Root>

      <AvatarGroupCompact.Root size='24'>
        <AvatarGroupCompact.Stack>
          <Avatar.Root>
            <Avatar.Image src='https://i.pravatar.cc/160?img=5' />
          </Avatar.Root>
          <Avatar.Root>
            <Avatar.Image src='https://i.pravatar.cc/160?img=1' />
          </Avatar.Root>
          <Avatar.Root>
            <Avatar.Image src='https://i.pravatar.cc/160?img=9' />
          </Avatar.Root>
        </AvatarGroupCompact.Stack>
        <AvatarGroupCompact.Overflow>+9</AvatarGroupCompact.Overflow>
      </AvatarGroupCompact.Root>
    </div>
  ),
};
