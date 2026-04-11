import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

export function ReciprocalCalculator() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | undefined>();

  const handleCalculate = () => {
    const n = parseFloat(number);

    if (number.trim() === '' || isNaN(n) || n === 0) {
      setError('Enter a valid number (not 0).');
      setResult(null);
      return;
    }

    setError(undefined);
    setResult(1 / n);
  };

  const handleReset = () => {
    setNumber('');
    setResult(null);
    setError(undefined);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Number Input</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="number">Number</Label>
              <Input
                id="number"
                type="number"
                placeholder="e.g. 4"
                step="any"
                value={number}
                onChange={(e) => { setNumber(e.target.value); setError(undefined); }}
              />
              {error && <p className="text-xs text-destructive">{error}</p>}
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
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1 break-words">Reciprocal</p>
              <p className="text-2xl font-bold text-primary break-all">{result}</p>
              <p className="text-xs text-muted-foreground mt-2">1 / {number}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
