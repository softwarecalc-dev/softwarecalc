import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

export function RoundingCalculator() {
  const [number, setNumber] = useState('');
  const [decimalPlaces, setDecimalPlaces] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ number?: string; decimalPlaces?: string }>({});

  const handleCalculate = () => {
    const num = parseFloat(number);
    const dp = parseInt(decimalPlaces, 10);
    const errs: { number?: string; decimalPlaces?: string } = {};

    if (number.trim() === '' || isNaN(num)) errs.number = 'Enter a valid number.';
    if (decimalPlaces.trim() === '' || isNaN(dp)) errs.decimalPlaces = 'Enter a valid whole number.';
    else if (dp < 0) errs.decimalPlaces = 'Decimal places cannot be negative.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    setResult(num.toFixed(dp));
  };

  const handleReset = () => {
    setNumber('');
    setDecimalPlaces('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Rounding Input</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="number">Number</Label>
              <Input
                id="number"
                type="number"
                placeholder="e.g. 3.14159"
                step="any"
                value={number}
                onChange={(e) => { setNumber(e.target.value); setErrors((prev) => ({ ...prev, number: undefined })); }}
              />
              {errors.number && <p className="text-xs text-destructive">{errors.number}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="decimalPlaces">Decimal Places</Label>
              <Input
                id="decimalPlaces"
                type="number"
                placeholder="e.g. 2"
                step="1"
                min="0"
                value={decimalPlaces}
                onChange={(e) => { setDecimalPlaces(e.target.value); setErrors((prev) => ({ ...prev, decimalPlaces: undefined })); }}
              />
              {errors.decimalPlaces && <p className="text-xs text-destructive">{errors.decimalPlaces}</p>}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Rounded Result</p>
              <p className="text-2xl font-bold text-primary break-all">{result}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {number} rounded to {decimalPlaces} decimal place{parseInt(decimalPlaces, 10) === 1 ? '' : 's'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Original</span>
                <span className="font-medium">{number}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Decimal Places</span>
                <span className="font-medium">{decimalPlaces}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rounded</span>
                <span className="font-medium">{result}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
