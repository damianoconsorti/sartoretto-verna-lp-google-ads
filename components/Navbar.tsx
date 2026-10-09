import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LOGO_URL } from '../lib/brand';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      aria-label="Navigazione principale"
      className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-300 ${scrolled ? 'bg-[#0a0a0a]' : 'bg-gradient-to-b from-black/75 to-transparent'}`}
    >
      <div className="flex h-[96px] w-full items-center justify-between gap-3 px-5 md:h-20 md:px-8">
        <motion.a
          href="#hero"
          aria-label="Torna all’inizio"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="block shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid"
        >
          <img src={LOGO_URL} alt="Sartoretto Verna" className="block h-12 w-auto md:h-16" />
        </motion.a>

        <motion.a
          href="#contatti"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease, delay: 0.35 }}
          className="min-h-11 inline-flex items-center justify-center bg-white text-dark font-sans font-bold tracking-[0.08em] uppercase hover:bg-acid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid transition-colors duration-200 text-[10px] leading-tight text-center px-3 md:text-sm md:px-6"
        >
          Parliamo del tuo progetto
        </motion.a>
      </div>
    </nav>
  );
}
