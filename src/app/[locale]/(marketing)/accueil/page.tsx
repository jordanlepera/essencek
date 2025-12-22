'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { use } from 'react';
import { GalleryHighlight } from '@/components/home/GalleryHighlight';
import { HeroSection } from '@/components/home/HeroSection';
import { ServicesSection } from '@/components/home/ServicesSection';

export default function AccueilPage(props: { params: Promise<{ locale: string }> }) {
  use(props.params);
  const t = useTranslations('Index');

  return (
    <div className="space-y-12">
      <HeroSection />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <ServicesSection />
        <GalleryHighlight />

        {/* Placeholder for Contact section */}
        <section className="py-24 text-center">
          <h2 className="text-3xl font-bold mb-8">{t('contact_title')}</h2>
          <p className="text-muted-foreground mb-8">
            Vous avez un projet ? N'hésitez pas à nous contacter pour une étude personnalisée.
          </p>
        </section>
      </motion.div>
    </div>
  );
}
