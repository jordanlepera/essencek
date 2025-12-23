'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { use } from 'react';

export default function RealisationsPage(props: { params: Promise<{ locale: string }> }) {
  use(props.params);
  const t = useTranslations('Realisations');

  const items = [
    { id: 1, key: 'dressing_moderne', aspect: 'aspect-[3/4]' },
    { id: 2, key: 'salle_de_bain_zen', aspect: 'aspect-square' },
    { id: 3, key: 'placard_sous_pente', aspect: 'aspect-[4/3]' },
    { id: 4, key: 'table_artisanale', aspect: 'aspect-square' },
    { id: 5, key: 'dressing_angle', aspect: 'aspect-[9/16]' },
    { id: 6, key: 'meuble_lavabo', aspect: 'aspect-[4/5]' },
    { id: 7, key: 'bibliotheque', aspect: 'aspect-[3/2]' },
    { id: 8, key: 'casque_kustom', aspect: 'aspect-square' },
  ];

  return (
    <div className="space-y-12 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl font-bold tracking-tight">{t('page_title')}</h1>
        <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t('page_description')}
        </p>
      </motion.div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`relative group bg-accent/10 rounded-3xl overflow-hidden cursor-pointer break-inside-avoid shadow-sm hover:shadow-xl transition-shadow duration-500 ${item.aspect}`}
          >
            {/* Image Placeholder */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-primary/20 flex items-center justify-center text-primary/10 italic text-sm text-center px-4">
              {t('image_placeholder')}
              {' '}
              {t(`items.${item.key}.title` as any)}
            </div>

            {/* Hover Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-primary/90 p-8 flex flex-col justify-end text-white backdrop-blur-sm"
            >
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest opacity-80">
                  {t(`items.${item.key}.category` as any)}
                </p>
                <h3 className="text-2xl font-bold">{t(`items.${item.key}.title` as any)}</h3>
                <p className="text-sm leading-relaxed opacity-90">
                  {t(`items.${item.key}.description` as any)}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
