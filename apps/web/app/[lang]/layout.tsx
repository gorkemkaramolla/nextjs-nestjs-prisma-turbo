import type { Metadata } from 'next';
import './globals.css';
import { availableLanguages } from '@/components/languages';
import LanguagePicker from '@/components/languages/lang-picker';

export const metadata: Metadata = {
  title: 'Next.js + NestJS Monorepo',
  description: 'A modern full-stack monorepo template',
};

export function generateStaticParams() {
  return availableLanguages.map((lang) => ({ lang }));
}
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  return (
    <html lang={(await params).lang} className="">
      <body>
        <LanguagePicker />

        {children}
      </body>
    </html>
  );
}
