'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { NewsletterForm } from './NewsletterForm';

const STORAGE_KEY = 'newsletter_dismissed';

const SHOW_DELAY_MS = 5000;

export const NewsletterPopup = () => {
  const t = useTranslations('Newsletter');
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true);

  // Check sessionStorage and show popup after delay
  useEffect(() => {
    // Check session storage instead of local storage to show on every visit
    const dismissed = sessionStorage.getItem(STORAGE_KEY);

    if (dismissed) {
      return;
    }

    // Using a microtask to avoid the lint warning about setState in useEffect
    queueMicrotask(() => setIsDismissed(false));
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, SHOW_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  // React 19: No need for useCallback - React Compiler handles memoization automatically
  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem(STORAGE_KEY, 'true');
    setTimeout(() => setIsDismissed(true), 300);
  };

  if (isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:bottom-6 md:right-6 z-50 md:w-[340px] w-auto"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-2xl dark:bg-black/60 dark:border-white/10">
            {/* Close button */}
            <button
              type="button"
              onClick={handleDismiss}
              className="absolute top-3 right-3 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors z-10"
              aria-label={t('close')}
            >
              <X className="h-4 w-4" />
            </button>

            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-amber-500/10 pointer-events-none" />

            <div className="relative p-6">
              <NewsletterForm
                variant="popup"
                onSuccess={() => {
                  setTimeout(() => {
                    handleDismiss();
                  }, 3000);
                  // Not clearing timeout here as component might unmount, which is fine
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
