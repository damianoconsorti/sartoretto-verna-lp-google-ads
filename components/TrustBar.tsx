import React from 'react';

const items = [
  'Restyling', 'Ristrutturazione', 'Ampliamento', 'Nuova apertura',
  'Trasferimento', 'Arredamento', 'Progettazione', 'Consulenza strategica',
  'Installazione', 'Produzione italiana', 'Design', 'Identità visiva',
  'Benessere', 'Unicità', 'Relazione',
];

const doubled = [...items, ...items];

export default function TrustBar() {
  return (
    <div className="bg-acid overflow-hidden py-4">
      <div className="marquee-wrapper">
        <div className="marquee-track flex items-center gap-0 w-max">
          {doubled.map((item, i) => (
            <span key={i} className="flex items-center shrink-0">
              <span
                className="font-display text-dark uppercase whitespace-nowrap tracking-wide"
                style={{ fontSize: 'clamp(1.35rem, 2.2vw, 1.9rem)', padding: '0 2.5rem' }}
              >
                {item}
              </span>
              <span className="text-dark/50 select-none" style={{ fontSize: '1.1rem' }}>•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
