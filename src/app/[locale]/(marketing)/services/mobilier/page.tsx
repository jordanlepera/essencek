'use client';

import { useTranslations } from 'next-intl';

import { use } from 'react';

import { ServiceDetail } from '@/components/services/ServiceDetail';

export default function MobilierPage(props: { params: Promise<{ locale: string }> }) {
  use(props.params);
  const t = useTranslations('Services.mobilier');

  return (
    <ServiceDetail
      title={t('title')}
      description={t('description')}
      features={t.raw('features')}
    />
  );
}
