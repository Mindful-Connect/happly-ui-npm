import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getAllHookNames, getComponent } from '@/lib/registry.server';
import { ComponentDocs } from '../../components/[component]/component-docs';

interface PageProps {
  params: Promise<{ hook: string }>;
}

// Generate static params for all hooks
export async function generateStaticParams() {
  const hookNames = getAllHookNames();
  return hookNames.map((name) => ({
    hook: name,
  }));
}

// Generate metadata for each hook
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { hook: hookName } = await params;
  const hook = getComponent(hookName);

  if (!hook) {
    return {
      title: 'Hook Not Found',
    };
  }

  return {
    title: hook.title,
    description: hook.description,
  };
}

export default async function HookPage({ params }: PageProps) {
  const { hook: hookName } = await params;
  const hook = getComponent(hookName);

  if (!hook) {
    notFound();
  }

  return <ComponentDocs component={hook} />;
}
