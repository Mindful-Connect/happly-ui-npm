'use client';

import * as React from 'react';
import { SearchableMultiCombobox } from './searchable-combo-box';

export default { title: 'Searchable Combo Box', component: SearchableMultiCombobox };

const mockTags = [
  { id: 88, slug: '3d-modeling', category: 'skill', label: '3D Modeling', order: 0 },
  { id: 96, slug: 'aerospace-engineering', category: 'skill', label: 'Aerospace Engineering', order: 0 },
  { id: 89, slug: 'animation', category: 'skill', label: 'Animation', order: 0 },
  { id: 74, slug: 'artificial-intelligence', category: 'skill', label: 'Artificial Intelligence', order: 0 },
  { id: 83, slug: 'augmented-reality', category: 'skill', label: 'Augmented Reality', order: 0 },
  { id: 95, slug: 'bioinformatics', category: 'skill', label: 'Bioinformatics', order: 0 },
  { id: 73, slug: 'blockchain-technology', category: 'skill', label: 'Blockchain Technology', order: 0 },
  { id: 68, slug: 'cloud-computing', category: 'skill', label: 'Cloud Computing', order: 0 },
  { id: 67, slug: 'cybersecurity', category: 'skill', label: 'Cybersecurity', order: 0 },
  { id: 65, slug: 'data-science', category: 'skill', label: 'Data Science', order: 0 },
  { id: 72, slug: 'devops', category: 'skill', label: 'DevOps', order: 0 },
  { id: 78, slug: 'digital-marketing', category: 'skill', label: 'Digital Marketing', order: 0 },
  { id: 71, slug: 'game-development', category: 'skill', label: 'Game Development', order: 0 },
  { id: 77, slug: 'graphic-design', category: 'skill', label: 'Graphic Design', order: 0 },
  { id: 66, slug: 'machine-learning', category: 'skill', label: 'Machine Learning', order: 0 },
  { id: 63, slug: 'software-engineering', category: 'skill', label: 'Software Engineering', order: 0 },
  { id: 69, slug: 'ui-ux-design', category: 'skill', label: 'UI/UX Design', order: 0 },
  { id: 64, slug: 'web-development', category: 'skill', label: 'Web Development', order: 0 },
];

const mockTranslations: Record<string, any> = {
  _domain: {
    search: 'Search',
    select: 'Select',
    tagCategory: {
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
};

const t = (key: string): string => {
  const keys = key.split('.');
  let translation: any = mockTranslations;
  for (const k of keys) {
    translation = translation?.[k];
  }
  return (translation as string) ?? key;
};

const useTags = () => ({
  tags: mockTags as any,
  status: 'success' as const,
});

export const Default = {
  render: () => {
    function SearchableComboBoxDemo() {
      const [selected, setSelected] = React.useState<any[]>([]);
      return (
        <div style={{ width: '100%', maxWidth: '400px' }}>
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
      );
    }
    return <SearchableComboBoxDemo />;
  },
};
