import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

export function DecimalToPercentCalculator() {
  const [decimal, setDecimal] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ decimal?: string }>({});

  const handleCalculate = () => {
    const d = parseFloat(decimal);
    const errs: { decimal?: string } = {};

    if (decimal.trim() === '' || isNaN(d)) errs.decimal = 'Enter a valid decimal number.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    setResult(d * 100);
  };

  const handleReset = () => {
    setDecimal('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Decimal to Percent Input</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="decimal">Decimal Number</Label>
              <Input
                id="decimal"
                type="number"
                placeholder="e.g. 0.75"
                step="any"
                value={decimal}
                onChange={(e) => { setDecimal(e.target.value); setErrors({}); }}
              />
              {errors.decimal && <p className="text-xs text-destructive">{errors.decimal}</p>}
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

      {result !== null && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Percent</p>
              <p className="text-2xl font-bold text-primary">{result.toLocaleString('en-US', { maximumFractionDigits: 10 })}%</p>
              <p className="text-xs text-muted-foreground mt-2">
                {decimal} × 100 = {result.toLocaleString('en-US', { maximumFractionDigits: 10 })}%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Decimal</span>
                <span className="font-medium">{decimal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Multiplied by</span>
                <span className="font-medium">100</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Percent</span>
                <span className="font-medium">{result.toLocaleString('en-US', { maximumFractionDigits: 10 })}%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
