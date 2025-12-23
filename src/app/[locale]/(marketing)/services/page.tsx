'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ServicesSection } from '@/components/home/ServicesSection';

export default function ServicesPage() {
  const t = useTranslations('Services');

  return (
    <div className="space-y-12 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl font-bold tracking-tight">{t('page_title')}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t('page_description')}
        </p>
      </motion.div>

      <ServicesSection />
    </div>
  );
}
