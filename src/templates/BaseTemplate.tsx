import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { StickyNavbar } from '@/components/layout/StickyNavbar';

export const BaseTemplate = (props: {
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
      <StickyNavbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-24 pb-12">
        {props.children}
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};
