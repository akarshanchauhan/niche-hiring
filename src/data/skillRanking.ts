export type FactorType = 'skill' | 'qualification' | 'evidence';

export interface RankableFactor {
  id: string;
  name: string;
  type: FactorType;
  group: 'must-have' | 'nice-to-have';
  rank: number;
  isAiSuggested: boolean;
  weightBonus: number; // contribution to fit calculation
}

export const INITIAL_RANKABLE_FACTORS: RankableFactor[] = [
  // Must Have Factors
  {
    id: 'f-1',
    name: 'Econometrics',
    type: 'skill',
    group: 'must-have',
    rank: 1,
    isAiSuggested: true,
    weightBonus: 28,
  },
  {
    id: 'f-2',
    name: 'Time-series modelling',
    type: 'skill',
    group: 'must-have',
    rank: 2,
    isAiSuggested: true,
    weightBonus: 24,
  },
  {
    id: 'f-3',
    name: 'Climate and weather data',
    type: 'skill',
    group: 'must-have',
    rank: 3,
    isAiSuggested: true,
    weightBonus: 20,
  },
  {
    id: 'f-4',
    name: 'Spatial statistics',
    type: 'skill',
    group: 'must-have',
    rank: 4,
    isAiSuggested: true,
    weightBonus: 16,
  },
  // Nice to Have Factors
  {
    id: 'f-5',
    name: 'Forecasting',
    type: 'skill',
    group: 'nice-to-have',
    rank: 5,
    isAiSuggested: true,
    weightBonus: 8,
  },
  {
    id: 'f-6',
    name: 'Communicating uncertainty',
    type: 'skill',
    group: 'nice-to-have',
    rank: 6,
    isAiSuggested: true,
    weightBonus: 4,
  },
  // Additional factors available to add or promote
  {
    id: 'f-7',
    name: 'Graduate degree in quantitative discipline',
    type: 'qualification',
    group: 'must-have',
    rank: 7,
    isAiSuggested: false,
    weightBonus: 12,
  },
  {
    id: 'f-8',
    name: 'Peer-reviewed publications in climate economics',
    type: 'evidence',
    group: 'nice-to-have',
    rank: 8,
    isAiSuggested: false,
    weightBonus: 6,
  },
  {
    id: 'f-9',
    name: 'Public reproducible codebase / open repository',
    type: 'evidence',
    group: 'nice-to-have',
    rank: 9,
    isAiSuggested: false,
    weightBonus: 6,
  },
];
