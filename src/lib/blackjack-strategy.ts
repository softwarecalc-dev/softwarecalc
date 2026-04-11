// Blackjack basic strategy data with rule variations
// Based on standard Atlantic City rules (configurable)

import { BlackjackSettings } from '@/hooks/useBlackjackSettings';

export type Action = 'hit' | 'stand' | 'double' | 'split' | 'surrender';

export interface StrategyCell {
  action: Action;
  winRate: number;
}

export interface HandInfo {
  isPair: boolean;
  isSoft: boolean;
  value: number;
  cards: string[];
}

// Card values for calculating hand value
const CARD_VALUES: Record<string, number> = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
  'J': 10, 'Q': 10, 'K': 10, 'A': 11
};

// Calculate hand value
export function calculateHandValue(cards: string[]): { value: number; isSoft: boolean } {
  let value = 0;
  let aces = 0;

  for (const card of cards) {
    const rank = card.replace(/[♠♥♦♣]/g, '').replace(/s|h|d|c/g, '');
    if (rank === 'A') {
      aces++;
      value += 11;
    } else {
      value += CARD_VALUES[rank] || 10;
    }
  }

  while (value > 21 && aces > 0) {
    value -= 10;
    aces--;
  }

  return { value, isSoft: aces > 0 && value <= 21 };
}

// Check if hand is a pair
export function isPair(cards: string[]): boolean {
  if (cards.length !== 2) return false;
  const ranks = cards.map(c => c.replace(/[♠♥♦♣]/g, '').replace(/s|h|d|c/g, ''));
  return ranks[0] === ranks[1];
}

// Get the rank of a card
export function getCardRank(card: string): string {
  return card.replace(/[♠♥♦♣]/g, '').replace(/s|h|d|c/g, '');
}

// Strategy tables for dealer stands on soft 17 (standard)
const hardTotalsS17: Record<string, Record<number, StrategyCell>> = {
  '5': { 2: { action: 'hit', winRate: 36 }, 3: { action: 'hit', winRate: 37 }, 4: { action: 'hit', winRate: 38 }, 5: { action: 'hit', winRate: 39 }, 6: { action: 'hit', winRate: 40 }, 7: { action: 'hit', winRate: 42 }, 8: { action: 'hit', winRate: 46 }, 9: { action: 'hit', winRate: 50 }, 10: { action: 'hit', winRate: 53 }, 11: { action: 'double', winRate: 56 } },
  '6': { 2: { action: 'hit', winRate: 42 }, 3: { action: 'hit', winRate: 43 }, 4: { action: 'hit', winRate: 44 }, 5: { action: 'hit', winRate: 45 }, 6: { action: 'hit', winRate: 46 }, 7: { action: 'hit', winRate: 48 }, 8: { action: 'hit', winRate: 52 }, 9: { action: 'hit', winRate: 55 }, 10: { action: 'hit', winRate: 58 }, 11: { action: 'double', winRate: 59 } },
  '7': { 2: { action: 'hit', winRate: 47 }, 3: { action: 'hit', winRate: 48 }, 4: { action: 'hit', winRate: 49 }, 5: { action: 'hit', winRate: 50 }, 6: { action: 'hit', winRate: 51 }, 7: { action: 'hit', winRate: 54 }, 8: { action: 'hit', winRate: 57 }, 9: { action: 'hit', winRate: 60 }, 10: { action: 'hit', winRate: 64 }, 11: { action: 'hit', winRate: 63 } },
  '8': { 2: { action: 'hit', winRate: 52 }, 3: { action: 'hit', winRate: 53 }, 4: { action: 'hit', winRate: 54 }, 5: { action: 'hit', winRate: 55 }, 6: { action: 'hit', winRate: 56 }, 7: { action: 'hit', winRate: 58 }, 8: { action: 'hit', winRate: 61 }, 9: { action: 'hit', winRate: 64 }, 10: { action: 'hit', winRate: 67 }, 11: { action: 'hit', winRate: 68 } },
  '9': { 2: { action: 'double', winRate: 55 }, 3: { action: 'double', winRate: 57 }, 4: { action: 'double', winRate: 59 }, 5: { action: 'double', winRate: 61 }, 6: { action: 'double', winRate: 63 }, 7: { action: 'hit', winRate: 62 }, 8: { action: 'hit', winRate: 65 }, 9: { action: 'hit', winRate: 68 }, 10: { action: 'hit', winRate: 71 }, 11: { action: 'hit', winRate: 72 } },
  '10': { 2: { action: 'double', winRate: 59 }, 3: { action: 'double', winRate: 61 }, 4: { action: 'double', winRate: 63 }, 5: { action: 'double', winRate: 65 }, 6: { action: 'double', winRate: 67 }, 7: { action: 'double', winRate: 66 }, 8: { action: 'double', winRate: 69 }, 9: { action: 'double', winRate: 71 }, 10: { action: 'hit', winRate: 73 }, 11: { action: 'hit', winRate: 75 } },
  '11': { 2: { action: 'double', winRate: 63 }, 3: { action: 'double', winRate: 65 }, 4: { action: 'double', winRate: 67 }, 5: { action: 'double', winRate: 69 }, 6: { action: 'double', winRate: 71 }, 7: { action: 'double', winRate: 70 }, 8: { action: 'double', winRate: 73 }, 9: { action: 'double', winRate: 75 }, 10: { action: 'double', winRate: 77 }, 11: { action: 'double', winRate: 79 } },
  '12': { 2: { action: 'hit', winRate: 54 }, 3: { action: 'hit', winRate: 55 }, 4: { action: 'stand', winRate: 56 }, 5: { action: 'stand', winRate: 57 }, 6: { action: 'stand', winRate: 58 }, 7: { action: 'hit', winRate: 60 }, 8: { action: 'hit', winRate: 64 }, 9: { action: 'hit', winRate: 68 }, 10: { action: 'hit', winRate: 72 }, 11: { action: 'hit', winRate: 74 } },
  '13': { 2: { action: 'stand', winRate: 56 }, 3: { action: 'stand', winRate: 57 }, 4: { action: 'stand', winRate: 58 }, 5: { action: 'stand', winRate: 59 }, 6: { action: 'stand', winRate: 60 }, 7: { action: 'hit', winRate: 62 }, 8: { action: 'hit', winRate: 66 }, 9: { action: 'hit', winRate: 70 }, 10: { action: 'hit', winRate: 74 }, 11: { action: 'hit', winRate: 76 } },
  '14': { 2: { action: 'stand', winRate: 57 }, 3: { action: 'stand', winRate: 58 }, 4: { action: 'stand', winRate: 59 }, 5: { action: 'stand', winRate: 60 }, 6: { action: 'stand', winRate: 61 }, 7: { action: 'hit', winRate: 64 }, 8: { action: 'hit', winRate: 68 }, 9: { action: 'hit', winRate: 72 }, 10: { action: 'hit', winRate: 76 }, 11: { action: 'hit', winRate: 78 } },
  '15': { 2: { action: 'stand', winRate: 58 }, 3: { action: 'stand', winRate: 59 }, 4: { action: 'stand', winRate: 60 }, 5: { action: 'stand', winRate: 61 }, 6: { action: 'stand', winRate: 62 }, 7: { action: 'hit', winRate: 66 }, 8: { action: 'hit', winRate: 70 }, 9: { action: 'hit', winRate: 74 }, 10: { action: 'surrender', winRate: 70 }, 11: { action: 'hit', winRate: 80 } },
  '16': { 2: { action: 'stand', winRate: 59 }, 3: { action: 'stand', winRate: 60 }, 4: { action: 'stand', winRate: 61 }, 5: { action: 'stand', winRate: 62 }, 6: { action: 'stand', winRate: 63 }, 7: { action: 'hit', winRate: 68 }, 8: { action: 'hit', winRate: 72 }, 9: { action: 'surrender', winRate: 76 }, 10: { action: 'surrender', winRate: 78 }, 11: { action: 'surrender', winRate: 82 } },
  '17': { 2: { action: 'stand', winRate: 65 }, 3: { action: 'stand', winRate: 66 }, 4: { action: 'stand', winRate: 67 }, 5: { action: 'stand', winRate: 68 }, 6: { action: 'stand', winRate: 69 }, 7: { action: 'stand', winRate: 74 }, 8: { action: 'stand', winRate: 77 }, 9: { action: 'stand', winRate: 80 }, 10: { action: 'stand', winRate: 83 }, 11: { action: 'stand', winRate: 84 } },
  '18': { 2: { action: 'stand', winRate: 74 }, 3: { action: 'stand', winRate: 75 }, 4: { action: 'stand', winRate: 76 }, 5: { action: 'stand', winRate: 77 }, 6: { action: 'stand', winRate: 80 }, 7: { action: 'stand', winRate: 82 }, 8: { action: 'stand', winRate: 84 }, 9: { action: 'stand', winRate: 86 }, 10: { action: 'stand', winRate: 88 }, 11: { action: 'stand', winRate: 89 } },
  '19': { 2: { action: 'stand', winRate: 82 }, 3: { action: 'stand', winRate: 83 }, 4: { action: 'stand', winRate: 84 }, 5: { action: 'stand', winRate: 85 }, 6: { action: 'stand', winRate: 87 }, 7: { action: 'stand', winRate: 89 }, 8: { action: 'stand', winRate: 91 }, 9: { action: 'stand', winRate: 92 }, 10: { action: 'stand', winRate: 93 }, 11: { action: 'stand', winRate: 94 } },
  '20': { 2: { action: 'stand', winRate: 89 }, 3: { action: 'stand', winRate: 90 }, 4: { action: 'stand', winRate: 91 }, 5: { action: 'stand', winRate: 92 }, 6: { action: 'stand', winRate: 93 }, 7: { action: 'stand', winRate: 94 }, 8: { action: 'stand', winRate: 95 }, 9: { action: 'stand', winRate: 95 }, 10: { action: 'stand', winRate: 96 }, 11: { action: 'stand', winRate: 97 } },
  '21': { 2: { action: 'stand', winRate: 95 }, 3: { action: 'stand', winRate: 95 }, 4: { action: 'stand', winRate: 96 }, 5: { action: 'stand', winRate: 96 }, 6: { action: 'stand', winRate: 97 }, 7: { action: 'stand', winRate: 97 }, 8: { action: 'stand', winRate: 98 }, 9: { action: 'stand', winRate: 98 }, 10: { action: 'stand', winRate: 98 }, 11: { action: 'stand', winRate: 99 } },
};

// Strategy tables for dealer hits on soft 17
const hardTotalsH17: Record<string, Record<number, StrategyCell>> = {
  '5': { 2: { action: 'hit', winRate: 35 }, 3: { action: 'hit', winRate: 36 }, 4: { action: 'hit', winRate: 37 }, 5: { action: 'hit', winRate: 38 }, 6: { action: 'hit', winRate: 39 }, 7: { action: 'hit', winRate: 41 }, 8: { action: 'hit', winRate: 45 }, 9: { action: 'hit', winRate: 49 }, 10: { action: 'hit', winRate: 52 }, 11: { action: 'double', winRate: 55 } },
  '6': { 2: { action: 'hit', winRate: 41 }, 3: { action: 'hit', winRate: 42 }, 4: { action: 'hit', winRate: 43 }, 5: { action: 'hit', winRate: 44 }, 6: { action: 'hit', winRate: 45 }, 7: { action: 'hit', winRate: 47 }, 8: { action: 'hit', winRate: 51 }, 9: { action: 'hit', winRate: 54 }, 10: { action: 'hit', winRate: 57 }, 11: { action: 'double', winRate: 58 } },
  '7': { 2: { action: 'hit', winRate: 46 }, 3: { action: 'hit', winRate: 47 }, 4: { action: 'hit', winRate: 48 }, 5: { action: 'hit', winRate: 49 }, 6: { action: 'hit', winRate: 50 }, 7: { action: 'hit', winRate: 53 }, 8: { action: 'hit', winRate: 56 }, 9: { action: 'hit', winRate: 59 }, 10: { action: 'hit', winRate: 63 }, 11: { action: 'hit', winRate: 62 } },
  '8': { 2: { action: 'hit', winRate: 51 }, 3: { action: 'hit', winRate: 52 }, 4: { action: 'hit', winRate: 53 }, 5: { action: 'hit', winRate: 54 }, 6: { action: 'hit', winRate: 55 }, 7: { action: 'hit', winRate: 57 }, 8: { action: 'hit', winRate: 60 }, 9: { action: 'hit', winRate: 63 }, 10: { action: 'hit', winRate: 66 }, 11: { action: 'hit', winRate: 67 } },
  '9': { 2: { action: 'double', winRate: 54 }, 3: { action: 'double', winRate: 56 }, 4: { action: 'double', winRate: 58 }, 5: { action: 'double', winRate: 60 }, 6: { action: 'double', winRate: 62 }, 7: { action: 'hit', winRate: 61 }, 8: { action: 'hit', winRate: 64 }, 9: { action: 'hit', winRate: 67 }, 10: { action: 'hit', winRate: 70 }, 11: { action: 'hit', winRate: 71 } },
  '10': { 2: { action: 'double', winRate: 58 }, 3: { action: 'double', winRate: 60 }, 4: { action: 'double', winRate: 62 }, 5: { action: 'double', winRate: 64 }, 6: { action: 'double', winRate: 66 }, 7: { action: 'double', winRate: 65 }, 8: { action: 'double', winRate: 68 }, 9: { action: 'double', winRate: 70 }, 10: { action: 'hit', winRate: 72 }, 11: { action: 'hit', winRate: 74 } },
  '11': { 2: { action: 'double', winRate: 62 }, 3: { action: 'double', winRate: 64 }, 4: { action: 'double', winRate: 66 }, 5: { action: 'double', winRate: 68 }, 6: { action: 'double', winRate: 70 }, 7: { action: 'double', winRate: 69 }, 8: { action: 'double', winRate: 72 }, 9: { action: 'double', winRate: 74 }, 10: { action: 'double', winRate: 76 }, 11: { action: 'double', winRate: 78 } },
  '12': { 2: { action: 'hit', winRate: 53 }, 3: { action: 'hit', winRate: 54 }, 4: { action: 'stand', winRate: 55 }, 5: { action: 'stand', winRate: 56 }, 6: { action: 'stand', winRate: 57 }, 7: { action: 'hit', winRate: 59 }, 8: { action: 'hit', winRate: 63 }, 9: { action: 'hit', winRate: 67 }, 10: { action: 'hit', winRate: 71 }, 11: { action: 'hit', winRate: 73 } },
  '13': { 2: { action: 'stand', winRate: 55 }, 3: { action: 'stand', winRate: 56 }, 4: { action: 'stand', winRate: 57 }, 5: { action: 'stand', winRate: 58 }, 6: { action: 'stand', winRate: 59 }, 7: { action: 'hit', winRate: 61 }, 8: { action: 'hit', winRate: 65 }, 9: { action: 'hit', winRate: 69 }, 10: { action: 'hit', winRate: 73 }, 11: { action: 'hit', winRate: 75 } },
  '14': { 2: { action: 'stand', winRate: 56 }, 3: { action: 'stand', winRate: 57 }, 4: { action: 'stand', winRate: 58 }, 5: { action: 'stand', winRate: 59 }, 6: { action: 'stand', winRate: 60 }, 7: { action: 'hit', winRate: 63 }, 8: { action: 'hit', winRate: 67 }, 9: { action: 'hit', winRate: 71 }, 10: { action: 'hit', winRate: 75 }, 11: { action: 'hit', winRate: 77 } },
  '15': { 2: { action: 'stand', winRate: 57 }, 3: { action: 'stand', winRate: 58 }, 4: { action: 'stand', winRate: 59 }, 5: { action: 'stand', winRate: 60 }, 6: { action: 'stand', winRate: 61 }, 7: { action: 'hit', winRate: 65 }, 8: { action: 'hit', winRate: 69 }, 9: { action: 'hit', winRate: 73 }, 10: { action: 'surrender', winRate: 69 }, 11: { action: 'hit', winRate: 79 } },
  '16': { 2: { action: 'stand', winRate: 58 }, 3: { action: 'stand', winRate: 59 }, 4: { action: 'stand', winRate: 60 }, 5: { action: 'stand', winRate: 61 }, 6: { action: 'stand', winRate: 62 }, 7: { action: 'hit', winRate: 67 }, 8: { action: 'hit', winRate: 71 }, 9: { action: 'surrender', winRate: 75 }, 10: { action: 'surrender', winRate: 77 }, 11: { action: 'surrender', winRate: 81 } },
  '17': { 2: { action: 'stand', winRate: 64 }, 3: { action: 'stand', winRate: 65 }, 4: { action: 'stand', winRate: 66 }, 5: { action: 'stand', winRate: 67 }, 6: { action: 'stand', winRate: 68 }, 7: { action: 'stand', winRate: 73 }, 8: { action: 'stand', winRate: 76 }, 9: { action: 'stand', winRate: 79 }, 10: { action: 'stand', winRate: 82 }, 11: { action: 'hit', winRate: 83 } },
  '18': { 2: { action: 'stand', winRate: 73 }, 3: { action: 'stand', winRate: 74 }, 4: { action: 'stand', winRate: 75 }, 5: { action: 'stand', winRate: 76 }, 6: { action: 'stand', winRate: 79 }, 7: { action: 'stand', winRate: 81 }, 8: { action: 'stand', winRate: 83 }, 9: { action: 'stand', winRate: 85 }, 10: { action: 'stand', winRate: 87 }, 11: { action: 'stand', winRate: 88 } },
  '19': { 2: { action: 'stand', winRate: 81 }, 3: { action: 'stand', winRate: 82 }, 4: { action: 'stand', winRate: 83 }, 5: { action: 'stand', winRate: 84 }, 6: { action: 'stand', winRate: 86 }, 7: { action: 'stand', winRate: 88 }, 8: { action: 'stand', winRate: 90 }, 9: { action: 'stand', winRate: 91 }, 10: { action: 'stand', winRate: 92 }, 11: { action: 'stand', winRate: 93 } },
  '20': { 2: { action: 'stand', winRate: 88 }, 3: { action: 'stand', winRate: 89 }, 4: { action: 'stand', winRate: 90 }, 5: { action: 'stand', winRate: 91 }, 6: { action: 'stand', winRate: 92 }, 7: { action: 'stand', winRate: 93 }, 8: { action: 'stand', winRate: 94 }, 9: { action: 'stand', winRate: 94 }, 10: { action: 'stand', winRate: 95 }, 11: { action: 'stand', winRate: 96 } },
  '21': { 2: { action: 'stand', winRate: 94 }, 3: { action: 'stand', winRate: 94 }, 4: { action: 'stand', winRate: 95 }, 5: { action: 'stand', winRate: 95 }, 6: { action: 'stand', winRate: 96 }, 7: { action: 'stand', winRate: 96 }, 8: { action: 'stand', winRate: 97 }, 9: { action: 'stand', winRate: 97 }, 10: { action: 'stand', winRate: 97 }, 11: { action: 'stand', winRate: 98 } },
};

// Soft totals
const softTotals: Record<string, Record<number, StrategyCell>> = {
  'A,2': { 2: { action: 'hit', winRate: 51 }, 3: { action: 'hit', winRate: 52 }, 4: { action: 'hit', winRate: 53 }, 5: { action: 'hit', winRate: 54 }, 6: { action: 'double', winRate: 57 }, 7: { action: 'hit', winRate: 58 }, 8: { action: 'hit', winRate: 62 }, 9: { action: 'hit', winRate: 66 }, 10: { action: 'hit', winRate: 70 }, 11: { action: 'hit', winRate: 72 } },
  'A,3': { 2: { action: 'hit', winRate: 52 }, 3: { action: 'hit', winRate: 53 }, 4: { action: 'hit', winRate: 54 }, 5: { action: 'double', winRate: 57 }, 6: { action: 'double', winRate: 59 }, 7: { action: 'hit', winRate: 60 }, 8: { action: 'hit', winRate: 64 }, 9: { action: 'hit', winRate: 68 }, 10: { action: 'hit', winRate: 72 }, 11: { action: 'hit', winRate: 74 } },
  'A,4': { 2: { action: 'hit', winRate: 53 }, 3: { action: 'hit', winRate: 54 }, 4: { action: 'double', winRate: 57 }, 5: { action: 'double', winRate: 59 }, 6: { action: 'double', winRate: 61 }, 7: { action: 'double', winRate: 62 }, 8: { action: 'hit', winRate: 66 }, 9: { action: 'hit', winRate: 70 }, 10: { action: 'hit', winRate: 74 }, 11: { action: 'hit', winRate: 76 } },
  'A,5': { 2: { action: 'hit', winRate: 54 }, 3: { action: 'hit', winRate: 55 }, 4: { action: 'double', winRate: 59 }, 5: { action: 'double', winRate: 61 }, 6: { action: 'double', winRate: 63 }, 7: { action: 'double', winRate: 64 }, 8: { action: 'hit', winRate: 68 }, 9: { action: 'hit', winRate: 72 }, 10: { action: 'hit', winRate: 76 }, 11: { action: 'hit', winRate: 78 } },
  'A,6': { 2: { action: 'hit', winRate: 56 }, 3: { action: 'double', winRate: 59 }, 4: { action: 'double', winRate: 61 }, 5: { action: 'double', winRate: 63 }, 6: { action: 'double', winRate: 65 }, 7: { action: 'double', winRate: 66 }, 8: { action: 'hit', winRate: 70 }, 9: { action: 'hit', winRate: 74 }, 10: { action: 'hit', winRate: 78 }, 11: { action: 'hit', winRate: 80 } },
  'A,7': { 2: { action: 'double', winRate: 64 }, 3: { action: 'double', winRate: 66 }, 4: { action: 'double', winRate: 68 }, 5: { action: 'double', winRate: 70 }, 6: { action: 'double', winRate: 72 }, 7: { action: 'stand', winRate: 74 }, 8: { action: 'stand', winRate: 76 }, 9: { action: 'hit', winRate: 80 }, 10: { action: 'hit', winRate: 84 }, 11: { action: 'hit', winRate: 86 } },
  'A,8': { 2: { action: 'stand', winRate: 74 }, 3: { action: 'stand', winRate: 75 }, 4: { action: 'stand', winRate: 76 }, 5: { action: 'stand', winRate: 77 }, 6: { action: 'stand', winRate: 80 }, 7: { action: 'stand', winRate: 82 }, 8: { action: 'stand', winRate: 84 }, 9: { action: 'stand', winRate: 86 }, 10: { action: 'stand', winRate: 88 }, 11: { action: 'stand', winRate: 89 } },
  'A,9': { 2: { action: 'stand', winRate: 82 }, 3: { action: 'stand', winRate: 83 }, 4: { action: 'stand', winRate: 84 }, 5: { action: 'stand', winRate: 85 }, 6: { action: 'stand', winRate: 87 }, 7: { action: 'stand', winRate: 89 }, 8: { action: 'stand', winRate: 91 }, 9: { action: 'stand', winRate: 92 }, 10: { action: 'stand', winRate: 93 }, 11: { action: 'stand', winRate: 94 } },
};

// Pairs
const pairs: Record<string, Record<number, StrategyCell>> = {
  'A,A': { 2: { action: 'split', winRate: 64 }, 3: { action: 'split', winRate: 66 }, 4: { action: 'split', winRate: 68 }, 5: { action: 'split', winRate: 70 }, 6: { action: 'split', winRate: 72 }, 7: { action: 'split', winRate: 72 }, 8: { action: 'split', winRate: 74 }, 9: { action: 'split', winRate: 76 }, 10: { action: 'split', winRate: 64 }, 11: { action: 'split', winRate: 64 } },
  '2,2': { 2: { action: 'split', winRate: 52 }, 3: { action: 'split', winRate: 54 }, 4: { action: 'split', winRate: 56 }, 5: { action: 'split', winRate: 58 }, 6: { action: 'split', winRate: 60 }, 7: { action: 'split', winRate: 58 }, 8: { action: 'hit', winRate: 60 }, 9: { action: 'hit', winRate: 64 }, 10: { action: 'hit', winRate: 68 }, 11: { action: 'hit', winRate: 70 } },
  '3,3': { 2: { action: 'split', winRate: 54 }, 3: { action: 'split', winRate: 56 }, 4: { action: 'split', winRate: 58 }, 5: { action: 'split', winRate: 60 }, 6: { action: 'split', winRate: 62 }, 7: { action: 'split', winRate: 60 }, 8: { action: 'hit', winRate: 64 }, 9: { action: 'hit', winRate: 68 }, 10: { action: 'hit', winRate: 72 }, 11: { action: 'hit', winRate: 74 } },
  '4,4': { 2: { action: 'hit', winRate: 54 }, 3: { action: 'hit', winRate: 55 }, 4: { action: 'hit', winRate: 56 }, 5: { action: 'double', winRate: 59 }, 6: { action: 'double', winRate: 61 }, 7: { action: 'hit', winRate: 64 }, 8: { action: 'hit', winRate: 68 }, 9: { action: 'hit', winRate: 72 }, 10: { action: 'hit', winRate: 76 }, 11: { action: 'hit', winRate: 78 } },
  '5,5': { 2: { action: 'double', winRate: 57 }, 3: { action: 'double', winRate: 59 }, 4: { action: 'double', winRate: 61 }, 5: { action: 'double', winRate: 63 }, 6: { action: 'double', winRate: 65 }, 7: { action: 'double', winRate: 66 }, 8: { action: 'hit', winRate: 68 }, 9: { action: 'hit', winRate: 72 }, 10: { action: 'hit', winRate: 76 }, 11: { action: 'hit', winRate: 78 } },
  '6,6': { 2: { action: 'split', winRate: 52 }, 3: { action: 'split', winRate: 54 }, 4: { action: 'split', winRate: 56 }, 5: { action: 'split', winRate: 58 }, 6: { action: 'split', winRate: 60 }, 7: { action: 'hit', winRate: 60 }, 8: { action: 'hit', winRate: 64 }, 9: { action: 'hit', winRate: 68 }, 10: { action: 'hit', winRate: 72 }, 11: { action: 'hit', winRate: 74 } },
  '7,7': { 2: { action: 'split', winRate: 54 }, 3: { action: 'split', winRate: 56 }, 4: { action: 'split', winRate: 58 }, 5: { action: 'split', winRate: 60 }, 6: { action: 'split', winRate: 62 }, 7: { action: 'split', winRate: 64 }, 8: { action: 'split', winRate: 66 }, 9: { action: 'hit', winRate: 70 }, 10: { action: 'surrender', winRate: 74 }, 11: { action: 'hit', winRate: 80 } },
  '8,8': { 2: { action: 'split', winRate: 64 }, 3: { action: 'split', winRate: 66 }, 4: { action: 'split', winRate: 68 }, 5: { action: 'split', winRate: 70 }, 6: { action: 'split', winRate: 72 }, 7: { action: 'split', winRate: 72 }, 8: { action: 'split', winRate: 74 }, 9: { action: 'split', winRate: 76 }, 10: { action: 'split', winRate: 78 }, 11: { action: 'split', winRate: 80 } },
  '9,9': { 2: { action: 'split', winRate: 64 }, 3: { action: 'split', winRate: 66 }, 4: { action: 'split', winRate: 68 }, 5: { action: 'split', winRate: 70 }, 6: { action: 'split', winRate: 72 }, 7: { action: 'stand', winRate: 74 }, 8: { action: 'split', winRate: 76 }, 9: { action: 'split', winRate: 78 }, 10: { action: 'stand', winRate: 80 }, 11: { action: 'stand', winRate: 82 } },
  '10,10': { 2: { action: 'stand', winRate: 80 }, 3: { action: 'stand', winRate: 81 }, 4: { action: 'stand', winRate: 82 }, 5: { action: 'stand', winRate: 83 }, 6: { action: 'stand', winRate: 84 }, 7: { action: 'stand', winRate: 85 }, 8: { action: 'stand', winRate: 86 }, 9: { action: 'stand', winRate: 87 }, 10: { action: 'stand', winRate: 88 }, 11: { action: 'stand', winRate: 89 } },
};

// Apply rule constraints to strategy
function applyRuleConstraints(cell: StrategyCell, isSplitHand: boolean, settings: BlackjackSettings): StrategyCell {
  let action = cell.action;
  
  // Disable surrender if not allowed
  if (action === 'surrender' && !settings.allowSurrender) {
    action = 'hit';
  }
  
  // Disable double after split if not allowed
  if (action === 'double' && isSplitHand && !settings.doubleAfterSplit) {
    action = 'hit';
  }
  
  return { ...cell, action };
}

// Get strategy for a hand with rule settings
export function getStrategy(cards: string[], dealerUpcard: string, settings: BlackjackSettings): StrategyCell | null {
  if (cards.length === 0 || !dealerUpcard) return null;

  const dealerValue = dealerUpcard === 'A' ? 11 : (parseInt(dealerUpcard) || 10);
  const { value, isSoft } = calculateHandValue(cards);
  const isSplitHand = cards.length === 2 && isPair(cards);
  
  // Choose correct hard totals based on dealer soft 17 rule
  const hardTotals = settings.dealerHitsSoft17 ? hardTotalsH17 : hardTotalsS17;

  // Check for pairs first
  if (isSplitHand) {
    const rank = getCardRank(cards[0]);
    const pairKey = rank === 'A' ? 'A,A' : `${rank},${rank}`;
    if (pairs[pairKey] && pairs[pairKey][dealerValue]) {
      return applyRuleConstraints(pairs[pairKey][dealerValue], true, settings);
    }
  }

  // Check for soft hands
  if (isSoft && cards.some(c => getCardRank(c) === 'A')) {
    const ranks = cards.map(c => getCardRank(c));
    const nonAce = ranks.find(r => r !== 'A') || '';
    const softKey = `A,${nonAce}`;
    if (softTotals[softKey] && softTotals[softKey][dealerValue]) {
      return applyRuleConstraints(softTotals[softKey][dealerValue], false, settings);
    }
  }

  // Hard totals
  const hardKey = value.toString();
  if (hardTotals[hardKey] && hardTotals[hardKey][dealerValue]) {
    return applyRuleConstraints(hardTotals[hardKey][dealerValue], false, settings);
  }

  return null;
}

// Direct lookup by key for strategy chart (avoids card construction)
export function getStrategyDirect(
  type: 'hard' | 'soft' | 'pair',
  key: string,
  dealerUpcard: string,
  settings: BlackjackSettings
): StrategyCell | null {
  const dealerValue = dealerUpcard === 'A' ? 11 : (parseInt(dealerUpcard) || 10);
  const hardTotals = settings.dealerHitsSoft17 ? hardTotalsH17 : hardTotalsS17;
  
  let cell: StrategyCell | null = null;
  if (type === 'hard') {
    cell = hardTotals[key]?.[dealerValue] || null;
  } else if (type === 'soft') {
    cell = softTotals[key]?.[dealerValue] || null;
  } else {
    cell = pairs[key]?.[dealerValue] || null;
  }
  
  if (cell) {
    return applyRuleConstraints(cell, type === 'pair', settings);
  }
  return null;
}

// Get action description
export function getActionDescription(action: Action): string {
  const descriptions: Record<Action, string> = {
    hit: 'Draw another card',
    stand: 'Keep your current hand',
    double: 'Double your bet and get one more card',
    split: 'Split into two separate hands',
    surrender: 'Forfeit half your bet and end the hand'
  };
  return descriptions[action];
}

// Get action color
export function getActionColor(action: Action): string {
  const colors: Record<Action, string> = {
    hit: 'bg-orange-500',
    stand: 'bg-green-600',
    double: 'bg-amber-500',
    split: 'bg-purple-600',
    surrender: 'bg-red-500'
  };
  return colors[action];
}

// Generate probability breakdown
export function getProbabilityBreakdown(strategy: StrategyCell, dealerWinsTies: boolean = false): { win: number; lose: number; push: number } {
  const winRate = strategy.winRate;
  const remaining = 100 - winRate;
  const pushRate = Math.round(remaining * 0.15);
  const loseRate = remaining - pushRate;

  // When dealer wins ties, push goes to dealer (lose)
  if (dealerWinsTies) {
    return {
      win: winRate,
      lose: loseRate + pushRate,
      push: 0
    };
  }

  return {
    win: winRate,
    lose: loseRate,
    push: pushRate
  };
}
