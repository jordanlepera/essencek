'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { use } from 'react';

import { GalleryHighlight } from '@/components/home/GalleryHighlight';
import { HeroSection } from '@/components/home/HeroSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { Link } from '@/libs/I18nNavigation';
import { Button } from '../ui/button';

export const HomeClient = (props: { params: Promise<{ locale: string }> }) => {
  use(props.params);
  const tc = useTranslations('Contact');

  return (
    <div className="space-y-12">
      <HeroSection />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <ServicesSection />
        <GalleryHighlight />

        {/* Revamped Contact section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Left Side: Brand/Contact Info */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-linear-to-r from-primary/10 to-accent/10 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 md:w-64 md:h-64 bg-primary/5 rounded-full blur-3xl" />

                  <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
                    L'Essence
                    {' '}
                    <span className="text-primary italic font-serif">K</span>
                  </h2>

                  <p className="text-xl text-muted-foreground mb-12 leading-relaxed text-left">
                    {tc('description')}
                  </p>

                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                      <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone text-primary"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">{tc('phone_label')}</p>
                        <p className="text-lg md:text-xl font-medium tracking-tight">+33 (0)6 00 00 00 00</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                      <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail text-primary">
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">{tc('email_label')}</p>
                        <p className="text-lg md:text-xl font-medium tracking-tight break-all">contact@essencek.fr</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                      <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin text-primary">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">{tc('atelier_label')}</p>
                        <p className="text-lg md:text-xl font-medium tracking-tight">{tc('atelier_value')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: CTA */}
              <div className="lg:pl-12 space-y-8 text-left">
                <div>
                  <h3 className="text-2xl xs:text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-tight whitespace-pre-line">
                    {tc('cta_title')}
                  </h3>
                  <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg">
                    {tc('cta_description')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-5">
                    <Link href="/contact" className="w-full sm:w-auto">
                      <Button size="lg" className="w-full rounded-full px-12 py-8 text-xl font-bold shadow-xl hover:shadow-primary/20 transition-all active:scale-95">
                        {tc('cta_submit')}
                      </Button>
                    </Link>
                    <Link href="/realisations" className="w-full sm:w-auto">
                      <Button variant="outline" size="lg" className="w-full rounded-full px-12 py-8 text-xl font-semibold border-primary/20 hover:bg-primary/5 transition-all active:scale-95">
                        {tc('cta_view_work')}
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex items-center gap-4 text-sm text-muted-foreground italic">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  {tc('response_time')}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </div>
  );
};
