import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ease = [0.32, 0.72, 0, 1] as const;

// Video della sezione "Visita lo showroom" del sito aziendale (sartorettoverna.it).
// Pesa circa 107 MB (145 s, Full HD) ed è su un archivio di prova (svtest1): parte solo al clic, così non appesantisce la pagina.
// Quando c'è una versione leggera (720p, pochi MB) o definitiva, basta cambiare VIDEO_URL.
const VIDEO_URL = 'https://svtest1.b-cdn.net/Un%20giorno%20da%20cliente%20in%20Sartoretto%20Verna.mp4';
const POSTER_SMALL = 'anteprima/showroom-poster-960.webp';
const POSTER_LARGE = 'anteprima/showroom-poster-1920.webp';

// Testi dalla pagina "Visita lo showroom" del sito aziendale, accorciati.
const steps = [
  { title: 'L’inizio dell’esperienza', text: 'Un autista ti accompagna in sede e il nostro team ti ascolta: prima degli arredi, partiamo da te.' },
  { title: 'Visione strategica', text: 'Analizziamo territorio, clienti, flussi, servizi e aree a maggiore potenziale.' },
  { title: 'La Sala Cinema', text: 'Il concept della tua farmacia prende forma prima della realizzazione.' },
  { title: 'Touch & Feel', text: 'Materiali, finiture, sistemi espositivi e automazione: li vedi, li tocchi, li confronti.' },
  { title: 'Realtà immersiva', text: 'Entri nel progetto prima che venga realizzato, per decidere meglio.' },
  { title: 'Il primo passo', text: 'Esci con idee più chiare, priorità definite e prime scelte concrete.' },
];

const facts = [
  { value: '850 mq', label: 'di showroom a Roma' },
  { value: '1965', label: 'anno di fondazione' },
  { value: '48', label: 'nazioni raggiunte' },
  { value: '4', label: 'continenti' },
];

const reveal = {
  initial: { opacity: 0, y: 40, filter: 'blur(8px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.2 },
};

function PlayIcon() {
  return (
    <svg width="20" height="22" viewBox="0 0 18 20" fill="none" aria-hidden="true" className="ml-1">
      <path d="M1 1L17 10L1 19V1Z" fill="currentColor" />
    </svg>
  );
}

function ShowroomVideo() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function start() {
    setPlaying(true);
    // Il clic è un gesto dell'utente: il video parte subito, con audio e comandi.
    window.setTimeout(() => videoRef.current?.play().catch(() => undefined), 0);
  }

  return (
    <div className="h-full rounded-[2rem] bg-white/[0.04] p-2 ring-1 ring-white/10">
      <div className="relative aspect-video h-full w-full overflow-hidden rounded-[calc(2rem-0.5rem)] bg-[#161615] lg:aspect-auto lg:min-h-[420px]">
        {playing ? (
          <video
            ref={videoRef}
            src={VIDEO_URL}
            poster={POSTER_LARGE}
            controls
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full bg-black object-cover"
            aria-label="Un giorno da cliente in Sartoretto Verna"
          />
        ) : (
          <>
            <img
              src={POSTER_SMALL}
              srcSet={`${POSTER_SMALL} 960w, ${POSTER_LARGE} 1920w`}
              sizes="(min-width: 1024px) 58vw, 100vw"
              alt="Una cliente arriva nello showroom Sartoretto Verna"
              width={1920}
              height={1080}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={start}
              aria-label="Guarda il video: Un giorno da cliente in Sartoretto Verna"
              className="group absolute inset-0 flex cursor-pointer items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-dark shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105 group-active:scale-95 md:h-24 md:w-24">
                <PlayIcon />
              </span>
            </button>
            <div className="pointer-events-none absolute bottom-3 left-3 right-3 max-w-[26rem] rounded-2xl bg-white/95 px-5 py-4 text-dark md:bottom-4 md:left-4 md:right-auto">
              <p className="mb-1 font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-[#137A6B]">Il video · 2 min 25</p>
              <p className="font-sans text-base font-semibold leading-snug md:text-lg">Un giorno da cliente in Sartoretto Verna</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

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

        {/* Video + percorso della visita: le due colonne hanno la stessa altezza, decide la griglia */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-stretch lg:gap-5">
          <motion.div {...reveal} transition={{ duration: 1, ease }} className="lg:col-span-7">
            <ShowroomVideo />
          </motion.div>

          <motion.div {...reveal} transition={{ duration: 1, ease, delay: 0.1 }} className="rounded-[2rem] bg-white/[0.04] p-2 ring-1 ring-white/10 lg:col-span-5">
            <div className="flex h-full flex-col rounded-[calc(2rem-0.5rem)] bg-[#F6F4EF] p-6 text-dark md:p-8">
              <p className="mb-1 font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-[#137A6B]">La visita in showroom</p>
              <h3 className="mb-6 font-display text-3xl uppercase leading-none md:text-4xl">Prima degli arredi, partiamo da te.</h3>
              <ol className="flex flex-1 flex-col justify-between gap-4">
                {steps.map((step, i) => (
                  <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-3 border-t border-dark/10 pt-4">
                    <span className="font-sans text-xs font-semibold tracking-[0.2em] text-[#137A6B]">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <p className="font-sans text-base font-bold leading-tight">{step.title}</p>
                      <p className="mt-1 font-sans text-sm font-light leading-relaxed text-dark/70">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </div>

        {/* Numeri dello showroom */}
        <motion.dl {...reveal} transition={{ duration: 1, ease, delay: 0.1 }} className="mt-4 grid grid-cols-2 gap-4 lg:mt-5 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="rounded-[1.5rem] bg-white/[0.04] px-6 py-7 ring-1 ring-white/10">
              <dt className="font-display text-4xl uppercase leading-none text-white md:text-5xl">{fact.value}</dt>
              <dd className="mt-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white/55">{fact.label}</dd>
            </div>
          ))}
        </motion.dl>

        <motion.div {...reveal} transition={{ duration: 0.9, ease, delay: 0.2 }} className="mt-10 flex flex-col items-start gap-5 md:mt-14 md:flex-row md:items-center md:justify-between">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-white/60 md:text-sm">Via Trionfale 13592, Roma · su appuntamento</p>
          <a
            href="#contatti"
            className="group/pill inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-6 pr-1.5 font-sans text-xs font-bold uppercase tracking-[0.18em] text-dark transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Prenota la visita allo showroom
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
