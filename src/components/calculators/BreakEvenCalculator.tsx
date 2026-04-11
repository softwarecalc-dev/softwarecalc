import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

function formatNumber(n: number): string {
  return n.toFixed(2);
}

export function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [variableCost, setVariableCost] = useState('');
  const [result, setResult] = useState<{ units: number; margin: number } | null>(null);
  const [errors, setErrors] = useState<{ fixedCosts?: string; sellingPrice?: string; variableCost?: string }>({});

  const handleCalculate = () => {
    const fc = parseFloat(fixedCosts);
    const sp = parseFloat(sellingPrice);
    const vc = parseFloat(variableCost);
    const errs: { fixedCosts?: string; sellingPrice?: string; variableCost?: string } = {};

    if (fixedCosts.trim() === '' || isNaN(fc) || fc < 0) errs.fixedCosts = 'Enter a valid fixed costs amount (0 or more).';
    if (sellingPrice.trim() === '' || isNaN(sp) || sp < 0) errs.sellingPrice = 'Enter a valid selling price (0 or more).';
    if (variableCost.trim() === '' || isNaN(vc) || vc < 0) errs.variableCost = 'Enter a valid variable cost (0 or more).';

    if (Object.keys(errs).length === 0 && sp - vc <= 0) {
      errs.sellingPrice = 'Selling price must be greater than variable cost per unit.';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    const margin = sp - vc;
    setResult({ units: fc / margin, margin });
  };

  const handleReset = () => {
    setFixedCosts('');
    setSellingPrice('');
    setVariableCost('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Cost Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fixedCosts">Fixed Costs</Label>
              <Input
                id="fixedCosts"
                type="number"
                placeholder="e.g. 10000"
                min="0"
                step="0.01"
                value={fixedCosts}
                onChange={(e) => { setFixedCosts(e.target.value); setErrors((prev) => ({ ...prev, fixedCosts: undefined })); }}
              />
              {errors.fixedCosts && <p className="text-xs text-destructive">{errors.fixedCosts}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="sellingPrice">Selling Price Per Unit</Label>
              <Input
                id="sellingPrice"
                type="number"
                placeholder="e.g. 50"
                min="0"
                step="0.01"
                value={sellingPrice}
                onChange={(e) => { setSellingPrice(e.target.value); setErrors((prev) => ({ ...prev, sellingPrice: undefined })); }}
              />
              {errors.sellingPrice && <p className="text-xs text-destructive">{errors.sellingPrice}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="variableCost">Variable Cost Per Unit</Label>
              <Input
                id="variableCost"
                type="number"
                placeholder="e.g. 20"
                min="0"
                step="0.01"
                value={variableCost}
                onChange={(e) => { setVariableCost(e.target.value); setErrors((prev) => ({ ...prev, variableCost: undefined })); }}
              />
              {errors.variableCost && <p className="text-xs text-destructive">{errors.variableCost}</p>}
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
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1 break-words">Break-Even Units</p>
              <p className="text-2xl font-bold text-primary truncate">{formatNumber(result.units)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {fixedCosts} ÷ ({sellingPrice} − {variableCost})
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1 break-words">Contribution Margin Per Unit</p>
              <p className="text-2xl font-bold truncate">{formatNumber(result.margin)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {sellingPrice} − {variableCost}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
