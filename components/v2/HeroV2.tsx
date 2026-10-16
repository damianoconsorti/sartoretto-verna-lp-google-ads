import React from 'react';
import { motion } from 'framer-motion';
import { getHeroVariant } from '../../lib/variants';

const ease = [0.22, 1, 0.36, 1] as const;

// Foto protagonista: Farmacia Lezzi. Tre misure per non scaricare 1920px su mobile.
const SRC = 'anteprima/lezzi-1-1280.webp';
const SRCSET = 'anteprima/lezzi-1-640.webp 640w, anteprima/lezzi-1-1280.webp 1280w, anteprima/lezzi-1-1920.webp 1920w';

export default function HeroV2() {
  const variant = getHeroVariant();

  return (
    <section id="hero" className="relative isolate flex min-h-[500px] h-[72svh] md:h-[92svh] md:min-h-[680px] max-h-[980px] flex-col justify-end overflow-hidden bg-dark scroll-mt-[110px] md:scroll-mt-[80px]">
      <img
        src={SRC}
        srcSet={SRCSET}
        sizes="100vw"
        width={1920}
        height={1280}
        alt="Interno di farmacia progettata e arredata da Sartoretto Verna"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[58%_50%] md:object-center"
      />
      {/* Velatura leggera: solo in basso (per il testo) e in alto (per la barra di navigazione), l'arredo resta in piena luce */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(11,11,10,0.92)_0%,rgba(11,11,10,0.68)_30%,rgba(11,11,10,0.12)_58%,rgba(11,11,10,0)_70%),linear-gradient(to_bottom,rgba(11,11,10,0.5)_0%,rgba(11,11,10,0)_22%)]" />

      <div className="px-5 pb-10 pt-[112px] md:px-14 md:pb-16 lg:px-24">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="mb-3 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/80 md:mb-5 md:text-sm md:tracking-[0.32em]"
          >
            {variant.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            className="font-display uppercase text-white"
            style={{ fontSize: 'clamp(2.2rem, 4.6vw, 4.9rem)', lineHeight: 1 }}
          >
            {variant.title} {variant.accent}
            {variant.suffix && <><br />{variant.suffix}</>}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.45 }}
            className="mt-4 max-w-[56ch] font-sans text-base font-normal leading-relaxed text-white/90 md:mt-6 md:text-lg"
          >
            {variant.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.6 }}
            className="mt-6 flex flex-col gap-4 md:mt-9 md:flex-row md:items-center md:gap-8"
          >
            <a
              href="#contatti"
              className="inline-flex min-h-12 items-center justify-center bg-white px-8 py-4 text-center font-sans text-sm font-bold uppercase tracking-[0.14em] text-dark transition-colors duration-200 hover:bg-[#e9e4da] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Richiedi una consulenza gratuita
            </a>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-white/70 md:text-sm">
              Dal 1965 · 3.000+ realizzazioni · 48 Paesi
            </p>
          </motion.div>
        </div>
      </div>

      <p className="absolute bottom-3 right-5 hidden font-sans text-[0.65rem] uppercase tracking-[0.22em] text-white/55 md:block md:right-14 lg:right-24">
        Farmacia Lezzi
      </p>
    </section>
  );
}
