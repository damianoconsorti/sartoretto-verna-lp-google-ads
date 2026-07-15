import React from 'react';
import { ArrowDownRight, MoveRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionId } from '../types';

interface HeroBlockProps {
  title: string;
  subtitle: string;
  description: string;
  imageSeed: number;
  color: string;
  formValue: string;
  onClick: (val: string) => void;
  index: number;
}

const HeroBlock: React.FC<HeroBlockProps> = ({ 
  title, subtitle, description, imageSeed, color, formValue, onClick, index 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      className="relative w-full md:w-1/3 min-h-[50vh] md:min-h-screen border-b md:border-b-0 md:border-r border-white/20 overflow-hidden cursor-pointer group"
      onClick={() => onClick(formValue)}
    >
      {/* Background Image - Static Cover */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url(https://picsum.photos/seed/${imageSeed}/1200/1600)` }}
      />
      
      {/* Dark Overlay - Kept dark to ensure white text pops */}
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />
      
      {/* Color Overlay - High saturation for that "Pop" effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-90 mix-blend-multiply transition-opacity duration-300"
        style={{ backgroundColor: color }}
      />

      {/* Content Container */}
      <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-10 pb-12">
        <div className="border-t border-white/50 pt-6 transition-transform duration-300 group-hover:-translate-y-2">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-mono tracking-widest uppercase bg-white text-black px-2 py-1 font-bold shadow-lg">
              {subtitle}
            </span>
            {/* Icon Rotation on Hover */}
            <div className="transition-transform duration-300 group-hover:rotate-0 -rotate-45 opacity-100">
              <ArrowDownRight size={32} className="text-white drop-shadow-md" />
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] mb-4 text-white drop-shadow-lg">
            {title}
          </h2>

          {/* Text Reveal - Simple Opacity/Height transition */}
          <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 overflow-hidden">
            <p className="text-sm md:text-lg font-medium leading-relaxed text-white mb-6 max-w-md drop-shadow-md">
              {description}
            </p>
            <div className="inline-flex items-center gap-3 bg-white text-black px-4 py-2 font-bold uppercase tracking-wider text-xs hover:bg-black hover:text-white transition-colors shadow-lg">
              Approfondisci <MoveRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface HeroGridProps {
  onSelectCategory: (category: string) => void;
}

const HeroGrid: React.FC<HeroGridProps> = ({ onSelectCategory }) => {
  const handleBlockClick = (category: string) => {
    onSelectCategory(category);
    document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' });
  };

  const blocks = [
    {
      title: "Nuova Apertura",
      subtitle: "Concept",
      description: "Dall'analisi del territorio al progetto architettonico. Creiamo un'identità unica per la tua nuova sede.",
      imageSeed: 101, // Architectural
      color: "#ccff00", // Acid Green
      formValue: "Nuova Apertura / Concorso"
    },
    {
      title: "Restyling",
      subtitle: "Update",
      description: "Rinnova l'immagine e ottimizza i flussi senza fermare l'attività. Massima resa estetica e funzionale.",
      imageSeed: 124, // Interior
      color: "#00ffff", // Cyan
      formValue: "Restyling Arredo"
    },
    {
      title: "Farmacia Servizi",
      subtitle: "Clinic",
      description: "Spazi consulenza, cabine e telemedicina. Trasforma la farmacia in un presidio sanitario evoluto.",
      imageSeed: 133, // Medical/Clean
      color: "#ff00ff", // Magenta
      formValue: "Farmacia dei Servizi"
    }
  ];

  return (
    <section id={SectionId.HERO} className="relative w-full bg-slate-900 flex flex-col md:min-h-screen">
      
      {/* HEADER STATIC OVERLAY */}
      <div className="relative w-full pt-32 pb-12 md:absolute md:top-0 md:left-0 md:h-screen flex flex-col items-center justify-center pointer-events-none z-20 px-6">
         <div className="text-center md:mb-[30vh]">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mb-4 drop-shadow-2xl"
            >
              L'Evoluzione della<br/>
              <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '2px #ccff00' }}>Farmacia.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-2xl text-white font-light uppercase tracking-widest max-w-2xl mx-auto drop-shadow-lg bg-black/60 backdrop-blur-sm p-2 px-4"
            >
              Architettura, Design e Strategia.
            </motion.p>
         </div>
         
         <div className="mt-8 flex flex-col items-center animate-bounce opacity-80 md:hidden text-white">
            <span className="text-xs uppercase tracking-widest mb-2">Scegli il tuo obiettivo</span>
            <ChevronDown />
         </div>
      </div>

      {/* STATIC COLUMNS LAYOUT - Easy to replicate in WP (3 Column Section) */}
      <div className="flex flex-col md:flex-row h-full w-full flex-grow">
        {blocks.map((block, index) => (
          <HeroBlock
            key={index}
            index={index}
            {...block}
            onClick={handleBlockClick}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroGrid;