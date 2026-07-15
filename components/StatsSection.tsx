import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: '60',    unit: 'anni',  label: 'di storia e specializzazione esclusiva nel settore farmacia' },
  { value: '1',     unit: 'spec.', label: 'unica specializzazione: la farmacia, da sempre' },
  { value: '3.000', unit: '+',     label: 'realizzazioni completate in tutto il mondo' },
  { value: '3',     unit: 'dim.',  label: 'spazio · business · comunicazione integrata' },
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
            <div className="flex items-end gap-1.5 leading-none flex-wrap">
              <span
                className="font-display text-[#0a0a0a] uppercase"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 5.5rem)' }}
              >
                {s.value}
              </span>
              <span className="text-[#999] font-display text-xl mb-1 uppercase tracking-wide">
                {s.unit}
              </span>
            </div>
            <p className="text-[#555] text-sm md:text-base font-sans font-light leading-relaxed">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
