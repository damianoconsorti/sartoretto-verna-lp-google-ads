import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

interface VideoItem {
  name: string;
  /** Città della farmacia. */
  location?: string;
  src: string;
  poster: string;
  /** Nome del titolare, mostrato in alto sulla copertina (solo se noto). */
  owner?: string;
  /** Frase breve (una riga) presa dal parlato del video, sotto il nome della farmacia. */
  tagline: string;
  /** Sottotitoli in italiano (WebVTT), accesi di default e disattivabili dal lettore. */
  subtitles: string;
}

// Copertine con il volto di chi parla (fotogrammi dei video), con il nome del titolare in alto.
const videos: VideoItem[] = [
  { name: 'Farmacia San Leo', location: 'Reggio Calabria (RC)', src: 'https://sv-it.b-cdn.net/Farmacia%20San%20Leo%20-%20%20intervista.mp4', poster: 'anteprima/testimonianza-sanleo.webp', owner: 'D.ssa Flavia Pellicanò', tagline: 'Una seconda casa', subtitles: 'sottotitoli/sanleo.vtt' },
  { name: 'Farmacia Zucca', location: 'Segrate (MI)', src: 'https://sv-it.b-cdn.net/zucca%20intervista.mp4', poster: 'anteprima/testimonianza-zucca.webp', owner: 'D.ssa Sara Zucca', tagline: 'Più luminosa, più accogliente', subtitles: 'sottotitoli/zucca.vtt' },
  { name: 'Farmacia Sundas', location: 'Senorbì (CA)', src: 'https://sv-it.b-cdn.net/intervista%20Sundas.mp4', poster: 'anteprima/testimonianza-sundas.webp', owner: 'Dott. Mattia Sundas', tagline: 'Il farmacista al centro', subtitles: 'sottotitoli/sundas.vtt' },
  { name: 'Antica Farmacia Berardelli', location: 'Cosenza (CS)', src: 'https://sv-it.b-cdn.net/Intervista%20Berardelli_verticale.mov', poster: 'anteprima/testimonianza-berardelli.webp', owner: 'D.ssa Roberta D’Angelo', tagline: 'Bellezza, funzionalità e luce', subtitles: 'sottotitoli/berardelli.vtt' },
  { name: 'Farmacie Marzoli', location: 'Roma (RM)', src: 'https://sv-it.b-cdn.net/marzoli%20int%202.mp4', poster: 'anteprima/testimonianza-marzoli.webp', owner: 'D.ssa Francesca Marzoli', tagline: 'Il salotto della salute', subtitles: 'sottotitoli/marzoli.vtt' },
];

function VideoCard({ video, index }: { video: VideoItem; index: number; key?: React.Key }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [sourceEnabled, setSourceEnabled] = useState(false);
  const [playRequested, setPlayRequested] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSourceEnabled(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px', threshold: 0.01 },
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playRequested || !sourceEnabled || !videoRef.current) return;
    videoRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [playRequested, sourceEnabled]);

  function handlePlay() {
    setSourceEnabled(true);
    setPlayRequested(true);
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease, delay: index * 0.1 }}
      className="relative w-[72vw] max-w-[320px] shrink-0 snap-start overflow-hidden bg-[#ece9e3] [container-type:inline-size] md:w-auto md:max-w-none"
    >
      <div className="relative aspect-[9/16] w-full">
        <video
          ref={videoRef}
          src={sourceEnabled ? video.src : undefined}
          poster={video.poster}
          className="absolute inset-0 h-full w-full object-cover"
          controls={playing}
          preload="none"
          playsInline
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          aria-label={`Video testimonianza ${video.name}`}
        >
          <track kind="subtitles" srcLang="it" label="Italiano" src={video.subtitles} default />
        </video>

        {!playing && (
          <>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 to-transparent" />
            {video.owner && (
              <>
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/65 to-transparent" />
                <div className="pointer-events-none absolute inset-x-4 top-4 z-20 md:inset-x-5 md:top-5">
                  <p className="overflow-hidden text-ellipsis whitespace-nowrap font-sans font-bold uppercase tracking-[0.12em] text-white" style={{ fontSize: 'clamp(9px, calc((100cqw - 40px) / 19), 12px)' }}>{video.owner}</p>
                  {/* Citazione dal video: corsivo con virgolette caporali in verde acido; una riga sola, il corpo si adatta alla scheda (container query) */}
                  <q className="mt-1.5 block overflow-hidden text-ellipsis whitespace-nowrap font-sans font-normal italic text-white [quotes:'«'_'»'] before:mr-px before:content-[open-quote] after:content-[close-quote] before:font-bold before:not-italic before:text-acid after:ml-px after:font-bold after:not-italic after:text-acid" style={{ fontSize: 'clamp(11px, calc((100cqw - 40px) / 16), 14.5px)' }}>{video.tagline}</q>
                </div>
              </>
            )}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-4 md:p-5">
              {video.location && <p className="mb-1 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/80">{video.location}</p>}
              <h3 className="font-display text-lg uppercase leading-none text-white md:text-xl">{video.name}</h3>
            </div>
            <button
              type="button"
              onClick={handlePlay}
              aria-label={`Riproduci la testimonianza di ${video.name}`}
              className="group/play absolute inset-0 z-10 flex cursor-pointer items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-transform duration-200 group-hover/play:scale-105">
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" aria-hidden="true" className="ml-1">
                  <path d="M1 1L17 10L1 19V1Z" fill="#0b0b0a" />
                </svg>
              </span>
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default function TestimonialsV2() {
  return (
    <section className="bg-white py-16 md:py-28">
      <div className="px-6 md:px-14 lg:px-24">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }} className="mb-10 md:mb-14">
          <p className="mb-4 font-sans text-sm font-semibold uppercase tracking-[0.34em] text-[#7a7a76]">Testimonianze</p>
          <h2 className="font-display uppercase leading-[1.02] text-[#0b0b0a]" style={{ fontSize: 'clamp(2.3rem, 5.6vw, 5.5rem)' }}>
            Farmacisti che hanno<br />scelto di evolvere
          </h2>
        </motion.div>

        <div className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-5">
          {videos.map((video, index) => (
            <VideoCard key={video.name} video={video} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
