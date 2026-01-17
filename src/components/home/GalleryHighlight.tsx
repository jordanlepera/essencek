'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { Link } from '@/libs/I18nNavigation';

export const GalleryHighlight = () => {
  const t = useTranslations('Index');

  return (
    <section className="py-24 bg-accent/5 -mx-4 sm:-mx-6 px-6 sm:px-12 rounded-[2rem] sm:rounded-[3rem]">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold tracking-tight"
          >
            {t('gallery_preview_title')}
          </motion.h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t('gallery_preview_description')}
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Link href="/realisations">
              <Button size="lg" className="rounded-full flex gap-2">
                {t('gallery_preview_cta')}
                {' '}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-3 sm:gap-4 w-full">
          {/* Real Gallery Preview with actual assets */}
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform duration-500">
            <OptimizedImage
              src="/assets/images/meuble/meuble5.avif"
              alt="Custom Furniture"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 25vw"
              containerClassName="absolute inset-0"
            />
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg mt-4 sm:mt-8 transform hover:scale-[1.02] transition-transform duration-500">
            <OptimizedImage
              src="/assets/images/dressing/dressing2.avif"
              alt="Custom Dressing"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 25vw"
              containerClassName="absolute inset-0"
            />
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg -mt-4 sm:-mt-8 transform hover:scale-[1.02] transition-transform duration-500">
            <OptimizedImage
              src="/assets/images/meuble/meuble12.avif"
              alt="Interior Layout"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 25vw"
              containerClassName="absolute inset-0"
            />
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform duration-500">
            <OptimizedImage
              src="/assets/images/kustom/kustom2.avif"
              alt="Kustom Design"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 25vw"
              containerClassName="absolute inset-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
