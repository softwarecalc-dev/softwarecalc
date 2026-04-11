import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw, TrendingUp, TrendingDown, Minus } from 'lucide-react';

function formatNumber(n: number): string {
  return parseFloat(n.toFixed(2)).toString();
}

export function PercentageChangeCalculator() {
  const [originalValue, setOriginalValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const [result, setResult] = useState<{ 
    difference: number; 
    percentageChange: number; 
    changeType: 'Increase' | 'Decrease' | 'No Change' 
  } | null>(null);
  const [errors, setErrors] = useState<{ originalValue?: string; newValue?: string }>({});

  const handleCalculate = () => {
    const o = parseFloat(originalValue);
    const n = parseFloat(newValue);
    const errs: { originalValue?: string; newValue?: string } = {};

    if (originalValue.trim() === '' || isNaN(o)) errs.originalValue = 'Enter a valid original value.';
    if (newValue.trim() === '' || isNaN(n)) errs.newValue = 'Enter a valid new value.';
    if (o === 0 && originalValue.trim() !== '') errs.originalValue = 'Original value cannot be zero for percentage change calculation.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    const difference = n - o;
    const percentageChange = (difference / o) * 100;
    
    let changeType: 'Increase' | 'Decrease' | 'No Change' = 'No Change';
    if (percentageChange > 0) changeType = 'Increase';
    else if (percentageChange < 0) changeType = 'Decrease';

    setResult({ difference, percentageChange, changeType });
  };

  const handleReset = () => {
    setOriginalValue('');
    setNewValue('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Change Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="originalValue">Original Value</Label>
              <Input
                id="originalValue"
                type="number"
                placeholder="e.g. 50"
                value={originalValue}
                onChange={(e) => { setOriginalValue(e.target.value); setErrors((prev) => ({ ...prev, originalValue: undefined })); }}
              />
              {errors.originalValue && <p className="text-xs text-destructive">{errors.originalValue}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="newValue">New Value</Label>
              <Input
                id="newValue"
                type="number"
                placeholder="e.g. 75"
                value={newValue}
                onChange={(e) => { setNewValue(e.target.value); setErrors((prev) => ({ ...prev, newValue: undefined })); }}
              />
              {errors.newValue && <p className="text-xs text-destructive">{errors.newValue}</p>}
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Percentage Change</p>
              <p className={`text-2xl font-bold ${result.percentageChange >= 0 ? 'text-primary' : 'text-destructive'}`}>
                {result.percentageChange > 0 ? '+' : ''}{formatNumber(result.percentageChange)}%
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                From {originalValue} to {newValue}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Difference</p>
              <p className="text-2xl font-bold">{result.difference > 0 ? '+' : ''}{formatNumber(result.difference)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Absolute change
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Change Type</p>
              <div className="flex items-center gap-2">
                {result.changeType === 'Increase' && <TrendingUp className="w-5 h-5 text-primary" />}
                {result.changeType === 'Decrease' && <TrendingDown className="w-5 h-5 text-destructive" />}
                {result.changeType === 'No Change' && <Minus className="w-5 h-5 text-muted-foreground" />}
                <p className="text-2xl font-bold">{result.changeType}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Direction of change
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
