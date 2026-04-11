import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

function formatNumber(n: number): string {
  return n.toFixed(2);
}

export function SalesTaxCalculator() {
  const [price, setPrice] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [result, setResult] = useState<{ taxAmount: number; totalPrice: number } | null>(null);
  const [errors, setErrors] = useState<{ price?: string; taxRate?: string }>({});

  const handleCalculate = () => {
    const p = parseFloat(price);
    const r = parseFloat(taxRate);
    const errs: { price?: string; taxRate?: string } = {};

    if (price.trim() === '' || isNaN(p) || p < 0) errs.price = 'Enter a valid price (0 or more).';
    if (taxRate.trim() === '' || isNaN(r) || r < 0) errs.taxRate = 'Enter a valid tax rate (0 or more).';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    const taxAmount = p * (r / 100);
    const totalPrice = p + taxAmount;
    setResult({ taxAmount, totalPrice });
  };

  const handleReset = () => {
    setPrice('');
    setTaxRate('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sales Tax Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (before tax)</Label>
              <Input
                id="price"
                type="number"
                placeholder="e.g. 100"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => { setPrice(e.target.value); setErrors((prev) => ({ ...prev, price: undefined })); }}
              />
              {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxRate">Sales Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                placeholder="e.g. 8.25"
                min="0"
                step="0.01"
                value={taxRate}
                onChange={(e) => { setTaxRate(e.target.value); setErrors((prev) => ({ ...prev, taxRate: undefined })); }}
              />
              {errors.taxRate && <p className="text-xs text-destructive">{errors.taxRate}</p>}
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
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Total Price (inc. tax)</p>
              <p className="text-2xl font-bold text-primary">${formatNumber(result.totalPrice)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                ${price} + ${formatNumber(result.taxAmount)} tax
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Tax Amount</p>
              <p className="text-2xl font-bold">${formatNumber(result.taxAmount)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {taxRate}% of ${price}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
