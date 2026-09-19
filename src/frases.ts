import frases from './data/frases.json';

export type Frase = { id: number; texto: string };

export const todasAsFrases: Frase[] = frases;

const MS_POR_DIA = 86_400_000;

// A mesma data sempre devolve a mesma frase, então todo mundo vê a mesma "frase do dia".
export function fraseDoDia(data: Date = new Date()): Frase {
  const dias = Math.floor(
    Date.UTC(data.getFullYear(), data.getMonth(), data.getDate()) / MS_POR_DIA,
  );
  return todasAsFrases[dias % todasAsFrases.length];
}

// Sorteia uma frase, evitando repetir a que já está na tela.
export function fraseAleatoria(excluirId?: number): Frase {
  const opcoes = todasAsFrases.filter((f) => f.id !== excluirId);
  return opcoes[Math.floor(Math.random() * opcoes.length)];
}
