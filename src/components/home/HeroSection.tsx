'use client';

import type { CarouselApi } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Carousel,

  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

export const HeroSection = () => {
  const t = useTranslations('Index');

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const autoplay = React.useRef(
    Autoplay({ delay: 10000, stopOnInteraction: false }),
  );

  React.useEffect(() => {
    if (!api) {
      return;
    }

    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const slides = [
    {
      title: t('hero_slide1_title'),
      subtitle: t('hero_slide1_subtitle'),
      tagline: t('hero_slide1_tagline'),
      image: '/assets/images/portrait/portrait4.avif',
    },
    {
      title: t('hero_slide2_title'),
      subtitle: t('hero_slide2_subtitle'),
      tagline: t('hero_slide2_tagline'),
      image: '/assets/images/meuble/meuble18.avif',
    },
    {
      title: t('hero_slide3_title'),
      subtitle: t('hero_slide3_subtitle'),
      tagline: t('hero_slide3_tagline'),
      image: '/assets/images/mansarde/mansarde6.avif',
    },
    {
      title: t('hero_slide4_title'),
      subtitle: t('hero_slide4_subtitle'),
      tagline: t('hero_slide4_tagline'),
      image: '/assets/images/kustom/kustom4.avif',
    },
  ];

  return (
    <section className="relative w-full overflow-hidden rounded-3xl h-[75vh] min-h-[600px] border border-white/10 shadow-2xl">
      <Carousel
        className="w-full h-full"
        opts={{ loop: true }}
        plugins={[autoplay.current]}
        setApi={setApi}
      >
        <CarouselContent className="h-full ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={slide.title} className="pl-0 h-[75vh] min-h-[600px] group">
              <div className="relative w-full h-full flex items-center justify-center bg-accent/20">
                {/* Background Image - Optimized for LCP and visual quality */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="100vw"
                  quality={100}
                />

                {/* Overlays for readability - Modern, subtle but effective */}
                {/* Overlays for readability - Modern, subtle but effective */}
                <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/70" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.4)_0%,transparent_90%)]" />
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background/10 to-accent/10 mix-blend-overlay opacity-60" />

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                  <motion.h1
                    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="text-4xl xs:text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] leading-[1.1]"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="text-xl md:text-3xl text-white mb-4 font-semibold tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed px-4 drop-shadow-md font-medium"
                  >
                    {slide.tagline}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link href="/services">
                      <Button size="lg" className="rounded-full px-8 py-6 md:px-10 md:py-7 text-lg md:text-xl font-bold shadow-xl hover:shadow-primary/20 transition-all duration-300">
                        {t('hero_cta')}
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows with glass effect */}
        <div className="absolute bottom-10 right-10 hidden sm:flex gap-4 z-20">
          <CarouselPrevious className="static translate-y-0 h-12 w-12 bg-white/5 hover:bg-white/10 border-white/10 text-foreground backdrop-blur-md shadow-lg transition-all" />
          <CarouselNext className="static translate-y-0 h-12 w-12 bg-white/5 hover:bg-white/10 border-white/10 text-foreground backdrop-blur-md shadow-lg transition-all" />
        </div>

        {/* Slide Indicators (Dots) - No background or shadows as requested */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((slide, index) => (
            <button
              key={`dot-${slide.title}`}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                'h-2 transition-all duration-700 rounded-full',
                index === current ? 'w-10 bg-primary' : 'w-2 bg-foreground/20 hover:bg-foreground/40',
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
};
