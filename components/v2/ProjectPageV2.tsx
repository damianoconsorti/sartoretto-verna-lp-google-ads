import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { photoSrc } from './projects';
import type { ProjectEntry } from './projects';

const ease = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, '0');

interface Props {
  key?: React.Key;
  project: ProjectEntry;
  onClose: () => void;
}

function Arrow({ dir, onClick, label }: { dir: 'prev' | 'next'; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center border border-white/60 text-white transition-colors duration-200 hover:bg-white hover:text-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true" className={dir === 'prev' ? 'rotate-180' : ''}>
        <path d="M1 6h16M12 1l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </button>
  );
}

// Pagina del progetto: tutte le foto a mosaico, ognuna apribile a schermo intero.
export default function ProjectPageV2({ project, onClose }: Props) {
  const [zoom, setZoom] = useState<number | null>(null);
  const total = project.photos.length;

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
      aria-label={`${project.name}: tutte le foto`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease }}
      className="fixed inset-0 z-[150] overflow-y-auto bg-[#0B0B0A]"
    >
      <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-[#0B0B0A]/95 px-4 py-3 backdrop-blur md:px-10">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex min-h-11 items-center gap-3 font-sans text-sm font-bold uppercase tracking-[0.16em] text-white transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <svg width="16" height="11" viewBox="0 0 16 11" fill="none" aria-hidden="true">
            <path d="M15 5.5H1M5.5 1 1 5.5 5.5 10" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          Tutti i progetti
        </button>
        <p className="hidden font-sans text-xs font-semibold uppercase tracking-[0.28em] text-white/60 sm:block">{total} foto</p>
      </header>

      <div className="px-4 pb-20 pt-10 md:px-10 md:pt-16">
        <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-[0.34em] text-white/60">Realizzazione</p>
        <h2 className="mb-10 font-display uppercase leading-[0.98] text-white md:mb-14" style={{ fontSize: 'clamp(2.4rem, 6.5vw, 6.5rem)' }}>
          {project.name}
        </h2>

        <div className="columns-1 gap-3 sm:columns-2 lg:columns-3 lg:gap-4">
          {project.photos.map((photo, i) => (
            <motion.button
              key={photo.id}
              type="button"
              onClick={() => setZoom(i)}
              aria-label={`Apri la foto ${i + 1} di ${total}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: Math.min(i, 8) * 0.05 }}
              className="group mb-3 block w-full cursor-zoom-in overflow-hidden bg-[#1a1a19] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:mb-4"
            >
              <img
                src={photoSrc(photo.id, 960)}
                srcSet={`${photoSrc(photo.id, 960)} 960w, ${photoSrc(photo.id, 1920)} 1920w`}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                alt={`${project.name}, foto ${i + 1}`}
                width={photo.width}
                height={photo.height}
                loading={i < 3 ? 'eager' : 'lazy'}
                decoding="async"
                className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </motion.button>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between">
          <p className="font-sans text-base text-white/70 md:text-lg">Vuoi una farmacia così? Parliamone.</p>
          <button
            type="button"
            onClick={goToContact}
            className="inline-flex min-h-12 items-center justify-center bg-white px-7 py-3.5 font-sans text-sm font-bold uppercase tracking-[0.14em] text-dark transition-colors duration-200 hover:bg-[#e9e4da] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Richiedi una consulenza
          </button>
        </div>
      </div>

      {zoom !== null && (
        <>
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name}, foto ${zoom + 1} di ${total}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0B0B0A]"
            onClick={() => setZoom(null)}
          >
            <img
              src={photoSrc(project.photos[zoom].id, 1920)}
              alt={`${project.name}, foto ${zoom + 1}`}
              className="max-h-[88vh] max-w-[96vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="absolute bottom-5 left-5 font-sans text-sm uppercase tracking-[0.22em] text-white/80 md:bottom-8 md:left-10">
              {pad(zoom + 1)} / {pad(total)} · {project.name}
            </p>
            <button
              type="button"
              onClick={() => setZoom(null)}
              aria-label="Chiudi la foto"
              className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center border border-white/50 text-white transition-colors hover:bg-white hover:text-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-8 md:top-8"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
            <div className="absolute bottom-4 right-4 flex gap-2 md:bottom-8 md:right-8" onClick={(e) => e.stopPropagation()}>
              <Arrow dir="prev" label="Foto precedente" onClick={() => setZoom((zoom - 1 + total) % total)} />
              <Arrow dir="next" label="Foto successiva" onClick={() => setZoom((zoom + 1) % total)} />
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
