import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw, ArrowRight } from 'lucide-react';

const FACTORS: Record<string, number> = {
  kg: 1,
  g: 1000,
  lb: 2.2046226218,
  oz: 35.27396195,
};

const UNIT_LABELS: Record<string, string> = {
  kg: 'Kilograms (kg)',
  g: 'Grams (g)',
  lb: 'Pounds (lb)',
  oz: 'Ounces (oz)',
};

export function WeightConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('kg');
  const [toUnit, setToUnit] = useState('lb');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const val = parseFloat(value);
    if (value.trim() === '' || isNaN(val)) {
      setError('Enter a valid weight value.');
      setResult(null);
      return;
    }

    setError(null);
    const kg = val / FACTORS[fromUnit];
    const converted = kg * FACTORS[toUnit];
    setResult(converted);
  };

  const handleReset = () => {
    setValue('');
    setFromUnit('kg');
    setToUnit('lb');
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Weight Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              type="number"
              placeholder="e.g. 10"
              step="any"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError(null);
              }}
            />
            {error && <p className="text-xs text-destructive">{error}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fromUnit">From Unit</Label>
              <select
                id="fromUnit"
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {Object.entries(UNIT_LABELS).map(([unit, label]) => (
                  <option key={unit} value={unit}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="toUnit">To Unit</Label>
              <select
                id="toUnit"
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {Object.entries(UNIT_LABELS).map(([unit, label]) => (
                  <option key={unit} value={unit}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <Button onClick={handleCalculate}>Convert</Button>
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RefreshCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {result !== null && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="pt-5 pb-5">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-2">Converted Value</p>
            <div className="flex items-center gap-3">
              <span className="text-xl font-medium text-muted-foreground">{value} {fromUnit}</span>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
              <span className="text-3xl font-bold text-primary">{result.toFixed(4)} {toUnit}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              {UNIT_LABELS[fromUnit]} to {UNIT_LABELS[toUnit]}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
