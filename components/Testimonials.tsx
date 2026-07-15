import React, { useRef, useState } from 'react';
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
  {
    name: 'Farmacia San Leo',
    location: 'Reggio Calabria (RC)',
    src: 'https://sv-it.b-cdn.net/Farmacia%20San%20Leo%20-%20%20intervista.mp4',
    poster: '/SAN-LEO.jpg',
    accent: '#00B5B5',
  },
  {
    name: 'Farmacia Zucca',
    location: 'Segrate (MI)',
    src: 'https://sv-it.b-cdn.net/zucca%20intervista.mp4',
    poster: '/ZUCCA.jpg',
    accent: '#CCFF00',
  },
  {
    name: 'Farmacia Sundas',
    location: 'Senorbì (CA)',
    src: 'https://sv-it.b-cdn.net/intervista%20Sundas.mp4',
    poster: '/SUNDAS.jpg',
    accent: '#CC00FF',
  },
  {
    name: 'Antica Farmacia Berardelli',
    location: 'Cosenza (CS)',
    src: 'https://sv-it.b-cdn.net/Intervista%20Berardelli_verticale.mov',
    poster: '/BERARDELLI.jpg',
    accent: '#CCFF00',
  },
];

const VideoCard: React.FC<{ video: VideoItem; index: number }> = ({ video, index }) => {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    ref.current?.play();
    setPlaying(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease, delay: index * 0.1 }}
      className="relative overflow-hidden bg-black flex flex-col"
    >
      {/* Accent bar top */}
      <div className="h-[3px] w-full shrink-0" style={{ background: video.accent }} />

      {/* Video container — proporzione portrait 9:16 */}
      <div className="relative w-full" style={{ aspectRatio: '9/16' }}>
        <video
          ref={ref}
          src={video.src}
          poster={video.poster}
          className="absolute inset-0 w-full h-full object-cover"
          controls={playing}
          preload="metadata"
          playsInline
        />

        {/* Nome farmacia — sempre visibile in cima, sopra tutto */}
        <div
          className="absolute top-0 left-0 right-0 z-30 px-4 pt-4 pb-6"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, transparent 100%)' }}
        >
          <p
            className="font-sans text-[10px] tracking-[0.28em] uppercase font-semibold mb-0.5"
            style={{ color: video.accent }}
          >
            {video.location}
          </p>
          <h3 className="font-display text-white uppercase leading-none text-base md:text-lg">
            {video.name}
          </h3>
        </div>

        {/* Play overlay — solo prima del play */}
        {!playing && (
          <div
            className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer group/play"
            style={{ background: 'rgba(0,0,0,0.28)' }}
            onClick={handlePlay}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200 group-hover/play:scale-110 shadow-lg"
              style={{ background: video.accent }}
            >
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" aria-hidden="true">
                <path d="M1 1L17 10L1 19V1Z" fill="#0a0a0a" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function Testimonials() {
  return (
    <section className="bg-[#0a0a0a] border-t border-white/10 py-20 md:py-32">
      <div className="px-6 md:px-14 lg:px-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-12"
        >
          <p className="text-acid text-sm tracking-[0.4em] uppercase font-sans font-semibold mb-4">
            Testimonianze
          </p>
          <h2
            className="font-display text-white uppercase leading-none"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 6.5rem)' }}
          >
            Chi ha già scelto<br />
            <span className="text-acid">di vendere di più.</span>
          </h2>
        </motion.div>

        {/* 4 video verticali — gap 10px */}
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: '10px' }}>
          {videos.map((v, i) => (
            <VideoCard key={v.name} video={v} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
