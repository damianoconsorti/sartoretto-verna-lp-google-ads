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
}

// Copertine con il volto di chi parla (fotogrammi dei video), con il nome del titolare in alto.
const videos: VideoItem[] = [
  { name: 'Farmacia San Leo', location: 'Reggio Calabria (RC)', src: 'https://sv-it.b-cdn.net/Farmacia%20San%20Leo%20-%20%20intervista.mp4', poster: 'anteprima/testimonianza-sanleo.webp', owner: 'D.ssa Flavia Pellicanò' },
  { name: 'Farmacia Zucca', location: 'Segrate (MI)', src: 'https://sv-it.b-cdn.net/zucca%20intervista.mp4', poster: 'anteprima/testimonianza-zucca.webp', owner: 'D.ssa Sara Zucca' },
  { name: 'Farmacia Sundas', location: 'Senorbì (CA)', src: 'https://sv-it.b-cdn.net/intervista%20Sundas.mp4', poster: 'anteprima/testimonianza-sundas.webp', owner: 'Dott. Mattia Sundas' },
  { name: 'Antica Farmacia Berardelli', location: 'Cosenza (CS)', src: 'https://sv-it.b-cdn.net/Intervista%20Berardelli_verticale.mov', poster: 'anteprima/testimonianza-berardelli.webp', owner: 'D.ssa Roberta D’Angelo' },
  { name: 'Farmacie Marzoli', location: 'Roma (RM)', src: 'https://sv-it.b-cdn.net/marzoli%20int%202.mp4', poster: 'anteprima/testimonianza-marzoli.webp', owner: 'D.ssa Francesca Marzoli' },
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
      className="relative overflow-hidden bg-[#ece9e3] last:col-span-2 last:mx-auto last:w-1/2 md:last:col-span-1 md:last:w-full"
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
        />

        {!playing && (
          <>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 to-transparent" />
            {video.owner && (
              <>
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-black/55 to-transparent" />
                <p className="pointer-events-none absolute left-4 top-4 z-20 font-sans text-xs font-bold uppercase tracking-[0.2em] text-white md:left-5 md:top-5">{video.owner}</p>
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

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
          {videos.map((video, index) => (
            <VideoCard key={video.name} video={video} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
