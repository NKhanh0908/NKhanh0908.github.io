'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, Variants } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/ui/Heading';
import { cn } from '@/lib/utils';

export function SkillsSection() {
  const t = useTranslations('skills');

  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  // Ref to track active floating labels for DOM cleanup on unmount
  const activeSpansRef = useRef<Set<HTMLSpanElement>>(new Set());

  const skillKeys = [
    // Row 1 (longest)
    [
      { name: "Java", iconSlug: "java", color: "#ED8B00", category: "backend" },
      { name: "Spring Boot", iconSlug: "springboot", color: "#6DB33F", category: "backend" },
      { name: "Spring Security", iconSlug: "springsecurity", color: "#6DB33F", category: "backend" },
      { name: "JWT", iconSlug: "jsonwebtokens", color: "#D63AFF", category: "backend" },
      { name: "Redis", iconSlug: "redis", color: "#DC382D", category: "backend" },
      { name: "PostgreSQL", iconSlug: "postgresql", color: "#4169E1", category: "backend" },
      { name: "MySQL", iconSlug: "mysql", color: "#4479A1", category: "backend" },
    ],
    // Row 2 (offset left)
    [
      { name: "MongoDB", iconSlug: "mongodb", color: "#47A248", category: "backend" },
      { name: "WebSocket", iconSlug: "websocket", color: "#3B6DD4", category: "backend" },
      { name: "React", iconSlug: "react", color: "#61DAFB", category: "frontend" },
      { name: "TypeScript", iconSlug: "typescript", color: "#3178C6", category: "frontend" },
      { name: "Redux Toolkit", iconSlug: "redux", color: "#764ABC", category: "frontend" },
    ],
    // Row 3 (offset more)
    [
      { name: "Tailwind CSS", iconSlug: "tailwindcss", color: "#06B6D4", category: "frontend" },
      { name: "Docker", iconSlug: "docker", color: "#2496ED", category: "devops" },
      { name: "Git", iconSlug: "git", color: "#F05032", category: "devops" },
      { name: "Maven", iconSlug: "apachemaven", color: "#C71A36", category: "devops" },
      { name: "Postman", iconSlug: "postman", color: "#FF6C37", category: "devops" },
      { name: "Swagger", iconSlug: "swagger", color: "#85EA2D", category: "devops" },
    ],
  ];

  // Flat list for mobile layout
  const flatKeys = skillKeys.flat();

  // Spawns floating label at click/tap client coordinate
  const spawnFloatingLabel = (text: string, color: string, clientX: number, clientY: number) => {
    const span = document.createElement('span');
    span.innerText = text;
    span.style.position = 'fixed';
    span.style.left = `${clientX}px`;
    span.style.top = `${clientY}px`;
    span.style.transform = 'translate(-50%, -50%) translate(0px, 0px)';
    span.style.color = color;
    span.style.fontFamily = 'monospace';
    span.style.fontSize = '18px';
    span.style.fontWeight = '800';
    span.style.textShadow = '0 0 8px currentColor, 0 2px 4px rgba(0,0,0,0.15)';
    span.style.pointerEvents = 'none';
    span.style.zIndex = '9999';
    span.style.whiteSpace = 'nowrap';
    span.style.opacity = '1';
    span.style.transition = 'transform 700ms ease-out, opacity 700ms ease-out';

    document.body.appendChild(span);
    activeSpansRef.current.add(span);

    // Force reflow
    span.getBoundingClientRect();

    // Calculate random 360 degree angle & distance for scatter trajectory
    const angle = Math.random() * Math.PI * 2;
    const distance = 70 + Math.random() * 50;
    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    // Start fly-out and fade-out animation
    span.style.transform = `translate(-50%, -50%) translate(${moveX}px, ${moveY}px)`;
    span.style.opacity = '0';

    // Remove from DOM after transition finishes
    setTimeout(() => {
      span.remove();
      activeSpansRef.current.delete(span);
    }, 700);
  };

  // Cleanup active floating label spans on component unmount to prevent leaks
  useEffect(() => {
    return () => {
      activeSpansRef.current.forEach(span => {
        span.remove();
      });
      activeSpansRef.current.clear();
    };
  }, []);

  const handlePressStart = (name: string) => {
    setActiveKey(name);
  };

  const handlePressEnd = () => {
    setActiveKey(null);
  };

  const handleMouseDown = (e: React.MouseEvent, key: typeof flatKeys[number]) => {
    if (e.button === 0) { // Left click only
      handlePressStart(key.name);
      spawnFloatingLabel(key.name, key.color, e.clientX, e.clientY);
    }
  };

  const handleTouchStart = (e: React.TouchEvent, key: typeof flatKeys[number]) => {
    if (e.cancelable) e.preventDefault();
    handlePressStart(key.name);
    const touch = e.touches[0];
    spawnFloatingLabel(key.name, key.color, touch.clientX, touch.clientY);
  };

  // Framer Motion staggered variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03, // 30ms stagger
      },
    },
  };

  const keyVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: "easeOut",
      },
    },
  };

  const renderIcon = (key: typeof flatKeys[number]) => {
    if (key.iconSlug === 'websocket') {
      return (
        <span 
          style={{ color: key.color }} 
          className="text-sm md:text-base font-black tracking-tighter transition-opacity duration-150 select-none"
        >
          WS
        </span>
      );
    }
    return (
      <div
        style={{
          maskImage: `url(https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${key.iconSlug}.svg)`,
          WebkitMaskImage: `url(https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${key.iconSlug}.svg)`,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
          backgroundColor: key.color,
        }}
        className="w-7 h-7 md:w-9 md:h-9 transition-all duration-150 shrink-0"
      />
    );
  };

  return (
    <Section id="skills">
      <Container>
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
              04 // SKILLS
            </span>
            <Heading level={2}>{t('title')}</Heading>
          </div>

          {/* 1. Desktop Keyboard Grid (md and up) - centered via w-fit mx-auto */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="hidden md:flex flex-col gap-2.5 relative w-fit mx-auto overflow-visible py-4 select-none"
          >
            {skillKeys.map((row, rowIdx) => {
              // Apply QWERTY stagger alignment offsets: Row 1 = 0, Row 2 = pl-8 (32px), Row 3 = pl-16 (64px)
              let staggerClass = "";
              if (rowIdx === 1) staggerClass = "pl-8";
              else if (rowIdx === 2) staggerClass = "pl-16";

              return (
                <div key={rowIdx} className={cn("flex flex-row gap-2", staggerClass)}>
                  {row.map((key, keyIdx) => {
                    const isPressed = activeKey === key.name;
                    
                    // Accent dot color mappings
                    let dotColor = "bg-[#3B6DD4]"; // Backend blue
                    if (key.category === "frontend") dotColor = "bg-[#a855f7]"; // Frontend purple
                    else if (key.category === "devops") dotColor = "bg-[#f59e0b]"; // DevOps amber

                    return (
                      <motion.div
                        key={keyIdx}
                        variants={keyVariants}
                        className="relative"
                        onMouseEnter={() => setHoveredKey(key.name)}
                        onMouseLeave={() => {
                          setHoveredKey(null);
                          handlePressEnd();
                        }}
                        onMouseDown={(e) => handleMouseDown(e, key)}
                        onMouseUp={handlePressEnd}
                      >
                        {/* Key face */}
                        <div
                          className={cn(
                            "relative flex flex-col items-center justify-between py-3 px-1 rounded-xl bg-background border border-[#cbd5e1] dark:border-slate-700/80 border-b-[rgba(0,0,0,0.18)] dark:border-b-[rgba(0,0,0,0.5)] cursor-pointer select-none group w-[88px] h-[88px] shrink-0 shadow-[0_2px_6px_rgba(0,0,0,0.08)]",
                            isPressed
                              ? "translate-y-[3px]"
                              : "hover:-translate-y-1 hover:shadow-lg hover:border-b-[rgba(0,0,0,0.3)] hover:dark:border-b-[rgba(0,0,0,0.75)]"
                          )}
                          style={{
                            borderBottomWidth: isPressed ? '1px' : hoveredKey === key.name ? '7px' : '5px',
                            transition: isPressed 
                              ? 'transform 80ms ease-out, border-bottom-width 80ms ease-out' 
                              : 'transform 120ms cubic-bezier(0.34, 1.56, 0.64, 1), border-bottom-width 120ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                          }}
                        >
                          {/* Top-right Accent dot */}
                          <span className={cn("absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full shrink-0", dotColor)} />

                          {/* Tech icon */}
                          <div className="flex-1 flex items-center justify-center">
                            {renderIcon(key)}
                          </div>

                          {/* Tech Name */}
                          <span className="text-[11px] font-medium leading-none text-secondary-text group-hover:text-primary-text transition-colors duration-150 break-words w-full text-center px-0.5">
                            {key.name}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              );
            })}
          </motion.div>

          {/* 2. Mobile Keyboard Grid (under md) - wraps naturally */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="flex md:hidden flex-wrap gap-2.5 justify-center py-2 select-none w-full"
          >
            {flatKeys.map((key, keyIdx) => {
              const isPressed = activeKey === key.name;
              
              let dotColor = "bg-[#3B6DD4]";
              if (key.category === "frontend") dotColor = "bg-[#a855f7]";
              else if (key.category === "devops") dotColor = "bg-[#f59e0b]";

              return (
                <motion.div
                  key={keyIdx}
                  variants={keyVariants}
                  className="relative"
                  onTouchStart={(e) => handleTouchStart(e, key)}
                  onTouchEnd={handlePressEnd}
                  onMouseDown={(e) => handleMouseDown(e, key)}
                  onMouseUp={handlePressEnd}
                >
                  <div
                    className={cn(
                      "relative flex flex-col items-center justify-between py-2 px-1 rounded-lg bg-background border border-[#cbd5e1] dark:border-slate-700/80 border-b-[rgba(0,0,0,0.18)] dark:border-b-[rgba(0,0,0,0.5)] cursor-pointer select-none group w-[68px] h-[68px] shrink-0 shadow-[0_2px_6px_rgba(0,0,0,0.08)]",
                      isPressed
                        ? "translate-y-[3px]"
                        : ""
                    )}
                    style={{
                      borderBottomWidth: isPressed ? '1px' : '5px',
                      transition: isPressed 
                        ? 'transform 80ms ease-out, border-bottom-width 80ms ease-out' 
                        : 'transform 120ms cubic-bezier(0.34, 1.56, 0.64, 1), border-bottom-width 120ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                  >
                    <span className={cn("absolute top-1 right-1 w-1 h-1 rounded-full shrink-0", dotColor)} />

                    <div className="flex-1 flex items-center justify-center">
                      {renderIcon(key)}
                    </div>

                    <span className="text-[9px] font-medium leading-none text-secondary-text break-words w-full text-center px-0.5">
                      {key.name}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
