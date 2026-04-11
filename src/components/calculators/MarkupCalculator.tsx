import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

function formatNumber(n: number): string {
  return n.toFixed(2);
}

export function MarkupCalculator() {
  const [cost, setCost] = useState('');
  const [markup, setMarkup] = useState('');
  const [result, setResult] = useState<{ sellingPrice: number; profit: number } | null>(null);
  const [errors, setErrors] = useState<{ cost?: string; markup?: string }>({});

  const handleCalculate = () => {
    const c = parseFloat(cost);
    const m = parseFloat(markup);
    const errs: { cost?: string; markup?: string } = {};

    if (cost.trim() === '' || isNaN(c) || c < 0) errs.cost = 'Enter a valid cost (0 or more).';
    if (markup.trim() === '' || isNaN(m) || m < 0) errs.markup = 'Enter a valid markup (0 or more).';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    const sellingPrice = c * (1 + m / 100);
    const profit = sellingPrice - c;
    setResult({ sellingPrice, profit });
  };

  const handleReset = () => {
    setCost('');
    setMarkup('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Markup Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cost">Cost ($)</Label>
              <Input
                id="cost"
                type="number"
                placeholder="e.g. 100"
                min="0"
                step="0.01"
                value={cost}
                onChange={(e) => { setCost(e.target.value); setErrors((prev) => ({ ...prev, cost: undefined })); }}
              />
              {errors.cost && <p className="text-xs text-destructive">{errors.cost}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="markup">Markup (%)</Label>
              <Input
                id="markup"
                type="number"
                placeholder="e.g. 25"
                min="0"
                step="0.01"
                value={markup}
                onChange={(e) => { setMarkup(e.target.value); setErrors((prev) => ({ ...prev, markup: undefined })); }}
              />
              {errors.markup && <p className="text-xs text-destructive">{errors.markup}</p>}
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
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Selling Price</p>
              <p className="text-2xl font-bold text-primary">${formatNumber(result.sellingPrice)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                ${cost} + ${formatNumber(result.profit)} profit
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Profit</p>
              <p className="text-2xl font-bold">${formatNumber(result.profit)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {markup}% markup on ${cost}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
