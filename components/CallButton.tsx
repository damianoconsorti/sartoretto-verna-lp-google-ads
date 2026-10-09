import React from 'react';
import { Phone } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_HOURS, PHONE_TEL } from '../lib/contact';
import { CallLocation, trackClickToCall } from '../lib/events';

const tones = {
  dark: 'border-acid text-acid hover:bg-acid hover:text-dark focus-visible:ring-white',
  light: 'border-[#0a0a0a] text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white focus-visible:ring-teal',
} as const;

interface CallButtonProps {
  location: CallLocation;
  tone: keyof typeof tones;
  className?: string;
}

export default function CallButton({ location, tone, className = '' }: CallButtonProps) {
  return (
    <a
      href={`tel:${PHONE_TEL}`}
      onClick={() => trackClickToCall(location)}
      className={`min-h-11 inline-flex items-center justify-center gap-3 border px-5 py-2 font-sans transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 ${tones[tone]} ${className}`}
    >
      <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span className="flex flex-col text-left leading-tight">
        <span className="text-sm font-bold tracking-[0.08em] uppercase">Chiama {PHONE_DISPLAY}</span>
        <span className="text-xs font-normal opacity-80">{PHONE_HOURS}</span>
      </span>
    </a>
  );
}
