import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

// Stesso video e stessa logica di avvio dell'hero attuale (Hero.tsx): parte dal secondo 9, finisce al 45 e riparte in loop.
// Se arriva la clip leggera, cambiare VIDEO_URL e impostare CLIP_START = 0.
const CLIP_START = 9;
const CLIP_END = 45;
const VIDEO_URL = 'https://sv-it.b-cdn.net/Farmacia%20Catona%20_%20orizzontale.mp4';

const DEFAULT_SUBTITLE = 'Dal layout ai disegni esecutivi, fino agli arredi: un unico progetto che valorizza servizi, flussi e l’esperienza dei tuoi clienti-pazienti.';

const POSTER_SRC = 'CATONA-1280.webp';
const POSTER_SRCSET = 'CATONA-640.webp 640w, CATONA-1280.webp 1280w, CATONA-1920.webp 1920w';

// Il video parte solo da 768px in su, a pagina caricata, senza risparmio dati e su reti non lente.
const VIDEO_MIN_WIDTH_QUERY = '(min-width: 768px)';
const VIDEO_DELAY_AFTER_LOAD_MS = 400;

function isConstrainedConnection() {
  if (typeof navigator === 'undefined') return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (!connection) return false;
  return Boolean(connection.saveData) || /^(slow-2g|2g|3g)$/.test(connection.effectiveType ?? '');
}

function mediaMatches(query: string) {
  return typeof window !== 'undefined' && window.matchMedia(query).matches;
}

export default function HeroV2() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const [reducedMotion, setReducedMotion] = useState(() => mediaMatches('(prefers-reduced-motion: reduce)'));
  const [wideScreen, setWideScreen] = useState(() => mediaMatches(VIDEO_MIN_WIDTH_QUERY));
  const [constrained] = useState(isConstrainedConnection);
  const [pageReady, setPageReady] = useState(false);
  const [videoFallback, setVideoFallback] = useState(false);
  // Stesso hero per tutti gli ingressi (anche ?intent=...): titolo e testi identici alla pagina standard.
  const eyebrow = 'Progettiamo · Arrediamo · Comunichiamo';
  const subtitle = DEFAULT_SUBTITLE;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setReducedMotion(media.matches);
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const media = window.matchMedia(VIDEO_MIN_WIDTH_QUERY);
    const handleChange = () => setWideScreen(media.matches);
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  // Il video non deve competere con poster, font e JS: parte dopo l'evento load della pagina.
  useEffect(() => {
    let timer: number | undefined;
    const arm = () => {
      timer = window.setTimeout(() => setPageReady(true), VIDEO_DELAY_AFTER_LOAD_MS);
    };
    if (document.readyState === 'complete') arm();
    else window.addEventListener('load', arm, { once: true });
    return () => {
      window.removeEventListener('load', arm);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  const showVideo = pageReady && wideScreen && !constrained && !reducedMotion && !videoFallback;

  function handleLoadedMetadata() {
    if (videoRef.current) videoRef.current.currentTime = CLIP_START;
  }

  function handleCanPlay() {
    const video = videoRef.current;
    if (!video || reducedMotion) return;
    video.play().catch(() => setVideoFallback(true));
  }

  function handleTimeUpdate() {
    const video = videoRef.current;
    if (video && video.currentTime >= CLIP_END) {
      video.currentTime = CLIP_START;
      video.play().catch(() => setVideoFallback(true));
    }
  }

  return (
    <section id="hero" className="relative isolate flex min-h-[500px] h-[72svh] max-h-[980px] flex-col justify-end overflow-hidden bg-dark scroll-mt-[110px] md:h-[92svh] md:min-h-[680px] md:scroll-mt-[80px]">
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <img
          ref={posterRef}
          src={POSTER_SRC}
          srcSet={POSTER_SRCSET}
          sizes="100vw"
          width={1920}
          height={1278}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {showVideo && (
          <video
            ref={videoRef}
            src={VIDEO_URL}
            poster={posterRef.current?.currentSrc || POSTER_SRC}
            className="absolute inset-0 h-full w-full object-cover object-center"
            autoPlay
            muted
            playsInline
            preload="metadata"
            onLoadedMetadata={handleLoadedMetadata}
            onCanPlay={handleCanPlay}
            onTimeUpdate={handleTimeUpdate}
            onError={() => setVideoFallback(true)}
            tabIndex={-1}
          />
        )}
      </div>
      {/* Velatura leggera solo dove sta il testo (in basso) e dietro la barra di navigazione: l'arredo resta in piena luce */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(11,11,10,0.78)_0%,rgba(11,11,10,0.42)_26%,rgba(11,11,10,0)_52%),linear-gradient(to_bottom,rgba(11,11,10,0.4)_0%,rgba(11,11,10,0)_20%)]" />

      <div className="px-5 pb-10 pt-[112px] md:px-14 md:pb-16 lg:px-24 [text-shadow:0_1px_18px_rgba(0,0,0,0.45)]">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="mb-3 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/90 md:mb-5 md:text-sm md:tracking-[0.32em]"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            className="font-display uppercase text-white"
            style={{ fontSize: 'clamp(2.2rem, 4.6vw, 4.9rem)', lineHeight: 1 }}
          >
            La farmacia che<br />la tua comunità sceglie
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.45 }}
            className="mt-4 max-w-[56ch] font-sans text-base font-normal leading-relaxed text-white md:mt-6 md:text-lg"
          >
            {subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.6 }}
            className="mt-5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-white/85 md:mt-7 md:text-sm"
          >
            Dal 1965 · Oltre 3.000 farmacie realizzate · 48 Paesi
          </motion.p>
        </div>
      </div>
    </section>
  );
}
