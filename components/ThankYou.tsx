import React from 'react';
import { motion } from 'framer-motion';
import { LOGO_URL } from '../lib/brand';
import { PHONE_HOURS } from '../lib/contact';
import CallButton from './CallButton';
import Testimonials from './Testimonials';
import Footer from './Footer';

const ease = [0.22, 1, 0.36, 1] as const;

export default function ThankYou() {
  return (
    <main className="bg-dark text-white overflow-x-clip">
      <header className="px-5 md:px-8 pt-6 md:pt-8">
        <a href="/" aria-label="Torna alla pagina principale" className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid">
          <img src={LOGO_URL} alt="Sartoretto Verna" className="block h-12 w-auto md:h-16" />
        </a>
      </header>

      <section className="px-5 md:px-14 lg:px-24 pt-14 md:pt-24 pb-16 md:pb-24">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="max-w-3xl" role="status">
          <p className="text-acid text-xs md:text-sm tracking-[0.34em] uppercase font-sans font-semibold mb-4">Grazie</p>
          <h1 className="font-display text-white uppercase" style={{ fontSize: 'clamp(2.4rem, 6vw, 5.5rem)', lineHeight: 0.95 }}>
            Richiesta<br /><span className="text-acid">inviata.</span>
          </h1>
          <p className="mt-6 text-white/90 text-base md:text-xl font-sans leading-relaxed max-w-[52ch]">
            Abbiamo ricevuto i tuoi dati. Ti ricontatteremo appena possibile, normalmente entro 24 ore lavorative.
          </p>

          <div className="mt-10 flex flex-col gap-3">
            <p className="text-white/75 text-sm md:text-base font-sans">Hai fretta? Puoi chiamarci direttamente ({PHONE_HOURS}).</p>
            <CallButton location="thank_you" tone="dark" className="self-start w-full sm:w-auto" />
          </div>
        </motion.div>
      </section>

      <Testimonials />

      <div className="px-5 md:px-14 lg:px-24 py-10 border-t border-white/10">
        <a href="/" className="inline-flex min-h-11 items-center text-white/80 font-sans font-semibold text-sm tracking-[0.14em] uppercase underline underline-offset-4 hover:text-acid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid transition-colors">
          Torna alla pagina principale
        </a>
      </div>

      <Footer />
    </main>
  );
}
