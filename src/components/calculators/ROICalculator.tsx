import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

function formatNumber(n: number): string {
  return n.toFixed(2);
}

export function ROICalculator() {
  const [investment, setInvestment] = useState('');
  const [returnAmount, setReturnAmount] = useState('');
  const [result, setResult] = useState<{ roi: number; profit: number } | null>(null);
  const [errors, setErrors] = useState<{ investment?: string; returnAmount?: string }>({});

  const handleCalculate = () => {
    const inv = parseFloat(investment);
    const ret = parseFloat(returnAmount);
    const errs: { investment?: string; returnAmount?: string } = {};

    if (investment.trim() === '' || isNaN(inv) || inv <= 0) errs.investment = 'Enter a valid investment amount (greater than 0).';
    if (returnAmount.trim() === '' || isNaN(ret) || ret < 0) errs.returnAmount = 'Enter a valid return amount (0 or more).';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    const profit = ret - inv;
    setResult({ roi: (profit / inv) * 100, profit });
  };

  const handleReset = () => {
    setInvestment('');
    setReturnAmount('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Investment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="investment">Investment Amount</Label>
              <Input
                id="investment"
                type="number"
                placeholder="e.g. 10000"
                min="0.01"
                step="0.01"
                value={investment}
                onChange={(e) => { setInvestment(e.target.value); setErrors((prev) => ({ ...prev, investment: undefined })); }}
              />
              {errors.investment && <p className="text-xs text-destructive">{errors.investment}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="returnAmount">Return Amount</Label>
              <Input
                id="returnAmount"
                type="number"
                placeholder="e.g. 13000"
                min="0"
                step="0.01"
                value={returnAmount}
                onChange={(e) => { setReturnAmount(e.target.value); setErrors((prev) => ({ ...prev, returnAmount: undefined })); }}
              />
              {errors.returnAmount && <p className="text-xs text-destructive">{errors.returnAmount}</p>}
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
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1 break-words">ROI</p>
              <p className="text-2xl font-bold text-primary truncate">{formatNumber(result.roi)}%</p>
              <p className="text-xs text-muted-foreground mt-2">
                ({returnAmount} − {investment}) ÷ {investment} × 100
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1 break-words">Profit</p>
              <p className="text-2xl font-bold truncate">{formatNumber(result.profit)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {returnAmount} − {investment}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
