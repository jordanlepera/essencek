'use client';

import { useTranslations } from 'next-intl';
import { NewsletterForm } from './NewsletterForm';

export const NewsletterSection = () => {
  const t = useTranslations('Newsletter');

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with gradient similar to other sections */}
      <div className="absolute inset-0 bg-primary/5 dark:bg-primary/5" />
      <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-primary/10" />

      <div className="container relative mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              {t('section_title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('section_description')}
            </p>
          </div>

          <div className="max-w-md mx-auto bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-xl">
            <NewsletterForm variant="section" className="w-full text-left" />
          </div>

          <p className="text-sm text-muted-foreground">
            {t('privacy')}
          </p>
        </div>
      </div>
    </section>
  );
};
