import { useTranslations } from 'next-intl';
import { Container } from './Container';

export function Footer() {
  const t = useTranslations('common');

  return (
    <footer className="border-t border-border bg-surface py-8">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-sm text-secondary-text font-mono">
        <div>{t('footer.builtBy')}</div>
        <div>{t('footer.copyright')}</div>
      </Container>
    </footer>
  );
}
