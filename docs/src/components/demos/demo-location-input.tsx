import { LocationInput } from '@/components/ui/location-input'
import { useState } from 'react'

export function DemoLocationInput() {
  const [location, setLocation] = useState<any>(null)

  return (
    <div className="flex w-full max-w-2xl flex-col gap-8">
      <Section title="Default">
        <LocationInput location={location} setLocation={setLocation} />
      </Section>

      <Section title="With Placeholder">
        <LocationInput
          location={location}
          setLocation={setLocation}
          placeholder="Search for a city..."
        />
      </Section>

      <div className="mt-4 overflow-auto rounded bg-gray-100 p-4 text-xs">
        <pre>{JSON.stringify(location, null, 2)}</pre>
      </div>
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
