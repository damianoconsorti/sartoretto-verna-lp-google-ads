import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { photoSrc, projects } from './projects';
import type { ProjectEntry } from './projects';

const ease = [0.32, 0.72, 0, 1] as const;
const pad = (n: number) => String(n).padStart(2, '0');

interface Props {
  key?: React.Key;
  project: ProjectEntry;
  index: number;
  next: ProjectEntry;
  onClose: () => void;
  onSwitch: (slug: string) => void;
}

// Mosaico "bento": blocchi da 5 scatti (uno grande + due a fianco + due larghi), il resto si adatta.
const BLOCK = ['md:col-span-8 md:row-span-2', 'md:col-span-4', 'md:col-span-4', 'md:col-span-6', 'md:col-span-6'];
const TAIL: Record<number, string[]> = {
  1: ['md:col-span-12 md:row-span-2'],
  2: ['md:col-span-6', 'md:col-span-6'],
  3: ['md:col-span-4', 'md:col-span-4', 'md:col-span-4'],
  4: ['md:col-span-6', 'md:col-span-6', 'md:col-span-6', 'md:col-span-6'],
};
function spanFor(i: number, n: number): string {
  const full = Math.floor(n / 5) * 5;
  if (i < full) return BLOCK[i % 5];
  return TAIL[n - full]?.[i - full] ?? 'md:col-span-6';
}

function Arrow({ dir, onClick, label }: { dir: 'prev' | 'next'; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-white transition-[background-color,color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white hover:text-dark active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true" className={dir === 'prev' ? 'rotate-180' : ''}>
        <path d="M1 6h16M12 1l5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </button>
  );
}

// Pagina del progetto: tutti gli scatti a mosaico, ognuno apribile a schermo intero.
export default function ProjectPageV2({ project, index, next, onClose, onSwitch }: Props) {
  const [zoom, setZoom] = useState<number | null>(null);
  const total = project.photos.length;
  const servizi = project.photos.filter((p) => p.kind === 'servizi').length;

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (zoom === null) {
        if (e.key === 'Escape') onClose();
        return;
      }
      if (e.key === 'Escape') setZoom(null);
      if (e.key === 'ArrowRight') setZoom((z) => (z === null ? z : (z + 1) % total));
      if (e.key === 'ArrowLeft') setZoom((z) => (z === null ? z : (z - 1 + total) % total));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoom, total, onClose]);

  function goToContact() {
    onClose();
    window.setTimeout(() => document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' }), 350);
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name}: tutte le immagini`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease }}
      className="fixed inset-0 z-[150] overflow-y-auto bg-[#0B0B0A]"
    >
      {/* Pillola flottante: torna all'elenco */}
      <button
        type="button"
        onClick={onClose}
        className="fixed left-4 top-4 z-20 inline-flex min-h-11 items-center gap-3 rounded-full bg-black/55 py-2 pl-3 pr-5 font-sans text-xs font-bold uppercase tracking-[0.18em] text-white ring-1 ring-white/20 backdrop-blur-xl transition-[background-color,color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white hover:text-dark active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:left-8 md:top-6"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
            <path d="M13 5H1M5 1 1 5l4 4" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </span>
        Tutti i progetti
      </button>

      <div className="px-4 pb-24 pt-28 md:px-10 md:pt-36">
        <motion.div initial={{ opacity: 0, y: 36, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1, ease, delay: 0.1 }} className="mb-12 md:mb-20">
          <span className="mb-6 inline-block rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70">
            Realizzazione {pad(index + 1)} / {pad(projects.length)}
          </span>
          <h2 className="font-display uppercase leading-[0.94] text-white" style={{ fontSize: 'clamp(2.8rem, 8vw, 8rem)' }}>
            {project.name}
          </h2>
          <p className="mt-6 font-sans text-sm font-semibold uppercase tracking-[0.22em] text-white/50">
            Arredi{servizi > 0 ? ' e sale servizi' : ''} · {total} ambienti
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:auto-rows-[clamp(220px,23vw,380px)] md:gap-4">
          {project.photos.map((photo, i) => (
            <motion.button
              key={photo.id}
              type="button"
              onClick={() => setZoom(i)}
              aria-label={`Apri l'immagine ${i + 1} di ${total}`}
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease, delay: 0.2 + Math.min(i, 7) * 0.07 }}
              className={`group relative aspect-[3/2] cursor-zoom-in overflow-hidden rounded-[1.25rem] bg-[#161615] ring-1 ring-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:aspect-auto ${spanFor(i, total)}`}
            >
              <img
                src={photoSrc(photo.id, 960)}
                srcSet={`${photoSrc(photo.id, 960)} 960w, ${photoSrc(photo.id, 1920)} 1920w`}
                sizes="(min-width: 768px) 66vw, 100vw"
                alt={`${project.name}, immagine ${i + 1}`}
                width={photo.width}
                height={photo.height}
                loading={i < 3 ? 'eager' : 'lazy'}
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-dark">
                {photo.kind === 'servizi' ? 'Sala servizi' : 'Arredi'}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Prossimo progetto */}
        <div className="mt-20 border-t border-white/10 pt-12 md:mt-28 md:pt-16">
          <button
            type="button"
            onClick={() => {
              onSwitch(next.slug);
              document.querySelector('[role=dialog]')?.scrollTo({ top: 0 });
            }}
            className="group flex w-full flex-col items-start gap-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:flex-row md:items-end md:justify-between"
          >
            <span>
              <span className="mb-4 block font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">Prossimo progetto</span>
              <span className="block font-display uppercase leading-none text-white transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-2" style={{ fontSize: 'clamp(2.2rem, 6vw, 5.5rem)' }}>
                {next.name}
              </span>
            </span>
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-dark transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-0.5">
              <svg width="16" height="16" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2.5 9.5l7-7M3.5 2.5h6v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </div>

        <div className="mt-16 flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
          <p className="font-sans text-base text-white/65 md:text-lg">Vuoi una farmacia così? Parliamone.</p>
          <button
            type="button"
            onClick={goToContact}
            className="group/pill inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-6 pr-1.5 font-sans text-xs font-bold uppercase tracking-[0.18em] text-dark transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Richiedi una consulenza
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-dark/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/pill:translate-x-0.5 group-hover/pill:-translate-y-px">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2.5 9.5l7-7M3.5 2.5h6v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {zoom !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name}, immagine ${zoom + 1} di ${total}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0B0B0A]"
          onClick={() => setZoom(null)}
        >
          <img src={photoSrc(project.photos[zoom].id, 1920)} alt={`${project.name}, immagine ${zoom + 1}`} className="max-h-[88vh] max-w-[96vw] rounded-xl object-contain" onClick={(e) => e.stopPropagation()} />
          <p className="absolute bottom-5 left-5 font-sans text-xs uppercase tracking-[0.22em] text-white/75 md:bottom-8 md:left-10">
            {pad(zoom + 1)} / {pad(total)} · {project.name}
          </p>
          <button
            type="button"
            onClick={() => setZoom(null)}
            aria-label="Chiudi l'immagine"
            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white hover:text-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-8 md:top-8"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
          <div className="absolute bottom-4 right-4 flex gap-2 md:bottom-8 md:right-8" onClick={(e) => e.stopPropagation()}>
            <Arrow dir="prev" label="Immagine precedente" onClick={() => setZoom((zoom - 1 + total) % total)} />
            <Arrow dir="next" label="Immagine successiva" onClick={() => setZoom((zoom + 1) % total)} />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
