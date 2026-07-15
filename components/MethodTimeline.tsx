import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    num: "01",
    title: "Analisi",
    desc: "Studio del territorio, della concorrenza e dei flussi di traffico. Definiamo il posizionamento strategico unico della tua farmacia."
  },
  {
    num: "02",
    title: "Strategia",
    desc: "Definizione del customer journey, delle categorie merceologiche performanti e del modello di servizio."
  },
  {
    num: "03",
    title: "Concept",
    desc: "Progettazione architettonica, layout distributivo e lighting design per massimizzare l'esperienza d'acquisto."
  },
  {
    num: "04",
    title: "Execution",
    desc: "Produzione arredi Made in Italy, gestione cantiere e installazione con tempi certi."
  },
  {
    num: "05",
    title: "Evoluzione",
    desc: "Monitoraggio delle performance post-apertura e adattamento continuo della comunicazione."
  }
];

const MethodTimeline: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-20 relative">
      {/* Static Line - Darker for dark bg */}
      <div className="hidden md:block absolute top-0 bottom-0 left-[8.33%] w-px bg-white/10" />
      
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {/* Mobile Layout */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="md:hidden col-span-1 border-l-2 border-sv-acid pl-6 pb-12 last:pb-0"
          >
            <span className="text-4xl font-black text-sv-acid block mb-2">{step.num}</span>
            <h3 className="text-2xl font-bold uppercase mb-2 text-white">{step.title}</h3>
            <p className="text-slate-400">{step.desc}</p>
          </motion.div>

          {/* Desktop Layout - Static Grid */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="hidden md:block col-span-2 text-right pr-12 relative group"
          >
            <span className="text-7xl font-black text-transparent stroke-text-light opacity-20 block group-hover:opacity-100 transition-opacity" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
              {step.num}
            </span>
             {/* Dot on the line */}
             <div className="absolute top-6 -right-[1.55rem] w-4 h-4 bg-zinc-900 border-4 border-sv-acid rounded-full" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="hidden md:block col-span-10 border-b border-white/10 pb-12 mb-12 last:border-0 last:mb-0"
          >
            <h3 className="text-4xl font-bold uppercase mb-4 text-white">{step.title}</h3>
            <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">{step.desc}</p>
          </motion.div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default MethodTimeline;