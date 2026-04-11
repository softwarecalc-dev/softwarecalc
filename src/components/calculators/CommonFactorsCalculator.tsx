import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

function getFactors(n: number): number[] {
  const factors: number[] = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) factors.push(i);
  }
  return factors;
}

export function CommonFactorsCalculator() {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [result, setResult] = useState<number[] | null>(null);
  const [errors, setErrors] = useState<{ first?: string; second?: string }>({});

  const handleCalculate = () => {
    const a = parseInt(first, 10);
    const b = parseInt(second, 10);
    const errs: { first?: string; second?: string } = {};

    if (first.trim() === '' || isNaN(a) || a < 1) errs.first = 'Enter a valid integer (1 or more).';
    if (second.trim() === '' || isNaN(b) || b < 1) errs.second = 'Enter a valid integer (1 or more).';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    const factorsA = new Set(getFactors(a));
    const common = getFactors(b).filter((f) => factorsA.has(f));
    setResult(common);
  };

  const handleReset = () => {
    setFirst('');
    setSecond('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Common Factors Input</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first">First Number</Label>
              <Input
                id="first"
                type="number"
                placeholder="e.g. 12"
                step="1"
                min="1"
                value={first}
                onChange={(e) => { setFirst(e.target.value); setErrors((prev) => ({ ...prev, first: undefined })); }}
              />
              {errors.first && <p className="text-xs text-destructive">{errors.first}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="second">Second Number</Label>
              <Input
                id="second"
                type="number"
                placeholder="e.g. 18"
                step="1"
                min="1"
                value={second}
                onChange={(e) => { setSecond(e.target.value); setErrors((prev) => ({ ...prev, second: undefined })); }}
              />
              {errors.second && <p className="text-xs text-destructive">{errors.second}</p>}
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
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Common Factors</p>
              <p className="text-2xl font-bold text-primary break-all">{result.join(', ')}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {result.length} common factor{result.length === 1 ? '' : 's'} of {first} and {second}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">First Number</span>
                <span className="font-medium">{first}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Second Number</span>
                <span className="font-medium">{second}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Common Factors</span>
                <span className="font-medium">{result.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Greatest Common Factor</span>
                <span className="font-medium">{result[result.length - 1]}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
