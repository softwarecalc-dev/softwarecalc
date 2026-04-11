import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

function gcf(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function toFraction(decimal: number): { numerator: number; denominator: number } {
  const precision = 1e9;
  let numerator = Math.round(decimal * precision);
  let denominator = precision;
  const divisor = gcf(Math.abs(numerator), denominator);
  numerator = numerator / divisor;
  denominator = denominator / divisor;
  return { numerator, denominator };
}

export function DecimalToFractionCalculator() {
  const [decimal, setDecimal] = useState('');
  const [result, setResult] = useState<{ numerator: number; denominator: number } | null>(null);
  const [error, setError] = useState<string | undefined>();

  const handleCalculate = () => {
    const n = parseFloat(decimal);

    if (decimal.trim() === '' || isNaN(n)) {
      setError('Enter a valid decimal number.');
      setResult(null);
      return;
    }

    setError(undefined);
    setResult(toFraction(n));
  };

  const handleReset = () => {
    setDecimal('');
    setResult(null);
    setError(undefined);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Decimal Input</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="decimal">Decimal Number</Label>
              <Input
                id="decimal"
                type="number"
                placeholder="e.g. 0.75"
                step="any"
                value={decimal}
                onChange={(e) => { setDecimal(e.target.value); setError(undefined); }}
              />
              {error && <p className="text-xs text-destructive">{error}</p>}
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <Button onClick={handleCalculate}>Calculate</Button>
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RefreshCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {result !== null && (
        <div className="grid grid-cols-1 gap-4">
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Fraction</p>
              <p className="text-2xl font-bold text-primary break-all">
                {result.numerator}/{result.denominator}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Numerator: {result.numerator} &nbsp;·&nbsp; Denominator: {result.denominator}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
