import React from 'react';
import { motion } from 'framer-motion';
import { photoSrc } from './projects';

const ease = [0.32, 0.72, 0, 1] as const;

// Stessi contenuti della tabella attuale: cambia solo la presentazione.
const rows = [
  { dimension: 'Focus', traditional: 'Arredo e fornitura generica', sv: 'Progetto su misura per la tua farmacia' },
  { dimension: 'Metodo', traditional: 'Catalogo standard e soluzioni predefinite', sv: 'Progetto personalizzato su analisi dei flussi' },
  { dimension: 'Risultato', traditional: 'Farmacia esteticamente rinnovata', sv: 'Spazi pensati per il lavoro quotidiano di clienti e team' },
];

const reveal = {
  initial: { opacity: 0, y: 36, filter: 'blur(8px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.25 },
};

function Cross() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2.5 2.5l9 9M11.5 2.5l-9 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8.5l3.2 3.2L13 4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ComparisonV2() {
  return (
    <section className="relative overflow-hidden bg-[#0B0B0A] py-24 md:py-36">
      {/* Bagliore tenue dietro la colonna dei vantaggi: dà profondità senza colori fluo */}
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[34rem] w-[34rem] rounded-full bg-[#137A6B]/20 blur-[120px]" aria-hidden="true" />

      <div className="relative px-5 md:px-14 lg:px-24">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Sinistra: titolo, testo e foto */}
          <div className="lg:col-span-5">
            <motion.div {...reveal} transition={{ duration: 1, ease }}>
              <span className="mb-6 inline-block rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70">
                Perché scegliere noi
              </span>
              <h2 className="font-display uppercase leading-[0.96] text-white" style={{ fontSize: 'clamp(2.6rem, 6vw, 6rem)' }}>
                Non tutti<br />i fornitori<br />sono uguali.
              </h2>
              <p className="mt-7 max-w-[40ch] font-sans text-base font-light leading-relaxed text-white/65 md:text-lg">
                La differenza non è nel prodotto. È nell&apos;approccio. Mentre un fornitore tradizionale ti vende arredi, noi ti
                consegniamo un progetto di spazio costruito sulle esigenze della tua farmacia.
              </p>
            </motion.div>

            <motion.div {...reveal} transition={{ duration: 1, ease, delay: 0.15 }} className="mt-10 rounded-[2rem] bg-white/[0.04] p-2 ring-1 ring-white/10">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[calc(2rem-0.5rem)] bg-[#161615]">
                <img
                  src={photoSrc('caputo-01', 960)}
                  srcSet={`${photoSrc('caputo-01', 960)} 960w, ${photoSrc('caputo-01', 1920)} 1920w`}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  alt="Farmacia Caputo: progetto su misura con colonna in legno"
                  width={1920}
                  height={1280}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3.5 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-dark">
                  Specialisti di settore dal 1965
                </span>
              </div>
            </motion.div>
          </div>

          {/* Destra: confronto riga per riga */}
          <div className="lg:col-span-7 lg:pt-10">
            <motion.div {...reveal} transition={{ duration: 0.9, ease, delay: 0.1 }} className="mb-5 hidden grid-cols-2 gap-4 px-2 sm:grid">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-white/35">Fornitore tradizionale</span>
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-white">Sartoretto Verna</span>
            </motion.div>

            <div className="flex flex-col gap-4">
              {rows.map((row, i) => (
                <motion.article
                  key={row.dimension}
                  {...reveal}
                  transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.12 }}
                  className="group rounded-[1.75rem] bg-white/[0.04] p-1.5 ring-1 ring-white/10 transition-[transform,background-color] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:bg-white/[0.07]"
                >
                  <div className="relative grid grid-cols-1 overflow-hidden rounded-[calc(1.75rem-0.375rem)] sm:grid-cols-2">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-3 right-5 select-none font-display leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.14)]"
                      style={{ fontSize: '5.5rem' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Fornitore tradizionale: spento */}
                    <div className="p-6 md:p-8">
                      <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-white/35">{row.dimension}</p>
                      <p className="mb-2 flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-white/30 sm:hidden">
                        <Cross /> Fornitore tradizionale
                      </p>
                      <p className="flex items-start gap-3 font-sans text-base font-light leading-relaxed text-white/35 md:text-lg">
                        <span className="mt-1 hidden shrink-0 text-white/30 sm:block"><Cross /></span>
                        <span className="line-through decoration-white/20">{row.traditional}</span>
                      </p>
                    </div>

                    {/* Sartoretto Verna: in evidenza */}
                    <div className="m-1.5 rounded-[calc(1.75rem-0.75rem)] bg-[#F6F4EF] p-6 text-dark shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] md:p-8">
                      <p className="mb-4 flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-[#137A6B] sm:hidden">
                        <Check /> Sartoretto Verna
                      </p>
                      <p className="flex items-start gap-3 font-sans text-lg font-semibold leading-snug md:text-xl">
                        <span className="mt-1 hidden h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#137A6B] text-white sm:flex">
                          <Check />
                        </span>
                        <span>{row.sv}</span>
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.a
              {...reveal}
              transition={{ duration: 0.9, ease, delay: 0.6 }}
              href="#contatti"
              className="group/pill mt-8 inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-6 pr-1.5 font-sans text-xs font-bold uppercase tracking-[0.18em] text-dark transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Parla con uno specialista
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-dark/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/pill:translate-x-0.5 group-hover/pill:-translate-y-px">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2.5 9.5l7-7M3.5 2.5h6v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
