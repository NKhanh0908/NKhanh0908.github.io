'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { GitHubIcon } from '@/components/ui/Icons';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/ui/Heading';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { Badge } from '@/components/ui/Badge';

interface ProjectItem {
  name: string;
  description: string;
  teamInfo: string;
  tags: string[];
  github: string;
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

          {/* Grid of Projects */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {items.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: idx * 0.1 }}
                className="flex"
              >
                <Card hoverEffect className="flex flex-col justify-between w-full h-full p-6 md:p-8 space-y-6">
                  <div className="space-y-6">
                    {/* Project Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <span className="font-mono text-xs text-secondary-text uppercase tracking-widest">
                          Project_0{idx + 1}
                        </span>
                        <h3 className="text-2xl font-bold text-primary-text font-sans">
                          {project.name}
                        </h3>
                      </div>
                      <Badge className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 whitespace-nowrap">
                        {project.teamInfo.split(' · ')[0]}
                      </Badge>
                    </div>

                    <p className="text-sm font-medium font-sans text-secondary-text leading-relaxed">
                      {project.description}
                    </p>

                    <div className="h-[1px] w-full bg-border/40" />

                    {/* Highlights list */}
                    <ul className="space-y-3">
                      {project.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex gap-2.5 text-xs text-secondary-text leading-relaxed font-sans">
                          <span className="text-accent font-semibold font-mono select-none">//</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, tagIdx) => (
                        <Tag key={tagIdx} className="text-[10px] px-2 py-0.5 bg-background">{tag}</Tag>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="pt-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider hover:underline transition-all group"
                      >
                        <GitHubIcon className="h-4 w-4 text-primary-text group-hover:text-accent transition-colors" />
                        <span>{t('viewOnGithub')}</span>
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
