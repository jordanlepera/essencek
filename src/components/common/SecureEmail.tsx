'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Mail, MousePointerClick } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type SecureEmailProps = {
  email: string;
  className?: string;
};

export const SecureEmail = ({ email, className }: SecureEmailProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const t = useTranslations('Contact');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className={cn('inline-flex items-center', className)}>
      <AnimatePresence mode="wait">
        {!isRevealed
          ? (
              <motion.div
                key="reveal-btn"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex items-center"
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsRevealed(true)}
                  className="rounded-xl flex items-center gap-2 group border-primary/20 hover:border-primary/50 hover:bg-primary/5 h-10 px-4 transition-all duration-300 shadow-none text-foreground/80 hover:text-primary"
                >
                  <div className="relative">
                    <Mail className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ repeat: Infinity, duration: 2.5 }}
                      className="absolute inset-0 bg-primary/20 rounded-full"
                    />
                  </div>
                  <span className="text-sm font-medium">{t('email_reveal')}</span>
                  <MousePointerClick className="h-3.5 w-3.5 text-muted-foreground/60 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </motion.div>
            )
          : (
              <motion.div
                key="email-display"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 bg-primary/5 px-4 py-1.5 rounded-xl border border-primary/10 backdrop-blur-sm"
              >
                <motion.span
                  initial={{ filter: 'blur(3px)' }}
                  animate={{ filter: 'blur(0px)' }}
                  className="text-lg font-bold tracking-tight text-foreground select-all break-all"
                >
                  {email}
                </motion.span>

                <div className="flex items-center border-l border-primary/20 pl-3 gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="p-1.5 hover:bg-primary/20 rounded-lg transition-all group relative border-none bg-transparent cursor-pointer"
                    aria-label="Copy email address"
                  >
                    {isCopied
                      ? (
                          <Check className="h-4 w-4 text-green-600" />
                        )
                      : (
                          <Copy className="h-4 w-4 text-primary/70 group-hover:text-primary transition-colors" />
                        )}

                    <AnimatePresence>
                      {isCopied && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.8 }}
                          className="absolute -top-10 left-1/2 -translate-x-1/2"
                        >
                          <span className="text-[10px] font-bold text-white bg-primary px-2 py-1 rounded-lg shadow-lg whitespace-nowrap">
                            {t('email_copied')}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>

                  <a
                    href={`mailto:${email}`}
                    className="p-1.5 hover:bg-primary/20 rounded-lg transition-all group"
                    aria-label="Send email"
                  >
                    <Mail className="h-4 w-4 text-primary/70 group-hover:text-primary transition-colors" />
                  </a>
                </div>
              </motion.div>
            )}
      </AnimatePresence>
    </div>
  );
};
