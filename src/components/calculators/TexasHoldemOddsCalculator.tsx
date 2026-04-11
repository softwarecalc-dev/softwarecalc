import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RefreshCcw, TrendingUp, TrendingDown, Minus, Zap, Info } from 'lucide-react';
import {
  RANKS, SUITS, SUIT_LABEL, SUIT_COLOR,
  type Card as PokerCard, type Rank, type Suit,
  simulate, type SimResult,
} from './poker-engine';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) { return n.toFixed(1) + '%'; }

function getStreet(communityCount: number): string {
  if (communityCount === 0) return 'Preflop';
  if (communityCount === 3) return 'Flop';
  if (communityCount === 4) return 'Turn';
  return 'River';
}

// ─── Card Picker ──────────────────────────────────────────────────────────────

interface CardPickerProps {
  selected: PokerCard | null;
  usedCards: Set<PokerCard>;
  onSelect: (card: PokerCard | null) => void;
  placeholder: string;
}

function CardPicker({ selected, usedCards, onSelect, placeholder }: CardPickerProps) {
  const [open, setOpen] = useState(false);
  const [activeRank, setActiveRank] = useState<Rank | null>(null);

  const handleRankClick = (rank: Rank) => {
    setActiveRank(prev => (prev === rank ? null : rank));
  };

  const handleSuitClick = (suit: Suit) => {
    if (!activeRank) return;
    const card = `${activeRank}${suit}` as PokerCard;
    if (usedCards.has(card)) return;
    onSelect(card);
    setActiveRank(null);
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(null);
    setActiveRank(null);
  };

  const rankLabel = (r: Rank) => r === 'T' ? '10' : r;
  const suit = selected ? selected[1] as Suit : null;
  const rank = selected ? selected[0] as Rank : null;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => { setOpen(o => !o); setActiveRank(null); }}
        className={`
          w-14 h-20 rounded-lg border-2 flex flex-col items-center justify-center text-sm font-bold transition-all
          ${selected
            ? 'border-primary bg-card shadow-sm'
            : 'border-dashed border-border bg-muted/30 hover:border-primary/50 hover:bg-primary/5'}
        `}
      >
        {selected ? (
          <>
            <span className={`text-lg font-extrabold leading-none ${SUIT_COLOR[suit!]}`}>
              {rankLabel(rank!)}
            </span>
            <span className={`text-base ${SUIT_COLOR[suit!]}`}>{SUIT_LABEL[suit!]}</span>
          </>
        ) : (
          <span className="text-muted-foreground text-xs text-center leading-tight px-1">{placeholder}</span>
        )}
      </button>

      {selected && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive text-xs font-bold"
          aria-label="Clear card"
        >
          ×
        </button>
      )}

      {open && (
        <div className="absolute top-full mt-1 left-0 z-50 bg-card border border-border rounded-xl shadow-lg p-3 min-w-[220px]">
          {/* Step 1: pick rank */}
          {!activeRank && (
            <>
              <p className="text-xs text-muted-foreground mb-2 font-medium">Select rank</p>
              <div className="grid grid-cols-7 gap-1">
                {RANKS.map(r => {
                  const anyAvailable = SUITS.some(s => !usedCards.has(`${r}${s}` as PokerCard));
                  return (
                    <button
                      key={r}
                      type="button"
                      disabled={!anyAvailable}
                      onClick={() => handleRankClick(r)}
                      className={`w-7 h-7 rounded text-xs font-bold border transition-colors
                        ${anyAvailable
                          ? 'border-border hover:border-primary hover:bg-primary/10'
                          : 'border-transparent text-muted-foreground/30 cursor-not-allowed'}`}
                    >
                      {rankLabel(r)}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* Step 2: pick suit */}
          {activeRank && (
            <>
              <button
                type="button"
                onClick={() => setActiveRank(null)}
                className="text-xs text-muted-foreground hover:text-foreground mb-2 flex items-center gap-1"
              >
                ← Back
              </button>
              <p className="text-xs text-muted-foreground mb-2 font-medium">
                Select suit for <strong>{rankLabel(activeRank)}</strong>
              </p>
              <div className="flex gap-2">
                {SUITS.map(s => {
                  const card = `${activeRank}${s}` as PokerCard;
                  const taken = usedCards.has(card);
                  return (
                    <button
                      key={s}
                      type="button"
                      disabled={taken}
                      onClick={() => handleSuitClick(s)}
                      className={`w-10 h-10 rounded-lg border-2 flex flex-col items-center justify-center text-lg font-bold transition-colors
                        ${taken
                          ? 'border-transparent text-muted-foreground/30 cursor-not-allowed'
                          : `border-border hover:border-primary ${SUIT_COLOR[s]}`}`}
                    >
                      {SUIT_LABEL[s]}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-3 text-xs text-muted-foreground hover:text-foreground w-full text-center"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const MAX_COMMUNITY = 5;
const VALID_COMMUNITY_COUNTS = new Set([0, 3, 4, 5]);

export function TexasHoldemOddsCalculator() {
  const [hole1, setHole1] = useState<PokerCard | null>(null);
  const [hole2, setHole2] = useState<PokerCard | null>(null);
  const [community, setCommunity] = useState<(PokerCard | null)[]>([null, null, null, null, null]);
  const [opponents, setOpponents] = useState(1);
  const [potSize, setPotSize] = useState('');
  const [amountToCall, setAmountToCall] = useState('');
  const [result, setResult] = useState<SimResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const usedCards = useCallback((): Set<PokerCard> => {
    const s = new Set<PokerCard>();
    if (hole1) s.add(hole1);
    if (hole2) s.add(hole2);
    community.forEach(c => { if (c) s.add(c); });
    return s;
  }, [hole1, hole2, community])();

  const communityFilled = community.filter(Boolean) as PokerCard[];
  const communityCount = communityFilled.length;
  const communityValid = VALID_COMMUNITY_COUNTS.has(communityCount);

  const setCommunityCard = (i: number, card: PokerCard | null) => {
    setCommunity(prev => {
      const next = [...prev];
      next[i] = card;
      return next;
    });
  };

  const handleReset = () => {
    setHole1(null);
    setHole2(null);
    setCommunity([null, null, null, null, null]);
    setOpponents(1);
    setPotSize('');
    setAmountToCall('');
    setResult(null);
    setError('');
  };

  const handleCalculate = () => {
    setError('');
    if (!hole1 || !hole2) { setError('Please select both hole cards.'); return; }
    if (!communityValid) {
      setError('Community cards must total 0 (Preflop), 3 (Flop), 4 (Turn), or 5 (River). You currently have an invalid number. Remove or add cards to reach a valid count.');
      return;
    }
    setLoading(true);
    // Use setTimeout so loading state renders before blocking computation
    setTimeout(() => {
      try {
        const res = simulate([hole1, hole2], communityFilled, opponents, 1200);
        setResult(res);
      } finally {
        setLoading(false);
      }
    }, 0);
  };

  // Recommendation
  const pot = parseFloat(potSize) || 0;
  const callAmt = parseFloat(amountToCall) || 0;
  let recommendation = '';
  let recommendationColor = '';
  if (result) {
    const winPct = result.winPct;
    if (callAmt <= 0) {
      if (winPct >= 50) { recommendation = 'Bet / Raise'; recommendationColor = 'text-primary'; }
      else { recommendation = 'Check'; recommendationColor = 'text-foreground'; }
    } else {
      const totalPot = pot + callAmt;
      const requiredEquity = totalPot > 0 ? (callAmt / totalPot) * 100 : 0;
      if (winPct >= requiredEquity - 5) { recommendation = 'Call / Raise'; recommendationColor = 'text-primary'; }
      else { recommendation = 'Fold'; recommendationColor = 'text-destructive'; }
    }
  }

  const potOddsPct = callAmt > 0 && pot > 0 ? (callAmt / (pot + callAmt)) * 100 : null;
  const street = getStreet(communityCount);

  return (
    <div className="space-y-6">

      {/* ── Your Hand ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Hand</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3 flex-wrap">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Card 1</p>
              <CardPicker selected={hole1} usedCards={usedCards} onSelect={setHole1} placeholder="Pick" />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Card 2</p>
              <CardPicker selected={hole2} usedCards={usedCards} onSelect={setHole2} placeholder="Pick" />
            </div>
          </div>
          {hole1 && hole2 && (
            <p className="text-xs text-muted-foreground">
              Hand: <span className="font-semibold text-foreground">
                {hole1[0] === 'T' ? '10' : hole1[0]}{SUIT_LABEL[hole1[1] as Suit]}{' '}
                {hole2[0] === 'T' ? '10' : hole2[0]}{SUIT_LABEL[hole2[1] as Suit]}
              </span>
            </p>
          )}
        </CardContent>
      </Card>

      {/* ── Community Cards ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Community Cards</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs text-muted-foreground">Add 0 (Preflop), 3 (Flop), 4 (Turn), or 5 (River) cards.</p>
          <div className="flex gap-2 flex-wrap">
            {[0, 1, 2].map(i => (
              <div key={i} className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium">Flop {i + 1}</p>
                <CardPicker selected={community[i]} usedCards={usedCards} onSelect={c => setCommunityCard(i, c)} placeholder="Pick" />
              </div>
            ))}
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Turn</p>
              <CardPicker selected={community[3]} usedCards={usedCards} onSelect={c => setCommunityCard(3, c)} placeholder="Pick" />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">River</p>
              <CardPicker selected={community[4]} usedCards={usedCards} onSelect={c => setCommunityCard(4, c)} placeholder="Pick" />
            </div>
          </div>
          {!communityValid && communityCount > 0 && (
            <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
              {communityCount === 1 || communityCount === 2
                ? `You have ${communityCount} community card${communityCount > 1 ? 's' : ''}. The Flop requires exactly 3. Add ${3 - communityCount} more or clear them.`
                : ''}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Current street: <span className="font-semibold text-foreground">{communityValid ? street : '—'}</span>
          </p>
        </CardContent>
      </Card>

      {/* ── Game Settings ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Game Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Opponents</Label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOpponents(o => Math.max(1, o - 1))}
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-muted font-bold"
                >−</button>
                <span className="w-6 text-center font-semibold text-foreground">{opponents}</span>
                <button
                  type="button"
                  onClick={() => setOpponents(o => Math.min(5, o + 1))}
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-muted font-bold"
                >+</button>
                <span className="text-xs text-muted-foreground ml-1">(1–5)</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="potSize">Pot Size <span className="text-muted-foreground text-xs">(optional)</span></Label>
              <Input
                id="potSize"
                type="number"
                min="0"
                placeholder="e.g. 100"
                value={potSize}
                onChange={e => setPotSize(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amountToCall">Amount to Call <span className="text-muted-foreground text-xs">(optional)</span></Label>
              <Input
                id="amountToCall"
                type="number"
                min="0"
                placeholder="e.g. 20"
                value={amountToCall}
                onChange={e => setAmountToCall(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Actions ── */}
      <div className="flex gap-3 flex-wrap">
        <Button onClick={handleCalculate} disabled={loading} className="gap-2">
          <Zap className="w-4 h-4" />
          {loading ? 'Simulating…' : 'Calculate Odds'}
        </Button>
        <Button variant="outline" onClick={handleReset} className="gap-2">
          <RefreshCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>

      {error && (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="pt-4 pb-4">
            <p className="text-sm text-destructive font-medium">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* ── Results ── */}
      {result && !loading && (
        <>
          {/* Street + hand badge */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              {street}
            </span>
            {result.bestHandName && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-foreground border border-border">
                Best hand: {result.bestHandName}
              </span>
            )}
            {potOddsPct !== null && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                Pot odds: {potOddsPct.toFixed(1)}%
              </span>
            )}
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 p-2 rounded-lg bg-primary/10">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight break-words">Win</p>
                    <p className="text-lg sm:text-2xl font-bold text-primary leading-tight break-words">{fmt(result.winPct)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 p-2 rounded-lg bg-muted">
                    <Minus className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight break-words">Tie</p>
                    <p className="text-lg sm:text-2xl font-bold leading-tight break-words">{fmt(result.tiePct)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 p-2 rounded-lg bg-destructive/10">
                    <TrendingDown className="w-5 h-5 text-destructive" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight break-words">Lose</p>
                    <p className="text-lg sm:text-2xl font-bold text-destructive leading-tight break-words">{fmt(result.losePct)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-muted">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 p-2 rounded-lg bg-muted">
                    <Zap className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight break-words">Equity Action</p>
                    <p className={`text-lg sm:text-xl font-bold leading-tight break-words ${recommendationColor}`}>{recommendation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendation card */}
          <Card className="border-muted">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Info className="w-4 h-4 shrink-0" />
                Equity-Based Recommendation
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <p className="text-sm text-foreground">
                <span className={`font-bold ${recommendationColor}`}>{recommendation}</span>
                {callAmt > 0 && potOddsPct !== null && (
                  <> — Your estimated equity ({fmt(result.winPct)}) vs required equity ({potOddsPct.toFixed(1)}%).</>
                )}
                {callAmt <= 0 && (
                  <> — Based on estimated win probability of {fmt(result.winPct)}.</>
                )}
              </p>
              <p className="text-xs text-muted-foreground">
                This is a simplified action hint based on estimated equity and pot odds, not a full poker strategy solver. It does not account for position, bluffing, opponent ranges, or stack depth.
              </p>
            </CardContent>
          </Card>

          {/* Visual equity bar */}
          <Card>
            <CardContent className="pt-4 pb-4">
              <p className="text-xs text-muted-foreground font-medium mb-2 uppercase tracking-wide">Equity Distribution</p>
              <div className="flex rounded-full overflow-hidden h-4 w-full">
                <div
                  className="bg-primary transition-all"
                  style={{ width: `${result.winPct}%` }}
                  title={`Win: ${fmt(result.winPct)}`}
                />
                <div
                  className="bg-muted-foreground/30 transition-all"
                  style={{ width: `${result.tiePct}%` }}
                  title={`Tie: ${fmt(result.tiePct)}`}
                />
                <div
                  className="bg-destructive/60 transition-all"
                  style={{ width: `${result.losePct}%` }}
                  title={`Lose: ${fmt(result.losePct)}`}
                />
              </div>
              <div className="flex gap-4 mt-2 flex-wrap">
                <span className="flex items-center gap-1 text-xs text-muted-foreground"><span className="w-2 h-2 rounded-full bg-primary inline-block" />Win</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground"><span className="w-2 h-2 rounded-full bg-muted-foreground/30 inline-block" />Tie</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground"><span className="w-2 h-2 rounded-full bg-destructive/60 inline-block" />Lose</span>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
