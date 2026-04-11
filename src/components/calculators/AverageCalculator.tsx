import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw, Hash, Sigma, BarChart2 } from 'lucide-react';

function parseNumbers(raw: string): number[] {
  return raw
    .split(/[\s,\n]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map((s) => parseFloat(s))
    .filter((n) => !isNaN(n));
}

function formatNumber(n: number): string {
  // Up to 6 significant digits, strip trailing zeros
  return parseFloat(n.toPrecision(10)).toString();
}

export function AverageCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ average: number; count: number; sum: number } | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    const numbers = parseNumbers(input);
    if (numbers.length === 0) {
      setError('Please enter at least one valid number.');
      setResult(null);
      return;
    }
    setError('');
    const sum = numbers.reduce((acc, n) => acc + n, 0);
    const average = sum / numbers.length;
    setResult({ average, count: numbers.length, sum });
  };

  const handleReset = () => {
    setInput('');
    setResult(null);
    setError('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleCalculate();
    }
  };

  return (
    <div className="space-y-6">
      {/* Input card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Enter Numbers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="numbers">
              Numbers{' '}
              <span className="text-muted-foreground text-xs font-normal">
                — separate by comma, space, or new line
              </span>
            </Label>
            <textarea
              id="numbers"
              rows={6}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (error) setError('');
              }}
              onKeyDown={handleKeyDown}
              placeholder={'10, 20, 30, 40\n\nor one per line:\n10\n20\n30'}
              className={`w-full rounded-md border px-3 py-2 text-sm font-mono resize-y bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
                error ? 'border-destructive focus:ring-destructive/40' : 'border-input'
              }`}
            />
            {error && <p className="text-xs text-destructive font-medium">{error}</p>}
            <p className="text-xs text-muted-foreground">
              Tip: you can also press <kbd className="px-1 py-0.5 rounded border text-xs bg-muted">Ctrl</kbd> + <kbd className="px-1 py-0.5 rounded border text-xs bg-muted">Enter</kbd> to calculate.
            </p>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleCalculate} className="gap-2">
              <BarChart2 className="w-4 h-4" />
              Calculate
            </Button>
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RefreshCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Average */}
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                  <BarChart2 className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Average (Mean)</p>
                  <p className="text-2xl font-bold text-primary truncate">{formatNumber(result.average)}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Formula: {formatNumber(result.sum)} ÷ {result.count}
              </p>
            </CardContent>
          </Card>

          {/* Count */}
          <Card>
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted shrink-0">
                  <Hash className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Count</p>
                  <p className="text-2xl font-bold">{result.count}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                {result.count} valid number{result.count !== 1 ? 's' : ''} found
              </p>
            </CardContent>
          </Card>

          {/* Sum */}
          <Card>
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted shrink-0">
                  <Sigma className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Sum</p>
                  <p className="text-2xl font-bold truncate">{formatNumber(result.sum)}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Total of all {result.count} number{result.count !== 1 ? 's' : ''}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
