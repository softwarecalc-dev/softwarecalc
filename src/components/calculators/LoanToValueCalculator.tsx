import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

function formatNumber(n: number): string {
  return n.toFixed(2);
}

export function LoanToValueCalculator() {
  const [propertyValue, setPropertyValue] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [result, setResult] = useState<{ ltv: number; equity: number } | null>(null);
  const [errors, setErrors] = useState<{ propertyValue?: string; loanAmount?: string }>({});

  const handleCalculate = () => {
    const pv = parseFloat(propertyValue);
    const la = parseFloat(loanAmount);
    const errs: { propertyValue?: string; loanAmount?: string } = {};

    if (propertyValue.trim() === '' || isNaN(pv) || pv <= 0) errs.propertyValue = 'Enter a valid property value (greater than 0).';
    if (loanAmount.trim() === '' || isNaN(la) || la < 0) errs.loanAmount = 'Enter a valid loan amount (0 or more).';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    setResult({ ltv: (la / pv) * 100, equity: pv - la });
  };

  const handleReset = () => {
    setPropertyValue('');
    setLoanAmount('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Property Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="propertyValue">Property Value</Label>
              <Input
                id="propertyValue"
                type="number"
                placeholder="e.g. 300000"
                min="0"
                step="0.01"
                value={propertyValue}
                onChange={(e) => { setPropertyValue(e.target.value); setErrors((prev) => ({ ...prev, propertyValue: undefined })); }}
              />
              {errors.propertyValue && <p className="text-xs text-destructive">{errors.propertyValue}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="loanAmount">Loan Amount</Label>
              <Input
                id="loanAmount"
                type="number"
                placeholder="e.g. 240000"
                min="0"
                step="0.01"
                value={loanAmount}
                onChange={(e) => { setLoanAmount(e.target.value); setErrors((prev) => ({ ...prev, loanAmount: undefined })); }}
              />
              {errors.loanAmount && <p className="text-xs text-destructive">{errors.loanAmount}</p>}
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
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1 break-words">Loan-to-Value Ratio</p>
              <p className="text-2xl font-bold text-primary truncate">{formatNumber(result.ltv)}%</p>
              <p className="text-xs text-muted-foreground mt-2">
                {loanAmount} ÷ {propertyValue} × 100
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1 break-words">Equity Amount</p>
              <p className="text-2xl font-bold truncate">{formatNumber(result.equity)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {propertyValue} − {loanAmount}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
