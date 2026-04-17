export type Elemento = 'Sangue' | 'Morte' | 'Conhecimento' | 'Energia' | 'Medo' | 'Nenhum';

export type TipoHabilidade = 'Classe' | 'Trilha' | 'Poder de Classe' | 'Poder Paranormal' | 'Origem';

export interface RitualModificacoes {
  execucao?: string;
  alcance?: string;
  alvo?: string;
  duracao?: string;
  resistencia?: string;
}

export interface RitualVersao {
  tipo: 'Base' | 'Discente' | 'Verdadeira';
  custo: number;
  requisito?: string;
  descricao: string;
  modificacoes?: RitualModificacoes;
}

export interface Ritual {
  id: string;
  nome: string;
  elemento: Elemento[];
  circulo: 1 | 2 | 3 | 4;
  execucao: string;
  alcance: string;
  alvo: string;
  duracao: string;
  resistencia: string | null;
  referencia_pagina: string;
  fonte: string;
  descricao: string;
  versoes: RitualVersao[];
}

export interface Habilidade {
  id: string;
  nome: string;
  tipo: TipoHabilidade;
  categoria: string; // Ex: Combatente, Aniquilador, Sangue, Acadêmico
  custo?: string;
  requisito?: string;
  descricao: string;
  afinidade?: string;
  pericias?: string;
  itens_iniciais?: string;
  fonte: string;
  referencia_pagina: string;
}
