import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

function formatNumber(n: number): string {
  return n.toFixed(2);
}

export function ProfitMarginCalculator() {
  const [revenue, setRevenue] = useState('');
  const [cost, setCost] = useState('');
  const [result, setResult] = useState<{ profit: number; margin: number } | null>(null);
  const [errors, setErrors] = useState<{ revenue?: string; cost?: string }>({});

  const handleCalculate = () => {
    const r = parseFloat(revenue);
    const c = parseFloat(cost);
    const errs: { revenue?: string; cost?: string } = {};

    if (revenue.trim() === '' || isNaN(r) || r < 0) {
      errs.revenue = 'Enter a valid revenue (0 or more).';
    }
    if (cost.trim() === '' || isNaN(c) || c < 0) {
      errs.cost = 'Enter a valid cost (0 or more).';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    if (r === 0 && c > 0) {
      setErrors({ revenue: 'Revenue cannot be 0 when cost is greater than 0.' });
      setResult(null);
      return;
    }

    setErrors({});
    const profit = r - c;
    const margin = r > 0 ? (profit / r) * 100 : 0;
    setResult({ profit, margin });
  };

  const handleReset = () => {
    setRevenue('');
    setCost('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Profit Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="revenue">Revenue (Selling Price)</Label>
              <Input
                id="revenue"
                type="number"
                placeholder="e.g. 100"
                min="0"
                step="0.01"
                value={revenue}
                onChange={(e) => {
                  setRevenue(e.target.value);
                  setErrors((prev) => ({ ...prev, revenue: undefined }));
                }}
              />
              {errors.revenue && <p className="text-xs text-destructive">{errors.revenue}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cost">Cost</Label>
              <Input
                id="cost"
                type="number"
                placeholder="e.g. 75"
                min="0"
                step="0.01"
                value={cost}
                onChange={(e) => {
                  setCost(e.target.value);
                  setErrors((prev) => ({ ...prev, cost: undefined }));
                }}
              />
              {errors.cost && <p className="text-xs text-destructive">{errors.cost}</p>}
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
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Profit</p>
              <p className="text-2xl font-bold text-primary">${formatNumber(result.profit)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                ${revenue} - ${cost}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Profit Margin</p>
              <p className="text-2xl font-bold">{formatNumber(result.margin)}%</p>
              <p className="text-xs text-muted-foreground mt-2">
                ({formatNumber(result.profit)} / ${revenue}) × 100
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
