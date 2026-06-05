'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById('experience');
      if (el) {
        const rect = el.getBoundingClientRect();
        // Show button when the experience section top is near or above the viewport top
        setIsVisible(rect.top <= 100);
      } else {
        // Fallback
        setIsVisible(window.scrollY > 800);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger on mount in case page is already scrolled
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-2.5 rounded-full bg-surface border-2 border-border text-primary-text shadow-lg hover:border-accent hover:text-accent hover:-translate-y-1 active:scale-95 transition-all duration-300 group cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 duration-200" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
