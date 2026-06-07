'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/ui/Heading';
import { cn } from '@/lib/utils';

// Import logos
import sguLogo from '@/assets/logo/Logo-DH-Sai-Gon-SGU.webp';
import alpacaLogo from '@/assets/logo/Alpaca-Solutions.jpg';

export function ExperienceSection() {
  const t = useTranslations('experience');
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalPathRef = useRef<SVGPathElement>(null);
  const verticalPathRef = useRef<SVGPathElement>(null);

  const [inView, setInView] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeAlign, setActiveAlign] = useState<'above' | 'below'>('above');

  // IntersectionObserver to trigger entry animations once
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle resizing and measure dynamic path.getTotalLength()
  useEffect(() => {
    const handleResize = () => {
      const width = containerRef.current?.getBoundingClientRect().width || 1200;
      setContainerWidth(width);

      // Dynamically set stroke-dasharray and stroke-dashoffset on resize/init
      if (inView) {
        if (horizontalPathRef.current) {
          const len = horizontalPathRef.current.getTotalLength();
          horizontalPathRef.current.style.strokeDasharray = `${len}`;
          horizontalPathRef.current.style.strokeDashoffset = '0'; // Keep full path on resize
        }
        if (verticalPathRef.current) {
          const len = verticalPathRef.current.getTotalLength();
          verticalPathRef.current.style.strokeDasharray = `${len}`;
          verticalPathRef.current.style.strokeDashoffset = '0';
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [inView]);

  // Set initial stroke lengths client-side on mount
  useEffect(() => {
    if (horizontalPathRef.current) {
      const len = horizontalPathRef.current.getTotalLength();
      horizontalPathRef.current.style.strokeDasharray = `${len}`;
      horizontalPathRef.current.style.strokeDashoffset = `${len}`;
    }
    if (verticalPathRef.current) {
      const len = verticalPathRef.current.getTotalLength();
      verticalPathRef.current.style.strokeDasharray = `${len}`;
      verticalPathRef.current.style.strokeDashoffset = `${len}`;
    }
  }, []);

  // Trigger drawing animations on pathRefs when element enters viewport
  useEffect(() => {
    if (inView) {
      if (horizontalPathRef.current) {
        horizontalPathRef.current.classList.add('animate-timeline-draw-horizontal');
      }
      if (verticalPathRef.current) {
        verticalPathRef.current.classList.add('animate-timeline-draw-vertical');
      }
    }
  }, [inView]);

  const milestones = [
    {
      year: "2022",
      title: t('milestones.m2022.title'),
      badge: t('milestones.m2022.badge'),
      logo: sguLogo,
      isWork: false,
      position: 15,
      align: 'below' as const,
      eduData: {
        period: t('milestones.m2022.period'),
        gpa: t('milestones.m2022.gpa'),
        toeic: t('milestones.m2022.toeic'),
        coursesHeader: t('milestones.m2022.coursesHeader'),
        courses: t.raw('milestones.m2022.courses') as { name: string; grade: string }[],
        activitiesHeader: t('milestones.m2022.activitiesHeader'),
        activityRole: t('milestones.m2022.activityRole'),
        activityDesc: t('milestones.m2022.activityDesc'),
      },
      details: undefined,
      isUpcoming: undefined,
      isCurrent: undefined,
      initials: undefined,
      period: undefined,
    },
    {
      year: "2025",
      title: t('milestones.m2025.title'),
      badge: t('milestones.m2025.badge'),
      period: t('milestones.m2025.period'),
      initials: "VI",
      isWork: true,
      position: 70,
      align: 'above' as const,
      details: t.raw('milestones.m2025.details') as string[],
      eduData: undefined,
      isUpcoming: undefined,
      isCurrent: undefined,
      logo: undefined,
    },
    {
      year: "2026",
      title: t('milestones.m2026.title'),
      badge: t('milestones.m2026.badge'),
      logo: alpacaLogo,
      isWork: true,
      isUpcoming: false,
      isCurrent: true,
      position: 90,
      align: 'above' as const,
      details: t.raw('milestones.m2026.details') as string[],
      eduData: undefined,
      initials: undefined,
      period: t('milestones.m2026.period'),
    },
  ];

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    setHoveredIdx(idx);
    const rect = e.currentTarget.getBoundingClientRect();
    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.top;
    
    const defaultAlign = milestones[idx].align === 'above' ? 'below' : 'above';
    const cardHeight = 350; // Conservative height estimate of hover card + gap in pixels
    
    if (defaultAlign === 'above') {
      if (spaceAbove < cardHeight && spaceBelow > spaceAbove) {
        setActiveAlign('below');
      } else {
        setActiveAlign('above');
      }
    } else { // defaultAlign === 'below'
      if (spaceBelow < cardHeight && spaceAbove > spaceBelow) {
        setActiveAlign('above');
      } else {
        setActiveAlign('below');
      }
    }
  };

  const renderCardContent = (m: typeof milestones[number]) => {
    if (m.eduData) {
      return (
        <div className="space-y-2.5">
          {/* Card Title & Period */}
          <div className="space-y-0.5">
            <h4 className="font-bold text-sm text-primary-text leading-tight font-sans">
              🎓 {m.title}
            </h4>
            <span className="text-xs font-mono text-secondary-text">
              • {m.eduData.period}
            </span>
          </div>

          {/* Stats: GPA & TOEIC */}
          <div className="flex items-center gap-6 font-mono text-xs text-secondary-text border-b border-border/40 pb-1.5 pt-0.5">
            <span className="font-semibold text-primary-text">{m.eduData.gpa}</span>
            <span className="font-semibold text-primary-text">{m.eduData.toeic}</span>
          </div>

          {/* Coursework Section */}
          <div className="space-y-1">
            <div className="text-[11px] text-accent font-mono tracking-wider select-none uppercase">
              ── {m.eduData.coursesHeader} ──
            </div>
            <div className="grid grid-cols-1 gap-1 font-mono text-xs text-secondary-text">
              {m.eduData.courses.map((c, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span>{c.name}</span>
                  <span className="text-primary-text font-bold">{c.grade}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activities Section */}
          <div className="space-y-1.5 pt-1.5 border-t border-border/40">
            <div className="text-[11px] text-accent font-mono tracking-wider select-none uppercase">
              ── {m.eduData.activitiesHeader} ──
            </div>
            <div className="text-sm text-secondary-text font-sans leading-relaxed">
              <div className="font-bold text-primary-text flex items-center gap-1.5">
                <span className="text-accent">→</span> {m.eduData.activityRole}
              </div>
              <div className="pl-4 text-xs text-secondary-text mt-0.5">
                {m.eduData.activityDesc}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (m.isUpcoming || m.isCurrent) {
      return (
        <div className="space-y-2.5">
          {m.period && (
            <div className="space-y-0.5 border-b border-border/40 pb-1.5 mb-1.5">
              <h4 className="font-bold text-sm text-primary-text leading-tight font-sans">
                💼 {m.title}
              </h4>
              <span className="text-xs font-mono text-secondary-text">
                • {m.period}
              </span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium font-sans text-sm">
              {m.details ? m.details[0] : ""}
            </span>
          </div>
          {m.details && m.details.length > 1 && (
            <ul className="space-y-2 pt-1 border-t border-border/40">
              {m.details.slice(1).map((detail, dIdx) => (
                <li key={dIdx} className="flex gap-2 text-secondary-text leading-relaxed font-sans text-sm">
                  <span className="text-[#3B6DD4] font-semibold select-none">→</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-2.5">
        {m.period && (
          <div className="space-y-0.5 border-b border-border/40 pb-1.5 mb-1.5">
            <h4 className="font-bold text-sm text-primary-text leading-tight font-sans">
              💼 {m.title}
            </h4>
            <span className="text-xs font-mono text-secondary-text">
              • {m.period}
            </span>
          </div>
        )}
        <ul className="space-y-2">
          {m.details?.map((detail, dIdx) => (
            <li key={dIdx} className="flex gap-2 text-secondary-text leading-relaxed font-sans text-sm">
              <span className="text-[#3B6DD4] font-semibold select-none">→</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <Section id="experience" hasBackground>
      <Container>
        <div className="space-y-16" ref={containerRef}>
          {/* Section Header */}
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
              03 // TIMELINE
            </span>
            <Heading level={2}>{t('title')}</Heading>
          </div>

          {/* Timeline Wrapper Container */}
          <div className="relative select-none font-sans">
            
            {/* 1. Desktop Horizontal Timeline (md and up) */}
            <div className="hidden md:block relative h-[460px] w-full">
              
              {/* SVG Line */}
              <svg className="absolute top-[220px] left-0 right-0 h-[10px] w-full overflow-visible pointer-events-none">
                {/* Gray background track */}
                <path
                  d={`M 0 5 L ${containerWidth} 5`}
                  className="stroke-border/60 stroke-[3px] fill-none"
                />
                {/* Blue active line drawing */}
                <path
                  ref={horizontalPathRef}
                  d={`M 0 5 L ${containerWidth} 5`}
                  className="stroke-[#3B6DD4] stroke-[3px] fill-none"
                />
                {/* Arrowhead at the right end */}
                <path
                  d="M -8 -6 L 4 0 L -8 6 Z"
                  fill="#3B6DD4"
                  className={cn(
                    "opacity-0 transition-opacity duration-300",
                    inView ? "opacity-100" : ""
                  )}
                  style={{
                    transform: 'translate(100%, 5px)',
                    transitionDelay: '0.98s', // Slightly before line completes drawing
                  }}
                />
              </svg>

              {/* Milestones (Desktop) */}
              {milestones.map((m, idx) => {
                // Delays: 2022 (0.8s), 2025 (1.1s), 2026 (1.35s) as per spec
                let exactDotDelay = 0.8;
                let exactLabelDelay = 1.0;

                if (m.year === "2025") {
                  exactDotDelay = 1.1;
                  exactLabelDelay = 1.3;
                } else if (m.year === "2026") {
                  exactDotDelay = 1.35;
                  exactLabelDelay = 1.55;
                }

                // Calculate clamped left offset to prevent card from overflowing screen edges
                const x = containerWidth * (m.position / 100);
                const leftVal = Math.max(-x, Math.min(containerWidth - x - 300, -150));

                return (
                  <div
                    key={idx}
                    className="absolute -translate-x-1/2"
                    style={{ left: `${m.position}%`, top: '220px' }}
                    onMouseEnter={(e) => handleMouseEnter(e, idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    {/* Entrance animated container */}
                    <div
                      className={cn(
                        "absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300",
                        inView ? "animate-timeline-dot-custom" : "scale-0 opacity-0"
                      )}
                      style={{
                        left: '0px',
                        top: '5px',
                        animationDelay: `${exactDotDelay}s`,
                      }}
                    >
                      {/* Year pill with hover scale */}
                      <div
                        className={cn(
                          "relative bg-background border-[3px] text-lg font-mono font-extrabold px-5 py-2 rounded-full shadow-md cursor-pointer transition-transform duration-200 ease-out select-none",
                          m.isCurrent ? "bg-[#3B6DD4] text-white border-[#3B6DD4] shadow-[0_0_15px_rgba(59,109,212,0.4)]" : "text-[#3B6DD4]",
                          hoveredIdx === idx ? "scale-115" : "scale-100"
                        )}
                        style={{
                          borderColor: m.isUpcoming ? 'rgba(59, 109, 212, 0.4)' : '#3B6DD4',
                          borderStyle: m.isUpcoming ? 'dashed' : 'solid',
                        }}
                      >
                        {/* Glow pulsing ring for active/current milestone */}
                        {m.isCurrent && (
                          <span className="absolute -inset-[3px] rounded-full border-2 border-[#3B6DD4]/50 animate-ping pointer-events-none" />
                        )}
                        {m.year}
                      </div>
                    </div>

                    {/* Floating Label block */}
                    <div
                      className={cn(
                        "absolute -translate-x-1/2 w-[280px] text-center flex flex-col items-center gap-2",
                        m.align === 'above' ? "bottom-14" : "top-14",
                        inView 
                          ? (m.align === 'above' ? "animate-timeline-label-down-custom" : "animate-timeline-label-up-custom") 
                          : "opacity-0"
                      )}
                      style={{
                        animationDelay: `${exactLabelDelay}s`,
                      }}
                    >
                      {/* Logo or Initials */}
                      {m.logo ? (
                        <div className={cn(
                          "w-14 h-14 rounded-lg overflow-hidden border shadow-sm bg-white p-1 flex items-center justify-center shrink-0 transition-all duration-300",
                          m.isCurrent ? "border-[#3B6DD4] border-[3px] scale-110 shadow-[0_0_12px_rgba(59,109,212,0.3)] animate-pulse" : "border-border",
                          !m.isCurrent && m.isUpcoming ? "opacity-70 border-dashed animate-pulse" : ""
                        )}>
                          <Image
                            src={m.logo}
                            alt={m.title}
                            className="object-contain w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-lg bg-[#3B6DD4] text-white flex items-center justify-center font-mono font-black text-lg shadow-sm shrink-0">
                          {m.initials}
                        </div>
                      )}

                      {/* Info Text */}
                      <div className="space-y-2">
                        <h4 className="font-bold text-lg text-primary-text leading-tight font-sans">
                          {m.title}
                        </h4>
                        <div className="flex justify-center pt-0.5">
                          <span className="inline-block text-xs font-mono font-black tracking-wider uppercase px-3 py-1 rounded-full bg-[#3B6DD4]/10 text-[#3B6DD4]">
                            {m.badge}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Floating Detail Card on Hover (Only for desktop) */}
                    <AnimatePresence>
                       {hoveredIdx === idx && (
                         <motion.div
                           initial={{ opacity: 0, y: activeAlign === 'below' ? 32 : -32 }}
                           animate={{ opacity: 1, y: activeAlign === 'below' ? 26 : -26 }}
                           exit={{ 
                             opacity: 0, 
                             y: activeAlign === 'below' ? 32 : -32,
                             transition: { duration: 0.18, ease: 'easeIn' }
                           }}
                           transition={{ duration: 0.22, ease: 'easeOut' }}
                           className={cn(
                             "absolute z-40 w-[300px]",
                             activeAlign === 'below' ? "top-0" : "bottom-0",
                             hoveredIdx === idx ? "pointer-events-auto" : "pointer-events-none"
                           )}
                           style={{ left: `${leftVal}px` }}
                         >
                           <div className="bg-surface border-[0.5px] border-border/80 rounded-xl p-5 shadow-md max-w-[300px] text-sm text-left leading-relaxed text-primary-text font-sans relative">
                             {renderCardContent(m)}
                           </div>
                         </motion.div>
                       )}
                    </AnimatePresence>

                  </div>
                );
              })}
            </div>

            {/* 2. Mobile Vertical Timeline (under md) */}
            <div className="block md:hidden relative w-full flex flex-col gap-12 pl-16">
              
              {/* Vertical Timeline Line */}
              <div className="absolute left-6 top-2 bottom-2 w-[2.5px] bg-border/60" />
              <div 
                className={cn(
                  "absolute left-6 top-2 bottom-2 w-[2.5px] bg-[#3B6DD4] origin-top transition-transform duration-1000 ease-out",
                  inView ? "scale-y-100" : "scale-y-0"
                )}
                style={{ transitionDelay: '0.5s' }}
              />
              
              {/* Arrowhead at the bottom */}
              <div 
                className={cn(
                  "absolute left-[21px] bottom-0 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-[#3B6DD4] transition-opacity duration-300",
                  inView ? "opacity-100" : "opacity-0"
                )}
                style={{ transitionDelay: '1.5s' }}
              />

              {/* Milestones (Mobile) */}
              {milestones.map((m, idx) => {
                const dotDelay = 0.2 + idx * 0.35;
                const labelDelay = dotDelay + 0.25;

                return (
                  <div
                    key={idx}
                    className="relative w-full"
                  >
                    {/* Year pill sitting directly on the line */}
                    <div
                      className={cn(
                        "absolute -translate-x-1/2 -translate-y-1/2 border-[2.5px] text-xs font-mono font-bold px-3 py-1 rounded-full z-20 shadow-sm transition-all duration-300",
                        m.isCurrent ? "bg-[#3B6DD4] text-white border-[#3B6DD4] shadow-[0_0_10px_rgba(59,109,212,0.4)]" : "bg-background text-[#3B6DD4]",
                        inView ? "animate-timeline-dot-custom" : "scale-0 opacity-0"
                      )}
                      style={{
                        left: '-40px', // Center on the line (64px padding - 40px = 24px = left-6)
                        top: '20px',  // Center vertically with the logo/header
                        borderColor: m.isUpcoming ? 'rgba(59, 109, 212, 0.4)' : '#3B6DD4',
                        borderStyle: m.isUpcoming ? 'dashed' : 'solid',
                        animationDelay: `${dotDelay}s`,
                      }}
                    >
                      {/* Glow pulsing ring for active/current milestone on Mobile */}
                      {m.isCurrent && (
                        <span className="absolute -inset-[2.5px] rounded-full border border-[#3B6DD4]/50 animate-ping pointer-events-none" />
                      )}
                      {m.year}
                    </div>

                    {/* Label block (Mobile: right of line, displaying details inline) */}
                    <div
                      className={cn(
                        "flex items-start gap-3.5 pr-2",
                        inView ? "animate-timeline-label-right-custom" : "opacity-0"
                      )}
                      style={{
                        animationDelay: `${labelDelay}s`,
                      }}
                    >
                      {/* Logo or Initials */}
                      {m.logo ? (
                        <div className={cn(
                          "w-10 h-10 rounded-md overflow-hidden border bg-white p-0.5 flex items-center justify-center shrink-0 shadow-sm mt-0.5 transition-all duration-300",
                          m.isCurrent ? "border-[#3B6DD4] border-[2px] scale-105 shadow-[0_0_8px_rgba(59,109,212,0.3)] animate-pulse" : "border-border",
                          !m.isCurrent && m.isUpcoming ? "opacity-70 border-dashed animate-pulse" : ""
                        )}>
                          <Image
                            src={m.logo}
                            alt={m.title}
                            className="object-contain w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-md bg-[#3B6DD4] text-white flex items-center justify-center font-mono font-black text-sm shadow-sm shrink-0 mt-0.5">
                          {m.initials}
                        </div>
                      )}

                      {/* Info Text & Inline Details */}
                      <div className="space-y-2 text-left flex-1 min-w-0">
                        <div>
                          <h4 className="font-bold text-base text-primary-text leading-snug font-sans truncate">
                            {m.title}
                          </h4>
                          <div className="flex justify-start mt-1">
                            <span className="inline-block text-[10px] font-mono font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#3B6DD4]/10 text-[#3B6DD4]">
                              {m.badge}
                            </span>
                          </div>
                        </div>

                        {/* Bullet points or structured eduData details */}
                        <div className="pt-2 border-t border-border/40">
                          {renderCardContent(m)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </Container>
    </Section>
  );
}
