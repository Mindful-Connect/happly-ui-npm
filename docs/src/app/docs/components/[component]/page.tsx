import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getAllComponentNames, getComponent } from '@/lib/registry.server';
import { ComponentDocs } from './component-docs';

interface PageProps {
  params: Promise<{ component: string }>;
}

// Generate static params for all components
export async function generateStaticParams() {
  const componentNames = getAllComponentNames();
  return componentNames.map((name) => ({
    component: name,
  }));
}

// Generate metadata for each component
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { component: componentName } = await params;
  const component = getComponent(componentName);

  if (!component) {
    return {
      title: 'Component Not Found',
    };
  }

  return {
    title: component.title,
    description: component.description,
  };
}

export default async function ComponentPage({ params }: PageProps) {
  const { component: componentName } = await params;
  const component = getComponent(componentName);

  if (!component) {
    notFound();
  }

  return <ComponentDocs component={component} />;
}
