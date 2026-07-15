// Google Ads conversion tracking — evento lead (form rapido + form completo).
const CONVERSION_ID = 'AW-1072446258/BknuCLTJmelbELL2sP8D';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackLeadConversion() {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', 'conversion', {
    send_to: CONVERSION_ID,
    value: 1.0,
    currency: 'EUR',
  });
}
