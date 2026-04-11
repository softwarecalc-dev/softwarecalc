import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

function formatNumber(n: number): string {
  return n.toFixed(2);
}

export function RuleOf72Calculator() {
  const [returnRate, setReturnRate] = useState('');
  const [result, setResult] = useState<{ years: number } | null>(null);
  const [errors, setErrors] = useState<{ returnRate?: string }>({});

  const handleCalculate = () => {
    const r = parseFloat(returnRate);
    const errs: { returnRate?: string } = {};

    if (returnRate.trim() === '' || isNaN(r) || r <= 0) errs.returnRate = 'Enter a valid annual return rate (greater than 0).';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    setResult({ years: 72 / r });
  };

  const handleReset = () => {
    setReturnRate('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Return Rate</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="returnRate">Annual Return Rate (%)</Label>
              <Input
                id="returnRate"
                type="number"
                placeholder="e.g. 8"
                min="0.01"
                step="0.01"
                value={returnRate}
                onChange={(e) => { setReturnRate(e.target.value); setErrors((prev) => ({ ...prev, returnRate: undefined })); }}
              />
              {errors.returnRate && <p className="text-xs text-destructive">{errors.returnRate}</p>}
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
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1 break-words">Estimated Years to Double</p>
              <p className="text-2xl font-bold text-primary truncate">{formatNumber(result.years)} years</p>
              <p className="text-xs text-muted-foreground mt-2">
                72 ÷ {returnRate}%
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
