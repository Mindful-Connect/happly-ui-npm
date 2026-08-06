import { type Metadata } from 'next';
import localFont from 'next/font/local';
import clsx from 'clsx';

import { Providers } from '@/app/providers';
import { Layout } from '@/components/Layout';

import '@/styles/tailwind.css';

// Mock Inter font config for offline building environments
const inter = {
  variable: '--font-inter',
};

// Use local version of Lexend so that we can use OpenType features
const lexend = localFont({
  src: '../fonts/lexend.woff2',
  display: 'swap',
  variable: '--font-lexend',
});

export const metadata: Metadata = {
  title: {
    template: '%s - HapplyUI',
    default: 'HapplyUI - Beautiful React Components',
  },
  description:
    'A copy-paste component registry for React. Beautiful, accessible components you own and customize.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={clsx('h-full antialiased', inter.variable, lexend.variable)}
      suppressHydrationWarning
    >
      <body
        className='flex min-h-full bg-white dark:bg-slate-900'
        suppressHydrationWarning
      >
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
