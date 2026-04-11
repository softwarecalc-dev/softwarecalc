import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

function formatNumber(n: number): string {
  return n.toFixed(2);
}

export function DebtToIncomeCalculator() {
  const [debtPayments, setDebtPayments] = useState('');
  const [grossIncome, setGrossIncome] = useState('');
  const [result, setResult] = useState<{ dti: number; remaining: number } | null>(null);
  const [errors, setErrors] = useState<{ debtPayments?: string; grossIncome?: string }>({});

  const handleCalculate = () => {
    const dp = parseFloat(debtPayments);
    const gi = parseFloat(grossIncome);
    const errs: { debtPayments?: string; grossIncome?: string } = {};

    if (debtPayments.trim() === '' || isNaN(dp) || dp < 0) errs.debtPayments = 'Enter a valid monthly debt amount (0 or more).';
    if (grossIncome.trim() === '' || isNaN(gi) || gi <= 0) errs.grossIncome = 'Enter a valid gross monthly income (greater than 0).';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    setResult({ dti: (dp / gi) * 100, remaining: gi - dp });
  };

  const handleReset = () => {
    setDebtPayments('');
    setGrossIncome('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Income &amp; Debt Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="debtPayments">Monthly Debt Payments</Label>
              <Input
                id="debtPayments"
                type="number"
                placeholder="e.g. 500"
                min="0"
                step="0.01"
                value={debtPayments}
                onChange={(e) => { setDebtPayments(e.target.value); setErrors((prev) => ({ ...prev, debtPayments: undefined })); }}
              />
              {errors.debtPayments && <p className="text-xs text-destructive">{errors.debtPayments}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="grossIncome">Gross Monthly Income</Label>
              <Input
                id="grossIncome"
                type="number"
                placeholder="e.g. 5000"
                min="0.01"
                step="0.01"
                value={grossIncome}
                onChange={(e) => { setGrossIncome(e.target.value); setErrors((prev) => ({ ...prev, grossIncome: undefined })); }}
              />
              {errors.grossIncome && <p className="text-xs text-destructive">{errors.grossIncome}</p>}
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
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1 break-words">Debt-to-Income Ratio</p>
              <p className="text-2xl font-bold text-primary truncate">{formatNumber(result.dti)}%</p>
              <p className="text-xs text-muted-foreground mt-2">
                {debtPayments} ÷ {grossIncome} × 100
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1 break-words">Remaining Income</p>
              <p className="text-2xl font-bold truncate">{formatNumber(result.remaining)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {grossIncome} − {debtPayments}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
