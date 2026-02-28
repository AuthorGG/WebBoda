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
    id: "onsen-relax",
    kind: "withCost",
    title: "Onsen y relax",
    subtitle: "Baño termal tradicional",
    description:
      "Una tarde de desconexión total en un onsen para recargar energía.",
    totalCost: 90,
    progressPct: 0,
    tags: ["Relax"],
  },
  {
    id: "ryokan-night",
    kind: "withCost",
    title: "Una noche en ryokan",
    subtitle: "Alojamiento tradicional",
    description:
      "Dormir en un ryokan con tatami y desayuno tradicional. Plan romántico total.",
    totalCost: 220,
    progressPct: 0,
    tags: ["Alojamiento"],
  },
  {
    id: "shinkansen-ride",
    kind: "withCost",
    title: "Viaje en Shinkansen",
    subtitle: "Tren bala 🚄",
    description:
      "Un trayecto en tren bala para movernos entre ciudades con estilo.",
    totalCost: 160,
    progressPct: 0,
    tags: ["Transporte"],
  },
];
