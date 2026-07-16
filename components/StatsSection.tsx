import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: '60',      color: 'text-acid',    label: 'anni di storia e specializzazione esclusiva nel settore farmacia' },
  { value: '1',       color: 'text-teal',    label: 'unica specializzazione: la farmacia, da sempre' },
  { value: '48',      color: 'text-magenta', label: 'paesi nel mondo dove abbiamo realizzato progetti' },
  { value: '+3.000',  color: 'text-[#0a0a0a]', label: 'realizzazioni completate in tutto il mondo' },
];

export default function StatsSection() {
  return (
    <section className="bg-white border-t border-[#eee] border-b border-[#eee]">
      {/* 2 colonne su mobile, 4 su desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#eee]">
        {stats.map((s, i) => (
          <motion.div
            key={s.value}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: i * 0.08 }}
            className="px-6 md:px-10 py-10 md:py-14 flex flex-col gap-2"
          >
            <span
              className={`font-display leading-none uppercase ${s.color}`}
              style={{ fontSize: 'clamp(2.4rem, 5vw, 5.5rem)' }}
            >
              {s.value}
            </span>
            <p className="text-[#555] text-sm md:text-base font-sans font-light leading-relaxed">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
