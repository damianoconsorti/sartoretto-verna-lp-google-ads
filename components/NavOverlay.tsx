import React from 'react';
import { SectionId } from '../types';

const NavOverlay: React.FC = () => {
  const scrollToContact = () => {
    const element = document.getElementById(SectionId.CONTACT);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="absolute top-0 left-0 w-full z-50 py-6 bg-transparent">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          onClick={scrollToTop}
          className="cursor-pointer"
        >
          <img 
            src="https://www.sartorettoverna.it/wp-content/uploads/2025/07/NUOVO-LOGO-SV-PHARMACY-BUSINESS-ARCHITECTS-09.png" 
            alt="Sartoretto Verna" 
            className="h-auto w-40 md:w-56 object-contain transition-all duration-300"
          />
        </div>

        {/* Primary CTA */}
        <button 
          onClick={scrollToContact}
          className="transition-all duration-300 px-6 py-3 font-bold uppercase text-sm tracking-widest flex items-center gap-2 shadow-lg bg-sv-acid text-black hover:bg-white border-none"
        >
          Richiedi Consulenza
        </button>
      </div>
    </header>
  );
};

export default NavOverlay;