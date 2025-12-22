'use client';

import { motion } from 'framer-motion';
import { use } from 'react';

const realisations = [
  {
    id: 1,
    title: 'Dressing Moderne',
    description: 'Aménagement complet avec éclairage LED intégré et tiroirs à sortie totale.',
    category: 'Dressing',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 2,
    title: 'Salle de Bain Zen',
    description: 'Mobilier suspendu en chêne massif résistant à l\'humidité.',
    category: 'Salle de Bain',
    aspect: 'aspect-square',
  },
  {
    id: 3,
    title: 'Placard sous Pente',
    description: 'Optimisation maximale d\'un espace mansardé pour du rangement.',
    category: 'Mansarde',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 4,
    title: 'Table Artisanale',
    description: 'Mélange de bois massif et de métal pour une pièce unique.',
    category: 'Mobilier',
    aspect: 'aspect-square',
  },
  {
    id: 5,
    title: 'Dressing d\'Angle',
    description: 'Solution ergonomique pour optimiser chaque coin de la pièce.',
    category: 'Dressing',
    aspect: 'aspect-[9/16]',
  },
  {
    id: 6,
    title: 'Meuble de Lavabo',
    description: 'Design épuré en béton ciré et bois naturel.',
    category: 'Salle de Bain',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 7,
    title: 'Bibliothèque sur Mesure',
    description: 'Structure légère et robuste pour une collection de livres unique.',
    category: 'Mobilier',
    aspect: 'aspect-[3/2]',
  },
  {
    id: 8,
    title: 'Casque Kustom',
    description: 'Peinture personnalisée et finitions laquées haute qualité.',
    category: 'Kustom',
    aspect: 'aspect-square',
  },
];

export default function RealisationsPage(props: { params: Promise<{ locale: string }> }) {
  use(props.params);
  // const t = useTranslations('Index');

  return (
    <div className="space-y-12 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl font-bold tracking-tight">Nos Réalisations</h1>
        <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Un aperçu de notre savoir-faire à travers des projets uniques réalisés pour nos clients.
        </p>
      </motion.div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {realisations.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`relative group bg-accent/10 rounded-3xl overflow-hidden cursor-pointer break-inside-avoid shadow-sm hover:shadow-xl transition-shadow duration-500 ${item.aspect}`}
          >
            {/* Image Placeholder */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-primary/20 flex items-center justify-center text-primary/10 italic text-sm">
              Image
              {' '}
              {item.title}
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
                  {item.category}
                </p>
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="text-sm leading-relaxed opacity-90">
                  {item.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
