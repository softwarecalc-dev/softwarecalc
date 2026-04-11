import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

export function NthRootCalculator() {
  const [number, setNumber] = useState('');
  const [root, setRoot] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ number?: string; root?: string }>({});

  const handleCalculate = () => {
    const n = parseFloat(number);
    const r = parseFloat(root);
    const errs: { number?: string; root?: string } = {};

    if (number.trim() === '' || isNaN(n)) errs.number = 'Enter a valid number.';
    if (root.trim() === '' || isNaN(r)) errs.root = 'Enter a valid root.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    if (r === 0) {
      setErrors({ root: 'Root cannot be 0.' });
      setResult(null);
      return;
    }

    if (n < 0 && r % 2 === 0) {
      setErrors({ number: 'Negative numbers are not allowed with an even root.' });
      setResult(null);
      return;
    }

    setErrors({});

    if (n < 0 && r % 2 !== 0) {
      setResult(-Math.pow(-n, 1 / r));
    } else {
      setResult(Math.pow(n, 1 / r));
    }
  };

  const handleReset = () => {
    setNumber('');
    setRoot('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Number &amp; Root</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="number">Number</Label>
              <Input
                id="number"
                type="number"
                placeholder="e.g. 27"
                step="any"
                value={number}
                onChange={(e) => { setNumber(e.target.value); setErrors((prev) => ({ ...prev, number: undefined })); }}
              />
              {errors.number && <p className="text-xs text-destructive">{errors.number}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="root">Root (n)</Label>
              <Input
                id="root"
                type="number"
                placeholder="e.g. 3"
                step="any"
                value={root}
                onChange={(e) => { setRoot(e.target.value); setErrors((prev) => ({ ...prev, root: undefined })); }}
              />
              {errors.root && <p className="text-xs text-destructive">{errors.root}</p>}
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
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Nth Root</p>
              <p className="text-2xl font-bold text-primary break-all">{result}</p>
              <p className="text-xs text-muted-foreground mt-2">{root}√{number}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
