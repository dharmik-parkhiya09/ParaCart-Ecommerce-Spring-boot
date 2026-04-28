import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'ParaCart - Online Shopping',
  description: 'Shop the best products at ParaCart with fast delivery and secure checkout',
  keywords: 'ecommerce, shopping, online store, products',
  openGraph: {
    title: 'ParaCart - Online Shopping',
    description: 'Shop the best products at ParaCart',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-background">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
