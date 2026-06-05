import { useTranslations } from 'next-intl';
import { Sparkles, Compass, Target } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/ui/Heading';
import { Paragraph } from '@/components/ui/Paragraph';
import { Reveal } from '@/components/animations/Reveal';

export function GrowthSection() {
  const t = useTranslations('growth');
  const topics = t.raw('topics') as string[];

  const icons = [
    <Target className="h-5 w-5 text-accent" key="target" />,
    <Compass className="h-5 w-5 text-emerald-500" key="compass" />,
    <Sparkles className="h-5 w-5 text-indigo-500" key="sparkles" />,
  ];

  return (
    <Section id="growth">
      <Container size="content">
        <Reveal duration={0.5} yOffset={20}>
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-3">
              <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
                06 // GROWTH
              </span>
              <Heading level={2}>{t('title')}</Heading>
            </div>

            {/* Narrative */}
            <div className="space-y-4">
              <Paragraph className="text-primary-text font-medium text-lg leading-relaxed">
                {t('paragraph1')}
              </Paragraph>
              <Paragraph>
                {t('paragraph2')}
              </Paragraph>
            </div>

            {/* Future Roadmaps */}
            <div className="space-y-4 pt-6 border-t border-border/60">
              <span className="block font-mono text-xs font-bold text-secondary-text uppercase tracking-widest">
                // {t('exploring')}
              </span>
              
              <div className="grid grid-cols-1 gap-4">
                {topics.map((topic, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 border border-border/50 rounded-lg bg-surface hover:border-accent/30 transition-all">
                    <div className="p-2.5 rounded-md bg-background flex items-center justify-center">
                      {icons[idx % icons.length]}
                    </div>
                    <span className="font-sans font-semibold text-sm text-primary-text">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
