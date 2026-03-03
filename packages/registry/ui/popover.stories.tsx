import { Popover, PopoverTrigger, PopoverContent } from './popover';

export default { title: 'UI/Popover', component: Popover };

export const Default = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="rounded-lg border border-ds-neutral-200 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-ds-neutral-50"
        >
          Open Popover
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Popover Content</p>
          <p className="text-sm text-ds-neutral-600">
            This is a simple popover with rich content inside.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const InlinePortal = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="rounded-lg border border-ds-neutral-200 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-ds-neutral-50"
        >
          Inline Popover (no portal)
        </button>
      </PopoverTrigger>
      <PopoverContent usePortal={false}>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Inline Content</p>
          <p className="text-sm text-ds-neutral-600">
            This popover renders inline without a portal, useful inside modals.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
