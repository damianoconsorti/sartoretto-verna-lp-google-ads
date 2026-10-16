import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { photoSrc, projects } from './projects';
import type { ProjectEntry } from './projects';
import ProjectPageV2 from './ProjectPageV2';

// Curva "a molla": parte decisa e si posa piano.
const ease = [0.32, 0.72, 0, 1] as const;
const HASH_PREFIX = '#progetto-';
const pad = (n: number) => String(n).padStart(2, '0');

function slugFromHash(): string | null {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash;
  return hash.startsWith(HASH_PREFIX) ? hash.slice(HASH_PREFIX.length) : null;
}

// Pulsante a pillola con freccia in un cerchio proprio: la freccia scivola in diagonale all'hover.
function ExpandPill({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <span
      className={`group/pill inline-flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 font-sans text-xs font-bold uppercase tracking-[0.18em] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] ${dark ? 'bg-dark text-white' : 'bg-white text-dark'}`}
    >
      {label}
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/pill:translate-x-0.5 group-hover/pill:-translate-y-px group-hover/pill:scale-105 ${dark ? 'bg-white/15' : 'bg-dark/10'}`}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2.5 9.5l7-7M3.5 2.5h6v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </span>
  );
}

const kindsOf = (project: ProjectEntry) => (project.photos.some((p) => p.kind === 'servizi') ? 'arredi e sale servizi' : 'arredi');

// Pannello grande della galleria fissa (desktop): foto a colori, numero gigante in contorno, parallasse leggera.
function Panel({ project, index, progress, onOpen }: { project: ProjectEntry; index: number; progress: MotionValue<number>; onOpen: () => void; key?: React.Key }) {
  const center = (index + 0.5) / projects.length;
  const shift = useTransform(progress, [center - 0.35, center + 0.35], [70, -70]);
  const tall = index % 2 === 1;

  return (
    <article className={`relative shrink-0 ${tall ? 'w-[min(34vw,520px)] translate-y-[5vh]' : 'w-[min(58vw,900px)] -translate-y-[3vh]'}`}>
      <button type="button" onClick={onOpen} aria-label={`Espandi ${project.name}: apri tutte le foto`} className="group block w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
        <div className={`relative overflow-hidden rounded-[1.75rem] bg-[#161615] ${tall ? 'aspect-[4/5]' : 'aspect-[3/2]'}`}>
          <motion.img
            src={photoSrc(project.photos[0].id, 1920)}
            srcSet={`${photoSrc(project.photos[0].id, 960)} 960w, ${photoSrc(project.photos[0].id, 1920)} 1920w`}
            sizes={tall ? '34vw' : '58vw'}
            alt={project.name}
            width={project.photos[0].width}
            height={project.photos[0].height}
            loading={index < 2 ? 'eager' : 'lazy'}
            decoding="async"
            style={{ x: shift }}
            className="absolute -inset-x-[12%] inset-y-0 h-full w-[124%] max-w-none object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
          />
        </div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-[0.62em] left-5 select-none font-display leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.55)]"
          style={{ fontSize: 'clamp(5rem, 9vw, 9.5rem)' }}
        >
          {pad(index + 1)}
        </span>
        <div className="mt-6 flex items-end justify-between gap-6">
          <div>
            <p className="font-display uppercase leading-none text-white" style={{ fontSize: 'clamp(1.7rem, 2.8vw, 3rem)' }}>
              {project.name}
            </p>
            <p className="mt-3 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
              {project.photos.length} scatti · {kindsOf(project)}
            </p>
          </div>
          <ExpandPill label="Espandi" />
        </div>
      </button>
    </article>
  );
}

// Desktop: la sezione resta ferma e i progetti scorrono di lato mentre si scorre la pagina.
function PinnedGallery({ onOpen }: { onOpen: (slug: string) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const [current, setCurrent] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (track) setTravel(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (v) => setCurrent(Math.min(projects.length - 1, Math.max(0, Math.round(v * (projects.length - 1))))));

  // Altezza = distanza orizzontale da percorrere + una schermata: lo scorrimento resta 1 a 1 con la pagina.
  return (
    <div ref={sectionRef} className="relative hidden lg:block" style={{ height: `calc(${travel}px + 100vh)` }}>
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden pb-16 pt-24">
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-center gap-[7vw] px-[8vw] will-change-transform">
          {projects.map((project, i) => (
            <Panel key={project.slug} project={project} index={i} progress={scrollYProgress} onOpen={() => onOpen(project.slug)} />
          ))}
          <div className="flex w-[22vw] shrink-0 flex-col items-start gap-6 pr-[6vw]">
            <p className="font-display text-4xl uppercase leading-[1.02] text-white">Vuoi una farmacia così?</p>
            <a href="#contatti" className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <ExpandPill label="Parliamone" />
            </a>
          </div>
        </motion.div>

        <div className="pointer-events-none absolute inset-x-[8vw] bottom-10 flex items-center gap-6">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
            {pad(current + 1)} / {pad(projects.length)}
          </span>
          <div className="relative h-px flex-1 bg-white/15">
            <motion.div style={{ scaleX: bar }} className="absolute inset-0 origin-left bg-white" />
          </div>
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">Scorri</span>
        </div>
      </div>
    </div>
  );
}

// Telefono, tablet e "riduci animazioni": carosello da sfiorare, senza scorrimento agganciato.
function SwipeGallery({ onOpen }: { onOpen: (slug: string) => void }) {
  return (
    <div>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 pt-8 [scrollbar-width:none] md:px-14 [&::-webkit-scrollbar]:hidden">
        {projects.map((project, i) => (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease, delay: Math.min(i, 3) * 0.06 }}
            className="relative w-[82vw] max-w-[460px] shrink-0 snap-center"
          >
            <button type="button" onClick={() => onOpen(project.slug)} aria-label={`Espandi ${project.name}`} className="block w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#161615]">
                <img
                  src={photoSrc(project.photos[0].id, 960)}
                  alt={project.name}
                  width={project.photos[0].width}
                  height={project.photos[0].height}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-4 top-3 select-none font-display leading-none text-white" style={{ fontSize: '3.6rem', textShadow: '0 1px 18px rgba(0,0,0,0.4)' }}>
                  {pad(i + 1)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 pt-4">
                <div>
                  <p className="font-display text-2xl uppercase leading-none text-white">{project.name}</p>
                  <p className="mt-2 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">{project.photos.length} scatti</p>
                </div>
                <ExpandPill label="Espandi" />
              </div>
            </button>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

export default function GalleryV2() {
  const [openSlug, setOpenSlug] = useState<string | null>(slugFromHash);
  const reduced = useReducedMotion();

  // La pagina del progetto vive nell'indirizzo (#progetto-nome): il tasto "indietro" del browser la chiude.
  useEffect(() => {
    const onChange = () => setOpenSlug(slugFromHash());
    window.addEventListener('hashchange', onChange);
    window.addEventListener('popstate', onChange);
    return () => {
      window.removeEventListener('hashchange', onChange);
      window.removeEventListener('popstate', onChange);
    };
  }, []);

  const open = useCallback((slug: string) => {
    // Con <base href="/"> un indirizzo relativo perderebbe /anteprima/: si ricostruisce con il percorso attuale.
    window.history.pushState(null, '', `${window.location.pathname}${window.location.search}${HASH_PREFIX}${slug}`);
    setOpenSlug(slug);
  }, []);

  const switchTo = useCallback((slug: string) => {
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${HASH_PREFIX}${slug}`);
    setOpenSlug(slug);
  }, []);

  const close = useCallback(() => {
    if (slugFromHash()) window.history.back();
    else setOpenSlug(null);
  }, []);

  const current = projects.find((p) => p.slug === openSlug) ?? null;
  const currentIndex = current ? projects.indexOf(current) : -1;

  return (
    <section id="realizzazioni" className="scroll-mt-[110px] bg-dark pt-24 md:scroll-mt-[80px] md:pt-36">
      <div className="px-5 md:px-14 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease }}
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="mb-6 inline-block rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70">
              Le nostre realizzazioni
            </span>
            <h2 className="font-display uppercase leading-[0.96] text-white" style={{ fontSize: 'clamp(2.6rem, 6.4vw, 6.4rem)' }}>
              Farmacie da <br className="hidden md:block" />ammirare da vicino.
            </h2>
          </div>
          <p className="max-w-[38ch] font-sans text-base font-light leading-relaxed text-white/60 md:text-lg">
            Progetti reali, progettati e arredati su misura. Scorri e scegli un progetto per scoprirne ogni dettaglio.
          </p>
        </motion.div>
      </div>

      {reduced ? null : <PinnedGallery onOpen={open} />}
      <div className={reduced ? '' : 'lg:hidden'}>
        <SwipeGallery onOpen={open} />
      </div>

      <div className={`flex flex-col items-start gap-5 px-5 pb-24 pt-14 md:px-14 md:pb-36 lg:px-24 ${reduced ? '' : 'lg:hidden'}`}>
        <p className="font-sans text-base text-white/60 md:text-lg">Vuoi vedere come diventerebbe la tua farmacia?</p>
        <a href="#contatti" className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black">
          <ExpandPill label="Richiedi una consulenza" />
        </a>
      </div>
      
      {current && <ProjectPageV2 key={current.slug} project={current} index={currentIndex} next={projects[(currentIndex + 1) % projects.length]} onClose={close} onSwitch={switchTo} />}
    </section>
  );
}
