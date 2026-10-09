export type LandingIntent = 'default' | 'progettazione' | 'arredo' | 'ristrutturazione';

export interface HeroVariant {
  intent: LandingIntent;
  eyebrow: string;
  title: string;
  accent: string;
  suffix?: string;
  subtitle: string;
}

const variants: Record<LandingIntent, HeroVariant> = {
  default: {
    intent: 'default',
    eyebrow: 'Progettazione · Allestimento · Arredamento farmacia',
    title: 'Progettazione e arredi',
    accent: 'su misura',
    suffix: 'per farmacie',
    subtitle: 'Trasformiamo layout, allestimento e spazi per migliorare servizi, esperienza del cliente e performance della farmacia.',
  },
  progettazione: {
    intent: 'progettazione',
    eyebrow: 'Progettazione · Restyling · Layout farmacia',
    title: 'Progettiamo farmacie',
    accent: 'che lavorano meglio',
    suffix: 'e comunicano più valore',
    subtitle: 'Layout, flussi e identità visiva progettati per comunicare più valore e migliorare l’esperienza quotidiana di clienti e team.',
  },
  arredo: {
    intent: 'arredo',
    eyebrow: 'Produzione italiana · Arredi su misura · Installazione',
    title: 'Arredi e mobili',
    accent: 'su misura',
    suffix: 'per farmacie',
    subtitle: 'Banconi, scaffali, espositori e cassettiere progettati sui tuoi spazi, con materiali selezionati e produzione italiana.',
  },
  ristrutturazione: {
    intent: 'ristrutturazione',
    eyebrow: 'Progetto · Produzione · Cantiere · Installazione',
    title: 'Ristruttura la tua farmacia',
    accent: 'con un unico partner',
    subtitle: 'Coordiniamo progetto, produzione, installazione e gestione del cantiere, lavorando spesso per fasi anche a farmacia aperta.',
  },
};

export function getLandingIntent(): LandingIntent {
  const intent = new URLSearchParams(window.location.search).get('intent');
  return intent === 'progettazione' || intent === 'arredo' || intent === 'ristrutturazione'
    ? intent
    : 'default';
}

export function getHeroVariant() {
  return variants[getLandingIntent()];
}
