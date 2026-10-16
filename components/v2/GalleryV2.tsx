import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_MS = 6000;

interface Shot {
  name: string;
  small: string;
  large: string;
}

// Scatti professionali dei progetti, a colori. Il primo è l'unico già presente nel sito (Catona).
const shots: Shot[] = [
  { name: 'Farmacia Catona', small: 'CATONA-1280.webp', large: 'CATONA-1920.webp' },
  { name: 'Farmacia Pellicano', small: 'anteprima/pellicano-1-960.webp', large: 'anteprima/pellicano-1-1920.webp' },
  { name: 'Farmacia Caputo', small: 'anteprima/caputo-1-960.webp', large: 'anteprima/caputo-1-1920.webp' },
  { name: 'Farmacia Lezzi', small: 'anteprima/lezzi-2-960.webp', large: 'anteprima/lezzi-2-1920.webp' },
  { name: 'Farmacia San Leo', small: 'anteprima/sanleo-1-960.webp', large: 'anteprima/sanleo-1-1920.webp' },
  { name: 'Antica Farmacia Berardelli', small: 'anteprima/berardelli-1-960.webp', large: 'anteprima/berardelli-1-1920.webp' },
  { name: 'Farmacia Appio Latino', small: 'anteprima/appio-1-960.webp', large: 'anteprima/appio-1-1920.webp' },
  { name: 'Farmacia Pellicano', small: 'anteprima/pellicano-2-960.webp', large: 'anteprima/pellicano-2-1920.webp' },
  { name: 'Farmacia Lezzi', small: 'anteprima/lezzi-3-960.webp', large: 'anteprima/lezzi-3-1920.webp' },
  { name: 'Farmacia Caputo', small: 'anteprima/caputo-2-960.webp', large: 'anteprima/caputo-2-1920.webp' },
  { name: 'Antica Farmacia Berardelli', small: 'anteprima/berardelli-2-960.webp', large: 'anteprima/berardelli-2-1920.webp' },
  { name: 'Farmacia San Leo', small: 'anteprima/sanleo-2-960.webp', large: 'anteprima/sanleo-2-1920.webp' },
  { name: 'Farmacia Bellini', small: 'anteprima/bellini-1-960.webp', large: 'anteprima/bellini-1-1920.webp' },
];

const pad = (n: number) => String(n).padStart(2, '0');

function Arrow({ dir, onClick, label }: { dir: 'prev' | 'next'; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center border border-white/60 bg-black/20 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white hover:text-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true" className={dir === 'prev' ? 'rotate-180' : ''}>
        <path d="M1 6h16M12 1l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </button>
  );
}

export default function GalleryV2() {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [paused, setPaused] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });
  const reduced = useReducedMotion();

  const go = useCallback((delta: number, manual = true) => {
    setIndex((i) => (i + delta + shots.length) % shots.length);
    if (manual) setInteracted(true);
  }, []);

  // Avanza da solo, ma solo se la sezione è visibile, nessuno la sta usando e il visitatore non ha chiesto meno animazioni.
  useEffect(() => {
    if (reduced || interacted || paused || lightbox || !inView) return;
    const timer = window.setTimeout(() => go(1, false), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [index, reduced, interacted, paused, lightbox, inView, go]);

  // Precarica la foto successiva.
  useEffect(() => {
    const next = new Image();
    next.src = shots[(index + 1) % shots.length].large;
  }, [index]);

  // Miniatura attiva sempre visibile nella fascia.
  useEffect(() => {
    const strip = stripRef.current;
    const active = strip?.children[index] as HTMLElement | undefined;
    if (strip && active) {
      strip.scrollTo({ left: active.offsetLeft - strip.clientWidth / 2 + active.clientWidth / 2, behavior: reduced ? 'auto' : 'smooth' });
    }
  }, [index, reduced]);

  // Schermo intero: tastiera e blocco dello scroll della pagina.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox, go]);

  const shot = shots[index];

  return (
    <section ref={sectionRef} id="realizzazioni" className="scroll-mt-[110px] bg-dark pt-16 md:scroll-mt-[80px] md:pt-28">
      <div className="mb-8 flex flex-col gap-6 px-6 md:mb-12 md:flex-row md:items-end md:justify-between md:px-14 lg:px-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
          <p className="mb-4 font-sans text-sm font-semibold uppercase tracking-[0.34em] text-white/60">Le nostre realizzazioni</p>
          <h2 className="font-display uppercase leading-[0.98] text-white" style={{ fontSize: 'clamp(2.4rem, 6vw, 6rem)' }}>
            Farmacie da <br className="hidden md:block" />ammirare da vicino.
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-[40ch] font-sans text-base font-light leading-relaxed text-white/65 md:text-lg"
        >
          Progetti reali, progettati e arredati su misura. Scorri gli scatti e guarda come può diventare la tua farmacia.
        </motion.p>
      </div>

      {/* Palcoscenico */}
      <div
        className="relative aspect-[4/5] w-full overflow-hidden bg-[#141413] sm:aspect-[4/3] md:aspect-[16/9] md:max-h-[88vh]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence initial={false}>
          <motion.img
            key={index}
            src={shot.large}
            srcSet={`${shot.small} 960w, ${shot.large} 1920w`}
            sizes="100vw"
            alt={shot.name}
            width={1920}
            height={1280}
            decoding="async"
            initial={{ opacity: 0, scale: reduced ? 1 : 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.01 : 1.1, ease }}
            className="absolute inset-0 h-full w-full cursor-zoom-in object-cover"
            onClick={() => setLightbox(true)}
            onPanEnd={(_, info) => {
              if (info.offset.x < -50) go(1);
              else if (info.offset.x > 50) go(-1);
            }}
            style={{ touchAction: 'pan-y' }}
          />
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-10">
          <div>
            <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              {pad(index + 1)} / {pad(shots.length)}
            </p>
            <p className="font-display uppercase leading-none text-white" style={{ fontSize: 'clamp(1.5rem, 3.2vw, 3rem)' }}>
              {shot.name}
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Arrow dir="prev" label="Foto precedente" onClick={() => go(-1)} />
            <Arrow dir="next" label="Foto successiva" onClick={() => go(1)} />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setLightbox(true)}
          aria-label="Apri a schermo intero"
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-white/50 bg-black/25 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white hover:text-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-8 md:top-8"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M1 6V1h5M10 1h5v5M15 10v5h-5M6 15H1v-5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>

        {/* Avanzamento dello scorrimento automatico */}
        {!reduced && !interacted && inView && !paused && !lightbox && (
          <motion.div
            key={`bar-${index}`}
            className="absolute bottom-0 left-0 h-[2px] bg-white/80"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
          />
        )}
      </div>

      {/* Miniature */}
      <div ref={stripRef} className="flex snap-x gap-2 overflow-x-auto px-6 py-4 [scrollbar-width:none] md:gap-3 md:px-14 md:py-6 lg:px-24 [&::-webkit-scrollbar]:hidden">
        {shots.map((s, i) => (
          <button
            key={s.small}
            type="button"
            onClick={() => {
              setIndex(i);
              setInteracted(true);
            }}
            aria-label={`Mostra ${s.name}, foto ${i + 1}`}
            aria-current={i === index}
            className={`relative h-16 w-24 shrink-0 snap-center overflow-hidden transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:h-20 md:w-32 ${i === index ? 'opacity-100 ring-2 ring-white' : 'opacity-50 hover:opacity-90'}`}
          >
            <img src={s.small} alt="" width={128} height={80} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <div className="flex flex-col items-start gap-4 px-6 pb-16 pt-4 md:flex-row md:items-center md:justify-between md:px-14 md:pb-24 lg:px-24">
        <p className="font-sans text-base text-white/65 md:text-lg">Vuoi vedere come diventerebbe la tua farmacia?</p>
        <a
          href="#contatti"
          className="inline-flex min-h-12 items-center justify-center bg-white px-7 py-3.5 font-sans text-sm font-bold uppercase tracking-[0.14em] text-dark transition-colors duration-200 hover:bg-[#e9e4da] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Richiedi una consulenza
        </a>
      </div>

      {/* Schermo intero */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${shot.name}, foto ${index + 1} di ${shots.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0b0b0a]/95"
            onClick={() => setLightbox(false)}
          >
            <img src={shot.large} alt={shot.name} className="max-h-[86vh] max-w-[94vw] object-contain" onClick={(e) => e.stopPropagation()} />
            <p className="absolute bottom-5 left-5 font-sans text-sm uppercase tracking-[0.22em] text-white/80 md:bottom-8 md:left-10">
              {pad(index + 1)} / {pad(shots.length)} · {shot.name}
            </p>
            <button
              type="button"
              onClick={() => setLightbox(false)}
              aria-label="Chiudi"
              className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center border border-white/50 text-white transition-colors hover:bg-white hover:text-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-8 md:top-8"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
            <div className="absolute bottom-4 right-4 flex gap-2 md:bottom-8 md:right-8" onClick={(e) => e.stopPropagation()}>
              <Arrow dir="prev" label="Foto precedente" onClick={() => go(-1)} />
              <Arrow dir="next" label="Foto successiva" onClick={() => go(1)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
