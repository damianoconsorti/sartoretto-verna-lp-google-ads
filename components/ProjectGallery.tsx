import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

interface Project {
  name: string;
  location: string;
  category: string;
  imgSrc: string;
  gradient: string;
}

const featured: Project = {
  name: 'Farmacia Catona',
  location: 'Reggio Calabria',
  category: 'Nuova apertura',
  imgSrc: '/CATONA.jpg',
  gradient: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,181,181,0.32) 100%)',
};

const small: Project[] = [
  { name: 'Farmacia Bellini',      location: 'Catania', category: 'Ristrutturazione', imgSrc: '/BELLINI.jpg',       gradient: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.08) 60%, transparent 100%)' },
  { name: 'Farmacia San Leo',      location: 'Rimini',  category: 'Restyling',        imgSrc: '/SAN-LEO.jpg',       gradient: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.08) 60%, transparent 100%)' },
  { name: 'Farmacia Appio Latino', location: 'Roma',    category: 'Ampliamento',      imgSrc: '/APPIO-LATINO.jpg',  gradient: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.08) 60%, transparent 100%)' },
  { name: 'Farmacia Beneduce',     location: 'Napoli',  category: 'Trasferimento',    imgSrc: '/BENEDUCE.jpg',      gradient: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.08) 60%, transparent 100%)' },
];

export default function ProjectGallery() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="realizzazioni" className="bg-[#0a0a0a] pt-16 md:pt-24">

      {/* Header */}
      <div className="px-6 md:px-14 lg:px-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-acid text-sm tracking-[0.4em] uppercase font-sans font-semibold mb-3">
            Realizzazioni selezionate
          </p>
          <h2
            className="font-display text-white uppercase leading-none"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 7.5rem)' }}
          >
            Progetti<br />
            <span className="text-acid">Selezionati</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col md:items-end gap-4"
        >
          <p className="text-white/55 text-base md:text-lg font-sans font-light max-w-[36ch] md:text-right leading-relaxed">
            Storie di successo tangibili: design d'impatto e performance commerciali misurabili.
          </p>
          <a
            href="#contatti"
            className="inline-flex items-center gap-3 bg-white text-dark font-sans font-bold text-sm tracking-[0.18em] uppercase px-6 py-3.5 hover:bg-acid transition-colors duration-200 self-start md:self-auto"
          >
            Richiedi una consulenza →
          </a>
        </motion.div>
      </div>

      {/* Contenitore animato: griglia ↔ dettaglio */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>

          {/* ── VISTA GRIGLIA ── */}
          {!selected && (
            <motion.div
              key="grid"
              initial={{ x: '-6%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-8%', opacity: 0 }}
              transition={{ duration: 0.45, ease }}
              className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#333]"
            >
              {/* Card grande */}
              <div
                className="relative overflow-hidden h-[420px] md:h-[620px] group cursor-pointer"
                onClick={() => setSelected(featured)}
              >
                <img
                  src={featured.imgSrc}
                  alt={featured.name}
                  className="absolute inset-0 w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 [transition:filter_400ms_ease]"
                />
                <div className="absolute inset-0" style={{ background: featured.gradient }} />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <span className="bg-white/10 backdrop-blur-sm border border-white/30 text-white text-xs tracking-[0.25em] uppercase font-sans px-4 py-2">
                    Espandi →
                  </span>
                </div>
                <div className="absolute top-4 left-4 z-10">
                  <span className="border border-white/30 text-white text-sm tracking-[0.2em] uppercase font-sans px-3 py-1.5 bg-black/25 backdrop-blur-sm inline-block">
                    {featured.category}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                  <p className="text-white/50 text-sm tracking-[0.28em] uppercase font-sans mb-2">{featured.location}</p>
                  <h3 className="font-display text-white uppercase leading-none" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)' }}>
                    {featured.name}
                  </h3>
                </div>
              </div>

              {/* 2×2 grid */}
              <div className="grid grid-cols-2 gap-px">
                {small.map((p, i) => (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                    className="relative overflow-hidden h-[210px] md:h-[308px] group cursor-pointer"
                    onClick={() => setSelected(p)}
                  >
                    <img
                      src={p.imgSrc}
                      alt={p.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 [transition:filter_400ms_ease]"
                    />
                    <div className="absolute inset-0" style={{ background: p.gradient }} />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <span className="bg-white/10 backdrop-blur-sm border border-white/30 text-white text-xs tracking-[0.25em] uppercase font-sans px-3 py-1.5">
                        Espandi →
                      </span>
                    </div>
                    <div className="absolute top-3 left-3 z-10">
                      <span className="border border-white/25 text-white text-xs tracking-[0.18em] uppercase font-sans px-2.5 py-1 bg-black/25 backdrop-blur-sm inline-block">
                        {p.category}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 z-10">
                      <p className="text-white/45 text-xs tracking-[0.25em] uppercase font-sans mb-1">{p.location}</p>
                      <h3 className="font-display text-white uppercase leading-none text-lg md:text-xl">{p.name}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── VISTA ESPANSA ── */}
          {selected && (
            <motion.div
              key="detail"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease }}
              className="relative w-full h-[520px] md:h-[620px] overflow-hidden"
            >
              <img
                src={selected.imgSrc}
                alt={selected.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)' }}
              />

              {/* Bottone indietro */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-5 left-5 z-20 inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/20 text-white text-xs tracking-[0.22em] uppercase font-sans font-semibold px-4 py-2.5 hover:bg-acid hover:text-dark hover:border-acid transition-colors duration-200"
              >
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M13 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square"/>
                </svg>
                Tutti i progetti
              </button>

              {/* Info progetto */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14 z-10">
                <span className="border border-white/30 text-white text-xs tracking-[0.22em] uppercase font-sans px-3 py-1.5 bg-black/30 backdrop-blur-sm inline-block mb-5">
                  {selected.category}
                </span>
                <p className="text-white/50 text-sm tracking-[0.3em] uppercase font-sans mb-2">
                  {selected.location}
                </p>
                <h3
                  className="font-display text-white uppercase leading-none"
                  style={{ fontSize: 'clamp(2.2rem, 6vw, 6rem)' }}
                >
                  {selected.name}
                </h3>
              </div>

              {/* Navigazione tra progetti */}
              <div className="absolute bottom-8 right-8 md:bottom-14 md:right-14 z-10 flex gap-2">
                {[featured, ...small].filter(p => p.name !== selected.name).slice(0, 3).map((p) => (
                  <button
                    key={p.name}
                    onClick={() => setSelected(p)}
                    className="w-14 h-10 md:w-20 md:h-14 overflow-hidden opacity-50 hover:opacity-100 transition-opacity duration-200 border border-white/20"
                  >
                    <img src={p.imgSrc} alt={p.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}
