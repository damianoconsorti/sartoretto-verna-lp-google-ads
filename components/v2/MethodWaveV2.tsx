import React from 'react';
import { motion } from 'framer-motion';
import { Armchair, Headset, Lightbulb, MessagesSquare, PencilRuler, Search } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

interface Phase {
  title: string;
  body: string;
  Icon: LucideIcon;
}

const phases: Phase[] = [
  { title: 'Ascolto', body: 'Iniziamo con un incontro per conoscerti: ascoltiamo esigenze, obiettivi e ciò che rende unica la tua farmacia.', Icon: MessagesSquare },
  { title: 'Analisi', body: 'Studiamo gli spazi, i flussi dei clienti-pazienti, i dati di vendita e il contesto competitivo del territorio.', Icon: Search },
  { title: 'Strategia', body: 'Definiamo un concept chiaro e distintivo, coerente con la tua comunità, i tuoi servizi e il posizionamento che desideri.', Icon: Lightbulb },
  { title: 'Progetto', body: 'Trasformiamo la strategia in un progetto funzionale ed estetico, dal concept 3D ai disegni esecutivi.', Icon: PencilRuler },
  { title: 'Realizzazione', body: 'Produciamo gli arredi in Italia e li installiamo direttamente in farmacia; se lo desideri, ti segnaliamo imprese di fiducia per le opere edili.', Icon: Armchair },
  { title: 'Supporto', body: 'Restiamo al tuo fianco anche dopo l’inaugurazione, ogni volta che ne avrai bisogno.', Icon: Headset },
];

// Percorso a onda: sei nodi, alternati in basso e in alto (viewBox 1200 x 620).
const LOW = 400;
const HIGH = 230;
const WAVE = [LOW, HIGH, LOW, HIGH, LOW, HIGH];
const WAVE_PATH = WAVE.map((y, i) => {
  const x = 100 + i * 200;
  if (i === 0) return `M ${x} ${y}`;
  const px = x - 200;
  const py = WAVE[i - 1];
  return `C ${px + 100} ${py}, ${x - 100} ${y}, ${x} ${y}`;
}).join(' ');

export default function MethodWaveV2() {
  return (
    <section id="metodo" className="bg-[#F3F6F4] py-16 md:py-28">
      <div className="px-6 md:px-14 lg:px-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.28em] text-[#137A6B] md:text-sm">
            Il nostro metodo
          </p>
          <h2 className="font-display uppercase leading-[1.02] text-[#121816]" style={{ fontSize: 'clamp(2.3rem, 5.6vw, 5.5rem)' }}>
            Dall’idea alla nuova farmacia,<br />
            in <span className="text-[#137A6B]">6 fasi</span>
          </h2>
        </motion.div>

        {/* Desktop: onda orizzontale */}
        <div className="relative mx-auto mt-4 hidden aspect-[1200/620] w-full max-w-[1400px] lg:block">
          <svg viewBox="0 0 1200 620" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
            <path d={WAVE_PATH} stroke="#d6dbd8" strokeWidth="12" strokeLinecap="round" />
            <motion.path
              d={WAVE_PATH}
              stroke="#137A6B"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 2.4, ease: 'easeInOut' }}
            />
          </svg>

          {phases.map(({ title, body, Icon }, i) => {
            const high = WAVE[i] === HIGH;
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease, delay: 0.25 + i * 0.3 }}
                className="absolute h-0 w-0"
                style={{ left: `${((100 + i * 200) / 1200) * 100}%`, top: `${(WAVE[i] / 620) * 100}%` }}
              >
                <span className="absolute left-0 top-0 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#137A6B] text-white shadow-[0_0_0_5px_#fff,0_6px_20px_rgba(18,24,22,0.18)]">
                  <Icon size={26} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div className={`absolute left-0 w-[210px] -translate-x-1/2 text-center ${high ? 'bottom-[52px]' : 'top-[52px]'}`}>
                  <h3 className="font-display uppercase text-xl text-[#121816]">{title}</h3>
                  <p className="mt-2 font-sans text-[0.95rem] font-light leading-relaxed text-[#555f5a]">{body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile e tablet: elenco verticale con linea */}
        <ol className="relative mt-10 flex flex-col gap-9 lg:hidden">
          <span className="absolute bottom-6 left-6 top-6 w-px bg-[#cfd6d2]" aria-hidden="true" />
          {phases.map(({ title, body, Icon }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease, delay: 0.05 }}
              className="relative flex gap-5"
            >
              <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#137A6B] text-white shadow-[0_0_0_4px_#F3F6F4]">
                <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <div className="pt-0.5">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-[#8a948f]">Fase {i + 1}</p>
                <h3 className="font-display uppercase text-2xl text-[#121816]">{title}</h3>
                <p className="mt-1.5 font-sans text-base font-light leading-relaxed text-[#555f5a]">{body}</p>
              </div>
            </motion.li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col items-start gap-5 md:mt-14 lg:mt-2">
          <a
            href="#contatti"
            className="inline-flex min-h-12 items-center gap-4 bg-[#137A6B] px-7 py-4 font-display text-base uppercase tracking-[0.06em] text-white transition-colors duration-200 hover:bg-[#0e5f53] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#137A6B] focus-visible:ring-offset-2"
          >
            Richiedi una consulenza <span aria-hidden="true">→</span>
          </a>
          <p className="font-mono text-xs text-[#6b7570] md:text-sm">Un unico interlocutore, dal primo incontro all&apos;arredo installato.</p>
        </div>
      </div>
    </section>
  );
}
