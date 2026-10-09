import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { getHeroVariant } from '../lib/variants';

const ease = [0.22, 1, 0.36, 1] as const;
// TODO: sostituire con la clip leggera (720p, pochi MB). Se la nuova clip è già tagliata, impostare CLIP_START = 0
// e CLIP_END = durata del file (oppure un valore molto alto: il loop torna a CLIP_START).
const CLIP_START = 9;
const CLIP_END = 45;
const VIDEO_URL = 'https://sv-it.b-cdn.net/Farmacia%20Catona%20_%20orizzontale.mp4';

// Poster responsive: il file da 1920px pesa ~180 KB, quello da 640px ~26 KB (il JPG originale pesava 830 KB).
const POSTER_SRC = 'CATONA-1280.webp';
const POSTER_SRCSET = 'CATONA-640.webp 640w, CATONA-1280.webp 1280w, CATONA-1920.webp 1920w';

// Il video (clip da oltre 100 MB) parte solo da 768px in su, a pagina caricata, senza risparmio dati e su reti non lente.
const VIDEO_MIN_WIDTH_QUERY = '(min-width: 768px)';
const VIDEO_DELAY_AFTER_LOAD_MS = 400;

function isConstrainedConnection() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (!connection) return false;
  return Boolean(connection.saveData) || /^(slow-2g|2g|3g)$/.test(connection.effectiveType ?? '');
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [wideScreen, setWideScreen] = useState(() => window.matchMedia(VIDEO_MIN_WIDTH_QUERY).matches);
  const [constrained] = useState(isConstrainedConnection);
  const [pageReady, setPageReady] = useState(false);
  const [videoFallback, setVideoFallback] = useState(false);
  const variant = getHeroVariant();

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
    const arm = () => { timer = window.setTimeout(() => setPageReady(true), VIDEO_DELAY_AFTER_LOAD_MS); };
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
    // Altezza guidata dal contenuto: min-h per l'impatto visivo, padding-top = altezza navbar (96px mobile, 80px md+)
    // così titolo ed eyebrow non finiscono mai sotto la navbar, qualunque sia la risoluzione o la lunghezza del testo.
    <section id="hero" className="relative isolate flex min-h-[560px] md:min-h-[640px] lg:min-h-[min(84vh,860px)] flex-col justify-end overflow-hidden bg-dark scroll-mt-[110px] md:scroll-mt-[80px]">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
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

      <div className="absolute inset-0 z-10 bg-[linear-gradient(160deg,rgba(0,181,181,0.16)_0%,rgba(0,0,0,0.35)_45%,rgba(0,0,0,0.78)_100%)]" />

      <div className="relative z-20 px-5 md:px-14 lg:px-24 pt-[112px] md:pt-[104px] pb-5 md:pb-14">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 md:gap-8 lg:gap-10">
          <div className="max-w-5xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease, delay: 0.3 }}
              className="text-acid text-[0.68rem] md:text-sm tracking-[0.19em] md:tracking-[0.34em] uppercase font-sans font-semibold mb-2 md:mb-4"
            >
              {variant.eyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.4 }}
              className="font-display text-white uppercase"
              style={{ fontSize: 'clamp(2.15rem, 5.2vw, 5.75rem)', lineHeight: 0.95 }}
            >
              {variant.title}<br />
              <span className="text-acid">{variant.accent}</span>
              {variant.suffix && <><br />{variant.suffix}</>}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.55 }}
              className="text-white/90 text-sm md:text-lg font-sans font-normal leading-relaxed mt-3 md:mt-5 max-w-[58ch]"
            >
              {variant.subtitle}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="mt-2 md:mt-4 text-white/75 text-[0.7rem] md:text-sm font-sans font-semibold tracking-[0.08em] md:tracking-[0.12em] uppercase"
            >
              Dal 1965 · 3.000+ realizzazioni · 48 Paesi
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.7 }}
            className="flex flex-col gap-3 shrink-0"
          >
            <a href="#quick-form" className="min-h-11 inline-flex items-center justify-center bg-white text-dark font-sans font-bold text-sm tracking-[0.12em] uppercase px-6 py-4 hover:bg-acid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-colors duration-200">
              Richiedi una consulenza gratuita
            </a>
            <a href="#realizzazioni" className="min-h-11 inline-flex items-center justify-center text-white font-sans font-semibold text-sm tracking-[0.14em] uppercase border border-white/35 px-6 py-3 hover:border-acid hover:text-acid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid transition-colors duration-200">
              Guarda le realizzazioni
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
