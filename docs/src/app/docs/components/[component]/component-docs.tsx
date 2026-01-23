'use client'

import { DocsHeader } from '@/components/DocsHeader'
import { Fence } from '@/components/Fence'
import { Prose } from '@/components/Prose'
import {
  ComponentPreview,
  DemoButton,
  DemoBadge,
  DemoInput,
  DemoLabel,
  DemoCard,
  DemoCardHeader,
  DemoCardTitle,
  DemoCardDescription,
  DemoCardContent,
  ButtonGroup,
} from '@/components/ComponentPreview'
import type { RegistryItemWithDocs, ComponentPreviewConfig } from '@/lib/registry'

interface ComponentDocsProps {
  component: RegistryItemWithDocs
}

// Render a single preview item
function PreviewItem({ config }: { config: ComponentPreviewConfig }) {
  const { component, props = {}, children } = config

  switch (component) {
    case 'button':
      return <DemoButton {...(props as any)}>{children}</DemoButton>
    case 'badge':
      return <DemoBadge {...(props as any)}>{children}</DemoBadge>
    case 'input':
      return <DemoInput {...(props as any)} />
    case 'label':
      return <DemoLabel {...(props as any)}>{children}</DemoLabel>
    case 'card':
      return (
        <DemoCard>
          <DemoCardHeader>
            <DemoCardTitle>{(props as any).title || 'Card Title'}</DemoCardTitle>
            {(props as any).description && (
              <DemoCardDescription>{(props as any).description}</DemoCardDescription>
            )}
          </DemoCardHeader>
          {children && <DemoCardContent>{children}</DemoCardContent>}
        </DemoCard>
      )
    default:
      return null
  }
}

// Render preview group
function PreviewGroup({ previews }: { previews: ComponentPreviewConfig[] }) {
  // Check if all previews are buttons - wrap in ButtonGroup
  const allButtons = previews.every((p) => p.component === 'button')

  if (allButtons) {
    return (
      <ComponentPreview>
        <ButtonGroup>
          {previews.map((config, index) => (
            <PreviewItem key={index} config={config} />
          ))}
        </ButtonGroup>
      </ComponentPreview>
    )
  }

  return (
    <ComponentPreview>
      {previews.map((config, index) => (
        <PreviewItem key={index} config={config} />
      ))}
    </ComponentPreview>
  )
}

export function ComponentDocs({ component }: ComponentDocsProps) {
  const { name, title, description, dependencies, registryDependencies, docs, files } = component

  // Extract source code from the first file
  const sourceCode = files?.[0]?.content || ''

  // Get export info from source code
  const exports = extractExports(sourceCode)

  return (
    <article>
      <DocsHeader title={title} />
      <Prose>
        {/* Lead paragraph */}
        <p className="lead">{docs?.lead || description}</p>

        <hr />

        {/* Installation */}
        <h2 id="installation">Installation</h2>
        <Fence language="bash">{`bunx @happlyui/cli@latest add ${name}`}</Fence>

        <hr />

        {/* Dependencies */}
        {(dependencies.length > 0 || registryDependencies.length > 0) && (
          <>
            <h2 id="dependencies">Dependencies</h2>
            {dependencies.length > 0 && (
              <>
                <h3>npm packages</h3>
                <ul>
                  {dependencies.map((dep) => (
                    <li key={dep}>
                      <code>{dep}</code>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {registryDependencies.length > 0 && (
              <>
                <h3>Registry dependencies</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  These are automatically installed when you add this component.
                </p>
                <ul>
                  {registryDependencies.map((dep) => (
                    <li key={dep}>
                      <code>{dep}</code>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <hr />
          </>
        )}

        {/* Usage */}
        <h2 id="usage">Usage</h2>
        {docs?.usage ? (
          <Fence language="tsx">{docs.usage}</Fence>
        ) : (
          <BasicUsageExample name={name} exports={exports} />
        )}

        <hr />

        {/* Examples from docs field */}
        {docs?.examples && docs.examples.length > 0 && (
          <>
            <h2 id="examples">Examples</h2>
            {docs.examples.map((example, index) => (
              <div key={index} className="mb-8">
                <h3>{example.title}</h3>
                {example.description && <p>{example.description}</p>}
                {example.preview && example.preview.length > 0 && (
                  <PreviewGroup previews={example.preview} />
                )}
                <Fence language="tsx">{example.code}</Fence>
              </div>
            ))}
            <hr />
          </>
        )}

        {/* API Reference from docs field */}
        {docs?.api && docs.api.length > 0 && (
          <>
            <h2 id="api-reference">API Reference</h2>
            {docs.api.map((apiItem, index) => (
              <div key={index} className="mb-8">
                <h3>{apiItem.name}</h3>
                {apiItem.description && <p>{apiItem.description}</p>}
                <div className="overflow-x-auto">
                  <table>
                    <thead>
                      <tr>
                        <th>Prop</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiItem.props.map((prop, propIndex) => (
                        <tr key={propIndex}>
                          <td>
                            <code>{prop.name}</code>
                          </td>
                          <td>
                            <code className="text-xs">{prop.type}</code>
                          </td>
                          <td>{prop.default ? <code>{prop.default}</code> : '-'}</td>
                          <td>{prop.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
            <hr />
          </>
        )}

        {/* Source Code Preview */}
        <h2 id="source-code">Source Code</h2>
        <p>
          This is the full source code that gets installed in your project. You own this code and
          can customize it freely.
        </p>
        <details className="mt-4">
          <summary className="cursor-pointer font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100">
            View source ({files?.[0]?.path || `ui/${name}.tsx`})
          </summary>
          <div className="mt-4 max-h-[500px] overflow-auto">
            <Fence language="tsx">{sourceCode}</Fence>
          </div>
        </details>
      </Prose>
    </article>
  )
}

// Extract exported component names from source code
function extractExports(sourceCode: string): string[] {
  const exports: string[] = []

  // Match named exports: export { Foo, Bar }
  const namedExportMatch = sourceCode.match(/export\s*\{([^}]+)\}/g)
  if (namedExportMatch) {
    namedExportMatch.forEach((match) => {
      const inner = match.match(/export\s*\{([^}]+)\}/)
      if (inner?.[1]) {
        inner[1].split(',').forEach((exp) => {
          const name = exp.split(' as ')[0].trim()
          if (name && !name.includes('type')) {
            exports.push(name)
          }
        })
      }
    })
  }

  // Match export const/function: export const Foo = / export function Foo
  const directExportMatch = sourceCode.match(/export\s+(const|function|class)\s+(\w+)/g)
  if (directExportMatch) {
    directExportMatch.forEach((match) => {
      const nameMatch = match.match(/export\s+(?:const|function|class)\s+(\w+)/)
      if (nameMatch?.[1]) {
        exports.push(nameMatch[1])
      }
    })
  }

  return [...new Set(exports)]
}

// Generate a basic usage example
function BasicUsageExample({ name, exports }: { name: string; exports: string[] }) {
  // Check if this is a compound component (has Root export)
  const hasRoot = exports.some((e) => e === 'Root' || e.includes('Root'))
  const componentName = name.charAt(0).toUpperCase() + name.slice(1)

  if (hasRoot) {
    return (
      <Fence language="tsx">
        {`import * as ${componentName} from "@/components/ui/${name}"

<${componentName}.Root>
  {/* Content */}
</${componentName}.Root>`}
      </Fence>
    )
  }

  // Regular component
  const mainExport =
    exports.find((e) => e.toLowerCase() === name.toLowerCase()) ||
    exports.find((e) => e === componentName) ||
    exports[0] ||
    componentName

  return (
    <Fence language="tsx">
      {`import { ${mainExport} } from "@/components/ui/${name}"

<${mainExport}>
  {/* Content */}
</${mainExport}>`}
    </Fence>
  )
}
