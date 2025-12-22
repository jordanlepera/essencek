'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Link } from '@/libs/I18nNavigation';

export const HeroSection = () => {
  const t = useTranslations('Index');

  const slides = [
    {
      title: 'L\'Essence K',
      subtitle: 'L\'art du mobilier sur mesure',
      tagline: 'Ergonomie, esthétique et qualité',
    },
    {
      title: 'Créations Uniques',
      subtitle: 'Bois massif, métal et passion',
      tagline: 'De l\'idée à la réalisation',
    },
    {
      title: 'Aménagements',
      subtitle: 'Optimisez chaque centimètre carré',
      tagline: 'Salles de bains, dressings et mansardes',
    },
  ];

  return (
    <section className="relative w-full overflow-hidden rounded-3xl h-[70vh] min-h-[500px]">
      <Carousel className="w-full h-full" opts={{ loop: true }}>
        <CarouselContent className="h-full ml-0">
          {slides.map(slide => (
            <CarouselItem key={slide.title} className="pl-0 h-[70vh] min-h-[500px]">
              <div className="relative w-full h-full flex items-center justify-center bg-accent/20">
                {/* Background placeholder - User will provide images later */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-accent/30" />

                <div className="relative z-10 text-center px-6">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-4"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl md:text-2xl text-foreground/80 mb-2 font-medium"
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg text-muted-foreground mb-8"
                  >
                    {slide.tagline}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <Link href="/services">
                      <Button size="lg" className="rounded-full px-8 text-lg font-semibold">
                        {t('hero_cta')}
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-8 right-16 flex gap-2">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </section>
  );
};
