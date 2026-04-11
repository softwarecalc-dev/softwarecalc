import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

type Unit = 'Celsius' | 'Fahrenheit' | 'Kelvin';

function formatNumber(n: number): string {
  return n.toFixed(2);
}

function convertTemperature(value: number, from: Unit, to: Unit): number {
  if (from === to) return value;

  // Convert from input unit to Celsius
  let celsius: number;
  if (from === 'Celsius') {
    celsius = value;
  } else if (from === 'Fahrenheit') {
    celsius = (value - 32) * 5 / 9;
  } else {
    celsius = value - 273.15;
  }

  // Convert from Celsius to target unit
  if (to === 'Celsius') {
    return celsius;
  } else if (to === 'Fahrenheit') {
    return (celsius * 9 / 5) + 32;
  } else {
    return celsius + 273.15;
  }
}

const UNIT_SYMBOLS: Record<Unit, string> = {
  Celsius: '°C',
  Fahrenheit: '°F',
  Kelvin: 'K'
};

export function TemperatureConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState<Unit>('Celsius');
  const [toUnit, setToUnit] = useState<Unit>('Fahrenheit');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const v = parseFloat(value);
    if (value.trim() === '' || isNaN(v)) {
      setError('Please enter a valid temperature.');
      setResult(null);
      return;
    }

    setError(null);
    const converted = convertTemperature(v, fromUnit, toUnit);
    setResult(converted);
  };

  const handleReset = () => {
    setValue('');
    setFromUnit('Celsius');
    setToUnit('Fahrenheit');
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Temperature Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="temp-value">Temperature Value</Label>
              <Input
                id="temp-value"
                type="number"
                placeholder="e.g. 25"
                step="any"
                value={value}
                onChange={(e) => { setValue(e.target.value); setError(null); }}
              />
              {error && <p className="text-xs text-destructive">{error}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="from-unit">From Unit</Label>
              <select
                id="from-unit"
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value as Unit)}
                className="w-full h-10 px-3 py-2 text-sm border rounded-md bg-background"
              >
                <option value="Celsius">Celsius (°C)</option>
                <option value="Fahrenheit">Fahrenheit (°F)</option>
                <option value="Kelvin">Kelvin (K)</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to-unit">To Unit</Label>
              <select
                id="to-unit"
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value as Unit)}
                className="w-full h-10 px-3 py-2 text-sm border rounded-md bg-background"
              >
                <option value="Celsius">Celsius (°C)</option>
                <option value="Fahrenheit">Fahrenheit (°F)</option>
                <option value="Kelvin">Kelvin (K)</option>
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
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Converted Temperature</p>
            <p className="text-2xl font-bold text-primary">
              {formatNumber(result)}{UNIT_SYMBOLS[toUnit]}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {value}{UNIT_SYMBOLS[fromUnit]} is equal to {formatNumber(result)}{UNIT_SYMBOLS[toUnit]}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
