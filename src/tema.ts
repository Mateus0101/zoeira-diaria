// Identidade visual do app: cores, fontes e formas, num lugar só.
// A ideia é o adesivo de para-choque de caminhão: fundo azul liso, frase numa
// placa colorida com contorno de tinta e sombra dura (sem desfoque).

export const cores = {
  azul: '#1D46D1',
  papel: '#FFF9EC',
  tinta: '#17171C',
  amarelo: '#FFC93F',
  rosa: '#FF9EBB',
  menta: '#8FE3B0',
} as const;

export const fontes = {
  normal: 'BricolageGrotesque_400Regular',
  media: 'BricolageGrotesque_600SemiBold',
  forte: 'BricolageGrotesque_800ExtraBold',
} as const;

// Regra de formas: superfícies (placa, folha) têm cantos de 28; botões e chips são pílulas.
export const raios = {
  superficie: 28,
  pilula: 999,
} as const;
