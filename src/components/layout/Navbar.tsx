'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { locales } from '@/i18n/config';
import { cn } from '@/lib/utils';
import { Container } from './Container';

interface NavbarProps {
  currentLocale: string;
}

export function Navbar({ currentLocale }: NavbarProps) {
  const t = useTranslations('common');
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled state
      setIsScrolled(currentScrollY > 10);

      // Scroll direction & visibility
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: t('nav.about') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'growth', label: t('nav.growth') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const switchLocale = (locale: string) => {
    const newPath = pathname.replace(new RegExp(`^/${currentLocale}`), `/${locale}`);
    router.push(newPath);
    setIsOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 border-b border-transparent transition-all duration-300 ease-in-out transform',
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-border/50 py-4 shadow-sm' 
          : 'bg-transparent py-6',
        isVisible || isOpen ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <Container className="flex items-center justify-between">
        {/* Logo */}
        <Link 
          href={`/${currentLocale}`} 
          className="font-mono text-sm font-bold tracking-widest text-accent hover:opacity-80 transition-opacity"
        >
          &lt;NQK /&gt;
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="text-sm font-medium text-secondary-text hover:text-accent transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="h-4 w-[1px] bg-border" />

          {/* Language Toggle Capsule */}
          <div className="flex items-center gap-0.5 bg-surface border border-border rounded-full p-0.5 shadow-sm" role="group" aria-label="Language selector">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => switchLocale(locale)}
                className={cn(
                  'text-xs font-semibold px-3 py-1 rounded-full transition-all duration-200 cursor-pointer',
                  locale === currentLocale
                    ? 'text-white bg-accent font-bold shadow-sm'
                    : 'text-secondary-text hover:text-primary-text'
                )}
                aria-label={`Switch to ${locale === 'en' ? 'English' : 'Tiếng Việt'}`}
                aria-current={locale === currentLocale ? 'true' : undefined}
              >
                {locale.toUpperCase()}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <div className="flex items-center gap-1" role="group" aria-label="Language selector">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => switchLocale(locale)}
                className={cn(
                  'text-xs font-semibold px-2 py-0.5 rounded transition-colors cursor-pointer',
                  locale === currentLocale
                    ? 'text-accent font-bold'
                    : 'text-secondary-text'
                )}
                aria-label={`Switch to ${locale === 'en' ? 'English' : 'Tiếng Việt'}`}
                aria-current={locale === currentLocale ? 'true' : undefined}
              >
                {locale.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 text-secondary-text hover:text-primary-text transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-surface border-b border-border shadow-md py-6 px-6 animate-fade-in">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="block text-base font-medium text-secondary-text hover:text-accent py-2 transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
