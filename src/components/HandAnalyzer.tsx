import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  calculateHandValue, 
  getStrategy, 
  getActionDescription, 
  getProbabilityBreakdown,
  isPair,
  getCardRank,
  Action 
} from '@/lib/blackjack-strategy';
import { 
  Hand, 
  Target, 
  Trophy, 
  RotateCcw,
  Info,
  AlertTriangle
} from 'lucide-react';
import { BlackjackSettings } from '@/hooks/useBlackjackSettings';

const CARD_VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const DEALER_CARDS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A'];

const CARD_COLORS: Record<string, string> = {
  '♠': 'text-slate-900',
  '♣': 'text-slate-900',
  '♥': 'text-red-600',
  '♦': 'text-red-600'
};

interface HandAnalyzerProps {
  settings: BlackjackSettings;
}

export function HandAnalyzer({ settings }: HandAnalyzerProps) {
  const [playerCards, setPlayerCards] = useState<string[]>([]);
  const [dealerUpcard, setDealerUpcard] = useState<string>('');

  const addPlayerCard = (value: string) => {
    if (playerCards.length < 4) {
      setPlayerCards([...playerCards, value + settings.defaultCardSuit]);
    }
  };

  const removeLastCard = () => {
    setPlayerCards(playerCards.slice(0, -1));
  };

  const reset = () => {
    setPlayerCards([]);
    setDealerUpcard('');
  };

  const handInfo = useMemo(() => {
    if (playerCards.length === 0) return null;
    return calculateHandValue(playerCards);
  }, [playerCards]);

  const isPairHand = useMemo(() => {
    if (playerCards.length !== 2) return false;
    return isPair(playerCards);
  }, [playerCards]);

  const pairRank = useMemo(() => {
    if (!isPairHand) return null;
    return getCardRank(playerCards[0]);
  }, [isPairHand, playerCards]);

  const strategy = useMemo(() => {
    if (!dealerUpcard || playerCards.length === 0) return null;
    return getStrategy(playerCards, dealerUpcard, settings);
  }, [playerCards, dealerUpcard, settings]);

  const probabilities = useMemo(() => {
    if (!strategy) return null;
    return getProbabilityBreakdown(strategy, settings.dealerWinsTies);
  }, [strategy, settings.dealerWinsTies]);

  const handDisplay = useMemo(() => {
    if (playerCards.length === 0) return '0';
    if (!handInfo) return '?';
    return handInfo.value;
  }, [playerCards, handInfo]);

  const getActionBadgeVariant = (action: Action): "default" | "destructive" | "secondary" | "outline" | null => {
    switch (action) {
      case 'stand': return 'default';
      case 'hit': return 'secondary';
      case 'double': return 'outline';
      case 'split': return 'outline';
      case 'surrender': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
            <span className="text-primary">Blackjack</span> Stat Helper
          </h1>
          <p className="text-muted-foreground text-lg">
            Select your cards and dealer's upcard to get optimal strategy
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Player Cards Section */}
          <Card className="animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Hand className="w-5 h-5 text-primary" />
                Your Hand
                {handInfo && (
                  <Badge variant="outline" className="ml-auto text-lg px-3 py-1">
                    {handDisplay}{handInfo.isSoft && <span className="ml-1 text-primary">*</span>}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Display Cards */}
              <div className="flex flex-wrap gap-2 min-h-[100px] items-center justify-center">
                {playerCards.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Select cards below</p>
                ) : (
                  playerCards.map((card, idx) => (
                    <div
                      key={idx}
                      className="animate-card-deal w-16 h-24 rounded-xl bg-gradient-to-br from-white to-slate-100 dark:from-slate-700 dark:to-slate-800 border-2 border-slate-200 dark:border-slate-600 flex flex-col items-center justify-center shadow-lg"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <span className={`text-2xl font-bold ${CARD_COLORS[card.slice(-1)]}`}>
                        {card.slice(0, -1)}
                      </span>
                      <span className={`text-2xl ${CARD_COLORS[card.slice(-1)]}`}>
                        {card.slice(-1)}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Selected Cards Display */}
              {playerCards.length > 0 && (
                <div className="flex justify-center gap-2">
                  <Button variant="outline" size="sm" onClick={removeLastCard}>
                    <RotateCcw className="w-4 h-4 mr-1" /> Undo
                  </Button>
                  <Button variant="ghost" size="sm" onClick={reset}>
                    Clear All
                  </Button>
                </div>
              )}

              {/* Card Value Buttons */}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground font-medium">Add Card</p>
                <div className="flex flex-wrap gap-2">
                  {CARD_VALUES.map((value) => (
                    <Button
                      key={value}
                      variant="outline"
                      size="sm"
                      onClick={() => addPlayerCard(value)}
                      disabled={playerCards.length >= 4}
                      className="w-10 h-10"
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Pair Info */}
              {isPairHand && pairRank && (
                <div className="flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                  <AlertTriangle className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-purple-700 dark:text-purple-300 font-medium">
                    Pair of {pairRank}s - Split may be optimal
                  </span>
                </div>
              )}

              {/* Soft Hand Info */}
              {handInfo?.isSoft && playerCards.length > 0 && !isPairHand && (
                <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                  <Info className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                    Soft hand (contains Ace counted as 11)
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Dealer Upcard Section */}
          <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Target className="w-5 h-5 text-destructive" />
                Dealer's Upcard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Display Dealer Card */}
              <div className="flex justify-center min-h-[100px] items-center">
                {dealerUpcard ? (
                  <div className="w-16 h-24 rounded-xl bg-gradient-to-br from-white to-slate-100 dark:from-slate-700 dark:to-slate-800 border-2 border-slate-200 dark:border-slate-600 flex flex-col items-center justify-center shadow-lg">
                    <span className={`text-2xl font-bold ${CARD_COLORS['♠']}`}>
                      {dealerUpcard}
                    </span>
                    <span className={`text-2xl ${CARD_COLORS['♠']}`}>♠</span>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">Select dealer's card</p>
                )}
              </div>

              {/* Dealer Card Buttons */}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground font-medium">Dealer's Showing</p>
                <div className="flex flex-wrap gap-2">
                  {DEALER_CARDS.map((value) => (
                    <Button
                      key={value}
                      variant={dealerUpcard === value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setDealerUpcard(value)}
                      className="w-10 h-10"
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        {strategy && probabilities && dealerUpcard && playerCards.length > 0 && (
          <Card className="animate-fade-in border-2 border-primary/20 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Trophy className="w-5 h-5 text-amber-500" />
                Recommended Action
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main Action */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/20">
                  <span className="text-5xl">
                    {strategy.action === 'stand' && '✋'}
                    {strategy.action === 'hit' && '🖐️'}
                    {strategy.action === 'double' && '✖️'}
                    {strategy.action === 'split' && '✂️'}
                    {strategy.action === 'surrender' && '🚩'}
                  </span>
                  <div className="text-left">
                    <Badge className="text-lg px-4 py-1 mb-1" variant={getActionBadgeVariant(strategy.action)}>
                      {strategy.action.toUpperCase()}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      {getActionDescription(strategy.action)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Probability Bars */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Win Probability</p>
                <div className="h-8 bg-muted rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-green-500 transition-all duration-500"
                    style={{ width: `${probabilities.win}%` }}
                  />
                  <div 
                    className="h-full bg-slate-400 transition-all duration-500"
                    style={{ width: `${probabilities.push}%` }}
                  />
                  <div 
                    className="h-full bg-red-500 transition-all duration-500"
                    style={{ width: `${probabilities.lose}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1 text-green-600"> 
                    <Trophy className="w-4 h-4" /> Win: {probabilities.win}%
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    Push: {probabilities.push}%
                  </span>
                  <span className="flex items-center gap-1 text-red-600">
                    Lose: {probabilities.lose}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tips Section */}
        <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-6">
            <Tabs defaultValue="basic">
              <TabsList className="w-full">
                <TabsTrigger value="basic" className="flex-1">Basic Strategy</TabsTrigger>
                <TabsTrigger value="tips" className="flex-1">Pro Tips</TabsTrigger>
              </TabsList>
              <TabsContent value="basic" className="mt-4 space-y-3">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start gap-2">
                    <Badge variant="secondary">Stand</Badge>
                    <span className="text-muted-foreground">On 17+ (hard), stand on 18+ vs 7-A</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">Double</Badge>
                    <span className="text-muted-foreground">On 11, 10, and soft 13-18 vs 3-6</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">Split</Badge>
                    <span className="text-muted-foreground">Always split Aces and 8s</span>
                  </div>
                  {settings.allowSurrender && (
                    <div className="flex items-start gap-2">
                      <Badge variant="destructive">Surrender</Badge>
                      <span className="text-muted-foreground">16 vs 9-A, 15 vs 10</span>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="tips" className="mt-4 space-y-3">
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Always stand on 20 - you can't improve a 20!</li>
                  <li>Never take insurance - it favors the house</li>
                  <li>A soft 18 means A+7 (could be 8 or 18)</li>
                  <li>Splitting 8s gives you two chances to hit 18</li>
                  <li>Double down when your odds are better than dealer's</li>
                </ul>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
