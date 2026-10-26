// Google Ads conversion tracking — evento lead (form rapido + form completo).
const CONVERSION_ID = 'AW-1072446258/BknuCLTJmeIbELL2sP8D';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    oaiq?: (...args: unknown[]) => void;
  }
}

export function trackLeadConversion(formType: 'quick_form' | 'main_form') {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', {
      form_type: formType,
      value: 1.0,
      currency: 'EUR',
    });
    window.gtag('event', 'conversion', {
      send_to: CONVERSION_ID,
      value: 1.0,
      currency: 'EUR',
    });
  }

  // OpenAI Ads: stesso evento configurato in Ads Manager per le campagne ITA, USA e GCC.
  if (typeof window.oaiq === 'function') {
    window.oaiq('measure', 'lead_created', { type: 'customer_action' });
  }
}
