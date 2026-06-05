'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/ui/Heading';
import { Paragraph } from '@/components/ui/Paragraph';
import { Reveal } from '@/components/animations/Reveal';
import { LottieAnimation } from '@/components/animations/LottieAnimation';
import developerAnimation from '@/assets/Developer.json';

export function AboutSection() {
  const t = useTranslations('about');

  return (
    <Section id="about">
      <Container>
        <div className="space-y-12">
          {/* Header */}
          <Reveal duration={0.5} yOffset={20}>
            <div className="space-y-3">
              <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
                02 // ABOUT
              </span>
              <Heading level={2}>
                {t('title')}
              </Heading>
            </div>
          </Reveal>
          
          {/* Main Grid split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Description text with smooth enter from left */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="lg:col-span-7 space-y-6"
            >
              <Paragraph className="text-primary-text font-medium text-lg leading-relaxed">
                {t('paragraph1')}
              </Paragraph>
              <Paragraph>
                {t('paragraph2')}
              </Paragraph>
              <Paragraph>
                {t('paragraph3')}
              </Paragraph>
            </motion.div>

            {/* Right Column: Lottie animation with smooth enter from right */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
              className="lg:col-span-5 flex justify-center items-center"
            >
              <div className="w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[400px] aspect-square relative select-none">
                {/* Subtle soft accent glow behind Lottie */}
                <div className="absolute inset-0 bg-accent/5 rounded-full blur-3xl opacity-60 pointer-events-none" />
                <LottieAnimation 
                  animationData={developerAnimation} 
                  className="w-full h-full relative z-10" 
                />
              </div>
            </motion.div>
          </div>


        </div>
      </Container>
    </Section>
  );
}

