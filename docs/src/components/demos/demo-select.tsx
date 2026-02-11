import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function DemoSelect() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-8">
      <Section title="Sizes">
        <div className="flex flex-col gap-4">
          <Select size="medium">
            <SelectTrigger>
              <SelectValue placeholder="Medium Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>

          <Select size="small">
            <SelectTrigger>
              <SelectValue placeholder="Small Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>

          <Select size="xsmall">
            <SelectTrigger>
              <SelectValue placeholder="XSmall Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Section>

      <Section title="Variants">
        <div className="flex flex-col gap-4">
          <Select variant="default">
            <SelectTrigger>
              <SelectValue placeholder="Default Variant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
            </SelectContent>
          </Select>

          <Select variant="compact">
            <SelectTrigger>
              <SelectValue placeholder="Compact Variant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Section>

      <Section title="States">
        <div className="flex flex-col gap-4">
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="Disabled" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Option 1</SelectItem>
            </SelectContent>
          </Select>

          <Select hasError>
            <SelectTrigger>
              <SelectValue placeholder="Error State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Option 1</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Section>
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium tracking-wider text-slate-500 uppercase">
        {title}
      </h3>
      {children}
    </div>
  )
}
