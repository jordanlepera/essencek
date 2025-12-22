'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/libs/I18nNavigation';
import { AppConfig } from '@/utils/AppConfig';

export const Footer = () => {
  const t = useTranslations('RootLayout');
  const bt = useTranslations('BaseTemplate');

  const navLinks = [
    { href: '/accueil', label: t('home_link') },
    { href: '/services', label: t('services_link') },
    { href: '/realisations', label: t('realisations_link') },
    { href: '/histoire', label: t('history_link') },
    { href: '/contact', label: t('contact_link') },
  ];

  return (
    <footer className="border-t border-border py-12 px-6 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/accueil" className="text-xl font-bold tracking-tight text-primary">
            L'Essence K
          </Link>
          <p className="text-sm text-muted-foreground text-center md:text-left">
            {bt('description')}
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="text-sm text-center md:text-right text-muted-foreground">
          {`© ${new Date().getFullYear()} ${AppConfig.name}.`}
          <br />
          {bt.rich('made_with', {
            author: chunks => <span className="text-primary font-medium">{chunks}</span>,
          })}
        </div>
      </div>
    </footer>
  );
};
