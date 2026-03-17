import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getAllContextNames, getComponent } from '@/lib/registry.server';
import { ComponentDocs } from '../../components/[component]/component-docs';

interface PageProps {
  params: Promise<{ context: string }>;
}

// Generate static params for all contexts
export async function generateStaticParams() {
  const contextNames = getAllContextNames();
  return contextNames.map((name) => ({
    context: name,
  }));
}

// Generate metadata for each context
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { context: contextName } = await params;
  const context = getComponent(contextName);

  if (!context) {
    return {
      title: 'Context Not Found',
    };
  }

  return {
    title: context.title,
    description: context.description,
  };
}

export default async function ContextPage({ params }: PageProps) {
  const { context: contextName } = await params;
  const context = getComponent(contextName);

  if (!context) {
    notFound();
  }

  return <ComponentDocs component={context} />;
}
