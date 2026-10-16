// Generato dalle foto in public/anteprima/. Solo arredi e sale servizi, senza persone. La prima foto è la copertina.
// Per ogni foto: <id>-960.webp (miniatura) e <id>-1920.webp (schermo intero).
export type PhotoKind = 'arredi' | 'servizi';

export interface ProjectPhoto {
  id: string;
  width: number;
  height: number;
  kind: PhotoKind;
}

export interface ProjectEntry {
  slug: string;
  name: string;
  photos: ProjectPhoto[];
}

export const projects: ProjectEntry[] = [
  {
    slug: 'lezzi',
    name: 'Farmacia Lezzi',
    photos: [
      { id: 'lezzi-01', width: 1920, height: 1280, kind: 'arredi' },
      { id: 'lezzi-02', width: 1920, height: 1279, kind: 'servizi' },
      { id: 'lezzi-03', width: 1920, height: 1279, kind: 'arredi' },
      { id: 'lezzi-04', width: 1920, height: 1280, kind: 'servizi' },
      { id: 'lezzi-05', width: 1920, height: 1280, kind: 'arredi' },
      { id: 'lezzi-06', width: 1920, height: 1279, kind: 'servizi' },
      { id: 'lezzi-07', width: 1920, height: 1280, kind: 'servizi' },
    ],
  },
  {
    slug: 'pellicano',
    name: 'Farmacia Pellicano',
    photos: [
      { id: 'pellicano-01', width: 1920, height: 1134, kind: 'arredi' },
      { id: 'pellicano-02', width: 1920, height: 1280, kind: 'servizi' },
      { id: 'pellicano-03', width: 1920, height: 1280, kind: 'arredi' },
      { id: 'pellicano-04', width: 1920, height: 1280, kind: 'arredi' },
    ],
  },
  {
    slug: 'sanleo',
    name: 'Farmacia San Leo',
    photos: [
      { id: 'sanleo-01', width: 1920, height: 1280, kind: 'arredi' },
      { id: 'sanleo-02', width: 1920, height: 909, kind: 'arredi' },
      { id: 'sanleo-03', width: 1920, height: 1282, kind: 'arredi' },
      { id: 'sanleo-04', width: 1920, height: 1280, kind: 'arredi' },
      { id: 'sanleo-05', width: 1600, height: 1073, kind: 'arredi' },
    ],
  },
  {
    slug: 'caputo',
    name: 'Farmacia Caputo',
    photos: [
      { id: 'caputo-01', width: 1920, height: 1280, kind: 'arredi' },
      { id: 'caputo-02', width: 1920, height: 1280, kind: 'servizi' },
      { id: 'caputo-03', width: 1920, height: 1280, kind: 'arredi' },
      { id: 'caputo-04', width: 1920, height: 1280, kind: 'arredi' },
    ],
  },
  {
    slug: 'berardelli',
    name: 'Antica Farmacia Berardelli',
    photos: [
      { id: 'berardelli-01', width: 1920, height: 1371, kind: 'arredi' },
      { id: 'berardelli-02', width: 1920, height: 1371, kind: 'servizi' },
      { id: 'berardelli-03', width: 1920, height: 1371, kind: 'arredi' },
      { id: 'berardelli-04', width: 1920, height: 1371, kind: 'servizi' },
      { id: 'berardelli-05', width: 1920, height: 1371, kind: 'arredi' },
    ],
  },
  {
    slug: 'appio',
    name: 'Farmacia Appio Latino',
    photos: [
      { id: 'appio-01', width: 1920, height: 1371, kind: 'arredi' },
      { id: 'appio-02', width: 1920, height: 1371, kind: 'servizi' },
      { id: 'appio-03', width: 1920, height: 1371, kind: 'arredi' },
      { id: 'appio-04', width: 1920, height: 1371, kind: 'arredi' },
      { id: 'appio-05', width: 1920, height: 1371, kind: 'arredi' },
    ],
  },
  {
    slug: 'bellini',
    name: 'Farmacia Bellini',
    photos: [
      { id: 'bellini-01', width: 1920, height: 1280, kind: 'arredi' },
      { id: 'bellini-02', width: 1920, height: 1280, kind: 'servizi' },
      { id: 'bellini-03', width: 1920, height: 1280, kind: 'arredi' },
      { id: 'bellini-04', width: 1920, height: 1280, kind: 'arredi' },
      { id: 'bellini-05', width: 1920, height: 1280, kind: 'arredi' },
      { id: 'bellini-06', width: 1920, height: 1280, kind: 'arredi' },
      { id: 'bellini-07', width: 1920, height: 1280, kind: 'arredi' },
    ],
  },
  {
    slug: 'zucca',
    name: 'Farmacia Zucca',
    photos: [
      { id: 'zucca-01', width: 1920, height: 1282, kind: 'arredi' },
      { id: 'zucca-02', width: 1920, height: 1282, kind: 'servizi' },
      { id: 'zucca-03', width: 1920, height: 1282, kind: 'arredi' },
      { id: 'zucca-04', width: 1920, height: 1282, kind: 'servizi' },
      { id: 'zucca-05', width: 1920, height: 1282, kind: 'arredi' },
      { id: 'zucca-06', width: 1920, height: 1282, kind: 'arredi' },
      { id: 'zucca-07', width: 1920, height: 1282, kind: 'arredi' },
    ],
  },
];

export const photoSrc = (id: string, size: 960 | 1920) => `anteprima/${id}-${size}.webp`;
