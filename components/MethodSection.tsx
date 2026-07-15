import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  { num: '01', title: 'Ascolto',       body: 'Analizziamo la tua farmacia, il territorio e i tuoi obiettivi di business prima di disegnare la prima linea.' },
  { num: '02', title: 'Progetto',      body: 'Layout, materiali, illuminazione e comunicazione visiva: tutto definito in un concept 3D su misura.' },
  { num: '03', title: 'Produzione',    body: 'Arredi e complementi prodotti interamente in Italia. Controllo qualità totale prima di ogni spedizione.' },
  { num: '04', title: 'Installazione', body: 'Cantiere rapido e coordinato, spesso a farmacia aperta, per minimizzare l\'impatto operativo.' },
  { num: '05', title: 'Supporto',      body: 'Non scompariamo dopo l\'apertura. Monitoriamo i risultati e affianchiamo la tua crescita nel tempo.' },
];

export default function MethodSection() {
  return (
    <section className="bg-white border-t border-[#e8e8e8] py-20 md:py-32">
      <div className="px-6 md:px-14 lg:px-24">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease }}
          >
            <p className="text-teal text-sm tracking-[0.32em] uppercase font-sans font-semibold mb-4">
              Il nostro metodo
            </p>
            <h2
              className="font-display text-[#0a0a0a] uppercase leading-none"
              style={{ fontSize: 'clamp(2.4rem, 6.5vw, 7rem)' }}
            >
              Dalla visione<br />
              al nuovo spazio.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[#444] text-base md:text-lg font-sans font-light leading-relaxed max-w-[42ch]"
          >
            Un processo in cinque fasi, collaudato in oltre 3.000 cantieri nel mondo.
            Ogni fase garantisce continuità tra ciò che immagini e ciò che vivi ogni giorno.
          </motion.p>
        </div>

        {/* Steps — 1 colonna mobile, 5 colonne desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 md:gap-0 relative">
          {/* Connector line — solo desktop */}
          <div className="hidden md:block absolute top-3.5 left-0 right-0 h-px bg-[#ddd]" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: i * 0.1 }}
              className="md:px-6 md:first:pl-0 md:last:pr-0 group relative border-l-2 border-[#eee] pl-5 md:border-l-0 md:pl-0"
            >
              <div className="hidden md:block w-3 h-3 border-2 border-[#bbb] group-hover:border-[#0a0a0a] group-hover:bg-[#0a0a0a] transition-all duration-300 mb-7 relative z-10" />
              <span className="block text-[#bbb] font-display text-sm tracking-[0.32em] mb-2 group-hover:text-[#0a0a0a] transition-colors duration-300">
                {step.num}
              </span>
              <h3 className="font-display text-[#0a0a0a] uppercase text-xl md:text-2xl mb-3 group-hover:text-teal transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-[#444] text-base font-sans font-light leading-relaxed">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-12 border-t border-[#e0e0e0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
        >
          <p className="text-[#666] text-base md:text-lg font-sans">Pronto a iniziare il percorso?</p>
          <a
            href="#contatti"
            className="inline-flex items-center gap-4 bg-[#0a0a0a] text-white font-sans font-bold text-sm tracking-[0.2em] uppercase px-7 py-4 hover:bg-acid hover:text-dark transition-colors duration-200 self-start"
          >
            Inizia con una consulenza →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
