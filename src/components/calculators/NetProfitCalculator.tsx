import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

function formatNumber(n: number): string {
  return n.toFixed(2);
}

export function NetProfitCalculator() {
  const [revenue, setRevenue] = useState('');
  const [expenses, setExpenses] = useState('');
  const [result, setResult] = useState<{ profit: number; margin: number } | null>(null);
  const [errors, setErrors] = useState<{ revenue?: string; expenses?: string }>({});

  const handleCalculate = () => {
    const rev = parseFloat(revenue);
    const exp = parseFloat(expenses);
    const errs: { revenue?: string; expenses?: string } = {};

    if (revenue.trim() === '' || isNaN(rev) || rev <= 0) errs.revenue = 'Enter a valid revenue amount (greater than 0).';
    if (expenses.trim() === '' || isNaN(exp) || exp < 0) errs.expenses = 'Enter a valid expenses amount (0 or more).';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    const profit = rev - exp;
    setResult({ profit, margin: (profit / rev) * 100 });
  };

  const handleReset = () => {
    setRevenue('');
    setExpenses('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Revenue &amp; Expense Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="revenue">Revenue</Label>
              <Input
                id="revenue"
                type="number"
                placeholder="e.g. 100000"
                min="0.01"
                step="0.01"
                value={revenue}
                onChange={(e) => { setRevenue(e.target.value); setErrors((prev) => ({ ...prev, revenue: undefined })); }}
              />
              {errors.revenue && <p className="text-xs text-destructive">{errors.revenue}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="expenses">Total Expenses</Label>
              <Input
                id="expenses"
                type="number"
                placeholder="e.g. 75000"
                min="0"
                step="0.01"
                value={expenses}
                onChange={(e) => { setExpenses(e.target.value); setErrors((prev) => ({ ...prev, expenses: undefined })); }}
              />
              {errors.expenses && <p className="text-xs text-destructive">{errors.expenses}</p>}
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
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1 break-words">Net Profit</p>
              <p className="text-2xl font-bold text-primary truncate">{formatNumber(result.profit)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {revenue} − {expenses}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1 break-words">Net Profit Margin</p>
              <p className="text-2xl font-bold truncate">{formatNumber(result.margin)}%</p>
              <p className="text-xs text-muted-foreground mt-2">
                ({revenue} − {expenses}) ÷ {revenue} × 100
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
