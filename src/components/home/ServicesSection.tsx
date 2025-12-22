'use client';

import { motion } from 'framer-motion';
import {
  ArrowDownToLine,
  Bath,
  Brush,
  Hammer,
  Layers,
  Maximize,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@/libs/I18nNavigation';

export const ServicesSection = () => {
  const t = useTranslations('Services');
  const it = useTranslations('Index');

  const services = [
    {
      id: 'dressing',
      icon: <Maximize className="h-10 w-10" />,
      title: t('dressing.title'),
      desc: t('dressing.description'),
      href: '/services/dressing',
    },
    {
      id: 'salledebain',
      icon: <Bath className="h-10 w-10" />,
      title: t('salledebain.title'),
      desc: t('salledebain.description'),
      href: '/services/salledebain',
    },
    {
      id: 'placard',
      icon: <Layers className="h-10 w-10" />,
      title: t('placard.title'),
      desc: t('placard.description'),
      href: '/services/placard',
    },
    {
      id: 'mansarde',
      icon: <ArrowDownToLine className="h-10 w-10" />,
      title: t('mansarde.title'),
      desc: t('mansarde.description'),
      href: '/services/mansarde',
    },
    {
      id: 'mobilier',
      icon: <Hammer className="h-10 w-10" />,
      title: t('mobilier.title'),
      desc: t('mobilier.description'),
      href: '/services/mobilier',
    },
    {
      id: 'kustom',
      icon: <Brush className="h-10 w-10" />,
      title: t('kustom.title'),
      desc: t('kustom.description'),
      href: '/services/kustom',
    },
  ];

  return (
    <section className="py-24">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold tracking-tight mb-4"
        >
          {it('services_title')}
        </motion.h2>
        <div className="h-1 w-20 bg-primary mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={service.href}>
              <Card className="h-full border-none bg-accent/5 hover:bg-accent/10 transition-all duration-300 group cursor-pointer overflow-hidden">
                <CardContent className="p-8 flex flex-col gap-6">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary w-fit group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3">
                      {service.desc}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
