import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

function formatNumber(n: number): string {
  return parseFloat(n.toFixed(2)).toString();
}

export function PriceDifferenceCalculator() {
  const [firstPrice, setFirstPrice] = useState('');
  const [secondPrice, setSecondPrice] = useState('');
  const [result, setResult] = useState<{ difference: number; percentDiff: number } | null>(null);
  const [errors, setErrors] = useState<{ firstPrice?: string; secondPrice?: string }>({});

  const handleCalculate = () => {
    const p1 = parseFloat(firstPrice);
    const p2 = parseFloat(secondPrice);
    const errs: { firstPrice?: string; secondPrice?: string } = {};

    if (firstPrice.trim() === '' || isNaN(p1) || p1 < 0) errs.firstPrice = 'Enter a valid price (0 or more).';
    if (secondPrice.trim() === '' || isNaN(p2) || p2 < 0) errs.secondPrice = 'Enter a valid price (0 or more).';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    const difference = p1 - p2;
    const percentDiff = p1 !== 0 ? (difference / p1) * 100 : 0;
    setResult({ difference, percentDiff });
  };

  const handleReset = () => {
    setFirstPrice('');
    setSecondPrice('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price Comparison</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstPrice">First Price</Label>
              <Input
                id="firstPrice"
                type="number"
                placeholder="e.g. 100"
                min="0"
                step="0.01"
                value={firstPrice}
                onChange={(e) => { setFirstPrice(e.target.value); setErrors((p) => ({ ...p, firstPrice: undefined })); }}
              />
              {errors.firstPrice && <p className="text-xs text-destructive">{errors.firstPrice}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondPrice">Second Price</Label>
              <Input
                id="secondPrice"
                type="number"
                placeholder="e.g. 80"
                min="0"
                step="0.01"
                value={secondPrice}
                onChange={(e) => { setSecondPrice(e.target.value); setErrors((p) => ({ ...p, secondPrice: undefined })); }}
              />
              {errors.secondPrice && <p className="text-xs text-destructive">{errors.secondPrice}</p>}
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
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Difference</p>
              <p className="text-2xl font-bold text-primary">{formatNumber(result.difference)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {firstPrice} − {secondPrice}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Percentage Difference</p>
              <p className="text-2xl font-bold">{formatNumber(result.percentDiff)}%</p>
              <p className="text-xs text-muted-foreground mt-2">
                relative to first price
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
