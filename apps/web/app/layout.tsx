import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Next.js + NestJS Monorepo',
  description: 'A modern full-stack monorepo template',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body>{children}</body>
    </html>
  );
}
