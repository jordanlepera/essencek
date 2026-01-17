'use client';

import { useTranslations } from 'next-intl';

import { use } from 'react';

import { ServiceDetail } from '@/components/services/ServiceDetail';

export default function PlacardPage(props: { params: Promise<{ locale: string }> }) {
  use(props.params);
  const t = useTranslations('Services.placard');

  return (
    <ServiceDetail
      title={t('title')}
      description={t('description')}
      features={t.raw('features')}
      image="/assets/images/meuble/meuble1.avif"
    />
  );
}
