import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const faqs = [
  { q: 'Quanto tempo richiede il progetto di una farmacia?',
    a: 'Dipende da metratura e complessità. In consulenza definiamo insieme un calendario realistico per progetto, produzione e installazione.' },
  { q: 'Operate in tutta Italia e all\'estero?',
    a: 'Sì. Abbiamo realizzato progetti in tutta Italia e in 48 Paesi nel mondo.' },
  { q: 'Come funziona il primo contatto?',
    a: 'Dopo la richiesta, un nostro Architect Manager ti contatta per comprendere obiettivi, metratura, stato attuale della farmacia e tempistiche. Da lì definiamo il percorso più adatto: analisi, progetto, produzione e installazione.' },
  { q: 'È possibile restare aperti durante l\'installazione?',
    a: 'Possiamo pianificare l\'installazione degli arredi per fasi, in accordo con te, per limitare l\'impatto sull\'attività. Per i lavori edili possiamo consigliarti imprese di fiducia.' },
  { q: 'Quanto costa arredare una farmacia?',
    a: 'Ogni progetto è unico, quindi non esistono prezzi standard. In consulenza ti forniremo un preventivo dettagliato basato sulla metratura, i materiali, la tipologia di intervento e le tue esigenze specifiche.' },
  { q: 'Producete voi stessi gli arredi?',
    a: 'Sì. Tutti i nostri arredi sono progettati e prodotti nei nostri stabilimenti italiani. Questo permette controllo diretto della qualità, personalizzazione e coordinamento delle tempistiche di consegna.' },
];

const FAQItem: React.FC<{ item: typeof faqs[0]; index: number }> = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease, delay: index * 0.06 }}
      className="border-b border-white/10 last:border-0"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-5 py-6 text-left group"
      >
        <span className="font-sans font-semibold text-white text-base md:text-lg leading-snug group-hover:text-acid transition-colors duration-200 flex-1">
          {item.q}
        </span>
        <span
          className={`shrink-0 w-7 h-7 border flex items-center justify-center mt-0.5 transition-all duration-300 ${
            open ? 'bg-acid border-acid rotate-45' : 'border-white/25 group-hover:border-acid'
          }`}
          aria-hidden="true"
        >
          <svg width="11" height="11" viewBox="0 0 11 11">
            <path d="M5.5 0V11M0 5.5H11" stroke={open ? '#0a0a0a' : 'white'} strokeWidth="1.5"/>
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-white/70 text-base md:text-lg font-sans font-light leading-relaxed max-w-3xl">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// titlePeriod: l'anteprima toglie il punto finale dei titoli; la landing online usa il valore predefinito (true).
export default function FAQSection({ titlePeriod = true }: { titlePeriod?: boolean } = {}) {
  return (
    <section className="bg-[#1a1a1a] border-t border-white/10 py-20 md:py-32">
      <div className="px-6 md:px-14 lg:px-24">
        {/* Layout: 1 colonna mobile → 2 colonne desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="text-acid text-sm tracking-[0.4em] uppercase font-sans font-semibold mb-5">
              Domande frequenti
            </p>
            <h2
              className="font-display text-white uppercase leading-[1.2] mb-6"
              style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5.5rem)' }}
            >
              Le risposte alle<br />
              <span className="text-acid">domande più frequenti</span>{titlePeriod ? '.' : ''}
            </h2>
            <p className="text-white/50 text-base md:text-lg font-sans font-light leading-relaxed max-w-[28ch]">
              Le domande più comuni dei farmacisti che si avvicinano a noi per la prima volta.
            </p>
          </motion.div>

          <div>
            {faqs.map((item, i) => (
              <FAQItem key={item.q} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
