import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

const UNIT_FACTORS: Record<string, number> = {
  'US Cup': 236.588,
  'Tablespoon (tbsp)': 14.7868,
  'Teaspoon (tsp)': 4.92892,
  'Milliliter (ml)': 1,
  'Deciliter (dl)': 100,
  'Liter (L)': 1000,
};

function formatNumber(n: number): string {
  return n.toFixed(2);
}

export function RecipeVolumeConverter() {
  const [amount, setAmount] = useState('');
  const [fromUnit, setFromUnit] = useState('US Cup');
  const [toUnit, setToUnit] = useState('Milliliter (ml)');
  const [result, setResult] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ amount?: string }>({});

  const handleCalculate = () => {
    const a = parseFloat(amount);
    const errs: { amount?: string } = {};

    if (amount.trim() === '' || isNaN(a)) {
      errs.amount = 'Enter a valid amount.';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    
    // Convert to ml first
    const amountInMl = a * UNIT_FACTORS[fromUnit];
    // Convert from ml to target unit
    const convertedAmount = amountInMl / UNIT_FACTORS[toUnit];
    
    setResult(convertedAmount);
  };

  const handleReset = () => {
    setAmount('');
    setFromUnit('US Cup');
    setToUnit('Milliliter (ml)');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Conversion Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="e.g. 1"
              step="any"
              value={amount}
              onChange={(e) => { setAmount(e.target.value); setErrors({}); }}
            />
            {errors.amount && <p className="text-xs text-destructive">{errors.amount}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fromUnit">From Unit</Label>
              <select
                id="fromUnit"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
              >
                {Object.keys(UNIT_FACTORS).map((unit) => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="toUnit">To Unit</Label>
              <select
                id="toUnit"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
              >
                {Object.keys(UNIT_FACTORS).map((unit) => (
                  <option key={unit} value={unit}>{unit}</option>
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
        <div className="grid grid-cols-1 gap-4">
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Converted Amount</p>
              <p className="text-2xl font-bold text-primary">{formatNumber(result)} {toUnit.split(' (')[0]}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {amount} {fromUnit.split(' (')[0]} = {formatNumber(result)} {toUnit.split(' (')[0]}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
