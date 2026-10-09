export type CallLocation = 'sticky_bar' | 'quick_form' | 'contact_section' | 'thank_you';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

// Evento "solo pagina": NON usa gtag(), quindi non viene inviato a Google Ads e non è una conversione.
// Resta disponibile sulla pagina (dataLayer + CustomEvent) per eventuali strumenti di analisi collegati in futuro.
export function trackClickToCall(location: CallLocation) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'click_to_call', click_location: location });
    window.dispatchEvent(new CustomEvent('sv:click_to_call', { detail: { location } }));
  } catch {
    // Mai bloccare la chiamata per un problema di tracciamento.
  }
}
