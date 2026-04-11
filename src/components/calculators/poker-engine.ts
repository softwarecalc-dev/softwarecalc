// ─── Poker Engine for Texas Hold'em ──────────────────────────────────────────
// Self-contained: deck, hand evaluation, and Monte Carlo simulation.

export type Suit = 'S' | 'H' | 'D' | 'C';
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'T' | 'J' | 'Q' | 'K' | 'A';
export type Card = `${Rank}${Suit}`;

export const RANKS: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
export const SUITS: Suit[] = ['S', 'H', 'D', 'C'];

export const FULL_DECK: Card[] = RANKS.flatMap(r => SUITS.map(s => `${r}${s}` as Card));

export const RANK_VALUE: Record<Rank, number> = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8,
  '9': 9, 'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14,
};

export const SUIT_LABEL: Record<Suit, string> = { S: '♠', H: '♥', D: '♦', C: '♣' };
export const SUIT_COLOR: Record<Suit, string> = { S: 'text-foreground', H: 'text-red-600', D: 'text-red-600', C: 'text-foreground' };

export function cardRank(c: Card): Rank { return c[0] as Rank; }
export function cardSuit(c: Card): Suit { return c[1] as Suit; }
export function rankVal(c: Card): number { return RANK_VALUE[cardRank(c)]; }

// ─── Hand Evaluation ──────────────────────────────────────────────────────────

export const HAND_NAMES = [
  'High Card', 'One Pair', 'Two Pair', 'Three of a Kind',
  'Straight', 'Flush', 'Full House', 'Four of a Kind', 'Straight Flush',
];

// Returns a comparable score [handRank, ...tiebreakers] packed as a single number
// Higher = better hand. Works on exactly 5 cards.
function eval5(cards: Card[]): number {
  const vals = cards.map(rankVal).sort((a, b) => b - a);
  const suits = cards.map(cardSuit);
  const rankCounts: Record<number, number> = {};
  for (const v of vals) rankCounts[v] = (rankCounts[v] || 0) + 1;
  const counts = Object.values(rankCounts).sort((a, b) => b - a);
  const uniqueVals = Object.keys(rankCounts).map(Number).sort((a, b) => b - a);

  const isFlush = suits.every(s => s === suits[0]);
  // Straight check (including A-2-3-4-5 wheel)
  let isStraight = false;
  let straightHigh = vals[0];
  if (uniqueVals.length === 5) {
    if (vals[0] - vals[4] === 4) {
      isStraight = true;
    } else if (vals[0] === 14 && vals[1] === 5 && vals[2] === 4 && vals[3] === 3 && vals[4] === 2) {
      isStraight = true;
      straightHigh = 5; // wheel
    }
  }

  // Pack score: handRank * 10^10 + tiebreakers
  const pack = (handRank: number, ...tb: number[]) => {
    let s = handRank * 1e10;
    for (let i = 0; i < tb.length; i++) s += tb[i] * Math.pow(100, 4 - i);
    return s;
  };

  if (isFlush && isStraight) return pack(8, straightHigh);
  if (counts[0] === 4) {
    const quad = uniqueVals.find(v => rankCounts[v] === 4)!;
    const kicker = uniqueVals.find(v => rankCounts[v] !== 4)!;
    return pack(7, quad, kicker);
  }
  if (counts[0] === 3 && counts[1] === 2) {
    const trip = uniqueVals.find(v => rankCounts[v] === 3)!;
    const pair = uniqueVals.find(v => rankCounts[v] === 2)!;
    return pack(6, trip, pair);
  }
  if (isFlush) return pack(5, ...vals);
  if (isStraight) return pack(4, straightHigh);
  if (counts[0] === 3) {
    const trip = uniqueVals.find(v => rankCounts[v] === 3)!;
    const kickers = uniqueVals.filter(v => rankCounts[v] !== 3);
    return pack(3, trip, kickers[0], kickers[1]);
  }
  if (counts[0] === 2 && counts[1] === 2) {
    const pairs = uniqueVals.filter(v => rankCounts[v] === 2).sort((a, b) => b - a);
    const kicker = uniqueVals.find(v => rankCounts[v] === 1)!;
    return pack(2, pairs[0], pairs[1], kicker);
  }
  if (counts[0] === 2) {
    const pair = uniqueVals.find(v => rankCounts[v] === 2)!;
    const kickers = uniqueVals.filter(v => rankCounts[v] !== 2);
    return pack(1, pair, kickers[0], kickers[1], kickers[2]);
  }
  return pack(0, ...vals);
}

// Combinations helper
function combinations<T>(arr: T[], k: number): T[][] {
  if (k === 0) return [[]];
  if (arr.length < k) return [];
  const [first, ...rest] = arr;
  return [
    ...combinations(rest, k - 1).map(c => [first, ...c]),
    ...combinations(rest, k),
  ];
}

// Best 5-card score from up to 7 cards
export function bestHand(cards: Card[]): { score: number; name: string } {
  const combos = combinations(cards, 5);
  let best = -Infinity;
  for (const c of combos) {
    const s = eval5(c);
    if (s > best) best = s;
  }
  const handRank = Math.floor(best / 1e10);
  return { score: best, name: HAND_NAMES[handRank] ?? 'High Card' };
}

// ─── Monte Carlo Simulation ───────────────────────────────────────────────────

export interface SimResult {
  winPct: number;
  tiePct: number;
  losePct: number;
  bestHandName: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function simulate(
  holeCards: [Card, Card],
  communityCards: Card[],
  numOpponents: number,
  iterations = 1200,
): SimResult {
  const knownCards = new Set<Card>([...holeCards, ...communityCards]);
  const deck = FULL_DECK.filter(c => !knownCards.has(c));
  const boardNeeded = 5 - communityCards.length;

  let wins = 0, ties = 0, losses = 0;
  const totalRuns = Math.min(iterations, 1200);

  for (let i = 0; i < totalRuns; i++) {
    const d = shuffle(deck);
    let idx = 0;

    // Deal board cards
    const board: Card[] = [...communityCards, ...d.slice(idx, idx + boardNeeded)];
    idx += boardNeeded;

    // Deal opponent hole cards
    const opponentScores: number[] = [];
    let valid = true;
    for (let op = 0; op < numOpponents; op++) {
      if (idx + 2 > d.length) { valid = false; break; }
      const opHand: Card[] = [d[idx], d[idx + 1]];
      idx += 2;
      opponentScores.push(bestHand([...opHand, ...board]).score);
    }
    if (!valid) continue;

    const playerScore = bestHand([...holeCards, ...board]).score;
    const maxOpponent = Math.max(...opponentScores);

    if (playerScore > maxOpponent) wins++;
    else if (playerScore === maxOpponent) ties++;
    else losses++;
  }

  const total = wins + ties + losses || 1;
  // Best hand name from current known cards (if >= 5 total cards available)
  let bestHandName = '';
  const known = [...holeCards, ...communityCards];
  if (known.length >= 5) {
    bestHandName = bestHand(known).name;
  } else if (known.length >= 2) {
    // Just show pair/high card for hole cards
    bestHandName = bestHand(known).name;
  }

  return {
    winPct: (wins / total) * 100,
    tiePct: (ties / total) * 100,
    losePct: (losses / total) * 100,
    bestHandName,
  };
}
