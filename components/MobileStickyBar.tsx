import React from 'react';

export default function MobileStickyBar() {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-[90] bg-dark border-t border-white/10"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <a
        href="#quick-consulenza"
        className="flex items-center justify-center w-full bg-acid text-dark font-sans font-bold text-sm tracking-[0.14em] uppercase px-6 py-4 active:bg-white transition-colors duration-150"
      >
        Richiedi Consulenza Gratuita
      </a>
    </div>
  );
}
