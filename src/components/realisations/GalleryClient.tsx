'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { cn } from '@/lib/utils';

type GalleryItem = {
  id: number;
  key: string;
  aspect: string;
  image: string;
};

type GalleryClientProps = {
  items: GalleryItem[];
};

export const GalleryClient = ({ items }: GalleryClientProps) => {
  const t = useTranslations('Realisations');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedId !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedId]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const selectedItem = items.find(item => item.id === selectedId);

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.4, ease: 'easeOut' }}
            onClick={() => setSelectedId(item.id)}
            className={cn(
              'relative group bg-accent/10 rounded-3xl overflow-hidden cursor-pointer break-inside-avoid shadow-sm hover:shadow-xl transition-shadow duration-500',
              item.aspect,
            )}
          >
            {/* Main Image */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <OptimizedImage
                src={item.image}
                alt={t(`items.${item.key}.title` as any)}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={85}
                containerClassName="absolute inset-0"
              />
            </div>

            {/* Hover Content */}
            <div className="absolute inset-0 bg-black/40 p-8 flex flex-col justify-end text-white backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="space-y-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-xs font-semibold uppercase tracking-widest opacity-80">
                  {t(`items.${item.key}.category` as any)}
                </p>
                <h3 className="text-xl font-bold">{t(`items.${item.key}.title` as any)}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedId(null)}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Lightbox Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 300,
                mass: 0.8,
              }}
              className="relative w-full md:w-[95vw] md:h-[90vh] max-h-[90vh] bg-background rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Lightbox Image Container */}
              <div className="relative w-full md:w-[65%] h-[50vh] md:h-full bg-black/5 overflow-hidden">
                {/* Background Blurred Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={selectedItem.image}
                    alt=""
                    fill
                    className="object-cover blur-2xl scale-110 opacity-50"
                    quality={10}
                  />
                </div>

                {/* Main Image */}
                <div className="relative z-10 w-full h-full p-6 md:p-8">
                  <Image
                    src={selectedItem.image}
                    alt={t(`items.${selectedItem.key}.title` as any)}
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 768px) 100vw, 70vw"
                    quality={100}
                    priority
                  />
                </div>
              </div>

              {/* Lightbox Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                className="flex-1 p-8 md:p-12 flex flex-col justify-center bg-background md:overflow-y-auto"
              >
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-bold text-primary uppercase tracking-widest mb-2">
                      {t(`items.${selectedItem.key}.category` as any)}
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                      {t(`items.${selectedItem.key}.title` as any)}
                    </h2>
                  </div>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t(`items.${selectedItem.key}.description` as any)}
                  </p>

                  <div className="pt-6 border-t border-border">
                    <Button
                      onClick={() => setSelectedId(null)}
                      variant="outline"
                      className="rounded-full w-full sm:w-auto"
                    >
                      Fermer
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
