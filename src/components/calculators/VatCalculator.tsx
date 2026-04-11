import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

function formatNumber(n: number): string {
  return n.toFixed(2);
}

export function VatCalculator() {
  const [price, setPrice] = useState('');
  const [vatRate, setVatRate] = useState('');
  const [result, setResult] = useState<{ vatAmount: number; totalPrice: number } | null>(null);
  const [errors, setErrors] = useState<{ price?: string; vatRate?: string }>({});

  const handleCalculate = () => {
    const p = parseFloat(price);
    const v = parseFloat(vatRate);
    const errs: { price?: string; vatRate?: string } = {};

    if (price.trim() === '' || isNaN(p) || p < 0) errs.price = 'Enter a valid price (0 or more).';
    if (vatRate.trim() === '' || isNaN(v) || v < 0) errs.vatRate = 'Enter a valid VAT rate (0 or more).';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    const vatAmount = p * (v / 100);
    setResult({ vatAmount, totalPrice: p + vatAmount });
  };

  const handleReset = () => {
    setPrice('');
    setVatRate('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">VAT Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (before VAT)</Label>
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
              <Label htmlFor="vatRate">VAT Rate (%)</Label>
              <Input
                id="vatRate"
                type="number"
                placeholder="e.g. 20"
                min="0"
                step="0.01"
                value={vatRate}
                onChange={(e) => { setVatRate(e.target.value); setErrors((prev) => ({ ...prev, vatRate: undefined })); }}
              />
              {errors.vatRate && <p className="text-xs text-destructive">{errors.vatRate}</p>}
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
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Total Price (inc. VAT)</p>
              <p className="text-2xl font-bold text-primary">${formatNumber(result.totalPrice)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                ${price} + ${formatNumber(result.vatAmount)} VAT
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">VAT Amount</p>
              <p className="text-2xl font-bold">${formatNumber(result.vatAmount)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {vatRate}% of ${price}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
