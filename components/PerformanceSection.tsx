import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const panels = [
  {
    label: '01 — PHARMACY',
    heading: 'ESPERIENZA',
    body: 'Dal 1965 abbiamo progettato oltre 3.000 farmacie in 48 Paesi. Ogni nuovo progetto eredita ciò che queste realizzazioni ci hanno insegnato: le soluzioni che funzionano, gli errori da non ripetere e le ragioni dell’una e dell’altra cosa.',
    link: 'Scopri la nostra storia',
    overlayColor: 'rgba(204,255,0,0.50)',
    img: 'https://storage.googleapis.com/lp-assets-prod/yHL3HA6j9ARWnPLvbF8fdD/ec5y4oSZuvQ5uF56eyWyGh',
  },
  {
    label: '02 — BUSINESS',
    heading: 'STRATEGIA',
    body: 'In farmacia il layout è una scelta strategica. L’altezza di uno scaffale, la posizione del banco, la luce su una categoria orientano i percorsi, rendono visibili i servizi e trasformano la visita in un’esperienza di cura.',
    link: 'Scopri il metodo',
    overlayColor: 'rgba(0,181,181,0.38)',
    img: 'https://storage.googleapis.com/lp-assets-prod/yHL3HA6j9ARWnPLvbF8fdD/mpFUHVbKW3PQXRUAg9RxuY',
  },
  {
    label: '03 — ARCHITECTS',
    heading: 'ARCHITETTURA',
    body: 'Bellezza e funzionalità procedono insieme. Ogni spazio traduce l’identità della farmacia in un’immagine riconoscibile, che il cliente-paziente ricorda fin dal primo ingresso.',
    link: 'Vedi i progetti',
    overlayColor: 'rgba(180,0,230,0.45)',
    img: 'https://storage.googleapis.com/lp-assets-prod/yHL3HA6j9ARWnPLvbF8fdD/cjipopvikKzfsH9rGTYjcW',
  },
];

// titlePeriod: l'anteprima toglie il punto finale dei titoli; la landing online usa il valore predefinito (true).
// alignTitles: l'anteprima ancora i tre titoli alla stessa altezza dall'alto (con il testo ancorato in basso, il pannello col testo più corto abbassava il titolo); la landing online usa il valore predefinito (false).
export default function PerformanceSection({ titlePeriod = true, alignTitles = false }: { titlePeriod?: boolean; alignTitles?: boolean } = {}) {
  return (
    <section className="w-full bg-[#0a0a0a]">
      {/* Section header */}
      <div className="px-6 md:px-14 lg:px-24 pt-16 md:pt-20 pb-10 md:pb-14">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-acid text-sm tracking-[0.4em] uppercase font-sans font-semibold mb-4"
        >
          La nostra filosofia
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="font-display text-white uppercase leading-none"
          style={{ fontSize: 'clamp(2.4rem, 7vw, 7.5rem)' }}
        >
          Arredi che nascono{' '}
          <span className="text-acid">da un progetto{titlePeriod ? '.' : ''}</span>
        </motion.h2>
      </div>

      {/* Tre pannelli — 1 colonna mobile, 3 colonne desktop */}
      <div className="flex flex-col md:flex-row w-full">
        {panels.map((panel, i) => (
          <motion.div
            key={panel.heading}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: i * 0.12 }}
            className="relative flex-1 overflow-hidden min-h-[400px] md:min-h-[470px]"
          >
            <img
              src={panel.img}
              alt={panel.heading}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to top, rgba(0,0,0,0.95) 0%, ${panel.overlayColor} 100%)` }}
            />

            {/* Top label */}
            <div className="absolute top-5 left-6 z-10">
              <span className="font-sans text-white/40 text-xs tracking-[0.32em] uppercase font-semibold">
                {panel.label}
              </span>
            </div>

            {/* Arrow */}
            <div className="absolute top-5 right-6 text-white/35 z-10">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 17L17 3M17 3H5M17 3V15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"/>
              </svg>
            </div>

            {/* Contenuto: in basso (landing online) oppure con il titolo alla stessa altezza in tutti i pannelli (anteprima) */}
            <div className={`absolute left-0 right-0 p-6 md:p-8 z-10 ${alignTitles ? 'top-14' : 'bottom-0'}`}>
              <h3
                className="font-display text-white uppercase leading-none mb-4"
                style={{ fontSize: 'clamp(2rem, 4vw, 4.5rem)' }}
              >
                {panel.heading}
              </h3>
              <p className="text-white/80 text-base md:text-lg font-sans font-light leading-relaxed max-w-[32ch]">
                {panel.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
