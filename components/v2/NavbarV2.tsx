import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { LOGO_URL } from '../../lib/brand';
import { PHONE_DISPLAY, PHONE_TEL } from '../../lib/contact';
import { trackClickToCall } from '../../lib/events';

const ease = [0.32, 0.72, 0, 1] as const;

// Nell'hero resta solo il logo. Superato l'hero compaiono "Chiama" (centro) e "Parliamo del tuo progetto" (giallo fluo), entrambi da tablet in su:
// su telefono ci sono già "Chiama" e "Richiedi consulenza" nella barra fissa in basso.
export default function NavbarV2() {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero || typeof IntersectionObserver === 'undefined') {
      const onScroll = () => setPastHero(window.scrollY > 600);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }
    // "Oltre l'hero" = l'hero non è più visibile sotto la barra e l'abbiamo superato scorrendo verso il basso.
    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting && entry.boundingClientRect.bottom < 80),
      { rootMargin: '-80px 0px 0px 0px', threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Comparsa con transizione CSS (affidabile anche con molte animazioni attive): opacità + leggero scatto verso il basso.
  const hidden = 'pointer-events-none -translate-y-2 opacity-0';
  const shown = 'translate-y-0 opacity-100';

  return (
    <nav
      aria-label="Navigazione principale"
      className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-500 ${pastHero ? 'bg-[#0a0a0a]' : 'bg-gradient-to-b from-black/60 to-transparent'}`}
    >
      <div className="relative flex h-[96px] w-full items-center justify-between gap-3 px-5 md:h-20 md:px-8">
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

        <a
          href={`tel:${PHONE_TEL}`}
          onClick={() => trackClickToCall('navbar')}
          tabIndex={pastHero ? 0 : -1}
          aria-hidden={!pastHero}
          className={`absolute left-1/2 hidden min-h-11 -translate-x-1/2 items-center gap-3 border border-white/35 px-5 py-2 font-sans text-white transition-[opacity,transform,background-color,color,border-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white hover:bg-white hover:text-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:inline-flex ${pastHero ? shown : hidden}`}
        >
          <Phone className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
          <span className="text-sm font-bold uppercase tracking-[0.1em]">Chiama {PHONE_DISPLAY}</span>
        </a>

        <a
          href="#contatti"
          tabIndex={pastHero ? 0 : -1}
          aria-hidden={!pastHero}
          className={`hidden min-h-11 items-center justify-center bg-acid px-3 text-center font-sans text-[10px] font-bold uppercase leading-tight tracking-[0.08em] text-dark shadow-[0_0_24px_rgba(204,255,0,0.35)] transition-[opacity,transform,background-color] delay-75 duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:inline-flex md:px-6 md:text-sm ${pastHero ? shown : hidden}`}
        >
          Parliamo del tuo progetto
        </a>
      </div>
    </nav>
  );
}
