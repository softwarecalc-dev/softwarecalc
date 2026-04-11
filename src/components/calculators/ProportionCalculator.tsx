import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

export function ProportionCalculator() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ a?: string; b?: string; c?: string }>({});

  const handleCalculate = () => {
    const pa = parseFloat(a);
    const pb = parseFloat(b);
    const pc = parseFloat(c);
    const errs: { a?: string; b?: string; c?: string } = {};

    if (a.trim() === '' || isNaN(pa) || pa === 0) errs.a = 'Enter a valid value for A (not 0).';
    if (b.trim() === '' || isNaN(pb)) errs.b = 'Enter a valid value for B.';
    if (c.trim() === '' || isNaN(pc)) errs.c = 'Enter a valid value for C.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    setResult((pb * pc) / pa);
  };

  const handleReset = () => {
    setA(''); setB(''); setC('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Proportion (A / B = C / X)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="a">A</Label>
              <Input
                id="a"
                type="number"
                placeholder="e.g. 3"
                step="any"
                value={a}
                onChange={(e) => { setA(e.target.value); setErrors((prev) => ({ ...prev, a: undefined })); }}
              />
              {errors.a && <p className="text-xs text-destructive">{errors.a}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="b">B</Label>
              <Input
                id="b"
                type="number"
                placeholder="e.g. 4"
                step="any"
                value={b}
                onChange={(e) => { setB(e.target.value); setErrors((prev) => ({ ...prev, b: undefined })); }}
              />
              {errors.b && <p className="text-xs text-destructive">{errors.b}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="c">C</Label>
              <Input
                id="c"
                type="number"
                placeholder="e.g. 9"
                step="any"
                value={c}
                onChange={(e) => { setC(e.target.value); setErrors((prev) => ({ ...prev, c: undefined })); }}
              />
              {errors.c && <p className="text-xs text-destructive">{errors.c}</p>}
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
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1 break-words">Missing Value X</p>
              <p className="text-2xl font-bold text-primary truncate">{result.toFixed(4)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                ({b} × {c}) ÷ {a}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
