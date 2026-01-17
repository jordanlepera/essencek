'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { use } from 'react';

export default function HistoirePage(props: { params: Promise<{ locale: string }> }) {
  use(props.params);
  const t = useTranslations('History');

  return (
    <div className="py-12 space-y-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl font-bold tracking-tight">{t('meta_title')}</h1>
        <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="flex-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-primary">{t('biography_title')}</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('biography_text')}
            </p>
            <p className="text-lg text-muted-foreground/80 leading-relaxed italic">
              "
              {t('quote')}
              "
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8"
          >
            <div className="p-8 rounded-3xl bg-accent/10 border border-primary/5 space-y-3">
              <h3 className="text-xl font-bold">{t('roles.menuisier.title')}</h3>
              <p className="text-sm text-muted-foreground">{t('roles.menuisier.description')}</p>
            </div>
            <div className="p-8 rounded-3xl bg-accent/10 border border-primary/5 space-y-3">
              <h3 className="text-xl font-bold">{t('roles.artiste.title')}</h3>
              <p className="text-sm text-muted-foreground">{t('roles.artiste.description')}</p>
            </div>
            <div className="p-8 rounded-3xl bg-accent/10 border border-primary/5 space-y-3">
              <h3 className="text-xl font-bold">{t('roles.ebeniste.title')}</h3>
              <p className="text-sm text-muted-foreground">{t('roles.ebeniste.description')}</p>
            </div>
            <div className="p-8 rounded-3xl bg-accent/10 border border-primary/5 space-y-3">
              <h3 className="text-xl font-bold">{t('roles.photographe.title')}</h3>
              <p className="text-sm text-muted-foreground">{t('roles.photographe.description')}</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex-1 w-full aspect-3/4 rounded-[2.5rem] bg-accent/10 border border-primary/5 overflow-hidden relative shadow-2xl group"
        >
          <Image
            src="/assets/images/portrait/portrait1.avif"
            alt={t('portrait_alt')}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={90}
            priority
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-40 hover:opacity-10 transition-opacity" />
        </motion.div>
      </div>
    </div>
  );
}
