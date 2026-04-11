import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

function formatNumber(n: number): string {
  return n.toFixed(2);
}

export function GrossProfitCalculator() {
  const [revenue, setRevenue] = useState('');
  const [cogs, setCogs] = useState('');
  const [result, setResult] = useState<{ profit: number; margin: number } | null>(null);
  const [errors, setErrors] = useState<{ revenue?: string; cogs?: string }>({});

  const handleCalculate = () => {
    const rev = parseFloat(revenue);
    const cg = parseFloat(cogs);
    const errs: { revenue?: string; cogs?: string } = {};

    if (revenue.trim() === '' || isNaN(rev) || rev <= 0) errs.revenue = 'Enter a valid revenue amount (greater than 0).';
    if (cogs.trim() === '' || isNaN(cg) || cg < 0) errs.cogs = 'Enter a valid COGS amount (0 or more).';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    const profit = rev - cg;
    setResult({ profit, margin: (profit / rev) * 100 });
  };

  const handleReset = () => {
    setRevenue('');
    setCogs('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Revenue &amp; Cost Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="revenue">Revenue</Label>
              <Input
                id="revenue"
                type="number"
                placeholder="e.g. 50000"
                min="0.01"
                step="0.01"
                value={revenue}
                onChange={(e) => { setRevenue(e.target.value); setErrors((prev) => ({ ...prev, revenue: undefined })); }}
              />
              {errors.revenue && <p className="text-xs text-destructive">{errors.revenue}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cogs">Cost of Goods Sold (COGS)</Label>
              <Input
                id="cogs"
                type="number"
                placeholder="e.g. 30000"
                min="0"
                step="0.01"
                value={cogs}
                onChange={(e) => { setCogs(e.target.value); setErrors((prev) => ({ ...prev, cogs: undefined })); }}
              />
              {errors.cogs && <p className="text-xs text-destructive">{errors.cogs}</p>}
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
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1 break-words">Gross Profit</p>
              <p className="text-2xl font-bold text-primary truncate">{formatNumber(result.profit)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {revenue} − {cogs}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1 break-words">Gross Profit Margin</p>
              <p className="text-2xl font-bold truncate">{formatNumber(result.margin)}%</p>
              <p className="text-xs text-muted-foreground mt-2">
                ({revenue} − {cogs}) ÷ {revenue} × 100
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
