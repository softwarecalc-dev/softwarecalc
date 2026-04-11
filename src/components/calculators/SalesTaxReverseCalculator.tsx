import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RefreshCcw } from 'lucide-react';

function formatNumber(n: number): string {
  return n.toFixed(2);
}

export function SalesTaxReverseCalculator() {
  const [totalPrice, setTotalPrice] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [result, setResult] = useState<{ priceBeforeTax: number; taxAmount: number } | null>(null);
  const [errors, setErrors] = useState<{ totalPrice?: string; taxRate?: string }>({});

  const handleCalculate = () => {
    const t = parseFloat(totalPrice);
    const r = parseFloat(taxRate);
    const errs: { totalPrice?: string; taxRate?: string } = {};

    if (totalPrice.trim() === '' || isNaN(t) || t < 0) errs.totalPrice = 'Enter a valid total price (0 or more).';
    if (taxRate.trim() === '' || isNaN(r) || r < 0) errs.taxRate = 'Enter a valid tax rate (0 or more).';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setResult(null);
      return;
    }

    setErrors({});
    const priceBeforeTax = t / (1 + r / 100);
    setResult({ priceBeforeTax, taxAmount: t - priceBeforeTax });
  };

  const handleReset = () => {
    setTotalPrice('');
    setTaxRate('');
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sales Tax Reverse Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalPrice">Total Price (inc. Tax)</Label>
              <Input
                id="totalPrice"
                type="number"
                placeholder="e.g. 107.50"
                min="0"
                step="0.01"
                value={totalPrice}
                onChange={(e) => { setTotalPrice(e.target.value); setErrors((prev) => ({ ...prev, totalPrice: undefined })); }}
              />
              {errors.totalPrice && <p className="text-xs text-destructive">{errors.totalPrice}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxRate">Sales Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                placeholder="e.g. 7.5"
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
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Price Before Tax</p>
              <p className="text-2xl font-bold text-primary">${formatNumber(result.priceBeforeTax)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                ${totalPrice} ÷ (1 + {taxRate}%)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Sales Tax Amount</p>
              <p className="text-2xl font-bold">${formatNumber(result.taxAmount)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {taxRate}% of ${formatNumber(result.priceBeforeTax)}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
