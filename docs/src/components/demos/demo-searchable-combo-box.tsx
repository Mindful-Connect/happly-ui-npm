'use client'

import * as React from 'react'
import { SearchableMultiCombobox } from '@/components/ui/searchable-combo-box'
import { Tag } from '@/lib/tag-utils'

const mockTranslations = {
  _domain: {
    search: 'Search',
    tagCategory: {
      demographic: 'demographic',
      incorporation_type: 'incorporation type',
      opportunity_type: 'opportunity type',
      perk: 'perk',
      sector: 'sector',
      skill: 'skill',
    },
  },
  inputs: {
    tag_combobox: {
      noMatchesFound: 'No matches found',
      orAdd: ' or add yours',
      pressEnterToAdd: 'Press Enter to add what you typed',
    },
  },
}

const mockTags = [
  {
    id: 88,
    provider_id: null,
    slug: '3d-modeling',
    category: 'skill',
    label: '3D Modeling',
    order: 0,
    style: null,
  },
  {
    id: 96,
    provider_id: null,
    slug: 'aerospace-engineering',
    category: 'skill',
    label: 'Aerospace Engineering',
    order: 0,
    style: null,
  },
  {
    id: 89,
    provider_id: null,
    slug: 'animation',
    category: 'skill',
    label: 'Animation',
    order: 0,
    style: null,
  },
  {
    id: 74,
    provider_id: null,
    slug: 'artificial-intelligence',
    category: 'skill',
    label: 'Artificial Intelligence',
    order: 0,
    style: null,
  },
  {
    id: 83,
    provider_id: null,
    slug: 'augmented-reality',
    category: 'skill',
    label: 'Augmented Reality',
    order: 0,
    style: null,
  },
  {
    id: 95,
    provider_id: null,
    slug: 'bioinformatics',
    category: 'skill',
    label: 'Bioinformatics',
    order: 0,
    style: null,
  },
  {
    id: 73,
    provider_id: null,
    slug: 'blockchain-technology',
    category: 'skill',
    label: 'Blockchain Technology',
    order: 0,
    style: null,
  },
  {
    id: 93,
    provider_id: null,
    slug: 'business-intelligence',
    category: 'skill',
    label: 'Business Intelligence',
    order: 0,
    style: null,
  },
  {
    id: 68,
    provider_id: null,
    slug: 'cloud-computing',
    category: 'skill',
    label: 'Cloud Computing',
    order: 0,
    style: null,
  },
  {
    id: 92,
    provider_id: null,
    slug: 'content-writing',
    category: 'skill',
    label: 'Content Writing',
    order: 0,
    style: null,
  },
  {
    id: 67,
    provider_id: null,
    slug: 'cybersecurity',
    category: 'skill',
    label: 'Cybersecurity',
    order: 0,
    style: null,
  },
  {
    id: 76,
    provider_id: null,
    slug: 'database-management',
    category: 'skill',
    label: 'Database Management',
    order: 0,
    style: null,
  },
  {
    id: 65,
    provider_id: null,
    slug: 'data-science',
    category: 'skill',
    label: 'Data Science',
    order: 0,
    style: null,
  },
  {
    id: 72,
    provider_id: null,
    slug: 'devops',
    category: 'skill',
    label: 'DevOps',
    order: 0,
    style: null,
  },
  {
    id: 90,
    provider_id: null,
    slug: 'digital-art',
    category: 'skill',
    label: 'Digital Art',
    order: 0,
    style: null,
  },
  {
    id: 78,
    provider_id: null,
    slug: 'digital-marketing',
    category: 'skill',
    label: 'Digital Marketing',
    order: 0,
    style: null,
  },
  {
    id: 98,
    provider_id: null,
    slug: 'e-commerce-development',
    category: 'skill',
    label: 'E-commerce Development',
    order: 0,
    style: null,
  },
  {
    id: 81,
    provider_id: null,
    slug: 'embedded-systems',
    category: 'skill',
    label: 'Embedded Systems',
    order: 0,
    style: null,
  },
  {
    id: 87,
    provider_id: null,
    slug: 'ethical-hacking',
    category: 'skill',
    label: 'Ethical Hacking',
    order: 0,
    style: null,
  },
  {
    id: 71,
    provider_id: null,
    slug: 'game-development',
    category: 'skill',
    label: 'Game Development',
    order: 0,
    style: null,
  },
  {
    id: 77,
    provider_id: null,
    slug: 'graphic-design',
    category: 'skill',
    label: 'Graphic Design',
    order: 0,
    style: null,
  },
  {
    id: 84,
    provider_id: null,
    slug: 'internet-of-things',
    category: 'skill',
    label: 'Internet of Things',
    order: 0,
    style: null,
  },
  {
    id: 66,
    provider_id: null,
    slug: 'machine-learning',
    category: 'skill',
    label: 'Machine Learning',
    order: 0,
    style: null,
  },
  {
    id: 70,
    provider_id: null,
    slug: 'mobile-app-development',
    category: 'skill',
    label: 'Mobile App Development',
    order: 0,
    style: null,
  },
  {
    id: 75,
    provider_id: null,
    slug: 'network-engineering',
    category: 'skill',
    label: 'Network Engineering',
    order: 0,
    style: null,
  },
  {
    id: 99,
    provider_id: null,
    slug: 'other',
    category: 'skill',
    label: 'Other',
    order: 0,
    style: null,
  },
  {
    id: 79,
    provider_id: null,
    slug: 'project-management',
    category: 'skill',
    label: 'Project Management',
    order: 0,
    style: null,
  },
  {
    id: 80,
    provider_id: null,
    slug: 'quality-assurance',
    category: 'skill',
    label: 'Quality Assurance',
    order: 0,
    style: null,
  },
  {
    id: 86,
    provider_id: null,
    slug: 'quantum-computing',
    category: 'skill',
    label: 'Quantum Computing',
    order: 0,
    style: null,
  },
  {
    id: 97,
    provider_id: null,
    slug: 'renewable-energy',
    category: 'skill',
    label: 'Renewable Energy',
    order: 0,
    style: null,
  },
  {
    id: 85,
    provider_id: null,
    slug: 'robotics',
    category: 'skill',
    label: 'Robotics',
    order: 0,
    style: null,
  },
  {
    id: 91,
    provider_id: null,
    slug: 'seo-sem-marketing',
    category: 'skill',
    label: 'SEO/SEM Marketing',
    order: 0,
    style: null,
  },
  {
    id: 63,
    provider_id: null,
    slug: 'software-engineering',
    category: 'skill',
    label: 'Software Engineering',
    order: 0,
    style: null,
  },
  {
    id: 94,
    provider_id: null,
    slug: 'sustainable-technology',
    category: 'skill',
    label: 'Sustainable Technology',
    order: 0,
    style: null,
  },
  {
    id: 69,
    provider_id: null,
    slug: 'ui-ux-design',
    category: 'skill',
    label: 'UI/UX Design',
    order: 0,
    style: null,
  },
  {
    id: 82,
    provider_id: null,
    slug: 'virtual-reality',
    category: 'skill',
    label: 'Virtual Reality',
    order: 0,
    style: null,
  },
  {
    id: 64,
    provider_id: null,
    slug: 'web-development',
    category: 'skill',
    label: 'Web Development',
    order: 0,
    style: null,
  },
] as unknown as Tag[]

export function DemoSearchableComboBox() {
  const [selected, setSelected] = React.useState<Tag[]>([])

  // Mock translation function
  const t = (key: string) => {
    const keys = key.split('.')
    let translation = mockTranslations
    for (const k of keys) {
      translation = (translation as any)[k]
    }
    return translation
  }

  const useTags = ({ customTagOptions }: any) => {
    return {
      tags: mockTags,
      status: 'success' as const,
    }
  }

  return (
    <div className="w-full max-w-sm space-y-4">
      <SearchableMultiCombobox
        selected={selected}
        setSelected={setSelected}
        selectedLang="en"
        tag="skill"
        t={t}
        useTags={useTags}
        placeholder="Select skills..."
        allowAdding={false}
        isPreview={false}
      />
    </div>
  )
}
