import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const LOGO_URL =
  'https://lh3.googleusercontent.com/s819vmHVAaHH1gM8BEG9wLqIfexiwjnwVARKISZd9tZPmjhj6eO87wTMu7TXKL2CdOxGdWPeyZ9R-Yg3zJQne1zD4ExLLgnyYCI';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        overflow: 'visible',
        backgroundColor: scrolled ? '#0a0a0a' : 'transparent',
        transition: 'background-color 300ms ease',
        /* Layout */
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: isMobile ? '110px' : '80px',
        gap: isMobile ? '8px' : '0',
        paddingTop: !isMobile && !scrolled ? '60px' : '0',
      }}
    >
      {/* Logo */}
      <motion.a
        href="#hero"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.2 }}
        style={{ display: 'block' }}
      >
        <img
          src={LOGO_URL}
          alt="Sartoretto Verna"
          style={{
            height: isMobile ? '45px' : scrolled ? '60px' : '80px',
            width: 'auto',
            display: 'block',
            margin: '0 auto',
            maxWidth: 'none',
            transition: 'height 300ms ease',
          }}
        />
      </motion.a>

      {/* Bottone Contattaci — seconda riga su mobile, assoluto a destra su desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease, delay: 0.4 }}
        style={
          isMobile
            ? { display: 'flex', justifyContent: 'center' }
            : { position: 'absolute', right: '32px', top: '50%', transform: 'translateY(-50%)' }
        }
      >
        <a
          href="#quick-consulenza"
          className="inline-flex items-center bg-white text-dark font-sans font-bold tracking-[0.14em] uppercase hover:bg-acid transition-colors duration-200 text-[11px] px-3 py-[6px] md:text-sm md:px-6 md:py-3"
        >
          Contattaci
        </a>
      </motion.div>
    </nav>
  );
}
