import React, { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_HOURS, PHONE_TEL } from '../lib/contact';
import { trackClickToCall } from '../lib/events';

export default function MobileStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targets = [document.getElementById('quick-form'), document.getElementById('contatti')].filter(Boolean) as HTMLElement[];
    if (!targets.length) return;

    const visibility = new Map(targets.map((target) => [target.id, false]));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visibility.set(entry.target.id, entry.isIntersecting);
        setVisible(!Array.from(visibility.values()).some(Boolean));
      },
      { threshold: 0.05 }
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-[90] bg-dark border-t border-white/10 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="grid grid-cols-[1fr_1fr] gap-px bg-white/10">
        <a
          href={`tel:${PHONE_TEL}`}
          onClick={() => trackClickToCall('sticky_bar')}
          aria-label={`Chiama ${PHONE_DISPLAY}, ${PHONE_HOURS}`}
          className="min-h-14 flex items-center justify-center gap-2 bg-white text-dark px-3 py-2 active:bg-acid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-acid transition-colors duration-150"
        >
          <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span className="flex flex-col leading-tight text-left">
            <span className="font-sans font-bold text-sm tracking-[0.08em] uppercase">Chiama</span>
            <span className="font-sans text-[10px] font-medium">{PHONE_HOURS}</span>
          </span>
        </a>
        <a
          href="#quick-form"
          className="min-h-14 flex items-center justify-center bg-acid text-dark px-3 py-2 text-center font-sans font-bold text-sm tracking-[0.08em] uppercase leading-tight active:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white transition-colors duration-150"
        >
          Richiedi consulenza
        </a>
      </div>
    </div>
  );
}
