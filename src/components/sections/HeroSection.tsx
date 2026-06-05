'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Mail, Phone } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/ui/Icons';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { Paragraph } from '@/components/ui/Paragraph';
import { Container } from '@/components/layout/Container';
import { BlueprintCard } from '@/components/ui/BlueprintCard';

export function HeroSection() {
  const t = useTranslations('hero');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [showCV, setShowCV] = useState(false);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      const offset = 80;
      const position = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: position, behavior: 'smooth' });
    }
  };

  const greeting = t('greeting');
  const displayGreeting = greeting.endsWith('.')
    ? (
      <>
        {greeting.slice(0, -1)}
        <span className="text-accent">.</span>
      </>
    )
    : greeting;

  const cvText = tCommon('cv.view');
  const displayCvText = cvText.endsWith('↗')
    ? (
      <>
        {cvText.slice(0, -1).trim()}
        <span className="inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-200 ml-1">↗</span>
      </>
    )
    : cvText;

  return (
    <section id="hero" className="min-h-[95vh] flex items-center pt-28 pb-12 md:pb-16 relative overflow-hidden bg-background">
      {/* CAD Blueprint Grid Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #2563eb 1px, transparent 1px),
            linear-gradient(to bottom, #2563eb 1px, transparent 1px),
            linear-gradient(to right, #2563eb 2px, transparent 2px),
            linear-gradient(to bottom, #2563eb 2px, transparent 2px)
          `,
          backgroundSize: '24px 24px, 24px 24px, 120px 120px, 120px 120px'
        }}
      />

      <Container className="relative z-10">
        <div className="flex flex-col gap-8 md:gap-12">
          {/* Main Hero Content (60/40 Grid Split) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-16 items-center lg:items-start lg:pt-4"
          >
            {/* Left Column: Greeting and Role */}
            <div className="space-y-6 md:space-y-8">
              <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase block">
                // {t('role').toUpperCase()}
              </span>
              <Heading level={1} className="tracking-tight">
                {displayGreeting}
              </Heading>
              <Paragraph className="max-w-[540px] text-secondary-text text-[clamp(1rem,2vw,1.25rem)] font-normal leading-relaxed">
                {t('description')}
              </Paragraph>

              {/* Mobile Placement (Inline) */}
              <div className="block md:hidden py-4">
                <BlueprintCard />
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button onClick={scrollToProjects} className="group gap-2">
                  {t('cta.projects')}
                  <span className="transition-transform group-hover:translate-x-1 duration-200">→</span>
                </Button>
                <Button variant="outline" onClick={() => setShowCV(true)} className="group gap-2">
                  {displayCvText}
                </Button>
              </div>

              {/* Tablet Placement (Below content/buttons) */}
              <div className="hidden md:block lg:hidden pt-6">
                <BlueprintCard />
              </div>
            </div>

            {/* Right Column: Desktop Card Placement */}
            <div className="hidden lg:flex justify-end w-full">
              <BlueprintCard />
            </div>
          </motion.div>

          {/* Bottom Row: Full-width Horizontal Contact Panel & Timeline Bus Line */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08
                }
              }
            }}
            className="w-full"
          >
            {/* 4-column horizontal card bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-border rounded-xl bg-surface/50 backdrop-blur-sm overflow-hidden shadow-sm">
              {/* Mail */}
              <motion.a
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
                }}
                href="mailto:khanhnq0908@gmail.com"
                className="p-4 md:p-5 flex items-center justify-between gap-4 border-b sm:border-r lg:border-b-0 border-border bg-surface/40 hover:bg-accent/[0.02] transition-colors group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="p-2.5 rounded-full bg-accent/5 text-accent group-hover:scale-110 transition-transform shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block font-mono text-[10px] tracking-wider text-secondary-text uppercase leading-none mb-1.5">
                      Email
                    </span>
                    <span className="block text-sm font-bold text-primary-text truncate font-sans group-hover:text-accent transition-colors">
                      khanhnq0908@gmail.com
                    </span>
                  </div>
                </div>
                <span className="text-secondary-text/50 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-xs font-mono shrink-0 ml-2">
                  ↗
                </span>
              </motion.a>

              {/* Phone */}
              <motion.a
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
                }}
                href="tel:0931213714"
                className="p-4 md:p-5 flex items-center justify-between gap-4 border-b lg:border-r lg:border-b-0 border-border bg-surface/40 hover:bg-accent/[0.02] transition-colors group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="p-2.5 rounded-full bg-accent/5 text-accent group-hover:scale-110 transition-transform shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block font-mono text-[10px] tracking-wider text-secondary-text uppercase leading-none mb-1.5">
                      Phone
                    </span>
                    <span className="block text-sm font-bold text-primary-text truncate font-sans group-hover:text-accent transition-colors">
                      0931 213 714
                    </span>
                  </div>
                </div>
                <span className="text-secondary-text/50 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-xs font-mono shrink-0 ml-2">
                  ↗
                </span>
              </motion.a>

              {/* GitHub */}
              <motion.a
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
                }}
                href="https://github.com/NKhanh0908"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 md:p-5 flex items-center justify-between gap-4 border-b sm:border-r sm:border-b-0 lg:border-b-0 border-border bg-surface/40 hover:bg-accent/[0.02] transition-colors group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="p-2.5 rounded-full bg-accent/5 text-accent group-hover:scale-110 transition-transform shrink-0">
                    <GitHubIcon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block font-mono text-[10px] tracking-wider text-secondary-text uppercase leading-none mb-1.5">
                      GitHub
                    </span>
                    <span className="block text-sm font-bold text-primary-text truncate font-sans group-hover:text-accent transition-colors">
                      NKhanh0908
                    </span>
                  </div>
                </div>
                <span className="text-secondary-text/50 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-xs font-mono shrink-0 ml-2">
                  ↗
                </span>
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
                }}
                href="https://www.linkedin.com/in/khanh-nguyen-quoc-13110a324"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 md:p-5 flex items-center justify-between gap-4 border-border bg-surface/40 hover:bg-accent/[0.02] transition-colors group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="p-2.5 rounded-full bg-accent/5 text-accent group-hover:scale-110 transition-transform shrink-0">
                    <LinkedInIcon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block font-mono text-[10px] tracking-wider text-secondary-text uppercase leading-none mb-1.5">
                      LinkedIn
                    </span>
                    <span className="block text-sm font-bold text-primary-text truncate font-sans group-hover:text-accent transition-colors">
                      Nguyen Quoc Khanh
                    </span>
                  </div>
                </div>
                <span className="text-secondary-text/50 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-xs font-mono shrink-0 ml-2">
                  ↗
                </span>
              </motion.a>
            </div>

            {/* Timeline Bus Line */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scaleX: 0 },
                show: { opacity: 1, scaleX: 1, transition: { duration: 0.8, delay: 0.35, ease: 'easeOut' } }
              }}
              style={{ originX: 0 }}
              className="h-[3px] bg-accent/20 rounded-full w-full mt-4"
            />
          </motion.div>
        </div>


      </Container>

      {/* CV Modal Overlay */}
      {showCV && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface border border-border rounded-lg shadow-lg w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden animate-scale-up">
            <div className="flex items-center justify-between border-b border-border bg-background py-4 px-6">
              <span className="font-mono text-sm font-semibold text-accent">// {tCommon('cv.filename')}</span>
              <div className="flex items-center gap-4">
                <a
                  href="/files/NguyenQuocKhanh_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-semibold text-secondary-text hover:text-accent transition-colors"
                >
                  {tCommon('cv.openInNewTab')}
                </a>
                <button
                  onClick={() => setShowCV(false)}
                  className="p-1 text-secondary-text hover:text-accent hover:bg-background transition-all rounded-md font-mono font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="flex-1 bg-zinc-100">
              <iframe
                src="/files/NguyenQuocKhanh_CV.pdf"
                title="Nguyen Quoc Khanh — CV"
                className="w-full h-full border-none"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
