'use client';

import { getStory } from '@/lib/story-registry';
import { ComponentPreview } from './ComponentPreview';

interface StoryPreviewProps {
  componentName: string;
  storyNames: string[];
  previewClassName?: string;
}

export function StoryPreview({ componentName, storyNames, previewClassName }: StoryPreviewProps) {
  return (
    <ComponentPreview className={previewClassName}>
      {storyNames.map((name) => {
        const render = getStory(componentName, name);
        return render ? <div key={name}>{render()}</div> : null;
      })}
    </ComponentPreview>
  );
}
