'use client';

import { useTranslations } from 'next-intl';

import { use } from 'react';

import { ServiceDetail } from '@/components/services/ServiceDetail';

export default function DressingPage(props: { params: Promise<{ locale: string }> }) {
  use(props.params);
  const t = useTranslations('Services.dressing');

  return (
    <ServiceDetail
      title={t('title')}
      description={t('description')}
      features={[
        'Sur mesure total',
        'Matériaux de haute qualité',
        'Penderies & Etagères réglables',
        'Tiroirs à sortie totale',
        'Racks à chaussures',
        'Luminaires intégrés',
      ]}
    />
  );
}
