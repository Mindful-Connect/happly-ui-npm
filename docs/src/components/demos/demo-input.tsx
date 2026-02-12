import { Input } from '@/components/ui/input';
import { RiUser3Line, RiAtLine, RiMoneyDollarCircleLine } from 'react-icons/ri';

export function DemoInput() {
  return (
    <div className='flex w-full max-w-2xl flex-col gap-8'>
      <Section title='Sizes'>
        <div className='flex flex-col gap-4'>
          <Input size='medium' placeholder='Medium input' />
          <Input size='small' placeholder='Small input' />
          <Input size='xsmall' placeholder='XSmall input' />
        </div>
      </Section>

      <Section title='Icons'>
        <div className='flex flex-col gap-4'>
          <Input placeholder='Username' leftIcon={<RiUser3Line />} />
          <Input placeholder='Email' leftIcon={<RiAtLine />} />
          <Input placeholder='Amount' leftIcon={<RiMoneyDollarCircleLine />} />
          <Input placeholder='Search...' rightIcon={<RiUser3Line />} />
        </div>
      </Section>

      <Section title='Affixes'>
        <div className='flex flex-col gap-4'>
          <Input placeholder='mysite' leftAffix='https://' rightAffix='.com' />
          <Input placeholder='0.00' leftAffix='$' inlineAffix='USD' />
          <Input placeholder='username' leftAffix='@' />
        </div>
      </Section>

      <Section title='States'>
        <div className='flex flex-col gap-4'>
          <Input placeholder='Disabled' disabled />
          <Input
            placeholder='With Error'
            hasError
            defaultValue='Invalid Input'
          />
          <Input
            placeholder='Disabled with text'
            disabled
            defaultValue='Cannot edit this'
          />
        </div>
      </Section>
    </div>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col gap-4'>
      <h3 className='text-sm font-medium tracking-wider text-slate-500 uppercase'>
        {title}
      </h3>
      {children}
    </div>
  );
}
