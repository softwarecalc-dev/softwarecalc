import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

export function MixedNumberToImproperFractionCalculator() {
  const [whole, setWhole] = useState('');
  const [numerator, setNumerator] = useState('');
  const [denominator, setDenominator] = useState('');
  const [result, setResult] = useState<{ numerator: number; denominator: number } | null>(null);
  const [errors, setErrors] = useState<{ whole?: string; numerator?: string; denominator?: string }>({});

  const handleCalculate = () => {
    const w = parseInt(whole, 10);
    const num = parseInt(numerator, 10);
    const den = parseInt(denominator, 10);
    const errs: { whole?: string; numerator?: string; denominator?: string } = {};

    if (whole.trim() === '' || isNaN(w)) errs.whole = 'Enter a valid integer.';
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
    setResult({ numerator: w * den + num, denominator: den });
  };

  const handleReset = () => {
    setWhole('');
    setNumerator('');
    setDenominator('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Mixed Number Input</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="whole">Whole Number</Label>
              <Input
                id="whole"
                type="number"
                placeholder="e.g. 2"
                step="1"
                value={whole}
                onChange={(e) => { setWhole(e.target.value); setErrors((prev) => ({ ...prev, whole: undefined })); }}
              />
              {errors.whole && <p className="text-xs text-destructive">{errors.whole}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="numerator">Numerator</Label>
              <Input
                id="numerator"
                type="number"
                placeholder="e.g. 3"
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
                placeholder="e.g. 4"
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
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Improper Fraction</p>
              <p className="text-2xl font-bold text-primary">{result.numerator}/{result.denominator}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {whole} {numerator}/{denominator} converted
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">New Numerator</span>
                <span className="font-medium">{result.numerator}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Denominator</span>
                <span className="font-medium">{result.denominator}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Formula</span>
                <span className="font-medium">({whole} × {denominator}) + {numerator}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
