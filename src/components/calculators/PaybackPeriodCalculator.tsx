import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

function formatNumber(n: number): string {
  return n.toFixed(2);
}

export function PaybackPeriodCalculator() {
  const [investment, setInvestment] = useState('');
  const [cashFlow, setCashFlow] = useState('');
  const [result, setResult] = useState<{ years: number; months: number } | null>(null);
  const [errors, setErrors] = useState<{ investment?: string; cashFlow?: string }>({});

  const handleCalculate = () => {
    const inv = parseFloat(investment);
    const cf = parseFloat(cashFlow);
    const errs: { investment?: string; cashFlow?: string } = {};

    if (investment.trim() === '' || isNaN(inv) || inv < 0) errs.investment = 'Enter a valid investment amount (0 or more).';
    if (cashFlow.trim() === '' || isNaN(cf) || cf <= 0) errs.cashFlow = 'Enter a valid annual cash flow (greater than 0).';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    const years = inv / cf;
    setResult({ years, months: years * 12 });
  };

  const handleReset = () => {
    setInvestment('');
    setCashFlow('');
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
              <Label htmlFor="investment">Initial Investment</Label>
              <Input
                id="investment"
                type="number"
                placeholder="e.g. 50000"
                min="0"
                step="0.01"
                value={investment}
                onChange={(e) => { setInvestment(e.target.value); setErrors((prev) => ({ ...prev, investment: undefined })); }}
              />
              {errors.investment && <p className="text-xs text-destructive">{errors.investment}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cashFlow">Annual Cash Flow</Label>
              <Input
                id="cashFlow"
                type="number"
                placeholder="e.g. 10000"
                min="0.01"
                step="0.01"
                value={cashFlow}
                onChange={(e) => { setCashFlow(e.target.value); setErrors((prev) => ({ ...prev, cashFlow: undefined })); }}
              />
              {errors.cashFlow && <p className="text-xs text-destructive">{errors.cashFlow}</p>}
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
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1 break-words">Payback Period</p>
              <p className="text-2xl font-bold text-primary truncate">{formatNumber(result.years)} years</p>
              <p className="text-xs text-muted-foreground mt-2">
                {investment} ÷ {cashFlow} annual cash flow
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1 break-words">Monthly Equivalent</p>
              <p className="text-2xl font-bold truncate">{formatNumber(result.months)} months</p>
              <p className="text-xs text-muted-foreground mt-2">
                {formatNumber(result.years)} years × 12
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
