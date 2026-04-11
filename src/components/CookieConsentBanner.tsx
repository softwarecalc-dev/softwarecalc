import { useCookieConsent } from '../hooks/useCookieConsent';

export function CookieConsentBanner() {
  const { showBanner, accept, decline } = useCookieConsent();

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg"
      style={{ backgroundColor: '#fff' }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Text */}
          <p className="flex-1 text-sm text-gray-700 leading-relaxed">
            We use cookies to improve your experience and show relevant ads. By continuing to use our
            site, you consent to our use of cookies. Read more in our{' '}
            <a
              href="/privacy-policy"
              className="underline font-medium"
              style={{ color: '#209250' }}
            >
              Privacy Policy
            </a>
            .
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={decline}
              className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1"
              style={{ '--tw-ring-color': '#209250' } as React.CSSProperties}
            >
              Decline
            </button>
            <button
              onClick={accept}
              className="px-4 py-2 text-sm font-medium rounded-md text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1"
              style={{
                backgroundColor: '#209250',
                ['--tw-ring-color' as string]: '#209250',
              }}
              onMouseEnter={e => ((e.target as HTMLButtonElement).style.backgroundColor = '#12542e')}
              onMouseLeave={e => ((e.target as HTMLButtonElement).style.backgroundColor = '#209250')}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
