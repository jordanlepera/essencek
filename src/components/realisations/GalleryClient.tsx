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

// Optimized spring config for 60fps entry - uses GPU-only transforms
const modalSpringEnter = {
  type: 'spring' as const,
  damping: 28,
  stiffness: 380,
  mass: 0.5,
};

// Simple opacity transition for overlay fade
const fadeTransition = {
  duration: 0.25,
  ease: [0.32, 0.72, 0, 1] as const, // Custom easing for perceived smoothness
};

// Text content animation variants - staggered children
const contentContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.35, // Wait for modal entrance to complete
      staggerChildren: 0.08, // Stagger each child
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

const contentItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      damping: 25,
      stiffness: 350,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.12 },
  },
};

// React 19: Component extraction replaces memo - React Compiler handles optimization
function LightboxContent({
  selectedItem,
  onClose,
  t,
}: {
  selectedItem: GalleryItem;
  onClose: () => void;
  t: ReturnType<typeof useTranslations<'Realisations'>>;
}) {
  return (
    <motion.div
      className="flex-1 p-8 md:p-12 flex flex-col justify-center bg-background md:overflow-y-auto"
      variants={contentContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="space-y-6">
        <motion.div variants={contentItemVariants}>
          <p className="text-sm font-bold text-primary uppercase tracking-widest mb-2">
            {t(`items.${selectedItem.key}.category` as any)}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {t(`items.${selectedItem.key}.title` as any)}
          </h2>
        </motion.div>

        <motion.p
          variants={contentItemVariants}
          className="text-lg text-muted-foreground leading-relaxed"
        >
          {t(`items.${selectedItem.key}.description` as any)}
        </motion.p>

        <motion.div variants={contentItemVariants} className="pt-6 border-t border-border">
          <Button onClick={onClose} variant="outline" className="rounded-full w-full sm:w-auto">
            Fermer
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export const GalleryClient = ({ items }: GalleryClientProps) => {
  const t = useTranslations('Realisations');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // React 19: No need for useCallback - React Compiler handles memoization automatically
  const handleClose = () => setSelectedId(null);

  // Lock body scroll when lightbox is open - with scrollbar compensation to prevent layout shift
  useEffect(() => {
    if (selectedId !== null) {
      // Calculate scrollbar width before hiding it
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      // Store original padding to restore later
      const originalPaddingRight = document.body.style.paddingRight;

      // Apply compensating padding and hide overflow
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.paddingRight = originalPaddingRight;
        document.body.style.overflow = 'auto';
      };
    }
    return undefined;
  }, [selectedId]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
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
                quality={75}
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

      <AnimatePresence mode="wait">
        {selectedId && selectedItem && (
          <motion.div
            key="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={fadeTransition}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            onClick={handleClose}
            style={{ willChange: 'opacity' }}
          >
            {/* Backdrop - NO blur for performance, using solid dark with opacity */}
            <div
              className="absolute inset-0 bg-black/95"
              style={{ willChange: 'opacity' }}
            />

            {/* Lightbox Card - GPU accelerated transforms only */}
            <motion.div
              key="lightbox-card"
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: -30 }}
              transition={modalSpringEnter}
              className="relative w-full md:w-[95vw] md:h-[90vh] max-h-[90vh] bg-background rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
              onClick={e => e.stopPropagation()}
              style={{
                willChange: 'transform, opacity',
                transform: 'translateZ(0)', // Force GPU layer
              }}
            >
              {/* Close Button - No blur, using solid background */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors duration-150 cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Lightbox Image Container */}
              <div className="relative w-full md:w-[65%] h-[50vh] md:h-full bg-black/5 overflow-hidden">
                {/* Background gradient instead of blurred image for performance */}
                <div
                  className="absolute inset-0 z-0 bg-linear-to-br from-black/20 via-black/40 to-black/20"
                />

                {/* Main Image - No drop shadow for performance */}
                <div className="relative z-10 w-full h-full p-6 md:p-8">
                  <Image
                    src={selectedItem.image}
                    alt={t(`items.${selectedItem.key}.title` as any)}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 70vw"
                    quality={75}
                    priority
                  />
                </div>
              </div>

              {/* Lightbox Content */}
              <LightboxContent selectedItem={selectedItem} onClose={handleClose} t={t} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
