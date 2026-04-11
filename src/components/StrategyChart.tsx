import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getStrategyDirect, Action } from '@/lib/blackjack-strategy';
import { Info, LayoutGrid } from 'lucide-react';
import { BlackjackSettings } from '@/hooks/useBlackjackSettings';

interface StrategyChartProps {
  settings: BlackjackSettings;
}

const DEALER_COLUMNS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A'];
const HARD_ROWS = ['5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'];
const SOFT_ROWS = ['A,2', 'A,3', 'A,4', 'A,5', 'A,6', 'A,7', 'A,8', 'A,9'];
const PAIR_ROWS = ['A,A', '2,2', '3,3', '4,4', '5,5', '6,6', '7,7', '8,8', '9,9', '10,10'];

const ACTION_COLORS: Record<Action, string> = {
  stand: 'bg-green-600 text-white',
  hit: 'bg-orange-500 text-white',
  double: 'bg-amber-500 text-white',
  split: 'bg-purple-600 text-white',
  surrender: 'bg-red-500 text-white'
};

const ACTION_LABELS: Record<Action, string> = {
  stand: 'S',
  hit: 'H',
  double: 'D',
  split: 'P',
  surrender: 'Sr'
};

function StrategyCell({ action }: { action: Action }) {
  return (
    <div className={`w-full h-8 md:h-10 flex items-center justify-center text-xs md:text-sm font-bold rounded ${ACTION_COLORS[action]} transition-all hover:scale-105`}>
      {ACTION_LABELS[action]}
    </div>
  );
}

export function StrategyChart({ settings }: StrategyChartProps) {
  const [selectedTab, setSelectedTab] = useState<'hard' | 'soft' | 'pairs'>('hard');

  const tableData = useMemo(() => {
    const data: Record<string, Record<string, Action>> = {};

    if (selectedTab === 'hard') {
      HARD_ROWS.forEach(row => {
        data[row] = {};
        DEALER_COLUMNS.forEach(dealer => {
          const strategy = getStrategyDirect('hard', row, dealer, settings);
          data[row][dealer] = strategy?.action || 'hit';
        });
      });
    } else if (selectedTab === 'soft') {
      SOFT_ROWS.forEach(row => {
        data[row] = {};
        DEALER_COLUMNS.forEach(dealer => {
          const strategy = getStrategyDirect('soft', row, dealer, settings);
          data[row][dealer] = strategy?.action || 'hit';
        });
      });
    } else {
      PAIR_ROWS.forEach(row => {
        data[row] = {};
        DEALER_COLUMNS.forEach(dealer => {
          const strategy = getStrategyDirect('pair', row, dealer, settings);
          data[row][dealer] = strategy?.action || 'hit';
        });
      });
    }

    return data;
  }, [selectedTab, settings]);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
            <span className="text-primary">Strategy</span> Chart
          </h1>
          <p className="text-muted-foreground text-lg">
            Complete basic strategy reference for Atlantic City rules
          </p>
        </div>

        {/* Legend */}
        <Card className="animate-fade-in">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <span className="text-muted-foreground font-medium">Legend:</span>
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 rounded bg-green-600 flex items-center justify-center text-white text-xs font-bold">S</div>
                <span className="text-muted-foreground">Stand</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 rounded bg-orange-500 flex items-center justify-center text-white text-xs font-bold">H</div>
                <span className="text-muted-foreground">Hit</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center text-white text-xs font-bold">D</div>
                <span className="text-muted-foreground">Double</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 rounded bg-purple-600 flex items-center justify-center text-white text-xs font-bold">P</div>
                <span className="text-muted-foreground">Split</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 rounded bg-red-500 flex items-center justify-center text-white text-xs font-bold">Sr</div>
                <span className="text-muted-foreground">Surrender</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strategy Tabs */}
        <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <LayoutGrid className="w-5 h-5" />
              Strategy Matrix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as 'hard' | 'soft' | 'pairs')}>
              <TabsList className="w-full mb-4">
                <TabsTrigger value="hard" className="flex-1">Hard Totals</TabsTrigger>
                <TabsTrigger value="soft" className="flex-1">Soft Totals</TabsTrigger>
                <TabsTrigger value="pairs" className="flex-1">Pairs</TabsTrigger>
              </TabsList>

              <TabsContent value="hard">
                <p className="text-sm text-muted-foreground mb-4">
                  Your hand has no Ace counted as 11 (or no Ace at all)
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs md:text-sm">
                    <thead>
                      <tr>
                        <th className="p-2 text-left font-semibold bg-muted rounded-tl-lg">You</th>
                        {DEALER_COLUMNS.map(dealer => (
                          <th key={dealer} className="p-2 text-center font-semibold bg-muted">
                            {dealer === '10' ? '10' : dealer === 'A' ? 'A' : dealer}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {HARD_ROWS.map(row => (
                        <tr key={row}>
                          <td className="p-2 font-semibold bg-muted/50">{row}</td>
                          {DEALER_COLUMNS.map(dealer => (
                            <td key={dealer} className="p-1">
                              <StrategyCell action={tableData[row]?.[dealer] || 'hit'} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="soft">
                <p className="text-sm text-muted-foreground mb-4">
                  Your hand has an Ace counted as 11 (e.g., A+6 = soft 17)
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs md:text-sm">
                    <thead>
                      <tr>
                        <th className="p-2 text-left font-semibold bg-muted rounded-tl-lg">You</th>
                        {DEALER_COLUMNS.map(dealer => (
                          <th key={dealer} className="p-2 text-center font-semibold bg-muted">
                            {dealer === '10' ? '10' : dealer === 'A' ? 'A' : dealer}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {SOFT_ROWS.map(row => {
                        const displayRow = row.replace('A,', 'A+');
                        return (
                          <tr key={row}>
                            <td className="p-2 font-semibold bg-muted/50">{displayRow}</td>
                            {DEALER_COLUMNS.map(dealer => (
                              <td key={dealer} className="p-1">
                                <StrategyCell action={tableData[row]?.[dealer] || 'hit'} />
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="pairs">
                <p className="text-sm text-muted-foreground mb-4">
                  Your first two cards are a pair (same rank)
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs md:text-sm">
                    <thead>
                      <tr>
                        <th className="p-2 text-left font-semibold bg-muted rounded-tl-lg">Pair</th>
                        {DEALER_COLUMNS.map(dealer => (
                          <th key={dealer} className="p-2 text-center font-semibold bg-muted">
                            {dealer === '10' ? '10' : dealer === 'A' ? 'A' : dealer}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {PAIR_ROWS.map(row => {
                        const displayRow = row.replace(',', '-');
                        return (
                          <tr key={row}>
                            <td className="p-2 font-semibold bg-muted/50">{displayRow}</td>
                            {DEALER_COLUMNS.map(dealer => (
                              <td key={dealer} className="p-1">
                                <StrategyCell action={tableData[row]?.[dealer] || 'hit'} />
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Quick Reference */}
        <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5" />
              Quick Reference
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Hard Hands</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Stand on 17+</li>
                  <li>• Hit 11 or less</li>
                  <li>• Stand on 12 vs 4-6</li>
                  <li>• Stand on 13-16 vs 2-6</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Soft Hands</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Double A+7 vs 3-6</li>
                  <li>• Double A+6 vs 3-6</li>
                  <li>• Double A+5 vs 4-6</li>
                  <li>• Double A+4 vs 5-6</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Pairs</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Always split AAs and 8s</li>
                  <li>• Never split 5s and 10s</li>
                  <li>• Split 2s, 3s, 7s vs 2-7</li>
                  <li>• Split 6s vs 2-6</li>
                  <li>• Split 9s vs 2-6, 8-9</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
