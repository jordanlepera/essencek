'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, usePathname } from '@/libs/I18nNavigation';
import { LanguageSwitcher } from './LanguageSwitcher';

type MobileMenuProps = {
  isOpen: boolean;
  onCloseAction: () => void;
  links: Array<{ href: string; label: string }>;
};

export const MobileMenu = ({ isOpen, onCloseAction, links }: MobileMenuProps) => {
  const pathname = usePathname();

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuVariants: import('framer-motion').Variants = {
    closed: {
      opacity: 0,
      y: '-100%',
      transition: {
        duration: 0.5,
        ease: [0.32, 0, 0.67, 0], // Accelerated ease-in for exit
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // Smooth ease-out for entrance
      },
    },
  };

  const containerVariants: import('framer-motion').Variants = {
    open: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const linkVariants: import('framer-motion').Variants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="closed"
      animate="open"
      exit="closed"
      variants={menuVariants}
      className="fixed inset-0 z-60 bg-background flex flex-col items-center justify-center h-dvh"
    >
      <div className="absolute top-6 left-6">
        <LanguageSwitcher />
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-6 right-6"
        onClick={onCloseAction}
      >
        <X className="h-8 w-8" />
      </Button>

      <motion.nav
        variants={containerVariants}
        className="flex flex-col items-center justify-center gap-8"
      >
        {links.map(link => (
          <motion.div key={link.href} variants={linkVariants}>
            <Link
              href={link.href}
              onClick={onCloseAction}
              className={cn(
                'text-4xl font-bold tracking-tight transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary' : 'text-foreground',
              )}
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
      </motion.nav>

      <motion.div
        variants={linkVariants}
        className="absolute bottom-12 text-muted-foreground text-sm font-medium uppercase tracking-widest"
      >
        L'Essence K
      </motion.div>
    </motion.div>
  );
};
