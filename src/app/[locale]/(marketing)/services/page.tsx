'use client';

import { motion } from 'framer-motion';
import { ServicesSection } from '@/components/home/ServicesSection';

export default function ServicesPage() {
  return (
    <div className="space-y-12 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl font-bold tracking-tight">Nos Services</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Découvrez l'étendue de notre savoir-faire, de la menuiserie traditionnelle
          aux créations les plus modernes et personnalisées.
        </p>
      </motion.div>

      <ServicesSection />
    </div>
  );
}
