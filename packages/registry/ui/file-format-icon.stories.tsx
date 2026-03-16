import * as FileFormatIcon from './file-format-icon';

export default { title: 'Form/File Upload/File Format Icon', component: FileFormatIcon.Root };

export const Default = {
  render: () => <FileFormatIcon.Root format='PDF' color='red' />,
};

export const Colors = {
  render: () => (
    <div className='flex items-center gap-4'>
      <FileFormatIcon.Root format='PDF' color='red' />
      <FileFormatIcon.Root format='DOC' color='blue' />
      <FileFormatIcon.Root format='XLS' color='green' />
      <FileFormatIcon.Root format='PPT' color='orange' />
      <FileFormatIcon.Root format='ZIP' color='purple' />
      <FileFormatIcon.Root format='IMG' color='pink' />
      <FileFormatIcon.Root format='CSV' color='sky' />
      <FileFormatIcon.Root format='KEY' color='yellow' />
      <FileFormatIcon.Root format='TXT' color='gray' />
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div className='flex items-end gap-4'>
      <FileFormatIcon.Root format='PDF' color='red' size='small' />
      <FileFormatIcon.Root format='PDF' color='red' size='medium' />
    </div>
  ),
};
