import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

function formatNumber(n: number): string {
  return n.toFixed(2);
}

export function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState<{ interest: number } | null>(null);
  const [errors, setErrors] = useState<{ principal?: string; rate?: string; time?: string }>({});

  const handleCalculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);
    const errs: { principal?: string; rate?: string; time?: string } = {};

    if (principal.trim() === '' || isNaN(p) || p < 0) errs.principal = 'Enter a valid principal (0 or more).';
    if (rate.trim() === '' || isNaN(r) || r < 0) errs.rate = 'Enter a valid interest rate (0 or more).';
    if (time.trim() === '' || isNaN(t) || t < 0) errs.time = 'Enter a valid time (0 or more).';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    const interest = p * (r / 100) * t;
    setResult({ interest });
  };

  const handleReset = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Simple Interest Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="principal">Principal</Label>
              <Input
                id="principal"
                type="number"
                placeholder="e.g. 1000"
                min="0"
                step="0.01"
                value={principal}
                onChange={(e) => { setPrincipal(e.target.value); setErrors((prev) => ({ ...prev, principal: undefined })); }}
              />
              {errors.principal && <p className="text-xs text-destructive">{errors.principal}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rate">Interest Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                placeholder="e.g. 5"
                min="0"
                step="0.01"
                value={rate}
                onChange={(e) => { setRate(e.target.value); setErrors((prev) => ({ ...prev, rate: undefined })); }}
              />
              {errors.rate && <p className="text-xs text-destructive">{errors.rate}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time (years)</Label>
              <Input
                id="time"
                type="number"
                placeholder="e.g. 2"
                min="0"
                step="0.01"
                value={time}
                onChange={(e) => { setTime(e.target.value); setErrors((prev) => ({ ...prev, time: undefined })); }}
              />
              {errors.time && <p className="text-xs text-destructive">{errors.time}</p>}
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
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="pt-5 pb-5">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Interest</p>
            <p className="text-2xl font-bold text-primary">${formatNumber(result.interest)}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {principal} × {rate}% × {time} years
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
