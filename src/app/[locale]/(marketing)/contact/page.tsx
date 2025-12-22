'use client';

import { motion } from 'framer-motion';

import { Mail, MapPin, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { use } from 'react';

import { ContactForm } from '@/components/contact/ContactForm';

export default function ContactPage(props: { params: Promise<{ locale: string }> }) {
  use(props.params);
  const t = useTranslations('Contact');

  return (
    <div className="py-12 space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl font-bold tracking-tight">{t('meta_title')}</h1>
        <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex-1 space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Parlons de votre projet</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Que ce soit pour un dressing, une salle de bain ou une pièce de mobilier unique,
              nous sommes à votre écoute pour transformer vos idées en réalité.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6 items-center">
              <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                <Mail className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">E-mail</p>
                <p className="text-xl font-bold">contact@lessencek.fr</p>
              </div>
            </div>

            <div className="flex gap-6 items-center">
              <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                <Phone className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Téléphone</p>
                <p className="text-xl font-bold">06 00 00 00 00</p>
              </div>
            </div>

            <div className="flex gap-6 items-center">
              <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Localisation</p>
                <p className="text-xl font-bold">Atelier L'Essence K, France</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
