// Google Ads conversion tracking.
// TODO: sostituisci con l'ID conversione reale fornito da Google Ads
// (formato "AW-XXXXXXXXX/YYYYYYYYYYYYYYYYYYYY") una volta disponibile.
const CONVERSION_ID = 'AW-REPLACE_ME/REPLACE_ME';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackLeadConversion(formName: 'quick-form' | 'full-form') {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', 'conversion', {
    send_to: CONVERSION_ID,
    event_category: 'lead',
    event_label: formName,
  });
}
