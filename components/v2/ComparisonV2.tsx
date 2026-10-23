import React from 'react';
import { motion } from 'framer-motion';
import { photoSrc } from './projects';

const ease = [0.32, 0.72, 0, 1] as const;

// Le tre promesse della tabella attuale (colonna Sartoretto Verna), ora sulle foto. Nessuna nuova affermazione.
const tiles = [
  {
    dimension: 'Focus',
    text: 'Progetto su misura per la tua farmacia',
    photo: 'lezzi-01',
    alt: 'Farmacia Lezzi: scaffalature curve su misura',
    span: 'lg:col-span-7 lg:row-span-2',
    sizes: '(min-width: 1024px) 58vw, 100vw',
  },
  {
    dimension: 'Metodo',
    text: 'Progetto personalizzato su analisi dei flussi',
    photo: 'appio-01',
    alt: 'Farmacia Appio Latino: percorsi e scaffali progettati sui flussi',
    span: 'lg:col-span-5',
    sizes: '(min-width: 1024px) 42vw, 100vw',
  },
  {
    dimension: 'Risultato',
    text: 'Spazi pensati per il lavoro quotidiano di clienti e team',
    photo: 'caputo-01',
    alt: 'Farmacia Caputo: bancone e colonna in legno',
    span: 'lg:col-span-5',
    sizes: '(min-width: 1024px) 42vw, 100vw',
  },
];

const reveal = {
  initial: { opacity: 0, y: 40, filter: 'blur(8px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.2 },
};

export default function ComparisonV2() {
  return (
    <section className="bg-[#0B0B0A] py-24 md:py-36">
      <div className="px-5 md:px-14 lg:px-24">
        <motion.div {...reveal} transition={{ duration: 1, ease }} className="mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-6 inline-block rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70">
              Perché scegliere noi
            </span>
            <h2 className="font-display uppercase leading-[0.96] text-white" style={{ fontSize: 'clamp(2.6rem, 6vw, 6rem)' }}>
              Non tutti i fornitori<br />sono uguali.
            </h2>
          </div>
          <p className="max-w-[42ch] font-sans text-base font-light leading-relaxed text-white/65 md:text-lg">
            La differenza non è nel prodotto. È nell&apos;approccio. Mentre un fornitore tradizionale ti vende arredi, noi ti consegniamo un
            progetto di spazio costruito sulle esigenze della tua farmacia.
          </p>
        </motion.div>

        {/* Griglia fotografica: colonne e righe sono della griglia, non dipendono dal testo */}
        <div className="grid grid-cols-1 gap-3 lg:auto-rows-[clamp(230px,19vw,340px)] lg:grid-cols-12 lg:gap-4">
          {tiles.map((tile, i) => (
            <motion.article
              key={tile.dimension}
              {...reveal}
              transition={{ duration: 1, ease, delay: i * 0.1 }}
              className={`group rounded-[1.75rem] bg-white/[0.04] p-1.5 ring-1 ring-white/10 ${tile.span}`}
            >
              <div className="relative aspect-[4/3] h-full w-full overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-[#161615] lg:aspect-auto">
                <img
                  src={photoSrc(tile.photo, 960)}
                  srcSet={`${photoSrc(tile.photo, 960)} 960w, ${photoSrc(tile.photo, 1920)} 1920w`}
                  sizes={tile.sizes}
                  alt={tile.alt}
                  width={1920}
                  height={1280}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
                />
                <div className="absolute bottom-3 left-3 right-3 max-w-[26rem] rounded-2xl bg-white/95 px-5 py-4 text-dark md:bottom-4 md:left-4 md:right-auto">
                  <p className="mb-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-[#137A6B]">
                    {String(i + 1).padStart(2, '0')} · {tile.dimension}
                  </p>
                  <p className="font-sans text-base font-semibold leading-snug md:text-lg">{tile.text}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div {...reveal} transition={{ duration: 0.9, ease, delay: 0.3 }} className="mt-10 flex flex-col items-start gap-5 md:mt-14 md:flex-row md:items-center md:justify-between">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-white/60 md:text-sm">Specialisti di settore dal 1965</p>
          <a
            href="#contatti"
            className="group/pill inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-6 pr-1.5 font-sans text-xs font-bold uppercase tracking-[0.18em] text-dark transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Parla con uno specialista
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-dark/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/pill:translate-x-0.5 group-hover/pill:-translate-y-px">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2.5 9.5l7-7M3.5 2.5h6v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
