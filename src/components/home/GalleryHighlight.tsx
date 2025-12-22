'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/libs/I18nNavigation';

export const GalleryHighlight = () => {
  const t = useTranslations('Index');

  return (
    <section className="py-24 bg-accent/5 -mx-6 px-12 rounded-[3rem]">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold tracking-tight"
          >
            {t('gallery_preview_title')}
          </motion.h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Découvrez une sélection de nos plus belles réalisations. Chaque pièce est unique,
            conçue pour répondre aux attentes les plus exigeantes de nos clients.
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Link href="/realisations">
              <Button size="lg" className="rounded-full flex gap-2">
                Voir la galerie
                {' '}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-4">
          {/* Placeholder grid for gallery preview */}
          <div className="aspect-square bg-primary/20 rounded-2xl" />
          <div className="aspect-square bg-primary/10 rounded-2xl mt-8" />
          <div className="aspect-square bg-primary/30 rounded-2xl -mt-8" />
          <div className="aspect-square bg-primary/15 rounded-2xl" />
        </div>
      </div>
    </section>
  );
};
