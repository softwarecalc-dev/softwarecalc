import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

function gcf(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcf(a, b);
}

export function LcmCalculator() {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ first?: string; second?: string }>({});

  const handleCalculate = () => {
    const a = parseInt(firstNumber, 10);
    const b = parseInt(secondNumber, 10);
    const errs: { first?: string; second?: string } = {};

    if (firstNumber.trim() === '' || isNaN(a)) errs.first = 'Enter a valid integer.';
    if (secondNumber.trim() === '' || isNaN(b)) errs.second = 'Enter a valid integer.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    if (a === 0) { setErrors({ first: 'Number cannot be 0.' }); setResult(null); return; }
    if (b === 0) { setErrors({ second: 'Number cannot be 0.' }); setResult(null); return; }

    setErrors({});
    setResult(lcm(a, b));
  };

  const handleReset = () => {
    setFirstNumber('');
    setSecondNumber('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Number Inputs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first">First Number</Label>
              <Input
                id="first"
                type="number"
                placeholder="e.g. 4"
                step="1"
                value={firstNumber}
                onChange={(e) => { setFirstNumber(e.target.value); setErrors((prev) => ({ ...prev, first: undefined })); }}
              />
              {errors.first && <p className="text-xs text-destructive">{errors.first}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="second">Second Number</Label>
              <Input
                id="second"
                type="number"
                placeholder="e.g. 6"
                step="1"
                value={secondNumber}
                onChange={(e) => { setSecondNumber(e.target.value); setErrors((prev) => ({ ...prev, second: undefined })); }}
              />
              {errors.second && <p className="text-xs text-destructive">{errors.second}</p>}
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
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Least Common Multiple</p>
              <p className="text-2xl font-bold text-primary break-all">{result}</p>
              <p className="text-xs text-muted-foreground mt-2">LCM({firstNumber}, {secondNumber})</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
