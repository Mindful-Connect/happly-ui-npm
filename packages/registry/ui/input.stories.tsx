import { Input } from './input';
import { RiUser3Line, RiAtLine, RiMoneyDollarCircleLine } from 'react-icons/ri';

export default { title: 'UI/Input', component: Input };

export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '672px', width: '100%' }}>
      <Input size="medium" placeholder="Medium input" />
      <Input size="small" placeholder="Small input" />
      <Input size="xsmall" placeholder="XSmall input" />
    </div>
  ),
};

export const Icons = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '672px', width: '100%' }}>
      <Input placeholder="Username" leftIcon={<RiUser3Line />} />
      <Input placeholder="Email" leftIcon={<RiAtLine />} />
      <Input placeholder="Amount" leftIcon={<RiMoneyDollarCircleLine />} />
      <Input placeholder="Search..." rightIcon={<RiUser3Line />} />
    </div>
  ),
};

export const Affixes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '672px', width: '100%' }}>
      <Input placeholder="mysite" leftAffix="https://" rightAffix=".com" />
      <Input placeholder="0.00" leftAffix="$" inlineAffix="USD" />
      <Input placeholder="username" leftAffix="@" />
    </div>
  ),
};

export const States = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '672px', width: '100%' }}>
      <Input placeholder="Disabled" disabled />
      <Input placeholder="With Error" hasError defaultValue="Invalid Input" />
      <Input placeholder="Disabled with text" disabled defaultValue="Cannot edit this" />
    </div>
  ),
};
