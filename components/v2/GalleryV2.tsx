import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { photoSrc, projects } from './projects';
import type { ProjectEntry } from './projects';
import ProjectPageV2 from './ProjectPageV2';

const ease = [0.22, 1, 0.36, 1] as const;
const HASH_PREFIX = '#progetto-';

// Colonne della griglia a 12 per ogni progetto (a coppie: 7+5, 5+7, 6+6, 6+6).
const SPANS = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7', 'lg:col-span-6', 'lg:col-span-6', 'lg:col-span-6', 'lg:col-span-6'];
const SIZES = ['(min-width: 1024px) 58vw, 100vw', '(min-width: 1024px) 42vw, 100vw', '(min-width: 1024px) 42vw, 100vw', '(min-width: 1024px) 58vw, 100vw', '(min-width: 1024px) 50vw, 100vw', '(min-width: 1024px) 50vw, 100vw', '(min-width: 1024px) 50vw, 100vw', '(min-width: 1024px) 50vw, 100vw'];

function slugFromHash(): string | null {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash;
  return hash.startsWith(HASH_PREFIX) ? hash.slice(HASH_PREFIX.length) : null;
}

export default function GalleryV2() {
  const [openSlug, setOpenSlug] = useState<string | null>(slugFromHash);

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

  const open = useCallback((project: ProjectEntry) => {
    // Con <base href="/"> un indirizzo relativo perderebbe /anteprima/: si ricostruisce con il percorso attuale.
    window.history.pushState(null, '', `${window.location.pathname}${window.location.search}${HASH_PREFIX}${project.slug}`);
    setOpenSlug(project.slug);
  }, []);

  const close = useCallback(() => {
    if (slugFromHash()) window.history.back();
    else setOpenSlug(null);
  }, []);

  const current = projects.find((p) => p.slug === openSlug) ?? null;

  return (
    <section id="realizzazioni" className="scroll-mt-[110px] bg-dark pb-16 pt-16 md:scroll-mt-[80px] md:pb-28 md:pt-28">
      <div className="mb-10 flex flex-col gap-6 px-6 md:mb-14 md:flex-row md:items-end md:justify-between md:px-14 lg:px-24">
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
          Progetti reali, progettati e arredati su misura. Apri un progetto per vedere tutti gli scatti.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 gap-3 px-3 md:px-6 lg:auto-rows-[clamp(300px,33vw,540px)] lg:grid-cols-12 lg:gap-4 lg:px-10">
        {projects.map((project, i) => (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease, delay: (i % 2) * 0.08 }}
            className={`group relative aspect-[4/3] overflow-hidden bg-[#1a1a19] lg:aspect-auto ${SPANS[i] ?? 'lg:col-span-6'}`}
          >
            <button
              type="button"
              onClick={() => open(project)}
              aria-label={`Espandi ${project.name}: apri tutte le foto`}
              className="absolute inset-0 block h-full w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
            >
              <img
                src={photoSrc(project.photos[0].id, 960)}
                srcSet={`${photoSrc(project.photos[0].id, 960)} 960w, ${photoSrc(project.photos[0].id, 1920)} 1920w`}
                sizes={SIZES[i] ?? '(min-width: 1024px) 50vw, 100vw'}
                alt={project.name}
                width={project.photos[0].width}
                height={project.photos[0].height}
                loading={i < 2 ? 'eager' : 'lazy'}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
              />
              <span className="absolute bottom-0 left-0 flex items-center gap-3 bg-white px-4 py-3 font-display text-base uppercase leading-none text-dark md:px-5 md:py-4 md:text-xl">
                {project.name}
              </span>
              <span className="absolute bottom-0 right-0 flex items-center gap-2 bg-dark/90 px-4 py-3 font-sans text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-200 group-hover:bg-white group-hover:text-dark md:px-5 md:py-4 md:text-sm">
                Espandi <span aria-hidden="true">+</span>
              </span>
              <span className="absolute right-3 top-3 bg-white/90 px-2.5 py-1 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-dark md:right-4 md:top-4">
                {project.photos.length} foto
              </span>
            </button>
          </motion.article>
        ))}
      </div>

      <div className="flex flex-col items-start gap-4 px-6 pt-10 md:flex-row md:items-center md:justify-between md:px-14 md:pt-14 lg:px-24">
        <p className="font-sans text-base text-white/65 md:text-lg">Vuoi vedere come diventerebbe la tua farmacia?</p>
        <a
          href="#contatti"
          className="inline-flex min-h-12 items-center justify-center bg-white px-7 py-3.5 font-sans text-sm font-bold uppercase tracking-[0.14em] text-dark transition-colors duration-200 hover:bg-[#e9e4da] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Richiedi una consulenza
        </a>
      </div>

      {current && <ProjectPageV2 key={current.slug} project={current} onClose={close} />}
    </section>
  );
}
