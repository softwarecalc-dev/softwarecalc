import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

function roundToSigFigs(num: number, sigFigs: number): number {
  if (num === 0) return 0;
  const magnitude = Math.floor(Math.log10(Math.abs(num)));
  const factor = Math.pow(10, sigFigs - 1 - magnitude);
  return Math.round(num * factor) / factor;
}

export function SigFigCalculator() {
  const [number, setNumber] = useState('');
  const [sigFigs, setSigFigs] = useState('');
  const [result, setResult] = useState<{ value: number; sigFigs: number } | null>(null);
  const [errors, setErrors] = useState<{ number?: string; sigFigs?: string }>({});

  const handleCalculate = () => {
    const num = parseFloat(number);
    const sf = parseInt(sigFigs, 10);
    const errs: { number?: string; sigFigs?: string } = {};

    if (number.trim() === '' || isNaN(num)) errs.number = 'Enter a valid number.';
    if (sigFigs.trim() === '' || isNaN(sf)) errs.sigFigs = 'Enter a valid whole number.';
    else if (sf < 1) errs.sigFigs = 'Significant figures must be at least 1.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    setResult({ value: roundToSigFigs(num, sf), sigFigs: sf });
  };

  const handleReset = () => {
    setNumber('');
    setSigFigs('');
    setResult(null);
    setErrors({});
  };

  const formattedResult = result !== null
    ? result.value.toPrecision(result.sigFigs)
    : '';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sig Fig Input</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="number">Number</Label>
              <Input
                id="number"
                type="number"
                placeholder="e.g. 123.456"
                step="any"
                value={number}
                onChange={(e) => { setNumber(e.target.value); setErrors((prev) => ({ ...prev, number: undefined })); }}
              />
              {errors.number && <p className="text-xs text-destructive">{errors.number}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="sigFigs">Significant Figures</Label>
              <Input
                id="sigFigs"
                type="number"
                placeholder="e.g. 3"
                step="1"
                min="1"
                value={sigFigs}
                onChange={(e) => { setSigFigs(e.target.value); setErrors((prev) => ({ ...prev, sigFigs: undefined })); }}
              />
              {errors.sigFigs && <p className="text-xs text-destructive">{errors.sigFigs}</p>}
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
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Rounded Result</p>
              <p className="text-2xl font-bold text-primary break-all">{formattedResult}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {number} to {result.sigFigs} sig fig{result.sigFigs === 1 ? '' : 's'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Original</span>
                <span className="font-medium">{number}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Significant Figures</span>
                <span className="font-medium">{result.sigFigs}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rounded</span>
                <span className="font-medium">{formattedResult}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
