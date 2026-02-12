import { DocsHeader } from '@/components/DocsHeader';
import { PrevNextLinks } from '@/components/PrevNextLinks';

export default function ComponentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
