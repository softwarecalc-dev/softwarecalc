import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

export function FractionToDecimalCalculator() {
  const [numerator, setNumerator] = useState('');
  const [denominator, setDenominator] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ numerator?: string; denominator?: string }>({});

  const handleCalculate = () => {
    const num = parseFloat(numerator);
    const den = parseFloat(denominator);
    const errs: { numerator?: string; denominator?: string } = {};

    if (numerator.trim() === '' || isNaN(num)) errs.numerator = 'Enter a valid number.';
    if (denominator.trim() === '' || isNaN(den)) errs.denominator = 'Enter a valid number.';

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
    setResult(num / den);
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
                placeholder="e.g. 3"
                step="any"
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
                step="any"
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

      {result !== null && (
        <div className="grid grid-cols-1 gap-4">
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Decimal</p>
              <p className="text-2xl font-bold text-primary break-all">{result}</p>
              <p className="text-xs text-muted-foreground mt-2">{numerator}/{denominator}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
