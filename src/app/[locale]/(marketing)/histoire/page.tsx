'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

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
              "La seule limite fixée, sera celle de notre imagination."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8"
          >
            <div className="p-8 rounded-3xl bg-accent/10 border border-primary/5 space-y-3">
              <h3 className="text-xl font-bold">Menuisier</h3>
              <p className="text-sm text-muted-foreground">Savoir-faire artisanal et précision technique.</p>
            </div>
            <div className="p-8 rounded-3xl bg-accent/10 border border-primary/5 space-y-3">
              <h3 className="text-xl font-bold">Artiste</h3>
              <p className="text-sm text-muted-foreground">Une vision créative pour des pièces uniques.</p>
            </div>
            <div className="p-8 rounded-3xl bg-accent/10 border border-primary/5 space-y-3">
              <h3 className="text-xl font-bold">Ebéniste</h3>
              <p className="text-sm text-muted-foreground">Maîtrise des essences de bois et des finitions.</p>
            </div>
            <div className="p-8 rounded-3xl bg-accent/10 border border-primary/5 space-y-3">
              <h3 className="text-xl font-bold">Photographe</h3>
              <p className="text-sm text-muted-foreground">L'œil pour le détail et la mise en valeur du design.</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex-1 w-full aspect-3/4 rounded-[2.5rem] bg-accent/10 border border-primary/5 overflow-hidden relative"
        >
          {/* Placeholder for Jo Cappitta's photo */}
          <div className="absolute inset-0 bg-linear-to-tr from-primary/10 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center text-primary/20 font-bold text-lg italic">
            Portrait de Jo Cappitta
          </div>
        </motion.div>
      </div>
    </div>
  );
}
