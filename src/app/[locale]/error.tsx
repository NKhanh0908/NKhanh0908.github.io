'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { Paragraph } from '@/components/ui/Paragraph';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <div className="max-w-md space-y-6">
        <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
          [ System Error ]
        </span>
        <Heading level={2}>Something went wrong</Heading>
        <Paragraph>
          An unexpected error occurred while executing the system flow. You can try reloading the application.
        </Paragraph>
        <div className="pt-2">
          <Button onClick={() => reset()}>Retry Execution</Button>
        </div>
      </div>
    </div>
  );
}
