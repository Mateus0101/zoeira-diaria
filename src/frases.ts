import zoeira from './data/zoeira.json';
import insultos from './data/insultos.json';
import desmotivacionais from './data/desmotivacionais.json';
import { cores } from './tema';

export type Frase = { id: number; texto: string };
export type Categoria = {
  id: string;
  nome: string;
  botao: string;
  cor: string;
  frases: Frase[];
};

export const categorias: Categoria[] = [
  { id: 'zoeira', nome: 'Zoeira', botao: 'Outra zoeira', cor: cores.amarelo, frases: zoeira },
  {
    id: 'insulto',
    nome: 'Insulto sutil',
    botao: 'Outro insulto',
    cor: cores.rosa,
    frases: insultos,
  },
  {
    id: 'desmotivacional',
    nome: 'Desmotivacional',
    botao: 'Outra desmotivação',
    cor: cores.menta,
    frases: desmotivacionais,
  },
];

const MS_POR_DIA = 86_400_000;

// A mesma data sempre devolve a mesma frase da categoria, então todo mundo vê a mesma "frase do dia".
export function fraseDoDia(categoria: Categoria, data: Date = new Date()): Frase {
  const dias = Math.floor(
    Date.UTC(data.getFullYear(), data.getMonth(), data.getDate()) / MS_POR_DIA,
  );
  return categoria.frases[dias % categoria.frases.length];
}

// Sorteia uma frase da categoria, evitando repetir a que já está na tela.
export function fraseAleatoria(categoria: Categoria, excluirId?: number): Frase {
  const opcoes = categoria.frases.filter((f) => f.id !== excluirId);
  return opcoes[Math.floor(Math.random() * opcoes.length)];
}
