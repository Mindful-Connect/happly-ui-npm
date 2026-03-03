'use client';

import { useState } from 'react';
import RadioCardGroup, { type RadioCardItem } from './radio-card-group';
import { CreditCard, Wallet, Banknote, Building, Zap, Star } from 'lucide-react';

export default { title: 'UI/RadioCardGroup', component: RadioCardGroup };

const basicItems: RadioCardItem[] = [
  { title: 'Personal', value: 'personal', description: 'For individual use' },
  { title: 'Team', value: 'team', description: 'For small teams' },
  { title: 'Enterprise', value: 'enterprise', description: 'For large organizations' },
];

const noDescriptionItems: RadioCardItem[] = [
  { title: 'Small', value: 'small' },
  { title: 'Medium', value: 'medium' },
  { title: 'Large', value: 'large' },
];

const iconItems: RadioCardItem[] = [
  { title: 'Card', value: 'card', icon: <CreditCard className="h-5 w-5" />, description: 'Pay with credit card' },
  { title: 'Wallet', value: 'wallet', icon: <Wallet className="h-5 w-5" />, description: 'Pay with digital wallet' },
  { title: 'Bank Transfer', value: 'bank', icon: <Banknote className="h-5 w-5" />, description: 'Direct bank transfer' },
];

const complexItems: RadioCardItem[] = [
  {
    title: 'Pro Plan',
    value: 'pro',
    icon: <Zap className="h-5 w-5" />,
    description: 'Advanced features for power users',
    badge: { text: 'Popular', colorVar: 'blueFilled', size: 'sm' as const },
  },
  {
    title: 'Business Plan',
    value: 'business',
    icon: <Building className="h-5 w-5" />,
    description: 'Complete solution for businesses',
    badge: { text: 'New', colorVar: 'greenFilled', size: 'sm' as const },
  },
  {
    title: 'Starter Plan',
    value: 'starter',
    icon: <Star className="h-5 w-5" />,
    description: 'Basic features to get started',
  },
];

export const BasicUsage = {
  render: () => {
    function BasicUsageDemo() {
      const [value, setValue] = useState('personal');
      return (
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <RadioCardGroup items={basicItems} value={value} onValueChange={setValue} />
        </div>
      );
    }
    return <BasicUsageDemo />;
  },
};

export const WithoutDescriptions = {
  render: () => {
    function WithoutDescriptionsDemo() {
      const [value, setValue] = useState('medium');
      return (
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <RadioCardGroup items={noDescriptionItems} value={value} onValueChange={setValue} />
        </div>
      );
    }
    return <WithoutDescriptionsDemo />;
  },
};

export const WithIcons = {
  render: () => {
    function WithIconsDemo() {
      const [value, setValue] = useState('card');
      return (
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <RadioCardGroup items={iconItems} value={value} onValueChange={setValue} descriptionInTitle />
        </div>
      );
    }
    return <WithIconsDemo />;
  },
};

export const WithBadges = {
  render: () => {
    function WithBadgesDemo() {
      const [value, setValue] = useState('pro');
      return (
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <RadioCardGroup items={complexItems} value={value} onValueChange={setValue} />
        </div>
      );
    }
    return <WithBadgesDemo />;
  },
};

export const AllowDeselect = {
  render: () => {
    function AllowDeselectDemo() {
      const [value, setValue] = useState<string>('personal');
      return (
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <RadioCardGroup items={basicItems} value={value} onValueChange={setValue} allowDeselect />
        </div>
      );
    }
    return <AllowDeselectDemo />;
  },
};

export const Disabled = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '500px' }}>
      <RadioCardGroup items={basicItems} value="personal" onValueChange={() => {}} disabled />
    </div>
  ),
};
