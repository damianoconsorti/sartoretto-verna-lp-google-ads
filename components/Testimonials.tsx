import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

interface VideoItem {
  name: string;
  location: string;
  src: string;
  poster: string;
  accent: string;
}

const videos: VideoItem[] = [
  { name: 'Farmacia San Leo', location: 'Reggio Calabria (RC)', src: 'https://sv-it.b-cdn.net/Farmacia%20San%20Leo%20-%20%20intervista.mp4', poster: 'SAN-LEO.jpg', accent: '#00B5B5' },
  { name: 'Farmacia Zucca', location: 'Segrate (MI)', src: 'https://sv-it.b-cdn.net/zucca%20intervista.mp4', poster: 'ZUCCA.jpg', accent: '#CCFF00' },
  { name: 'Farmacia Sundas', location: 'Senorbì (CA)', src: 'https://sv-it.b-cdn.net/intervista%20Sundas.mp4', poster: 'SUNDAS.jpg', accent: '#CC00FF' },
  { name: 'Antica Farmacia Berardelli', location: 'Cosenza (CS)', src: 'https://sv-it.b-cdn.net/Intervista%20Berardelli_verticale.mov', poster: 'BERARDELLI.jpg', accent: '#CCFF00' },
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
      className="relative overflow-hidden bg-black flex flex-col"
    >
      <div className="h-[3px] w-full shrink-0" style={{ background: video.accent }} />
      <div className="relative w-full aspect-[9/16]">
        <video
          ref={videoRef}
          src={sourceEnabled ? video.src : undefined}
          poster={video.poster}
          className="absolute inset-0 w-full h-full object-cover"
          controls={playing}
          preload="none"
          playsInline
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          aria-label={`Video testimonianza ${video.name}`}
        />

        <div className="absolute top-0 left-0 right-0 z-20 px-3 md:px-4 pt-4 pb-8 pointer-events-none bg-gradient-to-b from-black/80 to-transparent">
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase font-semibold mb-1" style={{ color: video.accent }}>{video.location}</p>
          <h3 className="font-display text-white uppercase leading-none text-base md:text-lg">{video.name}</h3>
        </div>

        {!playing && (
          <button
            type="button"
            onClick={handlePlay}
            aria-label={`Riproduci la testimonianza di ${video.name}`}
            className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer bg-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white group/play"
          >
            <span className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200 group-hover/play:scale-105 shadow-lg" style={{ background: video.accent }}>
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" aria-hidden="true"><path d="M1 1L17 10L1 19V1Z" fill="#0a0a0a" /></svg>
            </span>
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-[#0a0a0a] border-t border-white/10 py-20 md:py-32">
      <div className="px-6 md:px-14 lg:px-24">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }} className="mb-12">
          <p className="text-acid text-sm tracking-[0.4em] uppercase font-sans font-semibold mb-4">Testimonianze</p>
          <h2 className="font-display text-white uppercase leading-none" style={{ fontSize: 'clamp(2.4rem, 6vw, 6.5rem)' }}>
            Chi ha scelto<br /><span className="text-acid">di evolvere la farmacia.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {videos.map((video, index) => <VideoCard key={video.name} video={video} index={index} />)}
        </div>
      </div>
    </section>
  );
}
