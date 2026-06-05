'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform, useMotionValue, useAnimationFrame, Variants } from 'framer-motion';
import avatarImg from '@/assets/avt.jpg';

export function BlueprintCard() {
  const t = useTranslations('hero.blueprintCard');


  // 1. Physics Pendulum & Inertia State Setup
  const { scrollY } = useScroll();
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);

  const isDragging = useRef(false);
  const posX = useRef(0);
  // Start slightly higher to trigger a realistic drop on mount
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

  // Frame Loop running the physics engine
  useAnimationFrame((time, delta) => {
    let windowAccX = 0;
    let windowAccY = 0;

    // Track window shakes/movements
    if (typeof window !== 'undefined') {
      const currentScreenX = window.screenX ?? window.screenLeft;
      const currentScreenY = window.screenY ?? window.screenTop;

      if (lastScreenX.current !== null && lastScreenY.current !== null) {
        const dx = currentScreenX - lastScreenX.current;
        const dy = currentScreenY - lastScreenY.current;

        if (dx !== 0 || dy !== 0) {
          // Opposite acceleration (inertia)
          windowAccX = -dx * 16.0;
          windowAccY = -dy * 16.0;
        }
      }
      lastScreenX.current = currentScreenX;
      lastScreenY.current = currentScreenY;
    }

    // Track scroll velocity forces
    const currentScrollY = scrollY.get();
    const dScroll = currentScrollY - lastScrollY.current;
    lastScrollY.current = currentScrollY;

    let scrollAccY = 0;
    if (Math.abs(dScroll) > 0) {
      scrollAccY = -dScroll * 25.0; // Bob up/down when scrolling
    }

    // Cap delta time to prevent physics stability issues
    const dt = Math.min(delta / 1000, 0.03);

    if (isDragging.current) {
      // Sync physics positions with drag motion values
      posX.current = cardX.get();
      posY.current = cardY.get();
      velX.current = 0;
      velY.current = 0;
    } else {
      // Pendulum spring-mass-damper system
      const k = 180; // Spring stiffness
      const c = 8.0; // Damping (friction)

      const springForceX = -k * posX.current;
      const springForceY = -k * posY.current;

      const dampingForceX = -c * velX.current;
      const dampingForceY = -c * velY.current;

      const ax = springForceX + dampingForceX + windowAccX;
      const ay = springForceY + dampingForceY + windowAccY + scrollAccY;

      velX.current += ax * dt;
      velY.current += ay * dt;

      posX.current += velX.current * dt;
      posY.current += velY.current * dt;

      cardX.set(posX.current);
      cardY.set(posY.current);
    }
  });

  // Calculate dynamic lanyard length and rotation
  const lanyardHeight = useTransform(
    [cardX, cardY],
    ([x, y]) => {
      const xVal = x as number;
      const yVal = y as number;
      return Math.sqrt(xVal * xVal + (64 + yVal) * (64 + yVal));
    }
  );

  const lanyardRotate = useTransform(
    [cardX, cardY],
    ([x, y]) => {
      const xVal = x as number;
      const yVal = y as number;
      return Math.atan2(xVal, 64 + yVal) * (180 / Math.PI);
    }
  );

  // Map drag coordinates to a responsive card rotation tilt
  const cardRotate = useTransform(cardX, [-200, 200], [-20, 20]);

  // 2. Scroll Exit animations: fade out, shrink, and blur as user scrolls out of Hero
  const exitOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const exitScale = useTransform(scrollY, [0, 450], [1, 0.95]);
  const exitBlurVal = useTransform(scrollY, [0, 450], [0, 4]);
  const exitFilter = useTransform(exitBlurVal, (v) => `blur(${v}px)`);


  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: 'spring', damping: 20, stiffness: 80 }}
      className="relative flex flex-col items-center select-none w-full max-w-[320px] sm:max-w-[340px] md:max-w-[360px] mx-auto pt-16"
    >
      {/* Viewport hanging blue fabric lanyard strap */}
      <motion.div
        style={{
          height: lanyardHeight,
          rotate: lanyardRotate,
          opacity: exitOpacity,
        }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-6 bg-[#004bb6] origin-top z-0 shadow-sm"
      />

      {/* Main Blueprint Card */}
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.8}
        dragMomentum={false}
        onDragStart={() => {
          isDragging.current = true;
        }}
        onDragEnd={(event, info) => {
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
        }}
        className="relative bg-surface border-2 border-border rounded-xl shadow-md p-6 md:p-7 w-full border-t-[8px] border-t-accent z-10 space-y-6 cursor-grab active:cursor-grabbing shadow-lg select-none touch-none"
      >
        {/* Metal Lanyard Clip centered at top card border */}
        <div className="absolute -top-[12px] left-1/2 -translate-x-1/2 w-8 h-4 bg-gradient-to-b from-zinc-300 to-zinc-400 border border-zinc-400 rounded-sm z-20 flex items-center justify-center shadow-sm">
          <div className="w-4 h-1 bg-zinc-600 rounded-full" />
        </div>

        {/* Header: SYSTEM PROFILE */}
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <span className="font-mono text-[10px] font-bold text-secondary-text tracking-widest uppercase">
            // {t('header')}
          </span>
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        {/* Avatar & Identity Layout (Vertical ID Card Badge style) */}
        <div className="flex flex-col items-center space-y-4">
          {/* Avatar Photo - ID Card style (large, vertical-rectangular, border, blueprint overlay) */}
          <div className="relative w-40 h-48 rounded-lg border border-border bg-accent/5 overflow-hidden shrink-0 shadow-sm group">
            {/* Grid overlay for Blueprint feel */}
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-[0.08] z-10 pointer-events-none">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="border-r border-b border-accent" />
              ))}
            </div>
            {/* Image */}
            <Image 
              src={avatarImg} 
              alt={t('name')} 
              className="object-cover w-full h-full relative z-0 transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>

          {/* Name & Role */}
          <div className="text-center space-y-1">
            <h3 className="font-sans font-extrabold text-xl text-primary-text leading-tight tracking-tight">
              {t('name')}
            </h3>
            <span className="font-mono text-xs text-accent mt-0.5 block font-semibold uppercase tracking-wider">
              {t('role')}
            </span>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
}
