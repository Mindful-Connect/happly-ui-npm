'use client';

import { getStory } from '@/lib/story-registry';
import { ComponentPreview } from './ComponentPreview';

interface StoryPreviewProps {
  componentName: string;
  storyNames: string[];
}

export function StoryPreview({ componentName, storyNames }: StoryPreviewProps) {
  return (
    <ComponentPreview>
      {storyNames.map((name) => {
        const render = getStory(componentName, name);
        return render ? <div key={name}>{render()}</div> : null;
      })}
    </ComponentPreview>
  );
}
