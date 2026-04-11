import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

function primeFactors(n: number): number[] {
  const factors: number[] = [];
  let d = 2;
  while (n > 1) {
    while (n % d === 0) {
      factors.push(d);
      n = Math.floor(n / d);
    }
    d++;
  }
  return factors;
}

export function PrimeFactorizationCalculator() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState<number[] | null>(null);
  const [errors, setErrors] = useState<{ number?: string }>({});

  const handleCalculate = () => {
    const n = parseInt(number, 10);
    const errs: { number?: string } = {};

    if (number.trim() === '' || isNaN(n)) errs.number = 'Enter a valid integer.';
    else if (n < 2) errs.number = 'Number must be 2 or greater.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    setResult(primeFactors(n));
  };

  const handleReset = () => {
    setNumber('');
    setResult(null);
    setErrors({});
  };

  const uniqueFactors = result ? [...new Set(result)] : [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Prime Factorization Input</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="number">Number</Label>
              <Input
                id="number"
                type="number"
                placeholder="e.g. 12"
                step="1"
                min="2"
                value={number}
                onChange={(e) => { setNumber(e.target.value); setErrors({}); }}
              />
              {errors.number && <p className="text-xs text-destructive">{errors.number}</p>}
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
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Prime Factorization</p>
              <p className="text-2xl font-bold text-primary break-all">{number} = {result.join(' × ')}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {result.length} prime factor{result.length === 1 ? '' : 's'} (with repetition)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Number</span>
                <span className="font-medium">{number}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Factors</span>
                <span className="font-medium">{result.join(' × ')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Unique Primes</span>
                <span className="font-medium">{uniqueFactors.join(', ')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Factors</span>
                <span className="font-medium">{result.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
