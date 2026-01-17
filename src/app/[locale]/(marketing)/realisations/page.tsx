'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { use } from 'react';

import { GalleryClient } from '@/components/realisations/GalleryClient';

export default function RealisationsPage(props: { params: Promise<{ locale: string }> }) {
  use(props.params);
  const t = useTranslations('Realisations');

  const items = [
    { id: 1, key: 'dressing_moderne', aspect: 'aspect-[3/4]', image: '/assets/images/dressing/dressing18.avif' },
    { id: 2, key: 'salle_de_bain_zen', aspect: 'aspect-square', image: '/assets/images/salledebain/salledebain2.avif' },
    { id: 3, key: 'placard_sous_pente', aspect: 'aspect-[4/3]', image: '/assets/images/mansarde/mansarde3.avif' },
    { id: 4, key: 'table_artisanale', aspect: 'aspect-square', image: '/assets/images/meuble/meuble3.avif' },
    { id: 5, key: 'dressing_angle', aspect: 'aspect-[9/16]', image: '/assets/images/dressing/dressing4.avif' },
    { id: 6, key: 'meuble_lavabo', aspect: 'aspect-[4/5]', image: '/assets/images/meuble/meuble14.avif' },
    { id: 7, key: 'bibliotheque', aspect: 'aspect-[3/2]', image: '/assets/images/meuble/meuble17.avif' },
    { id: 8, key: 'casque_kustom', aspect: 'aspect-square', image: '/assets/images/kustom/kustom4.avif' },
    { id: 9, key: 'meuble_tv_industriel', aspect: 'aspect-[16/9]', image: '/assets/images/meuble/meuble4.avif' },
    { id: 10, key: 'dressing_blanc_laque', aspect: 'aspect-[4/5]', image: '/assets/images/dressing/dressing12.avif' },
    { id: 11, key: 'meuble_sdb_teck', aspect: 'aspect-[4/3]', image: '/assets/images/salledebain/salledebain3.avif' },
    { id: 12, key: 'table_basse_racine', aspect: 'aspect-square', image: '/assets/images/meuble/meuble2.avif' },
    { id: 13, key: 'dressing_chene_clair', aspect: 'aspect-[3/4]', image: '/assets/images/dressing/dressing2.avif' },
    { id: 14, key: 'bureau_minimale', aspect: 'aspect-[3/2]', image: '/assets/images/meuble/meuble12.avif' },
    { id: 15, key: 'commode_vintage', aspect: 'aspect-[4/5]', image: '/assets/images/meuble/meuble13.avif' },
    { id: 16, key: 'double_vasque_pierre', aspect: 'aspect-square', image: '/assets/images/salledebain/salledebain1.avif' },
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

      <GalleryClient items={items} />
    </div>
  );
}
