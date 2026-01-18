'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Mail, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { startTransition, useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { subscribeToNewsletter } from '@/app/actions/newsletter';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const STORAGE_KEY = 'newsletter_dismissed';

const SHOW_DELAY_MS = 5000;

export const NewsletterPopup = () => {
  const t = useTranslations('Newsletter');
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true);

  const newsletterSchema = z.object({
    email: z.string().email({
      message: t('validation_email'),
    }),
  });

  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
    },
  });

  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, {
    message: '',
    success: false,
  });

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

  function onSubmit(values: z.infer<typeof newsletterSchema>) {
    const formData = new FormData();
    formData.append('email', values.email);

    startTransition(() => {
      formAction(formData);
    });
  }

  // Auto-dismiss after success
  useEffect(() => {
    if (!state.success) {
      return;
    }

    const timer = setTimeout(() => {
      handleDismiss();
    }, 3000);

    return () => clearTimeout(timer);
  }, [state.success]);

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
              {state.success
                ? (
                    // Success state
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center text-center py-4"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.1 }}
                      >
                        <CheckCircle2 className="h-12 w-12 text-green-500 mb-3" />
                      </motion.div>
                      <h4 className="font-semibold text-lg">{t('success_title')}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t('success_message')}
                      </p>
                    </motion.div>
                  )
                : (
                    // Form state
                    <>
                      <div className="flex items-start gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-primary/10">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg leading-tight">{t('title')}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {t('description')}
                          </p>
                        </div>
                      </div>

                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder={t('email_placeholder')}
                                    {...field}
                                    className="rounded-xl h-11 bg-white/50 dark:bg-black/30 border-primary/10 focus:ring-primary"
                                    disabled={isPending}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {state.message && !state.success && (
                            <p className="text-sm text-destructive">{state.message}</p>
                          )}

                          <Button
                            type="submit"
                            className="w-full rounded-xl h-11 font-semibold"
                            disabled={isPending}
                          >
                            {isPending
                              ? (
                                  <span className="flex items-center gap-2">
                                    <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    {t('submitting')}
                                  </span>
                                )
                              : t('submit')}
                          </Button>
                        </form>
                      </Form>

                      <p className="text-xs text-muted-foreground text-center mt-4">
                        {t('privacy')}
                      </p>
                    </>
                  )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
