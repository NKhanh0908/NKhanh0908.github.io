'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform, useMotionValue, useAnimationFrame, useSpring } from 'framer-motion';
import avatarImg from '@/assets/avt.jpg';

export function BlueprintCard() {
  const t = useTranslations('hero.blueprintCard');

  // ─── Lanyard / pendulum physics (giữ nguyên từ bản gốc) ────────────────────
  const { scrollY } = useScroll();
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);

  const isDragging = useRef(false);
  const posX = useRef(0);
  const posY = useRef(-120);
  const velX = useRef(0);
  const velY = useRef(0);
  const lastScreenX = useRef<number | null>(null);
  const lastScreenY = useRef<number | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      lastScreenX.current = window.screenX ?? window.screenLeft;
      lastScreenY.current = window.screenY ?? window.screenTop;
      lastScrollY.current = scrollY.get();
    }
  }, [scrollY]);

  useAnimationFrame((_, delta) => {
    let windowAccX = 0;
    let windowAccY = 0;

    if (typeof window !== 'undefined') {
      const currentScreenX = window.screenX ?? window.screenLeft;
      const currentScreenY = window.screenY ?? window.screenTop;

      if (lastScreenX.current !== null && lastScreenY.current !== null) {
        const dx = currentScreenX - lastScreenX.current;
        const dy = currentScreenY - lastScreenY.current;
        if (dx !== 0 || dy !== 0) {
          windowAccX = -dx * 16.0;
          windowAccY = -dy * 16.0;
        }
      }
      lastScreenX.current = currentScreenX;
      lastScreenY.current = currentScreenY;
    }

    const currentScrollY = scrollY.get();
    const dScroll = currentScrollY - lastScrollY.current;
    lastScrollY.current = currentScrollY;

    const scrollAccY = Math.abs(dScroll) > 0 ? -dScroll * 25.0 : 0;
    const dt = Math.min(delta / 1000, 0.03);

    if (isDragging.current) {
      posX.current = cardX.get();
      posY.current = cardY.get();
      velX.current = 0;
      velY.current = 0;
    } else {
      const k = 180;
      const c = 8.0;
      const ax = -k * posX.current - c * velX.current + windowAccX;
      const ay = -k * posY.current - c * velY.current + windowAccY + scrollAccY;

      velX.current += ax * dt;
      velY.current += ay * dt;
      posX.current += velX.current * dt;
      posY.current += velY.current * dt;

      cardX.set(posX.current);
      cardY.set(posY.current);
    }
  });

  const lanyardHeight = useTransform([cardX, cardY], ([x, y]) => {
    const xv = x as number, yv = y as number;
    return Math.sqrt(xv * xv + (64 + yv) * (64 + yv));
  });
  const lanyardRotate = useTransform([cardX, cardY], ([x, y]) => {
    const xv = x as number, yv = y as number;
    return Math.atan2(xv, 64 + yv) * (180 / Math.PI);
  });
  const cardRotate = useTransform(cardX, [-200, 200], [-20, 20]);

  const exitOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const exitScale  = useTransform(scrollY, [0, 450], [1, 0.95]);
  const exitBlurVal = useTransform(scrollY, [0, 450], [0, 4]);
  const exitFilter = useTransform(exitBlurVal, (v) => `blur(${v}px)`);

  // ─── 3D Mouse-Tilt ──────────────────────────────────────────────────────────
  const cardRef = useRef<HTMLDivElement>(null);
  const rotX = useSpring(0, { stiffness: 200, damping: 20 });
  const rotY = useSpring(0, { stiffness: 200, damping: 20 });
  const glowX = useMotionValue(50); // % position for glare
  const glowY = useMotionValue(50);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isDragging.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);   // -1 to 1
    const dy = (e.clientY - cy) / (rect.height / 2);  // -1 to 1

    rotX.set(-dy * 14);
    rotY.set(dx * 14);
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  }, [rotX, rotY, glowX, glowY]);

  const handleMouseLeave = useCallback(() => {
    rotX.set(0);
    rotY.set(0);
    glowX.set(50);
    glowY.set(50);
    setIsHovered(false);
  }, [rotX, rotY, glowX, glowY]);

  const glareBackground = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)`
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: 'spring', damping: 20, stiffness: 80 }}
      className="relative flex flex-col items-center select-none w-full max-w-[320px] sm:max-w-[340px] md:max-w-[360px] mx-auto pt-16"
    >
      {/* Lanyard strap */}
      <motion.div
        style={{ height: lanyardHeight, rotate: lanyardRotate, opacity: exitOpacity }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-6 bg-[#004bb6] origin-top z-0 shadow-sm"
      />

      {/* Outer motion wrapper — handles pendulum physics */}
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.8}
        dragMomentum={false}
        onDragStart={() => { isDragging.current = true; }}
        onDragEnd={(_, info) => {
          isDragging.current = false;
          velX.current = info.velocity.x;
          velY.current = info.velocity.y;
        }}
        style={{
          x: cardX,
          y: cardY,
          rotate: cardRotate,
          opacity: exitOpacity,
          scale: exitScale,
          filter: exitFilter,
          perspective: 900,
        }}
        className="z-10 w-full cursor-grab active:cursor-grabbing touch-none"
      >
        {/* Inner motion wrapper — handles 3D tilt */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: rotX,
            rotateY: rotY,
            transformStyle: 'preserve-3d',
          }}
          className="relative w-full"
        >
          {/* Card body */}
          <div
            className="relative bg-surface border-2 border-border rounded-xl shadow-lg p-6 md:p-7 w-full border-t-[8px] border-t-accent space-y-6 overflow-hidden"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Metal clip */}
            <div className="absolute -top-[12px] left-1/2 -translate-x-1/2 w-8 h-4 bg-gradient-to-b from-zinc-300 to-zinc-400 border border-zinc-400 rounded-sm z-20 flex items-center justify-center shadow-sm">
              <div className="w-4 h-1 bg-zinc-600 rounded-full" />
            </div>

            {/* Glare layer — rendered above content */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-30 rounded-xl transition-opacity duration-300"
              style={{
                background: glareBackground,
                opacity: isHovered ? 1 : 0,
              }}
            />

            {/* Subtle depth shadow overlay at bottom */}
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 z-20 rounded-b-xl"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.06), transparent)',
              }}
            />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <span className="font-mono text-[10px] font-bold text-secondary-text tracking-widest uppercase">
                // {t('header')}
              </span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Avatar & Identity */}
            <div className="flex flex-col items-center space-y-4">
              {/* Avatar — slightly lifted in 3D space */}
              <div
                className="relative w-40 h-48 rounded-lg border border-border bg-accent/5 overflow-hidden shrink-0 shadow-md group"
                style={{ transform: 'translateZ(12px)' }}
              >
                {/* Blueprint grid overlay */}
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-[0.08] z-10 pointer-events-none">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className="border-r border-b border-accent" />
                  ))}
                </div>
                <Image
                  src={avatarImg}
                  alt={t('name')}
                  className="object-cover w-full h-full relative z-0 transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>

              {/* Name & Role — slightly more lifted */}
              <div
                className="text-center space-y-1"
                style={{ transform: 'translateZ(8px)' }}
              >
                <h3 className="font-sans font-extrabold text-xl text-primary-text leading-tight tracking-tight">
                  {t('name')}
                </h3>
                <span className="font-mono text-xs text-accent mt-0.5 block font-semibold uppercase tracking-wider">
                  {t('role')}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}