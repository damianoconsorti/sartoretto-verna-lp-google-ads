import React from 'react';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

type IconProps = {
  className?: string;
};

const WhatsAppIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.51 0 .17 5.34.17 11.9c0 2.1.55 4.14 1.59 5.94L.07 24l6.31-1.65a11.9 11.9 0 0 0 5.69 1.45h.01c6.56 0 11.9-5.34 11.9-11.9a11.83 11.83 0 0 0-3.46-8.42Zm-8.44 18.3h-.01a9.88 9.88 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.38a9.86 9.86 0 0 1-1.51-5.24c0-5.45 4.44-9.89 9.9-9.89a9.83 9.83 0 0 1 6.99 2.9 9.83 9.83 0 0 1 2.89 7c-.01 5.43-4.45 9.87-9.89 9.87Zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.34Z" />
  </svg>
);

const TikTokIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
    <path d="M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03a10.7 10.7 0 0 1-4.2-.97 12.1 12.1 0 0 1-1.62-.93c-.01 2.92.01 5.84-.02 8.75a7.74 7.74 0 0 1-1.35 3.94A7.44 7.44 0 0 1 9.33 24a7.23 7.23 0 0 1-4.08-1.03 7.55 7.55 0 0 1-3.65-5.71c-.02-.5-.03-1-.01-1.49a7.5 7.5 0 0 1 2.58-4.96 7.33 7.33 0 0 1 6.15-1.72c.02 1.48-.04 2.96-.04 4.44a3.32 3.32 0 0 0-3.02.37 3.1 3.1 0 0 0-1.36 1.75c-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87a3.5 3.5 0 0 0 2.77-1.61c.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z" />
  </svg>
);

const socialLinks = [
  { label: 'WhatsApp', href: 'https://whatsapp.com/channel/0029Va95ZwrKGGGOSjeV1o0e', icon: WhatsAppIcon },
  { label: 'Facebook', href: 'http://www.facebook.com/pharmacy.design', icon: Facebook },
  { label: 'Instagram', href: 'https://www.instagram.com/sartorettoverna/', icon: Instagram },
  { label: 'LinkedIn', href: 'https://it.linkedin.com/company/sartoretto-verna', icon: Linkedin },
  { label: 'YouTube', href: 'https://www.youtube.com/user/SartorettoVernaSrl', icon: Youtube },
  { label: 'TikTok', href: 'https://www.tiktok.com/@sartorettoverna?_r=1&_t=ZN-95wMOkxkHkk', icon: TikTokIcon },
] as const;

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 py-8 px-8 md:px-14 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] md:items-center gap-6">
        <p className="order-3 md:order-1 text-center md:text-left text-white/30 text-sm font-sans">
          &copy; {new Date().getFullYear()} Sartoretto Verna S.R.L. &mdash; P.IVA 07291841008
        </p>

        <nav className="order-1 md:order-2 flex justify-center" aria-label="Canali social Sartoretto Verna">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
                className="group inline-flex h-11 w-11 items-center justify-center border border-white/15 text-white/55 transition-all duration-200 hover:-translate-y-0.5 hover:border-acid hover:bg-acid hover:text-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
              >
                <Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-105" />
              </a>
            ))}
          </div>
        </nav>

        <a href="#" className="order-2 md:order-3 justify-self-center md:justify-self-end text-white/30 text-sm font-sans hover:text-white/60 transition-colors cursor-pointer">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}
