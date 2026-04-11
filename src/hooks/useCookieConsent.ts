import { useState, useEffect } from 'react';

type ConsentStatus = 'accepted' | 'declined' | null;

const STORAGE_KEY = 'cookie_consent';

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentStatus>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentStatus | null;
    setConsent(stored);
    setIsLoaded(true);

    // Load tracking scripts if already accepted
    if (stored === 'accepted') {
      loadTrackingScripts();
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setConsent('accepted');
    loadTrackingScripts();
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setConsent('declined');
  };

  const showBanner = isLoaded && consent === null;

  return { consent, showBanner, accept, decline };
}

const GA_MEASUREMENT_ID = 'G-EV31WGF805';

function loadTrackingScripts() {
  if (typeof window === 'undefined' || window.document.getElementById('ga-gtag')) return;

  // Global Site Tag (gtag.js) - Google Analytics
  const script = document.createElement('script');
  script.id = 'ga-gtag';
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  const inlineScript = document.createElement('script');
  inlineScript.id = 'ga-gtag-init';
  inlineScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', {
      page_path: window.location.pathname,
    });
  `;
  document.head.appendChild(inlineScript);
}

// Helper to track page views manually on route changes
export function trackPageView(path: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
    });
  }
}