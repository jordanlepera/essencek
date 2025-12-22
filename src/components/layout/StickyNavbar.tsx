'use client';

import { AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, usePathname } from '@/libs/I18nNavigation';
import { MobileMenu } from './MobileMenu';

export const StickyNavbar = () => {
  const t = useTranslations('RootLayout');
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/accueil', label: t('home_link') },
    { href: '/services', label: t('services_link') },
    { href: '/realisations', label: t('realisations_link') },
    { href: '/histoire', label: t('history_link') },
    { href: '/contact', label: t('contact_link') },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled ? 'glass py-2' : 'bg-transparent',
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/accueil" className="text-2xl font-bold tracking-tight text-primary">
          L'Essence K
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary' : 'text-foreground/70',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onCloseAction={() => setIsMobileMenuOpen(false)}
            links={navLinks}
          />
        )}
      </AnimatePresence>
    </header>
  );
};
