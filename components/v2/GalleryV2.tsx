import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { photoSrc, projects } from './projects';
import ProjectPageV2 from './ProjectPageV2';

// Curva "a molla": parte decisa e si posa piano.
const ease = [0.32, 0.72, 0, 1] as const;
const HASH_PREFIX = '#progetto-';
const AUTOPLAY_MS = 5200;

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
      <span className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/pill:translate-x-0.5 group-hover/pill:-translate-y-px group-hover/pill:scale-105 ${dark ? 'bg-white/15' : 'bg-dark/10'}`}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2.5 9.5l7-7M3.5 2.5h6v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </span>
  );
}

export default function GalleryV2() {
  const [openSlug, setOpenSlug] = useState<string | null>(slugFromHash);
  const [active, setActive] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.25 });
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

  // Il progetto in primo piano cambia da solo, finché il visitatore non ci interagisce.
  useEffect(() => {
    if (reduced || engaged || !inView || openSlug) return;
    const timer = window.setTimeout(() => setActive((i) => (i + 1) % projects.length), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [active, reduced, engaged, inView, openSlug]);

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
  const activeProject = projects[active];

  return (
    <section ref={sectionRef} id="realizzazioni" className="scroll-mt-[110px] bg-dark py-24 md:scroll-mt-[80px] md:py-36">
      <div className="mb-14 px-5 md:mb-20 md:px-14 lg:px-24">
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
            Progetti reali, progettati e arredati su misura. Scegli un progetto e scoprine ogni dettaglio.
          </p>
        </motion.div>
      </div>

      {/* Desktop: indice dei progetti + palcoscenico */}
      <div className="hidden px-14 lg:grid lg:grid-cols-12 lg:gap-14 lg:px-24" onMouseEnter={() => setEngaged(true)}>
        <ol className="col-span-5 self-start border-t border-white/10">
          {projects.map((project, i) => {
            const isActive = i === active;
            return (
              <li key={project.slug} className="border-b border-white/10">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => open(project.slug)}
                  aria-label={`${project.name}: apri tutte le foto`}
                  className="group grid w-full cursor-pointer grid-cols-[3.2rem_1fr_auto] items-center gap-2 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span className={`font-sans text-xs font-semibold tracking-[0.2em] transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/30'}`}>{pad(i + 1)}</span>
                  <span
                    className={`font-display uppercase leading-none transition-[color,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${isActive ? 'translate-x-2 text-white' : 'text-white/30 group-hover:text-white/60'}`}
                    style={{ fontSize: 'clamp(1.7rem, 2.7vw, 2.9rem)' }}
                  >
                    {project.name.replace('Antica ', '').replace('Farmacia ', '')}
                  </span>
                  <span className={`font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-opacity duration-500 ${isActive ? 'text-white/70 opacity-100' : 'opacity-0'}`}>
                    {project.photos.length} foto
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="col-span-7 self-start lg:sticky lg:top-28">
          {/* Doppia cornice: guscio esterno + nucleo interno con raggi concentrici */}
          <div className="rounded-[2rem] bg-white/[0.04] p-2 ring-1 ring-white/10">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[calc(2rem-0.5rem)] bg-[#161615]">
              {projects.map((project, i) => (
                <img
                  key={project.slug}
                  src={photoSrc(project.photos[0].id, 960)}
                  srcSet={`${photoSrc(project.photos[0].id, 960)} 960w, ${photoSrc(project.photos[0].id, 1920)} 1920w`}
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  alt={i === active ? project.name : ''}
                  aria-hidden={i !== active}
                  width={project.photos[0].width}
                  height={project.photos[0].height}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${i === active ? 'scale-100 opacity-100' : 'scale-[1.06] opacity-0'}`}
                />
              ))}
              <button
                type="button"
                onClick={() => open(activeProject.slug)}
                aria-label={`Espandi ${activeProject.name}`}
                className="absolute inset-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
              />
              <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 md:bottom-5 md:left-5 md:right-5">
                <div className="rounded-2xl bg-white/90 px-4 py-2.5 backdrop-blur-xl">
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-dark/55">
                    {pad(active + 1)} / {pad(projects.length)}
                  </p>
                  <p className="font-display text-xl uppercase leading-none text-dark">{activeProject.name}</p>
                </div>
                <ExpandPill label="Espandi" />
              </div>
            </div>
          </div>

          {/* Anteprima di altri scatti dello stesso progetto */}
          <div className="mt-3 grid grid-cols-4 gap-3" key={activeProject.slug}>
            {activeProject.photos.slice(1, 5).map((photo, i) => (
              <motion.button
                key={photo.id}
                type="button"
                onClick={() => open(activeProject.slug)}
                aria-label={`Apri ${activeProject.name}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.1 + i * 0.07 }}
                className="relative aspect-[3/2] overflow-hidden rounded-xl bg-[#161615] ring-1 ring-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <img src={photoSrc(photo.id, 960)} alt="" width={photo.width} height={photo.height} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.05]" />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile e tablet: carosello di schede */}
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:gap-4 md:px-14 lg:hidden [&::-webkit-scrollbar]:hidden">
        {projects.map((project, i) => (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease, delay: Math.min(i, 3) * 0.06 }}
            className="w-[82vw] max-w-[440px] shrink-0 snap-center rounded-[1.75rem] bg-white/[0.04] p-1.5 ring-1 ring-white/10"
          >
            <button type="button" onClick={() => open(project.slug)} aria-label={`Espandi ${project.name}`} className="block w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-[#161615]">
                <img
                  src={photoSrc(project.photos[0].id, 960)}
                  alt={project.name}
                  width={project.photos[0].width}
                  height={project.photos[0].height}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-dark">
                  {pad(i + 1)} / {pad(projects.length)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 px-3 pb-2 pt-4">
                <p className="font-display text-2xl uppercase leading-none text-white">{project.name}</p>
                <ExpandPill label="Espandi" />
              </div>
            </button>
          </motion.article>
        ))}
      </div>

      <div className="mt-16 flex flex-col items-start gap-5 px-5 md:mt-24 md:flex-row md:items-center md:justify-between md:px-14 lg:px-24">
        <p className="font-sans text-base text-white/60 md:text-lg">Vuoi vedere come diventerebbe la tua farmacia?</p>
        <a href="#contatti" className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black">
          <ExpandPill label="Richiedi una consulenza" />
        </a>
      </div>

      {current && <ProjectPageV2 key={current.slug} project={current} index={currentIndex} next={projects[(currentIndex + 1) % projects.length]} onClose={close} onSwitch={switchTo} />}
    </section>
  );
}
