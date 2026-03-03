import { Tag } from './tag';

export default { title: 'UI/Tag', component: Tag };

export const Default = {
  render: () => <Tag variant="stroke">Tag Label</Tag>,
};

export const GrayVariant = {
  render: () => <Tag variant="gray">Gray Tag</Tag>,
};
