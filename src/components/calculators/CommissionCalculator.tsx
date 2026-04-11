import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

function formatNumber(n: number): string {
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function CommissionCalculator() {
  const [saleAmount, setSaleAmount] = useState('');
  const [commissionRate, setCommissionRate] = useState('');
  const [result, setResult] = useState<{ commissionAmount: number; remainingAmount: number } | null>(null);
  const [errors, setErrors] = useState<{ saleAmount?: string; commissionRate?: string }>({});

  const handleCalculate = () => {
    const s = parseFloat(saleAmount);
    const r = parseFloat(commissionRate);
    const errs: { saleAmount?: string; commissionRate?: string } = {};

    if (saleAmount.trim() === '' || isNaN(s) || s < 0) errs.saleAmount = 'Enter a valid sale amount (0 or more).';
    if (commissionRate.trim() === '' || isNaN(r) || r < 0) errs.commissionRate = 'Enter a valid commission rate (0 or more).';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    const commissionAmount = s * (r / 100);
    const remainingAmount = s - commissionAmount;
    setResult({ commissionAmount, remainingAmount });
  };

  const handleReset = () => {
    setSaleAmount('');
    setCommissionRate('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Commission Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="saleAmount">Sale Amount</Label>
              <Input
                id="saleAmount"
                type="number"
                placeholder="e.g. 1000"
                min="0"
                step="0.01"
                value={saleAmount}
                onChange={(e) => { setSaleAmount(e.target.value); setErrors((prev) => ({ ...prev, saleAmount: undefined })); }}
              />
              {errors.saleAmount && <p className="text-xs text-destructive">{errors.saleAmount}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="commissionRate">Commission Rate (%)</Label>
              <Input
                id="commissionRate"
                type="number"
                placeholder="e.g. 5"
                min="0"
                step="0.01"
                value={commissionRate}
                onChange={(e) => { setCommissionRate(e.target.value); setErrors((prev) => ({ ...prev, commissionRate: undefined })); }}
              />
              {errors.commissionRate && <p className="text-xs text-destructive">{errors.commissionRate}</p>}
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
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Commission Amount</p>
              <p className="text-2xl font-bold text-primary">${formatNumber(result.commissionAmount)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {commissionRate}% of ${saleAmount}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Remaining Amount</p>
              <p className="text-2xl font-bold">${formatNumber(result.remainingAmount)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                ${saleAmount} - ${formatNumber(result.commissionAmount)}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
