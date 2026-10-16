import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: 'Dal 1965', label: 'esperienza nel settore farmacia' },
  { value: '3A', label: 'generazione di architetti' },
  { value: '48', label: 'paesi nel mondo dove abbiamo realizzato farmacie' },
  { value: '3.000+', label: 'realizzazioni completate nel mondo' },
];

export default function StatsV2() {
  return (
    <section className="border-y border-[#e7e3db] bg-[#F6F4EF]">
      <div className="grid grid-cols-2 divide-x divide-[#e7e3db] lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.value}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: i * 0.08 }}
            className="flex flex-col gap-2 px-6 py-10 md:px-10 md:py-14"
          >
            <span className="font-display uppercase leading-none text-[#0b0b0a]" style={{ fontSize: 'clamp(2.4rem, 5vw, 5.5rem)' }}>
              {s.value}
            </span>
            <p className="font-sans text-sm font-light leading-relaxed text-[#555] md:text-base">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
