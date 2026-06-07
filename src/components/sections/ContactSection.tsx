'use client';

import { useTranslations } from 'next-intl';
import { Mail, FileDown } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/ui/Icons';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/ui/Heading';
import { Paragraph } from '@/components/ui/Paragraph';
import { Reveal } from '@/components/animations/Reveal';

export function ContactSection() {
  const t = useTranslations('contact');
  const tCommon = useTranslations('common');

  return (
    <Section id="contact" hasBackground>
      <Container size="content">
        <Reveal duration={0.4} yOffset={10}>
          <div className="space-y-12 text-center md:text-left">
            {/* Header */}
            <div className="space-y-3">
              <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
                06 // CONTACT
              </span>
              <Heading level={2} className="text-center md:text-left">
                {t('title')}
              </Heading>
              <Paragraph className="max-w-[580px] text-center md:text-left mx-auto md:mx-0">
                {t('content')}
              </Paragraph>
            </div>

            {/* Direct Connect Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {/* Email Card */}
              <a
                href="mailto:khanhnq0908@gmail.com"
                className="flex items-center gap-4 p-5 border border-border bg-surface rounded-lg hover:border-accent hover:shadow-md transition-all group text-left cursor-pointer"
              >
                <div className="p-3 rounded-md bg-accent/5 text-accent group-hover:bg-accent/10 transition-colors">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase font-bold text-secondary-text tracking-wider">
                    {t('channels.email.label')}
                  </span>
                  <span className="block font-sans font-semibold text-sm text-primary-text mt-0.5">
                    {t('channels.email.value')}
                  </span>
                </div>
              </a>

              {/* LinkedIn Card */}
              <a
                href="https://www.linkedin.com/in/khanh-nguyen-quoc-13110a324"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 border border-border bg-surface rounded-lg hover:border-accent hover:shadow-md transition-all group text-left cursor-pointer"
              >
                <div className="p-3 rounded-md bg-accent/5 text-accent group-hover:bg-accent/10 transition-colors">
                  <LinkedInIcon className="h-6 w-6" />
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase font-bold text-secondary-text tracking-wider">
                    {t('channels.linkedin.label')}
                  </span>
                  <span className="block font-sans font-semibold text-sm text-primary-text mt-0.5">
                    {t('channels.linkedin.value')}
                  </span>
                </div>
              </a>

              {/* GitHub Card */}
              <a
                href="https://github.com/NKhanh0908"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 border border-border bg-surface rounded-lg hover:border-accent hover:shadow-md transition-all group text-left cursor-pointer"
              >
                <div className="p-3 rounded-md bg-accent/5 text-accent group-hover:bg-accent/10 transition-colors">
                  <GitHubIcon className="h-6 w-6" />
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase font-bold text-secondary-text tracking-wider">
                    {t('channels.github.label')}
                  </span>
                  <span className="block font-sans font-semibold text-sm text-primary-text mt-0.5">
                    {t('channels.github.value')}
                  </span>
                </div>
              </a>

              {/* CV Download Card */}
              <a
                href="/files/NguyenQuocKhanh_CV.pdf"
                download="NguyenQuocKhanh_CV.pdf"
                className="flex items-center gap-4 p-5 border border-border bg-surface rounded-lg hover:border-accent hover:shadow-md transition-all group text-left cursor-pointer"
              >
                <div className="p-3 rounded-md bg-accent/5 text-accent group-hover:bg-accent/10 transition-colors">
                  <FileDown className="h-6 w-6" />
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase font-bold text-secondary-text tracking-wider">
                    {tCommon('cv.download')}
                  </span>
                  <span className="block font-sans font-semibold text-sm text-primary-text mt-0.5">
                    {tCommon('cv.filename')}
                  </span>
                </div>
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
