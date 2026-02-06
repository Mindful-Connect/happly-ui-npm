// Types for registry items - can be used anywhere
export interface RegistryItem {
  name: string
  type: 'registry:ui' | 'registry:lib' | 'registry:hook'
  title: string
  description: string
  dependencies: string[]
  registryDependencies: string[]
}

export interface RegistryItemWithDocs extends RegistryItem {
  docs?: {
    lead?: string
    usage?: string
    examples?: Array<{
      title: string
      description?: string
      code: string
      preview?: ComponentPreviewConfig[]
    }>
    api?: Array<{
      name: string
      description?: string
      props: Array<{
        name: string
        type: string
        default?: string
        description: string
      }>
    }>
  }
  files?: Array<{
    path: string
    type: string
    content: string
  }>
}

// Preview configuration for rendering demo components
export interface ComponentPreviewConfig {
  component:
    | 'button'
    | 'badge'
    | 'input'
    | 'label'
    | 'card'
    | 'divider'
    | 'phone-input'
    | 'textarea'
    | 'form-group'
    | 'radio-card-group'
    | 'calendar-input'
    | 'socials-input'
    | 'select'
    | 'location-input'
    | 'tag'
    | 'searchable-combo-box'
    | 'currency-input'
  props?: Record<string, unknown>
  children?: string | ComponentPreviewConfig[]
}

export interface Registry {
  name: string
  homepage: string
  items: RegistryItem[]
}
