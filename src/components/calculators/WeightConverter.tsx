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

  const selectClass =
    'w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Weight Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="wc-value">Value</Label>
            <Input
              id="wc-value"
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

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-end">
            <div className="space-y-2">
              <Label htmlFor="wc-from">From</Label>
              <select
                id="wc-from"
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className={selectClass}
              >
                {Object.entries(UNIT_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-center pb-1">
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="wc-to">To</Label>
              <select
                id="wc-to"
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className={selectClass}
              >
                {Object.entries(UNIT_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={handleCalculate} className="px-8">Convert</Button>
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
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
              Result
            </p>
            <p className="text-3xl font-bold text-primary">
              {result.toLocaleString('en-US', { maximumFractionDigits: 6 })}
              <span className="text-lg font-normal text-muted-foreground ml-2">{toUnit}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {value} {fromUnit} = {result.toLocaleString('en-US', { maximumFractionDigits: 6 })} {toUnit}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
