import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

export function ExponentCalculator() {
  const [base, setBase] = useState('');
  const [exponent, setExponent] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ base?: string; exponent?: string }>({});

  const handleCalculate = () => {
    const b = parseFloat(base);
    const e = parseFloat(exponent);
    const errs: { base?: string; exponent?: string } = {};

    if (base.trim() === '' || isNaN(b)) errs.base = 'Enter a valid base.';
    if (exponent.trim() === '' || isNaN(e)) errs.exponent = 'Enter a valid exponent.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    setResult(Math.pow(b, e));
  };

  const handleReset = () => {
    setBase('');
    setExponent('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Base &amp; Exponent</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="base">Base</Label>
              <Input
                id="base"
                type="number"
                placeholder="e.g. 2"
                step="any"
                value={base}
                onChange={(e) => { setBase(e.target.value); setErrors((prev) => ({ ...prev, base: undefined })); }}
              />
              {errors.base && <p className="text-xs text-destructive">{errors.base}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="exponent">Exponent</Label>
              <Input
                id="exponent"
                type="number"
                placeholder="e.g. 8"
                step="any"
                value={exponent}
                onChange={(e) => { setExponent(e.target.value); setErrors((prev) => ({ ...prev, exponent: undefined })); }}
              />
              {errors.exponent && <p className="text-xs text-destructive">{errors.exponent}</p>}
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
        <div className="grid grid-cols-1 gap-4">
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1 break-words">Power Result</p>
              <p className="text-2xl font-bold text-primary break-all">{result}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {base} ^ {exponent}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
