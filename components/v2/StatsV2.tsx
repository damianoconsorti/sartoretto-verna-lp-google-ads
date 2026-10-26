import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.32, 0.72, 0, 1] as const;

// Stessi numeri della fascia attuale, con didascalie dalla pagina "Chi siamo" del sito aziendale; testi in nero e centrati.
const stats = [
  { value: 'Dal 1965', label: 'fondata a Roma da Giovanni Sartoretto Verna' },
  { value: '3A', label: 'generazioni di architetti al lavoro sulla farmacia' },
  { value: '48', label: 'paesi nel mondo in cui abbiamo progettato farmacie' },
  { value: '3.000+', label: 'realizzazioni, con un team multidisciplinare' },
];

export default function StatsV2() {
  return (
    <section className="border-y border-[#eee] bg-white">
      <div className="grid grid-cols-2 divide-x divide-[#eee] lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.value}
            initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease, delay: i * 0.08 }}
            className="flex flex-col items-center gap-2 px-6 py-10 text-center md:px-10 md:py-14"
          >
            <span className="font-display uppercase leading-none text-[#0a0a0a]" style={{ fontSize: 'clamp(2.4rem, 5vw, 5.5rem)' }}>
              {s.value}
            </span>
            <p className="max-w-[24ch] font-sans text-sm font-light leading-relaxed text-[#0a0a0a]/65 md:text-base">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
