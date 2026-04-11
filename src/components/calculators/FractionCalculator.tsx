import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) { const t = b; b = a % b; a = t; }
  return a;
}

export function FractionCalculator() {
  const [n1, setN1] = useState('');
  const [d1, setD1] = useState('');
  const [n2, setN2] = useState('');
  const [d2, setD2] = useState('');
  const [result, setResult] = useState<{ fraction: string; decimal: number } | null>(null);
  const [errors, setErrors] = useState<{ n1?: string; d1?: string; n2?: string; d2?: string }>({});

  const handleCalculate = () => {
    const pn1 = parseInt(n1);
    const pd1 = parseInt(d1);
    const pn2 = parseInt(n2);
    const pd2 = parseInt(d2);
    const errs: { n1?: string; d1?: string; n2?: string; d2?: string } = {};

    if (n1.trim() === '' || isNaN(pn1)) errs.n1 = 'Enter a valid numerator.';
    if (d1.trim() === '' || isNaN(pd1) || pd1 === 0) errs.d1 = 'Enter a valid denominator (not 0).';
    if (n2.trim() === '' || isNaN(pn2)) errs.n2 = 'Enter a valid numerator.';
    if (d2.trim() === '' || isNaN(pd2) || pd2 === 0) errs.d2 = 'Enter a valid denominator (not 0).';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    const num = pn1 * pd2 + pn2 * pd1;
    const den = pd1 * pd2;
    const g = gcd(Math.abs(num), Math.abs(den));
    const sNum = num / g;
    const sDen = den / g;
    const fraction = sDen === 1 ? `${sNum}` : `${sNum}/${sDen}`;
    setResult({ fraction, decimal: num / den });
  };

  const handleReset = () => {
    setN1(''); setD1(''); setN2(''); setD2('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Fraction Addition</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="n1">Numerator 1</Label>
              <Input
                id="n1"
                type="number"
                placeholder="e.g. 1"
                step="1"
                value={n1}
                onChange={(e) => { setN1(e.target.value); setErrors((prev) => ({ ...prev, n1: undefined })); }}
              />
              {errors.n1 && <p className="text-xs text-destructive">{errors.n1}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="d1">Denominator 1</Label>
              <Input
                id="d1"
                type="number"
                placeholder="e.g. 4"
                step="1"
                value={d1}
                onChange={(e) => { setD1(e.target.value); setErrors((prev) => ({ ...prev, d1: undefined })); }}
              />
              {errors.d1 && <p className="text-xs text-destructive">{errors.d1}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="n2">Numerator 2</Label>
              <Input
                id="n2"
                type="number"
                placeholder="e.g. 1"
                step="1"
                value={n2}
                onChange={(e) => { setN2(e.target.value); setErrors((prev) => ({ ...prev, n2: undefined })); }}
              />
              {errors.n2 && <p className="text-xs text-destructive">{errors.n2}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="d2">Denominator 2</Label>
              <Input
                id="d2"
                type="number"
                placeholder="e.g. 3"
                step="1"
                value={d2}
                onChange={(e) => { setD2(e.target.value); setErrors((prev) => ({ ...prev, d2: undefined })); }}
              />
              {errors.d2 && <p className="text-xs text-destructive">{errors.d2}</p>}
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
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1 break-words">Result Fraction</p>
              <p className="text-2xl font-bold text-primary truncate">{result.fraction}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {n1}/{d1} + {n2}/{d2} (simplified)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1 break-words">Decimal Value</p>
              <p className="text-2xl font-bold truncate">{result.decimal.toFixed(4)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {n1}/{d1} + {n2}/{d2}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
