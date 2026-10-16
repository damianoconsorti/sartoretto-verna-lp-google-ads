// Generato dalle foto in public/anteprima/. Ogni progetto: la prima foto è la copertina.
// Per ogni foto esistono due file: <id>-960.webp (miniatura) e <id>-1920.webp (schermo intero).
export interface ProjectPhoto {
  id: string;
  width: number;
  height: number;
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
      { id: 'lezzi-01', width: 1920, height: 1280 },
      { id: 'lezzi-02', width: 1920, height: 1273 },
      { id: 'lezzi-03', width: 1920, height: 1280 },
      { id: 'lezzi-04', width: 1920, height: 1280 },
      { id: 'lezzi-05', width: 1920, height: 1274 },
      { id: 'lezzi-06', width: 1920, height: 1279 },
      { id: 'lezzi-07', width: 1920, height: 1279 },
      { id: 'lezzi-08', width: 1920, height: 1280 },
      { id: 'lezzi-09', width: 1920, height: 1279 },
      { id: 'lezzi-10', width: 1920, height: 1279 },
    ],
  },
  {
    slug: 'pellicano',
    name: 'Farmacia Pellicano',
    photos: [
      { id: 'pellicano-01', width: 1920, height: 1280 },
      { id: 'pellicano-02', width: 1920, height: 1344 },
      { id: 'pellicano-03', width: 1920, height: 1374 },
      { id: 'pellicano-04', width: 1920, height: 1280 },
      { id: 'pellicano-05', width: 1920, height: 1309 },
      { id: 'pellicano-06', width: 1920, height: 1280 },
      { id: 'pellicano-07', width: 1920, height: 1134 },
      { id: 'pellicano-08', width: 1920, height: 1317 },
      { id: 'pellicano-09', width: 1920, height: 1280 },
    ],
  },
  {
    slug: 'sanleo',
    name: 'Farmacia San Leo',
    photos: [
      { id: 'sanleo-01', width: 1920, height: 1280 },
      { id: 'sanleo-02', width: 1600, height: 1073 },
      { id: 'sanleo-03', width: 1920, height: 909 },
      { id: 'sanleo-04', width: 1920, height: 1280 },
      { id: 'sanleo-05', width: 1920, height: 1282 },
      { id: 'sanleo-06', width: 1920, height: 1280 },
      { id: 'sanleo-07', width: 1600, height: 1073 },
      { id: 'sanleo-08', width: 1920, height: 1280 },
      { id: 'sanleo-09', width: 1920, height: 1280 },
      { id: 'sanleo-10', width: 1920, height: 1280 },
    ],
  },
  {
    slug: 'caputo',
    name: 'Farmacia Caputo',
    photos: [
      { id: 'caputo-01', width: 1920, height: 1280 },
      { id: 'caputo-02', width: 1920, height: 1280 },
      { id: 'caputo-03', width: 1920, height: 1280 },
      { id: 'caputo-04', width: 1920, height: 1280 },
      { id: 'caputo-05', width: 1920, height: 1280 },
      { id: 'caputo-06', width: 1920, height: 1280 },
      { id: 'caputo-07', width: 1920, height: 1280 },
      { id: 'caputo-08', width: 1920, height: 1280 },
      { id: 'caputo-09', width: 1920, height: 1280 },
      { id: 'caputo-10', width: 1920, height: 1280 },
    ],
  },
  {
    slug: 'berardelli',
    name: 'Antica Farmacia Berardelli',
    photos: [
      { id: 'berardelli-01', width: 1920, height: 1371 },
      { id: 'berardelli-02', width: 1920, height: 1371 },
      { id: 'berardelli-03', width: 1920, height: 1371 },
      { id: 'berardelli-04', width: 1920, height: 1371 },
      { id: 'berardelli-05', width: 1920, height: 1371 },
      { id: 'berardelli-06', width: 1920, height: 1371 },
      { id: 'berardelli-07', width: 1920, height: 1371 },
      { id: 'berardelli-08', width: 1920, height: 1371 },
      { id: 'berardelli-09', width: 1920, height: 1371 },
    ],
  },
  {
    slug: 'appio',
    name: 'Farmacia Appio Latino',
    photos: [
      { id: 'appio-01', width: 1920, height: 1371 },
      { id: 'appio-02', width: 1920, height: 1371 },
      { id: 'appio-03', width: 1920, height: 1339 },
      { id: 'appio-04', width: 1920, height: 1371 },
      { id: 'appio-05', width: 1920, height: 1371 },
      { id: 'appio-06', width: 1920, height: 1371 },
      { id: 'appio-07', width: 1920, height: 1371 },
      { id: 'appio-08', width: 1920, height: 1371 },
      { id: 'appio-09', width: 1920, height: 1371 },
    ],
  },
  {
    slug: 'bellini',
    name: 'Farmacia Bellini',
    photos: [
      { id: 'bellini-01', width: 1920, height: 1280 },
      { id: 'bellini-02', width: 1920, height: 1280 },
      { id: 'bellini-03', width: 1920, height: 1280 },
      { id: 'bellini-04', width: 4252, height: 2835 },
      { id: 'bellini-05', width: 1920, height: 1280 },
      { id: 'bellini-06', width: 1920, height: 1280 },
      { id: 'bellini-07', width: 1920, height: 1280 },
      { id: 'bellini-08', width: 1920, height: 1280 },
      { id: 'bellini-09', width: 1920, height: 1280 },
      { id: 'bellini-10', width: 1920, height: 1280 },
    ],
  },
  {
    slug: 'zucca',
    name: 'Farmacia Zucca',
    photos: [
      { id: 'zucca-01', width: 1920, height: 1282 },
      { id: 'zucca-02', width: 1920, height: 1282 },
      { id: 'zucca-03', width: 1920, height: 1282 },
      { id: 'zucca-04', width: 1920, height: 1282 },
      { id: 'zucca-05', width: 1920, height: 1282 },
      { id: 'zucca-06', width: 1920, height: 1282 },
      { id: 'zucca-07', width: 1920, height: 1282 },
      { id: 'zucca-08', width: 1920, height: 1282 },
      { id: 'zucca-09', width: 1920, height: 1282 },
      { id: 'zucca-10', width: 1920, height: 1282 },
    ],
  },
];

export const photoSrc = (id: string, size: 960 | 1920) => `anteprima/${id}-${size}.webp`;
