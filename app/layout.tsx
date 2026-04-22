import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ToastProvider } from '@/components/toast-provider';
import { siteUrl } from '@/lib/site-url';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    template: '%s | Vercel Daily',
    default: 'Vercel Daily',
  },
  description: 'News and insights for modern web developers.',
  openGraph: {
    siteName: 'Vercel Daily',
    locale: 'en_US',
    type: 'website',
    title: 'Vercel Daily',
    description: 'News and insights for modern web developers.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ToastProvider>
          <Header />
          {children}
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
