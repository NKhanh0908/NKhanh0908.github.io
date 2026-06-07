'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { GitHubIcon } from '@/components/ui/Icons';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/ui/Heading';
import { Tag } from '@/components/ui/Tag';
import { LottieAnimation } from '@/components/animations/LottieAnimation';

import datingAnimation from '@/assets/project/Dating.json';
import hrmAnimation from '@/assets/project/HRM.json';
import minuteMindAnimation from '@/assets/project/Minute-Mind.json';

interface ProjectItem {
  name: string;
  description: string;
  tags: string[];
  github?: string;
  githubFE?: string;
  githubBE?: string;
  demo?: string;
}

const PROJECT_CONFIGS = [
  {
    key: 'dating',
    animation: datingAnimation,
    gradient: 'from-rose-500/10 via-pink-500/5 to-transparent',
    glowClass: 'hover:shadow-[0_12px_30px_-8px_rgba(244,63,94,0.25)]',
    borderHover: 'hover:border-rose-500/30',
  },
  {
    key: 'hrm',
    animation: hrmAnimation,
    gradient: 'from-blue-500/10 via-indigo-500/5 to-transparent',
    glowClass: 'hover:shadow-[0_12px_30px_-8px_rgba(59,130,246,0.25)]',
    borderHover: 'hover:border-blue-500/30',
  },
  {
    key: 'minutemind',
    animation: minuteMindAnimation,
    gradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
    glowClass: 'hover:shadow-[0_12px_30px_-8px_rgba(245,158,11,0.25)]',
    borderHover: 'hover:border-amber-500/30',
  },
];

function ProjectCard({
  project,
  config,
  idx,
  githubFEText,
  githubBEText,
}: {
  project: ProjectItem;
  config: typeof PROJECT_CONFIGS[0];
  idx: number;
  githubFEText: string;
  githubBEText: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.1 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: idx * 0.1 }}
      className={`group relative flex flex-col h-full rounded-2xl border border-border/50 bg-surface/50 backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-2 ${config.borderHover} ${config.glowClass}`}
    >
      {/* 1. Title Header (Top) */}
      <div className="p-6 pb-4 border-b border-border/30 flex items-center justify-between shrink-0">
        <h3 className="font-sans font-bold text-xl text-primary-text group-hover:text-accent transition-colors duration-200">
          {project.name}
        </h3>
        <span className="font-mono text-xs text-secondary-text/50 tracking-widest">
          {String(idx + 1).padStart(2, '0')}
        </span>
      </div>

      {/* 2. Lottie Animation Box (Middle) */}
      <div className={`w-full h-64 flex items-center justify-center bg-gradient-to-br ${config.gradient} overflow-hidden border-b border-border/30 relative`}>
        <LottieAnimation
          animationData={config.animation}
          loop={true}
          autoplay={true}
          play={isInView}
          className="w-52 h-52 drop-shadow-md transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* 3. Description Container (Lower Body) */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <p className="text-sm text-secondary-text leading-relaxed">
          {project.description}
        </p>

        {/* 4. Technology Tags & Action Buttons (Bottom) */}
        <div className="space-y-4 pt-4 border-t border-border/20">
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, tagIdx) => (
              <Tag key={tagIdx} className="text-[10px] px-2 py-0.5 bg-background">
                {tag}
              </Tag>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-secondary-text uppercase tracking-wider py-2 px-3 rounded-lg border border-border bg-background/50 hover:border-accent hover:text-accent transition-all duration-300"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
                GitHub
              </a>
            )}
            {project.githubFE && (
              <a
                href={project.githubFE}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1 text-[10px] font-mono font-bold text-secondary-text uppercase tracking-wider py-2 px-1.5 rounded-lg border border-border bg-background/50 hover:border-accent hover:text-accent transition-all duration-300 truncate"
                title={githubFEText}
              >
                <GitHubIcon className="h-3.5 w-3.5 shrink-0" />
                {githubFEText || 'FE'}
              </a>
            )}
            {project.githubBE && (
              <a
                href={project.githubBE}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1 text-[10px] font-mono font-bold text-secondary-text uppercase tracking-wider py-2 px-1.5 rounded-lg border border-border bg-background/50 hover:border-accent hover:text-accent transition-all duration-300 truncate"
                title={githubBEText}
              >
                <GitHubIcon className="h-3.5 w-3.5 shrink-0" />
                {githubBEText || 'BE'}
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider py-2 px-3 rounded-lg bg-accent text-white hover:bg-accent/90 transition-all duration-300"
              >
                Demo ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const t = useTranslations('projects');
  const items = t.raw('items') as ProjectItem[];

  return (
    <Section id="projects" hasBackground>
      <Container>
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
              05 // PROJECTS
            </span>
            <Heading level={2}>{t('title')}</Heading>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {items.map((project, idx) => {
              const config = PROJECT_CONFIGS[idx] || PROJECT_CONFIGS[0];
              return (
                <ProjectCard
                  key={idx}
                  project={project}
                  config={config}
                  idx={idx}
                  githubFEText={t('githubFE')}
                  githubBEText={t('githubBE')}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
