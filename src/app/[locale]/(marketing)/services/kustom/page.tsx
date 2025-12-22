'use client';

import { useTranslations } from 'next-intl';

import { use } from 'react';

import { ServiceDetail } from '@/components/services/ServiceDetail';

export default function KustomPage(props: { params: Promise<{ locale: string }> }) {
  use(props.params);
  const t = useTranslations('Services.kustom');

  return (
    <ServiceDetail
      title={t('title')}
      description={t('description')}
      features={[
        'Kustom Culture & US',
        'Vestes & Gants en cuir',
        'Casques de motos',
        'Objets de décoration',
        'Relooking auto & moto',
        'Style unique',
      ]}
    />
  );
}
