import React from 'react';
import { COMMERCIAL_EMAIL } from '../lib/contact';

const tones = {
  dark: { text: 'text-white/70', link: 'underline underline-offset-2 hover:text-white focus-visible:ring-acid' },
  light: { text: 'text-[#666]', link: 'underline underline-offset-2 hover:text-[#222] focus-visible:ring-teal' },
} as const;

interface AudienceNoticeProps {
  tone: keyof typeof tones;
  className?: string;
}

// Qualificazione dei contatti: chi non gestisce una farmacia (fornitori, imprese) viene indirizzato all'email commerciale.
export default function AudienceNotice({ tone, className = '' }: AudienceNoticeProps) {
  const styles = tones[tone];
  return (
    <p className={`${styles.text} text-xs md:text-sm leading-relaxed ${className}`}>
      Riservato a farmacie e farmacisti. Per proposte commerciali scrivere a{' '}
      <a href={`mailto:${COMMERCIAL_EMAIL}`} className={`${styles.link} focus-visible:outline-none focus-visible:ring-2`}>
        {COMMERCIAL_EMAIL}
      </a>
      .
    </p>
  );
}
