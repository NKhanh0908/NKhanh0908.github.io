import { getTranslations } from 'next-intl/server';
import { constructMetadata } from '@/lib/seo/generateMetadata';
import { getPersonSchema } from '@/lib/seo/structuredData';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingBackground } from '@/components/animations/FloatingBackground';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  
  const tHero = await getTranslations({ locale, namespace: 'hero' });
  
  const title = `Nguyen Quoc Khanh — ${tHero('role')}`;
  const description = tHero('description');

  return constructMetadata({
    locale,
    title,
    description,
    path: '',
  });
}

export default async function IndexPage({ params }: PageProps) {
  const { locale } = await params;
  const personSchema = getPersonSchema(locale);

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* Floating drifting background gradients */}
      <FloatingBackground />

      {/* Sticky navigation bar */}
      <Navbar currentLocale={locale} />

      {/* Page Sections Storytelling Flow */}
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Page Footer */}
      <Footer />

      {/* Floating scroll-to-top shortcut button */}
      <ScrollToTop />
    </>
  );
}
