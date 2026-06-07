"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Script from "next/script";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          appearance?: "always" | "execute" | "interaction-only";
          retry?: "auto" | "never";
          "retry-interval"?: number;
          "refresh-expired"?: "auto" | "manual" | "never";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: (errorCode: string) => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
      getResponse: (widgetId?: string) => string | undefined;
    };
  }
}

export type TurnstileHandle = {
  reset: () => void;
};

type TurnstileProps = {
  siteKey: string;
  theme?: "light" | "dark" | "auto";
  appearance?: "always" | "execute" | "interaction-only";
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: (errorCode: string) => void;
};

const Turnstile = forwardRef<TurnstileHandle, TurnstileProps>(
  (
    { siteKey, theme = "auto", appearance = "always", onVerify, onExpire, onError },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const widgetIdRef = useRef<string | null>(null);
    const [scriptReady, setScriptReady] = useState(false);

    // Callback terbaru disimpan di ref agar efek render tidak ikut berubah.
    const onVerifyRef = useRef(onVerify);
    const onExpireRef = useRef(onExpire);
    const onErrorRef = useRef(onError);
    useEffect(() => {
      onVerifyRef.current = onVerify;
      onExpireRef.current = onExpire;
      onErrorRef.current = onError;
    });

    useImperativeHandle(ref, () => ({
      reset: () => {
        if (window.turnstile && widgetIdRef.current) {
          window.turnstile.reset(widgetIdRef.current);
        }
      },
    }));

    useEffect(() => {
      if (!scriptReady || !siteKey) return;
      if (!window.turnstile || !containerRef.current) return;

      let cancelled = false;

      const timer = setTimeout(() => {
        if (cancelled || widgetIdRef.current || !window.turnstile) return;
        widgetIdRef.current = window.turnstile.render(containerRef.current!, {
          sitekey: siteKey,
          theme,
          appearance,
          retry: "auto",
          "retry-interval": 8000,
          "refresh-expired": "auto",
          callback: (token: string) => onVerifyRef.current(token),
          "expired-callback": () => onExpireRef.current?.(),
          "error-callback": (code: string) => onErrorRef.current?.(code),
        });
      }, 0);

      return () => {
        cancelled = true;
        clearTimeout(timer);
        if (window.turnstile && widgetIdRef.current) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch {
            // abaikan kegagalan cleanup
          }
          widgetIdRef.current = null;
        }
      };
    }, [scriptReady, siteKey, theme, appearance]);

    return (
      <>
        <Script
          id="turnstile-script"
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={() => setScriptReady(true)}
        />
        <div ref={containerRef} />
      </>
    );
  },
);

Turnstile.displayName = "Turnstile";

export default Turnstile;