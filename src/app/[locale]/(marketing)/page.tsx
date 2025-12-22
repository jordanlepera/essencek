import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { redirect } from '@/libs/I18nNavigation';

type IIndexProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IIndexProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function Index() {
  redirect('/accueil' as any);
}
