// Google Ads conversion tracking. Account ID confermato: AW-1072446258
// TODO: manca la label conversione (parte dopo "/") — sostituisci REPLACE_ME_LABEL
// una volta ricevuto lo snippet "gtag('event', 'conversion', {send_to: ...})".
const CONVERSION_ID = 'AW-1072446258/REPLACE_ME_LABEL';

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
