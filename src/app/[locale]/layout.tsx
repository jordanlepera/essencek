import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Outfit } from 'next/font/google';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { PostHogProvider } from '@/components/analytics/PostHogProvider';
import { NewsletterPopup } from '@/components/newsletter/NewsletterPopup';
import { Env } from '@/libs/Env';
import { routing } from '@/libs/I18nRouting';
import '@/styles/global.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(Env.NEXT_PUBLIC_APP_URL || 'https://lessencek.com'),
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'L\'Essence K',
    'url': Env.NEXT_PUBLIC_APP_URL || 'https://lessencek.com',
    'description': 'L\'Essence K, artisan menuisier ébéniste créant des dressings, salles de bains et mobiliers uniques sur mesure.',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Mulhouse',
      'addressRegion': 'Haut-Rhin',
      'addressCountry': 'FR',
    },
    'priceRange': '€€',
  };

  return (
    <html lang={locale} className={outfit.variable}>
      <body className="font-sans">
        <NextIntlClientProvider>
          <PostHogProvider>
            {props.children}
            <NewsletterPopup />
          </PostHogProvider>
          <Script
            id="json-ld"
            type="application/ld+json"
            // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
