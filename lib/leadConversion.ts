import type { FormSource } from './forms';

// Flusso: invio riuscito -> redirectToThankYou() -> pagina /grazie/ -> consumePendingLead() -> una sola conversione.
const PENDING_KEY = 'sv_lead_conversion';
const THANK_YOU_URL = './grazie/';

function isFormSource(value: unknown): value is FormSource {
  return value === 'quick_form' || value === 'main_form';
}

export function redirectToThankYou(source: FormSource) {
  try {
    window.sessionStorage.setItem(PENDING_KEY, source);
  } catch {
    // sessionStorage non disponibile (navigazione privata restrittiva): resta il parametro ?f= come ripiego.
  }
  window.location.assign(`${THANK_YOU_URL}?f=${source}`);
}

// Restituisce il tipo di form SOLO se la pagina viene raggiunta subito dopo un invio riuscito, poi azzera tutto.
// Visita diretta, ricarica o link condiviso -> null (nessuna conversione).
export function consumePendingLead(): FormSource | null {
  const param = new URLSearchParams(window.location.search).get('f');

  let stored: string | null = null;
  let storageAvailable = true;
  try {
    stored = window.sessionStorage.getItem(PENDING_KEY);
    window.sessionStorage.removeItem(PENDING_KEY);
  } catch {
    storageAvailable = false;
  }

  // Tolgo ?f= dall'URL: un ricaricamento non deve poter ripetere la conversione.
  if (param) window.history.replaceState(null, '', window.location.pathname);

  if (isFormSource(stored)) return stored;
  if (!storageAvailable && isFormSource(param)) return param;
  return null;
}
