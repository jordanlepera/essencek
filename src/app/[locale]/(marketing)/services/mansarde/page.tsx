'use client';

import { useTranslations } from 'next-intl';

import { use } from 'react';

import { ServiceDetail } from '@/components/services/ServiceDetail';

export default function MansardePage(props: { params: Promise<{ locale: string }> }) {
  use(props.params);
  const t = useTranslations('Services.mansarde');

  return (
    <ServiceDetail
      title={t('title')}
      description={t('description')}
      features={[
        'Spécialiste de la sous-pente',
        'Aménagement sous escalier',
        'Optimisation du moindre espace',
        'Beau et fonctionnel',
        'Conception artisanale',
        'Adaptabilité totale',
      ]}
    />
  );
}
