export type GiftExperienceBase = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  tags?: string[];
};

/**
 * Experiencia con coste (tiene barra de progreso).
 * progressPct: 0..100 (manual)
 */
export type GiftExperienceWithCost = GiftExperienceBase & {
  kind: "withCost";
  totalCost: number;
  progressPct: number;
};

/**
 * Experiencia sin coste (aportación libre).
 * No hay barra ni coste total.
 */
export type GiftExperienceFree = GiftExperienceBase & {
  kind: "free";
};

export type GiftExperience = GiftExperienceWithCost | GiftExperienceFree;

export const giftsExperiences: GiftExperience[] = [
  {
    id: "free-contribution",
    kind: "free",
    title: "Aportación libre",
    subtitle: "Lo que te apetezca, para lo que sea",
    description:
      "Si prefieres aportar de forma libre, cualquier ayuda nos viene genial para la luna de miel o futuros planes. La aportación es completamente voluntaria.",
    tags: ["Libre", "Gracias 🤍"],
  },
  {
    id: "tokyo-sushi-night",
    kind: "withCost",
    title: "Noche de sushi en Tokio",
    subtitle: "Cena especial para celebrar",
    description:
      "Una cena de sushi inolvidable para brindar por este nuevo capítulo.",
    totalCost: 120,
    progressPct: 0,
    tags: ["Comida", "Tokio"],
  },
  {
    id: "tour-fuji-hakone",
    kind: "withCost",
    title: "Tour en Jeep al Monte Fuji y Hakone!",
    subtitle: "tour en Jeep de dia completo",
    description:
      "Un tour en Jeep de dia completo en el Monte Fuji y Hakone, con vistas panorámicas de la montaña y de la ciudad de Tokio.",
    totalCost: 350,
    progressPct: 0,
    tags: ["Aventura", "Transporte"],
  },
  {
    id: "tour-alpes-japoneses",
    kind: "withCost",
    title: "Alpes Japoneses",
    subtitle: "Desde El Moralet hasta Shirakawa-go!",
    description:
      "Conoceremos la tradición histórica, la cultura y la arquitectura de Japón en esta excursión de un día a los pueblos de Gujo, Hida Takayama y Shirakawa-go.",
    totalCost: 150,
    progressPct: 0,
    tags: ["excursión"],
  },
  {
    id: "team-lab-tickets",
    kind: "withCost",
    title: "Entradas a Team Lab",
    subtitle: "Visita al museo de Team Labs Tokyo",
    description:
      "Visita al museo de Team Lab Tokyo, un museo donde caminas sobre el agua, creado por el colectivo artístico teamLab.",
    totalCost: 80,
    progressPct: 0,
    tags: ["Experiencias"],
  },
  {
    id: "visita-nikko",
    kind: "withCost",
    title: "Excursión a Nikko",
    subtitle: "Una aventura que no olvidaremos",
    description:
      "En esta excursión a Nikko desde Tokio visitaremos sus principales tesoros, entre los que destacan el Templo Toshogu, la cascada de Kegon y el lago Chuzenji.",
    totalCost: 218.3,
    progressPct: 0,
    tags: ["Excursion", "Nikko", "Tokio"],
  },
  {
    id: "visita-kamakura",
    kind: "withCost",
    title: "Excursión a Kamakura",
    subtitle: "Santuarios budistas repletos de leyendas! 🤍",
    description:
      " exploraremos esta ciudad que fue centro político del Japón medieval.",
    totalCost: 190,
    progressPct: 0,
    tags: ["Excursion", "Nikko", "Tokio"],
  },
];
