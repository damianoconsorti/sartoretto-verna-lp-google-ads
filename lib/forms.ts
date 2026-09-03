export type FormSource = 'quick_form' | 'main_form';

export const PRIVACY_URL = 'https://sartorettoverna.it/privacy-policy/';

const ATTRIBUTION_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'wbraid',
  'gbraid',
] as const;

type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];

function readStoredAttribution(): Partial<Record<AttributionKey, string>> {
  try {
    const raw = window.sessionStorage.getItem('sv_ads_attribution');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  const previous = readStoredAttribution();
  const next = { ...previous };

  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key)?.trim();
    if (value) next[key] = value;
  }

  try {
    window.sessionStorage.setItem('sv_ads_attribution', JSON.stringify(next));
  } catch {
    // Storage can be unavailable in privacy-focused browsing modes.
  }
}

export function buildAttribution(formSource: FormSource): Record<string, string> {
  captureAttribution();
  const stored = readStoredAttribution();

  return {
    form_source: formSource,
    pagina: window.location.href,
    page_url: window.location.href,
    utm_source: stored.utm_source ?? '',
    utm_medium: stored.utm_medium ?? '',
    utm_campaign: stored.utm_campaign ?? '',
    utm_content: stored.utm_content ?? '',
    utm_term: stored.utm_term ?? '',
    gclid: stored.gclid ?? '',
    wbraid: stored.wbraid ?? '',
    gbraid: stored.gbraid ?? '',
    timestamp: new Date().toISOString(),
  };
}

export async function submitLead(
  endpoint: string,
  payload: Record<string, string>,
  fetcher: typeof fetch = window.fetch.bind(window),
) {
  const response = await fetcher(endpoint, {
    method: 'POST',
    body: new URLSearchParams(payload),
  });

  if (!response.ok) {
    throw new Error(`Webhook response ${response.status}`);
  }
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
