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

export function SimplifyFractionsCalculator() {
  const [numerator, setNumerator] = useState('');
  const [denominator, setDenominator] = useState('');
  const [result, setResult] = useState<{ numerator: number; denominator: number } | null>(null);
  const [errors, setErrors] = useState<{ numerator?: string; denominator?: string }>({});

  const handleCalculate = () => {
    const num = parseInt(numerator, 10);
    const den = parseInt(denominator, 10);
    const errs: { numerator?: string; denominator?: string } = {};

    if (numerator.trim() === '' || isNaN(num)) errs.numerator = 'Enter a valid integer.';
    if (denominator.trim() === '' || isNaN(den)) errs.denominator = 'Enter a valid integer.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    if (den === 0) {
      setErrors({ denominator: 'Denominator cannot be 0.' });
      setResult(null);
      return;
    }

    setErrors({});
    const divisor = gcf(Math.abs(num), Math.abs(den));
    const sign = den < 0 ? -1 : 1;
    setResult({ numerator: (sign * num) / divisor, denominator: Math.abs(den) / divisor });
  };

  const handleReset = () => {
    setNumerator('');
    setDenominator('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Fraction Input</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="numerator">Numerator</Label>
              <Input
                id="numerator"
                type="number"
                placeholder="e.g. 6"
                step="1"
                value={numerator}
                onChange={(e) => { setNumerator(e.target.value); setErrors((prev) => ({ ...prev, numerator: undefined })); }}
              />
              {errors.numerator && <p className="text-xs text-destructive">{errors.numerator}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="denominator">Denominator</Label>
              <Input
                id="denominator"
                type="number"
                placeholder="e.g. 9"
                step="1"
                value={denominator}
                onChange={(e) => { setDenominator(e.target.value); setErrors((prev) => ({ ...prev, denominator: undefined })); }}
              />
              {errors.denominator && <p className="text-xs text-destructive">{errors.denominator}</p>}
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

      {result && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Simplified Fraction</p>
              <p className="text-2xl font-bold text-primary">{result.numerator}/{result.denominator}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {numerator}/{denominator} simplified
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">GCF Used</p>
              <p className="text-2xl font-bold">{gcf(Math.abs(parseInt(numerator, 10)), Math.abs(parseInt(denominator, 10)))}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Greatest common factor
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
