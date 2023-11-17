import type { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

export interface Card {
  id?: string;
  apiId: string;
  name: string;
  value: number;
  image: string;
}

export type CardApi = PokemonTCG.Card;
