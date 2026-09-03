import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { getHeroVariant } from '../lib/variants';

const ease = [0.22, 1, 0.36, 1] as const;
const CLIP_START = 9;
const CLIP_END = 45;
const VIDEO_URL = 'https://sv-it.b-cdn.net/Farmacia%20Catona%20_%20orizzontale.mp4';
const POSTER_URL = 'CATONA.jpg';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [videoFallback, setVideoFallback] = useState(false);
  const variant = getHeroVariant();

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setReducedMotion(media.matches);
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

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
    <section id="hero" className="relative w-full h-[560px] md:h-[76vh] md:min-h-[640px] lg:h-[84vh] overflow-hidden bg-dark scroll-mt-[110px] md:scroll-mt-[80px]">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src={POSTER_URL}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {!reducedMotion && !videoFallback && (
          <video
            ref={videoRef}
            src={VIDEO_URL}
            poster={POSTER_URL}
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

      <div className="absolute inset-0 z-20 flex flex-col justify-end px-5 md:px-14 lg:px-24 pb-4 md:pb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-10">
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
              style={{ fontSize: 'clamp(2.15rem, 7.6vw, 8rem)', lineHeight: 0.92 }}
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
