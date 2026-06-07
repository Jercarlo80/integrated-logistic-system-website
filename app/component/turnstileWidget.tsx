// components/TurnstileWidget.tsx
'use client';

import { useEffect, useRef } from 'react';

// Local type definition to avoid global conflicts
type TurnstileAPI = {
  render: (
    container: HTMLElement,
    params: {
      sitekey: string;
      callback: (token: string) => void;
      'error-callback'?: (error: unknown) => void;
      'expired-callback'?: () => void;
      theme?: 'light' | 'dark' | 'auto';
    }
  ) => string | number;
  remove: (widgetId: string | number) => void;
};

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  theme?: 'light' | 'dark' | 'auto';
}

export default function TurnstileWidget({
  onVerify,
  theme = 'auto',
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | number | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY;

  useEffect(() => {
    if (!siteKey) {
      console.error(
        'TurnstileWidget: Missing NEXT_PUBLIC_TURNSTILE_SITEKEY environment variable.'
      );
      onVerify('');
      return;
    }

    const renderTurnstile = () => {
      // Cast window.turnstile to our expected type (it will exist after script loads)
      const turnstile = (window as { turnstile?: TurnstileAPI }).turnstile;
      if (!turnstile || !containerRef.current) return;

      if (widgetId.current !== null) {
        try {
          turnstile.remove(widgetId.current);
        } catch (err) {
          console.warn('TurnstileWidget: Error removing previous widget', err);
        }
        widgetId.current = null;
      }

      try {
        widgetId.current = turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme,
          callback: (token: string) => {
            onVerify(token);
          },
          'error-callback': (err: unknown) => {
            console.error('TurnstileWidget: Render error', err);
            onVerify('');
          },
          'expired-callback': () => {
            console.log('TurnstileWidget: Token expired');
            onVerify('');
          },
        });
      } catch (err) {
        console.error('TurnstileWidget: Failed to call turnstile.render', err);
        onVerify('');
      }
    };

    // Check if already loaded
    if ((window as { turnstile?: TurnstileAPI }).turnstile) {
      renderTurnstile();
    } else {
      const script = document.createElement('script');
      script.src =
        'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onload = renderTurnstile;
      script.onerror = () => {
        console.error('TurnstileWidget: Failed to load Turnstile script');
        onVerify('');
      };
      document.head.appendChild(script);
    }

    return () => {
      const turnstile = (window as { turnstile?: TurnstileAPI }).turnstile;
      if (widgetId.current !== null && turnstile) {
        try {
          turnstile.remove(widgetId.current);
        } catch (err) {
          // ignore cleanup errors
        }
        widgetId.current = null;
      }
    };
  }, [onVerify, siteKey, theme]);

  return <div ref={containerRef} />;
}