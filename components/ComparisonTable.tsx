import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const rows = [
  { dimension: 'Focus',     traditional: 'Arredo e fornitura generica',              sv: 'Performance e risultato di vendita' },
  { dimension: 'Metodo',    traditional: 'Catalogo standard e soluzioni predefinite', sv: 'Progetto personalizzato su analisi dei flussi' },
  { dimension: 'Risultato', traditional: 'Farmacia esteticamente rinnovata',          sv: 'Farmacia che vende di più, già dal primo mese' },
];

export default function ComparisonTable() {
  return (
    <section className="bg-white py-20 md:py-32">
      <div className="px-6 md:px-14 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-28 items-start">

          {/* Left: heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease }}
          >
            <p className="text-teal text-sm tracking-[0.32em] uppercase font-sans font-semibold mb-5">
              Perché scegliere noi
            </p>
            <h2
              className="font-display text-[#0a0a0a] uppercase leading-none mb-7"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 6.5rem)' }}
            >
              Non tutti<br />i fornitori<br />sono uguali.
            </h2>
            <p className="text-[#444] text-lg font-sans font-light leading-relaxed max-w-[38ch]">
              La differenza non è nel prodotto. È nell'approccio. Mentre un fornitore tradizionale
              ti vende arredi, noi ti consegniamo una strategia di spazio progettata per crescere.
            </p>
          </motion.div>

          {/* Right: tabella */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
          >
            {/* ── Desktop: griglia 3 colonne ── */}
            <div className="hidden sm:block">
              {/* Header */}
              <div className="grid grid-cols-[80px_1fr_1fr] mb-1">
                <span />
                <span className="text-sm tracking-[0.22em] uppercase text-[#aaa] font-sans pb-4 border-b border-[#ddd] text-center">
                  Fornitore tradizionale
                </span>
                <div className="pb-4 border-b-2 border-[#0a0a0a] text-center">
                  <span className="text-sm tracking-[0.22em] uppercase text-[#0a0a0a] font-sans font-bold">
                    Sartoretto Verna
                  </span>
                </div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-[#eee]">
                {rows.map((row, i) => (
                  <motion.div
                    key={row.dimension}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.1 }}
                    className="grid grid-cols-[80px_1fr_1fr] gap-4 py-6 items-start"
                  >
                    <span className="font-display text-[#bbb] text-sm tracking-[0.18em] uppercase pt-0.5">
                      {row.dimension}
                    </span>
                    <p className="text-[#bbb] text-base font-sans font-light leading-relaxed line-through decoration-[#ccc]">
                      {row.traditional}
                    </p>
                    <p className="text-[#0a0a0a] text-base font-sans font-semibold leading-relaxed">
                      {row.sv}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Mobile: card verticali ── */}
            <div className="sm:hidden flex flex-col gap-4">
              {rows.map((row, i) => (
                <motion.div
                  key={row.dimension}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                  className="border border-[#e8e8e8] p-5"
                >
                  <span className="font-display text-teal text-xs tracking-[0.3em] uppercase block mb-3">
                    {row.dimension}
                  </span>
                  <p className="text-[#0a0a0a] text-base font-sans font-semibold leading-relaxed mb-2">
                    {row.sv}
                  </p>
                  <p className="text-[#bbb] text-sm font-sans font-light leading-relaxed line-through decoration-[#ccc]">
                    vs. {row.traditional}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-7 flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-[#0a0a0a] shrink-0" />
              <span className="text-[#0a0a0a] text-sm tracking-[0.22em] uppercase font-sans font-semibold">
                L'unico specialista di settore dal 1965
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
