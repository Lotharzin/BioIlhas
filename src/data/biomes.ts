export type Biome = {
  id: string;
  article: 'A' | 'O';
  name: string;
  region: string;
  area: string;
  species: string;
  emoji: string;
  color: string;
  description: string;
  lesson: string;
};

export const biomes: Biome[] = [
  {
    id: 'amazonia',
    article: 'A',
    name: 'Amazônia',
    region: 'Norte',
    area: '4,2 milhões km²',
    species: '40 mil espécies de plantas',
    emoji: '🌳',
    color: '#1db887',
    description: 'A maior floresta tropical do planeta, atravessada por rios gigantes e lar de uma biodiversidade extraordinária.',
    lesson: 'Floresta tropical e biodiversidade',
  },
  {
    id: 'cerrado',
    article: 'O',
    name: 'Cerrado',
    region: 'Centro-Oeste',
    area: '2 milhões km²',
    species: '12 mil espécies de plantas',
    emoji: '🌾',
    color: '#dfad53',
    description: 'A savana mais biodiversa do mundo, com árvores retorcidas, campos abertos e nascentes que alimentam grandes bacias.',
    lesson: 'Savanas, fogo e adaptação',
  },
  {
    id: 'caatinga',
    article: 'A',
    name: 'Caatinga',
    region: 'Nordeste',
    area: '844 mil km²',
    species: '178 espécies de mamíferos',
    emoji: '🌵',
    color: '#d58c56',
    description: 'Bioma exclusivamente brasileiro onde plantas e animais desenvolveram estratégias para viver com pouca água.',
    lesson: 'Vida e adaptação ao semiárido',
  },
  {
    id: 'mata-atlantica',
    article: 'A',
    name: 'Mata Atlântica',
    region: 'Costa brasileira',
    area: '1,1 milhão km²',
    species: '20 mil espécies de plantas',
    emoji: '🌿',
    color: '#49c88b',
    description: 'Uma floresta rica em espécies endêmicas que acompanha boa parte do litoral brasileiro e inspira ações de conservação.',
    lesson: 'Ecossistemas e biodiversidade',
  },
  {
    id: 'pantanal',
    article: 'O',
    name: 'Pantanal',
    region: 'Centro-Oeste',
    area: '150 mil km²',
    species: '656 espécies de aves',
    emoji: '🦜',
    color: '#53b9ca',
    description: 'A maior planície alagável tropical do mundo, transformada ao ritmo anual das cheias e vazantes.',
    lesson: 'Ciclos das águas e vida selvagem',
  },
  {
    id: 'pampa',
    article: 'O',
    name: 'Pampa',
    region: 'Sul',
    area: '193 mil km²',
    species: '3 mil espécies de plantas',
    emoji: '🌱',
    color: '#8abf70',
    description: 'Campos de horizonte aberto, gramíneas nativas e uma fauna adaptada às paisagens do extremo sul.',
    lesson: 'Campos, gramíneas e conservação',
  },
];
