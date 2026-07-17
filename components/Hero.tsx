import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const CLIP_START = 9;
const CLIP_END = 45;

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  function handleLoadedMetadata() {
    if (videoRef.current) videoRef.current.currentTime = CLIP_START;
  }

  function handleTimeUpdate() {
    const v = videoRef.current;
    if (v && v.currentTime >= CLIP_END) v.currentTime = CLIP_START;
  }

  return (
    <section id="hero" className="relative w-full h-[78vh] md:h-[82vh] min-h-[540px] md:min-h-[600px] overflow-hidden bg-dark">
      {/* Video background — loop manuale 9s–45s (native loop riparte da 0) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <video
          ref={videoRef}
          src="https://sv-it.b-cdn.net/Farmacia%20Catona%20_%20orizzontale.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          aria-label="Sartoretto Verna"
        />
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: 'linear-gradient(160deg, rgba(0,181,181,0.12) 0%, rgba(0,0,0,0.28) 45%, rgba(0,0,0,0.65) 100%)' }}
      />

      {/* Contenuto hero */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end px-5 md:px-14 lg:px-24 pb-12 md:pb-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">

          {/* Titolo */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease, delay: 0.5 }}
              className="text-acid text-xs md:text-sm tracking-[0.38em] uppercase font-sans font-semibold mb-4"
            >
              Progettazione • Restyling • Arredamento farmacia
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.6 }}
              className="font-display text-white uppercase"
              style={{ fontSize: 'clamp(2.6rem, 8vw, 8.5rem)', lineHeight: 0.95 }}
            >
              Fai evolvere<br />
              <span className="text-acid">la tua</span><br />
              farmacia
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.75 }}
              className="text-white/85 text-sm md:text-base font-sans font-semibold tracking-wide leading-snug mt-4 max-w-[36ch]"
            >
              Trasforma layout e arredamenti per migliorare servizi, flusso clienti e vendite.
            </motion.p>
          </div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.9 }}
            className="flex flex-col gap-3 shrink-0"
          >
            <a
              href="#contatti"
              className="inline-flex items-center justify-center gap-4 bg-white text-dark font-sans font-bold text-sm tracking-[0.16em] uppercase px-6 py-4 hover:bg-acid transition-colors duration-200"
            >
              Scopri come ↓
            </a>
            <a
              href="#realizzazioni"
              className="inline-flex items-center justify-center gap-3 text-white/75 font-sans font-semibold text-sm tracking-[0.16em] uppercase hover:text-acid transition-colors duration-200"
            >
              Galleria progetti ↗
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-9 bg-gradient-to-b from-white/50 to-transparent mx-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}
