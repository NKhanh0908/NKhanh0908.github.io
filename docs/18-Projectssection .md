'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { GitHubIcon } from '@/components/ui/Icons';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/ui/Heading';
import { Tag } from '@/components/ui/Tag';

interface ProjectItem {
  name: string;
  description: string;
  teamInfo: string;
  tags: string[];
  github: string;
  demo?: string;
  highlights: string[];
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

          {/* Project list — compact, no descriptions */}
          <div className="flex flex-col divide-y divide-border/50">
            {items.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: idx * 0.07 }}
                className="group flex flex-col sm:flex-row sm:items-center gap-4 py-6 first:pt-0 last:pb-0"
              >
                {/* Left: index + name */}
                <div className="flex items-baseline gap-4 min-w-0 flex-1">
                  <span className="font-mono text-[10px] text-secondary-text/50 shrink-0 tracking-widest">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-sans font-bold text-lg text-primary-text group-hover:text-accent transition-colors truncate">
                    {project.name}
                  </h3>
                </div>

                {/* Middle: tech tags */}
                <div className="flex flex-wrap gap-1.5 sm:max-w-[340px]">
                  {project.tags.map((tag, tagIdx) => (
                    <Tag key={tagIdx} className="text-[10px] px-2 py-0.5 bg-background">
                      {tag}
                    </Tag>
                  ))}
                </div>

                {/* Right: action buttons */}
                <div className="flex items-center gap-3 shrink-0">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-md bg-accent text-white hover:bg-accent/90 transition-colors"
                    >
                      Demo
                      <span className="text-[10px]">↗</span>
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-secondary-text uppercase tracking-wider px-3 py-1.5 rounded-md border border-border hover:border-accent hover:text-accent transition-colors"
                  >
                    <GitHubIcon className="h-3.5 w-3.5" />
                    GitHub
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}