'use client';

import { useTranslations } from 'next-intl';

import { use } from 'react';

import { ServiceDetail } from '@/components/services/ServiceDetail';

export default function SalleDeBainPage(props: { params: Promise<{ locale: string }> }) {
  use(props.params);
  const t = useTranslations('Services.salledebain');

  return (
    <ServiceDetail
      title={t('title')}
      description={t('description')}
      features={[
        'Design robuste et fonctionnel',
        'Matériaux résistants à l\'humidité',
        'Revêtements modernes',
        'Étude de projet personnalisée',
        'Miroirs & Vasques',
        'Robinetterie de qualité',
      ]}
    />
  );
}
