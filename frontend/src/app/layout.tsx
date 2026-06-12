import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Providers } from '@/components/providers/Providers';
import { suppressConsoleInProduction } from '@/lib/suppressConsole';
import '@/utils/suppressWarnings'; // Suppress non-critical warnings in development

// Suppress console logs in production
if (typeof window !== 'undefined') {
  suppressConsoleInProduction();
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'ÉBÉNOR CRÉATION - L\'élégance du bois, l\'empreinte de l\'art',
    template: '%s | ÉBÉNOR CRÉATION',
  },
  description: 'Créateur d\'espaces d\'exception en Tunisie depuis plus de 25 ans. Cuisines sur mesure, dressings luxueux, mobilier haut de gamme. Savoir-faire artisanal et matériaux nobles.',
  keywords: ['ébénisterie Tunisie', 'cuisine sur mesure', 'dressing luxueux', 'mobilier haut de gamme', 'menuiserie artisanale', 'aménagement intérieur', 'bois noble', 'fabrication sur mesure Tunis'],
  authors: [{ name: 'ÉBÉNOR CRÉATION' }],
  creator: 'ÉBÉNOR CRÉATION',
  publisher: 'ÉBÉNOR CRÉATION',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: '/',
    title: 'ÉBÉNOR CRÉATION - L\'élégance du bois, l\'empreinte de l\'art',
    description: 'Créateur d\'espaces d\'exception en Tunisie depuis plus de 25 ans. Cuisines sur mesure, dressings luxueux, mobilier haut de gamme.',
    siteName: 'ÉBÉNOR CRÉATION',
    images: [
      {
        url: '/logo/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'ÉBÉNOR CRÉATION - Fabrication de bois haut de gamme',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ÉBÉNOR CRÉATION - L\'élégance du bois, l\'empreinte de l\'art',
    description: 'Créateur d\'espaces d\'exception en Tunisie depuis plus de 25 ans. Cuisines sur mesure, dressings luxueux, mobilier haut de gamme.',
    images: ['/logo/logo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo/logo.jpg',
    shortcut: '/logo/logo.jpg',
    apple: '/logo/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <Script
          id="silence-console"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
(function(){var n=function(){};window.console={log:n,warn:n,error:n,info:n,debug:n,trace:n,table:n,dir:n,dirxml:n,group:n,groupCollapsed:n,groupEnd:n,time:n,timeEnd:n,timeLog:n,timeStamp:n,count:n,countReset:n,assert:n,clear:n,profile:n,profileEnd:n};window.addEventListener('error',function(e){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();return false},true);window.addEventListener('unhandledrejection',function(e){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();return false},true);window.addEventListener('rejectionhandled',function(e){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();return false},true);window.onerror=function(){return true};window.onunhandledrejection=function(){return true};try{Object.defineProperty(window,'console',{value:window.console,writable:false,configurable:false})}catch(e){}})();
            `.trim()
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          <div id="root">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}