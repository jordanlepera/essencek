import { setRequestLocale } from 'next-intl/server';
import { BaseTemplate } from '@/templates/BaseTemplate';

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <BaseTemplate>
        {props.children}
      </BaseTemplate>
    </>
  );
}
