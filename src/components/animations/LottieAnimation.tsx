'use client';

import { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

interface LottieAnimationProps {
  animationData: any;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  play?: boolean;
}

export function LottieAnimation({
  animationData,
  loop = true,
  autoplay = true,
  className = '',
  play = true,
}: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    animRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'canvas',
      loop,
      autoplay: autoplay && play,
      animationData,
    });

    return () => {
      animRef.current?.destroy();
      animRef.current = null;
    };
  }, [animationData, loop, autoplay]);

  useEffect(() => {
    if (!animRef.current) return;

    if (play) {
      animRef.current.play();
    } else {
      animRef.current.pause();
    }
  }, [play]);

  return <div ref={containerRef} className={className} />;
}
