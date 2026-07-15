import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const panels = [
  {
    label: '01 — PHARMACY',
    heading: 'ESPERIENZA',
    body: 'Oltre 60 anni di cantieri nel mondo. Sappiamo cosa funziona, cosa fallisce e perché. Ogni progetto porta dentro di sé decenni di apprendimento sul campo.',
    link: 'Scopri la nostra storia',
    overlayColor: 'rgba(204,255,0,0.50)',
    img: 'https://storage.googleapis.com/lp-assets-prod/yHL3HA6j9ARWnPLvbF8fdD/ec5y4oSZuvQ5uF56eyWyGh',
  },
  {
    label: '02 — BUSINESS',
    heading: 'STRATEGIA',
    body: 'Il layout non è estetica: è strategia. Ogni scelta — dall\'altezza dello scaffale all\'illuminazione — è calibrata per aumentare il ticket medio e la fedeltà del paziente.',
    link: 'Scopri il metodo',
    overlayColor: 'rgba(0,181,181,0.38)',
    img: 'https://storage.googleapis.com/lp-assets-prod/yHL3HA6j9ARWnPLvbF8fdD/mpFUHVbKW3PQXRUAg9RxuY',
  },
  {
    label: '03 — ARCHITECTS',
    heading: 'ARCHITETTURA',
    body: 'Nessun compromesso tra bellezza e funzionalità. I nostri progetti firmano la tua identità nella mente del paziente fin dal primo sguardo.',
    link: 'Vedi i progetti',
    overlayColor: 'rgba(180,0,230,0.45)',
    img: 'https://storage.googleapis.com/lp-assets-prod/yHL3HA6j9ARWnPLvbF8fdD/cjipopvikKzfsH9rGTYjcW',
  },
];

export default function PerformanceSection() {
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
          Non arredi.{' '}
          <span className="text-acid">Performance.</span>
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
            className="relative flex-1 overflow-hidden"
            style={{ minHeight: '380px' }}
          >
            <img
              src={panel.img}
              alt={panel.heading}
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

            {/* Content bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
              <h3
                className="font-display text-white uppercase leading-none mb-4"
                style={{ fontSize: 'clamp(2rem, 4vw, 4.5rem)' }}
              >
                {panel.heading}
              </h3>
              <p className="text-white/80 text-base md:text-lg font-sans font-light leading-relaxed max-w-[28ch]">
                {panel.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
