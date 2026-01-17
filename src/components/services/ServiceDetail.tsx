'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { Link } from '@/libs/I18nNavigation';

type ServiceDetailProps = {
  title: string;
  description: string;
  features?: string[];
  image: string;
};

export const ServiceDetail = ({ title, description, features, image }: ServiceDetailProps) => {
  const t = useTranslations('Services');

  return (
    <div className="py-12 space-y-16">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2"
      >
        <Link href="/">
          <Button variant="ghost" size="sm" className="flex gap-1 items-center">
            <ChevronLeft className="h-4 w-4" />
            {' '}
            {t('detail_back')}
          </Button>
        </Link>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="flex-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-5xl font-bold tracking-tight mb-6">{title}</h1>
            <div className="h-1.5 w-24 bg-primary rounded-full mb-8" />
            <p className="text-xl text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {description}
            </p>
          </motion.div>

          {features && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
            >
              {features.map(feature => (
                <div key={feature} className="flex gap-3 items-center">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span className="font-medium text-foreground/80">{feature}</span>
                </div>
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="pt-8"
          >
            <Link href="/contact">
              <Button size="lg" className="rounded-full px-8">
                {t('detail_cta')}
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 w-full aspect-4/5 rounded-[2.5rem] bg-accent/10 border border-primary/5 shadow-2xl overflow-hidden relative group"
        >
          <OptimizedImage
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={90}
            priority
            containerClassName="absolute inset-0"
          />
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-60" />
        </motion.div>
      </div>
    </div>
  );
};
